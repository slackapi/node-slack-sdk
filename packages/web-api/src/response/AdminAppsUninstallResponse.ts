/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminAppsUninstallResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
