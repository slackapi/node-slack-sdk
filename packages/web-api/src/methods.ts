import type { CallUser } from '@slack/types';
import { EventEmitter } from 'eventemitter3';
import { WebAPICallResult, WebClient, WebClientEvent } from './WebClient';
// Response types
import type {
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
  AppsManifestCreateResponse,
  AppsManifestDeleteResponse,
  AppsManifestExportResponse,
  AppsManifestUpdateResponse,
  AppsManifestValidateResponse,
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
  ToolingTokensRotateResponse,
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
} from './types/response';
// Request types
import type { TokenOverridable, OptionalTeamAssignable, CursorPaginationEnabled } from './types/request/common';
import type { WorkflowsStepCompletedArguments, WorkflowsStepFailedArguments, WorkflowsUpdateStepArguments } from './types/request/workflows';
import type { ViewsUpdateArguments, ViewsOpenArguments, ViewsPushArguments, ViewsPublishArguments } from './types/request/views';
import type { UsersConversationsArguments, UsersInfoArguments, UsersListArguments, UsersIdentityArguments, UsersSetPhotoArguments, UsersProfileGetArguments, UsersProfileSetArguments, UsersDeletePhotoArguments, UsersGetPresenceArguments, UsersSetPresenceArguments, UsersLookupByEmailArguments } from './types/request/users';
import type { ToolingTokensRotateArguments } from './types/request/tooling';
import type { SearchAllArguments, SearchFilesArguments, SearchMessagesArguments } from './types/request/search';
import type { UsergroupsCreateArguments, UsergroupsDisableArguments, UsergroupsEnableArguments, UsergroupsListArguments, UsergroupsUpdateArguments, UsergroupsUsersListArguments, UsergroupsUsersUpdateArguments } from './types/request/usergroups';
import type { TeamAccessLogsArguments, TeamBillableInfoArguments, TeamBillingInfoArguments, TeamInfoArguments, TeamIntegrationLogsArguments, TeamPreferencesListArguments, TeamProfileGetArguments } from './types/request/team';
import type { StarsAddRemoveArguments, StarsListArguments } from './types/request/stars';
import type { RTMConnectArguments, RTMStartArguments } from './types/request/rtm';
import type { RemindersAddArguments, RemindersInfoArguments, RemindersListArguments, RemindersDeleteArguments, RemindersCompleteArguments } from './types/request/reminders';
import type { ReactionsAddArguments, ReactionsGetArguments, ReactionsListArguments, ReactionsRemoveArguments } from './types/request/reactions';
import type { PinsAddArguments, PinsListArguments, PinsRemoveArguments } from './types/request/pins';
import type { OpenIDConnectTokenArguments, OpenIDConnectUserInfoArguments } from './types/request/openid';
import type { OAuthAccessArguments, OAuthV2AccessArguments, OAuthV2ExchangeArguments } from './types/request/oauth';
import type { MigrationExchangeArguments } from './types/request/migration';
import type { FilesDeleteArguments, FilesInfoArguments, FilesListArguments, FilesRevokePublicURLArguments, FilesSharedPublicURLArguments, FilesUploadArguments, FilesUploadV2Arguments, FilesCompleteUploadExternalArguments, FilesGetUploadURLExternalArguments, FilesCommentsDeleteArguments, FilesRemoteUpdateArguments, FilesRemoteRemoveArguments, FilesRemoteShareArguments, FilesRemoteListArguments, FilesRemoteInfoArguments, FilesRemoteAddArguments } from './types/request/files';
import type { EmojiListArguments } from './types/request/emoji';
import type { DndEndDndArguments, DndEndSnoozeArguments, DndInfoArguments, DndSetSnoozeArguments, DndTeamInfoArguments } from './types/request/dnd';
import type { DialogOpenArguments } from './types/request/dialog';
import type { ConversationsAcceptSharedInviteArguments, ConversationsApproveSharedInviteArguments, ConversationsArchiveArguments, ConversationsCloseArguments, ConversationsCreateArguments, ConversationsDeclineSharedInviteArguments, ConversationsHistoryArguments, ConversationsInfoArguments, ConversationsInviteArguments, ConversationsInviteSharedArguments, ConversationsJoinArguments, ConversationsKickArguments, ConversationsLeaveArguments, ConversationsListArguments, ConversationsListConnectInvitesArguments, ConversationsMarkArguments, ConversationsMembersArguments, ConversationsOpenArguments, ConversationsRenameArguments, ConversationsRepliesArguments, ConversationsSetPurposeArguments, ConversationsSetTopicArguments, ConversationsUnarchiveArguments } from './types/request/conversations';
import type { ChatDeleteArguments, ChatDeleteScheduledMessageArguments, ChatGetPermalinkArguments, ChatMeMessageArguments, ChatPostEphemeralArguments, ChatPostMessageArguments, ChatScheduleMessageArguments, ChatScheduledMessagesListArguments, ChatUnfurlArguments, ChatUpdateArguments } from './types/request/chat';

/**
 * Generic method definition
 */
export default interface Method<
  MethodArguments,
  MethodResult extends WebAPICallResult = WebAPICallResult,
> {
  (options: MethodArguments): Promise<MethodResult>;
}

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
  protected constructor() {
    super();

    // Check that the class being created extends from `WebClient` rather than this class
    if (new.target !== WebClient && !(new.target.prototype instanceof WebClient)) {
      throw new Error('Attempt to inherit from WebClient methods without inheriting from WebClient');
    }
  }

  public abstract apiCall(method: string, options?: Record<string, unknown>): Promise<WebAPICallResult>;
  public abstract filesUploadV2(options: FilesUploadV2Arguments): Promise<WebAPICallResult>;

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
    manifest: {
      create: bindApiCall<AppsManifestCreateArguments, AppsManifestCreateResponse>(this, 'apps.manifest.create'),
      delete: bindApiCall<AppsManifestDeleteArguments, AppsManifestDeleteResponse>(this, 'apps.manifest.delete'),
      export: bindApiCall<AppsManifestExportArguments, AppsManifestExportResponse>(this, 'apps.manifest.export'),
      update: bindApiCall<AppsManifestUpdateArguments, AppsManifestUpdateResponse>(this, 'apps.manifest.update'),
      validate: bindApiCall<AppsManifestValidateArguments, AppsManifestValidateResponse>(this, 'apps.manifest.validate'),
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
    /**
     * @description Deletes a message.
     * @see {@link https://api.slack.com/methods/chat.delete `chat.delete` API reference}.
     */
    delete: bindApiCall<ChatDeleteArguments, ChatDeleteResponse>(this, 'chat.delete'),
    /**
     * @description Deletes a pending scheduled message from the queue.
     * @see {@link https://api.slack.com/methods/chat.deleteScheduledMessage `chat.deleteScheduledMessage` API reference}.
     */
    deleteScheduledMessage:
      bindApiCall<ChatDeleteScheduledMessageArguments, ChatDeleteScheduledMessageResponse>(this, 'chat.deleteScheduledMessage'),
    /**
     * @description Retrieve a permalink URL for a specific extant message.
     * @see {@link https://api.slack.com/methods/chat.getPermalink `chat.getPermalink` API reference}.
     */
    getPermalink: bindApiCall<ChatGetPermalinkArguments, ChatGetPermalinkResponse>(this, 'chat.getPermalink'),
    /**
     * @description Share a me message into a channel.
     * @see {@link https://api.slack.com/methods/chat.meMessage `chat.meMessage` API reference}.
     */
    meMessage: bindApiCall<ChatMeMessageArguments, ChatMeMessageResponse>(this, 'chat.meMessage'),
    /**
     * @description Sends an ephemeral message to a user in a channel.
     * @see {@link https://api.slack.com/methods/chat.postEphemeral `chat.postEphemeral` API reference}.
     */
    postEphemeral: bindApiCall<ChatPostEphemeralArguments, ChatPostEphemeralResponse>(this, 'chat.postEphemeral'),
    /**
     * @description Sends a message to a channel.
     * @see {@link https://api.slack.com/methods/chat.postMessage `chat.postMessage` API reference}.
     */
    postMessage: bindApiCall<ChatPostMessageArguments, ChatPostMessageResponse>(this, 'chat.postMessage'),
    /**
     * @description Schedules a message to be sent to a channel.
     * @see {@link https://api.slack.com/methods/chat.scheduleMessage `chat.scheduleMessage` API reference}.
     */
    scheduleMessage: bindApiCall<ChatScheduleMessageArguments, ChatScheduleMessageResponse>(
      this,
      'chat.scheduleMessage',
    ),
    scheduledMessages: {
      /**
       * @description Returns a list of scheduled messages.
       * @see {@link https://api.slack.com/methods/chat.scheduledMessages.list `chat.scheduledMessages.list` API reference}.
       */
      list:
        bindApiCall<ChatScheduledMessagesListArguments, ChatScheduledMessagesListResponse>(
          this,
          'chat.scheduledMessages.list',
        ),
    },
    /**
     * @description Provide custom unfurl behavior for user-posted URLs.
     * @see {@link https://api.slack.com/methods/chat.unfurl `chat.unfurl` API reference}.
     */
    unfurl: bindApiCall<ChatUnfurlArguments, ChatUnfurlResponse>(this, 'chat.unfurl'),
    /**
     * @description Updates a message.
     * @see {@link https://api.slack.com/methods/chat.update `chat.update` API reference}.
     */
    update: bindApiCall<ChatUpdateArguments, ChatUpdateResponse>(this, 'chat.update'),
  };

  public readonly conversations = {
    /**
     * @description Accepts an invitation to a Slack Connect channel.
     * @see {@link https://api.slack.com/methods/conversations.acceptSharedInvite `conversations.acceptSharedInvite` API reference}.
     */
    acceptSharedInvite: bindApiCall<ConversationsAcceptSharedInviteArguments, ConversationsAcceptSharedInviteResponse>(
      this,
      'conversations.acceptSharedInvite',
    ),
    /**
     * @description Approves an invitation to a Slack Connect channel.
     * @see {@link https://api.slack.com/methods/conversations.approveSharedInvite `conversations.approveSharedInvite` API reference}.
     */
    approveSharedInvite:
      bindApiCall<ConversationsApproveSharedInviteArguments, ConversationsApproveSharedInviteResponse>(
        this,
        'conversations.approveSharedInvite',
      ),
    /**
     * @description Archives a conversation.
     * @see {@link https://api.slack.com/methods/conversations.archive `conversations.archive` API reference}.
     */
    archive: bindApiCall<ConversationsArchiveArguments, ConversationsArchiveResponse>(this, 'conversations.archive'),
    /**
     * @description Closes a direct message or multi-person direct message.
     * @see {@link https://api.slack.com/methods/conversations.close `conversations.close` API reference}.
     */
    close: bindApiCall<ConversationsCloseArguments, ConversationsCloseResponse>(this, 'conversations.close'),
    /**
     * @description Initiates a public or private channel-based conversation.
     * @see {@link https://api.slack.com/methods/conversations.create `conversations.create` API reference}.
     */
    create: bindApiCall<ConversationsCreateArguments, ConversationsCreateResponse>(this, 'conversations.create'),
    /**
     * @description Declines an invitation to a Slack Connect channel.
     * @see {@link https://api.slack.com/methods/conversations.declineSharedInvite `conversations.declineSharedInvite` API reference}.
     */
    declineSharedInvite:
      bindApiCall<ConversationsDeclineSharedInviteArguments, ConversationsDeclineSharedInviteResponse>(
        this,
        'conversations.declineSharedInvite',
      ),
    /**
     * @description Fetches a conversation's history of messages and events.
     * @see {@link https://api.slack.com/methods/conversations.history `conversations.history` API reference}.
     */
    history: bindApiCall<ConversationsHistoryArguments, ConversationsHistoryResponse>(this, 'conversations.history'),
    /**
     * @description Retrieve information about a conversation.
     * @see {@link https://api.slack.com/methods/conversations.info `conversations.info` API reference}.
     */
    info: bindApiCall<ConversationsInfoArguments, ConversationsInfoResponse>(this, 'conversations.info'),
    /**
     * @description Invites users to a channel.
     * @see {@link https://api.slack.com/methods/conversations.invite `conversations.invite` API reference}.
     */
    invite: bindApiCall<ConversationsInviteArguments, ConversationsInviteResponse>(this, 'conversations.invite'),
    /**
     * @description Sends an invitation to a Slack Connect channel.
     * @see {@link https://api.slack.com/methods/conversations.inviteShared `conversations.inviteShared` API reference}.
     */
    inviteShared: bindApiCall<ConversationsInviteSharedArguments, ConversationsInviteSharedResponse>(
      this,
      'conversations.inviteShared',
    ),
    /**
     * @description Joins an existing conversation.
     * @see {@link https://api.slack.com/methods/conversations.join `conversations.join` API reference}.
     */
    join: bindApiCall<ConversationsJoinArguments, ConversationsJoinResponse>(this, 'conversations.join'),
    /**
     * @description Removes a user from a conversation.
     * @see {@link https://api.slack.com/methods/conversations.kick `conversations.kick` API reference}.
     */
    kick: bindApiCall<ConversationsKickArguments, ConversationsKickResponse>(this, 'conversations.kick'),
    /**
     * @description Leaves a conversation.
     * @see {@link https://api.slack.com/methods/conversations.leave `conversations.leave` API reference}.
     */
    leave: bindApiCall<ConversationsLeaveArguments, ConversationsLeaveResponse>(this, 'conversations.leave'),
    /**
     * @description List all channels in a Slack team.
     * @see {@link https://api.slack.com/methods/conversations.list `conversations.list` API reference}.
     */
    list: bindApiCall<ConversationsListArguments, ConversationsListResponse>(this, 'conversations.list'),
    /**
     * @description Lists shared channel invites that have been generated or received but have not been approved by
     * all parties.
     * @see {@link https://api.slack.com/methods/conversations.listConnectInvites `conversations.listConnectInvites` API reference}.
     */
    listConnectInvites:
      bindApiCall<ConversationsListConnectInvitesArguments, ConversationsListConnectInvitesResponse>(
        this,
        'conversations.listConnectInvites',
      ),
    /**
     * @description Sets the read cursor in a channel.
     * @see {@link https://api.slack.com/methods/conversations.mark `conversations.mark` API reference}.
     */
    mark: bindApiCall<ConversationsMarkArguments, ConversationsMarkResponse>(this, 'conversations.mark'),
    /**
     * @description Retrieve members of a conversation.
     * @see {@link https://api.slack.com/methods/conversations.members `conversations.members` API reference}.
     */
    members: bindApiCall<ConversationsMembersArguments, ConversationsMembersResponse>(this, 'conversations.members'),
    /**
     * @description Opens or resumes a direct message or multi-person direct message.
     * @see {@link https://api.slack.com/methods/conversations.open `conversations.open` API reference}.
     */
    open: bindApiCall<ConversationsOpenArguments, ConversationsOpenResponse>(this, 'conversations.open'),
    /**
     * @description Renames a conversation.
     * @see {@link https://api.slack.com/methods/conversations.rename `conversations.rename` API reference}.
     */
    rename: bindApiCall<ConversationsRenameArguments, ConversationsRenameResponse>(this, 'conversations.rename'),
    /**
     * @description Retrieve a thread of messages posted to a conversation.
     * @see {@link https://api.slack.com/methods/conversations.replies `conversations.replies` API reference}.
     */
    replies: bindApiCall<ConversationsRepliesArguments, ConversationsRepliesResponse>(this, 'conversations.replies'),
    /**
     * @description Sets the purpose for a conversation.
     * @see {@link https://api.slack.com/methods/conversations.setPurpose `conversations.setPurpose` API reference}.
     */
    setPurpose:
      bindApiCall<ConversationsSetPurposeArguments, ConversationsSetPurposeResponse>(this, 'conversations.setPurpose'),
    /**
     * @description Sets the topic for a conversation.
     * @see {@link https://api.slack.com/methods/conversations.setTopic `conversations.setTopic` API reference}.
     */
    setTopic: bindApiCall<ConversationsSetTopicArguments, ConversationsSetTopicResponse>(
      this,
      'conversations.setTopic',
    ),
    /**
     * @description Reverses conversation archival.
     * @see {@link https://api.slack.com/methods/conversations.unarchive `conversations.unarchive` API reference}.
     */
    unarchive: bindApiCall<ConversationsUnarchiveArguments, ConversationsUnarchiveResponse>(
      this,
      'conversations.unarchive',
    ),
  };

  public readonly dialog = {
    /**
     * @description Open a dialog with a user.
     * @see {@link https://api.slack.com/methods/dialog.open `dialog.open` API reference}.
     */
    open: bindApiCall<DialogOpenArguments, DialogOpenResponse>(this, 'dialog.open'),
  };

  public readonly dnd = {
    /**
     * @description Ends the current user's Do Not Disturb session immediately.
     * @see {@link https://api.slack.com/methods/dnd.endDnd `dnd.endDnd` API reference}.
     */
    endDnd: bindApiCall<DndEndDndArguments, DndEndDndResponse>(this, 'dnd.endDnd'),
    /**
     * @description Ends the current user's snooze mode immediately.
     * @see {@link https://api.slack.com/methods/dnd.endSnooze `dnd.endSnooze` API reference}.
     */
    endSnooze: bindApiCall<DndEndSnoozeArguments, DndEndSnoozeResponse>(this, 'dnd.endSnooze'),
    /**
     * @description Retrieves a user's current Do Not Disturb status.
     * @see {@link https://api.slack.com/methods/dnd.info `dnd.info` API reference}.
     */
    info: bindApiCall<DndInfoArguments, DndInfoResponse>(this, 'dnd.info'),
    /**
     * @description Turns on Do Not Disturb mode for the current user, or changes its duration.
     * @see {@link https://api.slack.com/methods/dnd.setSnooze `dnd.setSnooze` API reference}.
     */
    setSnooze: bindApiCall<DndSetSnoozeArguments, DndSetSnoozeResponse>(this, 'dnd.setSnooze'),
    /**
     * @description Retrieves the Do Not Disturb status for up to 50 users on a team.
     * @see {@link https://api.slack.com/methods/dnd.teamInfo `dnd.teamInfo` API reference}.
     */
    teamInfo: bindApiCall<DndTeamInfoArguments, DndTeamInfoResponse>(this, 'dnd.teamInfo'),
  };

  public readonly emoji = {
    /**
     * @description Lists custom emoji for a team.
     * @see {@link https://api.slack.com/methods/emoji.list `emoji.list` API reference}.
     */
    list: bindApiCall<EmojiListArguments, EmojiListResponse>(this, 'emoji.list'),
  };

  public readonly files = {
    /**
     * @description Finishes an upload started with {@link https://api.slack.com/methods/files.getUploadURLExternal `files.getUploadURLExternal`}.
     * @see {@link https://api.slack.com/methods/files.completeUploadExternal `files.completeUploadExternal` API reference}.
     */
    completeUploadExternal:
      bindApiCall<FilesCompleteUploadExternalArguments, FilesCompleteUploadExternalResponse>(this, 'files.completeUploadExternal'),
    /**
     * @description Deletes a file.
     * @see {@link https://api.slack.com/methods/files.delete `files.delete` API reference}.
     */
    delete: bindApiCall<FilesDeleteArguments, FilesDeleteResponse>(this, 'files.delete'),
    /**
     * @description Gets a URL for an edge external file upload.
     * @see {@link https://api.slack.com/methods/files.getUploadURLExternal `files.getUploadURLExternal` API reference}.
     */
    getUploadURLExternal:
      bindApiCall<FilesGetUploadURLExternalArguments, FilesGetUploadURLExternalResponse>(this, 'files.getUploadURLExternal'),
    /**
     * @description Gets information about a file.
     * @see {@link https://api.slack.com/methods/files.info `files.info` API reference}.
     */
    info: bindApiCall<FilesInfoArguments, FilesInfoResponse>(this, 'files.info'),
    /**
     * @description List files for a team, in a channel, or from a user with applied filters.
     * @see {@link https://api.slack.com/methods/files.list `files.list` API reference}.
     */
    list: bindApiCall<FilesListArguments, FilesListResponse>(this, 'files.list'),
    /**
     * @description Revokes public/external sharing access for a file.
     * @see {@link https://api.slack.com/methods/files.revokePublicURL `files.revokePublicURL` API reference}.
     */
    revokePublicURL:
      bindApiCall<FilesRevokePublicURLArguments, FilesRevokePublicURLResponse>(this, 'files.revokePublicURL'),
    /**
     * @description Enables a file for public/external sharing.
     * @see {@link https://api.slack.com/methods/files.revokePublicURL `files.revokePublicURL` API reference}.
     */
    sharedPublicURL:
      bindApiCall<FilesSharedPublicURLArguments, FilesSharedPublicURLResponse>(this, 'files.sharedPublicURL'),
    /**
     * @description Uploads or creates a file.
     * @see {@link https://api.slack.com/methods/files.upload `files.upload` API reference}.
     */
    upload: bindApiCall<FilesUploadArguments, FilesUploadResponse>(this, 'files.upload'),
    /**
     * @description Custom method to support a new way of uploading files to Slack.
     * Supports a single file upload
     * Supply:
     * - (required) single file or content
     * - (optional) channel, alt_text, snippet_type,
     * Supports multiple file uploads
     * Supply:
     * - multiple upload_files
     * Will try to honor both single file or content data supplied as well
     * as multiple file uploads property.
     * @see {@link https://slack.dev/node-slack-sdk/web-api#upload-a-file `@slack/web-api` Upload a file documentation}.
    */
    uploadV2: bindFilesUploadV2<FilesUploadV2Arguments, WebAPICallResult>(this),
    comments: {
      /**
       * @description Deletes an existing comment on a file.
       * @see {@link https://api.slack.com/methods/files.comments.delete `files.comments.delete` API reference}.
       */
      delete: bindApiCall<FilesCommentsDeleteArguments, FilesCommentsDeleteResponse>(this, 'files.comments.delete'),
    },
    remote: {
      /**
       * @description Adds a file from a remote service.
       * @see {@link https://api.slack.com/methods/files.remote.add `files.remote.add` API reference}.
       */
      add: bindApiCall<FilesRemoteAddArguments, FilesRemoteAddResponse>(this, 'files.remote.add'),
      /**
       * @description Retrieve information about a remote file added to Slack.
       * @see {@link https://api.slack.com/methods/files.remote.info `files.remote.info` API reference}.
       */
      info: bindApiCall<FilesRemoteInfoArguments, FilesRemoteInfoResponse>(this, 'files.remote.info'),
      /**
       * @description List remote files added to Slack.
       * @see {@link https://api.slack.com/methods/files.remote.list `files.remote.list` API reference}.
       */
      list: bindApiCall<FilesRemoteListArguments, FilesRemoteListResponse>(this, 'files.remote.list'),
      /**
       * @description Remove a remote file.
       * @see {@link https://api.slack.com/methods/files.remote.remove `files.remote.remove` API reference}.
       */
      remove: bindApiCall<FilesRemoteRemoveArguments, FilesRemoteRemoveResponse>(this, 'files.remote.remove'),
      /**
       * @description Share a remote file into a channel.
       * @see {@link https://api.slack.com/methods/files.remote.share `files.remote.share` API reference}.
       */
      share: bindApiCall<FilesRemoteShareArguments, FilesRemoteShareResponse>(this, 'files.remote.share'),
      /**
       * @description Updates an existing remote file.
       * @see {@link https://api.slack.com/methods/files.remote.update `files.remote.update` API reference}.
       */
      update: bindApiCall<FilesRemoteUpdateArguments, FilesRemoteUpdateResponse>(this, 'files.remote.update'),
    },
  };

  public readonly migration = {
    /**
     * @description For Enterprise Grid workspaces, map local user IDs to global user IDs.
     * @see {@link https://api.slack.com/methods/migration.exchange `migration.exchange` API reference}.
     */
    exchange: bindApiCall<MigrationExchangeArguments, MigrationExchangeResponse>(this, 'migration.exchange'),
  };

  public readonly oauth = {
    /**
     * @description Exchanges a temporary OAuth verifier code for an access token.
     * @deprecated This is a legacy method only used by classic Slack apps. Use `oauth.v2.access` for new Slack apps.
     * @see {@link https://api.slack.com/methods/oauth.access `oauth.access` API reference}.
     */
    access: bindApiCall<OAuthAccessArguments, OauthAccessResponse>(this, 'oauth.access'),
    v2: {
      /**
       * @description Exchanges a temporary OAuth verifier code for an access token.
       * @see {@link https://api.slack.com/methods/oauth.v2.access `oauth.v2.access` API reference}.
       */
      access: bindApiCall<OAuthV2AccessArguments, OauthV2AccessResponse>(this, 'oauth.v2.access'),
      /**
       * @description Exchanges a legacy access token for a new expiring access token and refresh token.
       * @see {@link https://api.slack.com/methods/oauth.v2.exchange `oauth.v2.exchange` API reference}.
       */
      exchange: bindApiCall<OAuthV2ExchangeArguments, OauthV2ExchangeResponse>(this, 'oauth.v2.exchange'),
    },
  };

  public readonly openid = {
    connect: {
      /**
       * @description Exchanges a temporary OAuth verifier code for an access token for {@link https://api.slack.com/authentication/sign-in-with-slack Sign in with Slack}.
       * @see {@link https://api.slack.com/methods/openid.connect.token `openid.connect.token` API reference}.
       */
      token: bindApiCall<OpenIDConnectTokenArguments, OpenIDConnectTokenResponse>(this, 'openid.connect.token'),
      /**
       * @description Get the identity of a user who has authorized {@link https://api.slack.com/authentication/sign-in-with-slack Sign in with Slack}.
       * @see {@link https://api.slack.com/methods/openid.connect.userInfo `openid.connect.userInfo` API reference}.
       */
      userInfo: bindApiCall<OpenIDConnectUserInfoArguments, OpenIDConnectUserInfoResponse>(this, 'openid.connect.userInfo'),
    },
  };

  public readonly pins = {
    /**
     * @description Pins an item to a channel.
     * @see {@link https://api.slack.com/methods/pins.add `pins.add` API reference}.
     */
    add: bindApiCall<PinsAddArguments, PinsAddResponse>(this, 'pins.add'),
    /**
     * @description Lists items pinned to a channel.
     * @see {@link https://api.slack.com/methods/pins.list `pins.list` API reference}.
     */
    list: bindApiCall<PinsListArguments, PinsListResponse>(this, 'pins.list'),
    /**
     * @description Un-pins an item from a channel.
     * @see {@link https://api.slack.com/methods/pins.remove `pins.remove` API reference}.
     */
    remove: bindApiCall<PinsRemoveArguments, PinsRemoveResponse>(this, 'pins.remove'),
  };

  public readonly reactions = {
    /**
     * @description Adds a reaction to an item.
     * @see {@link https://api.slack.com/methods/reactions.add `reactions.add` API reference}.
     */
    add: bindApiCall<ReactionsAddArguments, ReactionsAddResponse>(this, 'reactions.add'),
    /**
     * @description Gets reactions for an item.
     * @see {@link https://api.slack.com/methods/reactions.get `reactions.get` API reference}.
     */
    get: bindApiCall<ReactionsGetArguments, ReactionsGetResponse>(this, 'reactions.get'),
    /**
     * @description List reactions made by a user.
     * @see {@link https://api.slack.com/methods/reactions.list `reactions.list` API reference}.
     */
    list: bindApiCall<ReactionsListArguments, ReactionsListResponse>(this, 'reactions.list'),
    /**
     * @description Removes a reaction from an item.
     * @see {@link https://api.slack.com/methods/reactions.remove `reactions.remove` API reference}.
     */
    remove: bindApiCall<ReactionsRemoveArguments, ReactionsRemoveResponse>(this, 'reactions.remove'),
  };

  // TODO: keep tabs on reminders APIs, may be deprecated once Later list APIs land
  // See: https://api.slack.com/changelog/2023-07-its-later-already-for-stars-and-reminders
  public readonly reminders = {
    /**
     * @description Creates a reminder.
     * @see {@link https://api.slack.com/methods/reminders.add `reminders.add` API reference}.
     */
    add: bindApiCall<RemindersAddArguments, RemindersAddResponse>(this, 'reminders.add'),
    /**
     * @description Marks a reminder as complete.
     * @see {@link https://api.slack.com/methods/reminders.complete `reminders.complete` API reference}.
     */
    complete: bindApiCall<RemindersCompleteArguments, RemindersCompleteResponse>(this, 'reminders.complete'),
    /**
     * @description Deletes a reminder.
     * @see {@link https://api.slack.com/methods/reminders.delete `reminders.delete` API reference}.
     */
    delete: bindApiCall<RemindersDeleteArguments, RemindersDeleteResponse>(this, 'reminders.delete'),
    /**
     * @description Gets information about a reminder.
     * @see {@link https://api.slack.com/methods/reminders.info `reminders.info` API reference}.
     */
    info: bindApiCall<RemindersInfoArguments, RemindersInfoResponse>(this, 'reminders.info'),
    /**
     * @description Lists all reminders created by or for a given user.
     * @see {@link https://api.slack.com/methods/reminders.list `reminders.list` API reference}.
     */
    list: bindApiCall<RemindersListArguments, RemindersListResponse>(this, 'reminders.list'),
  };

  public readonly rtm = {
    /**
     * @description Starts a Real Time Messaging session.
     * @see {@link https://api.slack.com/methods/rtm.connect `rtm.connect` API reference}.
     */
    connect: bindApiCall<RTMConnectArguments, RtmConnectResponse>(this, 'rtm.connect'),
    /**
     * @description Starts a Real Time Messaging session.
     * @deprecated Use `rtm.connect` instead. See {@link https://api.slack.com/changelog/2021-10-rtm-start-to-stop our post on retiring `rtm.start`}.
     * @see {@link https://api.slack.com/methods/rtm.start `rtm.start` API reference}.
     */
    start: bindApiCall<RTMStartArguments, RtmStartResponse>(this, 'rtm.start'),
  };

  public readonly search = {
    /**
     * @description Searches for messages and files matching a query.
     * @see {@link https://api.slack.com/methods/search.all search.all` API reference}.
     */
    all: bindApiCall<SearchAllArguments, SearchAllResponse>(this, 'search.all'),
    /**
     * @description Searches for files matching a query.
     * @see {@link https://api.slack.com/methods/search.files search.files` API reference}.
     */
    files: bindApiCall<SearchFilesArguments, SearchFilesResponse>(this, 'search.files'),
    /**
     * @description Searches for messages matching a query.
     * @see {@link https://api.slack.com/methods/search.messages search.messages` API reference}.
     */
    messages: bindApiCall<SearchMessagesArguments, SearchMessagesResponse>(this, 'search.messages'),
  };

  public readonly team = {
    /**
     * @description Gets the access logs for the current team.
     * @see {@link https://api.slack.com/methods/team.accessLogs `team.accessLogs` API reference}.
     */
    accessLogs: bindApiCall<TeamAccessLogsArguments, TeamAccessLogsResponse>(this, 'team.accessLogs'),
    /**
     * @description Gets billable users information for the current team.
     * @see {@link https://api.slack.com/methods/team.billableInfo `team.billableInfo` API reference}.
     */
    billableInfo: bindApiCall<TeamBillableInfoArguments, TeamBillableInfoResponse>(this, 'team.billableInfo'),
    billing: {
      /**
       * @description Reads a workspace's billing plan information.
       * @see {@link https://api.slack.com/methods/team.billing.info `team.billing.info` API reference}.
       */
      info: bindApiCall<TeamBillingInfoArguments, TeamBillingInfoResponse>(this, 'team.billing.info'),
    },
    /**
     * @description Gets information about the current team.
     * @see {@link https://api.slack.com/methods/team.info `team.info` API reference}.
     */
    info: bindApiCall<TeamInfoArguments, TeamInfoResponse>(this, 'team.info'),
    /**
     * @description Gets the integration logs for the current team.
     * @see {@link https://api.slack.com/methods/team.integrationLogs `team.integrationLogs` API reference}.
     */
    integrationLogs:
      bindApiCall<TeamIntegrationLogsArguments, TeamIntegrationLogsResponse>(this, 'team.integrationLogs'),
    preferences: {
      /**
       * @description Retrieve a list of a workspace's team preferences.
       * @see {@link https://api.slack.com/methods/team.preferences.list `team.preferences.list` API reference}.
       */
      list: bindApiCall<TeamPreferencesListArguments, TeamPreferencesListResponse>(this, 'team.preferences.list'),
    },
    profile: {
      /**
       * @description Retrieve a team's profile.
       * @see {@link https://api.slack.com/methods/team.profile.get `team.profile.get` API reference}.
       */
      get: bindApiCall<TeamProfileGetArguments, TeamProfileGetResponse>(this, 'team.profile.get'),
    },
  };

  public readonly tooling = {
    tokens: {
      /**
       * @description Exchanges a refresh token for a new app configuration token.
       * @see {@link https://api.slack.com/methods/tooling.tokens.rotate `tooling.tokens.rotate` API reference}.
       */
      rotate: bindApiCall<ToolingTokensRotateArguments, ToolingTokensRotateResponse>(this, 'tooling.tokens.rotate'),
    },
  };

  public readonly usergroups = {
    /**
     * @description Create a User Group.
     * @see {@link https://api.slack.com/methods/usergroups.create `usergroups.create` API reference}.
     */
    create: bindApiCall<UsergroupsCreateArguments, UsergroupsCreateResponse>(this, 'usergroups.create'),
    /**
     * @description Disable an existing User Group.
     * @see {@link https://api.slack.com/methods/usergroups.disable `usergroups.disable` API reference}.
     */
    disable: bindApiCall<UsergroupsDisableArguments, UsergroupsDisableResponse>(this, 'usergroups.disable'),
    /**
     * @description Enable an existing User Group.
     * @see {@link https://api.slack.com/methods/usergroups.enable `usergroups.enable` API reference}.
     */
    enable: bindApiCall<UsergroupsEnableArguments, UsergroupsEnableResponse>(this, 'usergroups.enable'),
    /**
     * @description List all User Groups for a team.
     * @see {@link https://api.slack.com/methods/usergroups.list `usergroups.list` API reference}.
     */
    list: bindApiCall<UsergroupsListArguments, UsergroupsListResponse>(this, 'usergroups.list'),
    /**
     * @description Update an existing User Group.
     * @see {@link https://api.slack.com/methods/usergroups.update `usergroups.update` API reference}.
     */
    update: bindApiCall<UsergroupsUpdateArguments, UsergroupsUpdateResponse>(this, 'usergroups.update'),
    users: {
      /**
       * @description List all users in a User Group.
       * @see {@link https://api.slack.com/methods/usergroups.users.list `usergroups.users.list` API reference}.
       */
      list: bindApiCall<UsergroupsUsersListArguments, UsergroupsUsersListResponse>(
        this,
        'usergroups.users.list',
      ),
      /**
       * @description Update the list of users in a User Group.
       * @see {@link https://api.slack.com/methods/usergroups.users.update `usergroups.users.update` API reference}.
       */
      update: bindApiCall<UsergroupsUsersUpdateArguments, UsergroupsUsersUpdateResponse>(
        this,
        'usergroups.users.update',
      ),
    },
  };

  public readonly users = {
    /**
     * @description List conversations the calling user may access.
     * @see {@link https://api.slack.com/methods/users.conversations `users.conversations` API reference}.
     */
    conversations: bindApiCall<UsersConversationsArguments, UsersConversationsResponse>(this, 'users.conversations'),
    /**
     * @description Delete the user profile photo.
     * @see {@link https://api.slack.com/methods/users.deletePhoto `users.deletePhoto` API reference}.
     */
    deletePhoto: bindApiCall<UsersDeletePhotoArguments, UsersDeletePhotoResponse>(this, 'users.deletePhoto'),
    /**
     * @description Gets user presence information.
     * @see {@link https://api.slack.com/methods/users.getPresence `users.getPresence` API reference}.
     */
    getPresence: bindApiCall<UsersGetPresenceArguments, UsersGetPresenceResponse>(this, 'users.getPresence'),
    /**
     * @description Get a user's identity.
     * @see {@link https://api.slack.com/methods/users.identity `users.identity` API reference}.
     */
    identity: bindApiCall<UsersIdentityArguments, UsersIdentityResponse>(this, 'users.identity'),
    /**
     * @description Gets information about a user.
     * @see {@link https://api.slack.com/methods/users.info `users.info` API reference}.
     */
    info: bindApiCall<UsersInfoArguments, UsersInfoResponse>(this, 'users.info'),
    /**
     * @description Lists all users in a Slack team.
     * @see {@link https://api.slack.com/methods/users.list `users.list` API reference}.
     */
    list: bindApiCall<UsersListArguments, UsersListResponse>(this, 'users.list'),
    /**
     * @description Find a user with an email address.
     * @see {@link https://api.slack.com/methods/users.lookupByEmail `users.lookupByEmail` API reference}.
     */
    lookupByEmail: bindApiCall<UsersLookupByEmailArguments, UsersLookupByEmailResponse>(this, 'users.lookupByEmail'),
    /**
     * @description Set the user profile photo.
     * @see {@link https://api.slack.com/methods/users.setPhoto `users.setPhoto` API reference}.
     */
    setPhoto: bindApiCall<UsersSetPhotoArguments, UsersSetPhotoResponse>(this, 'users.setPhoto'),
    /**
     * @description Manually sets user presence.
     * @see {@link https://api.slack.com/methods/users.setPresence `users.setPresence` API reference}.
     */
    setPresence: bindApiCall<UsersSetPresenceArguments, UsersSetPresenceResponse>(this, 'users.setPresence'),
    profile: {
      /**
       * @description Retrieve a user's profile information, including their custom status.
       * @see {@link https://api.slack.com/methods/users.profile.get `users.profile.get` API reference}.
       */
      get: bindApiCall<UsersProfileGetArguments, UsersProfileGetResponse>(this, 'users.profile.get'),
      /**
       * @description Set a user's profile information, including custom status.
       * @see {@link https://api.slack.com/methods/users.profile.set `users.profile.set` API reference}.
       */
      set: bindApiCall<UsersProfileSetArguments, UsersProfileSetResponse>(this, 'users.profile.set'),
    },
  };

  public readonly views = {
    /**
     * @description Open a view for a user.
     * @see {@link https://api.slack.com/methods/views.open `views.open` API reference}.
     */
    open: bindApiCall<ViewsOpenArguments, ViewsOpenResponse>(this, 'views.open'),
    /**
     * @description Publish a static view for a user.
     * @see {@link https://api.slack.com/methods/views.publish `views.publish` API reference}.
     */
    publish: bindApiCall<ViewsPublishArguments, ViewsPublishResponse>(this, 'views.publish'),
    /**
     * @description Push a view onto the stack of a root view.
     * @see {@link https://api.slack.com/methods/views.push `views.push` API reference}.
     */
    push: bindApiCall<ViewsPushArguments, ViewsPushResponse>(this, 'views.push'),
    /**
     * @description Update an existing view.
     * @see {@link https://api.slack.com/methods/views.update `views.update` API reference}.
     */
    update: bindApiCall<ViewsUpdateArguments, ViewsUpdateResponse>(this, 'views.update'),
  };

  // ------------------
  // Deprecated methods
  // ------------------
  // TODO: breaking changes for future majors:
  // - stars.* methods are marked as deprecated; once Later has APIs, these will see an official sunsetting timeline
  // - workflows.* methods, Sep 12 2024: https://api.slack.com/changelog/2023-08-workflow-steps-from-apps-step-back

  public readonly stars = {
    /**
     * @description Save an item for later. Formerly known as adding a star.
     * @deprecated Stars can still be added but they can no longer be viewed or interacted with by end-users.
     * See {@link https://api.slack.com/changelog/2023-07-its-later-already-for-stars-and-reminders our post on stars and the Later list}.
     * @see {@link https://api.slack.com/methods/stars.add `stars.add` API reference}.
     */
    add: bindApiCall<StarsAddRemoveArguments, StarsAddResponse>(this, 'stars.add'),
    /**
     * @description List a user's saved items, formerly known as stars.
     * @deprecated Stars can still be listed but they can no longer be viewed or interacted with by end-users.
     * See {@link https://api.slack.com/changelog/2023-07-its-later-already-for-stars-and-reminders our post on stars and the Later list}.
     * @see {@link https://api.slack.com/methods/stars.list `stars.list` API reference}.
     */
    list: bindApiCall<StarsListArguments, StarsListResponse>(this, 'stars.list'),
    /**
     * @description Remove a saved item from a user's saved items, formerly known as stars.
     * @deprecated Stars can still be removed but they can no longer be viewed or interacted with by end-users.
     * See {@link https://api.slack.com/changelog/2023-07-its-later-already-for-stars-and-reminders our post on stars and the Later list}.
     * @see {@link https://api.slack.com/methods/stars.remove `stars.remove` API reference}.
     */
    remove: bindApiCall<StarsAddRemoveArguments, StarsRemoveResponse>(this, 'stars.remove'),
  };

  public readonly workflows = {
    /**
     * @description Indicate that an app's step in a workflow completed execution.
     * @deprecated Steps from Apps is deprecated.
     * We're retiring all Slack app functionality around Steps from Apps in September 2024.
     * See {@link https://api.slack.com/changelog/2023-08-workflow-steps-from-apps-step-back our post on deprecating Steps from Apps}.
     * @see {@link https://api.slack.com/methods/workflows.stepCompleted `workflows.stepCompleted` API reference}.
     */
    stepCompleted: bindApiCall<WorkflowsStepCompletedArguments, WorkflowsStepCompletedResponse>(
      this,
      'workflows.stepCompleted',
    ),
    /**
     * @description Indicate that an app's step in a workflow failed to execute.
     * @deprecated Steps from Apps is deprecated.
     * We're retiring all Slack app functionality around Steps from Apps in September 2024.
     * See {@link https://api.slack.com/changelog/2023-08-workflow-steps-from-apps-step-back our post on deprecating Steps from Apps}.
     * @see {@link https://api.slack.com/methods/workflows.stepFailed `workflows.stepFailed` API reference}.
     */
    stepFailed: bindApiCall<WorkflowsStepFailedArguments, WorkflowsStepFailedResponse>(this, 'workflows.stepFailed'),
    /**
     * @description Update the configuration for a workflow step.
     * @deprecated Steps from Apps is deprecated.
     * We're retiring all Slack app functionality around Steps from Apps in September 2024.
     * See {@link https://api.slack.com/changelog/2023-08-workflow-steps-from-apps-step-back our post on deprecating Steps from Apps}.
     * @see {@link https://api.slack.com/methods/workflows.updateStep `workflows.updateStep` API reference}.
     */
    updateStep: bindApiCall<WorkflowsUpdateStepArguments, WorkflowsUpdateStepResponse>(this, 'workflows.updateStep'),
  };
}

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
// https://api.slack.com/methods/admin.conversations.ekm.listOriginalConnectedChannelInfo
export interface AdminConversationsEKMListOriginalConnectedChannelInfoArguments
  extends TokenOverridable, CursorPaginationEnabled {
  channel_ids?: string[];
  team_ids?: string[];
}
// https://api.slack.com/methods/admin.conversations.getConversationPrefs
export interface AdminConversationsGetConversationPrefsArguments extends TokenOverridable {
  channel_id: string;
}
// https://api.slack.com/methods/admin.conversations.getTeams
export interface AdminConversationsGetTeamsArguments
  extends TokenOverridable, CursorPaginationEnabled {
  channel_id: string;
}
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
// https://api.slack.com/methods/admin.inviteRequests.list
export interface AdminInviteRequestsListArguments
  extends TokenOverridable, CursorPaginationEnabled {
  team_id: string;
}
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
// https://api.slack.com/methods/admin.roles.removeAssignments
export interface AdminRolesRemoveAssignmentsArguments
  extends TokenOverridable {
  role_id: string;
  entity_ids: string[];
  user_ids: string[];
}
// https://api.slack.com/methods/admin.teams.admins.list
export interface AdminTeamsAdminsListArguments extends TokenOverridable, CursorPaginationEnabled {
  team_id: string;
}
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
// https://api.slack.com/methods/admin.teams.owners.list
export interface AdminTeamsOwnersListArguments extends TokenOverridable, CursorPaginationEnabled {
  team_id: string;
}
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
  include_deactivated_user_workspaces?: boolean;
  is_active?: boolean;
}
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

export interface AppsManifestCreateArguments extends TokenOverridable {
  manifest: string;
}

export interface AppsManifestDeleteArguments extends TokenOverridable {
  app_id: string;
}

export interface AppsManifestExportArguments extends TokenOverridable {
  app_id: string;
}

export interface AppsManifestUpdateArguments extends TokenOverridable {
  app_id: string;
  manifest: string;
}

export interface AppsManifestValidateArguments extends TokenOverridable {
  app_id?: string;
  manifest: string;
}
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

export * from '@slack/types';
