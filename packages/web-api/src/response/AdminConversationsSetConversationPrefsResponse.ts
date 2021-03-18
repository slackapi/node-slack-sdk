/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminConversationsSetConversationPrefsResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
