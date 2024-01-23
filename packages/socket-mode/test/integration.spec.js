const { assert } = require('chai');
const { SocketModeClient, LogLevel } = require('../.');
const { WebSocketServer} = require('ws');
const { createServer } = require('http');

const HTTP_PORT = 8080;
const WSS_PORT = 8081;
// Basic HTTP server to 'fake' behaviour of `apps.connections.open` endpoint
const server = createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(JSON.stringify({
    ok: true,
    url: `ws://localhost:${WSS_PORT}/`,
  }));
});

// Basic WS server to fake slack WS endpoint
let wss = null;
let exposed_ws_connection = null;

// Socket mode client pointing to the above two posers
let client = null;

describe('Integration tests with a WebSocket server', () => {
  beforeEach(() => {
    client = new SocketModeClient({ appToken: 'whatever', logLevel:  LogLevel.ERROR, clientOptions: {
      slackApiUrl: 'http://localhost:8080/'
    }});
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
    wss.close();
    exposed_ws_connection = null;
    client = null;
  });
  it('connects to a server', async () => {
    await client.start();
    // TODO: this is necessary, as await start() followed by await disconnect() causes an exception
    // probably a bug!
    await new Promise((res, _rej) => {
      client.on('connected', () => {
        res();
      });
    });
    await client.disconnect();
  });
  it('can listen on random event types and receive payload properties', async () => {
    await client.start();
    client.on('connected', () => {
      exposed_ws_connection.send(JSON.stringify({
        type: 'integration-test',
        envelope_id: 12345,
      }));
    });
    await new Promise((res, _rej) => {
      client.on('integration-test', (evt) => {
        assert.equal(evt.envelope_id, 12345);
        res();
      });
    });
    await client.disconnect();
  });
  describe.skip('failure modes / unexpected messages sent to client', () => { 
    it('should deal with empty/binary messages', async () => {
      await client.start();
      client.on('connected', () => {
        exposed_ws_connection.send(null);
      });
      // TODO: will be stuck here and the error "Unexpected binary message received!' will be raised as an ERROR log
      await new Promise((res, _rej) => {
        client.on('slack_event', (evt) => {
          res();
        });
      });
      await client.disconnect();
    });
    it('should deal with empty string messages', async () => {
      await client.start();
      client.on('connected', () => {
        exposed_ws_connection.send('');
      });
      // TODO: will be stuck here and the error "Unable to parse an incoming WebSocket message: Unexpected end of JSON input,' will be raised as an ERROR log
      await new Promise((res, _rej) => {
        client.on('slack_event', (evt) => {
          res();
        });
      });
      await client.disconnect();
    });
  });
});
