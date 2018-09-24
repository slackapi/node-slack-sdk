require('mocha');
const { Agent } = require('https');
const { IncomingWebhook } = require('./IncomingWebhook');
const { ErrorCode } = require('./errors');
const { assert } = require('chai');
const isPromise = require('p-is-promise');
const nock = require('nock');
const sinon = require('sinon');

const url = 'https://hooks.slack.com/services/FAKEWEBHOOK';

describe('IncomingWebhook', function () {

  describe('constructor()', function () {
    it('should build a default wehbook given a URL', function () {
      const webhook = new IncomingWebhook(url);
      assert.instanceOf(webhook, IncomingWebhook);
    });
  });

  describe('send()', function () {
    beforeEach(function () {
      this.webhook = new IncomingWebhook(url);
    });

    describe('when making a successful call', function () {
      beforeEach(function () {
        this.scope = nock('https://hooks.slack.com')
          .post(/services/)
          .reply(200, 'ok');
      });

      it('should return results in a Promise', function () {
        const result = this.webhook.send('Hello');
        assert(isPromise(result));
        return result.then((result) => {
          assert.strictEqual(result.text, 'ok');
          this.scope.done();
        });
      });

      it('should deliver results in a callback', function (done) {
        this.webhook.send('Hello', (error, result) => {
          assert.notOk(error);
          assert.strictEqual(result.text, 'ok');
          this.scope.done();
          done();
        });
      });
    });

    describe('when the call fails', function () {
      beforeEach(function () {
        this.scope = nock('https://hooks.slack.com')
          .post(/services/)
          .reply(500);
      });

      it('should return a Promise which rejects on error', function (done) {
        const result = this.webhook.send('Hello');
        assert(isPromise(result));
        result.catch((error) => {
          assert.ok(error);
          assert.instanceOf(error, Error);
          done();
        });
      });

      it('should deliver the error in a callback', function (done) {
        this.webhook.send('Hello', (error) => {
          assert.ok(error);
          assert.instanceOf(error, Error);
          done();
        });
      });

      it('should fail with IncomingWebhookRequestError when the API request fails', function (done) {
        // One known request error is when the node encounters an ECONNREFUSED. In order to simulate this, rather than
        // using nock, we send the request to a host:port that is not listening.
        const webhook = new IncomingWebhook('https://localhost:8999/api/');
        webhook.send('Hello', (error) => {
          assert.instanceOf(error, Error);
          assert.equal(error.code, ErrorCode.IncomingWebhookRequestError);
          assert.instanceOf(error.original, Error);
          done();
        });
      });
    });

    describe('lifecycle', function () {
      beforeEach(function () {
        this.scope = nock('https://hooks.slack.com')
          .post(/services/)
          .reply(500);
      });

      it('should not overwrite the default parameters after a call', function (done) {
        const defaultParams  = { channel: 'default' };
        const expectedParams = Object.assign({}, defaultParams);
        const webhook        = new IncomingWebhook(url, defaultParams);

        webhook.send({ channel: 'different' }, () => {
          assert.deepEqual(webhook.defaults, expectedParams);
          done();
        });
      });
    });
  });

  describe('has an option to set a custom HTTP agent', function () {
    it('should send a request using the custom agent', function (done) {
      const agent = new Agent({keepAlive: true});
      const spy = sinon.spy(agent, 'addRequest');
      const webhook = new IncomingWebhook(url, {agent});
      webhook.send('Hello', () => {
        // assert(spy.called);
        agent.addRequest.restore();
        agent.destroy();
        done();
      });
    });

    it('should use accept a boolean (false) agent', function (done) {
      const webhook = new IncomingWebhook(url, {agent: false});
      webhook.send('Hello', () => {
        done();
      });
    });
  });

});
