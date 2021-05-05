/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type UsersInfoResponse = WebAPICallResult & {
  ok?:       boolean;
  user?:     User;
  error?:    string;
  needed?:   string;
  provided?: string;
};

export interface User {
  id?:                  string;
  team_id?:             string;
  name?:                string;
  deleted?:             boolean;
  color?:               string;
  real_name?:           string;
  tz?:                  string;
  tz_label?:            string;
  tz_offset?:           number;
  profile?:             Profile;
  is_admin?:            boolean;
  is_owner?:            boolean;
  is_primary_owner?:    boolean;
  is_restricted?:       boolean;
  is_ultra_restricted?: boolean;
  is_bot?:              boolean;
  is_app_user?:         boolean;
  updated?:             number;
  locale?:              string;
  has_2fa?:             boolean;
  is_email_confirmed?:  boolean;
  enterprise_user?:     EnterpriseUser;
}

export interface EnterpriseUser {
  id?:              string;
  enterprise_id?:   string;
  enterprise_name?: string;
  is_admin?:        boolean;
  is_owner?:        boolean;
  teams?:           string[];
}

export interface Profile {
  title?:                   string;
  phone?:                   string;
  skype?:                   string;
  real_name?:               string;
  real_name_normalized?:    string;
  display_name?:            string;
  display_name_normalized?: string;
  status_text?:             string;
  status_emoji?:            string;
  status_expiration?:       number;
  avatar_hash?:             string;
  api_app_id?:              string;
  always_active?:           boolean;
  bot_id?:                  string;
  image_24?:                string;
  image_32?:                string;
  image_48?:                string;
  image_72?:                string;
  image_192?:               string;
  image_512?:               string;
  status_text_canonical?:   string;
  team?:                    string;
  image_original?:          string;
  is_custom_image?:         boolean;
  email?:                   string;
  first_name?:              string;
  last_name?:               string;
  image_1024?:              string;
}
