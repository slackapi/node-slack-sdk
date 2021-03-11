/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminTeamsCreateResponse = WebAPICallResult & {
  ok?:                boolean;
  error?:             string;
  response_metadata?: ResponseMetadata;
  team?:              string;
  needed?:            string;
  provided?:          string;
};

export interface ResponseMetadata {
  messages?: string[];
}
