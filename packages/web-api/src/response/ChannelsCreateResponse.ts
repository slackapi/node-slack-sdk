/* tslint:disable */
/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// !!! DO NOT EDIT THIS FILE !!!                                                       //
//                                                                                     //
// This file is auto-generated by scripts/generate-web-api-types.sh in the repository. //
// Please refer to the script code to learn how to update the soruce data.             //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

import { WebAPICallResult } from '../WebClient';
export type ChannelsCreateResponse = WebAPICallResult & {
  ok?:       boolean;
  channel?:  Channel;
  error?:    string;
  needed?:   string;
  provided?: string;
};

export interface Channel {
  id?:                   string;
  name?:                 string;
  is_channel?:           boolean;
  created?:              number;
  is_archived?:          boolean;
  is_general?:           boolean;
  unlinked?:             number;
  creator?:              string;
  name_normalized?:      string;
  is_shared?:            boolean;
  is_org_shared?:        boolean;
  is_member?:            boolean;
  is_private?:           boolean;
  is_mpim?:              boolean;
  last_read?:            string;
  unread_count?:         number;
  unread_count_display?: number;
  members?:              string[];
  topic?:                Purpose;
  purpose?:              Purpose;
  previous_names?:       string[];
  priority?:             number;
}

export interface Purpose {
  value?:    string;
  creator?:  string;
  last_set?: number;
}
