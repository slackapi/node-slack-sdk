import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it } from 'node:test';
import nock from 'nock';

import type { CodedError } from './errors';
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
  });

  describe('send()', () => {
    let trigger: WebhookTrigger;
    beforeEach(() => {
      trigger = new WebhookTrigger(url);
    });

    describe('when making a successful call', () => {
      let scope: nock.Scope;
      beforeEach(() => {
        scope = nock('https://hooks.slack.com')
          .post(/triggers/)
          .reply(200, { ok: true });
      });

      it('should return results in a Promise', async () => {
        const result = await trigger.send({ key: 'value' });
        assert.strictEqual(result.ok, true);
        assert.deepStrictEqual(result.body, { ok: true });
        scope.done();
      });
    });

    describe('when the response contains additional data', () => {
      let scope: nock.Scope;
      beforeEach(() => {
        scope = nock('https://hooks.slack.com')
          .post(/triggers/)
          .reply(200, { ok: true, workflow_run_id: 'WFR123' });
      });

      it('should include the full response body', async () => {
        const result = await trigger.send({ input: 'data' });
        assert.strictEqual(result.ok, true);
        assert.strictEqual(result.body.workflow_run_id, 'WFR123');
        scope.done();
      });
    });

    describe('when the call fails', () => {
      let statusCode: number;
      let scope: nock.Scope;
      beforeEach(() => {
        statusCode = 500;
        scope = nock('https://hooks.slack.com')
          .post(/triggers/)
          .reply(statusCode);
      });

      it('should return a Promise which rejects on error', async () => {
        try {
          await trigger.send({ key: 'value' });
          assert.fail('expected rejection');
        } catch (error) {
          assert.ok(error);
          assert.ok(error instanceof Error);
          assert.match((error as Error).message, new RegExp(String(statusCode)));
          scope.done();
        }
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
