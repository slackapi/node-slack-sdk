var assert = require('assert');
var http = require('http');
var proxyquire = require('proxyquire');
var nop = require('nop');
var getRandomPort = require('get-random-port');
var systemUnderTest = require('../../dist/adapter');
var SlackMessageAdapter = systemUnderTest.default;

// fixtures and test helpers
var workingVerificationToken = 'VERIFICATION_TOKEN';

describe('SlackMessageAdapter', function () {
  describe('constructor', function () {
    it('should build an instance', function () {
      var adapter = new SlackMessageAdapter(workingVerificationToken);
      assert(adapter instanceof SlackMessageAdapter);
    });
    it('should fail without a verification token', function () {
      assert.throws(function () {
        var adapter = new SlackMessageAdapter();  // eslint-disable-line no-unused-vars
      }, TypeError);
    });
  });

  describe('#createServer()', function () {
    beforeEach(function () {
      this.adapter = new SlackMessageAdapter(workingVerificationToken);
    });
    describe('when express package is not found', function () {
      beforeEach(function () {
        var SlackMessageAdapterNoExpress = proxyquire('../../dist/adapter', { express: null }).default;
        this.adapter = new SlackMessageAdapterNoExpress(workingVerificationToken);
      });
      it('should reject', function () {
        return this.adapter.createServer()
          .then(function (server) {
            assert.fail(server, null, 'a server was created');
          })
          .catch(function (error) {
            if (error.code === 'MODULE_NOT_FOUND') {
              assert(true);
            } else {
              throw error;
            }
          });
      });
    });

    describe('when body-parser package is not found', function () {
      beforeEach(function () {
        var SlackMessageAdapterNoBodyParser = proxyquire('../../dist/adapter', { 'body-parser': null }).default;
        this.adapter = new SlackMessageAdapterNoBodyParser(workingVerificationToken);
      });
      it('should reject', function () {
        return this.adapter.createServer()
          .then(function (server) {
            assert.fail(server, null, 'a server was created');
          })
          .catch(function (error) {
            if (error.code === 'MODULE_NOT_FOUND') {
              assert(true);
            } else {
              throw error;
            }
          });
      });
    });

    it('should return a Promise of an http.Server', function () {
      return this.adapter.createServer().then(function (server) {
        assert(server instanceof http.Server);
      });
    });
  });

  describe('#start()', function () {
    beforeEach(function (done) {
      var self = this;
      self.adapter = new SlackMessageAdapter(workingVerificationToken);
      getRandomPort(function (error, port) {
        if (error) return done(error);
        self.portNumber = port;
        return done();
      });
    });
    afterEach(function () {
      return this.adapter.stop().catch(nop);
    });
    it('should return a Promise for a started http.Server', function () {
      var self = this;
      return this.adapter.start(self.portNumber).then(function (server) {
        assert(server.listening);
        assert.equal(server.address().port, self.portNumber);
      });
    });
  });
});
