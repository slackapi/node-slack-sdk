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
   * @param {module:@slack/client/dist/methods.TokenOverridable | module:@slack/client/dist/methods.TokenOverridable} options
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
 * This client provides a function for each {@link https://api.slack.com/methods|Web API method}. They are each
 * a convenience wrapper for calling the {@link WebClient#apiCall} method using the method name as the first parameter.
 * @extends EventEmitter
 * @property {string} [token] Authentication and authorization token for accessing Slack Web API (usually begins with `xoxp`, `xoxb`, or `xoxa`)
 * @property {string} [slackApiUrl] The base URL for reaching Slack's Web API. Consider changing this value for testing purposes.
 * @property {module:@slack/client/dist/WebClient.__object} [api={
    test: (this.apiCall.bind(this, 'api.test')) as Method<methods.APITestArguments>,
  }] api method family
 * @property {module:@slack/client/dist/WebClient.__object} [apps={
    permissions: {
      info: (this.apiCall.bind(this, 'apps.permissions.info')) as Method<methods.AppsPermissionsInfoArguments>,
      request: (this.apiCall.bind(this, 'apps.permissions.request')) as Method<methods.AppsPermissionsRequestArguments>,
    },
  }] apps method family
 * @property {module:@slack/client/dist/WebClient.__object} [auth={
    revoke: (this.apiCall.bind(this, 'auth.revoke')) as Method<methods.AuthRevokeArguments>,
    test: (this.apiCall.bind(this, 'auth.test')) as Method<methods.AuthTestArguments>,
  }] auth method family
 * @property {module:@slack/client/dist/WebClient.__object} [bots={
    info: (this.apiCall.bind(this, 'bots.info')) as Method<methods.BotsInfoArguments>,
  }] bots method family
 * @property {module:@slack/client/dist/WebClient.__object} [channels={
    archive: (this.apiCall.bind(this, 'channels.archive')) as Method<methods.ChannelsArchiveArguments>,
    create: (this.apiCall.bind(this, 'channels.create')) as Method<methods.ChannelsCreateArguments>,
    history: (this.apiCall.bind(this, 'channels.history')) as Method<methods.ChannelsHistoryArguments>,
    info: (this.apiCall.bind(this, 'channels.info')) as Method<methods.ChannelsInfoArguments>,
    invite: (this.apiCall.bind(this, 'channels.invite')) as Method<methods.ChannelsInviteArguments>,
    join: (this.apiCall.bind(this, 'channels.join')) as Method<methods.ChannelsJoinArguments>,
    kick: (this.apiCall.bind(this, 'channels.kick')) as Method<methods.ChannelsKickArguments>,
    leave: (this.apiCall.bind(this, 'channels.leave')) as Method<methods.ChannelsLeaveArguments>,
    list: (this.apiCall.bind(this, 'channels.list')) as Method<methods.ChannelsListArguments>,
    mark: (this.apiCall.bind(this, 'channels.mark')) as Method<methods.ChannelsMarkArguments>,
    rename: (this.apiCall.bind(this, 'channels.rename')) as Method<methods.ChannelsRenameArguments>,
    replies: (this.apiCall.bind(this, 'channels.replies')) as Method<methods.ChannelsRepliesArguments>,
    setPurpose: (this.apiCall.bind(this, 'channels.setPurpose')) as Method<methods.ChannelsSetPurposeArguments>,
    setTopic: (this.apiCall.bind(this, 'channels.setTopic')) as Method<methods.ChannelsSetTopicArguments>,
    unarchive: (this.apiCall.bind(this, 'channels.unarchive')) as Method<methods.ChannelsUnarchiveArguments>,
  }] channels method family
 * @property {module:@slack/client/dist/WebClient.__object} [chat={
    delete: (this.apiCall.bind(this, 'chat.delete')) as Method<methods.ChatDeleteArguments>,
    getPermalink: (this.apiCall.bind(this, 'chat.getPermalink')) as Method<methods.ChatGetPermalinkArguments>,
    meMessage: (this.apiCall.bind(this, 'chat.meMessage')) as Method<methods.ChatMeMessageArguments>,
    postEphemeral: (this.apiCall.bind(this, 'chat.postEphemeral')) as Method<methods.ChatPostEphemeralArguments>,
    postMessage: (this.apiCall.bind(this, 'chat.postMessage')) as Method<methods.ChatPostMessageArguments>,
    unfurl: (this.apiCall.bind(this, 'chat.unfurl')) as Method<methods.ChatUnfurlArguments>,
    update: (this.apiCall.bind(this, 'chat.update')) as Method<methods.ChatUpdateArguments>,
  }] chat method family
 * @property {module:@slack/client/dist/WebClient.__object} [conversations={
    archive: (this.apiCall.bind(this, 'conversations.archive')) as Method<methods.ConversationsArchiveArguments>,
    close: (this.apiCall.bind(this, 'conversations.close')) as Method<methods.ConversationsCloseArguments>,
    create: (this.apiCall.bind(this, 'conversations.create')) as Method<methods.ConversationsCreateArguments>,
    history: (this.apiCall.bind(this, 'conversations.history')) as Method<methods.ConversationsHistoryArguments>,
    info: (this.apiCall.bind(this, 'conversations.info')) as Method<methods.ConversationsInfoArguments>,
    invite: (this.apiCall.bind(this, 'conversations.invite')) as Method<methods.ConversationsInviteArguments>,
    join: (this.apiCall.bind(this, 'conversations.join')) as Method<methods.ConversationsJoinArguments>,
    kick: (this.apiCall.bind(this, 'conversations.kick')) as Method<methods.ConversationsKickArguments>,
    leave: (this.apiCall.bind(this, 'conversations.leave')) as Method<methods.ConversationsLeaveArguments>,
    list: (this.apiCall.bind(this, 'conversations.list')) as Method<methods.ConversationsListArguments>,
    members: (this.apiCall.bind(this, 'conversations.members')) as Method<methods.ConversationsMembersArguments>,
    open: (this.apiCall.bind(this, 'conversations.open')) as Method<methods.ConversationsOpenArguments>,
    rename: (this.apiCall.bind(this, 'conversations.rename')) as Method<methods.ConversationsRenameArguments>,
    replies: (this.apiCall.bind(this, 'conversations.replies')) as Method<methods.ConversationsRepliesArguments>,
    setPurpose:
      (this.apiCall.bind(this, 'conversations.setPurpose')) as Method<methods.ConversationsSetPurposeArguments>,
    setTopic: (this.apiCall.bind(this, 'conversations.setTopic')) as Method<methods.ConversationsSetTopicArguments>,
    unarchive: (this.apiCall.bind(this, 'conversations.unarchive')) as Method<methods.ConversationsUnarchiveArguments>,
  }] conversations method family
 * @property {module:@slack/client/dist/WebClient.__object} [dialog={
    open: (this.apiCall.bind(this, 'dialog.open')) as Method<methods.DialogOpenArguments>,
  }] dialog method family
 * @property {module:@slack/client/dist/WebClient.__object} [dnd={
    endDnd: (this.apiCall.bind(this, 'dnd.endDnd')) as Method<methods.DndEndDndArguments>,
    endSnooze: (this.apiCall.bind(this, 'dnd.endSnooze')) as Method<methods.DndEndSnoozeArguments>,
    info: (this.apiCall.bind(this, 'dnd.info')) as Method<methods.DndInfoArguments>,
    setSnooze: (this.apiCall.bind(this, 'dnd.setSnooze')) as Method<methods.DndSetSnoozeArguments>,
    teamInfo: (this.apiCall.bind(this, 'dnd.teamInfo')) as Method<methods.DndTeamInfoArguments>,
  }] dnd method family
 * @property {module:@slack/client/dist/WebClient.__object} [emoji={
    list: (this.apiCall.bind(this, 'emoji.list')) as Method<methods.EmojiListArguments>,
  }] emoji method family
 * @property {module:@slack/client/dist/WebClient.__object} [files={
    delete: (this.apiCall.bind(this, 'files.delete')) as Method<methods.FilesDeleteArguments>,
    info: (this.apiCall.bind(this, 'files.info')) as Method<methods.FilesInfoArguments>,
    list: (this.apiCall.bind(this, 'files.list')) as Method<methods.FilesListArguments>,
    revokePublicURL:
      (this.apiCall.bind(this, 'files.revokePublicURL')) as Method<methods.FilesRevokePublicURLArguments>,
    sharedPublicURL:
      (this.apiCall.bind(this, 'files.sharedPublicURL')) as Method<methods.FilesSharedPublicURLArguments>,
    upload: (this.apiCall.bind(this, 'files.upload')) as Method<methods.FilesUploadArguments>,
    comments: {
      add: (this.apiCall.bind(this, 'files.comments.add')) as Method<methods.FilesCommentsAddArguments>,
      delete: (this.apiCall.bind(this, 'files.comments.delete')) as Method<methods.FilesCommentsDeleteArguments>,
      edit: (this.apiCall.bind(this, 'files.comments.edit')) as Method<methods.FilesCommentsEditArguments>,
    },
  }] files method family
 * @property {module:@slack/client/dist/WebClient.__object} [groups={
    archive: (this.apiCall.bind(this, 'groups.archive')) as Method<methods.GroupsArchiveArguments>,
    create: (this.apiCall.bind(this, 'groups.create')) as Method<methods.GroupsCreateArguments>,
    createChild: (this.apiCall.bind(this, 'groups.createChild')) as Method<methods.GroupsCreateChildArguments>,
    history: (this.apiCall.bind(this, 'groups.history')) as Method<methods.GroupsHistoryArguments>,
    info: (this.apiCall.bind(this, 'groups.info')) as Method<methods.GroupsInfoArguments>,
    invite: (this.apiCall.bind(this, 'groups.invite')) as Method<methods.GroupsInviteArguments>,
    kick: (this.apiCall.bind(this, 'groups.kick')) as Method<methods.GroupsKickArguments>,
    leave: (this.apiCall.bind(this, 'groups.leave')) as Method<methods.GroupsLeaveArguments>,
    list: (this.apiCall.bind(this, 'groups.list')) as Method<methods.GroupsListArguments>,
    mark: (this.apiCall.bind(this, 'groups.mark')) as Method<methods.GroupsMarkArguments>,
    open: (this.apiCall.bind(this, 'groups.open')) as Method<methods.GroupsOpenArguments>,
    rename: (this.apiCall.bind(this, 'groups.rename')) as Method<methods.GroupsRenameArguments>,
    replies: (this.apiCall.bind(this, 'groups.replies')) as Method<methods.GroupsRepliesArguments>,
    setPurpose: (this.apiCall.bind(this, 'groups.setPurpose')) as Method<methods.GroupsSetPurposeArguments>,
    setTopic: (this.apiCall.bind(this, 'groups.setTopic')) as Method<methods.GroupsSetTopicArguments>,
    unarchive: (this.apiCall.bind(this, 'groups.unarchive')) as Method<methods.GroupsUnarchiveArguments>,
  }] groups method family
 * @property {module:@slack/client/dist/WebClient.__object} [im={
    close: (this.apiCall.bind(this, 'im.close')) as Method<methods.IMCloseArguments>,
    history: (this.apiCall.bind(this, 'im.history')) as Method<methods.IMHistoryArguments>,
    list: (this.apiCall.bind(this, 'im.list')) as Method<methods.IMListArguments>,
    mark: (this.apiCall.bind(this, 'im.mark')) as Method<methods.IMMarkArguments>,
    open: (this.apiCall.bind(this, 'im.open')) as Method<methods.IMOpenArguments>,
    replies: (this.apiCall.bind(this, 'im.replies')) as Method<methods.IMRepliesArguments>,
  }] im method family
 * @property {module:@slack/client/dist/WebClient.__object} [migration={
    exchange: (this.apiCall.bind(this, 'migration.exchange')) as Method<methods.MigrationExchangeArguments>,
  }] migration method family
 * @property {module:@slack/client/dist/WebClient.__object} [mpim={
    close: (this.apiCall.bind(this, 'mpim.close')) as Method<methods.MPIMCloseArguments>,
    history: (this.apiCall.bind(this, 'mpim.history')) as Method<methods.MPIMHistoryArguments>,
    list: (this.apiCall.bind(this, 'mpim.list')) as Method<methods.MPIMListArguments>,
    mark: (this.apiCall.bind(this, 'mpim.mark')) as Method<methods.MPIMMarkArguments>,
    open: (this.apiCall.bind(this, 'mpim.open')) as Method<methods.MPIMOpenArguments>,
    replies: (this.apiCall.bind(this, 'mpim.replies')) as Method<methods.MPIMRepliesArguments>,
  }] mpim method family
 * @property {module:@slack/client/dist/WebClient.__object} [oauth={
    access: (this.apiCall.bind(this, 'oauth.access')) as Method<methods.OAuthAccessArguments>,
    token: (this.apiCall.bind(this, 'oauth.token')) as Method<methods.OAuthTokenArguments>,
  }] oauth method family
 * @property {module:@slack/client/dist/WebClient.__object} [pins={
    add: (this.apiCall.bind(this, 'pins.add')) as Method<methods.PinsAddArguments>,
    list: (this.apiCall.bind(this, 'pins.list')) as Method<methods.PinsListArguments>,
    remove: (this.apiCall.bind(this, 'pins.remove')) as Method<methods.PinsRemoveArguments>,
  }] pins method family
 * @property {module:@slack/client/dist/WebClient.__object} [reactions={
    add: (this.apiCall.bind(this, 'reactions.add')) as Method<methods.ReactionsAddArguments>,
    get: (this.apiCall.bind(this, 'reactions.get')) as Method<methods.ReactionsGetArguments>,
    list: (this.apiCall.bind(this, 'reactions.list')) as Method<methods.ReactionsListArguments>,
    remove: (this.apiCall.bind(this, 'reactions.remove')) as Method<methods.ReactionsRemoveArguments>,
  }] reactions method family
 * @property {module:@slack/client/dist/WebClient.__object} [reminders={
    add: (this.apiCall.bind(this, 'reminders.add')) as Method<methods.RemindersAddArguments>,
    complete: (this.apiCall.bind(this, 'reminders.complete')) as Method<methods.RemindersCompleteArguments>,
    delete: (this.apiCall.bind(this, 'reminders.delete')) as Method<methods.RemindersDeleteArguments>,
    info: (this.apiCall.bind(this, 'reminders.info')) as Method<methods.RemindersInfoArguments>,
    list: (this.apiCall.bind(this, 'reminders.list')) as Method<methods.RemindersListArguments>,
  }] reminders method family
 * @property {module:@slack/client/dist/WebClient.__object} [rtm={
    connect: (this.apiCall.bind(this, 'rtm.connect')) as Method<methods.RTMConnectArguments>,
    start: (this.apiCall.bind(this, 'rtm.start')) as Method<methods.RTMStartArguments>,
  }] rtm method family
 * @property {module:@slack/client/dist/WebClient.__object} [search={
    all: (this.apiCall.bind(this, 'search.all')) as Method<methods.SearchAllArguments>,
    files: (this.apiCall.bind(this, 'search.files')) as Method<methods.SearchFilesArguments>,
    messages: (this.apiCall.bind(this, 'search.messages')) as Method<methods.SearchMessagesArguments>,
  }] search method family
 * @property {module:@slack/client/dist/WebClient.__object} [stars={
    add: (this.apiCall.bind(this, 'stars.add')) as Method<methods.StarsAddArguments>,
    list: (this.apiCall.bind(this, 'stars.list')) as Method<methods.StarsListArguments>,
    remove: (this.apiCall.bind(this, 'stars.remove')) as Method<methods.StarsRemoveArguments>,
  }] stars method family
 * @property {module:@slack/client/dist/WebClient.__object} [team={
    accessLogs: (this.apiCall.bind(this, 'team.accessLogs')) as Method<methods.TeamAccessLogsArguments>,
    billableInfo: (this.apiCall.bind(this, 'team.billableInfo')) as Method<methods.TeamBillableInfoArguments>,
    info: (this.apiCall.bind(this, 'team.info')) as Method<methods.TeamInfoArguments>,
    integrationLogs: (this.apiCall.bind(this, 'team.integrationLogs')) as Method<methods.TeamIntegrationLogsArguments>,
    profile: {
      get: (this.apiCall.bind(this, 'team.profile.get')) as Method<methods.TeamProfileGetArguments>,
    },
  }] team method family
 * @property {module:@slack/client/dist/WebClient.__object} [usergroups={
    create: (this.apiCall.bind(this, 'usergroups.create')) as Method<methods.UsergroupsCreateArguments>,
    disable: (this.apiCall.bind(this, 'usergroups.disable')) as Method<methods.UsergroupsDisableArguments>,
    enable: (this.apiCall.bind(this, 'usergroups.enable')) as Method<methods.UsergroupsEnableArguments>,
    list: (this.apiCall.bind(this, 'usergroups.list')) as Method<methods.UsergroupsListArguments>,
    update: (this.apiCall.bind(this, 'usergroups.update')) as Method<methods.UsergroupsUpdateArguments>,
    users: {
      list: (this.apiCall.bind(this, 'usergroups.users.list')) as Method<methods.UsergroupsUsersListArguments>,
      update: (this.apiCall.bind(this, 'usergroups.users.update')) as Method<methods.UsergroupsUsersUpdateArguments>,
    },
  }] usergroups method family
 * @property {module:@slack/client/dist/WebClient.__object} [users={
    deletePhoto: (this.apiCall.bind(this, 'users.deletePhoto')) as Method<methods.UsersDeletePhotoArguments>,
    getPresence: (this.apiCall.bind(this, 'users.getPresence')) as Method<methods.UsersGetPresenceArguments>,
    identity: (this.apiCall.bind(this, 'users.identity')) as Method<methods.UsersIdentityArguments>,
    info: (this.apiCall.bind(this, 'users.info')) as Method<methods.UsersInfoArguments>,
    list: (this.apiCall.bind(this, 'users.list')) as Method<methods.UsersListArguments>,
    lookupByEmail: (this.apiCall.bind(this, 'users.lookupByEmail')) as Method<methods.UsersLookupByEmailArguments>,
    setActive: (this.apiCall.bind(this, 'users.setActive')) as Method<methods.UsersSetActiveArguments>,
    setPhoto: (this.apiCall.bind(this, 'users.setPhoto')) as Method<methods.UsersSetPhotoArguments>,
    setPresence: (this.apiCall.bind(this, 'users.setPresence')) as Method<methods.UsersSetPresenceArguments>,
    profile: {
      get: (this.apiCall.bind(this, 'users.profile.get')) as Method<methods.UsersProfileGetArguments>,
      set: (this.apiCall.bind(this, 'users.profile.set')) as Method<methods.UsersProfileSetArguments>,
    },
  }] users method family
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
