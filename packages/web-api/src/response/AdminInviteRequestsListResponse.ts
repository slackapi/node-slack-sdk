/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminInviteRequestsListResponse = WebAPICallResult & {
  ok?:              boolean;
  invite_requests?: string[];
  error?:           string;
  needed?:          string;
  provided?:        string;
};
