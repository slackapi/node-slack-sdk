/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// !!! DO NOT EDIT THIS FILE !!!                                                       //
//                                                                                     //
// This file is auto-generated by scripts/generate-web-api-types.sh in the repository. //
// Please refer to the script code to learn how to update the source data.             //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

import { WebAPICallResult } from '../../WebClient';
export type OauthV2ExchangeResponse = WebAPICallResult & {
  access_token?:          string;
  app_id?:                string;
  authed_user?:           AuthedUser;
  bot_user_id?:           string;
  enterprise?:            Enterprise;
  error?:                 string;
  expires_in?:            number;
  incoming_webhook?:      IncomingWebhook;
  is_enterprise_install?: boolean;
  needed?:                string;
  ok?:                    boolean;
  provided?:              string;
  refresh_token?:         string;
  response_metadata?:     ResponseMetadata;
  scope?:                 string;
  team?:                  Enterprise;
  token_type?:            string;
  warning?:               string;
};

export interface AuthedUser {
  access_token?:  string;
  expires_in?:    number;
  id?:            string;
  refresh_token?: string;
  scope?:         string;
  token_type?:    string;
}

export interface Enterprise {
  id?:   string;
  name?: string;
}

export interface IncomingWebhook {
  channel?:           string;
  channel_id?:        string;
  configuration_url?: string;
  url?:               string;
}

export interface ResponseMetadata {
  messages?: string[];
}
