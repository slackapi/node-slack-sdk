/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type GroupsOpenResponse = WebAPICallResult & {
  ok?:                boolean;
  no_op?:             boolean;
  already_open?:      boolean;
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
