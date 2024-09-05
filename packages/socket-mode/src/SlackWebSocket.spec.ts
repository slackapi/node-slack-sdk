import { ConsoleLogger } from '@slack/logger';
import { assert } from 'chai';
import EventEmitter from 'eventemitter3';
import sinon from 'sinon';

import { SlackWebSocket } from './SlackWebSocket';
import logModule from './logger';

describe('SlackWebSocket', () => {
  const sandbox = sinon.createSandbox();

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
});
