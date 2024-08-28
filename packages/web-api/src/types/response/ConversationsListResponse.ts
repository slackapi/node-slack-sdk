/* eslint-disable */
/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// !!! DO NOT EDIT THIS FILE !!!                                                       //
//                                                                                     //
// This file is auto-generated by scripts/generate-web-api-types.sh in the repository. //
// Please refer to the script code to learn how to update the source data.             //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

import { WebAPICallResult } from '../../WebClient';
export type ConversationsListResponse = WebAPICallResult & {
  channels?:          Channel[];
  error?:             string;
  needed?:            string;
  ok?:                boolean;
  provided?:          string;
  response_metadata?: ResponseMetadata;
};

export interface Channel {
  context_team_id?:            string;
  conversation_host_id?:       string;
  created?:                    number;
  creator?:                    string;
  id?:                         string;
  internal_team_ids?:          string[];
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
  is_user_deleted?:            boolean;
  name?:                       string;
  name_normalized?:            string;
  num_members?:                number;
  pending_connected_team_ids?: string[];
  pending_shared?:             string[];
  previous_names?:             string[];
  priority?:                   number;
  properties?:                 Properties;
  purpose?:                    Purpose;
  shared_team_ids?:            string[];
  topic?:                      Purpose;
  unlinked?:                   number;
  updated?:                    number;
  user?:                       string;
}

export interface Properties {
  canvas?:                Canvas;
  posting_restricted_to?: RestrictedTo;
  tabs?:                  Tab[];
  threads_restricted_to?: RestrictedTo;
}

export interface Canvas {
  file_id?:        string;
  is_empty?:       boolean;
  quip_thread_id?: string;
}

export interface RestrictedTo {
  type?: string[];
  user?: string[];
}

export interface Tab {
  id?:    string;
  label?: string;
  type?:  string;
}

export interface Purpose {
  creator?:  string;
  last_set?: number;
  value?:    string;
}

export interface ResponseMetadata {
  next_cursor?: string;
}
