/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// !!! DO NOT EDIT THIS FILE !!!                                                       //
//                                                                                     //
// This file is auto-generated by scripts/generate-web-api-types.sh in the repository. //
// Please refer to the script code to learn how to update the source data.             //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

import { WebAPICallResult } from '../../WebClient';
export type AdminAppsActivitiesListResponse = WebAPICallResult & {
  activities?:        Activity[];
  error?:             string;
  needed?:            string;
  ok?:                boolean;
  provided?:          string;
  response_metadata?: ResponseMetadata;
};

export interface Activity {
  app_id?:         string;
  component_id?:   string;
  component_type?: string;
  created?:        number;
  enterprise_id?:  string;
  event_type?:     string;
  level?:          string;
  payload?:        Payload;
  source?:         string;
  team_id?:        string;
  trace_id?:       string;
}

export interface Payload {
  action?:                string;
  actor?:                 string;
  billing_reason?:        string[];
  bot_user_id?:           string;
  bundle_size_kb?:        number;
  channel_id?:            string;
  current_step?:          number;
  datastore_name?:        string;
  details?:               string;
  error?:                 string;
  exec_outcome?:          string;
  function_execution_id?: string;
  function_id?:           string;
  function_name?:         string;
  function_type?:         string;
  inputs?:                Inputs;
  is_billing_excluded?:   boolean;
  log?:                   string;
  request_type?:          string;
  team_id?:               string;
  total_steps?:           number;
  trigger?:               Trigger;
  type?:                  string;
  user_id?:               string;
  workflow_name?:         string;
}

export interface Inputs {
}

export interface Trigger {
  config?:           Config;
  id?:               string;
  trip_information?: TripInformation;
  type?:             string;
}

export interface Config {
  description?: string;
  event_type?:  string;
  name?:        string;
  schema?:      Inputs;
}

export interface TripInformation {
  channel_id?: string;
  list_id?:    string;
  message_ts?: string;
  reaction?:   string;
  user_id?:    string;
}

export interface ResponseMetadata {
  next_cursor?: string;
}
