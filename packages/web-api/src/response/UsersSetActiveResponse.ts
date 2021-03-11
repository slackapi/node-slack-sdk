/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type UsersSetActiveResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
