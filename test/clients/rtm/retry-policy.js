var expect = require('chai').expect;
var lodash = require('lodash');
var nock = require('nock');
var sinon = require('sinon');

var RtmClient = require('../../../lib/clients/rtm/client');
var RTM_CLIENT_EVENTS = require('../../../lib/clients/events/client').RTM;
var PORT_NUMBER = 8002;

describe('RTM API Client', function () {
  describe('Retry policy', function () {
    var rtm;

    var testRetryPolicy = function (opts, reply) {
      var fakeSlackUrl = 'https://slack.com:' + PORT_NUMBER++ + '/api';
      var options = lodash.assign({
        slackAPIUrl: fakeSlackUrl,
        logger: sinon.stub()
      }, opts);

      var serverReply = reply || function (post) {
        return post.reply(500, '');
      };

      serverReply(
        nock(fakeSlackUrl)
          .post('/rtm.start')
      );

      rtm = new RtmClient('fake-token', options);
      sinon.spy(rtm, 'transport');
      rtm.start();
    };

    afterEach(function () {
      rtm.removeAllListeners();
      rtm.disconnect();
      rtm = null; // eslint-disable-line no-param-reassign
    });

    it('should call the rtm.start error callback if attempts exceed retries', function (done) {
      var retryCount = 3;

      testRetryPolicy({
        retryConfig: {
          minTimeout: 1,
          maxTimeout: 1,
          retries: retryCount
        }
      });

      rtm.on(RTM_CLIENT_EVENTS.UNABLE_TO_RTM_START, function (err) {
        expect(err).to.be.ok;
        expect(rtm.transport.callCount).to.equal(retryCount + 1);
        done();
      });
    });

    it('should disconnect if the error is unrecoverable', function (done) {
      testRetryPolicy({
        retryConfig: {
          minTimeout: 1,
          maxTimeout: 1,
          retries: 0
        }
      }, function (post) {
        return post.reply(200, {
          error: 'invalid_auth'
        });
      });

      rtm.on(RTM_CLIENT_EVENTS.DISCONNECT, function () {
        done();
      });
    });

    it('should disconnect if autoReconnect is set to false', function (done) {
      testRetryPolicy({
        autoReconnect: false,
        retryConfig: {
          minTimeout: 1,
          maxTimeout: 1,
          retries: 0
        }
      });

      rtm.on(RTM_CLIENT_EVENTS.DISCONNECT, function () {
        done();
      });
    });

    it('should use max attempts and backoff options in place of a retryConfig', function (done) {
      var retryCount = 2;
      var backoffDuration = 1;

      testRetryPolicy({
        maxReconnectionAttempts: retryCount,
        reconnectionBackoff: backoffDuration
      });

      rtm.on(RTM_CLIENT_EVENTS.UNABLE_TO_RTM_START, function (err) {
        expect(err).to.be.ok;
        expect(rtm.transport.callCount).to.equal(retryCount + 1);
        done();
      });
    });

    /**
     * Without some kind of virtual scheduler we can't test "forever" very well,
     * so this test focuses on the exponential backoff part.
     */
    it('should support retrying forever with exponential backoff', function (done) {
      var retryCount = 6;
      var timeout = Math.pow(2, retryCount);
      var unableToStart = sinon.spy();

      testRetryPolicy({
        retryConfig: {
          forever: true,
          minTimeout: 1
        }
      });

      rtm.on(RTM_CLIENT_EVENTS.UNABLE_TO_RTM_START, unableToStart);

      setTimeout(function () {
        expect(unableToStart.notCalled).to.be.ok;
        expect(rtm.transport.callCount).to.equal(retryCount);
        done();
      }, timeout);
    });
  });
});
