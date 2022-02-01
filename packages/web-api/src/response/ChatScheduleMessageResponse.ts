/* eslint-disable */
/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// !!! DO NOT EDIT THIS FILE !!!                                                       //
//                                                                                     //
// This file is auto-generated by scripts/generate-web-api-types.sh in the repository. //
// Please refer to the script code to learn how to update the source data.             //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

import { WebAPICallResult } from '../WebClient';
export type ChatScheduleMessageResponse = WebAPICallResult & {
  ok?:                   boolean;
  scheduled_message_id?: string;
  channel?:              string;
  post_at?:              number;
  message?:              Message;
  error?:                string;
  response_metadata?:    ResponseMetadata;
  needed?:               string;
  provided?:             string;
};

export interface Message {
  bot_id?:      string;
  type?:        string;
  text?:        string;
  user?:        string;
  team?:        string;
  bot_profile?: BotProfile;
  blocks?:      Block[];
}

export interface Block {
  type?:         string;
  elements?:     Accessory[];
  block_id?:     string;
  fallback?:     string;
  image_url?:    string;
  image_width?:  number;
  image_height?: number;
  image_bytes?:  number;
  alt_text?:     string;
  title?:        Text;
  text?:         Text;
  fields?:       Text[];
  accessory?:    Accessory;
}

export interface Accessory {
  type?:                            string;
  text?:                            Text;
  action_id?:                       string;
  url?:                             string;
  value?:                           string;
  style?:                           string;
  confirm?:                         Confirm;
  accessibility_label?:             string;
  options?:                         Option[];
  initial_options?:                 Option[];
  focus_on_load?:                   boolean;
  initial_option?:                  Option;
  placeholder?:                     Text;
  initial_channel?:                 string;
  response_url_enabled?:            boolean;
  initial_channels?:                string[];
  max_selected_items?:              number;
  initial_conversation?:            string;
  default_to_current_conversation?: boolean;
  filter?:                          Filter;
  initial_conversations?:           string[];
  initial_date?:                    string;
  initial_time?:                    string;
  min_query_length?:                number;
  image_url?:                       string;
  alt_text?:                        string;
  fallback?:                        string;
  image_width?:                     number;
  image_height?:                    number;
  image_bytes?:                     number;
  option_groups?:                   OptionGroup[];
  initial_user?:                    string;
  initial_users?:                   string[];
}

export interface Confirm {
  title?:   Text;
  text?:    Text;
  confirm?: Text;
  deny?:    Text;
  style?:   string;
}

export interface Text {
  type?:     string;
  text?:     string;
  emoji?:    boolean;
  verbatim?: boolean;
}

export interface Filter {
  include?:                          string[];
  exclude_external_shared_channels?: boolean;
  exclude_bot_users?:                boolean;
}

export interface Option {
  text?:        Text;
  value?:       string;
  description?: Text;
  url?:         string;
}

export interface OptionGroup {
  label?:   Text;
  options?: Option[];
}

export interface BotProfile {
  id?:      string;
  deleted?: boolean;
  name?:    string;
  updated?: number;
  app_id?:  string;
  icons?:   Icons;
  team_id?: string;
}

export interface Icons {
  image_36?: string;
  image_48?: string;
  image_72?: string;
}

export interface ResponseMetadata {
  messages?: string[];
}
