/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminTeamsOwnersListResponse = WebAPICallResult & {
  ok?:                boolean;
  owner_ids?:         string[];
  response_metadata?: ResponseMetadata;
  error?:             string;
  needed?:            string;
  provided?:          string;
};

export interface ResponseMetadata {
  next_cursor?: string;
}
