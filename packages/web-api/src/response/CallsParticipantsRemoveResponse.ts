/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type CallsParticipantsRemoveResponse = WebAPICallResult & {
  ok?:       boolean;
  call?:     Call;
  error?:    string;
  needed?:   string;
  provided?: string;
};

export interface Call {
  id?:                   string;
  date_start?:           number;
  external_unique_id?:   string;
  join_url?:             string;
  channels?:             string[];
  external_display_id?:  string;
  title?:                string;
  desktop_app_join_url?: string;
  users?:                User[];
}

export interface User {
  external_id?:  string;
  avatar_url?:   string;
  display_name?: string;
  slack_id?:     string;
}
