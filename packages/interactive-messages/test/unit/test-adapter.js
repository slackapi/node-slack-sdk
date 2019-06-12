/* global Promise */

var http = require('http');
var assert = require('chai').assert;
var sinon = require('sinon');
var nop = require('nop');
var getRandomPort = require('get-random-port');
var systemUnderTest = require('../../dist/adapter');
var createStreamRequest = require('../helpers').createStreamRequest;
var SlackMessageAdapter = systemUnderTest.default;
var delayed = require('../helpers').delayed;

// fixtures
var workingSigningSecret = 'SIGNING_SECRET';
var workingRawBody = 'payload=%7B%22type%22%3A%22interactive_message%22%7D';

// test suite
describe('SlackMessageAdapter', function () {
  describe('constructor', function () {
    it('should build an instance', function () {
      var adapter = new SlackMessageAdapter(workingSigningSecret);
      assert.instanceOf(adapter, SlackMessageAdapter);
      assert.equal(adapter.syncResponseTimeout, 2500);
    });
    it('should fail without a signing secret', function () {
      assert.throws(function () {
        var adapter = new SlackMessageAdapter(); // eslint-disable-line no-unused-vars
      }, TypeError);
    });
    it('should allow configuring of the synchronous response timeout', function () {
      var newValue = 20;
      var adapter = new SlackMessageAdapter(workingSigningSecret, {
        syncResponseTimeout: newValue
      });
      assert.equal(adapter.syncResponseTimeout, newValue);
    });
    it('should fail when the synchronous response timeout is out of range', function () {
      assert.throws(function () {
        // eslint-disable-next-line no-unused-vars
        var a = new SlackMessageAdapter(workingSigningSecret, { syncResponseTimeout: 0 });
      }, TypeError);
      assert.throws(function () {
        // eslint-disable-next-line no-unused-vars
        var a = new SlackMessageAdapter(workingSigningSecret, { syncResponseTimeout: 3001 });
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
      var self = this;
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
      var self = this;
      return this.adapter.start(self.portNumber).then(function (server) {
        // only works in node >= 5.7.0
        // assert(server.listening);
        assert.equal(server.address().port, self.portNumber);
      });
    });
  });

  describe('#stop()', function () {
    beforeEach(function (done) {
      var self = this;
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
      var self = this;
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
      var middleware = this.adapter.expressMiddleware();
      assert.isFunction(middleware);
    });
    it('should verify correctly signed request bodies', function (done) {
      var ts = Math.floor(Date.now() / 1000);
      var adapter = this.adapter;
      var middleware = adapter.expressMiddleware();
      var dispatch = this.dispatch;
      var res = this.res;
      var next = this.next;
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
      var middleware = this.adapter.requestListener();
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
    var callbackEntry;

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
    adapter.callbacks = []; // eslint-disable-line no-param-reassign
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
        var handler = this.handler;
        var adapter = this.adapter;
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
      it('non-function callbacks throw on registration', function () {
        var adapter = this.adapter;
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
        var adapter = this.adapter;
        var actionHandler = this.actionHandler;
        var constraintsSet = [
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
        var constraints = { unfurl: true };
        this.adapter.action(constraints, this.actionHandler);
        assertHandlerRegistered(this.adapter, this.actionHandler, constraints);
      });
      it('should register with blockId constraints successfully', function () {
        var constraints = { blockId: 'my_block' };
        this.adapter.action(constraints, this.actionHandler);
        assertHandlerRegistered(this.adapter, this.actionHandler, constraints);
      });
      it('invalid block_id types throw on registration', function () {
        var handler = this.handler;
        var adapter = this.adapter;
        assert.throws(function () {
          adapter.action({ blockId: 5 }, handler);
        }, TypeError);
        assert.throws(function () {
          adapter.action({ blockId: true }, handler);
        }, TypeError);
        assert.throws(function () {
          adapter.action({ blockId: [] }, handler);
        }, TypeError);
        assert.throws(function () {
          adapter.action({ blockId: null }, handler);
        }, TypeError);
        assert.throws(function () {
          adapter.action({ blockId: undefined }, handler);
        }, TypeError);
      });
      it('should register with actionId constraints successfully', function () {
        var constraints = { actionId: 'my_action' };
        this.adapter.action(constraints, this.actionHandler);
        assertHandlerRegistered(this.adapter, this.actionHandler, constraints);
      });
      it('invalid action_id types throw on registration', function () {
        var handler = this.handler;
        var adapter = this.adapter;
        assert.throws(function () {
          adapter.action({ actionId: 5 }, handler);
        }, TypeError);
        assert.throws(function () {
          adapter.action({ actionId: true }, handler);
        }, TypeError);
        assert.throws(function () {
          adapter.action({ actionId: [] }, handler);
        }, TypeError);
        assert.throws(function () {
          adapter.action({ actionId: null }, handler);
        }, TypeError);
        assert.throws(function () {
          adapter.action({ actionId: undefined }, handler);
        }, TypeError);
      });
      it('should register with compound block constraints successfully', function () {
        var constraints = { blockId: 'my_block', actionId: 'wham' };
        this.adapter.action(constraints, this.actionHandler);
        assertHandlerRegistered(this.adapter, this.actionHandler, constraints);
      });
      it('should register with valid compound constraints successfully', function () {
        var constraints = { callbackId: 'my_callback', type: 'button' };
        this.adapter.action(constraints, this.actionHandler);
        assertHandlerRegistered(this.adapter, this.actionHandler, constraints);
      });
      it('should throw when registering with invalid compound constraints', function () {
        var adapter = this.adapter;
        var actionHandler = this.actionHandler;
        // number isn't valid callbackId, all types are valid
        var constraints = { callbackId: 111, type: 'button' };
        assert.throws(function () {
          adapter.action(constraints, actionHandler);
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
        var adapter = this.adapter;
        var optionsHandler = this.optionsHandler;
        var constraintsSet = [
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
        var adapter = this.adapter;
        var optionsHandler = this.optionsHandler;
        var constraints = { within: 'not_a_real_options_source' };
        assert.throws(function () {
          adapter.options(constraints, optionsHandler);
        }, TypeError);
      });
      it('should register with valid compound constraints successfully', function () {
        var constraints = { callbackId: 'my_callback', within: 'dialog' };
        this.adapter.options(constraints, this.optionsHandler);
        assertHandlerRegistered(this.adapter, this.optionsHandler, constraints);
      });
      it('should throw when registering with invalid compound constraints', function () {
        var adapter = this.adapter;
        var optionsHandler = this.optionsHandler;
        var constraints = { callbackId: /\w+_callback/, within: 'not_a_real_options_source' };
        assert.throws(function () {
          adapter.options(constraints, optionsHandler);
        }, TypeError);
      });
    });
  });

  describe('#dispatch()', function () {
    beforeEach(function () {
      this.adapter = new SlackMessageAdapter(workingSigningSecret, {
        // using a short timout to make tests finish faster
        syncResponseTimeout: 30
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
     * If less than all of the messages are matched, if a request is mad and the body doesn't match
     * and messages, or if the url doesn't match the requestUrl, this will result in a timeout (a
     * promise that never resolves nor rejects).
     * @param {SlackMessageAdapter} adapter actual adapter
     * @param {string} requestUrl expected request URL
     * @param {...Object|string} messages expected messages in request body
     */
    function assertPostRequestMadeWithMessages(adapter, requestUrl) {
      var messages = [].slice.call(arguments, 2);
      var messagePromiseEntries = messages.map(function () {
        var entry = {};
        entry.promise = new Promise(function (resolve) {
          entry.resolve = resolve;
        });
        return entry;
      });

      sinon.stub(adapter.axios, 'post').callsFake(function (url, body) {
        var messageIndex;
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

    describe('when dispatching a message action request', function () {
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
        var dispatchResponse;
        var requestPayload = this.requestPayload;
        var replacement = this.replacement;
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
        var dispatchResponse;
        var requestPayload = this.requestPayload;
        var replacement = this.replacement;
        var timeout = this.adapter.syncResponseTimeout;
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
        var dispatchResponse;
        var requestPayload = this.requestPayload;
        var replacement = this.replacement;
        var expectedAsyncRequest = assertPostRequestMadeWithMessages(
          this.adapter,
          requestPayload.response_url,
          replacement
        );
        var timeout = this.adapter.syncResponseTimeout;
        this.timeout(timeout * 1.5);
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
         'sychronous response', function () {
        var dispatchResponse;
        var requestPayload = this.requestPayload;
        var timeout = this.adapter.syncResponseTimeout;
        this.timeout(timeout * 1.5);
        this.adapter.action(requestPayload.callback_id, function () {
          return delayed(timeout * 1.1, undefined, 'test error');
        });
        dispatchResponse = this.adapter.dispatch(requestPayload);
        return assertResponseStatusAndMessage(dispatchResponse, 200);
      });
      it('should handle the callback returning a promise that fails before the timeout with a ' +
         'sychronous response', function () {
        var dispatchResponse;
        var requestPayload = this.requestPayload;
        var timeout = this.adapter.syncResponseTimeout;
        this.timeout(timeout);
        this.adapter.action(requestPayload.callback_id, function () {
          return delayed(timeout * 0.1, undefined, 'test error');
        });
        dispatchResponse = this.adapter.dispatch(requestPayload);
        return assertResponseStatusAndMessage(dispatchResponse, 500);
      });
      it('should handle the callback returning nothing and using respond to send a message', function () {
        var dispatchResponse;
        var requestPayload = this.requestPayload;
        var replacement = this.replacement;
        var expectedAsyncRequest = assertPostRequestMadeWithMessages(
          this.adapter,
          requestPayload.response_url,
          replacement
        );
        var timeout = this.adapter.syncResponseTimeout;
        this.timeout(timeout * 1.5);
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
        var dispatchResponse;
        var requestPayload = this.requestPayload;
        var firstReplacement = this.replacement;
        var secondReplacement = Object.assign({}, firstReplacement, { text: '2nd replacement' });
        var expectedAsyncRequest = assertPostRequestMadeWithMessages(
          this.adapter,
          requestPayload.response_url,
          firstReplacement,
          secondReplacement
        );
        var timeout = this.adapter.syncResponseTimeout;
        this.timeout(timeout * 1.5);
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
        var dispatchResponse;
        var requestPayload = this.requestPayload;
        var firstReplacement = this.replacement;
        var secondReplacement = Object.assign({}, firstReplacement, { text: '2nd replacement' });
        var expectedAsyncRequest = assertPostRequestMadeWithMessages(
          this.adapter,
          requestPayload.response_url,
          firstReplacement,
          secondReplacement
        );
        var timeout = this.adapter.syncResponseTimeout;
        this.timeout(timeout * 1.5);
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
          var dispatchResponse;
          var requestPayload = this.requestPayload;
          var replacement = this.replacement;
          var timeout = this.adapter.syncResponseTimeout;
          this.timeout(timeout * 1.5);
          this.adapter.action(requestPayload.callback_id, function (payload, respond) {
            assert.deepEqual(payload, requestPayload);
            assert.isFunction(respond);
            return delayed(timeout * 1.1, replacement);
          });
          dispatchResponse = this.adapter.dispatch(requestPayload);
          return assertResponseStatusAndMessage(dispatchResponse, 200, replacement);
        });
        it('should handle the callback returning a promise that fails after the timeout with a ' +
           'sychronous response', function () {
          var dispatchResponse;
          var requestPayload = this.requestPayload;
          var timeout = this.adapter.syncResponseTimeout;
          this.timeout(timeout * 1.5);
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
        var dispatchResponse;
        var requestPayload = this.requestPayload;
        var submissionResponse = this.submissionResponse;
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
        var dispatchResponse;
        var requestPayload = this.requestPayload;
        var submissionResponse = this.submissionResponse;
        var timeout = this.adapter.syncResponseTimeout;
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
        var dispatchResponse;
        var requestPayload = this.requestPayload;
        var submissionResponse = this.submissionResponse;
        var timeout = this.adapter.syncResponseTimeout;
        this.timeout(timeout * 1.5);
        this.adapter.action(requestPayload.callback_id, function (payload, respond) {
          assert.deepEqual(payload, requestPayload);
          assert.isFunction(respond);
          return delayed(timeout * 1.1, submissionResponse);
        });
        dispatchResponse = this.adapter.dispatch(requestPayload);
        return assertResponseStatusAndMessage(dispatchResponse, 200, submissionResponse);
      });

      it('should handle the callback returning nothing with a synchronous response', function () {
        var dispatchResponse;
        var requestPayload = this.requestPayload;
        this.adapter.action(requestPayload.callback_id, function (payload, respond) {
          assert.deepEqual(payload, requestPayload);
          assert.isFunction(respond);
        });
        dispatchResponse = this.adapter.dispatch(requestPayload);
        return assertResponseStatusAndMessage(dispatchResponse, 200);
      });

      it('should handle the callback using respond to send a follow up message', function () {
        var dispatchResponse;
        var requestPayload = this.requestPayload;
        var followUp = this.followUp;
        var expectedAsyncRequest = assertPostRequestMadeWithMessages(
          this.adapter,
          requestPayload.response_url,
          followUp
        );
        var timeout = this.adapter.syncResponseTimeout;
        this.timeout(timeout * 1.5);
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
        var dispatchResponse;
        var requestPayload = this.requestPayload;
        var optionsResponse = this.optionsResponse;
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
        var dispatchResponse;
        var requestPayload = this.requestPayload;
        var optionsResponse = this.optionsResponse;
        var timeout = this.adapter.syncResponseTimeout;
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
        var dispatchResponse;
        var requestPayload = this.requestPayload;
        var optionsResponse = this.optionsResponse;
        var timeout = this.adapter.syncResponseTimeout;
        this.timeout(timeout * 1.5);
        this.adapter.options(requestPayload.callback_id, function (payload, secondArg) {
          assert.deepEqual(payload, requestPayload);
          assert.isUndefined(secondArg);
          return delayed(timeout * 1.1, optionsResponse);
        });
        dispatchResponse = this.adapter.dispatch(requestPayload);
        return assertResponseStatusAndMessage(dispatchResponse, 200, optionsResponse);
      });

      it('should handle the callback returning nothing with a synchronous response', function () {
        var dispatchResponse;
        var requestPayload = this.requestPayload;
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
        this.callback = sinon.spy();
      });
      it('should return undefined when there are no callbacks registered', function () {
        var response = this.adapter.dispatch({});
        assert.isUndefined(response);
      });

      describe('callback ID based matching', function () {
        beforeEach(function () {
          this.payload = this.buttonPayload;
        });

        it('should return undefined with a string mismatch', function () {
          var response;
          this.adapter.action('b', this.callback);
          response = this.adapter.dispatch(this.payload);
          assert(this.callback.notCalled);
          assert.isUndefined(response);
        });

        it('should return undefined with a RegExp mismatch', function () {
          var response;
          this.adapter.action(/b/, this.callback);
          response = this.adapter.dispatch(this.payload);
          assert(this.callback.notCalled);
          assert.isUndefined(response);
        });

        // TODO: successful match on string, successful match on regexp, matches when registered
        // as an options handler instead
      });

      describe('block ID based matching', function () {
        beforeEach(function () {
          this.payload = this.buttonPayloadBlocks;
        });

        it('should return undefined with a string mismatch', function () {
          var response;
          this.adapter.action({ blockId: 'a' }, this.callback);
          response = this.adapter.dispatch(this.payload);
          assert(this.callback.notCalled);
          assert.isUndefined(response);
        });

        it('should return undefined with a RegExp mismatch', function () {
          var response;
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
          var response;
          this.adapter.options({ blockId: 'a' }, this.callback);
          response = this.adapter.dispatch(this.optionsFromBlockMessagePayload);
          assert(this.callback.notCalled);
          assert.isUndefined(response);
        });

        it('should return undefined with a RegExp mismatch with options', function () {
          var response;
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
          var response;
          this.adapter.action({ actionId: 'b' }, this.callback);
          response = this.adapter.dispatch(this.payload);
          assert(this.callback.notCalled);
          assert.isUndefined(response);
        });

        it('should return undefined with a RegExp mismatch', function () {
          var response;
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
          var response;
          this.adapter.options({ actionId: 'b' }, this.callback);
          response = this.adapter.dispatch(this.optionsFromBlockMessagePayload);
          assert(this.callback.notCalled);
          assert.isUndefined(response);
        });

        it('should return undefined with a RegExp mismatch with options', function () {
          var response;
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
          var response;
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
          var response;
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
          var response;
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

      describe('action and options request handlers', function () {
        it('should not match a options handler for an action payload', function () {
          this.adapter.options(this.buttonPayload.callback_id, this.callback);
          this.adapter.dispatch(this.buttonPayload);
          assert(this.callback.notCalled);
        });
        it('should only match the right handler for payload when both have the same callback_id', function () {
          // the following payloads have the same callback_id
          var actionPayload = this.buttonPayload;
          var optionsPayload = this.optionsFromDialogPayload;
          var actionCallback = sinon.spy();
          var optionsCallback = sinon.spy();
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
        var response;
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
