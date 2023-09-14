// This file contains objects documented here: https://api.slack.com/reference/block-kit/composition-objects
// TODO: go through https://api.slack.com/reference/block-kit/composition-objects and
// - define missing objects, and
// - add further TODOs for future improvements / breaking changes, in prep for next major release

// TODO: maybe consider this as a breaking change, but, what about aliasing Confirm to ConfirmationDialog or some such?
// and deprecating this interface? this would line up the terms between these types and api.slack.com
/**
 * @description Defines a dialog that adds a confirmation step to interactive elements.
 * @see {@link https://api.slack.com/reference/block-kit/composition-objects#confirm Confirmation dialog object reference}.
 */
export interface Confirm {
  /**
   * @description A {@link PlainTextElement} text object that defines the dialog's title.
   * Maximum length for this field is 100 characters.
   */
  title?: PlainTextElement; // TODO: breaking change, title is required according to https://api.slack.com/reference/block-kit/composition-objects#confirm
  /**
   * @description A {@link PlainTextElement} text object that defines the explanatory text that appears in the confirm
   * dialog. Maximum length for the `text` in this field is 300 characters.
   */
  text: PlainTextElement | MrkdwnElement;
  /**
   * @description A {@link PlainTextElement} text object to define the text of the button that confirms the action.
   * Maximum length for the `text` in this field is 30 characters.
   */
  confirm?: PlainTextElement; // TODO: breaking change, text is required according to https://api.slack.com/reference/block-kit/composition-objects#confirm
  /**
   * @description A {@link PlainTextElement} text object to define the text of the button that cancels the action.
   * Maximum length for the `text` in this field is 30 characters.
   */
  deny?: PlainTextElement; // TODO: breaking change, deny is required according to https://api.slack.com/reference/block-kit/composition-objects#confirm
  /**
   * @description Defines the color scheme applied to the `confirm` button. A value of `danger` will display the button
   * with a red background on desktop, or red text on mobile. A value of `primary` will display the button with a green
   * background on desktop, or blue text on mobile. If this field is not provided, the default value will be `primary`.
   */
  style?: 'primary' | 'danger';
}

/**
 * @description Defines when a {@link PlainTextElement} will return a {@link https://api.slack.com/reference/interaction-payloads/block-actions `block_actions` interaction payload}.
 * @see {@link https://api.slack.com/reference/interaction-payloads/block-actions `block_actions` interaction payload}.
 */
export interface DispatchActionConfig {
  /**
   * @description An array of interaction types that you would like to receive a
   * {@link https://api.slack.com/reference/interaction-payloads/block-actions `block_actions` payload} for. Should be
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
  value?: string; // TODO: breaking change - this value is required according to https://api.slack.com/reference/block-kit/composition-objects#option
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
 * @see {@link https://api.slack.com/reference/block-kit/composition-objects#option Option object reference}.
 */
export type Option = MrkdwnOption | PlainTextOption;

// TODO: (additive change) maybe worth adding a TextObject union for them, if they are meant to be used this way,
// as they seem to be documented together? https://api.slack.com/reference/block-kit/composition-objects#text
/**
 * @description Defines an object containing some text.
 * @see {@link https://api.slack.com/reference/block-kit/composition-objects#text Text object reference}.
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
 * @see {@link https://api.slack.com/reference/block-kit/composition-objects#text Text object reference}.
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
   * be link-ified, and certain mentions will be {@link https://api.slack.com/reference/surfaces/formatting#automatic-parsing automatically parsed}.
   * Using a value of `true` will skip any preprocessing of this nature, although you can still include
   * {@link https://api.slack.com/reference/surfaces/formatting#advanced manual parsing strings}.
   */
  verbatim?: boolean;
}

// TODO: add Option group type, and use it in this package. https://api.slack.com/reference/block-kit/composition-objects#option_group
// TODO: add Conversation filter type, and use it in this package. https://api.slack.com/reference/block-kit/composition-objects#filter_conversations
