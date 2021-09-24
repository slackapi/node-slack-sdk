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
export type FilesListResponse = WebAPICallResult & {
  ok?:       boolean;
  files?:    File[];
  paging?:   Paging;
  error?:    string;
  needed?:   string;
  provided?: string;
};

export interface File {
  id?:                        string;
  created?:                   number;
  timestamp?:                 number;
  name?:                      string;
  title?:                     string;
  mimetype?:                  string;
  filetype?:                  string;
  pretty_type?:               string;
  user?:                      string;
  editable?:                  boolean;
  size?:                      number;
  mode?:                      string;
  is_external?:               boolean;
  external_type?:             string;
  is_public?:                 boolean;
  public_url_shared?:         boolean;
  display_as_bot?:            boolean;
  username?:                  string;
  url_private?:               string;
  permalink?:                 string;
  channels?:                  string[];
  groups?:                    string[];
  ims?:                       string[];
  comments_count?:            number;
  thumb_64?:                  string;
  thumb_80?:                  string;
  thumb_360?:                 string;
  thumb_360_w?:               number;
  thumb_360_h?:               number;
  thumb_160?:                 string;
  thumb_800?:                 string;
  thumb_800_w?:               number;
  thumb_800_h?:               number;
  image_exif_rotation?:       number;
  original_w?:                number;
  original_h?:                number;
  thumb_tiny?:                string;
  url_private_download?:      string;
  thumb_480?:                 string;
  thumb_480_w?:               number;
  thumb_480_h?:               number;
  thumb_720?:                 string;
  thumb_720_w?:               number;
  thumb_720_h?:               number;
  permalink_public?:          string;
  edit_link?:                 string;
  preview?:                   string;
  preview_highlight?:         string;
  lines?:                     number;
  lines_more?:                number;
  preview_is_truncated?:      boolean;
  thumb_960?:                 string;
  thumb_960_w?:               number;
  thumb_960_h?:               number;
  thumb_1024?:                string;
  thumb_1024_w?:              number;
  thumb_1024_h?:              number;
  media_display_type?:        string;
  num_stars?:                 number;
  is_starred?:                boolean;
  thumb_360_gif?:             string;
  thumb_480_gif?:             string;
  deanimate?:                 string;
  deanimate_gif?:             string;
  subject?:                   string;
  to?:                        Cc[];
  from?:                      Cc[];
  cc?:                        Cc[];
  attachments?:               Attachment[];
  original_attachment_count?: number;
  plain_text?:                string;
  preview_plain_text?:        string;
  headers?:                   Headers;
  app_id?:                    string;
  app_name?:                  string;
  has_more?:                  boolean;
  sent_to_self?:              boolean;
  non_owner_editable?:        boolean;
  editor?:                    string;
  last_editor?:               string;
  updated?:                   number;
  external_id?:               string;
  external_url?:              string;
  thumb_64_gif?:              string;
  thumb_64_w?:                string;
  thumb_64_h?:                string;
  thumb_80_gif?:              string;
  thumb_80_w?:                string;
  thumb_80_h?:                string;
  thumb_160_gif?:             string;
  thumb_160_w?:               string;
  thumb_160_h?:               string;
  thumb_720_gif?:             string;
  thumb_800_gif?:             string;
  thumb_960_gif?:             string;
  thumb_1024_gif?:            string;
  thumb_video?:               string;
  thumb_gif?:                 string;
  thumb_pdf?:                 string;
  thumb_pdf_w?:               string;
  thumb_pdf_h?:               string;
  converted_pdf?:             string;
  pjpeg?:                     string;
  has_rich_preview?:          boolean;
  shares?:                    Shares;
  channel_actions_ts?:        string;
  channel_actions_count?:     number;
  simplified_html?:           string;
  bot_id?:                    string;
  initial_comment?:           InitialComment;
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
  video_url?:             string;
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
  confirm?:          Confirm;
  options?:          Option[];
  selected_options?: Option[];
  data_source?:      string;
  min_query_length?: number;
  option_groups?:    OptionGroup[];
  url?:              string;
}

export interface Confirm {
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

export interface Cc {
  address?:  string;
  name?:     string;
  original?: string;
}

export interface Headers {
  date?:        string;
  reply_to?:    string;
  message_id?:  string;
  in_reply_to?: string;
}

export interface InitialComment {
  id?:        string;
  created?:   number;
  timestamp?: number;
  user?:      string;
  comment?:   string;
  channel?:   string;
  is_intro?:  boolean;
}

export interface Shares {
}

export interface Paging {
  count?: number;
  total?: number;
  page?:  number;
  pages?: number;
}
