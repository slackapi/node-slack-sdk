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
  function sendResponse(res) {
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

  function handleError(error, res, next) {
    debug('handling error - message: %s, code: %s', error.message, error.code);
    if (middlewareOptions.propagateErrors) {
      debug('propagating error for next middleware');
      next(error);
      return;
    }
    const respond = sendResponse(res);
    if (adapter.waitForResponse) {
      adapter.emit('error', error, respond);
    } else {
      adapter.emit('error', error);
      respond(error);
    }
  }

  return function slackEventAdapterMiddleware(req, res, next) {
    debug('request recieved - method: %s, path: %s', req.method, req.path);
    // Check that the request body has been parsed
    if (!req.body) {
      const error = new Error('The incoming HTTP request did not have a parsed body.');
      error.code = errorCodes.NO_BODY_PARSER;
      handleError(error, res, next);
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
        handleError(error, res, next);
        return;
      }
      debug('url verification success');
      sendResponse(res)(null, { content: req.body.challenge });
      return;
    }

    // Handle request token verification
    if (!req.body.token || req.body.token !== adapter.verificationToken) {
      debug('request token verification failure');
      const error = new Error('Slack event verification failed');
      error.code = errorCodes.TOKEN_VERIFICATION_FAILURE;
      error.body = req.body;
      handleError(error, res, next);
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
      emitArguments.push(sendResponse(res));
    }

    try {
      debug('emitting event -  type: %s, arguments: %o', req.body.event.type, emitArguments);
      adapter.emit(req.body.event.type, ...emitArguments);
    } catch (error) {
      // TODO: there's an opportunity to refactor this code along with the code inside
      // handleError(). the main difference is that errors in this code path will not have a `code`
      // property.
      debug('emitting error - %o', error);
      adapter.emit('error', error);
    }

    if (!adapter.waitForResponse) {
      sendResponse(res)();
    }
  };
}
