export interface StarAddedEvent {
  type: 'star_added';
  user: string;
  // TODO: incomplete, items are of type message | file | file comment (deprecated) | channel | im | group
  // https://docs.slack.dev/reference/events/star_added, https://docs.slack.dev/reference/methods/stars.list
  item: Record<string, unknown>;
  event_ts: string;
}

export interface StarRemovedEvent {
  type: 'star_removed';
  user: string;
  // TODO: incomplete, items are of type message | file | file comment (deprecated) | channel | im | group
  // https://docs.slack.dev/reference/events/star_removed, https://docs.slack.dev/reference/methods/stars.list
  item: Record<string, unknown>;
  event_ts: string;
}
