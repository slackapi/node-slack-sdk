/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ChatDeleteScheduledMessageResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
