/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type OauthTokenResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
