require('mocha');
const http = require('http');
const { assert } = require('chai');
const sinon = require('sinon');
const nop = require('nop');
const getRandomPort = require('get-random-port');

const { createStreamRequest, delayed } = require('../test/helpers');
const { default: SlackMessageAdapter } = require('./adapter');
const { errorCodes } = require('./index');

// fixtures
const workingSigningSecret = 'SIGNING_SECRET';
const workingRawBody = 'payload=%7B%22type%22%3A%22interactive_message%22%7D';

// test suite
describe('SlackMessageAdapter', function () {
  describe('constructor', function () {
    it('should build an instance', function () {
      const adapter = new SlackMessageAdapter(workingSigningSecret);
      assert.instanceOf(adapter, SlackMessageAdapter);
      assert.equal(adapter.syncResponseTimeout, 2500);
    });
    it('should fail without a signing secret', function () {
      assert.throws(function () {
        const adapter = new SlackMessageAdapter();
      }, TypeError);
    });
    it('should allow configuring of the synchronous response timeout', function () {
      const newValue = 20;
      const adapter = new SlackMessageAdapter(workingSigningSecret, {
        syncResponseTimeout: newValue
      });
      assert.equal(adapter.syncResponseTimeout, newValue);
    });
    it('should fail when the synchronous response timeout is out of range', function () {
      assert.throws(function () {
        const a = new SlackMessageAdapter(workingSigningSecret, { syncResponseTimeout: 0 });
      }, TypeError);
      assert.throws(function () {
        const a = new SlackMessageAdapter(workingSigningSecret, { syncResponseTimeout: 3001 });
      }, TypeError);
    });
  });

  describe('#createServer()', function () {
    beforeEach(function () {
      this.adapter = new SlackMessageAdapter(workingSigningSecret);
    });

    it('should return a Promise of an http.Server', function () {
      return this.adapter.createServer().then(function (server) {
        assert.instanceOf(server, http.Server);
      });
    });
  });

  describe('#start()', function () {
    beforeEach(function (done) {
      const self = this;
      self.adapter = new SlackMessageAdapter(workingSigningSecret);
      getRandomPort(function (error, port) {
        if (error) return done(error);
        self.portNumber = port;
        return done();
      });
    });
    afterEach(function () {
      return this.adapter.stop().catch(nop);
    });
    it('should return a Promise for a started http.Server', function () {
      const self = this;
      return this.adapter.start(self.portNumber).then(function (server) {
        // only works in node >= 5.7.0
        // assert(server.listening);
        assert.equal(server.address().port, self.portNumber);
      });
    });
  });

  describe('#stop()', function () {
    beforeEach(function (done) {
      const self = this;
      self.adapter = new SlackMessageAdapter(workingSigningSecret);
      getRandomPort(function (error, port) {
        if (error) return done(error);
        return self.adapter.start(port)
          .then(function (server) {
            self.server = server;
            done();
          })
          .catch(done);
      });
    });
    afterEach(function () {
      return this.adapter.stop().catch(nop);
    });
    it('should return a Promise and the server should be stopped', function () {
      const self = this;
      return this.adapter.stop().then(function () {
        assert(!self.server.listening);
      });
    });
  });

  describe('#expressMiddleware()', function () {
    beforeEach(function () {
      this.adapter = new SlackMessageAdapter(workingSigningSecret);
      this.next = sinon.stub();
      this.dispatch = sinon.stub();
      this.res = sinon.stub({
        setHeader: function () { },
        end: function () { }
      });
      this.errFn = sinon.stub();
    });

    it('should return a function', function () {
      const middleware = this.adapter.expressMiddleware();
      assert.isFunction(middleware);
    });
    it('should verify correctly signed request bodies', function (done) {
      const ts = Math.floor(Date.now() / 1000);
      const adapter = this.adapter;
      const middleware = adapter.expressMiddleware();
      const dispatch = this.dispatch;
      const res = this.res;
      const next = this.next;
      adapter.dispatch = dispatch;
      // Create streamed request
      const req = createStreamRequest(workingSigningSecret, ts, workingRawBody);

      dispatch.resolves({ status: 200 });
      res.end.callsFake(function () {
        assert(dispatch.called);
        assert.equal(res.statusCode, 200);
        done();
      });
      middleware(req, res, next);
    });
  });

  describe('#requestListener()', function () {
    beforeEach(function () {
      this.adapter = new SlackMessageAdapter(workingSigningSecret);
    });
    it('should return a function', function () {
      const middleware = this.adapter.requestListener();
      assert.isFunction(middleware);
    });
  });

  // helpers
  /**
   * Encapsulates knowledge of adapter handler registration internals and asserts that a handler
   * was registered.
   *
   * @param {SlackMessageAdapter} adapter actual instance where handler should be registered
   * @param {Function} handler expected registered function
   * @param {Object} [constraints] expected constraints for which handler should be registered
   */
  function assertHandlerRegistered(adapter, handler, constraints) {
    let callbackEntry;

    assert.isNotEmpty(adapter.callbacks);
    callbackEntry = adapter.callbacks.find(function (aCallbackEntry) {
      return handler === aCallbackEntry[1];
    });
    assert.isOk(callbackEntry);
    if (constraints) {
      assert.include(callbackEntry[0], constraints);
    }
  }

  /**
   * Encapsulates knowledge of adapter handler registration internals and unregisters all handlers.
   * @param {SlackMessageAdapter} adapter
   */
  function unregisterAllHandlers(adapter) {
    adapter.callbacks = [];
  }

  // shared tests
  function shouldRegisterWithCallbackId(methodName) {
    describe('when registering with a callback_id', function () {
      beforeEach(function () {
        this.handler = function () { };
      });
      it('a plain string callback_id registers successfully', function () {
        this.adapter[methodName]('my_callback', this.handler);
        assertHandlerRegistered(this.adapter, this.handler);
      });
      it('a RegExp callback_id registers successfully', function () {
        this.adapter[methodName](/\w+_callback/, this.handler);
        assertHandlerRegistered(this.adapter, this.handler);
      });
      it('invalid callback_id types throw on registration', function () {
        const handler = this.handler;
        const adapter = this.adapter;
        assert.throws(function () {
          adapter[methodName](5, handler);
        }, TypeError);
        assert.throws(function () {
          adapter[methodName](true, handler);
        }, TypeError);
        assert.throws(function () {
          adapter[methodName]([], handler);
        }, TypeError);
        assert.throws(function () {
          adapter[methodName](null, handler);
        }, TypeError);
        assert.throws(function () {
          adapter[methodName](undefined, handler);
        }, TypeError);
      });
      it('non-function handlers throw on registration', function () {
        const adapter = this.adapter;
        assert.throws(function () {
          adapter[methodName]('my_callback', 5);
        }, TypeError);
      });
    });
  }

  describe('#action()', function () {
    beforeEach(function () {
      this.adapter = new SlackMessageAdapter(workingSigningSecret);
    });
    it('should fail action registration without handler', function () {
      assert.throws(function () {
        this.adapter.action('my_callback');
      }, TypeError);
    });

    // execute shared tests
    shouldRegisterWithCallbackId('action');

    describe('when registering with a complex set of constraints', function () {
      beforeEach(function () {
        this.actionHandler = function () { };
      });
      it('should register with valid type constraints successfully', function () {
        const adapter = this.adapter;
        const actionHandler = this.actionHandler;
        const constraintsSet = [
          { type: 'button' },
          { type: 'select' },
          { type: 'dialog_submission' }
        ];
        constraintsSet.forEach(function (constraints) {
          adapter.action(constraints, actionHandler);
          assertHandlerRegistered(adapter, actionHandler, constraints);
          unregisterAllHandlers(adapter);
        });
      });
      it('should register with unfurl constraint successfully', function () {
        const constraints = { unfurl: true };
        this.adapter.action(constraints, this.actionHandler);
        assertHandlerRegistered(this.adapter, this.actionHandler, constraints);
      });
      it('should register with blockId constraints successfully', function () {
        const constraints = { blockId: 'my_block' };
        this.adapter.action(constraints, this.actionHandler);
        assertHandlerRegistered(this.adapter, this.actionHandler, constraints);
      });
      it('invalid block_id types throw on registration', function () {
        const handler = this.handler;
        const adapter = this.adapter;
        assert.throws(function () {
          adapter.action({ blockId: 5 }, handler);
        }, TypeError);
        assert.throws(function () {
          adapter.action({ blockId: true }, handler);
        }, TypeError);
        assert.throws(function () {
          adapter.action({ blockId: [] }, handler);
        }, TypeError);
        // TODO: do the following two tests even work?
        assert.throws(function () {
          adapter.action({ blockId: null }, handler);
        }, TypeError);
        assert.throws(function () {
          adapter.action({ blockId: undefined }, handler);
        }, TypeError);
      });
      it('should register with actionId constraints successfully', function () {
        const constraints = { actionId: 'my_action' };
        this.adapter.action(constraints, this.actionHandler);
        assertHandlerRegistered(this.adapter, this.actionHandler, constraints);
      });
      it('invalid action_id types throw on registration', function () {
        const handler = this.handler;
        const adapter = this.adapter;
        assert.throws(function () {
          adapter.action({ actionId: 5 }, handler);
        }, TypeError);
        assert.throws(function () {
          adapter.action({ actionId: true }, handler);
        }, TypeError);
        assert.throws(function () {
          adapter.action({ actionId: [] }, handler);
        }, TypeError);
        // TODO: do the following two tests even work?
        assert.throws(function () {
          adapter.action({ actionId: null }, handler);
        }, TypeError);
        assert.throws(function () {
          adapter.action({ actionId: undefined }, handler);
        }, TypeError);
      });
      it('should register with compound block constraints successfully', function () {
        const constraints = { blockId: 'my_block', actionId: 'wham' };
        this.adapter.action(constraints, this.actionHandler);
        assertHandlerRegistered(this.adapter, this.actionHandler, constraints);
      });
      it('should register with valid compound constraints successfully', function () {
        const constraints = { callbackId: 'my_callback', type: 'button' };
        this.adapter.action(constraints, this.actionHandler);
        assertHandlerRegistered(this.adapter, this.actionHandler, constraints);
      });
      it('should throw when registering with invalid compound constraints', function () {
        const adapter = this.adapter;
        const actionHandler = this.actionHandler;
        // number isn't valid callbackId, all types are valid
        const constraints = { callbackId: 111, type: 'button' };
        assert.throws(function () {
          adapter.action(constraints, actionHandler);
        }, TypeError);
      });
    });
  });

  describe('#shortcut()', function () {
    beforeEach(function () {
      this.adapter = new SlackMessageAdapter(workingSigningSecret);
    });
    it('should fail shortcut registration without handler', function () {
      assert.throws(function () {
        this.adapter.shortcut('my_callback');
      }, TypeError);
    });

    // execute shared tests
    shouldRegisterWithCallbackId('shortcut');

    describe('when registering with a complex set of constraints', function () {
      beforeEach(function () {
        this.shortcutHandler = function () { };
      });
      it('should register with valid type constraints successfully', function () {
        const adapter = this.adapter;
        const shortcutHandler = this.shortcutHandler;
        const constraintsSet = [
          { type: 'shortcut' },
        ];
        constraintsSet.forEach(function (constraints) {
          adapter.shortcut(constraints, shortcutHandler);
          assertHandlerRegistered(adapter, shortcutHandler, constraints);
          unregisterAllHandlers(adapter);
        });
      });
      it('should register with valid compound constraints successfully', function () {
        const constraints = { callbackId: 'my_callback', type: 'shortcut' };
        this.adapter.shortcut(constraints, this.shortcutHandler);
        assertHandlerRegistered(this.adapter, this.shortcutHandler, constraints);
      });
      it('should throw when registering with invalid compound constraints', function () {
        const adapter = this.adapter;
        const shortcutHandler = this.shortcutHandler;
        // number isn't valid callbackId, all types are valid
        const constraints = { callbackId: 111, type: 'shortcut' };
        assert.throws(function () {
          adapter.shortcut(constraints, shortcutHandler);
        }, TypeError);
      });
    });
  });

  describe('#options()', function () {
    beforeEach(function () {
      this.adapter = new SlackMessageAdapter(workingSigningSecret);
    });
    it('should fail options registration without handler', function () {
      assert.throws(function () {
        this.adapter.options('my_callback');
      }, TypeError);
    });

    // execute shared tests
    shouldRegisterWithCallbackId('options');

    describe('when registering with a complex set of constraints', function () {
      beforeEach(function () {
        this.optionsHandler = function () { };
      });
      it('should register with valid from constraints successfully', function () {
        const adapter = this.adapter;
        const optionsHandler = this.optionsHandler;
        const constraintsSet = [
          { within: 'interactive_message' },
          { within: 'dialog' }
        ];
        constraintsSet.forEach(function (constraints) {
          adapter.options(constraints, optionsHandler);
          assertHandlerRegistered(adapter, optionsHandler, constraints);
          unregisterAllHandlers(adapter);
        });
      });
      it('should throw when registering with invalid within constraints', function () {
        const adapter = this.adapter;
        const optionsHandler = this.optionsHandler;
        const constraints = { within: 'not_a_real_options_source' };
        assert.throws(function () {
          adapter.options(constraints, optionsHandler);
        }, TypeError);
      });
      it('should register with valid compound constraints successfully', function () {
        const constraints = { callbackId: 'my_callback', within: 'dialog' };
        this.adapter.options(constraints, this.optionsHandler);
        assertHandlerRegistered(this.adapter, this.optionsHandler, constraints);
      });
      it('should throw when registering with invalid compound constraints', function () {
        const adapter = this.adapter;
        const optionsHandler = this.optionsHandler;
        const constraints = { callbackId: /\w+_callback/, within: 'not_a_real_options_source' };
        assert.throws(function () {
          adapter.options(constraints, optionsHandler);
        }, TypeError);
      });
    });
  });

  // shared view constraints tests
  function shouldRegisterWithViewConstraints(methodName) {
    describe('when registering with a complex set of constraints', function () {
      beforeEach(function () {
        this.handler = function () { };
      });
      it('a string external_id registers successfully', function () {
        this.adapter[methodName]({ externalId: 'my_external_id' }, this.handler);
        assertHandlerRegistered(this.adapter, this.handler);
      });
      it('a RegExp external_id registers successfully', function () {
        this.adapter[methodName]({ externalId: /w+_external_id/ }, this.handler);
        assertHandlerRegistered(this.adapter, this.handler);
      });
      it('invalid external_id types throw on registration', function () {
        const handler = this.handler;
        const adapter = this.adapter;
        assert.throws(function () {
          adapter[methodName]({ externalId: 5 }, handler);
        }, TypeError);
        assert.throws(function () {
          adapter[methodName]({ externalId: true }, handler);
        }, TypeError);
        assert.throws(function () {
          adapter[methodName]({ externalId: [] }, handler);
        }, TypeError);
        assert.throws(function () {
          adapter[methodName]({ externalId: null }, handler);
        }, TypeError);
      });
      it('a string view_id registers successfully', function () {
        this.adapter[methodName]({ viewId: 'my_view_id' }, this.handler);
        assertHandlerRegistered(this.adapter, this.handler);
      });
      it('invalid view_id types throw on registration', function () {
        const handler = this.handler;
        const adapter = this.adapter;
        assert.throws(function () {
          adapter[methodName]({ viewId: 5 }, handler);
        }, TypeError);
        assert.throws(function () {
          adapter[methodName]({ viewId: true }, handler);
        }, TypeError);
        assert.throws(function () {
          adapter[methodName]({ viewId: [] }, handler);
        }, TypeError);
        assert.throws(function () {
          adapter[methodName]({ viewId: null }, handler);
        }, TypeError);
        assert.throws(function () {
          adapter[methodName]({ viewId: /\w+_view_id/ }, handler);
        }, TypeError);
      });
    });
  }

  describe('#viewSubmission()', function () {
    beforeEach(function () {
      this.adapter = new SlackMessageAdapter(workingSigningSecret);
    });
    it('should fail view submission registration without handler', function () {
      assert.throws(function () {
        this.adapter.viewSubmission('my_callback');
      }, TypeError);
    });

    // execute shared tests
    shouldRegisterWithCallbackId('viewSubmission');
    shouldRegisterWithViewConstraints('viewSubmission');
  });

  describe('#viewClosed()', function () {
    beforeEach(function () {
      this.adapter = new SlackMessageAdapter(workingSigningSecret);
    });
    it('should fail view closed registration without handler', function () {
      assert.throws(function () {
        this.adapter.viewClosed('my_callback');
      }, TypeError);
    });

    // execute shared tests
    shouldRegisterWithCallbackId('viewClosed');
    shouldRegisterWithViewConstraints('viewSubmission');
  });

  describe('#dispatch()', function () {
    beforeEach(function () {
      this.adapter = new SlackMessageAdapter(workingSigningSecret, {
        // using a short timeout to make tests finish faster
        syncResponseTimeout: 50
      });
    });

    /**
     * Assert the result of a dispatch contains a certain message
     * @param {Promise<object>} response actual return value of adapter.dispatch
     * @param {number} status expected status
     * @param {Object|string|undefined} content expected value of response body
     * @returns {Promise<void>}
     */
    function assertResponseStatusAndMessage(response, status, content) {
      return response.then(function (res) {
        assert.equal(status, res.status);
        assert.deepEqual(content, res.content);
      });
    }

    /**
     * Encapsulates knowledge of how the adapter makes post requests by arranging a stub that can
     * observe these requests and verify that one is made to the given url with the given message.
     * If less than all of the messages are matched, if a request is made and the body doesn't match
     * the messages, or if the URL doesn't match the requestUrl, this will result in a timeout (a
     * promise that never resolves nor rejects).
     * @param {SlackMessageAdapter} adapter actual adapter
     * @param {string} requestUrl expected request URL
     * @param {...Object|string} messages expected messages in request body
     */
    function assertPostRequestMadeWithMessages(adapter, requestUrl) {
      const messages = [].slice.call(arguments, 2);
      const messagePromiseEntries = messages.map(function () {
        const entry = {};
        entry.promise = new Promise(function (resolve) {
          entry.resolve = resolve;
        });
        return entry;
      });

      sinon.stub(adapter.axios, 'post').callsFake(function (url, body) {
        let messageIndex;
        if (url !== requestUrl) {
          return;
        }
        messageIndex = messages.findIndex(function (message) {
          try {
            assert.deepEqual(body, message);
            return true;
          } catch (_) {
            return false;
          }
        });
        if (messageIndex >= 0) {
          messagePromiseEntries[messageIndex].resolve();
        }
      });

      return Promise.all(messagePromiseEntries.map(function (entry) {
        return entry.promise;
      }));
    }

    describe('when dispatching a message attachment action request', function () {
      beforeEach(function () {
        // this represents a minimum action from a button
        this.requestPayload = {
          callback_id: 'id',
          actions: [{
            type: 'button'
          }],
          response_url: 'https://example.com'
        };
        this.replacement = { text: 'example replacement message' };
      });
      it('should handle the callback returning a message with a synchronous response', function () {
        let dispatchResponse;
        const requestPayload = this.requestPayload;
        const replacement = this.replacement;
        this.adapter.action(requestPayload.callback_id, function (payload, respond) {
          assert.deepEqual(payload, requestPayload);
          assert.isFunction(respond);
          return replacement;
        });
        dispatchResponse = this.adapter.dispatch(requestPayload);
        return assertResponseStatusAndMessage(dispatchResponse, 200, replacement);
      });
      it('should handle the callback returning a promise of a message before the timeout with a ' +
         'synchronous response', function () {
        let dispatchResponse;
        const requestPayload = this.requestPayload;
        const replacement = this.replacement;
        const timeout = this.adapter.syncResponseTimeout;
        this.timeout(timeout);
        this.adapter.action(requestPayload.callback_id, function (payload, respond) {
          assert.deepEqual(payload, requestPayload);
          assert.isFunction(respond);
          return delayed(timeout * 0.1, replacement);
        });
        dispatchResponse = this.adapter.dispatch(requestPayload);
        return assertResponseStatusAndMessage(dispatchResponse, 200, replacement);
      });
      it('should handle the callback returning a promise of a message after the timeout with an ' +
         'asynchronous response', function () {
        let dispatchResponse;
        const requestPayload = this.requestPayload;
        const replacement = this.replacement;
        const expectedAsyncRequest = assertPostRequestMadeWithMessages(
          this.adapter,
          requestPayload.response_url,
          replacement
        );
        const timeout = this.adapter.syncResponseTimeout;
        this.timeout(timeout * 2);
        this.adapter.action(requestPayload.callback_id, function (payload, respond) {
          assert.deepEqual(payload, requestPayload);
          assert.isFunction(respond);
          return delayed(timeout * 1.1, replacement);
        });
        dispatchResponse = this.adapter.dispatch(requestPayload);
        return Promise.all([
          assertResponseStatusAndMessage(dispatchResponse, 200),
          expectedAsyncRequest
        ]);
      });
      it('should handle the callback returning a promise that fails after the timeout with a ' +
         'synchronous response', function () {
        let dispatchResponse;
        const requestPayload = this.requestPayload;
        const timeout = this.adapter.syncResponseTimeout;
        this.timeout(timeout * 2);
        this.adapter.action(requestPayload.callback_id, function () {
          return delayed(timeout * 1.1, undefined, 'test error');
        });
        dispatchResponse = this.adapter.dispatch(requestPayload);
        return assertResponseStatusAndMessage(dispatchResponse, 200);
      });
      it('should handle the callback returning a promise that fails before the timeout with a ' +
         'synchronous response', function () {
        let dispatchResponse;
        const requestPayload = this.requestPayload;
        const timeout = this.adapter.syncResponseTimeout;
        this.timeout(timeout);
        this.adapter.action(requestPayload.callback_id, function () {
          return delayed(0, undefined, 'test error');
        });
        dispatchResponse = this.adapter.dispatch(requestPayload);
        return assertResponseStatusAndMessage(dispatchResponse, 500);
      });
      it('should handle the callback returning nothing and using respond to send a message', function () {
        let dispatchResponse;
        const requestPayload = this.requestPayload;
        const replacement = this.replacement;
        const expectedAsyncRequest = assertPostRequestMadeWithMessages(
          this.adapter,
          requestPayload.response_url,
          replacement
        );
        const timeout = this.adapter.syncResponseTimeout;
        this.timeout(timeout * 2);
        this.adapter.action(requestPayload.callback_id, function (payload, respond) {
          delayed(timeout * 1.1)
            .then(function () {
              respond(replacement);
            });
        });
        dispatchResponse = this.adapter.dispatch(requestPayload);
        return Promise.all([
          assertResponseStatusAndMessage(dispatchResponse, 200),
          expectedAsyncRequest
        ]);
      });
      it('should handle the callback returning a promise of a message after the timeout with an ' +
         'asynchronous response and using respond to send another asynchronous response', function () {
        let dispatchResponse;
        const requestPayload = this.requestPayload;
        const firstReplacement = this.replacement;
        const secondReplacement = Object.assign({}, firstReplacement, { text: '2nd replacement' });
        const expectedAsyncRequest = assertPostRequestMadeWithMessages(
          this.adapter,
          requestPayload.response_url,
          firstReplacement,
          secondReplacement
        );
        const timeout = this.adapter.syncResponseTimeout;
        this.timeout(timeout * 2);
        this.adapter.action(requestPayload.callback_id, function (payload, respond) {
          delayed(timeout * 1.2)
            .then(function () {
              respond(secondReplacement);
            });
          return delayed(timeout * 1.1, firstReplacement);
        });
        dispatchResponse = this.adapter.dispatch(requestPayload);
        return Promise.all([
          assertResponseStatusAndMessage(dispatchResponse, 200),
          expectedAsyncRequest
        ]);
      });
      it('should handle the callback returning nothing with a synchronous response and using ' +
         'respond to send multiple asynchronous responses', function () {
        let dispatchResponse;
        const requestPayload = this.requestPayload;
        const firstReplacement = this.replacement;
        const secondReplacement = Object.assign({}, firstReplacement, { text: '2nd replacement' });
        const expectedAsyncRequest = assertPostRequestMadeWithMessages(
          this.adapter,
          requestPayload.response_url,
          firstReplacement,
          secondReplacement
        );
        const timeout = this.adapter.syncResponseTimeout;
        this.timeout(timeout * 2);
        this.adapter.action(requestPayload.callback_id, function (payload, respond) {
          delayed(timeout * 1.1)
            .then(function () {
              respond(firstReplacement);
              return delayed(timeout * 0.1);
            })
            .then(function () {
              respond(secondReplacement);
            });
        });
        dispatchResponse = this.adapter.dispatch(requestPayload);
        return Promise.all([
          assertResponseStatusAndMessage(dispatchResponse, 200),
          expectedAsyncRequest
        ]);
      });
      describe('when lateResponseFallbackEnabled is configured as false', function () {
        beforeEach(function () {
          this.adapter = new SlackMessageAdapter(workingSigningSecret, {
            syncResponseTimeout: 30,
            lateResponseFallbackEnabled: false
          });
        });
        it('should handle the callback returning a promise of a message after the timeout with a ' +
            'synchronous response', function () {
          let dispatchResponse;
          const requestPayload = this.requestPayload;
          const replacement = this.replacement;
          const timeout = this.adapter.syncResponseTimeout;
          this.timeout(timeout * 2);
          this.adapter.action(requestPayload.callback_id, function (payload, respond) {
            assert.deepEqual(payload, requestPayload);
            assert.isFunction(respond);
            return delayed(timeout * 1.1, replacement);
          });
          dispatchResponse = this.adapter.dispatch(requestPayload);
          return assertResponseStatusAndMessage(dispatchResponse, 200, replacement);
        });
        it('should handle the callback returning a promise that fails after the timeout with a ' +
           'synchronous response', function () {
          let dispatchResponse;
          const requestPayload = this.requestPayload;
          const timeout = this.adapter.syncResponseTimeout;
          this.timeout(timeout * 2);
          this.adapter.action(requestPayload.callback_id, function () {
            return delayed(timeout * 1.1, undefined, 'test error');
          });
          dispatchResponse = this.adapter.dispatch(requestPayload);
          return assertResponseStatusAndMessage(dispatchResponse, 500);
        });
      });
    });

    describe('when dispatching a dialog submission request', function () {
      beforeEach(function () {
        this.requestPayload = {
          type: 'dialog_submission',
          callback_id: 'id',
          submission: {
            email_address: 'ankur@h4x0r.com'
          },
          response_url: 'https://example.com'
        };
        this.submissionResponse = {
          errors: [
            {
              name: 'email_address',
              error: 'Sorry, this email domain is not authorized!'
            }
          ]
        };
        this.followUp = { text: 'thanks for submitting your email address' };
      });
      it('should handle the callback returning a message with a synchronous response', function () {
        let dispatchResponse;
        const requestPayload = this.requestPayload;
        const submissionResponse = this.submissionResponse;
        this.adapter.action(requestPayload.callback_id, function (payload, respond) {
          assert.deepEqual(payload, requestPayload);
          assert.isFunction(respond);
          return submissionResponse;
        });
        dispatchResponse = this.adapter.dispatch(requestPayload);
        return assertResponseStatusAndMessage(dispatchResponse, 200, submissionResponse);
      });

      it('should handle the callback returning a promise of a message before the timeout with a ' +
         'synchronous response', function () {
        let dispatchResponse;
        const requestPayload = this.requestPayload;
        const submissionResponse = this.submissionResponse;
        const timeout = this.adapter.syncResponseTimeout;
        this.timeout(timeout);
        this.adapter.action(requestPayload.callback_id, function (payload, respond) {
          assert.deepEqual(payload, requestPayload);
          assert.isFunction(respond);
          return delayed(timeout * 0.1, submissionResponse);
        });
        dispatchResponse = this.adapter.dispatch(requestPayload);
        return assertResponseStatusAndMessage(dispatchResponse, 200, submissionResponse);
      });

      it('should handle the callback returning a promise of a message after the timeout with a ' +
         'synchronous response', function () {
        let dispatchResponse;
        const requestPayload = this.requestPayload;
        const submissionResponse = this.submissionResponse;
        const timeout = this.adapter.syncResponseTimeout;
        this.timeout(timeout * 2);
        this.adapter.action(requestPayload.callback_id, function (payload, respond) {
          assert.deepEqual(payload, requestPayload);
          assert.isFunction(respond);
          return delayed(timeout * 1.1, submissionResponse);
        });
        dispatchResponse = this.adapter.dispatch(requestPayload);
        return assertResponseStatusAndMessage(dispatchResponse, 200, submissionResponse);
      });

      it('should handle the callback returning nothing with a synchronous response', function () {
        let dispatchResponse;
        const requestPayload = this.requestPayload;
        this.adapter.action(requestPayload.callback_id, function (payload, respond) {
          assert.deepEqual(payload, requestPayload);
          assert.isFunction(respond);
        });
        dispatchResponse = this.adapter.dispatch(requestPayload);
        return assertResponseStatusAndMessage(dispatchResponse, 200);
      });

      it('should handle the callback using respond to send a follow up message', function () {
        let dispatchResponse;
        const requestPayload = this.requestPayload;
        const followUp = this.followUp;
        const expectedAsyncRequest = assertPostRequestMadeWithMessages(
          this.adapter,
          requestPayload.response_url,
          followUp
        );
        const timeout = this.adapter.syncResponseTimeout;
        this.timeout(timeout * 2);
        this.adapter.action(requestPayload.callback_id, function (payload, respond) {
          delayed(timeout * 1.1)
            .then(function () {
              respond(followUp);
            });
        });
        dispatchResponse = this.adapter.dispatch(requestPayload);
        return Promise.all([
          assertResponseStatusAndMessage(dispatchResponse, 200),
          expectedAsyncRequest
        ]);
      });
    });

    describe('when dispatching a menu options request', function () {
      beforeEach(function () {
        // this represents a minimum menu options request from an interactive message
        this.requestPayload = {
          name: 'bug_name',
          value: 'TRAC-12',
          type: 'interactive_message',
          callback_id: 'id'
        };
        this.optionsResponse = {
          options: [
            {
              text: 'Buggy McBugface',
              value: 'TRAC-12345'
            }
          ]
        };
      });
      // NOTE: if the response options or options_groups contain the property "label", we can
      // change them to "text"
      it('should handle the callback returning options with a synchronous response', function () {
        let dispatchResponse;
        const requestPayload = this.requestPayload;
        const optionsResponse = this.optionsResponse;
        this.adapter.options(requestPayload.callback_id, function (payload, secondArg) {
          assert.deepEqual(payload, requestPayload);
          assert.isUndefined(secondArg);
          return optionsResponse;
        });
        dispatchResponse = this.adapter.dispatch(requestPayload);
        return assertResponseStatusAndMessage(dispatchResponse, 200, optionsResponse);
      });

      it('should handle the callback returning a promise of options before the timeout with a ' +
         'synchronous response', function () {
        let dispatchResponse;
        const requestPayload = this.requestPayload;
        const optionsResponse = this.optionsResponse;
        const timeout = this.adapter.syncResponseTimeout;
        this.timeout(timeout);
        this.adapter.options(requestPayload.callback_id, function (payload, secondArg) {
          assert.deepEqual(payload, requestPayload);
          assert.isUndefined(secondArg);
          return delayed(timeout * 0.1, optionsResponse);
        });
        dispatchResponse = this.adapter.dispatch(requestPayload);
        return assertResponseStatusAndMessage(dispatchResponse, 200, optionsResponse);
      });

      it('should handle the callback returning a promise of options after the timeout with a ' +
         'synchronous response', function () {
        let dispatchResponse;
        const requestPayload = this.requestPayload;
        const optionsResponse = this.optionsResponse;
        const timeout = this.adapter.syncResponseTimeout;
        this.timeout(timeout * 2);
        this.adapter.options(requestPayload.callback_id, function (payload, secondArg) {
          assert.deepEqual(payload, requestPayload);
          assert.isUndefined(secondArg);
          return delayed(timeout * 1.1, optionsResponse);
        });
        dispatchResponse = this.adapter.dispatch(requestPayload);
        return assertResponseStatusAndMessage(dispatchResponse, 200, optionsResponse);
      });

      it('should handle the callback returning nothing with a synchronous response', function () {
        let dispatchResponse;
        const requestPayload = this.requestPayload;
        this.adapter.options(requestPayload.callback_id, function (payload, secondArg) {
          assert.deepEqual(payload, requestPayload);
          assert.isUndefined(secondArg);
        });
        dispatchResponse = this.adapter.dispatch(requestPayload);
        return assertResponseStatusAndMessage(dispatchResponse, 200);
      });
      // describe('when the menu options request is coming from a dialog', function () {
      //   beforeEach(function () {
      //     this.requestPayload.type = 'dialog';
      //   });
      //   // NOTE: if the response options or options_groups contain the property "text", we can
      //   // change them to "label"
      // });
    });

    // the following tests pertain to the behavior of #matchCallback(), but since that is an
    // implementation detail, its tested as part of the behavior of #dispatch()
    describe('callback matching', function () {
      beforeEach(function () {
        this.buttonPayload = {
          callback_id: 'id',
          actions: [{
            type: 'button'
          }],
          response_url: 'https://example.com'
        };
        this.buttonPayloadBlocks = {
          actions: [{
            type: 'button',
            block_id: 'b_id',
            action_id: 'a_id'
          }],
          response_url: 'https://example.com'
        };
        this.buttonAppUnfurlPayload = Object.assign({}, this.buttonPayload, {
          is_app_unfurl: true
        });
        // NOTE: this payload isn't used in a test but it remains a good reference
        this.dialogSubmissionPayload = {
          type: 'dialog_submission',
          callback_id: 'id',
          submission: {
            name: 'Value'
          },
          response_url: 'https://example.com'
        };
        // NOTE: this payload isn't used in a test but it remains a good reference
        this.menuSelectionPayload = {
          callback_id: 'id',
          actions: [{
            name: 'pick_a_thing',
            selected_options: [{
              value: 'Option A'
            }]
          }],
          response_url: 'https://example.com'
        };
        this.optionsFromInteractiveMessagePayload = {
          name: 'pick_a_thing',
          value: 'opti',
          callback_id: 'id',
          type: 'interactive_message'
        };
        this.optionsFromBlockMessagePayload = {
          value: 'opti',
          block_id: 'b_id',
          action_id: 'a_id',
          type: 'block_suggestion'
        };
        this.optionsFromDialogPayload = {
          name: 'pick_a_thing',
          value: 'opti',
          callback_id: 'id',
          type: 'dialog_suggestion'
        };
        this.viewSubmissionPayload = {
          type: 'view_submission',
          view: {
            callback_id: 'id',
            id: 'V12345'
          },
        };
        this.viewSubmissionWithExternalIdPayload = {
          type: 'view_submission',
          view: {
            callback_id: 'id',
            id: 'V12345',
            external_id: 'abcdef',
          },
        };
        this.viewClosedPayload = {
          type: 'view_closed',
          view: {
            callback_id: 'id',
            id: 'V12345'
          },
        };
        this.viewClosedWithExternalIdPayload = {
          type: 'view_closed',
          view: {
            callback_id: 'id',
            id: 'V12345',
            external_id: 'abcdef',
          },
        };
        this.callback = sinon.spy();
      });

      it('should return undefined when there are no callbacks registered', function () {
        const response = this.adapter.dispatch({});
        assert.isUndefined(response);
      });

      function shouldMatchBasedOnCallbackId(payload) {
        it('should return undefined with a string mismatch', function () {
          let response;
          this.adapter.action('b', this.callback);
          response = this.adapter.dispatch(payload);
          assert(this.callback.notCalled);
          assert.isUndefined(response);
        });

        it('should return undefined with a RegExp mismatch', function () {
          let response;
          this.adapter.action(/b/, this.callback);
          response = this.adapter.dispatch(payload);
          assert(this.callback.notCalled);
          assert.isUndefined(response);
        });

        // TODO: successful match on string, successful match on regexp, matches when registered
        // as an options handler instead
      }

      describe('callback ID based matching', function () {
        shouldMatchBasedOnCallbackId('interactive message action', this.buttonPayload);
        shouldMatchBasedOnCallbackId('view submission', this.viewSubmissionPayload);
        shouldMatchBasedOnCallbackId('view closed', this.viewClosedPayload);
      });

      describe('block ID based matching', function () {
        beforeEach(function () {
          this.payload = this.buttonPayloadBlocks;
        });

        it('should return undefined with a string mismatch', function () {
          let response;
          this.adapter.action({ blockId: 'a' }, this.callback);
          response = this.adapter.dispatch(this.payload);
          assert(this.callback.notCalled);
          assert.isUndefined(response);
        });

        it('should return undefined with a RegExp mismatch', function () {
          let response;
          this.adapter.action({ blockId: /a/ }, this.callback);
          response = this.adapter.dispatch(this.payload);
          assert(this.callback.notCalled);
          assert.isUndefined(response);
        });

        it('should match with matching blockId', function () {
          this.adapter.action({ blockId: 'b_id' }, this.callback);
          this.adapter.dispatch(this.payload);
          assert(this.callback.called);
        });

        it('should match with matching RegExp blockId', function () {
          this.adapter.action({ blockId: /b/ }, this.callback);
          this.adapter.dispatch(this.payload);
          assert(this.callback.called);
        });

        it('should return undefined with a string mismatch with options', function () {
          let response;
          this.adapter.options({ blockId: 'a' }, this.callback);
          response = this.adapter.dispatch(this.optionsFromBlockMessagePayload);
          assert(this.callback.notCalled);
          assert.isUndefined(response);
        });

        it('should return undefined with a RegExp mismatch with options', function () {
          let response;
          this.adapter.options({ blockId: /a/ }, this.callback);
          response = this.adapter.dispatch(this.optionsFromBlockMessagePayload);
          assert(this.callback.notCalled);
          assert.isUndefined(response);
        });

        it('should match with matching blockId with options', function () {
          this.adapter.options({ blockId: 'b_id' }, this.callback);
          this.adapter.dispatch(this.optionsFromBlockMessagePayload);
          assert(this.callback.called);
        });

        it('should match with matching RegExp blockId with options', function () {
          this.adapter.options({ blockId: /b/ }, this.callback);
          this.adapter.dispatch(this.optionsFromBlockMessagePayload);
          assert(this.callback.called);
        });
      });

      describe('action ID based matching', function () {
        beforeEach(function () {
          this.payload = this.buttonPayloadBlocks;
        });

        it('should return undefined with a string mismatch', function () {
          let response;
          this.adapter.action({ actionId: 'b' }, this.callback);
          response = this.adapter.dispatch(this.payload);
          assert(this.callback.notCalled);
          assert.isUndefined(response);
        });

        it('should return undefined with a RegExp mismatch', function () {
          let response;
          this.adapter.action({ actionId: /b/ }, this.callback);
          response = this.adapter.dispatch(this.payload);
          assert(this.callback.notCalled);
          assert.isUndefined(response);
        });

        it('should match with matching actionId', function () {
          this.adapter.action({ actionId: 'a_id' }, this.callback);
          this.adapter.dispatch(this.payload);
          assert(this.callback.called);
        });

        it('should match with matching RegExp actionId', function () {
          this.adapter.action({ actionId: /a/ }, this.callback);
          this.adapter.dispatch(this.payload);
          assert(this.callback.called);
        });

        it('should return undefined with a string mismatch with options', function () {
          let response;
          this.adapter.options({ actionId: 'b' }, this.callback);
          response = this.adapter.dispatch(this.optionsFromBlockMessagePayload);
          assert(this.callback.notCalled);
          assert.isUndefined(response);
        });

        it('should return undefined with a RegExp mismatch with options', function () {
          let response;
          this.adapter.options({ actionId: /b/ }, this.callback);
          response = this.adapter.dispatch(this.optionsFromBlockMessagePayload);
          assert(this.callback.notCalled);
          assert.isUndefined(response);
        });

        it('should match with matching string actionId with options', function () {
          this.adapter.options({ actionId: 'a_id' }, this.callback);
          this.adapter.dispatch(this.optionsFromBlockMessagePayload);
          assert(this.callback.called);
        });

        it('should match with matching RegExp actionId with options', function () {
          this.adapter.options({ actionId: /a/ }, this.callback);
          this.adapter.dispatch(this.optionsFromBlockMessagePayload);
          assert(this.callback.called);
        });
      });

      describe('type based matching', function () {
        beforeEach(function () {
          this.payload = this.buttonPayload;
        });

        it('should return undefined when type is present in constraints and it mismatches', function () {
          let response;
          this.adapter.action({ type: 'select' }, this.callback);
          response = this.adapter.dispatch(this.payload);
          assert(this.callback.notCalled);
          assert.isUndefined(response);
        });

        it('should match when type not present in constraints', function () {
          this.adapter.action({}, this.callback);
          this.adapter.dispatch(this.payload);
          assert(this.callback.called);
        });

        it('should not throw when type is not found in payload', function () {
          this.adapter.action({}, this.callback);
          this.adapter.dispatch({ actions: [{}] });
        });

        // TODO: successful match on type (utilize the unused payloads above)
      });

      describe('unfurl based matching', function () {
        beforeEach(function () {
          this.payload = this.buttonAppUnfurlPayload;
        });

        it('should return undefined when unfurl is present in constraints and it mismatches', function () {
          let response;
          this.adapter.action({ unfurl: false }, this.callback);
          response = this.adapter.dispatch(this.payload);
          assert(this.callback.notCalled);
          assert.isUndefined(response);
        });

        it('should match when unfurl not present in constraints', function () {
          this.adapter.action({}, this.callback);
          this.adapter.dispatch(this.payload);
          assert(this.callback.called);
        });

        // TODO: successful match on unfurl
      });

      describe('within based matching (options request only)', function () {
        it('should return undefined when within is present in constraints and it mismatches', function () {
          let response;
          this.adapter.options({ within: 'dialog' }, this.callback);
          response = this.adapter.dispatch(this.optionsFromInteractiveMessagePayload);
          assert(this.callback.notCalled);
          assert.isUndefined(response);

          unregisterAllHandlers(this.adapter);

          this.adapter.options({ within: 'interactive_message' }, this.callback);
          response = this.adapter.dispatch(this.optionsFromDialogPayload);
          assert(this.callback.notCalled);
          assert.isUndefined(response);

          unregisterAllHandlers(this.adapter);

          this.adapter.options({ within: 'block_actions' }, this.callback);
          response = this.adapter.dispatch(this.optionsFromInteractiveMessagePayload);
          assert(this.callback.notCalled);
          assert.isUndefined(response);
        });
        it('should match when within is not present in constraints', function () {
          this.adapter.options({}, this.callback);
          this.adapter.dispatch(this.optionsFromInteractiveMessagePayload);
          assert(this.callback.called);
        });
        it('should match using within constraint on options requests from interactive messages', function () {
          this.adapter.options({ within: 'interactive_message' }, this.callback);
          this.adapter.dispatch(this.optionsFromInteractiveMessagePayload);
          assert(this.callback.called);
        });
        it('should match using within constraint on options requests from Block Kit messages', function () {
          this.adapter.options({ within: 'block_actions' }, this.callback);
          this.adapter.dispatch(this.optionsFromBlockMessagePayload);
          assert(this.callback.called);
        });
        it('should match using within constraint on options requests from dialog', function () {
          this.adapter.options({ within: 'dialog' }, this.callback);
          this.adapter.dispatch(this.optionsFromDialogPayload);
          assert(this.callback.called);
        });
      });

      describe('view ID based matching' , function () {
        describe('on view submission', function () {
          beforeEach(function () {
            this.payload = this.viewSubmissionPayload;
          });

          it('should return undefined with a string mismatch', function () {
            let response;
            this.adapter.viewSubmission({ viewId: 'a' }, this.callback);
            response = this.adapter.dispatch(this.payload);
            assert(this.callback.notCalled);
            assert.isUndefined(response);
          });

          it('should match with matching viewId', function () {
            this.adapter.viewSubmission({ viewId: 'V12345' }, this.callback);
            this.adapter.dispatch(this.payload);
            assert(this.callback.called);
          });
        });
        describe('on view closed', function () {
          beforeEach(function () {
            this.payload = this.viewClosedPayload;
          });

          it('should return undefined with a string mismatch', function () {
            let response;
            this.adapter.viewClosed({ viewId: 'a' }, this.callback);
            response = this.adapter.dispatch(this.payload);
            assert(this.callback.notCalled);
            assert.isUndefined(response);
          });

          it('should match with matching viewId', function () {
            this.adapter.viewClosed({ viewId: 'V12345' }, this.callback);
            this.adapter.dispatch(this.payload);
            assert(this.callback.called);
          });
        });
      });

      describe('external ID based matching', function () {
        describe('on view submission', function () {
          beforeEach(function () {
            this.payload = this.viewSubmissionWithExternalIdPayload;
          });

          it('should return undefined with a string mismatch', function () {
            let response;
            this.adapter.viewSubmission({ externalId: 'a' }, this.callback);
            response = this.adapter.dispatch(this.payload);
            assert(this.callback.notCalled);
            assert.isUndefined(response);
          });

          it('should match with matching externalId', function () {
            this.adapter.viewSubmission({ externalId: 'abcdef' }, this.callback);
            this.adapter.dispatch(this.payload);
            assert(this.callback.called);
          });

          it('should return undefined with a RegExp mismatch', function () {
            let response;
            this.adapter.viewSubmission({ externalId: /g/ }, this.callback);
            response = this.adapter.dispatch(this.payload);
            assert(this.callback.notCalled);
            assert.isUndefined(response);
          });

          it('should match with matching RegExp externalId', function () {
            this.adapter.viewSubmission({ externalId: /a/ }, this.callback);
            this.adapter.dispatch(this.payload);
            assert(this.callback.called);
          });
        });
        describe('on view closed', function () {
          beforeEach(function () {
            this.payload = this.viewClosedWithExternalIdPayload;
          });

          it('should return undefined with a string mismatch', function () {
            let response;
            this.adapter.viewClosed({ externalId: 'a' }, this.callback);
            response = this.adapter.dispatch(this.payload);
            assert(this.callback.notCalled);
            assert.isUndefined(response);
          });

          it('should match with matching viewId', function () {
            this.adapter.viewClosed({ externalId: 'abcdef' }, this.callback);
            this.adapter.dispatch(this.payload);
            assert(this.callback.called);
          });

          it('should return undefined with a RegExp mismatch', function () {
            let response;
            this.adapter.viewClosed({ externalId: /g/ }, this.callback);
            response = this.adapter.dispatch(this.payload);
            assert(this.callback.notCalled);
            assert.isUndefined(response);
          });

          it('should match with matching RegExp externalId', function () {
            this.adapter.viewClosed({ externalId: /a/ }, this.callback);
            this.adapter.dispatch(this.payload);
            assert(this.callback.called);
          });
        });
      });

      describe('action and options request handlers', function () {
        it('should not match a options handler for an action payload', function () {
          this.adapter.options(this.buttonPayload.callback_id, this.callback);
          this.adapter.dispatch(this.buttonPayload);
          assert(this.callback.notCalled);
        });
        it('should only match the right handler for payload when both have the same callback_id', function () {
          // the following payloads have the same callback_id
          const actionPayload = this.buttonPayload;
          const optionsPayload = this.optionsFromDialogPayload;
          const actionCallback = sinon.spy();
          const optionsCallback = sinon.spy();
          this.adapter.action(actionPayload.callback_id, actionCallback);
          this.adapter.options(actionPayload.callback_id, optionsCallback);

          this.adapter.dispatch(actionPayload);

          assert(actionCallback.called);
          assert(optionsCallback.notCalled);

          this.adapter.dispatch(optionsPayload);

          assert(optionsCallback.calledOnce);
          assert(actionCallback.calledOnce);
        });
      });
    });

    describe('callback error handling', function () {
      it('should respond with an error when the registered callback throws', function () {
        let response;
        this.adapter.action('a', function () {
          throw new Error('test error');
        });
        response = this.adapter.dispatch({ callback_id: 'a', actions: [{}] });
        return assertResponseStatusAndMessage(response, 500);
      });

      it('should fail with an error when calling respond inside a callback with a promise', function (done) {
        this.adapter.action('a', function (payload, respond) {
          assert.isFunction(respond);
          assert.throws(function () {
            respond(Promise.resolve('b'));
          }, TypeError);
          done();
        });
        this.adapter.dispatch({ callback_id: 'a', actions: [{}], response_url: 'http://example.com' });
      });
    });
  });
});
