/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminTeamsAdminsListResponse = WebAPICallResult & {
  ok?:                boolean;
  admin_ids?:         string[];
  response_metadata?: ResponseMetadata;
  error?:             string;
  needed?:            string;
  provided?:          string;
};

export interface ResponseMetadata {
  next_cursor?: string;
}
