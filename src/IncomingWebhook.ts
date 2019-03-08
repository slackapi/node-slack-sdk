import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { CodedError, errorWithCode, ErrorCode } from './errors';
import { MessageAttachment, Block } from './methods';
import { AgentOption, agentForScheme } from './util';

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

  /**
   * Axios HTTP client instance used by this client
   */
  private axios: AxiosInstance;

  constructor(url: string, defaults: IncomingWebhookDefaultArguments = {}) {
    if (url === undefined) {
      throw new Error('Incoming webhook URL is required');
    }

    this.url = url;
    this.defaults = defaults;

    this.axios = axios.create({
      baseURL: url,
      httpAgent: agentForScheme('http', defaults.agent),
      httpsAgent: agentForScheme('https', defaults.agent),
      maxRedirects: 0,
      proxy: false,
    });

    delete this.defaults.agent;

  }

  /**
   * Send a notification to a conversation
   * @param message the message (a simple string, or an object describing the message)
   */
  public send(message: string | IncomingWebhookSendArguments): Promise<IncomingWebhookResult> {
    // NOTE: no support for TLS config
    let payload: IncomingWebhookSendArguments = Object.assign({}, this.defaults);

    if (typeof message === 'string') {
      payload.text = message;
    } else {
      payload = Object.assign(payload, message);
    }

    const implementation = () => this.axios.post(this.url, payload)
      .catch((error: AxiosError) => {
        // Wrap errors in this packages own error types (abstract the implementation details' types)
        if (error.response !== undefined) {
          throw httpErrorWithOriginal(error);
        } else if (error.request !== undefined) {
          throw requestErrorWithOriginal(error);
        } else {
          throw error;
        }
      })
      .then((response: AxiosResponse) => {
        return this.buildResult(response);
      });

    return implementation();
  }

  /**
   * Processes an HTTP response into an IncomingWebhookResult.
   */
  private buildResult(response: AxiosResponse): IncomingWebhookResult {
    return {
      text: response.data,
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
  agent?: AgentOption;
}

export interface IncomingWebhookSendArguments extends IncomingWebhookDefaultArguments {
  attachments?: MessageAttachment[];
  blocks?: Block[];
  unfurl_links?: boolean;
  unful_media?: boolean;
}

export interface IncomingWebhookResult {
  text: string;
}

export type IncomingWebhookSendError = IncomingWebhookRequestError | IncomingWebhookReadError |
                                       IncomingWebhookHTTPError;

export interface IncomingWebhookRequestError extends CodedError {
  code: ErrorCode.IncomingWebhookRequestError;
  original: Error;
}

// NOTE: this is no longer used, but might once again be used if a more specific means to detect it becomes evident
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
    new Error(`A request error occurred: ${original.message}`),
    ErrorCode.IncomingWebhookRequestError,
  ) as Partial<IncomingWebhookRequestError>;
  error.original = original;
  return (error as IncomingWebhookRequestError);
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
