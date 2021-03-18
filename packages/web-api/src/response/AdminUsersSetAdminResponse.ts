/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminUsersSetAdminResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
