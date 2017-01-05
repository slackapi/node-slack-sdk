var assert = require('assert');
var http = require('http');
var EventEmitter = require('events');
var proxyquire = require('proxyquire');
var systemUnderTest = require('../../dist/adapter');
var errorCodes = systemUnderTest.errorCodes;
var SlackEventAdapter = systemUnderTest.default;

// fixtures and test helpers
var workingVerificationToken = 'VERIFICATION_TOKEN';
function fakeBindMiddlewareToAdapter(adapter) {
  // eslint-disable-next-line no-param-reassign
  adapter.middleware = function _fakeMiddleware() { };
}

describe('SlackEventAdapter', function () {
  describe('constructor', function () {
    it('should be an EventEmitter subclass', function () {
      var adapter = new SlackEventAdapter(workingVerificationToken);
      assert(adapter instanceof EventEmitter);
    });
    it('should fail without a verification token', function () {
      assert.throws(function () {
        var adapter = new SlackEventAdapter();  // eslint-disable-line no-unused-vars
      }, TypeError);
    });
    it('should store the verification token', function () {
      var adapter = new SlackEventAdapter(workingVerificationToken);
      assert.equal(adapter.verificationToken, workingVerificationToken);
    });
  });

  describe('#expressServer()', function () {
    beforeEach(function () {
      this.adapter = new SlackEventAdapter(workingVerificationToken);
    });

    it('should reject if the adapter does not have middleware bound', function () {
      return this.adapter.expressServer()
        .then(function (server) {
          assert.fail(server, null, 'a server was created');
        })
        .catch(function (error) {
          if (error.code === errorCodes.MIDDLEWARE_NOT_BOUND) {
            assert(true);
          } else {
            throw error;
          }
        });
    });

    describe('when express package is not found', function () {
      beforeEach(function () {
        SlackEventAdapter = proxyquire('../../dist/adapter', { express: null }).default;
        this.adapter = new SlackEventAdapter(workingVerificationToken);
      });
      it('should reject', function () {
        fakeBindMiddlewareToAdapter(this.adapter);
        return this.adapter.expressServer()
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
        SlackEventAdapter = proxyquire('../../dist/adapter', { 'body-parser': null }).default;
        this.adapter = new SlackEventAdapter(workingVerificationToken);
      });
      it('should reject', function () {
        fakeBindMiddlewareToAdapter(this.adapter);
        return this.adapter.expressServer()
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
      fakeBindMiddlewareToAdapter(this.adapter);
      return this.adapter.expressServer().then(function (server) {
        assert(server instanceof http.Server);
      });
    });
  });
});
