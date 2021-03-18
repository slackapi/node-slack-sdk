/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminTeamsSettingsSetNameResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
