/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ChannelsSetTopicResponse = WebAPICallResult & {
  topic?:    string;
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
