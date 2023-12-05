/* eslint-disable */
/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// !!! DO NOT EDIT THIS FILE !!!                                                       //
//                                                                                     //
// This file is auto-generated by scripts/generate-web-api-types.sh in the repository. //
// Please refer to the script code to learn how to update the source data.             //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

import { WebAPICallResult } from '../WebClient';
export type AuthTestResponse = WebAPICallResult & {
  app_id?:                string;
  app_name?:              string;
  bot_id?:                string;
  enterprise_id?:         string;
  error?:                 string;
  expires_in?:            number;
  is_enterprise_install?: boolean;
  needed?:                string;
  ok?:                    boolean;
  provided?:              string;
  team?:                  string;
  team_id?:               string;
  url?:                   string;
  user?:                  string;
  user_id?:               string;
};
