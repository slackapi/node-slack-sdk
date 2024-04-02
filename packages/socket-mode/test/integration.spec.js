const { assert } = require('chai');
const { SocketModeClient} = require('../src/SocketModeClient');
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


const DISCONNECT_REASONS = ['warning', 'refresh_requested', 'too_many_websockets'];

describe('Integration tests with a WebSocket server', () => {
  beforeEach(() => {
    server = createServer((_req, res) => {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({
        ok: true,
        url: `ws://localhost:${WSS_PORT}/`,
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
      client = new SocketModeClient({ appToken: 'whatever', logLevel: LogLevel.ERROR, clientOptions: {
        slackApiUrl: `http://localhost:${HTTP_PORT}/`
      }});
    });
    it('connects to a server via `start()` and gracefully disconnects via `disconnect()`', async () => {
      await client.start();
      await client.disconnect();
    });
    it('can call `disconnect()` even if already disconnected without issue', async () => {
      await client.disconnect();
    });
    it('can listen on random event types and receive payload properties', async () => {
      client.on('connected', () => {
        exposed_ws_connection.send(JSON.stringify({
          type: 'integration-test',
          envelope_id: 12345,
        }));
      });
      await client.start();
      await new Promise((res, _rej) => {
        client.on('integration-test', (evt) => {
          assert.equal(evt.envelope_id, 12345);
          res();
        });
      });
      await client.disconnect();
    });
  });
  describe('catastrophic server behaviour', () => {
    beforeEach(() => {
      client = new SocketModeClient({ appToken: 'whatever', logLevel: LogLevel.ERROR, clientOptions: {
        slackApiUrl: `http://localhost:${HTTP_PORT}/`
      }, clientPingTimeout: 25});
    });
    it('should retry if retrieving a WSS URL fails', async () => {
      // Shut down the main WS-endpoint-retrieval server - we will customize its behaviour for this test
      server.close();
      let num_attempts = 0;
      server = createServer((_req, res) => {
        num_attempts += 1;
        res.writeHead(200, { 'content-type': 'application/json' });
        if (num_attempts < 3) { 
          res.end(JSON.stringify({
            ok: false,
            error: "fatal_error",
          }));
        } else {
          res.end(JSON.stringify({
            ok: true,
            url: `ws://localhost:${WSS_PORT}/`,
          }));
        }
      });
      server.listen(HTTP_PORT);
      await client.start();
      assert.equal(num_attempts, 3);
      await client.disconnect();
    });
  });
  describe('failure modes / unexpected messages sent to client', () => {
    let debugLoggerSpy = sinon.stub();
    const noop = () => {};
    beforeEach(() => {
      client = new SocketModeClient({ appToken: 'whatever', clientOptions: {
        slackApiUrl: `http://localhost:${HTTP_PORT}/`
      }, logger: {
        debug: debugLoggerSpy,
        info: noop,
        error: noop,
        getLevel: () => 'debug',
      }});
    });
    afterEach(() => {
      debugLoggerSpy.resetHistory();
    });
    it('should ignore binary messages', async () => {
      client.on('connected', () => {
        exposed_ws_connection.send(null);
      });
      await client.start();
      await sleep(10);
      assert.isTrue(debugLoggerSpy.calledWith(sinon.match('Unexpected binary message received')));
      await client.disconnect();
    });
    it('should debug-log that a malformed JSON message was received', async () => {
      client.on('connected', () => {
        exposed_ws_connection.send('');
      });
      await client.start();
      await sleep(10);
      assert.isTrue(debugLoggerSpy.calledWith(sinon.match('Unable to parse an incoming WebSocket message')));
      await client.disconnect();
    });
  });
  describe('lifecycle events', () => {
    beforeEach(() => {
      client = new SocketModeClient({ appToken: 'whatever', logLevel: LogLevel.ERROR, clientOptions: {
        slackApiUrl: `http://localhost:${HTTP_PORT}/`
      }});
    });
    it('raises connecting event during `start()`', async () => {
      let raised = false;
      client.on('connecting', () => { raised = true; });
      await client.start();
      assert.isTrue(raised);
      await client.disconnect();
    });
    it('raises authenticated event during `start()`', async () => {
      let raised = false;
      client.on('authenticated', () => { raised = true; });
      await client.start();
      assert.isTrue(raised);
      await client.disconnect();
    });
    it('raises connected event during `start()`', async () => {
      let raised = false;
      client.on('connected', () => { raised = true; });
      await client.start();
      assert.isTrue(raised);
      await client.disconnect();
    });
    it('raises disconnecting event during `disconnect()`', async () => {
      let raised = false;
      client.on('disconnecting', () => { raised = true; });
      await client.start();
      await client.disconnect();
      assert.isTrue(raised);
    });
    it('raises disconnected event after `disconnect()`', async () => {
      let raised = false;
      client.on('disconnected', () => { raised = true; });
      await client.start();
      await client.disconnect();
      assert.isTrue(raised);
    });
    describe('slack_event', () => {
      beforeEach(() => {
        // Disable auto reconnect for these tests
        client = new SocketModeClient({ appToken: 'whatever', logLevel: LogLevel.ERROR, autoReconnectEnabled: false, clientOptions: {
          slackApiUrl: `http://localhost:${HTTP_PORT}/`
        }});
      });
      afterEach(async () => {
        await client.disconnect();
      });
      // These tests check that specific type:disconnect events, of various reasons, sent by Slack backend are not raised as slack_events for apps to consume.
      DISCONNECT_REASONS.forEach((reason) => {
        it(`should not raise a type:disconnect reason:${reason} message as a slack_event`, async () => {
          let raised = false;
          client.on('connected', () => {
            exposed_ws_connection.send(JSON.stringify({type:'disconnect', reason}));
          });
          client.on('slack_event', () => {
            raised = true;
          });
          await client.start();
          await sleep(10);
          assert.isFalse(raised);
        });
      });
    });
    describe('including reconnection ability', () => {
      it('raises reconnecting event after peer disconnects underlying WS connection', async () => {
        const reconnectingWaiter = new Promise((res) => client.on('reconnecting', res));
        await client.start();
        // force a WS disconnect from the server
        exposed_ws_connection.terminate();
        // create another waiter for post-reconnect connected event
        const reconnectedWaiter = new Promise((res) => client.on('connected', res));
        // if we pass the point where the reconnectingWaiter succeeded, then we have verified the reconnecting event is raised
        // and this test can be considered passing. if we time out here, then that is an indication of a failure.
        await reconnectingWaiter;
        await reconnectedWaiter; // wait for this to ensure we dont raise an unexpected error by calling `disconnect` mid-reconnect.
        await client.disconnect();
      });
      DISCONNECT_REASONS.forEach((reason) => {
        it(`should reconnect gracefully if server sends a disconnect (reason: ${reason}) message`, async () => {
          await client.start();
          // force a WS disconnect from the server
          exposed_ws_connection.send(JSON.stringify({type:"disconnect", reason}));
          // create a waiter for post-reconnect connected event
          const reconnectedWaiter = new Promise((res) => client.on('connected', res));
          // if we pass the point where the reconnectedWaiter succeeded, then we have verified the reconnection succeeded
          // and this test can be considered passing. if we time out here, then that is an indication of a failure.
          await reconnectedWaiter;
          await client.disconnect();
        });
      });
    });
  });
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
