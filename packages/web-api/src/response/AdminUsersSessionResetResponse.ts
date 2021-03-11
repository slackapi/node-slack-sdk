/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminUsersSessionResetResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
