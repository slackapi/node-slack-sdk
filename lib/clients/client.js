/**
 *
 */

var EventEmitter = require('eventemitter3');
var Promise = require('bluebird');
var async = require('async');
var bind = require('lodash').bind;
var inherits = require('inherits');
var partial = require('lodash').partial;
var retry = require('retry');
var urlJoin = require('url-join');

var SlackAPIError = require('./errors').SlackAPIError;
var getLogger = require('../helpers').getLogger;
var helpers = require('./helpers');
var requestsTransport = require('./transports/request').requestTransport;
var callTransport = require('./transports/call-transport');


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
 *     API's, defaults to 3.
 * @param {Object} opts.retryConfig The configuration to use for the retry operation,
 *     {@see https://github.com/SEAPUNK/node-retry}
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

  /** @type {string} */
  this.slackAPIUrl = clientOpts.slackAPIUrl || 'https://slack.com/api/';

  /** @type {Function} */
  this.transport = clientOpts.transport || requestsTransport;

  /** @type {string} */
  this.userAgent = clientOpts.userAgent || 'node-slack';

  /**
   * Default to attempting 5 retries within 5 minutes, with exponential backoff.
   */
  this.retryConfig = clientOpts.retryConfig || {
    retries: 5,
    factor: 3.9
  };

  /**
   *
   * @type {Object}
   * @private
   */
  this.requestQueue = async.priorityQueue(
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
    _this.transport(task.args, partial(callTransport.handleTransportResponse, retryArgs));
  });
};


/**
 * Makes a call to the Slack API.
 *
 * @param {String} endpoint The API endpoint to send to.
 * @param {Object=} optData The data send to the Slack API.
 * @param {function=} optCb The callback to run on completion.
 */
BaseAPIClient.prototype.makeAPICall = function makeAPICall(endpoint, optData, optCb) {
  var promise;
  var args;
  var _this = this;
  var apiCallArgs = helpers.getAPICallArgs(this._token, optData, optCb);

  args = {
    url: urlJoin(this.slackAPIUrl, endpoint),
    data: apiCallArgs.data,
    headers: {
      'User-Agent': this.userAgent
    }
  };

  if (!apiCallArgs.cb) {
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
      cb: apiCallArgs.cb
    });
  }

  return promise;
};


module.exports = BaseAPIClient;
