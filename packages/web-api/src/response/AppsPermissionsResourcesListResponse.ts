/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AppsPermissionsResourcesListResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
