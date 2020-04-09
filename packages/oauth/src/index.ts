
// TODO: Not using RequestListner, should I?
import { IncomingMessage, ServerResponse } from 'http';
import { sign, verify } from 'jsonwebtoken';
import { WebClient } from '@slack/web-api';
import { CodedError } from './errors';
import * as url from 'url';
import { Logger, LogLevel, getLogger } from './logger';

export interface OAuthInterface {
  generateInstallUrl(options: InstallURLOptions): Promise<string>;
  authorize(source: InstallationQuery): Promise<AuthorizeResult>;
  handleCallback(req: IncomingMessage, res: ServerResponse, options?: CallbackOptions): Promise<void>;
}

export class InstallProvider implements OAuthInterface {
  public stateStore: StateStore;
  public installationStore: InstallationStore;
  private clientId: string;
  private clientSecret: string;
  private authVersion: string;
  private logger: Logger;
  // Use Definite Assignment Assertions here because this gets set in generateInstallUrl
  private installOptions!: InstallURLOptions;

  constructor({
    clientId,
    clientSecret,
    stateSecret = undefined,
    stateStore = new ClearStateStore(stateSecret),
    installationStore = new MemoryInstallationStore(),
    authVersion = 'v2',
    logger = undefined,
    logLevel = LogLevel.INFO}: InstallProviderOptions) {

    if (typeof clientId !== 'string' || typeof clientSecret !== 'string') {
      throw new Error('You must provide a valid clientId and clientSecret');
    }

    // Setup the logger
    if (typeof logger !== 'undefined') {
      this.logger = logger;
      if (typeof logLevel !== 'undefined') {
        this.logger.debug('The logLevel given to OAuth was ignored as you also gave logger');
      }
    } else {
      this.logger = getLogger('OAuth', logLevel, logger);
    }

    this.stateStore = stateStore;
    this.installationStore = installationStore;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.handleCallback = this.handleCallback.bind(this);
    this.authorize = this.authorize.bind(this);
    this.authVersion = authVersion;
  }

  /**
   * Fetches data from the installationStore.
   * This method can be used as the value in AppOptions['authorize']
   */
  public async authorize(source: InstallationQuery): Promise<AuthorizeResult> {
    const queryResult = await this.installationStore.fetchInstallation(source, this.logger);

    const authResult: AuthorizeResult = {};
    authResult.userToken = queryResult.user.token;
    if (queryResult.bot !== undefined) {
      authResult.botToken = queryResult.bot.token;
      authResult.botId = queryResult.bot.id;
      authResult.botUserId = queryResult.bot.userId;
    }

    return new Promise<AuthorizeResult>((resolve) => {
      resolve(authResult);
    });
  }

  /**
   * Returns a URL that is suitable for including in an Add to Slack button
   * Uses stateStore to generate a value for the state query param.
   */
  public async generateInstallUrl(options: InstallURLOptions): Promise<string> {
    // save options in case we need to share it for handleCallback failure
    this.installOptions = options;

    // Base URL
    let URL = 'https://slack.com/oauth/v2/authorize?';
    if (this.authVersion === 'v1') {
      URL = 'https://slack.com/oauth/authorize?';
    }

    if (options.scopes === undefined) {
      throw new Error('You must provide a scope parameter when calling generateInstallUrl');
    }

    // scope
    let scopes;
    if (options.scopes instanceof Array) {
      scopes = options.scopes.join(',');
    } else {
      scopes = options.scopes;
    }
    URL = `${URL}scope=${scopes}`;

    // generate state
    const state = await this.stateStore.generateStateParam(new Date(), options.metadata);
    URL = `${URL}&state=${state}`;

    // client id
    URL = `${URL}&client_id=${this.clientId}`;

    // redirect uri
    if (options.redirectUri != null) {
      URL = `${URL}&redirect_uri=${options.redirectUri}`;
    }

    // team id
    if (options.teamId != null) {
      URL = `${URL}&team=${options.teamId}`;
    }

    // user scope, only available for OAuth v2
    if (options.userScopes != null && this.authVersion === 'v2') {
      let userScopes;
      if (options.userScopes instanceof Array) {
        userScopes = options.userScopes.join(',');
      } else {
        userScopes = options.userScopes;
      }
      URL = `${URL}&user_scope=${userScopes}`;
    }

    return new Promise<string>((resolve) => {
      resolve(URL);
    });
  }

  /**
   * This method handles the incoming request to the callback URL.
   * It can be used as a RequestListener in almost any HTTP server
   * framework.
   *
   * Verifies the state using the stateStore, exchanges the grant in the
   * query params for an access token, and stores token and associated data
   * in the installationStore.
   */
  public async handleCallback(
    req: IncomingMessage,
    res: ServerResponse,
    options?: CallbackOptions,
  ): Promise<void> {
    let parsedUrl;
    let code: string;
    let state: string;

    try {
      if (req.url != null) {
        parsedUrl = url.parse(req.url, true);
        code = parsedUrl.query.code as string;
        state = parsedUrl.query.state as string;
        if (state === undefined) {
          throw new Error('redirect url is missing state query parameter');
        }
      } else {
        throw new Error('Something went wrong');
      }

      const metadata = await this.stateStore.verifyStateParam(new Date(), state);
      const client = new WebClient('');

      let resp;
      let installation: Installation;
      if (this.authVersion === 'v1') {
        // convert response type from WebApiCallResult to OAuthResponse
        resp = await client.oauth.access({
          code,
          client_id: this.clientId,
          client_secret: this.clientSecret,
          redirect_uri: this.installOptions.redirectUri != null ? this.installOptions.redirectUri : undefined,
        }) as unknown as OAuthV1Response;

        // throw error if error exists
        if (resp.error != null && !resp.ok) {
          throw new Error(resp.error);
        }

        // resp obj for v1 - https://api.slack.com/methods/oauth.access#response
        installation = {
          team: { id: resp.team_id, name: resp.team_name },
          appId: resp.app_id, // not included in v1 unless workspace apps, so most likely undefinied
          user: {
            token: resp.access_token,
            scopes: resp.scope.split(','),
            id: '', // Todo: no value for this
          },
        };

        // only can get botId if bot access token exists
        // need to create a botUser + request bot scope to have this be part of resp
        if (resp.bot != null) {
          const botId = await getBotId(resp.bot.bot_access_token);
          installation.bot = {
            id: botId,
            scopes: resp.scope.split(','), // TODO: Is there a way to get bot specific scopes?
            token: resp.bot.bot_access_token,
            userId: resp.bot.bot_user_id,
          };
        }
      } else {
        // convert response type from WebApiCallResult to OAuthResponse
        resp = await client.oauth.v2.access({
          code,
          client_id: this.clientId,
          client_secret: this.clientSecret,
          redirect_uri: this.installOptions.redirectUri != null ? this.installOptions.redirectUri : undefined,
        }) as unknown as OAuthV2Response;

        // throw error if error exists
        if (resp.error != null && !resp.ok) {
          throw new Error(resp.error);
        }

        // get botId
        const botId = await getBotId(resp.access_token);

        // resp obj for v2 - https://api.slack.com/methods/oauth.v2.access#response
        installation = {
          team: resp.team,
          appId: resp.app_id,
          user: {
            token: resp.authed_user.access_token,
            scopes: resp.authed_user.scope != null ? resp.authed_user.scope.split(',') : resp.authed_user.scope,
            id: resp.authed_user.id,
          },
          bot: {
            scopes: resp.scope.split(','),
            token: resp.access_token,
            userId: resp.bot_user_id,
            id: botId,
          },
          tokenType: resp.token_type,
        };
      }

      if (resp.incoming_webhook != null) {
        installation.incomingWebhook = {
          url: resp.incoming_webhook.url,
          channel: resp.incoming_webhook.channel,
          channelId: resp.incoming_webhook.channel_id,
          configurationUrl: resp.incoming_webhook.configuration_url,
        };
      }

      // save access code to installationStore
      await this.installationStore.storeInstallation(installation, this.logger);
      if (options != null && options.success != null) {
        this.logger.debug('calling passed in options.sucess');
        options.success(installation, metadata, req, res);
      } else {
        this.logger.debug('run built-in success function');
        callbackSuccess(installation, metadata, req, res);
      }
    } catch (error) {
      this.logger.error(error);
      if (options != null && options.failure != null) {
        this.logger.debug('calling passed in options.failure');
        options.failure(error, this.installOptions , req, res);
      } else {
        this.logger.debug('run built-in failure function');
        callbackFailure(error, this.installOptions , req, res);
      }
    }
  }
}

interface InstallProviderOptions {
  clientId: string;
  clientSecret: string;
  stateStore?: StateStore; // default ClearStateStore
  stateSecret?: string; // ClearStateStoreOptions['secret']; // required when using default stateStore
  installationStore?: InstallationStore; // default MemoryInstallationStore
  authVersion: 'v1' | 'v2'; // default 'v2'
  logger?: Logger;
  logLevel?: LogLevel;
}

interface InstallURLOptions {
  scopes: string | string[];
  teamId?: string;
  redirectUri?: string;
  userScopes?: string | string[]; // cannot be used with authVersion=v1
  metadata?: string; // Arbitrary data can be stored here, potentially to save app state or use for custom redirect
}

interface CallbackOptions {
  // success is given control after handleCallback() has stored the
  // installation. when provided, this function must complete the
  // callbackRes.
  success?: (
    installation: Installation,
    metadata: string | undefined,
    callbackReq: IncomingMessage,
    callbackRes: ServerResponse,
  ) => void;

  // failure is given control when handleCallback() fails at any point.
  // when provided, this function must complete the callbackRes.
  // default:
  // serve a generic "Error" web page (show detailed cause in development)
  failure?: (
    error: CodedError,
    options: InstallURLOptions,
    callbackReq: IncomingMessage,
    callbackRes: ServerResponse,
  ) => void;
}

// Response shape from oauth.v2.access - https://api.slack.com/methods/oauth.v2.access#response
interface OAuthV2Response {
  ok: boolean;
  app_id: string;
  authed_user: {
    id: string,
    scope?: string,
    access_token?: string,
    token_type?: string,
  };
  scope: string;
  token_type: string;
  access_token: string;
  bot_user_id: string;
  team: { id: string, name: string };
  enterprise: { name: string, id: string } | null;
  error?: string;
  incoming_webhook?: {
    url: string,
    channel: string,
    channel_id: string,
    configuration_url: string,
  };
  response_metadata: object;
}

// Response shape from oauth.access - https://api.slack.com/methods/oauth.access#response
interface OAuthV1Response {
  ok: boolean;
  access_token: string;
  // scope parameter isn't returned in workspace apps
  scope: string;
  team_name: string;
  team_id: string;
  enterprise_id: string | null;
  // if they request bot user token
  bot?: { bot_user_id: string, bot_access_token: string };
  incoming_webhook?: {
    url: string,
    channel: string,
    channel_id: string,
    configuration_url: string,
  };
  response_metadata: object;
  error?: string;
  // app_id is currently undefinined but leaving it in here incase the v1 method adds it
  app_id: string | undefined;
}

export interface StateStore {
  // Returned Promise resolves for a string which can be used as an
  // OAuth state param.
  generateStateParam: (now: Date, metadata?: string) => Promise<string>;

  // Returned Promise resolves for metadata that was stored in the state
  // param, or undefined when there was no metadata. The Promise rejects
  // with a CodedError when the state is invalid.
  verifyStateParam: (now: Date, state: string) => Promise<string | undefined>;
}

// State object structure
interface StateObj {
  now: Date;
  metadata?: string;
}

// default implementation of StateStore
class ClearStateStore implements StateStore {
  private stateSecret: string;
  public constructor(stateSecret: string | undefined) {
    if (stateSecret == null) {
      throw new Error('You must provide a State Secret to use the built-in state store');
    }
    this.stateSecret = stateSecret;
  }

  // TODO: Question, why do the params below need to have types definied
  // instead of getting those types from StateStore interface
  public generateStateParam(now: Date, metadata?: string): Promise<string> {
    const state = sign({ metadata, now: now.toJSON() }, this.stateSecret);
    return new Promise<string>((resolve) => {
      resolve(state);
    });
  }
  public verifyStateParam(_now: Date, state: string): Promise<string | undefined> {
    // decode the state using the secret
    const decoded: StateObj = verify(state, this.stateSecret) as StateObj;

    // return metadata string
    return new Promise<string | undefined>((resolve) => {
      resolve(decoded.metadata);
    });
  }
}

export interface InstallationStore {
  storeInstallation: (installation: Installation, logger?: Logger) => Promise<void>;
  fetchInstallation: (query: InstallationQuery, logger?: Logger) => Promise<Installation>;
}

// using a javascript object as a makeshift database for development
interface DevDatabase {
  [key: string]: Installation;
}
const devDB: DevDatabase = {};

// Default Install Store. Should only be used for development
class MemoryInstallationStore implements InstallationStore {

  public storeInstallation(installation: Installation, logger?: Logger): Promise<void> {
    if (logger != null) {
      logger.warn('Storing Access Token. Please use a real Installation Store for production!');
    }
    // db write
    devDB[installation.team.id] = installation;
    return new Promise<void>((resolve) => {
      resolve();
    });
  }

  public fetchInstallation(query: InstallationQuery, logger?: Logger): Promise<Installation> {
    if (logger != null) {
      logger.warn('Retrieving Access Token from DB. Please use a real Installation Store for production!');
    }
    // db read
    const item = devDB[query.teamId];
    return new Promise<Installation>((resolve) => {
      resolve(item);
    });
  }
}

// Needs to have all the data from OAuthV2Access result and OAuthAccess
// result. This is a normalized shape.
interface Installation {
  team: {
    id: string;
    name: string;
  };
  enterprise?: {
    id: string;
    name: string;
  };
  bot?: {
    token: string;
    scopes: string[];
    id?: string;
    userId: string;
  };
  user: {
    token?: string;
    scopes?: string[];
    id: string;
  };
  incomingWebhook?: {
    url: string;
    channel: string;
    channelId: string;
    configurationUrl: string;
  };
  appId: string | undefined;
  tokenType?: string;
}

// This is intentionally structurally identical to AuthorizeSourceData
// from App. It is redefined so that this class remains loosely coupled to
// the rest of Bolt.
interface InstallationQuery {
  teamId: string;
  enterpriseId?: string;
  userId?: string;
  conversationId?: string;
}

// This is intentionally structurally identical to AuthorizeResult from App
// It is redefined so that this class remains loosely coupled to the rest
// of Bolt.
interface AuthorizeResult {
  botToken?: string;
  userToken?: string;
  botId?: string;
  botUserId?: string;
}

// Default function to call when OAuth flow is successful
function callbackSuccess(
  installation: Installation,
  _metadata: string | undefined,
  _req: IncomingMessage,
  res: ServerResponse,
): void {
  // TODO: We never do anything with metadata. Should we?
  // TODO: this if statement doesn't match the proposal one
  // if (!classicAuth || scopes.includes('bot')
  // How do i check if something is classicAuth? and bot scope doesn't make sense here
  // TODO: Redirect only works for v2 OAuth as v1 is missing appId
  if (installation.team.id != null && installation.appId != null) {
    // redirect back to slack
    // TODO: should we provide an option to open in the browser instead of client?
    // open in web client
    // const redirectUrl = `https://app.slack.com/client/${installation.team.id}/${installation.appId}/`;
    // Open in native app
    const redirectUrl = `slack://app?team=${installation.team.id}&id=${installation.appId}`;
    res.writeHead(302, { Location: redirectUrl });
    res.end();
  } else {
    // Send a generic success page
    // TODO: make this page pretty?
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<html><body><h1>Success! Please close this tab and go back to Slack</h1></body></html>');
  }
}

// Default function to call when OAuth flow is unsuccessful
function callbackFailure(
  _error: CodedError,
  _options: InstallURLOptions,
  _req: IncomingMessage,
  res: ServerResponse,
): void {
  res.writeHead(500, { 'Content-Type': 'text/html' });
  res.end('<html><body><h1>Oops, Something Went Wrong! Please Try Again or Contact the App Owner</h1></body></html>');
}

// Gets the bot_id using the `auth.test` method.
async function getBotId(token: string): Promise<string> {
  const client = new WebClient(token);
  const authResult = await client.auth.test();
  return new Promise<string>((resolve) => {
    if (authResult.bot_id != null) {
      resolve(authResult.bot_id as string);
    }
    // If a user token was used for auth.test, there is no bot_id
    // return an empty string in this case
    resolve('');
  });
}
