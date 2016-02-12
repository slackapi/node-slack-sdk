var expect = require('chai').expect;
var sinon = require('sinon');

var RTM_EVENTS = require('../../lib/clients/events').RTM_EVENTS;
var MSG_SUBTYPES = require('../../lib/clients/events').RTM_MESSAGE_SUBTYPES;
var getMemoryDataStore = require('../utils/client').getMemoryDataStore;
var getRTMMessageFixture = require('../fixtures').getRTMMessage;
var makeMessageEventWithSubtype = require('../../lib/clients/events/utils')
  .makeMessageEventWithSubtype;


describe('DataStore', function () {

  describe('#handleRtmMessage()', function () {

    var testMessageHandler = function testMessageHandler(eventType, isMsg, optExpectedHandlerType) {
      var dataStore = getMemoryDataStore();
      sinon.spy(dataStore._messageHandlers, optExpectedHandlerType || eventType);

      dataStore.handleRtmMessage(
        '', '', isMsg ? RTM_EVENTS.MESSAGE : eventType, getRTMMessageFixture(eventType));
      expect(dataStore._messageHandlers[optExpectedHandlerType || eventType].calledOnce)
        .to.equal(true);
    };

    it('calls the message handler for non-message events', function () {
      testMessageHandler(RTM_EVENTS.PRESENCE_CHANGE);
    });

    it('calls the message::subtype handler for messages with a subtype handler', function () {
      testMessageHandler(makeMessageEventWithSubtype(MSG_SUBTYPES.MESSAGE_DELETED), true);
    });

    it('calls the `rtm_client_add_message` handler for msgs with no subtype handler', function () {
      testMessageHandler(
        makeMessageEventWithSubtype(MSG_SUBTYPES.GROUP_NAME),
        true,
        makeMessageEventWithSubtype('rtm_client_add_message')
      );
    });

  });

});
