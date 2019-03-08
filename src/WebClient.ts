// polyfill for async iterable. see: https://stackoverflow.com/a/43694282/305340
if (Symbol['asyncIterator'] === undefined) { ((Symbol as any)['asyncIterator']) = Symbol.for('asyncIterator'); }

import { stringify as qsStringify } from 'querystring';
import { IncomingHttpHeaders } from 'http';
import { basename } from 'path';
import { Readable } from 'stream';
import objectEntries = require('object.entries'); // tslint:disable-line:no-require-imports
import isStream = require('is-stream'); // tslint:disable-line:no-require-imports
import EventEmitter = require('eventemitter3'); // tslint:disable-line:import-name no-require-imports
import PQueue = require('p-queue'); // tslint:disable-line:import-name no-require-imports
import pRetry = require('p-retry'); // tslint:disable-line:no-require-imports
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import FormData = require('form-data'); // tslint:disable-line:no-require-imports import-name
import { awaitAndReduce, callbackify, getUserAgent, delay, AgentOption, TLSOptions, agentForScheme } from './util';
import { CodedError, errorWithCode, ErrorCode } from './errors';
import { LogLevel, Logger, LoggingFunc, getLogger, loggerFromLoggingFunc, isLoggingFunc } from './logger';
import retryPolicies, { RetryOptions } from './retry-policies';
import Method, * as methods from './methods'; // tslint:disable-line:import-name

const pkg = require('../package.json'); // tslint:disable-line:no-require-imports no-var-requires

/**
 * A client for Slack's Web API
 *
 * This client provides an alias for each {@link https://api.slack.com/methods|Web API method}. Each method is
 * a convenience wrapper for calling the {@link WebClient#apiCall} method using the method name as the first parameter.
 */
export class WebClient extends EventEmitter {

  /**
   * Authentication and authorization token for accessing Slack Web API (usually begins with `xoxa`, `xoxp`, or `xoxb`).
   * This should be treated as readonly. Setting this value is used for refreshing tokens, and it is deprecated.
   */
  public get token(): string | undefined {
    return this._accessToken;
  }
  public set token(newToken: string | undefined) {
    this.accessTokenExpiresAt = undefined;
    this.isTokenRefreshing = false;
    this._accessToken = newToken;
  }

  /**
   * OAuth 2.0 refresh token used to automatically create new access tokens (`token`) when the current is expired.
   * @deprecated
   */
  public readonly refreshToken?: string;

  /**
   * OAuth 2.0 client identifier
   * @deprecated
   */
  public readonly clientId?: string;

  /**
   * OAuth 2.0 client secret
   * @deprecated
   */
  public readonly clientSecret?: string;

  /**
   * The base URL for reaching Slack's Web API. Consider changing this value for testing purposes.
   */
  public readonly slackApiUrl: string;

  /**
   * The backing store for the current access token.
   */
  private _accessToken?: string;

  /**
   * The time (in milliseconds) when the current access token will expire
   */
  private accessTokenExpiresAt?: number;

  /**
   * Whether or not a token refresh is currently in progress
   * TODO: maybe this should be a Promise so that other API calls can await this and we don't fill the queue with
   * calls that are destined to fail.
   */
  private isTokenRefreshing: boolean = false;

  /**
   * The time (in milliseconds) when the last token refresh completed
   */
  private accessTokenLastRefreshedAt?: number;

  /**
   * Configuration for retry operations. See {@link https://github.com/tim-kos/node-retry|node-retry} for more details.
   */
  private retryConfig: RetryOptions;

  /**
   * Queue of requests in which a maximum of {@link WebClientOptions.maxRequestConcurrency} can concurrently be
   * in-flight.
   */
  private requestQueue: PQueue;

  /**
   * Axios HTTP client instance used by this client
   */
  private axios: AxiosInstance;

  /**
   * Configuration for custom TLS handling
   */
  private tlsConfig: TLSOptions;

  /**
   * Automatic pagination page size (limit)
   */
  private pageSize: number;

  /**
   * Preference for immediately rejecting API calls which result in a rate-limited response
   */
  private rejectRateLimitedCalls: boolean;

  /**
   * The name used to prefix all logging generated from this object
   */
  private static loggerName = `${pkg.name}:WebClient`;

  /**
   * This object's logger instance
   */
  private logger: Logger;

  /**
   * @param token - An API token to authenticate/authorize with Slack (usually start with `xoxp`, `xoxb`, or `xoxa`)
   */
  constructor(token?: string, {
    slackApiUrl = 'https://slack.com/api/',
    logger = undefined,
    logLevel = LogLevel.INFO,
    maxRequestConcurrency = 3,
    retryConfig = retryPolicies.retryForeverExponentialCappedRandom,
    agent = undefined,
    tls = undefined,
    pageSize = 200,
    rejectRateLimitedCalls = false,
    clientId = undefined,
    clientSecret = undefined,
    refreshToken = undefined,
    headers = {},
  }: WebClientOptions = {}) {
    super();
    this._accessToken = token;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.refreshToken = refreshToken;
    this.slackApiUrl = slackApiUrl;

    this.retryConfig = retryConfig;
    this.requestQueue = new PQueue({ concurrency: maxRequestConcurrency });
    // NOTE: may want to filter the keys to only those acceptable for TLS options
    this.tlsConfig = tls !== undefined ? tls : {};
    this.pageSize = pageSize;
    this.rejectRateLimitedCalls = rejectRateLimitedCalls;

    // Logging
    if (logger !== undefined && isLoggingFunc(logger)) {
      this.logger = loggerFromLoggingFunc(WebClient.loggerName, logger, logLevel);
      this.logger.warn('Using a logging function is deprecated. Use a Logger object instead.');
    } else {
      this.logger = getLogger(WebClient.loggerName, logLevel, logger);
    }

    this.axios = axios.create({
      baseURL: slackApiUrl,
      headers: Object.assign({
        'User-Agent': getUserAgent(),
      }, headers),
      httpAgent: agentForScheme('http', agent),
      httpsAgent: agentForScheme('https', agent),
      transformRequest: [this.serializeApiCallOptions.bind(this)],
      validateStatus: () => true, // all HTTP status codes should result in a resolved promise (as opposed to only 2xx)
      maxRedirects: 0,
      // disabling axios' automatic proxy support:
      // axios would read from envvars to configure a proxy automatically, but it doesn't support TLS destinations.
      // for compatibility with https://api.slack.com, and for a larger set of possible proxies (SOCKS or other
      // protocols), users of this package should use the `agent` option to configure a proxy.
      proxy: false,
    });
    // serializeApiCallOptions will always determine the appropriate content-type
    delete this.axios.defaults.headers.post['Content-Type'];

    // Warn when automatic token refresh is being used
    if (this.shouldAutomaticallyRefreshToken) {
      this.logger.warn(
        'Automatic token refresh has been deprecated and will be removed from the next major version of the ' +
        'WebClient. Refresh tokens were built to support Workspace Apps, which have also been deprecated. See ' +
        'https://medium.com/slack-developer-blog/an-update-on-workspace-apps-aabc9e42a98b to learn more.',
      );
    }

    this.logger.debug('initialized');
  }

  /**
   * Generic method for calling a Web API method
   *
   * @param method the Web API method to call {@see https://api.slack.com/methods}
   * @param options options
   * @param callback callback if you don't want a promise returned - this argument is deprecated.
   */
  public apiCall(method: string, options?: WebAPICallOptions): Promise<WebAPICallResult>;
  public apiCall(method: string, options: WebAPICallOptions, callback: WebAPIResultCallback): void;
  public apiCall(method: string,
                 options?: WebAPICallOptions,
                 callback?: WebAPIResultCallback): void | Promise<WebAPICallResult> {
    this.logger.debug('apiCall() start');

    // The following thunk is the actual implementation for this method. It is wrapped so that it can be adapted for
    // different executions below.
    const implementation = async () => {

      if (typeof options === 'string' || typeof options === 'number' || typeof options === 'boolean') {
        throw new TypeError(`Expected an options argument but instead received a ${typeof options}`);
      }

      // warn for methods whose functionality is deprecated
      if (method === 'files.comments.add' || method === 'files.comments.edit') {
        this.logger.warn(
          `File comments are deprecated in favor of file threads. Replace uses of ${method} in your app ` +
          'to take advantage of improvements. See https://api.slack.com/changelog/2018-05-file-threads-soon-tread ' +
          'to learn more.',
        );
      }

      // optimistically check for an expired access token, and refresh it if possible
      if ((method !== 'oauth.access' && method !== 'oauth.token') &&
          (options === undefined || !('token' in options)) &&
          this.shouldAutomaticallyRefreshToken &&
          (this.token === undefined ||
           this.accessTokenExpiresAt !== undefined && this.accessTokenExpiresAt < Date.now())) {
        await this.performTokenRefresh();
      }

      // build headers
      const headers = {};
      if (options !== undefined && optionsAreUserPerspectiveEnabled(options)) {
        headers['X-Slack-User'] = options.on_behalf_of;
        delete options.on_behalf_of;
      }

      const methodSupportsCursorPagination = methods.cursorPaginationEnabledMethods.has(method);
      const optionsPaginationType = getOptionsPaginationType(options);

      // warn in priority of most general pagination problem to most specific pagination problem
      if (optionsPaginationType === PaginationType.Mixed) {
        this.logger.warn('Options include mixed pagination techniques. ' +
                         'Always prefer cursor-based pagination when available');
      } else if (optionsPaginationType === PaginationType.Cursor &&
                 !methodSupportsCursorPagination) {
        this.logger.warn('Options include cursor-based pagination while the method cannot support that technique');
      } else if (optionsPaginationType === PaginationType.Timeline &&
                 !methods.timelinePaginationEnabledMethods.has(method)) {
        this.logger.warn('Options include timeline-based pagination while the method cannot support that technique');
      } else if (optionsPaginationType === PaginationType.Traditional &&
                 !methods.traditionalPagingEnabledMethods.has(method)) {
        this.logger.warn('Options include traditional paging while the method cannot support that technique');
      } else if (methodSupportsCursorPagination &&
                 optionsPaginationType !== PaginationType.Cursor && optionsPaginationType !== PaginationType.None) {
        this.logger.warn('Method supports cursor-based pagination and a different technique is used in options. ' +
                         'Always prefer cursor-based pagination when available');
      }

      const shouldAutoPaginate = methodSupportsCursorPagination && optionsPaginationType === PaginationType.None;
      this.logger.debug(`shouldAutoPaginate: ${shouldAutoPaginate}`);
      if (shouldAutoPaginate) {
        this.logger.warn(
          'Auto pagination is deprecated. Use the `cursor` and `limit` arguments to make paginated calls.',
        );
      }

      /**
       * Generates a result object for each of the HTTP requests for this API call. API calls will generally only
       * generate more than one result when automatic pagination is occurring.
       */
      async function* generateResults(this: WebClient): AsyncIterableIterator<WebAPICallResult> {
        // when result is undefined, that signals that the first of potentially many calls has not yet been made
        let result: WebAPICallResult | undefined = undefined;
        // paginationOptions stores pagination options not already stored in the options argument
        let paginationOptions: methods.CursorPaginationEnabled = {};

        if (shouldAutoPaginate) {
          // these are the default pagination options
          paginationOptions = { limit: this.pageSize };
        }

        while (result === undefined ||
               (shouldAutoPaginate &&
                 (objectEntries(paginationOptions = paginationOptionsForNextPage(result, this.pageSize)).length > 0)
               )
              ) {
          // NOTE: this is a really inelegant way of capturing the request time
          let requestTime: number | undefined;

          result = await (this.makeRequest(method, Object.assign(
            { token: this._accessToken },
            paginationOptions,
            options,
          ), headers)
            .then((response) => {
              requestTime = response.request[requestTimePropName];
              const result = this.buildResult(response);

              // log warnings in response metadata
              if (result.response_metadata !== undefined && result.response_metadata.warnings !== undefined) {
                result.response_metadata.warnings.forEach(this.logger.warn.bind(this.logger));
              }

              if (!result.ok) {
                throw platformErrorFromResult(result as (WebAPICallResult & { error: string; }));
              }

              return result;
            })
            // Automatic token refresh concerns
            .catch(async (error) => {
              if (this.shouldAutomaticallyRefreshToken &&
                  error.code === ErrorCode.PlatformError && error.data.error === 'invalid_auth') {
                if (requestTime === undefined) {
                  // TODO: create an inconsistent state error
                  throw new Error('A logical error with tracking the request time occurred.');
                }

                if (this.accessTokenLastRefreshedAt === undefined) {
                  if (!this.isTokenRefreshing) {
                    await this.performTokenRefresh();
                    return implementation();
                  }
                  return implementation();
                }
                if (!this.isTokenRefreshing && requestTime > this.accessTokenLastRefreshedAt) {
                  await this.performTokenRefresh();
                  return implementation();
                }
                return implementation();
              }
              throw error;
            }));

          yield result;
        }
      }

      // return a promise that resolves when a reduction of responses finishes
      return awaitAndReduce(generateResults.call(this), createResultMerger(method) , {} as WebAPICallResult);
    };

    // Adapt the interface for callback-based execution or Promise-based execution
    if (callback !== undefined) {
      this.logger.warn(
        'Using callbacks has been deprecated, and will not work in the next major version of WebClient. Instead, ' +
        'call this method without the callback argument and a Promise will be returned. See the documentation for ' +
        'examples.',
      );
      callbackify(implementation)(callback);
      return;
    }
    return implementation();
  }

  /**
   * api method family
   */
  public readonly api = {
    test: (this.apiCall.bind(this, 'api.test')) as Method<methods.APITestArguments>,
  };

  /**
   * apps method family
   */
  public readonly apps = {
    permissions: {
      info: (this.apiCall.bind(this, 'apps.permissions.info')) as Method<methods.AppsPermissionsInfoArguments>,
      request: (this.apiCall.bind(this, 'apps.permissions.request')) as Method<methods.AppsPermissionsRequestArguments>,
      resources: {
        list: (this.apiCall.bind(this, 'apps.permissions.resources.list')) as
          Method<methods.AppsPermissionsResourcesListArguments>,
      },
      scopes: {
        list: (this.apiCall.bind(this, 'apps.permissions.scopes.list')) as
          Method<methods.AppsPermissionsScopesListArguments>,
      },
    },
  };

  /**
   * auth method family
   */
  public readonly auth = {
    revoke: (this.apiCall.bind(this, 'auth.revoke')) as Method<methods.AuthRevokeArguments>,
    test: (this.apiCall.bind(this, 'auth.test')) as Method<methods.AuthTestArguments>,
  };

  /**
   * bots method family
   */
  public readonly bots = {
    info: (this.apiCall.bind(this, 'bots.info')) as Method<methods.BotsInfoArguments>,
  };

  /**
   * channels method family
   */
  public readonly channels = {
    archive: (this.apiCall.bind(this, 'channels.archive')) as Method<methods.ChannelsArchiveArguments>,
    create: (this.apiCall.bind(this, 'channels.create')) as Method<methods.ChannelsCreateArguments>,
    history: (this.apiCall.bind(this, 'channels.history')) as Method<methods.ChannelsHistoryArguments>,
    info: (this.apiCall.bind(this, 'channels.info')) as Method<methods.ChannelsInfoArguments>,
    invite: (this.apiCall.bind(this, 'channels.invite')) as Method<methods.ChannelsInviteArguments>,
    join: (this.apiCall.bind(this, 'channels.join')) as Method<methods.ChannelsJoinArguments>,
    kick: (this.apiCall.bind(this, 'channels.kick')) as Method<methods.ChannelsKickArguments>,
    leave: (this.apiCall.bind(this, 'channels.leave')) as Method<methods.ChannelsLeaveArguments>,
    list: (this.apiCall.bind(this, 'channels.list')) as Method<methods.ChannelsListArguments>,
    mark: (this.apiCall.bind(this, 'channels.mark')) as Method<methods.ChannelsMarkArguments>,
    rename: (this.apiCall.bind(this, 'channels.rename')) as Method<methods.ChannelsRenameArguments>,
    replies: (this.apiCall.bind(this, 'channels.replies')) as Method<methods.ChannelsRepliesArguments>,
    setPurpose: (this.apiCall.bind(this, 'channels.setPurpose')) as Method<methods.ChannelsSetPurposeArguments>,
    setTopic: (this.apiCall.bind(this, 'channels.setTopic')) as Method<methods.ChannelsSetTopicArguments>,
    unarchive: (this.apiCall.bind(this, 'channels.unarchive')) as Method<methods.ChannelsUnarchiveArguments>,
  };

  /**
   * chat method family
   */
  public readonly chat = {
    delete: (this.apiCall.bind(this, 'chat.delete')) as Method<methods.ChatDeleteArguments>,
    getPermalink: (this.apiCall.bind(this, 'chat.getPermalink')) as Method<methods.ChatGetPermalinkArguments>,
    meMessage: (this.apiCall.bind(this, 'chat.meMessage')) as Method<methods.ChatMeMessageArguments>,
    postEphemeral: (this.apiCall.bind(this, 'chat.postEphemeral')) as Method<methods.ChatPostEphemeralArguments>,
    postMessage: (this.apiCall.bind(this, 'chat.postMessage')) as Method<methods.ChatPostMessageArguments>,
    unfurl: (this.apiCall.bind(this, 'chat.unfurl')) as Method<methods.ChatUnfurlArguments>,
    update: (this.apiCall.bind(this, 'chat.update')) as Method<methods.ChatUpdateArguments>,
  };

  /**
   * conversations method family
   */
  public readonly conversations = {
    archive: (this.apiCall.bind(this, 'conversations.archive')) as Method<methods.ConversationsArchiveArguments>,
    close: (this.apiCall.bind(this, 'conversations.close')) as Method<methods.ConversationsCloseArguments>,
    create: (this.apiCall.bind(this, 'conversations.create')) as Method<methods.ConversationsCreateArguments>,
    history: (this.apiCall.bind(this, 'conversations.history')) as Method<methods.ConversationsHistoryArguments>,
    info: (this.apiCall.bind(this, 'conversations.info')) as Method<methods.ConversationsInfoArguments>,
    invite: (this.apiCall.bind(this, 'conversations.invite')) as Method<methods.ConversationsInviteArguments>,
    join: (this.apiCall.bind(this, 'conversations.join')) as Method<methods.ConversationsJoinArguments>,
    kick: (this.apiCall.bind(this, 'conversations.kick')) as Method<methods.ConversationsKickArguments>,
    leave: (this.apiCall.bind(this, 'conversations.leave')) as Method<methods.ConversationsLeaveArguments>,
    list: (this.apiCall.bind(this, 'conversations.list')) as Method<methods.ConversationsListArguments>,
    members: (this.apiCall.bind(this, 'conversations.members')) as Method<methods.ConversationsMembersArguments>,
    open: (this.apiCall.bind(this, 'conversations.open')) as Method<methods.ConversationsOpenArguments>,
    rename: (this.apiCall.bind(this, 'conversations.rename')) as Method<methods.ConversationsRenameArguments>,
    replies: (this.apiCall.bind(this, 'conversations.replies')) as Method<methods.ConversationsRepliesArguments>,
    setPurpose:
      (this.apiCall.bind(this, 'conversations.setPurpose')) as Method<methods.ConversationsSetPurposeArguments>,
    setTopic: (this.apiCall.bind(this, 'conversations.setTopic')) as Method<methods.ConversationsSetTopicArguments>,
    unarchive: (this.apiCall.bind(this, 'conversations.unarchive')) as Method<methods.ConversationsUnarchiveArguments>,
  };

  /**
   * dialog method family
   */
  public readonly dialog = {
    open: (this.apiCall.bind(this, 'dialog.open')) as Method<methods.DialogOpenArguments>,
  };

  /**
   * dnd method family
   */
  public readonly dnd = {
    endDnd: (this.apiCall.bind(this, 'dnd.endDnd')) as Method<methods.DndEndDndArguments>,
    endSnooze: (this.apiCall.bind(this, 'dnd.endSnooze')) as Method<methods.DndEndSnoozeArguments>,
    info: (this.apiCall.bind(this, 'dnd.info')) as Method<methods.DndInfoArguments>,
    setSnooze: (this.apiCall.bind(this, 'dnd.setSnooze')) as Method<methods.DndSetSnoozeArguments>,
    teamInfo: (this.apiCall.bind(this, 'dnd.teamInfo')) as Method<methods.DndTeamInfoArguments>,
  };

  /**
   * emoji method family
   */
  public readonly emoji = {
    list: (this.apiCall.bind(this, 'emoji.list')) as Method<methods.EmojiListArguments>,
  };

  /**
   * files method family
   */
  public readonly files = {
    delete: (this.apiCall.bind(this, 'files.delete')) as Method<methods.FilesDeleteArguments>,
    info: (this.apiCall.bind(this, 'files.info')) as Method<methods.FilesInfoArguments>,
    list: (this.apiCall.bind(this, 'files.list')) as Method<methods.FilesListArguments>,
    revokePublicURL:
      (this.apiCall.bind(this, 'files.revokePublicURL')) as Method<methods.FilesRevokePublicURLArguments>,
    sharedPublicURL:
      (this.apiCall.bind(this, 'files.sharedPublicURL')) as Method<methods.FilesSharedPublicURLArguments>,
    upload: (this.apiCall.bind(this, 'files.upload')) as Method<methods.FilesUploadArguments>,
    comments: {
      add: (this.apiCall.bind(this, 'files.comments.add')) as Method<methods.FilesCommentsAddArguments>,
      delete: (this.apiCall.bind(this, 'files.comments.delete')) as Method<methods.FilesCommentsDeleteArguments>,
      edit: (this.apiCall.bind(this, 'files.comments.edit')) as Method<methods.FilesCommentsEditArguments>,
    },
  };

  /**
   * groups method family
   */
  public readonly groups = {
    archive: (this.apiCall.bind(this, 'groups.archive')) as Method<methods.GroupsArchiveArguments>,
    create: (this.apiCall.bind(this, 'groups.create')) as Method<methods.GroupsCreateArguments>,
    createChild: (this.apiCall.bind(this, 'groups.createChild')) as Method<methods.GroupsCreateChildArguments>,
    history: (this.apiCall.bind(this, 'groups.history')) as Method<methods.GroupsHistoryArguments>,
    info: (this.apiCall.bind(this, 'groups.info')) as Method<methods.GroupsInfoArguments>,
    invite: (this.apiCall.bind(this, 'groups.invite')) as Method<methods.GroupsInviteArguments>,
    kick: (this.apiCall.bind(this, 'groups.kick')) as Method<methods.GroupsKickArguments>,
    leave: (this.apiCall.bind(this, 'groups.leave')) as Method<methods.GroupsLeaveArguments>,
    list: (this.apiCall.bind(this, 'groups.list')) as Method<methods.GroupsListArguments>,
    mark: (this.apiCall.bind(this, 'groups.mark')) as Method<methods.GroupsMarkArguments>,
    open: (this.apiCall.bind(this, 'groups.open')) as Method<methods.GroupsOpenArguments>,
    rename: (this.apiCall.bind(this, 'groups.rename')) as Method<methods.GroupsRenameArguments>,
    replies: (this.apiCall.bind(this, 'groups.replies')) as Method<methods.GroupsRepliesArguments>,
    setPurpose: (this.apiCall.bind(this, 'groups.setPurpose')) as Method<methods.GroupsSetPurposeArguments>,
    setTopic: (this.apiCall.bind(this, 'groups.setTopic')) as Method<methods.GroupsSetTopicArguments>,
    unarchive: (this.apiCall.bind(this, 'groups.unarchive')) as Method<methods.GroupsUnarchiveArguments>,
  };

  /**
   * im method family
   */
  public readonly im = {
    close: (this.apiCall.bind(this, 'im.close')) as Method<methods.IMCloseArguments>,
    history: (this.apiCall.bind(this, 'im.history')) as Method<methods.IMHistoryArguments>,
    list: (this.apiCall.bind(this, 'im.list')) as Method<methods.IMListArguments>,
    mark: (this.apiCall.bind(this, 'im.mark')) as Method<methods.IMMarkArguments>,
    open: (this.apiCall.bind(this, 'im.open')) as Method<methods.IMOpenArguments>,
    replies: (this.apiCall.bind(this, 'im.replies')) as Method<methods.IMRepliesArguments>,
  };

  /**
   * migration method family
   */
  public readonly migration = {
    exchange: (this.apiCall.bind(this, 'migration.exchange')) as Method<methods.MigrationExchangeArguments>,
  };

  /**
   * mpim method family
   */
  public readonly mpim = {
    close: (this.apiCall.bind(this, 'mpim.close')) as Method<methods.MPIMCloseArguments>,
    history: (this.apiCall.bind(this, 'mpim.history')) as Method<methods.MPIMHistoryArguments>,
    list: (this.apiCall.bind(this, 'mpim.list')) as Method<methods.MPIMListArguments>,
    mark: (this.apiCall.bind(this, 'mpim.mark')) as Method<methods.MPIMMarkArguments>,
    open: (this.apiCall.bind(this, 'mpim.open')) as Method<methods.MPIMOpenArguments>,
    replies: (this.apiCall.bind(this, 'mpim.replies')) as Method<methods.MPIMRepliesArguments>,
  };

  /**
   * oauth method family
   */
  public readonly oauth = {
    access: (this.apiCall.bind(this, 'oauth.access')) as Method<methods.OAuthAccessArguments>,
    token: (this.apiCall.bind(this, 'oauth.token')) as Method<methods.OAuthTokenArguments>,
  };

  /**
   * pins method family
   */
  public readonly pins = {
    add: (this.apiCall.bind(this, 'pins.add')) as Method<methods.PinsAddArguments>,
    list: (this.apiCall.bind(this, 'pins.list')) as Method<methods.PinsListArguments>,
    remove: (this.apiCall.bind(this, 'pins.remove')) as Method<methods.PinsRemoveArguments>,
  };

  /**
   * reactions method family
   */
  public readonly reactions = {
    add: (this.apiCall.bind(this, 'reactions.add')) as Method<methods.ReactionsAddArguments>,
    get: (this.apiCall.bind(this, 'reactions.get')) as Method<methods.ReactionsGetArguments>,
    list: (this.apiCall.bind(this, 'reactions.list')) as Method<methods.ReactionsListArguments>,
    remove: (this.apiCall.bind(this, 'reactions.remove')) as Method<methods.ReactionsRemoveArguments>,
  };

  /**
   * reminders method family
   */
  public readonly reminders = {
    add: (this.apiCall.bind(this, 'reminders.add')) as Method<methods.RemindersAddArguments>,
    complete: (this.apiCall.bind(this, 'reminders.complete')) as Method<methods.RemindersCompleteArguments>,
    delete: (this.apiCall.bind(this, 'reminders.delete')) as Method<methods.RemindersDeleteArguments>,
    info: (this.apiCall.bind(this, 'reminders.info')) as Method<methods.RemindersInfoArguments>,
    list: (this.apiCall.bind(this, 'reminders.list')) as Method<methods.RemindersListArguments>,
  };

  /**
   * rtm method family
   */
  public readonly rtm = {
    connect: (this.apiCall.bind(this, 'rtm.connect')) as Method<methods.RTMConnectArguments>,
    start: (this.apiCall.bind(this, 'rtm.start')) as Method<methods.RTMStartArguments>,
  };

  /**
   * search method family
   */
  public readonly search = {
    all: (this.apiCall.bind(this, 'search.all')) as Method<methods.SearchAllArguments>,
    files: (this.apiCall.bind(this, 'search.files')) as Method<methods.SearchFilesArguments>,
    messages: (this.apiCall.bind(this, 'search.messages')) as Method<methods.SearchMessagesArguments>,
  };

  /**
   * stars method family
   */
  public readonly stars = {
    add: (this.apiCall.bind(this, 'stars.add')) as Method<methods.StarsAddArguments>,
    list: (this.apiCall.bind(this, 'stars.list')) as Method<methods.StarsListArguments>,
    remove: (this.apiCall.bind(this, 'stars.remove')) as Method<methods.StarsRemoveArguments>,
  };

  /**
   * team method family
   */
  public readonly team = {
    accessLogs: (this.apiCall.bind(this, 'team.accessLogs')) as Method<methods.TeamAccessLogsArguments>,
    billableInfo: (this.apiCall.bind(this, 'team.billableInfo')) as Method<methods.TeamBillableInfoArguments>,
    info: (this.apiCall.bind(this, 'team.info')) as Method<methods.TeamInfoArguments>,
    integrationLogs: (this.apiCall.bind(this, 'team.integrationLogs')) as Method<methods.TeamIntegrationLogsArguments>,
    profile: {
      get: (this.apiCall.bind(this, 'team.profile.get')) as Method<methods.TeamProfileGetArguments>,
    },
  };

  /**
   * usergroups method family
   */
  public readonly usergroups = {
    create: (this.apiCall.bind(this, 'usergroups.create')) as Method<methods.UsergroupsCreateArguments>,
    disable: (this.apiCall.bind(this, 'usergroups.disable')) as Method<methods.UsergroupsDisableArguments>,
    enable: (this.apiCall.bind(this, 'usergroups.enable')) as Method<methods.UsergroupsEnableArguments>,
    list: (this.apiCall.bind(this, 'usergroups.list')) as Method<methods.UsergroupsListArguments>,
    update: (this.apiCall.bind(this, 'usergroups.update')) as Method<methods.UsergroupsUpdateArguments>,
    users: {
      list: (this.apiCall.bind(this, 'usergroups.users.list')) as Method<methods.UsergroupsUsersListArguments>,
      update: (this.apiCall.bind(this, 'usergroups.users.update')) as Method<methods.UsergroupsUsersUpdateArguments>,
    },
  };

  /**
   * users method family
   */
  public readonly users = {
    conversations: (this.apiCall.bind(this, 'users.conversations')) as Method<methods.UsersConversationsArguments>,
    deletePhoto: (this.apiCall.bind(this, 'users.deletePhoto')) as Method<methods.UsersDeletePhotoArguments>,
    getPresence: (this.apiCall.bind(this, 'users.getPresence')) as Method<methods.UsersGetPresenceArguments>,
    identity: (this.apiCall.bind(this, 'users.identity')) as Method<methods.UsersIdentityArguments>,
    info: (this.apiCall.bind(this, 'users.info')) as Method<methods.UsersInfoArguments>,
    list: (this.apiCall.bind(this, 'users.list')) as Method<methods.UsersListArguments>,
    lookupByEmail: (this.apiCall.bind(this, 'users.lookupByEmail')) as Method<methods.UsersLookupByEmailArguments>,
    setActive: (this.apiCall.bind(this, 'users.setActive')) as Method<methods.UsersSetActiveArguments>,
    setPhoto: (this.apiCall.bind(this, 'users.setPhoto')) as Method<methods.UsersSetPhotoArguments>,
    setPresence: (this.apiCall.bind(this, 'users.setPresence')) as Method<methods.UsersSetPresenceArguments>,
    profile: {
      get: (this.apiCall.bind(this, 'users.profile.get')) as Method<methods.UsersProfileGetArguments>,
      set: (this.apiCall.bind(this, 'users.profile.set')) as Method<methods.UsersProfileSetArguments>,
    },
  };

  /**
   * Low-level function to make a single API request. handles queing, retries, and http-level errors
   */
  private async makeRequest(url: string, body: any, headers: any = {}): Promise<AxiosResponse> {
    // TODO: better input types - remove any
    const task = () => this.requestQueue.add(async () => {
      this.logger.debug('will perform http request');
      try {
        const requestTime = Date.now();
        const response = await this.axios.post(url, body, Object.assign({
          headers,
        }, this.tlsConfig));
        response.request[requestTimePropName] = requestTime;
        this.logger.debug('http response received');

        if (response.status === 429) {
          const retrySec = parseRetryHeaders(response);
          if (retrySec !== undefined) {
            this.emit('rate_limited', retrySec);
            if (this.rejectRateLimitedCalls) {
              throw new pRetry.AbortError(rateLimitedErrorWithDelay(retrySec));
            }
            this.logger.info(`API Call failed due to rate limiting. Will retry in ${retrySec} seconds.`);
            // pause the request queue and then delay the rejection by the amount of time in the retry header
            this.requestQueue.pause();
            // NOTE: if there was a way to introspect the current RetryOperation and know what the next timeout
            // would be, then we could subtract that time from the following delay, knowing that it the next
            // attempt still wouldn't occur until after the rate-limit header has specified. an even better
            // solution would be to subtract the time from only the timeout of this next attempt of the
            // RetryOperation. this would result in the staying paused for the entire duration specified in the
            // header, yet this operation not having to pay the timeout cost in addition to that.
            await delay(retrySec * 1000);
            // resume the request queue and throw a non-abort error to signal a retry
            this.requestQueue.start();
            throw Error('A rate limit was exceeded.');
          } else {
            // TODO: turn this into some CodedError
            throw new pRetry.AbortError(new Error('Retry header did not contain a valid timeout.'));
          }
        }

        // Slack's Web API doesn't use meaningful status codes besides 429 and 200
        if (response.status !== 200) {
          throw httpErrorFromResponse(response);
        }

        return response;
      } catch (error) {
        this.logger.warn('http request failed', error.message);
        if (error.request) {
          throw requestErrorWithOriginal(error);
        }
        throw error;
      }
    });

    return pRetry(task, this.retryConfig);
  }

  /**
   * Transforms options (a simple key-value object) into an acceptable value for a body. This can be either
   * a string, used when posting with a content-type of url-encoded. Or, it can be a readable stream, used
   * when the options contain a binary (a stream or a buffer) and the upload should be done with content-type
   * multipart/form-data.
   *
   * @param options arguments for the Web API method
   * @param headers a mutable object representing the HTTP headers for the outgoing request
   */
  private serializeApiCallOptions(options: WebAPICallOptions, headers?: any): string | Readable {
    // The following operation both flattens complex objects into a JSON-encoded strings and searches the values for
    // binary content
    let containsBinaryData = false;
    const flattened = objectEntries(options)
      .map(([key, value]) => {
        if (value === undefined || value === null) {
          return [];
        }

        let serializedValue = value;

        if (Buffer.isBuffer(value) || isStream(value)) {
          containsBinaryData = true;
        } else if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
          // if value is anything other than string, number, boolean, binary data, a Stream, or a Buffer, then encode it
          // as a JSON string.
          serializedValue = JSON.stringify(value);
        }

        return [key, serializedValue];
      });

    // A body with binary content should be serialized as multipart/form-data
    if (containsBinaryData) {
      this.logger.debug('request arguments contain binary data');
      const form = flattened.reduce((form, [key, value]) => {
        if (Buffer.isBuffer(value) || isStream(value)) {
          const options: FormData.AppendOptions = {};
          options.filename = (() => {
            // attempt to find filename from `value`. adapted from:
            // tslint:disable-next-line:max-line-length
            // https://github.com/form-data/form-data/blob/028c21e0f93c5fefa46a7bbf1ba753e4f627ab7a/lib/form_data.js#L227-L230
            // formidable and the browser add a name property
            // fs- and request- streams have path property
            const streamOrBuffer: any = (value as any);
            if (typeof streamOrBuffer.name === 'string') {
              return basename(streamOrBuffer.name);
            }
            if (typeof streamOrBuffer.path === 'string') {
              return basename(streamOrBuffer.path);
            }
            return defaultFilename;
          })();
          form.append(key, value, options);
        } else if (key !== undefined && value !== undefined) {
          form.append(key, value);
        }
        return form;
      }, new FormData());
      // Merge FormData provided headers into headers param
      // not reassigning to headers param since it is passed by reference and behaves as an inout param
      for (const [header, value] of objectEntries(form.getHeaders())) {
        headers[header] = value;
      }
      return form;
    }

    // Otherwise, a simple key-value object is returned
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return qsStringify(flattened.reduce((accumulator, [key, value]) => {
      if (key !== undefined && value !== undefined) {
        accumulator[key] = value;
      }
      return accumulator;
    }, {}));
  }

  /**
   * Processes an HTTP response into a WebAPICallResult by performing JSON parsing on the body and merging relevent
   * HTTP headers into the object.
   * @param response - an http response
   */
  private buildResult(response: AxiosResponse): WebAPICallResult {
    const data = response.data;

    // add scopes metadata from headers
    if (response.headers['x-oauth-scopes'] !== undefined) {
      data.scopes = (response.headers['x-oauth-scopes'] as string).trim().split(/\s*,\s*/);
    }
    if (response.headers['x-accepted-oauth-scopes'] !== undefined) {
      data.acceptedScopes = (response.headers['x-accepted-oauth-scopes'] as string).trim().split(/\s*,\s*/);
    }

    // add retry metadata from headers
    const retrySec = parseRetryHeaders(response);
    if (retrySec !== undefined) {
      data.retryAfter = retrySec;
    }

    return data;
  }

  /**
   * Determine if this client is in automatic token-refreshing mode
   */
  private get shouldAutomaticallyRefreshToken(): boolean {
    return (this.clientId !== undefined && this.clientSecret !== undefined && this.refreshToken !== undefined);
  }

  /**
   * Perform a token refresh. Before calling this method, this.shouldAutomaticallyRefreshToken should be checked.
   *
   * This method avoids using `apiCall()` because that could infinitely recurse when that method determines that the
   * access token is already expired.
   */
  private async performTokenRefresh(): Promise<void> {
    let refreshResponse: AxiosResponse | undefined;

    try {
      // TODO: if we change isTokenRefreshing to a promise, we could await it here.
      this.isTokenRefreshing = true;

      refreshResponse =  await this.makeRequest('oauth.access', {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'refresh_token',
        refresh_token: this.refreshToken,
      });

      if (!refreshResponse.data.ok) {
        throw platformErrorFromResponse(refreshResponse);
      }

    } catch (error) {
      this.isTokenRefreshing = false;
      throw refreshFailedErrorWithOriginal(error);
    }

    this.isTokenRefreshing = false;
    this.accessTokenLastRefreshedAt = Date.now();
    this._accessToken = refreshResponse.data.access_token;
    this.accessTokenExpiresAt = Date.now() + (refreshResponse.data.expires_in * 1000);

    const tokenRefreshedEvent: TokenRefreshedEvent = {
      access_token: refreshResponse.data.access_token,
      expires_in: refreshResponse.data.expires_in,
      team_id: refreshResponse.data.team_id,
      enterprise_id: refreshResponse.data.enterprise_id,
    };

    this.emit('token_refreshed', tokenRefreshedEvent);
  }
}

export default WebClient;

/*
 * Exported types
 */

export interface WebClientOptions {
  slackApiUrl?: string;
  /** Custom logger. Using a LoggingFunc is deprecated. */
  logger?: Logger | LoggingFunc;
  logLevel?: LogLevel;
  maxRequestConcurrency?: number;
  retryConfig?: RetryOptions;
  agent?: AgentOption;
  tls?: TLSOptions;
  pageSize?: number;
  rejectRateLimitedCalls?: boolean;
  clientId?: string; /* DEPRECATED */
  clientSecret?: string; /* DEPRECATED */
  refreshToken?: string; /* DEPRECATED */
  headers?: object;
}

export interface WebAPICallOptions {
}

export interface WebAPICallResult {
  ok: boolean;
  error?: string;
  scopes?: string[];
  acceptedScopes?: string[];
  retryAfter?: number;
  response_metadata?: {
    warnings?: string[];
    next_cursor?: string; // is this too specific to be encoded into this type?
  };
}

export interface WebAPIResultCallback {
  (error: WebAPICallError, result: WebAPICallResult): void;
}

export type WebAPICallError = WebAPIPlatformError | WebAPIRequestError | WebAPIReadError | WebAPIHTTPError |
  WebAPIRateLimitedError | WebAPIRefreshFailedError;

export interface WebAPIPlatformError extends CodedError {
  code: ErrorCode.PlatformError;
  data: WebAPICallResult & {
    error: string;
  };
}

export interface WebAPIRequestError extends CodedError {
  code: ErrorCode.RequestError;
  original: Error;
}

export interface WebAPIReadError extends CodedError {
  code: ErrorCode.ReadError;
  original: Error;
}

export interface WebAPIHTTPError extends CodedError {
  code: ErrorCode.HTTPError;
  original: Error; // TODO: deprecate
  statusCode: number;
  statusMessage: string;
  headers: IncomingHttpHeaders;
  body?: any;
}

export interface WebAPIRateLimitedError extends CodedError {
  code: ErrorCode.RateLimitedError;
  retryAfter: number;
}

export interface WebAPIRefreshFailedError extends CodedError {
  code: ErrorCode.RefreshFailedError;
  original: Error;
}

export interface TokenRefreshedEvent {
  access_token: string;
  expires_in: number;
  team_id: string;
  enterprise_id?: string;
}

/*
 * Helpers
 */

const defaultFilename = 'Untitled';
const requestTimePropName = 'slack_webclient_request_time';

/**
 * Determines whether WebAPICallOptions conform to UserPerspectiveEnabled
 */
function optionsAreUserPerspectiveEnabled(options: WebAPICallOptions): options is methods.UserPerspectiveEnabled {
  return (options as any).on_behalf_of !== undefined;
}

/**
 * A factory to create WebAPIRequestError objects
 * @param original - original error
 */
function requestErrorWithOriginal(original: Error): WebAPIRequestError {
  const error = errorWithCode(
    new Error(`A request error occurred: ${original.message}`),
    ErrorCode.RequestError,
  ) as Partial<WebAPIRequestError>;
  error.original = original;
  return (error as WebAPIRequestError);
}

/**
 * A factory to create WebAPIHTTPError objects
 * @param response - original error
 */
function httpErrorFromResponse(response: AxiosResponse): WebAPIHTTPError {
  const error = errorWithCode(
    new Error(`An HTTP protocol error occurred: statusCode = ${response.status}`),
    ErrorCode.HTTPError,
  ) as Partial<WebAPIHTTPError>;
  error.original = new Error('The WebAPIHTTPError.original property is deprecated. See other properties for details.');
  error.statusCode = response.status;
  error.statusMessage = response.statusText;
  error.headers = response.headers;
  error.body = response.data;
  return (error as WebAPIHTTPError);
}

/**
 * A factory to create WebAPIPlatformError objects
 * @param result - Web API call result
 */
function platformErrorFromResult(result: WebAPICallResult & { error: string; }): WebAPIPlatformError {
  const error = errorWithCode(
    new Error(`An API error occurred: ${result.error}`),
    ErrorCode.PlatformError,
  ) as Partial<WebAPIPlatformError>;
  error.data = result;
  return (error as WebAPIPlatformError);
}

/**
 * A factory to create WebAPIPlatformError objects
 * @param response - Axios response
 */
function platformErrorFromResponse(response: AxiosResponse & { data: { error: string; };}): WebAPIPlatformError {
  const error = errorWithCode(
    new Error(`An API error occurred: ${response.data.error}`),
    ErrorCode.PlatformError,
  ) as Partial<WebAPIPlatformError>;
  error.data = response.data;
  return (error as WebAPIPlatformError);
}

/**
 * A factory to create WebAPIRateLimitedError objects
 * @param retrySec - Number of seconds that the request can be retried in
 */
function rateLimitedErrorWithDelay(retrySec: number): WebAPIRateLimitedError {
  const error = errorWithCode(
    new Error(`A rate-limit has been reached, you may retry this request in ${retrySec} seconds`),
    ErrorCode.RateLimitedError,
  ) as Partial<WebAPIRateLimitedError>;
  error.retryAfter = retrySec;
  return (error as WebAPIRateLimitedError);
}

/**
 * A factory to create WebAPIRefreshFailedError objects
 * @param original - Original error
 */
function refreshFailedErrorWithOriginal(original: WebAPICallError): WebAPIRefreshFailedError {
  const error = errorWithCode(
    new Error(`A token refresh error occurred: ${original.message}`),
    ErrorCode.RefreshFailedError,
  ) as Partial<WebAPIRefreshFailedError>;
  error.original = original;
  return (error as WebAPIRefreshFailedError);
}

enum PaginationType {
  Cursor = 'Cursor',
  Timeline = 'Timeline',
  Traditional = 'Traditional',
  Mixed = 'Mixed',
  None = 'None',
}

/**
 * Determines which pagination type, if any, the supplied options (a.k.a. method arguments) are using. This method is
 * also able to determine if the options have mixed different pagination types.
 */
function getOptionsPaginationType(options?: WebAPICallOptions): PaginationType {
  if (options === undefined) {
    return PaginationType.None;
  }

  let optionsType = PaginationType.None;
  for (const option of Object.keys(options)) {
    if (optionsType === PaginationType.None) {
      if (methods.cursorPaginationOptionKeys.has(option)) {
        optionsType = PaginationType.Cursor;
      } else if (methods.timelinePaginationOptionKeys.has(option)) {
        optionsType = PaginationType.Timeline;
      } else if (methods.traditionalPagingOptionKeys.has(option)) {
        optionsType = PaginationType.Traditional;
      }
    } else if (optionsType === PaginationType.Cursor) {
      if (methods.timelinePaginationOptionKeys.has(option) || methods.traditionalPagingOptionKeys.has(option)) {
        return PaginationType.Mixed;
      }
    } else if (optionsType === PaginationType.Timeline) {
      if (methods.cursorPaginationOptionKeys.has(option) || methods.traditionalPagingOptionKeys.has(option)) {
        return PaginationType.Mixed;
      }
    } else if (optionsType === PaginationType.Traditional) {
      if (methods.cursorPaginationOptionKeys.has(option) || methods.timelinePaginationOptionKeys.has(option)) {
        return PaginationType.Mixed;
      }
    }
  }
  return optionsType;
}

/**
 * Creates a function that can reduce a result into an accumulated result. This is used for reducing many results from
 * automatically paginated API calls into a single result. It depends on metadata in the 'method' import.
 * @param method - the API method for which a result merging function is needed
 */
function createResultMerger(method: string):
    (accumulator: WebAPICallResult, result: WebAPICallResult) => WebAPICallResult {
  if (methods.cursorPaginationEnabledMethods.has(method)) {
    const paginatedResponseProperty = methods.cursorPaginationEnabledMethods.get(method) as string;
    return (accumulator: WebAPICallResult, result: WebAPICallResult): WebAPICallResult => {
      for (const resultProperty of Object.keys(result)) {
        if (resultProperty === paginatedResponseProperty) {
          if (accumulator[resultProperty] === undefined) {
            accumulator[resultProperty] = [];
          }
          accumulator[resultProperty] = accumulator[resultProperty].concat(result[resultProperty]);
        } else {
          accumulator[resultProperty] = result[resultProperty];
        }
      }
      return accumulator;
    };
  }
  // For all methods who don't use cursor-pagination, return the identity reduction function
  return (_, result) => result;
}

/**
 * Determines an appropriate set of cursor pagination options for the next request to a paginated API method.
 * @param previousResult - the result of the last request, where the next cursor might be found.
 * @param pageSize - the maximum number of additional items to fetch in the next request.
 */
function paginationOptionsForNextPage(
  previousResult: WebAPICallResult, pageSize: number,
): methods.CursorPaginationEnabled {
  const paginationOptions: methods.CursorPaginationEnabled = {};
  if (previousResult.response_metadata !== undefined &&
    previousResult.response_metadata.next_cursor !== undefined &&
    previousResult.response_metadata.next_cursor !== '') {
    paginationOptions.limit = pageSize;
    paginationOptions.cursor = previousResult.response_metadata.next_cursor as string;
  }
  return paginationOptions;
}

/**
 * Extract the amount of time (in seconds) the platform has recommended this client wait before sending another request
 * from a rate-limited HTTP response (statusCode = 429).
 */
function parseRetryHeaders(response: AxiosResponse): number | undefined {
  if (response.headers['retry-after'] !== undefined) {
    return parseInt((response.headers['retry-after'] as string), 10);
  }
  return undefined;
}
