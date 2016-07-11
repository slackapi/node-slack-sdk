var expect = require('chai').expect;
var lodash = require('lodash');
var nock = require('nock');
var sinon = require('sinon');

var RTM_CLIENT_EVENTS = require('../../../lib/clients/events/client').RTM;
var RTM_JSON = require('../../fixtures/rtm.start.json');
var RtmAPIClient = require('../../../lib/clients/rtm/client');
var MockWSServer = require('../../utils/mock-ws-server');


describe('RTM API Client', function () {
  var createRtmClient = function (opts) {
    var options = lodash.assign({ logger: sinon.stub() }, opts);
    return new RtmAPIClient('fake-token', options);
  };

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
      rtm = createRtmClient(clonedOpts);
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
        reconnectionBackoff: 1
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

  describe('Message Sending', function () {

    it('should call a cb with an err when the RTM client is not connected', function (done) {
      var rtm = createRtmClient();
      rtm.sendMessage('test', 'test', function (err, res) {
        expect(err).to.not.equal(null);
        expect(res).to.equal(null);
        done();
      });
    });

    it('should call a catch cb with an err when the RTM client is not connected', function (done) {
      var rtm = createRtmClient();
      rtm.sendMessage('test', 'test')
        .catch(function (err) {
          expect(err).to.not.equal(null);
          done();
        });
    });

    it('should call the `ws.send` method when the send or sendMessage function is called');

  });

  describe('Message Response Handling', function () {

    describe('#_registerMsgHandler()', function () {

      it('should write to _msgResponseHandlers and _msgChannelLookup', function () {
        var rtm = createRtmClient();
        var fakeHandler = { fulfill: null, reject: null };
        var wsMsg = { type: 'message', channel: 'fake', text: 'test', id: 1 };
        rtm._registerMsgHandler(1, wsMsg, fakeHandler);

        expect(rtm._msgResponseHandlers[1]).to.deep.equal(fakeHandler);
        expect(rtm._msgChannelLookup[1]).to.deep.equal('fake');
      });

    });

    describe('#_handleMsgResponse()', function () {

      var setupRTMClient = function (handler) {
        var rtm = createRtmClient();
        var wsMsg = { type: 'message', channel: 'fake', text: 'test', id: 1 };
        rtm._registerMsgHandler(1, wsMsg, handler);

        return rtm;
      };

      it('calls a registered callback fn when a message response or err is received', function () {
        var handler = sinon.spy();
        var rtm = setupRTMClient(handler);
        rtm._handleMsgResponse(1, null, 'test');

        expect(handler.calledWith(null, 'test')).to.equal(true);
      });

      it('should call a registered fulfill fn when a message response is received', function () {
        var handler = { fulfill: sinon.spy(), reject: null };
        var rtm = setupRTMClient(handler);
        rtm._handleMsgResponse(1, null, 'test');

        expect(handler.fulfill.calledWith('test')).to.equal(true);
      });

      it('should call a registered reject fn when a message response is received', function () {
        var handler = { fulfill: null, reject: sinon.spy() };
        var rtm = setupRTMClient(handler);
        rtm._handleMsgResponse(1, 'test', null);

        expect(handler.reject.calledWith('test')).to.equal(true);
      });

      it('deletes the response handler and channel lookup', function () {
        var rtm = setupRTMClient(function () {});
        rtm._handleMsgResponse(1, null, 'test');

        expect(rtm._msgResponseHandlers[1]).to.equal(undefined);
        expect(rtm._msgChannelLookup[1]).to.equal(undefined);
      });

    });

  });

});
