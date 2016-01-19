var expect = require('chai').expect;

var helpers = require('../../lib/clients/helpers');


describe('Client Helpers', function () {
  describe('#parseAPIResponse()', function () {
    it('should process a JSON  string, converting it to JSON with camel-cased keys', function () {
      var testMsg = {
        ok: true,
        reply_to: 1,
        ts: '1355517523.000005',
        text: 'Hello world',
      };
      var message = helpers.parseAPIResponse(JSON.stringify(testMsg));

      expect(message).to.deep.equal({
        ok: true,
        replyTo: 1,
        ts: '1355517523.000005',
        text: 'Hello world',
      });
    });
  });

  describe('#getData', function () {
    it('merges the opts value into the top level data object and then removes opts', function () {
      var testData = {
        channel: 'slack',
        opts: {
          count: 125,
        },
      };

      expect(helpers.getData(testData, 'test')).to.be.deep.equal({
        channel: 'slack',
        count: 125,
        token: 'test',
      });
    });

    it('prunes undefined and null values from the data object', function () {
      var testData = {
        channel: 'slack',
        opt_count: undefined,
      };

      expect(helpers.getData(testData, 'test')).to.be.deep.equal({
        channel: 'slack',
        token: 'test',
      });
    });

    it('handles undefined data object', function () {
      var testData = undefined;

      expect(helpers.getData(testData, 'test')).to.be.deep.equal({
        token: 'test',
      });
    });
  });
});
