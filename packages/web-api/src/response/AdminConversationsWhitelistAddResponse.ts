/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminConversationsWhitelistAddResponse = WebAPICallResult & {
  ok?:                boolean;
  error?:             string;
  response_metadata?: ResponseMetadata;
  warning?:           string;
  needed?:            string;
  provided?:          string;
};

export interface ResponseMetadata {
  messages?: string[];
  warnings?: string[];
}
