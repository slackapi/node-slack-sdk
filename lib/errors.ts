export interface CodedError extends Error {
  code: string;
}

export enum ErrorCode {
  InvalidLogLevel = 'E_SLACKCLIENT_INVALID_LOGLEVEL',
}

export function errorWithCode(error: Error, code: ErrorCode): CodedError {
  const codedError = error as CodedError;
  codedError.code = code;
  return codedError;
}
