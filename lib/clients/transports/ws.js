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
  var proxyURL = wsTransportOpts.proxyURL || process.env.https_proxy;

  if (proxyURL) {
    console.log('Using https proxy: ' + proxyURL);
    wsOpts.agent = new HttpsProxyAgent(proxyURL);
  }

  return new WebSocket(socketUrl, wsOpts);
};

module.exports = wsTransport;
