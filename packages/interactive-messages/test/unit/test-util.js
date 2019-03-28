var assert = require('chai').assert;
var systemUnderTest = require('../../dist/util');
var promiseTimeout = systemUnderTest.promiseTimeout;
var errorCodes = systemUnderTest.errorCodes;
var delayed = require('../helpers').delayed;

// test suite
describe('promiseTimeout', function () {
  it('should resolve to input promise value when input resolves faster than timeout', function () {
    var value = 'test';
    var input = delayed(10, value);
    var output = promiseTimeout(20, input);
    return output.then(function (v) {
      assert.equal(v, value);
    });
  });
  it('should reject with error code when input resolves slower than timeout', function () {
    var input = delayed(20, 'test');
    var output = promiseTimeout(10, input);
    return output.then(function (value) {
      throw new Error('should not resolve. value: ' + value);
    }, function (error) {
      assert.equal(error.code, errorCodes.PROMISE_TIMEOUT);
    });
  });
  it('should reject to input error when input rejects faster than timeout', function () {
    var reason = 'test';
    var input = delayed(10, undefined, reason);
    var output = promiseTimeout(20, input);
    return output.then(function (value) {
      throw new Error('should not resolve. value: ' + value);
    }, function (error) {
      assert.equal(error.message, reason);
    });
  });
  it('should reject with error code when input rejects slower than timeout', function () {
    var reason = 'test';
    var input = delayed(20, undefined, reason);
    var output = promiseTimeout(10, input);
    return output.then(function (value) {
      throw new Error('should not resolve. value: ' + value);
    }, function (error) {
      assert.equal(error.code, errorCodes.PROMISE_TIMEOUT);
    });
  });
});
