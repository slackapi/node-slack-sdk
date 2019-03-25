/**
 * @module adapter
 */

import http from 'http';
import axios from 'axios';
import isString from 'lodash.isstring';
import isPlainObject from 'lodash.isplainobject';
import isRegExp from 'lodash.isregexp';
import isFunction from 'lodash.isfunction';
import debugFactory from 'debug';
import { createHTTPHandler } from './http-handler';
import { packageIdentifier, promiseTimeout, errorCodes as utilErrorCodes } from './util';

const debug = debugFactory('@slack/interactive-messages:adapter');

export const errorCodes = {
  BODY_PARSER_NOT_PERMITTED: 'SLACKADAPTER_BODY_PARSER_NOT_PERMITTED_FAILURE',
};

/**
 * Transforms various forms of matching constraints to a single standard object shape
 * @param {string|RegExp|Object} matchingConstraints - the various forms of matching constraints
 * accepted
 * @returns {Object} - an object where each matching constraint is a property
 * @private
 */
function formatMatchingConstraints(matchingConstraints) {
  let ret = {};
  if (typeof matchingConstraints === 'undefined' || matchingConstraints === null) {
    throw new TypeError('Constraints cannot be undefined or null');
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
 * @returns {Error|false} - a false value represents successful validation, otherwise an error to
 * describe why validation failed.
 * @private
 */
function validateConstraints(matchingConstraints) {
  if (matchingConstraints.callbackId &&
      !(isString(matchingConstraints.callbackId) || isRegExp(matchingConstraints.callbackId))) {
    return new TypeError('Callback ID must be a string or RegExp');
  }

  if (matchingConstraints.blockId &&
    !(isString(matchingConstraints.blockId) || isRegExp(matchingConstraints.blockId))) {
    return new TypeError('Block ID must be a string or RegExp');
  }

  if (matchingConstraints.actionId &&
    !(isString(matchingConstraints.actionId) || isRegExp(matchingConstraints.actionId))) {
    return new TypeError('Action ID must be a string or RegExp');
  }

  return false;
}

/**
 * Validates properties of a matching constraints object specific to registering an options request
 * @param {Object} matchingConstraints - object describing the constraints on a callback
 * @returns {Error|false} - a false value represents successful validation, otherwise an error to
 * describe why validation failed.
 * @private
 */
function validateOptionsConstraints(optionsConstraints) {
  if (optionsConstraints.within &&
    !(optionsConstraints.within === 'interactive_message' ||
      optionsConstraints.within === 'block_actions' ||
      optionsConstraints.within === 'dialog')
  ) {
    return new TypeError('Within must be \'block_actions\', \'interactive_message\' or \'dialog\'');
  }

  // We don't need to validate unfurl, we'll just cooerce it to a boolean
  return false;
}

/**
 * An adapter for Slack's interactive message components such as buttons, menus, and dialogs.
 * @typicalname slackInteractions
 */
export class SlackMessageAdapter {
  /**
   * Create a message adapter.
   *
   * @param {string} signingSecret - Slack app signing secret used to authenticate request
   * @param {Object} [options]
   * @param {number} [options.syncResponseTimeout=2500] - number of milliseconds to wait before
   * flushing a syncrhonous response to an incoming request and falling back to an asynchronous
   * response.
   * @param {boolean} [options.lateResponseFallbackEnabled=true] - whether or not promises that
   * resolve after the syncResponseTimeout can fallback to a request for the response_url. this only
   * works in cases where the semantic meaning of the response and the response_url are the same.
   */
  constructor(signingSecret, {
    syncResponseTimeout = 2500,
    lateResponseFallbackEnabled = true,
  } = {}) {
    if (!isString(signingSecret)) {
      throw new TypeError('SlackMessageAdapter needs a signing secret');
    }

    if (syncResponseTimeout > 3000 || syncResponseTimeout < 1) {
      throw new TypeError('syncResponseTimeout must be between 1 and 3000');
    }

    this.signingSecret = signingSecret;
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

  /* Interface for using the built-in server */

  /**
   * Create a server that dispatches Slack's interactive message actions and menu requests to this
   * message adapter instance. Use this method if your application will handle starting the server.
   *
   * @param {string} [path=/slack/actions] - The path portion of the URL where the server will
   * listen for requests from Slack's interactive messages.
   * @returns {Promise<NodeHttpServer>} - A promise that resolves to an instance of http.Server and
   * will dispatch interactive message actions and options requests to this message adapter
   * instance. https://nodejs.org/dist/latest/docs/api/http.html#http_class_http_server
   */
  createServer(path = '/slack/actions') {
    // TODO: more options (like https)
    return Promise.resolve().then(() => {
      debug('server created - path: %s', path);

      return http.createServer(this.requestListener());
    });
  }

  /**
   * Start a built-in server that dispatches Slack's interactive message actions and menu requests
   * to this message adapter interface.
   *
   * @param {number} port
   * @returns {Promise<void>} - A promise that resolves once the server is ready
   */
  start(port) {
    return this.createServer()
      .then(server => new Promise((resolve, reject) => {
        this.server = server;
        server.on('error', reject);
        server.listen(port, () => resolve(server));
        debug('server started - port: %s', port);
      }));
  }

  /**
   * Stop the previously started built-in server.
   *
   * @returns {Promise<void>} - A promise that resolves once the server is cleaned up.
   */
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

  /* Interface for bringing your own server */

  /**
   * Create a middleware function that can be used to integrate with the `express` web framework
   * in order for incoming requests to be dispatched to this message adapter instance.
   *
   * @returns {ExpressMiddlewareFunc} - A middleware function http://expressjs.com/en/guide/using-middleware.html
   */
  expressMiddleware() {
    const requestListener = this.requestListener();
    return (req, res, next) => {
      // If parser is being used, we can't verify request signature
      if (req.body) {
        const error = new Error('Parsing request body prohibits request signature verification');
        error.code = errorCodes.BODY_PARSER_NOT_PERMITTED;
        next(error);
        return;
      }
      requestListener(req, res);
    };
  }

  /**
   * Create a request listener function that handles HTTP requests, verifies requests
   * and dispatches responses
   *
   * @returns {slackRequestListener}
   */
  requestListener() {
    return createHTTPHandler(this);
  }

  /* Interface for adding handlers */

  /* eslint-disable max-len */
  /**
   * Add a handler for an interactive message action.
   *
   * Usually there's no need to be concerned with _how_ a message is sent to Slack, but the
   * following table describes it fully.
   *
   * **Action**|**Return `object`**|**Return `Promise<object>`**|**Return `undefined`**|**Call `respond(message)`**|**Notes**
   * :-----:|:-----:|:-----:|:-----:|:-----:|:-----:
   * **Button Press**| Message in response | When resolved before `syncResposeTimeout` or `lateResponseFallbackEnabled: false`, message in response<br />When resolved after `syncResponseTimeout` and `lateResponseFallbackEnabled: true`, message in request to `response_url` | Empty response | Message in request to `response_url` | Create a new message instead of replacing using `replace_original: false`
   * **Menu Selection**| Message in response | When resolved before `syncResposeTimeout` or `lateResponseFallbackEnabled: false`, message in response<br />When resolved after `syncResponseTimeout` and `lateResponseFallbackEnabled: true`, message in request to `response_url` | Empty response | Message in request to `response_url` | Create a new message instead of replacing using `replace_original: false`
   * **Message Action** | Message in response | When resolved before `syncResposeTimeout` or `lateResponseFallbackEnabled: false`, message in response<br />When resolved after `syncResponseTimeout` and `lateResponseFallbackEnabled: true`, message in request to `response_url` | Empty response | Message in request to `response_url` |
   * **Dialog Submission**| Error list in response | Error list in response | Empty response | Message in request to `response_url` | Returning a Promise that takes longer than 3 seconds to resolve can result in the user seeing an error. Warning logged if a promise isn't completed before `syncResponseTimeout`.
   *
   * @param {Object|string|RegExp} matchingConstraints - the callback ID (as a string or RegExp) or
   * an object describing the constraints to match actions for the handler.
   * @param {string|RegExp} [matchingConstraints.callbackId] - a string or RegExp to match against
   * the `callback_id`
   * @param {string|RegExp} [matchingConstraints.blockId] - a string or RegExp to match against
   * the `block_id`
   * @param {string|RegExp} [matchingConstraints.actionId] - a string or RegExp to match against
   * the `action_id`
   * @param {string} [matchingConstraints.type] - valid types include all
   * [actions block elements](https://api.slack.com/reference/messaging/interactive-components),
   * `select` only for menu selections, or `dialog_submission` only for dialog submissions
   * @param {boolean} [matchingConstraints.unfurl] - when `true` only match actions from an unfurl
   * @param {module:adapter~SlackMessageAdapter~ActionHandler} callback - the function to run when
   * an action is matched
   * @returns {module:adapter~SlackMessageAdapter} - this instance (for chaining)
   */
  action(matchingConstraints, callback) {
    /* eslint-enable max-len */
    const actionConstraints = formatMatchingConstraints(matchingConstraints);
    actionConstraints.handlerType = 'action';

    const error = validateConstraints(actionConstraints);
    if (error) {
      debug('action could not be registered: %s', error.message);
      throw error;
    }

    return this.registerCallback(actionConstraints, callback);
  }

  /* eslint-disable max-len */
  /**
   * Add a handler for an options request
   *
   * Usually there's no need to be concerned with _how_ a message is sent to Slack, but the
   * following table describes it fully
   *
   * &nbsp;|**Return `options`**|**Return `Promise<options>`**|**Return `undefined`**|**Notes**
   * :-----:|:-----:|:-----:|:-----:|:-----:
   * **Options Request**| Options in response | Options in response | Empty response | Returning a Promise that takes longer than 3 seconds to resolve can result in the user seeing an error. If the request is from within a dialog, the `text` field is called `label`.
   *
   * @param {object} matchingConstraints - the callback ID (as a string or RegExp) or
   * an object describing the constraints to select options requests for the handler.
   * @param {string|RegExp} [matchingConstraints.callbackId] - a string or RegExp to match against
   * the `callback_id`
   * @param {string|RegExp} [matchingConstraints.blockId] - a string or RegExp to match against
   * the `block_id`
   * @param {string|RegExp} [matchingConstraints.actionId] - a string or RegExp to match against
   * the `action_id`
   * @param {string} [matchingConstraints.within] - `block_actions` only for external select
   * in actions block, `interactive_message` only for menus in an interactive message, or
   * `dialog` only for menus in a dialog
   * @param {module:adapter~SlackMessageAdapter~OptionsHandler} callback - the function to run when
   * an options request is matched
   * @returns {module:adapter~SlackMessageAdapter} - this instance (for chaining)
   */
  options(matchingConstraints, callback) {
    /* eslint-enable max-len */
    const optionsConstraints = formatMatchingConstraints(matchingConstraints);
    optionsConstraints.handlerType = 'options';

    const error = validateConstraints(optionsConstraints) ||
      validateOptionsConstraints(optionsConstraints);
    if (error) {
      debug('options could not be registered: %s', error.message);
      throw error;
    }

    return this.registerCallback(optionsConstraints, callback);
  }

  /* Interface for HTTP servers (like express middleware) */

  /**
   * Dispatches the contents of an HTTP request to the registered handlers.
   *
   * @param {object} payload
   * @returns {Promise<{ status: number, content: object|string|undefined }>|undefined} - A promise
   * of the response information (an object with status and content that is a JSON serializable
   * object or a string or undefined) for the request. An undefined return value indicates that the
   * request was not matched.
   * @private
   */
  dispatch(payload) {
    const callback = this.matchCallback(payload);
    if (!callback) {
      debug('dispatch could not find a handler');
      return undefined;
    }
    debug('dispatching to handler');
    const [, callbackFn] = callback;

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

    let callbackResult;
    try {
      callbackResult = callbackFn.call(this, payload, respond);
    } catch (error) {
      debug('callback error: %o', error);
      return Promise.resolve({ status: 500 });
    }

    if (callbackResult) {
      return promiseTimeout(this.syncResponseTimeout, callbackResult)
        .then(content => ({ status: 200, content }))
        .catch((error) => {
          if (error.code === utilErrorCodes.PROMISE_TIMEOUT) {
            // warn and continue for promises that cannot be saved with a later async response.
            // this includes dialog submissions because the response_url doesn't have the same
            // semantics as the response, any request that doesn't contain a response_url, and
            // if this has been explicitly disabled in the configuration.
            if (!this.lateResponseFallbackEnabled || !respond || payload.type === 'dialog_submission') {
              debug('WARNING: The response Promise did not resolve under the timeout.');
              return callbackResult
                .then(content => ({ status: 200, content }))
                .catch(() => ({ status: 500 }));
            }

            // save a late promise by sending an empty body in the response, and then use the
            // response_url to send the eventually resolved value
            callbackResult.then(respond).catch((callbackError) => {
              // when the promise is late and fails, we cannot do anything but log it
              debug('ERROR: Promise was late and failed. Use `.catch()` to handle errors.');
              throw callbackError;
            });
            return { status: 200 };
          }

          return { status: 500 };
        });
    }

    // The following result value represents:
    // * "no replacement" for message actions
    // * "submission is valid" for dialog submissions
    // * "no suggestions" for menu options TODO: check that this is true
    return Promise.resolve({ status: 200 });
  }

  /**
   * @private
   */
  registerCallback(constraints, callback) {
    // Validation
    if (!isFunction(callback)) {
      debug('did not register callback because its not a function');
      throw new TypeError('callback must be a function');
    }

    this.callbacks.push([constraints, callback]);

    return this;
  }

  /**
   * @private
   */
  matchCallback(payload) {
    return this.callbacks.find(([constraints]) => {
      // if the callback ID constraint is specified, only continue if it matches
      if (constraints.callbackId) {
        if (isString(constraints.callbackId) && payload.callback_id !== constraints.callbackId) {
          return false;
        }
        if (isRegExp(constraints.callbackId) && !constraints.callbackId.test(payload.callback_id)) {
          return false;
        }
      }

      // if the action constraint is specified, only continue if it matches
      if (constraints.handlerType === 'action') {
        // a payload that represents an action either has actions, submission, or message defined
        if (!(payload.actions || payload.submission || payload.message)) {
          return false;
        }

        // dialog submissions don't have an action defined, so an empty action is substituted for
        // the purpose of callback matching
        const action = payload.actions ? payload.actions[0] : {};

        // if the block ID constraint is specified, only continue if it matches
        if (constraints.blockId) {
          if (isString(constraints.blockId) && action.block_id !== constraints.blockId) {
            return false;
          }
          if (isRegExp(constraints.blockId) && !constraints.blockId.test(action.block_id)) {
            return false;
          }
        }

        // if the action ID constraint is specified, only continue if it matches
        if (constraints.actionId) {
          if (isString(constraints.actionId) && action.action_id !== constraints.actionId) {
            return false;
          }
          if (isRegExp(constraints.actionId) && !constraints.actionId.test(action.action_id)) {
            return false;
          }
        }

        // button and message actions have a type defined inside the action, dialog submission
        // actions have a type defined at the top level, and select actions don't have a type
        // defined, but type can be inferred by checking if a `selected_options` property exists in
        // the action.
        const type = action.type || payload.type || (action.selected_options && 'select');
        if (!type) {
          debug('no type found in dispatched action');
        }
        // if the type constraint is specified, only continue if it matches
        if (constraints.type && constraints.type !== type) {
          return false;
        }

        // if the unfurl constraint is specified, only continue if it matches
        if ('unfurl' in constraints &&
          (
            (constraints.unfurl && !payload.is_app_unfurl) ||
            (!constraints.unfurl && payload.is_app_unfurl)
          )
        ) {
          return false;
        }
      }

      if (constraints.handlerType === 'options') {
        // a payload that represents an options request in attachments always has a name defined
        // at the top level. in blocks the type is block_suggestion and has no name
        if (!('name' in payload || (payload.type && payload.type === 'block_suggestion'))) {
          return false;
        }

        // if the block ID constraint is specified, only continue if it matches
        if (constraints.blockId) {
          if (isString(constraints.blockId) && payload.block_id !== constraints.blockId) {
            return false;
          }
          if (isRegExp(constraints.blockId) && !constraints.blockId.test(payload.block_id)) {
            return false;
          }
        }

        // if the action ID constraint is specified, only continue if it matches
        if (constraints.actionId) {
          if (isString(constraints.actionId) && payload.action_id !== constraints.actionId) {
            return false;
          }
          if (isRegExp(constraints.actionId) && !constraints.actionId.test(payload.action_id)) {
            return false;
          }
        }

        // an options request always has a type at the top level which can be one of three values
        // that need to be mapped into the values for the `within` constraint:
        // * type:interactive_message => within:interactive_message
        // * type:block_suggestion => within:block_actions
        // * type:dialog_suggestion => within:dialog
        if (constraints.within) {
          if (constraints.within === 'interactive_message' && payload.type !== 'interactive_message') {
            return false;
          }
          if (constraints.within === 'block_actions' && payload.type !== 'block_suggestion') {
            return false;
          }
          if (constraints.within === 'dialog' && payload.type !== 'dialog_suggestion') {
            return false;
          }
        }
      }

      // if there's no reason to eliminate this callback, then its a match!
      return true;
    });
  }
}

/**
 * @alias module:adapter
 */
export default SlackMessageAdapter;

/**
 * @external ExpressMiddlewareFunc
 * @see http://expressjs.com/en/guide/using-middleware.html
 */

/**
 * @external NodeHttpServer
 * @see https://nodejs.org/dist/latest/docs/api/http.html#http_class_http_server
 */

/**
 * A handler function for action requests (block actions, button presses, menu selections,
 * and dialog submissions).
 *
 * @name module:adapter~SlackMessageAdapter~ActionHandler
 * @function
 * @param {Object} payload - an object describing the
 * [block actions](https://api.slack.com/messaging/interactivity/enabling#understanding-payloads)
 * [button press](https://api.slack.com/docs/message-buttons#responding_to_message_actions),
 * [menu selection](https://api.slack.com/docs/message-menus#request_url_response), or
 * [dialog submission](https://api.slack.com/dialogs#evaluating_submission_responses).
 * @param {module:adapter~SlackMessageAdapter~ActionHandler~Respond} respond - When the action is a
 * button press or menu selection, this function is used to update the message where the action
 * occurred or create new messages in the same conversation. When the action is a dialog submission,
 * this function is used to create new messages in the conversation where the dialog was triggered.
 * @returns {Object} When the action is a button press or a menu selection, this object is a
 * replacement
 * [message](https://api.slack.com/docs/interactive-message-field-guide#top-level_message_fields)
 * for the message in which the action occurred. It may also be a Promise for a message, and if so
 * and the Promise takes longer than the `syncResponseTimeout` to complete, the message is sent over
 * the `response_url`. The message may also be a new message in the same conversation by setting
 * `replace_original: false`. When the action is a dialog submission, this object is a list of
 * [validation errors](https://api.slack.com/dialogs#input_validation). It may also be a Promise for
 * a list of validation errors, and if so and the Promise takes longer than the
 * `syncReponseTimeout` to complete, Slack will display an error to the user. If there is no return
 * value, then button presses and menu selections do not update the message and dialog submissions
 * will validate and dismiss.
 */

/**
 * A function used to send message updates after an action is handled. This function can be used
 * up to 5 times in 30 minutes.
 *
 * @name module:adapter~SlackMessageAdapter~ActionHandler~Respond
 * @function
 * @param {Object} message - a
 * [message](https://api.slack.com/docs/interactive-message-field-guide#top-level_message_fields).
 * Dialog submissions do not allow `resplace_original: false` on this message.
 * @returns {Promise} there's no contract or interface for the resolution value, but this Promise
 * will resolve when the HTTP response from the `response_url` request is complete and reject when
 * there is an error.
 */

/**
 * A handler function for menu options requests.
 *
 * @name module:adapter~SlackMessageAdapter~OptionsHandler
 * @function
 * @param {Object} payload - an object describing
 * [the state of the menu](https://api.slack.com/docs/message-menus#options_load_url)
 * @returns {Object} an
 * [options list](https://api.slack.com/docs/interactive-message-field-guide#option_fields) or
 * [option groups list](https://api.slack.com/docs/interactive-message-field-guide#option_groups).
 * When the menu is within an interactive message, (`within: 'interactive_message'`) the option
 * keys are `text` and `value`. When the menu is within a dialog (`within: 'dialog'`) the option
 * keys are `label` and `value`. When the menu is within a dialog (`within: 'block_actions'`) the
 * option keys are a text block and `value`. This function may also return a Promise either of
 * these values. If a Promise is returned and it does not complete within 3 seconds, Slack will
 * display an error to the user. If there is no return value, then the user is shown an empty list
 * of options.
 */
