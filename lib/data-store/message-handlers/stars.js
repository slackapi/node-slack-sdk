/**
 * Handlers for all RTM `star_` events.
 */

var fromPairs = require('lodash').fromPairs;

var RTM_EVENTS = require('../../clients/events/rtm').EVENTS;
var helpers = require('./helpers');


var handlers = [
  [RTM_EVENTS.STAR_ADDED, helpers.noopMessage],
  [RTM_EVENTS.STAR_REMOVED, helpers.noopMessage]
];


module.exports = fromPairs(handlers);
