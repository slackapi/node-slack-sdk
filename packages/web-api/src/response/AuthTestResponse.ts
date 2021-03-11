/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AuthTestResponse = WebAPICallResult & {
  ok?:                    boolean;
  url?:                   string;
  team?:                  string;
  user?:                  string;
  team_id?:               string;
  user_id?:               string;
  bot_id?:                string;
  enterprise_id?:         string;
  error?:                 string;
  app_name?:              string;
  app_id?:                string;
  is_enterprise_install?: boolean;
  needed?:                string;
  provided?:              string;
};
