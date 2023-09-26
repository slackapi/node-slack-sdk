// This file contains objects documented here: https://api.slack.com/reference/block-kit/block-elements

import { Action, Confirmable, Dispatchable, Focusable, Placeholdable } from './extensions';
import { Option, PlainTextElement, PlainTextOption } from './composition-objects';

/**
 * @description Allows users a direct path to performing basic actions.
 * @see {@link https://api.slack.com/reference/block-kit/block-elements#button Button element reference}.
 * @see {@link https://api.slack.com/interactivity/handling This is an interactive component - see our guide to enabling interactivity}.
 */
export interface Button extends Action, Confirmable {
  /**
   * @description The type of element. In this case `type` is always `button`.
   */
  type: 'button';
  /**
   * @description A {@link PlainTextElement} that defines the button's text. `text` may truncate with ~30 characters.
   * Maximum length for the text in this field is 75 characters.
   */
  text: PlainTextElement;
  /**
   * @description The value to send along with the {@link https://api.slack.com/interactivity/handling#payloads interaction payload}.
   * Maximum length for this field is 2000 characters.
   */
  value?: string;
  /**
   * @description A URL to load in the user's browser when the button is clicked. Maximum length for this field is 3000
   * characters. If you're using `url`, you'll still receive an {@link https://api.slack.com/interactivity/handling#payloads interaction payload}
   * and will need to send an {@link https://api.slack.com/interactivity/handling#acknowledgment_response acknowledgement response}.
   */
  url?: string;
  /**
   * @description Decorates buttons with alternative visual color schemes. Use this option with restraint.
   * `primary` gives buttons a green outline and text, ideal for affirmation or confirmation actions. `primary` should
   * only be used for one button within a set.
   * `danger` gives buttons a red outline and text, and should be used when the action is destructive. Use `danger` even
   * more sparingly than primary.
   * If you don't include this field, the default button style will be used.
   */
  style?: 'danger' | 'primary';
  /**
   * @description A label for longer descriptive text about a button element. This label will be read out by screen
   * readers instead of the button `text` object. Maximum length for this field is 75 characters.
   */
  accessibility_label?: string;
}

/**
 * @description Allows users to choose multiple items from a list of options.
 * @see {@link https://api.slack.com/reference/block-kit/block-elements#checkboxes Checkboxes element reference}.
 * @see {@link https://api.slack.com/interactivity/handling This is an interactive component - see our guide to enabling interactivity}.
 */
export interface Checkboxes extends Action, Confirmable, Focusable {
  /**
   * @description The type of element. In this case `type` is always `checkboxes`.
   */
  type: 'checkboxes';
  /**
   * @description An array of {@link Option} objects that exactly matches one or more of the options within `options`.
   * These options will be selected when the checkbox group initially loads.
   */
  initial_options?: Option[];
  /**
   * @description An array of {@link Option} objects. A maximum of 10 options are allowed.
   */
  options: Option[];
}

/**
 * @description Allows users to select a date from a calendar style UI.
 * @see {@link https://api.slack.com/reference/block-kit/block-elements#datepicker Date picker element reference}.
 * @see {@link https://api.slack.com/interactivity/handling This is an interactive component - see our guide to enabling interactivity}.
 */
export interface Datepicker extends Action, Confirmable, Focusable, Placeholdable {
  /**
   * @description The type of element. In this case `type` is always `datepicker`.
   */
  type: 'datepicker';
  /**
   * @description The initial date that is selected when the element is loaded.
   * This should be in the format `YYYY-MM-DD`.
   */
  initial_date?: string;
}

/**
 * @description Allows users to select both a date and a time of day, formatted as a Unix timestamp. On desktop
 * clients, this time picker will take the form of a dropdown list and the date picker will take the form of a dropdown
 * calendar. Both options will have free-text entry for precise choices. On mobile clients, the time picker and date
 * picker will use native UIs.
 * @see {@link https://api.slack.com/reference/block-kit/block-elements#datetimepicker Datetime picker element reference}.
 * @see {@link https://api.slack.com/interactivity/handling This is an interactive component - see our guide to enabling interactivity}.
 */
export interface DateTimepicker extends Action, Confirmable, Focusable {
  /**
   * @description The type of element. In this case `type` is always `datetimepicker`.
   */
  type: 'datetimepicker';
  /**
   * @description The initial date and time that is selected when the element is loaded, represented as a UNIX
   * timestamp in seconds. This should be in the format of 10 digits, for example `1628633820` represents the date and
   * time August 10th, 2021 at 03:17pm PST.
   */
  initial_date_time?: number;
}

/**
 * @description Allows user to enter an email into a single-line field.
 * @see {@link https://api.slack.com/reference/block-kit/block-elements#email Email input element reference}.
 * @see {@link https://api.slack.com/interactivity/handling This is an interactive component - see our guide to enabling interactivity}.
 */
export interface EmailInput extends Action, Dispatchable, Focusable, Placeholdable {
  /**
   * @description The type of element. In this case `type` is always `email_text_input`.
   */
  type: 'email_text_input';
  /**
   * @description The initial value in the email input when it is loaded.
   */
  initial_value?: string;
}

/**
 * @description Displays an image as part of a larger block of content. Use this `image` block if you want a block with
 * only an image in it.
 * @see {@link https://api.slack.com/reference/block-kit/block-elements#image Image element reference}.
 */
export interface ImageElement {
  /**
   * @description The type of element. In this case `type` is always `image`.
   */
  type: 'image';
  /**
   * @description The URL of the image to be displayed.
   */
  image_url: string;
  /**
   * @description A plain-text summary of the image. This should not contain any markup.
   */
  alt_text: string;
}

/*
 * Multi-select and Select menus follow
 */

// Selects and Multiselects are available in different surface areas so I've separated them here
/**
 * @description Allows users to choose an option from a drop down menu.
 * The select menu also includes type-ahead functionality, where a user can type a part or all of an option string to
 * filter the list. There are different types of select menu elements that depend on different data sources for their
 * lists of options: {@link StaticSelect}, {@link ExternalSelect}, {@link UsersSelect}, {@link ConversationsSelect},
 * {@link ChannelsSelect}.
 * @see {@link https://api.slack.com/reference/block-kit/block-elements#select Select menu element reference}.
 * @see {@link https://api.slack.com/interactivity/handling This is an interactive component - see our guide to enabling interactivity}.
 */
export type Select = UsersSelect | StaticSelect | ConversationsSelect | ChannelsSelect | ExternalSelect;

/**
 * @description Allows users to select multiple items from a list of options.
 * Just like regular {@link Select}, multi-select menus also include type-ahead functionality, where a user can type a
 * part or all of an option string to filter the list.
 * There are different types of multi-select menu that depend on different data sources for their lists of options:
 * {@link MultiStaticSelect}, {@link MultiExternalSelect}, {@link MultiUsersSelect}, {@link MultiConversationsSelect},
 * {@link MultiChannelsSelect}.
 * @see {@link https://api.slack.com/reference/block-kit/block-elements#multi_select Multi-select menu element reference}.
 * @see {@link https://api.slack.com/interactivity/handling This is an interactive component - see our guide to enabling interactivity}.
 */
export type MultiSelect =
  MultiUsersSelect | MultiStaticSelect | MultiConversationsSelect | MultiChannelsSelect | MultiExternalSelect;

/**
 * @description This select menu will populate its options with a list of Slack users visible to the current user in the
 * active workspace.
 * @see {@link https://api.slack.com/reference/block-kit/block-elements#users_select Select menu of users reference}.
 * @see {@link https://api.slack.com/interactivity/handling This is an interactive component - see our guide to enabling interactivity}.
 */
export interface UsersSelect extends Action, Confirmable, Focusable, Placeholdable {
  /**
   * @description The type of element. In this case `type` is always `users_select`.
   */
  type: 'users_select';
  /**
   * @description The user ID of any valid user to be pre-selected when the menu loads.
   */
  initial_user?: string;
}

/**
 * @description This multi-select menu will populate its options with a list of Slack users visible to the current user
 * in the active workspace.
 * @see {@link https://api.slack.com/reference/block-kit/block-elements#users_multi_select Multi-select menu of users reference}.
 * @see {@link https://api.slack.com/interactivity/handling This is an interactive component - see our guide to enabling interactivity}.
 */
export interface MultiUsersSelect extends Action, Confirmable, Focusable, Placeholdable {
  /**
   * @description The type of element. In this case `type` is always `multi_users_select`.
   */
  type: 'multi_users_select';
  /**
   * @description An array of user IDs of any valid users to be pre-selected when the menu loads.
   */
  initial_users?: string[];
  /**
   * @description Specifies the maximum number of items that can be selected in the menu. Minimum number is `1`.
   */
  max_selected_items?: number;
}

/**
 * @description This is the simplest form of select menu, with a static list of options passed in when defining the
 * element.
 * @see {@link https://api.slack.com/reference/block-kit/block-elements#static_select Select menu of static options reference}.
 * @see {@link https://api.slack.com/interactivity/handling This is an interactive component - see our guide to enabling interactivity}.
 */
export interface StaticSelect extends Action, Confirmable, Focusable, Placeholdable {
  /**
   * @description The type of element. In this case `type` is always `static_select`.
   */
  type: 'static_select';
  // TODO: breaking change: use discriminative union and separate types for static select of options vs. option groups
  /**
   * @description A single option that exactly matches one of the options within `options` or `option_groups`.
   * This option will be selected when the menu initially loads.
   */
  initial_option?: PlainTextOption;
  // TODO: breaking change: use discriminative union and separate types for static select of options vs. option groups
  // so this is not always optional. Also in theory this should support mrkdown options too?
  /**
   * @description An array of {@link PlainTextOption}. Maximum number of options is 100. If `option_groups` is
   * specified, this field should not be.
   */
  options?: PlainTextOption[];
  // TODO: breaking change: use composition-objects.ts' `OptionGroup` - which allows both plaintext and mrkdown
  // options, whereas the below doesn't. Also use a discriminative union here to separate option vs. option groups
  // static menu.
  /**
   * @description An array of option group objects. Maximum number of option groups is 100. If `options` is specified,
   * this field should not be.
   */
  option_groups?: {
    label: PlainTextElement;
    options: PlainTextOption[];
  }[];
}

/**
 * @description This is the simplest form of select menu, with a static list of options passed in when defining the
 * element.
 * @see {@link https://api.slack.com/reference/block-kit/block-elements#static_multi_select Multi-select menu of static options reference}.
 * @see {@link https://api.slack.com/interactivity/handling This is an interactive component - see our guide to enabling interactivity}.
 */
export interface MultiStaticSelect extends Action, Confirmable, Focusable, Placeholdable {
  /**
   * @description The type of element. In this case `type` is always `multi_static_select`.
   */
  type: 'multi_static_select';
  // TODO: breaking change: use discriminative union and separate types for static select of options vs. option groups
  /**
   * @description An array of option objects that exactly match one or more of the options within `options` or
   * `option_groups`. These options will be selected when the menu initially loads.
   */
  initial_options?: PlainTextOption[];
  // TODO: breaking change: use discriminative union and separate types for static select of options vs. option groups
  // so this is not always optional. Also in theory this should support mrkdown options too?
  /**
   * @description An array of {@link PlainTextOption}. Maximum number of options is 100. If `option_groups` is
   * specified, this field should not be.
   */
  options?: PlainTextOption[];
  // TODO: breaking change: use composition-objects.ts' `OptionGroup` - which allows both plaintext and mrkdown
  // options, whereas the below doesn't. Also use a discriminative union here to separate option vs. option groups
  // static menu.
  /**
   * @description An array of option group objects. Maximum number of option groups is 100. If `options` is specified,
   * this field should not be.
   */
  option_groups?: {
    label: PlainTextElement;
    options: PlainTextOption[];
  }[];
  /**
   * @description Specifies the maximum number of items that can be selected in the menu. Minimum number is 1.
   */
  max_selected_items?: number;
}

/**
 * @description This select menu will populate its options with a list of public and private channels, DMs, and MPIMs
 * visible to the current user in the active workspace.
 * @see {@link https://api.slack.com/reference/block-kit/block-elements#conversations_select Select menu of conversations reference}.
 * @see {@link https://api.slack.com/interactivity/handling This is an interactive component - see our guide to enabling interactivity}.
 */
export interface ConversationsSelect extends Action, Confirmable, Focusable, Placeholdable {
  /**
   * @description The type of element. In this case `type` is always `conversations_select`.
   */
  type: 'conversations_select';
  /**
   * @description The ID of any valid conversation to be pre-selected when the menu loads. If
   * `default_to_current_conversation` is also supplied, `initial_conversation` will take precedence.
   */
  initial_conversation?: string;
  // TODO: maybe factor out `response_url_enabled` into its own mixin as part of `extensions.ts`?
  // this is used in channel select too
  /**
   * @description When set to `true`, the {@link https://api.slack.com/reference/interaction-payloads/views#view_submission `view_submission` payload}
   * from the menu's parent view will contain a `response_url`. This `response_url` can be used for
   * {@link https://api.slack.com/interactivity/handling#message_responses message responses}. The target conversation
   * for the message will be determined by the value of this select menu.
   */
  response_url_enabled?: boolean;
  /**
   * @description Pre-populates the select menu with the conversation that the user was viewing when they opened the
   * modal, if available. Default is `false`.
   */
  default_to_current_conversation?: boolean;
  /**
   * @description A filter object that reduces the list of available conversations using the specified criteria.
   */
  filter?: { // TODO: breaking change: replace with ConversationFilter object from composition-objects
    include?: ('im' | 'mpim' | 'private' | 'public')[];
    exclude_external_shared_channels?: boolean;
    exclude_bot_users?: boolean;
  };
}

// TODO: breaking change: maybe can use a discriminative union to differentiate between a multi-select convo element
// that uses `default_to_current_conversation` vs. `initial_conversation`?
/**
 * @description This multi-select menu will populate its options with a list of public and private channels, DMs, and
 * MPIMs visible to the current user in the active workspace.
 * @see {@link https://api.slack.com/reference/block-kit/block-elements#conversation_multi_select Multi-select menu of conversations reference}.
 * @see {@link https://api.slack.com/interactivity/handling This is an interactive component - see our guide to enabling interactivity}.
 */
export interface MultiConversationsSelect extends Action, Confirmable, Focusable, Placeholdable {
  /**
   * @description The type of element. In this case `type` is always `conversations_select`.
   */
  type: 'multi_conversations_select';
  // TODO: breaking change: change array type to formalize 'at least one element' requirement.
  /**
   * @description An array of one or more IDs of any valid conversations to be pre-selected when the menu loads. If
   * `default_to_current_conversation` is also supplied, `initial_conversation` will be ignored.
   */
  initial_conversations?: string[];
  // TODO: factor `max_selected_items` into its own extension / mixin?
  /**
   * @description Specifies the maximum number of items that can be selected in the menu. Minimum number is 1.
   */
  max_selected_items?: number;
  /**
   * @description Pre-populates the select menu with the conversation that the user was viewing when they opened the
   * modal, if available. Default is `false`.
   */
  default_to_current_conversation?: boolean;
  /**
   * @description A filter object that reduces the list of available conversations using the specified criteria.
   */
  filter?: { // TODO: breaking change: replace with ConversationFilter object from composition-objects
    include?: ('im' | 'mpim' | 'private' | 'public')[];
    exclude_external_shared_channels?: boolean;
    exclude_bot_users?: boolean;
  };
}

/**
 * @description This select menu will populate its options with a list of public channels visible to the current user
 * in the active workspace.
 * @see {@link https://api.slack.com/reference/block-kit/block-elements#channels_select Select menu of public channels reference}.
 * @see {@link https://api.slack.com/interactivity/handling This is an interactive component - see our guide to enabling interactivity}.
 */
export interface ChannelsSelect extends Action, Confirmable, Focusable, Placeholdable {
  /**
   * @description The type of element. In this case `type` is always `channels_select`.
   */
  type: 'channels_select';
  /**
   * @description The ID of any valid public channel to be pre-selected when the menu loads.
   */
  initial_channel?: string;
  // TODO: maybe factor out `response_url_enabled` into its own mixin as part of `extensions.ts`?
  // this is used in convo selects too
  /**
   * @description When set to `true`, the {@link https://api.slack.com/reference/interaction-payloads/views#view_submission `view_submission` payload}
   * from the menu's parent view will contain a `response_url`. This `response_url` can be used for
   * {@link https://api.slack.com/interactivity/handling#message_responses message responses}. The target channel
   * for the message will be determined by the value of this select menu.
   */
  response_url_enabled?: boolean;
}

/**
 * @description This multi-select menu will populate its options with a list of public channels visible to the current
 * user in the active workspace.
 * @see {@link https://api.slack.com/reference/block-kit/block-elements#channel_multi_select Multi-select menu of public channels reference}.
 * @see {@link https://api.slack.com/interactivity/handling This is an interactive component - see our guide to enabling interactivity}.
 */
export interface MultiChannelsSelect extends Action, Confirmable, Focusable, Placeholdable {
  /**
   * @description The type of element. In this case `type` is always `multi_channels_select`.
   */
  type: 'multi_channels_select';
  // TODO: breaking change: change type to enforce "at least one" array restriction
  /**
   * @description An array of one or more IDs of any valid public channel to be pre-selected when the menu loads.
   */
  initial_channels?: string[];
  // TODO: maybe factor out `max_selected_items` into its own mixin in `extensions.ts`?
  /**
   * @description Specifies the maximum number of items that can be selected in the menu. Minimum number is 1.
   */
  max_selected_items?: number;
}

/**
 * @description This select menu will load its options from an external data source, allowing for a dynamic list of
 * options.
 * @see {@link https://api.slack.com/reference/block-kit/block-elements#external_select Select menu of external data source reference}.
 * @see {@link https://api.slack.com/interactivity/handling This is an interactive component - see our guide to enabling interactivity}.
 */
export interface ExternalSelect extends Action, Confirmable, Focusable, Placeholdable {
  /**
   * @description The type of element. In this case `type` is always `external_select`.
   */
  type: 'external_select';
  // TODO: breaking change: should be able to support both options and option groups, both mrkdwn and plaintext
  /**
   * @description A single option to be selected when the menu initially loads.
   */
  initial_option?: PlainTextOption;
  /**
   * @description When the typeahead field is used, a request will be sent on every character change. If you prefer
   * fewer requests or more fully ideated queries, use the `min_query_length` attribute to tell Slack the fewest number
   * of typed characters required before dispatch. The default value is `3`.
   */
  min_query_length?: number;
}

/**
 * @description This menu will load its options from an external data source, allowing for a dynamic list of options.
 * @see {@link https://api.slack.com/reference/block-kit/block-elements#external_multi_select Multi-select menu of external data source reference}.
 * @see {@link https://api.slack.com/interactivity/handling This is an interactive component - see our guide to enabling interactivity}.
 */
export interface MultiExternalSelect extends Action, Confirmable, Focusable, Placeholdable {
  /**
   * @description The type of element. In this case `type` is always `multi_external_select`.
   */
  type: 'multi_external_select';
  // TODO: breaking change: should be able to support both options and option groups, both mrkdwn and plaintext
  /**
   * @description An array of options to be selected when the menu initially loads.
   */
  initial_options?: PlainTextOption[];
  /**
   * @description When the typeahead field is used, a request will be sent on every character change. If you prefer
   * fewer requests or more fully ideated queries, use the `min_query_length` attribute to tell Slack the fewest number
   * of typed characters required before dispatch. The default value is `3`.
   */
  min_query_length?: number;
  // TODO: maybe factor out `max_selected_items` into its own mixin in `extensions.ts`?
  /**
   * @description Specifies the maximum number of items that can be selected in the menu. Minimum number is 1.
   */
  max_selected_items?: number;
}

/*
 * End of select/multi-select menus
 */

/**
 * @description Allows user to enter a number into a single-line field. The number input element accepts both whole and
 * decimal numbers. For example, 0.25, 5.5, and -10 are all valid input values. Decimal numbers are only allowed when
 * `is_decimal_allowed` is equal to `true`.
 * @see {@link https://api.slack.com/reference/block-kit/block-elements#number Number input element reference}.
 * @see {@link https://api.slack.com/interactivity/handling This is an interactive component - see our guide to enabling interactivity}.
 */
export interface NumberInput extends Action, Dispatchable, Focusable, Placeholdable {
  /**
   * @description The type of element. In this case `type` is always `number_input`.
   */
  type: 'number_input';
  /**
   * @description Decimal numbers are allowed if this property is `true`, set the value to `false` otherwise.
   */
  is_decimal_allowed: boolean;
  /**
   * @description The initial value in the input when it is loaded.
   */
  initial_value?: string;
  /**
   * @description The minimum value, cannot be greater than `max_value`.
   */
  min_value?: string;
  /**
   * @description The maximum value, cannot be less than `min_value`.
   */
  max_value?: string;
}

/**
 * @description Allows users to press a button to view a list of options.
 * Unlike the select menu, there is no typeahead field, and the button always appears with an ellipsis ("…") rather
 * than customizable text. As such, it is usually used if you want a more compact layout than a select menu, or to
 * supply a list of less visually important actions after a row of buttons. You can also specify simple URL links as
 * overflow menu options, instead of actions.
 * @see {@link https://api.slack.com/reference/block-kit/block-elements#overflow Overflow menu element reference}.
 * @see {@link https://api.slack.com/interactivity/handling This is an interactive component - see our guide to enabling interactivity}.
 */
export interface Overflow extends Action, Confirmable {
  /**
   * @description The type of element. In this case `type` is always `number_input`.
   */
  type: 'overflow';
  // TODO: breaking change: this should support mrkdown options too?
  /**
   * @description An array of up to 5 {@link PlainTextOption} to display in the menu.
   */
  options: PlainTextOption[];
}

/**
 * @description Allows users to enter freeform text data into a single-line or multi-line field.
 * @see {@link https://api.slack.com/reference/block-kit/block-elements#input Plain-text input element reference}.
 * @see {@link https://api.slack.com/interactivity/handling This is an interactive component - see our guide to enabling interactivity}.
 */
export interface PlainTextInput extends Action, Dispatchable, Focusable, Placeholdable {
  /**
   * @description The type of element. In this case `type` is always `plain_text_input`.
   */
  type: 'plain_text_input';
  /**
   * @description The initial value in the plain-text input when it is loaded.
   */
  initial_value?: string;
  /**
   * @description Indicates whether the input will be a single line (`false`) or a larger textarea (`true`).
   * Defaults to `false`.
   */
  multiline?: boolean;
  /**
   * @description The minimum length of input that the user must provide. If the user provides less, they will receive
   * an error. Maximum value is 3000.
   */
  min_length?: number;
  /**
   * @description The maximum length of input that the user can provide. If the user provides more,
   * they will receive an error.
   */
  max_length?: number;
}

/**
 * @description Allows users to choose one item from a list of possible options.
 * @see {@link https://api.slack.com/reference/block-kit/block-elements#radio Radio button group element reference}.
 * @see {@link https://api.slack.com/interactivity/handling This is an interactive component - see our guide to enabling interactivity}.
 */
export interface RadioButtons extends Action, Confirmable, Focusable {
  /**
   * @description The type of element. In this case `type` is always `radio_buttons`.
   */
  type: 'radio_buttons';
  /**
   * @description An {@link Option} object that exactly matches one of the options within `options`. This option will
   * be selected when the radio button group initially loads.
   */
  initial_option?: Option;
  /**
   * @description An array of {@link Option} objects. A maximum of 10 options are allowed.
   */
  options: Option[];
}

/**
 * @description Allows users to choose a time from a rich dropdown UI. On desktop clients, this time picker will take
 * the form of a dropdown list with free-text entry for precise choices. On mobile clients, the time picker will use
 * native time picker UIs.
 * @see {@link https://api.slack.com/reference/block-kit/block-elements#timepicker Time picker element reference}.
 * @see {@link https://api.slack.com/interactivity/handling This is an interactive component - see our guide to enabling interactivity}.
 */
export interface Timepicker extends Action, Confirmable, Focusable, Placeholdable {
  /**
   * @description The type of element. In this case `type` is always `timepicker`.
   */
  type: 'timepicker';
  /**
   * @description The initial time that is selected when the element is loaded. This should be in the format `HH:mm`,
   * where `HH` is the 24-hour format of an hour (00 to 23) and `mm` is minutes with leading zeros (00 to 59),
   * for example 22:25 for 10:25pm.
   */
  initial_time?: string;
  /**
   * @description A string in the IANA format, e.g. "America/Chicago". The timezone is displayed to end users as hint
   * text underneath the time picker. It is also passed to the app upon certain interactions, such as view_submission.
   */
  timezone?: string;
}

/**
 * @description Allows user to enter a URL into a single-line field.
 * @see {@link https://api.slack.com/reference/block-kit/block-elements#url URL input element reference}.
 * @see {@link https://api.slack.com/interactivity/handling This is an interactive component - see our guide to enabling interactivity}.
 */
export interface URLInput extends Action, Dispatchable, Focusable, Placeholdable {
  /**
   * @description The type of element. In this case `type` is always `url_text_input`.
   */
  type: 'url_text_input';
  /**
   * @description The initial value in the URL input when it is loaded.
   */
  initial_value?: string;
}

/**
 * @description Allows users to run a {@link https://api.slack.com/automation/triggers/link#workflow_buttons link trigger} with customizable inputs.
 * @see {@link https://api.slack.com/reference/block-kit/block-elements#workflow_button Workflow button element reference}.
 */
export interface WorkflowButton extends Confirmable {
  /**
   * @description The type of element. In this case `type` is always `workflow_button`.
   */
  type: 'workflow_button';
  /**
   * @description A {@link PlainTextElement} that defines the button's text. `text` may truncate with ~30 characters.
   * Maximum length for the `text` in this field is 75 characters.
   */
  text: PlainTextElement;
  /**
   * @description A workflow object that contains details about the workflow that will run when the button is clicked.
   */
  workflow: {
    /**
     * @description Properties of the {@link https://api.slack.com/automation/triggers/link#workflow_buttons link trigger}
     * that will be invoked via this button.
     */
    trigger: {
      /**
       * @description The trigger URL of the {@link https://api.slack.com/automation/triggers/link#workflow_buttons link trigger}
       */
      url: string;
      /**
       * @description List of customizable input parameters and their values. Should match input parameters specified on
       * the provided trigger.
       */
      customizable_input_parameters?: {
        /**
         * @description Name of the customizable input, which should be the name of a workflow input parameter for the
         * matching workflow of the link trigger.
         */
        name: string;
        /**
         * @description The value of the customizable input parameter. The type of the value is expected to match the
         * specified type for the matching workflow input parameter.
         */
        value: string;
      }[];
    }
  };
  /**
   * @description Decorates buttons with alternative visual color schemes. Use this option with restraint.
   * `primary` gives buttons a green outline and text, ideal for affirmation or confirmation actions. `primary` should
   * only be used for one button within a set.
   * `danger` gives buttons a red outline and text, and should be used when the action is destructive. Use `danger` even
   * more sparingly than primary.
   * If you don't include this field, the default button style will be used.
   */
  style?: 'danger' | 'primary';
  /**
   * @description A label for longer descriptive text about a button element. This label will be read out by screen
   * readers instead of the button `text` object. Maximum length for this field is 75 characters.
   */
  accessibility_label?: string;
}
