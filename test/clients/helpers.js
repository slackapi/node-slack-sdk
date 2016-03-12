var expect = require('chai').expect;

var helpers = require('../../lib/clients/helpers');


describe('Client Helpers', function () {
  describe('#getData()', function () {
    it('merges the opts value into the top level data object and then removes opts', function () {
      var testData = {
        channel: 'slack',
        opts: {
          count: 125
        }
      };

      expect(helpers.getData(testData, 'test')).to.be.deep.equal({
        channel: 'slack',
        count: 125,
        token: 'test'
      });
    });

    it('prunes undefined and null values from the data object', function () {
      var testData = {
        channel: 'slack',
        opt_count: undefined
      };

      expect(helpers.getData(testData, 'test')).to.be.deep.equal({
        channel: 'slack',
        token: 'test'
      });
    });

    it('handles undefined data object', function () {
      var testData = undefined;

      expect(helpers.getData(testData, 'test')).to.be.deep.equal({
        token: 'test'
      });
    });

    it('JSON encodes attachments if they are not already encoded', function () {
      var testData = {
        attachments: [1, 2, 3]
      };

      expect(helpers.getData(testData, 'test')).to.be.deep.equal({
        attachments: '[1,2,3]',
        token: 'test'
      });
    });

    it('leaves attachments alone if they are already encoded', function () {
      var testData = {
        attachments: '["a","b","c"]'
      };

      expect(helpers.getData(testData, 'test')).to.be.deep.equal({
        attachments: '["a","b","c"]',
        token: 'test'
      });
    });
  });

  describe('#getAPICallArgs()', function () {
    it('returns an args object with the token when called with no data or cb', function () {
      var callArgs = helpers.getAPICallArgs('test');
      expect(callArgs.data).to.deep.equal({
        token: 'test'
      });
    });

    it('returns an args object with a token and data items when called with a data obj and no cb',
      function () {
        var callArgs = helpers.getAPICallArgs('test', { test: 1 });
        expect(callArgs.data).to.deep.equal({
          test: 1,
          token: 'test'
        });
      }
    );

    it('assigns data from the opts to the returned args obj and removes the opts key', function () {
      var callArgs = helpers.getAPICallArgs('test', { test: 1, opts: { cat: 1 } });
      expect(callArgs.data).to.deep.equal({
        test: 1,
        token: 'test',
        cat: 1
      });
    });

    it('returns the supplied cb and empty object when called with a cb and no object', function () {
      var testCb = function testCb() {};
      var callArgs = helpers.getAPICallArgs('test', testCb);
      expect(callArgs.data).to.deep.equal({
        token: 'test'
      });
      expect(callArgs.cb).to.deep.equal(testCb);
    });

    it('returns the supplied object and cb when called with an object and cb', function () {
      var testCb = function testCb() {};
      var callArgs = helpers.getAPICallArgs('test', { test: 1 }, testCb);
      expect(callArgs.data).to.deep.equal({
        test: 1,
        token: 'test'
      });
      expect(callArgs.cb).to.deep.equal(testCb);
    });
  });
});
