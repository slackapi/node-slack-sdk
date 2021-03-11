/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AppsPermissionsUsersRequestResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
