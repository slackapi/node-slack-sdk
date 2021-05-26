/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type FilesUploadResponse = WebAPICallResult & {
  ok?:       boolean;
  file?:     File;
  error?:    string;
  needed?:   string;
  provided?: string;
};

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
}

export interface Shares {
  public?: { [key: string]: Public[] };
}

export interface Public {
  reply_users?:       string[];
  reply_users_count?: number;
  reply_count?:       number;
  ts?:                string;
  channel_name?:      string;
  team_id?:           string;
  share_user_id?:     string;
  thread_ts?:         string;
  latest_reply?:      string;
}
