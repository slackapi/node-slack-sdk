/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type GroupsKickResponse = WebAPICallResult & {
  ok?:                boolean;
  warning?:           string;
  response_metadata?: ResponseMetadata;
  error?:             string;
  needed?:            string;
  provided?:          string;
};

export interface ResponseMetadata {
  messages?: string[];
  warnings?: string[];
}
