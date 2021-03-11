/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ChatDeleteResponse = WebAPICallResult & {
  ok?:       boolean;
  channel?:  string;
  ts?:       string;
  error?:    string;
  needed?:   string;
  provided?: string;
};
