var expect = require('chai').expect;
var helpers = require('../lib/helpers');

describe('Version strings', function () {
  describe('getVersionString', function () {
    it('returns the current version, when unmodified', function () {
      var str = helpers.getVersionString();
      // TODO the slash in the package name worries me
      expect(str).to.equal('slackapi/node-slack-sdk/3.7.0');
    });
  });

  describe('appendToVersionString', function () {
    it('appends a new value', function () {
      var str;
      helpers.appendToVersionString('foobar', '1.2');
      str = helpers.getVersionString();
      expect(str).to.equal('slackapi/node-slack-sdk/3.7.0 foobar/1.2');
    });
  });

  describe('appendToVersionString', function () {
    it('should never overwrite an existing value', function () {
      var str;
      helpers.appendToVersionString('slackapi/node-slack-sdk', '1.2');
      str = helpers.getVersionString();
      // TODO that the order of these tests _matters_ bothers me
      expect(str).to.equal('slackapi/node-slack-sdk/3.7.0 foobar/1.2 slackapi/node-slack-sdk/1.2');
    });
  });
});
