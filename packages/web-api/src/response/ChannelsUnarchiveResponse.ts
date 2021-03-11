/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ChannelsUnarchiveResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
