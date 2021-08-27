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
export type DndInfoResponse = WebAPICallResult & {
  ok?:                boolean;
  dnd_enabled?:       boolean;
  next_dnd_start_ts?: number;
  next_dnd_end_ts?:   number;
  error?:             string;
  needed?:            string;
  provided?:          string;
};
