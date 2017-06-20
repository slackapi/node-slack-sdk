var expect = require('chai').expect;
var lodash = require('lodash');
var sinon = require('sinon');

var RtmClient = require('../../../lib/clients/rtm/client');

describe('RTM API Client', function () {
  var createRtmClient = function (opts) {
    var options = lodash.assign({ logger: sinon.stub() }, opts);
    return new RtmClient('fake-token', options);
  };

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

    it('should send a presence_sub message when subscribePresence is called', function () {
      var rtm = createRtmClient();
      var userIds = ['VinDiesel'];
      sinon.spy(rtm, 'send');
      rtm.subscribePresence(userIds);
      expect(rtm.send.calledWith({
        type: 'presence_sub',
        ids: userIds
      })).to.equal(true);
    });
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
