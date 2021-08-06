/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type FilesRemoteListResponse = WebAPICallResult & {
  ok?:                boolean;
  files?:             File[];
  response_metadata?: ResponseMetadata;
  error?:             string;
  needed?:            string;
  provided?:          string;
};

export interface File {
  id?:                  string;
  created?:             number;
  timestamp?:           number;
  name?:                string;
  title?:               string;
  mimetype?:            string;
  filetype?:            string;
  pretty_type?:         string;
  user?:                string;
  editable?:            boolean;
  size?:                number;
  mode?:                string;
  is_external?:         boolean;
  external_type?:       string;
  is_public?:           boolean;
  public_url_shared?:   boolean;
  display_as_bot?:      boolean;
  username?:            string;
  url_private?:         string;
  thumb_64?:            string;
  thumb_80?:            string;
  thumb_360?:           string;
  thumb_360_w?:         number;
  thumb_360_h?:         number;
  thumb_480?:           string;
  thumb_480_w?:         number;
  thumb_480_h?:         number;
  thumb_160?:           string;
  thumb_720?:           string;
  thumb_720_w?:         number;
  thumb_720_h?:         number;
  thumb_800?:           string;
  thumb_800_w?:         number;
  thumb_800_h?:         number;
  thumb_960?:           string;
  thumb_960_w?:         number;
  thumb_960_h?:         number;
  thumb_1024?:          string;
  thumb_1024_w?:        number;
  thumb_1024_h?:        number;
  image_exif_rotation?: number;
  original_w?:          number;
  original_h?:          number;
  thumb_tiny?:          string;
  permalink?:           string;
  channels?:            string[];
  groups?:              string[];
  ims?:                 string[];
  comments_count?:      number;
  media_display_type?:  string;
}

export interface ResponseMetadata {
  next_cursor?: string;
}
