/**
 * Handlers for all RTM `bot_*` events.
 */

var zipObject = require('lodash').zipObject;

var RTM_EVENTS = require('../../clients/events/rtm').EVENTS;


/** {@link https://api.slack.com/events/bot_added|bot_added} */
var addBot = function addBot(dataStore, message) {
  dataStore.setBot(message.bot);
};


/** {@link https://api.slack.com/events/bot_changed|bot_changed} */
var changedBot = function changedBot(dataStore, message) {
  dataStore.upsertBot(message.bot);
};


var handlers = [
  [RTM_EVENTS.BOT_ADDED, addBot],
  [RTM_EVENTS.BOT_CHANGED, changedBot],
];


module.exports = zipObject(handlers);
