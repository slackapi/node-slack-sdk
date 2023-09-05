// This file contains objects documented here: https://api.slack.com/reference/block-kit/block-elements
// TODO: go through https://api.slack.com/reference/block-kit/block-elements and
// - ensure JSdocs are up to date / added,
// - define missing objects, and
// - add further TODOs for future improvements / breaking changes, in prep for next major release

import { Action, Confirmable, Dispatchable, Focusable, Placeholdable } from './extensions';
import { DispatchActionConfig, Option, PlainTextElement, PlainTextOption } from './composition-objects';

export interface Button extends Action, Confirmable {
  type: 'button';
  text: PlainTextElement;
  value?: string;
  url?: string;
  style?: 'danger' | 'primary';
  accessibility_label?: string;
}

export interface Checkboxes extends Action, Confirmable, Focusable {
  type: 'checkboxes';
  initial_options?: Option[];
  options: Option[];
}

export interface Datepicker extends Action, Confirmable, Focusable, Placeholdable {
  type: 'datepicker';
  initial_date?: string;
}

/**
 * @description An element that allows the selection of a time of day formatted as a UNIX timestamp. On desktop
 * clients, this time picker will take the form of a dropdown list and the date picker will take the form of a dropdown
 * calendar. Both options will have free-text entry for precise choices. On mobile clients, the time picker and date
 * picker will use native UIs.
 * {@link https://api.slack.com/reference/block-kit/block-elements#datetimepicker}
 */
export interface DateTimepicker extends Action, Confirmable, Focusable {
  type: 'datetimepicker';
  /**
   * @description The initial date and time that is selected when the element is loaded, represented as a UNIX
   * timestamp in seconds. This should be in the format of 10 digits, for example 1628633820 represents the date and
   * time August 10th, 2021 at 03:17pm PST.
   */
  initial_date_time?: number;
}

/**
 * @description An email input element, similar to the {@see PlainTextInput} element, creates a single line field where
 * a user can enter an email address.
 * {@link https://api.slack.com/reference/block-kit/block-elements#email}
 */
export interface EmailInput extends Action, Dispatchable, Focusable, Placeholdable {
  type: 'email_text_input';
  /**
   * @description The initial value in the email input when it is loaded.
   */
  initial_value?: string;
}

export interface ImageElement {
  type: 'image';
  image_url: string;
  alt_text: string;
}

/*
 * Multi-select and Select menus follow
 */

// Selects and Multiselects are available in different surface areas so I've separated them here
export type Select = UsersSelect | StaticSelect | ConversationsSelect | ChannelsSelect | ExternalSelect;

export type MultiSelect =
  MultiUsersSelect | MultiStaticSelect | MultiConversationsSelect | MultiChannelsSelect | MultiExternalSelect;

export interface UsersSelect extends Action, Confirmable, Focusable, Placeholdable {
  type: 'users_select';
  initial_user?: string;
}

export interface MultiUsersSelect extends Action, Confirmable, Focusable, Placeholdable {
  type: 'multi_users_select';
  initial_users?: string[];
  max_selected_items?: number;
}

export interface StaticSelect extends Action, Confirmable, Focusable, Placeholdable {
  type: 'static_select';
  initial_option?: PlainTextOption;
  options?: PlainTextOption[];
  option_groups?: {
    label: PlainTextElement;
    options: PlainTextOption[];
  }[];
}

export interface MultiStaticSelect extends Action, Confirmable, Focusable, Placeholdable {
  type: 'multi_static_select';
  initial_options?: PlainTextOption[];
  options?: PlainTextOption[];
  option_groups?: {
    label: PlainTextElement;
    options: PlainTextOption[];
  }[];
  max_selected_items?: number;
}

export interface ConversationsSelect extends Action, Confirmable, Focusable, Placeholdable {
  type: 'conversations_select';
  initial_conversation?: string;
  response_url_enabled?: boolean;
  default_to_current_conversation?: boolean;
  filter?: {
    include?: ('im' | 'mpim' | 'private' | 'public')[];
    exclude_external_shared_channels?: boolean;
    exclude_bot_users?: boolean;
  };
}

export interface MultiConversationsSelect extends Action, Confirmable, Focusable, Placeholdable {
  type: 'multi_conversations_select';
  initial_conversations?: string[];
  max_selected_items?: number;
  default_to_current_conversation?: boolean;
  filter?: {
    include?: ('im' | 'mpim' | 'private' | 'public')[];
    exclude_external_shared_channels?: boolean;
    exclude_bot_users?: boolean;
  };
}

export interface ChannelsSelect extends Action, Confirmable, Focusable, Placeholdable {
  type: 'channels_select';
  initial_channel?: string;
}

export interface MultiChannelsSelect extends Action, Confirmable, Focusable, Placeholdable {
  type: 'multi_channels_select';
  initial_channels?: string[];
  max_selected_items?: number;
}

export interface ExternalSelect extends Action, Confirmable, Focusable, Placeholdable {
  type: 'external_select';
  initial_option?: PlainTextOption;
  min_query_length?: number;
}

export interface MultiExternalSelect extends Action, Confirmable, Focusable, Placeholdable {
  type: 'multi_external_select';
  initial_options?: PlainTextOption[];
  min_query_length?: number;
  max_selected_items?: number;
}

/*
 * End of select/multi-select menus
 */

/**
 * @description A number input element, similar to the {@see PlainTextInput} element, creates a single line field where
 * a user can a number. This input elements accepts floating point numbers, for example, 0.25, 5.5, and -10 are all
 * valid input values. Decimal numbers are only allowed when `is_decimal_allowed` is equal to `true`.
 * {@link https://api.slack.com/reference/block-kit/block-elements#number}
 */
export interface NumberInput extends Action, Dispatchable, Focusable, Placeholdable {
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

export interface Overflow extends Action, Confirmable {
  type: 'overflow';
  options: PlainTextOption[];
}

export interface PlainTextInput extends Action, Dispatchable, Focusable, Placeholdable {
  type: 'plain_text_input';
  initial_value?: string;
  multiline?: boolean;
  min_length?: number;
  max_length?: number;
  dispatch_action_config?: DispatchActionConfig;
  focus_on_load?: boolean;
}

export interface RadioButtons extends Action, Confirmable, Focusable {
  type: 'radio_buttons';
  initial_option?: Option;
  options: Option[];
}

export interface Timepicker extends Action, Confirmable, Focusable, Placeholdable {
  type: 'timepicker';
  initial_time?: string;
  timezone?: string;
}

/**
 * @description A URL input element, similar to the {@see PlainTextInput} element, creates a single line field where
 * a user can enter URL-encoded data.
 * {@link https://api.slack.com/reference/block-kit/block-elements#url}
 */
export interface URLInput extends Action, Dispatchable, Focusable, Placeholdable {
  type: 'url_text_input';
  /**
   * @description The initial value in the URL input when it is loaded.
   */
  initial_value?: string;
}
