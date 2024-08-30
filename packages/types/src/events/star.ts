export interface StarAddedEvent {
  type: 'star_added';
  user: string;
  // TODO: incomplete, items are of type message | file | file comment (deprecated) | channel | im | group
  // https://api.slack.com/events/star_added, https://api.slack.com/methods/stars.list
  item: Record<string, unknown>;
  event_ts: string;
}

export interface StarRemovedEvent {
  type: 'star_removed';
  user: string;
  // TODO: incomplete, items are of type message | file | file comment (deprecated) | channel | im | group
  // https://api.slack.com/events/star_removed, https://api.slack.com/methods/stars.list
  item: Record<string, unknown>;
  event_ts: string;
}
