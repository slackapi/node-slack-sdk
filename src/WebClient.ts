import { Readable } from 'stream';
import objectEntries = require('object.entries'); // tslint:disable-line:no-require-imports
import * as pjson from 'pjson';
import urlJoin = require('url-join'); // tslint:disable-line:no-require-imports
import isStream = require('is-stream'); // tslint:disable-line:no-require-imports
import EventEmitter = require('eventemitter3'); // tslint:disable-line:import-name no-require-imports
import PQueue = require('p-queue'); // tslint:disable-line:import-name no-require-imports
import pRetry = require('p-retry'); // tslint:disable-line:no-require-imports
import delay = require('delay'); // tslint:disable-line:no-require-imports
// NOTE: to reduce depedency size, consider https://www.npmjs.com/package/got-lite
import got = require('got'); // tslint:disable-line:no-require-imports
import FormData = require('form-data'); // tslint:disable-line:no-require-imports import-name
import { callbackify, getUserAgent, AgentOption, TLSOptions } from './util';
import { CodedError, errorWithCode, ErrorCode } from './errors';
import { LogLevel, Logger, LoggingFunc, getLogger, loggerFromLoggingFunc } from './logger';
import retryPolicies, { RetryOptions } from './retry-policies';
import Method, * as methods from './methods'; // tslint:disable-line:import-name

/**
 * A client for Slack's Web API
 *
 * This client provides an alias for each {@link https://api.slack.com/methods|Web API method}. Each method is
 * a convenience wrapper for calling the {@link WebClient#apiCall} method using the method name as the first parameter.
 */
export class WebClient extends EventEmitter {
  /**
   * Authentication and authorization token for accessing Slack Web API (usually begins with `xoxp`, `xoxb`, or `xoxa`)
   */
  public readonly token: string;

  /**
   * The base URL for reaching Slack's Web API. Consider changing this value for testing purposes.
   */
  public readonly slackApiUrl: string;

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
   * An agent used to manage TCP connections for requests. Most commonly used to implement proxy support. See
   * npm packages `tunnel` and `https-proxy-agent` for information on how to construct a proxy agent.
   */
  private agentConfig?: AgentOption;

  /**
   * Configuration for custom TLS handling
   */
  private tlsConfig: TLSOptions;

  /**
   * The name used to prefix all logging generated from this object
   */
  private static loggerName = `${pjson.name}:WebClient`;

  /**
   * This object's logger instance
   */
  private logger: Logger;

  /**
   * The value for the User-Agent HTTP header (used for instrumentation).
   */
  private userAgent: string;

  /**
   * @param token - An API token to authenticate/authorize with Slack (usually start with `xoxp`, `xoxb`, or `xoxa`)
   */
  constructor(token: string, {
    slackApiUrl = 'https://slack.com/api/',
    logger = undefined,
    logLevel = LogLevel.INFO,
    maxRequestConcurrency = 3,
    retryConfig = retryPolicies.retryForeverExponentialCappedRandom,
    agent = undefined,
    tls = undefined,
  }: WebClientOptions = {}) {
    super();
    this.token = token;
    this.slackApiUrl = slackApiUrl;

    this.retryConfig = retryConfig;
    this.requestQueue = new PQueue({ concurrency: maxRequestConcurrency });
    this.agentConfig = agent;
    // NOTE: may want to filter the keys to only those acceptable for TLS options
    this.tlsConfig = tls !== undefined ? tls : {};

    // Logging
    if (logger !== undefined) {
      this.logger = loggerFromLoggingFunc(WebClient.loggerName, logger);
    } else {
      this.logger = getLogger(WebClient.loggerName);
    }
    this.logger.setLevel(logLevel);
    this.userAgent = getUserAgent();

    this.logger.debug('initialized');
  }

  /**
   * Generic method for calling a Web API method
   *
   * @param method the Web API method to call {@see https://api.slack.com/methods}
   * @param options options
   * @param callback callback if you don't want a promise returned
   */
  public apiCall(method: string, options?: WebAPICallOptions): Promise<WebAPICallResult>;
  public apiCall(method: string, options: WebAPICallOptions, callback: WebAPIResultCallback): void;
  public apiCall(method: string,
                 options?: WebAPICallOptions,
                 callback?: WebAPIResultCallback): void | Promise<WebAPICallResult> {
    this.logger.debug('apiCall() start');

    // The following thunk is the actual implementation for this method. It is wrapped so that it can be adapted for
    // different executions below.
    const implementation = () => {

      const requestBody = this.serializeApiCallOptions(Object.assign({ token: this.token }, options));

      // The following thunk encapsulates the task so that it can be coordinated for retries
      const task = () => {
        this.logger.debug('request attempt');
        return got.post(urlJoin(this.slackApiUrl, method),
          // @ts-ignore using older definitions for package `got`, can remove when type `@types/got` is updated for v8
          Object.assign({
            form: !canBodyBeFormMultipart(requestBody),
            body: requestBody,
            retries: 0,
            headers: {
              'user-agent': this.userAgent,
            },
            agent: this.agentConfig,
          }, this.tlsConfig),
        )
          .catch((error: got.GotError) => {
            // Wrap errors in this packages own error types (abstract the implementation details' types)
            if (error.name === 'RequestError') {
              throw requestErrorWithOriginal(error);
            } else if (error.name === 'ReadError') {
              throw readErrorWithOriginal(error);
            } else if (error.name === 'HTTPError') {
              throw httpErrorWithOriginal(error);
            } else {
              throw error;
            }
          })
          .then((response: got.Response<string>) => {
            const result = this.buildResult(response);
            // log warnings in response metadata
            if (result.response_metadata !== undefined && result.response_metadata.warnings !== undefined) {
              result.response_metadata.warnings.forEach(this.logger.warn);
            }

            // handle rate-limiting
            if (response.statusCode !== undefined && response.statusCode === 429) {
              const retryAfterMs = result.retryAfter !== undefined ? result.retryAfter : (60 * 1000);
              // NOTE: the following event could have more information regarding the api call that is being delayed
              this.emit('rate_limited', retryAfterMs / 1000);
              this.logger.info(`API Call failed due to rate limiting. Will retry in ${retryAfterMs / 1000} seconds.`);
              // wait and return the result from calling `task` again after the specified number of seconds
              return delay(retryAfterMs).then(task);
            }

            // For any error in the API response, treat them as irrecoverable by throwing an AbortError to end retries.
            if (!result.ok) {
              const error = errorWithCode(
                new Error(`An API error occurred: ${result.error}`),
                ErrorCode.PlatformError,
              );
              error.data = result;
              throw new pRetry.AbortError(error);
            }

            return result;
          });
      };

      // The following thunk encapsulates the retried task so that it can be coordinated for request queuing
      const taskAfterRetries = () => pRetry(task, this.retryConfig);

      // The final return value is the resolution of the task after being retried and queued
      return this.requestQueue.add(taskAfterRetries);
    };

    // Adapt the interface for callback-based execution or Promise-based execution
    if (callback !== undefined) {
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
   * Transforms options into an object suitable for got to use as a body. This can be one of two things:
   * -  A FormCanBeURLEncoded object, which is just a key-value object where the values have been flattened and
   *    got can serialize it into application/x-www-form-urlencoded content type.
   * -  A BodyCanBeFormMultipart: when the options includes a file, and got must use multipart/form-data content type.
   *
   * @param options arguments for the Web API method
   */
  private serializeApiCallOptions(options: WebAPICallOptions): FormCanBeURLEncoded | BodyCanBeFormMultipart {

    // Special treatment for binary file content
    let containsBinaryData = false;
    if ('file' in options) {
      containsBinaryData = true;
      // TypeScript treats `in` as a type guard. The implementation assumes most types are "sealed", which is not what
      // WebAPICallOptions is. See discussion: https://github.com/Microsoft/TypeScript/issues/10485
      //
      // For now, we can make a type assertion to get around this behavior, but in the future lets push for a better
      // treatment from the compiler. Maybe https://github.com/Microsoft/TypeScript/issues/21732 will be the solution.
      //
      // This could also be resolved by making the above condition a type guard for FilesUploadArguments. Let's expore
      // this solution when all the arguments in `./methods.ts` are more fully defined.
      // @ts-ignore
      // if (Buffer.isBuffer((options as WebAPICallOptions).file)) {
      //   if (!('filename' in options)) {
      //     this.logger.warn('`file` option is a Buffer, but there is no `filename` option. this upload will likely ' +
      //                      'fail. add the `filename` option to fix.');
      //   }

      // Buffers are sometimes not handled well by the underlying `form-data` package. Adding extra metadata resolves
      // that issue. See: https://github.com/slackapi/node-slack-sdk/issues/307#issuecomment-289231737
      if (options['file'] && !options['file'].value) {
        options['file'] = {
          value: options['file'],
          options: {
            filename: options['filename'],
          },
        };
      }
    }

    const flattened = objectEntries(options)
      .map(([key, value]) => {
        if (value === undefined) {
          return [];
        }
        let serializedValue = value;
        // if value is anything other than string, number, boolean, or the specially treated file key, then
        // encode it as a JSON string.
        if (key !== 'file' && typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
          serializedValue = JSON.stringify(value);
        }
        return [key, serializedValue];
      });

    // a body with binary data should be serialized as multipart/form-data
    if (containsBinaryData) {
      return flattened.reduce((form, [key, value]) => {
        if (key === 'file' && value.value) {
          form.append(key, value.value, value.options);
          return form;
        }
        form.append(key, value);
        return form;
      }, new FormData());
    }

    return flattened.reduce((accumulator, [key, value]) => {
      if (key !== undefined && value !== undefined) {
        accumulator[key] = value;
      }
      return accumulator;
    }, {});
  }

  /**
   * Processes an HTTP response into a WebAPICallResult by performing JSON parsing on the body and merging relevent
   * HTTP headers into the object.
   * @param response
   */
  private buildResult(response: got.Response<string>): WebAPICallResult {
    const data = JSON.parse(response.body);

    // add scopes metadata from headers
    if (response.headers['x-oauth'] !== undefined) {
      data.scopes = (response.headers['x-oauth-scopes'] as string).trim().split(/\s*,\s*/);
    }
    if (response.headers['x-accepted-oauth-scopes'] !== undefined) {
      data.acceptedScopes = (response.headers['x-accepted-oauth-scopes'] as string).trim().split(/\s*,\s*/);
    }

    // add retry metadata from headers
    if (response.headers['retry-after'] !== undefined) {
      data.retryAfter = parseInt((response.headers['retry-after'] as string), 10) * 1000;
    }

    return data;
  }
}

export default WebClient;

/*
 * Exported types
 */

export interface WebClientOptions {
  slackApiUrl?: string; // SEMVER:MAJOR casing change from previous
  logger?: LoggingFunc;
  logLevel?: LogLevel;
  maxRequestConcurrency?: number;
  retryConfig?: RetryOptions;
  agent?: AgentOption;
  tls?: TLSOptions;
}

// NOTE: could potentially add GotOptions to this interface (using &, or maybe as an embedded key)
export interface WebAPICallOptions {
}

export interface WebAPICallResult {
  ok: boolean;
  error?: string;
  scopes?: string[];
  acceptedScopes?: string[];
  retryAfter?: number;
  response_metadata?: { warnings?: string[] };
}

export interface WebAPIResultCallback {
  (error: WebAPICallError, result: WebAPICallResult): void;
}

export type WebAPICallError = WebAPIPlatformError | WebAPIRequestError | WebAPIReadError | WebAPIHTTPError;

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
  original: Error;
}

/*
 * Helpers
 */

interface FormCanBeURLEncoded {
  [key: string]: string | number | boolean;
}

interface BodyCanBeFormMultipart extends Readable { }

/**
 * Determines whether a request body object should be treated as FormData-encodable (Content-Type=multipart/form-data).
 * @param body a request body
 */
function canBodyBeFormMultipart(body: FormCanBeURLEncoded | BodyCanBeFormMultipart): body is BodyCanBeFormMultipart {
  // tried using `isStream.readable(body)` but that failes because the object doesn't have a `_read()` method or a
  // `_readableState` property
  return isStream(body);
}


/**
 * A factory to create WebAPIRequestError objects
 * @param original
 */
function requestErrorWithOriginal(original: Error): WebAPIRequestError {
  const error = errorWithCode(
    // any cast is used because the got definition file doesn't export the got.RequestError type
    new Error(`A request error occurred: ${(original as any).code}`),
    ErrorCode.RequestError,
  ) as Partial<WebAPIRequestError>;
  error.original = original;
  return (error as WebAPIRequestError);
}

/**
 * A factory to create WebAPIReadError objects
 * @param original
 */
function readErrorWithOriginal(original: Error): WebAPIReadError {
  const error = errorWithCode(
    // any cast is used because the got definition file doesn't export the got.ReadError type
    new Error('A response read error occurred'),
    ErrorCode.ReadError,
  ) as Partial<WebAPIReadError>;
  error.original = original;
  return (error as WebAPIReadError);
}

/**
 * A factory to create WebAPIHTTPError objects
 * @param original
 */
function httpErrorWithOriginal(original: Error): WebAPIHTTPError {
  const error = errorWithCode(
    // any cast is used because the got definition file doesn't export the got.HTTPError type
    new Error(`An HTTP protocol error occurred: statusCode = ${(original as any).statusCode}`),
    ErrorCode.HTTPError,
  ) as Partial<WebAPIHTTPError>;
  error.original = original;
  return (error as WebAPIHTTPError);
}
