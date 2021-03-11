/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminConversationsCreateResponse = WebAPICallResult & {
  ok?:         boolean;
  channel_id?: string;
  error?:      string;
  needed?:     string;
  provided?:   string;
};
