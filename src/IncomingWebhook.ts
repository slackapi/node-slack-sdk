import got = require('got'); // tslint:disable-line:no-require-imports
import { CodedError, errorWithCode, ErrorCode } from './errors';
import { MessageAttachment } from './methods';
import { callbackify } from './util';

/**
 * A client for Slack's Incoming Webhooks
 */
export class IncomingWebhook {
  /**
   * The webhook URL
   */
  private url: string;

  /**
   * Default arguments for posting messages with this webhook
   */
  private defaults: IncomingWebhookDefaultArguments;

  constructor(url: string, defaults: IncomingWebhookDefaultArguments = {}) {
    if (url === undefined) {
      throw new Error('Incoming webhook URL is required');
    }

    this.url = url;
    this.defaults = defaults;
  }

  /**
   * Send a notification to a conversation
   * @param message the message (a simple string, or an object describing the message)
   * @param callback
   */
  public send(message: string | IncomingWebhookSendArguments): Promise<IncomingWebhookResult>;
  public send(message: string | IncomingWebhookSendArguments, callback: IncomingWebhookResultCallback): void;
  public send(message: string | IncomingWebhookSendArguments,
              callback?: IncomingWebhookResultCallback): Promise<IncomingWebhookResult> | void {
    // NOTE: no support for proxy
    // NOTE: no support for TLS config
    let payload: IncomingWebhookSendArguments = this.defaults;

    if (typeof message === 'string') {
      payload.text = message;
    } else {
      payload = Object.assign(payload, message);
    }

    const implementation = () => got.post(this.url, {
      body: JSON.stringify(payload),
      retries: 0,
    })
      .catch((error: got.GotError) => {
        // Wrap errors in this packages own error types (abstract the implementation details' types)
        switch (error.name) {
          case 'RequestError':
            throw requestErrorWithOriginal(error);
          case 'ReadError':
            throw readErrorWithOriginal(error);
          case 'HTTPError':
            throw httpErrorWithOriginal(error);
          default:
            throw error;
        }
      })
      .then((response: got.Response<string>) => {
        return this.buildResult(response);
      });

    if (callback !== undefined) {
      callbackify(implementation)(callback);
      return;
    }
    return implementation();
  }

  /**
   * Processes an HTTP response into an IncomingWebhookResult.
   * @param response
   */
  private buildResult(response: got.Response<string>): IncomingWebhookResult {
    return {
      text: response.body,
    };
  }
}

/*
 * Exported types
 */

export interface IncomingWebhookDefaultArguments {
  username?: string;
  icon_emoji?: string; // SEMVER:MAJOR used to be iconEmoji
  icon_url?: string; // SEMVER:MAJOR used to be iconUrl
  channel?: string;
  text?: string;
  link_names?: boolean; // SEMVER:MAJOR used to be linkNames
}

export interface IncomingWebhookSendArguments extends IncomingWebhookDefaultArguments {
  attachments?: MessageAttachment[];
  unfurl_links?: boolean;
  unful_media?: boolean;
}

export interface IncomingWebhookResult {
  text: string;
}

export interface IncomingWebhookResultCallback {
  (error: IncomingWebhookSendError, result: IncomingWebhookResult): void;
}

export type IncomingWebhookSendError = IncomingWebhookRequestError | IncomingWebhookReadError |
                                       IncomingWebhookHTTPError;

export interface IncomingWebhookRequestError extends CodedError {
  code: ErrorCode.IncomingWebhookRequestError;
  original: Error;
}

export interface IncomingWebhookReadError extends CodedError {
  code: ErrorCode.IncomingWebhookReadError;
  original: Error;
}

export interface IncomingWebhookHTTPError extends CodedError {
  code: ErrorCode.IncomingWebhookHTTPError;
  original: Error;
}

/*
 * Helpers
 */

/**
 * A factory to create IncomingWebhookRequestError objects
 * @param original The original error
 */
function requestErrorWithOriginal(original: Error): IncomingWebhookRequestError {
  const error = errorWithCode(
    // `any` cast is used because the got definition file doesn't export the got.RequestError type
    new Error(`A request error occurred: ${(original as any).code}`),
    ErrorCode.IncomingWebhookRequestError,
  ) as Partial<IncomingWebhookRequestError>;
  error.original = original;
  return (error as IncomingWebhookRequestError);
}


/**
 * A factory to create IncomingWebhookReadError objects
 * @param original The original error
 */
function readErrorWithOriginal(original: Error): IncomingWebhookReadError {
  const error = errorWithCode(
    new Error('A response read error occurred'),
    ErrorCode.IncomingWebhookReadError,
  ) as Partial<IncomingWebhookReadError>;
  error.original = original;
  return (error as IncomingWebhookReadError);
}


/**
 * A factory to create IncomingWebhookHTTPError objects
 * @param original The original error
 */
function httpErrorWithOriginal(original: Error): IncomingWebhookHTTPError {
  const error = errorWithCode(
    // `any` cast is used because the got definition file doesn't export the got.HTTPError type
    new Error(`An HTTP protocol error occurred: statusCode = ${(original as any).statusCode}`),
    ErrorCode.IncomingWebhookHTTPError,
  ) as Partial<IncomingWebhookHTTPError>;
  error.original = original;
  return (error as IncomingWebhookHTTPError);
}
