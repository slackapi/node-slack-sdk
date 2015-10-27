/**
 * Legacy client implementation mirroring the 1.x.x Slack client implementations.
 */

var inherits = require('inherits');

var RtmClient = require('../rtm/client');


var LegacyRTMClient = function (slackToken, autoReconnect, autoMark) {
  var opts = {
    autoReconnect: autoReconnect,
    logLevel: 'debug',
  };
  RtmClient.call(this, slackToken, opts);
};

inherits(LegacyRTMClient, RtmClient);


module.exports = LegacyRTMClient;
