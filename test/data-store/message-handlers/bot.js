var expect = require('chai').expect;

var getMemoryDataStore = require('../../utils/client').getMemoryDataStore;
var messageHandlers = require('../../../lib/data-store/message-handlers');

var getRTMMessageFixture = require('../../fixtures').getRTMMessage;


describe('RTM API Message Handlers: Bot Events', function () {

  describe('`bot_xxx` events', function () {

    var testBotUpserted = function (event) {
      var dataStore = getMemoryDataStore();
      var botMsg = getRTMMessageFixture('bot_added');
      messageHandlers[event](dataStore, botMsg);

      expect(dataStore.getBotById(botMsg.bot.id)).to.have.property('name', botMsg.bot.name);
    };

    it('adds a new bot to the data store when a `bot_added` message is received', function () {
      testBotUpserted('bot_added');
    });

    it('updates a bot in the data store when a `bot_changed` message is received', function () {
      testBotUpserted('bot_changed');
    });

  });

});
