/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// !!! DO NOT EDIT THIS FILE !!!                                                       //
//                                                                                     //
// This file is auto-generated by scripts/generate-web-api-types.sh in the repository. //
// Please refer to the script code to learn how to update the source data.             //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

import { WebAPICallResult } from '../../WebClient';
export type GroupsRenameResponse = WebAPICallResult & {
  channel?:           Channel;
  error?:             string;
  needed?:            string;
  ok?:                boolean;
  provided?:          string;
  response_metadata?: ResponseMetadata;
  warning?:           string;
};

export interface Channel {
  created?:         number;
  creator?:         string;
  id?:              string;
  is_archived?:     boolean;
  is_group?:        boolean;
  is_mpim?:         boolean;
  members?:         string[];
  name?:            string;
  name_normalized?: string;
  purpose?:         Purpose;
  topic?:           Purpose;
}

export interface Purpose {
  creator?:  string;
  last_set?: number;
  value?:    string;
}

export interface ResponseMetadata {
  messages?: string[];
  warnings?: string[];
}
