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
 *   - replies: {@link https://api.slack.com/methods/channels.replies|channels.replies}
 *   - setPurpose: {@link https://api.slack.com/methods/channels.setPurpose|channels.setPurpose}
 *   - setTopic: {@link https://api.slack.com/methods/channels.setTopic|channels.setTopic}
 *   - unarchive: {@link https://api.slack.com/methods/channels.unarchive|channels.unarchive}
 *
 */


function ChannelsFacet(makeAPICall) {
  this.name = 'channels';
  this.makeAPICall = makeAPICall;
}


/**
 * Archives a channel.
 * @see {@link https://api.slack.com/methods/channels.archive|channels.archive}
 *
 * @param {?} channel - Channel to archive
 * @param {function=} optCb Optional callback, if not using promises.
 */
ChannelsFacet.prototype.archive = function archive(channel, optCb) {
  var requiredArgs = {
    channel: channel
  };

  return this.makeAPICall('channels.archive', requiredArgs, null, optCb);
};


/**
 * Creates a channel.
 * @see {@link https://api.slack.com/methods/channels.create|channels.create}
 *
 * @param {?} name - Name of channel to create
 * @param {function=} optCb Optional callback, if not using promises.
 */
ChannelsFacet.prototype.create = function create(name, optCb) {
  var requiredArgs = {
    name: name
  };

  return this.makeAPICall('channels.create', requiredArgs, null, optCb);
};


/**
 * Fetches history of messages and events from a channel.
 * @see {@link https://api.slack.com/methods/channels.history|channels.history}
 *
 * @param {?} channel - Channel to fetch history for.
 * @param {Object=} opts
 * @param {?} opts.latest - End of time range of messages to include in results.
 * @param {?} opts.oldest - Start of time range of messages to include in results.
 * @param {?} opts.inclusive - Include messages with latest or oldest timestamp in results.
 * @param {?} opts.count - Number of messages to return, between 1 and 1000.
 * @param {?} opts.unreads - Include `unread_count_display` in the output?
 * @param {function=} optCb Optional callback, if not using promises.
 */
ChannelsFacet.prototype.history = function history(channel, opts, optCb) {
  var requiredArgs = {
    channel: channel
  };

  return this.makeAPICall('channels.history', requiredArgs, opts, optCb);
};


/**
 * Gets information about a channel.
 * @see {@link https://api.slack.com/methods/channels.info|channels.info}
 *
 * @param {?} channel - Channel to get info on
 * @param {function=} optCb Optional callback, if not using promises.
 */
ChannelsFacet.prototype.info = function info(channel, optCb) {
  var requiredArgs = {
    channel: channel
  };

  return this.makeAPICall('channels.info', requiredArgs, null, optCb);
};


/**
 * Invites a user to a channel.
 * @see {@link https://api.slack.com/methods/channels.invite|channels.invite}
 *
 * @param {?} channel - Channel to invite user to.
 * @param {?} user - User to invite to channel.
 * @param {function=} optCb Optional callback, if not using promises.
 */
ChannelsFacet.prototype.invite = function invite(channel, user, optCb) {
  var requiredArgs = {
    channel: channel,
    user: user
  };

  return this.makeAPICall('channels.invite', requiredArgs, null, optCb);
};


/**
 * Joins a channel, creating it if needed.
 * @see {@link https://api.slack.com/methods/channels.join|channels.join}
 *
 * @param {?} name - Name of channel to join
 * @param {function=} optCb Optional callback, if not using promises.
 */
ChannelsFacet.prototype.join = function join(name, optCb) {
  var requiredArgs = {
    name: name
  };

  return this.makeAPICall('channels.join', requiredArgs, null, optCb);
};


/**
 * Removes a user from a channel.
 * @see {@link https://api.slack.com/methods/channels.kick|channels.kick}
 *
 * @param {?} channel - Channel to remove user from.
 * @param {?} user - User to remove from channel.
 * @param {function=} optCb Optional callback, if not using promises.
 */
ChannelsFacet.prototype.kick = function kick(channel, user, optCb) {
  var requiredArgs = {
    channel: channel,
    user: user
  };

  return this.makeAPICall('channels.kick', requiredArgs, null, optCb);
};


/**
 * Leaves a channel.
 * @see {@link https://api.slack.com/methods/channels.leave|channels.leave}
 *
 * @param {?} channel - Channel to leave
 * @param {function=} optCb Optional callback, if not using promises.
 */
ChannelsFacet.prototype.leave = function leave(channel, optCb) {
  var requiredArgs = {
    channel: channel
  };

  return this.makeAPICall('channels.leave', requiredArgs, null, optCb);
};


/**
 * Lists all channels in a Slack team.
 * @see {@link https://api.slack.com/methods/channels.list|channels.list}
 *
 * @param {Object=} opts
 * @param {?} opts.exclude_archived - Don't return archived channels.
 * @param {function=} optCb Optional callback, if not using promises.
 */
ChannelsFacet.prototype.list = function list(opts, optCb) {
  return this.makeAPICall('channels.list', null, opts, optCb);
};


/**
 * Sets the read cursor in a channel.
 * @see {@link https://api.slack.com/methods/channels.mark|channels.mark}
 *
 * @param {?} channel - Channel to set reading cursor in.
 * @param {?} ts - Timestamp of the most recently seen message.
 * @param {function=} optCb Optional callback, if not using promises.
 */
ChannelsFacet.prototype.mark = function mark(channel, ts, optCb) {
  var requiredArgs = {
    channel: channel,
    ts: ts
  };

  return this.makeAPICall('channels.mark', requiredArgs, null, optCb);
};


/**
 * Renames a channel.
 * @see {@link https://api.slack.com/methods/channels.rename|channels.rename}
 *
 * @param {?} channel - Channel to rename
 * @param {?} name - New name for channel.
 * @param {function=} optCb Optional callback, if not using promises.
 */
ChannelsFacet.prototype.rename = function rename(channel, name, optCb) {
  var requiredArgs = {
    channel: channel,
    name: name
  };

  return this.makeAPICall('channels.rename', requiredArgs, null, optCb);
};


/**
 * Retrieve a thread of messages posted to a channel.
 * @see {@link https://api.slack.com/methods/channels.replies|channels.replies}
 *
 * @param {?} channel - Channel to fetch thread from
 * @param {?} thread_ts - Unique identifier of a thread's parent message.
 * @param {function=} optCb Optional callback, if not using promises.
 */
ChannelsFacet.prototype.replies = function replies(channel, threadTs, optCb) {
  var requiredArgs = {
    channel: channel,
    thread_ts: threadTs
  };

  return this.makeAPICall('channels.replies', requiredArgs, null, optCb);
};

/**
 * Sets the purpose for a channel.
 * @see {@link https://api.slack.com/methods/channels.setPurpose|channels.setPurpose}
 *
 * @param {?} channel - Channel to set the purpose of
 * @param {?} purpose - The new purpose
 * @param {function=} optCb Optional callback, if not using promises.
 */
ChannelsFacet.prototype.setPurpose = function setPurpose(channel, purpose, optCb) {
  var requiredArgs = {
    channel: channel,
    purpose: purpose
  };

  return this.makeAPICall('channels.setPurpose', requiredArgs, null, optCb);
};


/**
 * Sets the topic for a channel.
 * @see {@link https://api.slack.com/methods/channels.setTopic|channels.setTopic}
 *
 * @param {?} channel - Channel to set the topic of
 * @param {?} topic - The new topic
 * @param {function=} optCb Optional callback, if not using promises.
 */
ChannelsFacet.prototype.setTopic = function setTopic(channel, topic, optCb) {
  var requiredArgs = {
    channel: channel,
    topic: topic
  };

  return this.makeAPICall('channels.setTopic', requiredArgs, null, optCb);
};


/**
 * Unarchives a channel.
 * @see {@link https://api.slack.com/methods/channels.unarchive|channels.unarchive}
 *
 * @param {?} channel - Channel to unarchive
 * @param {function=} optCb Optional callback, if not using promises.
 */
ChannelsFacet.prototype.unarchive = function unarchive(channel, optCb) {
  var requiredArgs = {
    channel: channel
  };

  return this.makeAPICall('channels.unarchive', requiredArgs, null, optCb);
};


module.exports = ChannelsFacet;
