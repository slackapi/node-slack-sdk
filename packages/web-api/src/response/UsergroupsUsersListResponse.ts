/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type UsergroupsUsersListResponse = WebAPICallResult & {
  ok?:       boolean;
  users?:    string[];
  error?:    string;
  needed?:   string;
  provided?: string;
};
