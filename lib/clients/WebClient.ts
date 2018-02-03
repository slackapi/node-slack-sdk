import EventEmitter = require('eventemitter3'); // tslint:disable-line:import-name no-require-imports
import PQueue = require('p-queue'); // tslint:disable-line:import-name no-require-imports
import retry = require('retry'); // tslint:disable-line:no-require-imports
import retryPolicies from './retry-policies';
import { getLogger, Logger } from 'aurelia-logging';
import { LogLevel, setLogLevel } from '../logger';

// let callTransport = require('./transports/call-transport');
// let globalHelpers = require('../helpers');
// let clientHelpers = require('./helpers');
// let requestsTransport = require('./transports/request').requestTransport;

export interface WebClientOptions {
  slackApiUrl?: string; // SEMVER:MAJOR casing change from previous
  // NOTE: this is too generic but holding off on fully specifying until callTransport is refactored
  transport?: Function;
  logLevel?: LogLevel;
  maxRequestConcurrency?: number;
  retryConfig?: retry.OperationOptions;
}

// TODO: remove
const noop = () => {}; // tslint:disable-line:no-empty

export default class WebClient extends EventEmitter {
  public readonly token: string;
  public readonly slackApiUrl: string;

  private transport: Function;
  private logger: Logger;
  private maxRequestConcurrency: number;
  private retryConfig: retry.OperationOptions;

  /**
   * @param token - An API token to authenticate/authorize with Slack (usually start with `xoxp`, `xoxb`, or `xoxa`)
   */
  constructor(token: string, {
    slackApiUrl = 'https://api.slack.com',
    transport = noop,
    logLevel = LogLevel.Info,
    maxRequestConcurrency = 3,
    retryConfig = retryPolicies.retryForeverExponentialCappedRandom,
  }: WebClientOptions = {}) {
    super();
    this.token = token;
    this.slackApiUrl = slackApiUrl;
    this.transport = transport;
    this.maxRequestConcurrency = maxRequestConcurrency;
    this.retryConfig = retryConfig;

    this.logger = getLogger('WebClient');
    setLogLevel(this.logger, logLevel);

    // TODO: call createFacets()
  }
}

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
  let clientOpts = opts || {};
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
    clientOpts.maxRequestConcurrency || 3,
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
  let self = this;
  let retryOp = retry.operation(self.retryConfig);
  let retryArgs = {
    client: self,
    task,
    queueCb,
    retryOp,
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
  let self = this;
  let apiCallArgs = clientHelpers.getAPICallArgs(
    self._token,
    globalHelpers.getVersionString(),
    self.slackAPIUrl,
    endpoint,
    apiArgs,
    apiOptArgs,
    optCb,
  );
  let cb = apiCallArgs.cb;
  let args = apiCallArgs.args;
  let promise;

  if (!cb) {
    promise = new Promise(function makeAPICallPromiseResolver(resolve, reject) {
      self.requestQueue.push({
        args,
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
        },
      });
    });
  } else {
    self.requestQueue.push({
      args,
      cb,
    });
  }

  this.logger('debug', 'BaseAPIClient _makeAPICall end');
  return promise;
};


module.exports = BaseAPIClient;
