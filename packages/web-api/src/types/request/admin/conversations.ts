import type {
  ChannelIDs,
  CursorPaginationEnabled,
  SortDir,
  TokenOverridable,
  UserIDs,
} from '../common';

interface ChannelID { // an identical interface exists in src/types/request/conversations.ts, but it is only for invites
  /** @description Encoded channel ID. */
  channel_id: string;
}

type ChannelType = 'private' | 'private_exclude' | 'archived' | 'exclude_archived' | 'private_exclude_archived' | 'multi_workspace' | 'org_wide' | 'external_shared_exclude' | 'external_shared' | 'external_shared_private' | 'external_shared_archived' | 'exclude_org_shared';

interface GroupID {
  /** @description The {@link https://slack.com/help/articles/115001435788-Connect-identity-provider-groups-to-your-Enterprise-Grid-org IDP Group} ID. */
  group_id: string;
}

interface TeamIDs {
  /** @description A list of team IDs to filter by (must include at least one ID). */
  team_ids: [string, ...string[]];
}

// Interface to extend from specifically for the retrictAccess.* APIs, as the JSDoc is relevant only to these APIs
interface RestrictAccessTeamID {
  /**
   * @description The workspace where the channel exists. This argument is required for channels only tied to
   * one workspace, and optional for channels that are shared across an organization.
   */
  team_id?: string;
}

// https://api.slack.com/methods/admin.conversations.archive
export interface AdminConversationsArchiveArguments extends ChannelID, TokenOverridable {}

// https://api.slack.com/methods/admin.conversations.bulkArchive
export interface AdminConversationsBulkArchiveArguments extends ChannelIDs, TokenOverridable {}

// https://api.slack.com/methods/admin.conversations.bulkDelete
export interface AdminConversationsBulkDeleteArguments extends ChannelIDs, TokenOverridable {}

// https://api.slack.com/methods/admin.conversations.bulkMove
export interface AdminConversationsBulkMoveArguments extends ChannelIDs, TokenOverridable {
  /** @description Target team ID to move channels to. */
  target_team_id: string;
}

// https://api.slack.com/methods/admin.conversations.convertToPrivate
export interface AdminConversationsConvertToPrivateArguments extends ChannelID, TokenOverridable {
  /** @description Name of private channel to create. Only respected when converting an MPIM. */
  name?: string;
}

// https://api.slack.com/methods/admin.conversations.convertToPublic
export interface AdminConversationsConvertToPublicArguments extends ChannelID, TokenOverridable {}

interface OrgWide {
  /** @description When `true`, the channel will be available org-wide. */
  org_wide: true;
  team_id?: never;
}
interface SpecificTeam {
  /**
   * @description When `false` (the default), the channel will be available to only
   * the workspace specified by `team_id`.
   */
  org_wide?: false;
  /**
   * @description The workspace to create the channel in. This argument is required unless you set `org_wide` to `true`.
   */
  team_id: string;
}
// When creating a channel, it can either be org wide or team specific, but not both
type WorkspaceAccess = OrgWide | SpecificTeam;

// https://api.slack.com/methods/admin.conversations.create
export type AdminConversationsCreateArguments = TokenOverridable & WorkspaceAccess & {
  /** @description When `true`, creates a private channel instead of a public channel. */
  is_private: boolean;
  /** @description Name of the public or private channel to create. */
  name: string;
  /** @description Description of the public or private channel to create. */
  description?: string;
};

// https://api.slack.com/methods/admin.conversations.delete
export interface AdminConversationsDeleteArguments extends ChannelID, TokenOverridable {}

// https://api.slack.com/methods/admin.conversations.disconnectShared
export interface AdminConversationsDisconnectSharedArguments extends ChannelID, TokenOverridable {
  /** @description Team IDs getting removed from the channel, optional if there are only two teams in the channel. */
  leaving_team_ids?: string[];
}

// https://api.slack.com/methods/admin.conversations.ekm.listOriginalConnectedChannelInfo
export interface AdminConversationsEKMListOriginalConnectedChannelInfoArguments
  extends Partial<TeamIDs>, TokenOverridable, CursorPaginationEnabled {
  /** @description A comma-separated list of channels to filter to. */
  channel_ids?: string[];
}

// https://api.slack.com/methods/admin.conversations.getConversationPrefs
export interface AdminConversationsGetConversationPrefsArguments extends ChannelID, TokenOverridable {}

// https://api.slack.com/methods/admin.conversations.getCustomRetention
export interface AdminConversationsGetCustomRetentionArguments extends ChannelID, TokenOverridable {}

// https://api.slack.com/methods/admin.conversations.getTeams
export interface AdminConversationsGetTeamsArguments
  extends ChannelID, TokenOverridable, CursorPaginationEnabled {}

// https://api.slack.com/methods/admin.conversations.invite
export interface AdminConversationsInviteArguments extends ChannelID, UserIDs, TokenOverridable {}

// https://api.slack.com/methods/admin.conversations.lookup
export interface AdminConversationsLookupArguments
  extends TeamIDs, TokenOverridable, CursorPaginationEnabled {
  /**
   * @description UNIX timestamp to filter by public channels where the most recent message
   * was sent before this parameter.
   */
  last_message_activity_before: number;
  /** @description Filter by public channels with member count equal to or less than the specified number. */
  max_member_count?: number;
}

// https://api.slack.com/methods/admin.conversations.removeCustomRetention
export interface AdminConversationsRemoveCustomRetentionArguments extends ChannelID, TokenOverridable {}

// https://api.slack.com/methods/admin.conversations.rename
export interface AdminConversationsRenameArguments extends ChannelID, TokenOverridable {
  /** @description The new name for the channel. */
  name: string;
}

// https://api.slack.com/methods/admin.conversations.restrictAccess.addGroup
export interface AdminConversationsRestrictAccessAddGroupArguments extends ChannelID, GroupID,
  RestrictAccessTeamID, TokenOverridable {}

// https://api.slack.com/methods/admin.conversations.restrictAccess.listGroups
export interface AdminConversationsRestrictAccessListGroupsArguments extends ChannelID, RestrictAccessTeamID,
  TokenOverridable {}

// https://api.slack.com/methods/admin.conversations.restrictAccess.removeGroup
export interface AdminConversationsRestrictAccessRemoveGroupArguments extends ChannelID, GroupID,
  RestrictAccessTeamID, TokenOverridable {}

// https://api.slack.com/methods/admin.conversations.search
export interface AdminConversationsSearchArguments
  extends SortDir, Partial<TeamIDs>, TokenOverridable, CursorPaginationEnabled {
  /** @description Array of encoded team IDs, signifying the external orgs to search through. */
  connected_team_ids?: string[];
  /** @description Name of the channel to query by. */
  query?: string;
  /**
   * @description The type of channels to include or exclude in the search. For example `private` will search
   * private channels, while `private_exclude` will exclude them.
   * @see {@link https://api.slack.com/methods/admin.conversations.search#types Full list of channel types}.
   */
  search_channel_types?: ChannelType[];
  /**
   * @description Possible values are:
   * - `relevant`: search ranking based on what we think is closest,
   * - `name`: alphabetical,
   * - `member_count`: number of users in the channel,
   * - `created`: date channel was created.
   * Defaults to `member_count`.
   * You can optionally pair this with the `sort_dir` argument to change how it is sorted.
   */
  sort?: 'relevant' | 'name' | 'member_count' | 'created';
  /**
   * @description Only return the total count of channels.
   * Omits channel data and allows access for admins without channel manager permissions. Defaults to `false`.
   */
  total_count_only?: boolean;
}

// https://api.slack.com/methods/admin.conversations.setConversationPrefs
export interface AdminConversationsSetConversationPrefsArguments extends ChannelID, TokenOverridable {
  /** @description The prefs for this channel. */
  prefs: Record<string, unknown>;
}

// https://api.slack.com/methods/admin.conversations.setCustomRetention
export interface AdminConversationsSetCustomRetentionArguments extends ChannelID, TokenOverridable {
  /** @description The message retention duration in days to set for this conversation. */
  duration_days: number;
}

// https://api.slack.com/methods/admin.conversations.setTeams
export interface AdminConversationsSetTeamsArguments extends ChannelID, TokenOverridable {
  /** @description Set to `true` if channel has to be converted to an org channel. Defaults to `false`. */
  org_channel?: boolean;
  /**
   * @description A list of workspaces to which the channel should be shared.
   * Not required if the channel is being shared org-wide.
   */
  target_team_ids?: string[];
  /**
   * @description The workspace to which the channel belongs.
   * Omit this argument if the channel is a cross-workspace shared channel.
   */
  team_id?: string;
}

// https://api.slack.com/methods/admin.conversations.unarchive
export interface AdminConversationsUnarchiveArguments extends ChannelID, TokenOverridable {}
