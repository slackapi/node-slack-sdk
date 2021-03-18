/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminInviteRequestsDenyResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
