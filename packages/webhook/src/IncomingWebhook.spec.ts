import { Agent } from 'https';
import { assert } from 'chai';
import * as sinon from 'sinon';
import { IncomingWebhook } from './IncomingWebhook';
import { ErrorCode } from './errors';

import nock = require('nock');

const url = 'https://hooks.slack.com/services/FAKEWEBHOOK';

describe('IncomingWebhook', () => {
  describe('constructor()', () => {
    it('should build a default wehbook given a URL', () => {
      const webhook = new IncomingWebhook(url);
      assert.instanceOf(webhook, IncomingWebhook);
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

      it('should return results in a Promise', () => {
        return webhook.send('Hello').then((result) => {
          assert.strictEqual(result.text, 'ok');
          scope.done();
        });
      });
    });

    describe('when the call fails', () => {
      let scope: nock.Scope;
      let statusCode: number;

      beforeEach(() => {
        statusCode = 500;
        scope = nock('https://hooks.slack.com')
          .post(/services/)
          .reply(statusCode);
      });

      it('should return a Promise which rejects on error', () => {
        return webhook.send('Hello').catch((error) => {
          assert.ok(error);
          assert.instanceOf(error, Error);
          assert.match(error.message, new RegExp(`${statusCode}`));
          scope.done();
        });
      });

      it('should fail with IncomingWebhookRequestError when the API request fails', () => {
        // One known request error is when the node encounters an ECONNREFUSED. In order to simulate this, rather than
        // using nock, we send the request to a host:port that is not listening.
        const hook = new IncomingWebhook('https://localhost:8999/api/');
        return hook.send('Hello').catch((error) => {
          assert.instanceOf(error, Error);
          assert.equal(error.code, ErrorCode.RequestError);
          assert.instanceOf(error.original, Error);
        });
      });
    });

    describe('lifecycle', () => {
      it('should not overwrite the default parameters after a call', (done) => {
        const defaultParams = { channel: 'default' };
        const expectedParams = Object.assign({}, defaultParams);
        const hook = new IncomingWebhook(url, defaultParams);

        hook.send({ channel: 'different' }).catch(() => {
          assert.deepEqual(defaultParams, expectedParams);
          done();
        });
      });
    });
  });

  describe('has an option to set a custom HTTP agent', () => {
    it('should send a request using the custom agent', () => {
      const agent = new Agent({ keepAlive: true });
      const spy = sinon.spy<any, 'addRequest'>(agent, 'addRequest');
      const webhook = new IncomingWebhook(url, { agent });

      return webhook.send('Hello')
        .catch(() => {
          assert(spy.called);
        })
        .then(() => {
          spy.restore();
          agent.destroy();
        })
        .catch((error) => {
          spy.restore();
          agent.destroy();
          throw error;
        });
    });
  });

  afterEach(() => {
    nock.cleanAll();
  });
});
