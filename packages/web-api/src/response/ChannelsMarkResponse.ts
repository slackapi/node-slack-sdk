/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ChannelsMarkResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
