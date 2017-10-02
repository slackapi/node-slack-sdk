/**
 * API Facet to make calls to methods in the conversations namespace.
 *
 * This provides functions to call:
 *   - archive: {@link https://api.slack.com/methods/conversations.archive|conversations.archive}
 *   - close: {@link https://api.slack.com/methods/conversations.close|conversations.close}
 *   - create: {@link https://api.slack.com/methods/conversations.create|conversations.create}
 *   - history: {@link https://api.slack.com/methods/conversations.history|conversations.history}
 *   - info: {@link https://api.slack.com/methods/conversations.info|conversations.info}
 *   - invite: {@link https://api.slack.com/methods/conversations.invite|conversations.invite}
 *   - join: {@link https://api.slack.com/methods/conversations.join|conversations.join}
 *   - kick: {@link https://api.slack.com/methods/conversations.kick|conversations.kick}
 *   - leave: {@link https://api.slack.com/methods/conversations.leave|conversations.leave}
 *   - list: {@link https://api.slack.com/methods/conversations.list|conversations.list}
 *   - members: {@link https://api.slack.com/methods/conversations.members|conversations.members}
 *   - open: {@link https://api.slack.com/methods/conversations.open|conversations.open}
 *   - rename: {@link https://api.slack.com/methods/conversations.rename|conversations.rename}
 *   - replies: {@link https://api.slack.com/methods/conversations.replies|conversations.replies}
 *   - setPurpose: {@link https://api.slack.com/methods/conversations.setPurpose|conversations.setPurpose}
 *   - setTopic: {@link https://api.slack.com/methods/conversations.setTopic|conversations.setTopic}
 *   - unarchive: {@link https://api.slack.com/methods/conversations.unarchive|conversations.unarchive}
 *
 */


function ConversationsFacet(makeAPICall) {
  this.name = 'conversations';
  this.makeAPICall = makeAPICall;
}


/**
 * Archives a conversation.
 * @see {@link https://api.slack.com/methods/conversations.archive|conversations.archive}
 *
 * @param {?} channel - ID of conversation to archive
 * @param {function=} optCb Optional callback, if not using promises.
 */
ConversationsFacet.prototype.archive = function archive(channel, optCb) {
  var requiredArgs = {
    channel: channel
  };

  return this.makeAPICall('conversations.archive', requiredArgs, null, optCb);
};

/**
 * Closes a direct message or multi-person direct message.
 * @see {@link https://api.slack.com/methods/conversations.close|conversations.close}
 *
 * @param {?} channel - Conversation to close.
 * @param {function=} optCb Optional callback, if not using promises.
 */
ConversationsFacet.prototype.close = function close(channel, optCb) {
  var requiredArgs = {
    channel: channel
  };

  return this.makeAPICall('conversations.close', requiredArgs, null, optCb);
};

/**
 * Initiates a public or private channel-based conversation
 * @see {@link https://api.slack.com/methods/conversations.create|conversations.create}
 *
 * @param {?} name - Name of the public or private channel to create
 * @param {Object=} opts
 * @param {?} opts.is_private - Create a private channel instead of a public one
 * @param {function=} optCb Optional callback, if not using promises.
 */
ConversationsFacet.prototype.create = function create(name, opts, optCb) {
  var requiredArgs = {
    name: name
  };

  return this.makeAPICall('conversations.create', requiredArgs, opts, optCb);
};

/**
 * Fetches a conversation's history of messages and events.
 * @see {@link https://api.slack.com/methods/conversations.history|conversations.history}
 *
 * @param {?} channel - Conversation ID to fetch history for.
 * @param {Object=} opts
 * @param {?} opts.latest - End of time range of messages to include in results.
 * @param {?} opts.oldest - Start of time range of messages to include in results.
 * @param {?} opts.cursor - Paginate through collections of data by setting the cursor parameter to
 * a next_cursor attribute returned by a previous request's response_metadata. Default value fetches
 * the first "page" of the collection. See pagination for more detail.
 * @param {?} opts.limit - The maximum number of items to return. Fewer than the requested number of
 * items may be returned, even if the end of the users list hasn't been reached.
 * @param {function=} optCb Optional callback, if not using promises.
 */
ConversationsFacet.prototype.history = function history(channel, opts, optCb) {
  var requiredArgs = {
    channel: channel
  };

  return this.makeAPICall('conversations.history', requiredArgs, opts, optCb);
};


/**
 * Retrieve information about a conversation.
 * @see {@link https://api.slack.com/methods/conversations.info|conversations.info}
 *
 * @param {?} channel - Channel to get info on
 * @param {Object=} opts
 * @param {?} opts.include_locale - Set this to `true` to receive the locale for this conversation.
 * Defaults to `false`
 * @param {function=} optCb Optional callback, if not using promises.
 */
ConversationsFacet.prototype.info = function info(channel, opts, optCb) {
  var requiredArgs = {
    channel: channel
  };

  return this.makeAPICall('conversations.info', requiredArgs, null, optCb);
};


/**
 * Invites users to a channel.
 * @see {@link https://api.slack.com/methods/conversations.invite|conversations.invite}
 *
 * @param {?} channel - The ID of the public or private channel to invite user(s) to.
 * @param {?} users - A comma separated list of user IDs. Up to 30 users may be listed.
 * @param {function=} optCb Optional callback, if not using promises.
 */
ConversationsFacet.prototype.invite = function invite(channel, users, optCb) {
  var requiredArgs = {
    channel: channel,
    users: users
  };

  return this.makeAPICall('conversations.invite', requiredArgs, null, optCb);
};


/**
 * Joins an existing conversation.
 * @see {@link https://api.slack.com/methods/conversations.join|conversations.join}
 *
 * @param {?} channel - ID of conversation to join
 * @param {function=} optCb Optional callback, if not using promises.
 */
ConversationsFacet.prototype.join = function join(channel, optCb) {
  var requiredArgs = {
    channel: channel
  };

  return this.makeAPICall('conversations.join', requiredArgs, null, optCb);
};


/**
 * Removes a user from a conversation.
 * @see {@link https://api.slack.com/methods/conversations.kick|conversations.kick}
 *
 * @param {?} channel - ID of conversation to remove user from.
 * @param {?} user - User to remove from channel.
 * @param {function=} optCb Optional callback, if not using promises.
 */
ConversationsFacet.prototype.kick = function kick(channel, user, optCb) {
  var requiredArgs = {
    channel: channel,
    user: user
  };

  return this.makeAPICall('conversations.kick', requiredArgs, null, optCb);
};


/**
 * Leaves a channel.
 * @see {@link https://api.slack.com/methods/conversations.leave|conversations.leave}
 *
 * @param {?} channel - Channel to leave
 * @param {function=} optCb Optional callback, if not using promises.
 */
ConversationsFacet.prototype.leave = function leave(channel, optCb) {
  var requiredArgs = {
    channel: channel
  };

  return this.makeAPICall('conversations.leave', requiredArgs, null, optCb);
};


/**
 * Lists all conversations in a Slack team.
 * @see {@link https://api.slack.com/methods/conversations.list|conversations.list}
 *
 * @param {Object=} opts
 * @param {?} opts.exclude_archived - Set to `true` to exclude archived channels from the list
 * @param {?} opts.types - Mix and match channel types by providing a comma-separated list of any
 * combination of `public_channel`, `private_channel`, `mpim`, `im`
 * @param {?} opts.cursor - Paginate through collections of data by setting the cursor parameter to
 * a next_cursor attribute returned by a previous request's response_metadata. Default value fetches
 * the first "page" of the collection. See pagination for more detail.
 * @param {?} opts.limit - The maximum number of items to return. Fewer than the requested number of
 * items may be returned, even if the end of the users list hasn't been reached.
 * @param {function=} optCb Optional callback, if not using promises.
 */
ConversationsFacet.prototype.list = function list(opts, optCb) {
  return this.makeAPICall('conversations.list', null, opts, optCb);
};


/**
 * Retrieve members of a conversation.
 * @see {@link https://api.slack.com/methods/conversations.members|conversations.members}
 *
 * @param {?} channel - ID of the conversation to retrieve members for
 * @param {Object=} opts
 * @param {?} opts.cursor - Paginate through collections of data by setting the cursor parameter to
 * a next_cursor attribute returned by a previous request's response_metadata. Default value fetches
 * the first "page" of the collection. See pagination for more detail.
 * @param {?} opts.limit - The maximum number of items to return. Fewer than the requested number of
 * items may be returned, even if the end of the users list hasn't been reached.
 * @param {function=} optCb Optional callback, if not using promises.
 */
ConversationsFacet.prototype.members = function members(channel, opts, optCb) {
  var requiredArgs = {
    channel: channel
  };

  return this.makeAPICall('conversations.members', requiredArgs, opts, optCb);
};

/**
 * Opens or resumes a direct message or multi-person direct message.
 * @see {@link https://api.slack.com/methods/conversations.open|conversations.open}
 *
 * @param {Object=} opts
 * @param {?} opts.channel - Resume a conversation by supplying an im or mpim's ID. Or provide the
 * users field instead.
 * @param {?} opts.return_im - Boolean, indicates you want the full IM channel definition in the
 * response.
 * @param {?} opts.users - Comma separated lists of users. If only one user is included, this
 * creates a 1:1 DM. The ordering of the users is preserved whenever a multi-person direct message
 * is returned. Supply a channel when not supplying users.
 * @param {function=} optCb Optional callback, if not using promises.
 */
ConversationsFacet.prototype.open = function open(opts, optCb) {
  return this.makeAPICall('conversations.open', null, opts, optCb);
};

/**
 * Renames a conversation.
 * @see {@link https://api.slack.com/methods/conversations.rename|conversations.rename}
 *
 * @param {?} channel - ID of conversation to rename
 * @param {?} name - New name for conversation.
 * @param {function=} optCb Optional callback, if not using promises.
 */
ConversationsFacet.prototype.rename = function rename(channel, name, optCb) {
  var requiredArgs = {
    channel: channel,
    name: name
  };

  return this.makeAPICall('conversations.rename', requiredArgs, null, optCb);
};

/**
 * Retrieve a thread of messages posted to a conversation
 * @see {@link https://api.slack.com/methods/conversations.replies|conversations.replies}
 *
 * @param {?} channel - Conversation ID to fetch thread from
 * @param {?} ts - Unique identifier of a thread's parent message
 * @param {Object=} opts
 * @param {?} opts.cursor - Paginate through collections of data by setting the cursor parameter to
 * a next_cursor attribute returned by a previous request's response_metadata. Default value fetches
 * the first "page" of the collection. See pagination for more detail.
 * @param {?} opts.limit - The maximum number of items to return. Fewer than the requested number of
 * items may be returned, even if the end of the users list hasn't been reached.
 * @param {function=} optCb Optional callback, if not using promises.
 */
ConversationsFacet.prototype.replies = function replies(channel, ts, opts, optCb) {
  var requiredArgs = {
    channel: channel,
    ts: ts
  };

  return this.makeAPICall('conversations.replies', requiredArgs, opts, optCb);
};

/**
 * Sets the purpose for a conversation.
 * @see {@link https://api.slack.com/methods/conversations.setPurpose|conversations.setPurpose}
 *
 * @param {?} channel - Conversation to set the purpose of
 * @param {?} purpose - A new, specialer purpose
 * @param {function=} optCb Optional callback, if not using promises.
 */
ConversationsFacet.prototype.setPurpose = function setPurpose(channel, purpose, optCb) {
  var requiredArgs = {
    channel: channel,
    purpose: purpose
  };

  return this.makeAPICall('conversations.setPurpose', requiredArgs, null, optCb);
};


/**
 * Sets the topic for a conversation.
 * @see {@link https://api.slack.com/methods/conversations.setTopic|conversations.setTopic}
 *
 * @param {?} channel - Conversation to set the topic of
 * @param {?} topic - The new topic string. Does not support formatting or linkification.
 * @param {function=} optCb Optional callback, if not using promises.
 */
ConversationsFacet.prototype.setTopic = function setTopic(channel, topic, optCb) {
  var requiredArgs = {
    channel: channel,
    topic: topic
  };

  return this.makeAPICall('conversations.setTopic', requiredArgs, null, optCb);
};


/**
 * Reverses conversation archival.
 * @see {@link https://api.slack.com/methods/conversations.unarchive|conversations.unarchive}
 *
 * @param {?} channel - ID of conversation to unarchive
 * @param {function=} optCb Optional callback, if not using promises.
 */
ConversationsFacet.prototype.unarchive = function unarchive(channel, optCb) {
  var requiredArgs = {
    channel: channel
  };

  return this.makeAPICall('conversations.unarchive', requiredArgs, null, optCb);
};


module.exports = ConversationsFacet;
