var lodash = require('lodash');

var eventFixtures = require('./client-events');


var getRTMMessage = function getRTMMessage(event) {
  return lodash.cloneDeep(eventFixtures[event]);
};


module.exports.getRTMMessage = getRTMMessage;
