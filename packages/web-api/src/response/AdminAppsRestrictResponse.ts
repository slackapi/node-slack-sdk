/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminAppsRestrictResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
