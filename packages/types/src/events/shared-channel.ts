interface SharedChannelTeamItem {
  id: string;
  name: string;
  icon: Record<string, unknown>;
  is_verified: boolean;
  domain: string;
  date_created: number;
}
interface SharedChannelUserItem {
  id: string;
  team_id: string;
  name: string;
  updated: number;
  profile: {
    real_name: string;
    display_name: string;
    real_name_normalized: string;
    display_name_normalized: string;
    team: string;
    avatar_hash: string;
    email: string;
    image_24: string;
    image_32: string;
    image_48: string;
    image_72: string;
    image_192: string;
    image_512: string;
  };
}
interface SharedChannelInviteItem {
  id: string;
  date_created: number;
  date_invalid: number;
  inviting_team: SharedChannelTeamItem;
  inviting_user: SharedChannelUserItem;
  recipient_email?: string;
  recipient_user_id?: string;
}

interface SharedChannelItem {
  id: string;
  is_private: boolean;
  is_im: boolean;
  name: string;
}
export interface SharedChannelInviteAcceptedEvent {
  type: 'shared_channel_invite_accepted';
  approval_required: boolean;
  invite: SharedChannelInviteItem;
  channel: SharedChannelItem;
  teams_in_channel: SharedChannelTeamItem[];
  accepting_user: SharedChannelUserItem;
  event_ts: string;
}
// TODO: (breaking change) for backward-compatibility; remove non-Event-suffix type in next major version.
/**
 * @deprecated Will be removed in next major version. Use the `SharedChannelInviteAcceptedEvent` interface instead.
 */
export type SharedChannelInviteAccepted = SharedChannelInviteAcceptedEvent;

export interface SharedChannelInviteApprovedEvent {
  type: 'shared_channel_invite_approved';
  invite: SharedChannelInviteItem;
  channel: SharedChannelItem;
  approving_team_id: string;
  teams_in_channel: SharedChannelTeamItem[];
  approving_user: SharedChannelUserItem;
  event_ts: string;
}
// TODO: (breaking change) for backward-compatibility; remove non-Event-suffix type in next major version.
/**
 * @deprecated Will be removed in next major version. Use the `SharedChannelInviteApprovedEvent` interface instead.
 */
export type SharedChannelInviteApproved = SharedChannelInviteApprovedEvent;

export interface SharedChannelInviteDeclinedEvent {
  type: 'shared_channel_invite_declined';
  invite: SharedChannelInviteItem;
  channel: SharedChannelItem;
  declining_team_id: string;
  teams_in_channel: SharedChannelTeamItem[];
  declining_user: SharedChannelUserItem;
  event_ts: string;
}
// TODO: (breaking change) for backward-compatibility; remove non-Event-suffix type in next major version.
/**
 * @deprecated Will be removed in next major version. Use the `SharedChannelInviteDeclinedEvent` interface instead.
 */
export type SharedChannelInviteDeclined = SharedChannelInviteDeclinedEvent;

export interface SharedChannelInviteReceivedEvent {
  type: 'shared_channel_invite_received';
  invite: SharedChannelInviteItem;
  channel: SharedChannelItem;
  event_ts: string;
}
// TODO: (breaking change) for backward-compatibility; remove non-Event-suffix type in next major version.
/**
 * @deprecated Will be removed in next major version. Use the `SharedChannelInviteReceivedEvent` interface instead.
 */
export type SharedChannelInviteReceived = SharedChannelInviteReceivedEvent;

export interface SharedChannelInviteRequestedEvent {
  type: 'shared_channel_invite_requested';
  actor: {
    id: string;
    name: string;
    is_bot: boolean;
    team_id: string;
    timezone: string;
    real_name: string;
    display_name: string;
  };
  channel_id: string;
  event_type: 'slack#/events/shared_channel_invite_requested';
  channel_name: string;
  channel_type: 'public' | 'private';
  target_users: [{ email: string; invite_id: string }];
  teams_in_channel: [
    {
      id: string;
      icon: { image_34: string; image_default: boolean };
      name: string;
      domain: string;
      is_verified: boolean;
      date_created: number;
      avatar_base_url: string;
      requires_sponsorship: boolean;
    },
  ];
  is_external_limited: boolean;
  channel_date_created: number;
  channel_message_latest_counted_timestamp: number;
  event_ts: string;
}
