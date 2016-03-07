var expect = require('chai').expect;

var clientUtils = require('../../../lib/clients/events/utils');


describe('RTM Client helpers', function () {
  describe('#makeMessageEventWithSubtype()', function () {

    it('makes a message string from a message event and subtype', function () {
      expect(clientUtils.makeMessageEventWithSubtype('test')).to.equal('message::test');
      expect(clientUtils.makeMessageEventWithSubtype('test', '_')).to.equal('message_test');
    });

  });
});
