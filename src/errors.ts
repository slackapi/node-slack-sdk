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
  TestError = 'test',
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
