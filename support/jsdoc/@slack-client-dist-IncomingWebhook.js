/** 
 * @module @slack/client/dist/IncomingWebhook
 */

/**
 * @interface module:@slack/client/dist/IncomingWebhook.IncomingWebhookHTTPError
 * @extends module:@slack/client.CodedError
 * @property {"slackclient_incomingwebhook_http_error"} code
 * @property {Error} original
 */
export class IncomingWebhookHTTPError {
}

/**
 * @interface module:@slack/client/dist/IncomingWebhook.IncomingWebhookReadError
 * @extends module:@slack/client.CodedError
 * @property {"slackclient_incomingwebhook_read_error"} code
 * @property {Error} original
 */
export class IncomingWebhookReadError {
}

/**
 * @interface module:@slack/client/dist/IncomingWebhook.IncomingWebhookRequestError
 * @extends module:@slack/client.CodedError
 * @property {"slackclient_incomingwebhook_request_error"} code
 * @property {Error} original
 */
export class IncomingWebhookRequestError {
}

/**
 * @interface module:@slack/client/dist/IncomingWebhook.IncomingWebhookResult
 * @property {string} text
 */
export class IncomingWebhookResult {
}

