/**
 *
 */

var EventEmitter = require('eventemitter3');
var async = require('async');
var bind = require('lodash').bind;
var inherits = require('inherits');
var retry = require('retry');
var urlJoin = require('url-join');

var WEB_CLIENT_EVENTS = require('./events/client').WEB;
var getLogger = require('../helpers').getLogger;
var helpers = require('./helpers');
var requestsTransport = require('./transports/request').requestTransport;


/**
 * Base client for both the RTM and web APIs.
 * @param {string} token The Slack API token to use with this client.
 * @param {Object} opts
 * @param {String} opts.slackAPIUrl The Slack API URL.
 * @param {String} opts.userAgent The user-agent to use, defaults to node-slack.
 * @param {Function} opts.transport Function to call to make an HTTP call to the Slack API.
 * @param {string=} opts.logLevel The log level for the logger.
 * @param {Function=} opts.logger Function to use for log calls, takes (logLevel, logString) params.
 * @param {Number} opts.maxRequestConcurrency The max # of concurrent requests to make to Slack's
 *     API's, defaults to 5.
 * @constructor
 */
function BaseAPIClient(token, opts) {
  EventEmitter.call(this);

  /**
   * @type {string}
   * @private
   */
  this._token = token;

  /** @type {string} */
  this.slackAPIUrl = opts.slackAPIUrl || 'https://slack.com/api/';

  /** @type {Function} */
  this.transport = opts.transport || requestsTransport;

  /** @type {string} */
  this.userAgent = opts.userAgent || 'node-slack';

  /**
   *
   * @type {Object}
   * @private
   */
  this._requestQueue = async.priorityQueue(
    bind(this._callTransport, this),
    opts.maxRequestConcurrency
  );

  /**
   * The logger function attached to this client.
   * @type {Function}
   */
  this.logger = opts.logger || getLogger(opts.logLevel);

  this._createFacets();
}

inherits(BaseAPIClient, EventEmitter);


BaseAPIClient.prototype.emit = function emit() {
  BaseAPIClient.super_.prototype.emit.apply(this, arguments);
  this.logger('debug', arguments);
};


/**
 * Initializes each of the API facets.
 * @protected
 */
BaseAPIClient.prototype._createFacets = function _createFacets() {
};


/**
 * Attaches a data-store to the client instance.
 * @param {SlackDataStore} dataStore
 */
BaseAPIClient.prototype.registerDataStore = function registerDataStore(dataStore) {
  this.dataStore = dataStore;
};


/**
 * Calls the supplied transport function and processes the results.
 *
 * This will also manage 429 responses and retry failed operations.
 *
 * @param {object} task The arguments to pass to the transport.
 * @param {function} queueCb Callback to signal to the request queue that the request has completed.
 * @protected
 */
BaseAPIClient.prototype._callTransport = function _callTransport(task, queueCb) {
  // TODO(leah): Add some logging to this function as it's kind of complex
  var args = task.args;
  var cb = task.cb;
  var _this = this;

  var retryOp = retry.operation(this.retryConfig);

  var handleTransportResponse = function handleTransportResponse(err, headers, statusCode, body) {
    var headerSecs;
    var headerMs;
    var httpErr;
    var jsonResponse;
    var jsonParseErr;

    if (err) {
      if (!retryOp.retry(err)) {
        cb(retryOp.mainError(), null);
      } else {
        return;
      }
    }

    // NOTE: this assumes that non-200 codes simply won't happen, as the Slack API policy is to
    //       return a 200 with an error property
    if (statusCode !== 200) {
      // There are only a couple of possible bad cases here:
      //   - 429: the application is being rate-limited. The client is designed to automatically
      //          respect this
      //   - 4xx or 5xx: something bad, but probably recoverable, has happened, so requeue the
      //          request

      if (statusCode === 429) {
        _this._requestQueue.pause();
        headerSecs = parseInt(headers['Retry-After'], 10);
        headerMs = headerSecs * 1000;
        setTimeout(function retryRateLimitedRequest() {
          // Don't retry limit requests that were rejected due to retry-after
          _this.transport(args, handleTransportResponse);
          _this._requestQueue.resume();
        }, headerMs);

        _this.emit(WEB_CLIENT_EVENTS.RATE_LIMITED, headerSecs);
      } else {
        // If this is reached, it means an error outside the normal error logic was received. These
        // should be very unusual as standard errors come back with a 200 code and an "error"
        // property.
        //
        // Given that, assume that something really weird happened and retry the request as normal.

        httpErr = new Error('Unable to process request, received bad ' + statusCode + ' error');
        if (!retryOp.retry(httpErr)) {
          cb(httpErr, null);
        } else {
          return;
        }
      }
    } else {
      try {
        jsonResponse = JSON.parse(body);
      } catch (parseErr) {
        // TODO(leah): Emit an event here?
        jsonParseErr = new Error('unable to parse Slack API Response');
      }

      try {
        cb(jsonParseErr, jsonResponse);
      } catch (callbackErr) {
        // Never retry requests that fail in the callback
        _this.logger('error', callbackErr);
      }
    }

    // This is always an empty callback, even if there's an error, as it's used to signal the
    // request queue that a request has completed processing, and nothing else.
    queueCb();
  };

  retryOp.attempt(function attemptTransportCall() {
    _this.transport(args, handleTransportResponse);
  });
};


/**
 * Makes a call to the Slack API.
 *
 * @param {String} endpoint The API endpoint to send to.
 * @param {Object=} optData The data send to the Slack API.
 * @param {function} optCb The callback to run on completion.
 */
BaseAPIClient.prototype.makeAPICall = function makeAPICall(endpoint, optData, optCb) {
  var apiCallArgs = helpers.getAPICallArgs(this._token, optData, optCb);

  var args = {
    url: urlJoin(this.slackAPIUrl, endpoint),
    data: apiCallArgs.data,
    headers: {
      'User-Agent': this.userAgent,
    },
  };

  this._requestQueue.push({
    args: args,
    cb: apiCallArgs.cb,
  });
};


module.exports = BaseAPIClient;
