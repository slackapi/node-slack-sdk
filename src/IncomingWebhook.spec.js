require('mocha');
const { IncomingWebhook } = require('./IncomingWebhook');
const { assert } = require('chai');
const isPromise = require('p-is-promise');
const nock = require('nock');

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
    });
  });
});
