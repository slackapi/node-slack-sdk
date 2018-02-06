import EventEmitter = require('eventemitter3'); // tslint:disable-line:import-name no-require-imports
import PQueue = require('p-queue'); // tslint:disable-line:import-name no-require-imports
import retry = require('retry'); // tslint:disable-line:no-require-imports
import retryPolicies from './retry-policies';
import { LogLevel, Logger, LoggingFunc, getLogger, isLogger, loggerFromLoggingFunc } from '../logger';

// let callTransport = require('./transports/call-transport');
// let globalHelpers = require('../helpers');
// let clientHelpers = require('./helpers');
// let requestsTransport = require('./transports/request').requestTransport;

export interface WebClientOptions {
  slackApiUrl?: string; // SEMVER:MAJOR casing change from previous
  // NOTE: this is too generic but holding off on fully specifying until callTransport is refactored
  transport?: Function;
  logger?: LoggingFunc;
  logLevel?: LogLevel;
  maxRequestConcurrency?: number;
  retryConfig?: retry.OperationOptions;
}

export interface WebAPICallOptions {
}

// TODO: remove
const noop = () => {}; // tslint:disable-line:no-empty

/**
 * A client for Slack's Web API
 */
export class WebClient extends EventEmitter {
  /**
   * Authentication and authorization token for accessing Slack Web API (usually begins with `xoxp`, `xoxb`, or `xoxa`)
   */
  public readonly token: string;
  /**
   * The base URL for reaching Slack's Web API. Consider changing this value for testing purposes.
   */
  public readonly slackApiUrl: string;

  /**
   * A function for executing an HTTP request
   */
  private transport: Function;

  /**
   * Configuration for retry operations. See {@link https://github.com/tim-kos/node-retry|node-retry} for more details.
   */
  private retryConfig: retry.OperationOptions;

  /**
   * Queue of requests in which a maximum of {@link WebClientOptions.maxRequestConcurrency} can concurrently be
   * in-flight.
   */
  private requestQueue: PQueue;

  /**
   * Logging
   */
  private logger: Logger;

  /**
   * @param token - An API token to authenticate/authorize with Slack (usually start with `xoxp`, `xoxb`, or `xoxa`)
   */
  constructor(token: string, {
    slackApiUrl = 'https://slack.com/api/',
    transport = noop,
    logger = undefined,
    logLevel = LogLevel.INFO,
    maxRequestConcurrency = 3,
    retryConfig = retryPolicies.retryForeverExponentialCappedRandom,
  }: WebClientOptions = {}) {
    super();
    this.token = token;
    this.slackApiUrl = slackApiUrl;

    this.transport = transport;
    this.retryConfig = retryConfig;

    this.requestQueue = new PQueue({ concurrency: maxRequestConcurrency });

    if (logger) {
      this.logger = loggerFromLoggingFunc('@slack/client:WebClient', logger);
    } else {
      // TODO: turn this string into a class property
      this.logger = getLogger('@slack/client:WebClient');
    }
    this.logger.setLevel(logLevel);

    this.createFacets();

    this.logger.debug('initialized');
  }

  /**
   * Initializes each of the API facets.
   */
  private createFacets() {
    this.logger.debug('createFacets() start');
  }

  /**
   * Generic method for calling a Web API method
   *
   * @param method the Web API method to call {@see https://api.slack.com/methods}
   * @param options options
   * @param callback callback if you don't want a promise returned
   */
  public apiCall(method: string, options?: WebAPICallOptions, callback?: Function) {
    this.logger.debug('apiCall() start');
  }
}

/**
 * Calls the supplied transport function and processes the results.
 *
 * This will also manage 429 responses and retry failed operations.
 *
 * @param {Object} task The arguments to pass to the transport.
 * @param {function} queueCb Callback to signal to the request queue that the request has completed.
 * @protected
 */
// BaseAPIClient.prototype._callTransport = function _callTransport(task, queueCb) {
//   let self = this;
//   let retryOp = retry.operation(self.retryConfig);
//   let retryArgs = {
//     client: self,
//     task,
//     queueCb,
//     retryOp,
//   };

//   retryOp.attempt(function attemptTransportCall() {
//     self.logger('verbose', 'BaseAPIClient _callTransport - Retrying ' + pick(task.args, 'url'));
//     self.transport(task.args, partial(callTransport.handleTransportResponse, retryArgs));
//   });
//   this.logger('debug', 'BaseAPIClient _callTransport end');
// };


/**
 * Makes a call to the Slack API.
 *
 * @param {string} endpoint The API endpoint to send to.
 * @param {Object} apiArgs
 * @param {Object} apiOptArgs
 * @param {function} optCb The callback to run on completion.
 * @private
 */
// BaseAPIClient.prototype._makeAPICall = function _makeAPICall(endpoint, apiArgs, apiOptArgs, optCb) {
//   let self = this;
//   let apiCallArgs = clientHelpers.getAPICallArgs(
//     self._token,
//     globalHelpers.getVersionString(),
//     self.slackAPIUrl,
//     endpoint,
//     apiArgs,
//     apiOptArgs,
//     optCb,
//   );
//   let cb = apiCallArgs.cb;
//   let args = apiCallArgs.args;
//   let promise;

//   if (!cb) {
//     promise = new Promise(function makeAPICallPromiseResolver(resolve, reject) {
//       self.requestQueue.push({
//         args,
//         cb: function makeAPICallPromiseResolverInner(err, res) {
//           if (err) {
//             reject(err);
//           } else {
//             // NOTE: inspecting the contents of the response and semantically mapping that to an
//             // error should probably be some in one place for both callback based invokations, and
//             // promise based invokations.
//             if (!res.ok) {
//               reject(new SlackAPIError(res.error));
//             } else {
//               resolve(res);
//             }
//           }
//         },
//       });
//     });
//   } else {
//     self.requestQueue.push({
//       args,
//       cb,
//     });
//   }

//   this.logger('debug', 'BaseAPIClient _makeAPICall end');
//   return promise;
// };


// module.exports = BaseAPIClient;

export default WebClient;
