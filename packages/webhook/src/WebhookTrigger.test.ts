import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it } from 'node:test';
import nock from 'nock';

import type { CodedError, WebhookTriggerHTTPError } from './errors';
import { ErrorCode } from './errors';
import { rapidRetryPolicy } from './retry-policies';
import { WebhookTrigger } from './WebhookTrigger';

const url = 'https://hooks.slack.com/triggers/FAKETRIGGER';

describe('WebhookTrigger', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('constructor()', () => {
    it('should build a default webhook trigger given a URL', () => {
      const trigger = new WebhookTrigger(url);
      assert.ok(trigger instanceof WebhookTrigger);
    });

    it('should create a default webhook trigger with a default timeout', () => {
      const trigger = new WebhookTrigger(url);
      // biome-ignore lint/suspicious/noExplicitAny: accessing private property for test assertion
      assert.strictEqual((trigger as any).defaults.timeout, 0);
    });

    it('should create an axios instance that has the timeout passed by the user', () => {
      const givenTimeout = 100;
      const trigger = new WebhookTrigger(url, { timeout: givenTimeout });
      // biome-ignore lint/suspicious/noExplicitAny: accessing private property for test assertion
      assert.strictEqual((trigger as any).axios.defaults.timeout, givenTimeout);
    });

    it('should throw when the URL is missing or empty', () => {
      // biome-ignore lint/suspicious/noExplicitAny: exercising the runtime guard with invalid input
      assert.throws(() => new WebhookTrigger(undefined as any), /URL is required/);
      assert.throws(() => new WebhookTrigger(''), /URL is required/);
    });
  });

  describe('send()', () => {
    let trigger: WebhookTrigger;
    beforeEach(() => {
      trigger = new WebhookTrigger(url);
    });

    describe('on success', () => {
      it('should return results in a Promise', async () => {
        const scope = nock('https://hooks.slack.com')
          .post(/triggers/, (body) => {
            assert.deepStrictEqual(body, { key: 'value' });
            return true;
          })
          .reply(200, { ok: true });
        const result = await trigger.send({ key: 'value' });
        assert.strictEqual(result.ok, true);
        assert.deepStrictEqual(result.body, { ok: true });
        scope.done();
      });

      it('should send an empty body and resolve when called without a payload', async () => {
        const scope = nock('https://hooks.slack.com')
          .post(/triggers/, (body) => {
            assert.deepStrictEqual(body, {});
            return true;
          })
          .reply(200, { ok: true });
        const result = await trigger.send();
        assert.strictEqual(result.ok, true);
        scope.done();
      });
    });

    describe('on failure', () => {
      it('should reject on an HTTP error status', async () => {
        const statusCode = 500;
        const scope = nock('https://hooks.slack.com')
          .post(/triggers/)
          .reply(statusCode);
        try {
          await trigger.send({ key: 'value' });
          assert.fail('expected rejection');
        } catch (error) {
          assert.ok(error instanceof Error);
          assert.match((error as Error).message, new RegExp(String(statusCode)));
        }
        scope.done();
      });

      it('should fail with RequestError when the API request fails', async () => {
        const trigger = new WebhookTrigger('https://localhost:8999/api/');
        try {
          await trigger.send({ key: 'value' });
          assert.fail('expected rejection');
        } catch (error) {
          assert.ok(error instanceof Error);
          assert.strictEqual((error as CodedError).code, ErrorCode.RequestError);
        }
      });

      it('should reject with an HTTPError carrying the response body on a 401', async () => {
        const scope = nock('https://hooks.slack.com')
          .post(/triggers/)
          .reply(401, { ok: false, error: 'invalid_auth' });
        try {
          await trigger.send({ key: 'value' });
          assert.fail('expected rejection');
        } catch (error) {
          const httpError = error as WebhookTriggerHTTPError;
          assert.strictEqual(httpError.code, ErrorCode.HTTPError);
          // biome-ignore lint/suspicious/noExplicitAny: reading the wrapped axios response body
          const response = (httpError.original as any).response;
          assert.strictEqual(response.status, 401);
          assert.deepStrictEqual(response.data, { ok: false, error: 'invalid_auth' });
        }
        scope.done();
      });
    });

    describe('User-Agent header', () => {
      it('should send the User-Agent header with every request', async () => {
        const scope = nock('https://hooks.slack.com', {
          reqheaders: {
            'User-Agent': (value) => {
              return /@slack:webhook/.test(value);
            },
          },
        })
          .post(/triggers/)
          .reply(200, { ok: true });
        try {
          const trigger = new WebhookTrigger(url);
          await trigger.send({ key: 'value' });
        } finally {
          scope.done();
        }
      });
    });

    describe('retries', () => {
      it('retries a 5xx then succeeds when a retry policy is set', async () => {
        const scope = nock('https://hooks.slack.com')
          .post(/triggers/)
          .reply(503)
          .post(/triggers/)
          .reply(200, { ok: true });
        const trigger = new WebhookTrigger(url, { retryConfig: rapidRetryPolicy });
        const result = await trigger.send({ key: 'value' });
        assert.strictEqual(result.ok, true);
        scope.done();
      });

      it('does not retry a 4xx even when a retry policy is set', async () => {
        const scope = nock('https://hooks.slack.com')
          .post(/triggers/)
          .reply(400);
        const trigger = new WebhookTrigger(url, { retryConfig: rapidRetryPolicy });
        try {
          await trigger.send({ key: 'value' });
          assert.fail('expected rejection');
        } catch (error) {
          assert.strictEqual((error as CodedError).code, ErrorCode.HTTPError);
        }
        // Only one interceptor is registered; a retry would leave it unmatched
        // and scope.done() would throw.
        scope.done();
      });

      it('does not retry a 429 even when a retry policy is set', async () => {
        const scope = nock('https://hooks.slack.com')
          .post(/triggers/)
          .reply(429);
        const trigger = new WebhookTrigger(url, { retryConfig: rapidRetryPolicy });
        try {
          await trigger.send({ key: 'value' });
          assert.fail('expected rejection');
        } catch (error) {
          assert.strictEqual((error as CodedError).code, ErrorCode.HTTPError);
        }
        // Only one interceptor is registered; a retry would leave it unmatched
        // and scope.done() would throw.
        scope.done();
      });

      it('gives up with the HTTP error after exhausting retries', async () => {
        const scope = nock('https://hooks.slack.com')
          .post(/triggers/)
          .reply(500)
          .post(/triggers/)
          .reply(500);
        const trigger = new WebhookTrigger(url, {
          retryConfig: { retries: 1, minTimeout: 0, maxTimeout: 1 },
        });
        try {
          await trigger.send({ key: 'value' });
          assert.fail('expected rejection');
        } catch (error) {
          assert.strictEqual((error as CodedError).code, ErrorCode.HTTPError);
        }
        scope.done();
      });

      it('does not retry by default (no retryConfig)', async () => {
        const scope = nock('https://hooks.slack.com')
          .post(/triggers/)
          .reply(503);
        const trigger = new WebhookTrigger(url);
        try {
          await trigger.send({ key: 'value' });
          assert.fail('expected rejection');
        } catch (error) {
          assert.strictEqual((error as CodedError).code, ErrorCode.HTTPError);
        }
        scope.done();
      });
    });
  });
});
