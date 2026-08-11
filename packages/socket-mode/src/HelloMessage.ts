/**
 * @description The `hello` message Slack sends over the WebSocket once it has finalized the Socket Mode handshake. It
 * reports how many connections the app-level token currently holds open, which is handy for detecting that more than
 * one instance of an app is running.
 * @see {@link https://docs.slack.dev/apis/events-api/using-socket-mode Using Socket Mode}.
 */
export interface HelloMessage {
  /** @description The type of message. For a hello message, `type` is always `hello`. */
  type: 'hello';
  /** @description The number of connections currently open for the app-level token used by this client. */
  num_connections: number;
  /** @description Diagnostic details about the Slack host serving this connection. */
  debug_info?: HelloMessageDebugInfo;
  /** @description Details about the app this connection belongs to. */
  connection_info?: HelloMessageConnectionInfo;
}

/**
 * @description Diagnostic details about the Slack host serving a Socket Mode connection.
 */
export interface HelloMessageDebugInfo {
  /** @description The Slack host serving this connection. */
  host?: string;
  /** @description When the connection was established. */
  started?: string;
  /** @description The build serving this connection. */
  build_number?: number;
  /**
   * @description How long, in seconds, the connection is expected to persist before Slack refreshes it. Useful for
   * estimating when the next reconnect will happen.
   */
  approximate_connection_time?: number;
}

/**
 * @description Details about the app a Socket Mode connection was opened for.
 */
export interface HelloMessageConnectionInfo {
  /** @description The ID of the app this connection belongs to. */
  app_id?: string;
}
