var expect = require('chai').expect;
var helpers = require('../lib/helpers');
var os = require('os');
var pkginfo = require('pkginfo')(module, 'version', 'name'); // eslint-disable-line no-unused-vars

var userAgent = module.exports.name.replace('/', ':') + '/' + module.exports.version
  + ' ' + os.platform() + '/' + os.release()
  + ' node/' + process.version.replace('v', '');

describe('Version strings', function () {
  describe('getVersionString', function () {
    it('returns the current version, when unmodified', function () {
      var str = helpers.getVersionString();
      expect(str).to.equal(userAgent);
    });
  });

  describe('appendToVersionString', function () {
    it('appends a new value', function () {
      var str;
      helpers.appendToVersionString('foobar', '1.2');
      str = helpers.getVersionString();
      expect(str).to.equal(userAgent + ' foobar/1.2');
    });
  });

  describe('appendToVersionString', function () {
    it('should never overwrite an existing value', function () {
      var str;
      helpers.appendToVersionString('foobar', '1.3');
      str = helpers.getVersionString();
      // TODO that the order of these tests _matters_ bothers me
      expect(str).to.equal(userAgent + ' foobar/1.2 foobar/1.3');
    });
  });

  describe('appendToVersionStringWithoutVersion', function () {
    it('should never overwrite an existing value', function () {
      var str;
      helpers.appendToVersionString('foobar');
      str = helpers.getVersionString();
      // TODO that the order of these tests _matters_ bothers me
      expect(str).to.equal(userAgent + ' foobar/1.2 foobar/1.3 foobar');
    });
  });
});
