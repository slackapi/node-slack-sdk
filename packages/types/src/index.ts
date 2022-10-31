/*
 * Reusable shapes for argument values
 */
export interface Dialog {
  title: string;
  callback_id: string;
  elements: {
    type: 'text' | 'textarea' | 'select';
    name: string; // shown to user
    label: string; // shown to user
    optional?: boolean;
    placeholder?: string;
    value?: string; // sent to app
    // types `text` & `textarea`:
    max_length?: number;
    min_length?: number;
    hint?: string;
    subtype?: 'email' | 'number' | 'tel' | 'url';
    // type `select`:
    data_source?: 'users' | 'channels' | 'conversations' | 'external';
    selected_options?: SelectOption[];
    options?: SelectOption[];
    option_groups?: {
      label: string;
      options: SelectOption[];
    }[];
    min_query_length?: number;
  }[];
  submit_label?: string;
  notify_on_cancel?: boolean;
  state?: string;
}

export interface HomeView {
  type: 'home';
  blocks: (KnownBlock | Block)[];
  private_metadata?: string;
  callback_id?: string;
  external_id?: string;
}

export interface ModalView {
  type: 'modal';
  title: PlainTextElement;
  blocks: (KnownBlock | Block)[];
  close?: PlainTextElement;
  submit?: PlainTextElement;
  private_metadata?: string;
  callback_id?: string;
  clear_on_close?: boolean; // defaults to false
  notify_on_close?: boolean; // defaults to false
  external_id?: string;
}

export interface WorkflowStepView {
  type: 'workflow_step';
  blocks: (KnownBlock | Block)[];
  private_metadata?: string;
  callback_id?: string;
  submit_disabled?: boolean; // defaults to false
  external_id?: string;
}

export type View = HomeView | ModalView | WorkflowStepView;

/*
 * Block Elements
 */

export interface ImageElement {
  type: 'image';
  image_url: string;
  alt_text: string;
}

export interface PlainTextElement {
  type: 'plain_text';
  text: string;
  emoji?: boolean;
}

export interface MrkdwnElement {
  type: 'mrkdwn';
  text: string;
  verbatim?: boolean;
}

export interface MrkdwnOption {
  text: MrkdwnElement;
  value?: string;
  url?: string;
  description?: PlainTextElement;
}

export interface PlainTextOption {
  text: PlainTextElement;
  value?: string;
  url?: string;
  description?: PlainTextElement;
}

export type Option = MrkdwnOption | PlainTextOption;

export interface Confirm {
  title?: PlainTextElement;
  text: PlainTextElement | MrkdwnElement;
  confirm?: PlainTextElement;
  deny?: PlainTextElement;
  style?: 'primary' | 'danger';
}

/**
 * @description Determines when an input element will return a
 * {@link https://api.slack.com/reference/interaction-payloads/block-actions `block_actions` interaction payload}.
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

/*
 * Action Types
 */

// Selects and Multiselects are available in different surface areas so I've separated them here
export type Select = UsersSelect | StaticSelect | ConversationsSelect | ChannelsSelect | ExternalSelect;

export type MultiSelect =
  MultiUsersSelect | MultiStaticSelect | MultiConversationsSelect | MultiChannelsSelect | MultiExternalSelect;

export interface Action {
  type: string;
  /**
   * @description: An identifier for this action. You can use this when you receive an interaction payload to
   * {@link https://api.slack.com/interactivity/handling#payloads identify the source of the action}. Should be unique
   * among all other `action_id`s in the containing block. Maximum length for this field is 255 characters.
   */
  action_id?: string;
}

export interface Confirmable {
  /**
   * @description A {@see Confirm} object that defines an optional confirmation dialog after the element is interacted
   * with.
   */
  confirm?: Confirm;
}

export interface Focusable {
  /**
   * @description Indicates whether the element will be set to auto focus within the
   * {@link https://api.slack.com/reference/surfaces/views `view` object}. Only one element can be set to `true`.
   * Defaults to `false`.
   */
  focus_on_load?: boolean;
}

export interface Placeholdable {
  /**
   * @description A {@see PlainTextElement} object that defines the placeholder text shown on the element. Maximum
   * length for the `text` field in this object is 150 characters.
   */
  placeholder?: PlainTextElement;
}

export interface Dispatchable {
  /**
   * @description A {@see DispatchActionConfig} object that determines when during text input the element returns a
   * {@link https://api.slack.com/reference/interaction-payloads/block-actions `block_actions` payload}.
   */
  dispatch_action_config?: DispatchActionConfig;
}

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

export interface Button extends Action, Confirmable {
  type: 'button';
  text: PlainTextElement;
  value?: string;
  url?: string;
  style?: 'danger' | 'primary';
  accessibility_label?: string;
}

export interface Overflow extends Action, Confirmable {
  type: 'overflow';
  options: PlainTextOption[];
}

export interface Datepicker extends Action, Confirmable, Focusable, Placeholdable {
  type: 'datepicker';
  initial_date?: string;
}

export interface Timepicker extends Action, Confirmable, Focusable, Placeholdable {
  type: 'timepicker';
  initial_time?: string;
  timezone?: string;
}

export interface RadioButtons extends Action, Confirmable, Focusable {
  type: 'radio_buttons';
  initial_option?: Option;
  options: Option[];
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

export interface Checkboxes extends Action, Confirmable, Focusable {
  type: 'checkboxes';
  initial_options?: Option[];
  options: Option[];
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

/*
 * Block Types
 */

export type KnownBlock = ImageBlock | ContextBlock | ActionsBlock | DividerBlock |
SectionBlock | InputBlock | FileBlock | HeaderBlock | VideoBlock;

export interface Block {
  type: string;
  block_id?: string;
}

export interface ImageBlock extends Block {
  type: 'image';
  image_url: string;
  alt_text: string;
  title?: PlainTextElement;
}

export interface ContextBlock extends Block {
  type: 'context';
  elements: (ImageElement | PlainTextElement | MrkdwnElement)[];
}

export interface ActionsBlock extends Block {
  type: 'actions';
  elements: (Button | Overflow | Datepicker | Timepicker | DateTimepicker | Select | RadioButtons | Checkboxes
  | Action)[];
}

export interface DividerBlock extends Block {
  type: 'divider';
}

export interface SectionBlock extends Block {
  type: 'section';
  text?: PlainTextElement | MrkdwnElement; // either this or fields must be defined
  fields?: (PlainTextElement | MrkdwnElement)[]; // either this or text must be defined
  accessory?: Button
  | Overflow
  | Datepicker
  | Timepicker
  | Select
  | MultiSelect
  | Action
  | ImageElement
  | RadioButtons
  | Checkboxes;
}

export interface FileBlock extends Block {
  type: 'file';
  source: string; // 'remote'
  external_id: string;
}

export interface HeaderBlock extends Block {
  type: 'header';
  text: PlainTextElement;
}

export interface InputBlock extends Block {
  type: 'input';
  label: PlainTextElement;
  hint?: PlainTextElement;
  optional?: boolean;
  element: Select | MultiSelect | Datepicker | Timepicker | DateTimepicker | PlainTextInput | URLInput | EmailInput
  | NumberInput | RadioButtons | Checkboxes;
  dispatch_action?: boolean;
}

export interface MessageMetadata {
  event_type: string;
  event_payload: {
    [key: string]: string | number | boolean | MessageMetadataEventPayloadObject | MessageMetadataEventPayloadObject[];
  }
}

export interface MessageMetadataEventPayloadObject {
  [key: string]: string | number | boolean
}

export interface MessageAttachment {
  blocks?: (KnownBlock | Block)[];
  fallback?: string; // either this or text must be defined
  color?: 'good' | 'warning' | 'danger' | string;
  pretext?: string;
  author_name?: string;
  author_link?: string; // author_name must be present
  author_icon?: string; // author_name must be present
  title?: string;
  title_link?: string; // title must be present
  text?: string; // either this or fallback must be defined
  fields?: {
    title: string;
    value: string;
    short?: boolean;
  }[];
  image_url?: string;
  thumb_url?: string;
  footer?: string;
  footer_icon?: string; // footer must be present
  ts?: string;
  actions?: AttachmentAction[];
  callback_id?: string;
  mrkdwn_in?: ('pretext' | 'text' | 'fields')[];
  app_unfurl_url?: string;
  is_app_unfurl?: boolean;
  app_id?: string;
  bot_id?: string;
  preview?: MessageAttachmentPreview; // https://api.slack.com/methods/chat.unfurl#markdown
}

// https://api.slack.com/methods/chat.unfurl#markdown
export interface MessageAttachmentPreview {
  type?: string;
  can_remove?: boolean;
  title?: PlainTextElement;
  subtitle?: PlainTextElement;
  iconUrl?: string;
}

export interface AttachmentAction {
  id?: string;
  confirm?: Confirmation;
  data_source?: 'static' | 'channels' | 'conversations' | 'users' | 'external';
  min_query_length?: number;
  name?: string;
  options?: OptionField[];
  option_groups?: {
    text: string
    options: OptionField[];
  }[];
  selected_options?: OptionField[];
  style?: 'default' | 'primary' | 'danger';
  text: string;
  type: 'button' | 'select';
  value?: string;
  url?: string;
}

export interface OptionField {
  description?: string;
  text: string;
  value: string;
}

export interface Confirmation {
  dismiss_text?: string;
  ok_text?: string;
  text: string;
  title?: string;
}

export interface LinkUnfurls {
  [linkUrl: string]: MessageAttachment;
}

export interface SelectOption {
  label: string; // shown to user
  value: string; // sent to app
}

export type CallUser = CallUserSlack | CallUserExternal;

export interface CallUserSlack {
  slack_id: string;
}

export interface CallUserExternal {
  external_id: string;
  display_name: string;
  avatar_url: string;
}

export interface VideoBlock extends Block {
  type: 'video';
  video_url: string;
  thumbnail_url: string;
  alt_text: string;
  title: PlainTextElement;
  title_url?: string;
  author_name?: string;
  provider_name?: string;
  provider_icon_url?: string;
  description?: PlainTextElement;
}
