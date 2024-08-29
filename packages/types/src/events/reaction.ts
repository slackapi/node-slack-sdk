interface ReactionMessageItem {
  type: 'message';
  channel: string;
  ts: string;
}

export interface ReactionAddedEvent {
  type: 'reaction_added';
  user: string;
  reaction: string;
  item_user: string;
  item: ReactionMessageItem;
  event_ts: string;
}

export interface ReactionRemovedEvent {
  type: 'reaction_removed';
  user: string;
  reaction: string;
  item_user: string;
  item: ReactionMessageItem;
  event_ts: string;
}
