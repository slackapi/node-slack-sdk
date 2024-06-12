/* eslint-disable */
/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// !!! DO NOT EDIT THIS FILE !!!                                                       //
//                                                                                     //
// This file is auto-generated by scripts/generate-web-api-types.sh in the repository. //
// Please refer to the script code to learn how to update the source data.             //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

import { WebAPICallResult } from '../../WebClient';
export type CanvasesAccessSetResponse = WebAPICallResult & {
  error?:                        string;
  failed_to_update_channel_ids?: string[];
  failed_to_update_user_ids?:    string[];
  ok?:                           boolean;
  response_metadata?:            ResponseMetadata;
};

export interface ResponseMetadata {
}
