/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminConversationsDisconnectSharedResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
