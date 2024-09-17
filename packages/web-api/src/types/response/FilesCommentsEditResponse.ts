/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// !!! DO NOT EDIT THIS FILE !!!                                                       //
//                                                                                     //
// This file is auto-generated by scripts/generate-web-api-types.sh in the repository. //
// Please refer to the script code to learn how to update the source data.             //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

import { WebAPICallResult } from '../../WebClient';
export type FilesCommentsEditResponse = WebAPICallResult & {
  comment?:  Comment;
  error?:    string;
  needed?:   string;
  ok?:       boolean;
  provided?: string;
};

export interface Comment {
  comment?:   string;
  created?:   number;
  id?:        string;
  is_intro?:  boolean;
  timestamp?: number;
  user?:      string;
}
