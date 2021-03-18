/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type StarsAddResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
