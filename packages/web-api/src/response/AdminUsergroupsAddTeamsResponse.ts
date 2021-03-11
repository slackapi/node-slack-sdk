/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminUsergroupsAddTeamsResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
