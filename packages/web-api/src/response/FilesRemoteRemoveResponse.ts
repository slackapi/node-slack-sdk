/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type FilesRemoteRemoveResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
