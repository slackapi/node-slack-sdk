var expect = require('chai').expect;

var getRtmClient = require('../../utils/client').getRtmClient;
var getRTMMessageFixture = require('../../fixtures').getRTMMessage;


describe('RTM API Message Handlers: Raw Events', function () {
  var rtmClient;

  afterEach(function () {
    rtmClient.disconnect();
  });

  it('emits raw messages with all lower case keys unchanged', function (done) {
    rtmClient = getRtmClient();
    rtmClient.on('raw_message', function (rawMsg) {
      expect(rawMsg).to.equal(JSON.stringify(getRTMMessageFixture('im_open')));
      done();
    });
    rtmClient.handleWsMessage(JSON.stringify(getRTMMessageFixture('im_open')));
  });

});
