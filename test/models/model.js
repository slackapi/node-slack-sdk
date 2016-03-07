var expect = require('chai').expect;

var RTM_FIXTURE = require('../fixtures/rtm.start');
var getMemoryDataStore = require('../utils/client').getMemoryDataStore;


describe('Models', function () {
  describe('Model', function () {
    var testToJSON = function testToJSON(memoryStore, propertyType) {
      var rawObj;
      var modelObj;

      if (propertyType === 'users') {
        rawObj = RTM_FIXTURE.users[1];
        modelObj = memoryStore.getUserById(rawObj.id);
      } else {
        rawObj = RTM_FIXTURE[propertyType][0];
        modelObj = memoryStore.getChannelGroupOrDMById(rawObj.id);
      }
      expect(JSON.stringify(modelObj)).to.deep.equal(JSON.stringify(rawObj));
    };

    describe('#toJSON()', function () {
      it('converts model objects to a JSON serializable representation', function () {
        var memoryStore = getMemoryDataStore();

        testToJSON(memoryStore, 'ims');
        testToJSON(memoryStore, 'channels');
        testToJSON(memoryStore, 'groups');
        testToJSON(memoryStore, 'users');
      });
    });
  });
});
