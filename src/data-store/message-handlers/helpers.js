/**
 *
 */

var models = require('../../models');


var noopMessage = function noopMessage(dataStore, message) {
  return message;
};


/**
 * {@link https://api.slack.com/events/team_join|team_join}
 * {@link https://api.slack.com/events/user_change|user_change}
 */
var handleNewOrUpdatedUser = function handleNewOrUpdatedUser(dataStore, message) {
  var user = dataStore.getUserById(message.user.id);
  if (user) {
    user.update(message.user);
  } else {
    user = new models.User(message.user);
  }
  dataStore.setUser(user);
};


module.exports.handleNewOrUpdatedUser = handleNewOrUpdatedUser;
module.exports.noopMessage = noopMessage;
