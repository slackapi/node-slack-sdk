import type { WebAPICallResult } from './WebClient';

/**
 * @deprecated Use `instanceof` checks with specific error classes (e.g. `WebAPIPlatformError`) or the `SlackError` base class instead.
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
export type WebAPIFilesUploadError = WebAPIFileUploadInvalidArgumentsError | WebAPIFileUploadReadFileDataError;

export abstract class SlackError extends Error {
  abstract readonly code: ErrorCode;

  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class WebAPIPlatformError extends SlackError {
  readonly code = ErrorCode.PlatformError;
  readonly data: WebAPICallResult & { error: string };

  constructor(result: WebAPICallResult & { error: string }) {
    super(`An API error occurred: ${result.error}`);
    this.data = result;
  }
}

export class WebAPIRequestError extends SlackError {
  readonly code = ErrorCode.RequestError;
  readonly original: Error;

  constructor(original: Error) {
    super(`A request error occurred: ${original.message}`, { cause: original });
    this.original = original;
  }
}

export class WebAPIHTTPError extends SlackError {
  readonly code = ErrorCode.HTTPError;
  readonly statusCode: number;
  readonly statusMessage: string;
  readonly headers: Record<string, string>;
  // biome-ignore lint/suspicious/noExplicitAny: HTTP response bodies might be anything
  readonly body?: any;

  constructor(
    statusCode: number,
    statusMessage: string,
    headers: Record<string, string>,
    // biome-ignore lint/suspicious/noExplicitAny: HTTP response bodies might be anything
    body?: any,
  ) {
    super(`An HTTP protocol error occurred: statusCode = ${statusCode}`);
    this.statusCode = statusCode;
    this.statusMessage = statusMessage;
    this.headers = headers;
    if (typeof body === 'string') {
      try {
        this.body = JSON.parse(body);
      } catch {
        this.body = body;
      }
    } else {
      this.body = body;
    }
  }
}

export class WebAPIRateLimitedError extends SlackError {
  readonly code = ErrorCode.RateLimitedError;
  readonly retryAfter: number;

  constructor(retryAfter: number) {
    super(`A rate-limit has been reached, you may retry this request in ${retryAfter} seconds`);
    this.retryAfter = retryAfter;
  }
}

export class WebAPIFileUploadInvalidArgumentsError extends SlackError {
  readonly code = ErrorCode.FileUploadInvalidArgumentsError;
}

export class WebAPIFileUploadReadFileDataError extends SlackError {
  readonly code = ErrorCode.FileUploadReadFileDataError;
}
