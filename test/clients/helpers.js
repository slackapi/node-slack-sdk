var expect = require('chai').expect;

var helpers = require('../../lib/clients/helpers');


describe('Client Helpers', function () {
  describe('#getAPICallData()', function () {
    it('merges the required and opts values', function () {
      var required = { channel: 'slack' };
      var opts = { count: 125 };

      expect(helpers.getAPICallData('test', required, opts)).to.be.deep.equal({
        channel: 'slack',
        count: 125,
        token: 'test'
      });
    });

    it('takes required args over optional ones', function () {
      var required = { channel: 'slack' };
      var opts = { channel: 'bad' };

      expect(helpers.getAPICallData('test', required, opts)).to.be.deep.equal({
        channel: 'slack',
        token: 'test'
      });
    });

    it('prunes undefined and null values from the data object', function () {
      var required = { channel: 'slack' };
      var opts = { opt_count: undefined };

      expect(helpers.getAPICallData('test', required, opts)).to.be.deep.equal({
        channel: 'slack',
        token: 'test'
      });
    });

    it('handles undefined or null data objects', function () {
      expect(helpers.getAPICallData('test', undefined, null)).to.be.deep.equal({
        token: 'test'
      });
    });

    it('JSON encodes attachments if they are not already encoded', function () {
      var required = { attachments: [1, 2, 3] };

      expect(helpers.getAPICallData('test', required, null)).to.be.deep.equal({
        attachments: '[1,2,3]',
        token: 'test'
      });
    });

    it('leaves attachments alone if they are already encoded', function () {
      var required = { attachments: '["a","b","c"]' };

      expect(helpers.getAPICallData('test', required, null)).to.be.deep.equal({
        attachments: '["a","b","c"]',
        token: 'test'
      });
    });
  });

  describe('#getAPICallArgs()', function () {
    var testCb = function () {};

    it('should return the cb when passed in place of optArgs', function () {
      var args = helpers.getAPICallArgs('t', 'ua', 'url', 'endpoint', null, testCb);
      expect(args.cb).to.deep.equal(testCb);
      expect(args.args.data).to.deep.equal({ token: 't' });
    });

    it('should return the cb when passed as the cb', function () {
      var args = helpers.getAPICallArgs('t', 'ua', 'url', 'endpoint', null, null, testCb);
      expect(args.cb).to.deep.equal(testCb);
      expect(args.args.data).to.deep.equal({ token: 't' });
    });

    it('returns the optional args when passed as the optArgs with a cb', function () {
      var args = helpers.getAPICallArgs('t', 'ua', 'url', 'endpoint', null, { test: '1' }, testCb);
      expect(args.cb).to.deep.equal(testCb);
      expect(args.args.data).to.deep.equal({ test: '1', token: 't' });
    });

    it('returns the optional args when passed as the optArgs with null as the cb', function () {
      var args = helpers.getAPICallArgs('t', 'ua', 'url', 'endpoint', null, { test: '1' }, null);
      expect(args.cb).to.equal(null);
      expect(args.args.data).to.deep.equal({ test: '1', token: 't' });
    });

  });
});
