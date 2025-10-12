import assert from 'node:assert';
import { afterEach, beforeEach, describe, it } from 'node:test';
import nock from 'nock';
import { IncomingWebhook } from './IncomingWebhook.js';

const url = 'https://hooks.slack.com/services/FAKEWEBHOOK';

describe('IncomingWebhook', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('constructor()', () => {
    it('should build a default webhook given a URL', () => {
      const webhook = new IncomingWebhook(url);
      if (!(webhook instanceof IncomingWebhook)) {
        assert.fail();
      }
    });

    it('should create an axios instance that has the timeout passed by the user', () => {
      // const givenTimeout = 100;
      // const webhook = new IncomingWebhook(url, { timeout: givenTimeout });
      // assert.nestedPropertyVal(webhook, 'axios.defaults.timeout', givenTimeout);
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
          assert.ok(error);
          assert.ok(error instanceof Error);
          assert.match((error as Error).message, new RegExp(String(statusCode)));
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
          assert.ok(error instanceof Error);
        }
      });
    });

    describe('lifecycle', () => {
      it('should not overwrite the default parameters after a call', async () => {
        const scope = nock('https://hooks.slack.com')
          .post(/services/, { channel: 'different' })
          .once()
          .reply(200, 'ok')
          .post(/services/, { channel: 'default', text: 'what nice weather' })
          .once()
          .reply(200, 'ok');
        const defaultParams = { channel: 'default' };
        const webhook = new IncomingWebhook(url, defaultParams);
        await webhook.send({ channel: 'different' });
        await webhook.send('what nice weather');
        scope.done();
      });
    });
  });
});
