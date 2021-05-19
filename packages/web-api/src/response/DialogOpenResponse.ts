/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type DialogOpenResponse = WebAPICallResult & {
  ok?:                boolean;
  warning?:           string;
  error?:             string;
  needed?:            string;
  provided?:          string;
  response_metadata?: ResponseMetadata;
};

export interface ResponseMetadata {
  messages?: string[];
}
