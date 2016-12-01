/**
 * API Facet to make calls to methods in the auth namespace.
 *
 * This provides functions to call:
 *   - revoke: {@link https://api.slack.com/methods/auth.revoke|auth.revoke}
 *   - test: {@link https://api.slack.com/methods/auth.test|auth.test}
 *
 */


function AuthFacet(makeAPICall) {
  this.name = 'auth';
  this.makeAPICall = makeAPICall;
}


/**
 * Revokes a token.
 * @see {@link https://api.slack.com/methods/auth.revoke|auth.revoke}
 *
 * @param {Object=} opts
 * @param {?} opts.test - Setting this parameter to `1` triggers a _testing mode_ where the
 *   specified token will not actually be revoked.
 * @param {function=} optCb Optional callback, if not using promises.
 */
AuthFacet.prototype.revoke = function revoke(opts, optCb) {
  return this.makeAPICall('auth.revoke', null, opts, optCb);
};


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
