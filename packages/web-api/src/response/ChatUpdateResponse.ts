/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ChatUpdateResponse = WebAPICallResult & {
  ok?:       boolean;
  channel?:  string;
  ts?:       string;
  text?:     string;
  message?:  Message;
  error?:    string;
  needed?:   string;
  provided?: string;
};

export interface Message {
  bot_id?:         string;
  type?:           string;
  text?:           string;
  user?:           string;
  team?:           string;
  bot_profile?:    BotProfile;
  blocks?:         Block[];
  edited?:         Edited;
  files?:          File[];
  upload?:         boolean;
  display_as_bot?: boolean;
}

export interface Block {
  type?:         string;
  block_id?:     string;
  text?:         Text;
  accessory?:    Accessory;
  elements?:     Element[];
  fallback?:     string;
  image_url?:    string;
  image_width?:  number;
  image_height?: number;
  image_bytes?:  number;
  alt_text?:     string;
  title?:        Text;
  fields?:       Text[];
}

export interface Accessory {
  fallback?:     string;
  image_url?:    string;
  image_width?:  number;
  image_height?: number;
  image_bytes?:  number;
  type?:         string;
  alt_text?:     string;
}

export interface Element {
  type?:                            string;
  action_id?:                       string;
  text?:                            Text;
  value?:                           string;
  url?:                             string;
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

export interface Edited {
  user?: string;
  ts?:   string;
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
  edit_link?:            string;
  preview?:              string;
  preview_highlight?:    string;
  lines?:                number;
  lines_more?:           number;
  preview_is_truncated?: boolean;
  is_starred?:           boolean;
  has_rich_preview?:     boolean;
}
