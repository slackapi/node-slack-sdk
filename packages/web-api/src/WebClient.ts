/// <reference lib="esnext.asynciterable" />

// polyfill for async iterable. see: https://stackoverflow.com/a/43694282/305340
// can be removed once node v10 is the minimum target (node v8 and v9 require --harmony_async_iteration flag)
if (Symbol['asyncIterator'] === undefined) { ((Symbol as any)['asyncIterator']) = Symbol.for('asyncIterator'); }

import { stringify as qsStringify } from 'querystring';
import { Agent } from 'http';
import { basename } from 'path';
import { Readable } from 'stream';
import { SecureContextOptions } from 'tls';

import isStream from 'is-stream';
import { EventEmitter } from 'eventemitter3';
import PQueue from 'p-queue'; // tslint:disable-line:import-name
import pRetry, { AbortError } from 'p-retry';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import FormData from 'form-data'; // tslint:disable-line:import-name
import { getUserAgent } from './instrument';
import {
  requestErrorWithOriginal, httpErrorFromResponse, platformErrorFromResult, rateLimitedErrorWithDelay,
} from './errors';
import { LogLevel, Logger, getLogger } from './logger';
import retryPolicies, { RetryOptions } from './retry-policies';
import { delay } from './helpers';

/**
 * A client for Slack's Web API
 *
 * This client provides an alias for each {@link https://api.slack.com/methods|Web API method}. Each method is
 * a convenience wrapper for calling the {@link WebClient#apiCall} method using the method name as the first parameter.
 */
export class WebClient extends EventEmitter<WebClientEvent> {
  /**
   * The base URL for reaching Slack's Web API. Consider changing this value for testing purposes.
   */
  public readonly slackApiUrl: string;

  /**
   * Authentication and authorization token for accessing Slack Web API (usually begins with `xoxp` or `xoxb`)
   */
  public readonly token?: string;

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
   * Preference for immediately rejecting API calls which result in a rate-limited response
   */
  private rejectRateLimitedCalls: boolean;

  /**
   * The name used to prefix all logging generated from this object
   */
  private static loggerName = 'WebClient';

  /**
   * This object's logger instance
   */
  private logger: Logger;

  /**
   * @param token - An API token to authenticate/authorize with Slack (usually start with `xoxp`, `xoxb`)
   */
  constructor(token?: string, {
    slackApiUrl = 'https://slack.com/api/',
    logger = undefined,
    logLevel = LogLevel.INFO,
    maxRequestConcurrency = 3,
    retryConfig = retryPolicies.tenRetriesInAboutThirtyMinutes,
    agent = undefined,
    tls = undefined,
    rejectRateLimitedCalls = false,
    headers = {},
  }: WebClientOptions = {}) {
    super();
    this.token = token;
    this.slackApiUrl = slackApiUrl;

    this.retryConfig = retryConfig;
    this.requestQueue = new PQueue({ concurrency: maxRequestConcurrency });
    // NOTE: may want to filter the keys to only those acceptable for TLS options
    this.tlsConfig = tls !== undefined ? tls : {};
    this.rejectRateLimitedCalls = rejectRateLimitedCalls;

    // Logging
    if (typeof logger !== 'undefined') {
      this.logger = logger;
      if (typeof logLevel !== 'undefined') {
        this.logger.debug('The logLevel given to WebClient was ignored as you also gave logger');
      }
    } else {
      this.logger = getLogger(WebClient.loggerName, logLevel, logger);
    }

    this.axios = axios.create({
      baseURL: slackApiUrl,
      headers: Object.assign(
        {
          'User-Agent': getUserAgent(),
        },
        headers,
      ),
      httpAgent: agent,
      httpsAgent: agent,
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

    this.logger.debug('initialized');
  }

  /**
   * Generic method for calling a Web API method
   *
   * @param method the Web API method to call {@see https://api.slack.com/methods}
   * @param options options
   */
  public async apiCall(method: string, options?: WebAPICallOptions): Promise<WebAPICallResult> {
    this.logger.debug(`apiCall('${method}') start`);

    if (typeof options === 'string' || typeof options === 'number' || typeof options === 'boolean') {
      throw new TypeError(`Expected an options argument but instead received a ${typeof options}`);
    }

    const response = await this.makeRequest(method, Object.assign(
      { token: this.token },
      options,
    ));
    const result = this.buildResult(response);

    // log warnings in response metadata
    if (result.response_metadata !== undefined && result.response_metadata.warnings !== undefined) {
      result.response_metadata.warnings.forEach(this.logger.warn.bind(this.logger));
    }

    if (!result.ok) {
      throw platformErrorFromResult(result as (WebAPICallResult & { error: string; }));
    }

    return result;
  }

  /**
   * Iterate over the result pages of a cursor-paginated Web API method. This method can return two types of values,
   * depending on which arguments are used. When up to two parameters are used, the return value is an async iterator
   * which can be used as the iterable in a for-await-of loop. When three or four parameters are used, the return
   * value is a promise that resolves at the end of iteration. The third parameter, `shouldStop`, is a function that is
   * called with each `page` and can end iteration by returning `true`. The fourth parameter, `reduce`, is a function
   * that is called with three arguments: `accumulator`, `page`, and `index`. The `accumulator` is a value of any type
   * you choose, but it will contain `undefined` when `reduce` is called for the first time. The `page` argument and
   * `index` arguments are exactly what they say they are. The `reduce` function's return value will be passed in as
   * `accumulator` the next time its called, and the returned promise will resolve to the last value of `accumulator`.
   *
   * The for-await-of syntax is part of ES2018. It is available natively in Node starting with v10.0.0. You may be able
   * to use it in earlier JavaScript runtimes by transpiling your source with a tool like Babel. However, the
   * transpiled code will likely sacrifice performance.
   *
   * @param method the cursor-paginated Web API method to call {@see https://api.slack.com/docs/pagination}
   * @param options options
   * @param shouldStop a predicate that is called with each page, and should return true when pagination can end.
   * @param reduce a callback that can be used to accumulate a value that the return promise is resolved to
   */
  public paginate(method: string, options?: WebAPICallOptions): AsyncIterator<WebAPICallResult>;
  public paginate(
    method: string,
    options: WebAPICallOptions,
    shouldStop: PaginatePredicate,
  ): Promise<void>;
  public paginate<R extends PageReducer, A extends PageAccumulator<R>>(
    method: string,
    options: WebAPICallOptions,
    shouldStop: PaginatePredicate,
    reduce?: PageReducer<A>,
  ): Promise<A>;
  public paginate<R extends PageReducer, A extends PageAccumulator<R>>(
    method: string,
    options?: WebAPICallOptions,
    shouldStop?: PaginatePredicate,
    reduce?: PageReducer<A>,
  ): (Promise<A> | AsyncIterator<WebAPICallResult>) {

    if (!cursorPaginationEnabledMethods.has(method)) {
      this.logger.warn(`paginate() called with method ${method}, which is not known to be cursor pagination enabled.`);
    }

    const pageSize = (() => {
      if (options !== undefined && typeof options.limit === 'number') {
        const limit = options.limit;
        delete options.limit;
        return limit;
      }
      return defaultPageSize;
    })();

    async function* generatePages(this: WebClient): AsyncIterableIterator<WebAPICallResult> {
      // when result is undefined, that signals that the first of potentially many calls has not yet been made
      let result: WebAPICallResult | undefined = undefined;
      // paginationOptions stores pagination options not already stored in the options argument
      let paginationOptions: CursorPaginationEnabled | undefined = {
        limit: pageSize,
      };
      if (options !== undefined && options.cursor !== undefined) {
        paginationOptions.cursor = options.cursor as string;
      }

      // NOTE: test for the situation where you're resuming a pagination using and existing cursor

      while (result === undefined || paginationOptions !== undefined) {
        result = await this.apiCall(method, Object.assign(options !== undefined ? options : {}, paginationOptions));
        yield result;
        paginationOptions = paginationOptionsForNextPage(result, pageSize);
      }
    }

    if (shouldStop === undefined) {
      return generatePages.call(this);
    }

    const pageReducer: PageReducer<A> = (reduce !== undefined) ? reduce : noopPageReducer;
    let index = 0;

    return (async () => {
      // Unroll the first iteration of the iterator
      // This is done primarily because in order to satisfy the type system, we need a variable that is typed as A
      // (shown as accumulator before), but before the first iteration all we have is a variable typed A | undefined.
      // Unrolling the first iteration allows us to deal with undefined as a special case.

      const pageIterator: AsyncIterableIterator<WebAPICallResult> = generatePages.call(this);
      const firstIteratorResult = await pageIterator.next(undefined);
      // Assumption: there will always be at least one result in a paginated API request
      // if (firstIteratorResult.done) { return; }
      const firstPage = firstIteratorResult.value;
      let accumulator: A = pageReducer(undefined, firstPage, index);
      index += 1;
      if (shouldStop(firstPage)) {
        return accumulator;
      }

      // Continue iteration
      for await (const page of pageIterator) {
        accumulator = pageReducer(accumulator, page, index);
        if (shouldStop(page)) {
          return accumulator;
        }
        index += 1;
      }
      return accumulator;
    })();
  }

  /**
   * admin method family
   */
  public readonly admin = {
    apps: {
      approve: (this.apiCall.bind(this, 'admin.apps.approve')) as Method<AdminAppsApproveArguments>,
      requests: {
        list: (this.apiCall.bind(this, 'admin.apps.requests.list')) as Method<AdminAppsRequestsListArguments>,
      },
      restrict: (this.apiCall.bind(this, 'admin.apps.restrict')) as Method<AdminAppsRestrictArguments>,
    },
    inviteRequests: {
      approve: (this.apiCall.bind(
        this, 'admin.inviteRequests.approve')) as Method<AdminInviteRequestsApproveArguments>,
      deny: (this.apiCall.bind(
        this, 'admin.inviteRequests.deny')) as Method<AdminInviteRequestsDenyArguments>,
      list: (this.apiCall.bind(
        this, 'admin.inviteRequests.list')) as Method<AdminInviteRequestsListArguments>,
      approved: {
        list: (this.apiCall.bind(
          this, 'admin.inviteRequests.approved.list')) as Method<AdminInviteRequestsApprovedListArguments>,
      },
      denied: {
        list: (this.apiCall.bind(
          this, 'admin.inviteRequests.denied.list')) as Method<AdminInviteRequestsDeniedListArguments>,
      },
    },
    teams: {
      admins: {
        list: (this.apiCall.bind(this, 'admin.teams.admins.list')) as Method<AdminTeamsAdminsListArguments>,
      },
      owners: {
        list: (this.apiCall.bind(this, 'admin.teams.owners.list')) as Method<AdminTeamsOwnersListArguments>,
      },
      create: (this.apiCall.bind(this, 'admin.teams.create')) as Method<AdminTeamsCreateArguments>,
    },
    users: {
      session: {
        reset:
          (this.apiCall.bind(this, 'admin.users.session.reset')) as Method<AdminUsersSessionResetArguments>,
      },
      assign: (this.apiCall.bind(this, 'admin.users.assign')) as Method<AdminUsersAssignArguments>,
      invite: (this.apiCall.bind(this, 'admin.users.invite')) as Method<AdminUsersInviteArguments>,
      remove: (this.apiCall.bind(this, 'admin.users.remove')) as Method<AdminUsersRemoveArguments>,
      setAdmin: (this.apiCall.bind(this, 'admin.users.setAdmin')) as Method<AdminUsersSetAdminArguments>,
      setOwner: (this.apiCall.bind(this, 'admin.users.setOwner')) as Method<AdminUsersSetOwnerArguments>,
      setRegular: (this.apiCall.bind(this, 'admin.users.setRegular')) as Method<AdminUsersSetRegularArguments>,
    },
  };

  /**
   * api method family
   */
  public readonly api = {
    test: (this.apiCall.bind(this, 'api.test')) as Method<APITestArguments>,
  };

  /**
   * auth method family
   */
  public readonly auth = {
    revoke: (this.apiCall.bind(this, 'auth.revoke')) as Method<AuthRevokeArguments>,
    test: (this.apiCall.bind(this, 'auth.test')) as Method<AuthTestArguments>,
  };

  /**
   * bots method family
   */
  public readonly bots = {
    info: (this.apiCall.bind(this, 'bots.info')) as Method<BotsInfoArguments>,
  };

  /**
   * channels method family
   */
  public readonly channels = {
    archive: (this.apiCall.bind(this, 'channels.archive')) as Method<ChannelsArchiveArguments>,
    create: (this.apiCall.bind(this, 'channels.create')) as Method<ChannelsCreateArguments>,
    history: (this.apiCall.bind(this, 'channels.history')) as Method<ChannelsHistoryArguments>,
    info: (this.apiCall.bind(this, 'channels.info')) as Method<ChannelsInfoArguments>,
    invite: (this.apiCall.bind(this, 'channels.invite')) as Method<ChannelsInviteArguments>,
    join: (this.apiCall.bind(this, 'channels.join')) as Method<ChannelsJoinArguments>,
    kick: (this.apiCall.bind(this, 'channels.kick')) as Method<ChannelsKickArguments>,
    leave: (this.apiCall.bind(this, 'channels.leave')) as Method<ChannelsLeaveArguments>,
    list: (this.apiCall.bind(this, 'channels.list')) as Method<ChannelsListArguments>,
    mark: (this.apiCall.bind(this, 'channels.mark')) as Method<ChannelsMarkArguments>,
    rename: (this.apiCall.bind(this, 'channels.rename')) as Method<ChannelsRenameArguments>,
    replies: (this.apiCall.bind(this, 'channels.replies')) as Method<ChannelsRepliesArguments>,
    setPurpose: (this.apiCall.bind(this, 'channels.setPurpose')) as Method<ChannelsSetPurposeArguments>,
    setTopic: (this.apiCall.bind(this, 'channels.setTopic')) as Method<ChannelsSetTopicArguments>,
    unarchive: (this.apiCall.bind(this, 'channels.unarchive')) as Method<ChannelsUnarchiveArguments>,
  };

  /**
   * chat method family
   */
  public readonly chat = {
    delete: (this.apiCall.bind(this, 'chat.delete')) as Method<ChatDeleteArguments>,
    deleteScheduledMessage:
      (this.apiCall.bind(this, 'chat.deleteScheduledMessage')) as Method<ChatDeleteScheduledMessageArguments>,
    getPermalink: (this.apiCall.bind(this, 'chat.getPermalink')) as Method<ChatGetPermalinkArguments>,
    meMessage: (this.apiCall.bind(this, 'chat.meMessage')) as Method<ChatMeMessageArguments>,
    postEphemeral: (this.apiCall.bind(this, 'chat.postEphemeral')) as Method<ChatPostEphemeralArguments>,
    postMessage: (this.apiCall.bind(this, 'chat.postMessage')) as Method<ChatPostMessageArguments>,
    scheduleMessage: (this.apiCall.bind(this, 'chat.scheduleMessage')) as Method<ChatScheduleMessageArguments>,
    scheduledMessages: {
      list:
        (this.apiCall.bind(this, 'chat.scheduledMessages.list')) as Method<ChatScheduledMessagesListArguments>,
    },
    unfurl: (this.apiCall.bind(this, 'chat.unfurl')) as Method<ChatUnfurlArguments>,
    update: (this.apiCall.bind(this, 'chat.update')) as Method<ChatUpdateArguments>,
  };

  /**
   * conversations method family
   */
  public readonly conversations = {
    archive: (this.apiCall.bind(this, 'conversations.archive')) as Method<ConversationsArchiveArguments>,
    close: (this.apiCall.bind(this, 'conversations.close')) as Method<ConversationsCloseArguments>,
    create: (this.apiCall.bind(this, 'conversations.create')) as Method<ConversationsCreateArguments>,
    history: (this.apiCall.bind(this, 'conversations.history')) as Method<ConversationsHistoryArguments>,
    info: (this.apiCall.bind(this, 'conversations.info')) as Method<ConversationsInfoArguments>,
    invite: (this.apiCall.bind(this, 'conversations.invite')) as Method<ConversationsInviteArguments>,
    join: (this.apiCall.bind(this, 'conversations.join')) as Method<ConversationsJoinArguments>,
    kick: (this.apiCall.bind(this, 'conversations.kick')) as Method<ConversationsKickArguments>,
    leave: (this.apiCall.bind(this, 'conversations.leave')) as Method<ConversationsLeaveArguments>,
    list: (this.apiCall.bind(this, 'conversations.list')) as Method<ConversationsListArguments>,
    members: (this.apiCall.bind(this, 'conversations.members')) as Method<ConversationsMembersArguments>,
    open: (this.apiCall.bind(this, 'conversations.open')) as Method<ConversationsOpenArguments>,
    rename: (this.apiCall.bind(this, 'conversations.rename')) as Method<ConversationsRenameArguments>,
    replies: (this.apiCall.bind(this, 'conversations.replies')) as Method<ConversationsRepliesArguments>,
    setPurpose:
      (this.apiCall.bind(this, 'conversations.setPurpose')) as Method<ConversationsSetPurposeArguments>,
    setTopic: (this.apiCall.bind(this, 'conversations.setTopic')) as Method<ConversationsSetTopicArguments>,
    unarchive: (this.apiCall.bind(this, 'conversations.unarchive')) as Method<ConversationsUnarchiveArguments>,
  };

  /**
   * view method family
   */
  public readonly views = {
    open: (this.apiCall.bind(this, 'views.open')) as Method<ViewsOpenArguments>,
    publish: (this.apiCall.bind(this, 'views.publish')) as Method<ViewsPublishArguments>,
    push: (this.apiCall.bind(this, 'views.push')) as Method<ViewsPushArguments>,
    update: (this.apiCall.bind(this, 'views.update')) as Method<ViewsUpdateArguments>,
  };

  /**
   * dialog method family
   */
  public readonly dialog = {
    open: (this.apiCall.bind(this, 'dialog.open')) as Method<DialogOpenArguments>,
  };

  /**
   * dnd method family
   */
  public readonly dnd = {
    endDnd: (this.apiCall.bind(this, 'dnd.endDnd')) as Method<DndEndDndArguments>,
    endSnooze: (this.apiCall.bind(this, 'dnd.endSnooze')) as Method<DndEndSnoozeArguments>,
    info: (this.apiCall.bind(this, 'dnd.info')) as Method<DndInfoArguments>,
    setSnooze: (this.apiCall.bind(this, 'dnd.setSnooze')) as Method<DndSetSnoozeArguments>,
    teamInfo: (this.apiCall.bind(this, 'dnd.teamInfo')) as Method<DndTeamInfoArguments>,
  };

  /**
   * emoji method family
   */
  public readonly emoji = {
    list: (this.apiCall.bind(this, 'emoji.list')) as Method<EmojiListArguments>,
  };

  /**
   * files method family
   */
  public readonly files = {
    delete: (this.apiCall.bind(this, 'files.delete')) as Method<FilesDeleteArguments>,
    info: (this.apiCall.bind(this, 'files.info')) as Method<FilesInfoArguments>,
    list: (this.apiCall.bind(this, 'files.list')) as Method<FilesListArguments>,
    revokePublicURL:
      (this.apiCall.bind(this, 'files.revokePublicURL')) as Method<FilesRevokePublicURLArguments>,
    sharedPublicURL:
      (this.apiCall.bind(this, 'files.sharedPublicURL')) as Method<FilesSharedPublicURLArguments>,
    upload: (this.apiCall.bind(this, 'files.upload')) as Method<FilesUploadArguments>,
    comments: {
      delete: (this.apiCall.bind(this, 'files.comments.delete')) as Method<FilesCommentsDeleteArguments>,
    },
    remote: {
      info: (this.apiCall.bind(this, 'files.remote.info')) as Method<FilesRemoteInfoArguments>,
      list: (this.apiCall.bind(this, 'files.remote.list')) as Method<FilesRemoteListArguments>,
      add: (this.apiCall.bind(this, 'files.remote.add')) as Method<FilesRemoteAddArguments>,
      update: (this.apiCall.bind(this, 'files.remote.update')) as Method<FilesRemoteUpdateArguments>,
      remove: (this.apiCall.bind(this, 'files.remote.remove')) as Method<FilesRemoteRemoveArguments>,
      share: (this.apiCall.bind(this, 'files.remote.share')) as Method<FilesRemoteShareArguments>,
    },
  };

  /**
   * groups method family
   */
  public readonly groups = {
    archive: (this.apiCall.bind(this, 'groups.archive')) as Method<GroupsArchiveArguments>,
    create: (this.apiCall.bind(this, 'groups.create')) as Method<GroupsCreateArguments>,
    createChild: (this.apiCall.bind(this, 'groups.createChild')) as Method<GroupsCreateChildArguments>,
    history: (this.apiCall.bind(this, 'groups.history')) as Method<GroupsHistoryArguments>,
    info: (this.apiCall.bind(this, 'groups.info')) as Method<GroupsInfoArguments>,
    invite: (this.apiCall.bind(this, 'groups.invite')) as Method<GroupsInviteArguments>,
    kick: (this.apiCall.bind(this, 'groups.kick')) as Method<GroupsKickArguments>,
    leave: (this.apiCall.bind(this, 'groups.leave')) as Method<GroupsLeaveArguments>,
    list: (this.apiCall.bind(this, 'groups.list')) as Method<GroupsListArguments>,
    mark: (this.apiCall.bind(this, 'groups.mark')) as Method<GroupsMarkArguments>,
    open: (this.apiCall.bind(this, 'groups.open')) as Method<GroupsOpenArguments>,
    rename: (this.apiCall.bind(this, 'groups.rename')) as Method<GroupsRenameArguments>,
    replies: (this.apiCall.bind(this, 'groups.replies')) as Method<GroupsRepliesArguments>,
    setPurpose: (this.apiCall.bind(this, 'groups.setPurpose')) as Method<GroupsSetPurposeArguments>,
    setTopic: (this.apiCall.bind(this, 'groups.setTopic')) as Method<GroupsSetTopicArguments>,
    unarchive: (this.apiCall.bind(this, 'groups.unarchive')) as Method<GroupsUnarchiveArguments>,
  };

  /**
   * im method family
   */
  public readonly im = {
    close: (this.apiCall.bind(this, 'im.close')) as Method<IMCloseArguments>,
    history: (this.apiCall.bind(this, 'im.history')) as Method<IMHistoryArguments>,
    list: (this.apiCall.bind(this, 'im.list')) as Method<IMListArguments>,
    mark: (this.apiCall.bind(this, 'im.mark')) as Method<IMMarkArguments>,
    open: (this.apiCall.bind(this, 'im.open')) as Method<IMOpenArguments>,
    replies: (this.apiCall.bind(this, 'im.replies')) as Method<IMRepliesArguments>,
  };

  /**
   * migration method family
   */
  public readonly migration = {
    exchange: (this.apiCall.bind(this, 'migration.exchange')) as Method<MigrationExchangeArguments>,
  };

  /**
   * mpim method family
   */
  public readonly mpim = {
    close: (this.apiCall.bind(this, 'mpim.close')) as Method<MPIMCloseArguments>,
    history: (this.apiCall.bind(this, 'mpim.history')) as Method<MPIMHistoryArguments>,
    list: (this.apiCall.bind(this, 'mpim.list')) as Method<MPIMListArguments>,
    mark: (this.apiCall.bind(this, 'mpim.mark')) as Method<MPIMMarkArguments>,
    open: (this.apiCall.bind(this, 'mpim.open')) as Method<MPIMOpenArguments>,
    replies: (this.apiCall.bind(this, 'mpim.replies')) as Method<MPIMRepliesArguments>,
  };

  /**
   * oauth method family
   */
  public readonly oauth = {
    access: (this.apiCall.bind(this, 'oauth.access')) as Method<OAuthAccessArguments>,
    v2: {
      access: (this.apiCall.bind(this, 'oauth.v2.access')) as Method<OAuthV2AccessArguments>,
    },
  };

  /**
   * pins method family
   */
  public readonly pins = {
    add: (this.apiCall.bind(this, 'pins.add')) as Method<PinsAddArguments>,
    list: (this.apiCall.bind(this, 'pins.list')) as Method<PinsListArguments>,
    remove: (this.apiCall.bind(this, 'pins.remove')) as Method<PinsRemoveArguments>,
  };

  /**
   * reactions method family
   */
  public readonly reactions = {
    add: (this.apiCall.bind(this, 'reactions.add')) as Method<ReactionsAddArguments>,
    get: (this.apiCall.bind(this, 'reactions.get')) as Method<ReactionsGetArguments>,
    list: (this.apiCall.bind(this, 'reactions.list')) as Method<ReactionsListArguments>,
    remove: (this.apiCall.bind(this, 'reactions.remove')) as Method<ReactionsRemoveArguments>,
  };

  /**
   * reminders method family
   */
  public readonly reminders = {
    add: (this.apiCall.bind(this, 'reminders.add')) as Method<RemindersAddArguments>,
    complete: (this.apiCall.bind(this, 'reminders.complete')) as Method<RemindersCompleteArguments>,
    delete: (this.apiCall.bind(this, 'reminders.delete')) as Method<RemindersDeleteArguments>,
    info: (this.apiCall.bind(this, 'reminders.info')) as Method<RemindersInfoArguments>,
    list: (this.apiCall.bind(this, 'reminders.list')) as Method<RemindersListArguments>,
  };

  /**
   * rtm method family
   */
  public readonly rtm = {
    connect: (this.apiCall.bind(this, 'rtm.connect')) as Method<RTMConnectArguments>,
    start: (this.apiCall.bind(this, 'rtm.start')) as Method<RTMStartArguments>,
  };

  /**
   * search method family
   */
  public readonly search = {
    all: (this.apiCall.bind(this, 'search.all')) as Method<SearchAllArguments>,
    files: (this.apiCall.bind(this, 'search.files')) as Method<SearchFilesArguments>,
    messages: (this.apiCall.bind(this, 'search.messages')) as Method<SearchMessagesArguments>,
  };

  /**
   * stars method family
   */
  public readonly stars = {
    add: (this.apiCall.bind(this, 'stars.add')) as Method<StarsAddArguments>,
    list: (this.apiCall.bind(this, 'stars.list')) as Method<StarsListArguments>,
    remove: (this.apiCall.bind(this, 'stars.remove')) as Method<StarsRemoveArguments>,
  };

  /**
   * team method family
   */
  public readonly team = {
    accessLogs: (this.apiCall.bind(this, 'team.accessLogs')) as Method<TeamAccessLogsArguments>,
    billableInfo: (this.apiCall.bind(this, 'team.billableInfo')) as Method<TeamBillableInfoArguments>,
    info: (this.apiCall.bind(this, 'team.info')) as Method<TeamInfoArguments>,
    integrationLogs: (this.apiCall.bind(this, 'team.integrationLogs')) as Method<TeamIntegrationLogsArguments>,
    profile: {
      get: (this.apiCall.bind(this, 'team.profile.get')) as Method<TeamProfileGetArguments>,
    },
  };

  /**
   * usergroups method family
   */
  public readonly usergroups = {
    create: (this.apiCall.bind(this, 'usergroups.create')) as Method<UsergroupsCreateArguments>,
    disable: (this.apiCall.bind(this, 'usergroups.disable')) as Method<UsergroupsDisableArguments>,
    enable: (this.apiCall.bind(this, 'usergroups.enable')) as Method<UsergroupsEnableArguments>,
    list: (this.apiCall.bind(this, 'usergroups.list')) as Method<UsergroupsListArguments>,
    update: (this.apiCall.bind(this, 'usergroups.update')) as Method<UsergroupsUpdateArguments>,
    users: {
      list: (this.apiCall.bind(this, 'usergroups.users.list')) as Method<UsergroupsUsersListArguments>,
      update: (this.apiCall.bind(this, 'usergroups.users.update')) as Method<UsergroupsUsersUpdateArguments>,
    },
  };

  /**
   * users method family
   */
  public readonly users = {
    conversations: (this.apiCall.bind(this, 'users.conversations')) as Method<UsersConversationsArguments>,
    deletePhoto: (this.apiCall.bind(this, 'users.deletePhoto')) as Method<UsersDeletePhotoArguments>,
    getPresence: (this.apiCall.bind(this, 'users.getPresence')) as Method<UsersGetPresenceArguments>,
    identity: (this.apiCall.bind(this, 'users.identity')) as Method<UsersIdentityArguments>,
    info: (this.apiCall.bind(this, 'users.info')) as Method<UsersInfoArguments>,
    list: (this.apiCall.bind(this, 'users.list')) as Method<UsersListArguments>,
    lookupByEmail: (this.apiCall.bind(this, 'users.lookupByEmail')) as Method<UsersLookupByEmailArguments>,
    setPhoto: (this.apiCall.bind(this, 'users.setPhoto')) as Method<UsersSetPhotoArguments>,
    setPresence: (this.apiCall.bind(this, 'users.setPresence')) as Method<UsersSetPresenceArguments>,
    profile: {
      get: (this.apiCall.bind(this, 'users.profile.get')) as Method<UsersProfileGetArguments>,
      set: (this.apiCall.bind(this, 'users.profile.set')) as Method<UsersProfileSetArguments>,
    },
  };

  /**
   * Low-level function to make a single API request. handles queuing, retries, and http-level errors
   */
  private async makeRequest(url: string, body: any, headers: any = {}): Promise<AxiosResponse> {
    // TODO: better input types - remove any
    const task = () => this.requestQueue.add(async () => {
      this.logger.debug('will perform http request');
      try {
        const response = await this.axios.post(url, body, Object.assign(
          {
            headers,
          },
          this.tlsConfig,
        ));
        this.logger.debug('http response received');

        if (response.status === 429) {
          const retrySec = parseRetryHeaders(response);
          if (retrySec !== undefined) {
            this.emit(WebClientEvent.RATE_LIMITED, retrySec);
            if (this.rejectRateLimitedCalls) {
              throw new AbortError(rateLimitedErrorWithDelay(retrySec));
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
            throw new AbortError(new Error('Retry header did not contain a valid timeout.'));
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
    let containsBinaryData: boolean = false;
    const flattened = Object.entries(options)
      .map<[string, any] | []>(([key, value]) => {
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
      const form = flattened.reduce(
        (form, [key, value]) => {
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
            form.append(key as string, value, options);
          } else if (key !== undefined && value !== undefined) {
            form.append(key, value);
          }
          return form;
        },
        new FormData(),
      );
      // Copying FormData-generated headers into headers param
      // not reassigning to headers param since it is passed by reference and behaves as an inout param
      for (const [header, value] of Object.entries(form.getHeaders())) {
        headers[header] = value;
      }
      return form;
    }

    // Otherwise, a simple key-value object is returned
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    const initialValue: { [key: string]: any; } = {};
    return qsStringify(flattened.reduce(
      (accumulator, [key, value]) => {
        if (key !== undefined && value !== undefined) {
          accumulator[key] = value;
        }
        return accumulator;
      },
      initialValue,
    ));
  }

  /**
   * Processes an HTTP response into a WebAPICallResult by performing JSON parsing on the body and merging relevent
   * HTTP headers into the object.
   * @param response - an http response
   */
  private buildResult(response: AxiosResponse): WebAPICallResult {
    const data = response.data;

    if (data.response_metadata === undefined) {
      data.response_metadata = {};
    }

    // add scopes metadata from headers
    if (response.headers['x-oauth-scopes'] !== undefined) {
      data.response_metadata.scopes = (response.headers['x-oauth-scopes'] as string).trim().split(/\s*,\s*/);
    }
    if (response.headers['x-accepted-oauth-scopes'] !== undefined) {
      data.response_metadata.acceptedScopes =
        (response.headers['x-accepted-oauth-scopes'] as string).trim().split(/\s*,\s*/);
    }

    // add retry metadata from headers
    const retrySec = parseRetryHeaders(response);
    if (retrySec !== undefined) {
      data.response_metadata.retryAfter = retrySec;
    }

    return data;
  }
}

export default WebClient;

/*
 * Exported types
 */

export interface WebClientOptions {
  slackApiUrl?: string;
  logger?: Logger;
  logLevel?: LogLevel;
  maxRequestConcurrency?: number;
  retryConfig?: RetryOptions;
  agent?: Agent;
  tls?: TLSOptions;
  rejectRateLimitedCalls?: boolean;
  headers?: object;
}

export type TLSOptions = Pick<SecureContextOptions, 'pfx' | 'key' | 'passphrase' | 'cert' | 'ca'>;

export enum WebClientEvent {
  RATE_LIMITED = 'rate_limited',
}

export interface WebAPICallOptions {
  [argument: string]: unknown;
}

export interface WebAPICallResult {
  ok: boolean;
  error?: string;
  response_metadata?: {
    warnings?: string[];
    next_cursor?: string; // is this too specific to be encoded into this type?

    // added from the headers of the http response
    scopes?: string[];
    acceptedScopes?: string[];
    retryAfter?: number;
    // `chat.postMessage` returns an array of error messages (e.g., "messages": ["[ERROR] invalid_keys"])
    messages?: string[];
  };
  [key: string]: unknown;
}

// NOTE: should there be an async predicate?
export interface PaginatePredicate {
  (page: WebAPICallResult): boolean | undefined | void;
}

interface PageReducer<A = any> {
  (accumulator: A | undefined, page: WebAPICallResult, index: number): A;
}

type PageAccumulator<R extends PageReducer> =
  R extends (accumulator: (infer A) | undefined, page: WebAPICallResult, index: number) => infer A ? A : never;

/*
 * Helpers
 */

const defaultFilename = 'Untitled';
const defaultPageSize = 200;
const noopPageReducer: PageReducer = () => undefined;

/**
 * Determines an appropriate set of cursor pagination options for the next request to a paginated API method.
 * @param previousResult - the result of the last request, where the next cursor might be found.
 * @param pageSize - the maximum number of additional items to fetch in the next request.
 */
function paginationOptionsForNextPage(
  previousResult: WebAPICallResult | undefined, pageSize: number,
): CursorPaginationEnabled | undefined {
  if (
    previousResult !== undefined &&
    previousResult.response_metadata !== undefined &&
    previousResult.response_metadata.next_cursor !== undefined &&
    previousResult.response_metadata.next_cursor !== ''
  ) {
    return {
      limit: pageSize,
      cursor: previousResult.response_metadata.next_cursor as string,
    };
  }
  return;
}

/**
 * Extract the amount of time (in seconds) the platform has recommended this client wait before sending another request
 * from a rate-limited HTTP response (statusCode = 429).
 */
function parseRetryHeaders(response: AxiosResponse): number | undefined {
  if (response.headers['retry-after'] !== undefined) {
    const retryAfter = parseInt((response.headers['retry-after'] as string), 10);

    if (!Number.isNaN(retryAfter)) {
      return retryAfter;
    }
  }
  return undefined;
}

// import Method, * as methods from '@slack/methods'; // tslint:disable-line:import-name
// cursorPaginationEnabledMethods
// import Method from './methods' 
// tslint:disable-next-line: import-name
import Method, { cursorPaginationEnabledMethods, CursorPaginationEnabled, AdminAppsApproveArguments,
  AdminAppsRequestsListArguments, AdminAppsRestrictArguments, AdminInviteRequestsApproveArguments, 
  AdminInviteRequestsDenyArguments, AdminInviteRequestsListArguments, AdminInviteRequestsApprovedListArguments,
  AdminInviteRequestsDeniedListArguments, AdminTeamsAdminsListArguments, AdminTeamsCreateArguments,
  AdminTeamsOwnersListArguments, AdminUsersAssignArguments, AdminUsersInviteArguments, AdminUsersRemoveArguments,
  AdminUsersSetAdminArguments, AdminUsersSetOwnerArguments, AdminUsersSetRegularArguments,
  AdminUsersSessionResetArguments, APITestArguments, AuthRevokeArguments, AuthTestArguments, BotsInfoArguments,
  ChannelsArchiveArguments, ChannelsCreateArguments, ChannelsHistoryArguments, ChannelsInfoArguments,
  ChannelsInviteArguments, ChannelsJoinArguments, ChannelsKickArguments, ChannelsLeaveArguments, ChannelsListArguments,
  ChannelsMarkArguments, ChannelsRenameArguments, ChannelsRepliesArguments, ChannelsSetPurposeArguments,
  ChannelsSetTopicArguments, ChannelsUnarchiveArguments, ChatDeleteArguments, ChatDeleteScheduledMessageArguments,
  ChatGetPermalinkArguments, ChatMeMessageArguments, ChatPostEphemeralArguments, ChatPostMessageArguments,
  ChatScheduleMessageArguments, ChatScheduledMessagesListArguments, ChatUnfurlArguments, ChatUpdateArguments,
  ConversationsArchiveArguments, ConversationsCloseArguments, ConversationsCreateArguments,
  ConversationsHistoryArguments, ConversationsInfoArguments, ConversationsInviteArguments, ConversationsJoinArguments,
  ConversationsKickArguments, ConversationsLeaveArguments, ConversationsListArguments, ConversationsMembersArguments,
  ConversationsOpenArguments, ConversationsRenameArguments, ConversationsRepliesArguments,
  ConversationsSetPurposeArguments, ConversationsSetTopicArguments, ConversationsUnarchiveArguments,
  DialogOpenArguments, DndEndDndArguments, DndEndSnoozeArguments, DndInfoArguments, DndSetSnoozeArguments,
  DndTeamInfoArguments, EmojiListArguments, FilesDeleteArguments, FilesInfoArguments, FilesListArguments,
  FilesRevokePublicURLArguments, FilesSharedPublicURLArguments, FilesUploadArguments,
  FilesCommentsDeleteArguments, FilesRemoteInfoArguments, FilesRemoteListArguments, FilesRemoteAddArguments,
  FilesRemoteUpdateArguments, FilesRemoteRemoveArguments, FilesRemoteShareArguments, GroupsArchiveArguments,
  GroupsCreateArguments, GroupsCreateChildArguments, GroupsHistoryArguments, GroupsInfoArguments, GroupsInviteArguments,
  GroupsKickArguments, GroupsLeaveArguments, GroupsListArguments, GroupsMarkArguments, GroupsOpenArguments,
  GroupsRenameArguments, GroupsRepliesArguments, GroupsSetPurposeArguments, GroupsSetTopicArguments,
  GroupsUnarchiveArguments, IMCloseArguments, IMHistoryArguments, IMListArguments, IMMarkArguments, IMOpenArguments,
  IMRepliesArguments, MigrationExchangeArguments, MPIMCloseArguments, MPIMHistoryArguments, MPIMListArguments,
  MPIMMarkArguments, MPIMOpenArguments, MPIMRepliesArguments, OAuthAccessArguments, OAuthV2AccessArguments,
  PinsAddArguments, PinsListArguments, PinsRemoveArguments, ReactionsAddArguments, ReactionsGetArguments,
  ReactionsListArguments, ReactionsRemoveArguments, RemindersAddArguments, RemindersCompleteArguments,
  RemindersDeleteArguments, RemindersInfoArguments, RemindersListArguments, RTMConnectArguments, RTMStartArguments, 
  SearchAllArguments, SearchFilesArguments, SearchMessagesArguments, StarsAddArguments, StarsListArguments,
  StarsRemoveArguments, TeamAccessLogsArguments, TeamBillableInfoArguments, TeamInfoArguments,
  TeamIntegrationLogsArguments, TeamProfileGetArguments,  UsergroupsCreateArguments, UsergroupsDisableArguments,
  UsergroupsEnableArguments, UsergroupsListArguments, UsergroupsUpdateArguments, UsergroupsUsersListArguments,
  UsergroupsUsersUpdateArguments, UsersConversationsArguments, UsersDeletePhotoArguments, UsersGetPresenceArguments,
  UsersIdentityArguments, UsersInfoArguments, UsersListArguments, UsersLookupByEmailArguments, UsersSetPhotoArguments,
  UsersSetPresenceArguments, UsersProfileGetArguments, UsersProfileSetArguments, ViewsOpenArguments, ViewsPushArguments,
  ViewsPublishArguments, ViewsUpdateArguments, } from './methods';
