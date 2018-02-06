/**
 * See [the RTM client events](../events/client) for details of the client event lifecycle.
 */

var Promise = require('bluebird');
var bind = require('lodash').bind;
var cloneDeep = require('lodash').cloneDeep;
var includes = require('lodash').includes;
var hasKey = require('lodash').has;
var inherits = require('inherits');
var isFunction = require('lodash').isFunction;
var isUndefined = require('lodash').isUndefined;
var forEach = require('lodash').forEach;
var noop = require('lodash').noop;
var keys = require('lodash').keys;

var RTM_API_EVENTS = require('../events/rtm').EVENTS;
var RTM_CLIENT_INTERNAL_EVENT_TYPES = [
  'pong',
  RTM_API_EVENTS.HELLO,
  RTM_API_EVENTS.TEAM_MIGRATION_STARTED
];
var UNRECOVERABLE_RTM_START_ERRS = [
  'not_authed',
  'invalid_auth',
  'account_inactive',
  'user_removed_from_team',
  'team_disabled'
];
var CLIENT_EVENTS = require('../events/client').RTM;
var BaseAPIClient = require('../client');
var DataStore = require('../../data-store/data-store');
var MemoryDataStore = require('../../data-store/memory-data-store');
var RtmFacet = require('../web/facets').RtmFacet;
var ChatFacet = require('../web/facets').ChatFacet;
var SlackRTMSendError = require('../errors').SlackRTMSendError;
var makeMessageEventWithSubtype = require('../events/utils').makeMessageEventWithSubtype;
var wsSocketFn = require('../transports/ws');
var retryPolicyFromOptions = require('../retry-policies').retryPolicyFromOptions;

/**
 * Creates a new instance of RTM client.
 * @param {string} token - The token to use for connecting
 * @param {Object} [opts]
 * @param {RTMClient~socketFn} [opts.socketFn] - A function to call, passing in a websocket URL,
 * that should return a websocket instance connected to that URL
 * @param {SlackDataStore|null|false} [opts.dataStore] - A store to cache Slack info. Recommended
 * value is `false`. Default value is an instance of {@link SlackMemoryDataStore}.
 * @param {boolean} [opts.autoReconnect=true] - Whether or not to automatically reconnect when the
 * connection closes
 * @param {boolean} [opts.useRtmConnect=false] - Whether to use rtm.connect rather than rtm.start.
 * Recommended value is `true`.
 * @param {Object} [opts.retryConfig] - The retry policy to use, defaults to forever with
 * exponential backoff, see {@link https://github.com/SEAPUNK/node-retry|node-retry} for more details.
 * @param {number} [opts.maxReconnectionAttempts] - DEPRECATED: Use retryConfig instead
 * @param {number} [opts.reconnectionBackoff] - DEPRECATED: Use retryConfig instead
 * @param {number} [opts.wsPingInterval=5000] - The time (in ms) to wait between pings with the
 * server
 * @param {number} [opts.maxPongInterval] - The max time (in ms) to wait for a pong before
 * reconnecting
 * @param {string} [opts.logLevel=info] - The log level for the logger
 * @param {RTMClient~logFn} [opts.logger] - Function to use for log calls, takes
 * (logLevel, logString) parameters
 * @constructor
 */
function RTMClient(token, opts) {
  var clientOpts = opts || {};

  // Force the max request concurrency to 1 for the RTM client. This is because it should not be
  // trying to rtm.start in parallel.
  clientOpts.maxRequestConcurrency = 1;

  // Migrate deprecated parameters to a retry policy.
  if (!clientOpts.retryConfig) {
    clientOpts.retryConfig = retryPolicyFromOptions(clientOpts);
  }

  BaseAPIClient.call(this, token, clientOpts);

  /**
   * @type {Function}
   */
  this._socketFn = clientOpts.socketFn || wsSocketFn.factory(this.logger);

  /**
   * The active websocket.
   * @type {Object}
   */
  this.ws = undefined;

  /**
   *
   * @type {number}
   * @private
   */
  this._messageId = 1;

  /**
   * @type {{}}
   * @private
   */
  this._pendingMessages = {};

  /**
   *
   * @type {{}}
   * @private
   */
  this._msgResponseHandlers = {};

  /**
   *
   * @type {{}}
   * @private
   */
  this._msgChannelLookup = {};

  /**
   * If true, we'll use rtm.connect everywhere in place of rtm.start
   * @type {boolean}
   * @private
   */
  this._useRtmConnect = clientOpts.useRtmConnect;

  if (clientOpts.dataStore instanceof DataStore) {
    this.registerDataStore(clientOpts.dataStore);
  } else {
    // Default to using the memory data store if the user didn't set anything here
    if (isUndefined(clientOpts.dataStore)) {
      this.registerDataStore(new MemoryDataStore());
    }
  }

  // See the "Ping and Pong" section of https://api.slack.com/rtm
  // These are to do with the RTM API level connection and not the underlying
  // socket connection.
  this.MAX_PONG_INTERVAL = clientOpts.maxPongInterval || 20000;
  this.WS_PING_INTERVAL = clientOpts.wsPingInterval || 5000;

  this.autoReconnect = clientOpts.autoReconnect !== false;

  this.logger('debug', 'RTMClient initialized');
}

inherits(RTMClient, BaseAPIClient);


/**
 * @type {boolean}
 */
RTMClient.prototype.connected = false;


/**
 * @type {boolean}
 */
RTMClient.prototype.authenticated = false;


/**
 * The id of the user that's currently connected via this client.
 * @type {string}
 */
RTMClient.prototype.activeUserId = undefined;


/**
 * The id of the team that's currently connected via this client.
 * @type {string}
 */
RTMClient.prototype.activeTeamId = undefined;


/**
 * @type {?SlackDataStore}
 */
RTMClient.prototype.dataStore = undefined;


/**
 * The timer repeatedly pinging the server to let it know the client is still alive.
 * @type {?}
 */
RTMClient.prototype._pingTimer = null;


/**
 * The time the last pong was received from the server.
 * @type {number}
 * @private
 */
RTMClient.prototype._lastPong = 0;


/**
 * A running count of socket connection attempts.
 * @type {number}
 * @private
 */
RTMClient.prototype._connAttempts = 0;


/**
 * Whether the server is currently connecting.
 * @type {boolean}
 * @private
 */
RTMClient.prototype._connecting = false;


/**
 * Options passed to `start`, for use when reconnecting.
 * @type {object}
 * @private
 */
RTMClient.prototype._startOpts = null;


/**
 * Whether the server is currently reconnecting.
 * @type {boolean}
 * @private
 */
RTMClient.prototype._reconnecting = false;


/** @inheritDoc */
RTMClient.prototype._createFacets = function _createFacets() {
  RTMClient.super_.prototype._createFacets.call(this);

  /**
   * Allows the RTM client to get setup without needing to have a full web client.
   * @type {RtmFacet}
   * @private
   */
  this._rtm = new RtmFacet(bind(this._makeAPICall, this));

  /**
   * Allows access to some chat functions
   * @type {ChatFacet}
   * @private
   */
  this._chat = new ChatFacet(bind(this._makeAPICall, this));
};


/**
 * Begin an RTM session.
 * @param {object} [opts]
 * @param {boolean} [opts.batch_presence_aware=false] - Opt into receiving fewer `presence_change`
 * events that can contain many users. Instead of the event containing one `user` property {string},
 * it would contain a `users` property {string[]}. This option is not compatible with using the
 * `dataStore`, you must initialize the RTM client object with the `dataStore: false` option.
 */
RTMClient.prototype.start = function start(opts) {
  // Check whether the client is currently attempting to connect to the RTM API.
  if (!this._connecting) {
    this.logger('verbose', 'Attempting to connect via the RTM API');
    this.emit(CLIENT_EVENTS.CONNECTING);
    this._connecting = true;
    this._startOpts = opts;

    if (this._useRtmConnect) {
      this._rtm.connect(opts, bind(this._onStart, this));
    } else {
      this._rtm.start(opts, bind(this._onStart, this));
    }
  }
};


/**
 * @deprecated since version 2.0.0, use start() instead.
 */
RTMClient.prototype.login = function login(opts) {
  this.start(opts);
};


/**
 * Generates the next message id to use.
 *
 * NOTE: This id must be unique per RTM connection.
 */
RTMClient.prototype.nextMessageId = function nextMessageId() {
  return this._messageId++;
};


/**
 * Occurs when we've received a response to the API call made in start.
 * Connect to the socket using the URL from the response, or if it went wrong,
 * check the error and potentially retry or permanently disconnect.
 * @param requestError - An error that occurred during the request
 * @param data - The response data
 * @private
 */
RTMClient.prototype._onStart = function _onStart(requestError, data) {
  // There may have been an HTTP error or an error returned from the Slack API
  var error = requestError || data.error;
  var startMethod = this._useRtmConnect ? 'rtm.connect' : 'rtm.start';

  var disconnectWithReason = bind(function disconnectWithReason(reason) {
    this.logger('error', 'Disconnecting because ' + reason);
    this.logger('error', error);
    this.disconnect(reason, error);
  }, this);

  this._connecting = false;
  this._reconnecting = false;

  if (error || (!data || !data.url)) {
    this.emit(CLIENT_EVENTS.UNABLE_TO_RTM_START, error);

    // Any of these mean this client is unusable, so don't attempt to auto-reconnect
    if (data && includes(UNRECOVERABLE_RTM_START_ERRS, data.error)) {
      disconnectWithReason(data.error + ' is not recoverable');
    } else {
      this.authenticated = false;
      if (this.autoReconnect) {
        this.logger('info', 'Unable to ' + startMethod + ', attempting reconnect');
        this.reconnect();
      } else {
        disconnectWithReason('auto-reconnect is disabled');
      }
    }
  } else {
    this.logger('verbose', startMethod + ' successful, attempting to open websocket URL');

    this.authenticated = true;
    this.activeUserId = data.self.id;
    this.activeTeamId = data.team.id;
    if (!isUndefined(this.dataStore)) {
      this.dataStore.cacheRtmStart(data);
    }

    this.emit(CLIENT_EVENTS.AUTHENTICATED, data);
    this.connect(data.url);
  }
};


/**
 * Closes the websocket and tears down the ping function.
 * @private
 */
RTMClient.prototype._safeDisconnect = function _safeDisconnect() {
  if (this._pingTimer) {
    clearInterval(this._pingTimer);
    this._pingTimer = null;
  }
  if (this.ws) {
    // Stop listening to the websocket's close event, so that the auto-reconnect logic doesn't fire
    this.ws.removeAllListeners('close');
    this.ws.close();
  }
  this.authenticated = false;
  this.connected = false;
};


/**
 * Connects to the RTM API.
 * @param {String} socketUrl The URL of the websocket to connect to.
 */
RTMClient.prototype.connect = function connect(socketUrl) {
  this.emit(CLIENT_EVENTS.WS_OPENING);
  this.ws = this._socketFn(socketUrl);

  this.ws.on('open', bind(this.handleWsOpen, this));
  this.ws.on('message', bind(this.handleWsMessage, this));
  this.ws.on('error', bind(this.handleWsError, this));
  this.ws.on('close', bind(this.handleWsClose, this));
};


/**
 * Disconnects from the RTM API.
 * @param {Error} optReason
 * @param {Number} optCode
 */
RTMClient.prototype.disconnect = function disconnect(optErr, optCode) {
  this.emit(CLIENT_EVENTS.DISCONNECT, optErr, optCode);
  this.autoReconnect = false;
  this._safeDisconnect();
};


/**
 * Attempts to reconnect to the websocket by retrying the start method.
 */
RTMClient.prototype.reconnect = function reconnect() {
  if (!this._reconnecting) {
    this.emit(CLIENT_EVENTS.ATTEMPTING_RECONNECT);
    this._reconnecting = true;
    this._safeDisconnect();

    this._connAttempts++;
    this.logger('warn', 'Reconnecting, on attempt', this._connAttempts);

    // Ensure we use the same arguments to `start` when reconnecting
    this.start(this._startOpts);
  }
};


/**
 * Handler to deal with the WebSocket open event.
 * NOTE: this.connected doesn't get set to true until the helloHandler is called.
 */
RTMClient.prototype.handleWsOpen = function handleWsOpen() {
  this.emit(CLIENT_EVENTS.WS_OPENED);
};


/**
 * Handler to deal with the WebSocket message event.
 * @param {object} wsMsg
 */
RTMClient.prototype.handleWsMessage = function handleWsMessage(wsMsg) {
  var message;
  this.logger('debug', wsMsg);
  this.emit(CLIENT_EVENTS.RAW_MESSAGE, wsMsg);

  try {
    message = JSON.parse(wsMsg);
  } catch (err) {
    this.logger('error', 'Unable to parse message: ' + err);
    return;
  }

  if (includes(RTM_CLIENT_INTERNAL_EVENT_TYPES, message.type)) {
    this._handleWsMessageInternal(message.type, message);
  } else {
    this._maybeKeepAlive(message);
    this._handleWsMessageViaEventHandler(message.type, message);
  }
};


/**
 * Handler for messages we need to deal with internally.
 * @param {String} messageType
 * @param {Object} message
 * @private
 */
RTMClient.prototype._handleWsMessageInternal = function _handleWsMessageInternal(
  messageType, message) {
  if (messageType === 'pong') {
    this._handlePong(message);
  } else if (messageType === RTM_API_EVENTS.HELLO) {
    this._handleHello();
  } else if (messageType === RTM_API_EVENTS.TEAM_MIGRATION_STARTED) {
    this.reconnect();
    this.emit(messageType, message);
  }
};


/**
 *
 * @param {String} messageType
 * @param {Object} message
 * @private
 */
RTMClient.prototype._handleWsMessageViaEventHandler = function _handleWsMessageViaEventHandler(
  messageType, message) {
  var replyTo = message.reply_to;

  if (!isUndefined(this.dataStore)) {
    this.dataStore.handleRtmMessage(this.activeUserId, this.activeTeamId, messageType, message);
  }

  if (replyTo) {
    if (!messageType) {
      this._handleMessageAck(replyTo, message);
    } else {
      this._handleMostRecentMsgReply(replyTo, message);
    }
  } else {
    // Non reply_to messages should *always* have a type
    this.emit(messageType, message);
    if (messageType === RTM_API_EVENTS.MESSAGE && !isUndefined(message.subtype)) {
      this.emit(makeMessageEventWithSubtype(message.subtype), message);
    }
  }
};


/**
 * Handler for the remote server's response to a message being sent on the websocket.
 * @param replyTo
 * @param message
 */
RTMClient.prototype._handleMessageAck = function handleMessageAck(replyTo, message) {
  var msg;
  var channelId;

  // This means that the message is an ack of a message sent via the websocket from the client.
  // The expected structure is something like:
  // {
  //   "ok": true,
  //   "reply_to": 1,
  //   "ts": "1355517523.000005",
  //   "text": "Hello world"
  // }
  // ... in the case of success.
  //
  // See the Sending messages section of https://api.slack.com/rtm for details.

  if (hasKey(this._msgResponseHandlers, replyTo)) {
    if (!message.ok) {
      this._handleMsgResponse(replyTo, new SlackRTMSendError(message.error.msg, message), null);
    } else {
      channelId = this._msgChannelLookup[replyTo];

      // Make a synthetic message, rather than passing back the raw ack response
      msg = {
        type: 'message',
        channel: channelId,
        user: this.activeUserId,
        text: message.text,
        ts: message.ts
      };

      if (this.dataStore) {
        // NOTE: this will treat the message response as canonical and assumes that no temporary
        //       message has been put in place.
        this.dataStore.handleRtmMessage(this.activeUserId, this.activeTeamId, 'message', msg);
      }

      this._handleMsgResponse(replyTo, null, msg);
    }
  } else {
    // This should be impossible. If the message is received with no message type, it's a response
    // to a message sent by this client, so the absence of a handler for it should never happen.
    this.logger('error', 'message received with unknown reply_to: ' + JSON.stringify(message));
  }
};


/**
 * Handler for the server
 * @param {} replyTo
 * @param {{}} message
 * @private
 */
RTMClient.prototype._handleMostRecentMsgReply = function _handleMostRecentMsgReply(
  replyTo, message) {
  var msg;
  var pendingMessageIds;
  var failedToSendErr;

  // The server will send the most recent reply message to the client when it first connects,
  // so will receive a message that looks like:
  //
  // {
  //   "reply_to": 848,
  //   "type": "message",
  //   "channel": "C0CHZA86Q",
  //   "user": "U0CJ5PC7L",
  //   "text": "meh-mah",
  //   "ts": "1457327357.000011"
  // }
  //
  // This should generally only happen in the case of disconnections. If that happens, the last
  // message should be handled gracefully.

  if (this._msgResponseHandlers[replyTo]) {
    msg = cloneDeep(message);
    delete msg.reply_to;
    this._handleMsgResponse(replyTo, null, msg);
  } else {
    // The only time this should happen is when a client first connects
    this.logger('info', 'message received on reconnect with no registered callback:\n'
      + JSON.stringify(message));
  }

  pendingMessageIds = keys(this._pendingMessages);
  forEach(pendingMessageIds, bind(function handlePendingMessage(messageId) {
    // If the message id is less than the most recent reply to id, assume that the message has
    // been processed. If it's greater than the most recent reply to, then it's likely that the
    // message didn't get sent to the remote server. This should almost never happen, so for now if
    // it does, call the pending callback with a custom error

    if (messageId > replyTo) {
      failedToSendErr = new SlackRTMSendError(
        'message not sent due to connection trouble', this._pendingMessages[messageId]);
      this._handleMsgResponse(messageId, failedToSendErr, null);
    } else {
      this._clearMessageState(messageId);
    }
  }, this));
};


/**
 * Emits the websocket error.
 * @param {Object} err
 */
RTMClient.prototype.handleWsError = function handleWsError(err) {
  this.logger('debug', err);
  this.emit(CLIENT_EVENTS.WS_ERROR, err);
};


/**
 * Occurs when the websocket closes.
 * @param {String} code The error code
 * @param {String} reason The reason for closing
 */
RTMClient.prototype.handleWsClose = function handleWsClose(code, reason) {
  this.connected = false;

  this.emit(CLIENT_EVENTS.WS_CLOSE, code, reason);

  if (this.autoReconnect) {
    if (!this._connecting) {
      this.reconnect();
    }
  } else {
    this.disconnect('websocket closed with auto-reconnect false on the RTM client');
  }
};


/**
 * Handles the RTM API's pong message, updating the lastPong time on the client.
 * @param {Object} message
 */
RTMClient.prototype._handlePong = function _handlePong(message) {
  this._lastPong = Date.now();
  this._handleMsgResponse(message.reply_to, null, message);
};


/**
 * Pings the remote server to let it know the client is still alive.
 * @private
 */
RTMClient.prototype._pingServer = function _pingServer() {
  var pongInterval;

  if (this.connected) {
    // Get the delta between ping sent & pong received, remember this timer
    // fires sometime later so deduct that to get the real latency
    pongInterval = Math.abs(Date.now() - this._lastPong - this.WS_PING_INTERVAL);
    this.logger('debug', 'waited ' + pongInterval + ' ms for a pong');

    // If we didn't receive a response to the last pong in some duration,
    // force a reconnect
    if (pongInterval > this.MAX_PONG_INTERVAL) {
      this.reconnect();
    } else {
      this.send({ type: 'ping' }, noop);
    }
  }
};


/**
 * If we haven't received a pong in too long, treat any incoming message as a pong
 * to prevent unnecessary disconnects.
 * @param {Object} message
 */
RTMClient.prototype._maybeKeepAlive = function _maybeKeepAlive(message) {
  var pongInterval = Date.now() - this._lastPong;
  if (pongInterval > this.MAX_PONG_INTERVAL) {
    this.logger('warn', 'No pong in ' + pongInterval +
      'ms, treating ' + message.type + ' as keep-alive');
    this._lastPong = Date.now();
  }
};


/**
 * Occurs when the socket connection is opened.
 * Begin ping-pong with the server.
 * {@link https://api.slack.com/events/hello|hello}
 */
RTMClient.prototype._handleHello = function _handleHello() {
  this.connected = true;
  this.emit(CLIENT_EVENTS.RTM_CONNECTION_OPENED);

  this._lastPong = Date.now();
  this._connAttempts = 0;
  if (this._pingTimer) clearInterval(this._pingTimer);
  this._pingTimer = setInterval(bind(this._pingServer, this), this.WS_PING_INTERVAL);
};


/**
 * Helper for sending a simple message to a channel|group|DM etc via the RTM API.
 * @param {string} text The text of the messsage to send.
 * @param {string} channelId The id of the channel|group|DM to send this message to.
 * @param {Function=} optCb
 */
RTMClient.prototype.sendMessage = function sendMessage(text, channelId, optCb) {
  return this.send({
    text: text,
    channel: channelId,
    type: RTM_API_EVENTS.MESSAGE
  }, optCb);
};


/**
 * Helper for updating a sent message via the 'chat.update' API call
 * @param message {object} message The message object to be updated,
 * see /lib/clients/web/facets/chat.js for more details
 * @param {Function=} optCb Optional callback
 */
RTMClient.prototype.updateMessage = function updateMessage(message, optCb) {
  return this._chat.update(message.ts, message.channel, message.text, message.opts, optCb);
};


/**
 * Sends a typing indicator to indicate that the user with `activeUserId` is typing.
 * @param {string} channelId The id of the channel|group|DM to send this message to.
 */
RTMClient.prototype.sendTyping = function sendTyping(channelId) {
  this.send({
    type: 'typing',
    channel: channelId
  }, noop);
};


/**
 * Subscribes this socket to presence changes for only the given `userIds`.
 * This requires `presence_sub` to have been passed as an argument to `start`.
 * @param {Array} userIds The user IDs to subscribe to
 */
RTMClient.prototype.subscribePresence = function subscribePresence(userIds) {
  this.send({
    type: 'presence_sub',
    ids: userIds
  }, noop);
};


/**
 * Sends a message over the websocket to the server.
 * @param {*} message The message to send back to the server.
 * @param {Function=} optCb
 */
RTMClient.prototype.send = function send(message, optCb) {
  var err;
  var ret;

  if (this.connected) {
    ret = this._send(message, optCb);
  } else {
    err = new SlackRTMSendError('ws not connected, unable to send message', message);
    this.logger('error', err);

    if (optCb) {
      setTimeout(function wsSendDisconnectedCb() {
        optCb(err, null);
      }, 1);
    } else {
      ret = new Promise(function wsSendDisconnectedPromise(fulfill, reject) {
        reject(err);
      });
    }
  }

  return ret;
};


/**
 *
 * @param message
 * @param optCb
 * @returns {*}
 * @private
 */
RTMClient.prototype._send = function _send(message, optCb) {
  var _this = this;
  var jsonMessage;
  var ret;
  var msgId = this.nextMessageId();
  var _handleWsSendResponse = bind(this._handleWsSendResponse, this, msgId);
  var wsMsg = cloneDeep(message);
  wsMsg.id = msgId;

  // Track the message from the client's perspective
  this._pendingMessages[msgId] = message;

  jsonMessage = JSON.stringify(wsMsg);
  this.logger('debug', 'sending message via ws: ' + jsonMessage);

  if (optCb) {
    _this._registerMsgHandler(msgId, wsMsg, optCb);
    this.ws.send(jsonMessage, undefined, _handleWsSendResponse);
  } else {
    ret = new Promise(function wsSendPromiseInner(fulfill, reject) {
      _this._registerMsgHandler(msgId, wsMsg, { fulfill: fulfill, reject: reject });
      _this.ws.send(jsonMessage, undefined, _handleWsSendResponse);
    });
  }

  return ret;
};


/**
 *
 * @param msgId
 * @param wsRespErr
 * @private
 */
RTMClient.prototype._handleWsSendResponse = function _handleWsSendResponse(msgId, wsRespErr) {
  if (wsRespErr) {
    this._handleMsgResponse(msgId, wsRespErr, null);
  } else {
    // TODO(leah): This should probably clear the enqueued message object from _pendingMessages, as
    //             the server has the data at this point. Figure out how this will interact with
    //             the logic in _handleMostRecentMsgReply
  }
};


/**
 * Registers a handler, either a function or {fulfill: fn, reject: fn}, for a message id.
 * @param {number} msgId The id of the message to handle.
 * @param {object} wsMsg
 * @param {*} handler
 * @private
 */
RTMClient.prototype._registerMsgHandler = function _registerMsgHandler(msgId, wsMsg, handler) {
  //
  // Track the channel a message was sent to.
  //
  // This is so that the client can create a synthetic message object when it receives the message
  // ack from the RTM API server. This allows:
  //   - passing back a full message object, rather than an ack message, to the client that sent the
  //     message
  //   - pushing a standard message into the relevant channel's history
  //
  if (wsMsg.type === 'message' && wsMsg.channel) {
    this._msgChannelLookup[msgId] = wsMsg.channel;
  }

  this._msgResponseHandlers[msgId] = handler;
};


/**
 * Calls the handler registered for a given msgId and cleans it up on completion.
 *
 * @param {number} msgId The id of the message to handle.
 * @param {Object} err
 * @param {Object} res
 * @private
 */
RTMClient.prototype._handleMsgResponse = function _handleMsgResponse(msgId, err, res) {
  var responseHandler = this._msgResponseHandlers[msgId];
  if (err) {
    this.logger('debug', 'Error sending message: ' + err);
  }

  if (!responseHandler) {
    this.logger('debug', 'no response handler for message ID: ' + msgId);
    return;
  }

  if (isFunction(responseHandler)) {
    responseHandler(err, res);
  } else {
    if (err) {
      responseHandler.reject(err);
    } else {
      responseHandler.fulfill(res);
    }
  }

  this._clearMessageState(msgId);
};


RTMClient.prototype._clearMessageState = function _clearMessageState(msgId) {
  delete this._msgChannelLookup[msgId];
  delete this._msgResponseHandlers[msgId];
  delete this._pendingMessages[msgId];
};


module.exports = RTMClient;
