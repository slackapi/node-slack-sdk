import { IncomingMessage, ServerResponse } from 'http';
import { URLSearchParams, URL } from 'url';

import { WebAPICallResult, WebClient, WebClientOptions } from '@slack/web-api';

import { AuthorizeResult } from './authorize-result';
import { CallbackOptions, defaultCallbackFailure, defaultCallbackSuccess } from './callback-options';
import {
  InstallerInitializationError,
  UnknownError,
  MissingStateError,
  InvalidStateError,
  MissingCodeError,
  GenerateInstallUrlError,
  AuthorizationError,
  CodedError,
  ErrorCode,
} from './errors';
import { Installation } from './installation';
import { InstallationQuery } from './installation-query';
import { InstallURLOptions } from './install-url-options';
import { InstallProviderOptions } from './install-provider-options';
import { Logger, LogLevel, getLogger } from './logger';
import { ClearStateStore, StateStore } from './state-stores';
import { InstallationStore, MemoryInstallationStore } from './installation-stores';
import defaultRenderHtmlForInstallPath from './default-render-html-for-install-path';
import { InstallPathOptions } from './install-path-options';

/**
 * InstallProvider Class. Refer to InsallProviderOptions interface for the details of constructor arguments.
 */
export class InstallProvider {
  // Stores state issued to authorization server and
  // verifies the value returned at redirection during OAuth flow to prevent CSRF
  public stateStore?: StateStore;

  // Manages installation data, which can be called by both the OAuth flow and authorize() in event handling
  public installationStore: InstallationStore;

  // Client ID, which can be found under the Basic Information section of your application on https://api.slack.com/apps
  private clientId: string;

  // Client Secret, which can be found under the Basic Information section of your application on https://api.slack.com/apps
  private clientSecret: string;

  // The default is "v2" (a.k.a. Granular Bot Permissions), different from "v1" (a.k.a. "Classic Apps").
  // More details here:
  // - https://medium.com/slack-developer-blog/more-precision-less-restrictions-a3550006f9c3
  // - https://api.slack.com/authentication/migration
  private authVersion: string;

  // @slack/logger logging used in this class
  private logger: Logger;

  // The initialization options for the OAuth flow
  private installUrlOptions?: InstallURLOptions;

  // The install path web page rendering will be skipped if true (default: false)
  private directInstall: boolean;

  // The function for rendering the web page for the install path URL
  private renderHtmlForInstallPath: (url: string) => string;

  // The slack.com authorize URL
  private authorizationUrl: string;

  // handleCallback() verifies the state parameter if true (default: true)
  private stateVerification: boolean;

  // handleCallback() skips checking browser cookies if true (default: false)
  // Enabling this option is not really recommended.
  // This is supposed to be used only for backward-compatibility with v2.4 and olders.
  private legacyStateVerification: boolean;

  // The cookie name used for setting state parameter value in cookies
  private stateCookieName: string;

  // The expinary time for the state parameter value in cookies
  private stateCookieExpirationSeconds: number;

  // The customization options for WebClient
  private clientOptions: WebClientOptions;

  // The singleton WebClient instance, which is used in this class
  private noTokenClient: WebClient;

  public constructor({
    clientId,
    clientSecret,
    stateSecret = undefined,
    stateStore = undefined,
    stateVerification = true,
    // this option is only for the backward-compatibility with v2.4 and older
    legacyStateVerification = false,
    stateCookieName = 'slack-app-oauth-state',
    stateCookieExpirationSeconds = 600, // 10 minutes
    directInstall = false,
    installationStore = new MemoryInstallationStore(),
    // If installURLOptions is undefined here, handleInstallPath() does not work for you
    installUrlOptions = undefined,
    renderHtmlForInstallPath = defaultRenderHtmlForInstallPath,
    authVersion = 'v2',
    logger = undefined,
    logLevel = undefined,
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
      this.logger = getLogger('OAuth:InstallProvider', logLevel ?? LogLevel.INFO, logger);
    }
    this.stateVerification = stateVerification;
    this.legacyStateVerification = legacyStateVerification;
    this.stateCookieName = stateCookieName;
    this.stateCookieExpirationSeconds = stateCookieExpirationSeconds;

    this.directInstall = directInstall;
    if (!stateVerification) {
      this.logger.warn("You've set InstallProvider#stateVerification to false. This flag is intended to enable org-wide app installations from admin pages. If this isn't your scenario, we recommend setting stateVerification to true and starting your OAuth flow from the provided `/slack/install` or your own starting endpoint.");
    }
    // Setup stateStore
    if (stateStore !== undefined) {
      this.stateStore = stateStore;
    } else if (this.stateVerification) {
      // if state verification is disabled, state store is not necessary
      if (stateSecret !== undefined) {
        this.stateStore = new ClearStateStore(stateSecret, this.stateCookieExpirationSeconds);
      } else {
        throw new InstallerInitializationError('To use the built-in state store you must provide a State Secret');
      }
    }

    this.installationStore = installationStore;
    this.installUrlOptions = installUrlOptions;
    this.renderHtmlForInstallPath = renderHtmlForInstallPath;
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
      logger,
      logLevel: this.logger.getLevel(),
      ...clientOptions,
    };
    this.noTokenClient = new WebClient(undefined, this.clientOptions);
  }

  // ------------------------------------------------------
  // Handling incoming requests from Slack API servers
  // ------------------------------------------------------

  /**
   * Fetches data from the installationStore
   */
  public async authorize(source: InstallationQuery<boolean>): Promise<AuthorizeResult> {
    const sourceForLogging = JSON.stringify(source);
    try {
      this.logger.debug(`Starting authorize() execution (source: ${sourceForLogging})`);
      // Note that `queryResult` may unexpectedly include null values for some properties.
      // For example, MongoDB can often save properties as null for some reasons.
      // Inside this method, we should alwayss check if a value is either undefined or null.
      const queryResult = await this.installationStore.fetchInstallation(source, this.logger);

      if (queryResult === undefined || queryResult === null) {
        throw new Error(`Failed fetching data from the Installation Store (source: ${sourceForLogging})`);
      }

      const authResult: AuthorizeResult = {};

      if (queryResult.user) {
        authResult.userToken = queryResult.user.token;
      }

      if (queryResult.team?.id) {
        authResult.teamId = queryResult.team.id;
      } else if (source?.teamId) {
        /**
         * Since queryResult is a org installation, it won't have team.id.
         * If one was passed in via source, we should add it to the authResult.
         */
        authResult.teamId = source.teamId;
      }

      if (queryResult?.enterprise?.id || source?.enterpriseId) {
        authResult.enterpriseId = queryResult?.enterprise?.id || source?.enterpriseId;
      }

      if (queryResult.bot) {
        authResult.botToken = queryResult.bot.token;
        authResult.botId = queryResult.bot.id;
        authResult.botUserId = queryResult.bot.userId;

        // Token Rotation Enabled (Bot Token)
        if (queryResult.bot.refreshToken) {
          authResult.botRefreshToken = queryResult.bot.refreshToken;
          authResult.botTokenExpiresAt = queryResult.bot.expiresAt; // utc, seconds
        }
      }

      // Token Rotation Enabled (User Token)
      if (queryResult.user?.refreshToken) {
        authResult.userRefreshToken = queryResult.user.refreshToken;
        authResult.userTokenExpiresAt = queryResult.user.expiresAt; // utc, seconds
      }

      /*
      * Token Rotation (Expiry Check + Refresh)
      * The presence of `(bot|user)TokenExpiresAt` indicates having opted into token rotation.
      * If the token has expired, or will expire within 2 hours, the token is refreshed and
      * the `authResult` and `Installation` are updated with the new values.
      */
      if (authResult.botRefreshToken || authResult.userRefreshToken) {
        const currentUTCSec = Math.floor(Date.now() / 1000); // seconds
        const tokensToRefresh: string[] = detectExpiredOrExpiringTokens(authResult, currentUTCSec);

        if (tokensToRefresh.length > 0) {
          if (queryResult.authVersion !== 'v2') {
            const errorMessage = 'Unexpected data structure detected. ' +
              'The data returned by your InstallationStore#fetchInstallation() method must have "authVersion": "v2" ' +
              'if it has a refresh token';
            throw new UnknownError(errorMessage);
          }
          const refreshResponses: OAuthV2TokenRefreshResponse[] = await this.refreshExpiringTokens(tokensToRefresh);
          if (refreshResponses.length) {
            const installationUpdates: TokenRefreshInstallationUpdates = {
              ...queryResult as Installation<'v2', boolean>,
            };
            refreshResponses.forEach((refreshResp) => {
              const tokenType = refreshResp.token_type;

              // Update Authorization
              if (tokenType === 'bot') {
                authResult.botToken = refreshResp.access_token;
                authResult.botRefreshToken = refreshResp.refresh_token;
                authResult.botTokenExpiresAt = currentUTCSec + refreshResp.expires_in;
              }

              if (tokenType === 'user') {
                authResult.userToken = refreshResp.access_token;
                authResult.userRefreshToken = refreshResp.refresh_token;
                authResult.userTokenExpiresAt = currentUTCSec + refreshResp.expires_in;
              }

              // Update Installation
              const botOrUser = installationUpdates[tokenType];
              if (botOrUser !== undefined) {
                this.logger.debug(`Saving ${tokenType} token and its refresh token in InstallationStore`);
                botOrUser.token = refreshResp.access_token;
                botOrUser.refreshToken = refreshResp.refresh_token;
                botOrUser.expiresAt = currentUTCSec + refreshResp.expires_in;
              } else {
                const errorMessage = `Unexpected data structure detected. The data returned by your InstallationStore#fetchInstallation() method must have ${tokenType} at top-level`;
                throw new UnknownError(errorMessage);
              }
            });
            await this.installationStore.storeInstallation(installationUpdates);
            this.logger.debug('Refreshed tokens have been saved in InstallationStore');
          } else {
            this.logger.debug('No tokens were refreshed');
          }
        }
      }

      return authResult;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw new AuthorizationError((error as any).message);
    } finally {
      this.logger.debug(`Completed authorize() execution (source: ${sourceForLogging})`);
    }
  }

  /**
   * refreshExpiringTokens refreshes expired access tokens using the `oauth.v2.access` endpoint.
   *
   * The return value is an Array of Promises made up of the resolution of each token refresh attempt.
   */
  private async refreshExpiringTokens(tokensToRefresh: string[]): Promise<OAuthV2TokenRefreshResponse[]> {
    const refreshPromises = tokensToRefresh.map((token) => this.refreshExpiringToken(token));
    return (await Promise.all(refreshPromises))
      .filter((res) => !(res instanceof Error))
      .map((res) => res as OAuthV2TokenRefreshResponse);
  }

  private async refreshExpiringToken(refreshToken: string): Promise<OAuthV2TokenRefreshResponse | Error> {
    return this.noTokenClient.oauth.v2.access({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    })
      .then((res) => res as OAuthV2TokenRefreshResponse)
      .catch((e) => {
        this.logger.error(`Failed to perform oauth.v2.access API call for token rotation: (error: ${e})`);
        return e; // this one will be filtered out later
      });
  }

  // ------------------------------------------------------
  // Handling web browser requests from end-users
  // ------------------------------------------------------

  /**
   * Handles the install path (the default is /slack/install) requests from an app installer.
  */
  public async handleInstallPath(
    req: IncomingMessage,
    res: ServerResponse,
    options?: InstallPathOptions,
    installOptions?: InstallURLOptions,
  ): Promise<void> {
    if (installOptions === undefined && this.installUrlOptions === undefined) {
      const errorMessage = 'To enable the built-in install path handler, you need to pass InstallURLOptions to InstallProvider. ' +
        "If you're using @slack/bolt, please upgrade the framework to the latest version.";
      throw new GenerateInstallUrlError(errorMessage);
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const _installOptions: InstallURLOptions = installOptions! || this.installUrlOptions!;
    const _printableOptions = JSON.stringify(_installOptions);
    this.logger.debug(`Running handleInstallPath() with ${_printableOptions}`);

    try {
      let shouldProceed = true;
      if (options?.beforeRedirection !== undefined) {
        shouldProceed = await options.beforeRedirection(req, res, installOptions);
      }
      if (!shouldProceed) {
        this.logger.debug('Skipped to proceed with the built-in redirection as beforeRedirection returned false');
        return;
      }
      let state: string | undefined;
      if (this.stateVerification) {
        if (this.stateStore) {
          state = await this.stateStore.generateStateParam(_installOptions, new Date());
          const stateCookie: string = this.buildSetCookieHeaderForNewState(state);
          if (res.getHeader('Set-Cookie')) {
            // If the cookies already exist
            const existingCookies = res.getHeader('Set-Cookie') || [];
            const allCookies: string[] = [];
            if (Array.isArray(existingCookies)) {
              allCookies.push(...existingCookies);
            } else if (typeof existingCookies === 'string') {
              allCookies.push(existingCookies);
            } else {
              allCookies.push(existingCookies.toString());
            }
            // Append the state cookie
            allCookies.push(stateCookie);
            res.setHeader('Set-Cookie', allCookies);
          } else {
            res.setHeader('Set-Cookie', stateCookie);
          }
        } else if (this.stateStore === undefined) {
          throw new GenerateInstallUrlError('StateStore is not properly configured');
        }
      }
      const url = await this.generateInstallUrl(_installOptions, this.stateVerification, state);
      this.logger.debug(`Generated authorize URL: ${url}`);

      if (this.directInstall !== undefined && this.directInstall) {
        // If a Slack app sets "Direct Install URL" in the Slack app configruation,
        // the installation flow of the app should start with the Slack authorize URL.
        // See https://api.slack.com/start/distributing/directory#direct_install for more details.
        res.setHeader('Location', url);
        res.writeHead(302);
        res.end('');
      } else {
        // The installation starts from a landing page served by this app.
        // Generate HTML response body
        const body = this.renderHtmlForInstallPath(url);
        // Serve a basic HTML page including the "Add to Slack" button.
        // Regarding headers:
        // - Content-Length is not used because Transfer-Encoding='chunked' is automatically used.
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.writeHead(200);
        res.end(body);
      }
    } catch (e: unknown) {
      const message = `An unhandled error occurred while processing an install path request (error: ${e})`;
      this.logger.error(message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw new GenerateInstallUrlError((e as any).message);
    }
  }

  /**
   * Returns a URL that is suitable for including in an Add to Slack button
   * Uses stateStore to generate a value for the state query param.
   */
  public async generateInstallUrl(
    options: InstallURLOptions,
    stateVerification: boolean = true,
    state?: string,
  ): Promise<string> {
    const slackURL = new URL(this.authorizationUrl);

    if (options.scopes === undefined || options.scopes === null) {
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
    if (stateVerification) {
      let _state = state;
      if (_state === undefined) {
        if (this.stateStore) {
          _state = await this.stateStore.generateStateParam(options, new Date());
        } else {
          const errorMessage = 'StateStore needs to be set for generating a valid authorize URL';
          throw new InstallerInitializationError(errorMessage);
        }
      }
      params.append('state', _state);
    }

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
    installOptions?: InstallURLOptions,
  ): Promise<void> {
    let code: string;
    let flowError: string;
    let stateInQueryString: string;
    try {
      if (req.url !== undefined) {
        // Note: Protocol/ host of object are not necessarily accurate
        // and shouldn't be relied on
        // intended only for accessing searchParams only
        const searchParams = extractSearchParams(req);
        flowError = searchParams.get('error') as string;
        if (flowError === 'access_denied') {
          throw new AuthorizationError('User cancelled the OAuth installation flow!');
        }
        code = searchParams.get('code') as string;
        stateInQueryString = searchParams.get('state') as string;
        if (!code) {
          throw new MissingCodeError('Redirect url is missing the required code query parameter');
        }
        if (this.stateVerification && !stateInQueryString) {
          throw new MissingStateError('Redirect url is missing the state query parameter. If this is intentional, see options for disabling default state verification.');
        }
      } else {
        throw new UnknownError('Something went wrong');
      }
      // If state verification is enabled, attempt to verify, otherwise ignore
      if (this.stateVerification) {
        try {
          if (this.legacyStateVerification) {
            // This mode is not enabled by default
            // This option is for some of the existing developers that need time for migration
            this.logger.warn('Enabling legacyStateVerification is not recommended as it does not properly work for OAuth CSRF protection. Please consider migrating from directly using InstallProvider#generateInstallUrl() to InstallProvider#handleInstallPath() for serving the install path.');
          } else {
            const stateInBrowserSession: string | undefined = extractCookieValue(req, this.stateCookieName);
            if (!stateInBrowserSession || (stateInBrowserSession !== stateInQueryString)) {
              throw new InvalidStateError('The state parameter is not for this browser session.');
            }
          }
          if (this.stateStore) {
            // eslint-disable-next-line no-param-reassign
            installOptions = await this.stateStore.verifyStateParam(new Date(), stateInQueryString);
          } else {
            throw new InstallerInitializationError('StateStore is not properly configured');
          }
        } finally {
          // Delete the state value in cookies in any case
          res.setHeader('Set-Cookie', this.buildSetCookieHeaderForStateDeletion());
        }
      }
      if (!installOptions) {
        const emptyInstallOptions: InstallURLOptions = { scopes: [] };
        // eslint-disable-next-line no-param-reassign
        installOptions = emptyInstallOptions;
      }

      // beforeInstallation/afterInstallation may return false
      let shouldProceed = true;
      if (options?.beforeInstallation !== undefined) {
        shouldProceed = await options.beforeInstallation(installOptions, req, res);
      }

      if (!shouldProceed) {
        // When options.beforeInstallation returns false,
        // the app installation is cancelled
        // The beforeInstallation method is responsible for building a complete HTTP response.
        return;
      }

      // Start: Build the installation object
      let installation: Installation;
      let resp: OAuthV1Response | OAuthV2Response;

      if (this.authVersion === 'v1') {
        // convert response type from WebApiCallResult to OAuthResponse
        const v1Resp = await this.noTokenClient.oauth.access({
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
        const v2Resp = await this.noTokenClient.oauth.v2.access({
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

        const currentUTC = Math.floor(Date.now() / 1000); // utc, seconds

        // Installation has Bot Token
        if (v2Resp.access_token !== undefined && v2Resp.scope !== undefined && v2Resp.bot_user_id !== undefined) {
          const authResult = await runAuthTest(v2Resp.access_token, this.clientOptions);

          v2Installation.bot = {
            scopes: v2Resp.scope.split(','),
            token: v2Resp.access_token,
            userId: v2Resp.bot_user_id,
            id: authResult.bot_id as string,
          };

          if (v2Resp.is_enterprise_install) {
            v2Installation.enterpriseUrl = authResult.url;
          }

          // Token Rotation is Enabled
          if (v2Resp.refresh_token !== undefined && v2Resp.expires_in !== undefined) {
            v2Installation.bot.refreshToken = v2Resp.refresh_token;
            v2Installation.bot.expiresAt = currentUTC + v2Resp.expires_in; // utc, seconds
          }
        }

        // Installation has User Token
        if (v2Resp.authed_user !== undefined && v2Resp.authed_user.access_token !== undefined) {
          if (v2Resp.is_enterprise_install && v2Installation.enterpriseUrl === undefined) {
            const authResult = await runAuthTest(v2Resp.authed_user.access_token, this.clientOptions);
            v2Installation.enterpriseUrl = authResult.url;
          }

          // Token Rotation is Enabled
          if (v2Resp.authed_user.refresh_token !== undefined && v2Resp.authed_user.expires_in !== undefined) {
            v2Installation.user.refreshToken = v2Resp.authed_user.refresh_token;
            v2Installation.user.expiresAt = currentUTC + v2Resp.authed_user.expires_in; // utc, seconds
          }
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
      if (installOptions && installOptions.metadata !== undefined) {
        // Pass the metadata in state parameter if exists.
        // Developers can use the value for additional/custom data associated with the installation.
        installation.metadata = installOptions.metadata;
      }
      // End: Build the installation object

      if (options?.afterInstallation !== undefined) {
        shouldProceed = await options.afterInstallation(installation, installOptions, req, res);
      }
      if (!shouldProceed) {
        // When options.beforeInstallation returns false,
        // the app installation is cancelled
        // The afterInstallation method is responsible for building a complete HTTP response.
        return;
      }

      // Save installation object to installation store
      await this.installationStore.storeInstallation(installation, this.logger);

      // Call the success callback
      if (options !== undefined && (
        options.success !== undefined || options.successAsync !== undefined
      )) {
        if (options.success !== undefined) {
          this.logger.debug('Calling passed function as callbackOptions.success');
          options.success(installation, installOptions, req, res);
        }
        if (options.successAsync !== undefined) {
          this.logger.debug('Calling passed function as callbackOptions.successAsync');
          await options.successAsync(installation, installOptions, req, res);
        }
      } else {
        this.logger.debug('Running built-in success function');
        defaultCallbackSuccess(installation, installOptions, req, res);
      }
    } catch (error) {
      this.logger.error(error);

      if (!installOptions) {
        // To make the `installOptions` type compatible with `CallbackOptions#failure` signature
        const emptyInstallOptions: InstallURLOptions = { scopes: [] };
        // eslint-disable-next-line no-param-reassign
        installOptions = emptyInstallOptions;
      }

      // Call the failure callback
      const codedError: CodedError = error as CodedError;
      if (codedError.code === undefined) {
        codedError.code = ErrorCode.UnknownError;
      }
      if (options !== undefined && (
        options.failure !== undefined || options.failureAsync !== undefined
      )) {
        if (options.failure !== undefined) {
          this.logger.debug('Calling passed function as callbackOptions.failure');
          options.failure(codedError, installOptions, req, res);
        }
        if (options.failureAsync !== undefined) {
          this.logger.debug('Calling passed function as callbackOptions.failureAsync');
          await options.failureAsync(codedError, installOptions, req, res);
        }
      } else {
        this.logger.debug('Running built-in failure function');
        defaultCallbackFailure(codedError, installOptions, req, res);
      }
    }
  }

  // -----------------------
  // Internal methods

  private buildSetCookieHeaderForNewState(state: string): string {
    const name = this.stateCookieName;
    const maxAge = this.stateCookieExpirationSeconds;
    return `${name}=${state}; Secure; HttpOnly; Path=/; Max-Age=${maxAge}`;
  }

  private buildSetCookieHeaderForStateDeletion(): string {
    const name = this.stateCookieName;
    return `${name}=deleted; Secure; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

// Response shape from oauth.v2.access - https://api.slack.com/methods/oauth.v2.access#response
export interface OAuthV2Response extends WebAPICallResult {
  app_id: string;
  authed_user: {
    id: string,
    scope?: string,
    access_token?: string,
    token_type?: string,
    refresh_token?: string,
    expires_in?: number,
  };
  scope?: string;
  token_type?: 'bot';
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
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

export interface OAuthV2TokenRefreshResponse extends WebAPICallResult {
  app_id: string;
  scope: string;
  token_type: 'bot' | 'user';
  access_token: string;
  refresh_token: string;
  expires_in: number;
  bot_user_id?: string;
  team: { id: string, name: string };
  enterprise: { name: string, id: string } | null;
  is_enterprise_install: boolean;
}

// ------------------------------------------
// Internals
// ------------------------------------------

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

// ---------------------
// Gets the bot_id using the `auth.test` method.

interface AuthTestResult extends WebAPICallResult {
  bot_id?: string;
  url?: string;
}

async function runAuthTest(token: string, clientOptions: WebClientOptions): Promise<AuthTestResult> {
  const client = new WebClient(token, clientOptions);
  const authResult = await client.auth.test({});
  return authResult as unknown as AuthTestResult;
}

// ---------------------
// token rotation

// This type is used only in this source file
type TokenRefreshInstallationUpdates = Installation<'v2', boolean> & {
  bot?: {
    token: string,
    refreshToken?: string;
    expiresAt?: number;
  };
  user: {
    token?: string,
    refreshToken?: string;
    expiresAt?: number;
  };
};

/**
 * detectExpiredOrExpiringTokens determines access tokens' eligibility for refresh.
 *
 * The return value is an Array of expired or soon-to-expire access tokens.
 */
function detectExpiredOrExpiringTokens(authResult: AuthorizeResult, currentUTCSec: number): string[] {
  const tokensToRefresh: string[] = [];
  const EXPIRY_WINDOW: number = 7200; // 2 hours

  if (authResult.botRefreshToken &&
    (authResult.botTokenExpiresAt !== undefined && authResult.botTokenExpiresAt !== null)) {
    const botTokenExpiresIn = authResult.botTokenExpiresAt - currentUTCSec;
    if (botTokenExpiresIn <= EXPIRY_WINDOW) {
      tokensToRefresh.push(authResult.botRefreshToken);
    }
  }

  if (authResult.userRefreshToken &&
    (authResult.userTokenExpiresAt !== undefined && authResult.userTokenExpiresAt !== null)) {
    const userTokenExpiresIn = authResult.userTokenExpiresAt - currentUTCSec;
    if (userTokenExpiresIn <= EXPIRY_WINDOW) {
      tokensToRefresh.push(authResult.userRefreshToken);
    }
  }

  return tokensToRefresh;
}

/**
 * Returns search params from a URL and ignores protocol / hostname as those
 * aren't guaranteed to be accurate e.g. in x-forwarded- scenarios
 */
function extractSearchParams(req: IncomingMessage): URLSearchParams {
  const { searchParams } = new URL(req.url as string, `https://${req.headers.host}`);
  return searchParams;
}

function extractCookieValue(req: IncomingMessage, name: string): string | undefined {
  const allCookies = req.headers.cookie;
  if (allCookies) {
    const found = allCookies.split(';').find((c) => c.trim().startsWith(`${name}=`));
    if (found) {
      return found.split('=')[1].trim();
    }
  }
  return undefined;
}
