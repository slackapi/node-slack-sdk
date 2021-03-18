/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type RemindersCompleteResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
