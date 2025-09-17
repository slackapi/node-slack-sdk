import type {
  Block, // TODO: these will be combined into one in a new types release
  KnownBlock,
  LinkUnfurls,
  MessageAttachment,
  MessageMetadata,
} from '@slack/types';

import type { OptionalArgument } from '../helpers';

import type {
  CursorPaginationEnabled,
  OptionalTeamAssignable,
  TimelinePaginationEnabled,
  TokenOverridable,
} from './common';

export interface Channel {
  /** @description Channel ID for the message. */
  channel: string;
}
export interface ChannelAndTS extends Channel {
  /** @description Timestamp of the message. */
  ts: string;
}
interface ChannelAndMessageTS extends Channel {
  /** @description Timestamp of the message. */
  message_ts: string;
}
export interface AsUser {
  /**
   * @description Pass `true` to act as the authed user with {@link https://docs.slack.dev/reference/scopes/chat.write `chat:write:user` scope}.
   * Bot users in this context are considered authed users. If unused or `false`, the message will be acted upon with
   * {@link https://docs.slack.dev/reference/scopes/chat.write `chat:write:bot` scope}.
   */
  as_user?: boolean;
}
export interface LinkNames {
  /** @description Find and link channel names and usernames. */
  link_names?: boolean;
}
export interface Parse {
  /**
   * @description Change how messages are treated. Defaults to `none`.
   * @see {@link https://docs.slack.dev/messaging/formatting-message-text Formatting: Automatic parsing}.
   */
  parse?: 'full' | 'none';
}
interface Text {
  /**
   * @description Text of the message. If used in conjunction with `blocks` or `attachments`, `text` will be used
   * as fallback text for notifications only.
   */
  text: string;
}
interface MarkdownText {
  /**
   * @description Accepts message text formatted in markdown. This argument should not be used in conjunction with `blocks` or `text`. Limit this field to 12,000 characters.
   * @example **This is bold text**
   */
  markdown_text: string;
}
export interface ChannelAndText extends Channel, Text {}
export interface ChannelAndBlocks extends Channel, Partial<Text> {
  /**
   * @description An array of structured Blocks.
   * @see {@link https://docs.slack.dev/reference/block-kit/blocks Blocks reference}.
   */
  blocks: (KnownBlock | Block)[];
}
export interface ChannelAndAttachments extends Channel, Partial<Text> {
  /**
   * @description An array of structured attachments.
   * @see {@link https://docs.slack.dev/messaging/formatting-message-text#attachments Adding secondary attachments}.
   */
  attachments: MessageAttachment[];
}
export interface ChannelAndMarkdownText extends Channel, MarkdownText {}
// Models message-creation arguments, user must provide one of the following combinations:
// 1. channel and text
// 2. channel and blocks
// 3. channel and attachments
// 4. channel and markdown_text
type MessageContents = ChannelAndText | ChannelAndBlocks | ChannelAndAttachments | ChannelAndMarkdownText;
export interface ThreadTS {
  /**
   * @description Provide another message's `ts` value to post this message in a thread. Avoid using a reply's `ts`
   * value; use its parent's value instead.
   */
  thread_ts: string;
}
export interface WithinThreadReply extends Partial<ThreadTS> {
  /**
   * @description Used in conjunction with `thread_ts`, when set to `false` will make the reply only visibile within
   * a thread.
   */
  reply_broadcast?: false;
}
export interface BroadcastedThreadReply extends ThreadTS {
  /** @description Used in conjunction with `thread_ts`, when set to `true` will broadcast the reply to the channel. */
  reply_broadcast: boolean;
}
// For APIs supporting `reply_broadcast`, there are two options: either a broadcasted threaded reply,
// or not broadcasted. Broadcasted replies are necessarily threaded, so `thread_ts` becomes required.
type ReplyInThread = WithinThreadReply | BroadcastedThreadReply;

export interface Metadata {
  /** @description Object representing message metadata, which will be made accessible to any user or app. */
  metadata?: MessageMetadata;
}
export interface IconEmoji {
  as_user?: false;
  icon_url?: never;
  /**
   * @description Emoji to use as the icon for this message. Overrides `icon_url`.
   * Can only be used with `as_user` set to `false`.
   */
  icon_emoji?: string;
}
export interface IconURL {
  as_user?: false;
  icon_emoji?: never;
  /**
   * @description URL to an image to use as the icon for this message. `icon_emoji` takes precendence over this field.
   * Can only be used with `as_user` set to `false`.
   */
  icon_url?: string;
}
// Can only specify message icon via predefined authorship using one of emoji or URL, but not both.
type Icon = IconEmoji | IconURL;
export interface Username {
  as_user?: false;
  /** @description Set your bot's username. Can only be used with `as_user` set to `false`. */
  username?: string;
}
// This union keys on as_user: if it is undefined or false, then the Icon and Username types should be available
// and adhered to. Otherwise if true, then no icon or username fields should be available.
type Authorship =
  | (Icon & Username)
  | {
      /**
       * @description Pass `true` to act as the authed user with {@link https://docs.slack.dev/reference/scopes/chat.write `chat:write:user` scope}.
       * Bot users in this context are considered authed users. If unused or `false`, the message will be acted upon with
       * {@link https://docs.slack.dev/reference/scopes/chat.write `chat:write:bot` scope}.
       */
      as_user: true;
      icon_emoji?: never;
      icon_url?: never;
    };
export interface Unfurls {
  /** @description Pass `true` to enable unfurling of primarily text-based content. */
  unfurl_links?: boolean;
  /** @description Pass `false` to disable unfurling of media content. */
  unfurl_media?: boolean;
}

export interface ChatAppendStreamArguments extends TokenOverridable, ChannelAndTS, Partial<MarkdownText> {}

// https://docs.slack.dev/reference/methods/chat.delete
export interface ChatDeleteArguments extends ChannelAndTS, AsUser, TokenOverridable {}

// https://docs.slack.dev/reference/methods/chat.deleteScheduledMessage
export interface ChatDeleteScheduledMessageArguments extends Channel, AsUser, TokenOverridable {
  /** @description The `scheduled_message_id` returned from call to {@link https://docs.slack.dev/reference/methods/chat.scheduleMessage `chat.scheduleMessage`}. */
  scheduled_message_id: string;
}

// https://docs.slack.dev/reference/methods/chat.getPermalink
export interface ChatGetPermalinkArguments extends ChannelAndMessageTS, TokenOverridable {}

// https://docs.slack.dev/reference/methods/chat.meMessage
export interface ChatMeMessageArguments extends ChannelAndText, TokenOverridable {}

// https://docs.slack.dev/reference/methods/chat.postEphemeral
export type ChatPostEphemeralArguments = TokenOverridable &
  MessageContents & {
    /**
     * @description `id` of the user who will receive the ephemeral message.
     * The user should be in the channel specified by the `channel` argument.
     */
    user: string;
  } & Authorship &
  Parse &
  LinkNames &
  Partial<ThreadTS>;

// https://docs.slack.dev/reference/methods/chat.postMessage
export type ChatPostMessageArguments = TokenOverridable &
  MessageContents &
  ReplyInThread &
  Authorship &
  Parse &
  LinkNames &
  Metadata &
  Unfurls & {
    /** @description Disable Slack markup parsing by setting to `false`. Enabled by default. */
    mrkdwn?: boolean;
  };

// https://docs.slack.dev/reference/methods/chat.scheduleMessage
export type ChatScheduleMessageArguments = TokenOverridable &
  MessageContents & {
    /** @description Unix EPOCH timestamp of time in future to send the message. */
    post_at: string | number;
  } & ReplyInThread &
  Parse &
  LinkNames &
  AsUser &
  Metadata &
  Unfurls;

// https://docs.slack.dev/reference/methods/chat.scheduledMessages.list
export type ChatScheduledMessagesListArguments = OptionalArgument<
  TokenOverridable &
    CursorPaginationEnabled &
    OptionalTeamAssignable &
    Pick<TimelinePaginationEnabled, 'latest' | 'oldest'> &
    Partial<Channel>
>;

export interface ChatStartStreamArguments
  extends TokenOverridable,
    Channel,
    Partial<ThreadTS>,
    Partial<MarkdownText>,
    Unfurls {}

export type ChatStopStreamArguments = TokenOverridable &
  ChannelAndTS &
  Partial<MarkdownText> &
  Partial<Metadata> & {
    /**
     * Block formatted elements will be appended to the end of the message.
     */
    blocks?: (KnownBlock | Block)[];
  };

export interface SourceAndUnfurlID {
  /**
   * @description The source of the link to unfurl. The source may either be `composer`, when the link is inside the
   * message composer, or `conversations_history`, when the link has been posted to a conversation.
   */
  source: 'composer' | 'conversations_history';
  /**
   * @description The ID of the link to unfurl. Both `unfurl_id` and `source` must be provided together, or `channel`
   * and `ts` must be provided together.
   */
  unfurl_id: string;
}
type UnfurlTarget = ChannelAndTS | SourceAndUnfurlID;

// https://docs.slack.dev/reference/methods/chat.unfurl
export type ChatUnfurlArguments = {
  /**
   * @description URL-encoded JSON map with keys set to URLs featured in the the message, pointing to their unfurl
   * blocks or message attachments.
   */
  unfurls: LinkUnfurls;
} & UnfurlTarget &
  TokenOverridable & {
    /**
     * @description Provide a simply-formatted string to send as an ephemeral message to the user as invitation to
     * authenticate further and enable full unfurling behavior. Provides two buttons, Not now or Never ask me again.
     */
    user_auth_message?: string;
    /**
     * @description Set to `true` to indicate the user must install your Slack app to trigger unfurls for this domain.
     * Defaults to `false`.
     */
    user_auth_required?: boolean;
    /**
     * @description Send users to this custom URL where they will complete authentication in your app to fully trigger
     * unfurling. Value should be properly URL-encoded.
     */
    user_auth_url?: string;
    /**
     * @description Provide a JSON based array of structured blocks presented as URL-encoded string to send as an
     * ephemeral message to the user as invitation to authenticate further and enable full unfurling behavior.
     */
    user_auth_blocks?: (KnownBlock | Block)[];
  };

// https://docs.slack.dev/reference/methods/chat.update
export type ChatUpdateArguments = MessageContents & {
  /** @description Timestamp of the message to be updated. */
  ts: string;
} & TokenOverridable &
  AsUser &
  LinkNames &
  Metadata &
  Parse & {
    /** @description Array of new file ids that will be sent with this message. */
    file_ids?: string[];
    /** @description Broadcast an existing thread reply to make it visible to everyone in the channel or conversation. */
    reply_broadcast?: boolean;
  };
