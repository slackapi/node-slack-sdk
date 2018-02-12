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
  APIError = 'slackclient_api_error',
}

/**
 * Factory for producing a {@link CodedError} from a generic error
 *
 * @param error
 * @param code
 */
export function errorWithCode(error: Error, code: ErrorCode): CodedError {
  const codedError = error as CodedError;
  codedError.code = code;
  return codedError;
}
