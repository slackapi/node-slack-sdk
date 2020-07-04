import { IncomingMessage, ServerResponse } from 'http';
import { sign, verify } from 'jsonwebtoken';
import { WebClient } from '@slack/web-api';
import {
  CodedError,
  InstallerInitializationError,
  UnknownError,
  MissingStateError,
  GenerateInstallUrlError,
  AuthorizationError,
} from './errors';
import { parse as parseUrl, URLSearchParams, URL } from 'url';
import { Logger, LogLevel, getLogger } from './logger';

/**
 * InstallProvider Class.
 * @param clientId - Your apps client ID
 * @param clientSecret - Your apps client Secret
 * @param stateSecret - Used to sign and verify the generated state when using the built-in `stateStore`
 * @param stateStore - Replacement function for the built-in `stateStore`
 * @param installationStore - Interface to store and retrieve installation data from the database
 * @param authVersion - Can be either `v1` or `v2`. Determines which slack Oauth URL and method to use
 * @param logger - Pass in your own Logger if you don't want to use the built-in one
 * @param logLevel - Pass in the log level you want (ERROR, WARN, INFO, DEBUG). Default is INFO
 */
export class InstallProvider {
  public stateStore: StateStore;
  public installationStore: InstallationStore;
  private clientId: string;
  private clientSecret: string;
  private authVersion: string;
  private logger: Logger;

  constructor({
    clientId,
    clientSecret,
    stateSecret = undefined,
    stateStore = undefined,
    installationStore = new MemoryInstallationStore(),
    authVersion = 'v2',
    logger = undefined,
    logLevel = LogLevel.INFO,
  }: InstallProviderOptions) {

    if (clientId === undefined || clientSecret === undefined) {
      throw new InstallerInitializationError('You must provide a valid clientId and clientSecret');
    }

    // Setup the logger
    if (typeof logger !== 'undefined') {
      this.logger = logger;
      if (typeof logLevel !== 'undefined') {
        this.logger.debug('The logLevel given to OAuth was ignored as you also gave logger');
      }
    } else {
      this.logger = getLogger('OAuth:InstallProvider', logLevel, logger);
    }

    // Setup stateStore
    if (stateStore !== undefined) {
      this.stateStore = stateStore;
    } else if (stateSecret === undefined) {
      throw new InstallerInitializationError('You must provide a State Secret to use the built-in state store');
    } else {
      this.stateStore = new ClearStateStore(stateSecret);
    }

    this.installationStore = installationStore;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.handleCallback = this.handleCallback.bind(this);
    this.authorize = this.authorize.bind(this);
    this.orgAuthorize = this.orgAuthorize.bind(this);
    this.authVersion = authVersion;
  }

  /**
   * Fetches data from the installationStore for non Org Installations.
   */
  public async authorize(source: InstallationQuery): Promise<AuthorizeResult> {
    try {
      const queryResult = await this.installationStore.fetchInstallation(source, this.logger);

      if (queryResult === undefined) {
        throw new Error('Failed fetching data from the Installation Store');
      }

      const authResult: AuthorizeResult = {};
      authResult.userToken = queryResult.user.token;
      authResult.teamId = queryResult.team.id;
      if (queryResult.bot !== undefined) {
        authResult.botToken = queryResult.bot.token;
        authResult.botId = queryResult.bot.id;
        authResult.botUserId = queryResult.bot.userId;
      }

      return authResult;
    } catch (error) {
      throw new AuthorizationError(error.message);
    }
  }

  /**
   * Fetches data from the installationStore for Org Installations.
   */
  public async orgAuthorize(source: OrgInstallationQuery): Promise<AuthorizeResult> {
    try {
      if (this.installationStore.fetchOrgInstallation === undefined) {
        throw new Error('Installation Store is missing the fetchOrgInstallation method');
      }

      const queryResult = await this.installationStore.fetchOrgInstallation(source, this.logger);

      if (queryResult === undefined) {
        throw new Error('Failed fetching data from the Installation Store');
      }

      const authResult: AuthorizeResult = {};
      authResult.userToken = queryResult.user.token;
      if (queryResult.bot !== undefined) {
        authResult.botToken = queryResult.bot.token;
        authResult.botId = queryResult.bot.id;
        authResult.botUserId = queryResult.bot.userId;
      }

      return authResult;
    } catch (error) {
      throw new AuthorizationError(error.message);
    }
  }

  /**
   * Returns a URL that is suitable for including in an Add to Slack button
   * Uses stateStore to generate a value for the state query param.
   */
  public async generateInstallUrl(options: InstallURLOptions): Promise<string> {

    // Base URL
    const slackURL = new URL('https://slack.com/oauth/v2/authorize');
    if (this.authVersion === 'v1') {
      slackURL.href = 'https://slack.com/oauth/authorize';
    }

    if (options.scopes === undefined) {
      throw new GenerateInstallUrlError('You must provide a scope parameter when calling generateInstallUrl');
    }

    // scope
    let scopes;
    if (options.scopes instanceof Array) {
      scopes = options.scopes.join(',');
    } else {
      scopes = options.scopes;
    }
    const params = new URLSearchParams(`scope=${scopes}`);

    // generate state
    const state = await this.stateStore.generateStateParam(options, new Date());
    params.append('state', state);

    // client id
    params.append('client_id', this.clientId);

    // redirect uri
    if (options.redirectUri !== undefined) {
      params.append('redirect_uri', options.redirectUri);
    }

    // team id
    if (options.teamId !== undefined) {
      params.append('team', options.teamId);
    }

    // user scope, only available for OAuth v2
    if (options.userScopes !== undefined && this.authVersion === 'v2') {
      let userScopes;
      if (options.userScopes instanceof Array) {
        userScopes = options.userScopes.join(',');
      } else {
        userScopes = options.userScopes;
      }
      params.append('user_scope', userScopes);
    }

    slackURL.search = params.toString();
    return slackURL.toString();
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
    let installOptions: InstallURLOptions;

    try {
      if (req.url !== undefined) {
        parsedUrl = parseUrl(req.url, true);
        code = parsedUrl.query.code as string;
        state = parsedUrl.query.state as string;
        if (state === undefined || state === '' || code === undefined) {
          throw new MissingStateError('redirect url is missing state or code query parameters');
        }
      } else {
        throw new UnknownError('Something went wrong');
      }

      installOptions = await this.stateStore.verifyStateParam(new Date(), state);
      const client = new WebClient();

      let resp;
      let installation: Installation | OrgInstallation;
      if (this.authVersion === 'v1') {
        // convert response type from WebApiCallResult to OAuthResponse
        resp = await client.oauth.access({
          code,
          client_id: this.clientId,
          client_secret: this.clientSecret,
          redirect_uri: installOptions.redirectUri,
        }) as unknown as OAuthV1Response;

        // resp obj for v1 - https://api.slack.com/methods/oauth.access#response
        installation = {
          team: { id: resp.team_id, name: resp.team_name },
          appId: resp.app_id, // not included in v1 unless workspace apps, so most likely undefined
          user: {
            token: resp.access_token,
            scopes: resp.scope.split(','),
            id: '', // Todo: no value for this
          },
        };

        // only can get botId if bot access token exists
        // need to create a botUser + request bot scope to have this be part of resp
        if (resp.bot !== undefined) {
          const botId = await getBotId(resp.bot.bot_access_token);
          installation.bot = {
            id: botId,
            scopes: ['bot'],
            token: resp.bot.bot_access_token,
            userId: resp.bot.bot_user_id,
          };
        }

        if (resp.enterprise_id !== null) {
          installation.enterprise = {
            id: resp.enterprise_id,
          };
        }
      } else {
        // convert response type from WebApiCallResult to OAuthResponse
        resp = await client.oauth.v2.access({
          code,
          client_id: this.clientId,
          client_secret: this.clientSecret,
          redirect_uri: installOptions.redirectUri,
        }) as unknown as OAuthV2Response;

        // get botId
        const botId = await getBotId(resp.access_token);

        // resp obj for v2 - https://api.slack.com/methods/oauth.v2.access#response

        if (resp.is_enterprise_install) {
          // org installation
          installation = {
            enterprise: resp.enterprise!,
            appId: resp.app_id,
            user: {
              token: resp.authed_user.access_token,
              scopes: resp.authed_user.scope !== undefined ? resp.authed_user.scope.split(',') : undefined,
              id: resp.authed_user.id,
            },
            bot: {
              scopes: resp.scope.split(','),
              token: resp.access_token,
              userId: resp.bot_user_id,
              id: botId,
            },
            tokenType: resp.token_type,
            isEnterpriseInstall: resp.is_enterprise_install,
          };
        } else {
          // workspace or non org enterprise installation
          installation = {
            team: resp.team!,
            ...(resp.enterprise !== null && resp.enterprise !== undefined) ? { enterprise: resp.enterprise } : {},
            appId: resp.app_id,
            user: {
              token: resp.authed_user.access_token,
              scopes: resp.authed_user.scope !== undefined ? resp.authed_user.scope.split(',') : undefined,
              id: resp.authed_user.id,
            },
            bot: {
              scopes: resp.scope.split(','),
              token: resp.access_token,
              userId: resp.bot_user_id,
              id: botId,
            },
            tokenType: resp.token_type,
            ...(resp.is_enterprise_install !== undefined) ? { isEnterpriseInstall: resp.is_enterprise_install } : {},
          };
        }
      }

      if (resp.incoming_webhook !== undefined) {
        installation.incomingWebhook = {
          url: resp.incoming_webhook.url,
          channel: resp.incoming_webhook.channel,
          channelId: resp.incoming_webhook.channel_id,
          configurationUrl: resp.incoming_webhook.configuration_url,
        };
      }

      if (installation.isEnterpriseInstall) {
        if (this.installationStore.storeOrgInstallation === undefined) {
          throw new Error('Installation store is missing the storeOrgInstallation method');
        }
        // save token to orgInstallationStore
        await this.installationStore.storeOrgInstallation(installation as OrgInstallation, this.logger);
      } else {
        // save token to InstallationStore
        await this.installationStore.storeInstallation(installation as Installation, this.logger);
      }

      if (options !== undefined && options.success !== undefined) {
        this.logger.debug('calling passed in options.success');
        options.success(installation, installOptions, req, res);
      } else {
        this.logger.debug('run built-in success function');
        callbackSuccess(installation, installOptions, req, res);
      }
    } catch (error) {
      this.logger.error(error);
      if (options !== undefined && options.failure !== undefined) {
        this.logger.debug('calling passed in options.failure');
        options.failure(error, installOptions!, req, res);
      } else {
        this.logger.debug('run built-in failure function');
        callbackFailure(error, installOptions!, req, res);
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

export interface InstallURLOptions {
  scopes: string | string[];
  teamId?: string;
  redirectUri?: string;
  userScopes?: string | string[]; // cannot be used with authVersion=v1
  metadata?: string; // Arbitrary data can be stored here, potentially to save app state or use for custom redirect
}

export interface CallbackOptions {
  // success is given control after handleCallback() has stored the
  // installation. when provided, this function must complete the
  // callbackRes.
  success?: (
    installation: Installation | OrgInstallation,
    options: InstallURLOptions,
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
  team: { id: string, name: string } | null;
  enterprise: { name: string, id: string } | null;
  is_enterprise_install: boolean;
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
  // app_id is currently undefined but leaving it in here incase the v1 method adds it
  app_id: string | undefined;
}

export interface StateStore {
  // Returned Promise resolves for a string which can be used as an
  // OAuth state param.
  generateStateParam: (installOptions: InstallURLOptions, now: Date) => Promise<string>;

  // Returned Promise resolves for InstallURLOptions that were stored in the state
  // param. The Promise rejects with a CodedError when the state is invalid.
  verifyStateParam: (now: Date, state: string) => Promise<InstallURLOptions>;
}

// State object structure
interface StateObj {
  now: Date;
  installOptions: InstallURLOptions;
}

// default implementation of StateStore
class ClearStateStore implements StateStore {
  private stateSecret: string;
  public constructor(stateSecret: string) {
    this.stateSecret = stateSecret;
  }

  public async generateStateParam(installOptions: InstallURLOptions, now: Date): Promise<string> {
    const state = sign({ installOptions, now: now.toJSON() }, this.stateSecret);
    return state;
  }
  public async verifyStateParam(_now: Date, state: string): Promise<InstallURLOptions> {
    // decode the state using the secret
    const decoded: StateObj = verify(state, this.stateSecret) as StateObj;

    // return installOptions
    return decoded.installOptions;
  }
}

export interface InstallationStore {
  storeInstallation: (installation: Installation, logger?: Logger) => Promise<void>;
  storeOrgInstallation?: (installation: OrgInstallation, logger?: Logger) => Promise<void>;
  fetchInstallation: (query: InstallationQuery, logger?: Logger) => Promise<Installation>;
  fetchOrgInstallation?: (query: OrgInstallationQuery, logger?: Logger) => Promise<OrgInstallation>;
}

// using a javascript object as a makeshift database for development
interface DevDatabase {
  [key: string]: Installation | OrgInstallation;
}

// Default Install Store. Should only be used for development
class MemoryInstallationStore implements InstallationStore {
  public devDB: DevDatabase = {};

  public async storeInstallation(installation: Installation, logger?: Logger): Promise<void> {
    if (logger !== undefined) {
      logger.warn('Storing Access Token. Please use a real Installation Store for production!');
    }

    // db write
    if (isNotOrgInstall(installation)) {
      this.devDB[installation.team.id] = installation;
    } else {
      throw new Error('Failed saving installation data to installationStore');
    }

    return Promise.resolve();
  }

  public async storeOrgInstallation(installation: OrgInstallation, logger?: Logger): Promise<void> {
    if (logger !== undefined) {
      logger.warn('Storing Access Token. Please use a real Installation Store for production!');
    }

    // db write
    if (installation.isEnterpriseInstall) {
      this.devDB[installation.enterprise.id] = installation;
    } else {
      throw new Error('Failed saving installation data to installationStore');
    }

    return Promise.resolve();
  }

  // non org app lookup
  public async fetchInstallation(query: InstallationQuery, logger?: Logger): Promise<Installation> {
    if (logger !== undefined) {
      logger.warn('Retrieving Access Token from DB. Please use a real Installation Store for production!');
    }

    if (query.teamId !== undefined) {
      return this.devDB[query.teamId] as Installation;
    }
    throw new Error('Failed fetching installation');
  }

  // enterprise org app installation lookup
  public async fetchOrgInstallation(query: OrgInstallationQuery, logger?: Logger): Promise<OrgInstallation> {
    if (logger !== undefined) {
      logger.warn('Retrieving Access Token from DB. Please use a real Installation Store for production!');
    }

    if (query.enterpriseId !== undefined) {
      return this.devDB[query.enterpriseId] as OrgInstallation;
    }
    throw new Error('Failed fetching installation');
  }
}

// Needs to have all the data from OAuthV2Access result and OAuthAccess
// result. This is a normalized shape.
export interface Installation {
  team: {
    id: string;
    name: string;
  };
  enterprise?: {
    id: string;
    name?: string;
  };
  isEnterpriseInstall?: boolean;
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

// this shape is for org installed apps
export interface OrgInstallation {
  enterprise: {
    id: string;
    name?: string;
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
  isEnterpriseInstall: boolean;
}

// This is intentionally structurally identical to AuthorizeSourceData
// from App. It is redefined so that this class remains loosely coupled to
// the rest of Bolt.
export interface InstallationQuery {
  teamId: string;
  enterpriseId?: string;
  userId?: string;
  conversationId?: string;
}

// NOTE: `enterpriseId` is no longer optional, and `teamId` is optional
export interface OrgInstallationQuery {
  enterpriseId: string;
  teamId?: string;
  userId?: string;
  conversationId?: string;
}

// This is intentionally structurally identical to AuthorizeResult from App
// It is redefined so that this class remains loosely coupled to the rest
// of Bolt.
export interface AuthorizeResult {
  botToken?: string;
  userToken?: string;
  botId?: string;
  botUserId?: string;
  teamId?: string;
}

// Default function to call when OAuth flow is successful
function callbackSuccess(
  installation: Installation | OrgInstallation,
  _options: InstallURLOptions | undefined,
  _req: IncomingMessage,
  res: ServerResponse,
): void {
  let redirectUrl;

  if (isNotOrgInstall(installation) && installation.appId !== undefined) {
    // redirect back to Slack native app
    // Changes to the workspace app was installed to, to the app home
    redirectUrl = `slack://app?team=${installation.team.id}&id=${installation.appId}`;
  } else {
    // redirect back to Slack native app
    // does not change the workspace the slack client was last in
    redirectUrl = 'slack://open';
  }
  const htmlResponse = `<html>
  <meta http-equiv="refresh" content="0; URL=${redirectUrl}">
  <body>
    <h1>Success! Redirecting to the Slack App...</h1>
    <button onClick="window.location = '${redirectUrl}'">Click here to redirect</button>
  </body></html>`;
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(htmlResponse);
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
  if (authResult.bot_id !== undefined) {
    return authResult.bot_id as string;
  }
  // If a user token was used for auth.test, there is no bot_id
  // return an empty string in this case
  return '';
}

// type guard to confirm an installation isn't an OrgInstallation
function isNotOrgInstall(installation: Installation | OrgInstallation): installation is Installation {
  return (installation as Installation).team !== undefined && (installation as Installation).team !== null;
}

export { Logger, LogLevel } from './logger';
