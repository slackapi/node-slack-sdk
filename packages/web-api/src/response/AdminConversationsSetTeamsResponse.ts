/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminConversationsSetTeamsResponse = WebAPICallResult & {
  ok?:       boolean;
  channel?:  string;
  error?:    string;
  needed?:   string;
  provided?: string;
};
