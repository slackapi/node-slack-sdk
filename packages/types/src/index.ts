/*
 * Reusable shapes for argument values
 */
// TODO: dialogs are deprecated https://api.slack.com/dialogs
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

/**
 * Composition Objects: https://api.slack.com/reference/block-kit/composition-objects
 */

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
  value: string;
  url?: string;
  description?: PlainTextElement;
}

export interface PlainTextOption {
  text: PlainTextElement;
  value: string; // TODO: technically this property is optional, but if it is not provided, if the option is selected
  // as a value in e.g. a static menu, then the returned value will be `null`
  url?: string;
  description?: PlainTextElement;
}

export interface Confirm {
  title: PlainTextElement;
  text: PlainTextElement | MrkdwnElement;
  confirm: PlainTextElement;
  deny: PlainTextElement;
  style?: 'primary' | 'danger'; // TODO: factor out into own type
}

export type Option = MrkdwnOption | PlainTextOption;

export interface DispatchActionConfig {
  trigger_actions_on?: ('on_enter_pressed' | 'on_character_entered')[];
}

/*
 * Block Elements: https://api.slack.com/reference/block-kit/block-elements
 * Also known as interactive elements
 * Exported below as Action
 */

export type KnownAction =
  Select | MultiSelect | Button | Overflow | Datepicker | Timepicker | RadioButtons | Checkboxes | PlainTextInput;

export interface Action {
  type: string;
  /**
   * @description: A string acting as a unique identifier for a block.
   */
  block_id?: string; // TODO: in event payloads, this property will always be present. When defining a block, however,
  // it is optional. If not defined when the block is created, Slack will auto-assign a block_id for you - thus why it
  // is always present in payloads. So: how can we capture that? Differentiate between the event payload vs. the block
  // element?
  action_id?: string;
}

// Selects and Multiselects are available in different surface areas so I've separated them here
export type Select = UsersSelect | StaticSelect | ConversationsSelect | ChannelsSelect | ExternalSelect;

export type MultiSelect =
  MultiUsersSelect | MultiStaticSelect | MultiConversationsSelect | MultiChannelsSelect | MultiExternalSelect;

export interface UsersSelect extends Action {
  type: 'users_select';
  initial_user?: string;
  placeholder?: PlainTextElement;
  confirm?: Confirm;
  focus_on_load?: boolean;
}

export interface MultiUsersSelect extends Action {
  type: 'multi_users_select';
  initial_users?: string[];
  placeholder?: PlainTextElement;
  max_selected_items?: number;
  confirm?: Confirm;
  focus_on_load?: boolean;
}

export interface StaticSelect extends Action {
  type: 'static_select';
  placeholder?: PlainTextElement;
  initial_option?: PlainTextOption;
  options?: PlainTextOption[]; // TODO: mutually exclusive with option_groups but one of them is required
  // TODO: minimum length of 1
  option_groups?: { // todo: factor into own interface
    label: PlainTextElement;
    options: PlainTextOption[]; // TODO: min length 1
  }[];
  confirm?: Confirm;
  focus_on_load?: boolean;
}

export interface MultiStaticSelect extends Action {
  type: 'multi_static_select';
  placeholder?: PlainTextElement;
  initial_options?: PlainTextOption[];
  options?: PlainTextOption[]; // TODO: options and option_groups are mutually exclusive but one of them is required
  // TODO: minimum length of 1
  option_groups?: { // todo: factor into own interface
    label: PlainTextElement;
    options: PlainTextOption[]; // TODO: min length 1
  }[];
  max_selected_items?: number;
  confirm?: Confirm;
  focus_on_load?: boolean;
}

export interface ConversationsSelect extends Action {
  type: 'conversations_select';
  initial_conversation?: string;
  placeholder?: PlainTextElement;
  confirm?: Confirm;
  response_url_enabled?: boolean;
  default_to_current_conversation?: boolean;
  filter?: {
    include?: ('im' | 'mpim' | 'private' | 'public')[];
    exclude_external_shared_channels?: boolean;
    exclude_bot_users?: boolean;
  };
  focus_on_load?: boolean;
}

export interface MultiConversationsSelect extends Action {
  type: 'multi_conversations_select';
  initial_conversations?: string[];
  placeholder?: PlainTextElement;
  max_selected_items?: number;
  confirm?: Confirm;
  default_to_current_conversation?: boolean;
  filter?: {
    include?: ('im' | 'mpim' | 'private' | 'public')[];
    exclude_external_shared_channels?: boolean;
    exclude_bot_users?: boolean;
  };
  focus_on_load?: boolean;
}

export interface ChannelsSelect extends Action {
  type: 'channels_select';
  initial_channel?: string;
  placeholder?: PlainTextElement;
  response_url_enabled?: boolean;
  confirm?: Confirm;
  focus_on_load?: boolean;
}

export interface MultiChannelsSelect extends Action {
  type: 'multi_channels_select';
  initial_channels?: string[];
  placeholder?: PlainTextElement;
  max_selected_items?: number;
  confirm?: Confirm;
  focus_on_load?: boolean;
}

export interface ExternalSelect extends Action {
  type: 'external_select';
  initial_option?: PlainTextOption;
  placeholder?: PlainTextElement;
  min_query_length?: number;
  confirm?: Confirm;
  focus_on_load?: boolean;
}

export interface MultiExternalSelect extends Action {
  type: 'multi_external_select';
  // event to return option data. so de-facto this is necessary
  initial_options?: PlainTextOption[];
  placeholder?: PlainTextElement;
  min_query_length?: number;
  max_selected_items?: number;
  confirm?: Confirm;
  focus_on_load?: boolean;
}

export interface Button extends Action {
  accessibility_label?: string;
  confirm?: Confirm;
  style?: 'danger' | 'primary';
  text: PlainTextElement;
  type: 'button';
  /**
   * @description: A URL to load in the user's browser when the button is clicked. Maximum length for this field is
   * 3000 characters.
   */
  url?: string;
  value?: string;
}

export interface Overflow extends Action {
  type: 'overflow';
  options: PlainTextOption[]; // TODO: min length 1
  confirm?: Confirm;
}

export interface Datepicker extends Action {
  type: 'datepicker';
  initial_date?: string;
  placeholder?: PlainTextElement;
  confirm?: Confirm;
  focus_on_load?: boolean;
}

export interface Timepicker extends Action {
  type: 'timepicker';
  initial_time?: string;
  placeholder?: PlainTextElement;
  confirm?: Confirm;
  focus_on_load?: boolean;
  timezone?: string;
}

export interface RadioButtons extends Action {
  type: 'radio_buttons';
  initial_option?: Option;
  options: Option[]; // TODO: min length 1
  confirm?: Confirm;
  focus_on_load?: boolean;
}

export interface Checkboxes extends Action {
  type: 'checkboxes';
  initial_options?: Option[];
  options: Option[]; // TODO: min length 1
  confirm?: Confirm;
  focus_on_load?: boolean;
}

export interface PlainTextInput extends Action {
  type: 'plain_text_input';
  placeholder?: PlainTextElement;
  initial_value?: string;
  multiline?: boolean;
  min_length?: number;
  max_length?: number;
  dispatch_action_config?: DispatchActionConfig;
  focus_on_load?: boolean;
}

export interface ImageElement {
  type: 'image';
  image_url: string;
  alt_text: string;
}

/**
 * Layout Blocks: https://api.slack.com/reference/block-kit/blocks
 */

export interface Block {
  type: string;
  /**
   * @description: A string acting as a unique identifier for a block. If not specified, a `block_id` will be generated.
   * You can use this `block_id` when you receive an interaction payload to identify the source of the action. Maximum
   * length for this field is 255 characters. block_id should be unique for each message and each iteration of a
   * message. If a message is updated, use a new block_id.
   */
  block_id?: string;
}

export type KnownBlock = ImageBlock | ContextBlock | ActionsBlock | DividerBlock |
SectionBlock | InputBlock | FileBlock | HeaderBlock | VideoBlock;

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
  elements: (Button | Overflow | Datepicker | Timepicker | Select | MultiSelect | RadioButtons | Checkboxes | Action)[];
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
  | PlainTextInput
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
  element: Select | MultiSelect | Datepicker | Timepicker | PlainTextInput | RadioButtons | Checkboxes;
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
