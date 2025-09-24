import type { ExcludeFromUnion } from './types/helpers';
import type { ChatAppendStreamArguments, ChatStartStreamArguments, ChatStopStreamArguments } from './types/request';
import type { ChatAppendStreamResponse, ChatStartStreamResponse, ChatStopStreamResponse } from './types/response';
import type WebClient from './WebClient';

export default class ChatStreamer {
  private channel: string | undefined;

  private client: WebClient;

  private state: 'starting' | 'in_progress' | 'completed';

  private streamTs: string | undefined;

  private token: string | undefined;

  /**
   * Instantiate a new chat streamer.
   *
   * @description The "constructor" method creates a unique {@link ChatStreamer} instance that keeps track of one chat stream. The stream must be started.
   * @example
   * const client = new WebClient(process.env.SLACK_BOT_TOKEN);
   * const streamer = new ChatStreamer(client);
   * const _response = await streamer.start({
   *   channel: "C0123456789",
   *   thread_ts: "1700000001.123456",
   *   recipient_team_id: "T0123456789",
   *   recipient_user_id: "U0123456789",
   * });
   * await streamer.append({
   *   markdown_text: "**hello world!**",
   * });
   * await streamer.stop();
   * @see {@link https://docs.slack.dev/reference/methods/chat.startStream}
   * @see {@link https://docs.slack.dev/reference/methods/chat.appendStream}
   * @see {@link https://docs.slack.dev/reference/methods/chat.stopStream}
   */
  constructor(client: WebClient) {
    this.client = client;
    this.state = 'starting';
  }

  /**
   * Start a new stream.
   *
   * @description The "start" method starts a new chat stream unique to a {@link ChatStreamer} being used. This method can be called once. If the chat stream was created with the {@link WebClient#stream} method this method should not be called because the stream is started already.
   * @example
   * const streamer = await client.stream({
   *   channel: "C0123456789",
   *   thread_ts: "1700000001.123456",
   *   recipient_team_id: "T0123456789",
   *   recipient_user_id: "U0123456789",
   * });
   * await streamer.append({
   *   markdown_text: "**hello world!**",
   * });
   * await streamer.stop();
   * @example
   * const client = new WebClient(process.env.SLACK_BOT_TOKEN);
   * const streamer = new ChatStreamer(client);
   * const _response = await streamer.start({
   *   channel: "C0123456789",
   *   thread_ts: "1700000001.123456",
   *   recipient_team_id: "T0123456789",
   *   recipient_user_id: "U0123456789",
   * });
   * await streamer.append({
   *   markdown_text: "**hello world!**",
   * });
   * await streamer.stop();
   * @see {@link https://docs.slack.dev/reference/methods/chat.startStream}
   */
  async start(params: ChatStartStreamArguments): Promise<ChatStartStreamResponse> {
    if (this.state !== 'starting') {
      throw new Error(`failed to start stream: stream state is ${this.state}`);
    }
    if (params.token) {
      this.token = params.token;
    }
    const response = await this.client.chat.startStream({
      token: this.token,
      ...params,
    });
    if (!response.ts) {
      throw new Error(`failed to start stream: ${response.error}`);
    }
    this.channel = params.channel;
    this.state = 'in_progress';
    this.streamTs = response.ts;
    return response;
  }

  /**
   * Append to a stream.
   *
   * @description The "append" method appends to the chat stream being used. This method can be called multiple times. After the stream is stopped this method cannot be called.
   * @example
   * const streamer = await client.stream({
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
    params: ExcludeFromUnion<ChatAppendStreamArguments, 'channel' | 'ts'>,
  ): Promise<ChatAppendStreamResponse> {
    if (this.state !== 'in_progress') {
      throw new Error(`failed to append stream: stream state is ${this.state}`);
    }
    if (params.token) {
      this.token = params.token;
    }
    if (!this.channel) {
      throw new Error('failed to append stream: channel not found');
    }
    if (!this.streamTs) {
      throw new Error('failed to append stream: ts not found');
    }
    const response = await this.client.chat.appendStream({
      token: this.token,
      channel: this.channel,
      ts: this.streamTs,
      ...params,
    });
    return response;
  }

  /**
   * Stop a stream.
   *
   * @description The "stop" method stops the chat stream being used. This method can be called once to end the stream. Additional "blocks" and "metadata" can be provided.
   *
   * @example
   * const streamer = await client.stream({
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
  async stop(params?: ExcludeFromUnion<ChatStopStreamArguments, 'channel' | 'ts'>): Promise<ChatStopStreamResponse> {
    if (this.state !== 'in_progress') {
      throw new Error(`failed to stop stream: stream state is ${this.state}`);
    }
    if (params?.token) {
      this.token = params.token;
    }
    if (!this.channel) {
      throw new Error('failed to stop stream: channel not found');
    }
    if (!this.streamTs) {
      throw new Error('failed to stop stream: ts not found');
    }
    const response = await this.client.chat.stopStream({
      token: this.token,
      channel: this.channel,
      ts: this.streamTs,
      ...params,
    });
    this.state = 'completed';
    return response;
  }
}
