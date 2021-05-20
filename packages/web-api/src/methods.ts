import { Stream } from 'stream';
import { Dialog, View, KnownBlock, Block, MessageAttachment, LinkUnfurls, CallUser } from '@slack/types';
import { WebAPICallOptions, WebAPICallResult, WebClient, WebClientEvent } from './WebClient';
import { EventEmitter } from 'eventemitter3';

import { AdminAppsApproveResponse } from './response/AdminAppsApproveResponse';
import { AdminAppsApprovedListResponse } from './response/AdminAppsApprovedListResponse';
import { AdminAppsRequestsListResponse } from './response/AdminAppsRequestsListResponse';
import { AdminAppsRestrictResponse } from './response/AdminAppsRestrictResponse';
import { AdminAppsRestrictedListResponse } from './response/AdminAppsRestrictedListResponse';
import { AdminBarriersCreateResponse } from './response/AdminBarriersCreateResponse';
import { AdminBarriersDeleteResponse } from './response/AdminBarriersDeleteResponse';
import { AdminBarriersListResponse } from './response/AdminBarriersListResponse';
import { AdminBarriersUpdateResponse } from './response/AdminBarriersUpdateResponse';
import { AdminConversationsArchiveResponse } from './response/AdminConversationsArchiveResponse';
import { AdminConversationsConvertToPrivateResponse } from './response/AdminConversationsConvertToPrivateResponse';
import { AdminConversationsCreateResponse } from './response/AdminConversationsCreateResponse';
import { AdminConversationsDeleteResponse } from './response/AdminConversationsDeleteResponse';
import { AdminConversationsDisconnectSharedResponse } from './response/AdminConversationsDisconnectSharedResponse';
import { AdminConversationsEkmListOriginalConnectedChannelInfoResponse } from './response/AdminConversationsEkmListOriginalConnectedChannelInfoResponse';
import { AdminConversationsGetConversationPrefsResponse } from './response/AdminConversationsGetConversationPrefsResponse';
import { AdminConversationsGetTeamsResponse } from './response/AdminConversationsGetTeamsResponse';
import { AdminConversationsInviteResponse } from './response/AdminConversationsInviteResponse';
import { AdminConversationsRenameResponse } from './response/AdminConversationsRenameResponse';
import { AdminConversationsRestrictAccessAddGroupResponse } from './response/AdminConversationsRestrictAccessAddGroupResponse';
import { AdminConversationsRestrictAccessListGroupsResponse } from './response/AdminConversationsRestrictAccessListGroupsResponse';
import { AdminConversationsRestrictAccessRemoveGroupResponse } from './response/AdminConversationsRestrictAccessRemoveGroupResponse';
import { AdminConversationsSearchResponse } from './response/AdminConversationsSearchResponse';
import { AdminConversationsSetConversationPrefsResponse } from './response/AdminConversationsSetConversationPrefsResponse';
import { AdminConversationsSetTeamsResponse } from './response/AdminConversationsSetTeamsResponse';
import { AdminConversationsUnarchiveResponse } from './response/AdminConversationsUnarchiveResponse';
import { AdminEmojiAddResponse } from './response/AdminEmojiAddResponse';
import { AdminEmojiAddAliasResponse } from './response/AdminEmojiAddAliasResponse';
import { AdminEmojiListResponse } from './response/AdminEmojiListResponse';
import { AdminEmojiRemoveResponse } from './response/AdminEmojiRemoveResponse';
import { AdminEmojiRenameResponse } from './response/AdminEmojiRenameResponse';
import { AdminInviteRequestsApproveResponse } from './response/AdminInviteRequestsApproveResponse';
import { AdminInviteRequestsApprovedListResponse } from './response/AdminInviteRequestsApprovedListResponse';
import { AdminInviteRequestsDeniedListResponse } from './response/AdminInviteRequestsDeniedListResponse';
import { AdminInviteRequestsDenyResponse } from './response/AdminInviteRequestsDenyResponse';
import { AdminInviteRequestsListResponse } from './response/AdminInviteRequestsListResponse';
import { AdminTeamsAdminsListResponse } from './response/AdminTeamsAdminsListResponse';
import { AdminTeamsCreateResponse } from './response/AdminTeamsCreateResponse';
import { AdminTeamsListResponse } from './response/AdminTeamsListResponse';
import { AdminTeamsOwnersListResponse } from './response/AdminTeamsOwnersListResponse';
import { AdminTeamsSettingsInfoResponse } from './response/AdminTeamsSettingsInfoResponse';
import { AdminTeamsSettingsSetDefaultChannelsResponse } from './response/AdminTeamsSettingsSetDefaultChannelsResponse';
import { AdminTeamsSettingsSetDescriptionResponse } from './response/AdminTeamsSettingsSetDescriptionResponse';
import { AdminTeamsSettingsSetDiscoverabilityResponse } from './response/AdminTeamsSettingsSetDiscoverabilityResponse';
import { AdminTeamsSettingsSetIconResponse } from './response/AdminTeamsSettingsSetIconResponse';
import { AdminTeamsSettingsSetNameResponse } from './response/AdminTeamsSettingsSetNameResponse';
import { AdminUsergroupsAddChannelsResponse } from './response/AdminUsergroupsAddChannelsResponse';
import { AdminUsergroupsAddTeamsResponse } from './response/AdminUsergroupsAddTeamsResponse';
import { AdminUsergroupsListChannelsResponse } from './response/AdminUsergroupsListChannelsResponse';
import { AdminUsergroupsRemoveChannelsResponse } from './response/AdminUsergroupsRemoveChannelsResponse';
import { AdminUsersAssignResponse } from './response/AdminUsersAssignResponse';
import { AdminUsersInviteResponse } from './response/AdminUsersInviteResponse';
import { AdminUsersListResponse } from './response/AdminUsersListResponse';
import { AdminUsersRemoveResponse } from './response/AdminUsersRemoveResponse';
import { AdminUsersSessionListResponse } from './response/AdminUsersSessionListResponse';
import { AdminUsersSessionResetResponse } from './response/AdminUsersSessionResetResponse';
import { AdminUsersSessionInvalidateResponse } from './response/AdminUsersSessionInvalidateResponse';
import { AdminUsersSetAdminResponse } from './response/AdminUsersSetAdminResponse';
import { AdminUsersSetExpirationResponse } from './response/AdminUsersSetExpirationResponse';
import { AdminUsersSetOwnerResponse } from './response/AdminUsersSetOwnerResponse';
import { AdminUsersSetRegularResponse } from './response/AdminUsersSetRegularResponse';
import { ApiTestResponse } from './response/ApiTestResponse';
import { AppsConnectionsOpenResponse } from './response/AppsConnectionsOpenResponse';
import { AppsEventAuthorizationsListResponse } from './response/AppsEventAuthorizationsListResponse';
import { AppsUninstallResponse } from './response/AppsUninstallResponse';
import { AuthRevokeResponse } from './response/AuthRevokeResponse';
import { AuthTeamsListResponse } from './response/AuthTeamsListResponse';
import { AuthTestResponse } from './response/AuthTestResponse';
import { BotsInfoResponse } from './response/BotsInfoResponse';
import { CallsAddResponse } from './response/CallsAddResponse';
import { CallsEndResponse } from './response/CallsEndResponse';
import { CallsInfoResponse } from './response/CallsInfoResponse';
import { CallsUpdateResponse } from './response/CallsUpdateResponse';
import { CallsParticipantsAddResponse } from './response/CallsParticipantsAddResponse';
import { CallsParticipantsRemoveResponse } from './response/CallsParticipantsRemoveResponse';
import { ChatDeleteResponse } from './response/ChatDeleteResponse';
import { ChatDeleteScheduledMessageResponse } from './response/ChatDeleteScheduledMessageResponse';
import { ChatGetPermalinkResponse } from './response/ChatGetPermalinkResponse';
import { ChatMeMessageResponse } from './response/ChatMeMessageResponse';
import { ChatPostEphemeralResponse } from './response/ChatPostEphemeralResponse';
import { ChatPostMessageResponse } from './response/ChatPostMessageResponse';
import { ChatScheduleMessageResponse } from './response/ChatScheduleMessageResponse';
import { ChatScheduledMessagesListResponse } from './response/ChatScheduledMessagesListResponse';
import { ChatUnfurlResponse } from './response/ChatUnfurlResponse';
import { ChatUpdateResponse } from './response/ChatUpdateResponse';
import { ConversationsArchiveResponse } from './response/ConversationsArchiveResponse';
import { ConversationsCloseResponse } from './response/ConversationsCloseResponse';
import { ConversationsCreateResponse } from './response/ConversationsCreateResponse';
import { ConversationsHistoryResponse } from './response/ConversationsHistoryResponse';
import { ConversationsInfoResponse } from './response/ConversationsInfoResponse';
import { ConversationsInviteResponse } from './response/ConversationsInviteResponse';
import { ConversationsJoinResponse } from './response/ConversationsJoinResponse';
import { ConversationsKickResponse } from './response/ConversationsKickResponse';
import { ConversationsLeaveResponse } from './response/ConversationsLeaveResponse';
import { ConversationsListResponse } from './response/ConversationsListResponse';
import { ConversationsMarkResponse } from './response/ConversationsMarkResponse';
import { ConversationsMembersResponse } from './response/ConversationsMembersResponse';
import { ConversationsOpenResponse } from './response/ConversationsOpenResponse';
import { ConversationsRenameResponse } from './response/ConversationsRenameResponse';
import { ConversationsRepliesResponse } from './response/ConversationsRepliesResponse';
import { ConversationsSetPurposeResponse } from './response/ConversationsSetPurposeResponse';
import { ConversationsSetTopicResponse } from './response/ConversationsSetTopicResponse';
import { ConversationsUnarchiveResponse } from './response/ConversationsUnarchiveResponse';
import { ViewsOpenResponse } from './response/ViewsOpenResponse';
import { ViewsPublishResponse } from './response/ViewsPublishResponse';
import { ViewsPushResponse } from './response/ViewsPushResponse';
import { ViewsUpdateResponse } from './response/ViewsUpdateResponse';
import { DialogOpenResponse } from './response/DialogOpenResponse';
import { DndEndDndResponse } from './response/DndEndDndResponse';
import { DndEndSnoozeResponse } from './response/DndEndSnoozeResponse';
import { DndInfoResponse } from './response/DndInfoResponse';
import { DndSetSnoozeResponse } from './response/DndSetSnoozeResponse';
import { DndTeamInfoResponse } from './response/DndTeamInfoResponse';
import { EmojiListResponse } from './response/EmojiListResponse';
import { FilesDeleteResponse } from './response/FilesDeleteResponse';
import { FilesInfoResponse } from './response/FilesInfoResponse';
import { FilesListResponse } from './response/FilesListResponse';
import { FilesRevokePublicURLResponse } from './response/FilesRevokePublicURLResponse';
import { FilesSharedPublicURLResponse } from './response/FilesSharedPublicURLResponse';
import { FilesUploadResponse } from './response/FilesUploadResponse';
import { FilesCommentsDeleteResponse } from './response/FilesCommentsDeleteResponse';
import { FilesRemoteInfoResponse } from './response/FilesRemoteInfoResponse';
import { FilesRemoteListResponse } from './response/FilesRemoteListResponse';
import { FilesRemoteAddResponse } from './response/FilesRemoteAddResponse';
import { FilesRemoteUpdateResponse } from './response/FilesRemoteUpdateResponse';
import { FilesRemoteRemoveResponse } from './response/FilesRemoteRemoveResponse';
import { FilesRemoteShareResponse } from './response/FilesRemoteShareResponse';
import { MigrationExchangeResponse } from './response/MigrationExchangeResponse';
import { OauthAccessResponse } from './response/OauthAccessResponse';
import { OauthV2AccessResponse } from './response/OauthV2AccessResponse';
import { PinsAddResponse } from './response/PinsAddResponse';
import { PinsListResponse } from './response/PinsListResponse';
import { PinsRemoveResponse } from './response/PinsRemoveResponse';
import { ReactionsAddResponse } from './response/ReactionsAddResponse';
import { ReactionsGetResponse } from './response/ReactionsGetResponse';
import { ReactionsListResponse } from './response/ReactionsListResponse';
import { ReactionsRemoveResponse } from './response/ReactionsRemoveResponse';
import { RemindersAddResponse } from './response/RemindersAddResponse';
import { RemindersCompleteResponse } from './response/RemindersCompleteResponse';
import { RemindersDeleteResponse } from './response/RemindersDeleteResponse';
import { RemindersInfoResponse } from './response/RemindersInfoResponse';
import { RemindersListResponse } from './response/RemindersListResponse';
import { RtmConnectResponse } from './response/RtmConnectResponse';
import { RtmStartResponse } from './response/RtmStartResponse';
import { SearchAllResponse } from './response/SearchAllResponse';
import { SearchFilesResponse } from './response/SearchFilesResponse';
import { SearchMessagesResponse } from './response/SearchMessagesResponse';
import { StarsAddResponse } from './response/StarsAddResponse';
import { StarsListResponse } from './response/StarsListResponse';
import { StarsRemoveResponse } from './response/StarsRemoveResponse';
import { TeamAccessLogsResponse } from './response/TeamAccessLogsResponse';
import { TeamBillableInfoResponse } from './response/TeamBillableInfoResponse';
import { TeamInfoResponse } from './response/TeamInfoResponse';
import { TeamIntegrationLogsResponse } from './response/TeamIntegrationLogsResponse';
import { TeamProfileGetResponse } from './response/TeamProfileGetResponse';
import { UsergroupsCreateResponse } from './response/UsergroupsCreateResponse';
import { UsergroupsDisableResponse } from './response/UsergroupsDisableResponse';
import { UsergroupsEnableResponse } from './response/UsergroupsEnableResponse';
import { UsergroupsListResponse } from './response/UsergroupsListResponse';
import { UsergroupsUpdateResponse } from './response/UsergroupsUpdateResponse';
import { UsergroupsUsersListResponse } from './response/UsergroupsUsersListResponse';
import { UsergroupsUsersUpdateResponse } from './response/UsergroupsUsersUpdateResponse';
import { UsersConversationsResponse } from './response/UsersConversationsResponse';
import { UsersDeletePhotoResponse } from './response/UsersDeletePhotoResponse';
import { UsersGetPresenceResponse } from './response/UsersGetPresenceResponse';
import { UsersIdentityResponse } from './response/UsersIdentityResponse';
import { UsersInfoResponse } from './response/UsersInfoResponse';
import { UsersListResponse } from './response/UsersListResponse';
import { UsersLookupByEmailResponse } from './response/UsersLookupByEmailResponse';
import { UsersSetPhotoResponse } from './response/UsersSetPhotoResponse';
import { UsersSetPresenceResponse } from './response/UsersSetPresenceResponse';
import { UsersProfileGetResponse } from './response/UsersProfileGetResponse';
import { UsersProfileSetResponse } from './response/UsersProfileSetResponse';
import { WorkflowsStepCompletedResponse } from './response/WorkflowsStepCompletedResponse';
import { WorkflowsStepFailedResponse } from './response/WorkflowsStepFailedResponse';
import { WorkflowsUpdateStepResponse } from './response/WorkflowsUpdateStepResponse';
import { AdminUsersSessionGetSettingsResponse } from './response/AdminUsersSessionGetSettingsResponse';
import { AdminUsersSessionSetSettingsResponse } from './response/AdminUsersSessionSetSettingsResponse';
import { AdminUsersSessionClearSettingsResponse } from './response/AdminUsersSessionClearSettingsResponse';
import { AdminAppsClearResolutionResponse } from './response/AdminAppsClearResolutionResponse';
import { AdminAppsUninstallResponse } from './response/AdminAppsUninstallResponse';

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

  public abstract apiCall(method: string, options?: WebAPICallOptions): Promise<WebAPICallResult>;

  public readonly admin = {
    // TODO: admin.analytics.getFile
    apps: {
      approve: bindApiCall<AdminAppsApproveArguments, AdminAppsApproveResponse>(this, 'admin.apps.approve'),
      approved: {
        list: bindApiCall<AdminAppsApprovedListArguments, AdminAppsApprovedListResponse>(this, 'admin.apps.approved.list'),
      },
      clearResolution: bindApiCall<AdminAppsClearResolutionArguments, AdminAppsClearResolutionResponse>(this, 'admin.apps.clearResolution'),
      requests: {
        list: bindApiCall<AdminAppsRequestsListArguments, AdminAppsRequestsListResponse>(this, 'admin.apps.requests.list'),
      },
      restrict: bindApiCall<AdminAppsRestrictArguments, AdminAppsRestrictResponse>(this, 'admin.apps.restrict'),
      restricted: {
        list:
          bindApiCall<AdminAppsRestrictedListArguments, AdminAppsRestrictedListResponse>(this, 'admin.apps.restricted.list'),
      },
      uninstall: bindApiCall<AdminAppsUninstallArguments, AdminAppsUninstallResponse>(this, 'admin.apps.uninstall'),
    },
    barriers: {
      create: bindApiCall<AdminBarriersCreateArguments, AdminBarriersCreateResponse>(this, 'admin.barriers.create'),
      delete: bindApiCall<AdminBarriersDeleteArguments, AdminBarriersDeleteResponse>(this, 'admin.barriers.delete'),
      list: bindApiCall<AdminBarriersListArguments, AdminBarriersListResponse>(this, 'admin.barriers.list'),
      update: bindApiCall<AdminBarriersUpdateArguments, AdminBarriersUpdateResponse>(this, 'admin.barriers.update'),
    },
    conversations: {
      archive: bindApiCall<AdminConversationsArchiveArguments, AdminConversationsArchiveResponse>(this, 'admin.conversations.archive'),
      convertToPrivate:
        bindApiCall<AdminConversationsConvertToPrivateArguments, AdminConversationsConvertToPrivateResponse>(
          this, 'admin.conversations.convertToPrivate'),
      create: bindApiCall<AdminConversationsCreateArguments, AdminConversationsCreateResponse>(this, 'admin.conversations.create'),
      delete: bindApiCall<AdminConversationsDeleteArguments, AdminConversationsDeleteResponse>(this, 'admin.conversations.delete'),
      disconnectShared:
        bindApiCall<AdminConversationsDisconnectSharedArguments, AdminConversationsDisconnectSharedResponse>(
          this, 'admin.conversations.disconnectShared'),
      ekm: {
        listOriginalConnectedChannelInfo:
          bindApiCall<AdminConversationsEKMListOriginalConnectedChannelInfoArguments,
            AdminConversationsEkmListOriginalConnectedChannelInfoResponse>(
              this, 'admin.conversations.ekm.listOriginalConnectedChannelInfo'),
      },
      getConversationPrefs:
        bindApiCall<AdminConversationsGetConversationPrefsArguments, AdminConversationsGetConversationPrefsResponse>(
          this, 'admin.conversations.getConversationPrefs'),
      getTeams: bindApiCall<AdminConversationsGetTeamsArguments, AdminConversationsGetTeamsResponse>(
        this, 'admin.conversations.getTeams'),
      invite: bindApiCall<AdminConversationsInviteArguments, AdminConversationsInviteResponse>(this, 'admin.conversations.invite'),
      rename: bindApiCall<AdminConversationsRenameArguments, AdminConversationsRenameResponse>(this, 'admin.conversations.rename'),
      restrictAccess: {
        addGroup: bindApiCall<AdminConversationsRestrictAccessAddGroupArguments,
          AdminConversationsRestrictAccessAddGroupResponse>(
            this, 'admin.conversations.restrictAccess.addGroup'),
        listGroups:
          bindApiCall<AdminConversationsRestrictAccessListGroupsArguments,
            AdminConversationsRestrictAccessListGroupsResponse>(
              this, 'admin.conversations.restrictAccess.listGroups'),
        removeGroup:
          bindApiCall<AdminConversationsRestrictAccessRemoveGroupArguments,
            AdminConversationsRestrictAccessRemoveGroupResponse>(
              this, 'admin.conversations.restrictAccess.removeGroup'),
      },
      search: bindApiCall<AdminConversationsSearchArguments, AdminConversationsSearchResponse>(this, 'admin.conversations.search'),
      setConversationPrefs:
        bindApiCall<AdminConversationsSetConversationPrefsArguments, AdminConversationsSetConversationPrefsResponse>(
          this, 'admin.conversations.setConversationPrefs'),
      setTeams: bindApiCall<AdminConversationsSetTeamsArguments, AdminConversationsSetTeamsResponse>(
        this, 'admin.conversations.setTeams'),
      unarchive: bindApiCall<AdminConversationsUnarchiveArguments, AdminConversationsUnarchiveResponse>(
        this, 'admin.conversations.unarchive'),
    },
    emoji: {
      add: bindApiCall<AdminEmojiAddArguments, AdminEmojiAddResponse>(this, 'admin.emoji.add'),
      addAlias: bindApiCall<AdminEmojiAddAliasArguments, AdminEmojiAddAliasResponse>(this, 'admin.emoji.addAlias'),
      list: bindApiCall<AdminEmojiListArguments, AdminEmojiListResponse>(this, 'admin.emoji.list'),
      remove: bindApiCall<AdminEmojiRemoveArguments, AdminEmojiRemoveResponse>(this, 'admin.emoji.remove'),
      rename: bindApiCall<AdminEmojiRenameArguments, AdminEmojiRenameResponse>(this, 'admin.emoji.rename'),
    },
    inviteRequests: {
      approve: bindApiCall<AdminInviteRequestsApproveArguments, AdminInviteRequestsApproveResponse>(
        this, 'admin.inviteRequests.approve'),
      approved: {
        list: bindApiCall<AdminInviteRequestsApprovedListArguments, AdminInviteRequestsApprovedListResponse>(
          this, 'admin.inviteRequests.approved.list'),
      },
      denied: {
        list: bindApiCall<AdminInviteRequestsDeniedListArguments, AdminInviteRequestsDeniedListResponse>(
          this, 'admin.inviteRequests.denied.list'),
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
            this, 'admin.teams.settings.setDefaultChannels'),
        setDescription:
          bindApiCall<AdminTeamsSettingsSetDescriptionArguments, AdminTeamsSettingsSetDescriptionResponse>(
            this, 'admin.teams.settings.setDescription'),
        setDiscoverability:
          bindApiCall<AdminTeamsSettingsSetDiscoverabilityArguments,
            AdminTeamsSettingsSetDiscoverabilityResponse>(
              this, 'admin.teams.settings.setDiscoverability'),
        setIcon: bindApiCall<AdminTeamsSettingsSetIconArguments, AdminTeamsSettingsSetIconResponse>(
          this, 'admin.teams.settings.setIcon'),
        setName: bindApiCall<AdminTeamsSettingsSetNameArguments, AdminTeamsSettingsSetNameResponse>(
          this, 'admin.teams.settings.setName'),
      },
    },
    usergroups: {
      addChannels: bindApiCall<AdminUsergroupsAddChannelsArguments, AdminUsergroupsAddChannelsResponse>(
        this, 'admin.usergroups.addChannels'),
      addTeams: bindApiCall<AdminUsergroupsAddTeamsArguments, AdminUsergroupsAddTeamsResponse>(
        this, 'admin.usergroups.addTeams'),
      listChannels: bindApiCall<AdminUsergroupsListChannelsArguments, AdminUsergroupsListChannelsResponse>(
        this, 'admin.usergroups.listChannels'),
      removeChannels: bindApiCall<AdminUsergroupsRemoveChannelsArguments, AdminUsergroupsRemoveChannelsResponse>(
        this, 'admin.usergroups.removeChannels'),
    },
    users: {
      assign: bindApiCall<AdminUsersAssignArguments, AdminUsersAssignResponse>(this, 'admin.users.assign'),
      invite: bindApiCall<AdminUsersInviteArguments, AdminUsersInviteResponse>(this, 'admin.users.invite'),
      list: bindApiCall<AdminUsersListArguments, AdminUsersListResponse>(this, 'admin.users.list'),
      remove: bindApiCall<AdminUsersRemoveArguments, AdminUsersRemoveResponse>(this, 'admin.users.remove'),
      session: {
        list: bindApiCall<AdminUsersSessionListArguments, AdminUsersSessionListResponse>(this, 'admin.users.session.list'),
        reset: bindApiCall<AdminUsersSessionResetArguments, AdminUsersSessionResetResponse>(this, 'admin.users.session.reset'),
        invalidate: bindApiCall<AdminUsersSessionInvalidateArguments, AdminUsersSessionInvalidateResponse>(
          this, 'admin.users.session.invalidate'),
        getSettings: bindApiCall<AdminUsersSessionGetSettingsArguments, AdminUsersSessionGetSettingsResponse>(
          this, 'admin.users.session.getSettings'),
        setSettings: bindApiCall<AdminUsersSessionSetSettingsArguments, AdminUsersSessionSetSettingsResponse>(
          this, 'admin.users.session.setSettings'),
        clearSettings: bindApiCall<AdminUsersSessionClearSettingsArguments, AdminUsersSessionClearSettingsResponse>(
          this, 'admin.users.session.clearSettings'),
      },
      setAdmin: bindApiCall<AdminUsersSetAdminArguments, AdminUsersSetAdminResponse>(this, 'admin.users.setAdmin'),
      setExpiration:
        bindApiCall<AdminUsersSetExpirationArguments, AdminUsersSetExpirationResponse>(
          this, 'admin.users.setExpiration'),
      setOwner: bindApiCall<AdminUsersSetOwnerArguments, AdminUsersSetOwnerResponse>(
        this, 'admin.users.setOwner'),
      setRegular: bindApiCall<AdminUsersSetRegularArguments, AdminUsersSetRegularResponse>(
        this, 'admin.users.setRegular'),
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
          this, 'apps.event.authorizations.list'),
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
      this, 'chat.scheduleMessage'),
    scheduledMessages: {
      list:
        bindApiCall<ChatScheduledMessagesListArguments, ChatScheduledMessagesListResponse>(
          this, 'chat.scheduledMessages.list'),
    },
    unfurl: bindApiCall<ChatUnfurlArguments, ChatUnfurlResponse>(this, 'chat.unfurl'),
    update: bindApiCall<ChatUpdateArguments, ChatUpdateResponse>(this, 'chat.update'),
  };

  public readonly conversations = {
    archive: bindApiCall<ConversationsArchiveArguments, ConversationsArchiveResponse>(this, 'conversations.archive'),
    close: bindApiCall<ConversationsCloseArguments, ConversationsCloseResponse>(this, 'conversations.close'),
    create: bindApiCall<ConversationsCreateArguments, ConversationsCreateResponse>(this, 'conversations.create'),
    history: bindApiCall<ConversationsHistoryArguments, ConversationsHistoryResponse>(this, 'conversations.history'),
    info: bindApiCall<ConversationsInfoArguments, ConversationsInfoResponse>(this, 'conversations.info'),
    invite: bindApiCall<ConversationsInviteArguments, ConversationsInviteResponse>(this, 'conversations.invite'),
    join: bindApiCall<ConversationsJoinArguments, ConversationsJoinResponse>(this, 'conversations.join'),
    kick: bindApiCall<ConversationsKickArguments, ConversationsKickResponse>(this, 'conversations.kick'),
    leave: bindApiCall<ConversationsLeaveArguments, ConversationsLeaveResponse>(this, 'conversations.leave'),
    list: bindApiCall<ConversationsListArguments, ConversationsListResponse>(this, 'conversations.list'),
    mark: bindApiCall<ConversationsMarkArguments, ConversationsMarkResponse>(this, 'conversations.mark'),
    members: bindApiCall<ConversationsMembersArguments, ConversationsMembersResponse>(this, 'conversations.members'),
    open: bindApiCall<ConversationsOpenArguments, ConversationsOpenResponse>(this, 'conversations.open'),
    rename: bindApiCall<ConversationsRenameArguments, ConversationsRenameResponse>(this, 'conversations.rename'),
    replies: bindApiCall<ConversationsRepliesArguments, ConversationsRepliesResponse>(this, 'conversations.replies'),
    setPurpose:
      bindApiCall<ConversationsSetPurposeArguments, ConversationsSetPurposeResponse>(this, 'conversations.setPurpose'),
    setTopic: bindApiCall<ConversationsSetTopicArguments, ConversationsSetTopicResponse>(
      this, 'conversations.setTopic'),
    unarchive: bindApiCall<ConversationsUnarchiveArguments, ConversationsUnarchiveResponse>(
      this, 'conversations.unarchive'),
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
      list: bindApiCall<UsergroupsUsersListArguments, UsergroupsUsersListResponse>(
        this, 'usergroups.users.list'),
      update: bindApiCall<UsergroupsUsersUpdateArguments, UsergroupsUsersUpdateResponse>(
        this, 'usergroups.users.update'),
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
      this, 'workflows.stepCompleted'),
    stepFailed: bindApiCall<WorkflowsStepFailedArguments, WorkflowsStepFailedResponse>(this, 'workflows.stepFailed'),
    updateStep: bindApiCall<WorkflowsUpdateStepArguments, WorkflowsUpdateStepResponse>(this, 'workflows.updateStep'),
  };

  // ---------------------------------
  // Deprecated methods
  // ---------------------------------

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

  public readonly mpim = {
    close: bindApiCall<MPIMCloseArguments, WebAPICallResult>(this, 'mpim.close'),
    history: bindApiCall<MPIMHistoryArguments, WebAPICallResult>(this, 'mpim.history'),
    list: bindApiCall<MPIMListArguments, WebAPICallResult>(this, 'mpim.list'),
    mark: bindApiCall<MPIMMarkArguments, WebAPICallResult>(this, 'mpim.mark'),
    open: bindApiCall<MPIMOpenArguments, WebAPICallResult>(this, 'mpim.open'),
    replies: bindApiCall<MPIMRepliesArguments, WebAPICallResult>(this, 'mpim.replies'),
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
  team_id?: string;
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
export interface AdminAppsClearResolutionArguments extends WebAPICallOptions {
  app_id: string;
  enterprise_id?: string;
  team_id?: string;
}
cursorPaginationEnabledMethods.add('admin.apps.approved.list');
export interface AdminAppsRequestsListArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {
  team_id?: string;
}
cursorPaginationEnabledMethods.add('admin.apps.requests.list');
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

export interface AdminAppsUninstallArguments extends WebAPICallOptions {
  app_id: string;
  enterprise_id?: string;
  team_ids?: string[];
}
export interface AdminBarriersCreateArguments extends WebAPICallOptions, TokenOverridable {
  barriered_from_usergroup_ids: string[];
  primary_usergroup_id: string;
  restricted_subjects: string[];
}

export interface AdminBarriersDeleteArguments extends WebAPICallOptions, TokenOverridable {
  barrier_id: string;
}

export interface AdminBarriersListArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled { }
cursorPaginationEnabledMethods.add('admin.barriers.list');

export interface AdminBarriersUpdateArguments extends WebAPICallOptions, TokenOverridable {
  barrier_id: string;
  barriered_from_usergroup_ids: string[];
  primary_usergroup_id: string;
  restricted_subjects: string[];
}

export interface AdminConversationsArchiveArguments extends WebAPICallOptions, TokenOverridable {
  channel_id: string;
}
export interface AdminConversationsConvertToPrivateArguments extends WebAPICallOptions, TokenOverridable {
  channel_id: string;
}
export interface AdminConversationsCreateArguments extends WebAPICallOptions, TokenOverridable {
  is_private: boolean;
  name: string;
  description?: string;
  org_wide?: boolean;
  team_id?: string;
}
export interface AdminConversationsDeleteArguments extends WebAPICallOptions, TokenOverridable {
  channel_id: string;
}
export interface AdminConversationsDisconnectSharedArguments extends WebAPICallOptions, TokenOverridable {
  channel_id: string;
  leaving_team_ids?: string[];
}
export interface AdminConversationsEKMListOriginalConnectedChannelInfoArguments
  extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {
  channel_ids?: string[];
  team_ids?: string[];
}
cursorPaginationEnabledMethods.add('admin.conversations.ekm.listOriginalConnectedChannelInfo');
export interface AdminConversationsGetConversationPrefsArguments extends WebAPICallOptions, TokenOverridable {
  channel_id: string;
}
export interface AdminConversationsGetTeamsArguments
  extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {
  channel_id: string;
}
cursorPaginationEnabledMethods.add('admin.conversations.getTeams');
export interface AdminConversationsInviteArguments extends WebAPICallOptions, TokenOverridable {
  channel_id: string;
  user_ids: string[];
}
export interface AdminConversationsRenameArguments extends WebAPICallOptions, TokenOverridable {
  channel_id: string;
  name: string;
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
export interface AdminConversationsRestrictAccessRemoveGroupArguments extends WebAPICallOptions, TokenOverridable {
  channel_id: string;
  group_id: string;
  team_id: string;
}
export interface AdminConversationsSearchArguments
  extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {
  query?: string;
  search_channel_types?: string[];
  sort?: 'relevant' | 'name' | 'member_count' | 'created';
  sort_dir?: 'asc' | 'desc';
  team_ids?: string[];
}
cursorPaginationEnabledMethods.add('admin.conversations.search');
export interface AdminConversationsSetConversationPrefsArguments extends WebAPICallOptions, TokenOverridable {
  channel_id: string;
  prefs: object; // TODO: we should be more specific here
}
export interface AdminConversationsSetTeamsArguments extends WebAPICallOptions, TokenOverridable {
  channel_id: string;
  team_id?: string;
  target_team_ids?: string[];
  org_channel?: boolean;
}
export interface AdminConversationsUnarchiveArguments extends WebAPICallOptions, TokenOverridable {
  channel_id: string;
}
export interface AdminEmojiAddArguments extends WebAPICallOptions, TokenOverridable {
  name: string;
  url: string;
}
export interface AdminEmojiAddAliasArguments extends WebAPICallOptions, TokenOverridable {
  name: string;
  alias_for: string;
}
export interface AdminEmojiListArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled { }
cursorPaginationEnabledMethods.add('admin.emoji.list');
export interface AdminEmojiRemoveArguments extends WebAPICallOptions, TokenOverridable {
  name: string;
}
export interface AdminEmojiRenameArguments extends WebAPICallOptions, TokenOverridable {
  name: string;
  new_name: string;
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
export interface AdminInviteRequestsListArguments
  extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {
  team_id: string;
}
cursorPaginationEnabledMethods.add('admin.inviteRequests.list');
export interface AdminTeamsAdminsListArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {
  team_id: string;
}
cursorPaginationEnabledMethods.add('admin.teams.admins.list');
export interface AdminTeamsCreateArguments extends WebAPICallOptions, TokenOverridable {
  team_domain: string;
  team_name: string;
  team_description?: string;
  team_discoverability?: string;
}
export interface AdminTeamsListArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled { }
cursorPaginationEnabledMethods.add('admin.teams.list');
export interface AdminTeamsOwnersListArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {
  team_id: string;
}
cursorPaginationEnabledMethods.add('admin.teams.owners.list');
export interface AdminTeamsSettingsInfoArguments extends WebAPICallOptions, TokenOverridable {
  team_id: string;
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
cursorPaginationEnabledMethods.add('admin.users.session.list');
export interface AdminUsersSessionListArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {
  user_id?: string;
  team_id?: string;
}
export interface AdminUsersSessionResetArguments extends WebAPICallOptions, TokenOverridable {
  user_id: string;
  mobile_only?: boolean;
  web_only?: boolean;
}
export interface AdminUsersSessionInvalidateArguments extends WebAPICallOptions, TokenOverridable {
  session_id: string;
  team_id: string;
}
export interface AdminUsersSessionGetSettingsArguments extends WebAPICallOptions, TokenOverridable {
  user_ids: string[];
}
export interface AdminUsersSessionSetSettingsArguments extends WebAPICallOptions, TokenOverridable {
  user_ids: string[];
  desktop_app_browser_quit?: boolean;
  duration?: number;
}
export interface AdminUsersSessionClearSettingsArguments extends WebAPICallOptions, TokenOverridable {
  user_ids: string[];
}

/*
 * `api.*`
 */
export interface APITestArguments extends WebAPICallOptions { }

/*
 * `apps.*`
 */

export interface AppsConnectionsOpenArguments extends WebAPICallOptions {
  // currently the method page lists Client id and client secret as optional arguments
  // circle back here to see if they stay as optional or are removed
}

export interface AppsEventAuthorizationsListArguments
  extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {
  event_context: string;
}
cursorPaginationEnabledMethods.add('apps.event.authorizations.list');
export interface AppsUninstallArguments extends WebAPICallOptions {
  client_id: string;
  client_secret: string;
}

/*
 * `auth.*`
 */
export interface AuthRevokeArguments extends WebAPICallOptions, TokenOverridable {
  test: boolean;
}
export interface AuthTeamsListArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {
  include_icon?: boolean;
}
cursorPaginationEnabledMethods.add('auth.teams.list');
export interface AuthTestArguments extends WebAPICallOptions, TokenOverridable { }

/*
 * `bots.*`
 */
export interface BotsInfoArguments extends WebAPICallOptions, TokenOverridable {
  bot?: string;
  team_id?: string;
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

export interface CallsEndArguments extends WebAPICallOptions, TokenOverridable {
  id: string;
  duration?: number;
}

export interface CallsInfoArguments extends WebAPICallOptions, TokenOverridable {
  id: string;
}

export interface CallsUpdateArguments extends WebAPICallOptions, TokenOverridable {
  id: string;
  join_url?: string;
  desktop_app_join_url?: string;
  title?: string;
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
  team_id?: string;
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
  team_id?: string;
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
export interface ChatDeleteScheduledMessageArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  scheduled_message_id: string;
  as_user?: boolean;
}
export interface ChatGetPermalinkArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  message_ts: string;
}
export interface ChatMeMessageArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  text: string;
}
export interface ChatPostEphemeralArguments extends WebAPICallOptions, TokenOverridable {
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
export interface ChatPostMessageArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  text?: string;
  as_user?: boolean;
  attachments?: MessageAttachment[];
  blocks?: (KnownBlock | Block)[];
  icon_emoji?: string; // if specified, as_user must be false
  icon_url?: string; // if specified, as_user must be false
  link_names?: boolean;
  mrkdwn?: boolean;
  parse?: 'full' | 'none';
  reply_broadcast?: boolean; // if specified, thread_ts must be set
  thread_ts?: string;
  unfurl_links?: boolean;
  unfurl_media?: boolean;
  username?: string; // if specified, as_user must be false
}
export interface ChatScheduleMessageArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  text?: string;
  post_at: string | number;
  as_user?: boolean;
  attachments?: MessageAttachment[];
  blocks?: (KnownBlock | Block)[];
  link_names?: boolean;
  parse?: 'full' | 'none';
  reply_broadcast?: boolean; // if specified, thread_ts must be set
  thread_ts?: string;
  unfurl_links?: boolean;
  unfurl_media?: boolean;
  team_id?: string;
}
export interface ChatScheduledMessagesListArguments extends WebAPICallOptions, TokenOverridable,
  CursorPaginationEnabled {
  channel: string;
  latest: number;
  oldest: number;
  team_id?: string; // required if org token is used
}
cursorPaginationEnabledMethods.add('chat.scheduledMessages.list');
export interface ChatUnfurlArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  ts: string;
  unfurls: LinkUnfurls;
  user_auth_message?: string;
  user_auth_required?: boolean;
  user_auth_url?: string;
  user_auth_blocks?: (KnownBlock | Block)[];
}
export interface ChatUpdateArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  ts: string;
  as_user?: boolean;
  attachments?: MessageAttachment[];
  blocks?: (KnownBlock | Block)[];
  link_names?: boolean;
  parse?: 'full' | 'none';
  text?: string;
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
export interface ConversationsCreateArguments extends WebAPICallOptions, TokenOverridable {
  name: string;
  is_private?: boolean;
  team_id?: string;
}
export interface ConversationsHistoryArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled,
  TimelinePaginationEnabled {
  channel: string;
}
cursorPaginationEnabledMethods.add('conversations.history');
export interface ConversationsInfoArguments extends WebAPICallOptions, TokenOverridable, LocaleAware {
  channel: string;
  include_num_members?: boolean;
}
export interface ConversationsInviteArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  users: string; // comma-separated list of users
}
export interface ConversationsJoinArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
}
export interface ConversationsKickArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  user: string;
}
export interface ConversationsLeaveArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
}
export interface ConversationsListArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {
  exclude_archived?: boolean;
  types?: string; // comma-separated list of conversation types
  team_id?: string;
}
cursorPaginationEnabledMethods.add('conversations.list');
export interface ConversationsMarkArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  ts: string;
}
export interface ConversationsMembersArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {
  channel: string;
}
cursorPaginationEnabledMethods.add('conversations.members');
export interface ConversationsOpenArguments extends WebAPICallOptions, TokenOverridable {
  channel?: string;
  users?: string; // comma-separated list of users
  return_im?: boolean;
}
export interface ConversationsRenameArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  name: string;
}
export interface ConversationsRepliesArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled,
  TimelinePaginationEnabled {
  channel: string;
  ts: string;
}
cursorPaginationEnabledMethods.add('conversations.replies');
export interface ConversationsSetPurposeArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
  purpose: string;
}
export interface ConversationsSetTopicArguments extends WebAPICallOptions, TokenOverridable {
  channel: string;
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
export interface DndEndDndArguments extends WebAPICallOptions, TokenOverridable { }
export interface DndEndSnoozeArguments extends WebAPICallOptions, TokenOverridable { }
export interface DndInfoArguments extends WebAPICallOptions, TokenOverridable {
  user: string;
}
export interface DndSetSnoozeArguments extends WebAPICallOptions, TokenOverridable {
  num_minutes: number;
}
export interface DndTeamInfoArguments extends WebAPICallOptions, TokenOverridable {
  users?: string; // comma-separated list of users
}

/*
 * `emoji.*`
 */
export interface EmojiListArguments extends WebAPICallOptions, TokenOverridable { }

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
export interface FilesListArguments extends WebAPICallOptions, TokenOverridable, TraditionalPagingEnabled {
  channel?: string;
  user?: string;
  ts_from?: string;
  ts_to?: string;
  types?: string; // comma-separated list of file types
  show_files_hidden_by_limit?: boolean;
  team_id?: string;
}
export interface FilesRevokePublicURLArguments extends WebAPICallOptions, TokenOverridable {
  file: string; // file id
}
export interface FilesSharedPublicURLArguments extends WebAPICallOptions, TokenOverridable {
  file: string; // file id
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
  team_id?: string;
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
  team_id?: string;
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
export interface IMListArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled { }
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
  team_id?: string;
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
export interface MPIMListArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled { }
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
export interface ReactionsListArguments extends WebAPICallOptions, TokenOverridable, TraditionalPagingEnabled,
  CursorPaginationEnabled {
  user?: string;
  full?: boolean;
  team_id?: string;
}
cursorPaginationEnabledMethods.add('reactions.list');
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
export interface RemindersCompleteArguments extends WebAPICallOptions, TokenOverridable {
  reminder: string;
}
export interface RemindersDeleteArguments extends WebAPICallOptions, TokenOverridable {
  reminder: string;
}
export interface RemindersInfoArguments extends WebAPICallOptions, TokenOverridable {
  reminder: string;
}
export interface RemindersListArguments extends WebAPICallOptions, TokenOverridable { }

/*
 * `rtm.*`
 */
export interface RTMConnectArguments extends WebAPICallOptions, TokenOverridable {
  batch_presence_aware?: boolean;
  presence_sub?: boolean;
}
export interface RTMStartArguments extends WebAPICallOptions, TokenOverridable, LocaleAware {
  batch_presence_aware?: boolean;
  mpim_aware?: boolean;
  no_latest?: '0' | '1';
  no_unreads?: string;
  presence_sub?: boolean;
  simple_latest?: boolean;
}

/*
 * `search.*`
 */
export interface SearchAllArguments extends WebAPICallOptions, TokenOverridable, TraditionalPagingEnabled,
  Searchable { }
export interface SearchFilesArguments extends WebAPICallOptions, TokenOverridable, TraditionalPagingEnabled,
  Searchable { }
export interface SearchMessagesArguments extends WebAPICallOptions, TokenOverridable, TraditionalPagingEnabled,
  Searchable { }

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
  CursorPaginationEnabled { }
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
export interface TeamAccessLogsArguments extends WebAPICallOptions, TokenOverridable {
  before?: number;
  count?: number;
  page?: number;
  team_id?: string;
}
export interface TeamBillableInfoArguments extends WebAPICallOptions, TokenOverridable {
  user?: string;
  team_id?: string;
}
export interface TeamInfoArguments extends WebAPICallOptions, TokenOverridable {
  // Team to get info on, if omitted, will return information about the current team.
  // Will only return team that the authenticated token is allowed to see through external shared channels
  team?: string;
}
export interface TeamIntegrationLogsArguments extends WebAPICallOptions, TokenOverridable {
  app_id?: string;
  change_type?: string; // TODO: list types: 'x' | 'y' | 'z'
  count?: number;
  page?: number;
  service_id?: string;
  user?: string;
  team_id?: string;
}
export interface TeamProfileGetArguments extends WebAPICallOptions, TokenOverridable {
  visibility?: 'all' | 'visible' | 'hidden';
  team_id?: string;
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
export interface UsergroupsDisableArguments extends WebAPICallOptions, TokenOverridable {
  usergroup: string;
  include_count?: boolean;
}
export interface UsergroupsEnableArguments extends WebAPICallOptions, TokenOverridable {
  usergroup: string;
  include_count?: boolean;
}
export interface UsergroupsListArguments extends WebAPICallOptions, TokenOverridable {
  include_count?: boolean;
  include_disabled?: boolean;
  include_users?: boolean;
}
export interface UsergroupsUpdateArguments extends WebAPICallOptions, TokenOverridable {
  usergroup: string;
  channels?: string; // comma-separated list of channels
  description?: string;
  handle?: string;
  include_count?: boolean;
  name?: string;
}
export interface UsergroupsUsersListArguments extends WebAPICallOptions, TokenOverridable {
  usergroup: string;
  include_disabled?: boolean;
}
export interface UsergroupsUsersUpdateArguments extends WebAPICallOptions, TokenOverridable {
  usergroup: string;
  users: string; // comma-separated list of users
  include_count?: boolean;
}

/*
 * `users.*`
 */
export interface UsersConversationsArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled {
  exclude_archived?: boolean;
  types?: string; // comma-separated list of conversation types
  user?: string;
  team_id?: string;
}
cursorPaginationEnabledMethods.add('users.conversations');
export interface UsersDeletePhotoArguments extends WebAPICallOptions, TokenOverridable { }
export interface UsersGetPresenceArguments extends WebAPICallOptions, TokenOverridable {
  user: string;
}
export interface UsersIdentityArguments extends WebAPICallOptions, TokenOverridable { }
export interface UsersInfoArguments extends WebAPICallOptions, TokenOverridable, LocaleAware {
  user: string;
}
export interface UsersListArguments extends WebAPICallOptions, TokenOverridable, CursorPaginationEnabled, LocaleAware {
  presence?: boolean; // deprecated, defaults to false
  team_id?: string;
}
cursorPaginationEnabledMethods.add('users.list');
export interface UsersLookupByEmailArguments extends WebAPICallOptions, TokenOverridable {
  email: string;
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
export interface UsersProfileSetArguments extends WebAPICallOptions, TokenOverridable {
  profile?: string; // url-encoded json
  user?: string;
  name?: string; // usable if `profile` is not passed
  value?: string; // usable if `profile` is not passed
}

export interface ViewsOpenArguments extends WebAPICallOptions, TokenOverridable {
  trigger_id: string;
  view: View;
}

export interface ViewsPushArguments extends WebAPICallOptions, TokenOverridable {
  trigger_id: string;
  view: View;
}

export interface ViewsPublishArguments extends WebAPICallOptions, TokenOverridable {
  user_id: string;
  view: View;
  hash?: string;
}

export interface ViewsUpdateArguments extends WebAPICallOptions, TokenOverridable {
  view_id?: string;
  view: View;
  external_id?: string;
  hash?: string;
}

/*
 * `workflows.*`
 */
export interface WorkflowsStepCompletedArguments extends WebAPICallOptions, TokenOverridable {
  workflow_step_execute_id: string;
  outputs?: object;
}

export interface WorkflowsStepFailedArguments extends WebAPICallOptions, TokenOverridable {
  workflow_step_execute_id: string;
  error: {
    message: string;
  };
}

export interface WorkflowsUpdateStepArguments extends WebAPICallOptions, TokenOverridable {
  workflow_step_edit_id: string;
  step_image_url?: string;
  step_name?: string;
  inputs?: {
    [name: string]: {
      value: any;
      skip_variable_replacement?: boolean;
      variables?: {
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
