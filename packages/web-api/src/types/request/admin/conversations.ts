import type { CursorPaginationEnabled, TokenOverridable } from '../common';

interface ChannelID { // an identical interface exists in src/types/request/conversations.ts, but it is only for invites
  /** @description Encoded channel ID. */
  channel_id: string;
}

interface ChannelIDs {
  /** @description An array of channel IDs (must include at least one ID). */
  channel_ids: [string, ...string[]];
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
  /** @description When `true`, creates a private channel instead of a public channel. Defaults to `false`. */
  is_private: boolean;
  /** @description Name of the public or private channel to create. */
  name: string;
  /** @description Description of the public or private channel to create. */
  description?: string;
};

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
