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
export type EmojiListResponse = WebAPICallResult & {
  ok?:       boolean;
  emoji?:    Emoji;
  cache_ts?: string;
  error?:    string;
  needed?:   string;
  provided?: string;
};

export interface Emoji {
  emoji?:  string;
  emoji_?: string;
}
