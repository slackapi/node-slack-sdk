/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminInviteRequestsDeniedListResponse = WebAPICallResult & {
  ok?:              boolean;
  denied_requests?: string[];
  error?:           string;
  needed?:          string;
  provided?:        string;
};
