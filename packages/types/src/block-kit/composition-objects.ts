// This file contains objects documented here: https://docs.slack.dev/reference/block-kit/composition-objects

/**
 * Re-usable labels for common color schemes present in Slack. `danger` displays with a red background (red text on
 * mobile), while `primary` displays with a green background (green text on mobile).
 */
export type ColorScheme = 'primary' | 'danger';

/** The conversation type as available within the Slack UI. */
export type ConversationType = 'im' | 'mpim' | 'private' | 'public';

// TODO: breaking change: remove `Confirm` and move properties to `ConfirmationDialog` below on next major release.
/**
 * @deprecated {@link Confirm} aliased to {@link ConfirmationDialog} in order to make the construct clearer
 * and line up terminology with docs.slack.dev.
 * @description Defines a dialog that adds a confirmation step to interactive elements.
 * @see {@link https://docs.slack.dev/reference/block-kit/composition-objects/confirmation-dialog-object Confirmation dialog object reference}.
 */
export interface Confirm {
  /**
   * @description A {@link PlainTextElement} text object that defines the dialog's title.
   * Maximum length for this field is 100 characters.
   */
  title?: PlainTextElement; // TODO: breaking change, title is required according to https://docs.slack.dev/reference/block-kit/composition-objects/confirmation-dialog-object
  /**
   * @description A {@link PlainTextElement} text object that defines the explanatory text that appears in the confirm
   * dialog. Maximum length for the `text` in this field is 300 characters.
   */
  text: PlainTextElement | MrkdwnElement; // TODO: breaking change: this should not be a mrkdwnelement
  /**
   * @description A {@link PlainTextElement} text object to define the text of the button that confirms the action.
   * Maximum length for the `text` in this field is 30 characters.
   */
  confirm?: PlainTextElement; // TODO: breaking change, confirm is required according to https://docs.slack.dev/reference/block-kit/composition-objects/confirmation-dialog-object
  /**
   * @description A {@link PlainTextElement} text object to define the text of the button that cancels the action.
   * Maximum length for the `text` in this field is 30 characters.
   */
  deny?: PlainTextElement; // TODO: breaking change, deny is required according to https://docs.slack.dev/reference/block-kit/composition-objects/confirmation-dialog-object
  /**
   * @description Defines the color scheme applied to the `confirm` button. A value of `danger` will display the button
   * with a red background on desktop, or red text on mobile. A value of `primary` will display the button with a green
   * background on desktop, or blue text on mobile. If this field is not provided, the default value will be `primary`.
   */
  style?: ColorScheme;
}

/**
 * @description Defines a dialog that adds a confirmation step to interactive elements.
 * @see {@link https://docs.slack.dev/reference/block-kit/composition-objects/confirmation-dialog-object Confirmation dialog object reference}.
 */
export interface ConfirmationDialog extends Confirm {}

/**
 * @description Defines when a {@link PlainTextElement} will return a {@link https://docs.slack.dev/reference/interaction-payloads/block_actions-payload `block_actions` interaction payload}.
 * @see {@link https://docs.slack.dev/reference/interaction-payloads/block_actions-payload `block_actions` interaction payload}.
 */
export interface DispatchActionConfig {
  /**
   * @description An array of interaction types that you would like to receive a
   * {@link https://docs.slack.dev/reference/interaction-payloads/block_actions-payload `block_actions` payload} for. Should be
   * one or both of:
   *   `on_enter_pressed` — payload is dispatched when user presses the enter key while the input is in focus. Hint
   *   text will appear underneath the input explaining to the user to press enter to submit.
   *   `on_character_entered` — payload is dispatched when a character is entered (or removed) in the input.
   */
  trigger_actions_on?: ('on_enter_pressed' | 'on_character_entered')[];
}

interface OptionDescriptor {
  /**
   * @description A unique string value that will be passed to your app when this option is chosen.
   * Maximum length for this field is 75 characters.
   */
  value?: string; // TODO: breaking change - value is required according to https://docs.slack.dev/reference/block-kit/composition-objects/option-object
  /**
   * @description Only available in overflow menus! A URL to load in the user's browser when the option is clicked.
   * Maximum length for this field is 3000 characters.
   */
  url?: string;
  /**
   * @description A {@link PlainTextElement} that defines a line of descriptive text shown below the `text` field.
   * Maximum length for the `text` within this field is 75 characters.
   */
  description?: PlainTextElement;
}

export interface MrkdwnOption extends OptionDescriptor {
  /**
   * @description A {@link MrkdwnElement} that defines the text shown in the option on the menu. To be used with
   * radio buttons and checkboxes. Maximum length for the `text` in this field is 75 characters.
   */
  text: MrkdwnElement;
}

export interface PlainTextOption extends OptionDescriptor {
  /**
   * @description A {@link PlainTextElement} that defines the text shown in the option on the menu. To be used with
   * overflow, select and multi-select menus. Maximum length for the `text` in this field is 75 characters.
   */
  text: PlainTextElement;
}

/**
 * @description Defines a single item in a number of item selection elements. An object that represents a single
 * selectable item in a select menu, multi-select menu, checkbox group, radio button group, or overflow menu.
 * @see {@link https://docs.slack.dev/reference/block-kit/composition-objects/option-object Option object reference}.
 */
export type Option = MrkdwnOption | PlainTextOption;

/**
 * @description Defines a way to group options in a select or multi-select menu.
 * @see {@link https://docs.slack.dev/reference/block-kit/composition-objects/option-group-object Option group object reference}.
 */
export interface OptionGroup {
  /**
   * @description A {@link PlainTextElement} text object that defines the label shown above this group of options.
   * Maximum length for the `text` in this field is 75 characters.
   */
  label: PlainTextElement;
  /**
   * @description An array of {@link Option} that belong to this specific group. Maximum of 100 items.
   */
  options: Option[];
}

/**
 * @description Defines an object containing some text. Can be either a {@link PlainTextElement} or a
 * {@link MrkdwnElement}.
 * @see {@link https://docs.slack.dev/reference/block-kit/composition-objects/text-object Text object reference}.
 */
export type TextObject = PlainTextElement | MrkdwnElement;

/**
 * @description Defines an object containing some text.
 * @see {@link https://docs.slack.dev/reference/block-kit/composition-objects/text-object Text object reference}.
 */
export interface PlainTextElement {
  /**
   * @description The formatting to use for this text object.
   */
  type: 'plain_text';
  /**
   * @description The text for the block. The minimum length is 1 and maximum length is 3000 characters.
   */
  text: string;
  /**
   * @description Indicates whether emojis in a text field should be escaped into the colon emoji format.
   */
  emoji?: boolean;
}

/**
 * @description Defines an object containing some text.
 * @see {@link https://docs.slack.dev/reference/block-kit/composition-objects/text-object Text object reference}.
 */
export interface MrkdwnElement {
  /**
   * @description The formatting to use for this text object.
   */
  type: 'mrkdwn';
  /**
   * @description The text for the block. This field accepts any of the standard text formatting markup.
   * The minimum length is 1 and maximum length is 3000 characters.
   */
  text: string;
  /**
   * @description When set to `false` (as is default) URLs will be auto-converted into links, conversation names will
   * be link-ified, and certain mentions will be {@link https://docs.slack.dev/messaging/formatting-message-text automatically parsed}.
   * Using a value of `true` will skip any preprocessing of this nature, although you can still include
   * {@link https://docs.slack.dev/messaging/formatting-message-text manual parsing strings}.
   */
  verbatim?: boolean;
}

/**
 * @description Defines an object containing some text.
 * @see {@link https://docs.slack.dev/reference/block-kit/composition-objects/text-object Text object reference}.
 */
export interface RawTextElement {
  /**
   * @description The formatting to use for this text object.
   */
  type: 'raw_text';
  /**
   * @description The text for the block. The minimum length is 1 character.
   */
  text: string;
}

interface BaseConversationFilter {
  /**
   * @description Indicates which type of conversations should be included in the list. When this field is provided, any
   * conversations that do not match will be excluded. You should provide an array of strings from the following options:
   * `im`, `mpim`, `private`, and `public`. The array cannot be empty.
   */
  include?: [ConversationType, ...ConversationType[]];
  /**
   * @description Indicates whether to exclude external {@link https://docs.slack.dev/apis/slack-connect shared channels}
   * from conversation lists. This field will not exclude users from shared channels. Defaults to `false`.
   */
  exclude_external_shared_channels?: boolean;
  /**
   * @description Indicates whether to exclude bot users from conversation lists. Defaults to `false`.
   */
  exclude_bot_users?: boolean;
}

/**
 * @description Defines a filter for the list of options in a conversation selector menu. The menu can be either a
 * conversations select menu or a conversations multi-select menu.
 * @see {@link https://docs.slack.dev/reference/block-kit/composition-objects/conversation-filter-object Conversation filter object reference}.
 */
export type ConversationFilter =
  | (BaseConversationFilter & Required<Pick<BaseConversationFilter, 'include'>>)
  | (BaseConversationFilter & Required<Pick<BaseConversationFilter, 'exclude_bot_users'>>)
  | (BaseConversationFilter & Required<Pick<BaseConversationFilter, 'exclude_external_shared_channels'>>);
/**
 * @description Object for image which contains a image_url.
 */
export interface UrlImageObject {
  /**
   * @description The URL of the image to be displayed.
   */
  image_url: string;
}

/**
 * @description Object for image which contains a slack_file.
 */
export interface SlackFileImageObject {
  /**
   * @description The slack file of the image to be displayed.
   */
  slack_file: SlackFile;
}

interface SlackFileViaUrl {
  /**
   * @description This URL can be the `url_private` or the `permalink` of the {@link Slack file https://docs.slack.dev/reference/objects/file-object}.
   */
  url: string;
}

interface SlackFileViaId {
  /**
   * @description `id` of the {@link Slack file https://docs.slack.dev/reference/objects/file-objecte}.
   */
  id: string;
}

/**
 * @description Defines an object containing Slack file information to be used in an image block or image element.
 * This {@link file https://docs.slack.dev/reference/objects/file-object} must be an image and you must provide either the URL or ID. In addition,
 * the user posting these blocks must have access to this file. If both are provided then the payload will be rejected.
 * Currently only `png`, `jpg`, `jpeg`, and `gif` Slack image files are supported.
 * @see {@link https://docs.slack.dev/reference/block-kit/composition-objects/slack-file-object Slack File object reference}.
 */
export type SlackFile = SlackFileViaUrl | SlackFileViaId;
