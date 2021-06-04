/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type UsersConversationsResponse = WebAPICallResult & {
  ok?:                boolean;
  channels?:          Channel[];
  response_metadata?: ResponseMetadata;
  error?:             string;
  needed?:            string;
  provided?:          string;
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
  is_private?:                 boolean;
  is_mpim?:                    boolean;
  topic?:                      Purpose;
  purpose?:                    Purpose;
  previous_names?:             string[];
  conversation_host_id?:       string;
  is_moved?:                   number;
  internal_team_ids?:          string[];
  is_global_shared?:           boolean;
  is_org_default?:             boolean;
  is_org_mandatory?:           boolean;
  enterprise_id?:              string;
  last_read?:                  string;
  is_open?:                    boolean;
  priority?:                   number;
  user?:                       string;
  is_user_deleted?:            boolean;
}

export interface Purpose {
  value?:    string;
  creator?:  string;
  last_set?: number;
}

export interface ResponseMetadata {
  next_cursor?: string;
}
