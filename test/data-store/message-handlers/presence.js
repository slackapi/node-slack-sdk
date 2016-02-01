var expect = require('chai').expect;

var getMemoryDataStore = require('../../utils/client').getMemoryDataStore;
var messageHandlers = require('../../../lib/data-store/message-handlers');

var getRTMMessageFixture = require('../../fixtures').getRTMMessage;

var ALICE_USER_ID = 'U0CJ5PC7L';


describe('RTM API Message Handlers: Presence Events', function () {

  it('should set the user presence when `manual_presence_change` is received', function () {
    var dataStore = getMemoryDataStore();
    var user;

    messageHandlers.manual_presence_change(
      ALICE_USER_ID, '', dataStore, getRTMMessageFixture('manual_presence_change'));
    user = dataStore.getUserById(ALICE_USER_ID);
    expect(user.presence).to.equal('away');
  });

  it('should set the user presence when a `presence_change` is received', function () {
    var dataStore = getMemoryDataStore();
    var user;

    messageHandlers.presence_change(dataStore, getRTMMessageFixture('presence_change'));
    user = dataStore.getUserById(ALICE_USER_ID);
    expect(user.presence).to.equal('away');
  });

});
