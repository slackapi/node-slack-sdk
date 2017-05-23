var EventEmitter = require('eventemitter3');
var Promise = require('bluebird');
var async = require('async');
var bind = require('lodash').bind;
var inherits = require('inherits');
var partial = require('lodash').partial;
var pick = require('lodash').pick;
var retry = require('retry');

var SlackAPIError = require('./errors').SlackAPIError;
var callTransport = require('./transports/call-transport');
var getLogger = require('../helpers').getLogger;
var helpers = require('./helpers');
var globalHelpers = require('../helpers');
var requestsTransport = require('./transports/request').requestTransport;
var retryPolicies = require('./retry-policies');


/**
 * Base client for both the RTM and web APIs.
 * @param {String} token            The Slack API token to use with this client
 * @param {Object} opts
 * @param {String} opts.slackAPIUrl The Slack API URL
 * @param {Function} opts.transport Function to call to make an HTTP call to the Slack API
 * @param {String} opts.logLevel    The log level for the logger
 * @param {Function} opts.logger    Function to use for log calls, takes (logLevel, logString)
 * @param {Number} opts.maxRequestConcurrency Max number of concurrent requests to make to Slack's
 * API's, defaults to 3
 * @param {Object} opts.retryConfig The configuration to use for the retry operation,
 * {@see https://github.com/SEAPUNK/node-retry}
 * @constructor
 */
function BaseAPIClient(token, opts) {
  var clientOpts = opts || {};
  EventEmitter.call(this);

  /**
   * @type {string}
   * @private
   */
  this._token = token;

  /** @type {String} */
  this.slackAPIUrl = clientOpts.slackAPIUrl || 'https://slack.com/api/';

  /** @type {Function} */
  this.transport = clientOpts.transport || requestsTransport;

  /**
   * Default to retrying forever with an exponential backoff, capped at thirty
   * minutes but with some randomization.
   */
  this.retryConfig = clientOpts.retryConfig ||
    retryPolicies.RETRY_FOREVER_EXPONENTIAL_CAPPED_RANDOM;

  /**
   * Handles API requests. For RTM clients this is a one-at-a-time queue.
   * @type {Object}
   * @private
   */
  this.requestQueue = async.queue(
    bind(this._callTransport, this),
    clientOpts.maxRequestConcurrency || 3
  );

  /**
   * The logger function attached to this client.
   * @type {Function}
   */
  this.logger = clientOpts.logger || getLogger(clientOpts.logLevel);

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
 * Empties the request queue and returns it to a clean slate.
 */
BaseAPIClient.prototype.clearQueue = function clearQueue() {
  this.logger('info', 'Clearing the request queue', this.requestQueue.concurrency);

  // Initially tried to accomplish this with `requestQueue.kill`, but it leaves the queue blocked.
  // See https://github.com/caolan/async/issues/1422.
  this.requestQueue = async.queue(
    bind(this._callTransport, this),
    this.requestQueue.concurrency || 3
  );
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
  var _this = this;
  var retryOp = retry.operation(_this.retryConfig);
  var retryArgs = {
    client: _this,
    task: task,
    queueCb: queueCb,
    retryOp: retryOp
  };

  retryOp.attempt(function attemptTransportCall() {
    _this.logger('verbose', 'Retrying', pick(task.args, 'url'));
    _this.transport(task.args, partial(callTransport.handleTransportResponse, retryArgs));
  });
};


/**
 * Makes a call to the Slack API.
 *
 * @param {String} endpoint   The API endpoint to send to
 * @param {Object} apiArgs    Arguments to the API request
 * @param {Object} apiOptArgs Optional arguments to the API request
 * @param {Function} optCb    The callback to run on completion; note that if `apiOptArgs` is a
 * callback, it will overwrite this parameter
 * @private
 */
BaseAPIClient.prototype._makeAPICall = function _makeAPICall(endpoint, apiArgs, apiOptArgs, optCb) {
  var apiCallArgs = helpers.getAPICallArgs(
    this._token,
    globalHelpers.getVersionString(),
    this.slackAPIUrl,
    endpoint,
    apiArgs,
    apiOptArgs,
    optCb
  );
  var cb = apiCallArgs.cb;
  var args = apiCallArgs.args;
  var promise;
  var _this = this;

  if (!cb) {
    promise = new Promise(function makeAPICallPromiseResolver(resolve, reject) {
      _this.requestQueue.push({
        args: args,
        cb: function makeAPICallPromiseResolverInner(err, res) {
          if (err) {
            reject(err);
          } else {
            if (!res.ok) {
              reject(new SlackAPIError(res.error));
            } else {
              resolve(res);
            }
          }
        }
      });
    });
  } else {
    this.requestQueue.push({
      args: args,
      cb: cb
    });
  }

  return promise;
};


module.exports = BaseAPIClient;
