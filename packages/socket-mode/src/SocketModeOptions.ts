import type { WebClientOptions } from '@slack/web-api';
import type { Logger, LogLevel } from './logger';

export interface SocketModeOptions {
  /**
   * The App-level token associated with your app, located under the Basic Information page on api.slack.com/apps.
   */
  appToken: string;
  /**
   * An instance of `@slack/logger`'s Logger interface, to send log messages to.
   */
  logger?: Logger;
  /**
   * An instance of `@slack/logger`'s LogLevel enum, setting the minimum log level to emit log messages for.
   */
  logLevel?: LogLevel;
  /**
   * Whether the client should automatically reconnect when the socket mode connection is disrupted. Defaults to `true`.
   * Note that disconnects are regular and expected when using Socket Mode, so setting this to `false` will likely lead
   * to a disconnected client after some amount of time.
   */
  autoReconnectEnabled?: boolean;
  /**
   * How long the client should wait for a `pong` response to the client's `ping` to the server, in milliseconds.
   * If this timeout is hit, the client will attempt to reconnect if `autoReconnectEnabled` is `true`;
   * otherwise, it will disconnect.
   * Defaults to 5,000.
   */
  clientPingTimeout?: number;
  /**
   * How long the client should wait for `ping` messages from the server, in milliseconds.
   * If this timeout is hit, the client will attempt to reconnect if `autoReconnectEnabled` is `true`;
   * otherwise, it will disconnect.
   * Defaults to 30,000.
   */
  serverPingTimeout?: number;
  /**
   * Should logging related to `ping` and `pong` messages between the client and server be logged at a
   * `LogLevel.DEBUG` level. Defaults to `false.
   */
  pingPongLoggingEnabled?: boolean;
  /**
   * The `@slack/web-api` `WebClientOptions` to provide to the HTTP client interacting with Slack's HTTP API.
   * Useful for setting retry configurations, TLS and HTTP Agent options.
   */
  clientOptions?: Omit<WebClientOptions, 'logLevel' | 'logger'>;
}
