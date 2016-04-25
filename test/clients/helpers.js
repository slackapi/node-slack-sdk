var expect = require('chai').expect;

var helpers = require('../../lib/clients/helpers');


describe('Client Helpers', function () {
  describe('#getApiCallData()', function () {
    it('merges the required and opts values', function () {
      var required = { channel: 'slack' };
      var opts = { count: 125 };

      expect(helpers.getApiCallData('test', required, opts)).to.be.deep.equal({
        channel: 'slack',
        count: 125,
        token: 'test'
      });
    });

    it('takes required args over optional ones', function () {
      var required = { channel: 'slack' };
      var opts = { channel: 'bad' };

      expect(helpers.getApiCallData('test', required, opts)).to.be.deep.equal({
        channel: 'slack',
        token: 'test'
      });
    });

    it('prunes undefined and null values from the data object', function () {
      var required = { channel: 'slack' };
      var opts = { opt_count: undefined };

      expect(helpers.getApiCallData('test', required, opts)).to.be.deep.equal({
        channel: 'slack',
        token: 'test'
      });
    });

    it('handles undefined or null data objects', function () {
      expect(helpers.getApiCallData('test', undefined, null)).to.be.deep.equal({
        token: 'test'
      });
    });

    it('JSON encodes attachments if they are not already encoded', function () {
      var required = { attachments: [1, 2, 3] };

      expect(helpers.getApiCallData('test', required, null)).to.be.deep.equal({
        attachments: '[1,2,3]',
        token: 'test'
      });
    });

    it('leaves attachments alone if they are already encoded', function () {
      var required = { attachments: '["a","b","c"]' };

      expect(helpers.getApiCallData('test', required, null)).to.be.deep.equal({
        attachments: '["a","b","c"]',
        token: 'test'
      });
    });
  });
});
