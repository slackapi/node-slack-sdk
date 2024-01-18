// This file contains objects documented here: https://api.slack.com/reference/block-kit/blocks

import { PlainTextElement, MrkdwnElement } from './composition-objects';
import { Actionable } from './extensions';
import {
  Button,
  Checkboxes,
  Datepicker,
  DateTimepicker,
  EmailInput,
  FileInput,
  ImageElement,
  MultiSelect,
  NumberInput,
  Overflow,
  PlainTextInput,
  RadioButtons,
  Select,
  Timepicker,
  URLInput,
  WorkflowButton,
  RichTextSection,
  RichTextList,
  RichTextQuote,
  RichTextPreformatted,
  RichTextInput,
} from './block-elements';

export interface Block {
  type: string;
  /**
   * @description A string acting as a unique identifier for a block. If not specified, a `block_id` will be generated.
   * You can use this `block_id` when you receive an interaction payload to
   * {@link https://api.slack.com/interactivity/handling#payloads identify the source of the action}.
   * Maximum length for this field is 255 characters. `block_id` should be unique for each message and each iteration of
   * a message. If a message is updated, use a new `block_id`.
   */
  block_id?: string;
}

export type KnownBlock = ImageBlock | ContextBlock | ActionsBlock | DividerBlock |
SectionBlock | InputBlock | FileBlock | HeaderBlock | VideoBlock | RichTextBlock;

/**
 * @description Holds multiple interactive elements.
 * @see {@link https://api.slack.com/reference/block-kit/blocks#actions Actions block reference}.
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
  elements: (Button | Checkboxes | Datepicker | DateTimepicker | MultiSelect | Overflow | RadioButtons | Select |
  Timepicker | WorkflowButton | RichTextInput)[];
}

/**
 * @description Displays contextual info, which can include both images and text.
 * @see {@link https://api.slack.com/reference/block-kit/blocks#context Context block reference}.
 */
export interface ContextBlock extends Block {
  /**
   * @description The type of block. For a context block, `type` is always `context`.
   */
  type: 'context';
  // TODO: use the future planned plaintext/mrkdwn union here instead
  /**
   * @description An array of {@link ImageElement}, {@link PlainTextElement} or {@link MrkdwnElement} objects.
   * Maximum number of items is 10.
   */
  elements: (ImageElement | PlainTextElement | MrkdwnElement)[];
}

/**
 * @description Visually separates pieces of info inside of a message. A content divider, like an `<hr>`, to split up
 * different blocks inside of a message. The divider block is nice and neat, requiring only a `type`.
 * @see {@link https://api.slack.com/reference/block-kit/blocks#divider Divider block reference}.
 */
export interface DividerBlock extends Block {
  /**
   * @description The type of block. For a divider block, `type` is always `divider`.
   */
  type: 'divider';
}

/**
 * @description Displays a {@link https://api.slack.com/messaging/files/remote remote file}. You can't add this block to
 * app surfaces directly, but it will show up when {@link https://api.slack.com/messaging/retrieving retrieving messages}
 * that contain remote files. If you want to add remote files to messages,
 * {@link https://api.slack.com/messaging/files/remote follow our guide}.
 * @see {@link https://api.slack.com/reference/block-kit/blocks#file File block reference}.
 */
export interface FileBlock extends Block {
  /**
   * @description The type of block. For a file block, `type` is always `file`.
   */
  type: 'file';
  /**
   * @description At the moment, source will always be `remote` for a remote file.
   */
  source: string; // TODO: breaking change: set this to the string literal 'remote' ?
  /**
   * @description The external unique ID for this file.
   */
  external_id: string;
}

/**
 * @description Displays a larger-sized text block. A `header` is a plain-text block that displays in a larger, bold
 * font. Use it to delineate between different groups of content in your app's surfaces.
 * @see {@link https://api.slack.com/reference/block-kit/blocks#header Header block reference}.
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
 * @see {@link https://api.slack.com/reference/block-kit/blocks#image Image block reference}.
 */
export interface ImageBlock extends Block {
  /**
   * @description The type of block. For an image block, `type` is always `image`.
   */
  type: 'image';
  /**
   * @description The URL of the image to be displayed. Maximum length for this field is 3000 characters.
   */
  image_url: string;
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
}

/**
 * @description Collects information from users via block elements.
 * @see {@link https://api.slack.com/reference/block-kit/blocks#input Input block reference}.
 * @see {@link https://api.slack.com/surfaces/modals#gathering_input Collecting input in modals guide}.
 * @see {@link https://api.slack.com/surfaces/app-home#gathering_input Collecting input in Home tabs guide}.
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
  element: Select | MultiSelect | Datepicker | Timepicker | DateTimepicker | PlainTextInput | URLInput | EmailInput
  | NumberInput | RadioButtons | Checkboxes | RichTextInput | FileInput;
  /**
   * @description A boolean that indicates whether or not the use of elements in this block should dispatch a
   * {@link https://api.slack.com/reference/interaction-payloads/block-actions block_actions payload}. Defaults to `false`.
   */
  dispatch_action?: boolean;
}

// TODO: breaking change: use a discriminative union to represent section block using `text` or `fields` but
// not both or neither.
/**
 * @description Displays text, possibly alongside block elements. A section can be used as a simple text block, in
 * combination with text fields, or side-by-side with certain
 * {@link https://api.slack.com/reference/messaging/block-elements block elements}.
 * @see {@link https://api.slack.com/reference/block-kit/blocks#section Section block reference}.
 */
export interface SectionBlock extends Block {
  /**
   * @description The type of block. For a section block, `type` is always `section`.
   */
  type: 'section';
  /**
   * @description The text for the block, in the form of a text object. Minimum length for the `text` in this field is
   * 1 and maximum length is 3000 characters. This field is not required if a valid array of `fields` objects is
   * provided instead.
   */
  text?: PlainTextElement | MrkdwnElement;
  /**
   * @description Required if no `text` is provided. An array of text objects. Any text objects included with `fields`
   * will be rendered in a compact format that allows for 2 columns of side-by-side text. Maximum number of items is 10.
   * Maximum length for the text in each item is 2000 characters.
   * {@link https://app.slack.com/block-kit-builder/#%7B%22blocks%22:%5B%7B%22type%22:%22section%22,%22text%22:%7B%22text%22:%22A%20message%20*with%20some%20bold%20text*%20and%20_some%20italicized%20text_.%22,%22type%22:%22mrkdwn%22%7D,%22fields%22:%5B%7B%22type%22:%22mrkdwn%22,%22text%22:%22*Priority*%22%7D,%7B%22type%22:%22mrkdwn%22,%22text%22:%22*Type*%22%7D,%7B%22type%22:%22plain_text%22,%22text%22:%22High%22%7D,%7B%22type%22:%22plain_text%22,%22text%22:%22String%22%7D%5D%7D%5D%7D Click here for an example}.
   */
  fields?: (PlainTextElement | MrkdwnElement)[]; // either this or text must be defined
  /**
   * @description One of the compatible element objects.
   */
  accessory?: Button
  | Overflow
  | Datepicker
  | Timepicker
  | Select
  | MultiSelect
  | Actionable
  | ImageElement
  | RadioButtons
  | Checkboxes;
}

/**
 * @description Displays an embedded video player. A video block is designed to embed videos in all app surfaces (e.g.
 * link unfurls, messages, modals, App Home) — anywhere you can put blocks! To use the video block within your app, you
 * must have the {@link https://api.slack.com/scopes/links.embed:write `links.embed:write` scope}.
 * @see {@link https://api.slack.com/reference/block-kit/blocks#video Video block reference}.
 */
export interface VideoBlock extends Block {
  /**
   * @description The type of block. For a video block, `type` is always `video`.
   */
  type: 'video';
  /**
   * @description The URL to be embedded. Must match any existing
   * {@link https://api.slack.com/reference/messaging/link-unfurling#configuring_domains unfurl domains} within the app
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

export interface RichTextBlock extends Block {
  /**
   * @description The type of block. For a rich text block, `type` is always `rich_text`.
   */
  type: 'rich_text',
  elements: (RichTextSection | RichTextList | RichTextQuote | RichTextPreformatted)[];
}
