/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminUsersRemoveResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
