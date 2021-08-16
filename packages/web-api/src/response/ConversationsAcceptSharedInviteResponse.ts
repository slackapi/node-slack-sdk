/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ConversationsAcceptSharedInviteResponse = WebAPICallResult & {
  ok?:                boolean;
  error?:             string;
  implicit_approval?: boolean;
  channel_id?:        string;
  invite_id?:         string;
  needed?:            string;
  provided?:          string;
};
