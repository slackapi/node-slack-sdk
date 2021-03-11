/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminUsersSetExpirationResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
