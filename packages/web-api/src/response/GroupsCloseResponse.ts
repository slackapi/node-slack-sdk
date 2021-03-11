/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type GroupsCloseResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
