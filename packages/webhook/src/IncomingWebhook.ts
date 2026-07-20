import type { Block, KnownBlock, MessageAttachment } from '@slack/types'; // TODO: Block and KnownBlock will be merged into AnyBlock in upcoming types release
import pRetry, { AbortError } from 'p-retry';

import { IncomingWebhookHTTPError, IncomingWebhookRequestError, SlackWebhookError } from './errors';
import { getUserAgent } from './instrument';
import type { RetryOptions } from './retry-policies';

export interface FetchHeaders {
  get(name: string): string | null;
  entries(): Iterable<[string, string]>;
}

export interface FetchResponse {
  readonly ok: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly url: string;
  readonly headers: FetchHeaders;
  arrayBuffer(): Promise<ArrayBuffer>;
  json(): Promise<unknown>;
  text(): Promise<string>;
}

export interface FetchRequestInit {
  method?: string;
  headers?: Record<string, string>;
  body?: string | FormData;
  redirect?: 'error' | 'follow' | 'manual';
  signal?: AbortSignal;
}

export type FetchFunction = (url: string | URL, init?: FetchRequestInit) => Promise<FetchResponse>;

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
   * The fetch function used for HTTP requests
   */
  private fetchFn: FetchFunction;

  /**
   * Request timeout in milliseconds
   */
  private timeout: number;

  /**
   * Default headers sent with every request
   */
  private headers: Record<string, string>;

  /**
   * Retry policy applied to each send. Defaults to no retries.
   */
  private retryConfig: RetryOptions;

  public constructor(
    url: string,
    defaults: IncomingWebhookDefaultArguments = {
      timeout: 0,
    },
  ) {
    if (url === undefined) {
      throw new Error('Incoming webhook URL is required');
    }

    this.url = url;
    this.fetchFn = defaults.fetch ?? globalThis.fetch;
    this.timeout = defaults.timeout ?? 0;
    this.retryConfig = defaults.retryConfig ?? { retries: 0 };
    this.headers = {
      'User-Agent': getUserAgent(),
    };

    // Remove transport options so they don't leak into payloads
    const { fetch: _fetch, timeout: _timeout, retryConfig: _retryConfig, ...messageDefaults } = defaults;
    this.defaults = messageDefaults;
  }

  /**
   * Send a notification to a conversation
   * @param message - the message (a simple string, or an object describing the message)
   */
  public async send(message: string | IncomingWebhookSendArguments): Promise<IncomingWebhookResult> {
    let payload: IncomingWebhookSendArguments = { ...this.defaults };

    if (typeof message === 'string') {
      payload.text = message;
    } else {
      payload = Object.assign(payload, message);
    }

    return pRetry(async () => {
      const signal = this.timeout > 0 ? AbortSignal.timeout(this.timeout) : undefined;

      try {
        const response = await this.fetchFn(this.url, {
          method: 'POST',
          headers: {
            ...this.headers,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          redirect: 'error',
          signal,
        });

        if (!response.ok) {
          const body = await response.text();
          const httpError = new IncomingWebhookHTTPError(response.status, response.statusText, body);
          // Only server errors (5xx) are transient; client errors (4xx), including rate limits (429), fail immediately.
          throw response.status >= 500 ? httpError : new AbortError(httpError);
        }

        return await this.buildResult(response);
      } catch (error) {
        // Non-retryable signals (AbortError) and already-wrapped errors pass through untouched.
        if (error instanceof AbortError || error instanceof SlackWebhookError) {
          throw error;
        }
        // No response received (network/timeout): retryable.
        throw new IncomingWebhookRequestError(error instanceof Error ? error : new Error(String(error)));
      }
    }, this.retryConfig);
  }

  /**
   * Processes an HTTP response into an IncomingWebhookResult.
   */
  private async buildResult(response: FetchResponse): Promise<IncomingWebhookResult> {
    return {
      text: await response.text(),
    };
  }
}

/*
 * Exported types
 */

export interface IncomingWebhookDefaultArguments {
  username?: string;
  icon_emoji?: string;
  icon_url?: string;
  channel?: string;
  text?: string;
  link_names?: boolean;
  fetch?: FetchFunction;
  timeout?: number;
  retryConfig?: RetryOptions;
}

export interface IncomingWebhookSendArguments extends IncomingWebhookDefaultArguments {
  attachments?: MessageAttachment[];
  blocks?: (KnownBlock | Block)[];
  unfurl_links?: boolean;
  unfurl_media?: boolean;
  metadata?: {
    event_type: string;
    // biome-ignore lint/suspicious/noExplicitAny: errors can be anything
    event_payload: Record<string, any>;
  };
}

export interface IncomingWebhookResult {
  text: string;
}
