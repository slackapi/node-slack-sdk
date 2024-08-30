export interface GroupArchiveEvent {
  type: 'group_archive';
  channel: string;
  user: string;
  is_moved: number;
  event_ts: string;
}

export interface GroupCloseEvent {
  type: 'group_close';
  user: string;
  channel: string;
}

export interface GroupDeletedEvent {
  type: 'group_deleted';
  channel: string;
  date_deleted: number;
  actor_id: string;
  event_ts: string;
}

export interface GroupHistoryChangedEvent {
  type: 'group_history_changed';
  latest: string;
  ts: string;
  event_ts: string;
}

export interface GroupLeftEvent {
  type: 'group_left';
  channel: string;
  actor_id: string;
  event_ts: string;
}

export interface GroupOpenEvent {
  type: 'group_open';
  user: string;
  channel: string;
}

export interface GroupRenameEvent {
  type: 'group_rename';
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

export interface GroupUnarchiveEvent {
  type: 'group_unarchive';
  channel: string;
  actor_id: string;
  event_ts: string;
}
