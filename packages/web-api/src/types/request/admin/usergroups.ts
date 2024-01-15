import type { OptionalTeamAssignable, TokenOverridable } from '../common';

interface ChannelIDs {
  /** @description One or more encoded channel IDs. */
  channel_ids: string | string[];
}

interface UsergroupID {
  /** @description ID of the IDP group to list/manage channels for. */
  usergroup_id: string;
}

// https://api.slack.com/methods/admin.usergroups.addChannels
export interface AdminUsergroupsAddChannelsArguments extends ChannelIDs, UsergroupID, OptionalTeamAssignable,
  TokenOverridable {}

// https://api.slack.com/methods/admin.usergroups.addTeams
export interface AdminUsergroupsAddTeamsArguments extends UsergroupID, TokenOverridable {
  /**
   * @description One or more encoded team (workspace) IDs.
   * Each workspace MUST belong to the organization associated with the token.
   */
  team_ids: string | string[];
  /**
   * @description When `true`, this method automatically creates new workspace accounts for the IDP group members.
   * Defaults to `false`.
   */
  auto_provision?: boolean;
}

// https://api.slack.com/methods/admin.usergroups.listChannels
export interface AdminUsergroupsListChannelsArguments extends UsergroupID, OptionalTeamAssignable, TokenOverridable {
  /** @description Flag to include or exclude the count of members per channel. */
  include_num_members?: boolean;
}

// https://api.slack.com/methods/admin.usergroups.removeChannels
export interface AdminUsergroupsRemoveChannelsArguments extends ChannelIDs, UsergroupID, TokenOverridable {}
