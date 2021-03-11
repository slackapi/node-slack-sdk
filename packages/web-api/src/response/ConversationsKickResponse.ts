/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ConversationsKickResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
