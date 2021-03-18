/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type FilesCommentsDeleteResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
