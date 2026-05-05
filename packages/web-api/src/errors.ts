import type { WebAPICallResult } from './WebClient';

/**
 * All errors produced by this package adhere to this interface
 */
export interface CodedError extends NodeJS.ErrnoException {
  code: ErrorCode;
}

/**
 * A dictionary of codes for errors produced by this package
 */
export enum ErrorCode {
  // general error
  RequestError = 'slack_webapi_request_error',
  HTTPError = 'slack_webapi_http_error',
  PlatformError = 'slack_webapi_platform_error',
  RateLimitedError = 'slack_webapi_rate_limited_error',

  // file uploads errors
  FileUploadInvalidArgumentsError = 'slack_webapi_file_upload_invalid_args_error',
  FileUploadReadFileDataError = 'slack_webapi_file_upload_read_file_data_error',
}

export type WebAPICallError = WebAPIPlatformError | WebAPIRequestError | WebAPIHTTPError | WebAPIRateLimitedError;
export type WebAPIFilesUploadError = WebAPIFileUploadInvalidArgumentsError;

export interface WebAPIFileUploadInvalidArgumentsError extends CodedError {
  code: ErrorCode.FileUploadInvalidArgumentsError;
  data: WebAPICallResult & {
    error: string;
  };
}

export interface WebAPIPlatformError extends CodedError {
  code: ErrorCode.PlatformError;
  data: WebAPICallResult & {
    error: string;
  };
}

export interface WebAPIRequestError extends CodedError {
  code: ErrorCode.RequestError;
  original: Error;
}

export interface WebAPIHTTPError extends CodedError {
  code: ErrorCode.HTTPError;
  statusCode: number;
  statusMessage: string;
  headers: Record<string, string>;
  // biome-ignore lint/suspicious/noExplicitAny: HTTP response bodies might be anything
  body?: any;
}

export interface WebAPIRateLimitedError extends CodedError {
  code: ErrorCode.RateLimitedError;
  retryAfter: number;
}

/**
 * Factory for producing a {@link CodedError} from a generic error
 */
export function errorWithCode(error: Error, code: ErrorCode): CodedError {
  // NOTE: might be able to return something more specific than a CodedError with conditional typing
  const codedError = error as Partial<CodedError>;
  codedError.code = code;
  return codedError as CodedError;
}

/**
 * A factory to create WebAPIRequestError objects
 * @param original - original error
 */
export function requestErrorWithOriginal(original: Error): WebAPIRequestError {
  const error = errorWithCode(
    new Error(`A request error occurred: ${original.message}`),
    ErrorCode.RequestError,
  ) as Partial<WebAPIRequestError>;
  error.original = original;
  return error as WebAPIRequestError;
}

/**
 * A factory to create WebAPIHTTPError objects
 * @param status - HTTP status code
 * @param statusText - HTTP status text
 * @param headers - response headers
 * @param body - response body
 */
export function httpErrorFromResponse(
  status: number,
  statusText: string,
  headers: Record<string, string>,
  // biome-ignore lint/suspicious/noExplicitAny: HTTP response bodies might be anything
  body?: any,
): WebAPIHTTPError {
  const error = errorWithCode(
    new Error(`An HTTP protocol error occurred: statusCode = ${status}`),
    ErrorCode.HTTPError,
  ) as Partial<WebAPIHTTPError>;
  error.statusCode = status;
  error.statusMessage = statusText;
  error.headers = headers;
  if (typeof body === 'string') {
    try {
      error.body = JSON.parse(body);
    } catch {
      error.body = body;
    }
  } else {
    error.body = body;
  }
  return error as WebAPIHTTPError;
}

/**
 * A factory to create WebAPIPlatformError objects
 * @param result - Web API call result
 */
export function platformErrorFromResult(result: WebAPICallResult & { error: string }): WebAPIPlatformError {
  const error = errorWithCode(
    new Error(`An API error occurred: ${result.error}`),
    ErrorCode.PlatformError,
  ) as Partial<WebAPIPlatformError>;
  error.data = result;
  return error as WebAPIPlatformError;
}

/**
 * A factory to create WebAPIRateLimitedError objects
 * @param retrySec - Number of seconds that the request can be retried in
 */
export function rateLimitedErrorWithDelay(retrySec: number): WebAPIRateLimitedError {
  const error = errorWithCode(
    new Error(`A rate-limit has been reached, you may retry this request in ${retrySec} seconds`),
    ErrorCode.RateLimitedError,
  ) as Partial<WebAPIRateLimitedError>;
  error.retryAfter = retrySec;
  return error as WebAPIRateLimitedError;
}
