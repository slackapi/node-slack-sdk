/**
 *
 */

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
var globalHelpers = require('../helpers');
var clientHelpers = require('./helpers');
var requestsTransport = require('./transports/request').requestTransport;
var retryPolicies = require('./retry-policies');


/**
 * Base client for both the RTM and web APIs.
 * @param {string} token The Slack API token to use with this client.
 * @param {Object} [opts]
 * @param {string} [opts.slackAPIUrl=https://slack.com/api/] - The Slack API URL.
 * @param {BaseAPIClient~transportFn} [opts.transport] - Function to call to make an HTTP call to
 * the Slack API.
 * @param {string} [opts.logLevel=info] The log level for the logger.
 * @param {BaseAPIClient~logFn} [opts.logger] Function to use for log calls, takes (logLevel, logString) params.
 * @param {number} [opts.maxRequestConcurrency=3] The max # of concurrent requests to make to Slack's
 * API
 * @param {Object} [opts.retryConfig] The configuration to use for the retry operation,
 * see {@link https://github.com/tim-kos/node-retry|node-retry} for more details.
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

  /**
   * The logger function attached to this client.
   * @type {BaseAPIClient~logFn}
   */
  this.logger = clientOpts.logger || globalHelpers.getLogger(clientOpts.logLevel);

  /** @type {BaseAPIClient~transportFn} */
  this.transport = clientOpts.transport || requestsTransport;

  /**
   * Default to retrying forever with an exponential backoff, capped at thirty
   * minutes but with some randomization.
   * @type {Object}
   */
  this.retryConfig = clientOpts.retryConfig ||
    retryPolicies.RETRY_FOREVER_EXPONENTIAL_CAPPED_RANDOM;

  /**
   *
   * @type {AsyncQueue}
   * @private
   */
  this.requestQueue = async.queue(
    bind(this._callTransport, this),
    clientOpts.maxRequestConcurrency || 3
  );

  this._createFacets();

  this.logger('debug', 'BaseAPIClient initialized');
}

inherits(BaseAPIClient, EventEmitter);

/**
 * Initializes each of the API facets.
 * @protected
 */
BaseAPIClient.prototype._createFacets = function _createFacets() {
  this.logger('debug', 'BaseAPIClient _createFacets end');
};

/**
 * Attaches a data-store to the client instance.
 *
 * @deprecated SlackDataStore interface will be removed in v4.0.0. See
 * {@link https://github.com/slackapi/node-slack-sdk/wiki/DataStore-v3.x-Migration-Guide|the migration guide}
 * for details.
 * @param {SlackDataStore} dataStore
 */
BaseAPIClient.prototype.registerDataStore = function registerDataStore(dataStore) {
  this.logger('warn', 'SlackDataStore is deprecated and will be removed in the next major ' +
    'version. See project documentation for a migration guide.');
  this.dataStore = dataStore;
  this.logger('debug', 'BaseAPIClient registerDataStore end');
};


/**
 * Calls the supplied transport function and processes the results.
 *
 * This will also manage 429 responses and retry failed operations.
 *
 * @param {Object} task The arguments to pass to the transport.
 * @param {function} queueCb Callback to signal to the request queue that the request has completed.
 * @protected
 */
BaseAPIClient.prototype._callTransport = function _callTransport(task, queueCb) {
  var self = this;
  var retryOp = retry.operation(self.retryConfig);
  var retryArgs = {
    client: self,
    task: task,
    queueCb: queueCb,
    retryOp: retryOp
  };

  retryOp.attempt(function attemptTransportCall() {
    self.logger('verbose', 'BaseAPIClient _callTransport - Retrying ' + pick(task.args, 'url'));
    self.transport(task.args, partial(callTransport.handleTransportResponse, retryArgs));
  });
  this.logger('debug', 'BaseAPIClient _callTransport end');
};


/**
 * Makes a call to the Slack API.
 *
 * @param {string} endpoint The API endpoint to send to.
 * @param {Object} apiArgs
 * @param {Object} apiOptArgs
 * @param {function} optCb The callback to run on completion.
 * @private
 */
BaseAPIClient.prototype._makeAPICall = function _makeAPICall(endpoint, apiArgs, apiOptArgs, optCb) {
  var self = this;
  var apiCallArgs = clientHelpers.getAPICallArgs(
    self._token,
    globalHelpers.getVersionString(),
    self.slackAPIUrl,
    endpoint,
    apiArgs,
    apiOptArgs,
    optCb
  );
  var cb = apiCallArgs.cb;
  var args = apiCallArgs.args;
  var promise;

  if (!cb) {
    promise = new Promise(function makeAPICallPromiseResolver(resolve, reject) {
      self.requestQueue.push({
        args: args,
        cb: function makeAPICallPromiseResolverInner(err, res) {
          if (err) {
            reject(err);
          } else {
            // NOTE: inspecting the contents of the response and semantically mapping that to an
            // error should probably be some in one place for both callback based invokations, and
            // promise based invokations.
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
    self.requestQueue.push({
      args: args,
      cb: cb
    });
  }

  this.logger('debug', 'BaseAPIClient _makeAPICall end');
  return promise;
};


module.exports = BaseAPIClient;
