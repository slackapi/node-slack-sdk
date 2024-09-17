/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// !!! DO NOT EDIT THIS FILE !!!                                                       //
//                                                                                     //
// This file is auto-generated by scripts/generate-web-api-types.sh in the repository. //
// Please refer to the script code to learn how to update the source data.             //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

import { WebAPICallResult } from '../../WebClient';
export type GroupsHistoryResponse = WebAPICallResult & {
  channel_actions_count?: number;
  error?:                 string;
  has_more?:              boolean;
  messages?:              Message[];
  needed?:                string;
  ok?:                    boolean;
  provided?:              string;
  response_metadata?:     ResponseMetadata;
  warning?:               string;
};

export interface Message {
  subtype?: string;
  text?:    string;
  ts?:      string;
  type?:    string;
  user?:    string;
}

export interface ResponseMetadata {
  messages?: string[];
  warnings?: string[];
}
