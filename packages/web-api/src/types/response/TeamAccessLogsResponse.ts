/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// !!! DO NOT EDIT THIS FILE !!!                                                       //
//                                                                                     //
// This file is auto-generated by scripts/generate-web-api-types.sh in the repository. //
// Please refer to the script code to learn how to update the source data.             //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

import { WebAPICallResult } from '../../WebClient';
export type TeamAccessLogsResponse = WebAPICallResult & {
  error?:             string;
  logins?:            Login[];
  needed?:            string;
  ok?:                boolean;
  paging?:            Paging;
  provided?:          string;
  response_metadata?: ResponseMetadata;
};

export interface Login {
  count?:      number;
  country?:    string;
  date_first?: number;
  date_last?:  number;
  ip?:         string;
  isp?:        string;
  region?:     string;
  user_agent?: string;
  user_id?:    string;
  username?:   string;
}

export interface Paging {
  count?: number;
  page?:  number;
  pages?: number;
  total?: number;
}

export interface ResponseMetadata {
  next_cursor?: string;
}
