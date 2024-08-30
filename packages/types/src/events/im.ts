export interface IMCloseEvent {
  type: 'im_close';
  user: string;
  channel: string;
  event_ts: string;
}

export interface IMCreatedEvent {
  type: 'im_created';
  user: string;
  // TODO: incomplete, this should probably be a reference to a IM shape from @slack/types. can it just be a
  // Conversation shape? or should it be a Channel shape?
  // https://api.slack.com/types/im
  channel: {
    id: string;
  };
}

export interface IMHistoryChangedEvent {
  type: 'im_history_changed';
  latest: string;
  ts: string;
  event_ts: string;
}

export interface IMOpenEvent {
  type: 'im_open';
  user: string;
  channel: string;
  event_ts: string;
}
