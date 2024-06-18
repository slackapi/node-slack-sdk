import { OptionalArgument } from '../../helpers';

import type { ChannelIDs, CursorPaginationEnabled, TeamID, TokenOverridable } from '../common';

type TeamDiscoverability = 'open' | 'closed' | 'invite_only' | 'unlisted';

// https://api.slack.com/methods/admin.teams.admins.list
export interface AdminTeamsAdminsListArguments extends TeamID, TokenOverridable, CursorPaginationEnabled {}

// https://api.slack.com/methods/admin.teams.create
export interface AdminTeamsCreateArguments extends TokenOverridable {
  /** @description Team domain (for example, slacksoftballteam). Domains are limited to 21 characters. */
  team_domain: string;
  /** @description Team name (for example, Slack Softball Team). */
  team_name: string;
  /** @description Description for the team. */
  team_description?: string;
  /** @description Who can join the team. */
  team_discoverability?: TeamDiscoverability;
}

// https://api.slack.com/methods/admin.teams.list
export type AdminTeamsListArguments = OptionalArgument<TokenOverridable & CursorPaginationEnabled>;

// https://api.slack.com/methods/admin.teams.owners.list
export interface AdminTeamsOwnersListArguments extends TeamID, TokenOverridable, CursorPaginationEnabled {}

// https://api.slack.com/methods/admin.teams.settings.info
export interface AdminTeamsSettingsInfoArguments extends TeamID, TokenOverridable {}

// https://api.slack.com/methods/admin.teams.settings.setDefaultChannels
export interface AdminTeamsSettingsSetDefaultChannelsArguments extends ChannelIDs, TeamID, TokenOverridable {}

// https://api.slack.com/methods/admin.teams.settings.setDescription
export interface AdminTeamsSettingsSetDescriptionArguments extends TeamID, TokenOverridable {
  /** @description The new description for the workspace. */
  description: string;
}

// https://api.slack.com/methods/admin.teams.settings.setDiscoverability
export interface AdminTeamsSettingsSetDiscoverabilityArguments extends TeamID, TokenOverridable {
  /** @description This workspace's discovery setting. */
  discoverability: TeamDiscoverability;
}

// https://api.slack.com/methods/admin.teams.settings.setIcon
export interface AdminTeamsSettingsSetIconArguments extends TeamID, TokenOverridable {
  /** @description Image URL for the icon. */
  image_url: string;
}

// https://api.slack.com/methods/admin.teams.settings.setName
export interface AdminTeamsSettingsSetNameArguments extends TeamID, TokenOverridable {
  /** @description The new name of the workspace. */
  name: string;
}
