/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminConversationsInviteResponse = WebAPICallResult & {
  ok?:              boolean;
  error?:           string;
  failed_user_ids?: FailedUserids;
  needed?:          string;
  provided?:        string;
};

export interface FailedUserids {
  U00000000?: string;
  U00000001?: string;
}
