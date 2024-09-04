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
export type AppsManifestValidateResponse = WebAPICallResult & {
  error?: string;
  errors?: Error[];
  needed?: string;
  ok?: boolean;
  provided?: string;
  response_metadata?: ResponseMetadata;
};

export interface Error {
  code?: string;
  message?: string;
  pointer?: string;
  related_component?: string;
}

export interface ResponseMetadata {
  messages?: string[];
}
