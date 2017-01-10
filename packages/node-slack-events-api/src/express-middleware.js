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

export function createExpressMiddleware(adapter, middlewareOptions = {}) {
  function sendResponse(res) {
    return function _sendResponse(err, responseOptions = {}) {
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
      res.send(responseOptions.content || '');
    };
  }

  function handleError(error, res, next) {
    if (middlewareOptions.propagateErrors) {
      next(error);
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
    // Check that the request body has been parsed
    if (!req.body) {
      const error = new Error('The incoming HTTP request did not have a parsed body.');
      error.code = errorCodes.NO_BODY_PARSER;
      handleError(error, res, next);
      return;
    }

    // Handle event challenge
    if (req.body.type === 'url_verification') {
      if (req.body.token !== adapter.verificationToken) {
        const error = new Error('Slack event challenge failed.');
        error.code = errorCodes.TOKEN_VERIFICATION_FAILURE;
        error.body = req.body;
        handleError(error, res, next);
        return;
      }
      sendResponse(res)(null, { content: req.body.challenge });
      return;
    }

    // Handle event token verification
    // TODO: what if there is no token?
    if (req.body.token && req.body.token !== adapter.verificationToken) {
      const error = new Error('Slack event verification failed');
      error.code = errorCodes.TOKEN_VERIFICATION_FAILURE;
      error.body = req.body;
      handleError(error, res, next);
      return;
    }

    // TODO: expose whether this is a retry and what the retry reason would be
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
      adapter.emit(req.body.event.type, ...emitArguments);
    } catch (error) {
      adapter.emit('error', error);
    }

    if (!adapter.waitForResponse) {
      sendResponse(res)();
    }
  };
}
