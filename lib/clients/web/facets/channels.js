/**
 * API Facet to make calls to methods in the channels namespace.
 *
 * This provides functions to call:
 *   - archive: {@link https://api.slack.com/methods/channels.archive|channels.archive}
 *   - create: {@link https://api.slack.com/methods/channels.create|channels.create}
 *   - history: {@link https://api.slack.com/methods/channels.history|channels.history}
 *   - info: {@link https://api.slack.com/methods/channels.info|channels.info}
 *   - invite: {@link https://api.slack.com/methods/channels.invite|channels.invite}
 *   - join: {@link https://api.slack.com/methods/channels.join|channels.join}
 *   - kick: {@link https://api.slack.com/methods/channels.kick|channels.kick}
 *   - leave: {@link https://api.slack.com/methods/channels.leave|channels.leave}
 *   - list: {@link https://api.slack.com/methods/channels.list|channels.list}
 *   - mark: {@link https://api.slack.com/methods/channels.mark|channels.mark}
 *   - rename: {@link https://api.slack.com/methods/channels.rename|channels.rename}
 *   - setPurpose: {@link https://api.slack.com/methods/channels.setPurpose|channels.setPurpose}
 *   - setTopic: {@link https://api.slack.com/methods/channels.setTopic|channels.setTopic}
 *   - unarchive: {@link https://api.slack.com/methods/channels.unarchive|channels.unarchive}
 *
 */

var getArgsForFnsWithOptArgs = require('./helpers').getArgsForFnsWithOptArgs;


function ChannelsFacet(makeAPICall) {
  this.name = 'channels';
  this.makeAPICall = makeAPICall;
}


/**
 * Archives a channel.
 * @see {@link https://api.slack.com/methods/channels.archive|channels.archive}
 *
 * @param {?} channel Channel to archive
 * @param {function} optCb Optional callback, if not using promises.
 */
ChannelsFacet.prototype.archive = function archive(channel, optCb) {
  var args = {
    channel: channel,
  };

  return this.makeAPICall('channels.archive', args, optCb);
};

/**
 * Creates a channel.
 * @see {@link https://api.slack.com/methods/channels.create|channels.create}
 *
 * @param {?} name Name of channel to create
 * @param {function} optCb Optional callback, if not using promises.
 */
ChannelsFacet.prototype.create = function create(name, optCb) {
  var args = {
    name: name,
  };

  return this.makeAPICall('channels.create', args, optCb);
};

/**
 * Fetches history of messages and events from a channel.
 * @see {@link https://api.slack.com/methods/channels.history|channels.history}
 *
 * @param {?} channel Channel to fetch history for.
 * @param {Object=} opts
 * @param {?} opts.latest End of time range of messages to include in results.
 * @param {?} opts.oldest Start of time range of messages to include in results.
 * @param {?} opts.inclusive Include messages with latest or oldest timestamp in results.
 * @param {?} opts.count Number of messages to return, between 1 and 1000.
 * @param {function} optCb Optional callback, if not using promises.
 */
ChannelsFacet.prototype.history = function history(channel, opts, optCb) {
  var args = {
    channel: channel,
    opts: opts,
  };

  return this.makeAPICall('channels.history', args, optCb);
};

/**
 * Gets information about a channel.
 * @see {@link https://api.slack.com/methods/channels.info|channels.info}
 *
 * @param {?} channel Channel to get info on
 * @param {function} optCb Optional callback, if not using promises.
 */
ChannelsFacet.prototype.info = function info(channel, optCb) {
  var args = {
    channel: channel,
  };

  return this.makeAPICall('channels.info', args, optCb);
};

/**
 * Invites a user to a channel.
 * @see {@link https://api.slack.com/methods/channels.invite|channels.invite}
 *
 * @param {?} channel Channel to invite user to.
 * @param {?} user User to invite to channel.
 * @param {function} optCb Optional callback, if not using promises.
 */
ChannelsFacet.prototype.invite = function invite(channel, user, optCb) {
  var args = {
    channel: channel,
    user: user,
  };

  return this.makeAPICall('channels.invite', args, optCb);
};

/**
 * Joins a channel, creating it if needed.
 * @see {@link https://api.slack.com/methods/channels.join|channels.join}
 *
 * @param {?} name Name of channel to join
 * @param {function} optCb Optional callback, if not using promises.
 */
ChannelsFacet.prototype.join = function join(name, optCb) {
  var args = {
    name: name,
  };

  return this.makeAPICall('channels.join', args, optCb);
};

/**
 * Removes a user from a channel.
 * @see {@link https://api.slack.com/methods/channels.kick|channels.kick}
 *
 * @param {?} channel Channel to remove user from.
 * @param {?} user User to remove from channel.
 * @param {function} optCb Optional callback, if not using promises.
 */
ChannelsFacet.prototype.kick = function kick(channel, user, optCb) {
  var args = {
    channel: channel,
    user: user,
  };

  return this.makeAPICall('channels.kick', args, optCb);
};

/**
 * Leaves a channel.
 * @see {@link https://api.slack.com/methods/channels.leave|channels.leave}
 *
 * @param {?} channel Channel to leave
 * @param {function} optCb Optional callback, if not using promises.
 */
ChannelsFacet.prototype.leave = function leave(channel, optCb) {
  var args = {
    channel: channel,
  };

  return this.makeAPICall('channels.leave', args, optCb);
};

/**
 * Lists all channels in a Slack team.
 * @see {@link https://api.slack.com/methods/channels.list|channels.list}
 *
 * @param {?} optExcludeArchived Don't return archived channels.
 * @param {function} optCb Optional callback, if not using promises.
 */
ChannelsFacet.prototype.list = function list(optExcludeArchived, optCb) {
  var fnArgs = getArgsForFnsWithOptArgs(optExcludeArchived, optCb, 'exclude_archived');
  return this.makeAPICall('channels.list', fnArgs.args, fnArgs.cb);
};

/**
 * Sets the read cursor in a channel.
 * @see {@link https://api.slack.com/methods/channels.mark|channels.mark}
 *
 * @param {?} channel Channel to set reading cursor in.
 * @param {?} ts Timestamp of the most recently seen message.
 * @param {function} optCb Optional callback, if not using promises.
 */
ChannelsFacet.prototype.mark = function mark(channel, ts, optCb) {
  var args = {
    channel: channel,
    ts: ts,
  };

  return this.makeAPICall('channels.mark', args, optCb);
};

/**
 * Renames a channel.
 * @see {@link https://api.slack.com/methods/channels.rename|channels.rename}
 *
 * @param {?} channel Channel to rename
 * @param {?} name New name for channel.
 * @param {function} optCb Optional callback, if not using promises.
 */
ChannelsFacet.prototype.rename = function rename(channel, name, optCb) {
  var args = {
    channel: channel,
    name: name,
  };

  return this.makeAPICall('channels.rename', args, optCb);
};

/**
 * Sets the purpose for a channel.
 * @see {@link https://api.slack.com/methods/channels.setPurpose|channels.setPurpose}
 *
 * @param {?} channel Channel to set the purpose of
 * @param {?} purpose The new purpose
 * @param {function} optCb Optional callback, if not using promises.
 */
ChannelsFacet.prototype.setPurpose = function setPurpose(channel, purpose, optCb) {
  var args = {
    channel: channel,
    purpose: purpose,
  };

  return this.makeAPICall('channels.setPurpose', args, optCb);
};

/**
 * Sets the topic for a channel.
 * @see {@link https://api.slack.com/methods/channels.setTopic|channels.setTopic}
 *
 * @param {?} channel Channel to set the topic of
 * @param {?} topic The new topic
 * @param {function} optCb Optional callback, if not using promises.
 */
ChannelsFacet.prototype.setTopic = function setTopic(channel, topic, optCb) {
  var args = {
    channel: channel,
    topic: topic,
  };

  return this.makeAPICall('channels.setTopic', args, optCb);
};

/**
 * Unarchives a channel.
 * @see {@link https://api.slack.com/methods/channels.unarchive|channels.unarchive}
 *
 * @param {?} channel Channel to unarchive
 * @param {function} optCb Optional callback, if not using promises.
 */
ChannelsFacet.prototype.unarchive = function unarchive(channel, optCb) {
  var args = {
    channel: channel,
  };

  return this.makeAPICall('channels.unarchive', args, optCb);
};


module.exports = ChannelsFacet;
