/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ChannelsSetPurposeResponse = WebAPICallResult & {
  ok?:       boolean;
  purpose?:  string;
  error?:    string;
  needed?:   string;
  provided?: string;
};
