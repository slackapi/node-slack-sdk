import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it } from 'node:test';
import nock from 'nock';

import {
  type CodedError,
  ErrorCode,
  IncomingWebhookHTTPError,
  IncomingWebhookRequestError,
  SlackWebhookError,
} from './errors';
import { type FetchFunction, IncomingWebhook } from './IncomingWebhook';
import { getUserAgent } from './instrument';
import { rapidRetryPolicy } from './retry-policies';

const url = 'https://hooks.slack.com/services/FAKEWEBHOOK';

describe('IncomingWebhook', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('constructor()', () => {
    it('should build a default webhook given a URL', () => {
      const webhook = new IncomingWebhook(url);
      assert.ok(webhook instanceof IncomingWebhook);
    });

    it('should create a default webhook with a default timeout', () => {
      const webhook = new IncomingWebhook(url);
      // biome-ignore lint/suspicious/noExplicitAny: accessing private property for test assertion
      assert.strictEqual((webhook as any).timeout, 0);
    });

    it('should store the timeout passed by the user', () => {
      const givenTimeout = 100;
      const webhook = new IncomingWebhook(url, { timeout: givenTimeout });
      // biome-ignore lint/suspicious/noExplicitAny: accessing private property for test assertion
      assert.strictEqual((webhook as any).timeout, givenTimeout);
    });

    it('should use a custom fetch function when provided', async () => {
      let fetchCalled = false;
      const customFetch: FetchFunction = async () => {
        fetchCalled = true;
        return new Response('ok', { status: 200 });
      };
      const webhook = new IncomingWebhook(url, { fetch: customFetch });
      await webhook.send('Hello');
      assert.ok(fetchCalled);
    });
  });

  describe('send()', () => {
    let webhook: IncomingWebhook;
    beforeEach(() => {
      webhook = new IncomingWebhook(url);
    });

    describe('when making a successful call', () => {
      let scope: nock.Scope;
      beforeEach(() => {
        scope = nock('https://hooks.slack.com')
          .post(/services/)
          .reply(200, 'ok');
      });

      it('should return results in a Promise', async () => {
        const result = await webhook.send('Hello');
        assert.strictEqual(result.text, 'ok');
        scope.done();
      });

      it('should send metadata', async () => {
        const result = await webhook.send({
          text: 'Hello',
          metadata: {
            event_type: 'foo',
            event_payload: { foo: 'bar' },
          },
        });
        assert.strictEqual(result.text, 'ok');
        scope.done();
      });
    });

    describe('when the call fails', () => {
      let statusCode: number;
      let scope: nock.Scope;
      beforeEach(() => {
        statusCode = 500;
        scope = nock('https://hooks.slack.com')
          .post(/services/)
          .reply(statusCode);
      });

      it('should return a Promise which rejects on error', async () => {
        try {
          await webhook.send('Hello');
          assert.fail('expected rejection');
        } catch (error) {
          assert.ok(error instanceof IncomingWebhookHTTPError);
          assert.ok(error instanceof SlackWebhookError);
          assert.strictEqual(error.code, ErrorCode.HTTPError);
          assert.strictEqual(error.statusCode, statusCode);
          assert.match(error.message, new RegExp(String(statusCode)));
          scope.done();
        }
      });

      it('should fail with IncomingWebhookRequestError when the API request fails', async () => {
        // One known request error is when the node encounters an ECONNREFUSED. In order to simulate this, rather than
        // using nock, we send the request to a host:port that is not listening.
        const webhook = new IncomingWebhook('https://localhost:8999/api/');
        try {
          await webhook.send('Hello');
          assert.fail('expected rejection');
        } catch (error) {
          assert.ok(error instanceof IncomingWebhookRequestError);
          assert.ok(error instanceof SlackWebhookError);
          assert.strictEqual(error.code, ErrorCode.RequestError);
          assert.ok(error.original instanceof Error);
          assert.strictEqual(error.cause, error.original);
        }
      });
    });

    describe('lifecycle', () => {
      it('should not overwrite the default parameters after a call', async () => {
        const defaultParams = { channel: 'default' };
        const webhook = new IncomingWebhook(url, defaultParams);

        try {
          await webhook.send({ channel: 'different' });
          assert.fail('expected rejection');
        } catch (_err) {
          // biome-ignore lint/suspicious/noExplicitAny: accessing private property for test assertion
          assert.strictEqual((webhook as any).defaults.channel, defaultParams.channel);
        }
      });
    });

    describe('User-Agent header', () => {
      it('should send the User-Agent header with every request', async () => {
        const scope = nock('https://hooks.slack.com', {
          reqheaders: {
            'User-Agent': (value) => {
              assert.strictEqual(value, getUserAgent());
              return true;
            },
          },
        })
          .post(/services/)
          .reply(200, 'ok');
        try {
          const webhook = new IncomingWebhook(url);
          await webhook.send('Hello');
        } finally {
          scope.done();
        }
      });
    });

    describe('retries', () => {
      it('retries a 5xx then succeeds when a retry policy is set', async () => {
        const scope = nock('https://hooks.slack.com')
          .post(/services/)
          .reply(503)
          .post(/services/)
          .reply(200, 'ok');
        const webhook = new IncomingWebhook(url, { retryConfig: rapidRetryPolicy });
        const result = await webhook.send('hello');
        assert.strictEqual(result.text, 'ok');
        scope.done();
      });

      it('does not retry a 4xx even when a retry policy is set', async () => {
        const scope = nock('https://hooks.slack.com')
          .post(/services/)
          .reply(400);
        const webhook = new IncomingWebhook(url, { retryConfig: rapidRetryPolicy });
        try {
          await webhook.send('hello');
          assert.fail('expected rejection');
        } catch (error) {
          assert.strictEqual((error as CodedError).code, ErrorCode.HTTPError);
        }
        scope.done();
      });

      it('does not retry a 429 even when a retry policy is set', async () => {
        // Only one interceptor is registered; a retry would leave it unmatched
        // and scope.done() would throw.
        const scope = nock('https://hooks.slack.com')
          .post(/services/)
          .reply(429);
        const webhook = new IncomingWebhook(url, { retryConfig: rapidRetryPolicy });
        try {
          await webhook.send('hello');
          assert.fail('expected rejection');
        } catch (error) {
          assert.strictEqual((error as CodedError).code, ErrorCode.HTTPError);
        }
        scope.done();
      });

      it('does not retry by default (no retryConfig)', async () => {
        const scope = nock('https://hooks.slack.com')
          .post(/services/)
          .reply(503);
        const webhook = new IncomingWebhook(url);
        try {
          await webhook.send('hello');
          assert.fail('expected rejection');
        } catch (error) {
          assert.strictEqual((error as CodedError).code, ErrorCode.HTTPError);
        }
        scope.done();
      });

      it('does not leak retryConfig into the posted payload', async () => {
        let posted: unknown;
        const scope = nock('https://hooks.slack.com')
          .post(/services/, (body) => {
            posted = body;
            return true;
          })
          .reply(200, 'ok');
        const webhook = new IncomingWebhook(url, { retryConfig: rapidRetryPolicy });
        await webhook.send('hello');
        assert.ok(posted && typeof posted === 'object');
        assert.ok(!('retryConfig' in (posted as Record<string, unknown>)));
        scope.done();
      });
    });
  });
});
