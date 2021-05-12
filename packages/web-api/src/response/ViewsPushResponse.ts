/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ViewsPushResponse = WebAPICallResult & {
  ok?:                boolean;
  warning?:           string;
  error?:             string;
  needed?:            string;
  provided?:          string;
  view?:              View;
  response_metadata?: ResponseMetadata;
};

export interface ResponseMetadata {
  messages?: string[];
}

export interface View {
  id?:                    string;
  team_id?:               string;
  type?:                  string;
  title?:                 Close;
  submit?:                Close;
  close?:                 Close;
  blocks?:                Block[];
  private_metadata?:      string;
  callback_id?:           string;
  external_id?:           string;
  state?:                 State;
  hash?:                  string;
  clear_on_close?:        boolean;
  notify_on_close?:       boolean;
  submit_disabled?:       boolean;
  root_view_id?:          string;
  previous_view_id?:      string;
  app_id?:                string;
  app_installed_team_id?: string;
  bot_id?:                string;
}

export interface Block {
  type?:            string;
  block_id?:        string;
  label?:           Close;
  element?:         Element;
  dispatch_action?: boolean;
  hint?:            Close;
  optional?:        boolean;
  elements?:        Element[];
  fallback?:        string;
  image_url?:       string;
  image_width?:     number;
  image_height?:    number;
  image_bytes?:     number;
  alt_text?:        string;
  title?:           Close;
  text?:            Close;
  fields?:          Close[];
  accessory?:       Accessory;
}

export interface Accessory {
  type?:         string;
  image_url?:    string;
  alt_text?:     string;
  fallback?:     string;
  image_width?:  number;
  image_height?: number;
  image_bytes?:  number;
}

export interface Element {
  type?:                            string;
  action_id?:                       string;
  placeholder?:                     Close;
  initial_value?:                   string;
  multiline?:                       boolean;
  min_length?:                      number;
  max_length?:                      number;
  dispatch_action_config?:          DispatchActionConfig;
  options?:                         Option[];
  initial_option?:                  Option;
  confirm?:                         Confirm;
  text?:                            Close;
  url?:                             string;
  value?:                           string;
  style?:                           string;
  initial_channel?:                 string;
  response_url_enabled?:            boolean;
  initial_conversation?:            string;
  default_to_current_conversation?: boolean;
  filter?:                          Filter;
  initial_date?:                    string;
  initial_time?:                    string;
  min_query_length?:                number;
  image_url?:                       string;
  alt_text?:                        string;
  fallback?:                        string;
  image_width?:                     number;
  image_height?:                    number;
  image_bytes?:                     number;
  initial_user?:                    string;
}

export interface Confirm {
  title?:   Close;
  text?:    Close;
  confirm?: Close;
  deny?:    Close;
  style?:   string;
}

export interface Close {
  type?:     Type;
  text?:     string;
  emoji?:    boolean;
  verbatim?: boolean;
}

export enum Type {
  Empty = '',
  Mrkdwn = 'mrkdwn',
  PlainText = 'plain_text',
}

export interface DispatchActionConfig {
  trigger_actions_on?: string[];
}

export interface Filter {
  exclude_external_shared_channels?: boolean;
  exclude_bot_users?:                boolean;
}

export interface Option {
  text?:        Close;
  value?:       string;
  description?: Close;
  url?:         string;
}

export interface State {
}
