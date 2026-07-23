import pRetry, { AbortError } from 'p-retry';

import { SlackWebhookError, WebhookTriggerHTTPError, WebhookTriggerRequestError } from './errors';
import type { FetchFunction, FetchResponse } from './IncomingWebhook';
import { getUserAgent } from './instrument';
import type { RetryOptions } from './retry-policies';

/**
 * A client for Slack's Workflow Builder webhook triggers
 * @see {@link https://slack.com/help/articles/360041352714-Build-a-workflow--Create-a-workflow-that-starts-outside-of-Slack}
 */
export class WebhookTrigger {
  /**
   * The webhook trigger URL
   */
  private url: string;

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
    defaults: WebhookTriggerDefaultArguments = {
      timeout: 0,
    },
  ) {
    if (!url) {
      throw new Error('Webhook trigger URL is required');
    }

    this.url = url;
    this.fetchFn = defaults.fetch ?? globalThis.fetch;
    this.timeout = defaults.timeout ?? 0;
    this.retryConfig = defaults.retryConfig ?? { retries: 0 };
    this.headers = {
      'User-Agent': getUserAgent(),
    };
  }

  /**
   * Send a payload to the webhook trigger
   * @param payload - arbitrary key-value data to send to the trigger
   */
  public async send(payload: WebhookTriggerSendArguments = {}): Promise<WebhookTriggerResult> {
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
          const httpError = new WebhookTriggerHTTPError(response.status, response.statusText, body);
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
        throw new WebhookTriggerRequestError(error instanceof Error ? error : new Error(String(error)));
      }
    }, this.retryConfig);
  }

  private async buildResult(response: FetchResponse): Promise<WebhookTriggerResult> {
    const text = await response.text();
    try {
      return text ? (JSON.parse(text) as WebhookTriggerResult) : { ok: true };
    } catch {
      return { ok: true };
    }
  }
}

/*
 * Exported types
 */

export interface WebhookTriggerDefaultArguments {
  fetch?: FetchFunction;
  timeout?: number;
  retryConfig?: RetryOptions;
}

export interface WebhookTriggerSendArguments {
  [key: string]: string;
}

export interface WebhookTriggerResult {
  ok: boolean;
  error?: string;
}
