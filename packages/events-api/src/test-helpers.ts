import * as crypto from 'crypto';
import { Readable } from 'stream';
import { IncomingMessage } from 'http';

const requestSigningVersion = 'v0';
type Request = import('express-serve-static-core').Request;

/**
 * Creates request object with proper headers
 * @param signingSecret - A Slack signing secret
 * @param ts - Timestamp of request
 * @param rawBody - String of raw body
 */
export function createRequestSignature(signingSecret: string, ts: number, rawBody: string): string {
  const hmac = crypto.createHmac('sha256', signingSecret);
  hmac.update(`${requestSigningVersion}:${ts}:${rawBody}`);
  return `${requestSigningVersion}=${hmac.digest('hex')}`;
}

/**
 * Creates request object with proper headers
 * @param signingSecret - A Slack signing secret for request verification
 * @param ts - A timestamp for request verification and header
 * @param rawBody - String of raw body to be passed in request
 */
export function createRequest(
  signingSecret: string,
  ts: number,
  rawBody: string,
): IncomingMessage {
  const signature = createRequestSignature(signingSecret, ts, rawBody);
  const headers = {
    'x-slack-signature': signature,
    'x-slack-request-timestamp': `${ts}`,
    'content-type': 'application/json',
  };
  return {
    headers,
  } as unknown as IncomingMessage;
}

/**
 * Creates request object with proper headers and a rawBody field payload
 * @param signingSecret - A Slack signing secret for request verification
 * @param ts - A timestamp for request verification and header
 * @param rawBody - String of raw body to be put in rawBody field
 */
export function createRawBodyRequest(
  signingSecret: string,
  ts: number,
  rawBody: string,
): IncomingMessage {
  const signature = createRequestSignature(signingSecret, ts, rawBody);
  const headers = {
    'x-slack-signature': signature,
    'x-slack-request-timestamp': `${ts}`,
    'content-type': 'application/json',
  };
  return {
    rawBody: Buffer.from(rawBody),
    headers,
  } as unknown as IncomingMessage;
}

/**
 * Creates a readable stream of a request
 * @param signingSecret - A Slack signing secret for request verification
 * @param ts - A timestamp for request verification and header
 * @param rawBody - String of raw body to be passed in request
 */
export function createStreamRequest(signingSecret: string, ts: number, rawBody: string): Request {
  const signature = createRequestSignature(signingSecret, ts, rawBody);

  const fakeRequest = new Readable({
    read() {
      this.push(rawBody);
      this.push(null);
    },
  });
  (fakeRequest as any).headers = {
    'x-slack-signature': signature,
    'x-slack-request-timestamp': ts,
    'content-type': 'application/x-www-form-urlencoded',
  };

  return fakeRequest as Request;
}

/**
 * Creates a completion callback aggregator
 * @param done callback to call on completion or error
 * @param totalParts total calls expected
 */
export function completionAggregator(done: (err?: any) => void, totalParts: number): (err?: any) => void {
  let completedParts = 0;
  let errorSeen: any = null;
  return function partiallyComplete(error) {
    if (errorSeen) return;
    if (error) {
      errorSeen = error;
      done(error);
    } else {
      completedParts += 1;
      if (completedParts === totalParts) {
        done();
      }
    }
  };
}
