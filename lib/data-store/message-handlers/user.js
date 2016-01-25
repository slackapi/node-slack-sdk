/**
 * Handlers for all RTM `user_*` events.
 */

var zipObject = require('lodash').zipObject;

var RTM_EVENTS = require('../../clients/events/rtm').EVENTS;

var helpers = require('./helpers');


/** {@link https://api.slack.com/events/user_typing|user_typing} */
var handleUserTyping = function handleUserTyping(dataStore, message) {
  var user = dataStore.getUserById(message.user);
  var channel = dataStore.getChannelById(message.channel);

  if (channel && user) {
    channel.startedTyping(user.id);
  } else {
    // TODO(leah): Logs for when channel / user aren't found.
  }
};


/** {@link https://api.slack.com/events/pref_change|pref_change} */
var handlePrefChange = function handlePrefChange(activeUserId, activeTeamId, dataStore, message) {
  var user = dataStore.getUserById(activeUserId);
  user.prefs[message.name] = message.value;
};


var handlers = [
  [RTM_EVENTS.PREF_CHANGE, handlePrefChange],
  [RTM_EVENTS.USER_TYPING, handleUserTyping],
  [RTM_EVENTS.USER_CHANGE, helpers.handleNewOrUpdatedUser],
];


module.exports = zipObject(handlers);
