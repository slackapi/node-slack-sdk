/**
 * API Facet to make calls to methods in the im namespace.
 *
 * This provides functions to call:
 *   - close: {@link https://api.slack.com/methods/im.close|im.close}
 *   - history: {@link https://api.slack.com/methods/im.history|im.history}
 *   - list: {@link https://api.slack.com/methods/im.list|im.list}
 *   - mark: {@link https://api.slack.com/methods/im.mark|im.mark}
 *   - open: {@link https://api.slack.com/methods/im.open|im.open}
 *   - replies: {@link https://api.slack.com/methods/im.replies|im.replies}
 *
 */


function ImFacet(makeAPICall) {
  this.name = 'im';
  this.makeAPICall = makeAPICall;
}


/**
 * Close a direct message channel.
 * @see {@link https://api.slack.com/methods/im.close|im.close}
 *
 * @param {?} channel - Direct message channel to close.
 * @param {function=} optCb Optional callback, if not using promises.
 */
ImFacet.prototype.close = function close(channel, optCb) {
  var requiredArgs = {
    channel: channel
  };

  return this.makeAPICall('im.close', requiredArgs, null, optCb);
};


/**
 * Fetches history of messages and events from direct message channel.
 * @see {@link https://api.slack.com/methods/im.history|im.history}
 *
 * @param {?} channel - Direct message channel to fetch history for.
 * @param {Object=} opts
 * @param {?} opts.latest - End of time range of messages to include in results.
 * @param {?} opts.oldest - Start of time range of messages to include in results.
 * @param {?} opts.inclusive - Include messages with latest or oldest timestamp in results.
 * @param {?} opts.count - Number of messages to return, between 1 and 1000.
 * @param {?} opts.unreads - Include `unread_count_display` in the output?
 * @param {function=} optCb Optional callback, if not using promises.
 */
ImFacet.prototype.history = function history(channel, opts, optCb) {
  var requiredArgs = {
    channel: channel
  };

  return this.makeAPICall('im.history', requiredArgs, opts, optCb);
};


/**
 * Lists direct message channels for the calling user.
 * @see {@link https://api.slack.com/methods/im.list|im.list}
 *
 * @param {function=} optCb Optional callback, if not using promises.
 */
ImFacet.prototype.list = function list(optCb) {
  return this.makeAPICall('im.list', null, null, optCb);
};


/**
 * Sets the read cursor in a direct message channel.
 * @see {@link https://api.slack.com/methods/im.mark|im.mark}
 *
 * @param {?} channel - Direct message channel to set reading cursor in.
 * @param {?} ts - Timestamp of the most recently seen message.
 * @param {function=} optCb Optional callback, if not using promises.
 */
ImFacet.prototype.mark = function mark(channel, ts, optCb) {
  var requiredArgs = {
    channel: channel,
    ts: ts
  };

  return this.makeAPICall('im.mark', requiredArgs, null, optCb);
};


/**
 * Opens a direct message channel.
 * @see {@link https://api.slack.com/methods/im.open|im.open}
 *
 * @param {?} user - User to open a direct message channel with.
 * @param {function=} optCb Optional callback, if not using promises.
 */
ImFacet.prototype.open = function open(user, optCb) {
  var requiredArgs = {
    user: user
  };

  return this.makeAPICall('im.open', requiredArgs, null, optCb);
};

/**
 * Returns an entire thread (a message plus all the messages in reply to it).
 * @see {@link https://api.slack.com/methods/im.replies|im.replies}
 *
 * @param {?} channel - Direct message channel to get replies from.
 * @param {?} thread_ts - Timestamp of the parent message.
 * @param {function=} optCb Optional callback, if not using promises.
 */
ImFacet.prototype.replies = function replies(channel, threadTs, optCb) {
  var requiredArgs = {
    channel: channel,
    thread_ts: threadTs
  };

  return this.makeAPICall('im.replies', requiredArgs, null, optCb);
};


module.exports = ImFacet;
