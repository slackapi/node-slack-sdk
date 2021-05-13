/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ReactionsListResponse = WebAPICallResult & {
  ok?:       boolean;
  items?:    Item[];
  paging?:   Paging;
  error?:    string;
  needed?:   string;
  provided?: string;
};

export interface Item {
  type?:    string;
  channel?: string;
  message?: Message;
}

export interface Message {
  type?:              string;
  text?:              string;
  files?:             File[];
  upload?:            boolean;
  user?:              string;
  display_as_bot?:    boolean;
  ts?:                string;
  reactions?:         Reaction[];
  permalink?:         string;
  client_msg_id?:     string;
  team?:              string;
  blocks?:            Block[];
  bot_id?:            string;
  bot_profile?:       BotProfile;
  thread_ts?:         string;
  reply_count?:       number;
  reply_users_count?: number;
  latest_reply?:      string;
  reply_users?:       string[];
  subscribed?:        boolean;
  subtype?:           string;
  username?:          string;
  parent_user_id?:    string;
  is_locked?:         boolean;
  inviter?:           string;
}

export interface Block {
  type?:         string;
  elements?:     Element[];
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

export interface File {
  id?:                   string;
  created?:              number;
  timestamp?:            number;
  name?:                 string;
  title?:                string;
  mimetype?:             string;
  filetype?:             string;
  pretty_type?:          string;
  user?:                 string;
  editable?:             boolean;
  size?:                 number;
  mode?:                 string;
  is_external?:          boolean;
  external_type?:        string;
  is_public?:            boolean;
  public_url_shared?:    boolean;
  display_as_bot?:       boolean;
  username?:             string;
  url_private?:          string;
  url_private_download?: string;
  permalink?:            string;
  permalink_public?:     string;
  preview?:              string;
  last_editor?:          string;
  non_owner_editable?:   boolean;
  updated?:              number;
  is_starred?:           boolean;
  has_rich_preview?:     boolean;
}

export interface Reaction {
  name?:  string;
  users?: string[];
  count?: number;
}

export interface Paging {
  count?: number;
  total?: number;
  page?:  number;
  pages?: number;
}
