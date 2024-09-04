/* eslint-disable */
/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// !!! DO NOT EDIT THIS FILE !!!                                                       //
//                                                                                     //
// This file is auto-generated by scripts/generate-web-api-types.sh in the repository. //
// Please refer to the script code to learn how to update the source data.             //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

import type { WebAPICallResult } from '../../WebClient';
export type AdminAuthPolicyGetEntitiesResponse = WebAPICallResult & {
  entities?: Entity[];
  entity_total_count?: number;
  error?: string;
  needed?: string;
  ok?: boolean;
  provided?: string;
};

export interface Entity {
  date_added?: number;
  entity_id?: string;
  entity_type?: string;
}
