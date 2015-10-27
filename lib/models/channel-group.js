/**
 *
 */

var inherits = require('inherits');

var BaseChannel = require('./base-channel');


var ChannelGroup = function ChannelGroup(name, opts) {
  BaseChannel.call(this, name, opts);
};

inherits(ChannelGroup, BaseChannel);


ChannelGroup.prototype._setProperties = function setProperties(opts) {
  this.members = opts.members || [];

  ChannelGroup.super_.prototype._setProperties.call(this, opts);
};


module.exports = ChannelGroup;
