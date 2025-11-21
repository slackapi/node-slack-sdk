// This file contains objects documented here: https://docs.slack.dev/reference/block-kit/blocks
import type {
  Button,
  Checkboxes,
  Datepicker,
  DateTimepicker,
  EmailInput,
  FeedbackButtons,
  FileInput,
  IconButton,
  ImageElement,
  MultiSelect,
  NumberInput,
  Overflow,
  PlainTextInput,
  RadioButtons,
  RichTextInput,
  RichTextList,
  RichTextPreformatted,
  RichTextQuote,
  RichTextSection,
  Select,
  Timepicker,
  URLInput,
  WorkflowButton,
} from './block-elements';
import type {
  PlainTextElement,
  RawTextElement,
  SlackFileImageObject,
  TextObject,
  UrlImageObject,
} from './composition-objects';

export interface Block {
  /**
   * @description The type of block.
   */
  type: string;
  /**
   * @description A string acting as a unique identifier for a block. If not specified, a `block_id` will be generated.
   * You can use this `block_id` when you receive an interaction payload to
   * {@link https://docs.slack.dev/interactivity/handling-user-interaction#payloads identify the source of the action}.
   * Maximum length for this field is 255 characters. `block_id` should be unique for each message and each iteration of
   * a message. If a message is updated, use a new `block_id`.
   */
  block_id?: string;
}

/**
 * A helper union type of all known Blocks, as listed out on the
 * {@link https://docs.slack.dev/reference/block-kit/blocks Blocks reference}.
 */
export type KnownBlock =
  | ActionsBlock
  | ContextBlock
  | ContextActionsBlock
  | DividerBlock
  | FileBlock
  | HeaderBlock
  | ImageBlock
  | InputBlock
  | MarkdownBlock
  | RichTextBlock
  | SectionBlock
  | TableBlock
  | VideoBlock;

/**
 * A helper union type of all known Blocks as well as the generic {@link Block} interface. A full list of known blocks
 * is available here: {@link https://docs.slack.dev/reference/block-kit/blocks Blocks reference}.
 */
export type AnyBlock = KnownBlock | Block;

/**
 * A helper union type of all Block Elements that can be used in an {@link ActionsBlock}.
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/actions-block Actions block reference}.
 */
export type ActionsBlockElement =
  | Button
  | Checkboxes
  | Datepicker
  | DateTimepicker
  | MultiSelect
  | Overflow
  | RadioButtons
  | Select
  | Timepicker
  | WorkflowButton
  | RichTextInput;

/**
 * @description Holds multiple interactive elements.
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/actions-block Actions block reference}.
 */
export interface ActionsBlock extends Block {
  /**
   * @description The type of block. For an actions block, `type` is always `actions`.
   */
  type: 'actions';
  /**
   * @description An array of {@link InteractiveElements} objects.
   * There is a maximum of 25 elements in each action block.
   */
  elements: ActionsBlockElement[]; // TODO: breaking change: min 1 item
}

/**
 * A helper union type of all Block Elements that can be used in a {@link ContextBlock}.
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/context-block Context block reference}.
 */
export type ContextBlockElement = ImageElement | TextObject;

/**
 * @description Displays contextual info, which can include both images and text.
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/context-block Context block reference}.
 */
export interface ContextBlock extends Block {
  /**
   * @description The type of block. For a context block, `type` is always `context`.
   */
  type: 'context';
  /**
   * @description An array of {@link ImageElement}, {@link PlainTextElement} or {@link MrkdwnElement} objects.
   * Maximum number of items is 10.
   */
  elements: ContextBlockElement[]; // TODO: breaking change: min 1 item
}

/**
 * A helper union type of all Block Elements that can be used in a {@link ContextActionsBlock}.
 */
export type ContextActionsBlockElement = FeedbackButtons | IconButton;

/**
 * @description Displays actions as contextual info, which can include both feedback buttons and icon buttons.
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/context-actions-block Context actions block reference}.
 */
export interface ContextActionsBlock extends Block {
  /**
   * @description The type of block. For a context actions block, `type` is always `context_actions`.
   */
  type: 'context_actions';
  /**
   * @description An array of {@link FeedbackButtons} or {@link IconButton} block elements. Maximum number of items is 5.
   */
  elements: ContextActionsBlockElement[];
}

/**
 * @description Visually separates pieces of info inside of a message. A content divider, like an `<hr>`, to split up
 * different blocks inside of a message. The divider block is nice and neat, requiring only a `type`.
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/divider-block Divider block reference}.
 */
export interface DividerBlock extends Block {
  /**
   * @description The type of block. For a divider block, `type` is always `divider`.
   */
  type: 'divider';
}

/**
 * @description Displays a {@link https://docs.slack.dev/messaging/working-with-files#remote remote file}. You can't add this block to
 * app surfaces directly, but it will show up when {@link https://docs.slack.dev/messaging/retrieving-messages retrieving messages}
 * that contain remote files. If you want to add remote files to messages,
 * {@link https://docs.slack.dev/messaging/working-with-files#remote follow our guide}.
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/file-block File block reference}.
 */
export interface FileBlock extends Block {
  /**
   * @description The type of block. For a file block, `type` is always `file`.
   */
  type: 'file';
  /**
   * @description At the moment, source will always be `remote` for a remote file.
   */
  source: string; // TODO: breaking change: set this to the string literal 'remote'
  /**
   * @description The external unique ID for this file.
   */
  external_id: string;
}

/**
 * @description Displays a larger-sized text block. A `header` is a plain-text block that displays in a larger, bold
 * font. Use it to delineate between different groups of content in your app's surfaces.
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/header-block Header block reference}.
 */
export interface HeaderBlock extends Block {
  /**
   * @description The type of block. For a header block, `type` is always `header`.
   */
  type: 'header';
  /**
   * @description The text for the block, in the form of a {@link PlainTextElement}.
   * Maximum length for the text in this field is 150 characters.
   */
  text: PlainTextElement;
}

/**
 * @description Displays an image. A simple image block, designed to make those cat photos really pop.
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/image-block Image block reference}.
 */
export type ImageBlock = {
  /**
   * @description The type of block. For an image block, `type` is always `image`.
   */
  type: 'image';
  /**
   * @description A plain-text summary of the image. This should not contain any markup.
   * Maximum length for this field is 2000 characters.
   */
  alt_text: string;
  /**
   * @description An optional title for the image in the form of a {@link PlainTextElement} object.
   * Maximum length for the text in this field is 2000 characters.
   */
  title?: PlainTextElement;
} & Block &
  (UrlImageObject | SlackFileImageObject);

/**
 * A helper union type of all Block Elements that can be used in an {@link InputBlock}.
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/input-block Input block reference}.
 */
export type InputBlockElement =
  | Checkboxes
  | Datepicker
  | DateTimepicker
  | EmailInput
  | FileInput
  | MultiSelect
  | NumberInput
  | PlainTextInput
  | RadioButtons
  | RichTextInput
  | Select
  | Timepicker
  | URLInput;

/**
 * @description Collects information from users via block elements.
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/input-block Input block reference}.
 * @see {@link https://docs.slack.dev/surfaces/modals#gathering_input Collecting input in modals guide}.
 * @see {@link https://docs.slack.dev/surfaces/app-home Collecting input in Home tabs guide}.
 */
export interface InputBlock extends Block {
  /**
   * @description The type of block. For an input block, `type` is always `input`.
   */
  type: 'input';
  /**
   * @description A label that appears above an input element in the form of a {@link PlainTextElement} object.
   * Maximum length for the text in this field is 2000 characters.
   */
  label: PlainTextElement;
  /**
   * @description An optional hint that appears below an input element in a lighter grey. It must be a
   * {@link PlainTextElement object}. Maximum length for the `text` in this field is 2000 characters.
   */
  hint?: PlainTextElement;
  /**
   * @description A boolean that indicates whether the input element may be empty when a user submits the modal.
   * Defaults to `false`.
   */
  optional?: boolean;
  /**
   * @description A block element.
   */
  element: InputBlockElement;
  /**
   * @description A boolean that indicates whether or not the use of elements in this block should dispatch a
   * {@link https://docs.slack.dev/reference/interaction-payloads/block_actions-payload block_actions payload}. Defaults to `false`.
   */
  dispatch_action?: boolean;
}

/**
 * @description This block can be used with AI apps when you expect a markdown response from an LLM that can get lost in
 * translation rendering in Slack. Providing it in a markdown block leaves the translating to Slack to ensure your message
 * appears as intended. Note that passing a single block may result in multiple blocks after translation.
 * @see {@link https://api.slack.com/reference/block-kit/blocks#markdown Markdown block reference}.
 */
export interface MarkdownBlock extends Block {
  /**
   * @description The type of block. For a markdown block, `type` is always `markdown`.
   */
  type: 'markdown';
  /**
   * @description The standard markdown-formatted text. Limit 12,000 characters max.
   */
  text: string;
}

/**
 * A helper union type of all Block Elements that can be used in a {@link RichTextBlock}.
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/rich-text-block Rich text block reference}.
 */
export type RichTextBlockElement = RichTextSection | RichTextList | RichTextQuote | RichTextPreformatted;

/**
 * @description Displays formatted, structured representation of text. It is also the output of the Slack client's
 * WYSIWYG message composer, so all messages sent by end-users will have this format. Use this block to include
 * user-defined formatted text in your Block Kit payload. While it is possible to format text with `mrkdwn`,
 * `rich_text` is strongly preferred and allows greater flexibility.
 * You might encounter a `rich_text` block in a message payload, as a built-in type in workflow apps, or as output of
 * the {@link RichTextInput}.
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/rich-text-block Rich text block reference}.
 */
export interface RichTextBlock extends Block {
  /**
   * @description The type of block. For a rich text block, `type` is always `rich_text`.
   */
  type: 'rich_text';
  elements: RichTextBlockElement[];
}

/**
 * A helper union type of all Block Elements that can be used as an accessory in a {@link SectionBlock}.
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/section-block Section block reference}.
 */
export type SectionBlockAccessory =
  | Button
  | Checkboxes
  | Datepicker
  | ImageElement
  | MultiSelect
  | Overflow
  | RadioButtons
  | Select
  | Timepicker
  | WorkflowButton;

// TODO: breaking change: use a discriminative union to represent section block using `text` or `fields` but
// not both or neither.
/**
 * @description Displays text, possibly alongside block elements. A section can be used as a simple text block, in
 * combination with text fields, or side-by-side with certain
 * {@link https://docs.slack.dev/reference/block-kit/block-elements block elements}.
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/section-block Section block reference}.
 */
export interface SectionBlock extends Block {
  /**
   * @description The type of block. For a section block, `type` is always `section`.
   */
  type: 'section';
  /**
   * @description The text for the block, in the form of a {@link TextObject}. Minimum length for the `text` in this
   * field is 1 and maximum length is 3000 characters. This field is not required if a valid array of `fields` objects
   * is provided instead.
   */
  text?: TextObject;
  /**
   * @description Required if no `text` is provided. An array of text objects. Any text objects included with `fields`
   * will be rendered in a compact format that allows for 2 columns of side-by-side text. Maximum number of items is 10.
   * Maximum length for the text in each item is 2000 characters.
   * {@link https://app.slack.com/block-kit-builder/#%7B%22blocks%22:%5B%7B%22type%22:%22section%22,%22text%22:%7B%22text%22:%22A%20message%20*with%20some%20bold%20text*%20and%20_some%20italicized%20text_.%22,%22type%22:%22mrkdwn%22%7D,%22fields%22:%5B%7B%22type%22:%22mrkdwn%22,%22text%22:%22*Priority*%22%7D,%7B%22type%22:%22mrkdwn%22,%22text%22:%22*Type*%22%7D,%7B%22type%22:%22plain_text%22,%22text%22:%22High%22%7D,%7B%22type%22:%22plain_text%22,%22text%22:%22String%22%7D%5D%7D%5D%7D Click here for an example}.
   */
  fields?: TextObject[]; // either this or text must be defined, also min 1 item
  /**
   * @description One of the compatible element objects.
   */
  accessory?: SectionBlockAccessory;
  /**
   * Whether or not this section block's text should always expand when rendered. If false or not provided, it may be rendered with a 'see more' option to expand and show the full text. For AI Assistant apps, this allows the app to post long messages without users needing to click 'see more' to expand the message.
   */
  expand?: boolean;
}

/**
 * @description Displays structured information in a table.
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/table-block Table block reference}.
 */
export interface TableBlock extends Block {
  /**
   * @description The type of block. For a table block, `type` is always `table`.
   */
  type: 'table';
  /**
   * @description An array consisting of table rows. Maximum 100 rows. Each row object is an array with a max of 20 table cells. Table cells can have a type of raw_text or rich_text.
   */
  rows: (RichTextBlock | RawTextElement)[][];
  /**
   * @description An array describing column behavior. If there are fewer items in the column_settings array than there are columns in the table, then the items in the the column_settings array will describe the same number of columns in the table as there are in the array itself. Any additional columns will have the default behavior. Maximum 20 items.
   */
  column_settings?: TableBlockColumnSettings[];
}

/**
 * Schema for column_settings of the table block.
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/table-block/#schema-for-column_settings}.
 */
interface TableBlockColumnSettings {
  /**
   * @description The alignment for items in this column. Can be left, center, or right. Defaults to left if not defined.
   */
  align?: 'left' | 'center' | 'right';
  /**
   * @description Whether the contents of this column should be wrapped or not. Defaults to false if not defined.
   */
  is_wrapped?: boolean;
}

/**
 * @description Displays an embedded video player. A video block is designed to embed videos in all app surfaces (e.g.
 * link unfurls, messages, modals, App Home) — anywhere you can put blocks! To use the video block within your app, you
 * must have the {@link https://docs.slack.dev/reference/scopes/links.embed.write `links.embed:write` scope}.
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/video-block Video block reference}.
 */
export interface VideoBlock extends Block {
  /**
   * @description The type of block. For a video block, `type` is always `video`.
   */
  type: 'video';
  /**
   * @description The URL to be embedded. Must match any existing
   * {@link https://docs.slack.dev/messaging/unfurling-links-in-messages unfurl domains} within the app
   * and point to a HTTPS URL.
   */
  video_url: string;
  /**
   * @description The thumbnail image URL.
   */
  thumbnail_url: string;
  /**
   * @description A tooltip for the video. Required for accessibility.
   */
  alt_text: string;
  /**
   * @description Video title as a {@link PlainTextElement} object. `text` within must be less than 200 characters.
   */
  title: PlainTextElement;
  /**
   * @description Hyperlink for the title text. Must correspond to the non-embeddable URL for the video.
   * Must go to an HTTPS URL.
   */
  title_url?: string;
  /**
   * @description Author name to be displayed. Must be less than 50 characters.
   */
  author_name?: string;
  /**
   * @description The originating application or domain of the video, e.g. YouTube.
   */
  provider_name?: string;
  /**
   * @description Icon for the video provider, e.g. YouTube icon.
   */
  provider_icon_url?: string;
  /**
   * @description Description for video using a {@link PlainTextElement} object.
   */
  description?: PlainTextElement;
}
