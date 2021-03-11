/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type UsersIdentityResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
