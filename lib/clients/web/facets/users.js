/**
 * API Facet to make calls to methods in the users namespace.
 *
 * This provides functions to call:
 *   - getPresence: {@link https://api.slack.com/methods/users.getPresence|users.getPresence}
 *   - info: {@link https://api.slack.com/methods/users.info|users.info}
 *   - list: {@link https://api.slack.com/methods/users.list|users.list}
 *   - setActive: {@link https://api.slack.com/methods/users.setActive|users.setActive}
 *   - setPresence: {@link https://api.slack.com/methods/users.setPresence|users.setPresence}
 *
 */

var getArgsForFnsWithOptArgs = require('./helpers').getArgsForFnsWithOptArgs;


function UsersFacet(makeAPICall) {
  this.name = 'users';
  this.makeAPICall = makeAPICall;
}


/**
 * Gets user presence information.
 * @see {@link https://api.slack.com/methods/users.getPresence|users.getPresence}
 *
 * @param {?} user User to get presence info on. Defaults to the authed user.
 * @param {function} optCb Optional callback, if not using promises.
 */
UsersFacet.prototype.getPresence = function getPresence(user, optCb) {
  var args = {
    user: user,
  };

  return this.makeAPICall('users.getPresence', args, optCb);
};

/**
 * Gets information about a user.
 * @see {@link https://api.slack.com/methods/users.info|users.info}
 *
 * @param {?} user User to get info on
 * @param {function} optCb Optional callback, if not using promises.
 */
UsersFacet.prototype.info = function info(user, optCb) {
  var args = {
    user: user,
  };

  return this.makeAPICall('users.info', args, optCb);
};

/**
 * Lists all users in a Slack team.
 * @see {@link https://api.slack.com/methods/users.list|users.list}
 *
 * @param {?} optPresence Whether to include presence data in the output
 * @param {function} optCb Optional callback, if not using promises.
 */
UsersFacet.prototype.list = function list(optPresence, optCb) {
  var fnArgs = getArgsForFnsWithOptArgs(optPresence, optCb, 'presence');
  return this.makeAPICall('users.list', fnArgs.args, fnArgs.cb);
};

/**
 * Marks a user as active.
 * @see {@link https://api.slack.com/methods/users.setActive|users.setActive}
 *
 * @param {function} optCb Optional callback, if not using promises.
 */
UsersFacet.prototype.setActive = function setActive(optCb) {
  var args = {};

  return this.makeAPICall('users.setActive', args, optCb);
};

/**
 * Manually sets user presence.
 * @see {@link https://api.slack.com/methods/users.setPresence|users.setPresence}
 *
 * @param {?} presence Either `auto` or `away`
 * @param {function} optCb Optional callback, if not using promises.
 */
UsersFacet.prototype.setPresence = function setPresence(presence, optCb) {
  var args = {
    presence: presence,
  };

  return this.makeAPICall('users.setPresence', args, optCb);
};


module.exports = UsersFacet;
