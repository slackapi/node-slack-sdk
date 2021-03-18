/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AppsPermissionsInfoResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
