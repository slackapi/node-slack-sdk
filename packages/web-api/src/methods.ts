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
  FunctionsCompleteErrorResponse,
  FunctionsCompleteSuccessResponse,
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
} from './types/response/index';
// Request types
import type {
  WorkflowsStepCompletedArguments,
  WorkflowsStepFailedArguments,
  WorkflowsUpdateStepArguments,
  ViewsUpdateArguments,
  ViewsOpenArguments,
  ViewsPushArguments,
  ViewsPublishArguments,
  UsersConversationsArguments,
  UsersInfoArguments,
  UsersListArguments,
  UsersIdentityArguments,
  UsersSetPhotoArguments,
  UsersProfileGetArguments,
  UsersProfileSetArguments,
  UsersDeletePhotoArguments,
  UsersGetPresenceArguments,
  UsersSetPresenceArguments,
  UsersLookupByEmailArguments,
  ToolingTokensRotateArguments,
  SearchAllArguments,
  SearchFilesArguments,
  SearchMessagesArguments,
  UsergroupsCreateArguments,
  UsergroupsDisableArguments,
  UsergroupsEnableArguments,
  UsergroupsListArguments,
  UsergroupsUpdateArguments,
  UsergroupsUsersListArguments,
  UsergroupsUsersUpdateArguments,
  TeamAccessLogsArguments,
  TeamBillableInfoArguments,
  TeamBillingInfoArguments,
  TeamInfoArguments,
  TeamIntegrationLogsArguments,
  TeamPreferencesListArguments,
  TeamProfileGetArguments,
  StarsAddRemoveArguments,
  StarsListArguments,
  RTMConnectArguments,
  RTMStartArguments,
  RemindersAddArguments,
  RemindersInfoArguments,
  RemindersListArguments,
  RemindersDeleteArguments,
  RemindersCompleteArguments,
  ReactionsAddArguments,
  ReactionsGetArguments,
  ReactionsListArguments,
  ReactionsRemoveArguments,
  PinsAddArguments,
  PinsListArguments,
  PinsRemoveArguments,
  OpenIDConnectTokenArguments,
  OpenIDConnectUserInfoArguments,
  OAuthAccessArguments,
  OAuthV2AccessArguments,
  OAuthV2ExchangeArguments,
  MigrationExchangeArguments,
  FilesDeleteArguments,
  FunctionsCompleteErrorArguments,
  FunctionsCompleteSuccessArguments,
  FilesInfoArguments,
  FilesListArguments,
  FilesRevokePublicURLArguments,
  FilesSharedPublicURLArguments,
  FilesUploadArguments,
  FilesUploadV2Arguments,
  FilesCompleteUploadExternalArguments,
  FilesGetUploadURLExternalArguments,
  FilesCommentsDeleteArguments,
  FilesRemoteUpdateArguments,
  FilesRemoteRemoveArguments,
  FilesRemoteShareArguments,
  FilesRemoteListArguments,
  FilesRemoteInfoArguments,
  FilesRemoteAddArguments,
  EmojiListArguments,
  DndEndDndArguments,
  DndEndSnoozeArguments,
  DndInfoArguments,
  DndSetSnoozeArguments,
  DndTeamInfoArguments,
  DialogOpenArguments,
  ConversationsAcceptSharedInviteArguments,
  ConversationsApproveSharedInviteArguments,
  ConversationsArchiveArguments,
  ConversationsCloseArguments,
  ConversationsCreateArguments,
  ConversationsDeclineSharedInviteArguments,
  ConversationsHistoryArguments,
  ConversationsInfoArguments,
  ConversationsInviteArguments,
  ConversationsInviteSharedArguments,
  ConversationsJoinArguments,
  ConversationsKickArguments,
  ConversationsLeaveArguments,
  ConversationsListArguments,
  ConversationsListConnectInvitesArguments,
  ConversationsMarkArguments,
  ConversationsMembersArguments,
  ConversationsOpenArguments,
  ConversationsRenameArguments,
  ConversationsRepliesArguments,
  ConversationsSetPurposeArguments,
  ConversationsSetTopicArguments,
  ConversationsUnarchiveArguments,
  ChatDeleteArguments,
  ChatDeleteScheduledMessageArguments,
  ChatGetPermalinkArguments,
  ChatMeMessageArguments,
  ChatPostEphemeralArguments,
  ChatPostMessageArguments,
  ChatScheduleMessageArguments,
  ChatScheduledMessagesListArguments,
  ChatUnfurlArguments,
  ChatUpdateArguments,
  CallsAddArguments,
  CallsEndArguments,
  CallsInfoArguments,
  CallsUpdateArguments,
  CallsParticipantsAddArguments,
  CallsParticipantsRemoveArguments,
  BotsInfoArguments,
  BookmarksAddArguments,
  BookmarksEditArguments,
  BookmarksListArguments,
  BookmarksRemoveArguments,
  AuthRevokeArguments,
  AuthTestArguments,
  AuthTeamsListArguments,
  AppsConnectionsOpenArguments,
  AppsEventAuthorizationsListArguments,
  AppsManifestCreateArguments,
  AppsManifestDeleteArguments,
  AppsManifestExportArguments,
  AppsManifestUpdateArguments,
  AppsManifestValidateArguments,
  AppsUninstallArguments,
  APITestArguments,
  AdminAnalyticsGetFileArguments,
  AdminAppsActivitiesListArguments,
  AdminAppsApproveArguments,
  AdminAppsApprovedListArguments,
  AdminAppsClearResolutionArguments,
  AdminAppsConfigLookupArguments,
  AdminAppsConfigSetArguments,
  AdminAppsRequestsCancelArguments,
  AdminAppsRequestsListArguments,
  AdminAppsRestrictArguments,
  AdminAppsRestrictedListArguments,
  AdminAppsUninstallArguments,
  AdminAuthPolicyAssignEntitiesArguments,
  AdminAuthPolicyGetEntitiesArguments,
  AdminAuthPolicyRemoveEntitiesArguments,
  AdminBarriersCreateArguments,
  AdminBarriersDeleteArguments,
  AdminBarriersListArguments,
  AdminBarriersUpdateArguments,
  AdminConversationsArchiveArguments,
  AdminConversationsBulkArchiveArguments,
  AdminConversationsBulkDeleteArguments,
  AdminConversationsBulkMoveArguments,
  AdminConversationsConvertToPrivateArguments,
  AdminConversationsConvertToPublicArguments,
  AdminConversationsCreateArguments,
  AdminConversationsDeleteArguments,
  AdminConversationsDisconnectSharedArguments,
  AdminConversationsEKMListOriginalConnectedChannelInfoArguments,
  AdminConversationsGetConversationPrefsArguments,
  AdminConversationsGetCustomRetentionArguments,
  AdminConversationsGetTeamsArguments,
  AdminConversationsInviteArguments,
  AdminConversationsLookupArguments,
  AdminConversationsRemoveCustomRetentionArguments,
  AdminConversationsRenameArguments,
  AdminConversationsRestrictAccessAddGroupArguments,
  AdminConversationsRestrictAccessListGroupsArguments,
  AdminConversationsRestrictAccessRemoveGroupArguments,
  AdminConversationsSearchArguments,
  AdminConversationsSetConversationPrefsArguments,
  AdminConversationsSetCustomRetentionArguments,
  AdminConversationsSetTeamsArguments,
  AdminConversationsUnarchiveArguments,
  AdminEmojiAddArguments,
  AdminEmojiAddAliasArguments,
  AdminEmojiListArguments,
  AdminEmojiRemoveArguments,
  AdminEmojiRenameArguments,
  AdminFunctionsListArguments,
  AdminFunctionsPermissionsLookupArguments,
  AdminFunctionsPermissionsSetArguments,
  AdminInviteRequestsApproveArguments,
  AdminInviteRequestsApprovedListArguments,
  AdminInviteRequestsDeniedListArguments,
  AdminInviteRequestsDenyArguments,
  AdminInviteRequestsListArguments,
  AdminRolesAddAssignmentsArguments,
  AdminRolesListAssignmentsArguments,
  AdminRolesRemoveAssignmentsArguments,
  AdminTeamsAdminsListArguments,
  AdminTeamsCreateArguments,
  AdminTeamsListArguments,
  AdminTeamsOwnersListArguments,
  AdminTeamsSettingsInfoArguments,
  AdminTeamsSettingsSetDefaultChannelsArguments,
  AdminTeamsSettingsSetDescriptionArguments,
  AdminTeamsSettingsSetDiscoverabilityArguments,
  AdminTeamsSettingsSetIconArguments,
  AdminTeamsSettingsSetNameArguments,
  AdminUsergroupsAddChannelsArguments,
  AdminUsergroupsAddTeamsArguments,
  AdminUsergroupsListChannelsArguments,
  AdminUsergroupsRemoveChannelsArguments,
  AdminUsersAssignArguments,
  AdminUsersInviteArguments,
  AdminUsersListArguments,
  AdminUsersRemoveArguments,
  AdminUsersSessionListArguments,
  AdminUsersSessionClearSettingsArguments,
  AdminUsersSessionGetSettingsArguments,
  AdminUsersSessionInvalidateArguments,
  AdminUsersSessionResetArguments,
  AdminUsersSessionResetBulkArguments,
  AdminUsersSessionSetSettingsArguments,
  AdminUsersSetAdminArguments,
  AdminUsersSetExpirationArguments,
  AdminUsersSetOwnerArguments,
  AdminUsersSetRegularArguments,
  AdminUsersUnsupportedVersionsExportArguments,
  AdminWorkflowsCollaboratorsAddArguments,
  AdminWorkflowsCollaboratorsRemoveArguments,
  AdminWorkflowsPermissionsLookupArguments,
  AdminWorkflowsSearchArguments,
  AdminWorkflowsUnpublishArguments,
} from './types/request/index';

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
      /**
       * @description Retrieve analytics data for a given date, presented as a compressed JSON file.
       * @see {@link https://api.slack.com/methods/api.test `api.test` API reference}.
       */
      getFile: bindApiCall<AdminAnalyticsGetFileArguments, AdminAnalyticsGetFileResponse>(this, 'admin.analytics.getFile'),
    },
    apps: {
      activities: {
        /**
         * @description Get logs for a specified team/org.
         * @see {@link https://api.slack.com/methods/admin.apps.activities.list `admin.apps.activities.list` API reference}.
         */
        list: bindApiCall<AdminAppsActivitiesListArguments, AdminAppsActivitiesListResponse>(this, 'admin.apps.activities.list'),
      },
      /**
       * @description Approve an app for installation on a workspace.
       * @see {@link https://api.slack.com/methods/admin.apps.approve `admin.apps.approve` API reference}.
       */
      approve: bindApiCall<AdminAppsApproveArguments, AdminAppsApproveResponse>(this, 'admin.apps.approve'),
      approved: {
        /**
         * @description List approved apps for an org or workspace.
         * @see {@link https://api.slack.com/methods/admin.apps.approved.list `admin.apps.approved.list` API reference}.
         */
        list: bindApiCall<AdminAppsApprovedListArguments, AdminAppsApprovedListResponse>(this, 'admin.apps.approved.list'),
      },
      /**
       * @description Clear an app resolution.
       * @see {@link https://api.slack.com/methods/admin.apps.clearResolution `admin.apps.clearResolution` API reference}.
       */
      clearResolution: bindApiCall<AdminAppsClearResolutionArguments, AdminAppsClearResolutionResponse>(this, 'admin.apps.clearResolution'),
      config: {
        /**
         * @description Look up the app config for connectors by their IDs.
         * @see {@link https://api.slack.com/methods/admin.apps.config.lookup `admin.apps.config.lookup` API reference}.
         */
        lookup: bindApiCall<AdminAppsConfigLookupArguments, AdminAppsConfigLookupResponse>(this, 'admin.apps.config.lookup'),
        /**
         * @description Set the app config for a connector.
         * @see {@link https://api.slack.com/methods/admin.apps.config.set `admin.apps.config.set` API reference}.
         */
        set: bindApiCall<AdminAppsConfigSetArguments, AdminAppsConfigSetResponse>(this, 'admin.apps.config.set'),
      },
      requests: {
        /**
         * @description Cancel app request for team.
         * @see {@link https://api.slack.com/methods/admin.apps.requests.cancel `admin.apps.requests.cancel` API reference}.
         */
        cancel: bindApiCall<AdminAppsRequestsCancelArguments, AdminAppsRequestsCancelResponse>(this, 'admin.apps.requests.cancel'),
        /**
         * @description List app requests for a team/workspace.
         * @see {@link https://api.slack.com/methods/admin.apps.requests.list `admin.apps.requests.list` API reference}.
         */
        list: bindApiCall<AdminAppsRequestsListArguments, AdminAppsRequestsListResponse>(this, 'admin.apps.requests.list'),
      },
      /**
       * @description Restrict an app for installation on a workspace.
       * @see {@link https://api.slack.com/methods/admin.apps.restrict `admin.apps.restrict` API reference}.
       */
      restrict: bindApiCall<AdminAppsRestrictArguments, AdminAppsRestrictResponse>(this, 'admin.apps.restrict'),
      restricted: {
        /**
         * @description List restricted apps for an org or workspace.
         * @see {@link https://api.slack.com/methods/admin.apps.restricted.list `admin.apps.restricted.list` API reference}.
         */
        list:
          bindApiCall<AdminAppsRestrictedListArguments, AdminAppsRestrictedListResponse>(this, 'admin.apps.restricted.list'),
      },
      /**
       * @description Uninstall an app from one or many workspaces, or an entire enterprise organization.
       * @see {@link https://api.slack.com/methods/admin.apps.uninstall `admin.apps.uninstall` API reference}.
       */
      uninstall: bindApiCall<AdminAppsUninstallArguments, AdminAppsUninstallResponse>(this, 'admin.apps.uninstall'),
    },
    auth: {
      policy: {
        /**
         * @description Assign entities to a particular authentication policy.
         * @see {@link https://api.slack.com/methods/admin.auth.policy.assignEntities `admin.auth.policy.assignEntities` API reference}.
         */
        assignEntities: bindApiCall<AdminAuthPolicyAssignEntitiesArguments, AdminAuthPolicyAssignEntitiesResponse>(this, 'admin.auth.policy.assignEntities'),
        /**
         * @description Fetch all the entities assigned to a particular authentication policy by name.
         * @see {@link https://api.slack.com/methods/admin.auth.policy.getEntities `admin.auth.policy.getEntities` API reference}.
         */
        getEntities: bindApiCall<AdminAuthPolicyGetEntitiesArguments, AdminAuthPolicyGetEntitiesResponse>(this, 'admin.auth.policy.getEntities'),
        /**
         * @description Remove specified entities from a specified authentication policy.
         * @see {@link https://api.slack.com/methods/admin.auth.policy.removeEntities `admin.auth.policy.removeEntities` API reference}.
         */
        removeEntities: bindApiCall<AdminAuthPolicyRemoveEntitiesArguments, AdminAuthPolicyRemoveEntitiesResponse>(this, 'admin.auth.policy.removeEntities'),
      },
    },
    barriers: {
      /**
       * @description Create an Information Barrier.
       * @see {@link https://api.slack.com/methods/admin.barriers.create `admin.barriers.create` API reference}.
       */
      create: bindApiCall<AdminBarriersCreateArguments, AdminBarriersCreateResponse>(this, 'admin.barriers.create'),
      /**
       * @description Delete an existing Information Barrier.
       * @see {@link https://api.slack.com/methods/admin.barriers.delete `admin.barriers.delete` API reference}.
       */
      delete: bindApiCall<AdminBarriersDeleteArguments, AdminBarriersDeleteResponse>(this, 'admin.barriers.delete'),
      /**
       * @description Get all Information Barriers for your organization.
       * @see {@link https://api.slack.com/methods/admin.barriers.list `admin.barriers.list` API reference}.
       */
      list: bindApiCall<AdminBarriersListArguments, AdminBarriersListResponse>(this, 'admin.barriers.list'),
      /**
       * @description Update an existing Information Barrier.
       * @see {@link https://api.slack.com/methods/admin.barriers.update `admin.barriers.update` API reference}.
       */
      update: bindApiCall<AdminBarriersUpdateArguments, AdminBarriersUpdateResponse>(this, 'admin.barriers.update'),
    },
    conversations: {
      /**
       * @description Archive a public or private channel.
       * @see {@link https://api.slack.com/methods/admin.conversations.archive `admin.conversations.archive` API reference}.
       */
      archive: bindApiCall<AdminConversationsArchiveArguments, AdminConversationsArchiveResponse>(this, 'admin.conversations.archive'),
      /**
       * @description Archive public or private channels in bulk.
       * @see {@link https://api.slack.com/methods/admin.conversations.bulkArchive `admin.conversations.bulkArchive` API reference}.
       */
      bulkArchive: bindApiCall<AdminConversationsBulkArchiveArguments, AdminConversationsBulkArchiveResponse>(this, 'admin.conversations.bulkArchive'),
      /**
       * @description Delete public or private channels in bulk.
       * @see {@link https://api.slack.com/methods/admin.conversations.bulkDelet `admin.conversations.bulkDelete` API reference}.
       */
      bulkDelete: bindApiCall<AdminConversationsBulkDeleteArguments, AdminConversationsBulkDeleteResponse>(this, 'admin.conversations.bulkDelete'),
      /**
       * @description Move public or private channels in bulk.
       * @see {@link https://api.slack.com/methods/admin.conversations.bulkMove `admin.conversations.bulkMove` API reference}.
       */
      bulkMove: bindApiCall<AdminConversationsBulkMoveArguments, AdminConversationsBulkMoveResponse>(this, 'admin.conversations.bulkMove'),
      /**
       * @description Convert a public channel to a private channel.
       * @see {@link https://api.slack.com/methods/admin.conversations.convertToPrivate `admin.conversations.convertToPrivate` API reference}.
       */
      convertToPrivate:
        bindApiCall<AdminConversationsConvertToPrivateArguments, AdminConversationsConvertToPrivateResponse>(
          this,
          'admin.conversations.convertToPrivate',
        ),
      /**
       * @description Convert a private channel to a public channel.
       * @see {@link https://api.slack.com/methods/admin.conversations.convertToPublic `admin.conversations.convertToPublic` API reference}.
       */
      convertToPublic:
        bindApiCall<AdminConversationsConvertToPublicArguments, AdminConversationsConvertToPublicResponse>(
          this,
          'admin.conversations.convertToPublic',
        ),
      /**
       * @description Create a public or private channel-based conversation.
       * @see {@link https://api.slack.com/methods/admin.conversations.create `admin.conversations.create` API reference}.
       */
      create: bindApiCall<AdminConversationsCreateArguments, AdminConversationsCreateResponse>(this, 'admin.conversations.create'),
      /**
       * @description Delete a public or private channel.
       * @see {@link https://api.slack.com/methods/admin.conversations.delete `admin.conversations.delete` API reference}.
       */
      delete: bindApiCall<AdminConversationsDeleteArguments, AdminConversationsDeleteResponse>(this, 'admin.conversations.delete'),
      /**
       * @description Disconnect a connected channel from one or more workspaces.
       * @see {@link https://api.slack.com/methods/admin.conversations.disconnectShared `admin.conversations.disconnectShared` API reference}.
       */
      disconnectShared:
        bindApiCall<AdminConversationsDisconnectSharedArguments, AdminConversationsDisconnectSharedResponse>(
          this,
          'admin.conversations.disconnectShared',
        ),
      ekm: {
        /**
         * @description List all disconnected channels — i.e., channels that were once connected to other workspaces
         * and then disconnected — and the corresponding original channel IDs for key revocation with EKM.
         * @see {@link https://api.slack.com/methods/admin.conversations.ekm.listOriginalConnectedChannelInfo `admin.conversations.ekm.listOriginalConnectedChannelInfo` API reference}.
         */
        listOriginalConnectedChannelInfo:
          bindApiCall<AdminConversationsEKMListOriginalConnectedChannelInfoArguments,
          AdminConversationsEkmListOriginalConnectedChannelInfoResponse>(
            this,
            'admin.conversations.ekm.listOriginalConnectedChannelInfo',
          ),
      },
      /**
       * @description Get conversation preferences for a public or private channel.
       * @see {@link https://api.slack.com/methods/admin.conversations.getConversationPrefs `admin.conversations.getConversationPrefs` API reference}.
       */
      getConversationPrefs:
        bindApiCall<AdminConversationsGetConversationPrefsArguments, AdminConversationsGetConversationPrefsResponse>(
          this,
          'admin.conversations.getConversationPrefs',
        ),
      /**
       * @description Get a conversation's retention policy.
       * @see {@link https://api.slack.com/methods/admin.conversations.getCustomRetention `admin.conversations.getCustomRetention` API reference}.
       */
      getCustomRetention:
        bindApiCall<AdminConversationsGetCustomRetentionArguments, AdminConversationsGetCustomRetentionResponse>(
          this,
          'admin.conversations.getCustomRetention',
        ),
      /**
       * @description Get all the workspaces a given public or private channel is connected to within
       * this Enterprise org.
       * @see {@link https://api.slack.com/methods/admin.conversations.getTeams `admin.conversations.getTeams` API reference}.
       */
      getTeams: bindApiCall<AdminConversationsGetTeamsArguments, AdminConversationsGetTeamsResponse>(
        this,
        'admin.conversations.getTeams',
      ),
      /**
       * @description Invite a user to a public or private channel.
       * @see {@link https://api.slack.com/methods/admin.conversations.invite `admin.conversations.invite` API reference}.
       */
      invite: bindApiCall<AdminConversationsInviteArguments, AdminConversationsInviteResponse>(this, 'admin.conversations.invite'),
      /**
       * @description Returns channels on the given team using the filters.
       * @see {@link https://api.slack.com/methods/admin.conversations.lookup `admin.conversations.lookup` API reference}.
       */
      lookup: bindApiCall<AdminConversationsLookupArguments, AdminConversationsLookupResponse>(this, 'admin.conversations.lookup'),
      /**
       * @description Remove a conversation's retention policy.
       * @see {@link https://api.slack.com/methods/admin.conversations.removeCustomRetention `admin.conversations.removeCustomRetention` API reference}.
       */
      removeCustomRetention:
        bindApiCall<AdminConversationsRemoveCustomRetentionArguments, AdminConversationsRemoveCustomRetentionResponse>(
          this,
          'admin.conversations.removeCustomRetention',
        ),
      /**
       * @description Rename a public or private channel.
       * @see {@link https://api.slack.com/methods/admin.conversations.rename `admin.conversations.rename` API reference}.
       */
      rename: bindApiCall<AdminConversationsRenameArguments, AdminConversationsRenameResponse>(this, 'admin.conversations.rename'),
      restrictAccess: {
        /**
         * @description Add an allowlist of IDP groups for accessing a channel.
         * @see {@link https://api.slack.com/methods/admin.conversations.restrictAccess.addGroup `admin.conversations.restrictAccess.addGroup` API reference}.
         */
        addGroup: bindApiCall<AdminConversationsRestrictAccessAddGroupArguments,
        AdminConversationsRestrictAccessAddGroupResponse>(
          this,
          'admin.conversations.restrictAccess.addGroup',
        ),
        /**
         * @description List all IDP Groups linked to a channel.
         * @see {@link https://api.slack.com/methods/admin.conversations.restrictAccess.listGroups `admin.conversations.restrictAccess.listGroups` API reference}.
         */
        listGroups:
          bindApiCall<AdminConversationsRestrictAccessListGroupsArguments,
          AdminConversationsRestrictAccessListGroupsResponse>(
            this,
            'admin.conversations.restrictAccess.listGroups',
          ),
        /**
         * @description Remove a linked IDP group linked from a private channel.
         * @see {@link https://api.slack.com/methods/admin.conversations.restrictAccess.removeGroup `admin.conversations.restrictAccess.removeGroup` API reference}.
         */
        removeGroup:
          bindApiCall<AdminConversationsRestrictAccessRemoveGroupArguments,
          AdminConversationsRestrictAccessRemoveGroupResponse>(
            this,
            'admin.conversations.restrictAccess.removeGroup',
          ),
      },
      /**
       * @description Search for public or private channels in an Enterprise organization.
       * @see {@link https://api.slack.com/methods/admin.conversations.search `admin.conversations.search` API reference}.
       */
      search: bindApiCall<AdminConversationsSearchArguments, AdminConversationsSearchResponse>(this, 'admin.conversations.search'),
      /**
       * @description Set the posting permissions for a public or private channel.
       * @see {@link https://api.slack.com/methods/admin.conversations.setConversationPrefs `admin.conversations.setConversationPrefs` API reference}.
       */
      setConversationPrefs:
        bindApiCall<AdminConversationsSetConversationPrefsArguments, AdminConversationsSetConversationPrefsResponse>(
          this,
          'admin.conversations.setConversationPrefs',
        ),
      /**
       * @description Set a conversation's retention policy.
       * @see {@link https://api.slack.com/methods/admin.conversations.setCustomRetention `admin.conversations.setCustomRetention` API reference}.
       */
      setCustomRetention:
        bindApiCall<AdminConversationsSetCustomRetentionArguments, AdminConversationsSetCustomRetentionResponse>(
          this,
          'admin.conversations.setCustomRetention',
        ),
      /**
       * @description Set the workspaces in an Enterprise grid org that connect to a public or private channel.
       * @see {@link https://api.slack.com/methods/admin.conversations.setTeams `admin.conversations.setTeams` API reference}.
       */
      setTeams: bindApiCall<AdminConversationsSetTeamsArguments, AdminConversationsSetTeamsResponse>(
        this,
        'admin.conversations.setTeams',
      ),
      /**
       * @description Unarchive a public or private channel.
       * @see {@link https://api.slack.com/methods/admin.conversations.unarchive `admin.conversations.unarchive` API reference}.
       */
      unarchive: bindApiCall<AdminConversationsUnarchiveArguments, AdminConversationsUnarchiveResponse>(
        this,
        'admin.conversations.unarchive',
      ),
    },
    emoji: {
      /**
       * @description Add an emoji.
       * @see {@link https://api.slack.com/methods/admin.emoji.add `admin.emoji.add` API reference}.
       */
      add: bindApiCall<AdminEmojiAddArguments, AdminEmojiAddResponse>(this, 'admin.emoji.add'),
      /**
       * @description Add an emoji alias.
       * @see {@link https://api.slack.com/methods/admin.emoji.addAlias `admin.emoji.addAlias` API reference}.
       */
      addAlias: bindApiCall<AdminEmojiAddAliasArguments, AdminEmojiAddAliasResponse>(this, 'admin.emoji.addAlias'),
      /**
       * @description List emoji for an Enterprise Grid organization.
       * @see {@link https://api.slack.com/methods/admin.emoji.list `admin.emoji.list` API reference}.
       */
      list: bindApiCall<AdminEmojiListArguments, AdminEmojiListResponse>(this, 'admin.emoji.list'),
      /**
       * @description Remove an emoji across an Enterprise Grid organization.
       * @see {@link https://api.slack.com/methods/admin.emoji.remove `admin.emoji.remove` API reference}.
       */
      remove: bindApiCall<AdminEmojiRemoveArguments, AdminEmojiRemoveResponse>(this, 'admin.emoji.remove'),
      /**
       * @description Rename an emoji.
       * @see {@link https://api.slack.com/methods/admin.emoji.rename `admin.emoji.rename` API reference}.
       */
      rename: bindApiCall<AdminEmojiRenameArguments, AdminEmojiRenameResponse>(this, 'admin.emoji.rename'),
    },
    functions: {
      /**
       * @description Look up functions by a set of apps.
       * @see {@link https://api.slack.com/methods/admin.functions.list `admin.functions.list` API reference}.
       */
      list: bindApiCall<AdminFunctionsListArguments, AdminFunctionsListResponse>(this, 'admin.functions.list'),
      permissions: {
        /**
         * @description Lookup the visibility of multiple Slack functions and include the users if
         * it is limited to particular named entities.
         * @see {@link https://api.slack.com/methods/admin.functions.permissions.lookup `admin.functions.permissions.lookup` API reference}.
         */
        lookup: bindApiCall<AdminFunctionsPermissionsLookupArguments, AdminFunctionsPermissionsLookupResponse>(this, 'admin.functions.permissions.lookup'),
        /**
         * @description Set the visibility of a Slack function and define the users or workspaces if
         * it is set to named_entities.
         * @see {@link https://api.slack.com/methods/admin.functions.permissions.set `admin.functions.permissions.set` API reference}.
         */
        set: bindApiCall<AdminFunctionsPermissionsSetArguments, AdminFunctionsPermissionsSetResponse>(this, 'admin.functions.permissions.set'),
      },
    },
    inviteRequests: {
      /**
       * @description Approve a workspace invite request.
       * @see {@link https://api.slack.com/methods/admin.inviteRequests.approve `admin.inviteRequests.approve` API reference}.
       */
      approve: bindApiCall<AdminInviteRequestsApproveArguments, AdminInviteRequestsApproveResponse>(
        this,
        'admin.inviteRequests.approve',
      ),
      approved: {
        /**
         * @description List all approved workspace invite requests.
         * @see {@link https://api.slack.com/methods/admin.inviteRequests.approved.list `admin.inviteRequests.approved.list` API reference}.
         */
        list: bindApiCall<AdminInviteRequestsApprovedListArguments, AdminInviteRequestsApprovedListResponse>(
          this,
          'admin.inviteRequests.approved.list',
        ),
      },
      denied: {
        /**
         * @description List all denied workspace invite requests.
         * @see {@link https://api.slack.com/methods/admin.inviteRequests.denied.list `admin.inviteRequests.denied.list` API reference}.
         */
        list: bindApiCall<AdminInviteRequestsDeniedListArguments, AdminInviteRequestsDeniedListResponse>(
          this,
          'admin.inviteRequests.denied.list',
        ),
      },
      /**
       * @description Deny a workspace invite request.
       * @see {@link https://api.slack.com/methods/admin.inviteRequests.deny `admin.inviteRequests.deny` API reference}.
       */
      deny: bindApiCall<AdminInviteRequestsDenyArguments, AdminInviteRequestsDenyResponse>(this, 'admin.inviteRequests.deny'),
      /**
       * @description List all pending workspace invite requests.
       * @see {@link https://api.slack.com/methods/admin.inviteRequests.list `admin.inviteRequests.list` API reference}.
       */
      list: bindApiCall<AdminInviteRequestsListArguments, AdminInviteRequestsListResponse>(this, 'admin.inviteRequests.list'),
    },
    roles: {
      /**
       * @description Adds members to the specified role with the specified scopes.
       * @see {@link https://api.slack.com/methods/admin.roles.addAssignments `admin.roles.addAssignments` API reference}.
       */
      addAssignments: bindApiCall<AdminRolesAddAssignmentsArguments, AdminRolesAddAssignmentsResponse>(this, 'admin.roles.addAssignments'),
      /**
       * @description Lists assignments for all roles across entities.
       * Options to scope results by any combination of roles or entities.
       * @see {@link https://api.slack.com/methods/admin.roles.listAssignments `admin.roles.listAssignments` API reference}.
       */
      listAssignments: bindApiCall<AdminRolesListAssignmentsArguments, AdminRolesListAssignmentsResponse>(this, 'admin.roles.listAssignments'),
      /**
       * @description Removes a set of users from a role for the given scopes and entities.
       * @see {@link https://api.slack.com/methods/admin.roles.removeAssignments `admin.roles.removeAssignments` API reference}.
       */
      removeAssignments: bindApiCall<AdminRolesRemoveAssignmentsArguments, AdminRolesRemoveAssignmentsResponse>(this, 'admin.roles.removeAssignments'),
    },
    teams: {
      admins: {
        /**
         * @description List all of the admins on a given workspace.
         * @see {@link https://api.slack.com/methods/admin.teams.admins.list `admin.teams.admins.list` API reference}.
         */
        list: bindApiCall<AdminTeamsAdminsListArguments, AdminTeamsAdminsListResponse>(this, 'admin.teams.admins.list'),
      },
      /**
       * @description Create an Enterprise team.
       * @see {@link https://api.slack.com/methods/admin.teams.create `admin.teams.create` API reference}.
       */
      create: bindApiCall<AdminTeamsCreateArguments, AdminTeamsCreateResponse>(this, 'admin.teams.create'),
      /**
       * @description List all teams on an Enterprise organization.
       * @see {@link https://api.slack.com/methods/admin.teams.list `admin.teams.list` API reference}.
       */
      list: bindApiCall<AdminTeamsListArguments, AdminTeamsListResponse>(this, 'admin.teams.list'),
      owners: {
        /**
         * @description List all of the owners on a given workspace.
         * @see {@link https://api.slack.com/methods/admin.teams.owners.list `admin.teams.owners.list` API reference}.
         */
        list: bindApiCall<AdminTeamsOwnersListArguments, AdminTeamsOwnersListResponse>(this, 'admin.teams.owners.list'),
      },
      settings: {
        /**
         * @description Fetch information about settings in a workspace.
         * @see {@link https://api.slack.com/methods/admin.teams.owners.list `admin.teams.owners.list` API reference}.
         */
        info: bindApiCall<AdminTeamsSettingsInfoArguments, AdminTeamsSettingsInfoResponse>(this, 'admin.teams.settings.info'),
        /**
         * @description Set the default channels of a workspace.
         * @see {@link https://api.slack.com/methods/admin.teams.settings.setDefaultChannels `admin.teams.settings.setDefaultChannels` API reference}.
         */
        setDefaultChannels:
          bindApiCall<AdminTeamsSettingsSetDefaultChannelsArguments, AdminTeamsSettingsSetDefaultChannelsResponse>(
            this,
            'admin.teams.settings.setDefaultChannels',
          ),
        /**
         * @description Set the description of a given workspace.
         * @see {@link https://api.slack.com/methods/admin.teams.settings.setDescription `admin.teams.settings.setDescription` API reference}.
         */
        setDescription:
          bindApiCall<AdminTeamsSettingsSetDescriptionArguments, AdminTeamsSettingsSetDescriptionResponse>(
            this,
            'admin.teams.settings.setDescription',
          ),
        /**
         * @description Set the discoverability of a given workspace.
         * @see {@link https://api.slack.com/methods/admin.teams.settings.setDiscoverability `admin.teams.settings.setDiscoverability` API reference}.
         */
        setDiscoverability:
          bindApiCall<AdminTeamsSettingsSetDiscoverabilityArguments,
          AdminTeamsSettingsSetDiscoverabilityResponse>(
            this,
            'admin.teams.settings.setDiscoverability',
          ),
        /**
         * @description Sets the icon of a workspace.
         * @see {@link https://api.slack.com/methods/admin.teams.settings.setIcon `admin.teams.settings.setIcon` API reference}.
         */
        setIcon: bindApiCall<AdminTeamsSettingsSetIconArguments, AdminTeamsSettingsSetIconResponse>(
          this,
          'admin.teams.settings.setIcon',
        ),
        /**
         * @description Set the name of a given workspace.
         * @see {@link https://api.slack.com/methods/admin.teams.settings.setName `admin.teams.settings.setName` API reference}.
         */
        setName: bindApiCall<AdminTeamsSettingsSetNameArguments, AdminTeamsSettingsSetNameResponse>(
          this,
          'admin.teams.settings.setName',
        ),
      },
    },
    usergroups: {
      /**
       * @description Add up to one hundred default channels to an IDP group.
       * @see {@link https://api.slack.com/methods/admin.usergroups.addChannels `admin.teams.usergroups.addChannels` API reference}.
       */
      addChannels: bindApiCall<AdminUsergroupsAddChannelsArguments, AdminUsergroupsAddChannelsResponse>(
        this,
        'admin.usergroups.addChannels',
      ),
      /**
       * @description Associate one or more default workspaces with an organization-wide IDP group.
       * @see {@link https://api.slack.com/methods/admin.usergroups.addTeams `admin.teams.usergroups.addTeams` API reference}.
       */
      addTeams: bindApiCall<AdminUsergroupsAddTeamsArguments, AdminUsergroupsAddTeamsResponse>(
        this,
        'admin.usergroups.addTeams',
      ),
      /**
       * @description List the channels linked to an org-level IDP group (user group).
       * @see {@link https://api.slack.com/methods/admin.usergroups.listChannels `admin.teams.usergroups.listChannels` API reference}.
       */
      listChannels: bindApiCall<AdminUsergroupsListChannelsArguments, AdminUsergroupsListChannelsResponse>(
        this,
        'admin.usergroups.listChannels',
      ),
      /**
       * @description Remove one or more default channels from an org-level IDP group (user group).
       * @see {@link https://api.slack.com/methods/admin.usergroups.removeChannels `admin.teams.usergroups.removeChannels` API reference}.
       */
      removeChannels: bindApiCall<AdminUsergroupsRemoveChannelsArguments, AdminUsergroupsRemoveChannelsResponse>(
        this,
        'admin.usergroups.removeChannels',
      ),
    },
    users: {
      /**
       * @description Add an Enterprise user to a workspace.
       * @see {@link https://api.slack.com/methods/admin.users.assign `admin.users.assign` API reference}.
       */
      assign: bindApiCall<AdminUsersAssignArguments, AdminUsersAssignResponse>(this, 'admin.users.assign'),
      /**
       * @description Invite a user to a workspace.
       * @see {@link https://api.slack.com/methods/admin.users.invite `admin.users.invite` API reference}.
       */
      invite: bindApiCall<AdminUsersInviteArguments, AdminUsersInviteResponse>(this, 'admin.users.invite'),
      /**
       * @description List users on a workspace.
       * @see {@link https://api.slack.com/methods/admin.users.list `admin.users.list` API reference}.
       */
      list: bindApiCall<AdminUsersListArguments, AdminUsersListResponse>(this, 'admin.users.list'),
      /**
       * @description Remove a user from a workspace.
       * @see {@link https://api.slack.com/methods/admin.users.remove `admin.users.remove` API reference}.
       */
      remove: bindApiCall<AdminUsersRemoveArguments, AdminUsersRemoveResponse>(this, 'admin.users.remove'),
      session: {
        /**
         * @description Clear user-specific session settings—the session duration and what happens when the client
         * closes—for a list of users.
         * @see {@link https://api.slack.com/methods/admin.users.session.clearSettings `admin.users.session.clearSettings` API reference}.
         */
        clearSettings: bindApiCall<AdminUsersSessionClearSettingsArguments, AdminUsersSessionClearSettingsResponse>(
          this,
          'admin.users.session.clearSettings',
        ),
        /**
         * @description Get user-specific session settings—the session duration and what happens when the client
         * closes—given a list of users.
         * @see {@link https://api.slack.com/methods/admin.users.session.getSettings `admin.users.session.getSettings` API reference}.
         */
        getSettings: bindApiCall<AdminUsersSessionGetSettingsArguments, AdminUsersSessionGetSettingsResponse>(
          this,
          'admin.users.session.getSettings',
        ),
        /**
         * @description Revoke a single session for a user. The user will be forced to login to Slack.
         * @see {@link https://api.slack.com/methods/admin.users.session.invalidate `admin.users.session.invalidate` API reference}.
         */
        invalidate: bindApiCall<AdminUsersSessionInvalidateArguments, AdminUsersSessionInvalidateResponse>(
          this,
          'admin.users.session.invalidate',
        ),
        /**
         * @description List active user sessions for an organization.
         * @see {@link https://api.slack.com/methods/admin.users.session.list `admin.users.session.list` API reference}.
         */
        list: bindApiCall<AdminUsersSessionListArguments, AdminUsersSessionListResponse>(this, 'admin.users.session.list'),
        /**
         * @description Wipes all valid sessions on all devices for a given user.
         * @see {@link https://api.slack.com/methods/admin.users.session.reset `admin.users.session.reset` API reference}.
         */
        reset: bindApiCall<AdminUsersSessionResetArguments, AdminUsersSessionResetResponse>(this, 'admin.users.session.reset'),
        /**
         * @description Enqueues an asynchronous job to wipe all valid sessions on all devices for a given user list.
         * @see {@link https://api.slack.com/methods/admin.users.session.resetBulk `admin.users.session.resetBulk` API reference}.
         */
        resetBulk: bindApiCall<AdminUsersSessionResetBulkArguments, AdminUsersSessionResetBulkResponse>(this, 'admin.users.session.resetBulk'),
        /**
         * @description Configure the user-level session settings—the session duration and what happens when the client
         * closes—for one or more users.
         * @see {@link https://api.slack.com/methods/admin.users.session.setSettings `admin.users.session.setSettings` API reference}.
         */
        setSettings: bindApiCall<AdminUsersSessionSetSettingsArguments, AdminUsersSessionSetSettingsResponse>(
          this,
          'admin.users.session.setSettings',
        ),
      },
      /**
       * @description Set an existing guest, regular user, or owner to be an admin user.
       * @see {@link https://api.slack.com/methods/admin.users.setAdmin `admin.users.setAdmin` API reference}.
       */
      setAdmin: bindApiCall<AdminUsersSetAdminArguments, AdminUsersSetAdminResponse>(this, 'admin.users.setAdmin'),
      /**
       * @description Set an expiration for a guest user.
       * @see {@link https://api.slack.com/methods/admin.users.setExpiration `admin.users.setExpiration` API reference}.
       */
      setExpiration:
        bindApiCall<AdminUsersSetExpirationArguments, AdminUsersSetExpirationResponse>(
          this,
          'admin.users.setExpiration',
        ),
      /**
       * @description Set an existing guest, regular user, or admin user to be a workspace owner.
       * @see {@link https://api.slack.com/methods/admin.users.setOwner `admin.users.setOwner` API reference}.
       */
      setOwner: bindApiCall<AdminUsersSetOwnerArguments, AdminUsersSetOwnerResponse>(
        this,
        'admin.users.setOwner',
      ),
      /**
       * @description Set an existing guest user, admin user, or owner to be a regular user.
       * @see {@link https://api.slack.com/methods/admin.users.setRegular `admin.users.setRegular` API reference}.
       */
      setRegular: bindApiCall<AdminUsersSetRegularArguments, AdminUsersSetRegularResponse>(
        this,
        'admin.users.setRegular',
      ),
      unsupportedVersions: {
        /**
         * @description Ask Slackbot to send you an export listing all workspace members using unsupported software,
         * presented as a zipped CSV file.
         * @see {@link https://api.slack.com/methods/admin.users.unsupportedVersions.export `admin.users.unsupportedVersions.export` API reference}.
         */
        export: bindApiCall<AdminUsersUnsupportedVersionsExportArguments, AdminUsersUnsupportedVersionsExportResponse>(
          this,
          'admin.users.unsupportedVersions.export',
        ),
      },
    },
    workflows: {
      collaborators: {
        /**
         * @description Add collaborators to workflows within the team or enterprise.
         * @see {@link https://api.slack.com/methods/admin.workflows.collaborators.add `admin.workflows.collaborators.add` API reference}.
         */
        add: bindApiCall<AdminWorkflowsCollaboratorsAddArguments, AdminWorkflowsCollaboratorsAddResponse>(this, 'admin.workflows.collaborators.add'),
        /**
         * @description Remove collaborators from workflows within the team or enterprise.
         * @see {@link https://api.slack.com/methods/admin.workflows.collaborators.remove `admin.workflows.collaborators.remove` API reference}.
         */
        remove: bindApiCall<AdminWorkflowsCollaboratorsRemoveArguments, AdminWorkflowsCollaboratorsRemoveResponse>(this, 'admin.workflows.collaborators.remove'),
      },
      permissions: {
        /**
         * @description Look up the permissions for a set of workflows.
         * @see {@link https://api.slack.com/methods/admin.workflows.permissions.lookup `admin.workflows.permissions.lookup` API reference}.
         */
        lookup: bindApiCall<AdminWorkflowsPermissionsLookupArguments, AdminWorkflowsPermissionsLookupResponse>(this, 'admin.workflows.permissions.lookup'),
      },
      /**
       * @description Search workflows within the team or enterprise.
       * @see {@link https://api.slack.com/methods/admin.workflows.search `admin.workflows.search` API reference}.
       */
      search: bindApiCall<AdminWorkflowsSearchArguments, AdminWorkflowsSearchResponse>(this, 'admin.workflows.search'),
      /**
       * @description Unpublish workflows within the team or enterprise.
       * @see {@link https://api.slack.com/methods/admin.workflows.unpublish `admin.workflows.unpublish` API reference}.
       */
      unpublish: bindApiCall<AdminWorkflowsUnpublishArguments, AdminWorkflowsUnpublishResponse>(this, 'admin.workflows.unpublish'),
    },
  };

  public readonly api = {
    /**
     * @description Checks API calling code.
     * @see {@link https://api.slack.com/methods/api.test `api.test` API reference}.
     */
    test: bindApiCall<APITestArguments, ApiTestResponse>(this, 'api.test'),
  };

  public readonly apps = {
    connections: {
      /**
       * @description Generate a temporary Socket Mode WebSocket URL that your app can connect to in order to receive
       * events and interactive payloads over.
       * @see {@link https://api.slack.com/methods/apps.connections.open `apps.connections.open` API reference}.
       */
      open: bindApiCall<AppsConnectionsOpenArguments, AppsConnectionsOpenResponse>(this, 'apps.connections.open'),
    },
    event: {
      authorizations: {
        /**
         * @description Get a list of authorizations for the given event context.
         * Each authorization represents an app installation that the event is visible to.
         * @see {@link https://api.slack.com/methods/apps.event.authorizations.list `apps.event.authorizations.list` API reference}.
         */
        list: bindApiCall<AppsEventAuthorizationsListArguments, AppsEventAuthorizationsListResponse>(
          this,
          'apps.event.authorizations.list',
        ),
      },
    },
    manifest: {
      /**
       * @description Create an app from an app manifest.
       * @see {@link https://api.slack.com/methods/apps.manifest.create `apps.manifest.create` API reference}.
       */
      create: bindApiCall<AppsManifestCreateArguments, AppsManifestCreateResponse>(this, 'apps.manifest.create'),
      /**
       * @description Permanently deletes an app created through app manifests.
       * @see {@link https://api.slack.com/methods/apps.manifest.delete `apps.manifest.delete` API reference}.
       */
      delete: bindApiCall<AppsManifestDeleteArguments, AppsManifestDeleteResponse>(this, 'apps.manifest.delete'),
      /**
       * @description Export an app manifest from an existing app.
       * @see {@link https://api.slack.com/methods/apps.manifest.export `apps.manifest.export` API reference}.
       */
      export: bindApiCall<AppsManifestExportArguments, AppsManifestExportResponse>(this, 'apps.manifest.export'),
      /**
       * @description Update an app from an app manifest.
       * @see {@link https://api.slack.com/methods/apps.manifest.update `apps.manifest.update` API reference}.
       */
      update: bindApiCall<AppsManifestUpdateArguments, AppsManifestUpdateResponse>(this, 'apps.manifest.update'),
      /**
       * @description Validate an app manifest.
       * @see {@link https://api.slack.com/methods/apps.manifest.validate `apps.manifest.validate` API reference}.
       */
      validate: bindApiCall<AppsManifestValidateArguments, AppsManifestValidateResponse>(this, 'apps.manifest.validate'),
    },
    /**
     * @description Uninstalls your app from a workspace.
     * @see {@link https://api.slack.com/methods/apps.uninstall `apps.uninstall` API reference}.
     */
    uninstall: bindApiCall<AppsUninstallArguments, AppsUninstallResponse>(this, 'apps.uninstall'),
  };

  public readonly auth = {
    /**
     * @description Revokes a token.
     * @see {@link https://api.slack.com/methods/auth.revoke `auth.revoke` API reference}.
     */
    revoke: bindApiCall<AuthRevokeArguments, AuthRevokeResponse>(this, 'auth.revoke'),
    teams: {
      /**
       * @description Obtain a full list of workspaces your org-wide app has been approved for.
       * @see {@link https://api.slack.com/methods/auth.teams.list `auth.teams.list` API reference}.
       */
      list: bindApiCall<AuthTeamsListArguments, AuthTeamsListResponse>(this, 'auth.teams.list'),
    },
    test: bindApiCall<AuthTestArguments, AuthTestResponse>(this, 'auth.test'),
  };

  public readonly bookmarks = {
    /**
     * @description Add bookmark to a channel.
     * @see {@link https://api.slack.com/methods/bookmarks.add `bookmarks.add` API reference}.
     */
    add: bindApiCall<BookmarksAddArguments, BookmarksAddResponse>(this, 'bookmarks.add'),
    /**
     * @description Edit bookmark.
     * @see {@link https://api.slack.com/methods/bookmarks.edit `bookmarks.edit` API reference}.
     */
    edit: bindApiCall<BookmarksEditArguments, BookmarksEditResponse>(this, 'bookmarks.edit'),
    /**
     * @description List bookmarks for a channel.
     * @see {@link https://api.slack.com/methods/bookmarks.list `bookmarks.list` API reference}.
     */
    list: bindApiCall<BookmarksListArguments, BookmarksListResponse>(this, 'bookmarks.list'),
    /**
     * @description Remove bookmark from a channel.
     * @see {@link https://api.slack.com/methods/bookmarks.remove `bookmarks.remove` API reference}.
     */
    remove: bindApiCall<BookmarksRemoveArguments, BookmarksRemoveResponse>(this, 'bookmarks.remove'),
  };

  public readonly bots = {
    /**
     * @description Gets information about a bot user.
     * @see {@link https://api.slack.com/methods/bots.info `bots.info` API reference}.
     */
    info: bindApiCall<BotsInfoArguments, BotsInfoResponse>(this, 'bots.info'),
  };

  public readonly calls = {
    /**
     * @description Registers a new Call.
     * @see {@link https://api.slack.com/methods/calls.add `calls.add` API reference}.
     */
    add: bindApiCall<CallsAddArguments, CallsAddResponse>(this, 'calls.add'),
    /**
     * @description Ends a Call.
     * @see {@link https://api.slack.com/methods/calls.end `calls.end` API reference}.
     */
    end: bindApiCall<CallsEndArguments, CallsEndResponse>(this, 'calls.end'),
    /**
     * @description Returns information about a Call.
     * @see {@link https://api.slack.com/methods/calls.info `calls.info` API reference}.
     */
    info: bindApiCall<CallsInfoArguments, CallsInfoResponse>(this, 'calls.info'),
    /**
     * @description Updates information about a Call.
     * @see {@link https://api.slack.com/methods/calls.info `calls.info` API reference}.
     */
    update: bindApiCall<CallsUpdateArguments, CallsUpdateResponse>(this, 'calls.update'),
    participants: {
      /**
       * @description Registers new participants added to a Call.
       * @see {@link https://api.slack.com/methods/calls.participants.add `calls.participants.add` API reference}.
       */
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
     * @deprecated Use `uploadV2` instead. See {@link https://api.slack.com/changelog/2024-04-a-better-way-to-upload-files-is-here-to-stay our post on retiring `files.upload`}.
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

  public readonly functions = {
    /**
     * @description Signal the failure to execute a Custom Function.
     * @see {@link https://api.slack.com/methods/functions.completeError `functions.completeError` API reference}.
     */
    completeError: bindApiCall<FunctionsCompleteErrorArguments, FunctionsCompleteErrorResponse>(this, 'functions.completeError'),
    /**
     * @description Signal the successful completion of a Custom Function.
     * @see {@link https://api.slack.com/methods/functions.completeSuccess `functions.completeSuccess` API reference}.
     */
    completeSuccess: bindApiCall<FunctionsCompleteSuccessArguments, FunctionsCompleteSuccessResponse>(
      this,
      'functions.completeSuccess',
    ),
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

export * from '@slack/types';
