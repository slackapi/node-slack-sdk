import { IncomingMessage, ServerResponse } from 'http';
import { sign, verify } from 'jsonwebtoken';
import { WebAPICallResult, WebClient, WebClientOptions } from '@slack/web-api';
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
  private clientOptions: WebClientOptions;
  private authorizationUrl: string;

  constructor({
    clientId,
    clientSecret,
    stateSecret = undefined,
    stateStore = undefined,
    installationStore = new MemoryInstallationStore(),
    authVersion = 'v2',
    logger = undefined,
    logLevel = LogLevel.INFO,
    clientOptions = {},
    authorizationUrl = 'https://slack.com/oauth/v2/authorize',
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
    this.authVersion = authVersion;

    this.authorizationUrl = authorizationUrl;
    if (authorizationUrl !== 'https://slack.com/oauth/v2/authorize' && authVersion === 'v1') {
      this.logger.info('You provided both an authorizationUrl and an authVersion! The authVersion will be ignored in favor of the authorizationUrl.');
    } else if (authVersion === 'v1') {
      this.authorizationUrl = 'https://slack.com/oauth/authorize';
    }

    this.clientOptions = {
      logLevel: this.logger.getLevel(),
      ...clientOptions,
    };
  }

  /**
   * Fetches data from the installationStore for non Org Installations.
   */
  public async authorize(source: InstallationQuery<boolean>): Promise<AuthorizeResult> {
    try {
      let queryResult;
      if (source.isEnterpriseInstall) {
        queryResult = await this.installationStore.fetchInstallation(source as InstallationQuery<true>, this.logger);
      } else {
        queryResult = await this.installationStore.fetchInstallation(source as InstallationQuery<false>, this.logger);
      }

      if (queryResult === undefined) {
        throw new Error('Failed fetching data from the Installation Store');
      }

      const authResult: AuthorizeResult = {};
      authResult.userToken = queryResult.user.token;

      if (queryResult.team !== undefined) {
        authResult.teamId = queryResult.team.id;
      } else if (source.teamId !== undefined) {
        /**
         *  since queryResult is a org installation, it won't have team.id. If one was passed in via source,
         *  we should add it to the authResult
         */
        authResult.teamId = source.teamId;
      }

      if (queryResult.enterprise !== undefined) {
        authResult.enterpriseId = queryResult.enterprise.id;
      } else if (source.enterpriseId !== undefined) {
        authResult.enterpriseId = source.enterpriseId;
      }

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

    const slackURL = new URL(this.authorizationUrl);

    if (options.scopes === undefined) {
      throw new GenerateInstallUrlError('You must provide a scope parameter when calling generateInstallUrl');
    }

    // scope
    let scopes: string;
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
      let userScopes: string;
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
      const client = new WebClient(undefined, this.clientOptions);

      // Start: Build the installation object
      let installation: Installation;
      let resp: OAuthV1Response | OAuthV2Response;
      if (this.authVersion === 'v1') {
        // convert response type from WebApiCallResult to OAuthResponse
        const v1Resp = await client.oauth.access({
          code,
          client_id: this.clientId,
          client_secret: this.clientSecret,
          redirect_uri: installOptions.redirectUri,
        }) as OAuthV1Response;

        // resp obj for v1 - https://api.slack.com/methods/oauth.access#response
        const v1Installation: Installation<'v1', false> = {
          team: { id: v1Resp.team_id, name: v1Resp.team_name },
          enterprise: v1Resp.enterprise_id === null ? undefined : { id: v1Resp.enterprise_id },
          user: {
            token: v1Resp.access_token,
            scopes: v1Resp.scope.split(','),
            id: v1Resp.user_id,
          },

          // synthesized properties: enterprise installation is unsupported in v1 auth
          isEnterpriseInstall: false,
          authVersion: 'v1',
        };

        // only can get botId if bot access token exists
        // need to create a botUser + request bot scope to have this be part of resp
        if (v1Resp.bot !== undefined) {
          const authResult = await runAuthTest(v1Resp.bot.bot_access_token, this.clientOptions);
          // We already tested that a bot user was in the response, so we know the following bot_id will be defined
          const botId = authResult.bot_id as string;

          v1Installation.bot = {
            id: botId,
            scopes: ['bot'],
            token: v1Resp.bot.bot_access_token,
            userId: v1Resp.bot.bot_user_id,
          };
        }

        resp = v1Resp;
        installation = v1Installation;
      } else {
        // convert response type from WebApiCallResult to OAuthResponse
        const v2Resp = await client.oauth.v2.access({
          code,
          client_id: this.clientId,
          client_secret: this.clientSecret,
          redirect_uri: installOptions.redirectUri,
        }) as OAuthV2Response;

        // resp obj for v2 - https://api.slack.com/methods/oauth.v2.access#response
        const v2Installation: Installation<'v2', boolean> = {
          team: v2Resp.team === null ? undefined : v2Resp.team,
          enterprise: v2Resp.enterprise == null ? undefined : v2Resp.enterprise,
          user: {
            token: v2Resp.authed_user.access_token,
            scopes: v2Resp.authed_user.scope?.split(','),
            id: v2Resp.authed_user.id,
          },
          tokenType: v2Resp.token_type,
          isEnterpriseInstall: v2Resp.is_enterprise_install,
          appId: v2Resp.app_id,

          // synthesized properties
          authVersion: 'v2',
        };

        if (v2Resp.access_token !== undefined && v2Resp.scope !== undefined && v2Resp.bot_user_id !== undefined) {
          // A bot user/scope was requested
          const authResult = await runAuthTest(v2Resp.access_token, this.clientOptions);
          v2Installation.bot = {
            scopes: v2Resp.scope.split(','),
            token: v2Resp.access_token,
            userId: v2Resp.bot_user_id,
            id: authResult.bot_id as string,
          };

          if (v2Resp.is_enterprise_install) {
            // if it is an org enterprise install, add the enterprise url
            v2Installation.enterpriseUrl = authResult.url;
          }

        } else if (v2Resp.authed_user.access_token !== undefined) {
          // Only user scopes were requested
          // TODO: confirm if it is possible to do an org enterprise install without a bot user
          const authResult = await runAuthTest(v2Resp.authed_user.access_token, this.clientOptions);
          if (v2Resp.is_enterprise_install) {
            v2Installation.enterpriseUrl = authResult.url;
          }
        } else {
          // TODO: make this a coded error
          throw new Error('The response from the authorization URL contained inconsistent information. Please file a bug.');
        }

        resp = v2Resp;
        installation = v2Installation;
      }

      if (resp.incoming_webhook !== undefined) {
        installation.incomingWebhook = {
          url: resp.incoming_webhook.url,
          channel: resp.incoming_webhook.channel,
          channelId: resp.incoming_webhook.channel_id,
          configurationUrl: resp.incoming_webhook.configuration_url,
        };
      }
      // End: Build the installation object

      // Save installation object to installation store
      if (installation.isEnterpriseInstall) {
        await this.installationStore.storeInstallation(installation as OrgInstallation, this.logger);
      } else {
        await this.installationStore.storeInstallation(installation as Installation<'v1' | 'v2', false>, this.logger);
      }

      // Call the success callback
      if (options !== undefined && options.success !== undefined) {
        this.logger.debug('calling passed in options.success');
        options.success(installation, installOptions, req, res);
      } else {
        this.logger.debug('run built-in success function');
        callbackSuccess(installation, installOptions, req, res);
      }
    } catch (error) {
      this.logger.error(error);

      // Call the failure callback
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

export interface InstallProviderOptions {
  clientId: string;
  clientSecret: string;
  stateStore?: StateStore; // default ClearStateStore
  stateSecret?: string; // ClearStateStoreOptions['secret']; // required when using default stateStore
  installationStore?: InstallationStore; // default MemoryInstallationStore
  authVersion?: 'v1' | 'v2'; // default 'v2'
  logger?: Logger;
  logLevel?: LogLevel;
  clientOptions?: Omit<WebClientOptions, 'logLevel' | 'logger'>;
  authorizationUrl?: string;
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
  storeInstallation<AuthVersion extends 'v1' | 'v2'>(
    installation: Installation<AuthVersion, boolean>,
    logger?: Logger): Promise<void>;
  fetchInstallation:
    (query: InstallationQuery<boolean>, logger?: Logger) => Promise<Installation<'v1' | 'v2', boolean>>;
}

// using a javascript object as a makeshift database for development
interface DevDatabase {
  [teamIdOrEnterpriseId: string]: Installation;
}

// Default Install Store. Should only be used for development
class MemoryInstallationStore implements InstallationStore {
  public devDB: DevDatabase = {};

  public async storeInstallation(installation: Installation, logger?: Logger): Promise<void> {
    // NOTE: installations on a single workspace that happen to be within an enterprise organization are stored by
    // the team ID as the key
    // TODO: what about installations on an enterprise (acting as a single workspace) with `admin` scope, which is not
    // an org install?
    if (logger !== undefined) {
      logger.warn('Storing Access Token. Please use a real Installation Store for production!');
    }

    if (isOrgInstall(installation)) {
      if (logger !== undefined) {
        logger.debug('storing org installation');
      }
      this.devDB[installation.enterprise.id] = installation;
    } else if (isNotOrgInstall(installation)) {
      if (logger !== undefined) {
        logger.debug('storing single team installation');
      }
      this.devDB[installation.team.id] = installation;
    } else {
      throw new Error('Failed saving installation data to installationStore');
    }
  }

  public async fetchInstallation(
    query: InstallationQuery<boolean>,
    logger?: Logger): Promise<Installation<'v1' | 'v2'>> {
    if (logger !== undefined) {
      logger.warn('Retrieving Access Token from DB. Please use a real Installation Store for production!');
    }
    if (query.isEnterpriseInstall) {
      if (query.enterpriseId !== undefined) {
        if (logger !== undefined) {
          logger.debug('fetching org installation');
        }
        return this.devDB[query.enterpriseId] as OrgInstallation;
      }
    }
    if (query.teamId !== undefined) {
      if (logger !== undefined) {
        logger.debug('fetching single team installation');
      }
      return this.devDB[query.teamId] as Installation<'v1' | 'v2', false>;
    }
    throw new Error('Failed fetching installation');
  }
}

/**
 * An individual installation of the Slack app.
 *
 * This interface creates a representation for installations that normalizes the responses from OAuth grant exchanges
 * across auth versions (responses from the Web API methods `oauth.v2.access` and `oauth.access`). It describes some of
 * these differences using the `AuthVersion` generic placeholder type.
 *
 * This interface also represents both installations which occur on individual Slack workspaces and on Slack enterprise
 * organizations. The `IsEnterpriseInstall` generic placeholder type is used to describe some of those differences.
 *
 * This representation is designed to be used both when producing data that should be stored by an InstallationStore,
 * and when consuming data that is fetched from an InstallationStore. Most often, InstallationStore implementations
 * are a database. If you are going to implement an InstallationStore, it's advised that you **store as much of the
 * data in these objects as possible so that you can return as much as possible inside `fetchInstallation()`**.
 *
 * A few properties are synthesized with a default value if they are not present when returned from
 * `fetchInstallation()`. These properties are optional in the interface so that stored installations from previous
 * versions of this library (from before those properties were introduced) continue to work without requiring a breaking
 * change. However the synthesized default values are not always perfect and are based on some assumptions, so this is
 * why it's recommended to store as much of that data as possible in any InstallationStore.
 *
 * Some of the properties (e.g. `team.name`) can change between when the installation occurred and when it is fetched
 * from the InstallationStore. This can be seen as a reason not to store those properties. In most workspaces these
 * properties rarely change, and for most Slack apps having a slightly out of date value has no impact. However if your
 * app uses these values in a way where it must be up to date, it's recommended to implement a caching strategy in the
 * InstallationStore to fetch the latest data from the Web API (using methods such as `auth.test`, `teams.info`, etc.)
 * as often as it makes sense for your Slack app.
 *
 * TODO: IsEnterpriseInstall is always false when AuthVersion is v1
 */
export interface Installation<AuthVersion extends ('v1' | 'v2') = ('v1' | 'v2'),
  IsEnterpriseInstall extends boolean = boolean> {
  /**
   * TODO: when performing a “single workspace” install with the admin scope on the enterprise,
   * is the team property returned from oauth.access?
   */
  team: IsEnterpriseInstall extends true ? undefined : {
    id: string;
    /** Left as undefined when not returned from fetch. */
    name?: string;
  };

  /**
   * When the installation is an enterprise install or when the installation occurs on the org to acquire `admin` scope,
   * the name and ID of the enterprise org.
   */
  enterprise: IsEnterpriseInstall extends true ? EnterpriseInfo : (EnterpriseInfo | undefined);

  user: {
    token: AuthVersion extends 'v1' ? string : (string | undefined);
    scopes: AuthVersion extends 'v1' ? string[] : (string[] | undefined);
    id: string;
  };

  bot?: {
    token: string;
    scopes: string[];
    id: string; // retrieved from auth.test
    userId: string;
  };
  incomingWebhook?: {
    url: string;
    /** Left as undefined when not returned from fetch. */
    channel?: string;
    /** Left as undefined when not returned from fetch. */
    channelId?: string;
    /** Left as undefined when not returned from fetch. */
    configurationUrl?: string;
  };

  /** The App ID, which does not vary per installation. Left as undefined when not returned from fetch. */
  appId?: AuthVersion extends 'v2' ? string : undefined;

  /** When the installation contains a bot user, the token type. Left as undefined when not returned from fetch. */
  tokenType?: 'bot';

  /**
   * When the installation is an enterprise org install, the URL of the landing page for all workspaces in the org.
   * Left as undefined when not returned from fetch.
   */
  enterpriseUrl?: AuthVersion extends 'v2' ? string : undefined;

  /** Whether the installation was performed on an enterprise org. Synthesized as `false` when not present. */
  isEnterpriseInstall?: IsEnterpriseInstall;

  /** The version of Slack's auth flow that produced this installation. Synthesized as `v2` when not present. */
  authVersion?: AuthVersion;
}

/**
 * A type to describe enterprise organization installations.
 */
export type OrgInstallation = Installation<'v2', true>;

interface EnterpriseInfo {
  id: string;
  /* Not defined in v1 auth version. Left as undefined when not returned from fetch. */
  name?: string;
}

// This is intentionally structurally identical to AuthorizeSourceData
// from App. It is redefined so that this class remains loosely coupled to
// the rest of Bolt.
export interface InstallationQuery<isEnterpriseInstall extends boolean> {
  teamId: isEnterpriseInstall extends false ? string : undefined;
  enterpriseId: isEnterpriseInstall extends true ? string : (string | undefined);
  userId?: string;
  conversationId?: string;
  isEnterpriseInstall: isEnterpriseInstall;
}

export type OrgInstallationQuery = InstallationQuery<true>;

// This is intentionally structurally identical to AuthorizeResult from App
// It is redefined so that this class remains loosely coupled to the rest
// of Bolt.
export interface AuthorizeResult {
  botToken?: string;
  userToken?: string;
  botId?: string;
  botUserId?: string;
  teamId?: string;
  enterpriseId?: string;
}

// Default function to call when OAuth flow is successful
function callbackSuccess(
  installation: Installation,
  _options: InstallURLOptions | undefined,
  _req: IncomingMessage,
  res: ServerResponse,
): void {
  let redirectUrl: string;

  if (isNotOrgInstall(installation) && installation.appId !== undefined) {
    // redirect back to Slack native app
    // Changes to the workspace app was installed to, to the app home
    redirectUrl = `slack://app?team=${installation.team.id}&id=${installation.appId}`;
  } else if (isOrgInstall(installation)) {
    // redirect to Slack app management dashboard
    redirectUrl = `${installation.enterpriseUrl}manage/organization/apps/profile/${installation.appId}/workspaces/add`;
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
async function runAuthTest(token: string, clientOptions: WebClientOptions): Promise<AuthTestResult> {
  const client = new WebClient(token, clientOptions);
  const authResult = await client.auth.test();
  return authResult as any as AuthTestResult;
}

// Type guard to narrow Installation type to OrgInstallation
function isOrgInstall(installation: Installation): installation is OrgInstallation {
  return installation.isEnterpriseInstall || false;
}

function isNotOrgInstall(installation: Installation): installation is Installation<'v1' | 'v2', false> {
  return !(isOrgInstall(installation));
}

// Response shape from oauth.v2.access - https://api.slack.com/methods/oauth.v2.access#response
interface OAuthV2Response extends WebAPICallResult {
  app_id: string;
  authed_user: {
    id: string,
    scope?: string,
    access_token?: string,
    token_type?: string,
  };
  scope?: string;
  token_type?: 'bot';
  access_token?: string;
  bot_user_id?: string;
  team: { id: string, name: string } | null;
  enterprise: { name: string, id: string } | null;
  is_enterprise_install: boolean;
  incoming_webhook?: {
    url: string,
    channel: string,
    channel_id: string,
    configuration_url: string,
  };
}

// Response shape from oauth.access - https://api.slack.com/methods/oauth.access#response
interface OAuthV1Response extends WebAPICallResult {
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
  // app_id is currently undefined but leaving it in here incase the v1 method adds it
  app_id: string | undefined;
  // TODO: removed optional because logically there's no case where a user_id cannot be provided, but needs verification
  user_id: string; // Not documented but showing up on responses
}

interface AuthTestResult extends WebAPICallResult {
  bot_id?: string;
  url?: string;
}

export { Logger, LogLevel } from './logger';
