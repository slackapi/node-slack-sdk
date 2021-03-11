/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type DialogOpenResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
