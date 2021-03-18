/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type PinsAddResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
