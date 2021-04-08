/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminUsersListResponse = WebAPICallResult & {
  ok?:                boolean;
  users?:             User[];
  response_metadata?: ResponseMetadata;
  error?:             string;
  needed?:            string;
  provided?:          string;
};

export interface ResponseMetadata {
  next_cursor?: string;
  messages?:    string[];
}

export interface User {
  id?:                  string;
  email?:               string;
  is_admin?:            boolean;
  is_owner?:            boolean;
  is_primary_owner?:    boolean;
  is_restricted?:       boolean;
  is_ultra_restricted?: boolean;
  is_bot?:              boolean;
  expiration_ts?:       number;
}
