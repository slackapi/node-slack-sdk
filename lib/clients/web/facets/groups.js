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
 *   - replies: {@link https://api.slack.com/methods/groups.replies|groups.replies}
 *   - setPurpose: {@link https://api.slack.com/methods/groups.setPurpose|groups.setPurpose}
 *   - setTopic: {@link https://api.slack.com/methods/groups.setTopic|groups.setTopic}
 *   - unarchive: {@link https://api.slack.com/methods/groups.unarchive|groups.unarchive}
 *
 */


function GroupsFacet(makeAPICall) {
  this.name = 'groups';
  this.makeAPICall = makeAPICall;
}


/**
 * Archives a private channel.
 * @see {@link https://api.slack.com/methods/groups.archive|groups.archive}
 *
 * @param {?} channel - Private channel to archive
 * @param {function=} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.archive = function archive(channel, optCb) {
  var requiredArgs = {
    channel: channel
  };

  return this.makeAPICall('groups.archive', requiredArgs, null, optCb);
};


/**
 * Closes a private channel.
 * @see {@link https://api.slack.com/methods/groups.close|groups.close}
 *
 * @param {?} channel - Private channel to close.
 * @param {function=} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.close = function close(channel, optCb) {
  var requiredArgs = {
    channel: channel
  };

  return this.makeAPICall('groups.close', requiredArgs, null, optCb);
};


/**
 * Creates a private channel.
 * @see {@link https://api.slack.com/methods/groups.create|groups.create}
 *
 * @param {?} name - Name of private channel to create
 * @param {function=} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.create = function create(name, optCb) {
  var requiredArgs = {
    name: name
  };

  return this.makeAPICall('groups.create', requiredArgs, null, optCb);
};


/**
 * Clones and archives a private channel.
 * @see {@link https://api.slack.com/methods/groups.createChild|groups.createChild}
 *
 * @param {?} channel - Private channel to clone and archive.
 * @param {function=} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.createChild = function createChild(channel, optCb) {
  var requiredArgs = {
    channel: channel
  };

  return this.makeAPICall('groups.createChild', requiredArgs, null, optCb);
};


/**
 * Fetches history of messages and events from a private channel.
 * @see {@link https://api.slack.com/methods/groups.history|groups.history}
 *
 * @param {?} channel - Private channel to fetch history for.
 * @param {Object=} opts
 * @param {?} opts.latest - End of time range of messages to include in results.
 * @param {?} opts.oldest - Start of time range of messages to include in results.
 * @param {?} opts.inclusive - Include messages with latest or oldest timestamp in results.
 * @param {?} opts.count - Number of messages to return, between 1 and 1000.
 * @param {?} opts.unreads - Include `unread_count_display` in the output?
 * @param {function=} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.history = function history(channel, opts, optCb) {
  var requiredArgs = {
    channel: channel
  };

  return this.makeAPICall('groups.history', requiredArgs, opts, optCb);
};


/**
 * Gets information about a private channel.
 * @see {@link https://api.slack.com/methods/groups.info|groups.info}
 *
 * @param {?} channel - Private channel to get info on
 * @param {function=} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.info = function info(channel, optCb) {
  var requiredArgs = {
    channel: channel
  };

  return this.makeAPICall('groups.info', requiredArgs, null, optCb);
};


/**
 * Invites a user to a private channel.
 * @see {@link https://api.slack.com/methods/groups.invite|groups.invite}
 *
 * @param {?} channel - Private channel to invite user to.
 * @param {?} user - User to invite.
 * @param {function=} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.invite = function invite(channel, user, optCb) {
  var requiredArgs = {
    channel: channel,
    user: user
  };

  return this.makeAPICall('groups.invite', requiredArgs, null, optCb);
};


/**
 * Removes a user from a private channel.
 * @see {@link https://api.slack.com/methods/groups.kick|groups.kick}
 *
 * @param {?} channel - Private channel to remove user from.
 * @param {?} user - User to remove from private channel.
 * @param {function=} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.kick = function kick(channel, user, optCb) {
  var requiredArgs = {
    channel: channel,
    user: user
  };

  return this.makeAPICall('groups.kick', requiredArgs, null, optCb);
};


/**
 * Leaves a private channel.
 * @see {@link https://api.slack.com/methods/groups.leave|groups.leave}
 *
 * @param {?} channel - Private channel to leave
 * @param {function=} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.leave = function leave(channel, optCb) {
  var requiredArgs = {
    channel: channel
  };

  return this.makeAPICall('groups.leave', requiredArgs, null, optCb);
};


/**
 * Lists private channels that the calling user has access to.
 * @see {@link https://api.slack.com/methods/groups.list|groups.list}
 *
 * @param {Object=} opts
 * @param {?} opts.exclude_archived - Don't return archived private channels.
 * @param {function=} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.list = function list(opts, optCb) {
  return this.makeAPICall('groups.list', null, opts, optCb);
};


/**
 * Sets the read cursor in a private channel.
 * @see {@link https://api.slack.com/methods/groups.mark|groups.mark}
 *
 * @param {?} channel - Private channel to set reading cursor in.
 * @param {?} ts - Timestamp of the most recently seen message.
 * @param {function=} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.mark = function mark(channel, ts, optCb) {
  var requiredArgs = {
    channel: channel,
    ts: ts
  };

  return this.makeAPICall('groups.mark', requiredArgs, null, optCb);
};


/**
 * Opens a private channel.
 * @see {@link https://api.slack.com/methods/groups.open|groups.open}
 *
 * @param {?} channel - Private channel to open.
 * @param {function=} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.open = function open(channel, optCb) {
  var requiredArgs = {
    channel: channel
  };

  return this.makeAPICall('groups.open', requiredArgs, null, optCb);
};


/**
 * Renames a private channel.
 * @see {@link https://api.slack.com/methods/groups.rename|groups.rename}
 *
 * @param {?} channel - Private channel to rename
 * @param {?} name - New name for private channel.
 * @param {function=} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.rename = function rename(channel, name, optCb) {
  var requiredArgs = {
    channel: channel,
    name: name
  };

  return this.makeAPICall('groups.rename', requiredArgs, null, optCb);
};

/**
 * Retrieve a thread of messages posted to a private channel.
 * @see {@link https://api.slack.com/methods/groups.replies|groups.replies}
 *
 * @param {?} channel - Private channel to fetch thread from
 * @param {?} thread_ts - Unique identifier of a thread's parent message
 * @param {function=} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.replies = function replies(channel, threadTs, optCb) {
  var requiredArgs = {
    channel: channel,
    thread_ts: threadTs
  };

  return this.makeAPICall('groups.replies', requiredArgs, null, optCb);
};

/**
 * Sets the purpose for a private channel.
 * @see {@link https://api.slack.com/methods/groups.setPurpose|groups.setPurpose}
 *
 * @param {?} channel - Private channel to set the purpose of
 * @param {?} purpose - The new purpose
 * @param {function=} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.setPurpose = function setPurpose(channel, purpose, optCb) {
  var requiredArgs = {
    channel: channel,
    purpose: purpose
  };

  return this.makeAPICall('groups.setPurpose', requiredArgs, null, optCb);
};


/**
 * Sets the topic for a private channel.
 * @see {@link https://api.slack.com/methods/groups.setTopic|groups.setTopic}
 *
 * @param {?} channel - Private channel to set the topic of
 * @param {?} topic - The new topic
 * @param {function=} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.setTopic = function setTopic(channel, topic, optCb) {
  var requiredArgs = {
    channel: channel,
    topic: topic
  };

  return this.makeAPICall('groups.setTopic', requiredArgs, null, optCb);
};


/**
 * Unarchives a private channel.
 * @see {@link https://api.slack.com/methods/groups.unarchive|groups.unarchive}
 *
 * @param {?} channel - Private channel to unarchive
 * @param {function=} optCb Optional callback, if not using promises.
 */
GroupsFacet.prototype.unarchive = function unarchive(channel, optCb) {
  var requiredArgs = {
    channel: channel
  };

  return this.makeAPICall('groups.unarchive', requiredArgs, null, optCb);
};


module.exports = GroupsFacet;
