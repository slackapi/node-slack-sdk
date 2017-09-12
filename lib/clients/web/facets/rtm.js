/**
 * API Facet to make calls to methods in the rtm namespace.
 *
 * This provides functions to call:
 *   - start: {@link https://api.slack.com/methods/rtm.start|rtm.start}
 *   - connect: {@link https://api.slack.com/methods/rtm.connect|rtm.connect}
 */


function RtmFacet(makeAPICall) {
  this.name = 'rtm';
  this.makeAPICall = makeAPICall;
}


/**
 * Starts a Real Time Messaging session.
 * @see {@link https://api.slack.com/methods/rtm.start|rtm.start}
 *
 * @param {Object} opts
 * @param {Boolean} opts.simple_latest  Return timestamp only for latest message object of each
 *                                      channel (improves performance).
 * @param {Boolean} opts.no_unreads     Skip unread counts for each channel (improves performance).
 * @param {Boolean} opts.mpim_aware     Returns MPIMs to the client in the API response.
 * @param {Boolean} opts.presence_sub   Support presence subscriptions on this socket connection.
 * @param {Boolean} opts.include_locale Set this to `true` to receive the locale for users and
 *                                      channels. Defaults to `false`
 * @param {Function} optCb              Optional callback, if not using promises.
 */
RtmFacet.prototype.start = function start(opts, optCb) {
  return this.makeAPICall('rtm.start', null, opts, optCb);
};


/**
 * Starts a Real Time Messaging session using the lighter-weight rtm.connect.
 * This will give us a WebSocket URL without the payload of `rtm.start`.
 * @see {@link https://api.slack.com/methods/rtm.connect|rtm.connect}
 *
 * @param {Object} opts
 * @param {Boolean} opts.presence_sub   Support presence subscriptions on this socket connection.
 * @param {Function} optCb              Optional callback, if not using promises.
 */
RtmFacet.prototype.connect = function connect(opts, optCb) {
  return this.makeAPICall('rtm.connect', null, opts, optCb);
};


module.exports = RtmFacet;
