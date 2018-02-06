/**
 * {@link https://api.slack.com/types/im|DM}
 */

var inherits = require('inherits');

var BaseChannel = require('./base-channel');


function DM(opts) {
  BaseChannel.call(this, 'DM', opts);
}

inherits(DM, BaseChannel);


module.exports = DM;
