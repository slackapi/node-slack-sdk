/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// !!! DO NOT EDIT THIS FILE !!!                                                       //
//                                                                                     //
// This file is auto-generated by scripts/generate-web-api-types.sh in the repository. //
// Please refer to the script code to learn how to update the source data.             //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

import { WebAPICallResult } from '../../WebClient';
export type UsergroupsListResponse = WebAPICallResult & {
  error?:      string;
  needed?:     string;
  ok?:         boolean;
  provided?:   string;
  usergroups?: Usergroup[];
};

export interface Usergroup {
  auto_provision?:        boolean;
  channel_count?:         number;
  created_by?:            string;
  date_create?:           number;
  date_delete?:           number;
  date_update?:           number;
  description?:           string;
  enterprise_subteam_id?: string;
  handle?:                string;
  id?:                    string;
  is_external?:           boolean;
  is_subteam?:            boolean;
  is_usergroup?:          boolean;
  name?:                  string;
  prefs?:                 Prefs;
  team_id?:               string;
  updated_by?:            string;
  user_count?:            number;
  users?:                 string[];
}

export interface Prefs {
  channels?: string[];
  groups?:   string[];
}
