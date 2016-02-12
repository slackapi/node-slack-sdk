/**
 * API Facet to make calls to methods in the presence namespace.
 *
 * This provides functions to call:
 *   - set: {@link https://api.slack.com/methods/presence.set|presence.set}
 *
 */


function PresenceFacet(makeAPICall) {
  this.name = 'presence';
  this.makeAPICall = makeAPICall;
}


/**
 * Manually set user presence
 * @see {@link https://api.slack.com/methods/presence.set|presence.set}
 *
 * @param {?} presence Either `active` or `away`
 * @param {function} optCb Optional callback, if not using promises.
 */
PresenceFacet.prototype.set = function set(presence, optCb) {
  var args = {
    presence: presence,
  };

  return this.makeAPICall('presence.set', args, optCb);
};


module.exports = PresenceFacet;
