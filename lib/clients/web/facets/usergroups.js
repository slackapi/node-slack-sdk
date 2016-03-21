/**
 * API Facet to make calls to methods in the usergroups namespace.
 *
 * This provides functions to call:
 *   - create: {@link https://api.slack.com/methods/usergroups.create|usergroups.create}
 *   - disable: {@link https://api.slack.com/methods/usergroups.disable|usergroups.disable}
 *   - enable: {@link https://api.slack.com/methods/usergroups.enable|usergroups.enable}
 *   - list: {@link https://api.slack.com/methods/usergroups.list|usergroups.list}
 *   - update: {@link https://api.slack.com/methods/usergroups.update|usergroups.update}
 *
 */


function UsergroupsFacet(makeAPICall) {
  this.name = 'usergroups';
  this.makeAPICall = makeAPICall;
}


/**
 * Create a User Group
 * @see {@link https://api.slack.com/methods/usergroups.create|usergroups.create}
 *
 * @param {?} name - A name for the User Group. Must be unique among User Groups.
 * @param {Object=} opts
 * @param {?} opts.handle - A mention handle. Must be unique among channels, users and User
 *   Groups.
 * @param {?} opts.description - A short description of the User Group.
 * @param {?} opts.channels - A comma separated string of encoded channel IDs for which the User
 *   Group uses as a default.
 * @param {?} opts.include_count - Include the number of users in each User Group.
 * @param {function=} optCb Optional callback, if not using promises.
 */
UsergroupsFacet.prototype.create = function create(name, opts, optCb) {
  var requiredArgs = {
    name: name
  };

  return this.makeAPICall('usergroups.create', requiredArgs, opts, optCb);
};


/**
 * Disable an existing User Group
 * @see {@link https://api.slack.com/methods/usergroups.disable|usergroups.disable}
 *
 * @param {?} usergroup - The encoded ID of the User Group to disable.
 * @param {Object=} opts
 * @param {?} opts.include_count - Include the number of users in the User Group.
 * @param {function=} optCb Optional callback, if not using promises.
 */
UsergroupsFacet.prototype.disable = function disable(usergroup, opts, optCb) {
  var requiredArgs = {
    usergroup: usergroup
  };

  return this.makeAPICall('usergroups.disable', requiredArgs, opts, optCb);
};


/**
 * Enable a User Group
 * @see {@link https://api.slack.com/methods/usergroups.enable|usergroups.enable}
 *
 * @param {?} usergroup - The encoded ID of the User Group to enable.
 * @param {Object=} opts
 * @param {?} opts.include_count - Include the number of users in the User Group.
 * @param {function=} optCb Optional callback, if not using promises.
 */
UsergroupsFacet.prototype.enable = function enable(usergroup, opts, optCb) {
  var requiredArgs = {
    usergroup: usergroup
  };

  return this.makeAPICall('usergroups.enable', requiredArgs, opts, optCb);
};


/**
 * List all User Groups for a team
 * @see {@link https://api.slack.com/methods/usergroups.list|usergroups.list}
 *
 * @param {Object=} opts
 * @param {?} opts.include_disabled - Include disabled User Groups.
 * @param {?} opts.include_count - Include the number of users in each User Group.
 * @param {?} opts.include_users - Include the list of users for each User Group.
 * @param {function=} optCb Optional callback, if not using promises.
 */
UsergroupsFacet.prototype.list = function list(opts, optCb) {
  return this.makeAPICall('usergroups.list', null, opts, optCb);
};


/**
 * Update an existing User Group
 * @see {@link https://api.slack.com/methods/usergroups.update|usergroups.update}
 *
 * @param {?} usergroup - The encoded ID of the User Group to update.
 * @param {Object=} opts
 * @param {?} opts.name - A name for the User Group. Must be unique among User Groups.
 * @param {?} opts.handle - A mention handle. Must be unique among channels, users and User
 *   Groups.
 * @param {?} opts.description - A short description of the User Group.
 * @param {?} opts.channels - A comma separated string of encoded channel IDs for which the User
 *   Group uses as a default.
 * @param {?} opts.include_count - Include the number of users in the User Group.
 * @param {function=} optCb Optional callback, if not using promises.
 */
UsergroupsFacet.prototype.update = function update(usergroup, opts, optCb) {
  var requiredArgs = {
    usergroup: usergroup
  };

  return this.makeAPICall('usergroups.update', requiredArgs, opts, optCb);
};


module.exports = UsergroupsFacet;
