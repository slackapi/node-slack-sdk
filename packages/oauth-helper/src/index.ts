
// TODO: Not using RequestListner, should I?
import { RequestListener, IncomingMessage, ServerResponse } from 'http';
import { sign, verify } from 'jsonwebtoken';
import { WebClient } from '@slack/web-api';
import { errorWithCode, CodedError } from './errors';
import * as url from 'url';

export class InstallProvider {
  public stateStore: StateStore;
  public installationStore: InstallationStore;
  private clientId: string;
  private clientSecret: string;
  private authVersion: string;
  // Use Definite Assignment Assertions here because this gets set in generateInstallUrl
  private installOptions!: InstallURLOptions;

  public constructor({
    clientId = '',
    clientSecret = '',
    stateSecret = undefined,
    stateStore = new ClearStateStore(stateSecret),
    installationStore = new MemoryInstallStore(),
    authVersion = 'v2'}: InstallProviderOptions) {

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
    const queryResult = await this.installationStore.fetchInstallation(source);

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
    console.log('handleCallback');
    console.log(options);
    let parsedUrl;
    let code: string = '';
    let state: string = '';

    if (req.url != null) {
      parsedUrl = url.parse(req.url, true);
      code = parsedUrl.query.code as string;
      state = parsedUrl.query.state as string;
    }
    console.log('code', code);
    console.log('state', state);

    try {
      const metadata = await this.stateStore.verifyStateParam(new Date(), state);
      console.log(metadata);

      const client = new WebClient('');

      let resp;
      let installation: Installation;
      console.log('authVersion', this.authVersion);
      if (this.authVersion === 'v1') {
        // convert response type from WebApiCallResult to OAuthResponse
        resp = await client.oauth.access({
          code,
          client_id: this.clientId,
          client_secret: this.clientSecret,
        }) as unknown as OAuthV1Response;

        // TODO: need to get appID
        // resp obj for v1 - https://api.slack.com/methods/oauth.access#response
        // TODO: look into getting bot.id added to platform response
        // check if it already exists for v1
        installation = {
          team: { id: resp.team_id, name: resp.team_name },
          appId: undefined, // not included in v1 unless workspace apps, so most likely undefinied
          user: {
            token: resp.access_token,
            scopes: resp.scope.split(','),
            id: '',
          },
          bot: {
            // TODO is this correct?
            scopes: resp.scope.split(','),
            token: resp.bot != null ? resp.bot.bot_access_token : '',
            userId: resp.bot != null ? resp.bot.bot_user_id : '',
            id: '',
          },
          // TODO default should be user?
          tokenType: 'user',
        };
      } else {
        // convert response type from WebApiCallResult to OAuthResponse
        resp = await client.oauth.v2.access({
          code,
          client_id: this.clientId,
          client_secret: this.clientSecret,
        }) as unknown as OAuthV2Response;

        // resp obj for v2 - https://api.slack.com/methods/oauth.v2.access#response
        // TODO: look into getting bot.id added to platform response
        // check if it already exists for v1
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
            id: '', // not currently included
          },
          tokenType: resp.token_type,
        };
      }

      // save access code to installationStore
      await this.installationStore.storeInstallation(installation);
      if (options != null && options.success != null) {
        console.log('calling options.sucess');
        options.success(installation, metadata, req, res);
      } else {
        // call our default callbackSuccess function
        callbackSuccess(installation, metadata, req, res);
      }
    } catch (error) {
      console.log(error);
      if (options != null && options.failure != null) {
        console.log('calling options.failure');
        options.failure(error, this.installOptions , req, res);
      } else {
        console.log('run custom failure function');
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
  installationStore?: InstallationStore; // default MemoryInstallStore
  authVersion: 'v1' | 'v2'; // default 'v2'
}

interface InstallURLOptions {
  scopes: string | string[];
  teamId?: string;
  redirectUri?: string;
  userScopes?: string | string[]; // cannot be used with authVersion=v1
  metadata?: string;
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
  response_metadata: object;
}

interface StateStore {
  // Returned Promise resolves for a string which can be used as an
  // OAuth state param.
  generateStateParam: (now: Date, secret: string | undefined, metadata?: string) => Promise<string>;

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
  // todo: remove need for default string value here
  public constructor(stateSecret: string | undefined) {
    if (stateSecret == null) {
      throw new Error('You must provide a State Secret to use the built-in state store');
    }
    this.stateSecret = stateSecret;
  }

  // TODO: Question, why do the params below need to have types definied
  // instead of getting those types from StateStore interface
  public generateStateParam(now: Date, metadata?: string): Promise<string> {
    console.log('clear store generate state param');
    const state = sign({ metadata, now: now.toJSON() }, this.stateSecret);
    return new Promise<string>((resolve) => {
      resolve(state);
    });
  }
  public verifyStateParam(now: Date, state: string): Promise<string | undefined> {
    // decode the state using the secret
    const decoded: StateObj = verify(state, this.stateSecret) as StateObj;

    // return metadata string
    return new Promise<string | undefined>((resolve) => {
      resolve(decoded.metadata);
    });
  }
}

interface InstallationStore {
  storeInstallation: (installation: Installation) => Promise<void>;
  fetchInstallation: (query: InstallationQuery) => Promise<Installation>;
}

interface DevDatabase {
  [key: string]: Installation;
}
const devDB: DevDatabase = {};

// Default Install Store. Should only be used for development
class MemoryInstallStore implements InstallationStore {

  public storeInstallation(installation: Installation): Promise<void> {
    console.log('Storing Access Token. Please use a real Installation Store for production!');
    // db write
    devDB[installation.team.id] = installation;
    return new Promise<void>((resolve) => {
      resolve();
    });
  }

  public fetchInstallation(query: InstallationQuery): Promise<Installation> {
    console.log('Retrieving Access Token from DB. Please use a real Installation Store for production!');
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
  metadata: string | undefined,
  req: IncomingMessage,
  res: ServerResponse,
): void {
  // TODO: We never do anything with metadata. Should we?
  // TODO: this if statement doesn't match the proposal one
  // if (!classicAuth || scopes.includes('bot')
  // How do i check if something is classicAuth? and bot scope doesn't make sense here
  // TODO: Redirect only works for v2 OAuth as v1 is missing appId
  if (installation.tokenType === 'bot') {
    // redirect back to slack
    // TODO: this redirects back to workplace general instead of appHome tab
    const redirectUrl = `https://app.slack.com/client/${installation.team.id}/${installation.appId}/home`;
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
  error: CodedError,
  options: InstallURLOptions,
  req: IncomingMessage,
  res: ServerResponse,
): void {
  res.writeHead(500, { 'Content-Type': 'text/html' });
  res.end('<html><body><h1>Oops, Something Went Wrong! Please Try Again or Contact the App Owner</h1></body></html>');
}
