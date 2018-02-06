/**
 *
 */

var inherits = require('inherits');

var ChannelGroup = require('./channel-group');


function MPDM(opts) {
  ChannelGroup.call(this, 'MPDM', opts);
}

inherits(MPDM, ChannelGroup);


module.exports = MPDM;
