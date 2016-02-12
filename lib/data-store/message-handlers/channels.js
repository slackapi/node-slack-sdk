/**
 * Handlers for all RTM `channel_` events.
 */

var zipObject = require('lodash').zipObject;

var RTM_EVENTS = require('../../clients/events/rtm').EVENTS;

var baseChannelHandlers = require('./base-channel');
var helpers = require('./helpers');
var models = require('../../models');


var addChannel = function addChannel(dataStore, message) {
  var newChannel = new models.Channel(message);
  dataStore.setChannel(newChannel);
};


/** {@link https://api.slack.com/events/channel_created|channel_created} */
var handleChannelCreated = function handleChannelCreated(dataStore, message) {
  addChannel(dataStore, message.channel);
};


/** {@link https://api.slack.com/events/channel_deleted|channel_deleted} */
var handleChannelDeleted = function handleChannelDeleted(dataStore, message) {
  var channelId = message.channel;
  dataStore.removeChannel(channelId);
};


/** {@link https://api.slack.com/events/channel_joined|channel_joined} */
var handleChannelJoined = function handleChannelJoined(dataStore, message) {
  dataStore.upsertChannel(message.channel);
};

/** {@link https://api.slack.com/events/channel_left|channel_left} */
var handleChannelLeft = function handleChannelLeft(activeUserId, activeTeamId, dataStore, message) {
  var channel;
  baseChannelHandlers.handleLeave(activeUserId, activeTeamId, dataStore, message);
  channel = dataStore.getChannelById(message.channel);
  if (channel) {
    channel.is_member = false;
  }
};

var handlers = [
  [RTM_EVENTS.CHANNEL_ARCHIVE, baseChannelHandlers.handleArchive],
  [RTM_EVENTS.CHANNEL_CREATED, handleChannelCreated],
  [RTM_EVENTS.CHANNEL_DELETED, handleChannelDeleted],
  [RTM_EVENTS.CHANNEL_HISTORY_CHANGED, helpers.noopMessage],
  [RTM_EVENTS.CHANNEL_JOINED, handleChannelJoined],
  [RTM_EVENTS.CHANNEL_LEFT, handleChannelLeft],
  [RTM_EVENTS.CHANNEL_MARKED, baseChannelHandlers.handleChannelGroupOrDMMarked],
  [RTM_EVENTS.CHANNEL_RENAME, baseChannelHandlers.handleRename],
  [RTM_EVENTS.CHANNEL_UNARCHIVE, baseChannelHandlers.handleUnarchive],
];


module.exports = zipObject(handlers);
