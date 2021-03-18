/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ChatMeMessageResponse = WebAPICallResult & {
  channel?:  string;
  ts?:       string;
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
