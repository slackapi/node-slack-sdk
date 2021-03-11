/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminAppsClearResolutionResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
