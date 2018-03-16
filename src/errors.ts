import { WebAPICallResult, RTMCallResult } from '.';

/**
 * All errors produced by this package adhere to this interface
 */
export interface CodedError extends NodeJS.ErrnoException {
  code: ErrorCode;
  data?: WebAPICallResult | RTMCallResult;
}

/**
 * A dictionary of codes for errors produced by this package
 */
export enum ErrorCode {
  TestError = 'slackclient_test',

  // WebClient
  RequestError = 'slackclient_request_error', // Corresponds to WebAPIRequestError
  ReadError = 'slackclient_read_error', // Corresponds to WebAPIReadError
  HTTPError = 'slackclient_http_error', // Corresponds to WebAPIHTTPError
  PlatformError = 'slackclient_platform_error', // Corresponds to WebAPIPlatformError

  // RTMClient
  RTMSendWhileDisconnectedError = 'slackclient_rtmclient_send_while_disconnected_error',
  RTMSendWhileNotReadyError = 'slackclient_rtmclient_send_while_not_ready_error',
  RTMSendMessagePlatformError = 'slackclient_rtmclient_send_message_platform_error',
  RTMWebsocketError = 'slackclient_rtmclient_websocket_error',
  RTMNoReplyReceivedError = 'slackclient_rtmclient_no_reply_received_error',

  // KeepAlive
  KeepAliveConfigError = 'slackclient_keepalive_config_error',
  KeepAliveClientNotConnected = 'slackclient_keepalive_client_not_connected',
  KeepAliveInconsistentState = 'slackclient_keepalive_inconsistent_state',

  // IncomingWebhook
  IncomingWebhookRequestError = 'slackclient_incomingwebhook_request_error',
  IncomingWebhookReadError = 'slackclient_incomingwebhook_read_error',
  IncomingWebhookHTTPError = 'slackclient_incomingwebhook_http_error',
}

/**
 * Factory for producing a {@link CodedError} from a generic error
 *
 * @param error
 * @param code
 */
export function errorWithCode(error: Error, code: ErrorCode): CodedError {
  const codedError = error as Partial<CodedError>;
  codedError.code = code;
  return codedError as CodedError;
}
