/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminUsersSessionClearSettingsResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
