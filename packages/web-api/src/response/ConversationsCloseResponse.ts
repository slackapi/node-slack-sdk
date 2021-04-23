/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ConversationsCloseResponse = WebAPICallResult & {
  ok?:             boolean;
  already_closed?: boolean;
  no_op?:          boolean;
  error?:          string;
  needed?:         string;
  provided?:       string;
};
