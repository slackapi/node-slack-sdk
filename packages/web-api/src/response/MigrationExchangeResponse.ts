/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type MigrationExchangeResponse = WebAPICallResult & {
  ok?:               boolean;
  error?:            string;
  team_id?:          string;
  enterprise_id?:    string;
  user_id_map?:      UseridMap;
  invalid_user_ids?: string[];
};

export interface UseridMap {
  U06UBSUN5?: string;
  U06UEB62U?: string;
  U06UBSVB3?: string;
  U06UBSVDX?: string;
  W06UAZ65Q?: string;
}
