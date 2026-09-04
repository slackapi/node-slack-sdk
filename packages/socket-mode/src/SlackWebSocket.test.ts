import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it } from 'node:test';
import { ConsoleLogger } from '@slack/logger';
import EventEmitter from 'eventemitter3';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import { CloseEvent, ErrorEvent, MessageEvent } from 'undici';

proxyquire.noPreserveCache();

import logModule from './logger';

// Minimal mock of undici's WebSocket (EventTarget-based)
class WSMock extends EventTarget {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;
  readyState = 1;
  close() {}
  send(_data: string) {}
}

describe('SlackWebSocket', () => {
  const sandbox = sinon.createSandbox();
  let SlackWebSocket: typeof import('./SlackWebSocket').SlackWebSocket;
  beforeEach(() => {
    SlackWebSocket = proxyquire.load('./SlackWebSocket', {
      undici: {
        WebSocket: WSMock,
        CloseEvent,
        ErrorEvent,
        MessageEvent,
        ping: () => {},
      },
    }).SlackWebSocket;
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('constructor', () => {
    let logFactory: sinon.SinonStub;
    beforeEach(() => {
      logFactory = sandbox.stub(logModule, 'getLogger');
    });
    it('should set a default logger if none provided', () => {
      new SlackWebSocket({
        url: 'https://whatever.com',
        client: new EventEmitter(),
        clientPingTimeoutMS: 1,
        serverPingTimeoutMS: 1,
      });
      assert.strictEqual(logFactory.called, true);
    });
    it('should not set a default logger if one provided', () => {
      new SlackWebSocket({
        url: 'https://whatever.com',
        client: new EventEmitter(),
        clientPingTimeoutMS: 1,
        serverPingTimeoutMS: 1,
        logger: new ConsoleLogger(),
      });
      assert.strictEqual(logFactory.called, false);
    });
  });
  describe('WebSocket event handling', () => {
    it('should call disconnect() if websocket emits an error', async () => {
      const ws = new WSMock();
      SlackWebSocket = proxyquire.load('./SlackWebSocket', {
        undici: {
          WebSocket: class Fake {
            constructor() {
              // biome-ignore lint/correctness/noConstructorReturn: for test mocking purposes
              return ws;
            }
          },
          CloseEvent,
          ErrorEvent,
          MessageEvent,
          ping: () => {},
        },
      }).SlackWebSocket;
      const sws = new SlackWebSocket({
        url: 'whatevs',
        client: new EventEmitter(),
        clientPingTimeoutMS: 1,
        serverPingTimeoutMS: 1,
      });
      const discStub = sinon.stub(sws, 'disconnect');
      sws.connect();
      ws.dispatchEvent(new ErrorEvent('error', { error: new Error('boom'), message: 'boom' }));
      sinon.assert.calledOnce(discStub);
    });

    it('should stop heartbeat monitoring during an intentional disconnect', () => {
      const ws = new WSMock();
      SlackWebSocket = proxyquire.load('./SlackWebSocket', {
        undici: {
          WebSocket: class Fake {
            constructor() {
              // biome-ignore lint/correctness/noConstructorReturn: for test mocking purposes
              return ws;
            }
          },
          CloseEvent,
          ErrorEvent,
          MessageEvent,
          ping: () => {},
        },
      }).SlackWebSocket;
      const logger = new ConsoleLogger();
      const warn = sinon.stub(logger, 'warn');
      const clock = sandbox.useFakeTimers();
      const sws = new SlackWebSocket({
        url: 'whatevs',
        client: new EventEmitter(),
        clientPingTimeoutMS: 5000,
        serverPingTimeoutMS: 30000,
        logger,
      });

      sws.connect();
      ws.dispatchEvent(new Event('open'));
      sws.disconnect({ suppressHeartbeat: true });
      clock.tick(20000);

      sinon.assert.neverCalledWithMatch(warn, "A pong wasn't received from the server");
    });
  });

  describe('disconnect() with an unresponsive peer', () => {
    // Peer accepts our close frame but never replies with its own: close() moves to CLOSING
    // and no 'close' event is ever dispatched.
    class DeadPeerWS extends EventTarget {
      static CONNECTING = 0;
      static OPEN = 1;
      static CLOSING = 2;
      static CLOSED = 3;
      readyState = 1;
      closeCalls = 0;
      close() {
        this.closeCalls += 1;
        this.readyState = DeadPeerWS.CLOSING;
      }
      send(_data: string) {}
    }

    it('should force cleanup and emit "close" when the peer never replies with a close frame', () => {
      const clock = sandbox.useFakeTimers();
      const ws = new DeadPeerWS();
      SlackWebSocket = proxyquire.load('./SlackWebSocket', {
        undici: {
          WebSocket: class Fake {
            static CONNECTING = 0;
            static OPEN = 1;
            static CLOSING = 2;
            static CLOSED = 3;
            constructor() {
              // biome-ignore lint/correctness/noConstructorReturn: for test mocking purposes
              return ws;
            }
          },
          CloseEvent,
          ErrorEvent,
          MessageEvent,
          ping: () => {},
        },
      }).SlackWebSocket;
      const client = new EventEmitter();
      let closeEmitted = false;
      client.on('close', () => {
        closeEmitted = true;
      });
      const sws = new SlackWebSocket({
        url: 'ws://127.0.0.1/',
        client,
        clientPingTimeoutMS: 60000,
        serverPingTimeoutMS: 60000,
      });
      sws.connect();

      sws.disconnect();
      assert.strictEqual(ws.closeCalls, 1, 'a close frame should have been sent to the peer');
      assert.strictEqual(sws.readyState, DeadPeerWS.CLOSING, 'socket should be CLOSING after sending close frame');
      assert.strictEqual(closeEmitted, false, 'close must not fire before the handshake completes or times out');

      clock.tick(60000);

      assert.strictEqual(
        closeEmitted,
        true,
        'expected disconnect() to force cleanup and emit "close" after the peer failed to reply',
      );
    });
  });

  describe('cleanup() with a captured socket', () => {
    it('should destroy the captured underlying socket during cleanup', () => {
      const sws = new SlackWebSocket({
        url: 'ws://127.0.0.1/',
        client: new EventEmitter(),
        clientPingTimeoutMS: 1,
        serverPingTimeoutMS: 1,
      });
      const destroy = sandbox.spy();
      (sws as unknown as { defaultSocket: { destroy: () => void; destroyed: boolean } }).defaultSocket = {
        destroy,
        destroyed: false,
      };

      sws.disconnect();

      sinon.assert.calledOnce(destroy);
    });
  });

  describe('buildDefaultDispatcher() connect hook', () => {
    type ConnectCb = (err: Error | null, socket: unknown) => void;
    type ConnectFn = (opts: unknown, cb: ConnectCb) => void;

    function loadWith(baseConnect: ConnectFn) {
      let capturedConnect!: ConnectFn;
      const SWS = proxyquire.load('./SlackWebSocket', {
        undici: {
          WebSocket: WSMock,
          CloseEvent,
          ErrorEvent,
          MessageEvent,
          ping: () => {},
          buildConnector: () => baseConnect,
          Agent: class {
            constructor(o: { connect: ConnectFn }) {
              capturedConnect = o.connect;
            }
          },
        },
      }).SlackWebSocket;
      const sws = new SWS({
        url: 'ws://127.0.0.1/',
        client: new EventEmitter(),
        clientPingTimeoutMS: 1,
        serverPingTimeoutMS: 1,
      });
      sws.connect(); // no dispatcher provided => builds the default dispatcher => captures the hook
      return { sws, invoke: (cb: ConnectCb) => capturedConnect({}, cb) };
    }

    it('should capture the socket and call back with (null, socket) on success', () => {
      const fakeSocket = { destroy() {}, destroyed: false };
      const { sws, invoke } = loadWith((_opts, cb) => cb(null, fakeSocket));
      let cbErr: unknown = 'unset';
      let cbSocket: unknown = 'unset';
      invoke((err, socket) => {
        cbErr = err;
        cbSocket = socket;
      });
      assert.strictEqual(cbErr, null);
      assert.strictEqual(cbSocket, fakeSocket);
      assert.strictEqual((sws as unknown as { defaultSocket: unknown }).defaultSocket, fakeSocket);
    });

    it('should propagate the connector error and not capture a socket', () => {
      const boom = new Error('connect failed');
      const { sws, invoke } = loadWith((_opts, cb) => cb(boom, null));
      let received: unknown = 'unset';
      invoke((err) => {
        received = err;
      });
      assert.strictEqual(received, boom);
      assert.strictEqual((sws as unknown as { defaultSocket: unknown }).defaultSocket, null);
    });

    it('should synthesize an error when the connector yields no socket and no error', () => {
      const { sws, invoke } = loadWith((_opts, cb) => cb(null, null));
      let received: unknown;
      invoke((err) => {
        received = err;
      });
      assert.ok(received instanceof Error);
      assert.match((received as Error).message, /returned no socket/);
      assert.strictEqual((sws as unknown as { defaultSocket: unknown }).defaultSocket, null);
    });
  });
});
