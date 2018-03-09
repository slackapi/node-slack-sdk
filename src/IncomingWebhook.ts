import got = require('got'); // tslint:disable-line:no-require-imports
import { MessageAttachment } from './methods';
import { callbackify } from './util';

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

export interface IncomingWebhookResultCallback {
  (error: Error): void;
}

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
  public send(message: string | IncomingWebhookSendArguments, callback: IncomingWebhookResultCallback): void {
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
    }).then(() => {
      return;
    });

    callbackify(implementation)(callback);
  }
}
