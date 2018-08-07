import debugFactory from 'debug';
import getRawBody from 'raw-body';
import querystring from 'querystring';
import crypto from 'crypto';
import { packageIdentifier } from './util';

const debug = debugFactory('@slack/interactive-messages:http-handler');

export const errorCodes = {
  SIGNATURE_VERIFICATION_FAILURE: 'SLACKHTTPHANDLER_REQUEST_SIGNATURE_VERIFICATION_FAILURE',
  REQUEST_TIME_FAILURE: 'SLACKHTTPHANDLER_REQUEST_TIMELIMIT_FAILURE',
};

export function createHTTPHandler(adapter) {
  const poweredBy = packageIdentifier();

  /**
   * Handles sending responses
   *
   * @param {Object} res - Response object
   * @returns {Function} Returns a function used to send response
   */
  function sendResponse(res) {
    return function _sendResponse(dispatchResult) {
      const { status, content } = dispatchResult;
      res.statusCode = status;
      res.setHeader('X-Slack-Powered-By', poweredBy);
      if (typeof content === 'string') {
        res.end(content);
      } else if (content) {
        res.end(JSON.stringify(content));
      } else {
        res.end();
      }
    };
  }

  /**
   * Parses raw bodies of requests
   *
   * @param {string} body - Raw body of request
   * @returns {Object} Parsed body of the request
   */
  function parseBody(body) {
    const parsedBody = querystring.parse(body);
    if (parsedBody.payload) {
      return JSON.parse(parsedBody.payload);
    }

    return parsedBody;
  }

  /**
   * Method to verify signature of requests
   *
   * @param {string} signingSecret - Signing secret used to verify request signature
   * @param {Object} requestHeaders - Request headers
   * @param {string} body - Raw body string
   * @returns {boolean} Indicates if request is verified
   */
  function verifyRequestSignature(signingSecret, requestHeaders, body) {
    // Request signature
    const signature = requestHeaders['x-slack-signature'];
    // Request timestamp
    const ts = requestHeaders['x-slack-request-timestamp'];

    // Divide current date to match Slack ts format
    // Subtract 5 minutes from current time
    const fiveMinutesAgo = Math.floor(Date.now() / 1000) - (60 * 5);

    if (ts < fiveMinutesAgo) {
      debug('request is older than 5 minutes');
      const error = new Error('Slack request signing verification failed');
      error.code = errorCodes.REQUEST_TIME_FAILURE;
      throw error;
    }

    const hmac = crypto.createHmac('sha256', signingSecret);
    const [version, hash] = signature.split('=');
    hmac.update(`${version}:${ts}:${body}`);

    if (hash !== hmac.digest('hex')) {
      debug('request signature is not valid');
      const error = new Error('Slack request signing verification failed');
      error.code = errorCodes.SIGNATURE_VERIFICATION_FAILURE;
      throw error;
    }

    debug('request signing verification success');
    return true;
  }

  /**
   * Request listener used to handle Slack requests and send responses and
   * verify request signatures
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  return function slackRequestListener(req, res) {
    debug('request received - method: %s, path: %s', req.method, req.url);
    // Function used to send response
    const respond = sendResponse(res);

    // Builds body of the request from stream and returns the raw request body
    getRawBody(req)
      .then((r) => {
        const rawBody = r.toString();

        if (verifyRequestSignature(adapter.signingSecret, req.headers, rawBody)) {
          // Request signature is verified
          // Parse raw body
          const body = parseBody(rawBody);

          if (body.ssl_check) {
            respond({ status: 200 });
            return;
          }

          const dispatchResult = adapter.dispatch(body);

          if (dispatchResult) {
            dispatchResult.then(respond);
          } else {
            // No callback was matched
            debug('no callback was matched');
            respond({ status: 404 });
          }
        }
      }).catch((error) => {
        if (error.code === errorCodes.SIGNATURE_VERIFICATION_FAILURE ||
          error.code === errorCodes.REQUEST_TIME_FAILURE) {
          respond({ status: 404 });
        } else if (process.env.NODE_ENV === 'development') {
          respond({ status: 500, content: error.message });
        } else {
          respond({ status: 500 });
        }
      });
  };
}
