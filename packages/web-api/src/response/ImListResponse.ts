/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ImListResponse = WebAPICallResult & {
  ok?:                boolean;
  ims?:               Im[];
  warning?:           string;
  response_metadata?: ResponseMetadata;
  error?:             string;
  needed?:            string;
  provided?:          string;
};

export interface Im {
  id?:              string;
  created?:         number;
  is_archived?:     boolean;
  is_im?:           boolean;
  is_org_shared?:   boolean;
  user?:            string;
  is_user_deleted?: boolean;
  priority?:        number;
}

export interface ResponseMetadata {
  next_cursor?: string;
  messages?:    string[];
  warnings?:    string[];
}
