/**
 *
 * @param opts
 * @constructor
 */

var inherits = require('inherits');
var ws = require('ws');


var MockWSServer = function MockWSServer(opts) {
  ws.Server.call(this, opts);

  this.clientConn = null;

  this.on('connection', function handleMockWSServerConnection(newWs) {
    this.clientConn = newWs;
    this.sendMessageToClientConn({ type: 'hello' });
  });
};

inherits(MockWSServer, ws.Server);


MockWSServer.prototype.closeClientConn = function closeClientConn() {
  this.clientConn.close();
};


MockWSServer.prototype.sendMessageToClientConn = function sendMessageToClientConn(message) {
  this.clientConn.send(JSON.stringify(message));
};


module.exports = MockWSServer;
