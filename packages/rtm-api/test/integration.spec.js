const { assert } = require('chai');
const { RTMClient } = require('../src/RTMClient');
const { LogLevel } = require('../src/logger');
const { WebSocketServer} = require('ws');
const { createServer } = require('http');
const sinon = require('sinon');

const HTTP_PORT = 12345;
const WSS_PORT = 23456;
// Basic HTTP server to 'fake' behaviour of `apps.connections.open` endpoint
let server = null;

// Basic WS server to fake slack WS endpoint
let wss = null;
let exposed_ws_connection = null;

// Socket mode client pointing to the above two posers
let client = null;

describe('Integration tests with a WebSocket server', () => {
  beforeEach(() => {
    server = createServer((req, res) => {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({
        ok: true,
        url: `ws://localhost:${WSS_PORT}/`,
        self: { id: 'elclassico' },
        team: { id: 'T12345' },
      }));
    });
    server.listen(HTTP_PORT);
    wss = new WebSocketServer({ port: WSS_PORT });
    wss.on('connection', (ws) => {
      ws.on('error', (err) => {
        assert.fail(err);
      });
      // Send `Event.ServerHello`
      ws.send(JSON.stringify({type: 'hello'}));
      exposed_ws_connection = ws;
    });
  });
  afterEach(() => {
    server.close();
    server = null;
    wss.close();
    wss = null;
    exposed_ws_connection = null;
    client = null;
  });
  describe('establishing connection, receiving valid messages', () => {
    beforeEach(() => {
      client = new RTMClient('token', {
        slackApiUrl: `http://localhost:${HTTP_PORT}/`,
        logLevel: LogLevel.DEBUG,
      });
    });
    it('connects to a server via `start()` and gracefully disconnects via `disconnect()`', async () => {
      await client.start();
      await sleep(50); // TODO: this is due to `start()` resolving once the authenticated event is raised
      // however, the handshake on the WS side still needs to complete at this point, so calling disconnect()
      // will raise an error.
      await client.disconnect();
    });
    it('can listen on slack event types and receive payload properties', async () => {
      client.on('connected', () => {
        exposed_ws_connection.send(JSON.stringify({
          type: 'team_member_joined',
          envelope_id: 12345,
        }));
      });
      await client.start();
      await new Promise((res, _rej) => {
        client.on('team_member_joined', (evt) => {
          assert.equal(evt.envelope_id, 12345);
          res();
        });
      });
      await client.disconnect();
    });
    it('should not raise an exception if calling disconnect() when already disconnected', async () => {
      // https://github.com/slackapi/node-slack-sdk/issues/842
      await client.disconnect();
    });
  });
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
