import EventEmitter from 'events';
import * as http from 'http';
import * as net from 'net';
import { assert } from 'chai';
import * as sinon from 'sinon';
import { createStreamRequest } from './test-helpers';
import { SlackEventAdapter } from './adapter';

// eslint-disable-next-line @typescript-eslint/no-var-requires
import getRandomPort = require('get-random-port');

// fixtures and test helpers
const workingSigningSecret = 'SIGNING_SECRET';
type Response = import('express-serve-static-core').Response;

describe('SlackEventAdapter', () => {
  describe('constructor', () => {
    it('should be an EventEmitter subclass', () => {
      const adapter = new SlackEventAdapter(workingSigningSecret);
      assert(adapter instanceof EventEmitter);
    });

    it('should fail without a signing secret', () => {
      assert.throws(() => {
        // eslint-disable-next-line no-new
        new (SlackEventAdapter as any)();
      }, TypeError);
    });

    it('should store the signing secret', () => {
      const adapter = new SlackEventAdapter(workingSigningSecret);
      assert.equal(adapter.signingSecret, workingSigningSecret);
    });
  });

  describe('#createServer()', () => {
    let adapter: SlackEventAdapter;

    beforeEach(() => {
      adapter = new SlackEventAdapter(workingSigningSecret);
    });

    it('should return a Promise of an http.Server', () => {
      return adapter.createServer().then((server) => {
        assert.instanceOf(server, http.Server);
      });
    });
  });

  describe('#start()', () => {
    let adapter: SlackEventAdapter;
    let portNumber: number;

    beforeEach((done) => {
      adapter = new SlackEventAdapter(workingSigningSecret);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getRandomPort((error, port) => {
        if (error) {
          return done(error);
        }
        portNumber = port;
        return done();
      });
    });

    afterEach(() => {
      return adapter.stop().catch();
    });

    it('should return a Promise for a started http.Server', () => {
      return adapter.start(portNumber).then((server) => {
        // only works in node >= 5.7.0
        // assert(server.listening);
        assert(server instanceof http.Server);
        assert.equal((server.address() as net.AddressInfo).port, portNumber);
      });
    });
  });

  describe('#expressMiddleware()', () => {
    let adapter: SlackEventAdapter;
    let emit: sinon.SinonStub;
    let res: sinon.SinonStubbedInstance<any>;

    beforeEach(() => {
      adapter = new SlackEventAdapter(workingSigningSecret);
      emit = sinon.stub();
      adapter.emit = emit;
      res = sinon.stub({
        setHeader() { },
        end() { },
      });
    });

    it('should return a function', () => {
      const middleware = adapter.expressMiddleware();
      assert.isFunction(middleware);
    });

    it('should emit on the adapter', (done) => {
      const middleware = adapter.expressMiddleware();
      const ts = Math.floor(Date.now() / 1000);
      const eventName = 'eventName';
      const event = {
        type: eventName,
        key: 'value',
      };
      const rawReq = {
        body: {
          event,
        },
      };
      const req = createStreamRequest(workingSigningSecret, ts, JSON.stringify(rawReq.body));
      emit.callsFake((arg1, arg2) => {
        assert.equal(eventName, arg1);
        assert.deepEqual(event, arg2);
        done();
      });
      middleware(req, res as unknown as Response, () => {
        assert(false);
        done(new Error());
      });
    });
  });

  describe('#requestListener()', () => {
    let adapter: SlackEventAdapter;

    beforeEach(() => {
      adapter = new SlackEventAdapter(workingSigningSecret);
    });

    it('should return a function', () => {
      const requestListener = adapter.requestListener();
      assert.isFunction(requestListener);
    });
  });
});
