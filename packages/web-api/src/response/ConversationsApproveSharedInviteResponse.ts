/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ConversationsApproveSharedInviteResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
