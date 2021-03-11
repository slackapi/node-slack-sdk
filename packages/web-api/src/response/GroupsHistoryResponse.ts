/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type GroupsHistoryResponse = WebAPICallResult & {
  ok?:                    boolean;
  messages?:              Message[];
  has_more?:              boolean;
  channel_actions_count?: number;
  warning?:               string;
  response_metadata?:     ResponseMetadata;
  error?:                 string;
  needed?:                string;
  provided?:              string;
};

export interface Message {
  type?:    string;
  subtype?: string;
  ts?:      string;
  user?:    string;
  text?:    string;
}

export interface ResponseMetadata {
  messages?: string[];
  warnings?: string[];
}
