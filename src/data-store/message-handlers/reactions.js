/**
 * Handlers for all RTM `reaction_xxx` events.
 */

var findIndex = require('lodash').findIndex;
var partial = require('lodash').partial;
var fromPairs = require('lodash').fromPairs;

var RTM_EVENTS = require('../../clients/events/rtm').EVENTS;


/**
 *
 * @param {Object} dataStore
 * @param {Object} message
 * @param {boolean} isAdded
 */
var toggleReactionForMessage = function toggleReactionForMessage(dataStore, message, isAdded) {
  var reaction;
  var reactionIndex;
  var userIndex;
  var item = message.item;

  var channel = dataStore.getChannelGroupOrDMById(item.channel);
  var msgObj = channel.getMessageByTs(item.ts);

  // Ensure a reactions array is available on the message object
  msgObj.reactions = msgObj.reactions || [];

  // If there's a message in the local cache, update it, otherwise do nothing as the message
  // with reaction will get populated when it's next needed from history.
  if (message) {
    reactionIndex = findIndex(msgObj.reactions, { name: message.reaction });
    reaction = msgObj.reactions[reactionIndex];

    if (reaction) {
      reaction.count = Math.max(reaction.count + (isAdded ? 1 : -1), 0);

      if (isAdded) {
        // NOTE: This will not necessarily be consistent with the users array if the
        //       message is pulled from the server. This is because the server only stores
        //       X users per reaction, whereas the client will store as many as it's
        //       notified about.
        reaction.users.push(message.user);
      } else {
        if (reaction.count === 0) {
          msgObj.reactions.splice(reactionIndex, 1);
        } else {
          userIndex = reaction.users.indexOf(message.user);
          if (userIndex > -1) {
            reaction.users.splice(userIndex, 1);
          }
        }
      }
    } else {
      msgObj.reactions.push({
        name: message.reaction,
        users: [message.user],
        count: 1
      });
    }
  }
};


var toggleReactionForFile = function toggleReactionForFile() {
  // TODO(leah): Update this once files are supported in the data-store implementation
};


var toggleReactionForFileComment = function toggleReactionForFileComment() {
  // TODO(leah): Update this once files are supported in the data-store implementation
};


var toggleReaction = function toggleReaction(isAdded, dataStore, message) {
  var itemType = message.item.type;

  if (itemType === 'file') {
    toggleReactionForFile(dataStore, message, isAdded);
  } else if (itemType === 'file_comment') {
    toggleReactionForFileComment(dataStore, message, isAdded);
  } else if (itemType === 'message') {
    toggleReactionForMessage(dataStore, message, isAdded);
  }
};


var handlers = [
  [RTM_EVENTS.REACTION_ADDED, partial(toggleReaction, true)],
  [RTM_EVENTS.REACTION_REMOVED, partial(toggleReaction, false)]
];


module.exports = fromPairs(handlers);
