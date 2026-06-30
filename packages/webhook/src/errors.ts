/**
 * @deprecated Use `instanceof` checks with specific error classes (e.g. `IncomingWebhookRequestError`) or the `SlackWebhookError` base class instead.
 */
export interface CodedError extends NodeJS.ErrnoException {
  code: ErrorCode;
}

export enum ErrorCode {
  RequestError = 'slack_webhook_request_error',
  HTTPError = 'slack_webhook_http_error',
}

export type IncomingWebhookSendError = IncomingWebhookRequestError | IncomingWebhookHTTPError;

export abstract class SlackWebhookError extends Error {
  abstract readonly code: ErrorCode;

  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class IncomingWebhookRequestError extends SlackWebhookError {
  readonly code = ErrorCode.RequestError;
  readonly original: Error;

  constructor(original: Error) {
    super(`A request error occurred: ${original.message}`, { cause: original });
    this.original = original;
  }
}

export class IncomingWebhookHTTPError extends SlackWebhookError {
  readonly code = ErrorCode.HTTPError;
  readonly statusCode: number;
  readonly statusMessage: string;
  readonly body: string;

  constructor(statusCode: number, statusMessage: string, body: string) {
    super(`An HTTP protocol error occurred: statusCode = ${statusCode}`);
    this.statusCode = statusCode;
    this.statusMessage = statusMessage;
    this.body = body;
  }
}
