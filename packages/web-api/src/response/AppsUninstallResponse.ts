/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AppsUninstallResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
