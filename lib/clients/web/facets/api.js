/**
 * API Facet to make calls to methods in the api namespace.
 *
 * This provides functions to call:
 *   - test: {@link https://api.slack.com/methods/api.test|api.test}
 *
 */


function ApiFacet(makeAPICall) {
  this.name = 'api';
  this.makeAPICall = makeAPICall;
}


/**
 * Checks API calling code.
 * @see {@link https://api.slack.com/methods/api.test|api.test}
 *
 * @param {Object=} opts
 * @param {?} opts.error - Error response to return
 * @param {?} opts.foo - example property to return
 * @param {function=} optCb Optional callback, if not using promises.
 */
ApiFacet.prototype.test = function test(opts, optCb) {
  return this.makeAPICall('api.test', null, opts, optCb);
};


module.exports = ApiFacet;
