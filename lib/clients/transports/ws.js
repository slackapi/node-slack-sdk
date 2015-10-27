/**
 * Helper to make a new ws WebSocket instance.
 */

var WebSocket = require('ws');


var wsTransport = function wsTransport(socketUrl) {
  return new WebSocket(socketUrl);
};

module.exports = wsTransport;
