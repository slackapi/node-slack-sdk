export interface ChannelArchiveEvent {
  type: 'channel_archive';
  channel: string;
  user: string;
  is_moved?: number;
  event_ts: string;
}

export interface ChannelCreatedEvent {
  type: 'channel_created';
  event_ts: string;
  channel: {
    id: string;
    is_channel: boolean;
    name: string;
    name_normalized: string;
    created: number;
    creator: string; // user ID
    is_shared: boolean;
    is_org_shared: boolean;
    context_team_id: string,
    is_archived: boolean;
    is_frozen: boolean,
    is_general: boolean,
    is_group: boolean,
    is_private: boolean,
    is_ext_shared: boolean,
    is_im: boolean,
    is_mpim: boolean,
    is_pending_ext_shared: boolean,
  };
}

export interface ChannelDeletedEvent {
  type: 'channel_deleted';
  channel: string;
}

export interface ChannelHistoryChangedEvent {
  type: 'channel_history_changed';
  latest: string;
  ts: string;
  event_ts: string;
}

export interface ChannelIDChangedEvent {
  type: 'channel_id_changed';
  old_channel_id: string;
  new_channel_id: string;
  event_ts: string;
}

export interface ChannelLeftEvent {
  type: 'channel_left';
  channel: string;
  actor_id: string;
  event_ts: string;
}

export interface ChannelRenameEvent {
  type: 'channel_rename';
  channel: {
    id: string;
    name: string;
    name_normalized: string;
    created: number;
    is_channel: boolean;
    is_mpim: boolean;
  };
  event_ts: string;
}

export interface ChannelSharedEvent {
  type: 'channel_shared';
  connected_team_id: string;
  channel: string;
  event_ts: string;
}

export interface ChannelUnarchiveEvent {
  type: 'channel_unarchive';
  channel: string;
  user: string;
  event_ts: string;
}

export interface ChannelUnsharedEvent {
  type: 'channel_unshared';
  previously_connected_team_id: string;
  channel: string;
  is_ext_shared: boolean;
  event_ts: string;
}
