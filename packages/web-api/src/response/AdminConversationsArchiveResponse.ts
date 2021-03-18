/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminConversationsArchiveResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
