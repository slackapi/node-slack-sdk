// import assert from 'assert';
// import http from 'http';
// import EventEmitter from 'events';
//
// import SlackEventAdapter from '../../src/adapter';

const assert = require('assert');
const http = require('http');
const EventEmitter = require('events');
const SlackEventAdapter = require('../../dist/adapter').default;

// fixtures and test helpers
const workingVerificationToken = 'VERIFICATION_TOKEN';
function fakeBindMiddlewareToAdapter(adapter) {
  // eslint-disable-next-line no-param-reassign
  adapter.middleware = function _fakeMiddleware() { };
}

describe('SlackEventAdapter', () => {
  describe('constructor', () => {
    it('should be an EventEmitter subclass', () => {
      const adapter = new SlackEventAdapter(workingVerificationToken);
      assert(adapter instanceof EventEmitter);
    });
    it('should fail without a verification token', () => {
      assert.throws(() => {
        const adapter = new SlackEventAdapter();  // eslint-disable-line no-unused-vars
      }, TypeError);
    });
    it('should store the verification token', () => {
      const adapter = new SlackEventAdapter(workingVerificationToken);
      assert.equal(adapter.verificationToken, workingVerificationToken);
    });
  });

  describe('#expressServer()', () => {
    let adapter;
    beforeEach(() => {
      adapter = new SlackEventAdapter(workingVerificationToken);
    });
    afterEach(() => {
      adapter = null;
    });

    it('should reject if the adapter does not have middleware bound', () => { // eslint-disable-line arrow-body-style
      return adapter.expressServer()
        .then((server) => {
          assert.fail(server, null, 'a server was created');
        }).catch((error) => {
          assert(error instanceof Error);
        });
    });

    it('should return a Promise of an http.Server', () => { // eslint-disable-line arrow-body-style
      fakeBindMiddlewareToAdapter(adapter);
      return adapter.expressServer().then(server => assert(server instanceof http.Server));
    });

    it('should throw if the express or body-parser packages are not found');
  });
});
