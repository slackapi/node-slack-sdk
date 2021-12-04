import { Agent } from 'http';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { MessageAttachment, Block, KnownBlock } from '@slack/types';
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

    delete this.defaults.agent;
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
    } catch (error: any) {
      // Wrap errors in this packages own error types (abstract the implementation details' types)
      if (error.response !== undefined) {
        throw httpErrorWithOriginal(error);
      } else if (error.request !== undefined) {
        throw requestErrorWithOriginal(error);
      } else {
        throw error;
      }
    }
  }

  /**
   * Processes an HTTP response into an IncomingWebhookResult.
   */
  // eslint-disable-next-line class-methods-use-this
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
}

export interface IncomingWebhookResult {
  text: string;
}
