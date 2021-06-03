/* tslint:disable */
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
  original_w?:           number;
  original_h?:           number;
  thumb_tiny?:           string;
  permalink?:            string;
  channels?:             string[];
  groups?:               string[];
  ims?:                  string[];
  comments_count?:       number;
  image_exif_rotation?:  number;
  url_private_download?: string;
  permalink_public?:     string;
  edit_link?:            string;
  preview?:              string;
  preview_highlight?:    string;
  lines?:                number;
  lines_more?:           number;
  preview_is_truncated?: boolean;
  thumb_960?:            string;
  thumb_960_w?:          number;
  thumb_960_h?:          number;
  thumb_1024?:           string;
  thumb_1024_w?:         number;
  thumb_1024_h?:         number;
  thumb_video?:          string;
}

export interface Paging {
  count?: number;
  total?: number;
  page?:  number;
  pages?: number;
}
