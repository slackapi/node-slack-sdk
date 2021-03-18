/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AppsConnectionsOpenResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
  url?:      string;
};
