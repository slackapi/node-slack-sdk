import http from 'http';
import axios from 'axios';
import isString from 'lodash.isstring';
import isPlainObject from 'lodash.isplainobject';
import isRegExp from 'lodash.isregexp';
import isFunction from 'lodash.isfunction';
import debugFactory from 'debug';
import { createExpressMiddleware } from './express-middleware';
import { packageIdentifier, promiseTimeout, errorCodes as utilErrorCodes } from './util';

const debug = debugFactory('@slack/interactive-messages:adapter');

/**
 * Transforms various forms of matching constraints to a single standard object shape
 * @param {string|RegExp|Object} matchingConstraints - the various forms of matching constraints
 * accepted
 * @returns {Object} - an object where each matching constraint is a property
 */
function formatMatchingConstraints(matchingConstraints) {
  let ret = {};
  if (typeof matchingConstraints === 'undefined' || matchingConstraints === null) {
    throw new TypeError('Callback ID cannot be undefined or null');
  }
  if (!isPlainObject(matchingConstraints)) {
    ret.callbackId = matchingConstraints;
  } else {
    ret = Object.assign({}, matchingConstraints);
  }
  return ret;
}

/**
 * Validates general properties of a matching constraints object
 * @param {Object} matchingConstraints - object describing the constraints on a callback
 * @return {Error|false} - a false value represents successful validation, otherwise an error to
 * describe why validation failed.
 */
function validateConstraints(matchingConstraints) {
  if (matchingConstraints.callbackId &&
      !(isString(matchingConstraints.callbackId) || isRegExp(matchingConstraints.callbackId))) {
    return new TypeError('Callback ID must be a string or RegExp');
  }

  return false;
}

/**
 * Validates properties of a matching constraints object specific to registering an action
 * @param {Object} matchingConstraints - object describing the constraints on a callback
 * @return {Error|false} - a false value represents successful validation, otherwise an error to
 * describe why validation failed.
 */
function validateActionConstraints(actionConstraints) {
  if (actionConstraints.type &&
    !(actionConstraints.type === 'select' || actionConstraints.type === 'button' ||
    actionConstraints.type === 'dialog_submission')
  ) {
    return new TypeError('Type must be \'select\', \'button\', or \'dialog_submission\'');
  }

  // We don't need to validate unfurl, we'll just cooerce it to a boolean
  return false;
}

export default class SlackMessageAdapter {
  /**
   * Create a message adapter.
   *
   * @param {string} verificationToken - Slack app verification token used to authenticate request
   * @param {Object} [options]
   * @param {number} [options.syncResponseTimeout=2500] - number of milliseconds to wait before
   * flushing a syncrhonous response to an incoming request and falling back to an asynchronous
   * response.
   * @param {boolean} [options.lateResponseFallbackEnabled=true] - whether or not promises that
   * resolve after the syncResponseTimeout can fallback to a request for the response_url. this only
   * works in cases where the semantic meaning of the response and the response_url are the same.
   */
  constructor(verificationToken, {
    syncResponseTimeout = 2500,
    lateResponseFallbackEnabled = true,
  } = {}) {
    if (!isString(verificationToken)) {
      throw new TypeError('SlackMessageAdapter needs a verification token');
    }

    if (syncResponseTimeout > 3000 || syncResponseTimeout < 1) {
      throw new TypeError('syncResponseTimeout must be between 1 and 3000');
    }

    this.verificationToken = verificationToken;
    this.syncResponseTimeout = syncResponseTimeout;
    this.lateResponseFallbackEnabled = lateResponseFallbackEnabled;
    this.callbacks = [];
    this.axios = axios.create({
      headers: {
        'User-Agent': packageIdentifier(),
      },
    });

    debug('instantiated');
  }

  /**
   * Create a server that's ready to serve requests from Slack's interactive messages.
   *
   * @param {string} [path=/slack/actions] - The path portion of the URL where the server will
   * listen for requests from Slack's interactive messages.
   */
  createServer(path = '/slack/actions') {
    // TODO: more options (like https)
    return Promise.resolve().then(() => Promise.all([
      import('express'),
      import('body-parser'),
    ]))
      .then(([express, bodyParser]) => {
        const app = express();
        app.use(bodyParser.urlencoded({ extended: false }));
        app.post(path, this.expressMiddleware());

        debug('server created - path: %s', path);

        return http.createServer(app);
      });
  }

  start(port) {
    return this.createServer()
      .then(server => new Promise((resolve, reject) => {
        this.server = server;
        server.on('error', reject);
        server.listen(port, () => resolve(server));
        debug('server started - port: %s', port);
      }));
  }

  stop() {
    return new Promise((resolve, reject) => {
      if (this.server) {
        this.server.close((error) => {
          delete this.server;
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      } else {
        reject(new Error('SlackMessageAdapter cannot stop when it did not start a server'));
      }
    });
  }

  expressMiddleware() {
    return createExpressMiddleware(this);
  }

  action(matchingConstraints, callback) {
    const actionConstraints = formatMatchingConstraints(matchingConstraints);

    const error = validateConstraints(actionConstraints) ||
      validateActionConstraints(actionConstraints);
    if (error) {
      debug('action could not be registered: %s', error.message);
      throw error;
    }

    return this.registerCallback(actionConstraints, callback);
  }

  options(matchingConstraints, callback) {
    const optionsConstraints = formatMatchingConstraints(matchingConstraints);

    const error = validateConstraints(optionsConstraints);
    if (error) {
      debug('options could not be registered: %s', error.message);
      throw error;
    }

    return this.registerCallback(optionsConstraints, callback);
  }

  /* @private */

  registerCallback(constraints, callback) {
    // Validation
    if (!isFunction(callback)) {
      debug('did not register callback because its not a function');
      throw new TypeError('callback must be a function');
    }

    this.callbacks.push([constraints, callback]);

    return this;
  }

  dispatch(payload) {
    const action = payload.actions && payload.actions[0];

    // The following result value represents:
    // * "no replacement" for message actions
    // * "submission is valid" for dialog submissions
    // * "no suggestions" for menu options TODO: check that this is true
    let result = { status: 200, content: '' };

    // when a response_url is present,`respond()` function created to to send a message using it
    let respond;
    if (payload.response_url) {
      respond = (message) => {
        if (typeof message.then === 'function') {
          throw new TypeError('Cannot use a Promise as the parameter for respond()');
        }
        debug('sending async response');
        return this.axios.post(payload.response_url, message);
      };
    }

    this.callbacks.some(([constraints, fn]) => {
      // Returning false in this function continues the iteration, and returning true ends it.
      // The pattern is that we assign a value to `result` and then return true. We only desire one
      // result for the response.
      let callbackResult;

      if (constraints.callbackId) {
        if (isString(constraints.callbackId) && payload.callback_id !== constraints.callbackId) {
          return false;
        }
        if (isRegExp(constraints.callbackId) && !constraints.callbackId.test(payload.callback_id)) {
          return false;
        }
      }

      if (action && constraints.type && constraints.type !== action.type) {
        return false;
      }

      if ('unfurl' in constraints &&
        (
          (constraints.unfurl && !payload.is_app_unfurl) ||
          (!constraints.unfurl && payload.is_app_unfurl)
        )
      ) {
        return false;
      }

      try {
        callbackResult = fn.call(this, payload, respond);
      } catch (error) {
        debug('callback error: %o', error);
        result = { status: 500 };
        return true;
      }

      if (callbackResult) {
        const contentConsideringTimeout = promiseTimeout(this.syncResponseTimeout, callbackResult)
          .catch((error) => {
            if (error.code === utilErrorCodes.PROMISE_TIMEOUT) {
              // don't save late promises for dialog submission, the response_url doesn't do the
              // same thing as the response. developer should be warned that the promise is taking
              // too much time
              if (!this.lateResponseFallbackEnabled || !respond || payload.type === 'dialog_submission') {
                debug('WARNING: The response Promise did not resolve under the timeout.');
                return callbackResult;
              }

              // save a late promise by sending an empty body in the response, and then using the
              // response_url to send the eventually resolved value
              callbackResult.then(respond).catch((callbackError) => {
                // when the promise is late and fails, won't send it to the response_url, log it
                debug('ERROR: Promise was late and failed. Use `.catch()` to handle errors.');
                throw callbackError;
              });
              return '';
            }
            // NOTE: this should either not happen or be configurable
            return 'An error occurred. Please report this to the app developer.';
          });
        result = { status: 200, content: contentConsideringTimeout };
        return true;
      }
      return true;
    });

    return result;
  }
}
