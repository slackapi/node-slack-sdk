/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ConversationsCloseResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
