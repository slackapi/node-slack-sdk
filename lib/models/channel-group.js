/**
 *
 */

var inherits = require('inherits');

var BaseChannel = require('./base-channel');


var ChannelGroup = function ChannelGroup(name, opts) {
  BaseChannel.call(this, name, opts);
};

inherits(ChannelGroup, BaseChannel);


module.exports = ChannelGroup;
