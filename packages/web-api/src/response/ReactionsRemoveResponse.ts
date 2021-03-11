/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ReactionsRemoveResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
