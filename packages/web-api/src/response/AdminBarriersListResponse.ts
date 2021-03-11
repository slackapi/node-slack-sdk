/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminBarriersListResponse = WebAPICallResult & {
  ok?:       boolean;
  barriers?: Barrier[];
  error?:    string;
  needed?:   string;
  provided?: string;
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
