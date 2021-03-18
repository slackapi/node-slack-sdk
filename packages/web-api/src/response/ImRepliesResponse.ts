/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ImRepliesResponse = WebAPICallResult & {
  messages?:          Message[];
  has_more?:          boolean;
  ok?:                boolean;
  warning?:           string;
  response_metadata?: ResponseMetadata;
  error?:             string;
  needed?:            string;
  provided?:          string;
};

export interface Message {
  bot_id?:            string;
  type?:              string;
  text?:              string;
  user?:              string;
  ts?:                string;
  team?:              string;
  bot_profile?:       BotProfile;
  thread_ts?:         string;
  reply_count?:       number;
  reply_users_count?: number;
  latest_reply?:      string;
  reply_users?:       string[];
  subscribed?:        boolean;
  last_read?:         string;
  parent_user_id?:    string;
}

export interface BotProfile {
  id?:      string;
  deleted?: boolean;
  name?:    string;
  updated?: number;
  app_id?:  string;
  icons?:   Icons;
  team_id?: string;
}

export interface Icons {
  image_36?: string;
  image_48?: string;
  image_72?: string;
}

export interface ResponseMetadata {
  messages?: string[];
  warnings?: string[];
}
