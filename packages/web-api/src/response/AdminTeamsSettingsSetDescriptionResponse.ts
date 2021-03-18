/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminTeamsSettingsSetDescriptionResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
