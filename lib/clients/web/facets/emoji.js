/**
 * API Facet to make calls to methods in the emoji namespace.
 *
 * This provides functions to call:
 *   - list: {@link https://api.slack.com/methods/emoji.list|emoji.list}
 *
 */


function EmojiFacet(makeAPICall) {
  this.name = 'emoji';
  this.makeAPICall = makeAPICall;
}


/**
 * Lists custom emoji for a team.
 * @see {@link https://api.slack.com/methods/emoji.list|emoji.list}
 *
 * @param {function=} optCb Optional callback, if not using promises.
 */
EmojiFacet.prototype.list = function list(optCb) {
  return this.makeAPICall('emoji.list', null, null, optCb);
};


module.exports = EmojiFacet;
