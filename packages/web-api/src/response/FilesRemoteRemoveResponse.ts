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
export type FilesRemoteRemoveResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
