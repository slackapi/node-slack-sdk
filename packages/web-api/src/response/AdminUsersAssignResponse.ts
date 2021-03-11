/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminUsersAssignResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
