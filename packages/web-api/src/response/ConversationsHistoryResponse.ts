/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ConversationsHistoryResponse = WebAPICallResult & {
  ok?:                    boolean;
  messages?:              Message[];
  has_more?:              boolean;
  pin_count?:             number;
  channel_actions_ts?:    number;
  channel_actions_count?: number;
  response_metadata?:     ResponseMetadata;
  error?:                 string;
  needed?:                string;
  provided?:              string;
};

export interface Message {
  type?:              string;
  subtype?:           string;
  text?:              string;
  bot_id?:            string;
  ts?:                string;
  thread_ts?:         string;
  root?:              Root;
  username?:          string;
  icons?:             MessageIcons;
  parent_user_id?:    string;
  reply_count?:       number;
  reply_users_count?: number;
  latest_reply?:      string;
  reply_users?:       string[];
  subscribed?:        boolean;
  user?:              string;
  team?:              string;
  bot_profile?:       BotProfile;
  files?:             File[];
  upload?:            boolean;
  display_as_bot?:    boolean;
  x_files?:           string[];
  edited?:            Edited;
  blocks?:            Block[];
  attachments?:       Attachment[];
  topic?:             string;
  purpose?:           string;
  client_msg_id?:     string;
  reactions?:         Reaction[];
}

export interface Attachment {
  msg_subtype?:           string;
  fallback?:              string;
  callback_id?:           string;
  color?:                 string;
  pretext?:               string;
  service_url?:           string;
  service_name?:          string;
  service_icon?:          string;
  author_id?:             string;
  author_name?:           string;
  author_link?:           string;
  author_icon?:           string;
  from_url?:              string;
  original_url?:          string;
  author_subname?:        string;
  channel_id?:            string;
  channel_name?:          string;
  id?:                    number;
  bot_id?:                string;
  indent?:                boolean;
  is_msg_unfurl?:         boolean;
  is_reply_unfurl?:       boolean;
  is_thread_root_unfurl?: boolean;
  is_app_unfurl?:         boolean;
  app_unfurl_url?:        string;
  title?:                 string;
  title_link?:            string;
  text?:                  string;
  fields?:                Field[];
  image_url?:             string;
  image_width?:           number;
  image_height?:          number;
  image_bytes?:           number;
  thumb_url?:             string;
  thumb_width?:           number;
  thumb_height?:          number;
  video_html?:            string;
  video_html_width?:      number;
  video_html_height?:     number;
  footer?:                string;
  footer_icon?:           string;
  ts?:                    string;
  mrkdwn_in?:             string[];
  actions?:               Action[];
  filename?:              string;
  size?:                  number;
  mimetype?:              string;
  url?:                   string;
  metadata?:              Metadata;
}

export interface Action {
  id?:               string;
  name?:             string;
  text?:             string;
  style?:            string;
  type?:             string;
  value?:            string;
  confirm?:          ActionConfirm;
  options?:          Option[];
  selected_options?: Option[];
  data_source?:      string;
  min_query_length?: number;
  option_groups?:    OptionGroup[];
  url?:              string;
}

export interface ActionConfirm {
  title?:        string;
  text?:         string;
  ok_text?:      string;
  dismiss_text?: string;
}

export interface OptionGroup {
  text?: string;
}

export interface Option {
  text?:  string;
  value?: string;
}

export interface Field {
  title?: string;
  value?: string;
  short?: boolean;
}

export interface Metadata {
  thumb_64?:    boolean;
  thumb_80?:    boolean;
  thumb_160?:   boolean;
  original_w?:  number;
  original_h?:  number;
  thumb_360_w?: number;
  thumb_360_h?: number;
  format?:      string;
  extension?:   string;
  rotation?:    number;
  thumb_tiny?:  string;
}

export interface Block {
  type?:         string;
  block_id?:     string;
  text?:         Text;
  elements?:     Element[];
  fallback?:     string;
  image_url?:    string;
  image_width?:  number;
  image_height?: number;
  image_bytes?:  number;
  alt_text?:     string;
  title?:        Text;
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
  confirm?:                         ElementConfirm;
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

export interface ElementConfirm {
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
  icons?:   BotProfileIcons;
  team_id?: string;
}

export interface BotProfileIcons {
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
  thumb_64?:             string;
  thumb_80?:             string;
  thumb_360?:            string;
  thumb_360_w?:          number;
  thumb_360_h?:          number;
  thumb_480?:            string;
  thumb_480_w?:          number;
  thumb_480_h?:          number;
  thumb_160?:            string;
  thumb_720?:            string;
  thumb_720_w?:          number;
  thumb_720_h?:          number;
  thumb_800?:            string;
  thumb_800_w?:          number;
  thumb_800_h?:          number;
  thumb_960?:            string;
  thumb_960_w?:          number;
  thumb_960_h?:          number;
  thumb_1024?:           string;
  thumb_1024_w?:         number;
  thumb_1024_h?:         number;
  original_w?:           number;
  original_h?:           number;
  thumb_tiny?:           string;
  permalink?:            string;
  is_starred?:           boolean;
  external_id?:          string;
  external_url?:         string;
  has_rich_preview?:     boolean;
  url_private_download?: string;
  permalink_public?:     string;
  edit_link?:            string;
  preview?:              string;
  preview_highlight?:    string;
  lines?:                number;
  lines_more?:           number;
  preview_is_truncated?: boolean;
}

export interface MessageIcons {
  emoji?:    string;
  image_64?: string;
}

export interface Reaction {
  name?:  string;
  users?: string[];
  count?: number;
}

export interface Root {
  type?:              string;
  subtype?:           string;
  text?:              string;
  ts?:                string;
  username?:          string;
  icons?:             MessageIcons;
  bot_id?:            string;
  thread_ts?:         string;
  parent_user_id?:    string;
  reply_count?:       number;
  reply_users_count?: number;
  latest_reply?:      string;
  reply_users?:       string[];
  subscribed?:        boolean;
}

export interface ResponseMetadata {
  next_cursor?: string;
}
