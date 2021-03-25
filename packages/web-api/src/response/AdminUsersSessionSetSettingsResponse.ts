/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminUsersSessionSetSettingsResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
