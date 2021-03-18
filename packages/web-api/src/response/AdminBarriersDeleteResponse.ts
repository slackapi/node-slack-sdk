/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminBarriersDeleteResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
