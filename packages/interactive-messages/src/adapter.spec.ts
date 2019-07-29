import * as http from 'http';
import { AddressInfo } from 'net';
import { assert } from 'chai';
import * as sinon from 'sinon';
import getRandomPort from 'get-random-port';
import { createStreamRequest, delayed } from './test-helpers';
// eslint-disable-next-line import/no-named-as-default
import SlackMessageAdapter, {
  ActionConstraints,
  OptionsConstraints,
  DispatchResult,
} from './adapter';

// fixtures
const workingSigningSecret = 'SIGNING_SECRET';
const workingRawBody = 'payload=%7B%22type%22%3A%22interactive_message%22%7D';
type Request = import('express-serve-static-core').Request;
type Response = import('express-serve-static-core').Response;

/* eslint-disable @typescript-eslint/camelcase,@typescript-eslint/no-floating-promises,func-names */

// test suite
describe('SlackMessageAdapter', () => {
  describe('constructor', () => {
    it('should build an instance', () => {
      const adapter = new SlackMessageAdapter(workingSigningSecret);
      assert.instanceOf(adapter, SlackMessageAdapter);
      assert.equal(adapter.syncResponseTimeout, 2500);
    });

    it('should fail without a signing secret', () => {
      assert.throws(() => {
        // eslint-disable-next-line no-new
        new (SlackMessageAdapter as any)();
      }, TypeError);
    });

    it('should allow configuring of the synchronous response timeout', () => {
      const newValue = 20;
      const adapter = new SlackMessageAdapter(workingSigningSecret, {
        syncResponseTimeout: newValue,
      });
      assert.equal(adapter.syncResponseTimeout, newValue);
    });

    it('should fail when the synchronous response timeout is out of range', () => {
      assert.throws(() => {
        // eslint-disable-next-line no-new
        new SlackMessageAdapter(workingSigningSecret, { syncResponseTimeout: 0 });
      }, TypeError);
      assert.throws(() => {
        // eslint-disable-next-line no-new
        new SlackMessageAdapter(workingSigningSecret, { syncResponseTimeout: 3001 });
      }, TypeError);
    });
  });

  describe('#createServer()', () => {
    let adapter: SlackMessageAdapter;

    beforeEach(() => {
      adapter = new SlackMessageAdapter(workingSigningSecret);
    });

    it('should return a Promise of an http.Server', () => {
      return adapter.createServer().then((server) => {
        assert.instanceOf(server, http.Server);
      });
    });
  });

  describe('#start()', () => {
    let adapter: SlackMessageAdapter;
    let portNumber: number;

    beforeEach((done) => {
      adapter = new SlackMessageAdapter(workingSigningSecret);
      getRandomPort((error, port) => {
        if (error) return done(error);
        portNumber = port;
        return done();
      });
    });

    afterEach(() => {
      return adapter.stop().catch(() => {});
    });

    it('should return a Promise for a started http.Server', () => {
      return adapter.start(portNumber).then((server) => {
        // only works in node >= 5.7.0
        // assert(server.listening);
        assert.equal((server.address() as AddressInfo).port, portNumber);
      });
    });
  });

  describe('#stop()', () => {
    let adapter: SlackMessageAdapter;
    let server: http.Server;

    beforeEach((done) => {
      adapter = new SlackMessageAdapter(workingSigningSecret);
      getRandomPort((error, port) => {
        if (error) return done(error);
        return adapter.start(port)
          .then((s) => {
            server = s;
            done();
          })
          .catch(done);
      });
    });

    afterEach(() => {
      return adapter.stop().catch(() => {});
    });

    it('should return a Promise and the server should be stopped', () => {
      return adapter.stop().then(() => {
        assert(!server.listening);
      });
    });
  });

  describe('#expressMiddleware()', () => {
    let adapter: SlackMessageAdapter;
    let next: sinon.SinonStub;
    let dispatch: sinon.SinonStub;
    let res: sinon.SinonStubbedInstance<{
      setHeader: () => void;
      end: () => void;
    }>;

    beforeEach(() => {
      adapter = new SlackMessageAdapter(workingSigningSecret);
      next = sinon.stub();
      dispatch = sinon.stub();
      res = sinon.stub({
        setHeader: () => {},
        end: () => {},
      });
    });

    it('should return a function', () => {
      const middleware = adapter.expressMiddleware();
      assert.isFunction(middleware);
    });

    it('should verify correctly signed request bodies', (done) => {
      const ts = Math.floor(Date.now() / 1000);
      const middleware = adapter.expressMiddleware();
      adapter.dispatch = dispatch;
      // Create streamed request
      const req = createStreamRequest(workingSigningSecret, ts, workingRawBody);

      dispatch.resolves({ status: 200 });
      res.end.callsFake(() => {
        assert(dispatch.called);
        assert.equal((res as unknown as Response).statusCode, 200);
        done();
      });
      middleware(req as Request, res as unknown as Response, next);
    });
  });

  describe('#requestListener()', () => {
    let adapter: SlackMessageAdapter;

    beforeEach(() => {
      adapter = new SlackMessageAdapter(workingSigningSecret);
    });

    it('should return a function', () => {
      const middleware = adapter.requestListener();
      assert.isFunction(middleware);
    });
  });

  // helpers
  /**
   * Encapsulates knowledge of adapter handler registration internals and asserts that a handler
   * was registered.
   *
   * @param adapter actual instance where handler should be registered
   * @param handler expected registered function
   * @param [constraints] expected constraints for which handler should be registered
   */
  function assertHandlerRegistered(
    adapter: SlackMessageAdapter,
    handler: () => void,
    constraints?: ActionConstraints|OptionsConstraints,
  ): void {
    const { callbacks } = (adapter as any);
    assert.isNotEmpty(callbacks);
    const callbackEntry = callbacks.find((aCallbackEntry: any[]) => {
      return handler === aCallbackEntry[1];
    });
    assert.isOk(callbackEntry);
    if (constraints) {
      assert.include(callbackEntry[0], constraints);
    }
  }

  /**
   * Encapsulates knowledge of adapter handler registration internals and unregisters all handlers.
   * @param adapter adapter to unregister handlers of
   */
  function unregisterAllHandlers(adapter: SlackMessageAdapter): void {
    (adapter as any).callbacks = [];
  }

  /**
   * Shared tests
   * @param methodName method being tested
   * @param getAdapter factory to retrieve adapter
   */
  function shouldRegisterWithCallbackId(methodName: string, getAdapter: () => SlackMessageAdapter): void {
    describe('when registering with a callback_id', () => {
      let handler: () => void;
      let adapter: SlackMessageAdapter;

      beforeEach(() => {
        handler = function () { };
        adapter = getAdapter();
      });

      it('a plain string callback_id registers successfully', () => {
        (adapter as any)[methodName]('my_callback', handler);
        assertHandlerRegistered(adapter, handler);
      });

      it('a RegExp callback_id registers successfully', () => {
        (adapter as any)[methodName](/\w+_callback/, handler);
        assertHandlerRegistered(adapter, handler);
      });

      it('invalid callback_id types throw on registration', () => {
        assert.throws(() => {
          (adapter as any)[methodName](5, handler);
        }, TypeError);
        assert.throws(() => {
          (adapter as any)[methodName](true, handler);
        }, TypeError);
        assert.throws(() => {
          (adapter as any)[methodName]([], handler);
        }, TypeError);
        assert.throws(() => {
          (adapter as any)[methodName](null, handler);
        }, TypeError);
        assert.throws(() => {
          (adapter as any)[methodName](undefined, handler);
        }, TypeError);
      });

      it('non-function callbacks throw on registration', () => {
        assert.throws(() => {
          (adapter as any)[methodName]('my_callback', 5);
        }, TypeError);
      });
    });
  }

  describe('#action()', () => {
    let adapter: SlackMessageAdapter;

    beforeEach(() => {
      adapter = new SlackMessageAdapter(workingSigningSecret);
    });

    it('should fail action registration without handler', () => {
      assert.throws(() => {
        (adapter.action as any)('my_callback');
      }, TypeError);
    });

    // execute shared tests
    shouldRegisterWithCallbackId('action', () => adapter);

    describe('when registering with a complex set of constraints', () => {
      let actionHandler: () => void;

      beforeEach(() => {
        actionHandler = function () {};
      });

      it('should register with valid type constraints successfully', () => {
        const constraintsSet = [
          { type: 'button' },
          { type: 'select' },
          { type: 'dialog_submission' },
        ];
        constraintsSet.forEach((constraints) => {
          adapter.action(constraints, actionHandler);
          assertHandlerRegistered(adapter, actionHandler, constraints);
          unregisterAllHandlers(adapter);
        });
      });

      it('should register with unfurl constraint successfully', () => {
        const constraints = { unfurl: true };
        adapter.action(constraints, actionHandler);
        assertHandlerRegistered(adapter, actionHandler, constraints);
      });

      it('should register with blockId constraints successfully', () => {
        const constraints = { blockId: 'my_block' };
        adapter.action(constraints, actionHandler);
        assertHandlerRegistered(adapter, actionHandler, constraints);
      });

      it('invalid block_id types throw on registration', () => {
        assert.throws(() => {
          adapter.action({ blockId: 5 as unknown as string }, actionHandler);
        }, TypeError);
        assert.throws(() => {
          adapter.action({ blockId: true as unknown as string }, actionHandler);
        }, TypeError);
        assert.throws(() => {
          adapter.action({ blockId: [] as unknown as string }, actionHandler);
        }, TypeError);
        assert.throws(() => {
          adapter.action({ blockId: null as unknown as string }, actionHandler);
        }, TypeError);
        assert.throws(() => {
          adapter.action({ blockId: undefined as unknown as string }, actionHandler);
        }, TypeError);
      });

      it('should register with actionId constraints successfully', () => {
        const constraints = { actionId: 'my_action' };
        adapter.action(constraints, actionHandler);
        assertHandlerRegistered(adapter, actionHandler, constraints);
      });

      it('invalid action_id types throw on registration', () => {
        assert.throws(() => {
          adapter.action({ actionId: 5 as unknown as string }, actionHandler);
        }, TypeError);
        assert.throws(() => {
          adapter.action({ actionId: true as unknown as string }, actionHandler);
        }, TypeError);
        assert.throws(() => {
          adapter.action({ actionId: [] as unknown as string }, actionHandler);
        }, TypeError);
        assert.throws(() => {
          adapter.action({ actionId: null as unknown as string }, actionHandler);
        }, TypeError);
        assert.throws(() => {
          adapter.action({ actionId: undefined as unknown as string }, actionHandler);
        }, TypeError);
      });

      it('should register with compound block constraints successfully', () => {
        const constraints = { blockId: 'my_block', actionId: 'wham' };
        adapter.action(constraints, actionHandler);
        assertHandlerRegistered(adapter, actionHandler, constraints);
      });

      it('should register with valid compound constraints successfully', () => {
        const constraints = { callbackId: 'my_callback', type: 'button' };
        adapter.action(constraints, actionHandler);
        assertHandlerRegistered(adapter, actionHandler, constraints);
      });

      it('should throw when registering with invalid compound constraints', () => {
        // number isn't valid callbackId, all types are valid
        const constraints = { callbackId: 111 as unknown as string, type: 'button' };
        assert.throws(() => {
          adapter.action(constraints, actionHandler);
        }, TypeError);
      });
    });
  });

  describe('#options()', () => {
    let adapter: SlackMessageAdapter;

    beforeEach(() => {
      adapter = new SlackMessageAdapter(workingSigningSecret);
    });

    it('should fail options registration without handler', () => {
      assert.throws(() => {
        (adapter.options as any)('my_callback');
      }, TypeError);
    });

    // execute shared tests
    shouldRegisterWithCallbackId('options', () => adapter);

    describe('when registering with a complex set of constraints', () => {
      let optionsHandler: () => void;

      beforeEach(() => {
        optionsHandler = function () {};
      });

      it('should register with valid from constraints successfully', () => {
        const constraintsSet: OptionsConstraints[] = [
          { within: 'interactive_message' },
          { within: 'dialog' },
        ];
        constraintsSet.forEach((constraints) => {
          adapter.options(constraints, optionsHandler);
          assertHandlerRegistered(adapter, optionsHandler, constraints);
          unregisterAllHandlers(adapter);
        });
      });

      it('should throw when registering with invalid within constraints', () => {
        const constraints = { within: 'not_a_real_options_source' };
        assert.throws(() => {
          adapter.options(constraints as unknown as OptionsConstraints, optionsHandler);
        }, TypeError);
      });

      it('should register with valid compound constraints successfully', () => {
        const constraints: OptionsConstraints = { callbackId: 'my_callback', within: 'dialog' };
        adapter.options(constraints, optionsHandler);
        assertHandlerRegistered(adapter, optionsHandler, constraints);
      });

      it('should throw when registering with invalid compound constraints', () => {
        const constraints = { callbackId: /\w+_callback/, within: 'not_a_real_options_source' };
        assert.throws(() => {
          adapter.options(constraints as unknown as OptionsConstraints, optionsHandler);
        }, TypeError);
      });
    });
  });

  describe('#dispatch()', () => {
    let adapter: SlackMessageAdapter;

    beforeEach(() => {
      adapter = new SlackMessageAdapter(workingSigningSecret, {
        // using a short timout to make tests finish faster
        syncResponseTimeout: 50,
      });
    });

    /**
     * Assert the result of a dispatch contains a certain message
     * @param response actual return value of adapter.dispatch
     * @param status expected status
     * @param content expected value of response body
     */
    function assertResponseStatusAndMessage(
      response: Promise<DispatchResult>,
      status: number,
      content?: any,
    ): Promise<void> {
      return response.then((res) => {
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
     * @param msgAdapter actual adapter
     * @param requestUrl expected request URL
     * @param messages expected messages in request body
     */
    function assertPostRequestMadeWithMessages(
      msgAdapter: SlackMessageAdapter,
      requestUrl: string,
      ...messages: any[]
    ): Promise<void[]> {
      const messagePromiseEntries = messages.map(() => {
        const entry: { promise?: Promise<void>; resolve?: () => void } = {};
        entry.promise = new Promise((resolve) => {
          entry.resolve = resolve;
        });
        return entry;
      });

      sinon.stub((msgAdapter as any).axios, 'post').callsFake((url, body) => {
        if (url !== requestUrl) {
          return;
        }
        const messageIndex = messages.findIndex((message) => {
          try {
            assert.deepEqual(body, message);
            return true;
          } catch (_) {
            return false;
          }
        });
        if (messageIndex >= 0) {
          messagePromiseEntries[messageIndex].resolve!();
        }
      });

      return Promise.all(messagePromiseEntries.map((entry) => {
        return entry.promise;
      }));
    }

    describe('when dispatching a message action request', () => {
      let requestPayload: Record<string, any>;
      let replacement: Record<string, any>;

      beforeEach(() => {
        // this represents a minimum action from a button
        requestPayload = {
          callback_id: 'id',
          actions: [{
            type: 'button',
          }],
          response_url: 'https://example.com',
        };
        replacement = { text: 'example replacement message' };
      });

      it('should handle the callback returning a message with a synchronous response', () => {
        adapter.action(requestPayload.callback_id, (payload, respond) => {
          assert.deepEqual(payload, requestPayload);
          assert.isFunction(respond);
          return replacement;
        });
        const dispatchResponse = adapter.dispatch(requestPayload)!;
        return assertResponseStatusAndMessage(dispatchResponse, 200, replacement);
      });

      it('should handle the callback returning a promise of a message before the timeout with a ' +
         'synchronous response', function () {
        const timeout = adapter.syncResponseTimeout;
        this.timeout(timeout);
        adapter.action(requestPayload.callback_id, (payload, respond) => {
          assert.deepEqual(payload, requestPayload);
          assert.isFunction(respond);
          return delayed(timeout * 0.1, replacement);
        });
        const dispatchResponse = adapter.dispatch(requestPayload)!;
        return assertResponseStatusAndMessage(dispatchResponse, 200, replacement);
      });

      it('should handle the callback returning a promise of a message after the timeout with an ' +
         'asynchronous response', function () {
        const expectedAsyncRequest = assertPostRequestMadeWithMessages(
          adapter,
          requestPayload.response_url,
          replacement,
        );
        const timeout = adapter.syncResponseTimeout;
        this.timeout(timeout * 2);
        adapter.action(requestPayload.callback_id, (payload, respond) => {
          assert.deepEqual(payload, requestPayload);
          assert.isFunction(respond);
          return delayed(timeout * 1.1, replacement);
        });
        const dispatchResponse = adapter.dispatch(requestPayload)!;
        return Promise.all([
          assertResponseStatusAndMessage(dispatchResponse, 200),
          expectedAsyncRequest,
        ]);
      });

      it('should handle the callback returning a promise that fails after the timeout with a ' +
         'sychronous response', function () {
        const timeout = adapter.syncResponseTimeout;
        this.timeout(timeout * 2);
        adapter.action(requestPayload.callback_id, () => {
          return delayed(timeout * 1.1, undefined, 'test error');
        });
        const dispatchResponse = adapter.dispatch(requestPayload)!;
        return assertResponseStatusAndMessage(dispatchResponse, 200);
      });

      it('should handle the callback returning a promise that fails before the timeout with a ' +
         'sychronous response', function () {
        const timeout = adapter.syncResponseTimeout;
        this.timeout(timeout);
        adapter.action(requestPayload.callback_id, () => {
          return delayed(timeout * 0.1, undefined, 'test error');
        });
        const dispatchResponse = adapter.dispatch(requestPayload)!;
        return assertResponseStatusAndMessage(dispatchResponse, 500);
      });

      it('should handle the callback returning nothing and using respond to send a message', function () {
        const expectedAsyncRequest = assertPostRequestMadeWithMessages(
          adapter,
          requestPayload.response_url,
          replacement,
        );
        const timeout = adapter.syncResponseTimeout;
        this.timeout(timeout * 2);
        adapter.action(requestPayload.callback_id, (_payload, respond) => {
          delayed(timeout * 1.1, null)
            .then(() => {
              respond(replacement);
            });
        });
        const dispatchResponse = adapter.dispatch(requestPayload)!;
        return Promise.all([
          assertResponseStatusAndMessage(dispatchResponse, 200),
          expectedAsyncRequest,
        ]);
      });

      it('should handle the callback returning a promise of a message after the timeout with an ' +
         'asynchronous response and using respond to send another asynchronous response', function () {
        const secondReplacement = { ...replacement, text: '2nd replacement' };
        const expectedAsyncRequest = assertPostRequestMadeWithMessages(
          adapter,
          requestPayload.response_url,
          replacement,
          secondReplacement,
        );
        const timeout = adapter.syncResponseTimeout;
        this.timeout(timeout * 2);
        adapter.action(requestPayload.callback_id, (_payload, respond) => {
          delayed(timeout * 1.2, null)
            .then(() => {
              respond(secondReplacement);
            });
          return delayed(timeout * 1.1, replacement);
        });
        const dispatchResponse = adapter.dispatch(requestPayload)!;
        return Promise.all([
          assertResponseStatusAndMessage(dispatchResponse, 200),
          expectedAsyncRequest,
        ]);
      });

      it('should handle the callback returning nothing with a synchronous response and using ' +
         'respond to send multiple asynchronous responses', function () {
        const secondReplacement = { ...replacement, text: '2nd replacement' };
        const expectedAsyncRequest = assertPostRequestMadeWithMessages(
          adapter,
          requestPayload.response_url,
          replacement,
          secondReplacement,
        );
        const timeout = adapter.syncResponseTimeout;
        this.timeout(timeout * 2);
        adapter.action(requestPayload.callback_id, (_payload, respond) => {
          delayed(timeout * 1.1, null)
            .then(() => {
              respond(replacement);
              return delayed(timeout * 0.1, null);
            })
            .then(() => {
              respond(secondReplacement);
            });
        });
        const dispatchResponse = adapter.dispatch(requestPayload)!;
        return Promise.all([
          assertResponseStatusAndMessage(dispatchResponse, 200),
          expectedAsyncRequest,
        ]);
      });

      describe('when lateResponseFallbackEnabled is configured as false', () => {
        beforeEach(() => {
          adapter = new SlackMessageAdapter(workingSigningSecret, {
            syncResponseTimeout: 30,
            lateResponseFallbackEnabled: false,
          });
        });

        it('should handle the callback returning a promise of a message after the timeout with a ' +
            'synchronous response', function () {
          const timeout = adapter.syncResponseTimeout;
          this.timeout(timeout * 2);
          adapter.action(requestPayload.callback_id, (payload, respond) => {
            assert.deepEqual(payload, requestPayload);
            assert.isFunction(respond);
            return delayed(timeout * 1.1, replacement);
          });
          const dispatchResponse = adapter.dispatch(requestPayload)!;
          return assertResponseStatusAndMessage(dispatchResponse, 200, replacement);
        });

        it('should handle the callback returning a promise that fails after the timeout with a ' +
           'sychronous response', function () {
          const timeout = adapter.syncResponseTimeout;
          this.timeout(timeout * 2);
          adapter.action(requestPayload.callback_id, () => {
            return delayed(timeout * 1.1, undefined, 'test error');
          });
          const dispatchResponse = adapter.dispatch(requestPayload)!;
          return assertResponseStatusAndMessage(dispatchResponse, 500);
        });
      });
    });

    describe('when dispatching a dialog submission request', () => {
      let requestPayload: Record<string, any>;
      let submissionResponse: Record<string, any>;
      let followUp: Record<string, any>;

      beforeEach(() => {
        requestPayload = {
          type: 'dialog_submission',
          callback_id: 'id',
          submission: {
            email_address: 'ankur@h4x0r.com',
          },
          response_url: 'https://example.com',
        };
        submissionResponse = {
          errors: [
            {
              name: 'email_address',
              error: 'Sorry, this email domain is not authorized!',
            },
          ],
        };
        followUp = { text: 'thanks for submitting your email address' };
      });

      it('should handle the callback returning a message with a synchronous response', () => {
        adapter.action(requestPayload.callback_id, (payload, respond) => {
          assert.deepEqual(payload, requestPayload);
          assert.isFunction(respond);
          return submissionResponse;
        });
        const dispatchResponse = adapter.dispatch(requestPayload)!;
        return assertResponseStatusAndMessage(dispatchResponse, 200, submissionResponse);
      });

      it('should handle the callback returning a promise of a message before the timeout with a ' +
         'synchronous response', function () {
        const timeout = adapter.syncResponseTimeout;
        this.timeout(timeout);
        adapter.action(requestPayload.callback_id, (payload, respond) => {
          assert.deepEqual(payload, requestPayload);
          assert.isFunction(respond);
          return delayed(timeout * 0.1, submissionResponse);
        });
        const dispatchResponse = adapter.dispatch(requestPayload)!;
        return assertResponseStatusAndMessage(dispatchResponse, 200, submissionResponse);
      });

      it('should handle the callback returning a promise of a message after the timeout with a ' +
         'synchronous response', function () {
        const timeout = adapter.syncResponseTimeout;
        this.timeout(timeout * 2);
        adapter.action(requestPayload.callback_id, (payload, respond) => {
          assert.deepEqual(payload, requestPayload);
          assert.isFunction(respond);
          return delayed(timeout * 1.1, submissionResponse);
        });
        const dispatchResponse = adapter.dispatch(requestPayload)!;
        return assertResponseStatusAndMessage(dispatchResponse, 200, submissionResponse);
      });

      it('should handle the callback returning nothing with a synchronous response', () => {
        adapter.action(requestPayload.callback_id, (payload, respond) => {
          assert.deepEqual(payload, requestPayload);
          assert.isFunction(respond);
        });
        const dispatchResponse = adapter.dispatch(requestPayload)!;
        return assertResponseStatusAndMessage(dispatchResponse, 200);
      });

      it('should handle the callback using respond to send a follow up message', function () {
        const expectedAsyncRequest = assertPostRequestMadeWithMessages(
          adapter,
          requestPayload.response_url,
          followUp,
        );
        const timeout = adapter.syncResponseTimeout;
        this.timeout(timeout * 2);
        adapter.action(requestPayload.callback_id, (_payload, respond) => {
          delayed(timeout * 1.1, null)
            .then(() => {
              respond(followUp);
            });
        });
        const dispatchResponse = adapter.dispatch(requestPayload)!;
        return Promise.all([
          assertResponseStatusAndMessage(dispatchResponse, 200),
          expectedAsyncRequest,
        ]);
      });
    });

    describe('when dispatching a menu options request', () => {
      let requestPayload: Record<string, any>;
      let optionsResponse: Record<string, any>;

      beforeEach(() => {
        // this represents a minimum menu options request from an interactive message
        requestPayload = {
          name: 'bug_name',
          value: 'TRAC-12',
          type: 'interactive_message',
          callback_id: 'id',
        };
        optionsResponse = {
          options: [
            {
              text: 'Buggy McBugface',
              value: 'TRAC-12345',
            },
          ],
        };
      });

      // NOTE: if the response options or options_groups contain the property "label", we can
      // change them to "text"
      it('should handle the callback returning options with a synchronous response', () => {
        (adapter.options as any)(requestPayload.callback_id, (payload: any, secondArg: any) => {
          assert.deepEqual(payload, requestPayload);
          assert.isUndefined(secondArg);
          return optionsResponse;
        });
        const dispatchResponse = adapter.dispatch(requestPayload)!;
        return assertResponseStatusAndMessage(dispatchResponse, 200, optionsResponse);
      });

      it('should handle the callback returning a promise of options before the timeout with a ' +
         'synchronous response', function () {
        const timeout = adapter.syncResponseTimeout;
        this.timeout(timeout);
        (adapter.options as any)(requestPayload.callback_id, (payload: any, secondArg: any) => {
          assert.deepEqual(payload, requestPayload);
          assert.isUndefined(secondArg);
          return delayed(timeout * 0.1, optionsResponse);
        });
        const dispatchResponse = adapter.dispatch(requestPayload)!;
        return assertResponseStatusAndMessage(dispatchResponse, 200, optionsResponse);
      });

      it('should handle the callback returning a promise of options after the timeout with a ' +
         'synchronous response', function () {
        const timeout = adapter.syncResponseTimeout;
        this.timeout(timeout * 2);
        (adapter.options as any)(requestPayload.callback_id, (payload: any, secondArg: any) => {
          assert.deepEqual(payload, requestPayload);
          assert.isUndefined(secondArg);
          return delayed(timeout * 1.1, optionsResponse);
        });
        const dispatchResponse = adapter.dispatch(requestPayload)!;
        return assertResponseStatusAndMessage(dispatchResponse, 200, optionsResponse);
      });

      it('should handle the callback returning nothing with a synchronous response', () => {
        (adapter.options as any)(requestPayload.callback_id, (payload: any, secondArg: any) => {
          assert.deepEqual(payload, requestPayload);
          assert.isUndefined(secondArg);
        });
        const dispatchResponse = adapter.dispatch(requestPayload)!;
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
    describe('callback matching', () => {
      let buttonPayload: Record<string, any>;
      let buttonPayloadBlocks: Record<string, any>;
      let buttonAppUnfurlPayload: Record<string, any>;
      let optionsFromInteractiveMessagePayload: Record<string, any>;
      let optionsFromBlockMessagePayload: Record<string, any>;
      let optionsFromDialogPayload: Record<string, any>;
      let callback: sinon.SinonSpy;

      beforeEach(() => {
        buttonPayload = {
          callback_id: 'id',
          actions: [{
            type: 'button',
          }],
          response_url: 'https://example.com',
        };
        buttonPayloadBlocks = {
          actions: [{
            type: 'button',
            block_id: 'b_id',
            action_id: 'a_id',
          }],
          response_url: 'https://example.com',
        };
        buttonAppUnfurlPayload = { ...buttonPayload, is_app_unfurl: true };
        // NOTE: this payload isn't used in a test but it remains a good reference
        /*
        dialogSubmissionPayload = {
          type: 'dialog_submission',
          callback_id: 'id',
          submission: {
            name: 'Value',
          },
          response_url: 'https://example.com',
        };
        menuSelectionPayload = {
          callback_id: 'id',
          actions: [{
            name: 'pick_a_thing',
            selected_options: [{
              value: 'Option A',
            }],
          }],
          response_url: 'https://example.com',
        };
        */
        optionsFromInteractiveMessagePayload = {
          name: 'pick_a_thing',
          value: 'opti',
          callback_id: 'id',
          type: 'interactive_message',
        };
        optionsFromBlockMessagePayload = {
          value: 'opti',
          block_id: 'b_id',
          action_id: 'a_id',
          type: 'block_suggestion',
        };
        optionsFromDialogPayload = {
          name: 'pick_a_thing',
          value: 'opti',
          callback_id: 'id',
          type: 'dialog_suggestion',
        };
        callback = sinon.spy();
      });

      it('should return undefined when there are no callbacks registered', () => {
        const response = adapter.dispatch({});
        assert.isUndefined(response);
      });

      describe('callback ID based matching', () => {
        let payload: Record<string, unknown>;

        beforeEach(() => {
          payload = buttonPayload;
        });

        it('should return undefined with a string mismatch', () => {
          adapter.action('b', callback);
          const response = adapter.dispatch(payload);
          assert(callback.notCalled);
          assert.isUndefined(response);
        });

        it('should return undefined with a RegExp mismatch', () => {
          adapter.action(/b/, callback);
          const response = adapter.dispatch(payload);
          assert(callback.notCalled);
          assert.isUndefined(response);
        });

        // TODO: successful match on string, successful match on regexp, matches when registered
        // as an options handler instead
      });

      describe('block ID based matching', () => {
        let payload: Record<string, unknown>;

        beforeEach(() => {
          payload = buttonPayloadBlocks;
        });

        it('should return undefined with a string mismatch', () => {
          adapter.action({ blockId: 'a' }, callback);
          const response = adapter.dispatch(payload);
          assert(callback.notCalled);
          assert.isUndefined(response);
        });

        it('should return undefined with a RegExp mismatch', () => {
          adapter.action({ blockId: /a/ }, callback);
          const response = adapter.dispatch(payload);
          assert(callback.notCalled);
          assert.isUndefined(response);
        });

        it('should match with matching blockId', () => {
          adapter.action({ blockId: 'b_id' }, callback);
          adapter.dispatch(payload);
          assert(callback.called);
        });

        it('should match with matching RegExp blockId', () => {
          adapter.action({ blockId: /b/ }, callback);
          adapter.dispatch(payload);
          assert(callback.called);
        });

        it('should return undefined with a string mismatch with options', () => {
          adapter.options({ blockId: 'a', within: 'interactive_message' }, callback);
          const response = adapter.dispatch(optionsFromBlockMessagePayload);
          assert(callback.notCalled);
          assert.isUndefined(response);
        });

        it('should return undefined with a RegExp mismatch with options', () => {
          adapter.options({ blockId: /a/, within: 'interactive_message' }, callback);
          const response = adapter.dispatch(optionsFromBlockMessagePayload);
          assert(callback.notCalled);
          assert.isUndefined(response);
        });

        it('should match with matching blockId with options', () => {
          adapter.options({ blockId: 'b_id', within: 'interactive_message' }, callback);
          adapter.dispatch(optionsFromBlockMessagePayload);
          assert(callback.called);
        });

        it('should match with matching RegExp blockId with options', () => {
          adapter.options({ blockId: /b/, within: 'interactive_message' }, callback);
          adapter.dispatch(optionsFromBlockMessagePayload);
          assert(callback.called);
        });
      });

      describe('action ID based matching', () => {
        let payload: Record<string, unknown>;

        beforeEach(() => {
          payload = buttonPayloadBlocks;
        });

        it('should return undefined with a string mismatch', () => {
          adapter.action({ actionId: 'b' }, callback);
          const response = adapter.dispatch(payload);
          assert(callback.notCalled);
          assert.isUndefined(response);
        });

        it('should return undefined with a RegExp mismatch', () => {
          adapter.action({ actionId: /b/ }, callback);
          const response = adapter.dispatch(payload);
          assert(callback.notCalled);
          assert.isUndefined(response);
        });

        it('should match with matching actionId', () => {
          adapter.action({ actionId: 'a_id' }, callback);
          adapter.dispatch(payload);
          assert(callback.called);
        });

        it('should match with matching RegExp actionId', () => {
          adapter.action({ actionId: /a/ }, callback);
          adapter.dispatch(payload);
          assert(callback.called);
        });

        it('should return undefined with a string mismatch with options', () => {
          adapter.options({ actionId: 'b', within: 'interactive_message' }, callback);
          const response = adapter.dispatch(optionsFromBlockMessagePayload);
          assert(callback.notCalled);
          assert.isUndefined(response);
        });

        it('should return undefined with a RegExp mismatch with options', () => {
          adapter.options({ actionId: /b/, within: 'interactive_message' }, callback);
          const response = adapter.dispatch(optionsFromBlockMessagePayload);
          assert(callback.notCalled);
          assert.isUndefined(response);
        });

        it('should match with matching string actionId with options', () => {
          adapter.options({ actionId: 'a_id', within: 'interactive_message' }, callback);
          adapter.dispatch(optionsFromBlockMessagePayload);
          assert(callback.called);
        });

        it('should match with matching RegExp actionId with options', () => {
          adapter.options({ actionId: /a/, within: 'interactive_message' }, callback);
          adapter.dispatch(optionsFromBlockMessagePayload);
          assert(callback.called);
        });
      });

      describe('type based matching', () => {
        let payload: Record<string, unknown>;

        beforeEach(() => {
          payload = buttonPayload;
        });

        it('should return undefined when type is present in constraints and it mismatches', () => {
          adapter.action({ type: 'select' }, callback);
          const response = adapter.dispatch(payload);
          assert(callback.notCalled);
          assert.isUndefined(response);
        });

        it('should match when type not present in constraints', () => {
          adapter.action({}, callback);
          adapter.dispatch(payload);
          assert(callback.called);
        });

        it('should not throw when type is not found in payload', () => {
          adapter.action({}, callback);
          adapter.dispatch({ actions: [{}] });
        });

        // TODO: successful match on type (utilize the unused payloads above)
      });

      describe('unfurl based matching', () => {
        let payload: Record<string, unknown>;

        beforeEach(() => {
          payload = buttonAppUnfurlPayload;
        });

        it('should return undefined when unfurl is present in constraints and it mismatches', () => {
          adapter.action({ unfurl: false }, callback);
          const response = adapter.dispatch(payload);
          assert(callback.notCalled);
          assert.isUndefined(response);
        });

        it('should match when unfurl not present in constraints', () => {
          adapter.action({}, callback);
          adapter.dispatch(payload);
          assert(callback.called);
        });

        // TODO: successful match on unfurl
      });

      describe('within based matching (options request only)', () => {
        it('should return undefined when within is present in constraints and it mismatches', () => {
          let response;
          adapter.options({ within: 'dialog' }, callback);
          response = adapter.dispatch(optionsFromInteractiveMessagePayload);
          assert(callback.notCalled);
          assert.isUndefined(response);

          unregisterAllHandlers(adapter);

          adapter.options({ within: 'interactive_message' }, callback);
          response = adapter.dispatch(optionsFromDialogPayload);
          assert(callback.notCalled);
          assert.isUndefined(response);

          unregisterAllHandlers(adapter);

          adapter.options({ within: 'block_actions' }, callback);
          response = adapter.dispatch(optionsFromInteractiveMessagePayload);
          assert(callback.notCalled);
          assert.isUndefined(response);
        });

        it('should match when within is not present in constraints', () => {
          adapter.options({} as any, callback);
          adapter.dispatch(optionsFromInteractiveMessagePayload);
          assert(callback.called);
        });

        it('should match using within constraint on options requests from interactive messages', () => {
          adapter.options({ within: 'interactive_message' }, callback);
          adapter.dispatch(optionsFromInteractiveMessagePayload);
          assert(callback.called);
        });

        it('should match using within constraint on options requests from Block Kit messages', () => {
          adapter.options({ within: 'block_actions' }, callback);
          adapter.dispatch(optionsFromBlockMessagePayload);
          assert(callback.called);
        });

        it('should match using within constraint on options requests from dialog', () => {
          adapter.options({ within: 'dialog' }, callback);
          adapter.dispatch(optionsFromDialogPayload);
          assert(callback.called);
        });
      });

      describe('action and options request handlers', () => {
        it('should not match a options handler for an action payload', () => {
          adapter.options(buttonPayload.callback_id, callback);
          adapter.dispatch(buttonPayload);
          assert(callback.notCalled);
        });

        it('should only match the right handler for payload when both have the same callback_id', () => {
          // the following payloads have the same callback_id
          const actionPayload = buttonPayload;
          const optionsPayload = optionsFromDialogPayload;
          const actionCallback = sinon.spy();
          const optionsCallback = sinon.spy();
          adapter.action(actionPayload.callback_id, actionCallback);
          adapter.options(actionPayload.callback_id, optionsCallback);

          adapter.dispatch(actionPayload);

          assert(actionCallback.called);
          assert(optionsCallback.notCalled);

          adapter.dispatch(optionsPayload);

          assert(optionsCallback.calledOnce);
          assert(actionCallback.calledOnce);
        });
      });
    });

    describe('callback error handling', () => {
      it('should respond with an error when the registered callback throws', () => {
        adapter.action('a', () => {
          throw new Error('test error');
        });
        const response = adapter.dispatch({ callback_id: 'a', actions: [{}] })!;
        return assertResponseStatusAndMessage(response, 500);
      });

      it('should fail with an error when calling respond inside a callback with a promise', (done) => {
        adapter.action('a', (_payload, respond) => {
          assert.isFunction(respond);
          assert.throws(() => {
            respond(Promise.resolve('b'));
          }, TypeError);
          done();
        });
        adapter.dispatch({ callback_id: 'a', actions: [{}], response_url: 'http://example.com' });
      });
    });
  });
});
