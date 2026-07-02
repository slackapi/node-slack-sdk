import type { Agent } from 'node:http';

import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import pRetry, { AbortError } from 'p-retry';

import { httpErrorWithOriginal, requestErrorWithOriginal } from './errors';
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
   * Default arguments for sending to this webhook trigger
   */
  private defaults: WebhookTriggerDefaultArguments;

  /**
   * Axios HTTP client instance used by this client
   */
  private axios: AxiosInstance;

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
    if (url === undefined) {
      throw new Error('Webhook trigger URL is required');
    }

    this.url = url;
    this.defaults = defaults;
    this.retryConfig = defaults.retryConfig ?? { retries: 0 };

    this.axios = axios.create({
      baseURL: url,
      httpAgent: defaults.agent,
      httpsAgent: defaults.agent,
      maxRedirects: 0,
      proxy: false,
      timeout: defaults.timeout,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': getUserAgent(),
      },
    });

    this.defaults.agent = undefined;
  }

  /**
   * Send a payload to the webhook trigger
   * @param payload - arbitrary key-value data to send to the trigger; defaults to an empty object
   */
  public async send(payload: WebhookTriggerSendArguments = {}): Promise<WebhookTriggerResult> {
    // Retries are limited to transient failures: rate limits (429), server
    // errors (5xx), and network errors with no response. Client errors (other
    // 4xx) abort immediately since they will not succeed on retry.
    return pRetry(async () => {
      try {
        const response = await this.axios.post(this.url, payload);
        return this.buildResult(response);
        // biome-ignore lint/suspicious/noExplicitAny: errors can be anything
      } catch (error: any) {
        if (error.response !== undefined) {
          const status: number = error.response.status;
          const retryable = status === 429 || status >= 500;
          const wrapped = httpErrorWithOriginal(error);
          throw retryable ? wrapped : new AbortError(wrapped);
        }
        if (error.request !== undefined) {
          // No response received (network/timeout): retryable.
          throw requestErrorWithOriginal(error);
        }
        throw new AbortError(error);
      }
    }, this.retryConfig);
  }

  /**
   * Processes an HTTP response into a WebhookTriggerResult.
   */
  private buildResult(response: AxiosResponse): WebhookTriggerResult {
    const body = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
    return {
      ok: body.ok ?? true,
      body,
    };
  }
}

/*
 * Exported types
 */

export interface WebhookTriggerDefaultArguments {
  agent?: Agent;
  retryConfig?: RetryOptions;
  timeout?: number;
}

export interface WebhookTriggerSendArguments {
  [key: string]: string;
}

export interface WebhookTriggerResult {
  ok: boolean;
  // biome-ignore lint/suspicious/noExplicitAny: webhook trigger responses are untyped
  body: Record<string, any>;
}
