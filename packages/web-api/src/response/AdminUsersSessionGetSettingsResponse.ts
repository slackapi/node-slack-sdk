/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminUsersSessionGetSettingsResponse = WebAPICallResult & {
  ok?:                  boolean;
  session_settings?:    SessionSetting[];
  no_settings_applied?: string[];
  error?:               string;
  needed?:              string;
  provided?:            string;
};

export interface SessionSetting {
  user_id?:                  string;
  desktop_app_browser_quit?: boolean;
  duration?:                 number;
}
