const { assert } = require('chai');
const { SocketModeClient } = require('../src/SocketModeClient');
const { LogLevel } = require('../src/logger');
const { WebSocketServer } = require('ws');
const { createServer } = require('node:http');
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
      res.end(
        JSON.stringify({
          ok: true,
          url: `ws://localhost:${WSS_PORT}/`,
        }),
      );
    });
    server.listen(HTTP_PORT);
    wss = new WebSocketServer({ port: WSS_PORT });
    wss.on('connection', (ws) => {
      ws.on('error', (err) => {
        assert.fail(err);
      });
      // Send `Event.ServerHello`
      ws.send(JSON.stringify({ type: 'hello' }));
      exposed_ws_connection = ws;
    });
  });
  afterEach(async () => {
    if (server) server.close();
    server = null;
    if (wss) wss.close();
    wss = null;
    exposed_ws_connection = null;
    if (client) {
      // if client is still defined, force disconnect, in case a test times out and the test was unable to call disconnect
      // prevents test process from freezing due to open connections
      await client.disconnect();
    }
    client = null;
  });
  describe('establishing connection, receiving valid messages', () => {
    beforeEach(() => {
      client = new SocketModeClient({
        appToken: 'whatever',
        logLevel: LogLevel.ERROR,
        clientOptions: {
          slackApiUrl: `http://localhost:${HTTP_PORT}/`,
        },
      });
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
        exposed_ws_connection.send(
          JSON.stringify({
            type: 'integration-test',
            envelope_id: 12345,
          }),
        );
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
  describe('`apps.connections.open` API failure modes', () => {
    beforeEach(() => {
      client = new SocketModeClient({
        appToken: 'whatever',
        logLevel: LogLevel.ERROR,
        clientOptions: {
          slackApiUrl: `http://localhost:${HTTP_PORT}/`,
        },
        clientPingTimeout: 25,
      });
    });
    it('should retry if retrieving a WSS URL fails', async () => {
      // Shut down the main WS-endpoint-retrieval server - we will customize its behaviour for this test
      server.close();
      let num_attempts = 0;
      server = createServer((_req, res) => {
        num_attempts += 1;
        res.writeHead(200, { 'content-type': 'application/json' });
        if (num_attempts < 3) {
          res.end(
            JSON.stringify({
              ok: false,
              error: 'fatal_error',
            }),
          );
        } else {
          res.end(
            JSON.stringify({
              ok: true,
              url: `ws://localhost:${WSS_PORT}/`,
            }),
          );
        }
      });
      server.listen(HTTP_PORT);
      await client.start();
      assert.equal(num_attempts, 3);
      await client.disconnect();
    });
  });
  describe('unexpected socket messages sent to client', () => {
    const debugLoggerSpy = sinon.stub(); // add the following to expose further logging: .callsFake(console.log);
    const noop = () => {};
    beforeEach(() => {
      client = new SocketModeClient({
        appToken: 'whatever',
        clientOptions: {
          slackApiUrl: `http://localhost:${HTTP_PORT}/`,
        },
        logLevel: 'debug',
        logger: {
          debug: debugLoggerSpy,
          info: noop,
          error: noop,
          getLevel: () => 'debug',
        },
      });
    });
    afterEach(() => {
      debugLoggerSpy.resetHistory();
    });
    it('should ignore binary messages', async () => {
      client.on('connected', () => {
        exposed_ws_connection.send(Buffer.from([1, 2, 3, 4]), { binary: true });
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
    it('should maintain one serial reconnection attempt if WSS server sends unexpected HTTP response during handshake, like a 409', async () => {
      // test for https://github.com/slackapi/node-slack-sdk/issues/2094
      // override socket mode client instance with lower client ping timeout, which controls reconnection rate
      client = new SocketModeClient({
        appToken: 'whatever',
        clientOptions: {
          slackApiUrl: `http://localhost:${HTTP_PORT}/`,
        },
        clientPingTimeout: 20, // controls reconnection rate
        logLevel: 'debug',
      });
      // shut down the default mock WS server used in these tests as we will customize its behaviour in this test
      wss.close();
      wss = null;
      // custom HTTP server that blows up during initial WS handshake
      const badServer = createServer((_req, res) => {
        res.writeHead(409, { 'content-type': 'application/json' });
        res.end(
          JSON.stringify({
            message: 'Unexpected server response: 409',
          }),
        );
      });
      badServer.listen(WSS_PORT);
      let closed = 0;
      // the `close` event is raised every time the websocket server returns an error, so let's keep track of how often this event is emited and use that to infer correct reconnection attempt counts / behaviour
      client.on('close', () => {
        closed++;
      });
      // do not use await here, since `start()` won't return until the connection is established. we are intentionally testing connection establishment failure, so that will never finish. so, let's run this in a rogue "thread", e.g. fire off an async method and let it do its thing!
      client.start();

      const start_time = Date.now();
      let retries = 0;
      do {
        await sleep(2);
        retries = closed;
      } while (retries < 2 && Date.now() - start_time < 50);
      // after less then 50 milliseconds, with a timeout of 20ms, we would expect 2 retries.
      // crucially, the bug reported in https://github.com/slackapi/node-slack-sdk/issues/2094 shows that on every reconnection attempt, we spawn _another_ websocket instance, which attempts to reconnect forever and is never cleaned up.
      // effectively: with each reconnection attempt, we double the number of websockets, eventually causing crashes / out-of-memory issues / rate-limiting from Slack APIs.
      // with the bug not fixed, this assertion fails as `close` event was emitted 4 times! if we waited another 20ms, we would see this event count double again (8), and so on.
      await client.disconnect();
      await new Promise((res, rej) => {
        // shut down the bad server
        badServer.close((err) => {
          if (err) rej(err);
          else res();
        });
      });
      assert.equal(retries, 2, 'unexpected number of times `close` event was raised during reconnection!');
    });
  });
  describe('lifecycle events', () => {
    beforeEach(() => {
      client = new SocketModeClient({
        appToken: 'whatever',
        logLevel: LogLevel.ERROR,
        clientOptions: {
          slackApiUrl: `http://localhost:${HTTP_PORT}/`,
        },
        clientPingTimeout: 25,
      });
    });
    it('raises connecting event during `start()`', async () => {
      let raised = false;
      client.on('connecting', () => {
        raised = true;
      });
      await client.start();
      assert.isTrue(raised);
      await client.disconnect();
    });
    it('raises authenticated event during `start()`', async () => {
      let raised = false;
      client.on('authenticated', () => {
        raised = true;
      });
      await client.start();
      assert.isTrue(raised);
      await client.disconnect();
    });
    it('raises connected event during `start()`', async () => {
      let raised = false;
      client.on('connected', () => {
        raised = true;
      });
      await client.start();
      assert.isTrue(raised);
      await client.disconnect();
    });
    it('raises disconnecting event during `disconnect()`', async () => {
      let raised = false;
      client.on('disconnecting', () => {
        raised = true;
      });
      await client.start();
      await client.disconnect();
      assert.isTrue(raised);
    });
    it('raises disconnected event after `disconnect()`', async () => {
      let raised = false;
      client.on('disconnected', () => {
        raised = true;
      });
      await client.start();
      await client.disconnect();
      assert.isTrue(raised);
    });
    describe('slack_event', () => {
      beforeEach(() => {
        // Disable auto reconnect for these tests
        client = new SocketModeClient({
          appToken: 'whatever',
          logLevel: LogLevel.ERROR,
          autoReconnectEnabled: false,
          clientOptions: {
            slackApiUrl: `http://localhost:${HTTP_PORT}/`,
          },
        });
      });
      afterEach(async () => {
        await client.disconnect();
      });
      // These tests check that specific type:disconnect events, of various reasons, sent by Slack backend are not raised as slack_events for apps to consume.
      for (const reason of DISCONNECT_REASONS) {
        it(`should not raise a type:disconnect reason:${reason} message as a slack_event`, async () => {
          let raised = false;
          client.on('connected', () => {
            exposed_ws_connection.send(JSON.stringify({ type: 'disconnect', reason }));
          });
          client.on('slack_event', () => {
            raised = true;
          });
          await client.start();
          await sleep(10);
          assert.isFalse(raised);
        });
      }
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
      for (const reason of DISCONNECT_REASONS) {
        it(`should reconnect gracefully if server sends a disconnect (reason: ${reason}) message`, async () => {
          await client.start();
          // force a WS disconnect from the server
          exposed_ws_connection.send(JSON.stringify({ type: 'disconnect', reason }));
          // create a waiter for post-reconnect connected event
          const reconnectedWaiter = new Promise((res) => client.on('connected', res));
          // if we pass the point where the reconnectedWaiter succeeded, then we have verified the reconnection succeeded
          // and this test can be considered passing. if we time out here, then that is an indication of a failure.
          await reconnectedWaiter;
          await client.disconnect();
        });
      }
      describe('related to ping/pong events', () => {
        beforeEach(() => {
          client = new SocketModeClient({
            appToken: 'whatever',
            logLevel: LogLevel.ERROR,
            clientOptions: {
              slackApiUrl: `http://localhost:${HTTP_PORT}/`,
            },
            clientPingTimeout: 25,
            serverPingTimeout: 25,
            pingPongLoggingEnabled: false,
          });
        });
        it('should reconnect if server does not send `ping` message within specified server ping timeout', async () => {
          await client.start();
          // create a waiter for post-reconnect connected event
          const reconnectedWaiter = new Promise((res) => client.on('connected', res));
          exposed_ws_connection.ping();
          // we set server and client ping timeout to 25, so waiting for 50 + a bit should force a reconnect
          await sleep(60);
          // if we pass the point where the reconnectedWaiter succeeded, then we have verified the reconnection succeeded
          // and this test can be considered passing. if we time out here, then that is an indication of a failure.
          await reconnectedWaiter;
          await client.disconnect();
        });
        it('should reconnect if server does not respond with `pong` message within specified client ping timeout ', async () => {
          wss.close();
          // override the web socket server so that it DOESNT auto-respond to ping messages with a pong
          wss = new WebSocketServer({ port: WSS_PORT, autoPong: false });
          wss.on('connection', (ws) => {
            ws.on('error', (err) => {
              assert.fail(err);
            });
            // Send `Event.ServerHello`
            ws.send(JSON.stringify({ type: 'hello' }));
            exposed_ws_connection = ws;
          });
          await client.start();
          // create a waiter for post-reconnect connected event
          const reconnectedWaiter = new Promise((res) => client.on('connected', res));
          // we set server and client ping timeout to 25, so waiting for 50 + a bit should force a reconnect
          await sleep(60);
          // if we pass the point where the reconnectedWaiter succeeded, then we have verified the reconnection succeeded
          // and this test can be considered passing. if we time out here, then that is an indication of a failure.
          await reconnectedWaiter;
          await client.disconnect();
        });
        it('should reconnect if server does not respond with `pong` message within specified client ping timeout after initially responding with `pong`', async () => {
          wss.close();
          // override the web socket server so that it DOESNT auto-respond to ping messages with a pong, except for the first time
          let hasPonged = false;
          wss = new WebSocketServer({ port: WSS_PORT, autoPong: false });
          wss.on('connection', (ws) => {
            ws.on('error', (err) => {
              assert.fail(err);
            });
            ws.on('ping', () => {
              // respond to a pong once
              // we do this to simulate the server initially responding well to pings, but then failing to do so at some point
              if (!hasPonged) {
                hasPonged = true;
                ws.pong();
              }
            });
            // Send `Event.ServerHello`
            ws.send(JSON.stringify({ type: 'hello' }));
            exposed_ws_connection = ws;
          });
          await client.start();
          // create a waiter for post-reconnect connected event
          const reconnectedWaiter = new Promise((res) => client.on('connected', res));
          // we set server and client ping timeout to 25, so waiting for 50 + a bit should force a reconnect
          await sleep(60);
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
  return new Promise((resolve) => setTimeout(resolve, ms));
}
