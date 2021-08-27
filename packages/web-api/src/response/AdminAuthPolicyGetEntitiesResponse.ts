/* tslint:disable */
/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// !!! DO NOT EDIT THIS FILE !!!                                                       //
//                                                                                     //
// This file is auto-generated by scripts/generate-web-api-types.sh in the repository. //
// Please refer to the script code to learn how to update the soruce data.             //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

import { WebAPICallResult } from '../WebClient';
export type AdminAuthPolicyGetEntitiesResponse = WebAPICallResult & {
  ok?:                 boolean;
  error?:              string;
  entities?:           Entity[];
  entity_total_count?: number;
  needed?:             string;
  provided?:           string;
};

export interface Entity {
  entity_id?:   string;
  entity_type?: string;
  date_added?:  number;
}
