/* tslint:disable */
/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// !!! DO NOT EDIT THIS FILE !!!                                                       //
//                                                                                     //
// This file is auto-generated by scripts/generate-web-api-types.sh in the repository. //
// Please refer to the script code to learn how to update the source data.             //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

import { WebAPICallResult } from '../WebClient';
export type AdminAppsApprovedListResponse = WebAPICallResult & {
  ok?:                boolean;
  error?:             string;
  approved_apps?:     ApprovedApp[];
  response_metadata?: ResponseMetadata;
  needed?:            string;
  provided?:          string;
};

export interface ApprovedApp {
  app?:              App;
  scopes?:           Scope[];
  date_updated?:     number;
  last_resolved_by?: LastResolvedBy;
}

export interface App {
  id?:                        string;
  name?:                      string;
  description?:               string;
  help_url?:                  string;
  privacy_policy_url?:        string;
  app_homepage_url?:          string;
  app_directory_url?:         string;
  is_app_directory_approved?: boolean;
  is_internal?:               boolean;
  icons?:                     Icons;
  additional_info?:           string;
}

export interface Icons {
  image_32?:       string;
  image_36?:       string;
  image_48?:       string;
  image_64?:       string;
  image_72?:       string;
  image_96?:       string;
  image_128?:      string;
  image_192?:      string;
  image_512?:      string;
  image_1024?:     string;
  image_original?: string;
}

export interface LastResolvedBy {
  actor_id?:   string;
  actor_type?: string;
}

export interface Scope {
  name?:         string;
  description?:  string;
  is_sensitive?: boolean;
  token_type?:   string;
}

export interface ResponseMetadata {
  next_cursor?: string;
}
