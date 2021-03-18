/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type TeamIntegrationLogsResponse = WebAPICallResult & {
  ok?:       boolean;
  logs?:     Log[];
  paging?:   Paging;
  error?:    string;
  needed?:   string;
  provided?: string;
};

export interface Log {
  user_id?:              string;
  user_name?:            string;
  date?:                 string;
  change_type?:          string;
  app_type?:             string;
  app_id?:               string;
  scope?:                string;
  rss_feed?:             boolean;
  rss_feed_change_type?: string;
  rss_feed_title?:       string;
  rss_feed_url?:         string;
  service_id?:           number;
  service_type?:         string;
  channel?:              string;
  reason?:               string;
  resolution?:           string;
}

export interface Paging {
  count?: number;
  total?: number;
  page?:  number;
  pages?: number;
}
