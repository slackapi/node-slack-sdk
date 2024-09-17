/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// !!! DO NOT EDIT THIS FILE !!!                                                       //
//                                                                                     //
// This file is auto-generated by scripts/generate-web-api-types.sh in the repository. //
// Please refer to the script code to learn how to update the source data.             //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

import { WebAPICallResult } from '../../WebClient';
export type TeamPreferencesListResponse = WebAPICallResult & {
  allow_message_deletion?: boolean;
  disable_file_uploads?:   string;
  display_real_names?:     boolean;
  error?:                  string;
  msg_edit_window_mins?:   number;
  needed?:                 string;
  ok?:                     boolean;
  provided?:               string;
  who_can_post_general?:   string;
};
