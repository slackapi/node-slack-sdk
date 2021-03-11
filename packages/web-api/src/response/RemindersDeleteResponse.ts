/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type RemindersDeleteResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
