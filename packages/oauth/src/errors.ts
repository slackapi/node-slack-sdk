export interface CodedError extends Error {
  code: string; // This can be a value from ErrorCode, or WebClient's ErrorCode, or a NodeJS error code
}

  /**
   * A dictionary of codes for errors produced by this package.
   */
export enum ErrorCode {
    MissingClientError = 'MISSING_CLIENT_ID_OR_SECRET',
    MissingStateSecretError = 'MISSING_STATE_SECRET',
    MissingScopeError = 'MISSING_SCOPE',
    MissingStateError = 'MISSING_STATE',
    UnknownError = 'UNKNOWN_ERROR',
  }

export class MissingClientError extends Error implements CodedError {
  public code = ErrorCode.MissingClientError;
}

export class MissingStateSecretError extends Error implements CodedError {
  public code = ErrorCode.MissingStateSecretError;
}

export class MissingScopeError extends Error implements CodedError {
  public code = ErrorCode.MissingScopeError;
}

export class MissingStateError extends Error implements CodedError {
  public code = ErrorCode.MissingStateError;
}

export class UnknownError extends Error implements CodedError {
  public code = ErrorCode.UnknownError;
}
