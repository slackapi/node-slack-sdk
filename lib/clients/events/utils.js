/**
 *
 */

var RTM_EVENTS = require('./rtm').EVENTS;


/**
 * @param {string} subtype
 * @param {string=} delim
 */
var makeMessageEventWithSubtype = function makeMessageEventWithSubtype(subtype, delim) {
  return [RTM_EVENTS.MESSAGE, subtype].join(delim || '::');
};


module.exports.makeMessageEventWithSubtype = makeMessageEventWithSubtype;
