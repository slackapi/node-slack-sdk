import type { Block, KnownBlock } from '../block-kit/blocks';
import type { BotProfile } from '../common/bot-profile';
import type { MessageAttachment } from '../message-attachments';

interface PinnedMessageItem {
  client_msg_id?: string;
  type: string;
  app_id?: string;
  team?: string;
  user: string;
  bot_id?: string;
  bot_profile?: BotProfile;
  text?: string;
  attachments?: MessageAttachment[];
  blocks?: (KnownBlock | Block)[];
  pinned_to?: string[];
  permalink: string;
  ts: string;
}
interface PinnedFileItem {
  id: string;
  // TODO: Add all other possible properties here
}
interface PinnedItem {
  type: string;
  channel: string;
  created_by: string;
  created: number;
  message?: PinnedMessageItem;
  file?: PinnedFileItem;
}
export interface PinAddedEvent {
  type: 'pin_added';
  user: string;
  channel_id: string;
  item: PinnedItem;
  item_user: string;
  pin_count: string;
  pinned_info: {
    channel: string;
    pinned_by: string;
    pinned_ts: number;
  };
  event_ts: string;
}
export interface PinRemovedEvent {
  type: 'pin_removed';
  user: string;
  channel_id: string;
  item: PinnedItem;
  item_user: string;
  pin_count: string;
  pinned_info: {
    channel: string;
    pinned_by: string;
    pinned_ts: number;
  };
  has_pins: boolean;
  event_ts: string;
}
