/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type SearchMessagesResponse = WebAPICallResult & {
  ok?:       boolean;
  query?:    string;
  messages?: Messages;
  error?:    string;
  needed?:   string;
  provided?: string;
};

export interface Messages {
  total?:      number;
  pagination?: Pagination;
  paging?:     Paging;
  matches?:    Match[];
}

export interface Match {
  iid?:          string;
  team?:         string;
  channel?:      Channel;
  type?:         string;
  user?:         string;
  username?:     string;
  ts?:           string;
  text?:         string;
  permalink?:    string;
  no_reactions?: boolean;
  previous?:     Previous;
  previous_2?:   Previous2;
  blocks?:       Block[];
  attachments?:  MatchAttachment[];
  is_mpim?:      boolean;
  score?:        number;
}

export interface MatchAttachment {
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

export interface Channel {
  id?:                    string;
  is_channel?:            boolean;
  is_group?:              boolean;
  is_im?:                 boolean;
  name?:                  string;
  is_shared?:             boolean;
  is_org_shared?:         boolean;
  is_ext_shared?:         boolean;
  is_private?:            boolean;
  is_mpim?:               boolean;
  pending_shared?:        string[];
  is_pending_ext_shared?: boolean;
  user?:                  string;
  name_normalized?:       string;
}

export interface Previous {
  type?:        string;
  user?:        string;
  username?:    string;
  ts?:          string;
  text?:        string;
  iid?:         string;
  permalink?:   string;
  attachments?: MatchAttachment[];
  blocks?:      Block[];
}

export interface Previous2 {
  type?:        string;
  user?:        string;
  username?:    string;
  ts?:          string;
  text?:        string;
  iid?:         string;
  permalink?:   string;
  attachments?: Previous2_Attachment[];
  blocks?:      Block[];
}

export interface Previous2_Attachment {
  service_name?:          string;
  title?:                 string;
  title_link?:            string;
  text?:                  string;
  fallback?:              string;
  image_url?:             string;
  ts?:                    number | string;
  from_url?:              string;
  image_width?:           number;
  image_height?:          number;
  image_bytes?:           number;
  service_icon?:          string;
  id?:                    number;
  original_url?:          string;
  msg_subtype?:           string;
  callback_id?:           string;
  color?:                 string;
  pretext?:               string;
  service_url?:           string;
  author_id?:             string;
  author_name?:           string;
  author_link?:           string;
  author_icon?:           string;
  author_subname?:        string;
  channel_id?:            string;
  channel_name?:          string;
  bot_id?:                string;
  indent?:                boolean;
  is_msg_unfurl?:         boolean;
  is_reply_unfurl?:       boolean;
  is_thread_root_unfurl?: boolean;
  is_app_unfurl?:         boolean;
  app_unfurl_url?:        string;
  fields?:                Field[];
  thumb_url?:             string;
  thumb_width?:           number;
  thumb_height?:          number;
  video_html?:            string;
  video_html_width?:      number;
  video_html_height?:     number;
  footer?:                string;
  footer_icon?:           string;
  mrkdwn_in?:             string[];
  actions?:               Action[];
  filename?:              string;
  size?:                  number;
  mimetype?:              string;
  url?:                   string;
  metadata?:              Metadata;
}

export interface Pagination {
  total_count?: number;
  page?:        number;
  per_page?:    number;
  page_count?:  number;
  first?:       number;
  last?:        number;
}

export interface Paging {
  count?: number;
  total?: number;
  page?:  number;
  pages?: number;
}
