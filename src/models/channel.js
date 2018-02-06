/**
 * {@link https://api.slack.com/types/channel|Channel}
 */

var inherits = require('inherits');

var ChannelGroup = require('./channel-group');


var Channel = function Channel(opts) {
  ChannelGroup.call(this, 'Channel', opts);
};

inherits(Channel, ChannelGroup);


module.exports = Channel;
