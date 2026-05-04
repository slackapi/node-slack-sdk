import type { Block, KnownBlock } from '@slack/types';
import type { WebAPICallResult } from '../../WebClient';
export type ChatStopStreamResponse = WebAPICallResult & {
  channel?: string;
  error?: string;
  needed?: string;
  ok?: boolean;
  provided?: string;
  ts?: string;
  message?: ChatStopStreamResponseMessage;
};

export interface ChatStopStreamResponseMessage {
  subtype?: string;
  text?: string;
  user?: string;
  streaming_state?: string;
  type?: string;
  ts?: string;
  bot_id?: string;
  thread_ts?: string;
  parent_user_id?: string;
  blocks?: (Block | KnownBlock)[];
}
