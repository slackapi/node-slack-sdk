/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ConversationsMarkResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
