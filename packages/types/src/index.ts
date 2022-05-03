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

/*
 * Action Types
 */

// Selects and Multiselects are available in different surface areas so I've separated them here
export type Select = UsersSelect | StaticSelect | ConversationsSelect | ChannelsSelect | ExternalSelect;

export type MultiSelect =
  MultiUsersSelect | MultiStaticSelect | MultiConversationsSelect | MultiChannelsSelect | MultiExternalSelect;

export interface Action {
  type: string;
  action_id?: string;
}

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
  options?: PlainTextOption[];
  option_groups?: {
    label: PlainTextElement;
    options: PlainTextOption[];
  }[];
  confirm?: Confirm;
  focus_on_load?: boolean;
}

export interface MultiStaticSelect extends Action {
  type: 'multi_static_select';
  placeholder?: PlainTextElement;
  initial_options?: PlainTextOption[];
  options?: PlainTextOption[];
  option_groups?: {
    label: PlainTextElement;
    options: PlainTextOption[];
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
  initial_options?: PlainTextOption[];
  placeholder?: PlainTextElement;
  min_query_length?: number;
  max_selected_items?: number;
  confirm?: Confirm;
  focus_on_load?: boolean;
}

export interface Button extends Action {
  type: 'button';
  text: PlainTextElement;
  value?: string;
  url?: string;
  style?: 'danger' | 'primary';
  confirm?: Confirm;
}

export interface Overflow extends Action {
  type: 'overflow';
  options: PlainTextOption[];
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
}

export interface RadioButtons extends Action {
  type: 'radio_buttons';
  initial_option?: Option;
  options: Option[];
  confirm?: Confirm;
  focus_on_load?: boolean;
}

export interface Checkboxes extends Action {
  type: 'checkboxes';
  initial_options?: Option[];
  options: Option[];
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

export interface DispatchActionConfig {
  trigger_actions_on?: ('on_enter_pressed' | 'on_character_entered')[];
}

/*
 * Block Types
 */

export type KnownBlock = ImageBlock | ContextBlock | ActionsBlock | DividerBlock |
SectionBlock | InputBlock | FileBlock | HeaderBlock;

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
  elements: (Button | Overflow | Datepicker | Timepicker | Select | RadioButtons | Checkboxes | Action)[];
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
  element: Select | MultiSelect | Datepicker | Timepicker | PlainTextInput | RadioButtons | Checkboxes;
  dispatch_action?: boolean;
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

export interface Metadata {
  event_type: string;
  event_payload: Record<string, unknown>;
  notification_subscription_id: string;
}
