/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ChatGetPermalinkResponse = WebAPICallResult & {
  ok?:        boolean;
  permalink?: string;
  channel?:   string;
  error?:     string;
  needed?:    string;
  provided?:  string;
};
