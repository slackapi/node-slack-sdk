import { Stream } from 'stream';
import { Dialog, View, KnownBlock, Block, MessageAttachment, LinkUnfurls, CallUser } from '@slack/types';
import { WebAPICallOptions, WebAPICallResult, WebClient, WebClientEvent } from './WebClient';
import { EventEmitter } from 'eventemitter3';

// NOTE: could create a named type alias like data types like `SlackUserID: string`

/**
 * Binds a certain `method` and its arguments and result types to the `apiCall` method in `WebClient`.
 */
function bindApiCall<Arguments extends WebAPICallOptions, Result extends WebAPICallResult>(
  self: Methods,
  method: string,
): Method<Arguments, Result> {
  // We have to "assert" that the bound method does indeed return the more specific `Result` type instead of just
  // `WebAPICallResult`
  return self.apiCall.bind(self, method) as Method<Arguments, Result>;
}

/**
 * A class that defines all Web API methods, their arguments type, their response type, and binds those methods to the
 * `apiCall` class method.
 */
export abstract class Methods extends EventEmitter<WebClientEvent> {
  // TODO: As of writing, `WebClient` already extends EventEmitter...
  // and I want WebClient to extend this class...
  // and multiple inheritance in JS is cursed...
  // so I'm just making this class extend EventEmitter.
  //
  // It shouldn't be here, indeed. Nothing here uses it, indeed. But it must be here for the sake of sanity.

  protected constructor() {
    super();

    // Check that the class being created extends from `WebClient` rather than this class
    if (new.target !== WebClient && !(new.target.prototype instanceof WebClient)) {
      throw new Error('Attempt to inherit from WebClient methods without inheriting from WebClient');
    }
  }

  public abstract async apiCall(method: string, options?: WebAPICallOptions): Promise<WebAPICallResult>;

  public readonly admin = {
    apps: {
      approve: bindApiCall<AdminAppsApproveArguments, WebAPICallResult>(this, 'admin.apps.approve'),
      approved: {
        list: bindApiCall<AdminAppsApprovedListArguments, AdminAppsApprovedListResponse>(
          this, 'admin.apps.approved.list'),
      },
      requests: {
        list: bindApiCall<AdminAppsRequestsListArguments, AdminAppsRequestsListResponse>(
          this, 'admin.apps.requests.list'),
      },
      restrict: bindApiCall<AdminAppsRestrictArguments, WebAPICallResult>(this, 'admin.apps.restrict'),
      restricted: {
        list:
          bindApiCall<AdminAppsRestrictedListArguments, AdminAppsRestrictedListResponse>(
            this, 'admin.apps.restricted.list'),
      },
    },
    conversations: {
      setTeams:
        bindApiCall<AdminConversationsSetTeamsArguments, WebAPICallResult>(this, 'admin.conversations.setTeams'),
      restrictAccess: {
        addGroup:
          bindApiCall<AdminConversationsRestrictAccessAddGroupArguments, WebAPICallResult>(this, 'admin.conversations.restrictAccess.addGroup'),
        listGroups:
          bindApiCall<AdminConversationsRestrictAccessListGroupsArguments, WebAPICallResult>(this, 'admin.conversations.restrictAccess.listGroups'),
        removeGroup:
          bindApiCall<AdminConversationsRestrictAccessRemoveGroupArguments, WebAPICallResult>(this, 'admin.conversations.restrictAccess.removeGroup'),
      },
    },
    inviteRequests: {
      approve: bindApiCall<AdminInviteRequestsApproveArguments, WebAPICallResult>(
        this, 'admin.inviteRequests.approve'),
      deny: bindApiCall<AdminInviteRequestsDenyArguments, WebAPICallResult>(this, 'admin.inviteRequests.deny'),
      list: bindApiCall<AdminInviteRequestsListArguments, WebAPICallResult>(this, 'admin.inviteRequests.list'),
      approved: {
        list: bindApiCall<AdminInviteRequestsApprovedListArguments, AdminInviteRequestsApprovedListResponse>(
          this, 'admin.inviteRequests.approved.list'),
      },
      denied: {
        list: bindApiCall<AdminInviteRequestsDeniedListArguments, AdminInviteRequestsDeniedListResponse>(
          this, 'admin.inviteRequests.denied.list'),
      },
    },
    teams: {
      admins: {
        list: bindApiCall<AdminTeamsAdminsListArguments, AdminTeamsAdminsListResponse>(this, 'admin.teams.admins.list'),
      },
      create: bindApiCall<AdminTeamsCreateArguments, AdminTeamsCreateResponse>(this, 'admin.teams.create'),
      list: bindApiCall<AdminTeamsListArguments, AdminTeamsListResponse>(this, 'admin.teams.list'),
      owners: {
        list: bindApiCall<AdminTeamsOwnersListArguments, AdminTeamsOwnersListResponse>(this, 'admin.teams.owners.list'),
      },
      settings: {
        info: bindApiCall<AdminTeamsSettingsInfoArguments, AdminTeamsSettingsInfoResponse>(
          this, 'admin.teams.settings.info'),
        setDefaultChannels: bindApiCall<AdminTeamsSettingsSetDefaultChannelsArguments, WebAPICallResult>(
          this, 'admin.teams.settings.setDefaultChannels'),
        setDescription: bindApiCall<AdminTeamsSettingsSetDescriptionArguments, WebAPICallResult>(
          this, 'admin.teams.settings.setDescription'),
        setDiscoverability: bindApiCall<AdminTeamsSettingsSetDiscoverabilityArguments, WebAPICallResult>(
          this, 'admin.teams.settings.setDiscoverability'),
        setIcon: bindApiCall<AdminTeamsSettingsSetIconArguments, WebAPICallResult>(
          this, 'admin.teams.settings.setIcon'),
        setName: bindApiCall<AdminTeamsSettingsSetNameArguments, WebAPICallResult>(
          this, 'admin.teams.settings.setName'),
      },
    },
    usergroups: {
      addChannels: bindApiCall<AdminUsergroupsAddChannelsArguments, WebAPICallResult>(
        this, 'admin.usergroups.addChannels'),
      addTeams: bindApiCall<AdminUsergroupsAddTeamsArguments, WebAPICallResult>(
        this, 'admin.usergroups.addTeams'),
      listChannels: bindApiCall<AdminUsergroupsListChannelsArguments, AdminUsergroupsListChannelsResponse>(
        this, 'admin.usergroups.listChannels'),
      removeChannels: bindApiCall<AdminUsergroupsRemoveChannelsArguments, WebAPICallResult>(
        this, 'admin.usergroups.removeChannels'),
    },
    users: {
      session: {
        reset:
          bindApiCall<AdminUsersSessionResetArguments, WebAPICallResult>(this, 'admin.users.session.reset'),
      },
      assign: bindApiCall<AdminUsersAssignArguments, WebAPICallResult>(this, 'admin.users.assign'),
      invite: bindApiCall<AdminUsersInviteArguments, WebAPICallResult>(this, 'admin.users.invite'),
      list: bindApiCall<AdminUsersListArguments, AdminUsersListResponse>(this, 'admin.users.list'),
      remove: bindApiCall<AdminUsersRemoveArguments, WebAPICallResult>(this, 'admin.users.remove'),
      setAdmin: bindApiCall<AdminUsersSetAdminArguments, WebAPICallResult>(this, 'admin.users.setAdmin'),
      setExpiration:
        bindApiCall<AdminUsersSetExpirationArguments, WebAPICallResult>(this, 'admin.users.setExpiration'),
      setOwner: bindApiCall<AdminUsersSetOwnerArguments, WebAPICallResult>(this, 'admin.users.setOwner'),
      setRegular: bindApiCall<AdminUsersSetRegularArguments, WebAPICallResult>(this, 'admin.users.setRegular'),
    },
  };

  public readonly api = {
    test: bindApiCall<APITestArguments, WebAPICallResult>(this, 'api.test'),
  };

  public readonly auth = {
    revoke: bindApiCall<AuthRevokeArguments, AuthRevokeResponse>(this, 'auth.revoke'),
    test: bindApiCall<AuthTestArguments, AuthTestResponse>(this, 'auth.test'),
  };

  public readonly bots = {
    info: bindApiCall<BotsInfoArguments, BotsInfoResponse>(this, 'bots.info'),
  };

  public readonly calls = {
    add: bindApiCall<CallsAddArguments, CallsAddResponse>(this, 'calls.add'),
    end: bindApiCall<CallsEndArguments, WebAPICallResult>(this, 'calls.end'),
    info: bindApiCall<CallsInfoArguments, CallsInfoResponse>(this, 'calls.info'),
    update: bindApiCall<CallsUpdateArguments, CallsUpdateResponse>(this, 'calls.update'),
    participants: {
      add: bindApiCall<CallsParticipantsAddArguments, WebAPICallResult>(this, 'calls.participants.add'),
      remove: bindApiCall<CallsParticipantsRemoveArguments, WebAPICallResult>(this, 'calls.participants.remove'),
    },
  };

  public readonly channels = {
    archive: bindApiCall<ChannelsArchiveArguments, WebAPICallResult>(this, 'channels.archive'),
    create: bindApiCall<ChannelsCreateArguments, WebAPICallResult>(this, 'channels.create'),
    history: bindApiCall<ChannelsHistoryArguments, WebAPICallResult>(this, 'channels.history'),
    info: bindApiCall<ChannelsInfoArguments, WebAPICallResult>(this, 'channels.info'),
    invite: bindApiCall<ChannelsInviteArguments, WebAPICallResult>(this, 'channels.invite'),
    join: bindApiCall<ChannelsJoinArguments, WebAPICallResult>(this, 'channels.join'),
    kick: bindApiCall<ChannelsKickArguments, WebAPICallResult>(this, 'channels.kick'),
    leave: bindApiCall<ChannelsLeaveArguments, WebAPICallResult>(this, 'channels.leave'),
    list: bindApiCall<ChannelsListArguments, WebAPICallResult>(this, 'channels.list'),
    mark: bindApiCall<ChannelsMarkArguments, WebAPICallResult>(this, 'channels.mark'),
    rename: bindApiCall<ChannelsRenameArguments, WebAPICallResult>(this, 'channels.rename'),
    replies: bindApiCall<ChannelsRepliesArguments, WebAPICallResult>(this, 'channels.replies'),
    setPurpose: bindApiCall<ChannelsSetPurposeArguments, WebAPICallResult>(this, 'channels.setPurpose'),
    setTopic: bindApiCall<ChannelsSetTopicArguments, WebAPICallResult>(this, 'channels.setTopic'),
    unarchive: bindApiCall<ChannelsUnarchiveArguments, WebAPICallResult>(this, 'channels.unarchive'),
  };

  public readonly chat = {
    delete: bindApiCall<ChatDeleteArguments, WebAPICallResult>(this, 'chat.delete'),
    deleteScheduledMessage:
      bindApiCall<ChatDeleteScheduledMessageArguments, WebAPICallResult>(this, 'chat.deleteScheduledMessage'),
    getPermalink: bindApiCall<ChatGetPermalinkArguments, WebAPICallResult>(this, 'chat.getPermalink'),
    meMessage: bindApiCall<ChatMeMessageArguments, WebAPICallResult>(this, 'chat.meMessage'),
    postEphemeral: bindApiCall<ChatPostEphemeralArguments, WebAPICallResult>(this, 'chat.postEphemeral'),
    postMessage: bindApiCall<ChatPostMessageArguments, WebAPICallResult>(this, 'chat.postMessage'),
    scheduleMessage: bindApiCall<ChatScheduleMessageArguments, WebAPICallResult>(this, 'chat.scheduleMessage'),
    scheduledMessages: {
      list:
        bindApiCall<ChatScheduledMessagesListArguments, WebAPICallResult>(this, 'chat.scheduledMessages.list'),
    },
    unfurl: bindApiCall<ChatUnfurlArguments, WebAPICallResult>(this, 'chat.unfurl'),
    update: bindApiCall<ChatUpdateArguments, WebAPICallResult>(this, 'chat.update'),
  };

  public readonly conversations = {
    archive: bindApiCall<ConversationsArchiveArguments, WebAPICallResult>(this, 'conversations.archive'),
    close: bindApiCall<ConversationsCloseArguments, ConversationsCloseResponse>(this, 'conversations.close'),
    create: bindApiCall<ConversationsCreateArguments, ConversationsCreateResponse>(this, 'conversations.create'),
    history: bindApiCall<ConversationsHistoryArguments, ConversationsHistoryResponse>(this, 'conversations.history'),
    info: bindApiCall<ConversationsInfoArguments, ConversationsInfoResponse>(this, 'conversations.info'),
    invite: bindApiCall<ConversationsInviteArguments, ConversationsInviteResponse>(this, 'conversations.invite'),
    join: bindApiCall<ConversationsJoinArguments, ConversationsJoinResponse>(this, 'conversations.join'),
    kick: bindApiCall<ConversationsKickArguments, WebAPICallResult>(this, 'conversations.kick'),
    leave: bindApiCall<ConversationsLeaveArguments, ConversationsLeaveResponse>(this, 'conversations.leave'),
    list: bindApiCall<ConversationsListArguments, ConversationsListResponse>(this, 'conversations.list'),
    mark: bindApiCall<ConversationsMarkArguments, WebAPICallResult>(this, 'conversations.mark'),
    members: bindApiCall<ConversationsMembersArguments, ConversationsMembersResponse>(this, 'conversations.members'),
    open: bindApiCall<ConversationsOpenArguments, ConversationsOpenResponse>(this, 'conversations.open'),
    rename: bindApiCall<ConversationsRenameArguments, ConversationsRenameResponse>(this, 'conversations.rename'),
    replies: bindApiCall<ConversationsRepliesArguments, ConversationsRepliesResponse>(this, 'conversations.replies'),
    setPurpose:
      bindApiCall<ConversationsSetPurposeArguments, ConversationsSetPurposeResponse>(this, 'conversations.setPurpose'),
    setTopic:
      bindApiCall<ConversationsSetTopicArguments, ConversationsSetTopicResponse>(this, 'conversations.setTopic'),
    unarchive: bindApiCall<ConversationsUnarchiveArguments, WebAPICallResult>(this, 'conversations.unarchive'),
  };

  public readonly dialog = {
    open: bindApiCall<DialogOpenArguments, WebAPICallResult>(this, 'dialog.open'),
  };

  public readonly dnd = {
    endDnd: bindApiCall<DndEndDndArguments, WebAPICallResult>(this, 'dnd.endDnd'),
    endSnooze: bindApiCall<DndEndSnoozeArguments, DndEndSnoozeResponse>(this, 'dnd.endSnooze'),
    info: bindApiCall<DndInfoArguments, DndInfoResponse>(this, 'dnd.info'),
    setSnooze: bindApiCall<DndSetSnoozeArguments, DndSetSnoozeResponse>(this, 'dnd.setSnooze'),
    teamInfo: bindApiCall<DndTeamInfoArguments, DndTeamInfoResponse>(this, 'dnd.teamInfo'),
  };

  public readonly emoji = {
    list: bindApiCall<EmojiListArguments, EmojiListResponse>(this, 'emoji.list'),
  };

  public readonly files = {
    delete: bindApiCall<FilesDeleteArguments, WebAPICallResult>(this, 'files.delete'),
    info: bindApiCall<FilesInfoArguments, FilesInfoResponse>(this, 'files.info'),
    list: bindApiCall<FilesListArguments, FilesListResponse>(this, 'files.list'),
    revokePublicURL:
      bindApiCall<FilesRevokePublicURLArguments, FilesRevokePublicURLResponse>(this, 'files.revokePublicURL'),
    sharedPublicURL:
      bindApiCall<FilesSharedPublicURLArguments, FilesSharedPublicURLResponse>(this, 'files.sharedPublicURL'),
    upload: bindApiCall<FilesUploadArguments, FilesUploadResponse>(this, 'files.upload'),
    comments: {
      delete: bindApiCall<FilesCommentsDeleteArguments, WebAPICallResult>(this, 'files.comments.delete'),
    },
    remote: {
      info: bindApiCall<FilesRemoteInfoArguments, WebAPICallResult>(this, 'files.remote.info'),
      list: bindApiCall<FilesRemoteListArguments, WebAPICallResult>(this, 'files.remote.list'),
      add: bindApiCall<FilesRemoteAddArguments, FilesRemoteAddResponse>(this, 'files.remote.add'),
      update: bindApiCall<FilesRemoteUpdateArguments, WebAPICallResult>(this, 'files.remote.update'),
      remove: bindApiCall<FilesRemoteRemoveArguments, WebAPICallResult>(this, 'files.remote.remove'),
      share: bindApiCall<FilesRemoteShareArguments, WebAPICallResult>(this, 'files.remote.share'),
    },
  };

  public readonly groups = {
    archive: bindApiCall<GroupsArchiveArguments, WebAPICallResult>(this, 'groups.archive'),
    create: bindApiCall<GroupsCreateArguments, WebAPICallResult>(this, 'groups.create'),
    createChild: bindApiCall<GroupsCreateChildArguments, WebAPICallResult>(this, 'groups.createChild'),
    history: bindApiCall<GroupsHistoryArguments, WebAPICallResult>(this, 'groups.history'),
    info: bindApiCall<GroupsInfoArguments, WebAPICallResult>(this, 'groups.info'),
    invite: bindApiCall<GroupsInviteArguments, WebAPICallResult>(this, 'groups.invite'),
    kick: bindApiCall<GroupsKickArguments, WebAPICallResult>(this, 'groups.kick'),
    leave: bindApiCall<GroupsLeaveArguments, WebAPICallResult>(this, 'groups.leave'),
    list: bindApiCall<GroupsListArguments, WebAPICallResult>(this, 'groups.list'),
    mark: bindApiCall<GroupsMarkArguments, WebAPICallResult>(this, 'groups.mark'),
    open: bindApiCall<GroupsOpenArguments, WebAPICallResult>(this, 'groups.open'),
    rename: bindApiCall<GroupsRenameArguments, WebAPICallResult>(this, 'groups.rename'),
    replies: bindApiCall<GroupsRepliesArguments, WebAPICallResult>(this, 'groups.replies'),
    setPurpose: bindApiCall<GroupsSetPurposeArguments, WebAPICallResult>(this, 'groups.setPurpose'),
    setTopic: bindApiCall<GroupsSetTopicArguments, WebAPICallResult>(this, 'groups.setTopic'),
    unarchive: bindApiCall<GroupsUnarchiveArguments, WebAPICallResult>(this, 'groups.unarchive'),
  };

  public readonly im = {
    close: bindApiCall<IMCloseArguments, WebAPICallResult>(this, 'im.close'),
    history: bindApiCall<IMHistoryArguments, WebAPICallResult>(this, 'im.history'),
    list: bindApiCall<IMListArguments, WebAPICallResult>(this, 'im.list'),
    mark: bindApiCall<IMMarkArguments, WebAPICallResult>(this, 'im.mark'),
    open: bindApiCall<IMOpenArguments, WebAPICallResult>(this, 'im.open'),
    replies: bindApiCall<IMRepliesArguments, WebAPICallResult>(this, 'im.replies'),
  };

  public readonly migration = {
    exchange: bindApiCall<MigrationExchangeArguments, MigrationExchangeResponse>(this, 'migration.exchange'),
  };

  public readonly mpim = {
    close: bindApiCall<MPIMCloseArguments, WebAPICallResult>(this, 'mpim.close'),
    history: bindApiCall<MPIMHistoryArguments, WebAPICallResult>(this, 'mpim.history'),
    list: bindApiCall<MPIMListArguments, WebAPICallResult>(this, 'mpim.list'),
    mark: bindApiCall<MPIMMarkArguments, WebAPICallResult>(this, 'mpim.mark'),
    open: bindApiCall<MPIMOpenArguments, WebAPICallResult>(this, 'mpim.open'),
    replies: bindApiCall<MPIMRepliesArguments, WebAPICallResult>(this, 'mpim.replies'),
  };

  public readonly oauth = {
    access: bindApiCall<OAuthAccessArguments, WebAPICallResult>(this, 'oauth.access'),
    v2: {
      access: bindApiCall<OAuthV2AccessArguments, OAuthV2AccessResponse>(this, 'oauth.v2.access'),
    },
  };

  public readonly pins = {
    add: bindApiCall<PinsAddArguments, WebAPICallResult>(this, 'pins.add'),
    list: bindApiCall<PinsListArguments, PinsListResponse>(this, 'pins.list'),
    remove: bindApiCall<PinsRemoveArguments, WebAPICallResult>(this, 'pins.remove'),
  };

  public readonly reactions = {
    add: bindApiCall<ReactionsAddArguments, WebAPICallResult>(this, 'reactions.add'),
    get: bindApiCall<ReactionsGetArguments, ReactionsGetResponse>(this, 'reactions.get'),
    list: bindApiCall<ReactionsListArguments, ReactionsListResponse>(this, 'reactions.list'),
    remove: bindApiCall<ReactionsRemoveArguments, WebAPICallResult>(this, 'reactions.remove'),
  };

  public readonly reminders = {
    add: bindApiCall<RemindersAddArguments, RemindersAddResponse>(this, 'reminders.add'),
    complete: bindApiCall<RemindersCompleteArguments, WebAPICallResult>(this, 'reminders.complete'),
    delete: bindApiCall<RemindersDeleteArguments, WebAPICallResult>(this, 'reminders.delete'),
    info: bindApiCall<RemindersInfoArguments, RemindersInfoResponse>(this, 'reminders.info'),
    list: bindApiCall<RemindersListArguments, RemindersListResponse>(this, 'reminders.list'),
  };

  public readonly rtm = {
    connect: bindApiCall<RTMConnectArguments, RTMConnectResponse>(this, 'rtm.connect'),
    start: bindApiCall<RTMStartArguments, RTMStartResponse>(this, 'rtm.start'),
  };

  public readonly search = {
    all: bindApiCall<SearchAllArguments, SearchAllResponse>(this, 'search.all'),
    files: bindApiCall<SearchFilesArguments, SearchFilesResponse>(this, 'search.files'),
    messages: bindApiCall<SearchMessagesArguments, SearchMessagesResponse>(this, 'search.messages'),
  };

  public readonly stars = {
    add: bindApiCall<StarsAddArguments, WebAPICallResult>(this, 'stars.add'),
    list: bindApiCall<StarsListArguments, StartsListResponse>(this, 'stars.list'),
    remove: bindApiCall<StarsRemoveArguments, WebAPICallResult>(this, 'stars.remove'),
  };

  public readonly team = {
    accessLogs: bindApiCall<TeamAccessLogsArguments, TeamAccessLogsResponse>(this, 'team.accessLogs'),
    billableInfo: bindApiCall<TeamBillableInfoArguments, TeamBillableInfoResponse>(this, 'team.billableInfo'),
    info: bindApiCall<TeamInfoArguments, TeamInfoResponse>(this, 'team.info'),
    integrationLogs:
      bindApiCall<TeamIntegrationLogsArguments, TeamIntegrationLogsResponse>(this, 'team.integrationLogs'),
    profile: {
      get: bindApiCall<TeamProfileGetArguments, TeamProfileGetResponse>(this, 'team.profile.get'),
    },
  };

  public readonly usergroups = {
    create: bindApiCall<UsergroupsCreateArguments, UsergroupsCreateResponse>(this, 'usergroups.create'),
    disable: bindApiCall<UsergroupsDisableArguments, UsergroupsDisableResponse>(this, 'usergroups.disable'),
    enable: bindApiCall<UsergroupsEnableArguments, UsergroupsEnableResponse>(this, 'usergroups.enable'),
    list: bindApiCall<UsergroupsListArguments, UsergroupsListResponse>(this, 'usergroups.list'),
    update: bindApiCall<UsergroupsUpdateArguments, UsergroupsUpdateResponse>(this, 'usergroups.update'),
    users: {
      list: bindApiCall<UsergroupsUsersListArguments, UsergroupsUsersListResponse>(this, 'usergroups.users.list'),
      update:
        bindApiCall<UsergroupsUsersUpdateArguments, UsergroupsUsersUpdateResponse>(this, 'usergroups.users.update'),
    },
  };

  public readonly users = {
    conversations: bindApiCall<UsersConversationsArguments, UsersConversationsResponse>(this, 'users.conversations'),
    deletePhoto: bindApiCall<UsersDeletePhotoArguments, WebAPICallResult>(this, 'users.deletePhoto'),
    getPresence: bindApiCall<UsersGetPresenceArguments, UsersGetPresenceResponse>(this, 'users.getPresence'),
    identity: bindApiCall<UsersIdentityArguments, UsersIdentityResponse>(this, 'users.identity'),
    info: bindApiCall<UsersInfoArguments, UsersInfoResponse>(this, 'users.info'),
    list: bindApiCall<UsersListArguments, UsersListResponse>(this, 'users.list'),
    lookupByEmail: bindApiCall<UsersLookupByEmailArguments, UsersLookupByEmailResponse>(this, 'users.lookupByEmail'),
    setPhoto: bindApiCall<UsersSetPhotoArguments, WebAPICallResult>(this, 'users.setPhoto'),
    setPresence: bindApiCall<UsersSetPresenceArguments, WebAPICallResult>(this, 'users.setPresence'),
    profile: {
      get: bindApiCall<UsersProfileGetArguments, UsersProfileGetResponse>(this, 'users.profile.get'),
      set: bindApiCall<UsersProfileSetArguments, UsersProfileSetResponse>(this, 'users.profile.set'),
    },
  };

  public readonly views = {
    open: bindApiCall<ViewsOpenArguments, ViewsOpenResponse>(this, 'views.open'),
    publish: bindApiCall<ViewsPublishArguments, ViewsPublishResponse>(this, 'views.publish'),
    push: bindApiCall<ViewsPushArguments, ViewsPushResponse>(this, 'views.push'),
    update: bindApiCall<ViewsUpdateArguments, ViewsUpdateResponse>(this, 'views.update'),
  };
}

/**
 * Generic method definition
 */
export default interface Method<
  MethodArguments extends WebAPICallOptions,
  MethodResult extends WebAPICallResult = WebAPICallResult
> {
  (options?: MethodArguments): Promise<MethodResult>;
}

/*
 * Reusable "protocols" that some MethodArguments types can conform to
 */
export interface TokenOverridable {
  token?: string;
}

export interface LocaleAware {
  include_locale?: boolean;
}

export interface Searchable {
  query: string;
  highlight?: boolean;
  sort: 'score' | 'timestamp';
  sort_dir: 'asc' | 'desc';
}

// A set of method names is initialized here and added to each time an argument type extends the CursorPaginationEnabled
// interface, so that methods are checked against this set when using the pagination helper. If the method name is not
// found, a warning is emitted to guide the developer to using the method correctly.
export const cursorPaginationEnabledMethods: Set<string> = new Set();
export interface CursorPaginationEnabled {
  limit?: number; // natural integer, max of 1000
  cursor?: string; // find this in a response's `response_metadata.next_cursor`
}

export interface TimelinePaginationEnabled {
  oldest?: string;
  latest?: string;
  inclusive?: boolean;
}

export interface TraditionalPagingEnabled {
  page?: number; // default: 1
  count?: number; // default: 100
}

/*
 * MethodArguments types (no formal relationship other than the generic constraint in Method<>)
 */

/*
 * `admin.*`
 */
export interface AdminAppsApproveArguments extends WebAPICallOptions, TokenOverridable {
  app_id?: string;
  request_id?: string;
  team_id?: string;
}
export interface AdminAppsApprovedListArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {
  team_id?: string;
  enterprise_id?: string;
}
cursorPaginationEnabledMethods.add('admin.apps.approved.list');
export interface AdminAppsApprovedListResponse extends WebAPICallResult {
  approved_apps: {
    app: {
      id: string;
      name: string;
      description: string;
      help_url: string;
      privacy_policy_url: string;
      app_homepage_url: string;
      app_directory_url: string;
      is_app_directory_approved: boolean;
      is_internal: boolean;
      icons: Record<string, string>;
      additional_info: string
    };
    scopes: {
      name: string;
      description: string;
      is_sensitive: boolean;
      token_type: string;
    }[];
    date_update: number;
    last_resolved_by: {
      actor_id: string;
      actor_type: string;
    };
  }[];
}
export interface AdminAppsRequestsListArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {
  team_id?: string;
}
cursorPaginationEnabledMethods.add('admin.apps.requests.list');
export interface AdminAppsRequestsListResponse extends WebAPICallResult {
  app_requests: {
    id: string;
    app: {
      id: string;
      name: string;
      description: string;
      help_url: string;
      privacy_policy_url: string;
      app_homepage_url: string;
      app_directory_url: string;
      is_app_directory_approved: boolean;
      is_internal: boolean;
      icons: Record<string, string>;
      additional_info: string
    };
    previous_resolution: unknown | null;
    user: {
      id: string;
      name: string;
      email: string;
    };
    team: {
      id: string;
      name: string;
      domain: string;
    }
    scopes: {
      name: string;
      description: string;
      is_sensitive: boolean;
      token_type: string;
    }[];
    message: string;
    date_created: number;
  }[];
}
export interface AdminAppsRestrictArguments extends WebAPICallOptions, TokenOverridable {
  app_id?: string;
  request_id?: string;
  team_id?: string;
}
export interface AdminAppsRestrictedListArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {
  team_id?: string;
  enterprise_id?: string;
}
cursorPaginationEnabledMethods.add('admin.apps.restricted.list');
export interface AdminAppsRestrictedListResponse extends WebAPICallResult {
  restricted_apps: AdminAppsApprovedListResponse['approved_apps'];
}
export interface AdminConversationsRestrictAccessAddGroupArguments extends WebAPICallOptions, TokenOverridable {
  channel_id: string;
  group_id: string;
  team_id?: string;
}
export interface AdminConversationsRestrictAccessListGroupsArguments extends WebAPICallOptions, TokenOverridable {
  channel_id: string;
  team_id?: string;
}
export interface AdminConversationsRestrictAccessListGroupsResponse extends WebAPICallResult {
  group_ids: string[];
}
export interface AdminConversationsRestrictAccessRemoveGroupArguments extends WebAPICallOptions, TokenOverridable {
  channel_id: string;
  group_id: string;
  team_id: string;
}
export interface AdminConversationsSetTeamsArguments extends WebAPICallOptions, TokenOverridable {
  channel_id: string;
  team_id?: string;
  target_team_ids?: string[];
  org_channel?: boolean;
}
export interface AdminInviteRequestsApproveArguments
  extends WebAPICallOptions, TokenOverridable {
  invite_request_id: string;
  team_id: string;
}
export interface AdminInviteRequestsApprovedListArguments
  extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {
  team_id: string;
}
cursorPaginationEnabledMethods.add('admin.inviteRequests.approved.list');
export interface AdminInviteRequestsApprovedListResponse extends WebAPICallResult {
  approved_requests: unknown[];
}
export interface AdminInviteRequestsDenyArguments
  extends WebAPICallOptions, TokenOverridable {
  invite_request_id: string;
  team_id: string;
}
export interface AdminInviteRequestsDeniedListArguments
  extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {
  team_id: string;
}
cursorPaginationEnabledMethods.add('admin.inviteRequests.denied.list');
export interface AdminInviteRequestsDeniedListResponse extends WebAPICallResult {
  denied_requests: unknown[];
}
export interface AdminInviteRequestsListArguments
  extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {
  team_id: string;
}
cursorPaginationEnabledMethods.add('admin.inviteRequests.list');
// TODO: AdminInviteRequestsListResponse
export interface AdminTeamsAdminsListArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {
  team_id: string;
}
cursorPaginationEnabledMethods.add('admin.teams.admins.list');
export interface AdminTeamsAdminsListResponse extends WebAPICallResult {
  admin_ids: string[];
}
export interface AdminTeamsCreateArguments extends WebAPICallOptions, TokenOverridable {
  team_domain: string;
  team_name: string;
  team_description?: string;
  team_discoverability?: string;
}
export interface AdminTeamsCreateResponse extends WebAPICallResult {
  team: string;
}
export interface AdminTeamsListArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {}
cursorPaginationEnabledMethods.add('admin.teams.list');
export interface AdminTeamsListResponse extends WebAPICallResult {
  teams: {
    id: string;
    name: string;
    discoverability: string;
    primary_owner: {
      user_id: string;
      email: string;
    };
    team_url: string;
  }[];
}
export interface AdminTeamsOwnersListArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {
  team_id: string;
}
cursorPaginationEnabledMethods.add('admin.teams.owners.list');
export interface AdminTeamsOwnersListResponse extends WebAPICallResult {
  owner_ids: string[];
}
export interface AdminTeamsSettingsInfoArguments extends WebAPICallOptions, TokenOverridable {
  team_id: string;
}
export interface AdminTeamsSettingsInfoResponse extends WebAPICallResult {
  team: TeamInfoResponse['team'];
}
export interface AdminTeamsSettingsSetDefaultChannelsArguments extends WebAPICallOptions, TokenOverridable {
  team_id: string;
  channel_ids: string[];
}
export interface AdminTeamsSettingsSetDescriptionArguments extends WebAPICallOptions, TokenOverridable {
  team_id: string;
  description: string;
}
export interface AdminTeamsSettingsSetDiscoverabilityArguments extends WebAPICallOptions, TokenOverridable {
  team_id: string;
  discoverability: 'open' | 'invite_only' | 'closed' | 'unlisted';
}
export interface AdminTeamsSettingsSetIconArguments extends WebAPICallOptions, TokenOverridable {
  team_id: string;
  image_url: string;
}
export interface AdminTeamsSettingsSetNameArguments extends WebAPICallOptions, TokenOverridable {
  team_id: string;
  name: string;
}
export interface AdminUsergroupsAddChannelsArguments extends WebAPICallOptions, TokenOverridable {
  usergroup_id: string;
  team_id?: string;
  channel_ids: string | string[];
}
export interface AdminUsergroupsAddTeamsArguments extends WebAPICallOptions, TokenOverridable {
  usergroup_id: string;
  team_ids: string | string[];
  auto_provision?: boolean;
}
export interface AdminUsergroupsListChannelsArguments extends WebAPICallOptions, TokenOverridable {
  usergroup_id: string;
  include_num_members?: boolean;
  team_id?: string;
}
export interface AdminUsergroupsListChannelsResponse extends WebAPICallResult {
  channels: {
    id: string;
    name: string;
    team_id: string;
    num_members?: number;
    is_redacted?: boolean;
  }[];
}
export interface AdminUsergroupsRemoveChannelsArguments extends WebAPICallOptions, TokenOverridable {
  usergroup_id: string;
  channel_ids: string | string[];
}
export interface AdminUsersAssignArguments extends WebAPICallOptions, TokenOverridable {
  team_id: string;
  user_id: string;
  is_restricted?: boolean;
  is_ultra_restricted?: boolean;
}
export interface AdminUsersInviteArguments extends WebAPICallOptions, TokenOverridable {
  channel_ids: string;
  email: string;
  team_id: string;
  custom_message?: string;
  guest_expiration_ts?: string;
  is_restricted?: boolean;
  is_ultra_restricted?: boolean;
  real_name?: string;
  resend?: boolean;
}
export interface AdminUsersListArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {
  team_id: string;
}
cursorPaginationEnabledMethods.add('admin.users.list');
export interface AdminUsersListResponse extends WebAPICallResult {
  users: UsersInfoResponse['user'][];
}
export interface AdminUsersRemoveArguments extends WebAPICallOptions, TokenOverridable {
  team_id: string;
  user_id: string;
}
export interface AdminUsersSetAdminArguments extends WebAPICallOptions, TokenOverridable {
  team_id: string;
  user_id: string;
}
export interface AdminUsersSetExpirationArguments extends WebAPICallOptions, TokenOverridable {
  team_id: string;
  user_id: string;
  expiration_ts: number;
}
export interface AdminUsersSetOwnerArguments extends WebAPICallOptions, TokenOverridable {
  team_id: string;
  user_id: string;
}
export interface AdminUsersSetRegularArguments extends WebAPICallOptions, TokenOverridable {
  team_id: string;
  user_id: string;
}
export interface AdminUsersSessionResetArguments extends WebAPICallOptions, TokenOverridable {
  user_id: string;
  mobile_only?: boolean;
  web_only?: boolean;
}

/*
 * `api.*`
 */
export interface APITestArguments extends WebAPICallOptions {}
export interface APITestResponse extends WebAPICallResult {
  args?: Record<string, any>;
}

/*
 * `auth.*`
 */
export interface AuthRevokeArguments extends WebAPICallOptions, TokenOverridable {
  test: boolean;
}
export interface AuthRevokeResponse extends WebAPICallResult {
  revoked: boolean;
}
export interface AuthTestArguments extends WebAPICallOptions, TokenOverridable {}
export interface AuthTestResponse extends WebAPICallResult {
  url: string;
  team: string;
  user: string;
  team_id: string;
  user_id: string;
  enterprise_id?: string;
}

/*
 * `bots.*`
 */
export interface BotsInfoArguments extends WebAPICallOptions, TokenOverridable  {
  bot?: string;
}
export interface BotsInfoResponse extends WebAPICallResult {
  bot: {
    id: string;
    deleted: boolean;
    name: string;
    updated: number;
    app_id: string;
    user_id: string;
    icons: Record<string, string>;
  };
}

/*
 * `calls.*`
 */
export interface CallsAddArguments extends WebAPICallOptions, TokenOverridable {
  external_unique_id: string;
  join_url: string;
  created_by?: string;
  date_start?: number;
  desktop_app_join_url?: string;
  external_display_id?: string;
  title?: string;
  users?: CallUser[];
}
export interface CallsAddResponse extends WebAPICallResult {
  call: CallsInfoResponse['call'];
}
export interface CallsEndArguments extends WebAPICallOptions, TokenOverridable {
  id: string;
  duration?: number;
}
export interface CallsInfoArguments extends WebAPICallOptions, TokenOverridable {
  id: string;
}
export interface CallsInfoResponse extends WebAPICallResult {
  call: {
    id: string;
    date_start: number;
    external_unique_id: string;
    join_url: string;
    desktop_app_join_url: string;
    external_display_id: string;
    title: string;
    users: CallUser[];
  };
}
export interface CallsUpdateArguments extends WebAPICallOptions, TokenOverridable {
  id: string;
  join_url?: string;
  desktop_app_join_url?: string;
  title?: string;
}
export interface CallsUpdateResponse extends WebAPICallResult {
  call: CallsInfoResponse['call'];
}
export interface CallsParticipantsAddArguments extends WebAPICallOptions, TokenOverridable {
  id: string;
  users: CallUser[];
}

export interface CallsParticipantsRemoveArguments extends WebAPICallOptions, TokenOverridable {
  id: string;
  users: CallUser[];
}

/*
 * `channels.*`
 */
export interface ChannelsArchiveArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
}

export interface ChannelsCreateArguments extends WebAPICallOptions, TokenOverridable {
  name: string;
  validate?: boolean;
}
export interface ChannelsHistoryArguments extends WebAPICallOptions, TokenOverridable, TimelinePaginationEnabled {
  channel: string;
  count?: number;
  unreads?: boolean;
}
export interface ChannelsInfoArguments extends WebAPICallOptions, TokenOverridable, LocaleAware {
  channel: string;
}
export interface ChannelsInviteArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  user: string;
}
export interface ChannelsJoinArguments extends WebAPICallOptions, TokenOverridable {
  name: string;
  validate?: boolean;
}
export interface ChannelsKickArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  user: string;
}
export interface ChannelsLeaveArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
}
export interface ChannelsListArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {
  exclude_archived?: boolean;
  exclude_members?: boolean;
}
cursorPaginationEnabledMethods.add('channels.list');
export interface ChannelsMarkArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  ts: string;
}
export interface ChannelsRenameArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  name: string;
  validate?: boolean;
}
export interface ChannelsRepliesArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  thread_ts: string;
}
export interface ChannelsSetPurposeArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  purpose: string;
}
export interface ChannelsSetTopicArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  topic: string;
}
export interface ChannelsUnarchiveArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
}

/*
 * `chat.*`
 */
export interface ChatDeleteArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  ts: string;
  as_user?: boolean;
}
export interface ChatDeleteResponse extends WebAPICallResult {
  channel: string;
  ts: string;
}
export interface ChatDeleteScheduledMessageArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  scheduled_message_id: string;
  as_user?: boolean;
}
export interface ChatGetPermalinkArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  message_ts: string;
}
export interface ChatGetPermalinkResponse extends WebAPICallResult {
  channel: string;
  permalink: string;
}
export interface ChatMeMessageArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  text: string;
}
export interface ChatMeMessageResponse extends WebAPICallResult {
  channel: string;
  ts: string;
}
export interface ChatPostEphemeralArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  text: string;
  user: string;
  as_user?: boolean;
  attachments?: MessageAttachment[];
  blocks?: (KnownBlock | Block)[];
  link_names?: boolean;
  parse?: 'full' | 'none';
}
export interface ChatPostEphemeralResponse extends WebAPICallResult {
  message_ts: string;
}
export interface ChatPostMessageArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  text: string;
  as_user?: boolean;
  attachments?: MessageAttachment[];
  blocks?: (KnownBlock | Block)[];
  icon_emoji?: string; // if specified, as_user must be false
  icon_url?: string;
  link_names?: boolean;
  mrkdwn?: boolean;
  parse?: 'full' | 'none';
  reply_broadcast?: boolean; // if specified, thread_ts must be set
  thread_ts?: string;
  unfurl_links?: boolean;
  unfurl_media?: boolean;
  username?: string; // if specified, as_user must be false
}
export interface ChatPostMessageResponse extends WebAPICallResult {
  channel: string;
  ts: string;
  message: {
    ts: string;
    text: string;
    user: string;
    username?: string;
    bot_id?: string;
    attachments?: MessageAttachment[];
    blocks?: (Block | KnownBlock)[];
    type: string;
    subtype?: string;
  };
}
export interface ChatScheduleMessageArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  text: string;
  post_at: string;
  as_user?: boolean;
  attachments?: MessageAttachment[];
  blocks?: (KnownBlock | Block)[];
  link_names?: boolean;
  parse?: 'full' | 'none';
  reply_broadcast?: boolean; // if specified, thread_ts must be set
  thread_ts?: string;
  unfurl_links?: boolean;
  unfurl_media?: boolean;
}
export interface ChatScheduleMessageResponse extends WebAPICallResult {
  channel: string;
  scheduled_message_id: string;
  post_at: string;
  message: ChatPostMessageResponse['message'];
}
export interface ChatScheduledMessagesListArguments extends WebAPICallOptions, TokenOverridable,
  CursorPaginationEnabled {
  channel: string;
  latest: number;
  oldest: number;
}
cursorPaginationEnabledMethods.add('chat.scheduledMessages.list');
export interface ChatScheduleMessageResponse extends WebAPICallResult {
  scheduled_messages: ChatPostMessageResponse['message'][];
}
export interface ChatUnfurlArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  ts: string;
  unfurls: LinkUnfurls;
  user_auth_message?: string;
  user_auth_required?: boolean;
  user_auth_url?: string;
}
export interface ChatUpdateArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  text: string;
  ts: string;
  as_user?: boolean;
  attachments?: MessageAttachment[];
  blocks?: (KnownBlock | Block)[];
  link_names?: boolean;
  parse?: 'full' | 'none';
}
export interface ChatUpdateResponse extends WebAPICallResult {
  channel: string;
  ts: string;
  text: string;
  message: ChatPostMessageResponse['message'];
}

/*
 * `conversations.*`
 */
export interface ConversationsArchiveArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
}
export interface ConversationsCloseArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
}
export interface ConversationsCloseResponse extends WebAPICallResult {
  no_op?: boolean;
  already_closed?: boolean;
}
export interface ConversationsCreateArguments extends WebAPICallOptions, TokenOverridable {
  name: string;
  is_private?: boolean;
}
export interface ConversationsCreateResponse extends WebAPICallResult {
  channel: ConversationsInfoResponse['channel'];
}
export interface ConversationsHistoryArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled,
  TimelinePaginationEnabled {
  channel: string;
}
cursorPaginationEnabledMethods.add('conversations.history');
export interface ConversationsHistoryResponse extends WebAPICallResult {
  messages: ChatPostMessageResponse['message'][];
  has_more: boolean;
  pin_count: number;
  latest?: string;
}
export interface ConversationsInfoArguments extends WebAPICallOptions, TokenOverridable, LocaleAware {
  channel: string;
}
export interface ConversationsInfoResponse extends WebAPICallResult {
  channel: {
    id: string;
    is_archived?: boolean;
    is_channel?: boolean;
    is_ext_shared?: boolean;
    is_general?: boolean;
    is_group?: boolean;
    is_im?: boolean;
    is_member?: boolean;
    is_mpim?: boolean;
    is_org_shared?: boolean;
    is_pending_ext_shared?: boolean;
    is_private?: boolean;
    is_read_only?: boolean;
    is_shared?: boolean;
    name: string;
    creator: string;
    created: number;
    conversation_host_id?: string;
    topic?: {
      value: string;
      creator: string;
      last_set: number;
    };
    purpose?: {
      value: string;
      creator: string;
      last_set: number;
    };
    members?: string[];
    last_read?: string;
    latest?: ChatPostMessageResponse['message'];
    unread_count?: number;
    unread_count_display?: number;
  };
}
export interface ConversationsInviteArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  users: string; // comma-separated list of users
}
export interface ConversationsInviteResponse extends WebAPICallResult {
  channel: ConversationsInfoResponse['channel'];
}
export interface ConversationsJoinArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
}
export interface ConversationsJoinResponse extends WebAPICallResult {
  channel: ConversationsInfoResponse['channel'];
}
export interface ConversationsKickArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  user: string;
}
export interface ConversationsLeaveArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
}
export interface ConversationsLeaveResponse extends WebAPICallResult {
  not_in_channel?: boolean;
}
export interface ConversationsListArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {
  exclude_archived?: boolean;
  types?: string; // comma-separated list of conversation types
}
cursorPaginationEnabledMethods.add('conversations.list');
export interface ConversationsListResponse extends WebAPICallResult {
  channels: ConversationsInfoResponse['channel'][];
}
export interface ConversationsMarkArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  ts: string;
}
export interface ConversationsMembersArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {
  channel: string;
}
cursorPaginationEnabledMethods.add('conversations.members');
export interface ConversationsMembersResponse extends WebAPICallResult {
  members: string[];
}
export interface ConversationsOpenArguments extends WebAPICallOptions, TokenOverridable {
  channel?: string;
  users?: string; // comma-separated list of users
  return_im?: boolean;
}
export interface ConversationsOpenResponse extends WebAPICallResult {
  channel: { id: string } | ConversationsInfoResponse['channel'];
  no_op?: boolean;
  already_open?: boolean;
}
export interface ConversationsRenameArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  name: string;
}
export interface ConversationsRenameResponse extends WebAPICallResult {
  channel: ConversationsInfoResponse['channel'];
}
export interface ConversationsRepliesArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled,
  TimelinePaginationEnabled {
  channel: string;
  ts: string;
}
cursorPaginationEnabledMethods.add('conversations.replies');
export interface ConversationsRepliesResponse extends WebAPICallResult {
  messages: ChatPostMessageResponse['message'][];
  has_more: boolean;
}
export interface ConversationsSetPurposeArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  purpose: string;
}
export interface ConversationsSetPurposeResponse extends WebAPICallResult {
  purpose: string;
}
export interface ConversationsSetTopicArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  topic: string;
}
export interface ConversationsSetTopicResponse extends WebAPICallResult {
  topic: string;
}
export interface ConversationsUnarchiveArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
}

/*
 * `dialog.*`
 */
export interface DialogOpenArguments extends WebAPICallOptions, TokenOverridable {
  trigger_id: string;
  dialog: Dialog;
}

/*
 * `dnd.*`
 */
export interface DndEndDndArguments extends WebAPICallOptions, TokenOverridable {}
export interface DndEndSnoozeArguments extends WebAPICallOptions, TokenOverridable {}
export interface DndEndSnoozeResponse extends WebAPICallResult {
  dnd_enabled: boolean;
  next_dnd_start_ts: number;
  next_dnd_end_ts: number;
  snooze_enabled: boolean;
  snooze_endtime?: number;
  snooze_remaining?: number;
}
export interface DndInfoArguments extends WebAPICallOptions, TokenOverridable {
  user: string;
}
export interface DndInfoResponse extends WebAPICallResult {
  dnd_enabled: boolean;
  next_dnd_start_ts: number;
  next_dnd_end_ts: number;
  snooze_enabled: boolean;
  snooze_endtime?: number;
  snooze_remaining?: number;
}
export interface DndSetSnoozeArguments extends WebAPICallOptions, TokenOverridable {
  num_minutes: number;
}
export interface DndSetSnoozeResponse extends WebAPICallResult {
  snooze_enabled: boolean;
  snooze_endtime?: number;
  snooze_remaining?: number;
}
export interface DndTeamInfoArguments extends WebAPICallOptions, TokenOverridable {
  users?: string; // comma-separated list of users
}
export interface DndTeamInfoResponse extends WebAPICallResult {
  users: Record<string, {
    dnd_enabled: boolean;
    next_dnd_start_ts: number;
    next_dnd_end_ts: number;
  }>;
}

/*
 * `emoji.*`
 */
export interface EmojiListArguments extends WebAPICallOptions, TokenOverridable {}
export interface EmojiListResponse extends WebAPICallResult {
  emoji: Record<string, string>;
}

/*
 * `files.*`
 */
export interface FilesDeleteArguments extends WebAPICallOptions, TokenOverridable {
  file: string; // file id
}
export interface FilesInfoArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {
  file: string; // file id
  count?: number;
  page?: number;
}
cursorPaginationEnabledMethods.add('files.info');
export interface FilesInfoResponse extends WebAPICallResult {
  file: {
    id: string;
    created: number;
    timestamp: number;
    name: string;
    title: string;
    mimetype: string;
    filetype: string;
    pretty_type: string;
    user: string;
    editable: boolean;
    size: number;
    mode: string;
    is_external: boolean;
    external_type: string;
    is_public: boolean;
    public_url_shared: boolean;
    display_as_bot: boolean;
    username: string;
    url_private: string;
    url_private_download: string;
    thumb_64: string;
    thumb_80: string;
    thumb_160: string;
    thumb_360: string;
    thumb_360_w: string;
    thumb_360_h: string;
    thumb_360_gif: string;
    deanimate_gif: string;
    pjpeg: string;
    image_exif_rotation: number;
    original_w: number;
    original_h: number;
    permalink: string;
    permalink_public: string;
    comments_count: number;
    is_starred: boolean;
    has_rich_preview: boolean;
    shares: {
      public?: Record<string, {
        reply_users: string[];
        reply_users_count: number;
        reply_count: number;
        ts: string;
        thread_ts?: string;
        latest_reply?: string;
        channel_name?: string;
        team_id?: string;
      }[]>;
      private?: Record<string, {
        reply_users: string[];
        reply_users_count: number;
        reply_count: number;
        ts: string;
        thread_ts?: string;
        latest_reply?: string;
        channel_name?: string;
        team_id?: string;
      }[]>;
    };
    channels: string[];
    groups: string[];
    ims: string[];
  };
  comments: unknown[];
}
export interface FilesListArguments extends WebAPICallOptions, TokenOverridable, TraditionalPagingEnabled {
  channel?: string;
  user?: string;
  ts_from?: string;
  ts_to?: string;
  types?: string; // comma-separated list of file types
}
export interface FilesListResponse extends WebAPICallResult {
  files: FilesInfoResponse['file'][];
  paging?: {
    count: number;
    total: number;
    page: number;
    pages: number;
  };
}
export interface FilesRevokePublicURLArguments extends WebAPICallOptions, TokenOverridable {
  file: string; // file id
}
export interface FilesRevokePublicURLResponse extends WebAPICallResult {
  file: FilesInfoResponse['file'];
}
export interface FilesSharedPublicURLArguments extends WebAPICallOptions, TokenOverridable {
  file: string; // file id
}
export interface FilesSharedPublicURLResponse extends WebAPICallResult {
  file: FilesInfoResponse['file'];
}
export interface FilesUploadArguments extends WebAPICallOptions, TokenOverridable {
  channels?: string; // comma-separated list of channels
  content?: string; // if absent, must provide `file`
  file?: Buffer | Stream; // if absent, must provide `content`
  filename?: string;
  filetype?: string;
  initial_comment?: string;
  title?: string;
  thread_ts?: string; // if specified, `channels` must be set
}
export interface FilesUploadResponse extends WebAPICallResult {
  file: FilesInfoResponse['file'];
}
export interface FilesCommentsDeleteArguments extends WebAPICallOptions, TokenOverridable {
  file: string; // file id
  id: string; // comment id
}
// either file or external_id is required
export interface FilesRemoteInfoArguments extends WebAPICallOptions, TokenOverridable {
  // either one of the file or external_id arguments are required
  file?: string;
  external_id?: string;
}
export interface FilesRemoteListArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {
  ts_from?: string;
  ts_to?: string;
  channel?: string;
}
cursorPaginationEnabledMethods.add('files.remote.list');
export interface FilesRemoteAddArguments extends WebAPICallOptions, TokenOverridable {
  title: string;
  external_url: string;
  external_id: string; // a unique identifier for the file in your system
  filetype: string; // possible values (except for 'auto'): https://api.slack.com/types/file#file_types
  preview_image?: Buffer | Stream;
  indexable_file_contents?: Buffer | Stream;
}
export interface FilesRemoteAddResponse extends WebAPICallResult {
  file: FilesInfoResponse['file'];
}
export interface FilesRemoteUpdateArguments extends WebAPICallOptions, TokenOverridable {
  title?: string;
  external_url?: string;
  filetype?: string; // possible values (except for 'auto'): https://api.slack.com/types/file#file_types
  preview_image?: Buffer | Stream;
  indexable_file_contents?: Buffer | Stream;

  // either one of the file or external_id arguments are required
  file?: string;
  external_id?: string;
}
export interface FilesRemoteRemoveArguments extends WebAPICallOptions, TokenOverridable {
  // either one of the file or external_id arguments are required
  file?: string;
  external_id?: string;
}
export interface FilesRemoteShareArguments extends WebAPICallOptions, TokenOverridable {
  channels: string; // comma-separated list of channel ids

  // either one of the file or external_id arguments are required
  file?: string;
  external_id?: string;
}

/*
 * `groups.*`
 */
export interface GroupsArchiveArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
}
export interface GroupsCreateArguments extends WebAPICallOptions, TokenOverridable {
  name: string;
  validate?: boolean;
}
export interface GroupsCreateChildArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
}
export interface GroupsHistoryArguments extends WebAPICallOptions, TokenOverridable, TimelinePaginationEnabled {
  channel: string;
  unreads?: boolean;
  count?: number;
}
export interface GroupsInfoArguments extends WebAPICallOptions, TokenOverridable, LocaleAware {
  channel: string;
}
export interface GroupsInviteArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  user: string;
}
export interface GroupsKickArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  user: string;
}
export interface GroupsLeaveArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
}
export interface GroupsListArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {
  exclude_archived?: boolean;
  exclude_members?: boolean;
}
cursorPaginationEnabledMethods.add('groups.list');
export interface GroupsMarkArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  ts: string;
}
export interface GroupsOpenArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
}
export interface GroupsRenameArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  name: string;
  validate?: boolean;
}
export interface GroupsRepliesArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  thread_ts: boolean;
}
export interface GroupsSetPurposeArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  purpose: string;
}
export interface GroupsSetTopicArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  topic: string;
}
export interface GroupsUnarchiveArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
}

/*
 * `im.*`
 */
export interface IMCloseArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
}
export interface IMHistoryArguments extends WebAPICallOptions, TokenOverridable, TimelinePaginationEnabled {
  channel: string;
  count?: number;
  unreads?: boolean;
}
export interface IMListArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {}
cursorPaginationEnabledMethods.add('im.list');
export interface IMMarkArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  ts: string;
}
export interface IMOpenArguments extends WebAPICallOptions, TokenOverridable, LocaleAware {
  user: string;
  return_im?: boolean;
}
export interface IMRepliesArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  thread_ts?: string;
}

/*
 * `migration.*`
 */
export interface MigrationExchangeArguments extends WebAPICallOptions, TokenOverridable {
  users: string; // comma-separated list of users
  to_old?: boolean;
}
export interface MigrationExchangeResponse extends WebAPICallResult {
  team_id: string;
  enterprise_id: string;
  user_id_map: Record<string, string>;
  invalid_user_ids?: string[];
}

/*
 * `mpim.*`
 */
export interface MPIMCloseArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
}
export interface MPIMHistoryArguments extends WebAPICallOptions, TokenOverridable, TimelinePaginationEnabled {
  channel: string;
  count?: number;
  unreads?: boolean;
}
export interface MPIMListArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {}
cursorPaginationEnabledMethods.add('mpim.list');
export interface MPIMMarkArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  ts: string;
}
export interface MPIMOpenArguments extends WebAPICallOptions, TokenOverridable {
  users: string; // comma-separated list of users
}
export interface MPIMRepliesArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  thread_ts: string;
}

/*
 * `oauth.*`
 */
export interface OAuthAccessArguments extends WebAPICallOptions {
  client_id: string;
  client_secret: string;
  code: string;
  redirect_uri?: string;
  single_channel?: string;
}
export interface OAuthV2AccessArguments extends WebAPICallOptions {
  client_id: string;
  client_secret: string;
  code: string;
  redirect_uri?: string;
}
export interface OAuthV2AccessResponse extends WebAPICallResult {
  access_token?: string;
  token_type?: string;
  scope?: string;
  bot_user_id?: string;
  app_id: string;
  team: {
    name?: string;
    id: string;
  };
  is_enterprise_install: boolean;
  enterprise: {
    name: string;
    id: string;
  } | null;
  authed_user: {
    id: string;
    scope: string;
    access_token: string;
    token_type: string;
  };
}
/*
 * `pins.*`
 */
export interface PinsAddArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  // must supply one of:
  file?: string; // file id
  file_comment?: string;
  timestamp?: string;
}
export interface PinsListArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
}
export interface PinsListResponse extends WebAPICallResult {
  items: {
    channel?: string;
    message?: ChatPostMessageResponse['message'];
    file?: FilesInfoResponse['file'];
    comment?: unknown;
    type: 'message' | 'file' | 'file_comment';
    created: number;
    created_by: string;
  }[];
}
export interface PinsRemoveArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  // must supply one of:
  file?: string; // file id
  file_comment?: string;
  timestamp?: string;
}

/*
 * `reactions.*`
 */
export interface ReactionsAddArguments extends WebAPICallOptions, TokenOverridable {
  name: string;
  // must supply one of:
  channel?: string; // paired with timestamp
  timestamp?: string; // paired with channel
  file?: string; // file id
  file_comment?: string;
}
export interface ReactionsGetArguments extends WebAPICallOptions, TokenOverridable {
  full?: boolean;
  // must supply one of:
  channel?: string; // paired with timestamp
  timestamp?: string; // paired with channel
  file?: string; // file id
  file_comment?: string;
}
export interface ReactionsGetResponse extends WebAPICallResult {
  message?: ChatPostMessageResponse['message'];
  file?: FilesInfoResponse['file'];
  comment?: unknown;
  type: 'message' | 'file' | 'file_comment';
}
export interface ReactionsListArguments extends WebAPICallOptions, TokenOverridable,  TraditionalPagingEnabled,
  CursorPaginationEnabled {
  user?: string;
  full?: boolean;
}
cursorPaginationEnabledMethods.add('reactions.list');
export interface ReactionsListResponse extends WebAPICallResult {
  items: {
    message?: ReactionsGetResponse['message'];
    file?: ReactionsGetResponse['file'];
    comment?: ReactionsGetResponse['comment'];
    type: ReactionsGetResponse['type'];
  }[];
}
export interface ReactionsRemoveArguments extends WebAPICallOptions, TokenOverridable {
  name: string;
  // must supply one of:
  channel?: string; // paired with timestamp
  timestamp?: string; // paired with channel
  file?: string; // file id
  file_comment?: string;
}

/*
 * `reminders.*`
 */
export interface RemindersAddArguments extends WebAPICallOptions, TokenOverridable {
  text: string;
  time: string | number;
  user?: string;
}
export interface RemindersAddResponse extends WebAPICallResult {
  reminder: RemindersInfoResponse['reminder'];
}
export interface RemindersCompleteArguments extends WebAPICallOptions, TokenOverridable {
  reminder: string;
}
export interface RemindersDeleteArguments extends WebAPICallOptions, TokenOverridable {
  reminder: string;
}
export interface RemindersInfoArguments extends WebAPICallOptions, TokenOverridable {
  reminder: string;
}
export interface RemindersInfoResponse extends WebAPICallResult {
  reminder: {
    id: string;
    creator: string;
    user: string;
    text: string;
    recurring: boolean;
    time?: number;
    complete_ts?: number;
  };
}
export interface RemindersListArguments extends WebAPICallOptions, TokenOverridable {}
export interface RemindersListResponse extends WebAPICallResult {
  reminders: RemindersInfoResponse['reminder'][];
}

/*
 * `rtm.*`
 */
export interface RTMConnectArguments extends WebAPICallOptions, TokenOverridable {
  batch_presence_aware?: boolean;
  presence_sub?: boolean;
}
export interface RTMConnectResponse extends WebAPICallResult {
  self: {
    id: string;
    name: string;
  };
  team: {
    domain: string;
    id: string;
    name: string;
    enterprise_id?: string;
  };
  url: string;
}
export interface RTMStartArguments extends WebAPICallOptions, TokenOverridable, LocaleAware {
  batch_presence_aware?: boolean;
  mpim_aware?: boolean;
  no_latest?: '0' | '1';
  no_unreads?: string;
  presence_sub?: boolean;
  simple_latest?: boolean;
}
export interface RTMStartResponse extends WebAPICallResult {
  url: string;
  self: {
    id: string;
    name: string;
    prefs: unknown;
    created: number;
    manual_presence: string;
  };
  team: {
    id: string;
    name: string;
    email_domain: string;
    domain: string;
    icon: Record<string, string>;
    msg_edit_window_mins: number;
    over_storage_limit: boolean;
    prefs: unknown;
    plan: string;
  };
  users: UsersInfoResponse['user'][];
  channels: ConversationsInfoResponse['channel'][];
  groups: ConversationsInfoResponse['channel'][];
  mpimps: ConversationsInfoResponse['channel'][];
  ims: ConversationsInfoResponse['channel'][];
  bots: BotsInfoResponse['bot'][];
}

/*
 * `search.*`
 */
export interface SearchAllArguments extends WebAPICallOptions, TokenOverridable,  TraditionalPagingEnabled,
  Searchable {}
export interface SearchAllResponse extends WebAPICallResult {
  files: SearchFilesResponse['files'];
  messages: SearchMessagesResponse['messages'];
  posts: {
    matches: unknown[];
    total: number;
  };
  query: string;
}
export interface SearchFilesArguments extends WebAPICallOptions, TokenOverridable, TraditionalPagingEnabled,
  Searchable {}
export interface SearchFilesResponse extends WebAPICallResult {
  files: {
    matches: FilesInfoResponse['file'][];
    pagination: {
      first: number;
      last: number;
      page: number;
      page_count: number;
      per_page: number;
      total_count: number;
    };
    paging: {
      count: number;
      page: number;
      pages: number;
      total: number;
    };
    total: number;
  };
  query: string;
}
export interface SearchMessagesArguments extends WebAPICallOptions, TokenOverridable, TraditionalPagingEnabled,
  Searchable {}
export interface SearchMessagesResponse extends WebAPICallResult {
  messages: {
    matches: {
      channel: ConversationsInfoResponse['channel'];
      iid: string;
      permalink: string;
      team: string;
      text: string;
      ts: string;
      type: string;
      user: string;
      username: string;
    }[];
    pagination: {
      first: number;
      last: number;
      page: number;
      page_count: number;
      per_page: number;
      total_count: number;
    };
    paging: {
      count: number;
      page: number;
      pages: number;
      total: number;
    };
    total: number;
  };
  query: string;
}

/*
 * `stars.*`
 */
export interface StarsAddArguments extends WebAPICallOptions, TokenOverridable {
  // must supply one of:
  channel?: string; // paired with `timestamp`
  timestamp?: string; // paired with `channel`
  file?: string; // file id
  file_comment?: string;
}
export interface StarsListArguments extends WebAPICallOptions, TokenOverridable, TraditionalPagingEnabled,
  CursorPaginationEnabled {}
export interface StartsListResponse extends WebAPICallResult {
  items: {
    type: string;
    channel?: string;
    message?: ChatPostMessageResponse['message'];
    file?: FilesInfoResponse['file'];
    comment?: unknown;
  }[];
  paging: {
    count: number;
    total: number;
    page: number;
    pages: number;
  };
}
cursorPaginationEnabledMethods.add('stars.list');
export interface StarsRemoveArguments extends WebAPICallOptions, TokenOverridable {
  // must supply one of:
  channel?: string; // paired with `timestamp`
  timestamp?: string; // paired with `channel`
  file?: string; // file id
  file_comment?: string;
}

/*
 * `team.*`
 */
export interface TeamAccessLogsArguments extends WebAPICallOptions, TokenOverridable, TraditionalPagingEnabled {
  before?: number;
}
export interface TeamAccessLogsResponse extends WebAPICallResult {
  logins: {
    user_id: string;
    username: string;
    date_first: number;
    date_last: number;
    count: number;
    ip: string;
    user_agent: string;
    isp: string;
    country: string;
    region: string;
  }[];
  paging: {
    count: number;
    total: number;
    page: number;
    pages: number;
  };
}
export interface TeamBillableInfoArguments extends WebAPICallOptions, TokenOverridable {
  user?: string;
}
export interface TeamBillableInfoResponse extends WebAPICallResult {
  billable_info: Record<string, { billing_active: boolean; }>;
}
export interface TeamInfoArguments extends WebAPICallOptions, TokenOverridable {}
export interface TeamInfoResponse extends WebAPICallResult {
  team: {
    id: string;
    name: string;
    domain: string;
    email_domain: string;
    icon: {
      image_34?: string;
      image_44?: string;
      image_68?: string;
      image_88?: string;
      image_102?: string;
      image_132?: string;
      image_default: boolean;
    };
    enterprise_id?: string;
    enterprise_name?: string;
    default_channels?: string[];
  };
}
export interface TeamIntegrationLogsArguments extends WebAPICallOptions, TokenOverridable, TraditionalPagingEnabled {
  app_id?: string;
  change_type?: string; // TODO: list types: 'x' | 'y' | 'z'
  service_id?: string;
  user?: string;
}
export interface TeamIntegrationLogsResponse extends WebAPICallResult {
  logs: {
    service_id: string;
    service_type: string;
    user_id: string;
    user_name: string;
    channel: string;
    date: string;
    change_type: string;
    scope: string;
  }[];
  paging: {
    count: number;
    total: number;
    page: number;
    pages: number;
  };
}
export interface TeamProfileGetArguments extends WebAPICallOptions, TokenOverridable {
  visibility?: 'all' | 'visible' | 'hidden';
}
export interface TeamProfileGetResponse extends WebAPICallResult {
  profile: {
    fields: {
      id: string;
      ordering: number;
      label: string;
      hint: string;
      type: string;
      possible_values: string[] | null;
      options: {
        is_protected: 1 | 0;
      } | null;
      is_hidden?: 1 | 0;
    }[];
  };
}

/*
 * `usergroups.*`
 */
export interface UsergroupsCreateArguments extends WebAPICallOptions, TokenOverridable {
  name: string;
  channels?: string; // comma-separated list of channels
  description?: string;
  handle?: string;
  include_count?: boolean;
}
export interface UsergroupsCreateResponse extends WebAPICallResult {
  usergroup: UsergroupsUpdateResponse['usergroup'];
}
export interface UsergroupsDisableArguments extends WebAPICallOptions, TokenOverridable {
  usergroup: string;
  include_count?: boolean;
}
export interface UsergroupsDisableResponse extends WebAPICallResult {
  usergroup: UsergroupsUpdateResponse['usergroup'];
}
export interface UsergroupsEnableArguments extends WebAPICallOptions, TokenOverridable {
  usergroup: string;
  include_count?: boolean;
}
export interface UsergroupsEnableResponse extends WebAPICallResult {
  usergroup: UsergroupsUpdateResponse['usergroup'];
}
export interface UsergroupsListArguments extends WebAPICallOptions, TokenOverridable {
  include_count?: boolean;
  include_disabled?: boolean;
  include_users?: boolean;
}
export interface UsergroupsListResponse extends WebAPICallResult {
  usergroups: UsergroupsUpdateArguments['usergroup'][];
}
export interface UsergroupsUpdateArguments extends WebAPICallOptions, TokenOverridable {
  usergroup: string;
  channels?: string; // comma-separated list of channels
  description?: string;
  handle?: string;
  include_count?: boolean;
  name?: string;
}
export interface UsergroupsUpdateResponse extends WebAPICallResult {
  usergroup: {
    id: string;
    team_id: string;
    is_usergroup: boolean;
    name: string;
    description: string;
    handle: string;
    is_external: boolean;
    date_create: number;
    date_update: number;
    date_delete: number;
    auto_type: unknown | null;
    created_by: string;
    updated_by: string;
    deleted_by: string | null;
    prefs: {
      channels: unknown[];
      groups: unknown[];
    };
    users: string[];
    user_count: number;
  };
}
export interface UsergroupsUsersListArguments extends WebAPICallOptions, TokenOverridable {
  usergroup: string;
  include_disabled?: boolean;
}
export interface UsergroupsUsersListResponse extends WebAPICallResult {
  users: string[];
}
export interface UsergroupsUsersUpdateArguments extends WebAPICallOptions, TokenOverridable {
  usergroup: string;
  users: string; // comma-separated list of users
  include_count?: boolean;
}
export interface UsergroupsUsersUpdateResponse extends WebAPICallResult {
  usergroup: UsergroupsUpdateResponse['usergroup'];
}

/*
 * `users.*`
 */
export interface UsersConversationsArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {
  exclude_archived?: boolean;
  types?: string; // comma-separated list of conversation types
  user?: string;
}
cursorPaginationEnabledMethods.add('users.conversations');
export interface UsersConversationsResponse extends WebAPICallResult {
  channels: ConversationsListResponse['channels'];
}
export interface UsersDeletePhotoArguments extends WebAPICallOptions, TokenOverridable {}
export interface UsersGetPresenceArguments extends WebAPICallOptions, TokenOverridable {
  user: string;
}
export interface UsersGetPresenceResponse extends WebAPICallResult {
  presence: 'active' | 'away';
  online?: boolean;
  auto_away?: boolean;
  manual_away?: boolean;
  connection_count?: number;
  last_activity?: number;
}
export interface UsersIdentityArguments extends WebAPICallOptions, TokenOverridable {}
export interface UsersIdentityResponse extends WebAPICallResult {
  user: {
    name: string;
    id: string;
    email?: string;
    image_24?: string;
    image_32?: string;
    image_48?: string;
    image_72?: string;
    image_192?: string;
    image_512?: string;
  };
  team: {
    name?: string;
    id: string;
  };
}
export interface UsersInfoArguments extends WebAPICallOptions, TokenOverridable, LocaleAware {
  user: string;
}
export interface UsersInfoResponse extends WebAPICallResult {
  user: {
    always_active?: boolean;
    color: string;
    deleted?: boolean;
    enterprise_user?: {
      enterprise_id: string;
      enterprise_name: string;
      id: string;
      is_admin: boolean;
      is_owner: boolean;
      teams: string[];
    };
    has_2fa: boolean;
    id: string;
    is_admin: boolean;
    is_app_user: boolean;
    is_bot: boolean;
    is_invited_user: boolean;
    is_owner: boolean;
    is_primary_owner: boolean;
    is_restricted: boolean;
    is_stranger: boolean;
    is_ultra_restricted: boolean;
    locale: string;
    /** @deprecated */
    name: string;
    profile: Omit<UsersProfileGetResponse['profile'], 'fields'>;
    two_factor_type?: string;
    tz: string;
    tz_label: string;
    tz_offset: number;
    updated: string;
  };
}
export interface UsersListArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled, LocaleAware {
  presence?: boolean; // deprecated, defaults to false
}
cursorPaginationEnabledMethods.add('users.list');
export interface UsersListResponse extends WebAPICallResult {
  members: UsersInfoResponse['user'][];
}
export interface UsersLookupByEmailArguments extends WebAPICallOptions, TokenOverridable {
  email: string;
}
export interface UsersLookupByEmailResponse extends WebAPICallResult {
  user: UsersInfoResponse['user'];
}
export interface UsersSetPhotoArguments extends WebAPICallOptions, TokenOverridable {
  image: Buffer | Stream;
  crop_w?: number;
  crop_x?: number;
  crop_y?: number;
}
export interface UsersSetPresenceArguments extends WebAPICallOptions, TokenOverridable {
  presence: 'auto' | 'away';
}
export interface UsersProfileGetArguments extends WebAPICallOptions, TokenOverridable {
  include_labels?: boolean;
  user?: string;
}
export interface UsersProfileGetResponse extends WebAPICallResult {
  profile: {
    avatar_hash: string;
    status_text: string;
    status_emoji: string;
    status_expiration: number;
    real_name: string;
    display_name: string;
    real_name_normalized: string;
    display_name_normalized: string;
    email?: string;
    image_original: string;
    image_24: string;
    image_32: string;
    image_48: string;
    image_72: string;
    image_192: string;
    image_512: string;
    team: string;
    always_active?: boolean;
    fields: {
      [field: string]: {
        value: string;
        alt?: string;
      };
    };
  };
}
export interface UsersProfileSetArguments extends WebAPICallOptions, TokenOverridable {
  profile?: {
    first_name?: string;
    last_name?: string;
    status_text?: string;
    status_emoji?: string;
    status_expiration?: number;
    real_name?: string;
    display_name?: string;
    email?: string;
    fields?: {
      [field: string]: {
        value: string;
        alt?: string;
      };
    };
  };
  user?: string;
  name?: string; // usable if `profile` is not passed
  value?: string; // usable if `profile` is not passed
}
export interface UsersProfileSetResponse extends WebAPICallResult {
  profile: UsersProfileGetResponse['profile'];
}

/*
 * `views.*`
 */
export interface ViewsOpenArguments extends WebAPICallOptions, TokenOverridable {
  trigger_id: string;
  view: View;
}
export interface ViewsOpenResponse extends WebAPICallResult {
  view: View & {
    id: string;
    team_id: string;
    external_id: string;
    state: {
      values: unknown[];
    };
    hash: string;
    root_view_id: string;
    app_id: string;
    bot_id: string;
  };
}
export interface ViewsPublishArguments extends WebAPICallOptions, TokenOverridable {
  user_id: string;
  view: View;
  hash?: string;
}
export interface ViewsPublishResponse extends WebAPICallResult {
  view: View & {
    id: string;
    team_id: string;
    external_id: string;
    state: {
      values: unknown[];
    };
    hash: string;
    root_view_id: string;
    previous_view_id: string | null;
    app_id: string;
    bot_id: string;
  };
}
export interface ViewsPushArguments extends WebAPICallOptions, TokenOverridable {
  trigger_id: string;
  view: View;
}
export interface ViewsPushResponse extends WebAPICallResult {
  view: View & {
    id: string;
    team_id: string;
    external_id: string;
    state: {
      values: unknown[];
    };
    hash: string;
    root_view_id: string;
    previous_view_id: string | null;
    app_id: string;
    bot_id: string;
  };
}
export interface ViewsUpdateArguments extends WebAPICallOptions, TokenOverridable {
  view_id: string;
  view: View;
  external_id?: string;
  hash?: string;
}
export interface ViewsUpdateResponse extends WebAPICallResult {
  view: View & {
    id: string;
    team_id: string;
    external_id: string;
    state: {
      values: unknown[];
    };
    hash: string;
    root_view_id: string;
    previous_view_id: string | null;
    app_id: string;
    bot_id: string;
  };
}

export * from '@slack/types';
