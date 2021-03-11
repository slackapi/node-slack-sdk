/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminUsersSetRegularResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
