/**
 * API Facet to make calls to methods in the reactions namespace.
 *
 * This provides functions to call:
 *   - add: {@link https://api.slack.com/methods/reactions.add|reactions.add}
 *   - get: {@link https://api.slack.com/methods/reactions.get|reactions.get}
 *   - list: {@link https://api.slack.com/methods/reactions.list|reactions.list}
 *   - remove: {@link https://api.slack.com/methods/reactions.remove|reactions.remove}
 *
 */


function ReactionsFacet(makeAPICall) {
  this.name = 'reactions';
  this.makeAPICall = makeAPICall;
}


/**
 * Adds a reaction to an item.
 * @see {@link https://api.slack.com/methods/reactions.add|reactions.add}
 *
 * @param {?} name Reaction (emoji) name.
 * @param {Object=} opts
 * @param {?} opts.file File to add reaction to.
 * @param {?} opts.file_comment File comment to add reaction to.
 * @param {?} opts.channel Channel where the message to add reaction to was posted.
 * @param {?} opts.timestamp Timestamp of the message to add reaction to.
 * @param {function} optCb Optional callback, if not using promises.
 */
ReactionsFacet.prototype.add = function add(name, opts, optCb) {
  var args = {
    name: name,
    opts: opts,
  };

  return this.makeAPICall('reactions.add', args, optCb);
};

/**
 * Gets reactions for an item.
 * @see {@link https://api.slack.com/methods/reactions.get|reactions.get}
 *
 * @param {Object=} opts
 * @param {?} opts.file File to get reactions for.
 * @param {?} opts.file_comment File comment to get reactions for.
 * @param {?} opts.channel Channel where the message to get reactions for was posted.
 * @param {?} opts.timestamp Timestamp of the message to get reactions for.
 * @param {?} opts.full If true always return the complete reaction list.
 * @param {function} optCb Optional callback, if not using promises.
 */
ReactionsFacet.prototype.get = function get(opts, optCb) {
  var args = {
    opts: opts,
  };

  return this.makeAPICall('reactions.get', args, optCb);
};

/**
 * Lists reactions made by a user.
 * @see {@link https://api.slack.com/methods/reactions.list|reactions.list}
 *
 * @param {Object=} opts
 * @param {?} opts.user Show reactions made by this user. Defaults to the authed user.
 * @param {?} opts.full If true always return the complete reaction list.
 * @param {function} optCb Optional callback, if not using promises.
 */
ReactionsFacet.prototype.list = function list(opts, optCb) {
  var args = {
    opts: opts,
  };

  return this.makeAPICall('reactions.list', args, optCb);
};

/**
 * Removes a reaction from an item.
 * @see {@link https://api.slack.com/methods/reactions.remove|reactions.remove}
 *
 * @param {?} name Reaction (emoji) name.
 * @param {Object=} opts
 * @param {?} opts.file File to remove reaction from.
 * @param {?} opts.file_comment File comment to remove reaction from.
 * @param {?} opts.channel Channel where the message to remove reaction from was posted.
 * @param {?} opts.timestamp Timestamp of the message to remove reaction from.
 * @param {function} optCb Optional callback, if not using promises.
 */
ReactionsFacet.prototype.remove = function remove(name, opts, optCb) {
  var args = {
    name: name,
    opts: opts,
  };

  return this.makeAPICall('reactions.remove', args, optCb);
};


module.exports = ReactionsFacet;
