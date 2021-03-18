/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminEmojiAddAliasResponse = WebAPICallResult & {
  ok?:                boolean;
  error?:             string;
  response_metadata?: ResponseMetadata;
  needed?:            string;
  provided?:          string;
};

export interface ResponseMetadata {
  messages?: string[];
}
