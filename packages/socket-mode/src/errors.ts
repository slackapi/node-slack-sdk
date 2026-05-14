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

export class SMPlatformError extends Error {
  readonly code = ErrorCode.SendMessagePlatformError;
  // biome-ignore lint/suspicious/noExplicitAny: errors can be anything
  readonly data: any;

  // biome-ignore lint/suspicious/noExplicitAny: errors can be anything
  constructor(event: any & { error: { msg: string } }) {
    super(`An API error occurred: ${event.error.msg}`);
    this.name = 'SMPlatformError';
    Object.setPrototypeOf(this, new.target.prototype);
    this.data = event;
  }
}

export class SMWebsocketError extends Error {
  readonly code = ErrorCode.WebsocketError;
  readonly original: Error;

  constructor(original: Error) {
    super(original.message, { cause: original });
    this.name = 'SMWebsocketError';
    Object.setPrototypeOf(this, new.target.prototype);
    this.original = original;
  }
}

export class SMNoReplyReceivedError extends Error {
  readonly code = ErrorCode.NoReplyReceivedError;

  constructor() {
    super(
      'Message sent but no server acknowledgement was received. This may be caused by the client ' +
        'changing connection state rather than any issue with the specific message. Check before resending.',
    );
    this.name = 'SMNoReplyReceivedError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class SMSendWhileDisconnectedError extends Error {
  readonly code = ErrorCode.SendWhileDisconnectedError;

  constructor() {
    super('Failed to send a WebSocket message as the client is not connected');
    this.name = 'SMSendWhileDisconnectedError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class SMSendWhileNotReadyError extends Error {
  readonly code = ErrorCode.SendWhileNotReadyError;

  constructor() {
    super('Failed to send a WebSocket message as the client is not ready');
    this.name = 'SMSendWhileNotReadyError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
