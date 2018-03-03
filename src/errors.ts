import { WebAPICallResult } from '.';

/**
 * All errors produced by this package adhere to this interface
 */
export interface CodedError extends NodeJS.ErrnoException {
  code: ErrorCode;
  data?: WebAPICallResult;
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

  // KeepAlive
  KeepAliveConfigError = 'slackclient_keepalive_config_error',
  KeepAliveClientNotConnected = 'slackclient_keepalive_client_not_connected',
  KeepAliveInconsistentState = 'slackclient_keepalive_inconsistent_state',
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
