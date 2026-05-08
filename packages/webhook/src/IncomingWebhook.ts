import type { Block, KnownBlock, MessageAttachment } from '@slack/types'; // TODO: Block and KnownBlock will be merged into AnyBlock in upcoming types release

import type { CodedError } from './errors';
import { httpErrorWithOriginal, requestErrorWithOriginal } from './errors';
import { getUserAgent } from './instrument';

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
  signal?: AbortSignal | null;
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
    this.headers = {
      'User-Agent': getUserAgent(),
    };

    // Remove transport options so they don't leak into payloads
    const { fetch: _fetch, timeout: _timeout, ...messageDefaults } = defaults;
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

    const controller = new AbortController();
    const timer = this.timeout > 0 ? setTimeout(() => controller.abort(), this.timeout) : undefined;
    const signal = timer ? controller.signal : undefined;

    try {
      const response = await this.fetchFn(this.url, {
        method: 'POST',
        headers: {
          ...this.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        redirect: 'error',
        ...(signal ? { signal } : {}),
      });

      if (!response.ok) {
        const body = await response.text();
        throw httpErrorWithOriginal(response.status, body);
      }

      return await this.buildResult(response);
    } catch (error) {
      if (error instanceof Error && 'code' in error && typeof (error as CodedError).code === 'string') {
        throw error;
      }
      throw requestErrorWithOriginal(error instanceof Error ? error : new Error(String(error)));
    } finally {
      if (timer) clearTimeout(timer);
    }
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
