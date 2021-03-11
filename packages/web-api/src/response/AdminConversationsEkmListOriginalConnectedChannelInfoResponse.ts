/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminConversationsEkmListOriginalConnectedChannelInfoResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
