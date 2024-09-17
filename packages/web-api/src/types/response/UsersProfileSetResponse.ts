/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// !!! DO NOT EDIT THIS FILE !!!                                                       //
//                                                                                     //
// This file is auto-generated by scripts/generate-web-api-types.sh in the repository. //
// Please refer to the script code to learn how to update the source data.             //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

import { WebAPICallResult } from '../../WebClient';
export type UsersProfileSetResponse = WebAPICallResult & {
  error?:    string;
  needed?:   string;
  ok?:       boolean;
  profile?:  Profile;
  provided?: string;
  username?: string;
};

export interface Profile {
  avatar_hash?:                string;
  display_name?:               string;
  display_name_normalized?:    string;
  email?:                      string;
  fields?:                     { [key: string]: Field };
  first_name?:                 string;
  huddle_state?:               string;
  huddle_state_expiration_ts?: number;
  image_1024?:                 string;
  image_192?:                  string;
  image_24?:                   string;
  image_32?:                   string;
  image_48?:                   string;
  image_512?:                  string;
  image_72?:                   string;
  image_original?:             string;
  is_custom_image?:            boolean;
  last_name?:                  string;
  phone?:                      string;
  pronouns?:                   string;
  real_name?:                  string;
  real_name_normalized?:       string;
  skype?:                      string;
  status_emoji?:               string;
  status_emoji_display_info?:  StatusEmojiDisplayInfo[];
  status_emoji_url?:           string;
  status_expiration?:          number;
  status_text?:                string;
  status_text_canonical?:      string;
  title?:                      string;
}

export interface Field {
  alt?:   string;
  value?: string;
}

export interface StatusEmojiDisplayInfo {
  display_alias?: string;
  display_url?:   string;
  emoji_name?:    string;
  unicode?:       string;
}
