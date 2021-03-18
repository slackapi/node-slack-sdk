/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminBarriersUpdateResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  barrier?:  Barrier;
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
