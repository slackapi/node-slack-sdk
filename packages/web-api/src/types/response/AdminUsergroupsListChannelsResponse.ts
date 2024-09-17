/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// !!! DO NOT EDIT THIS FILE !!!                                                       //
//                                                                                     //
// This file is auto-generated by scripts/generate-web-api-types.sh in the repository. //
// Please refer to the script code to learn how to update the source data.             //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

import { WebAPICallResult } from '../../WebClient';
export type AdminUsergroupsListChannelsResponse = WebAPICallResult & {
  channels?: Channel[];
  error?:    string;
  needed?:   string;
  ok?:       boolean;
  provided?: string;
};

export interface Channel {
  context_team_id?:            string;
  created?:                    number;
  creator?:                    string;
  date_connected?:             number;
  enterprise_id?:              string;
  id?:                         string;
  is_archived?:                boolean;
  is_channel?:                 boolean;
  is_ext_shared?:              boolean;
  is_general?:                 boolean;
  is_global_shared?:           boolean;
  is_group?:                   boolean;
  is_im?:                      boolean;
  is_member?:                  boolean;
  is_moved?:                   number;
  is_mpim?:                    boolean;
  is_org_default?:             boolean;
  is_org_mandatory?:           boolean;
  is_org_shared?:              boolean;
  is_pending_ext_shared?:      boolean;
  is_private?:                 boolean;
  is_shared?:                  boolean;
  name?:                       string;
  name_normalized?:            string;
  pending_connected_team_ids?: string[];
  pending_shared?:             string[];
  previous_names?:             string[];
  properties?:                 Properties;
  purpose?:                    Purpose;
  topic?:                      Purpose;
  unlinked?:                   number;
  updated?:                    number;
}

export interface Properties {
  posting_restricted_to?: RestrictedTo;
  threads_restricted_to?: RestrictedTo;
}

export interface RestrictedTo {
  type?: string[];
}

export interface Purpose {
  creator?:  string;
  last_set?: number;
  value?:    string;
}
