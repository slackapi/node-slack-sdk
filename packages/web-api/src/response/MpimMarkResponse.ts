/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type MpimMarkResponse = WebAPICallResult & {
  ok?:                boolean;
  error?:             string;
  warning?:           string;
  response_metadata?: ResponseMetadata;
  needed?:            string;
  provided?:          string;
};

export interface ResponseMetadata {
  messages?: string[];
  warnings?: string[];
}
