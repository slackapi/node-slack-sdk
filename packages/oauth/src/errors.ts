/**
 * All errors produced by this package are regular
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error | Error} objects with
 * an extra {@link CodedError.code | `error`} field.
 */
export interface CodedError extends Error {
    /**
     * What kind of error occurred.
     */
  code: ErrorCode;
}

  /**
   * A dictionary of codes for errors produced by this package.
   */
export enum ErrorCode {
    StateDoesNotMatch = 'STATE_DOES_NOT_MATCH',
  }

export function errorWithCode(message: string, code: ErrorCode): CodedError {
  const error = new Error(message);
  (error as CodedError).code = code;
  return error as CodedError;
}
