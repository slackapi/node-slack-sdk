/**
 * API Facet to make calls to methods in the groups namespace.
 *
 * This provides functions to call:
 *   - archive: {@link https://api.slack.com/methods/groups.archive|groups.archive}
 *   - close: {@link https://api.slack.com/methods/groups.close|groups.close}
 *   - create: {@link https://api.slack.com/methods/groups.create|groups.create}
 *   - createChild: {@link https://api.slack.com/methods/groups.createChild|groups.createChild}
 *   - history: {@link https://api.slack.com/methods/groups.history|groups.history}
 *   - info: {@link https://api.slack.com/methods/groups.info|groups.info}
 *   - invite: {@link https://api.slack.com/methods/groups.invite|groups.invite}
 *   - kick: {@link https://api.slack.com/methods/groups.kick|groups.kick}
 *   - leave: {@link https://api.slack.com/methods/groups.leave|groups.leave}
 *   - list: {@link https://api.slack.com/methods/groups.list|groups.list}
 *   - mark: {@link https://api.slack.com/methods/groups.mark|groups.mark}
 *   - open: {@link https://api.slack.com/methods/groups.open|groups.open}
 *   - rename: {@link https://api.slack.com/methods/groups.rename|groups.rename}
 *   - setPurpose: {@link https://api.slack.com/methods/groups.setPurpose|groups.setPurpose}
 *   - setTopic: {@link https://api.slack.com/methods/groups.setTopic|groups.setTopic}
 *   - unarchive: {@link https://api.slack.com/methods/groups.unarchive|groups.unarchive}
 *
 */

var getArgsForFnsWithOptArgs = require('./helpers').getArgsForFnsWithOptArgs;


function GroupsFacet(makeAPICall) {
  this.name = 'groups';
  this.makeAPICall = makeAPICall;
}


/**
 * Archives a private group.
 * @see {@link https://api.slack.com/methods/groups.archive|groups.archive}
 *
 * @param {?} channel Private group to archive
 * @param {function} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.archive = function archive(channel, optCb) {
  var args = {
    channel: channel,
  };

  return this.makeAPICall('groups.archive', args, optCb);
};

/**
 * Closes a private group.
 * @see {@link https://api.slack.com/methods/groups.close|groups.close}
 *
 * @param {?} channel Group to open.
 * @param {function} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.close = function close(channel, optCb) {
  var args = {
    channel: channel,
  };

  return this.makeAPICall('groups.close', args, optCb);
};

/**
 * Creates a private group.
 * @see {@link https://api.slack.com/methods/groups.create|groups.create}
 *
 * @param {?} name Name of group to create
 * @param {function} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.create = function create(name, optCb) {
  var args = {
    name: name,
  };

  return this.makeAPICall('groups.create', args, optCb);
};

/**
 * Clones and archives a private group.
 * @see {@link https://api.slack.com/methods/groups.createChild|groups.createChild}
 *
 * @param {?} channel Group to clone and archive.
 * @param {function} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.createChild = function createChild(channel, optCb) {
  var args = {
    channel: channel,
  };

  return this.makeAPICall('groups.createChild', args, optCb);
};

/**
 * Fetches history of messages and events from a private group.
 * @see {@link https://api.slack.com/methods/groups.history|groups.history}
 *
 * @param {?} channel Group to fetch history for.
 * @param {Object=} opts
 * @param {?} opts.latest End of time range of messages to include in results.
 * @param {?} opts.oldest Start of time range of messages to include in results.
 * @param {?} opts.inclusive Include messages with latest or oldest timestamp in results.
 * @param {?} opts.count Number of messages to return, between 1 and 1000.
 * @param {function} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.history = function history(channel, opts, optCb) {
  var args = {
    channel: channel,
    opts: opts,
  };

  return this.makeAPICall('groups.history', args, optCb);
};

/**
 * Gets information about a private group.
 * @see {@link https://api.slack.com/methods/groups.info|groups.info}
 *
 * @param {?} channel Group to get info on
 * @param {function} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.info = function info(channel, optCb) {
  var args = {
    channel: channel,
  };

  return this.makeAPICall('groups.info', args, optCb);
};

/**
 * Invites a user to a private group.
 * @see {@link https://api.slack.com/methods/groups.invite|groups.invite}
 *
 * @param {?} channel Private group to invite user to.
 * @param {?} user User to invite.
 * @param {function} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.invite = function invite(channel, user, optCb) {
  var args = {
    channel: channel,
    user: user,
  };

  return this.makeAPICall('groups.invite', args, optCb);
};

/**
 * Removes a user from a private group.
 * @see {@link https://api.slack.com/methods/groups.kick|groups.kick}
 *
 * @param {?} channel Group to remove user from.
 * @param {?} user User to remove from group.
 * @param {function} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.kick = function kick(channel, user, optCb) {
  var args = {
    channel: channel,
    user: user,
  };

  return this.makeAPICall('groups.kick', args, optCb);
};

/**
 * Leaves a private group.
 * @see {@link https://api.slack.com/methods/groups.leave|groups.leave}
 *
 * @param {?} channel Group to leave
 * @param {function} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.leave = function leave(channel, optCb) {
  var args = {
    channel: channel,
  };

  return this.makeAPICall('groups.leave', args, optCb);
};

/**
 * Lists private groups that the calling user has access to.
 * @see {@link https://api.slack.com/methods/groups.list|groups.list}
 *
 * @param {?} optExcludeArchived Don't return archived groups.
 * @param {function} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.list = function list(optExcludeArchived, optCb) {
  var fnArgs = getArgsForFnsWithOptArgs(optExcludeArchived, optCb, 'exclude_archived');
  return this.makeAPICall('groups.list', fnArgs.args, fnArgs.cb);
};

/**
 * Sets the read cursor in a private group.
 * @see {@link https://api.slack.com/methods/groups.mark|groups.mark}
 *
 * @param {?} channel Group to set reading cursor in.
 * @param {?} ts Timestamp of the most recently seen message.
 * @param {function} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.mark = function mark(channel, ts, optCb) {
  var args = {
    channel: channel,
    ts: ts,
  };

  return this.makeAPICall('groups.mark', args, optCb);
};

/**
 * Opens a private group.
 * @see {@link https://api.slack.com/methods/groups.open|groups.open}
 *
 * @param {?} channel Group to open.
 * @param {function} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.open = function open(channel, optCb) {
  var args = {
    channel: channel,
  };

  return this.makeAPICall('groups.open', args, optCb);
};

/**
 * Renames a private group.
 * @see {@link https://api.slack.com/methods/groups.rename|groups.rename}
 *
 * @param {?} channel Group to rename
 * @param {?} name New name for group.
 * @param {function} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.rename = function rename(channel, name, optCb) {
  var args = {
    channel: channel,
    name: name,
  };

  return this.makeAPICall('groups.rename', args, optCb);
};

/**
 * Sets the purpose for a private group.
 * @see {@link https://api.slack.com/methods/groups.setPurpose|groups.setPurpose}
 *
 * @param {?} channel Private group to set the purpose of
 * @param {?} purpose The new purpose
 * @param {function} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.setPurpose = function setPurpose(channel, purpose, optCb) {
  var args = {
    channel: channel,
    purpose: purpose,
  };

  return this.makeAPICall('groups.setPurpose', args, optCb);
};

/**
 * Sets the topic for a private group.
 * @see {@link https://api.slack.com/methods/groups.setTopic|groups.setTopic}
 *
 * @param {?} channel Private group to set the topic of
 * @param {?} topic The new topic
 * @param {function} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.setTopic = function setTopic(channel, topic, optCb) {
  var args = {
    channel: channel,
    topic: topic,
  };

  return this.makeAPICall('groups.setTopic', args, optCb);
};

/**
 * Unarchives a private group.
 * @see {@link https://api.slack.com/methods/groups.unarchive|groups.unarchive}
 *
 * @param {?} channel Group to unarchive
 * @param {function} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.unarchive = function unarchive(channel, optCb) {
  var args = {
    channel: channel,
  };

  return this.makeAPICall('groups.unarchive', args, optCb);
};


module.exports = GroupsFacet;
