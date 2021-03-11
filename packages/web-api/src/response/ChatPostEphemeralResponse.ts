/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ChatPostEphemeralResponse = WebAPICallResult & {
  ok?:         boolean;
  message_ts?: string;
  error?:      string;
  needed?:     string;
  provided?:   string;
};
