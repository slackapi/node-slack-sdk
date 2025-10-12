import assert from 'node:assert';
import { beforeEach, describe, it } from 'node:test';
import { MockAgent, setGlobalDispatcher } from 'undici';
import { IncomingWebhook } from './IncomingWebhook.js';

describe('IncomingWebhook', () => {
  /**
   * @description A mock incoming messages webhook.
   */
  const url = 'https://hooks.slack.com/services/FAKEWEBHOOK';

  /**
   * @description A mock HTTP server agent.
   * @see {@link https://nodejs.org/en/learn/test-runner/mocking#apis}
   */
  let agent: MockAgent;

  beforeEach(() => {
    agent = new MockAgent();
    setGlobalDispatcher(agent);
  });

  describe('constructor()', () => {
    it('should build a default webhook given a URL', () => {
      const webhook = new IncomingWebhook(url);
      assert(webhook instanceof IncomingWebhook);
    });
  });

  describe('send()', () => {
    let webhook: IncomingWebhook;
    beforeEach(() => {
      webhook = new IncomingWebhook(url);
    });

    describe('when making a successful call', () => {
      beforeEach(() => {
        agent
          .get('https://hooks.slack.com')
          .intercept({
            path: /services/,
            method: 'POST',
          })
          .reply(200, 'ok');
      });

      it('should return results in a Promise', async () => {
        const result = await webhook.send('Hello');
        assert.strictEqual(result.text, 'ok');
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
      });
    });

    describe('when the call fails', () => {
      it('should return a Promise which rejects on error', async () => {
        agent
          .get('https://hooks.slack.com')
          .intercept({
            path: /services/,
            method: 'POST',
          })
          .replyWithError(new Error('500'));
        try {
          await webhook.send('Hello');
          assert.fail('expected rejection');
        } catch (error) {
          assert.ok(error);
          assert.ok(error instanceof Error);
          assert.match((error as Error).message, /fetch failed/);
        }
      });

      it('should fail with IncomingWebhookRequestError when the API request fails', async () => {
        // One known request error is when the node encounters an ECONNREFUSED. In order to simulate this, rather than
        // using mocks, we send the request to a host:port that is not listening.
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
      it('should send to the provided fetch handler', async () => {
        let actualUrl: URL | RequestInfo | undefined;
        let actualText: string | undefined;
        const mockFetch: typeof globalThis.fetch = async (url, body) => {
          const mockBody = JSON.parse(body?.body?.toString() || '{}');
          actualUrl = url;
          actualText = mockBody.text;
          return Promise.resolve(new Response(JSON.stringify({ text: 'ok' })));
        };
        const webhook = new IncomingWebhook(url, {
          fetch: mockFetch,
        });
        await webhook.send({ text: 'updates' });
        assert.strictEqual(actualText, 'updates');
        assert.strictEqual(actualUrl, url);
      });

      it('should not overwrite the default parameters after a call', async () => {
        const mockResponse1 = 'ok+1';
        const mockResponse2 = 'ok+2';
        agent
          .get('https://hooks.slack.com')
          .intercept({
            path: /services/,
            method: 'POST',
            body: JSON.stringify({
              text: 'A sheep appeared!',
              metadata: {
                event_type: 'count',
                event_payload: {
                  sheep: 1,
                },
              },
            }),
          })
          .reply(200, mockResponse1);
        agent
          .get('https://hooks.slack.com')
          .intercept({
            path: /services/,
            method: 'POST',
            body: JSON.stringify({
              text: 'A sheep appeared!',
              metadata: {
                event_type: 'count',
                event_payload: {
                  sheep: 2,
                },
              },
            }),
          })
          .reply(200, mockResponse2);
        const defaultParams = {
          text: 'A sheep appeared!',
        };
        const webhook = new IncomingWebhook(url, defaultParams);
        const response1 = await webhook.send({
          metadata: {
            event_type: 'count',
            event_payload: {
              sheep: 1,
            },
          },
        });
        const response2 = await webhook.send({
          metadata: {
            event_type: 'count',
            event_payload: {
              sheep: 2,
            },
          },
        });
        assert.strictEqual(response1.text, mockResponse1);
        assert.strictEqual(response2.text, mockResponse2);
      });
    });
  });
});
