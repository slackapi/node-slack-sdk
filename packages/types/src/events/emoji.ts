// TODO: breaking change: this should probably be broken into its two subtypes
export interface EmojiChangedEvent {
  type: 'emoji_changed';
  subtype: 'add' | 'remove' | 'rename';
  names?: string[]; // only for remove
  name?: string; // only for add
  value?: string; // only for add
  old_name?: string;
  new_name?: string;
  event_ts: string;
}
