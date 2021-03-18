/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ConversationsArchiveResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
