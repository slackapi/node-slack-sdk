var assert = require('assert');
var systemUnderTest = require('../../dist/express-middleware');
var createExpressMiddleware = systemUnderTest.createExpressMiddleware;
var errorCodes = systemUnderTest.errorCodes;
var noop = require('nop');

// NOTE: Unit testing the middleware module is not very effective because mocking its dependencies
// beyond just the trivial cases requires too much effort. Instead of depending on thorough unit
// tests, the integration tests aim to exercise most of the middleware module's functionality.

describe('expressMiddleware', function () {
  beforeEach(function () {
    this.adapter = { verificationToken: 'VERIFICATION_TOKEN' };
    this.expressMiddleware = createExpressMiddleware(this.adapter);
  });

  it('should forward an error when there is no body parser', function (done) {
    var req = {};
    var res = {};
    this.adapter.emit = function (arg1, arg2) {
      assert(arg2 instanceof Error);
      assert.equal(arg2.code, errorCodes.NO_BODY_PARSER);
      done();
    };
    this.expressMiddleware(req, res);
  });

  it('should emit on the adapter', function (done) {
    var eventName = 'eventName';
    var event = {
      type: eventName,
      key: 'value'
    };
    var req = {
      body: {
        event: event,
        token: this.adapter.verificationToken
      }
    };
    var res = {
      set: noop,
      send: noop,
      on: noop
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
    this.expressMiddleware(req, res, next);
  });
});
