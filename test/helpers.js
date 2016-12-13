var expect = require('chai').expect;

var helpers = require('../lib/helpers');

describe('Version strings', function () {
  describe('getVersionString', function () {
    it('returns the current version, when unmodified', function () {
      var str = helpers.getVersionString();
      expect(str).to.equal('foobar/1.2.3');
    });
  });
});
