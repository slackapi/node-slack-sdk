/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ConversationsMembersResponse = WebAPICallResult & {
  ok?:                boolean;
  members?:           string[];
  response_metadata?: ResponseMetadata;
  error?:             string;
  needed?:            string;
  provided?:          string;
};

export interface ResponseMetadata {
  next_cursor?: string;
}
