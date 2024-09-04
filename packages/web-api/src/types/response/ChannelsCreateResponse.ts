/* eslint-disable */
/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// !!! DO NOT EDIT THIS FILE !!!                                                       //
//                                                                                     //
// This file is auto-generated by scripts/generate-web-api-types.sh in the repository. //
// Please refer to the script code to learn how to update the source data.             //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

import type { WebAPICallResult } from '../../WebClient';
export type ChannelsCreateResponse = WebAPICallResult & {
  channel?: Channel;
  error?: string;
  needed?: string;
  ok?: boolean;
  provided?: string;
};

export interface Channel {
  created?: number;
  creator?: string;
  id?: string;
  is_archived?: boolean;
  is_channel?: boolean;
  is_general?: boolean;
  is_member?: boolean;
  is_mpim?: boolean;
  is_org_shared?: boolean;
  is_private?: boolean;
  is_shared?: boolean;
  last_read?: string;
  members?: string[];
  name?: string;
  name_normalized?: string;
  previous_names?: string[];
  priority?: number;
  purpose?: Purpose;
  topic?: Purpose;
  unlinked?: number;
  unread_count?: number;
  unread_count_display?: number;
}

export interface Purpose {
  creator?: string;
  last_set?: number;
  value?: string;
}
