/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// !!! DO NOT EDIT THIS FILE !!!                                                       //
//                                                                                     //
// This file is auto-generated by scripts/generate-web-api-types.sh in the repository. //
// Please refer to the script code to learn how to update the source data.             //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

import { WebAPICallResult } from '../../WebClient';
export type ChatMeMessageResponse = WebAPICallResult & {
  channel?:  string;
  error?:    string;
  needed?:   string;
  ok?:       boolean;
  provided?: string;
  ts?:       string;
};
