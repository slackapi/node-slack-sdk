/* tslint:disable */
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
