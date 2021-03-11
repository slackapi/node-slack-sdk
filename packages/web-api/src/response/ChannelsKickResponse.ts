/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ChannelsKickResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
