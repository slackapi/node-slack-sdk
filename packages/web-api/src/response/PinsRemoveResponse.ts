/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type PinsRemoveResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
