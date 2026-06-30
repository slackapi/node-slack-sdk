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
  });
});
