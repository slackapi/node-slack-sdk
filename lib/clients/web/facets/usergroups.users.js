/**
 * API Facet to make calls to methods in the usergroups.users namespace.
 *
 * This provides functions to call:
 *   - list: {@link https://api.slack.com/methods/usergroups.users.list|usergroups.users.list}
 *   - update: {@link https://api.slack.com/methods/usergroups.users.update|usergroups.users.update}
 *
 */


function UsergroupsUsersFacet(makeAPICall) {
  this.name = 'usergroups.users';
  this.makeAPICall = makeAPICall;
}


/**
 * List all users in a User Group
 * @see {@link https://api.slack.com/methods/usergroups.users.list|usergroups.users.list}
 *
 * @param {?} usergroup - The encoded ID of the User Group to update.
 * @param {Object=} opts
 * @param {?} opts.include_disabled - Allow results that involve disabled User Groups.
 * @param {function=} optCb Optional callback, if not using promises.
 */
UsergroupsUsersFacet.prototype.list = function list(usergroup, opts, optCb) {
  var requiredArgs = {
    usergroup: usergroup
  };

  return this.makeAPICall('usergroups.users.list', requiredArgs, opts, optCb);
};


/**
 * Update the list of users for a User Group
 * @see {@link https://api.slack.com/methods/usergroups.users.update|usergroups.users.update}
 *
 * @param {?} usergroup - The encoded ID of the User Group to update.
 * @param {?} users - A comma separated string of encoded user IDs that represent the entire list
 *   of users for the User Group.
 * @param {Object=} opts
 * @param {?} opts.include_count - Include the number of users in the User Group.
 * @param {function=} optCb Optional callback, if not using promises.
 */
UsergroupsUsersFacet.prototype.update = function update(usergroup, users, opts, optCb) {
  var requiredArgs = {
    usergroup: usergroup,
    users: users
  };

  return this.makeAPICall('usergroups.users.update', requiredArgs, opts, optCb);
};


module.exports = UsergroupsUsersFacet;
