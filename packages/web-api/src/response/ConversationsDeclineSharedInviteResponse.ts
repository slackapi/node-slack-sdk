/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ConversationsDeclineSharedInviteResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
