/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminConversationsRenameResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
