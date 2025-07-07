import type { AnyBlock } from './block-kit/blocks';
import type { PlainTextElement } from './block-kit/composition-objects';

// TODO: breaking changes, use discriminated union for `fallback`, `text` and `block` properties, maybe LegacyAttachment
// vs. BlocksAttachment? as per https://api.slack.com/reference/messaging/attachments#legacy_fields
// "these fields are optional if you're including blocks as above. If you aren't, one of fallback or text are required"
// also further nested discriminated union types that could be helpful here:
// - LegacyAttachmentWithAuthor: if author_name is present, then author_icon and author_link are optional fields
// - LegacyAttachmentWithFooter: if footer is present, then footer_icon is an optional field
// - image_url and thumb_url cannot be used together
/**
 * Add {@link https://api.slack.com/messaging/composing/layouts#attachments secondary attachments} to your messages in Slack.
 * Message attachments are considered a legacy part of messaging functionality. They are not deprecated per se, but they may change in the future, in ways that reduce their visibility or utility. We recommend moving to Block Kit instead. Read more about {@link https://api.slack.com/messaging/composing/layouts#when-to-use-attachments when to use message attachments}.
 * @see {@link https://api.slack.com/reference/messaging/attachments Secondary message attachments reference documentation}
 */
export interface MessageAttachment {
  /**
   * @description An array of {@link KnownBlock layout blocks} in the same format
   * {@link https://api.slack.com/block-kit/building as described in the building blocks guide}.
   */
  blocks?: AnyBlock[];
  /**
   * @description A plain text summary of the attachment used in clients that
   * don't show formatted text (e.g. mobile notifications).
   */
  fallback?: string; // either this or text must be defined
  /**
   * @description Changes the color of the border on the left side of this attachment from the default gray. Can either
   * be one of `good` (green), `warning` (yellow), `danger` (red), or any hex color code (eg. `#439FE0`)
   */
  color?: 'good' | 'warning' | 'danger' | string;
  /**
   * @description Text that appears above the message attachment block. It can be formatted as plain text,
   * or with {@link https://api.slack.com/reference/surfaces/formatting#basics `mrkdwn`} by including it in the `mrkdwn_in` field.
   */
  pretext?: string;
  /**
   * @description Small text used to display the author's name.
   */
  author_name?: string;
  /**
   * @description A valid URL that will hyperlink the `author_name` text. Will only work if `author_name` is present.
   */
  author_link?: string;
  /**
   * @description A valid URL that displays a small 16px by 16px image to the left of the `author_name` text.
   * Will only work if `author_name` is present.
   */
  author_icon?: string; // author_name must be present
  author_subname?: string; // TODO: not documented in https://api.slack.com/reference/messaging/attachments
  /**
   * @description Large title text near the top of the attachment.
   */
  title?: string;
  /**
   * @description A valid URL that turns the `title` text into a hyperlink.
   */
  title_link?: string; // title must be present
  /**
   * @description The main body text of the attachment. It can be formatted as plain text, or with
   * {@link https://api.slack.com/reference/surfaces/formatting#basics `mrkdwn`} by including it in the `mrkdwn_in` field.
   * The content will automatically collapse if it contains 700+ characters or 5+ line breaks, and will display
   * a "Show more..." link to expand the content.
   */
  text?: string; // either this or fallback must be defined
  /**
   * @description An array of {@link MessageAttachmentField} that get displayed in a table-like way
   * (see {@link https://api.slack.com/reference/messaging/attachments#example this example}).
   * For best results, include no more than 2-3 field objects.
   */
  fields?: MessageAttachmentField[];
  /**
   * @description A valid URL to an image file that will be displayed at the bottom of the attachment.
   * We support GIF, JPEG, PNG, and BMP formats.
   * Large images will be resized to a maximum width of 360px or a maximum height of 500px, while still
   * maintaining the original aspect ratio. Cannot be used with `thumb_url`.
   */
  image_url?: string;
  /**
   * @description A valid URL to an image file that will be displayed as a thumbnail on the right side of
   * a message attachment. We currently support the following formats: GIF, JPEG, PNG, and BMP.
   * The thumbnail's longest dimension will be scaled down to 75px while maintaining the aspect ratio of the image.
   * The file size of the image must also be less than 500 KB.
   * For best results, please use images that are already 75px by 75px.
   */
  thumb_url?: string;
  /**
   * @description Some brief text to help contextualize and identify an attachment. Limited to 300 characters,
   * and may be truncated further when displayed to users in environments with limited screen real estate.
   */
  footer?: string;
  /**
   * @description A valid URL to an image file that will be displayed beside the `footer` text.
   * Will only work if `footer` is present. We'll render what you provide at 16px by 16px.
   * It's best to use an image that is similarly sized.
   */
  footer_icon?: string;
  /**
   * @description A Unix timestamp that is used to relate your attachment to a specific time.
   * The attachment will display the additional timestamp value as part of the attachment's footer.
   * Your message's timestamp will be displayed in varying ways, depending on how far in the past or future it is,
   * relative to the present. Form factors, like mobile versus desktop may also transform its rendered appearance.
   */
  ts?: string;
  actions?: AttachmentAction[]; // TODO: https://api.slack.com/legacy/message-buttons#crafting_your_message
  callback_id?: string; // TODO: https://api.slack.com/legacy/message-buttons#crafting_your_message
  /**
   * @description Field names that should be {@link https://api.slack.com/reference/surfaces/formatting#basics formatted by `mrkdwn` syntax}.
   * The fields that can be formatted in this way include the names of the `fields` property, or
   * the `text` or `pretext` properties.
   */
  mrkdwn_in?: ('pretext' | 'text' | 'fields')[]; // TODO: I think `fields` here is wrong? instead they should reference field names from `fields`
  app_unfurl_url?: string; // TODO: not documented in https://api.slack.com/reference/messaging/attachments
  is_app_unfurl?: boolean; // TODO: not documented in https://api.slack.com/reference/messaging/attachments
  app_id?: string; // TODO: not documented in https://api.slack.com/reference/messaging/attachments
  bot_id?: string; // TODO: not documented in https://api.slack.com/reference/messaging/attachments
  preview?: MessageAttachmentPreview; // https://docs.slack.dev/reference/methods/chat.unfurl TODO: not documented in https://api.slack.com/reference/messaging/attachments, also unclear why this links to chat.unfurl?
}

/**
 * @description A field object to include in a {@link MessageAttachment}.
 * @see {@link https://api.slack.com/reference/messaging/attachments#field_objects Field objects reference}.
 */
export interface MessageAttachmentField {
  /**
   * @description Shown as a bold heading displayed in the field object. It cannot contain markup and
   * will be escaped for you.
   */
  title: string;
  /**
   * @description The text value displayed in the field object. It can be formatted as plain text, or with {@link https://api.slack.com/reference/surfaces/formatting#basics `mrkdwn`} by using the `mrkdwn_in` option of {@link MessageAttachment}.
   */
  value: string;
  /**
   * @description Indicates whether the field object is short enough to be displayed side-by-side with
   * other field objects. Defaults to `false`.
   */
  short?: boolean;
}

// https://docs.slack.dev/reference/methods/chat.unfurl
interface MessageAttachmentPreview {
  type?: string;
  can_remove?: boolean;
  title?: PlainTextElement;
  subtitle?: PlainTextElement;
  iconUrl?: string;
}

interface AttachmentAction {
  id?: string;
  confirm?: Confirmation;
  data_source?: 'static' | 'channels' | 'conversations' | 'users' | 'external';
  min_query_length?: number;
  name?: string;
  options?: OptionField[];
  option_groups?: {
    text: string;
    options: OptionField[];
  }[];
  selected_options?: OptionField[];
  style?: 'default' | 'primary' | 'danger';
  text: string;
  type: 'button' | 'select';
  value?: string;
  url?: string;
}

interface OptionField {
  description?: string;
  text: string;
  value: string;
}

// Used in bolt-js block-action types
export interface Confirmation {
  dismiss_text?: string;
  ok_text?: string;
  text: string;
  title?: string;
}

// Used in web-api chat.* API method request parameters
export interface LinkUnfurls {
  [linkUrl: string]: MessageAttachment;
}
