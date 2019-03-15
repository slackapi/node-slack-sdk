import { MessageAttachment } from './methods';
export interface IncomingWebhookDefaultArguments {
    username?: string;
    icon_emoji?: string;
    icon_url?: string;
    channel?: string;
    text?: string;
    link_names?: boolean;
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
export declare class IncomingWebhook {
    /**
     * The webhook URL
     */
    private url;
    /**
     * Default arguments for posting messages with this webhook
     */
    private defaults;
    constructor(url: string, defaults?: IncomingWebhookDefaultArguments);
    /**
     * Send a notification to a conversation
     * @param message the message (a simple string, or an object describing the message)
     * @param callback
     */
    send(message: string | IncomingWebhookSendArguments, callback: IncomingWebhookResultCallback): void;
}
