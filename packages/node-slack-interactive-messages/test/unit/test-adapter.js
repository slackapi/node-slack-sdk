/* global Promise */

var http = require('http');
var assert = require('chai').assert;
var proxyquire = require('proxyquire');
var sinon = require('sinon');
var nop = require('nop');
var getRandomPort = require('get-random-port');
var systemUnderTest = require('../../dist/adapter');
var SlackMessageAdapter = systemUnderTest.default;
var delayed = require('../helpers').delayed;

// fixtures
var workingVerificationToken = 'VERIFICATION_TOKEN';

// test suite
describe('SlackMessageAdapter', function () {
  describe('constructor', function () {
    it('should build an instance', function () {
      var adapter = new SlackMessageAdapter(workingVerificationToken);
      assert.instanceOf(adapter, SlackMessageAdapter);
      assert.equal(adapter.syncResponseTimeout, 2500);
    });
    it('should fail without a verification token', function () {
      assert.throws(function () {
        var adapter = new SlackMessageAdapter(); // eslint-disable-line no-unused-vars
      }, TypeError);
    });
    it('should allow configuring of synchronous response timeout', function () {
      var newValue = 20;
      var adapter = new SlackMessageAdapter(workingVerificationToken, {
        syncResponseTimeout: newValue
      });
      assert.equal(adapter.syncResponseTimeout, newValue);
    });
    it('should fail when the synchronous response timeout is out of range', function () {
      assert.throws(function () {
        // eslint-disable-next-line no-unused-vars
        var a = new SlackMessageAdapter(workingVerificationToken, { syncResponseTimeout: 0 });
      }, TypeError);
      assert.throws(function () {
        // eslint-disable-next-line no-unused-vars
        var a = new SlackMessageAdapter(workingVerificationToken, { syncResponseTimeout: 3001 });
      }, TypeError);
    });
  });

  // TODO: use syncResponseTimeout config to make running all the timeout dependent tests faster

  describe('#createServer()', function () {
    beforeEach(function () {
      this.adapter = new SlackMessageAdapter(workingVerificationToken);
    });
    describe('when express package is not found', function () {
      beforeEach(function () {
        var SlackMessageAdapterNoExpress = proxyquire('../../dist/adapter', { express: null }).default;
        this.adapter = new SlackMessageAdapterNoExpress(workingVerificationToken);
      });
      it('should reject', function () {
        return this.adapter.createServer()
          .then(function (server) {
            assert.isNotOk(server, 'a server was created');
          })
          .catch(function (error) {
            if (error.code === 'MODULE_NOT_FOUND') {
              assert(true);
            } else {
              throw error;
            }
          });
      });
    });

    describe('when body-parser package is not found', function () {
      beforeEach(function () {
        var SlackMessageAdapterNoBodyParser = proxyquire('../../dist/adapter', { 'body-parser': null }).default;
        this.adapter = new SlackMessageAdapterNoBodyParser(workingVerificationToken);
      });
      it('should reject', function () {
        return this.adapter.createServer()
          .then(function (server) {
            assert.isNotOk(server, 'a server was created');
          })
          .catch(function (error) {
            if (error.code === 'MODULE_NOT_FOUND') {
              assert(true);
            } else {
              throw error;
            }
          });
      });
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
      self.adapter = new SlackMessageAdapter(workingVerificationToken);
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
      self.adapter = new SlackMessageAdapter(workingVerificationToken);
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
      this.adapter = new SlackMessageAdapter(workingVerificationToken);
    });
    it('should return a function', function () {
      var middleware = this.adapter.expressMiddleware();
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
      assert.deepEqual(callbackEntry[0], constraints);
    }
  }

  /**
   * Encapsulates knowledge of adapter handler registration internals and unregistered all handlers.
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
      this.adapter = new SlackMessageAdapter(workingVerificationToken);
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
      it('should throw when registering with invalid type constraints', function () {
        var adapter = this.adapter;
        var actionHandler = this.actionHandler;
        var constraints = { type: 'not_a_real_action_type' };
        assert.throws(function () {
          adapter.action(constraints, actionHandler);
        }, TypeError);
      });
      it('should register with valid compound constraints successfully', function () {
        var constraints = { callbackId: 'my_callback', type: 'button' };
        this.adapter.action(constraints, this.actionHandler);
        assertHandlerRegistered(this.adapter, this.actionHandler, constraints);
      });
      it('should throw when registering with invalid compound constraints', function () {
        var actionHandler = this.actionHandler;
        var constraints = { callbackId: /\w+_callback/, type: 'not_a_real_action_type' };
        assert.throws(function () {
          this.adapter.action(constraints, actionHandler);
        }, TypeError);
      });
      it('should register with unfurl constraint successfully', function () {
        var constraints = { unfurl: true };
        this.adapter.action(constraints, this.actionHandler);
        assertHandlerRegistered(this.adapter, this.actionHandler, constraints);
      });
    });
  });

  describe('#options()', function () {
    beforeEach(function () {
      this.adapter = new SlackMessageAdapter(workingVerificationToken);
    });
    it('should fail options registration without handler', function () {
      assert.throws(function () {
        this.adapter.options('my_callback');
      }, TypeError);
    });

    // execute shared tests
    shouldRegisterWithCallbackId('options');
  });

  describe('#dispatch()', function () {
    beforeEach(function () {
      this.adapter = new SlackMessageAdapter(workingVerificationToken, {
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

    // NOTE: the middleware has to check the verification token, poweredBy headers
    describe('when dispatching a message action request', function () {
      beforeEach(function () {
        this.requestPayload = {
          type: 'interactive_message',
          callback_id: 'id',
          actions: [{}],
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
          this.adapter = new SlackMessageAdapter(workingVerificationToken, {
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
      it('should handle the callback returning options with a synchronous response', function () {
        var dispatchResponse;
        var requestPayload = this.requestPayload;
        var optionsResponse = this.optionsResponse;
        this.adapter.action(requestPayload.callback_id, function (payload, secondArg) {
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
        this.adapter.action(requestPayload.callback_id, function (payload, secondArg) {
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
        this.adapter.action(requestPayload.callback_id, function (payload, secondArg) {
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
        this.adapter.action(requestPayload.callback_id, function (payload, secondArg) {
          assert.deepEqual(payload, requestPayload);
          assert.isUndefined(secondArg);
        });
        dispatchResponse = this.adapter.dispatch(requestPayload);
        return assertResponseStatusAndMessage(dispatchResponse, 200);
      });
    });

    describe('callback matching', function () {
      it('should return undefined when there are no callbacks registered', function () {
        var response = this.adapter.dispatch({});
        assert.isUndefined(response);
      });

      describe('callback ID based matching', function () {
        beforeEach(function () {
          this.payload = { callback_id: 'a' };
          this.callback = sinon.spy();
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
      });

      describe('type based matching', function () {
        beforeEach(function () {
          this.payload = { callback_id: 'a', actions: [{ type: 'select' }] };
          this.callback = sinon.spy();
        });

        it('should return undefined when type is present in constraints and it mismatches', function () {
          var response;
          this.adapter.action({ type: 'button' }, this.callback);
          response = this.adapter.dispatch(this.payload);
          assert(this.callback.notCalled);
          assert.isUndefined(response);
        });

        it('should match when type not present in constraints', function () {
          this.adapter.action({}, this.callback);
          this.adapter.dispatch(this.payload);
          assert(this.callback.called);
        });
      });

      describe('unfurl based matching', function () {
        beforeEach(function () {
          this.payload = { callback_id: 'a', is_app_unfurl: true };
          this.callback = sinon.spy();
        });

        it('should return undefined with unfurl is present in constraints and it mismatches', function () {
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
      });
    });

    it('should respond with an error when the registered callback throws', function () {
      var response;
      this.adapter.action('a', function () {
        throw new Error('test error');
      });
      response = this.adapter.dispatch({ callback_id: 'a' });
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
      this.adapter.dispatch({ callback_id: 'a', response_url: 'http://example.com' });
    });
  });
});
