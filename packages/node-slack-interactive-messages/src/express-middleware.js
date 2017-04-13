import debugFactory from 'debug';
import { packageIdentifier } from './util';

export const errorCodes = {
  NO_BODY_PARSER: 'SLACKMESSAGEMIDDLEWARE_NO_BODY_PARSER',
  TOKEN_VERIFICATION_FAILURE: 'SLACKMESSAGEMIDDLEWARE_TOKEN_VERIFICATION_FAILURE',
};

const debug = debugFactory('@slack/interactive-messages:express-middleware');

export function createExpressMiddleware(adapter) {
  const poweredBy = packageIdentifier();

  // This function binds a specific response instance to a function
  function sendResponse(res) {
    return function _sendResponse({ status, content }) {
      debug('sending response - status: %s, content: %o', status, content);
      return new Promise((resolve, reject) => {
        res.status(status);
        res.set('X-Slack-Powered-By', poweredBy);
        if (content) {
          res.json(content);
        } else {
          res.end();
        }
        res.on('finish', () => {
          // res._headers is an undocumented property, but we feel comfortable using it because:
          // 1. express depends on it and express is so foundational in node
          // 2. this is logging code and the risk of this causing a break is minimal
          // eslint-disable-next-line no-underscore-dangle
          debug('response finished - status: %d, headers: %o', res.statusCode, res._headers);
          resolve(res);
        });
        res.on('error', reject);
      });
    };
  }

  return function slackMessageAdapterMiddleware(req, res, next) {
    debug('request recieved - method: %s, path: %s', req.method, req.path);

    // Bind a response function to this request's respond object. This may be used in a number of
    // places
    const respond = sendResponse(res);

    // Check that the request body has been parsed
    if (!req.body) {
      const error = new Error('The incoming HTTP request did not have a parsed body.');
      error.code = errorCodes.NO_BODY_PARSER;
      next(error);
      return;
    }

    if (req.body.ssl_check) {
      respond({ status: 200 });
      return;
    }

    const payload = JSON.parse(req.body.payload);

    // Handle request token verification
    if (!payload.token || payload.token !== adapter.verificationToken) {
      debug('request token verification failure');
      const error = new Error('Slack interactive message verification failed');
      error.code = errorCodes.TOKEN_VERIFICATION_FAILURE;
      next(error);
      return;
    }
    debug('request token verification success');

    respond(adapter.dispatch(payload))
      .catch(next);
  };
}
