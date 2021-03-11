/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type TeamAccessLogsResponse = WebAPICallResult & {
  ok?:       boolean;
  logins?:   Login[];
  paging?:   Paging;
  error?:    string;
  needed?:   string;
  provided?: string;
};

export interface Login {
  user_id?:    string;
  username?:   string;
  date_first?: number;
  date_last?:  number;
  count?:      number;
  ip?:         string;
  user_agent?: string;
  isp?:        string;
  country?:    string;
  region?:     string;
}

export interface Paging {
  count?: number;
  total?: number;
  page?:  number;
  pages?: number;
}
