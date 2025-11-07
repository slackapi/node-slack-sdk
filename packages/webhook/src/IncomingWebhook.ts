import type { AnyBlock, MessageAttachment, MessageMetadata } from '@slack/types';
import { httpErrorWithOriginal, requestErrorWithOriginal } from './errors.js';
import { getUserAgent } from './instrument.js';

/**
 * @description A client to send messages with Slack incoming webhooks.
 * @see {@link https://docs.slack.dev/messaging/sending-messages-using-incoming-webhooks}
 */
export class IncomingWebhook {
  /**
   * @description The webhook URL.
   */
  private url: string;

  /**
   * @description Default arguments for posting messages with this webhook.
   */
  private defaults: IncomingWebhookSendArguments;

  /**
   * @description A method to send requests.
   * @see {@link https://github.com/nodejs/undici/discussions/2167}
   */
  private fetch: typeof globalThis.fetch;

  /**
   * @param url The URL of the incoming webhook.
   * @param configuration Options and default arguments used when sending a message.
   */
  public constructor(url: string, configuration: IncomingWebhookOptions & IncomingWebhookSendArguments = {}) {
    const { fetch, ...defaults } = configuration;
    this.defaults = defaults;
    this.fetch = fetch || globalThis.fetch;
    this.url = url;
  }

  /**
   * Send a notification to a conversation.
   * @param message - the message (a simple string, or an object describing the message)
   */
  public async send(message: string | IncomingWebhookSendArguments): Promise<IncomingWebhookResult> {
    let payload: IncomingWebhookSendArguments = {
      ...this.defaults,
    };
    if (typeof message === 'string') {
      payload.text = message;
    } else {
      payload = Object.assign(payload, message);
    }
    try {
      const response = await this.fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': getUserAgent(),
        },
        body: JSON.stringify(payload),
      });
      const text = await response.text();
      const result = {
        text,
      };
      return result;
      // biome-ignore lint/suspicious/noExplicitAny: errors can be anything
    } catch (error: any) {
      // Wrap errors in this packages own error types (abstract the implementation details' types)
      if (error.response !== undefined) {
        throw httpErrorWithOriginal(error);
      }
      if (error.request !== undefined || error.code) {
        throw requestErrorWithOriginal(error);
      }
      throw error;
    }
  }
}

/**
 * @description Configuration options used to send incoming webhooks.
 */
export interface IncomingWebhookOptions {
  /**
   * @description A method to send requests.
   * @see {@link https://github.com/nodejs/undici/discussions/2167}
   */
  fetch?: typeof globalThis.fetch;
}

/**
 * @description Arguments to use when sending a message using an incoming webhook.
 * @see {@link https://docs.slack.dev/messaging/sending-messages-using-incoming-webhooks}
 */
export interface IncomingWebhookSendArguments {
  /**
   * @description Add {@link https://docs.slack.dev/messaging/formatting-message-text#attachments secondary attachments} to your messages in Slack. Message attachments are considered a legacy part of messaging functionality. They are not deprecated per se, but they may change in the future, in ways that reduce their visibility or utility. We recommend moving to Block Kit instead. Read more about {@link https://docs.slack.dev/messaging/formatting-message-text#attachments when to use message attachments}.
   * @see {@link https://docs.slack.dev/messaging/formatting-message-text#attachmentsSecondary message attachments reference documentation}
   */
  attachments?: MessageAttachment[];
  /**
   * @description Add {@link https://docs.slack.dev/block-kit/ blocks} as a visual components to arrange message layouts.
   * @see {@link https://docs.slack.dev/messaging/formatting-message-text/#rich-layouts}
   * @see {@link https://docs.slack.dev/block-kit/}
   * @see {@link https://docs.slack.dev/block-kit/formatting-with-rich-text/}
   */
  blocks?: AnyBlock[];
  /**
   * @description Text to send to the incoming webhook. Formatted as {@link https://docs.slack.dev/messaging/formatting-message-text/#basic-formatting mrkdwn}.
   * @see {@link https://docs.slack.dev/messaging/formatting-message-text/}
   */
  text?: string;
  /**
   * @description Pass `true` to enable unfurling of primarily text-based content.
   * @default false
   * @see {@link https://docs.slack.dev/messaging/unfurling-links-in-messages#classic_unfurl}
   */
  unfurl_links?: boolean;
  /**
   * @description Pass `false` to disable unfurling of media content.
   * @default true
   * @see {@link https://docs.slack.dev/messaging/unfurling-links-in-messages#classic_unfurl}
   **/
  unfurl_media?: boolean;
  /**
   * @description Object representing message metadata, which will be made accessible to any user or app.
   * @see {@link https://docs.slack.dev/messaging/message-metadata/}
   **/
  metadata?: MessageMetadata;
}

/**
 * The result from a posted incoming webhook.
 * @example {text:"ok"}
 * @see {@link https://docs.slack.dev/messaging/sending-messages-using-incoming-webhooks/#handling_errors}.
 */
export interface IncomingWebhookResult {
  text: string;
}
