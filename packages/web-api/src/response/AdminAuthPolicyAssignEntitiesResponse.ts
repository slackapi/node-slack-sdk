/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminAuthPolicyAssignEntitiesResponse = WebAPICallResult & {
  ok?:                 boolean;
  entity_total_count?: number;
  error?:              string;
  needed?:             string;
  provided?:           string;
};
