/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminUsergroupsRemoveChannelsResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
