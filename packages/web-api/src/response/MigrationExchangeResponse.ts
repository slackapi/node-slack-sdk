/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type MigrationExchangeResponse = WebAPICallResult & {
  ok?:               boolean;
  warning?:          string;
  error?:            string;
  needed?:           string;
  provided?:         string;
  team_id?:          string;
  enterprise_id?:    string;
  invalid_user_ids?: string[];
  user_id_map?:      UseridMap;
};

export interface UseridMap {
}
