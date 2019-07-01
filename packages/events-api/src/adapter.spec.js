require('mocha');
const EventEmitter = require('events');
const http = require('http');
const { assert } = require('chai');
const sinon = require('sinon');
const noop = require('nop');
const getRandomPort = require('get-random-port');

const { createStreamRequest } = require('../test/helpers');
const { SlackEventAdapter } = require('./adapter');

// fixtures and test helpers
const workingSigningSecret = 'SIGNING_SECRET';

describe('SlackEventAdapter', function () {
  describe('constructor', function () {
    it('should be an EventEmitter subclass', function () {
      const adapter = new SlackEventAdapter(workingSigningSecret);
      assert(adapter instanceof EventEmitter);
    });
    it('should fail without a signing secret', function () {
      assert.throws(function () {
        const adapter = new SlackEventAdapter();
      }, TypeError);
    });
    it('should store the signing secret', function () {
      const adapter = new SlackEventAdapter(workingSigningSecret);
      assert.equal(adapter.signingSecret, workingSigningSecret);
    });
  });

  describe('#createServer()', function () {
    beforeEach(function () {
      this.adapter = new SlackEventAdapter(workingSigningSecret);
    });

    it('should return a Promise of an http.Server', function () {
      return this.adapter.createServer().then(function (server) {
        assert.instanceOf(server, http.Server);
      });
    });
  });

  describe('#start()', function () {
    beforeEach(function (done) {
      const self = this;
      self.adapter = new SlackEventAdapter(workingSigningSecret);
      getRandomPort(function (error, port) {
        if (error) return done(error);
        self.portNumber = port;
        return done();
      });
    });
    afterEach(function () {
      return this.adapter.stop().catch();
    });
    it('should return a Promise for a started http.Server', function () {
      const self = this;
      return this.adapter.start(self.portNumber).then(function (server) {
        // only works in node >= 5.7.0
        // assert(server.listening);
        assert(server instanceof http.Server);
        assert.equal(server.address().port, self.portNumber);
      });
    });
  });

  describe('#expressMiddleware()', function () {
    beforeEach(function () {
      this.adapter = new SlackEventAdapter(workingSigningSecret);
      this.emit = sinon.stub();
      this.adapter.emit = this.emit;
      this.next = sinon.stub();
      this.res = sinon.stub({
        setHeader: function () { },
        end: function () { }
      });
    });

    it('should return a function', function () {
      const middleware = this.adapter.expressMiddleware();
      assert.isFunction(middleware);
    });
    it('should emit on the adapter', function (done) {
      const middleware = this.adapter.expressMiddleware();
      const emit = this.emit;
      const ts = Math.floor(Date.now() / 1000);
      const eventName = 'eventName';
      const event = {
        type: eventName,
        key: 'value'
      };
      const rawReq = {
        body: {
          event: event
        }
      };
      const req = createStreamRequest(workingSigningSecret, ts, JSON.stringify(rawReq.body));
      const res = sinon.stub({
        setHeader: noop,
        end: noop
      });
      function next() {
        assert(false);
        done(new Error());
      }
      emit.callsFake(function (arg1, arg2) {
        assert.equal(eventName, arg1);
        assert.deepEqual(event, arg2);
        done();
      });
      middleware(req, res, next);
    });
  });

  describe('#requestListener()', function () {
    beforeEach(function () {
      this.adapter = new SlackEventAdapter(workingSigningSecret);
    });
    it('should return a function', function () {
      const requestListener = this.adapter.requestListener();
      assert.isFunction(requestListener);
    });
  });
});
