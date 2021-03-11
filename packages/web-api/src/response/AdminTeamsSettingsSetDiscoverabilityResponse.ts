/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminTeamsSettingsSetDiscoverabilityResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
