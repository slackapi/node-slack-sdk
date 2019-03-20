'use strict';

var assert = require('chai').assert;
var library = require('../../dist');

describe('@slack/events-api', function () {
  it('should export "verifyRequestSignature"', function () {
    assert.property(library, 'verifyRequestSignature');
  });

  it('should export "createEventAdapter"', function () {
    assert.property(library, 'createEventAdapter');
  });

  it('should export "errorCodes"', function () {
    assert.property(library, 'errorCodes');
  });
});
