var expect = require('chai').expect;

var getMemoryDataStore = require('../../utils/client').getMemoryDataStore;
var messageHandlers = require('../../../lib/data-store/message-handlers');

var getRTMMessageFixture = require('../../fixtures').getRTMMessage;

var TEST_CHANNEL_ID = 'C0CJ25PDM';


describe('RTM API Message Handlers: Message Events', function () {

  var testMessageAdd = function (event, baseChannelId, expectedSubtype) {
    var dataStore = getMemoryDataStore();
    var baseChannel;

    messageHandlers['message::rtm_client_add_message'](dataStore, getRTMMessageFixture(event));
    baseChannel = dataStore.getChannelGroupOrDMById(baseChannelId);

    expect(baseChannel.history[baseChannel.history.length - 1])
      .to.have.property('subtype', expectedSubtype);
    expect(baseChannel.history).to.have.length(2);
  };

  var testBaseChannelJoin = function (event, baseChannelId, expectedUser) {
    var dataStore = getMemoryDataStore();
    var baseChannel;

    messageHandlers[event](dataStore, getRTMMessageFixture(event));
    baseChannel = dataStore.getChannelGroupOrDMById(baseChannelId);

    expect(baseChannel.members).to.contain(expectedUser);
    expect(baseChannel.history).to.have.length(2);
  };

  var testBaseChannelLeave = function (event, baseChannelId, expectedUser) {
    var dataStore = getMemoryDataStore();
    var baseChannel;

    messageHandlers[event](dataStore, getRTMMessageFixture(event));
    baseChannel = dataStore.getChannelGroupOrDMById(baseChannelId);

    expect(baseChannel.members).to.not.contain(expectedUser);
    expect(baseChannel.history).to.have.length(2);
  };

  it(
    'adds a user to a channel and updates msg history when a `channel_join` msg is received',
    function () {
      testBaseChannelJoin('message::channel_join', TEST_CHANNEL_ID, 'U0F3LFX6K');
    }
  );

  it(
    'adds a user to a group and updates msg history when a `group_join` msg is received',
    function () {
      testBaseChannelJoin('message::group_join', 'G0CHZSXFW', 'U0F3LFX6K');
    }
  );

  it(
    'removes a user from a channel and updates msg history when a `channel_leave` msg is received',
    function () {
      testBaseChannelLeave('message::channel_leave', TEST_CHANNEL_ID, 'U0F3LFX6K');
    }
  );

  it(
    'removes a user from a group and updates msg history when a `group_leave` msg is received',
    function () {
      testBaseChannelLeave('message::group_leave', 'G0CHZSXFW', 'U0F3LFX6K');
    }
  );

  it('adds to to history when a message without a custom handler is received', function () {
    testMessageAdd('message::channel_archive', TEST_CHANNEL_ID, 'channel_archive');
  });

  it('deletes a message when a `message_delete` message is received', function () {
    var dataStore = getMemoryDataStore();
    var initialMsg = {
      type: 'message',
      channel: 'C0CJ25PDM',
      user: 'U0F3LFX6K',
      text: "I'm going to delete this message Carol",
      ts: '1448496776.000003',
      team: 'T0CHZBU59'
    };
    var channel = dataStore.getChannelById(TEST_CHANNEL_ID);
    channel.addMessage(initialMsg);

    messageHandlers['message::message_deleted'](
      dataStore, getRTMMessageFixture('message::message_deleted'));
    expect(channel.history).to.have.length(2);
    expect(channel.history[1]).to.have.property('subtype', 'message_deleted');
  });

  it('updates a message when a `message_changed` message is received', function () {
    var dataStore = getMemoryDataStore();
    var initialMsg = {
      type: 'message',
      channel: 'C0CJ25PDM',
      user: 'U0F3LFX6K',
      text: 'Howdy Carol',
      ts: '1448496754.000002',
      team: 'T0CHZBU59'
    };
    var channel = dataStore.getChannelById(TEST_CHANNEL_ID);
    channel.addMessage(initialMsg);

    messageHandlers['message::message_changed'](
      dataStore, getRTMMessageFixture('message::message_changed'));
    expect(channel.history).to.have.length(3);
    expect(channel.history[1]).to.have.property('text', 'Hi carol! :simple_smile:');
  });

});
