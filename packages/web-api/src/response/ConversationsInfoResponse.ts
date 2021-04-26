/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ConversationsInfoResponse = WebAPICallResult & {
  ok?:       boolean;
  channel?:  Channel;
  error?:    string;
  needed?:   string;
  provided?: string;
};

export interface Channel {
  id?:                         string;
  name?:                       string;
  is_channel?:                 boolean;
  is_group?:                   boolean;
  is_im?:                      boolean;
  created?:                    number;
  is_archived?:                boolean;
  is_general?:                 boolean;
  unlinked?:                   number;
  name_normalized?:            string;
  is_shared?:                  boolean;
  creator?:                    string;
  is_ext_shared?:              boolean;
  is_org_shared?:              boolean;
  shared_team_ids?:            string[];
  pending_shared?:             string[];
  pending_connected_team_ids?: string[];
  is_pending_ext_shared?:      boolean;
  is_member?:                  boolean;
  is_private?:                 boolean;
  is_mpim?:                    boolean;
  last_read?:                  string;
  topic?:                      Purpose;
  purpose?:                    Purpose;
  previous_names?:             string[];
  locale?:                     string;
  num_members?:                number;
  is_read_only?:               boolean;
  is_thread_only?:             boolean;
  is_non_threadable?:          boolean;
  internal_team_ids?:          string[];
  connected_team_ids?:         string[];
  conversation_host_id?:       string;
  is_moved?:                   number;
  is_global_shared?:           boolean;
  is_org_default?:             boolean;
  is_org_mandatory?:           boolean;
  connected_limited_team_ids?: string[];
}

export interface Purpose {
  value?:    string;
  creator?:  string;
  last_set?: number;
}
