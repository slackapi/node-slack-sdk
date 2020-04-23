export interface CodedError extends Error {
  code: string; // This can be a value from ErrorCode, or WebClient's ErrorCode, or a NodeJS error code
}

  /**
   * A dictionary of codes for errors produced by this package.
   */
export enum ErrorCode {
    InstallerInitializationError = 'INSTALLER_INITIALIZATION_ERROR',
    AuthorizationError = 'INSTALLER_AUTHORIZATION_ERROR',
    GenerateInstallUrlError = 'GENERATE_URL_ERROR',
    MissingStateError = 'MISSING_STATE',
    UnknownError = 'UNKNOWN_ERROR',
  }

export class InstallerInitializationError extends Error implements CodedError {
  public code = ErrorCode.InstallerInitializationError;
}

export class GenerateInstallUrlError extends Error implements CodedError {
  public code = ErrorCode.GenerateInstallUrlError;
}

export class MissingStateError extends Error implements CodedError {
  public code = ErrorCode.MissingStateError;
}

export class UnknownError extends Error implements CodedError {
  public code = ErrorCode.UnknownError;
}

export class AuthorizationError extends Error implements CodedError {
  public code = ErrorCode.AuthorizationError;
  public original: Error | undefined;

  constructor(message: string, original?: Error) {
    super(message);

    if (original !== undefined) {
      this.original = original;
    }
  }
}
