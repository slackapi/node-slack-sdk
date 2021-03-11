/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AuthRevokeResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
