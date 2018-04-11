/**
 * @module @slack/client
 */

/**
 * * A dictionary of codes for errors produced by this package
 * @enum {number}
 * @property TestError
 * @property RequestError
 * @property ReadError
 * @property HTTPError
 * @property PlatformError
 * @property RTMSendWhileDisconnectedError
 * @property RTMSendWhileNotReadyError
 * @property RTMSendMessagePlatformError
 * @property RTMWebsocketError
 * @property RTMNoReplyReceivedError
 * @property KeepAliveConfigError
 * @property KeepAliveClientNotConnected
 * @property KeepAliveInconsistentState
 * @property IncomingWebhookRequestError
 * @property IncomingWebhookReadError
 * @property IncomingWebhookHTTPError
 */
export var ErrorCode
/**
 * * Severity levels for log entries
 * @enum {number}
 * @property ERROR
 * @property WARN
 * @property INFO
 * @property DEBUG
 */
export var LogLevel
/**
 * All errors produced by this package adhere to this interface
 * @interface module:@slack/client.CodedError
 * @extends NodeJS:ErrnoException
 * @property {module:@slack/client/dist/errors.ErrorCode} code
 * @property {module:@slack/client.WebAPICallResult | module:@slack/client.RTMCallResult} [data]
 */
export class CodedError {
}

/**
 * A client for Slack's Incoming Webhooks
 */
export class IncomingWebhook {
  /**
   * Send a notification to a conversation
   * @param {string | module:@slack/client.IncomingWebhookSendArguments} message the message (a simple string, or an object describing the message)
   * @function module:@slack/client.IncomingWebhook#send
   * @returns {Promise<module:@slack/client/dist/IncomingWebhook.IncomingWebhookResult>}
   */
  send() {}

  /**
   * @param {string | module:@slack/client.IncomingWebhookSendArguments} message
   * @param {module:@slack/client.IncomingWebhookResultCallback} callback
   * @function module:@slack/client.IncomingWebhook#send
   */
  send() {}

  /**
   * @param {string | module:@slack/client.IncomingWebhookSendArguments} message
   * @param {module:@slack/client.IncomingWebhookResultCallback} callback
   * @function module:@slack/client.IncomingWebhook#send
   */
  send() {}
}

/**
 * @interface module:@slack/client.IncomingWebhookDefaultArguments
 * @property {string} [username]
 * @property {string} [icon_emoji]
 * @property {string} [icon_url]
 * @property {string} [channel]
 * @property {string} [text]
 * @property {boolean} [link_names]
 */
export class IncomingWebhookDefaultArguments {
}

/**
 * @interface module:@slack/client.IncomingWebhookResultCallback
 */
export class IncomingWebhookResultCallback {
}

/**
 * @interface module:@slack/client.IncomingWebhookSendArguments
 * @extends module:@slack/client.IncomingWebhookDefaultArguments
 * @property {Array<module:@slack/client/dist/methods.MessageAttachment>} [attachments]
 * @property {boolean} [unfurl_links]
 * @property {boolean} [unful_media]
 */
export class IncomingWebhookSendArguments {
}

/**
 * Interface for functions where this package's logs can be re-routed (the default is to use stdout)
 * @interface module:@slack/client.LoggingFunc
 */
export class LoggingFunc {
}

/**
 * @interface module:@slack/client.RetryOptions
 * @extends module:node_modules/@types/retry/index.OperationOptions
 */
export class RetryOptions {
}

/**
 * @interface module:@slack/client.RTMCallResult
 * @property {string} ts
 * @property {number} [reply_to]
 * @property {Object.<string, any>} [error]
 */
export class RTMCallResult {
}

/**
 * @interface module:@slack/client.RTMCallResultCallback
 */
export class RTMCallResultCallback {
}

/**
 * An RTMClient allows programs to communicate with the {@link https://api.slack.com/rtm|Slack Platform's RTM API}.
 * This object uses the EventEmitter pattern to dispatch incoming events and has several methods for sending outgoing
 * messages.
 * @extends EventEmitter
 * @property {boolean} [connected=false] Whether or not the client is currently connected to the RTM API
 * @property {boolean} [authenticated=false] Whether or not the client has authenticated to the RTM API. This occurs when the connect method completes, and a WebSocket URL is available for the client's connection.
 * @property {string} [activeUserId] The user ID for the connected client.
 * @property {string} [activeTeamId] The team ID for the workspace the client is connected to.
 */
export class RTMClient {
  /**
   * @param {boolean} awaitReply
   * @param {string} type
   * @param {Object.<string, any>} body
   * @function module:@slack/client.RTMClient#addOutgoingEvent
   * @returns {Promise<void | module:@slack/client.RTMCallResult>}
   */
  addOutgoingEvent() {}

  /**
   * Generic method for sending an outgoing message of an arbitrary type. This method guards the higher-level methods
   * from concern of which state the client is in, because it places all messages into a queue. The tasks on the queue
   * will buffer until the client is in a state where they can be sent.
   *
   * If the awaitReply parameter is set to true, then the returned Promise is resolved with the platform's
   * acknowledgement response. Not all message types will result in an acknowledgement response, so use this carefully.
   * This promise may be rejected with an error containing code=RTMNoReplyReceivedError if the client disconnects or
   * reconnects before recieving the acknowledgement response.
   *
   * If the awaitReply parameter is set to false, then the returned Promise is resolved as soon as the message is sent
   * from the websocket.
   * @param {"undefined"} awaitReply whether to wait for an acknowledgement response from the platform before resolving the returned
Promise.
   * @param {string} type the message type
   * @param {Object.<string, any>} body the message body
   * @function module:@slack/client.RTMClient#addOutgoingEvent
   * @returns {Promise<module:@slack/client.RTMCallResult>}
   */
  addOutgoingEvent() {}

  /**
   * @param {"undefined"} awaitReply
   * @param {string} type
   * @param {Object.<string, any>} body
   * @function module:@slack/client.RTMClient#addOutgoingEvent
   * @returns {Promise<void>}
   */
  addOutgoingEvent() {}

  /**
   * End an RTM session. After this method is called no messages will be sent or received unless you call
   * start() again later.
   * @function module:@slack/client.RTMClient#disconnect
   */
  disconnect() {}

  /**
   * Generic method for sending an outgoing message of an arbitrary type. The main difference between this method and
   * addOutgoingEvent() is that this method does not use a queue so it can only be used while the client is ready
   * to send messages (in the 'ready' substate of the 'connected' state). It returns a Promise for the message ID of the
   * sent message. This is an internal ID and generally shouldn't be used as an identifier for messages (for that,
   * there is `ts` on messages once the server acknowledges it).
   * @param {string} type the message type
   * @param body the message body
   * @function module:@slack/client.RTMClient#send
   * @returns {Promise<number>}
   */
  send() {}

  /**
   * Send a simple message to a public channel, private channel, DM, or MPDM.
   * @param {string} text The message text.
   * @param {string} conversationId A conversation ID for the destination of this message.
   * @function module:@slack/client.RTMClient#sendMessage
   * @returns {Promise<module:@slack/client.RTMCallResult>}
   */
  sendMessage() {}

  /**
   * @param {string} text
   * @param {string} conversationId
   * @param {module:@slack/client.RTMCallResultCallback} callback
   * @function module:@slack/client.RTMClient#sendMessage
   */
  sendMessage() {}

  /**
   * @param {string} text
   * @param {string} conversationId
   * @param {module:@slack/client.RTMCallResultCallback} callback
   * @function module:@slack/client.RTMClient#sendMessage
   */
  sendMessage() {}

  /**
   * Sends a typing indicator to indicate that the user with `activeUserId` is typing.
   * @param {string} conversationId The destination for where the typing indicator should be shown.
   * @function module:@slack/client.RTMClient#sendTyping
   * @returns {Promise<void>}
   */
  sendTyping() {}

  /**
   * Begin an RTM session using the provided options. This method must be called before any messages can
   * be sent or received.
   * @param {module:@slack/client/dist/methods.TokenOverridable | module:@slack/client/dist/methods.LocaleAware | module:@slack/client/dist/methods.__type | module:@slack/client/dist/methods.TokenOverridable | module:@slack/client/dist/methods.__type} options
   * @function module:@slack/client.RTMClient#start
   */
  start() {}

  /**
   * Subscribes this client to presence changes for only the given `userIds`.
   * @param {Array<string>} userIds An array of user IDs whose presence you are interested in. This list will replace the list from any
previous calls to this method.
   * @function module:@slack/client.RTMClient#subscribePresence
   * @returns {Promise<void>}
   */
  subscribePresence() {}
}

/**
 * @interface module:@slack/client.RTMClientOptions
 * @property {string} [slackApiUrl]
 * @property {module:@slack/client.LoggingFunc} [logger]
 * @property {module:@slack/client/dist/logger.LogLevel} [logLevel]
 * @property {module:@slack/client.RetryOptions} [retryConfig]
 * @property {module:http.Agent} [agent]
 * @property {boolean} [autoReconnect]
 * @property {boolean} [useRtmConnect]
 * @property {number} [clientPingTimeout]
 * @property {number} [serverPongTimeout]
 * @property {number} [replyAckOnReconnectTimeout]
 * @property {module:@slack/client.TLSOptions} [tls]
 */
export class RTMClientOptions {
}

/**
 * @interface module:@slack/client.RTMPlatformError
 * @extends module:@slack/client.CodedError
 * @property {"slackclient_rtmclient_send_message_platform_error"} code
 */
export class RTMPlatformError {
}

/**
 * @interface module:@slack/client.RTMWebsocketError
 * @extends module:@slack/client.CodedError
 * @property {"slackclient_rtmclient_websocket_error"} code
 * @property {Error} original
 */
export class RTMWebsocketError {
}

/**
 * @interface module:@slack/client.TLSOptions
 * @property {string | Buffer | Array<string | Object | Buffer>} [pfx]
 * @property {string | Buffer | Array<Object | Buffer>} [key]
 * @property {string} [passphrase]
 * @property {string | Buffer | Array<string | Buffer>} [cert]
 * @property {string | Buffer | Array<string | Buffer>} [ca]
 */
export class TLSOptions {
}

/**
 * @interface module:@slack/client.WebAPICallOptions
 */
export class WebAPICallOptions {
}

/**
 * @interface module:@slack/client.WebAPICallResult
 * @property {boolean} ok
 * @property {string} [error]
 * @property {Array<string>} [scopes]
 * @property {Array<string>} [acceptedScopes]
 * @property {number} [retryAfter]
 * @property {Object.<string, any>} [response_metadata]
 */
export class WebAPICallResult {
}

/**
 * @interface module:@slack/client.WebAPIHTTPError
 * @extends module:@slack/client.CodedError
 * @property {"slackclient_http_error"} code
 * @property {Error} original
 */
export class WebAPIHTTPError {
}

/**
 * @interface module:@slack/client.WebAPIPlatformError
 * @extends module:@slack/client.CodedError
 * @property {"slackclient_platform_error"} code
 * @property {module:@slack/client.WebAPICallResult | module:@slack/client/dist/WebClient.__type} data
 */
export class WebAPIPlatformError {
}

/**
 * @interface module:@slack/client.WebAPIReadError
 * @extends module:@slack/client.CodedError
 * @property {"slackclient_read_error"} code
 * @property {Error} original
 */
export class WebAPIReadError {
}

/**
 * @interface module:@slack/client.WebAPIRequestError
 * @extends module:@slack/client.CodedError
 * @property {"slackclient_request_error"} code
 * @property {Error} original
 */
export class WebAPIRequestError {
}

/**
 * @interface module:@slack/client.WebAPIResultCallback
 */
export class WebAPIResultCallback {
}

/**
 * A client for Slack's Web API
 *
 * This client provides an alias for each {@link https://api.slack.com/methods|Web API method}. Each method is
 * a convenience wrapper for calling the {@link WebClient#apiCall} method using the method name as the first parameter.
 * @extends EventEmitter
 * @property {string} [token] Authentication and authorization token for accessing Slack Web API (usually begins with `xoxp`, `xoxb`, or `xoxa`)
 * @property {string} [slackApiUrl] The base URL for reaching Slack's Web API. Consider changing this value for testing purposes.
 */
export class WebClient {
  /**
   * Generic method for calling a Web API method
   * @param {string} method the Web API method to call {@see https://api.slack.com/methods}
   * @param {module:@slack/client.WebAPICallOptions} options options
   * @function module:@slack/client.WebClient#apiCall
   * @returns {Promise<module:@slack/client.WebAPICallResult>}
   */
  apiCall() {}

  /**
   * @param {string} method
   * @param {module:@slack/client.WebAPICallOptions} options
   * @param {module:@slack/client.WebAPIResultCallback} callback
   * @function module:@slack/client.WebClient#apiCall
   */
  apiCall() {}

  /**
   * @param {string} method
   * @param {module:@slack/client.WebAPICallOptions} options
   * @param {module:@slack/client.WebAPIResultCallback} callback
   * @function module:@slack/client.WebClient#apiCall
   */
  apiCall() {}
}

/**
 * @interface module:@slack/client.WebClientOptions
 * @property {string} [slackApiUrl]
 * @property {module:@slack/client.LoggingFunc} [logger]
 * @property {module:@slack/client/dist/logger.LogLevel} [logLevel]
 * @property {number} [maxRequestConcurrency]
 * @property {module:@slack/client.RetryOptions} [retryConfig]
 * @property {"undefined" | "undefined" | module:http.Agent | module:@slack/client/dist/util.__type} [agent]
 * @property {module:@slack/client.TLSOptions} [tls]
 */
export class WebClientOptions {
}

/**
 * Appends the app metadata into the User-Agent value
 * @param {Object.<string, any>} undefined
 */
export function addAppMetadata() {}
