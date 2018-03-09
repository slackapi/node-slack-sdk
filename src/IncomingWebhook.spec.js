require('mocha');
const { IncomingWebhook } = require('./IncomingWebhook');
const { assert } = require('chai');
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

    it('should send a simple message', function () {
      const scope = nock('https://hooks.slack.com')
        .post(/services/)
        .reply(200, 'ok');
      this.webhook.send('Hello', (error) => {
        assert.notOk(error);
      });
    });

  });

});
