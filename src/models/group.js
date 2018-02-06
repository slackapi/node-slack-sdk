/**
 * {@link https://api.slack.com/types/group|Group}
 */

var inherits = require('inherits');

var ChannelGroup = require('./channel-group');


function Group(opts) {
  ChannelGroup.call(this, 'Group', opts);
}

inherits(Group, ChannelGroup);


module.exports = Group;
