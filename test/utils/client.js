var EventEmitter = require('events').EventEmitter;
var lodash = require('lodash');
var sinon = require('sinon');

var MemoryDataStore = require('../../lib/data-store').MemoryDataStore;
var RtmAPIClient = require('../../lib/clients/rtm/client');
var rtmStartFixture = require('../fixtures/rtm.start.json');

var fakeWs = function fakeWs() {
  return new EventEmitter();
};


var getRtmClient = function getRtmClient() {
  var rtmClient = new RtmAPIClient('fake-token', fakeWs);
  sinon.stub(rtmClient._rtm, 'start', function _rtmStub(opts, cb) {
    cb(null, rtmStartFixture);
  });
  rtmClient.start();
  return rtmClient;
};


var getMemoryDataStore = function getMemoryDataStore() {
  var dataStore = new MemoryDataStore();
  dataStore.cacheRtmStart(lodash.cloneDeep(rtmStartFixture));
  return dataStore;
};


module.exports.getMemoryDataStore = getMemoryDataStore;
module.exports.getRtmClient = getRtmClient;
