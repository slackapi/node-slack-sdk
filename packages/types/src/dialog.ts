/**
 * Reusable shapes for argument values
 * @deprecated Dialogs are a deprecated surface in Slack. For more details on how to upgrade, check out our {@link https://api.slack.com/block-kit/dialogs-to-modals Upgrading outmoded dialogs to modals guide}. This will be removed in the next major version.
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

export interface SelectOption {
  label: string; // shown to user
  value: string; // sent to app
}
