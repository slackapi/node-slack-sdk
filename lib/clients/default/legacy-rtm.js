/**
 * Legacy client implementation mirroring the 1.x.x Slack client implementations.
 */

var inherits = require('inherits');

var MemoryDataStore = require('../../data-store/memory-data-store');
var RtmClient = require('../rtm/client');


function LegacyRTMClient(slackToken, autoReconnect) {
  var opts = {
    autoReconnect: autoReconnect,
    logLevel: 'debug',
    dataStore: new MemoryDataStore()
  };
  RtmClient.call(this, slackToken, opts);
}

inherits(LegacyRTMClient, RtmClient);


module.exports = LegacyRTMClient;
