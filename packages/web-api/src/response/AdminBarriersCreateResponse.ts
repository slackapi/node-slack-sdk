/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminBarriersCreateResponse = WebAPICallResult & {
  ok?:                boolean;
  error?:             string;
  needed?:            string;
  provided?:          string;
  response_metadata?: ResponseMetadata;
  barrier?:           Barrier;
};

export interface Barrier {
  id?:                        string;
  enterprise_id?:             string;
  primary_usergroup?:         Usergroup;
  barriered_from_usergroups?: Usergroup[];
  restricted_subjects?:       string[];
  date_update?:               number;
}

export interface Usergroup {
  id?:   string;
  name?: string;
}

export interface ResponseMetadata {
  messages?: string[];
}
