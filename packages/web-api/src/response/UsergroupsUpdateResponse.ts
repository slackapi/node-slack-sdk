/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type UsergroupsUpdateResponse = WebAPICallResult & {
  ok?:        boolean;
  usergroup?: Usergroup;
  error?:     string;
  needed?:    string;
  provided?:  string;
};

export interface Usergroup {
  id?:                    string;
  team_id?:               string;
  is_usergroup?:          boolean;
  is_subteam?:            boolean;
  name?:                  string;
  description?:           string;
  handle?:                string;
  is_external?:           boolean;
  date_create?:           number;
  date_update?:           number;
  date_delete?:           number;
  auto_provision?:        boolean;
  enterprise_subteam_id?: string;
  created_by?:            string;
  updated_by?:            string;
  prefs?:                 Prefs;
  channel_count?:         number;
  users?:                 string[];
}

export interface Prefs {
  channels?: string[];
  groups?:   string[];
}
