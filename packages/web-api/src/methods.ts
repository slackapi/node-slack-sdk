import { Stream } from 'stream';
import { Dialog, View, KnownBlock, Block, MessageAttachment, LinkUnfurls, CallUser, MessageMetadata } from '@slack/types';
import { EventEmitter } from 'eventemitter3';
import { WebAPICallResult, WebClient, WebClientEvent } from './WebClient';
import {
  AdminAnalyticsGetFileResponse,
  AdminAppsApproveResponse,
  AdminAppsApprovedListResponse,
  AdminAppsClearResolutionResponse,
  AdminAppsRequestsListResponse,
  AdminAppsRestrictResponse,
  AdminAppsRestrictedListResponse,
  AdminAppsUninstallResponse,
  AdminAuthPolicyAssignEntitiesResponse,
  AdminAuthPolicyGetEntitiesResponse,
  AdminAuthPolicyRemoveEntitiesResponse,
  AdminBarriersCreateResponse,
  AdminBarriersDeleteResponse,
  AdminBarriersListResponse,
  AdminBarriersUpdateResponse,
  AdminConversationsArchiveResponse,
  AdminConversationsConvertToPrivateResponse,
  AdminConversationsCreateResponse,
  AdminConversationsDeleteResponse,
  AdminConversationsDisconnectSharedResponse,
  AdminConversationsEkmListOriginalConnectedChannelInfoResponse,
  AdminConversationsGetConversationPrefsResponse,
  AdminConversationsGetTeamsResponse,
  AdminConversationsInviteResponse,
  AdminConversationsRenameResponse,
  AdminConversationsRestrictAccessAddGroupResponse,
  AdminConversationsRestrictAccessListGroupsResponse,
  AdminConversationsRestrictAccessRemoveGroupResponse,
  AdminConversationsSearchResponse,
  AdminConversationsSetConversationPrefsResponse,
  AdminConversationsSetTeamsResponse,
  AdminConversationsUnarchiveResponse,
  AdminConversationsGetCustomRetentionResponse,
  AdminConversationsSetCustomRetentionResponse,
  AdminConversationsRemoveCustomRetentionResponse,
  AdminConversationsBulkArchiveResponse,
  AdminConversationsBulkDeleteResponse,
  AdminConversationsBulkMoveResponse,
  AdminEmojiAddAliasResponse,
  AdminEmojiAddResponse,
  AdminEmojiListResponse,
  AdminEmojiRemoveResponse,
  AdminEmojiRenameResponse,
  AdminInviteRequestsApproveResponse,
  AdminInviteRequestsApprovedListResponse,
  AdminInviteRequestsDeniedListResponse,
  AdminInviteRequestsDenyResponse,
  AdminInviteRequestsListResponse,
  AdminTeamsAdminsListResponse,
  AdminTeamsCreateResponse,
  AdminTeamsListResponse,
  AdminTeamsOwnersListResponse,
  AdminTeamsSettingsInfoResponse,
  AdminTeamsSettingsSetDefaultChannelsResponse,
  AdminTeamsSettingsSetDescriptionResponse,
  AdminTeamsSettingsSetDiscoverabilityResponse,
  AdminTeamsSettingsSetIconResponse,
  AdminTeamsSettingsSetNameResponse,
  AdminUsergroupsAddChannelsResponse,
  AdminUsergroupsAddTeamsResponse,
  AdminUsergroupsListChannelsResponse,
  AdminUsergroupsRemoveChannelsResponse,
  AdminUsersAssignResponse,
  AdminUsersInviteResponse,
  AdminUsersListResponse,
  AdminUsersRemoveResponse,
  AdminUsersSessionGetSettingsResponse,
  AdminUsersSessionSetSettingsResponse,
  AdminUsersSessionClearSettingsResponse,
  AdminUsersSessionInvalidateResponse,
  AdminUsersSessionListResponse,
  AdminUsersSessionResetResponse,
  AdminUsersSessionResetBulkResponse,
  AdminUsersSetAdminResponse,
  AdminUsersSetExpirationResponse,
  AdminUsersSetOwnerResponse,
  AdminUsersSetRegularResponse,
  AdminUsersUnsupportedVersionsExportResponse,
  ApiTestResponse,
  AppsConnectionsOpenResponse,
  AppsEventAuthorizationsListResponse,
  AppsUninstallResponse,
  AuthRevokeResponse,
  AuthTeamsListResponse,
  AuthTestResponse,
  BotsInfoResponse,
  CallsAddResponse,
  CallsEndResponse,
  CallsInfoResponse,
  CallsUpdateResponse,
  CallsParticipantsAddResponse,
  CallsParticipantsRemoveResponse,
  ChatDeleteResponse,
  ChatDeleteScheduledMessageResponse,
  ChatGetPermalinkResponse,
  ChatMeMessageResponse,
  ChatPostEphemeralResponse,
  ChatPostMessageResponse,
  ChatScheduleMessageResponse,
  ChatScheduledMessagesListResponse,
  ChatUnfurlResponse,
  ChatUpdateResponse,
  ConversationsAcceptSharedInviteResponse,
  ConversationsApproveSharedInviteResponse,
  ConversationsDeclineSharedInviteResponse,
  ConversationsInviteSharedResponse,
  ConversationsListConnectInvitesResponse,
  ConversationsArchiveResponse,
  ConversationsCloseResponse,
  ConversationsCreateResponse,
  ConversationsHistoryResponse,
  ConversationsInfoResponse,
  ConversationsInviteResponse,
  ConversationsJoinResponse,
  ConversationsKickResponse,
  ConversationsLeaveResponse,
  ConversationsListResponse,
  ConversationsMarkResponse,
  ConversationsMembersResponse,
  ConversationsOpenResponse,
  ConversationsRenameResponse,
  ConversationsRepliesResponse,
  ConversationsSetPurposeResponse,
  ConversationsSetTopicResponse,
  ConversationsUnarchiveResponse,
  DialogOpenResponse,
  DndEndDndResponse,
  DndEndSnoozeResponse,
  DndInfoResponse,
  DndSetSnoozeResponse,
  DndTeamInfoResponse,
  EmojiListResponse,
  FilesCommentsDeleteResponse,
  FilesCompleteUploadExternalResponse,
  FilesDeleteResponse,
  FilesGetUploadURLExternalResponse,
  FilesInfoResponse,
  FilesListResponse,
  FilesRemoteAddResponse,
  FilesRemoteInfoResponse,
  FilesRemoteListResponse,
  FilesRemoteRemoveResponse,
  FilesRemoteShareResponse,
  FilesRemoteUpdateResponse,
  FilesRevokePublicURLResponse,
  FilesSharedPublicURLResponse,
  FilesUploadResponse,
  MigrationExchangeResponse,
  OauthAccessResponse,
  OauthV2AccessResponse,
  OauthV2ExchangeResponse,
  OpenIDConnectTokenResponse,
  OpenIDConnectUserInfoResponse,
  PinsAddResponse,
  PinsListResponse,
  PinsRemoveResponse,
  ReactionsAddResponse,
  ReactionsGetResponse,
  ReactionsListResponse,
  ReactionsRemoveResponse,
  RemindersAddResponse,
  RemindersCompleteResponse,
  RemindersDeleteResponse,
  RemindersInfoResponse,
  RemindersListResponse,
  RtmConnectResponse,
  RtmStartResponse,
  SearchAllResponse,
  SearchFilesResponse,
  SearchMessagesResponse,
  StarsAddResponse,
  StarsListResponse,
  StarsRemoveResponse,
  TeamAccessLogsResponse,
  TeamBillableInfoResponse,
  TeamBillingInfoResponse,
  TeamInfoResponse,
  TeamIntegrationLogsResponse,
  TeamPreferencesListResponse,
  TeamProfileGetResponse,
  UsergroupsCreateResponse,
  UsergroupsDisableResponse,
  UsergroupsEnableResponse,
  UsergroupsListResponse,
  UsergroupsUpdateResponse,
  UsergroupsUsersListResponse,
  UsergroupsUsersUpdateResponse,
  UsersConversationsResponse,
  UsersDeletePhotoResponse,
  UsersGetPresenceResponse,
  UsersIdentityResponse,
  UsersInfoResponse,
  UsersListResponse,
  UsersLookupByEmailResponse,
  UsersProfileGetResponse,
  UsersProfileSetResponse,
  UsersSetPhotoResponse,
  UsersSetPresenceResponse,
  ViewsOpenResponse,
  ViewsPublishResponse,
  ViewsPushResponse,
  ViewsUpdateResponse,
  WorkflowsStepCompletedResponse,
  WorkflowsStepFailedResponse,
  WorkflowsUpdateStepResponse,
  AdminAppsRequestsCancelResponse,
  BookmarksAddResponse,
  BookmarksEditResponse,
  BookmarksListResponse,
  BookmarksRemoveResponse,
  AdminConversationsConvertToPublicResponse,
  AdminConversationsLookupResponse,
  AdminRolesAddAssignmentsResponse,
  AdminRolesListAssignmentsResponse,
  AdminRolesRemoveAssignmentsResponse,
  AdminAppsActivitiesListResponse,
  AdminFunctionsListResponse,
  AdminFunctionsPermissionsLookupResponse,
  AdminFunctionsPermissionsSetResponse,
  AdminWorkflowsSearchResponse,
  AdminWorkflowsUnpublishResponse,
  AdminWorkflowsCollaboratorsAddResponse,
  AdminWorkflowsCollaboratorsRemoveResponse,
  AdminWorkflowsPermissionsLookupResponse,
  AdminAppsConfigLookupResponse,
  AdminAppsConfigSetResponse,
} from './response';

// NOTE: could create a named type alias like data types like `SlackUserID: string`

/**
 * Binds a certain `method` and its arguments and result types to the `apiCall` method in `WebClient`.
 */
function bindApiCall<Arguments, Result extends WebAPICallResult>(
  self: Methods,
  method: string,
): Method<Arguments, Result> {
  // We have to 'assert' that the bound method does indeed return the more specific `Result` type instead of just
  // `WebAPICallResult`
  return self.apiCall.bind(self, method) as Method<Arguments, Result>;
}

function bindFilesUploadV2<Arguments, Result extends WebAPICallResult>(
  self: Methods,
): Method<Arguments, Result> {
  return self.filesUploadV2.bind(self) as unknown as Method<Arguments, Result>;
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

  public abstract apiCall(method: string, options?: Record<string, unknown>): Promise<WebAPICallResult>;
  public abstract filesUploadV2(options: Record<string, unknown>): Promise<WebAPICallResult>;

  public readonly admin = {
    analytics: {
      getFile: bindApiCall<AdminAnalyticsGetFileArguments, AdminAnalyticsGetFileResponse>(this, 'admin.analytics.getFile'),
    },
    apps: {
      approve: bindApiCall<AdminAppsApproveArguments, AdminAppsApproveResponse>(this, 'admin.apps.approve'),
      approved: {
        list: bindApiCall<AdminAppsApprovedListArguments, AdminAppsApprovedListResponse>(this, 'admin.apps.approved.list'),
      },
      clearResolution: bindApiCall<AdminAppsClearResolutionArguments, AdminAppsClearResolutionResponse>(this, 'admin.apps.clearResolution'),
      requests: {
        cancel: bindApiCall<AdminAppsRequestsCancelArguments, AdminAppsRequestsCancelResponse>(this, 'admin.apps.requests.cancel'),
        list: bindApiCall<AdminAppsRequestsListArguments, AdminAppsRequestsListResponse>(this, 'admin.apps.requests.list'),
      },
      restrict: bindApiCall<AdminAppsRestrictArguments, AdminAppsRestrictResponse>(this, 'admin.apps.restrict'),
      restricted: {
        list:
          bindApiCall<AdminAppsRestrictedListArguments, AdminAppsRestrictedListResponse>(this, 'admin.apps.restricted.list'),
      },
      uninstall: bindApiCall<AdminAppsUninstallArguments, AdminAppsUninstallResponse>(this, 'admin.apps.uninstall'),
      activities: {
        list: bindApiCall<AdminAppsActivitiesListArguments, AdminAppsActivitiesListResponse>(this, 'admin.apps.activities.list'),
      },
      config: {
        lookup: bindApiCall<AdminAppsConfigLookupArguments, AdminAppsConfigLookupResponse>(this, 'admin.apps.config.lookup'),
        set: bindApiCall<AdminAppsConfigSetArguments, AdminAppsConfigSetResponse>(this, 'admin.apps.config.set'),
      },
    },
    auth: {
      policy: {
        assignEntities: bindApiCall<AdminAuthPolicyAssignEntitiesArguments, AdminAuthPolicyAssignEntitiesResponse>(this, 'admin.auth.policy.assignEntities'),
        getEntities: bindApiCall<AdminAuthPolicyGetEntitiesArguments, AdminAuthPolicyGetEntitiesResponse>(this, 'admin.auth.policy.getEntities'),
        removeEntities: bindApiCall<AdminAuthPolicyRemoveEntitiesArguments, AdminAuthPolicyRemoveEntitiesResponse>(this, 'admin.auth.policy.removeEntities'),
      },
    },
    barriers: {
      create: bindApiCall<AdminBarriersCreateArguments, AdminBarriersCreateResponse>(this, 'admin.barriers.create'),
      delete: bindApiCall<AdminBarriersDeleteArguments, AdminBarriersDeleteResponse>(this, 'admin.barriers.delete'),
      list: bindApiCall<AdminBarriersListArguments, AdminBarriersListResponse>(this, 'admin.barriers.list'),
      update: bindApiCall<AdminBarriersUpdateArguments, AdminBarriersUpdateResponse>(this, 'admin.barriers.update'),
    },
    conversations: {
      archive: bindApiCall<AdminConversationsArchiveArguments, AdminConversationsArchiveResponse>(this, 'admin.conversations.archive'),
      bulkArchive: bindApiCall<AdminConversationsBulkArchiveArguments, AdminConversationsBulkArchiveResponse>(this, 'admin.conversations.bulkArchive'),
      bulkDelete: bindApiCall<AdminConversationsBulkDeleteArguments, AdminConversationsBulkDeleteResponse>(this, 'admin.conversations.bulkDelete'),
      bulkMove: bindApiCall<AdminConversationsBulkMoveArguments, AdminConversationsBulkMoveResponse>(this, 'admin.conversations.bulkMove'),
      convertToPrivate:
        bindApiCall<AdminConversationsConvertToPrivateArguments, AdminConversationsConvertToPrivateResponse>(
          this,
          'admin.conversations.convertToPrivate',
        ),
      convertToPublic:
        bindApiCall<AdminConversationsConvertToPublicArguments, AdminConversationsConvertToPublicResponse>(
          this,
          'admin.conversations.convertToPublic',
        ),
      create: bindApiCall<AdminConversationsCreateArguments, AdminConversationsCreateResponse>(this, 'admin.conversations.create'),
      delete: bindApiCall<AdminConversationsDeleteArguments, AdminConversationsDeleteResponse>(this, 'admin.conversations.delete'),
      disconnectShared:
        bindApiCall<AdminConversationsDisconnectSharedArguments, AdminConversationsDisconnectSharedResponse>(
          this,
          'admin.conversations.disconnectShared',
        ),
      ekm: {
        listOriginalConnectedChannelInfo:
          bindApiCall<AdminConversationsEKMListOriginalConnectedChannelInfoArguments,
          AdminConversationsEkmListOriginalConnectedChannelInfoResponse>(
            this,
            'admin.conversations.ekm.listOriginalConnectedChannelInfo',
          ),
      },
      getConversationPrefs:
        bindApiCall<AdminConversationsGetConversationPrefsArguments, AdminConversationsGetConversationPrefsResponse>(
          this,
          'admin.conversations.getConversationPrefs',
        ),
      getTeams: bindApiCall<AdminConversationsGetTeamsArguments, AdminConversationsGetTeamsResponse>(
        this,
        'admin.conversations.getTeams',
      ),
      invite: bindApiCall<AdminConversationsInviteArguments, AdminConversationsInviteResponse>(this, 'admin.conversations.invite'),
      rename: bindApiCall<AdminConversationsRenameArguments, AdminConversationsRenameResponse>(this, 'admin.conversations.rename'),
      restrictAccess: {
        addGroup: bindApiCall<AdminConversationsRestrictAccessAddGroupArguments,
        AdminConversationsRestrictAccessAddGroupResponse>(
          this,
          'admin.conversations.restrictAccess.addGroup',
        ),
        listGroups:
          bindApiCall<AdminConversationsRestrictAccessListGroupsArguments,
          AdminConversationsRestrictAccessListGroupsResponse>(
            this,
            'admin.conversations.restrictAccess.listGroups',
          ),
        removeGroup:
          bindApiCall<AdminConversationsRestrictAccessRemoveGroupArguments,
          AdminConversationsRestrictAccessRemoveGroupResponse>(
            this,
            'admin.conversations.restrictAccess.removeGroup',
          ),
      },
      getCustomRetention:
        bindApiCall<AdminConversationsGetCustomRetentionArguments, AdminConversationsGetCustomRetentionResponse>(
          this,
          'admin.conversations.getCustomRetention',
        ),
      setCustomRetention:
        bindApiCall<AdminConversationsSetCustomRetentionArguments, AdminConversationsSetCustomRetentionResponse>(
          this,
          'admin.conversations.setCustomRetention',
        ),
      removeCustomRetention:
        bindApiCall<AdminConversationsRemoveCustomRetentionArguments, AdminConversationsRemoveCustomRetentionResponse>(
          this,
          'admin.conversations.removeCustomRetention',
        ),
      lookup: bindApiCall<AdminConversationsLookupArguments, AdminConversationsLookupResponse>(this, 'admin.conversations.lookup'),
      search: bindApiCall<AdminConversationsSearchArguments, AdminConversationsSearchResponse>(this, 'admin.conversations.search'),
      setConversationPrefs:
        bindApiCall<AdminConversationsSetConversationPrefsArguments, AdminConversationsSetConversationPrefsResponse>(
          this,
          'admin.conversations.setConversationPrefs',
        ),
      setTeams: bindApiCall<AdminConversationsSetTeamsArguments, AdminConversationsSetTeamsResponse>(
        this,
        'admin.conversations.setTeams',
      ),
      unarchive: bindApiCall<AdminConversationsUnarchiveArguments, AdminConversationsUnarchiveResponse>(
        this,
        'admin.conversations.unarchive',
      ),
    },
    emoji: {
      add: bindApiCall<AdminEmojiAddArguments, AdminEmojiAddResponse>(this, 'admin.emoji.add'),
      addAlias: bindApiCall<AdminEmojiAddAliasArguments, AdminEmojiAddAliasResponse>(this, 'admin.emoji.addAlias'),
      list: bindApiCall<AdminEmojiListArguments, AdminEmojiListResponse>(this, 'admin.emoji.list'),
      remove: bindApiCall<AdminEmojiRemoveArguments, AdminEmojiRemoveResponse>(this, 'admin.emoji.remove'),
      rename: bindApiCall<AdminEmojiRenameArguments, AdminEmojiRenameResponse>(this, 'admin.emoji.rename'),
    },
    functions: {
      list: bindApiCall<AdminFunctionsListArguments, AdminFunctionsListResponse>(this, 'admin.functions.list'),
      permissions: {
        lookup: bindApiCall<AdminFunctionsPermissionsLookupArguments, AdminFunctionsPermissionsLookupResponse>(this, 'admin.functions.permissions.lookup'),
        set: bindApiCall<AdminFunctionsPermissionsSetArguments, AdminFunctionsPermissionsSetResponse>(this, 'admin.functions.permissions.set'),
      },
    },
    inviteRequests: {
      approve: bindApiCall<AdminInviteRequestsApproveArguments, AdminInviteRequestsApproveResponse>(
        this,
        'admin.inviteRequests.approve',
      ),
      approved: {
        list: bindApiCall<AdminInviteRequestsApprovedListArguments, AdminInviteRequestsApprovedListResponse>(
          this,
          'admin.inviteRequests.approved.list',
        ),
      },
      denied: {
        list: bindApiCall<AdminInviteRequestsDeniedListArguments, AdminInviteRequestsDeniedListResponse>(
          this,
          'admin.inviteRequests.denied.list',
        ),
      },
      deny: bindApiCall<AdminInviteRequestsDenyArguments, AdminInviteRequestsDenyResponse>(this, 'admin.inviteRequests.deny'),
      list: bindApiCall<AdminInviteRequestsListArguments, AdminInviteRequestsListResponse>(this, 'admin.inviteRequests.list'),
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
        info: bindApiCall<AdminTeamsSettingsInfoArguments, AdminTeamsSettingsInfoResponse>(this, 'admin.teams.settings.info'),
        setDefaultChannels:
          bindApiCall<AdminTeamsSettingsSetDefaultChannelsArguments, AdminTeamsSettingsSetDefaultChannelsResponse>(
            this,
            'admin.teams.settings.setDefaultChannels',
          ),
        setDescription:
          bindApiCall<AdminTeamsSettingsSetDescriptionArguments, AdminTeamsSettingsSetDescriptionResponse>(
            this,
            'admin.teams.settings.setDescription',
          ),
        setDiscoverability:
          bindApiCall<AdminTeamsSettingsSetDiscoverabilityArguments,
          AdminTeamsSettingsSetDiscoverabilityResponse>(
            this,
            'admin.teams.settings.setDiscoverability',
          ),
        setIcon: bindApiCall<AdminTeamsSettingsSetIconArguments, AdminTeamsSettingsSetIconResponse>(
          this,
          'admin.teams.settings.setIcon',
        ),
        setName: bindApiCall<AdminTeamsSettingsSetNameArguments, AdminTeamsSettingsSetNameResponse>(
          this,
          'admin.teams.settings.setName',
        ),
      },
    },
    roles: {
      addAssignments: bindApiCall<AdminRolesAddAssignmentsArguments, AdminRolesAddAssignmentsResponse>(this, 'admin.roles.addAssignments'),
      listAssignments: bindApiCall<AdminRolesListAssignmentsArguments, AdminRolesListAssignmentsResponse>(this, 'admin.roles.listAssignments'),
      removeAssignments: bindApiCall<AdminRolesRemoveAssignmentsArguments, AdminRolesRemoveAssignmentsResponse>(this, 'admin.roles.removeAssignments'),
    },
    usergroups: {
      addChannels: bindApiCall<AdminUsergroupsAddChannelsArguments, AdminUsergroupsAddChannelsResponse>(
        this,
        'admin.usergroups.addChannels',
      ),
      addTeams: bindApiCall<AdminUsergroupsAddTeamsArguments, AdminUsergroupsAddTeamsResponse>(
        this,
        'admin.usergroups.addTeams',
      ),
      listChannels: bindApiCall<AdminUsergroupsListChannelsArguments, AdminUsergroupsListChannelsResponse>(
        this,
        'admin.usergroups.listChannels',
      ),
      removeChannels: bindApiCall<AdminUsergroupsRemoveChannelsArguments, AdminUsergroupsRemoveChannelsResponse>(
        this,
        'admin.usergroups.removeChannels',
      ),
    },
    users: {
      assign: bindApiCall<AdminUsersAssignArguments, AdminUsersAssignResponse>(this, 'admin.users.assign'),
      invite: bindApiCall<AdminUsersInviteArguments, AdminUsersInviteResponse>(this, 'admin.users.invite'),
      list: bindApiCall<AdminUsersListArguments, AdminUsersListResponse>(this, 'admin.users.list'),
      remove: bindApiCall<AdminUsersRemoveArguments, AdminUsersRemoveResponse>(this, 'admin.users.remove'),
      session: {
        list: bindApiCall<AdminUsersSessionListArguments, AdminUsersSessionListResponse>(this, 'admin.users.session.list'),
        reset: bindApiCall<AdminUsersSessionResetArguments, AdminUsersSessionResetResponse>(this, 'admin.users.session.reset'),
        resetBulk: bindApiCall<AdminUsersSessionResetBulkArguments, AdminUsersSessionResetBulkResponse>(this, 'admin.users.session.resetBulk'),
        invalidate: bindApiCall<AdminUsersSessionInvalidateArguments, AdminUsersSessionInvalidateResponse>(
          this,
          'admin.users.session.invalidate',
        ),
        getSettings: bindApiCall<AdminUsersSessionGetSettingsArguments, AdminUsersSessionGetSettingsResponse>(
          this,
          'admin.users.session.getSettings',
        ),
        setSettings: bindApiCall<AdminUsersSessionSetSettingsArguments, AdminUsersSessionSetSettingsResponse>(
          this,
          'admin.users.session.setSettings',
        ),
        clearSettings: bindApiCall<AdminUsersSessionClearSettingsArguments, AdminUsersSessionClearSettingsResponse>(
          this,
          'admin.users.session.clearSettings',
        ),
      },
      unsupportedVersions: {
        export: bindApiCall<AdminUsersUnsupportedVersionsExportArguments, AdminUsersUnsupportedVersionsExportResponse>(
          this,
          'admin.users.unsupportedVersions.export',
        ),
      },
      setAdmin: bindApiCall<AdminUsersSetAdminArguments, AdminUsersSetAdminResponse>(this, 'admin.users.setAdmin'),
      setExpiration:
        bindApiCall<AdminUsersSetExpirationArguments, AdminUsersSetExpirationResponse>(
          this,
          'admin.users.setExpiration',
        ),
      setOwner: bindApiCall<AdminUsersSetOwnerArguments, AdminUsersSetOwnerResponse>(
        this,
        'admin.users.setOwner',
      ),
      setRegular: bindApiCall<AdminUsersSetRegularArguments, AdminUsersSetRegularResponse>(
        this,
        'admin.users.setRegular',
      ),
    },
    workflows: {
      search: bindApiCall<AdminWorkflowsSearchArguments, AdminWorkflowsSearchResponse>(this, 'admin.workflows.search'),
      unpublish: bindApiCall<AdminWorkflowsUnpublishArguments, AdminWorkflowsUnpublishResponse>(this, 'admin.workflows.unpublish'),
      collaborators: {
        add: bindApiCall<AdminWorkflowsCollaboratorsAddArguments, AdminWorkflowsCollaboratorsAddResponse>(this, 'admin.workflows.collaborators.add'),
        remove: bindApiCall<AdminWorkflowsCollaboratorsRemoveArguments, AdminWorkflowsCollaboratorsRemoveResponse>(this, 'admin.workflows.collaborators.remove'),
      },
      permissions: {
        lookup: bindApiCall<AdminWorkflowsPermissionsLookupArguments, AdminWorkflowsPermissionsLookupResponse>(this, 'admin.workflows.permissions.lookup'),
      },
    },
  };

  public readonly api = {
    test: bindApiCall<APITestArguments, ApiTestResponse>(this, 'api.test'),
  };

  public readonly apps = {
    connections: {
      open: bindApiCall<AppsConnectionsOpenArguments, AppsConnectionsOpenResponse>(this, 'apps.connections.open'),
    },
    event: {
      authorizations: {
        list: bindApiCall<AppsEventAuthorizationsListArguments, AppsEventAuthorizationsListResponse>(
          this,
          'apps.event.authorizations.list',
        ),
      },
    },
    uninstall: bindApiCall<AppsUninstallArguments, AppsUninstallResponse>(this, 'apps.uninstall'),
  };

  public readonly auth = {
    revoke: bindApiCall<AuthRevokeArguments, AuthRevokeResponse>(this, 'auth.revoke'),
    teams: {
      list: bindApiCall<AuthTeamsListArguments, AuthTeamsListResponse>(this, 'auth.teams.list'),
    },
    test: bindApiCall<AuthTestArguments, AuthTestResponse>(this, 'auth.test'),
  };

  public readonly bots = {
    info: bindApiCall<BotsInfoArguments, BotsInfoResponse>(this, 'bots.info'),
  };

  public readonly bookmarks = {
    add: bindApiCall<BookmarksAddArguments, BookmarksAddResponse>(this, 'bookmarks.add'),
    edit: bindApiCall<BookmarksEditArguments, BookmarksEditResponse>(this, 'bookmarks.edit'),
    list: bindApiCall<BookmarksListArguments, BookmarksListResponse>(this, 'bookmarks.list'),
    remove: bindApiCall<BookmarksRemoveArguments, BookmarksRemoveResponse>(this, 'bookmarks.remove'),
  };

  public readonly calls = {
    add: bindApiCall<CallsAddArguments, CallsAddResponse>(this, 'calls.add'),
    end: bindApiCall<CallsEndArguments, CallsEndResponse>(this, 'calls.end'),
    info: bindApiCall<CallsInfoArguments, CallsInfoResponse>(this, 'calls.info'),
    update: bindApiCall<CallsUpdateArguments, CallsUpdateResponse>(this, 'calls.update'),
    participants: {
      add: bindApiCall<CallsParticipantsAddArguments, CallsParticipantsAddResponse>(this, 'calls.participants.add'),
      remove: bindApiCall<CallsParticipantsRemoveArguments, CallsParticipantsRemoveResponse>(this, 'calls.participants.remove'),
    },
  };

  public readonly chat = {
    delete: bindApiCall<ChatDeleteArguments, ChatDeleteResponse>(this, 'chat.delete'),
    deleteScheduledMessage:
      bindApiCall<ChatDeleteScheduledMessageArguments, ChatDeleteScheduledMessageResponse>(this, 'chat.deleteScheduledMessage'),
    getPermalink: bindApiCall<ChatGetPermalinkArguments, ChatGetPermalinkResponse>(this, 'chat.getPermalink'),
    meMessage: bindApiCall<ChatMeMessageArguments, ChatMeMessageResponse>(this, 'chat.meMessage'),
    postEphemeral: bindApiCall<ChatPostEphemeralArguments, ChatPostEphemeralResponse>(this, 'chat.postEphemeral'),
    postMessage: bindApiCall<ChatPostMessageArguments, ChatPostMessageResponse>(this, 'chat.postMessage'),
    scheduleMessage: bindApiCall<ChatScheduleMessageArguments, ChatScheduleMessageResponse>(
      this,
      'chat.scheduleMessage',
    ),
    scheduledMessages: {
      list:
        bindApiCall<ChatScheduledMessagesListArguments, ChatScheduledMessagesListResponse>(
          this,
          'chat.scheduledMessages.list',
        ),
    },
    unfurl: bindApiCall<ChatUnfurlArguments, ChatUnfurlResponse>(this, 'chat.unfurl'),
    update: bindApiCall<ChatUpdateArguments, ChatUpdateResponse>(this, 'chat.update'),
  };

  public readonly conversations = {
    acceptSharedInvite: bindApiCall<ConversationsAcceptSharedInviteArguments, ConversationsAcceptSharedInviteResponse>(
      this,
      'conversations.acceptSharedInvite',
    ),
    approveSharedInvite:
      bindApiCall<ConversationsApproveSharedInviteArguments, ConversationsApproveSharedInviteResponse>(
        this,
        'conversations.approveSharedInvite',
      ),
    archive: bindApiCall<ConversationsArchiveArguments, ConversationsArchiveResponse>(this, 'conversations.archive'),
    close: bindApiCall<ConversationsCloseArguments, ConversationsCloseResponse>(this, 'conversations.close'),
    create: bindApiCall<ConversationsCreateArguments, ConversationsCreateResponse>(this, 'conversations.create'),
    declineSharedInvite:
      bindApiCall<ConversationsDeclineSharedInviteArguments, ConversationsDeclineSharedInviteResponse>(
        this,
        'conversations.declineSharedInvite',
      ),
    history: bindApiCall<ConversationsHistoryArguments, ConversationsHistoryResponse>(this, 'conversations.history'),
    info: bindApiCall<ConversationsInfoArguments, ConversationsInfoResponse>(this, 'conversations.info'),
    invite: bindApiCall<ConversationsInviteArguments, ConversationsInviteResponse>(this, 'conversations.invite'),
    inviteShared: bindApiCall<ConversationsInviteSharedArguments, ConversationsInviteSharedResponse>(
      this,
      'conversations.inviteShared',
    ),
    join: bindApiCall<ConversationsJoinArguments, ConversationsJoinResponse>(this, 'conversations.join'),
    kick: bindApiCall<ConversationsKickArguments, ConversationsKickResponse>(this, 'conversations.kick'),
    leave: bindApiCall<ConversationsLeaveArguments, ConversationsLeaveResponse>(this, 'conversations.leave'),
    list: bindApiCall<ConversationsListArguments, ConversationsListResponse>(this, 'conversations.list'),
    listConnectInvites:
      bindApiCall<ConversationsListConnectInvitesArguments, ConversationsListConnectInvitesResponse>(
        this,
        'conversations.listConnectInvites',
      ),
    mark: bindApiCall<ConversationsMarkArguments, ConversationsMarkResponse>(this, 'conversations.mark'),
    members: bindApiCall<ConversationsMembersArguments, ConversationsMembersResponse>(this, 'conversations.members'),
    open: bindApiCall<ConversationsOpenArguments, ConversationsOpenResponse>(this, 'conversations.open'),
    rename: bindApiCall<ConversationsRenameArguments, ConversationsRenameResponse>(this, 'conversations.rename'),
    replies: bindApiCall<ConversationsRepliesArguments, ConversationsRepliesResponse>(this, 'conversations.replies'),
    setPurpose:
      bindApiCall<ConversationsSetPurposeArguments, ConversationsSetPurposeResponse>(this, 'conversations.setPurpose'),
    setTopic: bindApiCall<ConversationsSetTopicArguments, ConversationsSetTopicResponse>(
      this,
      'conversations.setTopic',
    ),
    unarchive: bindApiCall<ConversationsUnarchiveArguments, ConversationsUnarchiveResponse>(
      this,
      'conversations.unarchive',
    ),
  };

  public readonly dialog = {
    open: bindApiCall<DialogOpenArguments, DialogOpenResponse>(this, 'dialog.open'),
  };

  public readonly dnd = {
    endDnd: bindApiCall<DndEndDndArguments, DndEndDndResponse>(this, 'dnd.endDnd'),
    endSnooze: bindApiCall<DndEndSnoozeArguments, DndEndSnoozeResponse>(this, 'dnd.endSnooze'),
    info: bindApiCall<DndInfoArguments, DndInfoResponse>(this, 'dnd.info'),
    setSnooze: bindApiCall<DndSetSnoozeArguments, DndSetSnoozeResponse>(this, 'dnd.setSnooze'),
    teamInfo: bindApiCall<DndTeamInfoArguments, DndTeamInfoResponse>(this, 'dnd.teamInfo'),
  };

  public readonly emoji = {
    list: bindApiCall<EmojiListArguments, EmojiListResponse>(this, 'emoji.list'),
  };

  public readonly files = {
    delete: bindApiCall<FilesDeleteArguments, FilesDeleteResponse>(this, 'files.delete'),
    info: bindApiCall<FilesInfoArguments, FilesInfoResponse>(this, 'files.info'),
    list: bindApiCall<FilesListArguments, FilesListResponse>(this, 'files.list'),
    revokePublicURL:
      bindApiCall<FilesRevokePublicURLArguments, FilesRevokePublicURLResponse>(this, 'files.revokePublicURL'),
    sharedPublicURL:
      bindApiCall<FilesSharedPublicURLArguments, FilesSharedPublicURLResponse>(this, 'files.sharedPublicURL'),
    upload: bindApiCall<FilesUploadArguments, FilesUploadResponse>(this, 'files.upload'),
    /**
     * Custom method to support files upload v2 way of uploading files to Slack
     * Supports a single file upload
     * Supply:
     * - (required) single file or content
     * - (optional) channel, alt_text, snippet_type,
     * Supports multiple file uploads
     * Supply:
     * - multiple upload_files
     * Will try to honor both single file or content data supplied as well
     * as multiple file uploads property.
    */
    uploadV2: bindFilesUploadV2<FilesUploadV2Arguments, WebAPICallResult>(this),
    getUploadURLExternal:
      bindApiCall<FilesGetUploadURLExternalArguments, FilesGetUploadURLExternalResponse>(this, 'files.getUploadURLExternal'),
    completeUploadExternal:
      bindApiCall<FilesCompleteUploadExternalArguments, FilesCompleteUploadExternalResponse>(this, 'files.completeUploadExternal'),
    comments: {
      delete: bindApiCall<FilesCommentsDeleteArguments, FilesCommentsDeleteResponse>(this, 'files.comments.delete'),
    },
    remote: {
      info: bindApiCall<FilesRemoteInfoArguments, FilesRemoteInfoResponse>(this, 'files.remote.info'),
      list: bindApiCall<FilesRemoteListArguments, FilesRemoteListResponse>(this, 'files.remote.list'),
      add: bindApiCall<FilesRemoteAddArguments, FilesRemoteAddResponse>(this, 'files.remote.add'),
      update: bindApiCall<FilesRemoteUpdateArguments, FilesRemoteUpdateResponse>(this, 'files.remote.update'),
      remove: bindApiCall<FilesRemoteRemoveArguments, FilesRemoteRemoveResponse>(this, 'files.remote.remove'),
      share: bindApiCall<FilesRemoteShareArguments, FilesRemoteShareResponse>(this, 'files.remote.share'),
    },
  };

  public readonly migration = {
    exchange: bindApiCall<MigrationExchangeArguments, MigrationExchangeResponse>(this, 'migration.exchange'),
  };

  public readonly oauth = {
    access: bindApiCall<OAuthAccessArguments, OauthAccessResponse>(this, 'oauth.access'),
    v2: {
      access: bindApiCall<OAuthV2AccessArguments, OauthV2AccessResponse>(this, 'oauth.v2.access'),
      exchange: bindApiCall<OAuthV2ExchangeArguments, OauthV2ExchangeResponse>(this, 'oauth.v2.exchange'),
    },
  };

  public readonly openid = {
    connect: {
      token: bindApiCall<OpenIDConnectTokenArguments, OpenIDConnectTokenResponse>(this, 'openid.connect.token'),
      userInfo: bindApiCall<OpenIDConnectUserInfoArguments, OpenIDConnectUserInfoResponse>(this, 'openid.connect.userInfo'),
    },
  };

  public readonly pins = {
    add: bindApiCall<PinsAddArguments, PinsAddResponse>(this, 'pins.add'),
    list: bindApiCall<PinsListArguments, PinsListResponse>(this, 'pins.list'),
    remove: bindApiCall<PinsRemoveArguments, PinsRemoveResponse>(this, 'pins.remove'),
  };

  public readonly reactions = {
    add: bindApiCall<ReactionsAddArguments, ReactionsAddResponse>(this, 'reactions.add'),
    get: bindApiCall<ReactionsGetArguments, ReactionsGetResponse>(this, 'reactions.get'),
    list: bindApiCall<ReactionsListArguments, ReactionsListResponse>(this, 'reactions.list'),
    remove: bindApiCall<ReactionsRemoveArguments, ReactionsRemoveResponse>(this, 'reactions.remove'),
  };

  public readonly reminders = {
    add: bindApiCall<RemindersAddArguments, RemindersAddResponse>(this, 'reminders.add'),
    complete: bindApiCall<RemindersCompleteArguments, RemindersCompleteResponse>(this, 'reminders.complete'),
    delete: bindApiCall<RemindersDeleteArguments, RemindersDeleteResponse>(this, 'reminders.delete'),
    info: bindApiCall<RemindersInfoArguments, RemindersInfoResponse>(this, 'reminders.info'),
    list: bindApiCall<RemindersListArguments, RemindersListResponse>(this, 'reminders.list'),
  };

  public readonly rtm = {
    connect: bindApiCall<RTMConnectArguments, RtmConnectResponse>(this, 'rtm.connect'),
    start: bindApiCall<RTMStartArguments, RtmStartResponse>(this, 'rtm.start'),
  };

  public readonly search = {
    all: bindApiCall<SearchAllArguments, SearchAllResponse>(this, 'search.all'),
    files: bindApiCall<SearchFilesArguments, SearchFilesResponse>(this, 'search.files'),
    messages: bindApiCall<SearchMessagesArguments, SearchMessagesResponse>(this, 'search.messages'),
  };

  public readonly stars = {
    add: bindApiCall<StarsAddArguments, StarsAddResponse>(this, 'stars.add'),
    list: bindApiCall<StarsListArguments, StarsListResponse>(this, 'stars.list'),
    remove: bindApiCall<StarsRemoveArguments, StarsRemoveResponse>(this, 'stars.remove'),
  };

  public readonly team = {
    accessLogs: bindApiCall<TeamAccessLogsArguments, TeamAccessLogsResponse>(this, 'team.accessLogs'),
    billableInfo: bindApiCall<TeamBillableInfoArguments, TeamBillableInfoResponse>(this, 'team.billableInfo'),
    billing: {
      info: bindApiCall<TeamBillingInfoArguments, TeamBillingInfoResponse>(this, 'team.billing.info'),
    },
    info: bindApiCall<TeamInfoArguments, TeamInfoResponse>(this, 'team.info'),
    integrationLogs:
      bindApiCall<TeamIntegrationLogsArguments, TeamIntegrationLogsResponse>(this, 'team.integrationLogs'),
    preferences: {
      list: bindApiCall<TeamPreferencesListArguments, TeamPreferencesListResponse>(this, 'team.preferences.list'),
    },
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
      list: bindApiCall<UsergroupsUsersListArguments, UsergroupsUsersListResponse>(
        this,
        'usergroups.users.list',
      ),
      update: bindApiCall<UsergroupsUsersUpdateArguments, UsergroupsUsersUpdateResponse>(
        this,
        'usergroups.users.update',
      ),
    },
  };

  public readonly users = {
    conversations: bindApiCall<UsersConversationsArguments, UsersConversationsResponse>(this, 'users.conversations'),
    deletePhoto: bindApiCall<UsersDeletePhotoArguments, UsersDeletePhotoResponse>(this, 'users.deletePhoto'),
    getPresence: bindApiCall<UsersGetPresenceArguments, UsersGetPresenceResponse>(this, 'users.getPresence'),
    identity: bindApiCall<UsersIdentityArguments, UsersIdentityResponse>(this, 'users.identity'),
    info: bindApiCall<UsersInfoArguments, UsersInfoResponse>(this, 'users.info'),
    list: bindApiCall<UsersListArguments, UsersListResponse>(this, 'users.list'),
    lookupByEmail: bindApiCall<UsersLookupByEmailArguments, UsersLookupByEmailResponse>(this, 'users.lookupByEmail'),
    setPhoto: bindApiCall<UsersSetPhotoArguments, UsersSetPhotoResponse>(this, 'users.setPhoto'),
    setPresence: bindApiCall<UsersSetPresenceArguments, UsersSetPresenceResponse>(this, 'users.setPresence'),
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

  public readonly workflows = {
    stepCompleted: bindApiCall<WorkflowsStepCompletedArguments, WorkflowsStepCompletedResponse>(
      this,
      'workflows.stepCompleted',
    ),
    stepFailed: bindApiCall<WorkflowsStepFailedArguments, WorkflowsStepFailedResponse>(this, 'workflows.stepFailed'),
    updateStep: bindApiCall<WorkflowsUpdateStepArguments, WorkflowsUpdateStepResponse>(this, 'workflows.updateStep'),
  };
}

/**
 * Generic method definition
 */
export default interface Method<
  MethodArguments,
  MethodResult extends WebAPICallResult = WebAPICallResult,
> {
  (options: MethodArguments): Promise<MethodResult>;
}

/*
 * Reusable mixins or extensions that some MethodArguments types can extend from
 */
export interface TokenOverridable {
  token?: string;
}

export interface LocaleAware {
  include_locale?: boolean;
}

interface OptionalTeamAssignable {
  team_id?: string; // typically models the "team_id is required if org token is used" constraint
}

export interface Searchable extends OptionalTeamAssignable {
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
// TODO: breaking changes - potential type improvements:
// - date is required _except_ if metadata_only=true
// - metadata_only=true only works with type=public_channel
// https://api.slack.com/methods/admin.analytics.getFile
export interface AdminAnalyticsGetFileArguments extends TokenOverridable {
  type: 'public_channel' | 'member';
  date?: string;
  metadata_only?: boolean;
}
// TODO: breaking changes - potential type improvements:
// - exactly one of `team_id` or `enterprise_id` is required - but not both
// - either `app_id` or `request_id` is required
// https://api.slack.com/methods/admin.apps.approve
export interface AdminAppsApproveArguments extends TokenOverridable {
  app_id?: string;
  enterprise_id?: string;
  request_id?: string;
  team_id?: string;
}
// TODO: breaking changes - potential type improvements:
// - cannot provide both `team_id` or `enterprise_id` (but can provide neither, will infer from token)
// https://api.slack.com/methods/admin.apps.approved.list
export interface AdminAppsApprovedListArguments extends TokenOverridable, CursorPaginationEnabled {
  team_id?: string;
  enterprise_id?: string;
  certified?: boolean;
}
// TODO: breaking changes - potential type improvements:
// - exactly one of `team_id` or `enterprise_id` is required - but not both
// https://api.slack.com/methods/admin.apps.clearResolution
export interface AdminAppsClearResolutionArguments {
  app_id: string;
  enterprise_id?: string;
  team_id?: string;
}
cursorPaginationEnabledMethods.add('admin.apps.approved.list');
// https://api.slack.com/methods/admin.apps.requests.cancel
export interface AdminAppsRequestsCancelArguments extends TokenOverridable {
  request_id: string;
  enterprise_id?: string;
  team_id?: string;
}
// https://api.slack.com/methods/admin.apps.requests.list
export interface AdminAppsRequestsListArguments extends TokenOverridable, CursorPaginationEnabled {
  certified?: boolean;
  enterprise_id?: string;
  team_id?: string; // required if your enterprise grid contains more than one workspace
}
cursorPaginationEnabledMethods.add('admin.apps.requests.list');
// TODO: breaking changes - potential type improvements:
// - exactly one of `team_id` or `enterprise_id` is required - but not both
// - either `app_id` or `request_id` is required
// https://api.slack.com/methods/admin.apps.restrict
export interface AdminAppsRestrictArguments extends TokenOverridable {
  app_id?: string;
  request_id?: string;
  team_id?: string;
  enterprise_id?: string;
}
// TODO: breaking changes - potential type improvements:
// - cannot provide both `team_id` or `enterprise_id` (but can provide neither, will infer from token)
// https://api.slack.com/methods/admin.apps.restricted.list
export interface AdminAppsRestrictedListArguments extends TokenOverridable, CursorPaginationEnabled {
  certified?: boolean;
  team_id?: string;
  enterprise_id?: string;
}
cursorPaginationEnabledMethods.add('admin.apps.restricted.list');

// TODO: breaking changes - potential type improvements:
// - exactly one of `team_id` or `enterprise_id` is required - but not both
// https://api.slack.com/methods/admin.apps.uninstall
export interface AdminAppsUninstallArguments {
  app_id: string;
  enterprise_id?: string;
  team_ids?: string[]; // TODO: breaking change, enforce at least one array item?
}
// https://api.slack.com/methods/admin.apps.activities.list
export interface AdminAppsActivitiesListArguments extends TokenOverridable, CursorPaginationEnabled {
  app_id?: string;
  component_id?: string;
  component_type?: 'events_api' | 'workflows' | 'functions' | 'tables';
  log_event_type?: string;
  max_date_created?: number;
  min_date_created?: number;
  min_log_level?: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
  sort_direction?: string; // TODO: change to 'asc' | 'desc'?
  source?: 'slack' | 'developer';
  team_id?: string;
  trace_id?: string;
}
cursorPaginationEnabledMethods.add('admin.apps.activities.list');
// TODO: does not get used, should add method implementation, see https://github.com/slackapi/node-slack-sdk/issues/1675
export interface AdminAppsConfigLookupArguments extends TokenOverridable {
  app_ids: string[];
}
// TODO: does not get used, should add method implementation, see https://github.com/slackapi/node-slack-sdk/issues/1675
export interface AdminAppsConfigSetArguments extends TokenOverridable {
  app_id: string;
  domain_restrictions?: {
    urls?: string[]; // TODO: breaking change, enforce at least one array item?
    emails?: string[]; // TODO: breaking change, enforce at least one array item?
  };
  workflow_auth_strategy?: 'builder_choice' | 'end_user_strategy';
}
// https://api.slack.com/methods/admin.auth.policy.assignEntities
export interface AdminAuthPolicyAssignEntitiesArguments extends TokenOverridable {
  entity_ids: string[]; // TODO: breaking change, enforce at least one array item?
  entity_type: 'USER';
  policy_name: 'email_password';
}
// https://api.slack.com/methods/admin.auth.policy.getEntities
export interface AdminAuthPolicyGetEntitiesArguments extends TokenOverridable,
  CursorPaginationEnabled {
  policy_name: 'email_password';
  entity_type?: 'USER';
}
cursorPaginationEnabledMethods.add('admin.auth.policy.getEntities');
// https://api.slack.com/methods/admin.auth.policy.removeEntities
export interface AdminAuthPolicyRemoveEntitiesArguments extends TokenOverridable {
  entity_ids: string[]; // TODO: breaking change, enforce at least one array item?
  entity_type: 'USER';
  policy_name: 'email_password';
}
// https://api.slack.com/methods/admin.barriers.create
export interface AdminBarriersCreateArguments extends TokenOverridable {
  barriered_from_usergroup_ids: string[];
  primary_usergroup_id: string;
  restricted_subjects: string[]; // TODO: this should always be ['im','mpim','call'] according to the docs
}
// https://api.slack.com/methods/admin.barriers.delete
export interface AdminBarriersDeleteArguments extends TokenOverridable {
  barrier_id: string;
}
// https://api.slack.com/methods/admin.barriers.list
export interface AdminBarriersListArguments extends TokenOverridable, CursorPaginationEnabled { }
cursorPaginationEnabledMethods.add('admin.barriers.list');

// https://api.slack.com/methods/admin.barriers.update
export interface AdminBarriersUpdateArguments extends TokenOverridable {
  barrier_id: string;
  barriered_from_usergroup_ids: string[];
  primary_usergroup_id: string;
  restricted_subjects: string[]; // TODO: this should always be ['im','mpim','call'] according to the docs
}

// https://api.slack.com/methods/admin.conversations.archive
export interface AdminConversationsArchiveArguments extends TokenOverridable {
  channel_id: string;
}
// https://api.slack.com/methods/admin.conversations.bulkArchive
export interface AdminConversationsBulkArchiveArguments extends TokenOverridable {
  channel_ids: string[]; // TODO: breaking change, enforce at least one array item?
}
// https://api.slack.com/methods/admin.conversations.bulkDelete
export interface AdminConversationsBulkDeleteArguments extends TokenOverridable {
  channel_ids: string[]; // TODO: breaking change, enforce at least one array item?
}
// https://api.slack.com/methods/admin.conversations.bulkMove
export interface AdminConversationsBulkMoveArguments extends TokenOverridable {
  channel_ids: string[]; // TODO: breaking change, enforce at least one array item?
  target_team_id: string;
}
// https://api.slack.com/methods/admin.conversations.convertToPrivate
export interface AdminConversationsConvertToPrivateArguments extends TokenOverridable {
  channel_id: string;
  name?: string;
}
// https://api.slack.com/methods/admin.conversations.convertToPublic
export interface AdminConversationsConvertToPublicArguments extends TokenOverridable {
  channel_id: string;
}
// TODO: breaking change; if org_wide=false then team_id is required.
// https://api.slack.com/methods/admin.conversations.create
export interface AdminConversationsCreateArguments extends TokenOverridable {
  is_private: boolean;
  name: string;
  description?: string;
  org_wide?: boolean;
  team_id?: string;
}
// https://api.slack.com/methods/admin.conversations.delete
export interface AdminConversationsDeleteArguments extends TokenOverridable {
  channel_id: string;
}
// https://api.slack.com/methods/admin.conversations.disconnectShared
export interface AdminConversationsDisconnectSharedArguments extends TokenOverridable {
  channel_id: string;
  leaving_team_ids?: string[];
}
// https://api.slack.com/methods/admin.conversations.lookup
export interface AdminConversationsLookupArguments
  extends TokenOverridable, CursorPaginationEnabled {
  last_message_activity_before: number;
  team_ids: string[];
  max_member_count?: number;
}
cursorPaginationEnabledMethods.add('admin.conversations.lookup');
// https://api.slack.com/methods/admin.conversations.ekm.listOriginalConnectedChannelInfo
export interface AdminConversationsEKMListOriginalConnectedChannelInfoArguments
  extends TokenOverridable, CursorPaginationEnabled {
  channel_ids?: string[];
  team_ids?: string[];
}
cursorPaginationEnabledMethods.add('admin.conversations.ekm.listOriginalConnectedChannelInfo');
// https://api.slack.com/methods/admin.conversations.getConversationPrefs
export interface AdminConversationsGetConversationPrefsArguments extends TokenOverridable {
  channel_id: string;
}
// https://api.slack.com/methods/admin.conversations.getTeams
export interface AdminConversationsGetTeamsArguments
  extends TokenOverridable, CursorPaginationEnabled {
  channel_id: string;
}
cursorPaginationEnabledMethods.add('admin.conversations.getTeams');
// https://api.slack.com/methods/admin.conversations.invite
export interface AdminConversationsInviteArguments extends TokenOverridable {
  channel_id: string;
  user_ids: string[];
}
// https://api.slack.com/methods/admin.conversations.rename
export interface AdminConversationsRenameArguments extends TokenOverridable {
  channel_id: string;
  name: string;
}
// https://api.slack.com/methods/admin.conversations.restrictAccess.addGroup
export interface AdminConversationsRestrictAccessAddGroupArguments extends TokenOverridable {
  channel_id: string;
  group_id: string;
  team_id?: string;
}
// https://api.slack.com/methods/admin.conversations.restrictAccess.listGroups
export interface AdminConversationsRestrictAccessListGroupsArguments extends TokenOverridable {
  channel_id: string;
  team_id?: string;
}
// https://api.slack.com/methods/admin.conversations.restrictAccess.removeGroup
export interface AdminConversationsRestrictAccessRemoveGroupArguments extends TokenOverridable {
  channel_id: string;
  group_id: string;
  team_id?: string;
}
// https://api.slack.com/methods/admin.conversations.getCustomRetention
export interface AdminConversationsGetCustomRetentionArguments extends TokenOverridable {
  channel_id: string;
}
// https://api.slack.com/methods/admin.conversations.setCustomRetention
export interface AdminConversationsSetCustomRetentionArguments extends TokenOverridable {
  channel_id: string;
  duration_days: number;
}
// https://api.slack.com/methods/admin.conversations.removeCustomRetention
export interface AdminConversationsRemoveCustomRetentionArguments extends TokenOverridable {
  channel_id: string;
}
// https://api.slack.com/methods/admin.conversations.search
export interface AdminConversationsSearchArguments
  extends TokenOverridable, CursorPaginationEnabled {
  query?: string;
  search_channel_types?: string[]; // TODO: breaking change: turn into an array of string literals? See all options here: https://api.slack.com/methods/admin.conversations.search#types
  sort?: 'relevant' | 'name' | 'member_count' | 'created';
  sort_dir?: 'asc' | 'desc';
  team_ids?: string[];
  connected_team_ids?: string[];
  total_count_only?: boolean;
}
cursorPaginationEnabledMethods.add('admin.conversations.search');
// https://api.slack.com/methods/admin.conversations.setConversationPrefs
export interface AdminConversationsSetConversationPrefsArguments extends TokenOverridable {
  channel_id: string;
  prefs: Record<string, unknown>; // TODO: should this be Record<string, string>? See https://api.slack.com/methods/admin.conversations.setConversationPrefs#markdown
}
// https://api.slack.com/methods/admin.conversations.setTeams
export interface AdminConversationsSetTeamsArguments extends TokenOverridable {
  channel_id: string;
  team_id?: string;
  target_team_ids?: string[];
  org_channel?: boolean;
}
// https://api.slack.com/methods/admin.conversations.unarchive
export interface AdminConversationsUnarchiveArguments extends TokenOverridable {
  channel_id: string;
}
// https://api.slack.com/methods/admin.emoji.add
export interface AdminEmojiAddArguments extends TokenOverridable {
  name: string;
  url: string;
}
// https://api.slack.com/methods/admin.emoji.addAlias
export interface AdminEmojiAddAliasArguments extends TokenOverridable {
  name: string;
  alias_for: string;
}
// https://api.slack.com/methods/admin.emoji.list
export interface AdminEmojiListArguments extends TokenOverridable, CursorPaginationEnabled { }
cursorPaginationEnabledMethods.add('admin.emoji.list');
// https://api.slack.com/methods/admin.emoji.remove
export interface AdminEmojiRemoveArguments extends TokenOverridable {
  name: string;
}
// https://api.slack.com/methods/admin.emoji.rename
export interface AdminEmojiRenameArguments extends TokenOverridable {
  name: string;
  new_name: string;
}
// https://api.slack.com/methods/admin.functions.list
export interface AdminFunctionsListArguments extends TokenOverridable, CursorPaginationEnabled {
  app_ids: string[];
  team_id?: string;
}
// https://api.slack.com/methods/admin.functions.permissions.lookup
export interface AdminFunctionsPermissionsLookupArguments
  extends TokenOverridable {
  function_ids: string[];
}
// https://api.slack.com/methods/admin.functions.permissions.set
export interface AdminFunctionsPermissionsSetArguments extends TokenOverridable {
  function_id: string;
  visibility: string;
  user_ids?: string[];
}
// https://api.slack.com/methods/admin.inviteRequests.approve
export interface AdminInviteRequestsApproveArguments
  extends TokenOverridable {
  invite_request_id: string;
  team_id: string;
}
// https://api.slack.com/methods/admin.inviteRequests.approved.list
export interface AdminInviteRequestsApprovedListArguments
  extends TokenOverridable, CursorPaginationEnabled {
  team_id: string;
}
cursorPaginationEnabledMethods.add('admin.inviteRequests.approved.list');
// https://api.slack.com/methods/admin.inviteRequests.deny
export interface AdminInviteRequestsDenyArguments
  extends TokenOverridable {
  invite_request_id: string;
  team_id: string;
}
// https://api.slack.com/methods/admin.inviteRequests.denied.list
export interface AdminInviteRequestsDeniedListArguments
  extends TokenOverridable, CursorPaginationEnabled {
  team_id: string;
}
cursorPaginationEnabledMethods.add('admin.inviteRequests.denied.list');
// https://api.slack.com/methods/admin.inviteRequests.list
export interface AdminInviteRequestsListArguments
  extends TokenOverridable, CursorPaginationEnabled {
  team_id: string;
}
cursorPaginationEnabledMethods.add('admin.inviteRequests.list');
// https://api.slack.com/methods/admin.roles.addAssignments
export interface AdminRolesAddAssignmentsArguments
  extends TokenOverridable {
  role_id: string;
  entity_ids: string[];
  user_ids: string[];
}
// https://api.slack.com/methods/admin.roles.listAssignments
export interface AdminRolesListAssignmentsArguments
  extends TokenOverridable, CursorPaginationEnabled {
  entity_ids?: string[];
  role_ids?: string[];
  sort_dir?: string; // TODO: breaking change - turn to `asc` | `desc`? tho docs say this should be capital letters...
}
cursorPaginationEnabledMethods.add('admin.roles.listAssignments');
// https://api.slack.com/methods/admin.roles.removeAssignments
export interface AdminRolesRemoveAssignmentsArguments
  extends TokenOverridable {
  role_id: string;
  entity_ids: string[];
  user_ids: string[];
}
cursorPaginationEnabledMethods.add('admin.inviteRequests.list');
// https://api.slack.com/methods/admin.teams.admins.list
export interface AdminTeamsAdminsListArguments extends TokenOverridable, CursorPaginationEnabled {
  team_id: string;
}
cursorPaginationEnabledMethods.add('admin.teams.admins.list');
type TeamDiscoverability = 'open' | 'closed' | 'invite_only' | 'unlisted';
// https://api.slack.com/methods/admin.teams.create
export interface AdminTeamsCreateArguments extends TokenOverridable {
  team_domain: string;
  team_name: string;
  team_description?: string;
  team_discoverability?: TeamDiscoverability;
}
// https://api.slack.com/methods/admin.teams.list
export interface AdminTeamsListArguments extends TokenOverridable, CursorPaginationEnabled { }
cursorPaginationEnabledMethods.add('admin.teams.list');
// https://api.slack.com/methods/admin.teams.owners.list
export interface AdminTeamsOwnersListArguments extends TokenOverridable, CursorPaginationEnabled {
  team_id: string;
}
cursorPaginationEnabledMethods.add('admin.teams.owners.list');
// https://api.slack.com/methods/admin.teams.settings.info
export interface AdminTeamsSettingsInfoArguments extends TokenOverridable {
  team_id: string;
}
// https://api.slack.com/methods/admin.teams.settings.setDefaultChannels
export interface AdminTeamsSettingsSetDefaultChannelsArguments extends TokenOverridable {
  team_id: string;
  channel_ids: string[];
}
// https://api.slack.com/methods/admin.teams.settings.setDescription
export interface AdminTeamsSettingsSetDescriptionArguments extends TokenOverridable {
  team_id: string;
  description: string;
}
// https://api.slack.com/methods/admin.teams.settings.setDiscoverability
export interface AdminTeamsSettingsSetDiscoverabilityArguments extends TokenOverridable {
  team_id: string;
  discoverability: TeamDiscoverability;
}
// https://api.slack.com/methods/admin.teams.settings.setIcon
export interface AdminTeamsSettingsSetIconArguments extends TokenOverridable {
  team_id: string;
  image_url: string;
}
// https://api.slack.com/methods/admin.teams.settings.setName
export interface AdminTeamsSettingsSetNameArguments extends TokenOverridable {
  team_id: string;
  name: string;
}
// https://api.slack.com/methods/admin.usergroups.addChannels
export interface AdminUsergroupsAddChannelsArguments extends TokenOverridable {
  usergroup_id: string;
  team_id?: string;
  channel_ids: string | string[];
}
// https://api.slack.com/methods/admin.usergroups.addTeams
export interface AdminUsergroupsAddTeamsArguments extends TokenOverridable {
  usergroup_id: string;
  team_ids: string | string[];
  auto_provision?: boolean;
}
// https://api.slack.com/methods/admin.usergroups.listChannels
export interface AdminUsergroupsListChannelsArguments extends TokenOverridable {
  usergroup_id: string;
  include_num_members?: boolean;
  team_id?: string;
}
// https://api.slack.com/methods/admin.usergroups.removeChannels
export interface AdminUsergroupsRemoveChannelsArguments extends TokenOverridable {
  usergroup_id: string;
  channel_ids: string | string[];
}
// https://api.slack.com/methods/admin.users.assign
export interface AdminUsersAssignArguments extends TokenOverridable {
  team_id: string;
  user_id: string;
  channel_ids?: string | string[];
  is_restricted?: boolean;
  is_ultra_restricted?: boolean;
}
// https://api.slack.com/methods/admin.users.invite
export interface AdminUsersInviteArguments extends TokenOverridable {
  channel_ids: string | string[];
  email: string;
  team_id: string;
  custom_message?: string;
  email_password_policy_enabled?: boolean;
  guest_expiration_ts?: string;
  is_restricted?: boolean;
  is_ultra_restricted?: boolean;
  real_name?: string;
  resend?: boolean;
}
// https://api.slack.com/methods/admin.users.list
export interface AdminUsersListArguments extends TokenOverridable, CursorPaginationEnabled {
  team_id?: string; // Only required if org-level token is used
}
cursorPaginationEnabledMethods.add('admin.users.list');
// https://api.slack.com/methods/admin.users.remove
export interface AdminUsersRemoveArguments extends TokenOverridable {
  team_id: string;
  user_id: string;
}
// https://api.slack.com/methods/admin.users.setAdmin
export interface AdminUsersSetAdminArguments extends TokenOverridable {
  team_id: string;
  user_id: string;
}
// https://api.slack.com/methods/admin.users.setExpiration
export interface AdminUsersSetExpirationArguments extends TokenOverridable {
  team_id?: string;
  user_id: string;
  expiration_ts: number;
}
// https://api.slack.com/methods/admin.users.setOwner
export interface AdminUsersSetOwnerArguments extends TokenOverridable {
  team_id: string;
  user_id: string;
}
// https://api.slack.com/methods/admin.users.setRegular
export interface AdminUsersSetRegularArguments extends TokenOverridable {
  team_id: string;
  user_id: string;
}
cursorPaginationEnabledMethods.add('admin.users.session.list');
// TODO: breaking change: if user_id is provided, team_id must be provided, too.
// https://api.slack.com/methods/admin.users.session.list
export interface AdminUsersSessionListArguments extends TokenOverridable, CursorPaginationEnabled {
  user_id?: string;
  team_id?: string;
}
// https://api.slack.com/methods/admin.users.session.reset
export interface AdminUsersSessionResetArguments extends TokenOverridable {
  user_id: string;
  mobile_only?: boolean;
  web_only?: boolean;
}
// https://api.slack.com/methods/admin.users.session.resetBulk
export interface AdminUsersSessionResetBulkArguments extends TokenOverridable {
  user_ids: string[];
  mobile_only?: boolean;
  web_only?: boolean;
}
// https://api.slack.com/methods/admin.users.session.invalidate
export interface AdminUsersSessionInvalidateArguments extends TokenOverridable {
  session_id: string;
  team_id: string;
}
// https://api.slack.com/methods/admin.users.session.getSettings
export interface AdminUsersSessionGetSettingsArguments extends TokenOverridable {
  user_ids: string[];
}
// https://api.slack.com/methods/admin.users.session.setSettings
export interface AdminUsersSessionSetSettingsArguments extends TokenOverridable {
  user_ids: string[];
  desktop_app_browser_quit?: boolean;
  duration?: number;
}
// https://api.slack.com/methods/admin.users.session.clearSettings
export interface AdminUsersSessionClearSettingsArguments extends TokenOverridable {
  user_ids: string[];
}
// https://api.slack.com/methods/admin.users.unsupportedVersions.export
export interface AdminUsersUnsupportedVersionsExportArguments extends TokenOverridable {
  date_end_of_support?: number;
  date_sessions_started?: number;
}
// https://api.slack.com/methods/admin.workflows.collaborators.add
export interface AdminWorkflowsCollaboratorsAddArguments
  extends TokenOverridable {
  collaborator_ids: string[];
  workflow_ids: string[];
}
// https://api.slack.com/methods/admin.workflows.collaborators.remove
export interface AdminWorkflowsCollaboratorsRemoveArguments
  extends TokenOverridable {
  collaborator_ids: string[];
  workflow_ids: string[];
}
// https://api.slack.com/methods/admin.workflows.permissions.lookup
export interface AdminWorkflowsPermissionsLookupArguments
  extends TokenOverridable {
  workflow_ids: string[];
  max_workflow_triggers?: number;
}
// https://api.slack.com/methods/admin.workflows.search
export interface AdminWorkflowsSearchArguments extends TokenOverridable, CursorPaginationEnabled {
  app_id?: string;
  collaborator_ids?: string[];
  no_collaborators?: boolean;
  num_trigger_ids?: number;
  query?: string;
  sort?: string;
  sort_dir?: 'asc' | 'desc';
  source?: 'code' | 'workflow_builder';
}
cursorPaginationEnabledMethods.add('admin.worfklows.search');
// https://api.slack.com/methods/admin.workflows.unpublish
export interface AdminWorkflowsUnpublishArguments extends TokenOverridable {
  workflow_ids: string[];
}
/*
 * `api.*`
 */
// https://api.slack.com/methods/api.test
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface APITestArguments { }

/*
 * `apps.*`
 */
// https://api.slack.com/methods/apps.connections.open
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppsConnectionsOpenArguments { }
// https://api.slack.com/methods/apps.event.authorizations.list
export interface AppsEventAuthorizationsListArguments
  extends TokenOverridable, CursorPaginationEnabled {
  event_context: string;
}
cursorPaginationEnabledMethods.add('apps.event.authorizations.list');
// https://api.slack.com/methods/apps.uninstall
export interface AppsUninstallArguments {
  client_id: string;
  client_secret: string;
}

/*
 * `auth.*`
 */
// https://api.slack.com/methods/auth.revoke
export interface AuthRevokeArguments extends TokenOverridable {
  test?: boolean;
}
// https://api.slack.com/methods/auth.teams.list
export interface AuthTeamsListArguments extends TokenOverridable, CursorPaginationEnabled {
  include_icon?: boolean;
}
// https://api.slack.com/methods/auth.test
cursorPaginationEnabledMethods.add('auth.teams.list');
export interface AuthTestArguments extends TokenOverridable { }

/*
 * `bots.*`
 */
// https://api.slack.com/methods/bots.info
export interface BotsInfoArguments extends TokenOverridable, OptionalTeamAssignable {
  bot?: string;
}

/*
 * `bookmarks.*`
 */
// https://api.slack.com/methods/bookmarks.add
export interface BookmarksAddArguments extends TokenOverridable {
  channel_id: string;
  title: string;
  type: 'link';
  link: string; // TODO: Today, `link` is a required field because we only support type:link.
  // As more bookmarking options get added in the future, this will change.
  emoji?: string;
  entity_id?: string;
  parent_id?: string;
}
// https://api.slack.com/methods/bookmarks.edit
export interface BookmarksEditArguments extends TokenOverridable {
  bookmark_id: string;
  channel_id: string;
  emoji?: string;
  link?: string;
  title?: string;
}
// https://api.slack.com/methods/bookmarks.list
export interface BookmarksListArguments extends TokenOverridable {
  channel_id: string;
}
// https://api.slack.com/methods/bookmarks.remove
export interface BookmarksRemoveArguments extends TokenOverridable {
  bookmark_id: string;
  channel_id: string;
}

/*
* `calls.*`
*/
// https://api.slack.com/methods/calls.add
export interface CallsAddArguments extends TokenOverridable {
  external_unique_id: string;
  join_url: string;
  created_by?: string; // TODO: optional only if a user token is used, required otherwise
  date_start?: number;
  desktop_app_join_url?: string;
  external_display_id?: string;
  title?: string;
  users?: CallUser[];
}
// https://api.slack.com/methods/calls.end
export interface CallsEndArguments extends TokenOverridable {
  id: string;
  duration?: number;
}
// https://api.slack.com/methods/calls.info
export interface CallsInfoArguments extends TokenOverridable {
  id: string;
}
// https://api.slack.com/methods/calls.update
export interface CallsUpdateArguments extends TokenOverridable {
  id: string;
  join_url?: string;
  desktop_app_join_url?: string;
  title?: string;
}
// https://api.slack.com/methods/calls.participants.add
export interface CallsParticipantsAddArguments extends TokenOverridable {
  id: string;
  users: CallUser[];
}
// https://api.slack.com/methods/calls.participants.remove
export interface CallsParticipantsRemoveArguments extends TokenOverridable {
  id: string;
  users: CallUser[];
}

/*
 * `chat.*`
 */
// https://api.slack.com/methods/chat.delete
export interface ChatDeleteArguments extends TokenOverridable {
  channel: string;
  ts: string;
  as_user?: boolean;
}
// https://api.slack.com/methods/chat.deleteScheduledMessage
export interface ChatDeleteScheduledMessageArguments extends TokenOverridable {
  channel: string;
  scheduled_message_id: string;
  as_user?: boolean;
}
// https://api.slack.com/methods/chat.getPermalink
export interface ChatGetPermalinkArguments extends TokenOverridable {
  channel: string;
  message_ts: string;
}
// https://api.slack.com/methods/chat.meMessage
export interface ChatMeMessageArguments extends TokenOverridable {
  channel: string;
  text: string;
}
// https://api.slack.com/methods/chat.postEphemeral
// TODO: breaking change: could use unions of types to better model either/or arguments (e.g. either channel and text
// is required OR channel and blocks OR channel and attachments)
// for an in-code example for chat.postMessage: https://github.com/slackapi/node-slack-sdk/pull/1670/files#r1346453396
// Many of these arguments can be shared with ChatPostMessageArguments
export interface ChatPostEphemeralArguments extends TokenOverridable {
  channel: string;
  text?: string;
  user: string;
  as_user?: boolean;
  attachments?: MessageAttachment[];
  blocks?: (KnownBlock | Block)[];
  link_names?: boolean;
  parse?: 'full' | 'none';
  thread_ts?: string;
  icon_emoji?: string; // if specified, as_user must be false
  icon_url?: string; // if specified, as_user must be false
  username?: string; // if specified, as_user must be false
}
// https://api.slack.com/methods/chat.postMessage
// TODO: breaking change: could use unions of types to better model either/or arguments (e.g. either channel and text
// is required OR channel and blocks OR channel and attachments)
// for an in-code example for chat.postMessage: https://github.com/slackapi/node-slack-sdk/pull/1670/files#r1346453396
// Many of these arguments can be shared with ChatPostEphemeralArguments
export interface ChatPostMessageArguments extends TokenOverridable {
  channel: string;
  text?: string;
  as_user?: boolean;
  attachments?: MessageAttachment[];
  blocks?: (KnownBlock | Block)[];
  icon_emoji?: string; // if specified, as_user must be false
  icon_url?: string; // if specified, as_user must be false
  metadata?: MessageMetadata;
  link_names?: boolean;
  mrkdwn?: boolean;
  parse?: 'full' | 'none';
  reply_broadcast?: boolean; // if specified, thread_ts must be set
  thread_ts?: string;
  unfurl_links?: boolean;
  unfurl_media?: boolean;
  username?: string; // if specified, as_user must be false
}
// TODO: breaking change: could use unions of types to better model either/or arguments (e.g. either channel and text
// is required OR channel and blocks OR channel and attachments)
// for an in-code example for chat.postMessage: https://github.com/slackapi/node-slack-sdk/pull/1670/files#r1346453396
// Many of these arguments can be shared with ChatPostEphemeralArguments
// https://api.slack.com/methods/chat.scheduleMessage
export interface ChatScheduleMessageArguments extends TokenOverridable, OptionalTeamAssignable {
  channel: string;
  text?: string;
  post_at: string | number;
  as_user?: boolean;
  attachments?: MessageAttachment[];
  blocks?: (KnownBlock | Block)[];
  metadata?: MessageMetadata;
  link_names?: boolean;
  parse?: 'full' | 'none';
  reply_broadcast?: boolean; // if specified, thread_ts must be set
  thread_ts?: string;
  unfurl_links?: boolean;
  unfurl_media?: boolean;
}
// https://api.slack.com/methods/chat.scheduledMessages.list
export interface ChatScheduledMessagesListArguments extends TokenOverridable,
  CursorPaginationEnabled, OptionalTeamAssignable {
  channel?: string;
  latest?: number;
  oldest?: number;
}
cursorPaginationEnabledMethods.add('chat.scheduledMessages.list');
// ChannelAndTS and SourceAndUnfurlID are used as either-or mixins for ChatUnfurlArguments
interface ChannelAndTSArguments {
  /**
   * @description Channel ID of the message. Both `channel` and `ts` must be provided together, or `unfurl_id` and
   * `source` must be provided together.
   */
  channel: string;
  /**
   * @description Timestamp of the message to add unfurl behavior to.
   */
  ts: string;
}

interface SourceAndUnfurlIDArguments {
  /**
   * @description The source of the link to unfurl. The source may either be `composer`, when the link is inside the
   * message composer, or `conversations_history`, when the link has been posted to a conversation.
   */
  source: 'composer' | 'conversations_history';
  /**
   * @description The ID of the link to unfurl. Both `unfurl_id` and `source` must be provided together, or `channel`
   * and `ts` must be provided together.
   */
  unfurl_id: string;
}
// https://api.slack.com/methods/chat.unfurl
export type ChatUnfurlArguments = (ChannelAndTSArguments | SourceAndUnfurlIDArguments) & TokenOverridable
& {
  /**
   * @description URL-encoded JSON map with keys set to URLs featured in the the message, pointing to their unfurl
   * blocks or message attachments.
   */
  unfurls: LinkUnfurls;
  /**
   * @description Provide a simply-formatted string to send as an ephemeral message to the user as invitation to
   * authenticate further and enable full unfurling behavior. Provides two buttons, Not now or Never ask me again.
   */
  user_auth_message?: string;
  /**
   * @description Set to `true` to indicate the user must install your Slack app to trigger unfurls for this domain.
   * Defaults to `false`.
   */
  user_auth_required?: boolean;
  /**
   * @description Send users to this custom URL where they will complete authentication in your app to fully trigger
   * unfurling. Value should be properly URL-encoded.
   */
  user_auth_url?: string;
  /**
   * @description Provide a JSON based array of structured blocks presented as URL-encoded string to send as an
   * ephemeral message to the user as invitation to authenticate further and enable full unfurling behavior.
   */
  user_auth_blocks?: (KnownBlock | Block)[];
};
// TODO: breaking change: could use unions of types to better model either/or arguments (e.g. either channel and text
// is required OR channel and blocks OR channel and attachments)
// for an in-code example for chat.postMessage: https://github.com/slackapi/node-slack-sdk/pull/1670/files#r1346453396
// Many of these arguments can be shared with ChatPostEphemeralArguments
// https://api.slack.com/methods/chat.update
export interface ChatUpdateArguments extends TokenOverridable {
  channel: string;
  ts: string;
  as_user?: boolean;
  attachments?: MessageAttachment[];
  blocks?: (KnownBlock | Block)[];
  link_names?: boolean;
  metadata?: MessageMetadata;
  parse?: 'full' | 'none';
  file_ids?: string[];
  reply_broadcast?: boolean;
  text?: string;
}

/*
 * `conversations.*`
 */
// TODO: breaking change: must provide either channel_id or invite_id
// https://api.slack.com/methods/conversations.acceptSharedInvite
export interface ConversationsAcceptSharedInviteArguments extends TokenOverridable, OptionalTeamAssignable {
  channel_name: string;
  channel_id?: string;
  free_trial_accepted?: boolean;
  invite_id?: string;
  is_private?: boolean;
}
// https://api.slack.com/methods/conversations.approveSharedInvite
export interface ConversationsApproveSharedInviteArguments extends TokenOverridable {
  invite_id: string;
  target_team?: string;
}
// https://api.slack.com/methods/conversations.archive
export interface ConversationsArchiveArguments extends TokenOverridable {
  channel: string;
}
// https://api.slack.com/methods/conversations.close
export interface ConversationsCloseArguments extends TokenOverridable {
  channel: string;
}
// https://api.slack.com/methods/conversations.create
export interface ConversationsCreateArguments extends TokenOverridable, OptionalTeamAssignable {
  name: string;
  is_private?: boolean;
}
// https://api.slack.com/methods/conversations.declineSharedInvite
export interface ConversationsDeclineSharedInviteArguments extends TokenOverridable {
  invite_id: string;
  target_team?: string;
}
// https://api.slack.com/methods/conversations.history
export interface ConversationsHistoryArguments extends TokenOverridable, CursorPaginationEnabled,
  TimelinePaginationEnabled {
  channel: string;
  include_all_metadata?: boolean;
}
cursorPaginationEnabledMethods.add('conversations.history');
// https://api.slack.com/methods/conversations.info
export interface ConversationsInfoArguments extends TokenOverridable, LocaleAware {
  channel: string;
  include_num_members?: boolean;
}
// https://api.slack.com/methods/conversations.invite
export interface ConversationsInviteArguments extends TokenOverridable {
  channel: string;
  users: string; // comma-separated list of users
}
// TODO: breaking change: either emails or user_ids must be provided
// https://api.slack.com/methods/conversations.inviteShared
export interface ConversationsInviteSharedArguments extends TokenOverridable {
  channel: string;
  emails?: string[];
  external_limited?: boolean;
  user_ids?: string[];
}
// https://api.slack.com/methods/conversations.join
export interface ConversationsJoinArguments extends TokenOverridable {
  channel: string;
}
// https://api.slack.com/methods/conversations.kick
export interface ConversationsKickArguments extends TokenOverridable {
  channel: string;
  user: string;
}
// https://api.slack.com/methods/conversations.leave
export interface ConversationsLeaveArguments extends TokenOverridable {
  channel: string;
}
// https://api.slack.com/methods/conversations.list
export interface ConversationsListArguments extends TokenOverridable, CursorPaginationEnabled, OptionalTeamAssignable {
  exclude_archived?: boolean;
  types?: string; // comma-separated list of conversation types
}
cursorPaginationEnabledMethods.add('conversations.list');
// https://api.slack.com/methods/conversations.listConnectInvites
export interface ConversationsListConnectInvitesArguments extends TokenOverridable, OptionalTeamAssignable {
  count?: number; // lol we use `limit` everywhere else
  cursor?: string;
}
cursorPaginationEnabledMethods.add('conversations.listConnectInvites');
// https://api.slack.com/methods/conversations.mark
export interface ConversationsMarkArguments extends TokenOverridable {
  channel: string;
  ts: string;
}
// https://api.slack.com/methods/conversations.members
export interface ConversationsMembersArguments extends TokenOverridable, CursorPaginationEnabled {
  channel: string;
}
cursorPaginationEnabledMethods.add('conversations.members');
// TODO: breaking change: must supply either channel or users
// https://api.slack.com/methods/conversations.open
export interface ConversationsOpenArguments extends TokenOverridable {
  channel?: string;
  users?: string; // comma-separated list of users
  return_im?: boolean;
  prevent_creation?: boolean;
}
// https://api.slack.com/methods/conversations.rename
export interface ConversationsRenameArguments extends TokenOverridable {
  channel: string;
  name: string;
}
// https://api.slack.com/methods/conversations.replies
export interface ConversationsRepliesArguments extends TokenOverridable, CursorPaginationEnabled,
  TimelinePaginationEnabled {
  channel: string;
  ts: string;
  include_all_metadata?: boolean;
}
cursorPaginationEnabledMethods.add('conversations.replies');
// https://api.slack.com/methods/conversations.setPurpose
export interface ConversationsSetPurposeArguments extends TokenOverridable {
  channel: string;
  purpose: string;
}
// https://api.slack.com/methods/conversations.setTopic
export interface ConversationsSetTopicArguments extends TokenOverridable {
  channel: string;
  topic: string;
}
// https://api.slack.com/methods/conversations.unarchive
export interface ConversationsUnarchiveArguments extends TokenOverridable {
  channel: string;
}

/*
 * `dialog.*`
 */
// https://api.slack.com/methods/dialog.open
export interface DialogOpenArguments extends TokenOverridable {
  trigger_id: string;
  dialog: Dialog;
}

/*
 * `dnd.*`
 */
// https://api.slack.com/methods/dnd.endDnd
export interface DndEndDndArguments extends TokenOverridable { }
// https://api.slack.com/methods/dnd.endSnooze
export interface DndEndSnoozeArguments extends TokenOverridable { }
// https://api.slack.com/methods/dnd.info
export interface DndInfoArguments extends TokenOverridable, OptionalTeamAssignable {
  user?: string;
}
// https://api.slack.com/methods/dnd.setSnooze
export interface DndSetSnoozeArguments extends TokenOverridable {
  num_minutes: number;
}
// https://api.slack.com/methods/dnd.teamInfo
export interface DndTeamInfoArguments extends TokenOverridable, OptionalTeamAssignable {
  users: string; // comma-separated list of users
}

/*
 * `emoji.*`
 */
// https://api.slack.com/methods/emoji.list
export interface EmojiListArguments extends TokenOverridable {
  include_categories?: boolean;
}

/*
 * `files.*`
 */
// https://api.slack.com/methods/files.delete
export interface FilesDeleteArguments extends TokenOverridable {
  file: string; // file id
}
// https://api.slack.com/methods/files.info
export interface FilesInfoArguments extends TokenOverridable, CursorPaginationEnabled, TraditionalPagingEnabled {
  file: string; // file id
}
cursorPaginationEnabledMethods.add('files.info');
// https://api.slack.com/methods/files.list
export interface FilesListArguments extends TokenOverridable, TraditionalPagingEnabled, OptionalTeamAssignable {
  channel?: string;
  user?: string;
  ts_from?: string;
  ts_to?: string;
  types?: string; // comma-separated list of file types
  show_files_hidden_by_limit?: boolean;
}
// https://api.slack.com/methods/files.revokePublicURL
export interface FilesRevokePublicURLArguments extends TokenOverridable {
  file: string; // file id
}
// https://api.slack.com/methods/files.sharedPublicURL
export interface FilesSharedPublicURLArguments extends TokenOverridable {
  file: string; // file id
}
/**
 * Legacy files.upload API files upload arguments
 */
// TODO: breaking change: must provide content or file
// https://api.slack.com/methods/files.upload
export interface FilesUploadArguments extends FileUpload, TokenOverridable {}
interface FileUpload {
  channels?: string; // comma-separated list of channels
  content?: string; // if omitted, must provide `file`
  file?: Buffer | Stream | string; // if omitted, must provide `content`
  filename?: string;
  filetype?: string;
  initial_comment?: string;
  thread_ts?: string; // TODO: breaking change: if specified, `channels` must be set
  title?: string;
}

export interface FilesUploadV2Arguments extends FileUploadV2, TokenOverridable {
  file_uploads?: Omit<FileUploadV2, 'channel_id' | 'channels' | 'initial_comment' | 'thread_ts'>[];
  /**
   * @deprecated Since v7, this flag is no longer used. You can safely remove it from your code.
   */
  request_file_info?: boolean;
}

export type FileUploadV2 = FileUpload & {
  alt_text?: string; // for image uploads
  channel_id?: string;
  snippet_type?: string; // for code snippets
};

// Helper type intended for internal use in filesUploadV2 client method
// Includes additional metadata required to complete a single file upload job
export interface FileUploadV2Job extends FileUploadV2,
  Pick<FilesGetUploadURLExternalResponse, 'file_id' | 'upload_url' | 'error'> {
  length?: number;
  data?: Buffer;
}

/**
 * Gets a URL for an edge external file upload. Method:
 * @see {@link https://api.slack.com/methods/files.getUploadURLExternal `files.getUploadURLExternal` API reference}
*/
export interface FilesGetUploadURLExternalArguments extends TokenOverridable {
  filename: string;
  length: number;
  alt_text?: string;
  snippet_type?: string;
}
/**
 * Finishes an upload started with {@link https://api.slack.com/methods/files.getUploadURLExternal `files.getUploadURLExternal`}.
 * @see {@link https://api.slack.com/methods/files.completeUploadExternal `files.completeUploadExternal` API reference}
 */
export interface FilesCompleteUploadExternalArguments extends TokenOverridable {
  files: FileUploadComplete[];
  channel_id?: string, // if omitted, file will be private
  initial_comment?: string,
  thread_ts?: string
}
interface FileUploadComplete {
  id: string, // file id
  title?: string // filename
}
// https://api.slack.com/methods/files.comments.delete
export interface FilesCommentsDeleteArguments extends TokenOverridable {
  file: string; // file id
  id: string; // comment id
}
// https://api.slack.com/methods/files.remote.info
export interface FilesRemoteInfoArguments extends TokenOverridable {
  // TODO: breaking change: either one of the file or external_id arguments are required
  // This either/or relationship for files.remote.* APIs can be modeled once and re-used for all these methods
  file?: string;
  external_id?: string;
}
// https://api.slack.com/methods/files.remote.list
export interface FilesRemoteListArguments extends TokenOverridable, CursorPaginationEnabled {
  ts_from?: string;
  ts_to?: string;
  channel?: string;
}
cursorPaginationEnabledMethods.add('files.remote.list');
// https://api.slack.com/methods/files.remote.add
export interface FilesRemoteAddArguments extends TokenOverridable {
  title: string;
  external_url: string;
  external_id: string; // a unique identifier for the file in your system
  filetype?: string; // possible values (except for 'auto'): https://api.slack.com/types/file#file_types
  preview_image?: Buffer | Stream;
  indexable_file_contents?: Buffer | Stream;
}
// https://api.slack.com/methods/files.remote.update
export interface FilesRemoteUpdateArguments extends TokenOverridable {
  title?: string;
  external_url?: string;
  filetype?: string; // possible values (except for 'auto'): https://api.slack.com/types/file#file_types
  preview_image?: Buffer | Stream;
  indexable_file_contents?: Buffer | Stream;
  // TODO: breaking change: either one of the file or external_id arguments are required
  file?: string;
  external_id?: string;
}
// https://api.slack.com/methods/files.remote.remove
export interface FilesRemoteRemoveArguments extends TokenOverridable {
  // TODO: breaking change: either one of the file or external_id arguments are required
  file?: string;
  external_id?: string;
}
// https://api.slack.com/methods/files.remote.share
export interface FilesRemoteShareArguments extends TokenOverridable {
  channels: string; // comma-separated list of channel ids
  // TODO: breaking change: either one of the file or external_id arguments are required
  file?: string;
  external_id?: string;
}

/*
 * `migration.*`
 */
// https://api.slack.com/methods/migration.exchange
export interface MigrationExchangeArguments extends TokenOverridable, OptionalTeamAssignable {
  users: string; // comma-separated list of users
  to_old?: boolean;
}

/*
 * `oauth.*`
 */
// https://api.slack.com/methods/oauth.access
// TODO: this method is marked as a 'legacy' method; should we add it as a 'deprecated' method?
export interface OAuthAccessArguments {
  client_id: string; // TODO: docs state this is optional
  client_secret: string; // TODO: docs state this is optional
  code: string; // TODO: docs state this is optional
  redirect_uri?: string;
  single_channel?: boolean;
}
// https://api.slack.com/methods/oauth.v2.access
export interface OAuthV2AccessArguments {
  client_id: string; // TODO: docs state this is optional
  client_secret: string; // TODO: docs state this is optional
  code?: string; // not required for token rotation
  redirect_uri?: string;
  grant_type?: string;
  refresh_token?: string;
}
// https://api.slack.com/methods/oauth.v2.exchange
export interface OAuthV2ExchangeArguments {
  client_id: string;
  client_secret: string;
}

/*
 * `openid.connect.*`
 */
// https://api.slack.com/methods/openid.connect.token
export interface OpenIDConnectTokenArguments {
  client_id: string; // TODO: docs state this is optional
  client_secret: string; // TODO: docs state this is optional
  code?: string;
  redirect_uri?: string;
  grant_type?: 'authorization_code' | 'refresh_token';
  refresh_token?: string;
}
// https://api.slack.com/methods/openid.connect.userInfo
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OpenIDConnectUserInfoArguments {
}

/*
 * `pins.*`
 */
// TODO: there's a quip_component_id parameter documented publicly but probably we shouldnt expose just yet
// https://api.slack.com/methods/pins.add
export interface PinsAddArguments extends TokenOverridable {
  channel: string;
  timestamp: string;
}
// https://api.slack.com/methods/pins.list
export interface PinsListArguments extends TokenOverridable {
  channel: string;
}
// https://api.slack.com/methods/pins.remove
export interface PinsRemoveArguments extends TokenOverridable {
  channel: string;
  timestamp: string;
}

/*
 * `reactions.*`
 */
// https://api.slack.com/methods/reactions.add
export interface ReactionsAddArguments extends TokenOverridable {
  name: string;
  channel: string;
  timestamp: string;
}
// TODO: must supply either channel and timestamp or a file id or file comment id
// https://api.slack.com/methods/reactions.get
export interface ReactionsGetArguments extends TokenOverridable {
  full?: boolean;
  // must supply one of:
  channel?: string; // paired with timestamp
  timestamp?: string; // paired with channel
  file?: string; // file id
  file_comment?: string;
}
// https://api.slack.com/methods/reactions.list
export interface ReactionsListArguments extends TokenOverridable, TraditionalPagingEnabled,
  CursorPaginationEnabled, OptionalTeamAssignable {
  user?: string;
  full?: boolean;
}
cursorPaginationEnabledMethods.add('reactions.list');
// TODO: must supply either channel and timestamp or a file id or file comment id
// https://api.slack.com/methods/reactions.remove
export interface ReactionsRemoveArguments extends TokenOverridable {
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
interface ReminderRecurrenceDailyMonthlyYearly {
  frequency: 'daily' | 'monthly' | 'yearly';
}
type DaysOfTheWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
interface ReminderRecurrenceWeekly {
  frequency: 'weekly';
  weekdays: [DaysOfTheWeek, ...DaysOfTheWeek[]]
}
type ReminderRecurrence = ReminderRecurrenceWeekly | ReminderRecurrenceDailyMonthlyYearly;
// https://api.slack.com/methods/reminders.add
export interface RemindersAddArguments extends TokenOverridable, OptionalTeamAssignable {
  text: string;
  time: string | number;
  user?: string;
  recurrence?: ReminderRecurrence;
}
// https://api.slack.com/methods/reminders.complete
export interface RemindersCompleteArguments extends TokenOverridable, OptionalTeamAssignable {
  reminder: string;
}
// https://api.slack.com/methods/reminders.delete
export interface RemindersDeleteArguments extends TokenOverridable, OptionalTeamAssignable {
  reminder: string;
}
// https://api.slack.com/methods/reminders.info
export interface RemindersInfoArguments extends TokenOverridable, OptionalTeamAssignable {
  reminder: string;
}
// https://api.slack.com/methods/reminders.list
export interface RemindersListArguments extends TokenOverridable, OptionalTeamAssignable { }

/*
 * `rtm.*`
 */
// https://api.slack.com/methods/rtm.connect
export interface RTMConnectArguments extends TokenOverridable {
  batch_presence_aware?: boolean;
  presence_sub?: boolean;
}
// https://api.slack.com/methods/rtm.start
export interface RTMStartArguments extends TokenOverridable, LocaleAware {
  batch_presence_aware?: boolean;
  mpim_aware?: boolean;
  no_latest?: '0' | '1';
  no_unreads?: string; // TODO: docs say this is a boolean
  presence_sub?: boolean;
  simple_latest?: boolean;
}

/*
 * `search.*`
 */
// https://api.slack.com/methods/search.all
export interface SearchAllArguments extends TokenOverridable, TraditionalPagingEnabled,
  Searchable { }
// https://api.slack.com/methods/search.files
export interface SearchFilesArguments extends TokenOverridable, TraditionalPagingEnabled,
  Searchable { }
// https://api.slack.com/methods/search.messages
export interface SearchMessagesArguments extends TokenOverridable, TraditionalPagingEnabled,
  Searchable { }

// TODO: usage info for stars.add recommends retiring use of any stars APIs
// https://api.slack.com/methods/stars.add#markdown
// should we mark these methods as deprecated?
/*
 * `stars.*`
 */
// https://api.slack.com/methods/stars.add
export interface StarsAddArguments extends TokenOverridable {
  // TODO: breaking change: must supply one of:
  channel?: string; // optionally paired with `timestamp`
  timestamp?: string; // paired with `channel`
  file?: string; // file id
  file_comment?: string; // file comment id
}
// https://api.slack.com/methods/stars.list
export interface StarsListArguments extends TokenOverridable, TraditionalPagingEnabled,
  CursorPaginationEnabled, OptionalTeamAssignable { }
cursorPaginationEnabledMethods.add('stars.list');
// https://api.slack.com/methods/stars.remove
export interface StarsRemoveArguments extends TokenOverridable {
  // TODO: breaking change: must supply one of:
  channel?: string; // optionally paired with `timestamp`
  timestamp?: string; // paired with `channel`
  file?: string; // file id
  file_comment?: string; // file comment id
}

/*
 * `team.*`
 */
// https://api.slack.com/methods/team.accessLogs
export interface TeamAccessLogsArguments extends TokenOverridable, CursorPaginationEnabled,
  TraditionalPagingEnabled, OptionalTeamAssignable {
  before?: number;
}
cursorPaginationEnabledMethods.add('team.accessLogs');
// https://api.slack.com/methods/team.billableInfo
export interface TeamBillableInfoArguments extends TokenOverridable, CursorPaginationEnabled, OptionalTeamAssignable {
  user?: string;
}
// https://api.slack.com/methods/team.billing.info
export interface TeamBillingInfoArguments extends TokenOverridable {
  domain?: string;
  team?: string;
}
// https://api.slack.com/methods/team.info
export interface TeamInfoArguments extends TokenOverridable {
  // Team to get info on, if omitted, will return information about the current team.
  // Will only return team that the authenticated token is allowed to see through external shared channels
  team?: string;
  domain?: string; // available only for Enterprise Grid
}
// https://api.slack.com/methods/team.integrationLogs
export interface TeamIntegrationLogsArguments extends TokenOverridable,
  OptionalTeamAssignable, TraditionalPagingEnabled {
  app_id?: string;
  change_type?: 'added' | 'removed' | 'enabled' | 'disabled' | 'updated';
  service_id?: string;
  user?: string;
}
// https://api.slack.com/methods/team.profile.get
export interface TeamProfileGetArguments extends TokenOverridable {
  visibility?: 'all' | 'visible' | 'hidden';
}
// https://api.slack.com/methods/team.preferences.list
export interface TeamPreferencesListArguments extends TokenOverridable { }

/*
 * `usergroups.*`
 */
// https://api.slack.com/methods/usergroups.create
export interface UsergroupsCreateArguments extends TokenOverridable, OptionalTeamAssignable {
  name: string;
  channels?: string; // comma-separated list of channels, TODO: docs say this is an array
  description?: string;
  handle?: string;
  include_count?: boolean;
}
// https://api.slack.com/methods/usergroups.disable
export interface UsergroupsDisableArguments extends TokenOverridable, OptionalTeamAssignable {
  usergroup: string;
  include_count?: boolean;
}
// https://api.slack.com/methods/usergroups.enable
export interface UsergroupsEnableArguments extends TokenOverridable, OptionalTeamAssignable {
  usergroup: string;
  include_count?: boolean;
}
// https://api.slack.com/methods/usergroups.list
export interface UsergroupsListArguments extends TokenOverridable, OptionalTeamAssignable {
  include_count?: boolean;
  include_disabled?: boolean;
  include_users?: boolean;
}
// https://api.slack.com/methods/usergroups.update
export interface UsergroupsUpdateArguments extends TokenOverridable, OptionalTeamAssignable {
  usergroup: string;
  channels?: string; // comma-separated list of channels, TODO: docs say this is an array
  description?: string;
  handle?: string;
  include_count?: boolean;
  name?: string;
}
// https://api.slack.com/methods/usergroups.users.list
export interface UsergroupsUsersListArguments extends TokenOverridable, OptionalTeamAssignable {
  usergroup: string;
  include_disabled?: boolean;
}
// https://api.slack.com/methods/usergroups.users.update
export interface UsergroupsUsersUpdateArguments extends TokenOverridable, OptionalTeamAssignable {
  usergroup: string;
  users: string; // comma-separated list of users
  include_count?: boolean;
}

/*
 * `users.*`
 */
// https://api.slack.com/methods/users.conversations
export interface UsersConversationsArguments extends TokenOverridable, CursorPaginationEnabled, OptionalTeamAssignable {
  exclude_archived?: boolean;
  types?: string; // comma-separated list of conversation types
  user?: string;
}
cursorPaginationEnabledMethods.add('users.conversations');
// https://api.slack.com/methods/users.deletePhoto
export interface UsersDeletePhotoArguments extends TokenOverridable { }
// https://api.slack.com/methods/users.getPresence
export interface UsersGetPresenceArguments extends TokenOverridable {
  user?: string;
}
// https://api.slack.com/methods/users.identity
export interface UsersIdentityArguments extends TokenOverridable { }
// https://api.slack.com/methods/users.info
export interface UsersInfoArguments extends TokenOverridable, LocaleAware {
  user: string;
}
// https://api.slack.com/methods/users.list
export interface UsersListArguments extends TokenOverridable, CursorPaginationEnabled,
  LocaleAware, OptionalTeamAssignable { }
cursorPaginationEnabledMethods.add('users.list');
// https://api.slack.com/methods/users.lookupByEmail
export interface UsersLookupByEmailArguments extends TokenOverridable {
  email: string;
}
// https://api.slack.com/methods/users.setPhoto
export interface UsersSetPhotoArguments extends TokenOverridable {
  image: Buffer | Stream;
  crop_w?: number;
  crop_x?: number;
  crop_y?: number;
}
// https://api.slack.com/methods/users.setPresence
export interface UsersSetPresenceArguments extends TokenOverridable {
  presence: 'auto' | 'away';
}
// https://api.slack.com/methods/users.profile.get
export interface UsersProfileGetArguments extends TokenOverridable {
  include_labels?: boolean;
  user?: string;
}
// TODO: breaking change: either profile or name/value pair must be provided
// https://api.slack.com/methods/users.profile.set
export interface UsersProfileSetArguments extends TokenOverridable {
  profile?: string; // url-encoded json
  user?: string; // must be an admin user and must be on a paid plan
  name?: string; // usable if `profile` is not passed
  value?: string; // usable if `profile` is not passed
}

/*
 * `views.*`
 */
interface BaseViewsArguments {
  view: View;
}
interface ViewTriggerId {
  trigger_id: string;
}
interface ViewInteractivityPointer {
  interactivity_pointer: string;
}
// https://api.slack.com/methods/views.open
export type ViewsOpenArguments = BaseViewsArguments & TokenOverridable & (ViewTriggerId | ViewInteractivityPointer);
// https://api.slack.com/methods/views.push
export type ViewsPushArguments = BaseViewsArguments & TokenOverridable & (ViewTriggerId | ViewInteractivityPointer);
// https://api.slack.com/methods/views.publish
export interface ViewsPublishArguments extends BaseViewsArguments, TokenOverridable {
  user_id: string;
  hash?: string;
}
interface ViewExternalId {
  external_id: string;
}
interface ViewViewId {
  view_id: string;
}
// https://api.slack.com/methods/views.update
export type ViewsUpdateArguments = BaseViewsArguments & TokenOverridable & (ViewExternalId | ViewViewId) & {
  hash?: string;
};

// TODO: docs state workflows.* methods are deprecated. should we mark them as such?
/*
 * `workflows.*`
 */
// https://api.slack.com/methods/workflows.stepCompleted
export interface WorkflowsStepCompletedArguments extends TokenOverridable {
  workflow_step_execute_id: string;
  outputs?: Record<string, unknown>;
}
// https://api.slack.com/methods/workflows.stepFailed
export interface WorkflowsStepFailedArguments extends TokenOverridable {
  workflow_step_execute_id: string;
  error: {
    message: string;
  };
}
// https://api.slack.com/methods/workflows.updateStep
export interface WorkflowsUpdateStepArguments extends TokenOverridable {
  workflow_step_edit_id: string;
  step_image_url?: string;
  step_name?: string;
  inputs?: {
    [name: string]: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value: any;
      skip_variable_replacement?: boolean;
      variables?: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
      };
    },
  };
  outputs?: {
    type: string;
    name: string;
    label: string;
  }[];
}

export * from '@slack/types';
