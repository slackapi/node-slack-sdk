import type { Agent } from 'node:http';

import type { Block, KnownBlock, MessageAttachment } from '@slack/types'; // TODO: Block and KnownBlock will be merged into AnyBlock in upcoming types release
import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

import { httpErrorWithOriginal, requestErrorWithOriginal } from './errors';
import { getUserAgent } from './instrument';

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
    this.defaults = defaults;

    this.axios = axios.create({
      baseURL: url,
      httpAgent: defaults.agent,
      httpsAgent: defaults.agent,
      maxRedirects: 0,
      proxy: false,
      timeout: defaults.timeout,
      headers: {
        'User-Agent': getUserAgent(),
      },
    });

    this.defaults.agent = undefined;
  }

  /**
   * Send a notification to a conversation
   * @param message - the message (a simple string, or an object describing the message)
   */
  public async send(message: string | IncomingWebhookSendArguments): Promise<IncomingWebhookResult> {
    // NOTE: no support for TLS config
    let payload: IncomingWebhookSendArguments = { ...this.defaults };

    if (typeof message === 'string') {
      payload.text = message;
    } else {
      payload = Object.assign(payload, message);
    }

    try {
      const response = await this.axios.post(this.url, payload);
      return this.buildResult(response);
      // biome-ignore lint/suspicious/noExplicitAny: errors can be anything
    } catch (error: any) {
      // Wrap errors in this packages own error types (abstract the implementation details' types)
      if (error.response !== undefined) {
        throw httpErrorWithOriginal(error);
      }
      if (error.request !== undefined) {
        throw requestErrorWithOriginal(error);
      }
      throw error;
    }
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
  icon_emoji?: string;
  icon_url?: string;
  channel?: string;
  text?: string;
  link_names?: boolean;
  agent?: Agent;
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
