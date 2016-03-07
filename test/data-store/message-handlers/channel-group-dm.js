var expect = require('chai').expect;
var lodash = require('lodash');

var RTM_API_EVENTS = require('../../../lib/clients/events/rtm').EVENTS;
var getMemoryDataStore = require('../../utils/client').getMemoryDataStore;
var messageHandlers = require('../../../lib/data-store/message-handlers');

var getRTMMessageFixture = require('../../fixtures').getRTMMessage;
var rtmStartFixture = require('../../fixtures/rtm.start');


var ALICE_USER_ID = 'U0CJ5PC7L';
var TEST_CHANNEL_ID = 'C0CJ25PDM';
var TEST_GROUP_ID = 'G0CHZSXFW';


describe('RTM API Message Handlers: Channel, Group & DM Events', function () {

  var isArchivedChange = function (event, id, expected) {
    var baseChannel;
    var dataStore = getMemoryDataStore();

    messageHandlers[event](dataStore, getRTMMessageFixture(event));
    baseChannel = dataStore.getChannelGroupOrDMById(id);
    expect(baseChannel.is_archived).to.equal(expected);
  };

  var testBaseChannelMarked = function (event, baseChannelId) {
    var dataStore = getMemoryDataStore();
    var baseChannel = dataStore.getChannelGroupOrDMById(baseChannelId);
    var originalUnreads;
    var newUnreads;

    baseChannel.history.push({ ts: 1 });
    baseChannel.history.push({ ts: 2 });

    originalUnreads = baseChannel.recalcUnreads();
    expect(originalUnreads).to.equal(3);

    messageHandlers[event](dataStore, getRTMMessageFixture(event));
    newUnreads = baseChannel.recalcUnreads();

    expect(newUnreads).to.equal(0);
  };

  var testBaseChannelRename = function (event, baseChannelId, expected) {
    var dataStore = getMemoryDataStore();
    var baseChannel;

    messageHandlers[event](dataStore, getRTMMessageFixture(event));
    baseChannel = dataStore.getChannelGroupOrDMById(baseChannelId);
    expect(baseChannel.name).to.equal(expected);
  };

  var testBaseChannelJoined = function (event, baseChannelId, expectedUserId) {
    var dataStore = getMemoryDataStore();
    var baseChannel;

    messageHandlers[event](dataStore, getRTMMessageFixture(event));
    baseChannel = dataStore.getChannelGroupOrDMById(baseChannelId);
    expect(baseChannel.members).to.have.length(2);
    expect(baseChannel).to.have.deep.property('members[1]', expectedUserId);
  };

  var testBaseChannelLeft = function (event, baseChannelId, expectedUserId) {
    var dataStore = getMemoryDataStore();
    var baseChannel;

    messageHandlers[event](ALICE_USER_ID, '', dataStore, getRTMMessageFixture(event));
    baseChannel = dataStore.getChannelGroupOrDMById(baseChannelId);
    expect(baseChannel.members).to.not.contain(expectedUserId);

    return baseChannel;
  };

  describe('`channel_xxx` events', function () {

    it('sets isArchived to true when a `channel_archive` message is received', function () {
      isArchivedChange('channel_archive', TEST_CHANNEL_ID, true);
    });

    it('sets isArchived to false when a `channel_unarchive` message is received', function () {
      isArchivedChange('channel_unarchive', TEST_CHANNEL_ID, false);
    });

    it('renames a channel when a `channel_rename` message is received', function () {
      testBaseChannelRename('channel_rename', TEST_CHANNEL_ID, 'test-channel-rename');
    });

    it('creates a new channel when a `channel_created` message is received', function () {
      var dataStore = getMemoryDataStore();
      var channel;

      messageHandlers.channel_created(dataStore, getRTMMessageFixture('channel_created'));
      channel = dataStore.getChannelById('C0F3Q8LH5');
      expect(channel).to.not.equal(undefined);
    });

    it('deletes a channel when a `channel_deleted` message is received', function () {
      var dataStore = getMemoryDataStore();
      var channel;

      messageHandlers.channel_deleted(dataStore, getRTMMessageFixture('channel_deleted'));
      channel = dataStore.getChannelById(TEST_CHANNEL_ID);
      expect(channel).to.equal(undefined);
    });

    it('creates a Channel, replacing the existing one, on `channel_joined` msg', function () {
      testBaseChannelJoined('channel_joined', TEST_CHANNEL_ID, 'U0F3LFX6K');
    });

    it('removes a user from a channel when a `channel_left` message is received', function () {
      var channel = testBaseChannelLeft('channel_left', TEST_CHANNEL_ID, 'U0F3LFX6K');
      expect(channel.is_member).to.equal(false);
    });

    it('marks the channel as read when a `channel_marked` message is received', function () {
      testBaseChannelMarked('channel_marked', TEST_CHANNEL_ID);
    });

  });

  describe('`group_xxx` events', function () {

    it('sets isArchived to true when a `group_archive` message is received', function () {
      isArchivedChange('group_archive', TEST_GROUP_ID, true);
    });

    it('sets isArchived to false when a `group_unarchive` message is received', function () {
      isArchivedChange('group_unarchive', TEST_GROUP_ID, false);
    });

    it('marks the group as read when a `group_marked` message is received', function () {
      testBaseChannelMarked('group_marked', TEST_GROUP_ID);
    });

    it('renames a group when a `group_rename` message is received', function () {
      testBaseChannelRename('group_rename', TEST_GROUP_ID, 'test-group-rename');
    });

    it('creates a Group, replacing the existing one, on `group_joined` msg', function () {
      testBaseChannelJoined('group_joined', TEST_GROUP_ID, 'U0F3LFX6K');
    });

    describe('`group_left`', function () {
      it('removes the user from a group when a `group_left` message is received', function () {
        testBaseChannelLeft('group_left', TEST_GROUP_ID, 'U0F3LFX6K');
      });

      it('marks the group as archived when the last user leaves', function () {
        var group = testBaseChannelLeft('group_left', TEST_GROUP_ID, 'U0F3LFX6K');
        expect(group.is_archived).to.equal(true);
      });
    });

  });

  describe('`im_xxx` events', function () {

    var testDMOpenStatus = function (isOpen, event) {
      var dataStore = getMemoryDataStore();
      dataStore.getDMById(rtmStartFixture.ims[0].id).is_open = isOpen;
      messageHandlers[event](dataStore, getRTMMessageFixture(event));

      expect(dataStore.getDMById(rtmStartFixture.ims[0].id).is_open).to.equal(isOpen);
    };

    it(
      'sets isOpen to true on a DM channel when an `im_open` message is received',
      lodash.partial(testDMOpenStatus, true, RTM_API_EVENTS.IM_OPEN)
    );

    it(
      'sets isOpen to false on a DM channel when an `im_close` message is received',
      lodash.partial(testDMOpenStatus, false, RTM_API_EVENTS.IM_CLOSE)
    );

    it('adds a new DM object when an `im_created` message is received', function () {
      var dataStore = getMemoryDataStore();
      var dmChannel;

      messageHandlers.im_created(dataStore, getRTMMessageFixture('im_created'));
      dmChannel = dataStore.getDMById('D0CHZQWNP');
      expect(dmChannel).to.not.equal(undefined);
    });

    it('marks the DM channel as read when an `im_marked` message is received', function () {
      testBaseChannelMarked('im_marked', 'D0CHZQWNP');
    });

  });

});
