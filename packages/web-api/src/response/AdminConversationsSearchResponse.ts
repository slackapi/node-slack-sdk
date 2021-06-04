/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminConversationsSearchResponse = WebAPICallResult & {
  ok?:            boolean;
  conversations?: Conversation[];
  next_cursor?:   string;
  error?:         string;
  needed?:        string;
  provided?:      string;
};

export interface Conversation {
  id?:                            string;
  name?:                          string;
  purpose?:                       string;
  member_count?:                  number;
  created?:                       number;
  creator_id?:                    string;
  is_private?:                    boolean;
  is_archived?:                   boolean;
  is_general?:                    boolean;
  last_activity_ts?:              number;
  is_ext_shared?:                 boolean;
  is_global_shared?:              boolean;
  is_org_default?:                boolean;
  is_org_mandatory?:              boolean;
  is_org_shared?:                 boolean;
  is_frozen?:                     boolean;
  internal_team_ids_count?:       number;
  internal_team_ids_sample_team?: string;
  pending_connected_team_ids?:    string[];
  is_pending_ext_shared?:         boolean;
  connected_team_ids?:            string[];
  conversation_host_id?:          string;
  channel_email_addresses?:       string[];
  connected_limited_team_ids?:    string[];
}
