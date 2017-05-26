var expect = require('chai').expect;
var lodash = require('lodash');
var nock = require('nock');
var sinon = require('sinon');

var RTM_CLIENT_EVENTS = require('../../../lib/clients/events/client').RTM;
var RTM_JSON = require('../../fixtures/rtm.start.json');
var RTM_CONNECT_JSON = require('../../fixtures/rtm.connect.json');
var RtmClient = require('../../../lib/clients/rtm/client');
var MockWSServer = require('../../utils/mock-ws-server');

var PORT_NUMBER = 5221;

describe('RTM API Client', function () {
  var createRtmClient = function (opts) {
    var options = lodash.assign({ logger: sinon.stub() }, opts);
    return new RtmClient('fake-token', options);
  };

  describe('Connection logic', function () {

    var mockWebSocket = function (wssPort, fakeSlackUrl, useConnect) {
      var rtmFixture = useConnect
        ? lodash.cloneDeep(RTM_CONNECT_JSON)
        : lodash.cloneDeep(RTM_JSON);

      rtmFixture.url = 'ws://localhost:' + wssPort;

      nock(fakeSlackUrl)
        .post(useConnect ? '/rtm.connect' : '/rtm.start')
        .times(2)
        .reply(200, rtmFixture);

      return new MockWSServer({ port: wssPort });
    };

    var testReconnectionLogic = function (onConnectionCallbacks, done, opts, startOpts) {
      var clonedOpts = lodash.cloneDeep(opts);
      var rtm;
      var connectionCount;

      // Make a fake URL as otherwise the test cases run in parallel and exhaust the nock-ed
      // endpoint with the customized ws:// url
      var fakeSlackUrl = 'https://slack.com:' + PORT_NUMBER++ + '/api';
      var wss = mockWebSocket(PORT_NUMBER, fakeSlackUrl);

      clonedOpts = clonedOpts || { reconnectionBackoff: 1 };
      clonedOpts.slackAPIUrl = fakeSlackUrl;
      rtm = createRtmClient(clonedOpts);

      sinon.spy(rtm, 'reconnect');
      rtm.start = sinon.stub(rtm, 'start', rtm.start);
      rtm.start(startOpts);

      connectionCount = 0;
      rtm.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, function () {
        onConnectionCallbacks[connectionCount++](wss, rtm);
        if (connectionCount === onConnectionCallbacks.length) {
          rtm.disconnect();
          rtm = null;
          done();
        }
      });
    };

    it('should reconnect when a pong is not received within the max interval', function (done) {
      var secondConnection = function (wss, rtm) {
        expect(rtm.reconnect.calledOnce).to.equal(true);
      };

      var opts = {
        wsPingInterval: 1,
        maxPongInterval: 2,
        reconnectionBackoff: 1
      };

      testReconnectionLogic([lodash.noop, secondConnection], done, opts);
    });

    it('should reconnect when the websocket closes and auto-reconnect is true', function (done) {
      var firstConnection = function (wss) {
        wss.closeClientConn();
      };

      var secondConnection = function (wss, rtm) {
        expect(rtm.reconnect.calledOnce).to.equal(true);
      };

      testReconnectionLogic([firstConnection, secondConnection], done);
    });

    // This is overly complex for what it's trying to test (that a state var is getting toggled),
    // but /shrug
    it('should not attempt to reconnect while a connection is in progress', function (done) {
      var attemptingReconnectSpy = sinon.spy();

      var firstConnection = function (wss, rtm) {
        rtm.on(RTM_CLIENT_EVENTS.ATTEMPTING_RECONNECT, attemptingReconnectSpy);
        rtm.reconnect();
        rtm.reconnect();
      };

      var secondConnection = function (wss, rtm) {
        rtm.reconnect();
        expect(attemptingReconnectSpy.calledTwice).to.equal(true);
      };

      testReconnectionLogic([firstConnection, secondConnection], done);
    });

    it('should reconnect when a `team_migration_started` event is received', function (done) {
      var firstConnection = function (wss) {
        wss.sendMessageToClientConn({ type: 'team_migration_started' });
      };

      var secondConnection = function (wss, rtm) {
        expect(rtm.reconnect.calledOnce).to.equal(true);
      };

      testReconnectionLogic([firstConnection, secondConnection], done);
    });

    it('should pass the same start arguments when reconnecting', function (done) {
      var startOpts = {
        simple_latest: 1
      };

      var firstConnection = function (wss) {
        wss.closeClientConn();
      };

      var secondConnection = function (wss, rtm) {
        expect(rtm.start.calledTwice).to.equal(true);
        expect(rtm.start.getCall(0).args[0]).to.equal(startOpts);
        expect(rtm.start.getCall(1).args[0]).to.equal(startOpts);
      };

      testReconnectionLogic([firstConnection, secondConnection], done, null, startOpts);
    });

    it('should support connecting to a socket via rtm.connect', function (done) {
      var rtm;
      var useRtmConnect = true;
      var fakeSlackUrl = 'https://slack.com:' + PORT_NUMBER++ + '/api';

      mockWebSocket(PORT_NUMBER, fakeSlackUrl, useRtmConnect);
      rtm = createRtmClient({
        slackAPIUrl: fakeSlackUrl,
        useRtmConnect: useRtmConnect
      });
      rtm.start();

      rtm.on(RTM_CLIENT_EVENTS.AUTHENTICATED, function (data) {
        expect(data.self.id).to.equal('U02QYTVLJ');
        expect(data.team.id).to.equal('T02QYTVLG');
        expect(data.channels).to.equal(undefined);
        expect(data.users).to.equal(undefined);
        done();
      });
    });
  });
});
