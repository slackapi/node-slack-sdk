import debugFactory from 'debug';
import getRawBody from 'raw-body';
import querystring from 'querystring';
import crypto from 'crypto';
import timingSafeCompare from 'tsscmp';
import { packageIdentifier } from './util';

const debug = debugFactory('@slack/interactive-messages:http-handler');

export const errorCodes = {
  SIGNATURE_VERIFICATION_FAILURE: 'SLACKHTTPHANDLER_REQUEST_SIGNATURE_VERIFICATION_FAILURE',
  REQUEST_TIME_FAILURE: 'SLACKHTTPHANDLER_REQUEST_TIMELIMIT_FAILURE',
  BODY_PARSER_NOT_PERMITTED: 'SLACKADAPTER_BODY_PARSER_NOT_PERMITTED_FAILURE', // moved constant from adapter
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
        res.setHeader('Content-Type', 'application/json');
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
      const error = new Error('Slack request signing verification outdated');
      error.code = errorCodes.REQUEST_TIME_FAILURE;
      throw error;
    }

    const hmac = crypto.createHmac('sha256', signingSecret);
    const [version, hash] = signature.split('=');
    hmac.update(`${version}:${ts}:${body}`);

    if (!timingSafeCompare(hash, hmac.digest('hex'))) {
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

    // If parser is being used and we don't receive the raw payload via `rawBody`,
    // we can't verify request signature
    if (req.body && !req.rawBody) {
      const error = new Error('Parsing request body prohibits request signature verification');
      error.code = errorCodes.BODY_PARSER_NOT_PERMITTED;
      if (process.env.NODE_ENV === 'development') {
        respond({ status: 500, content: error.message });
      } else {
        respond({ status: 500 });
      }
      return;
    }

    // Some serverless cloud providers (e.g. Google Firebase Cloud Functions) might populate
    // the request with a bodyparser before it can be populated by the SDK.
    // To prevent throwing an error here, we check the `rawBody` field before parsing the request
    // through the `raw-body` module (see Issue #90 - https://github.com/slackapi/node-slack-events-api/pull/90)
    let parseRawBody;
    if (req.rawBody) {
      debug('Parsing request with a rawBody attribute');
      parseRawBody = new Promise((resolve) => {
        resolve(req.rawBody);
      });
    } else {
      debug('Parsing raw request');
      parseRawBody = getRawBody(req);
    }

    // Builds body of the request from stream and returns the raw request body
    parseRawBody
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
