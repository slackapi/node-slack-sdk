/**
 * API Facet to make calls to methods in the mpim namespace.
 *
 * This provides functions to call:
 *   - close: {@link https://api.slack.com/methods/mpim.close|mpim.close}
 *   - history: {@link https://api.slack.com/methods/mpim.history|mpim.history}
 *   - list: {@link https://api.slack.com/methods/mpim.list|mpim.list}
 *   - mark: {@link https://api.slack.com/methods/mpim.mark|mpim.mark}
 *   - open: {@link https://api.slack.com/methods/mpim.open|mpim.open}
 *
 */


function MpimFacet(makeAPICall) {
  this.name = 'mpim';
  this.makeAPICall = makeAPICall;
}


/**
 * Closes a multiparty direct message channel.
 * @see {@link https://api.slack.com/methods/mpim.close|mpim.close}
 *
 * @param {?} channel - MPIM to close.
 * @param {function=} optCb Optional callback, if not using promises.
 */
MpimFacet.prototype.close = function close(channel, optCb) {
  var requiredArgs = {
    channel: channel
  };

  return this.makeAPICall('mpim.close', requiredArgs, null, optCb);
};


/**
 * Fetches history of messages and events from a multiparty direct message.
 * @see {@link https://api.slack.com/methods/mpim.history|mpim.history}
 *
 * @param {?} channel - Multiparty direct message to fetch history for.
 * @param {Object=} opts
 * @param {?} opts.latest - End of time range of messages to include in results.
 * @param {?} opts.oldest - Start of time range of messages to include in results.
 * @param {?} opts.inclusive - Include messages with latest or oldest timestamp in results.
 * @param {?} opts.count - Number of messages to return, between 1 and 1000.
 * @param {?} opts.unreads - Include `unread_count_display` in the output?
 * @param {function=} optCb Optional callback, if not using promises.
 */
MpimFacet.prototype.history = function history(channel, opts, optCb) {
  var requiredArgs = {
    channel: channel
  };

  return this.makeAPICall('mpim.history', requiredArgs, opts, optCb);
};


/**
 * Lists multiparty direct message channels for the calling user.
 * @see {@link https://api.slack.com/methods/mpim.list|mpim.list}
 *
 * @param {function=} optCb Optional callback, if not using promises.
 */
MpimFacet.prototype.list = function list(optCb) {
  return this.makeAPICall('mpim.list', null, null, optCb);
};


/**
 * Sets the read cursor in a multiparty direct message channel.
 * @see {@link https://api.slack.com/methods/mpim.mark|mpim.mark}
 *
 * @param {?} channel - multiparty direct message channel to set reading cursor in.
 * @param {?} ts - Timestamp of the most recently seen message.
 * @param {function=} optCb Optional callback, if not using promises.
 */
MpimFacet.prototype.mark = function mark(channel, ts, optCb) {
  var requiredArgs = {
    channel: channel,
    ts: ts
  };

  return this.makeAPICall('mpim.mark', requiredArgs, null, optCb);
};


/**
 * This method opens a multiparty direct message.
 * @see {@link https://api.slack.com/methods/mpim.open|mpim.open}
 *
 * @param {?} users - Comma separated lists of users.  The ordering of the users is preserved
 *   whenever a MPIM group is returned.
 * @param {function=} optCb Optional callback, if not using promises.
 */
MpimFacet.prototype.open = function open(users, optCb) {
  var requiredArgs = {
    users: users
  };

  return this.makeAPICall('mpim.open', requiredArgs, null, optCb);
};


module.exports = MpimFacet;
