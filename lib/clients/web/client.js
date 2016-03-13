/**
 *
 */

var bind = require('lodash').bind;
var forEach = require('lodash').forEach;
var inherits = require('inherits');

var BaseAPIClient = require('../client');
var facets = require('./facets/index');


/**
 * Slack Web API client.
 *
 * @param token The Slack API token to use with this client.
 * @param {Object=} opts
 * @param {Object} opts.retryConfig The configuration to use for the retry operation,
 *     {@see https://github.com/SEAPUNK/node-retry}
 * @constructor
 */
function WebAPIClient(token, opts) {
  var clientOpts = opts || {};
  BaseAPIClient.call(this, token, clientOpts);
}

inherits(WebAPIClient, BaseAPIClient);


/** @inheritDocs **/
WebAPIClient.prototype._createFacets = function _createFacets() {
  var newFacet;
  var makeAPICall;

  WebAPIClient.super_.prototype._createFacets.call(this);

  makeAPICall = bind(this.makeAPICall, this);
  forEach(facets, function registerWebClientFacet(Facet) {
    newFacet = new Facet(makeAPICall);
    this[newFacet.name] = newFacet;
  }, this);

  // Alias the DM facet, so that it matches the docs
  this.im = this.dm;
};


module.exports = WebAPIClient;
