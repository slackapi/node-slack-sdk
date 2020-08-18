/**
 * All errors produced by this package adhere to this interface
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

  // internal errors
  KeepAliveConfigError = 'slack_socket_mode_keepalive_config_error',
  KeepAliveClientNotConnected = 'slack_socket_mode_keepalive_client_not_connected',
  KeepAliveInconsistentState = 'slack_socket_mode_keepalive_inconsistent_state',
}

export type SMCallError = SMPlatformError | SMWebsocketError | SMNoReplyReceivedError
  | SMSendWhileDisconnectedError | SMSendWhileNotReadyError;

export interface SMPlatformError extends CodedError {
  code: ErrorCode.SendMessagePlatformError;
  data: any;
}

export interface SMWebsocketError extends CodedError {
  code: ErrorCode.WebsocketError;
  original: Error;
}

export interface SMNoReplyReceivedError extends CodedError {
  code: ErrorCode.NoReplyReceivedError;
}

export interface SMSendWhileDisconnectedError extends CodedError {
  code: ErrorCode.SendWhileDisconnectedError;
}

export interface SMSendWhileNotReadyError extends CodedError {
  code: ErrorCode.SendWhileNotReadyError;
}

export interface SMSendWhileNotReadyError extends CodedError {
  code: ErrorCode.SendWhileNotReadyError;
}

/**
 * Factory for producing a {@link CodedError} from a generic error
 */
function errorWithCode(error: Error, code: ErrorCode): CodedError {
  // NOTE: might be able to return something more specific than a CodedError with conditional typing
  const codedError = error as Partial<CodedError>;
  codedError.code = code;
  return codedError as CodedError;
}

 /**
  * A factory to create SMWebsocketError objects.
  */
export function websocketErrorWithOriginal(original: Error): SMWebsocketError {
  const error = errorWithCode(
    new Error(`Failed to send message on websocket: ${original.message}`),
    ErrorCode.WebsocketError,
  ) as Partial<SMWebsocketError>;
  error.original = original;
  return (error as SMWebsocketError);
}

 /**
  * A factory to create SMPlatformError objects.
  */
export function platformErrorFromEvent(event: any & { error: { msg: string; } }): SMPlatformError {
  const error = errorWithCode(
    new Error(`An API error occurred: ${event.error.msg}`),
    ErrorCode.SendMessagePlatformError,
  ) as Partial<SMPlatformError>;
  error.data = event;
  return (error as SMPlatformError);
}

// TODO: Is the below factory needed still?
 /**
  * A factory to create SMNoReplyReceivedError objects.
  */
export function noReplyReceivedError(): SMNoReplyReceivedError {
  return errorWithCode(
    new Error('Message sent but no server acknowledgement was received. This may be caused by the client ' +
    'changing connection state rather than any issue with the specific message. Check before resending.'),
    ErrorCode.NoReplyReceivedError,
  ) as SMNoReplyReceivedError;
}

 /**
  * A factory to create SMSendWhileDisconnectedError objects.
  */
export function sendWhileDisconnectedError(): SMSendWhileDisconnectedError {
  return errorWithCode(
    new Error('Cannot send message when client is not connected'),
    ErrorCode.NoReplyReceivedError,
  ) as SMSendWhileDisconnectedError;
}

 /**
  * A factory to create SMSendWhileNotReadyError objects.
  */
export function sendWhileNotReadyError(): SMSendWhileNotReadyError {
  return errorWithCode(
    new Error('Cannot send message when client is not ready'),
    ErrorCode.NoReplyReceivedError,
  ) as SMSendWhileNotReadyError;
}
