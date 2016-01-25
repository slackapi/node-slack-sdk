/**
 * Handlers for all `message` event subtypes.
 */

var findIndex = require('lodash').findIndex;
var zipObject = require('lodash').zipObject;

var MESSAGE_SUBTYPES = require('../../clients/events/rtm').MESSAGE_SUBTYPES;
var makeMessageEventWithSubtype = require('../../clients/events/utils').makeMessageEventWithSubtype;


var addMessageToChannel = function addMessageToChannel(dataStore, message) {
  var baseChannel = dataStore.getChannelGroupOrDMById(message.channel);
  baseChannel.addMessage(message);
};


/**
 * {@link https://api.slack.com/events/message/channel_join|channel_join}
 * {@link https://api.slack.com/events/message/group_join|group_join}
 */
var baseChannelJoin = function baseChannelJoin(dataStore, message) {
  var baseChannel = dataStore.getChannelGroupOrDMById(message.channel);

  if (baseChannel.members.indexOf(message.user) === -1) {
    baseChannel.members.push(message.user);
  }

  baseChannel.addMessage(message);
};


/**
 * {@link https://api.slack.com/events/message/channel_join|channel_join}
 * {@link https://api.slack.com/events/message/group_join|group_join}
 */
var baseChannelLeave = function baseChannelLeave(dataStore, message) {
  var baseChannel = dataStore.getChannelGroupOrDMById(message.channel);

  var memberIndex = baseChannel.members.indexOf(message.user);
  if (memberIndex !== -1) {
    baseChannel.members.splice(memberIndex, 1);
  }

  baseChannel.addMessage(message);
};


/** {@link https://api.slack.com/events/message/message_deleted|message_deleted} */
var baseChannelMessageDeleted = function baseChannelMessageDeleted(dataStore, message) {
  var baseChannel = dataStore.getChannelGroupOrDMById(message.channel);
  var msgIndex = findIndex(baseChannel.history, 'ts', message.deleted_ts);
  baseChannel.history.splice(msgIndex, 1);
  baseChannel.addMessage(message);
};


/** {@link https://api.slack.com/events/message/message_changed|message_changed} */
var baseChannelMessageChanged = function baseChannelMessageChanged(dataStore, message) {
  var baseChannel = dataStore.getChannelGroupOrDMById(message.channel);
  baseChannel.updateMessage(message);
  baseChannel.addMessage(message);
};


var handlers = [
  [makeMessageEventWithSubtype(MESSAGE_SUBTYPES.MESSAGE_DELETED), baseChannelMessageDeleted],
  [makeMessageEventWithSubtype(MESSAGE_SUBTYPES.MESSAGE_CHANGED), baseChannelMessageChanged],
  [makeMessageEventWithSubtype(MESSAGE_SUBTYPES.CHANNEL_JOIN), baseChannelJoin],
  [makeMessageEventWithSubtype(MESSAGE_SUBTYPES.CHANNEL_LEAVE), baseChannelLeave],
  [makeMessageEventWithSubtype(MESSAGE_SUBTYPES.GROUP_JOIN), baseChannelJoin],
  [makeMessageEventWithSubtype(MESSAGE_SUBTYPES.GROUP_LEAVE), baseChannelLeave],
  // Add in a default handler for all other message subtypes
  [makeMessageEventWithSubtype('rtm_client_add_message'), addMessageToChannel],
];


module.exports = zipObject(handlers);
