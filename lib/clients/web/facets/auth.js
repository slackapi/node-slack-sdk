/**
 * API Facet to make calls to methods in the auth namespace.
 *
 * This provides functions to call:
 *   - test: {@link https://api.slack.com/methods/auth.test|auth.test}
 *
 */


function AuthFacet(makeAPICall) {
  this.name = 'auth';
  this.makeAPICall = makeAPICall;
}


/**
 * Checks authentication & identity.
 * @see {@link https://api.slack.com/methods/auth.test|auth.test}
 *
 * @param {function=} optCb Optional callback, if not using promises.
 */
AuthFacet.prototype.test = function test(optCb) {
  return this.makeAPICall('auth.test', null, null, optCb);
};


module.exports = AuthFacet;
