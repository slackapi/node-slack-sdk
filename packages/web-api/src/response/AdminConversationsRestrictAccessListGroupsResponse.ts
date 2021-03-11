/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminConversationsRestrictAccessListGroupsResponse = WebAPICallResult & {
  ok?:                boolean;
  group_ids?:         string[];
  error?:             string;
  response_metadata?: ResponseMetadata;
  needed?:            string;
  provided?:          string;
};

export interface ResponseMetadata {
  messages?: string[];
}
