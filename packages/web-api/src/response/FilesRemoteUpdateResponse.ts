/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type FilesRemoteUpdateResponse = WebAPICallResult & {
  ok?:       boolean;
  file?:     File;
  error?:    string;
  needed?:   string;
  provided?: string;
};

export interface File {
  id?:                 string;
  created?:            number;
  timestamp?:          number;
  name?:               string;
  title?:              string;
  mimetype?:           string;
  filetype?:           string;
  pretty_type?:        string;
  user?:               string;
  editable?:           boolean;
  size?:               number;
  mode?:               string;
  is_external?:        boolean;
  external_type?:      string;
  is_public?:          boolean;
  public_url_shared?:  boolean;
  display_as_bot?:     boolean;
  username?:           string;
  url_private?:        string;
  permalink?:          string;
  comments_count?:     number;
  is_starred?:         boolean;
  shares?:             Shares;
  channels?:           string[];
  groups?:             string[];
  ims?:                string[];
  external_id?:        string;
  external_url?:       string;
  has_rich_preview?:   boolean;
  media_display_type?: string;
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
