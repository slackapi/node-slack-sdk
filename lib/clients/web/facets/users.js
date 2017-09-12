/**
 * API Facet to make calls to methods in the users namespace.
 *
 * This provides functions to call:
 *   - getPresence: {@link https://api.slack.com/methods/users.getPresence|users.getPresence}
 *   - identity: {@link https://api.slack.com/methods/users.identity|users.identity}
 *   - info: {@link https://api.slack.com/methods/users.info|users.info}
 *   - list: {@link https://api.slack.com/methods/users.list|users.list}
 *   - setActive: {@link https://api.slack.com/methods/users.setActive|users.setActive}
 *   - setPresence: {@link https://api.slack.com/methods/users.setPresence|users.setPresence}
 *
 */


function UsersFacet(makeAPICall) {
  this.name = 'users';
  this.makeAPICall = makeAPICall;
}


/**
 * Gets user presence information.
 * @see {@link https://api.slack.com/methods/users.getPresence|users.getPresence}
 *
 * @param {?} user - User to get presence info on. Defaults to the authed user.
 * @param {function=} optCb Optional callback, if not using promises.
 */
UsersFacet.prototype.getPresence = function getPresence(user, optCb) {
  var requiredArgs = {
    user: user
  };

  return this.makeAPICall('users.getPresence', requiredArgs, null, optCb);
};


/**
 * Get a user's identity.
 * @see {@link https://api.slack.com/methods/users.identity|users.identity}
 *
 * @param {function=} optCb Optional callback, if not using promises.
 */
UsersFacet.prototype.identity = function identity(optCb) {
  return this.makeAPICall('users.identity', null, null, optCb);
};


/**
 * Gets information about a user.
 * @see {@link https://api.slack.com/methods/users.info|users.info}
 *
 * @param {?} user - User to get info on
 * @param {function=} optCb Optional callback, if not using promises.
 */
UsersFacet.prototype.info = function info(user, optCb) {
  var requiredArgs = {
    user: user
  };

  return this.makeAPICall('users.info', requiredArgs, null, optCb);
};


/**
 * Lists all users in a Slack team.
 * @see {@link https://api.slack.com/methods/users.list|users.list}
 *
 * @param {Object=} opts
 * @param {?} opts.presence - Whether to include presence data in the output
 * @param {?} opts.include_locale - Set this to `true` to receive the locale for users. Defaults to
 * `false`
 * @param {function=} optCb Optional callback, if not using promises.
 */
UsersFacet.prototype.list = function list(opts, optCb) {
  return this.makeAPICall('users.list', null, opts, optCb);
};


/**
 * Marks a user as active.
 * @see {@link https://api.slack.com/methods/users.setActive|users.setActive}
 *
 * @param {function=} optCb Optional callback, if not using promises.
 */
UsersFacet.prototype.setActive = function setActive(optCb) {
  return this.makeAPICall('users.setActive', null, null, optCb);
};


/**
 * Manually sets user presence.
 * @see {@link https://api.slack.com/methods/users.setPresence|users.setPresence}
 *
 * @param {?} presence - Either `auto` or `away`
 * @param {function=} optCb Optional callback, if not using promises.
 */
UsersFacet.prototype.setPresence = function setPresence(presence, optCb) {
  var requiredArgs = {
    presence: presence
  };

  return this.makeAPICall('users.setPresence', requiredArgs, null, optCb);
};


module.exports = UsersFacet;
