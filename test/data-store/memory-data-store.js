var expect = require('chai').expect;

var getMemoryDataStore = require('../utils/client').getMemoryDataStore;


describe('MemoryDataStore', function () {

  describe('#cacheRtmStart()', function () {

    it('caches the RTM start response', function () {
      var dataStore = getMemoryDataStore();
      expect(dataStore.getTeamById('T0CHZBU59').name).to.equal('slack-api-test');
      expect(dataStore.getUserById('U0CJ5PC7L').name).to.equal('alice');
      expect(dataStore.getChannelById('C0CJ25PDM').name).to.equal('test');
      expect(dataStore.getDMById('D0CHZQWNP').latest.text).to.equal('hi alice!');
      expect(dataStore.getGroupById('G0CHZSXFW').name).to.equal('private');
      expect(dataStore.getBotById('B0CJ5FF1P').name).to.equal('gdrive');
    });

  });

  describe('#getDMByName', function () {
    it('should get a DM with another user when passed the name of that user', function () {
      var dataStore = getMemoryDataStore();
      var dm = dataStore.getDMByName('bob');
      expect(dm.id).to.equal('D0CHZQWNP');
    });
  });

  describe('#getDMByUserId', function () {
    it('should get a DM with another user when passed the id of that user', function () {
      var dataStore = getMemoryDataStore();
      var user = dataStore.getUserByName('bob');
      var dm = dataStore.getDMByUserId(user.id);
      expect(dm.id).to.equal('D0CHZQWNP');
    });
  });

  describe('#getChannelByName()', function () {
    it('should get a channel by name', function () {
      var dataStore = getMemoryDataStore();
      var channel = dataStore.getChannelByName('test');
      expect(channel.name).to.equal('test');
    });

    it('should get a channel by #name (prefixed with #)', function () {
      var dataStore = getMemoryDataStore();
      var channel = dataStore.getChannelByName('#test');
      expect(channel.name).to.equal('test');
    });
  });

  describe('#getChannelGroupOrIMById()', function () {
    var dataStore = getMemoryDataStore();

    it('should get a channel by id', function () {
      expect(dataStore.getChannelGroupOrDMById('C0CJ25PDM')).to.not.equal(undefined);
    });

    it('should get a group by id', function () {
      expect(dataStore.getChannelGroupOrDMById('G0CHZSXFW')).to.not.equal(undefined);
    });

    it('should get an IM by id', function () {
      expect(dataStore.getChannelGroupOrDMById('D0CHZQWNP')).to.not.equal(undefined);
    });
  });

  describe('#getUserByEmail()', function () {
    var dataStore = getMemoryDataStore();

    it('should get a user by email', function () {
      var user = dataStore.getUserByEmail('leah+slack-api-test-alice@slack-corp.com');
      expect(user.id).to.equal('U0CJ5PC7L');
    });

    it('should return undefined if no users with email is not found', function () {
      var user = dataStore.getUserByEmail('NOT-leah+slack-api-test-bob@slack-corp.com');
      expect(user).to.equal(undefined);
    });
  });

  describe('#getUserByName()', function () {
    var dataStore = getMemoryDataStore();

    it('should get a user by name', function () {
      expect(dataStore.getUserByName('alice').id).to.equal('U0CJ5PC7L');
    });

    it('should return undefined if no users with name is not found', function () {
      expect(dataStore.getUserByEmail('NOTalice')).to.equal(undefined);
    });
  });

  describe('#getUserByBotId()', function () {
    var dataStore = getMemoryDataStore();

    it('should get a bot user by bot ID', function () {
      expect(dataStore.getUserByBotId('B0EV07BEH').id).to.equal('U0EUYE1E0');
    });

    it('should return undefined if no users with a bot id are found', function () {
      expect(dataStore.getUserByEmail('B00000000')).to.equal(undefined);
    });
  });

  describe('#getBotByUserId()', function () {
    var dataStore = getMemoryDataStore();

    it('should get a bot user by user ID', function () {
      expect(dataStore.getBotByUserId('U0EUYE1E0').id).to.equal('B0EV07BEH');
    });

    it('should return undefined if no bots with a user id are found', function () {
      expect(dataStore.getBotByUserId('U00000000')).to.equal(undefined);
    });
  });

  describe('#clear()', function () {
    it('should re-set the objects when clear() is called', function () {
      var dataStore = getMemoryDataStore();
      dataStore.clear();
      expect(dataStore.users).to.deep.equal({});
    });
  });

});
