import type { Block, KnownBlock } from '../block-kit/blocks';
import type { BotProfile } from '../common/bot-profile';
import type { MessageAttachment } from '../message-attachments';

type ChannelTypes = 'channel' | 'group' | 'im' | 'mpim' | 'app_home';

export type AllMessageEvents =
  | GenericMessageEvent
  | BotMessageEvent
  | ChannelArchiveMessageEvent
  | ChannelJoinMessageEvent
  | ChannelLeaveMessageEvent
  | ChannelNameMessageEvent
  | ChannelPostingPermissionsMessageEvent
  | ChannelPurposeMessageEvent
  | ChannelTopicMessageEvent
  | ChannelUnarchiveMessageEvent
  | EKMAccessDeniedMessageEvent
  | FileShareMessageEvent
  | MeMessageEvent
  | MessageChangedEvent
  | MessageDeletedEvent
  | MessageRepliedEvent
  // | ReminderAddEvent // TODO: missing
  | ThreadBroadcastMessageEvent;

export type MessageEvent = AllMessageEvents;

export interface GenericMessageEvent {
  type: 'message';
  subtype: undefined;
  event_ts: string;
  team?: string;
  channel: string;
  user: string;
  bot_id?: string;
  bot_profile?: BotProfile;
  text?: string;
  ts: string;
  thread_ts?: string;
  channel_type: ChannelTypes;
  attachments?: MessageAttachment[];
  blocks?: (KnownBlock | Block)[];
  files?: File[];
  edited?: {
    user: string;
    ts: string;
  };
  client_msg_id?: string;
  parent_user_id?: string;

  // TODO: optional types that maybe should flow into other subtypes?
  is_starred?: boolean;
  pinned_to?: string[];
  reactions?: {
    name: string;
    count: number;
    users: string[];
  }[];

  // TODO: add properties to this field once it's publicly released
  assistant_thread?: Record<string, unknown>;
}

export interface BotMessageEvent {
  type: 'message';
  subtype: 'bot_message';
  event_ts: string;
  channel: string;
  channel_type: ChannelTypes;
  streaming_state?: 'in_progress' | 'completed' | 'errored';
  ts: string;
  text: string;
  bot_id: string;
  username?: string;
  icons?: {
    [size: string]: string;
  };

  // copied from MessageEvent
  // TODO: is a user really optional? likely for things like IncomingWebhook authored messages
  user?: string;
  attachments?: MessageAttachment[];
  blocks?: (KnownBlock | Block)[];
  edited?: {
    user: string;
    ts: string;
  };
  thread_ts?: string;
}

export interface ChannelArchiveMessageEvent {
  type: 'message';
  subtype: 'channel_archive';
  team: string;
  user: string;
  channel: string;
  channel_type: ChannelTypes;
  text: string;
  ts: string;
  event_ts: string;
}

export interface ChannelJoinMessageEvent {
  type: 'message';
  subtype: 'channel_join';
  team: string;
  user: string;
  inviter: string;
  channel: string;
  channel_type: ChannelTypes;
  text: string;
  ts: string;
  event_ts: string;
}

export interface ChannelLeaveMessageEvent {
  type: 'message';
  subtype: 'channel_leave';
  team: string;
  user: string;
  channel: string;
  channel_type: ChannelTypes;
  text: string;
  ts: string;
  event_ts: string;
}

export interface ChannelNameMessageEvent {
  type: 'message';
  subtype: 'channel_name';
  team: string;
  user: string;
  name: string;
  old_name: string;
  channel: string;
  channel_type: ChannelTypes;
  text: string;
  ts: string;
  event_ts: string;
}

export interface ChannelPostingPermissionsMessageEvent {
  type: 'message';
  subtype: 'channel_posting_permissions';
  user: string;
  channel: string;
  channel_type: ChannelTypes;
  text: string;
  ts: string;
  event_ts: string;
}

export interface ChannelPurposeMessageEvent {
  type: 'message';
  subtype: 'channel_purpose';
  user: string;
  channel: string;
  channel_type: ChannelTypes;
  text: string;
  purpose: string;
  ts: string;
  event_ts: string;
}

export interface ChannelTopicMessageEvent {
  type: 'message';
  subtype: 'channel_topic';
  user: string;
  channel: string;
  channel_type: ChannelTypes;
  text: string;
  topic: string;
  ts: string;
  event_ts: string;
}

export interface ChannelUnarchiveMessageEvent {
  type: 'message';
  subtype: 'channel_unarchive';
  team: string;
  user: string;
  channel: string;
  channel_type: ChannelTypes;
  text: string;
  ts: string;
  event_ts: string;
}

export interface EKMAccessDeniedMessageEvent {
  type: 'message';
  subtype: 'ekm_access_denied';
  event_ts: string;
  channel: string;
  channel_type: ChannelTypes;
  ts: string;
  text: string; // This will not have any meaningful content within
  user: 'UREVOKEDU';
}

export interface FileShareMessageEvent {
  type: 'message';
  subtype: 'file_share';
  text: string;
  attachments?: MessageAttachment[];
  blocks?: (KnownBlock | Block)[];
  files?: File[];
  upload?: boolean;
  display_as_bot?: boolean;
  x_files?: string[];
  user: string;
  parent_user_id?: string;
  ts: string;
  thread_ts?: string;
  channel: string;
  channel_type: ChannelTypes;
  event_ts: string;
}

export interface MeMessageEvent {
  type: 'message';
  subtype: 'me_message';
  event_ts: string;
  channel: string;
  channel_type: ChannelTypes;
  user: string;
  text: string;
  ts: string;
}

export interface MessageChangedEvent {
  type: 'message';
  subtype: 'message_changed';
  event_ts: string;
  hidden: true;
  channel: string;
  channel_type: ChannelTypes;
  ts: string;
  message: MessageEvent;
  previous_message: MessageEvent;
}

export interface MessageDeletedEvent {
  type: 'message';
  subtype: 'message_deleted';
  event_ts: string;
  hidden: true;
  channel: string;
  channel_type: ChannelTypes;
  ts: string;
  deleted_ts: string;
  previous_message: MessageEvent;
}

export interface MessageRepliedEvent {
  type: 'message';
  subtype: 'message_replied';
  event_ts: string;
  hidden: true;
  channel: string;
  channel_type: ChannelTypes;
  ts: string;
  message: MessageEvent & {
    // TODO: should this be the union of all message events with type 'message'?
    thread_ts: string;
    reply_count: number;
    replies: MessageEvent[]; // TODO: should this be the union of all message events with type 'message'?
  };
}

// the `reply_broadcast` message subtype is omitted because it is discontinued

export interface ThreadBroadcastMessageEvent {
  type: 'message';
  subtype: 'thread_broadcast';
  event_ts: string;
  text: string;
  attachments?: MessageAttachment[];
  blocks?: (KnownBlock | Block)[];
  user: string;
  ts: string;
  thread_ts?: string;
  root: (GenericMessageEvent | BotMessageEvent) & {
    thread_ts: string;
    reply_count: number;
    reply_users_count: number;
    latest_reply: string;
    reply_users: string[];
  };
  client_msg_id: string;
  channel: string;
  channel_type: ChannelTypes;
}

interface File {
  id: string;
  created: number;
  name: string | null;
  title: string | null;
  mimetype: string;
  filetype: string;
  pretty_type: string;
  user?: string;
  editable: boolean;
  size: number;
  mode: 'hosted' | 'external' | 'snippet' | 'post';
  is_external: boolean;
  external_type: string | null;
  is_public: boolean;
  public_url_shared: boolean;
  display_as_bot: boolean;
  username: string | null;

  // Authentication required
  url_private?: string;
  url_private_download?: string;

  // Thumbnails (authentication still required)
  thumb_64?: string;
  thumb_80?: string;
  thumb_160?: string;
  thumb_360?: string;
  thumb_360_w?: number;
  thumb_360_h?: number;
  thumb_360_gif?: string;
  thumb_480?: string;
  thumb_720?: string;
  thumb_960?: string;
  thumb_1024?: string;
  permalink: string;
  permalink_public?: string;
  edit_link?: string;
  image_exif_rotation?: number;
  original_w?: number;
  original_h?: number;
  deanimate_gif?: string;

  // Posts
  preview?: string;
  preview_highlight?: string;
  lines?: string;
  lines_more?: string;
  preview_is_truncated?: boolean;
  has_rich_preview?: boolean;

  shares?: {
    // biome-ignore lint/suspicious/noExplicitAny: TODO: type shares
    [key: string]: any;
  };
  channels: string[] | null;
  groups: string[] | null;
  users?: string[];
  pinned_to?: string[];
  reactions?: {
    // biome-ignore lint/suspicious/noExplicitAny: TODO: type reactions
    [key: string]: any;
  }[];
  is_starred?: boolean;
  num_stars?: number;

  initial_comment?: string;
  comments_count?: string;
}
