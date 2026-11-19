/**
 * All errors produced by this package adhere to this interface.
 *
 * NOTE: This interface is retained because it is part of the public `CallbackOptions#failure`
 * callback signature. For new code, prefer `instanceof` checks against the {@link SlackOAuthError}
 * base class or a specific error subclass.
 */
export interface CodedError extends Error {
  code: string; // This can be a value from ErrorCode, or WebClient's ErrorCode, or a NodeJS error code
}

/**
 * A dictionary of codes for errors produced by this package.
 */
export enum ErrorCode {
  InstallerInitializationError = 'slack_oauth_installer_initialization_error',
  AuthorizationError = 'slack_oauth_installer_authorization_error',
  GenerateInstallUrlError = 'slack_oauth_generate_url_error',
  MissingStateError = 'slack_oauth_missing_state',
  InvalidStateError = 'slack_oauth_invalid_state',
  MissingCodeError = 'slack_oauth_missing_code',
  UnknownError = 'slack_oauth_unknown_error',
}

export abstract class SlackOAuthError extends Error {
  abstract readonly code: ErrorCode;

  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class InstallerInitializationError extends SlackOAuthError {
  readonly code = ErrorCode.InstallerInitializationError;
}

export class GenerateInstallUrlError extends SlackOAuthError {
  readonly code = ErrorCode.GenerateInstallUrlError;
}

export class MissingStateError extends SlackOAuthError {
  readonly code = ErrorCode.MissingStateError;
}

export class InvalidStateError extends SlackOAuthError {
  readonly code = ErrorCode.InvalidStateError;
}

export class MissingCodeError extends SlackOAuthError {
  readonly code = ErrorCode.MissingCodeError;
}

export class UnknownError extends SlackOAuthError {
  readonly code = ErrorCode.UnknownError;
}

export class AuthorizationError extends SlackOAuthError {
  readonly code = ErrorCode.AuthorizationError;

  public original: Error | undefined;

  public constructor(message: string, original?: Error) {
    super(message, original !== undefined ? { cause: original } : undefined);

    if (original !== undefined) {
      this.original = original;
    }
  }
}
