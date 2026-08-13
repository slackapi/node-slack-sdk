/**
 * @deprecated Use `instanceof` checks with specific error classes (e.g. `SMWebsocketError`) instead.
 */
export interface CodedError extends Error {
  code: string;
}

/**
 * A dictionary of codes for errors produced by this package
 */
export enum ErrorCode {
  SendWhileDisconnectedError = 'slack_socket_mode_send_while_disconnected_error',
  SendWhileNotReadyError = 'slack_socket_mode_send_while_not_ready_error',
  SendMessagePlatformError = 'slack_socket_mode_send_message_platform_error',
  WebsocketError = 'slack_socket_mode_websocket_error',
  NoReplyReceivedError = 'slack_socket_mode_no_reply_received_error',
  InitializationError = 'slack_socket_mode_initialization_error',
}

export type SMCallError =
  | SMPlatformError
  | SMWebsocketError
  | SMNoReplyReceivedError
  | SMSendWhileDisconnectedError
  | SMSendWhileNotReadyError;

/**
 * The shape of a Slack platform error event that backs an {@link SMPlatformError}.
 */
export interface SMPlatformErrorEvent {
  error: { msg: string };
  [key: string]: unknown;
}

export abstract class SlackSocketModeError extends Error {
  abstract readonly code: ErrorCode;

  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class SMPlatformError extends SlackSocketModeError {
  readonly code = ErrorCode.SendMessagePlatformError;
  readonly data: SMPlatformErrorEvent;

  constructor(event: SMPlatformErrorEvent) {
    super(`An API error occurred: ${event.error.msg}`);
    this.data = event;
  }
}

export class SMWebsocketError extends SlackSocketModeError {
  readonly code = ErrorCode.WebsocketError;
  readonly original: Error;

  constructor(original: Error) {
    super(original.message, { cause: original });
    this.original = original;
  }
}

export class SMNoReplyReceivedError extends SlackSocketModeError {
  readonly code = ErrorCode.NoReplyReceivedError;

  constructor() {
    super(
      'Message sent but no server acknowledgement was received. This may be caused by the client ' +
        'changing connection state rather than any issue with the specific message. Check before resending.',
    );
  }
}

export class SMSendWhileDisconnectedError extends SlackSocketModeError {
  readonly code = ErrorCode.SendWhileDisconnectedError;

  constructor() {
    super('Failed to send a WebSocket message as the client is not connected');
  }
}

export class SMSendWhileNotReadyError extends SlackSocketModeError {
  readonly code = ErrorCode.SendWhileNotReadyError;

  constructor() {
    super('Failed to send a WebSocket message as the client is not ready');
  }
}
