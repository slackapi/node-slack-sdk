/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type FilesRemoteShareResponse = WebAPICallResult & {
  ok?:       boolean;
  file?:     File;
  error?:    string;
  needed?:   string;
  provided?: string;
};

export interface File {
  id?:                string;
  created?:           number;
  timestamp?:         number;
  name?:              string;
  title?:             string;
  mimetype?:          string;
  filetype?:          string;
  pretty_type?:       string;
  user?:              string;
  editable?:          boolean;
  size?:              number;
  mode?:              string;
  is_external?:       boolean;
  external_type?:     string;
  is_public?:         boolean;
  public_url_shared?: boolean;
  display_as_bot?:    boolean;
  username?:          string;
  url_private?:       string;
  permalink?:         string;
  comments_count?:    number;
  is_starred?:        boolean;
  shares?:            Shares;
  channels?:          string[];
  groups?:            string[];
  ims?:               string[];
  external_id?:       string;
  external_url?:      string;
  has_rich_preview?:  boolean;
  thumb_64?:          string;
  thumb_80?:          string;
  thumb_360?:         string;
  thumb_360_w?:       number;
  thumb_360_h?:       number;
  thumb_480?:         string;
  thumb_480_w?:       number;
  thumb_480_h?:       number;
  thumb_160?:         string;
  thumb_720?:         string;
  thumb_720_w?:       number;
  thumb_720_h?:       number;
  thumb_800?:         string;
  thumb_800_w?:       number;
  thumb_800_h?:       number;
  thumb_960?:         string;
  thumb_960_w?:       number;
  thumb_960_h?:       number;
  thumb_1024?:        string;
  thumb_1024_w?:      number;
  thumb_1024_h?:      number;
  original_w?:        number;
  original_h?:        number;
  thumb_tiny?:        string;
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
}
