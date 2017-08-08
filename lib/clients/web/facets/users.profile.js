/**
 * API Facet to make calls to methods in the users.profile namespace.
 *
 * This provides functions to call:
 *   - get: {@link https://api.slack.com/methods/users.profile.get|users.profile.get}
 *   - set: {@link https://api.slack.com/methods/users.profile.set|users.profile.set}
 *
 */


function UsersProfileFacet(makeAPICall) {
  this.name = 'users.profile';
  this.makeAPICall = makeAPICall;
}


/**
 * This method is used to get the profile information for a user.
 * @see {@link https://api.slack.com/methods/users.profile.get|users.profile.get}
 *
 * @param {?} user - User to retrieve profile info for
 * @param {?} include_labels - Include labels for each ID in custom profile fields
 * @param {function=} optCb Optional callback, if not using promises.
 */
UsersProfileFacet.prototype.get = function get(opts, optCb) {
  return this.makeAPICall('users.profile.get', null, opts, optCb);
};

/**
 * This method is used to set the profile information for a user.
 * @see {@link https://api.slack.com/methods/users.profile.set|users.profile.set}
 *
 * @param {?} user - ID of user to change. This argument may only be specified by team admins on
 *   paid teams.
 * @param {?} profile - Collection of key:value pairs presented as a URL-encoded JSON hash.
 * @param {?} name - Name of a single key to set. Usable only if profile is not passed.
 * @param {?} value - Value to set a single key to. Usable only if profile is not passed.
 * @param {function=} optCb Optional callback, if not using promises.
 */
UsersProfileFacet.prototype.set = function set(opts, optCb) {
  return this.makeAPICall('users.profile.set', null, opts, optCb);
};


module.exports = UsersProfileFacet;
