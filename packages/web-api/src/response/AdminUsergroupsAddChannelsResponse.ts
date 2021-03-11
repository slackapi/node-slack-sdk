/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminUsergroupsAddChannelsResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
