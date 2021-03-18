/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminInviteRequestsApprovedListResponse = WebAPICallResult & {
  ok?:                boolean;
  approved_requests?: string[];
  error?:             string;
  needed?:            string;
  provided?:          string;
};
