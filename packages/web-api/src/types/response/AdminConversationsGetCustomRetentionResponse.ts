/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// !!! DO NOT EDIT THIS FILE !!!                                                       //
//                                                                                     //
// This file is auto-generated by scripts/generate-web-api-types.sh in the repository. //
// Please refer to the script code to learn how to update the source data.             //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

import { WebAPICallResult } from '../../WebClient';
export type AdminConversationsGetCustomRetentionResponse = WebAPICallResult & {
  duration_days?:     number;
  error?:             string;
  is_policy_enabled?: boolean;
  needed?:            string;
  ok?:                boolean;
  provided?:          string;
};
