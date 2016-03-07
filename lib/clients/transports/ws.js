/**
 * Helper to make a new ws WebSocket instance.
 */

var HttpsProxyAgent = require('https-proxy-agent');
var WebSocket = require('ws');


/**
 *
 * @param {String} socketUrl
 * @param {Object=} opts
 * @param {String} opts.proxyURL
 * @returns {*}
 */
var wsTransport = function wsTransport(socketUrl, opts) {
  var wsTransportOpts = opts || {};
  var wsOpts = {};

  if (wsTransportOpts.proxyURL) {
    wsOpts.agent = new HttpsProxyAgent(wsTransportOpts.proxyUrl);
  }

  return new WebSocket(socketUrl, wsOpts);
};

module.exports = wsTransport;
