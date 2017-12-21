/**
 * API Facet to make calls to methods in the oauth namespace.
 *
 * This provides functions to call:
 *   - access: {@link https://api.slack.com/methods/oauth.access|oauth.access}
 *
 */

/**
 * @constructor
 */
function OauthFacet(makeAPICall) {
  this.name = 'oauth';
  this.makeAPICall = makeAPICall;
}


/**
 * Exchanges a temporary OAuth code for an API token.
 * @see {@link https://api.slack.com/methods/oauth.access|oauth.access}
 *
 * @param {?} client_id - Issued when you created your application.
 * @param {?} client_secret - Issued when you created your application.
 * @param {?} code - The `code` param returned via the OAuth callback.
 * @param {Object=} opts
 * @param {?} opts.redirect_uri - This must match the originally submitted URI (if one was sent).
 * @param {function=} optCb Optional callback, if not using promises.
 */
OauthFacet.prototype.access = function access(clientId, clientSecret, code, opts, optCb) {
  var requiredArgs = {
    client_id: clientId,
    client_secret: clientSecret,
    code: code
  };

  return this.makeAPICall('oauth.access', requiredArgs, opts, optCb);
};


module.exports = OauthFacet;
