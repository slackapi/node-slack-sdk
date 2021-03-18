/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type StarsRemoveResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
