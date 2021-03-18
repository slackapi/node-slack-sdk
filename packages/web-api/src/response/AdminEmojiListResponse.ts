/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminEmojiListResponse = WebAPICallResult & {
  ok?:                boolean;
  emoji?:             AdminEmojiListResponseEmoji;
  response_metadata?: ResponseMetadata;
  error?:             string;
  needed?:            string;
  provided?:          string;
};

export interface AdminEmojiListResponseEmoji {
  emoji?:  EmojiClass;
  emoji_?: EmojiClass;
}

export interface EmojiClass {
  emoji?:  string;
  emoji_?: string;
}

export interface ResponseMetadata {
  next_cursor?: string;
}
