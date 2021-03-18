/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ReactionsAddResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
