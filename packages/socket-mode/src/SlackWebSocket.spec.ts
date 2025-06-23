import { ConsoleLogger } from '@slack/logger';
import { assert } from 'chai';
import EventEmitter from 'eventemitter3';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

proxyquire.noPreserveCache();

import logModule from './logger';

// A slightly spruced up event emitter aiming at mocking out the `ws` library's `WebSocket` class
class WSMock extends EventEmitter {
  // biome-ignore lint/suspicious/noExplicitAny: event listeners can accept any args
  addEventListener(evt: string, fn: (...args: any[]) => void) {
    this.addListener.call(this, evt, fn);
  }
}

describe('SlackWebSocket', () => {
  const sandbox = sinon.createSandbox();
  let SlackWebSocket: typeof import('./SlackWebSocket').SlackWebSocket;
  beforeEach(() => {
    SlackWebSocket = proxyquire.load('./SlackWebSocket', {
      ws: {
        WebSocket: WSMock,
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
      assert.isTrue(logFactory.called);
    });
    it('should not set a default logger if one provided', () => {
      new SlackWebSocket({
        url: 'https://whatever.com',
        client: new EventEmitter(),
        clientPingTimeoutMS: 1,
        serverPingTimeoutMS: 1,
        logger: new ConsoleLogger(),
      });
      assert.isFalse(logFactory.called);
    });
  });
  describe('WebSocket event handling', () => {
    it('should call disconnect() if websocket emits an error', async () => {
      // an exposed event emitter pretending its a websocket
      const ws = new WSMock();
      // mock out the `ws` library and have it return our event emitter mock
      SlackWebSocket = proxyquire.load('./SlackWebSocket', {
        ws: {
          WebSocket: class Fake {
            constructor() {
              // biome-ignore lint/correctness/noConstructorReturn: for test mocking purposes
              return ws;
            }
          },
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
      ws.emit('error', { error: new Error('boom') });
      sinon.assert.calledOnce(discStub);
    });
  });
});
