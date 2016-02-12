/**
 * API Facet to make calls to methods in the rtm namespace.
 *
 * This provides functions to call:
 *   - start: {@link https://api.slack.com/methods/rtm.start|rtm.start}
 *
 */


function RtmFacet(makeAPICall) {
  this.name = 'rtm';
  this.makeAPICall = makeAPICall;
}


/**
 * Starts a Real Time Messaging session.
 * @see {@link https://api.slack.com/methods/rtm.start|rtm.start}
 *
 * @param {Object=} opts
 * @param {?} opts.simple_latest Return timestamp only for latest message object of each channel
 *     (improves performance).
 * @param {?} opts.no_unreads Skip unread counts for each channel (improves performance).
 * @param {function} optCb Optional callback, if not using promises.
 */
RtmFacet.prototype.start = function start(opts, optCb) {
  var args = {
    opts: opts,
  };

  return this.makeAPICall('rtm.start', args, optCb);
};


module.exports = RtmFacet;
