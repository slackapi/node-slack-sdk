var expect = require('chai').expect;
var lodash = require('lodash');
var sinon = require('sinon');

var IncomingWebhook = require('../../../lib/clients/incoming-webhook/client');

describe('Incoming Webhook', function () {

  describe('Constructor', function () {

    it('requires a slack url', function () {
      expect(function () {
        var wh = new IncomingWebhook(); // eslint-disable-line no-unused-vars
      }).to.throw('Slack url is required');
    });

    it('should accept supplied defaults when present', function () {
      var opts = {
        username: 'a bot name',
        iconEmoji: ':robot_face:',
        channel: 'channel-name',
        text: 'some text'
      };
      var wh = new IncomingWebhook('slackWebhookUrl', opts);

      expect(wh.defaults.username).to.equal(opts.username);
      expect(wh.defaults.iconEmoji).to.equal(opts.iconEmoji);
      expect(wh.defaults.channel).to.equal(opts.channel);
      expect(wh.defaults.text).to.equal(opts.text);
    });

    it('should discard unusable properties', function () {
      var opts = {
        foo: 'bar'
      };
      var wh = new IncomingWebhook('slackWebhookUrl', opts);

      expect(wh.defaults.bar).to.equal(undefined);
    });

    it('does not require a defaults object', function () {
      expect(function () {
        var wh = new IncomingWebhook('slackWebhookUrl'); // eslint-disable-line no-unused-vars
      }).to.not.throw();
    });
  });

  describe('Sending Webhooks', function () {
    var transport = sinon.stub().yields();
    var createIncomingWebhook = function (opts) {
      var options = lodash.assign({ _transport: transport }, opts);
      return new IncomingWebhook('fake-slack-url', options);
    };

    afterEach(function () {
      transport.reset();
    });

    it('does not require a callbck', function () {
      var wh = createIncomingWebhook();

      expect(function () {
        wh.send('A string');
      }).to.not.throw();
    });

    it('it uses defaults if no value is passed in', function (done) {
      var wh = createIncomingWebhook({
        text: 'Default text',
        channel: 'channel',
        username: 'a name',
        iconEmoji: ':robot_face:'
      });

      wh.send(null, function () {
        expect(transport.calledOnce).to.equal(true);
        expect(transport.calledWithMatch({
          body: {
            text: 'Default text',
            channel: 'channel',
            username: 'a name',
            icon_emoji: ':robot_face:'
          }
        })).to.equal(true);

        done();
      });
    });

    describe('Using a string argument', function () {

      it('sends using a string', function (done) {
        var wh = createIncomingWebhook();

        wh.send('A string', function () {
          expect(transport.calledOnce).to.equal(true);
          expect(transport.calledWithMatch({
            body: { text: 'A string' }
          })).to.equal(true);

          done();
        });
      });

      it('uses defaults on initialization when sending a string', function (done) {
        var wh = createIncomingWebhook({
          username: 'a bot name',
          iconEmoji: ':robot_face:',
          channel: 'channel-name'
        });

        wh.send('A string', function () {
          expect(transport.calledOnce).to.equal(true);
          expect(transport.calledWithMatch({
            body: {
              text: 'A string',
              username: 'a bot name',
              icon_emoji: ':robot_face:',
              channel: 'channel-name'
            }
          })).to.equal(true);

          done();
        });
      });

      it('overrites text default', function (done) {
        var wh = createIncomingWebhook({
          text: 'default text'
        });

        wh.send('A string', function () {
          expect(transport.calledOnce).to.equal(true);
          expect(transport.calledWithMatch({
            body: {
              text: 'A string'
            }
          })).to.equal(true);

          done();
        });
      });
    });

    describe('Using an object argument', function () {

      it('sends text using an object', function (done) {
        var wh = createIncomingWebhook();

        wh.send({
          text: 'Some text'
        }, function () {
          expect(transport.calledOnce).to.equal(true);
          expect(transport.calledWithMatch({
            body: { text: 'Some text' }
          })).to.equal(true);

          done();
        });
      });

      it('sends properties using an object', function (done) {
        var wh = createIncomingWebhook();

        wh.send({
          text: 'Some text',
          username: 'A username',
          channel: 'a-channel',
          iconEmoji: ':robot_face:'
        }, function () {
          expect(transport.calledOnce).to.equal(true);
          expect(transport.calledWithMatch({
            body: {
              text: 'Some text',
              username: 'A username',
              channel: 'a-channel',
              icon_emoji: ':robot_face:'
            }
          })).to.equal(true);

          done();
        });
      });

      it('uses defaults if not specified', function (done) {
        var wh = createIncomingWebhook({
          text: 'default text',
          username: 'default username',
          channel: 'default-channel',
          iconEmoji: ':robot_face:'
        });

        wh.send({}, function () {
          expect(transport.calledOnce).to.equal(true);
          expect(transport.calledWithMatch({
            body: {
              text: 'default text',
              username: 'default username',
              channel: 'default-channel',
              icon_emoji: ':robot_face:'
            }
          })).to.equal(true);

          done();
        });
      });

      it('sends attachments', function (done) {
        var wh = createIncomingWebhook();
        var attachments = [{
          fallback: 'Required plain-text summary of the attachment.',

          color: '#36a64f',

          pretext: 'Optional text that appears above the attachment block',

          author_name: 'Bobby Tables',
          author_link: 'http://flickr.com/bobby/',
          author_icon: 'http://flickr.com/icons/bobby.jpg',

          title: 'Slack API Documentation',
          title_link: 'https://api.slack.com/',

          text: 'Optional text that appears within the attachment',

          fields: [{
            title: 'Priority',
            value: 'High',
            short: false
          }],

          image_url: 'http://my-website.com/path/to/image.jpg',
          thumb_url: 'http://example.com/path/to/thumb.png',

          footer: 'Slack API',
          footer_icon: 'https://platform.slack-edge.com/img/default_application_icon.png',
          ts: 123456789
        }];

        wh.send({
          attachments: attachments
        }, function () {
          expect(transport.calledOnce).to.equal(true);
          expect(transport.calledWithMatch({
            body: { attachments: attachments }
          })).to.equal(true);

          done();
        });
      });
    });
  });
});
