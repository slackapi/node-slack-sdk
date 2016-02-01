var expect = require('chai').expect;
var lodash = require('lodash');
var nock = require('nock');
var sinon = require('sinon');

var RTM_CLIENT_EVENTS = require('../../../lib/clients/events/client').RTM;
var RTM_JSON = require('../../fixtures/rtm.start.json');
var RtmAPIClient = require('../../../lib/clients/rtm/client');
var MockWSServer = require('../../utils/mock-ws-server');


describe('RTM API Client', function () {

  describe('reconnection logic', function () {

    var setUpTest = function (wssPort, fakeSlackUrl) {
      var rtmFixture = lodash.cloneDeep(RTM_JSON);
      rtmFixture.url = 'ws://localhost:' + wssPort;

      nock(fakeSlackUrl)
        .post('/rtm.start')
        .times(2)
        .reply(200, rtmFixture);

      return new MockWSServer({ port: wssPort });
    };

    var testReconnectionLogic = function (onFirstConn, onSecondConnFn, opts, wssPort, done) {
      var clonedOpts = lodash.cloneDeep(opts);
      var rtm;
      var rtmConnCount;
      // Make a fake URL as otherwise the test cases run in parallel and exhaust the nock-ed endpoint with the customized ws:// url
      var fakeSlackUrl = 'https://slack.com:' + wssPort + '/api';
      var wss = setUpTest(wssPort, fakeSlackUrl);

      clonedOpts.slackAPIUrl = fakeSlackUrl;
      rtm = new RtmAPIClient('fake-token', clonedOpts);
      sinon.spy(rtm, 'reconnect');
      rtm.start();

      rtmConnCount = 0;
      rtm.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, function () {
        rtmConnCount++;
        if (rtmConnCount === 1) {
          onFirstConn(wss, rtm);
        }

        if (rtmConnCount === 2) {
          onSecondConnFn(rtm);
          rtm.disconnect();
          rtm = null;
          done();
        }
      });
    };

    // TODO(leah): This test is quite slow (~50ms), figure out why
    it('should reconnect when a pong is not received within the max interval', function (done) {
      var onSecondConnFn = function (rtm) {
        expect(rtm.reconnect.calledOnce).to.equal(true);
      };

      var opts = {
        wsPingInterval: 1,
        maxPongInterval: 2,
        reconnectionBackoff: 1,
      };

      testReconnectionLogic(lodash.noop, onSecondConnFn, opts, 5221, done);
    });

    it('should reconnect when the websocket closes and auto-reconnect is true', function (done) {
      var onFirstConn = function (wss) {
        wss.closeClientConn();
      };

      var onSecondConnFn = function (rtm) {
        expect(rtm.reconnect.calledOnce).to.equal(true);
      };

      testReconnectionLogic(onFirstConn, onSecondConnFn, { reconnectionBackoff: 1 }, 5222, done);
    });


    // This is overly complex for what it's trying to test (that a state var is getting toggled),
    // but /shrug
    it('should not attempt to reconnect while a connection is in progress', function (done) {
      var attemptingReconnectSpy = sinon.spy();

      var onFirstConn = function (wss, rtm) {
        rtm.on(RTM_CLIENT_EVENTS.ATTEMPTING_RECONNECT, attemptingReconnectSpy);
        rtm.reconnect();
        rtm.reconnect();
      };

      var onSecondConnFn = function (rtm) {
        rtm.reconnect();
        expect(attemptingReconnectSpy.calledTwice).to.equal(true);
      };

      testReconnectionLogic(onFirstConn, onSecondConnFn, { reconnectionBackoff: 1 }, 5223, done);
    });


    it('should reconnect when a `team_migration_started` event is received', function (done) {
      var onFirstConn = function (wss) {
        wss.sendMessageToClientConn({ type: 'team_migration_started' });
      };

      var onSecondConnFn = function (rtm) {
        expect(rtm.reconnect.calledOnce).to.equal(true);
      };

      testReconnectionLogic(onFirstConn, onSecondConnFn, { reconnectionBackoff: 1 }, 5224, done);
    });

  });

});
