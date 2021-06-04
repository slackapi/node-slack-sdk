/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ConversationsOpenResponse = WebAPICallResult & {
  ok?:           boolean;
  channel?:      Channel;
  no_op?:        boolean;
  already_open?: boolean;
  error?:        string;
  needed?:       string;
  provided?:     string;
};

export interface Channel {
  id?:                   string;
  created?:              number;
  is_archived?:          boolean;
  is_im?:                boolean;
  is_org_shared?:        boolean;
  user?:                 string;
  last_read?:            string;
  latest?:               Latest;
  unread_count?:         number;
  unread_count_display?: number;
  is_open?:              boolean;
  priority?:             number;
}

export interface Latest {
  type?:          string;
  subtype?:       string;
  text?:          string;
  ts?:            string;
  bot_id?:        string;
  blocks?:        Block[];
  client_msg_id?: string;
  user?:          string;
  team?:          string;
}

export interface Block {
  type?:         string;
  block_id?:     string;
  elements?:     BlockElement[];
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
  type?:         string;
  image_url?:    string;
  alt_text?:     string;
  fallback?:     string;
  image_width?:  number;
  image_height?: number;
  image_bytes?:  number;
}

export interface BlockElement {
  type?:                            string;
  elements?:                        ElementElementClass[];
  text?:                            Text;
  action_id?:                       string;
  url?:                             string;
  value?:                           string;
  style?:                           string;
  confirm?:                         Confirm;
  placeholder?:                     Text;
  initial_channel?:                 string;
  response_url_enabled?:            boolean;
  initial_conversation?:            string;
  default_to_current_conversation?: boolean;
  filter?:                          Filter;
  initial_date?:                    string;
  initial_time?:                    string;
  initial_option?:                  InitialOption;
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

export interface ElementElementClass {
  type?: string;
  text?: string;
}

export interface Filter {
  exclude_external_shared_channels?: boolean;
  exclude_bot_users?:                boolean;
}

export interface InitialOption {
  text?:        Text;
  value?:       string;
  description?: Text;
  url?:         string;
}
