/**
 * API Facet to make calls to methods in the bots namespace.
 *
 * This provides functions to call:
 *   - info: {@link https://api.slack.com/methods/bots.info|bots.info}
 *
 */


function BotsFacet(makeAPICall) {
  this.name = 'bots';
  this.makeAPICall = makeAPICall;
}


/**
 * Gets information about a bot user.
 * @see {@link https://api.slack.com/methods/bots.info|bots.info}
 *
 * @param {Object=} opts
 * @param {?} opts.bot - Bot user to get info on
 * @param {function=} optCb Optional callback, if not using promises.
 */
BotsFacet.prototype.info = function info(opts, optCb) {
  return this.makeAPICall('bots.info', null, opts, optCb);
};


module.exports = BotsFacet;
