import debugFactory from 'debug';
import { packageIdentifier } from './util';

export const errorCodes = {
  NO_BODY_PARSER: 'SLACKEVENTMIDDLEWARE_NO_BODY_PARSER',
  TOKEN_VERIFICATION_FAILURE: 'SLACKEVENTMIDDLEWARE_TOKEN_VERIFICATION_FAILURE',
};

const responseStatuses = {
  OK: 200,
  FAILURE: 500,
  REDIRECT: 302,
};

const debug = debugFactory('@slack/events-api:express-middleware');

export function createExpressMiddleware(adapter, middlewareOptions = {}) {
  // This function binds a specific response instance to a function that works more like a
  // a completion handler; one which follows the error-first argument pattern.
  function sendResponse(res) {
    // This function is the completion handler for sending a response to an event. It can either
    // be invoked by automatically or by the user (when using the `waitForResponse` option).
    return function _sendResponse(err, responseOptions = {}) {
      debug('sending response - error: %s, responseOptions: %o', err, responseOptions);
      // Deal with errors up front
      if (err) {
        res.status(responseStatuses.FAILURE);
      } else {
        // First determine the response status
        if (responseOptions) {
          if (responseOptions.failWithNoRetry) {
            res.status(responseStatuses.FAILURE);
          } else if (responseOptions.redirectLocation) {
            res.status(responseStatuses.REDIRECT);
          }
        } else {
          res.status(responseStatuses.OK);
        }

        // Next determine the response headers
        if (responseOptions && responseOptions.failWithNoRetry) {
          res.set('X-Slack-No-Retry', '1');
        }
        res.set('X-Slack-Powered-By', packageIdentifier());
      }

      // Lastly, send the response
      const content = responseOptions.content || '';
      debug('response body: %s', content);
      res.send(content);
      res.on('finish', () => {
        // res._headers is an undocumented property, but we feel comfortable using it because:
        // 1. express depends on it and express is so foundational in node
        // 2. this is logging code and the risk of this causing a break is minimal
        // eslint-disable-next-line no-underscore-dangle
        debug('response finished - status: %d, headers: %o', res.statusCode, res._headers);
      });
    };
  }

  // This function abstracts handling of an error. It inspects the relevant options to dispatch the
  // error using the right interface (either the next middleware or emitted from
  // the adapter) and handles the respond function.
  function handleError(error, respond, next) {
    debug('handling error - message: %s, code: %s', error.message, error.code);
    if (middlewareOptions.propagateErrors) {
      debug('propagating error for next middleware');
      // The respond function is never invoked because the next middleware is expected to respond
      next(error);
      return;
    }
    try {
      if (adapter.waitForResponse) {
        adapter.emit('error', error, respond);
      } else {
        adapter.emit('error', error);
        respond(error);
      }
    } catch (userError) {
      process.nextTick(() => { throw userError; });
    }
  }

  return function slackEventAdapterMiddleware(req, res, next) {
    debug('request recieved - method: %s, path: %s', req.method, req.path);

    // Bind a response function to this request's respond object. This may be used in a number of
    // places
    const respond = sendResponse(res);

    // Check that the request body has been parsed
    if (!req.body) {
      const error = new Error('The incoming HTTP request did not have a parsed body.');
      error.code = errorCodes.NO_BODY_PARSER;
      handleError(error, respond, next);
      return;
    }

    // Handle URL verification challenge
    if (req.body.type === 'url_verification') {
      debug('handling url verification');
      if (req.body.token !== adapter.verificationToken) {
        debug('url verification failure');
        const error = new Error('Slack event challenge failed.');
        error.code = errorCodes.TOKEN_VERIFICATION_FAILURE;
        error.body = req.body;
        handleError(error, respond, next);
        return;
      }
      debug('url verification success');
      respond(null, { content: req.body.challenge });
      return;
    }

    // Handle request token verification
    if (!req.body.token || req.body.token !== adapter.verificationToken) {
      debug('request token verification failure');
      const error = new Error('Slack event verification failed');
      error.code = errorCodes.TOKEN_VERIFICATION_FAILURE;
      error.body = req.body;
      handleError(error, respond, next);
      return;
    }
    debug('request token verification success');

    const emitArguments = [req.body.event];
    if (adapter.includeBody) {
      emitArguments.push(req.body);
    }
    if (adapter.includeHeaders) {
      emitArguments.push(req.headers);
    }
    if (adapter.waitForResponse) {
      emitArguments.push(respond);
    } else {
      respond();
    }

    try {
      debug('emitting event -  type: %s, arguments: %o', req.body.event.type, emitArguments);
      adapter.emit(req.body.event.type, ...emitArguments);
    } catch (error) {
      handleError(error, respond, next);
    }
  };
}
