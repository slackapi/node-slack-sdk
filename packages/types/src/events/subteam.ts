interface Subteam {
  id: string;
  team_id?: string;
  is_usergroup: boolean;
  is_subteam: boolean;
  name: string;
  description?: string;
  handle: string;
  is_external: boolean;
  date_create: number;
  date_update?: number;
  date_delete?: number;
  auto_provision: boolean;
  enterprise_subteam_id?: string;
  created_by: string;
  updated_by?: string;
  prefs?: {
    channels?: string[];
    groups?: string[];
  };
  users: string[];
  user_count: number;
  channel_count?: number;
}

export interface SubteamCreatedEvent {
  type: 'subteam_created';
  subteam: Subteam;
  event_ts: string;
}
// TODO: (breaking change) for backward-compatibility; remove non-Event-suffix type in next major version.
/**
 * @deprecated Will be removed in next major version. Use the `SubteamCreatedEvent` interface instead.
 */
export type SubteamCreated = SubteamCreatedEvent;

export interface SubteamMembersChangedEvent {
  type: 'subteam_members_changed';
  subteam_id: string;
  team_id: string;
  date_previous_update: number;
  date_update: number;
  added_users?: string[];
  added_users_count?: number;
  removed_users?: string[];
  removed_users_count?: number;
  event_ts: string;
}
// TODO: (breaking change) for backward-compatibility; remove non-Event-suffix type in next major version.
/**
 * @deprecated Will be removed in next major version. Use the `SubteamMembersChangedEvent` interface instead.
 */
export type SubteamMembersChanged = SubteamMembersChangedEvent;

export interface SubteamSelfAddedEvent {
  type: 'subteam_self_added';
  subteam_id: string;
  event_ts: string;
}

export interface SubteamSelfRemovedEvent {
  type: 'subteam_self_removed';
  subteam_id: string;
  event_ts: string;
}

export interface SubteamUpdatedEvent {
  type: 'subteam_updated';
  subteam: Subteam;
  event_ts: string;
}
