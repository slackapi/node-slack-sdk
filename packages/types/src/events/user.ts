import type { StatusEmojiDisplayInfo } from '../common/status-emoji-display-info';

export interface UserChangeEvent {
  type: 'user_change';
  user: {
    id: string;
    team_id: string;
    name: string;
    deleted: boolean;
    color: string;
    real_name: string;
    tz: string;
    tz_label: string;
    tz_offset: number;
    profile: {
      title: string;
      phone: string;
      skype: string;
      real_name: string;
      real_name_normalized: string;
      display_name: string;
      display_name_normalized: string;
      status_text: string;
      status_text_canonical: string;
      status_emoji: string;
      status_emoji_display_info: StatusEmojiDisplayInfo[];
      status_expiration: number;
      avatar_hash: string;
      huddle_state?: string;
      huddle_state_expiration_ts?: number;
      first_name: string;
      last_name: string;
      email?: string;
      image_original?: string;
      is_custom_image?: boolean;
      image_24: string;
      image_32: string;
      image_48: string;
      image_72: string;
      image_192: string;
      image_512: string;
      image_1024?: string;
      team: string;
      fields:
        | {
            [key: string]: {
              value: string;
              alt: string;
            };
          }
        | []
        | null;
    };
    is_admin: boolean;
    is_owner: boolean;
    is_primary_owner: boolean;
    is_restricted: boolean;
    is_ultra_restricted: boolean;
    is_bot: boolean;
    is_stranger?: boolean;
    updated: number;
    is_email_confirmed: boolean;
    is_app_user: boolean;
    is_invited_user?: boolean;
    has_2fa?: boolean;
    locale: string;
    presence?: string;
    enterprise_user?: {
      id: string;
      enterprise_id: string;
      enterprise_name: string;
      is_admin: boolean;
      is_owner: boolean;
      teams: string[];
    };
    two_factor_type?: string;
    has_files?: boolean;
    is_workflow_bot?: boolean;
    who_can_share_contact_card: string;
  };
  cache_ts: number;
  event_ts: string;
}

export interface UserHuddleChangedEvent {
  type: 'user_huddle_changed';
  user: {
    id: string;
    team_id: string;
    name: string;
    deleted: boolean;
    color: string;
    real_name: string;
    tz: string;
    tz_label: string;
    tz_offset: number;
    profile: {
      title: string;
      phone: string;
      skype: string;
      real_name: string;
      real_name_normalized: string;
      display_name: string;
      display_name_normalized: string;
      status_text: string;
      status_text_canonical: string;
      status_emoji: string;
      status_emoji_display_info: StatusEmojiDisplayInfo[];
      status_expiration: number;
      avatar_hash: string;
      huddle_state: string;
      huddle_state_expiration_ts: number;
      first_name: string;
      last_name: string;
      email?: string;
      image_original?: string;
      is_custom_image?: boolean;
      image_24: string;
      image_32: string;
      image_48: string;
      image_72: string;
      image_192: string;
      image_512: string;
      image_1024?: string;
      team: string;
      fields:
        | {
            [key: string]: {
              value: string;
              alt: string;
            };
          }
        | []
        | null;
    };
    is_admin: boolean;
    is_owner: boolean;
    is_primary_owner: boolean;
    is_restricted: boolean;
    is_ultra_restricted: boolean;
    is_bot: boolean;
    is_stranger?: boolean;
    updated: number;
    is_email_confirmed: boolean;
    is_app_user: boolean;
    is_invited_user?: boolean;
    has_2fa?: boolean;
    locale: string;
    presence?: string;
    enterprise_user?: {
      id: string;
      enterprise_id: string;
      enterprise_name: string;
      is_admin: boolean;
      is_owner: boolean;
      teams: string[];
    };
    two_factor_type?: string;
    has_files?: boolean;
    is_workflow_bot?: boolean;
    who_can_share_contact_card: string;
  };
  cache_ts: number;
  event_ts: string;
}

export interface UserProfileChangedEvent {
  type: 'user_profile_changed';
  user: {
    id: string;
    team_id: string;
    name: string;
    deleted: boolean;
    color: string;
    real_name: string;
    tz: string;
    tz_label: string;
    tz_offset: number;
    profile: {
      title: string;
      phone: string;
      skype: string;
      real_name: string;
      real_name_normalized: string;
      display_name: string;
      display_name_normalized: string;
      status_text: string;
      status_text_canonical: string;
      status_emoji: string;
      status_emoji_display_info: StatusEmojiDisplayInfo[];
      status_expiration: number;
      avatar_hash: string;
      huddle_state: string;
      huddle_state_expiration_ts: number;
      first_name: string;
      last_name: string;
      email?: string;
      image_original?: string;
      is_custom_image?: boolean;
      image_24: string;
      image_32: string;
      image_48: string;
      image_72: string;
      image_192: string;
      image_512: string;
      image_1024?: string;
      team: string;
      fields:
        | {
            [key: string]: {
              value: string;
              alt: string;
            };
          }
        | []
        | null;
    };
    is_admin: boolean;
    is_owner: boolean;
    is_primary_owner: boolean;
    is_restricted: boolean;
    is_ultra_restricted: boolean;
    is_bot: boolean;
    is_stranger?: boolean;
    updated: number;
    is_email_confirmed: boolean;
    is_app_user: boolean;
    is_invited_user?: boolean;
    has_2fa?: boolean;
    locale: string;
    presence?: string;
    enterprise_user?: {
      id: string;
      enterprise_id: string;
      enterprise_name: string;
      is_admin: boolean;
      is_owner: boolean;
      teams: string[];
    };
    two_factor_type?: string;
    has_files?: boolean;
    is_workflow_bot?: boolean;
    who_can_share_contact_card: string;
  };
  cache_ts: number;
  event_ts: string;
}

export interface UserStatusChangedEvent {
  type: 'user_status_changed';
  user: {
    id: string;
    team_id: string;
    name: string;
    deleted: boolean;
    color: string;
    real_name: string;
    tz: string;
    tz_label: string;
    tz_offset: number;
    profile: {
      title: string;
      phone: string;
      skype: string;
      real_name: string;
      real_name_normalized: string;
      display_name: string;
      display_name_normalized: string;
      status_text: string;
      status_text_canonical: string;
      status_emoji: string;
      status_emoji_display_info: StatusEmojiDisplayInfo[];
      status_expiration: number;
      avatar_hash: string;
      first_name: string;
      last_name: string;
      email?: string;
      image_original?: string;
      is_custom_image?: boolean;
      image_24: string;
      image_32: string;
      image_48: string;
      image_72: string;
      image_192: string;
      image_512: string;
      image_1024?: string;
      team: string;
      fields:
        | {
            [key: string]: {
              value: string;
              alt: string;
            };
          }
        | []
        | null;
    };
    is_admin: boolean;
    is_owner: boolean;
    is_primary_owner: boolean;
    is_restricted: boolean;
    is_ultra_restricted: boolean;
    is_bot: boolean;
    is_stranger?: boolean;
    updated: number;
    is_email_confirmed: boolean;
    is_app_user: boolean;
    is_invited_user?: boolean;
    has_2fa?: boolean;
    locale: string;
    presence?: string;
    enterprise_user?: {
      id: string;
      enterprise_id: string;
      enterprise_name: string;
      is_admin: boolean;
      is_owner: boolean;
      teams: string[];
    };
    two_factor_type?: string;
    has_files?: boolean;
    is_workflow_bot?: boolean;
    who_can_share_contact_card: string;
  };
  cache_ts: number;
  event_ts: string;
}
