/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminConversationsUnarchiveResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
