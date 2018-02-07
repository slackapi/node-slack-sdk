import EventEmitter = require('eventemitter3'); // tslint:disable-line:import-name no-require-imports
import PQueue = require('p-queue'); // tslint:disable-line:import-name no-require-imports
import pRetry = require('p-retry'); // tslint:disable-line:no-require-imports
import retry = require('retry'); // tslint:disable-line:no-require-imports
import retryPolicies from './retry-policies';
import { LogLevel, Logger, LoggingFunc, getLogger, loggerFromLoggingFunc } from '../logger';
import { pkg, callbackify } from '../util';
import { CodedError } from '../errors';
import got = require('got'); // tslint:disable-line:no-require-imports
import urlJoin = require('url-join'); // tslint:disable-line:no-require-imports
import objectEntries = require('object.entries'); // tslint:disable-line:no-require-imports
import Method, * as methods from './methods'; // tslint:disable-line:import-name

// SEMVER:MAJOR no transport option

// TODO: document how to access custom CA settings
// TODO: document how to use proxy configuration
// TODO: export these interfaces and class at the top level

export interface WebClientOptions {
  slackApiUrl?: string; // SEMVER:MAJOR casing change from previous
  logger?: LoggingFunc;
  logLevel?: LogLevel;
  maxRequestConcurrency?: number;
  retryConfig?: RetryOptions;
}

export interface WebAPICallOptions {
}

export interface WebAPICallResult {
}

export interface WebAPIResultCallback {
  (error: CodedError, result: WebAPICallResult): void;
}

export interface RetryOptions extends retry.OperationOptions {
}

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
   * Configuration for retry operations. See {@link https://github.com/tim-kos/node-retry|node-retry} for more details.
   */
  private retryConfig: RetryOptions;

  /**
   * Queue of requests in which a maximum of {@link WebClientOptions.maxRequestConcurrency} can concurrently be
   * in-flight.
   */
  private requestQueue: PQueue;

  /**
   * Logging
   */
  private logger: Logger;
  private static loggerName = `${pkg.name}:WebClient`;

  /**
   * @param token - An API token to authenticate/authorize with Slack (usually start with `xoxp`, `xoxb`, or `xoxa`)
   */
  constructor(token: string, {
    slackApiUrl = 'https://slack.com/api/',
    logger = undefined,
    logLevel = LogLevel.INFO,
    maxRequestConcurrency = 3,
    retryConfig = retryPolicies.retryForeverExponentialCappedRandom,
  }: WebClientOptions = {}) {
    super();
    this.token = token;
    this.slackApiUrl = slackApiUrl;

    // Reliability
    this.retryConfig = retryConfig;
    this.requestQueue = new PQueue({ concurrency: maxRequestConcurrency });

    // Logging
    if (logger) {
      this.logger = loggerFromLoggingFunc(WebClient.loggerName, logger);
    } else {
      this.logger = getLogger(WebClient.loggerName);
    }
    this.logger.setLevel(logLevel);

    this.logger.debug('initialized');
  }

  /**
   * Generic method for calling a Web API method
   *
   * @param method the Web API method to call {@see https://api.slack.com/methods}
   * @param options options
   * @param callback callback if you don't want a promise returned
   *
   * TODO: accept callback without options
   */
  public apiCall(method: string,
                 options?: WebAPICallOptions,
                 callback?: WebAPIResultCallback): Promise<WebAPICallResult> | void {
    this.logger.debug('apiCall() start');

    // The following thunk is the actual implementation for this method. It is wrapped so that it can be adapted for
    // different executions below.
    const implementation = () => {
      const requestBody = WebClient.serializeApiCallOptions(Object.assign({ token: this.token }, options));

      // The following thunk encapsulates the task so that it can be coordinated for retries
      const task = async (): Promise<WebAPICallResult> => {
        // TODO: formData handling
        const response = await got.post(urlJoin(this.slackApiUrl, method), {
          form: true,
          body: requestBody,
          retries: 0,
          // TODO: user-agent
          headers: {},
        });
        // TODO: handle errors
        // TODO: handle rate-limiting
        return JSON.parse(response.body);
      };

      // The following thunk encapsulates the retried task so that it can be coordinated for request queuing
      const taskAfterRetries = () => pRetry(task, this.retryConfig);

      // The final return value is the resolution of the task after being retried and queued
      return this.requestQueue.add(taskAfterRetries);
    };

    // Adapt the interface for callback-based execution or Promise-based execution
    if (callback) {
      callbackify(implementation)(callback);
      return;
    }
    return implementation();
  }

  /**
   * Users method family
   */
  public readonly users = {
    deletePhoto: (this.apiCall.bind(this, 'users.deletePhoto')) as Method<methods.UsersDeletePhotoArguments>,
    getPresence: (this.apiCall.bind(this, 'users.getPresence')) as Method<methods.UsersGetPresenceArguments>,
    identity: (this.apiCall.bind(this, 'users.identity')) as Method<methods.UsersIdentityArguments>,
    info: (this.apiCall.bind(this, 'users.info')) as Method<methods.UsersInfoArguments>,
    list: (this.apiCall.bind(this, 'users.list')) as Method<methods.UsersListArguments>,
    lookupByEmail: (this.apiCall.bind(this, 'users.lookupByEmail')) as Method<methods.UsersLookupByEmailArguments>,
    setActive: (this.apiCall.bind(this, 'users.setActive')) as Method<methods.UsersSetActiveArguments>,
    setPhoto: (this.apiCall.bind(this, 'users.setPhoto')) as Method<methods.UsersSetPhotoArguments>,
    setPresence: (this.apiCall.bind(this, 'users.setPresence')) as Method<methods.UsersSetPresenceArguments>,
  };

  /**
   * Flattens options into a key-value object that is suitable for serializing into a body in the
   * `application/x-www-form-urlencoded` content type.
   *
   * @param options arguments for the Web API method
   */
  private static serializeApiCallOptions(options: WebAPICallOptions): {[key: string]: string | number | boolean } {
    return objectEntries(options)
      .map(([key, value]) => {
        if (value === undefined) {
          return [];
        }
        let serializedValue = value;
        // if value is anything other than string, number, boolean: json stringify it
        if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
          serializedValue = JSON.stringify(value);
        }
        return [key, serializedValue];
      })
      .reduce((accumulator, [key, value]) => {
        if (key !== undefined && value !== undefined) {
          accumulator[key] = value;
        }
        return accumulator;
      }, {});
  }
}

// TODO enforce existence of token option in specific facets

export default WebClient;
