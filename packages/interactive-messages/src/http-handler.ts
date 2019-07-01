/* tslint:disable import-name */
import { ServerResponse, RequestListener } from 'http';
import * as querystring from 'querystring';
import debugFactory from 'debug';
import getRawBody from 'raw-body';
import crypto from 'crypto';
import timingSafeCompare from 'tsscmp';
import SlackMessageAdapter from './adapter';
import { ErrorCode, errorWithCode } from './errors';
import { packageIdentifier, isFalsy } from './util';

const debug = debugFactory('@slack/interactive-messages:http-handler');

export function createHTTPHandler(adapter: SlackMessageAdapter): RequestListener {
  const poweredBy = packageIdentifier();

  /**
   * Handles sending responses
   *
   * @param res - Response object
   * @returns Returns a function used to send response
   */
  function sendResponse(res: ServerResponse): ResponseHandler {
    return ({ status, content }) => {
      res.statusCode = status;
      res.setHeader('X-Slack-Powered-By', poweredBy);
      if (typeof content === 'string') {
        res.end(content);
      } else if (!isFalsy(content)) {
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
   * @param body - Raw body of request
   * @returns Parsed body of the request
   */
  function parseBody(body: string): any {
    const parsedBody = querystring.parse(body);
    if (!isFalsy(parsedBody.payload)) {
      return JSON.parse(parsedBody.payload as string);
    }

    return parsedBody;
  }

  /**
   * Method to verify signature of requests
   *
   * @param signingSecret - Signing secret used to verify request signature
   * @param requestHeaders - Request headers
   * @param body - Raw body string
   * @returns Indicates if request is verified
   */
  function verifyRequestSignature(
    signingSecret: string,
    requestHeaders: Record<string, string>,
    body: string,
  ): boolean {
    // Request signature
    const signature = requestHeaders['x-slack-signature'];
    // Request timestamp
    const ts = parseInt(requestHeaders['x-slack-request-timestamp'], 10);

    // Divide current date to match Slack ts format
    // Subtract 5 minutes from current time
    const fiveMinutesAgo = Math.floor(Date.now() / 1000) - (60 * 5);

    if (ts < fiveMinutesAgo) {
      debug('request is older than 5 minutes');
      throw errorWithCode(new Error('Slack request signing verification failed'), ErrorCode.RequestTimeFailure);
    }

    const hmac = crypto.createHmac('sha256', signingSecret);
    const [version, hash] = signature.split('=');
    hmac.update(`${version}:${ts}:${body}`);

    if (!timingSafeCompare(hash, hmac.digest('hex'))) {
      debug('request signature is not valid');
      throw errorWithCode(
        new Error('Slack request signing verification failed'),
        ErrorCode.SignatureVerificationFailure,
      );
    }

    debug('request signing verification success');
    return true;
  }

  /**
   * Request listener used to handle Slack requests and send responses and
   * verify request signatures
   */
  return (req, res) => {
    debug('request received - method: %s, path: %s', req.method, req.url);
    // Function used to send response
    const respond = sendResponse(res);

    // Builds body of the request from stream and returns the raw request body
    getRawBody(req)
      .then((bodyBuf) => {
        const rawBody = bodyBuf.toString();

        if (verifyRequestSignature(adapter.signingSecret, req.headers as Record<string, string>, rawBody)) {
          // Request signature is verified
          // Parse raw body
          const body = parseBody(rawBody) as any;

          if (body.ssl_check) {
            respond({ status: 200 });
            return;
          }

          const dispatchResult = adapter.dispatch(body);

          if (dispatchResult !== undefined) {
            // TODO: handle this after responding?
            // tslint:disable-next-line no-floating-promises
            dispatchResult.then(respond);
          } else {
            // No callback was matched
            debug('no callback was matched');
            respond({ status: 404 });
          }
        }
      }).catch((error) => {
        if (error.code === ErrorCode.SignatureVerificationFailure || error.code === ErrorCode.RequestTimeFailure) {
          respond({ status: 404 });
        } else if (process.env.NODE_ENV === 'development') {
          respond({ status: 500, content: error.message });
        } else {
          respond({ status: 500 });
        }
      });
  };
}

/**
 * A response handler returned by `sendResponse`.
 */
type ResponseHandler = (dispatchResult: {
  status: number,
  content?: string | object,
}) => void;
