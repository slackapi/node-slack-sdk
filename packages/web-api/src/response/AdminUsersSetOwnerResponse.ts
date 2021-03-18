/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminUsersSetOwnerResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
