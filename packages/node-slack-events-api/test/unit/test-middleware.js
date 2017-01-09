var assert = require('assert');
var systemUnderTest = require('../../dist/middleware');
var bindMiddlewareToAdapter = systemUnderTest.default.bindMiddlewareToAdapter;
var errorCodes = systemUnderTest.errorCodes;

// NOTE: Unit testing the middleware module is not very effective because mocking its dependencies
// beyond just the trivial cases requires too much effort. Instead of depending on thorough unit
// tests, the integration tests try to exercise most of the middleware module's functionality.

describe('bindMiddlewareToAdapter', function () {
  beforeEach(function () {
    this.adapter = { verificationToken: 'VERIFICATION_TOKEN' };
    bindMiddlewareToAdapter(this.adapter);
  });

  it('should forward an error when there is no body parser', function (done) {
    var req = {};
    var res = {};
    this.adapter.emit = function (arg1, arg2) {
      assert(arg2 instanceof Error);
      assert.equal(arg2.code, errorCodes.NO_BODY_PARSER);
      done();
    };
    this.adapter.middleware(req, res);
  });

  it('should emit on the adapter', function (done) {
    var eventName = 'eventName';
    var event = {
      type: eventName,
      key: 'value'
    };
    var req = {
      body: {
        event: event
      }
    };
    var res = {
    };
    function next() {
      assert(false);
      done(new Error());
    }
    this.adapter.emit = function (arg1, arg2) {
      assert.equal(eventName, arg1);
      assert.equal(event, arg2);
      done();
    };
    this.adapter.middleware(req, res, next);
  });
});
