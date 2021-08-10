/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type FilesInfoResponse = WebAPICallResult & {
  ok?:                     boolean;
  file?:                   File;
  content?:                string;
  is_truncated?:           boolean;
  content_highlight_html?: string;
  content_highlight_css?:  string;
  comments?:               Comment[];
  paging?:                 Paging;
  error?:                  string;
  needed?:                 string;
  provided?:               string;
};

export interface Comment {
  id?:        string;
  created?:   number;
  timestamp?: number;
  user?:      string;
  comment?:   string;
  channel?:   string;
  is_intro?:  boolean;
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
  comments_count?:       number;
  is_starred?:           boolean;
  shares?:               Shares;
  channels?:             string[];
  groups?:               string[];
  ims?:                  string[];
  has_rich_preview?:     boolean;
  thumb_64?:             string;
  thumb_80?:             string;
  thumb_360?:            string;
  thumb_360_w?:          number;
  thumb_360_h?:          number;
  thumb_160?:            string;
  original_w?:           number;
  original_h?:           number;
  thumb_tiny?:           string;
  media_display_type?:   string;
}

export interface Shares {
  public?:  { [key: string]: Private[] };
  private?: { [key: string]: Private[] };
}

export interface Private {
  reply_users?:       string[];
  reply_users_count?: number;
  reply_count?:       number;
  ts?:                string;
  channel_name?:      string;
  team_id?:           string;
  share_user_id?:     string;
}

export interface Paging {
  count?: number;
  total?: number;
  page?:  number;
  pages?: number;
}
