/**
 *
 * See [the RTM client events](../events/client) for details of the client event lifecycle.
 */

var bind = require('lodash').bind;
var cloneDeep = require('lodash').cloneDeep;
var contains = require('lodash').contains;
var inherits = require('inherits');
var isUndefined = require('lodash').isUndefined;

var RTM_API_EVENTS = require('../events/rtm').EVENTS;
var RTM_CLIENT_INTERNAL_EVENT_TYPES = [
  'pong',
  RTM_API_EVENTS.HELLO,
  RTM_API_EVENTS.TEAM_MIGRATION_STARTED,
];
var UNRECOVERABLE_RTM_START_ERRS = [
  'not_authed',
  'invalid_auth',
  'account_inactive',
];
var CLIENT_EVENTS = require('../events/client').RTM;
var BaseAPIClient = require('../client');
var RtmFacet = require('../web/facets').RtmFacet;
var makeMessageEventWithSubtype = require('../events/utils').makeMessageEventWithSubtype;
var wsSocketFn = require('../transports/ws');


/**
 *
 * @param {String} token
 * @param {object?} opts
 * @param {Function} opts.socketFn A function to call, passing in a websocket URL, that should
 *     return a websocket instance connected to that URL.
 * @param {object} opts.dataStore A store to cache Slack info, e.g. channels, users etc. in.
 * @param {boolean} opts.autoReconnect Whether or not to automatically reconnect when the connection
 *     closes.
 * @param {number} opts.maxReconnectionAttempts
 * @param {number} opts.reconnectionBackoff
 * @param {number} opts.wsPingInterval
 * @param {number} opts.maxPongInterval
 * @param {string} opts.logLevel The log level for the logger.
 * @param {Function} opts.logger Function to use for log calls, takes (logLevel, logString)
 *     parameters.
 * @param {SlackDataStore} opts.dataStore
 * @constructor
 */
function RTMClient(token, opts) {
  var clientOpts = opts || {};

  // Force the max request concurrency to 1 for the RTM client. This is because it should not be
  // trying to rtm.start in parallel.
  clientOpts.maxRequestConcurrency = 1;

  BaseAPIClient.call(this, token, clientOpts);

  /**
   * @type {Function}
   */
  this._socketFn = clientOpts.socketFn || wsSocketFn;

  /**
   * The active websocket.
   * @type {Object}
   */
  this.ws = undefined;

  if (!isUndefined(clientOpts.dataStore)) {
    this.registerDataStore(clientOpts.dataStore);
  }

  this.MAX_RECONNECTION_ATTEMPTS = clientOpts.maxReconnectionAttempts || 10;
  this.RECONNECTION_BACKOFF = clientOpts.reconnectionBackoff || 3000;
  this.MAX_PONG_INTERVAL = clientOpts.maxPongInterval || 10000;
  this.WS_PING_INTERVAL = clientOpts.wsPingInterval || 5000;

  this.autoReconnect = clientOpts.autoReconnect !== false;
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
 * Maps message id to message object for messages sent to but not replied to by the remote server.
 * @type {Object}
 * @private
 */
RTMClient.prototype._pendingMessages = {};


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
 *
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
 * Whether the server is currently re-connecting.
 * @type {boolean}
 * @private
 */
RTMClient.prototype._reconnecting = false;


/**
 * @type {SlackDataStore}
 */
RTMClient.prototype.dataStore = undefined;


/** @inheritDoc */
RTMClient.prototype._createFacets = function _createFacets() {
  RTMClient.super_.prototype._createFacets.call(this);

  /**
   * Allows the RTM client to get setup without needing to have a full web client.
   * @type {RtmFacet}
   * @private
   */
  this._rtm = new RtmFacet(bind(this.makeAPICall, this));
};


/**
 *
 * @param {object} opts
 */
RTMClient.prototype.start = function start(opts) {
  // Check whether the client is currently attempting to connect to the RTM API.
  if (!this._connecting) {
    this.logger.log('verbose', 'attempting to connect via the RTM API');
    this.emit(CLIENT_EVENTS.CONNECTING);
    this._connecting = true;

    this._rtm.start(opts, bind(this._onStart, this));
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
 */
RTMClient.prototype.nextMessageId = function nextMessageId() {
  this._messageId = this._messageId || 1;
  return this._messageId++;
};


/**
 *
 * @param err
 * @param data
 * @private
 */
RTMClient.prototype._onStart = function _onStart(err, data) {
  var errMsg;
  this._connecting = false;
  this._reconnecting = false;

  if (err || !data.url) {
    this.emit(CLIENT_EVENTS.UNABLE_TO_RTM_START, err || data.error);

    // Any of these mean this client is unusable, so don't attempt to auto-reconnect
    if (data && contains(UNRECOVERABLE_RTM_START_ERRS, data.error)) {
      errMsg = 'unrecoverable failure connecting to the RTM API';
      this.logger.error(errMsg + ': ' + data.error);
      this.disconnect(errMsg, data.error);
    } else {
      this.logger.info('unable to RTM start, attempting reconnect: ' + err || data.error);
      this.authenticated = false;
      if (this.autoReconnect) {
        this.reconnect();
      }
    }
  } else {
    this.logger.verbose('rtm.start successful, attempting to open websocket URL');
    this.authenticated = true;
    this.activeUserId = data.self.id;
    this.activeTeamId = data.team.id;
    if (!isUndefined(this.dataStore)) {
      this.dataStore.cacheRtmStart(data);
    }

    this.emit(CLIENT_EVENTS.AUTHENTICATED);
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
    // twice.
    this.ws.removeAllListeners('close');
    this.ws.close();
  }
  this.authenticated = false;
  this.connected = false;
};


/**
 * Connects to the RTM API.
 * @param {string} socketUrl The URL of the websocket to connect to.
 */
RTMClient.prototype.connect = function connect(socketUrl) {
  this.emit(CLIENT_EVENTS.WS_OPENING);
  this.ws = this._socketFn(socketUrl);

  this.ws.on('open', bind(this.handleWsOpen, this));
  this.ws.on('message', bind(this.handleWsMessage, this));
  this.ws.on('error', bind(this.handleWsError, this));
  this.ws.on('close', bind(this.handleWsClose, this));
  this.ws.on('ping', bind(this.handleWsPing, this));
};


/**
 * Disconnects from the RTM API.
 * @param optReason
 * @param optCode
 */
RTMClient.prototype.disconnect = function disconnect(optErr, optCode) {
  this.emit(CLIENT_EVENTS.DISCONNECT, optErr, optCode);
  this.autoReconnect = false;
  this._safeDisconnect();
};


/**
 *
 */
RTMClient.prototype.reconnect = function reconnect() {
  if (!this._reconnecting) {
    this.emit(CLIENT_EVENTS.ATTEMPTING_RECONNECT);
    this._reconnecting = true;
    this._safeDisconnect();

    // TODO(leah): Update this to remove the reconn logic in the RTM client as it should be covered
    //             by the web client policy
    this._connAttempts++;
    if (this._connAttempts > this.MAX_RECONNECTION_ATTEMPTS) {
      throw new Error('unable to connect to Slack RTM API, failed after max reconnection attempts');
    }
    setTimeout(bind(this.start, this), this._connAttempts * this.RECONNECTION_BACKOFF);
  }
};


/**
 * Pings the remote server to let it know the client is still alive.
 * @private
 */
RTMClient.prototype._pingServer = function _pingServer() {
  var pongInterval;

  if (this.connected) {
    this.send({ type: 'ping' });

    // If the last pong was more than MAX_PONG_INTERVAL, force a reconnect
    pongInterval = Date.now() - this._lastPong;
    if (pongInterval > this.MAX_PONG_INTERVAL) {
      this.reconnect();
    }
  }
};


/**
 * Handler to deal with the WebSocket open event.
 * NOTE: this.connected doesn't get set to true until the helloHandler is called.
 */
RTMClient.prototype.handleWsOpen = function handleWsOpen() {
  this.emit(CLIENT_EVENTS.WS_OPENED);
  this._lastPong = Date.now();
  this._connAttempts = 0;
  if (this._pingTimer) {
    clearInterval(this._pingTimer);
  } else {
    this._pingTimer = setInterval(bind(this._pingServer, this), this.WS_PING_INTERVAL);
  }
};


/**
 * Handler to deal with the WebSocket message event.
 * @param {object} wsMsg
 */
RTMClient.prototype.handleWsMessage = function handleWsMessage(wsMsg) {
  var message;
  this.logger.log('debug', wsMsg);
  this.emit(CLIENT_EVENTS.RAW_MESSAGE, wsMsg);

  try {
    message = JSON.parse(wsMsg);
  } catch (err) {
    // TODO(leah): Emit an event here?
    this.logger.debug('unable to parse message: ' + err);
    return;
  }

  if (contains(RTM_CLIENT_INTERNAL_EVENT_TYPES, message.type)) {
    this._handleWsMessageInternal(message.type, message);
  } else {
    this._handleWsMessageViaEventHandler(message.type, message);
  }
};


/**
 *
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
  var replyTo;

  if (messageType === RTM_API_EVENTS.MESSAGE) {
    replyTo = message.reply_to;
    if (replyTo) {
      // TODO(leah): figure out how message pushes via the RTM API should work and how any errors
      //             will be handled
      if (this._pendingMessages[replyTo]) {
        delete this._pendingMessages[replyTo];
      } else {
        // If the message was sent in reply to a message that's not on this client, skip the message
        return;
      }
    }
  }

  if (!isUndefined(this.dataStore)) {
    this.dataStore.handleRtmMessage(this.activeUserId, this.activeTeamId, messageType, message);
  }

  this.emit(messageType, message);
  if (messageType === RTM_API_EVENTS.MESSAGE && !isUndefined(message.subtype)) {
    this.emit(makeMessageEventWithSubtype(message.subtype), message);
  }
};


/**
 * Emits the websocket error.
 * @param {Object} err
 */
RTMClient.prototype.handleWsError = function handleWsError(err) {
  this.logger.debug(err);
  this.emit(CLIENT_EVENTS.WS_ERROR, err);
};


/**
 *
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
 * Handler for the websocket ping event.
 * This pongs back to the server to let it know the client is still active.
 */
RTMClient.prototype.handleWsPing = function handleWsPing() {
  if (this.ws.pong) {
    this.ws.pong();
  }
};


/**
 * Handles the server's pong message, updating the lastPong time on the client.
 * @param {Object} message
 */
RTMClient.prototype._handlePong = function _handlePong(message) {
  this._lastPong = Date.now();
  delete this._pendingMessages[message.reply_to];
};


/** {@link https://api.slack.com/events/hello|hello} */
RTMClient.prototype._handleHello = function _handleHello() {
  this.connected = true;
  this.emit(CLIENT_EVENTS.RTM_CONNECTION_OPENED);
};


/**
 * Helper for sending a simple message to a channel|group|DM etc via the RTM API.
 * @param {string} text The text of the messsage to send.
 * @param {string} channelId The id of the channel|group|DM to send this message to.
 * @param {Function=} optCb
 */
RTMClient.prototype.sendMessage = function sendMessage(text, channelId, optCb) {
  this.send({
    text: text,
    channel: channelId,
    type: RTM_API_EVENTS.MESSAGE,
  }, optCb);
};


/**
 * Sends a message over the websocket to the server.
 * @param {*} message The message to send back to the server.
 * @param {Function=} optCb
 */
RTMClient.prototype.send = function send(message, optCb) {
  var wsMsg = cloneDeep(message);
  var jsonMessage;
  var err;
  var _this = this;

  if (this.connected) {
    wsMsg.id = this.nextMessageId();
    jsonMessage = JSON.stringify(wsMsg);
    this.logger.log('debug', jsonMessage);

    this._pendingMessages[wsMsg.id] = wsMsg;
    this.ws.send(jsonMessage, undefined, function handleWsMsgResponse(wsRespErr) {
      if (!isUndefined(wsRespErr)) {
        _this.logger.debug('Unable to send message: ' + wsRespErr);
      }

      if (!isUndefined(optCb)) {
        optCb(wsRespErr);
      }
    });
  } else {
    err = 'ws not connected, unable to send message';
    this.logger.debug(err);
    if (!isUndefined(optCb)) {
      optCb(new Error(err));
    }
  }
};


module.exports = RTMClient;
