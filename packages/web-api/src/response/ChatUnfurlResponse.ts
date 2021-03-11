/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ChatUnfurlResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
