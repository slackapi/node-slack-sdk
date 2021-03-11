/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ConversationsLeaveResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
