import type { Logger } from '@slack/logger';
import type { ChatAppendStreamArguments, ChatStartStreamArguments, ChatStopStreamArguments } from './types/request';
import type { ChatAppendStreamResponse, ChatStartStreamResponse, ChatStopStreamResponse } from './types/response';
import type WebClient from './WebClient';

export interface ChatStreamerOptions {
  /**
   * @description The length of markdown_text to buffer in-memory before calling a method. Increasing this value decreases the number of method calls made for the same amount of text, which is useful to avoid rate limits.
   * @default 256
   */
  buffer_size?: number;
}

export class ChatStreamer {
  private buffer = '';

  private client: WebClient;

  private logger: Logger;

  private options: Required<ChatStreamerOptions>;

  private state: 'starting' | 'in_progress' | 'completed';

  private streamArgs: ChatStartStreamArguments;

  private streamTs: string | undefined;

  private token: string | undefined;

  /**
   * Instantiate a new chat streamer.
   *
   * @description The "constructor" method creates a unique {@link ChatStreamer} instance that keeps track of one chat stream.
   * @example
   * const client = new WebClient(process.env.SLACK_BOT_TOKEN);
   * const logger = new ConsoleLogger();
   * const args = {
   *   channel: "C0123456789",
   *   thread_ts: "1700000001.123456",
   *   recipient_team_id: "T0123456789",
   *   recipient_user_id: "U0123456789",
   * };
   * const streamer = new ChatStreamer(client, logger, args, { buffer_size: 512 });
   * await streamer.append({
   *   markdown_text: "**hello world!**",
   * });
   * await streamer.stop();
   * @see {@link https://docs.slack.dev/reference/methods/chat.startStream}
   * @see {@link https://docs.slack.dev/reference/methods/chat.appendStream}
   * @see {@link https://docs.slack.dev/reference/methods/chat.stopStream}
   */
  constructor(client: WebClient, logger: Logger, args: ChatStartStreamArguments, options: ChatStreamerOptions) {
    this.client = client;
    this.logger = logger;
    this.options = {
      buffer_size: options.buffer_size ?? 256,
    };
    this.state = 'starting';
    this.streamArgs = args;
  }

  /**
   * Append to the stream.
   *
   * @description The "append" method appends to the chat stream being used. This method can be called multiple times. After the stream is stopped this method cannot be called.
   * @example
   * const streamer = client.chatStream({
   *   channel: "C0123456789",
   *   thread_ts: "1700000001.123456",
   *   recipient_team_id: "T0123456789",
   *   recipient_user_id: "U0123456789",
   * });
   * await streamer.append({
   *   markdown_text: "**hello wo",
   * });
   * await streamer.append({
   *   markdown_text: "rld!**",
   * });
   * await streamer.stop();
   * @see {@link https://docs.slack.dev/reference/methods/chat.appendStream}
   */
  async append(
    args: Omit<ChatAppendStreamArguments, 'channel' | 'ts'>,
  ): Promise<ChatStartStreamResponse | ChatAppendStreamResponse | null> {
    if (this.state === 'completed') {
      throw new Error(`failed to append stream: stream state is ${this.state}`);
    }
    if (args.token) {
      this.token = args.token;
    }
    this.buffer += args.markdown_text;
    if (this.buffer.length >= this.options.buffer_size) {
      return await this.flushBuffer(args);
    }
    const details = {
      bufferLength: this.buffer.length,
      bufferSize: this.options.buffer_size,
      channel: this.streamArgs.channel,
      recipientTeamId: this.streamArgs.recipient_team_id,
      recipientUserId: this.streamArgs.recipient_user_id,
      threadTs: this.streamArgs.thread_ts,
    };
    this.logger.debug(`ChatStreamer appended to buffer: ${JSON.stringify(details)}`);
    return null;
  }

  /**
   * Stop the stream and finalize the message.
   *
   * @description The "stop" method stops the chat stream being used. This method can be called once to end the stream. Additional "blocks" and "metadata" can be provided.
   *
   * @example
   * const streamer = client.chatStream({
   *   channel: "C0123456789",
   *   thread_ts: "1700000001.123456",
   *   recipient_team_id: "T0123456789",
   *   recipient_user_id: "U0123456789",
   * });
   * await streamer.append({
   *   markdown_text: "**hello world!**",
   * });
   * await streamer.stop();
   * @see {@link https://docs.slack.dev/reference/methods/chat.stopStream}
   */
  async stop(args?: Omit<ChatStopStreamArguments, 'channel' | 'ts'>): Promise<ChatStopStreamResponse> {
    if (this.state === 'completed') {
      throw new Error(`failed to stop stream: stream state is ${this.state}`);
    }
    if (args?.token) {
      this.token = args.token;
    }
    if (args?.markdown_text) {
      this.buffer += args.markdown_text;
    }
    if (!this.streamTs) {
      const response = await this.client.chat.startStream({
        ...this.streamArgs,
        token: this.token,
      });
      if (!response.ts) {
        throw new Error('failed to stop stream: stream not started');
      }
      this.streamTs = response.ts;
      this.state = 'in_progress';
    }
    const response = await this.client.chat.stopStream({
      token: this.token,
      channel: this.streamArgs.channel,
      ts: this.streamTs,
      ...args,
      markdown_text: this.buffer,
    });
    this.state = 'completed';
    return response;
  }

  private async flushBuffer(
    args: Omit<ChatStartStreamArguments | ChatAppendStreamArguments, 'channel' | 'ts'>,
  ): Promise<ChatStartStreamResponse | ChatAppendStreamResponse> {
    if (!this.streamTs) {
      const response = await this.client.chat.startStream({
        ...this.streamArgs,
        token: this.token,
        ...args,
        markdown_text: this.buffer,
      });
      this.buffer = '';
      this.streamTs = response.ts;
      this.state = 'in_progress';
      return response;
    }
    const response = await this.client.chat.appendStream({
      token: this.token,
      channel: this.streamArgs.channel,
      ts: this.streamTs,
      ...args,
      markdown_text: this.buffer,
    });
    this.buffer = '';
    return response;
  }
}
