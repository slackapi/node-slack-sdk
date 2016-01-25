var expect = require('chai').expect;
var lodash = require('lodash');

var RTM_API_EVENTS = require('../../lib/clients/events/rtm').EVENTS;
var getMemoryDataStore = require('../utils/client').getMemoryDataStore;
var getRtmClient = require('../utils/client').getRtmClient;
var messageHandlers = require('../../lib/data-store/message-handlers');
var models = require('../../lib/models');

var getRTMMessageFixture = require('../fixtures').getRTMMessage;
var rtmStartFixture = require('../fixtures/rtm.start');


var ALICE_USER_ID = 'U0CJ5PC7L';
var GENERAL_CHANNEL_ID = 'C0CHZA86Q';
var TEST_CHANNEL_ID = 'C0CJ25PDM';
var TEST_GROUP_ID = 'G0CHZSXFW';


describe('RTM API Message Handlers', function () {

  describe('Raw Events', function () {
    it('emits raw messages with all lower case keys unchanged', function (done) {
      var rtmClient = getRtmClient();
      rtmClient.on('raw_message', function (rawMsg) {
        expect(rawMsg).to.equal(JSON.stringify(getRTMMessageFixture('im_open')));
        done();
      });
      rtmClient.handleWsMessage(JSON.stringify(getRTMMessageFixture('im_open')));
    });
  });

  describe('Parsed Events', function () {

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

    describe('channel, group and DM events', function () {

      var isArchivedChange = function (event, id, expected) {
        var dataStore = getMemoryDataStore();

        messageHandlers[event](dataStore, getRTMMessageFixture(event));
        var baseChannel = dataStore.getChannelGroupOrDMById(id);
        expect(baseChannel.is_archived).to.equal(expected);
      };

      var testBaseChannelMarked = function (event, baseChannelId) {
        var dataStore = getMemoryDataStore();

        var baseChannel = dataStore.getChannelGroupOrDMById(baseChannelId);
        baseChannel.history.push({ ts: 1 });
        baseChannel.history.push({ ts: 2 });

        var originalUnreads = baseChannel.recalcUnreads();
        expect(originalUnreads).to.equal(3);

        messageHandlers[event](dataStore, getRTMMessageFixture(event));
        var newUnreads = baseChannel.recalcUnreads();

        expect(newUnreads).to.equal(0);
      };

      var testBaseChannelRename = function (event, baseChannelId, expected) {
        var dataStore = getMemoryDataStore();

        messageHandlers[event](dataStore, getRTMMessageFixture(event));
        var baseChannel = dataStore.getChannelGroupOrDMById(baseChannelId);
        expect(baseChannel.name).to.equal(expected);
      };

      var testBaseChannelJoined = function (event, baseChannelId, expectedUserId) {
        var dataStore = getMemoryDataStore();

        messageHandlers[event](dataStore, getRTMMessageFixture(event));
        var baseChannel = dataStore.getChannelGroupOrDMById(baseChannelId);
        expect(baseChannel.members).to.have.length(2);
        expect(baseChannel).to.have.deep.property('members[1]', expectedUserId);
      };

      var testBaseChannelLeft = function (event, baseChannelId, expectedUserId) {
        var dataStore = getMemoryDataStore();

        messageHandlers[event](ALICE_USER_ID, '', dataStore, getRTMMessageFixture(event));
        var baseChannel = dataStore.getChannelGroupOrDMById(baseChannelId);
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

          messageHandlers['channel_created'](dataStore, getRTMMessageFixture('channel_created'));
          var channel = dataStore.getChannelById('C0F3Q8LH5');
          expect(channel).to.not.equal(undefined);
        });

        it('deletes a channel when a `channel_deleted` message is received', function () {
          var dataStore = getMemoryDataStore();

          messageHandlers['channel_deleted'](dataStore, getRTMMessageFixture('channel_deleted'));
          var channel = dataStore.getChannelById(TEST_CHANNEL_ID);
          expect(channel).to.equal(undefined);
        });

        it('creates a Channel, replacing the existing one, on `channel_joined` msg', function () {
          testBaseChannelJoined('channel_joined', TEST_CHANNEL_ID, 'U0F3LFX6K');
        });

        it('removes a user from a channel when a `channel_left` message is received', function () {
          testBaseChannelLeft('channel_left', TEST_CHANNEL_ID, 'U0F3LFX6K');
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

          messageHandlers['im_created'](dataStore, getRTMMessageFixture('im_created'));
          var dmChannel = dataStore.getDMById('D0CHZQWNP');
          expect(dmChannel).to.not.be.undefined;
        });

        it('marks the DM channel as read when an `im_marked` message is received', function () {
          testBaseChannelMarked('im_marked', 'D0CHZQWNP');
        });

      });

    });

    describe('`presence_xxx` events', function () {

      it('should set the user presence when `manual_presence_change` is received', function () {
        var dataStore = getMemoryDataStore();

        messageHandlers['manual_presence_change'](
          ALICE_USER_ID, '', dataStore, getRTMMessageFixture('manual_presence_change'));
        var user = dataStore.getUserById(ALICE_USER_ID);
        expect(user.presence).to.equal('away');
      });

      it('should set the user presence when a `presence_change` is received', function () {
        var dataStore = getMemoryDataStore();

        messageHandlers['presence_change'](dataStore, getRTMMessageFixture('presence_change'));
        var user = dataStore.getUserById(ALICE_USER_ID);
        expect(user.presence).to.equal('away');
      });

    });

    describe('reaction_xxx` events', function () {

      it('should add a reaction when a `reaction_added` event is received', function () {
        var dataStore = getMemoryDataStore();

        messageHandlers['reaction_added'](dataStore, getRTMMessageFixture('reaction_added'));
        var channel = dataStore.getChannelById(GENERAL_CHANNEL_ID);
        var message = channel.getMessageByTs('1444959632.000002');
        expect(message.reactions).to.have.length(1);
        expect(message.reactions[0]).to.have.property('name', '+1');
      });

      it('should remove a reaction when a `reaction_removed` event is received', function () {
        var dataStore = getMemoryDataStore();

        var channel = dataStore.getChannelById(GENERAL_CHANNEL_ID);
        var message = channel.getMessageByTs('1444959632.000002');

        messageHandlers['reaction_added'](dataStore, getRTMMessageFixture('reaction_added'));
        expect(message.reactions[0]).to.have.property('name', '+1');
        messageHandlers['reaction_removed'](dataStore, getRTMMessageFixture('reaction_removed'));
        expect(message.reactions).to.have.length(0);
      });

    });

    describe('`star_xxx` events', function () {
      describe('star_added', function () {

        it('stars a message when a `star_added` message with a `message` property is received');
        it('stars a file when a `star_added` message with a `message` property is received');
        it('stars a file_comment when a `star_added` message with a `file_comment` property is received');
        it('stars a channel when a `star_added` message with a `channel` property is received');
        it('stars a DM when a `star_added` message with a `im` property is received');
        it('stars a group when a `star_added` message with a `group` property is received');

      });

      describe('star_removed', function () {

        it('unstars a message when a `star_removed` message with a `message` property is received');
        it('unstars a file when a `star_removed` message with a `message` property is received');
        it('unstars a file_comment when a `star_removed` message with a `file_comment` property is received');
        it('unstars a channel when a `star_removed` message with a `channel` property is received');
        it('unstars a DM when a `star_removed` message with a `im` property is received');
        it('unstars a group when a `star_removed` message with a `group` property is received');

      });
    });


    describe('`team_xxx` events', function () {

      it('updates the team domain when a `team_domain_change` message is received', function () {
        var dataStore = getMemoryDataStore();

        messageHandlers['team_domain_change'](
          '', 'T0CHZBU59', dataStore, getRTMMessageFixture('team_domain_change'));
        var team = dataStore.getTeamById('T0CHZBU59');

        expect(team.url).to.equal('https://sslack-api-test.slack.com');
        expect(team.domain).to.equal('sslack-api-test');
      });

      it('updates the team name when a `team_rename` message is received', function () {
        var dataStore = getMemoryDataStore();

        messageHandlers['team_rename']('', 'T0CHZBU59', dataStore, getRTMMessageFixture('team_rename'));
        var team = dataStore.getTeamById('T0CHZBU59');

        expect(team.name).to.equal('slack-api-test-test');
      });

      it('updates a team preference when a `team_pref_change` message is received', function () {
        var dataStore = getMemoryDataStore();
        var prefChangeMsg = getRTMMessageFixture('team_pref_change');
        messageHandlers['team_pref_change']('', 'T0CHZBU59', dataStore, prefChangeMsg);

        var team = dataStore.getTeamById('T0CHZBU59');
        expect(team.prefs[prefChangeMsg.name]).to.equal(prefChangeMsg.value);
      });

      it('adds a new user to a team when a `team_join` message is received', function () {
        var dataStore = getMemoryDataStore();
        var teamJoinMsg = getRTMMessageFixture('team_join');
        messageHandlers['team_join'](dataStore, teamJoinMsg);

        var user = dataStore.getUserById('U0EV582MU');
        expect(user).to.be.an.instanceof(models.User);
      });

    });


    describe('user events', function () {

      it('updates a user preference when `pref_change` is received', function () {
        var dataStore = getMemoryDataStore();
        var prefChangeMsg = getRTMMessageFixture('pref_change');
        messageHandlers['pref_change'](ALICE_USER_ID, '', dataStore, prefChangeMsg);

        var user = dataStore.getUserById(ALICE_USER_ID);
        expect(user.prefs[prefChangeMsg.name]).to.equal(prefChangeMsg.value);
      });

      it('updates a channel, marking a user as typing when `user_typing` is received', function () {
        var dataStore = getMemoryDataStore();
        var channel = dataStore.getChannelById(GENERAL_CHANNEL_ID);
        var userTypingMsg = getRTMMessageFixture('user_typing');
        messageHandlers['user_typing'](dataStore, userTypingMsg);

        expect(channel._typing[userTypingMsg.user]).to.not.equal(undefined);
      });

      it('adds or updates a user when a `user_change` event is received', function () {
        var dataStore = getMemoryDataStore();
        messageHandlers['user_change'](dataStore, getRTMMessageFixture('user_change'));

        var user = dataStore.getUserById('U0CJ1TWKX');
        expect(user.profile.email).to.equal('leah+slack-api-test-user-change-test@slack-corp.com');
      });

    });

    describe('message events', function () {

      var testMessageAdd = function (event, baseChannelId, expectedSubtype) {
        var dataStore = getMemoryDataStore();
        messageHandlers['message::rtm_client_add_message'](dataStore, getRTMMessageFixture(event));
        var baseChannel = dataStore.getChannelGroupOrDMById(baseChannelId);

        expect(baseChannel.history[baseChannel.history.length - 1])
          .to.have.property('subtype', expectedSubtype);
        expect(baseChannel.history).to.have.length(2);
      };

      var testBaseChannelJoin = function (event, baseChannelId, expectedUser) {
        var dataStore = getMemoryDataStore();
        messageHandlers[event](dataStore, getRTMMessageFixture(event));
        var baseChannel = dataStore.getChannelGroupOrDMById(baseChannelId);

        expect(baseChannel.members).to.contain(expectedUser);
        expect(baseChannel.history).to.have.length(2);
      };

      var testBaseChannelLeave = function (event, baseChannelId, expectedUser) {
        var dataStore = getMemoryDataStore();
        messageHandlers[event](dataStore, getRTMMessageFixture(event));
        var baseChannel = dataStore.getChannelGroupOrDMById(baseChannelId);

        expect(baseChannel.members).to.not.contain(expectedUser);
        expect(baseChannel.history).to.have.length(2);
      };

      it('adds a user to a channel and updates message history when a `channel_join` message is received', function () {
        testBaseChannelJoin('message::channel_join', TEST_CHANNEL_ID, 'U0F3LFX6K');
      });

      it('adds a user to a group and updates message history when a `group_join` message is received', function () {
        testBaseChannelJoin('message::group_join', 'G0CHZSXFW', 'U0F3LFX6K');
      });

      it('removes a user from a channel and updates message history when a `channel_leave` message is received', function () {
        testBaseChannelLeave('message::channel_leave', TEST_CHANNEL_ID, 'U0F3LFX6K');
      });

      it('removes a user from a group and updates message history when a `group_leave` message is received', function () {
        testBaseChannelLeave('message::group_leave', 'G0CHZSXFW', 'U0F3LFX6K');
      });

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
          team: 'T0CHZBU59',
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
          team: 'T0CHZBU59',
        };
        var channel = dataStore.getChannelById(TEST_CHANNEL_ID);
        channel.addMessage(initialMsg);

        messageHandlers['message::message_changed'](
          dataStore, getRTMMessageFixture('message::message_changed'));
        expect(channel.history).to.have.length(3);
        expect(channel.history[1]).to.have.property('text', 'Hi carol! :simple_smile:');
      });

    });

  });

});
