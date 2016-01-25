/**
 * Handlers for all RTM `group_` events.
 */

var zipObject = require('lodash').zipObject;

var RTM_EVENTS = require('../../clients/events/rtm').EVENTS;

var baseChannelHandlers = require('./base-channel');
var helpers = require('./helpers');
var models = require('../../models');


/** {@link https://api.slack.com/events/group_joined|group_joined} */
var handleGroupJoined = function handleGroupJoined(dataStore, message) {
  var group = new models.Group(message.channel);
  dataStore.setGroup(group);
};


/**
 * {@link https://api.slack.com/events/group_left|group_left}
 */
var handleGroupLeave = function handleGroupLeave(activeUserId, activeTeamId, dataStore, message) {
  var group;
  baseChannelHandlers.handleLeave(activeUserId, activeTeamId, dataStore, message);

  group = dataStore.getGroupById(message.channel);
  if (group) {
    // TODO(leah): Maybe this should remove the group?
    if (group.members.length === 0) {
      group.is_archived = true;
    }
    dataStore.setGroup(group);
  }
};


var handlers = [
  [RTM_EVENTS.GROUP_ARCHIVE, baseChannelHandlers.handleArchive],
  [RTM_EVENTS.GROUP_CLOSE, helpers.noopMessage],
  [RTM_EVENTS.GROUP_JOINED, handleGroupJoined],
  [RTM_EVENTS.GROUP_LEFT, handleGroupLeave],
  [RTM_EVENTS.GROUP_MARKED, baseChannelHandlers.handleChannelGroupOrDMMarked],
  [RTM_EVENTS.GROUP_OPEN, helpers.noopMessage],
  [RTM_EVENTS.GROUP_UNARCHIVE, baseChannelHandlers.handleUnarchive],
  [RTM_EVENTS.GROUP_RENAME, baseChannelHandlers.handleRename],
  [RTM_EVENTS.GROUP_HISTORY_CHANGED, helpers.noopMessage],
];


module.exports = zipObject(handlers);
