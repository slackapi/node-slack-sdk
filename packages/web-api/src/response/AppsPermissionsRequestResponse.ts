/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AppsPermissionsRequestResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
