import type { Agent } from 'node:http';

import axios, { type AxiosInstance } from 'axios';
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
    if (!url) {
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
   * @param payload - arbitrary key-value data to send to the trigger
   */
  public async send(payload: WebhookTriggerSendArguments = {}): Promise<WebhookTriggerResult> {
    return pRetry(async () => {
      try {
        const response = await this.axios.post(this.url, payload);
        return response.data;
        // biome-ignore lint/suspicious/noExplicitAny: errors can be anything
      } catch (error: any) {
        if (error.response !== undefined) {
          const status: number = error.response.status;
          const wrapped = httpErrorWithOriginal(error);
          throw status >= 500 ? wrapped : new AbortError(wrapped);
        }
        if (error.request !== undefined) {
          // No response received (network/timeout): retryable.
          throw requestErrorWithOriginal(error);
        }
        throw new AbortError(error);
      }
    }, this.retryConfig);
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
  error?: string;
}
