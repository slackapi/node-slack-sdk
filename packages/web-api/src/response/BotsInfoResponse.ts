/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type BotsInfoResponse = WebAPICallResult & {
  ok?:       boolean;
  bot?:      Bot;
  error?:    string;
  needed?:   string;
  provided?: string;
};

export interface Bot {
  id?:      string;
  deleted?: boolean;
  name?:    string;
  updated?: number;
  app_id?:  string;
  user_id?: string;
  icons?:   Icons;
}

export interface Icons {
  image_36?: string;
  image_48?: string;
  image_72?: string;
}
