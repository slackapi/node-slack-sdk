import fs from 'node:fs';
import axios, { type InternalAxiosRequestConfig } from 'axios';
import { assert, expect } from 'chai';
import nock, { type ReplyHeaders } from 'nock';
import sinon from 'sinon';
import {
  type RequestConfig,
  type WebAPICallResult,
  WebClient,
  WebClientEvent,
  buildThreadTsWarningMessage,
} from './WebClient';
import { ErrorCode, type WebAPIRequestError } from './errors';
import {
  buildGeneralFilesUploadWarning,
  buildInvalidFilesUploadParamError,
  buildLegacyMethodWarning,
} from './file-upload';
import { addAppMetadata } from './instrument';
import { LogLevel, type Logger } from './logger';
import { rapidRetryPolicy } from './retry-policies';

const token = 'xoxb-faketoken';

describe('WebClient', () => {
  const sandbox = sinon.createSandbox();
  let debugMock: sinon.SinonStub;
  let logger: Logger;
  let client: WebClient;

  beforeEach(() => {
    debugMock = sandbox.stub(console, 'debug');
    logger = {
      debug: sinon.spy(),
      info: sinon.spy(),
      warn: sinon.spy(),
      error: sinon.spy(),
      getLevel: sinon.spy(),
      setLevel: sinon.spy(),
      setName: sinon.spy(),
    };
  });

  afterEach(() => {
    sandbox.restore();
    nock.cleanAll();
  });

  describe('constructor()', () => {
    it('should build a default client given a token', () => {
      const client = new WebClient(token);
      assert.instanceOf(client, WebClient);
      assert.equal(client.token, token);
      assert.equal(client.slackApiUrl, 'https://slack.com/api/');
    });

    it('should build a client without a token', () => {
      const client = new WebClient();
      assert.instanceOf(client, WebClient);
    });
  });

  describe('Methods superclass', () => {
    it('should succeed when constructing WebClient', () => {
      assert.doesNotThrow(() => {
        new WebClient();
      });
    });

    it('should succeed when constructing a class that extends WebClient', () => {
      assert.doesNotThrow(() => {
        class X extends WebClient {}
        new X();
      });
    });
  });

  describe('has an option to change the log output severity', () => {
    it('outputs a debug log on initialization', () => {
      new WebClient(token, { logLevel: LogLevel.DEBUG });
      const output = debugMock.getCalls()[0].args.join(' ');
      assert.isNotEmpty(output); // should have at least 1 log line, but not asserting since that is an implementation detail
    });
  });

  describe('has a logger option', () => {
    it('sends logs to a logger and not to stdout', () => {
      new WebClient(token, { logLevel: LogLevel.DEBUG, logger });
      assert.isTrue((logger.debug as sinon.SinonStub).called);
      assert.isEmpty(debugMock.getCalls());
    });
    it('never modifies the original logger', () => {
      new WebClient(token, { logger });
      // Calling #setName of the given logger is destructive
      assert.isFalse((logger.setName as sinon.SinonStub).called);
    });
  });

  describe('has an option to override the Axios timeout value', () => {
    it('should log warning and throw error if timeout exceeded', async () => {
      const timeoutOverride = 1; // ms, guaranteed failure

      const client = new WebClient(undefined, {
        timeout: timeoutOverride,
        retryConfig: { retries: 0 },
        logLevel: LogLevel.WARN,
        logger,
      });

      try {
        await client.apiCall('users.list');
        assert.fail('expected error to be thrown');
      } catch (e) {
        // biome-ignore lint/suspicious/noExplicitAny: TODO: type this better, should be whatever error class web-api throws for timeouts
        const error = e as any;
        assert.equal(error.code, ErrorCode.RequestError);
        assert.equal(error.original.config.timeout, timeoutOverride);
        assert.equal(error.original.isAxiosError, true);
        assert.instanceOf(error, Error);
        assert.isTrue((logger.warn as sinon.SinonStub).calledOnce, 'expected Logger to be called once');
      }
    });
  });

  describe('apiCall()', () => {
    beforeEach(() => {
      client = new WebClient(token, { retryConfig: rapidRetryPolicy });
    });

    describe('when making a successful call', () => {
      let scope: nock.Scope;
      beforeEach(() => {
        scope = nock('https://slack.com')
          .post(/api/)
          .reply(200, {
            ok: true,
            response_metadata: {
              warnings: ['testWarning1', 'testWarning2'],
              messages: [
                '[ERROR] unsupported type: sections [json-pointer:/blocks/0/type]',
                "[WARN] A Content-Type HTTP header was presented but did not declare a charset, such as a 'utf-8'",
              ],
            },
          });
      });

      it('should return results in a Promise', async () => {
        const result = await client.apiCall('method');
        assert(result.ok);
        scope.done();
      });

      it('should send warnings to logs from both response_metadata.warnings & response_metadata.messages', async () => {
        const warnClient = new WebClient(token, { logLevel: LogLevel.WARN, logger });
        await warnClient.apiCall('method');
        assert.isTrue((logger.warn as sinon.SinonStub).calledThrice);
      });

      it('should send response_metadata.messages errors to logs', async () => {
        const errorClient = new WebClient(token, { logLevel: LogLevel.ERROR, logger });
        await errorClient.apiCall('method');
        assert.isTrue((logger.error as sinon.SinonStub).calledOnce);
      });

      type MethodArgs = { method: string; args: Record<string, unknown> };
      const attachmentWarningTestPatterns: MethodArgs[] = [
        { method: 'chat.postMessage', args: { channel: 'C123', attachments: [{ blocks: [] }] } },
        { method: 'chat.postMessage', args: { channel: 'C123', attachments: [{ blocks: [], fallback: '  ' }] } },
      ];
      const textWarningTestPatterns: MethodArgs[] = [
        { method: 'chat.postEphemeral', args: { channel: 'C123', blocks: [] } },
        { method: 'chat.postMessage', args: { channel: 'C123', blocks: [] } },
        { method: 'chat.scheduleMessage', args: { channel: 'C123', post_at: '100000000', blocks: [] } },
      ];
      const warningTestPatterns = textWarningTestPatterns.concat(attachmentWarningTestPatterns);

      const attachPatterns = attachmentWarningTestPatterns.reduce((acc, { method, args }) => {
        const attachmentPatterns = [{ fallback: 'fallback' }].map((attachmentOverrides) => {
          const attachments = (args.attachments as Record<string, unknown>[]).map((attachment) => {
            return Object.assign({}, attachment, attachmentOverrides);
          });
          return { method, args: Object.assign({}, args, { attachments }) };
        });

        return acc.concat(attachmentPatterns);
      }, [] as MethodArgs[]);
      for (const { method, args } of attachPatterns) {
        it(`should not send warning to logs when client executes ${method} without text but with attachment fallback argument`, async () => {
          const warnClient = new WebClient(token, { logLevel: LogLevel.WARN, logger });
          await warnClient.apiCall(method, args);
          assert.equal((logger.warn as sinon.SinonStub).callCount, 3);
        });
      }

      const warningPatterns = warningTestPatterns.reduce((acc, { method, args }) => {
        const textPatterns = [{ text: 'text' }].map((v) => ({ method, args: Object.assign({}, v, args) }));
        return acc.concat(textPatterns);
      }, [] as MethodArgs[]);
      for (const { method, args } of warningPatterns) {
        it(`should not send warning to logs when client executes ${method} with text argument`, async () => {
          const warnClient = new WebClient(token, { logLevel: LogLevel.WARN, logger });
          await warnClient.apiCall(method, args);
          assert.isTrue((logger.warn as sinon.SinonStub).calledThrice);
        });
      }

      const textPatterns = textWarningTestPatterns.reduce((acc, { method, args }) => {
        const textPatterns = [{ text: '' }, { text: null }, {}].map((v) => ({
          method,
          args: Object.assign({}, v, args),
        }));
        return acc.concat(textPatterns);
      }, [] as MethodArgs[]);
      for (const { method, args } of textPatterns) {
        it(`should send a text-argument-specific warning to logs when client executes ${method} without text argument(${args.text === '' ? 'empty' : args.text})`, async () => {
          const warnClient = new WebClient(token, { logLevel: LogLevel.WARN, logger });
          await warnClient.apiCall(method, args);
          assert.equal((logger.warn as sinon.SinonStub).callCount, 4);
        });
      }

      const attachWarnPatterns = attachmentWarningTestPatterns.reduce((acc, { method, args }) => {
        const textPatterns = [{ text: '' }, { text: null }, {}].map((v) => ({
          method,
          args: Object.assign({}, v, args),
        }));
        return acc.concat(textPatterns);
      }, [] as MethodArgs[]);
      for (const { method, args } of attachWarnPatterns) {
        it(`should send both text and fallback-argument-specific warning to logs when client executes ${method} without text argument(${args.text === '' ? 'empty' : args.text}) nor without attachment-level fallback argument`, async () => {
          const warnClient = new WebClient(token, { logLevel: LogLevel.WARN, logger });
          await warnClient.apiCall(method, args);
          assert.equal((logger.warn as sinon.SinonStub).callCount, 5);
        });
      }

      const threadTsTestPatterns = [
        { method: 'chat.postEphemeral' },
        { method: 'chat.postMessage' },
        { method: 'chat.scheduleMessage' },
        { method: 'files.upload' },
      ];

      const threadPatterns = threadTsTestPatterns.reduce((acc, { method }) => {
        const threadTs = [{ thread_ts: 1503435956.000247, text: 'text' }].map((v) => ({
          method,
          args: v,
        }));
        return acc.concat(threadTs);
      }, [] as MethodArgs[]);
      for (const { method, args } of threadPatterns) {
        it(`should send warning to logs when thread_ts in ${method} arguments is a float`, async () => {
          const warnClient = new WebClient(token, { logLevel: LogLevel.WARN, logger });
          await warnClient.apiCall(method, args);
          // assume no warning about thread_ts has been sent
          let warnedAboutThreadTS = false;

          // for each of the calls made of this method's spy function
          const spyCalls = (logger.warn as sinon.SinonStub).getCalls();
          for (const call of spyCalls) {
            // determine whether it was called with the correct warning as arguments
            if (call.args[0] === buildThreadTsWarningMessage(method)) {
              warnedAboutThreadTS = true;
              break;
            }
          }
          if (!warnedAboutThreadTS) {
            assert.fail(`Expected a warning when thread_ts in ${method} is a float but got none`);
          }
        });
      }

      const threadTsPatterns = threadTsTestPatterns.reduce((acc, { method }) => {
        const threadTs = [{ thread_ts: '1503435956.000247', text: 'text' }].map((v) => ({
          method,
          args: v,
        }));
        return acc.concat(threadTs);
      }, [] as MethodArgs[]);
      for (const { method, args } of threadTsPatterns) {
        it(`should not send warning to logs when thread_ts in ${method} arguments is a string`, async () => {
          const warnClient = new WebClient(token, { logLevel: LogLevel.WARN, logger });
          await warnClient.apiCall(method, args);
          for (const call of (logger.warn as sinon.SinonStub).getCalls()) {
            assert.notEqual(call.args[0], buildThreadTsWarningMessage(method));
          }
        });
      }

      it('warns when user is accessing the files.upload (legacy) method', async () => {
        const client = new WebClient(token, { logLevel: LogLevel.INFO, logger });
        await client.apiCall('files.upload', {});

        // both must be true to pass this test
        let warnedAboutLegacyFilesUpload = false;
        let infoAboutRecommendedFilesUploadV2 = false;

        // check the warn spy for whether it was called with the correct warning
        for (const call of (logger.warn as sinon.SinonStub).getCalls()) {
          if (call.args[0] === buildLegacyMethodWarning('files.upload')) {
            warnedAboutLegacyFilesUpload = true;
          }
        }
        // check the info spy for whether it was called with the correct warning
        for (const call of (logger.info as sinon.SinonStub).getCalls()) {
          if (call.args[0] === buildGeneralFilesUploadWarning()) {
            infoAboutRecommendedFilesUploadV2 = true;
          }
        }
        if (!warnedAboutLegacyFilesUpload || !infoAboutRecommendedFilesUploadV2) {
          assert.fail('Should have logged a warning and info when files.upload is used');
        }
      });
    });

    describe('with OAuth scopes in the response headers', () => {
      it('should expose a scopes and acceptedScopes properties on the result', async () => {
        const scope = nock('https://slack.com').post(/api/).reply(
          200,
          { ok: true },
          {
            'X-OAuth-Scopes': 'files:read, chat:write:bot',
            'X-Accepted-OAuth-Scopes': 'files:read',
          },
        );
        const result = await client.apiCall('method');
        assert.deepNestedInclude(result.response_metadata, { scopes: ['files:read', 'chat:write:bot'] });
        assert.deepNestedInclude(result.response_metadata, { acceptedScopes: ['files:read'] });
        scope.done();
      });
    });

    describe('when called with bad options', () => {
      it('should reject its Promise with TypeError', async () => {
        const results = await Promise.allSettled([
          // @ts-expect-error: api client should be passed an object
          client.apiCall('method', 4),
          // @ts-expect-error: api client should be passed an object
          client.apiCall('method', 'a string'),
          // @ts-expect-error: api client should be passed an object
          client.apiCall('method', false),
        ]);
        for (const result of results) {
          if (result.status === 'fulfilled') {
            assert.fail('unexpected fulfilled promise when using API client with invalid arguments');
          } else {
            assert.instanceOf(result.reason, TypeError);
          }
        }
      });
    });

    describe('when an API call fails', () => {
      it('should return a Promise which rejects on error', async () => {
        const client = new WebClient(undefined, { retryConfig: { retries: 0 } });

        const scope = nock('https://slack.com').post(/api/).reply(500);

        try {
          await client.apiCall('method');
          assert.fail('expected error to be thrown');
        } catch (error) {
          assert.instanceOf(error, Error);
          scope.done();
        }
      });
    });

    it('should fail with WebAPIPlatformError when the API response has an error', async () => {
      const scope = nock('https://slack.com').post(/api/).reply(200, { ok: false, error: 'bad error' });
      try {
        await client.apiCall('method');
        assert.fail('expected thrown exception');
      } catch (error) {
        assert.instanceOf(error, Error);
        assert.nestedPropertyVal(error, 'code', ErrorCode.PlatformError);
        assert.nestedPropertyVal(error, 'data.ok', false);
        assert.nestedPropertyVal(error, 'data.error', 'bad error');
        scope.done();
      }
    });

    it('should fail with WebAPIHTTPError when the API response has an unexpected status', async () => {
      const body = { foo: 'bar' };
      const scope = nock('https://slack.com').post(/api/).reply(500, body);
      const client = new WebClient(token, { retryConfig: { retries: 0 } });
      try {
        await client.apiCall('method');
        assert.fail('expected error to be thrown');
      } catch (error) {
        assert.nestedPropertyVal(error, 'code', ErrorCode.HTTPError);
        assert.nestedPropertyVal(error, 'statusCode', 500);
        // TODO: type this closer to the actual error we throw
        const e = error as Record<string, unknown>;
        assert.exists(e.headers);
        assert.deepEqual(e.body, body);
        assert.instanceOf(error, Error);
        scope.done();
      }
    });

    it('should fail with WebAPIRequestError when the API request fails', async () => {
      // One known request error is when the node encounters an ECONNREFUSED. In order to simulate this, rather than
      // using nock, we send the request to a host:port that is not listening.
      const client = new WebClient(token, { slackApiUrl: 'https://localhost:8999/api/', retryConfig: { retries: 0 } });
      try {
        await client.apiCall('method');
        assert.fail('expected error to be thrown');
      } catch (error) {
        assert.nestedPropertyVal(error, 'code', ErrorCode.RequestError);
        assert.instanceOf(error, Error);
        assert.instanceOf((error as WebAPIRequestError).original, Error);
      }
    });

    it('should properly serialize simple API arguments', async () => {
      const scope = nock('https://slack.com')
        // NOTE: this could create false negatives if the serialization order changes (it shouldn't matter)
        .post(/api/, 'team_id=T12345678&foo=stringval&bar=42&baz=false')
        .reply(200, { ok: true });
      await client.apiCall('method', { foo: 'stringval', bar: 42, baz: false, team_id: 'T12345678' });
      scope.done();
    });

    it('should properly serialize complex API arguments', async () => {
      const scope = nock('https://slack.com')
        // NOTE: this could create false negatives if the serialization order changes (it shouldn't matter)
        .post(
          /api/,
          'arraything=%5B%7B%22foo%22%3A%22stringval%22%2C%22bar%22%3A42%2C%22baz%22%3Afalse%2C%22zup%22%3A%5B%22one%22%2C%22two%22%2C%22three%22%5D%7D%5D&objectthing=%7B%22foo%22%3A7%2C%22hum%22%3Afalse%7D',
        )
        .reply(200, { ok: true });
      await client.apiCall('method', {
        // TODO: include things like quotes and emojis
        arraything: [
          {
            foo: 'stringval',
            bar: 42,
            baz: false,
            zup: ['one', 'two', 'three'],
          },
        ],
        objectthing: {
          foo: 7,
          hum: false,
        },
      });
      scope.done();
    });

    it('should remove undefined or null values from simple API arguments', async () => {
      const scope = nock('https://slack.com').post(/api/, 'something=else').reply(200, { ok: true });
      await client.apiCall('method', {
        something_undefined: undefined,
        something_null: null,
        something: 'else',
      });
      scope.done();
    });

    describe('metadata in the user agent', () => {
      it('should set the user agent to contain package metadata', async () => {
        const scope = nock('https://slack.com', {
          reqheaders: {
            'User-Agent': (value) => {
              // User Agent value is different across platforms.
              // on mac this is: @slack:web-api/7.7.0 node/18.15.0 darwin/23.6.0
              // on windows this is: @slack:web-api/7.7.0 cmd.exe /22.10.0 win32/10.0.20348
              const metadata = parseUserAgentIntoMetadata(value);
              // NOTE: this assert isn't that strong and doesn't say anything about the values. at this time, there
              // isn't a good way to test this without dupicating the logic of the code under test.
              assert.containsAllKeys(metadata, ['@slack:web-api']);
              return true;
            },
          },
        })
          .post(/api/)
          .reply(200, { ok: true });
        await client.apiCall('method');
        scope.done();
      });

      it('should set the user agent to contain application metadata', async () => {
        const [name, version] = ['appmedataname', 'appmetadataversion'];
        addAppMetadata({ name, version });
        const scope = nock('https://slack.com', {
          reqheaders: {
            'User-Agent': (value) => {
              const metadata = parseUserAgentIntoMetadata(value);
              assert.propertyVal(metadata, name, version);
              return true;
            },
          },
        })
          .post(/api/)
          .reply(200, { ok: true });
        // NOTE: appMetaData is only evalued on client construction, so we cannot use the client already created
        const client = new WebClient(token, { retryConfig: rapidRetryPolicy });
        await client.apiCall('method');
        scope.done();
      });
    });

    describe('with string response body for some reason', () => {
      it('should try to parse the body', async () => {
        const scope = nock('https://slack.com')
          .post(/api/)
          .reply(200, '{ "ok": true, "response_metadata": { "foo": "bar" } }', {
            'X-OAuth-Scopes': 'files:read, chat:write:bot',
            'X-Accepted-OAuth-Scopes': 'files:read',
          });
        const result = await client.apiCall('method');
        assert.deepNestedInclude(result.response_metadata, { scopes: ['files:read', 'chat:write:bot'] });
        assert.deepNestedInclude(result.response_metadata, { acceptedScopes: ['files:read'] });
        assert.deepNestedInclude(result.response_metadata, { foo: 'bar' });
        scope.done();
      });
      it('should work even if the body is not a JSON data', async () => {
        const scope = nock('https://slack.com').post(/api/).reply(200, 'something wrong!', {
          'X-OAuth-Scopes': 'files:read, chat:write:bot',
          'X-Accepted-OAuth-Scopes': 'files:read',
        });
        try {
          await client.apiCall('method');
          assert.fail('expected error to be thrown');
        } catch (err) {
          assert.equal((err as Error).message, 'An API error occurred: something wrong!');
          scope.done();
        }
      });
    });
  });

  describe('apiCall() - without a token', () => {
    it('should make successful api calls', async () => {
      const client = new WebClient(undefined, { retryConfig: rapidRetryPolicy });

      const scope = nock('https://slack.com')
        // NOTE: this could create false negatives if the serialization order changes (it shouldn't matter)
        .post(/api/, 'foo=stringval')
        .reply(200, { ok: true });

      await client.apiCall('method', { foo: 'stringval' });
      scope.done();
    });
  });

  describe('apiCall() - when using static headers', () => {
    it('should include static headers on api request', async () => {
      const client = new WebClient(token, { headers: { 'X-XYZ': 'value' } });
      const scope = nock('https://slack.com', {
        reqheaders: {
          'X-XYZ': 'value',
        },
      })
        .post(/api/)
        .reply(200, { ok: true });
      await client.apiCall('method');
      scope.done();
    });
    it('should override Authorization header if passed as an option to apiCall()', async () => {
      const client = new WebClient(token, { headers: { 'X-XYZ': 'value' } });
      const scope = nock('https://slack.com', {
        reqheaders: {
          'X-XYZ': 'value',
          Authorization: 'Bearer xoxp-superfake',
        },
      })
        .post(/api/)
        .reply(200, { ok: true });
      await client.apiCall('method', { token: 'xoxp-superfake' });
      scope.done();
    });
  });

  describe('named method aliases (facets)', () => {
    beforeEach(() => {
      client = new WebClient(token, { retryConfig: rapidRetryPolicy });
    });
    it('should properly mount methods as functions', async () => {
      // This test doesn't exhaustively check all the method aliases, it just tries a couple.
      // This should be enough since all methods are mounted in the exact same way.
      const scope = nock('https://slack.com')
        .post('/api/chat.postMessage', 'channel=c&text=t')
        .reply(200, { ok: true })
        // Trying this method because its mounted one layer "deeper"
        .post('/api/team.profile.get')
        .reply(200, { ok: true });
      await Promise.all([client.chat.postMessage({ channel: 'c', text: 't' }), client.team.profile.get()]);
      scope.done();
    });
  });

  describe('paginate()', () => {
    const method = 'conversations.list';
    beforeEach(() => {
      client = new WebClient(token, { retryConfig: rapidRetryPolicy });
    });

    describe('when not given shouldStop predicate', () => {
      it('should return an AsyncIterator', () => {
        const iterator = client.paginate(method);
        assert.isOk(iterator[Symbol.asyncIterator]);
      });
      it('can iterate multiple pages', async () => {
        const scope = nock('https://slack.com')
          .post(/api/)
          .reply(200, { ok: true, response_metadata: { next_cursor: 'CURSOR' } })
          .post(/api/, (body) => {
            // NOTE: limit value is compared as a string because nock doesn't properly serialize the param into a number
            return body.limit && body.limit === '200' && body.cursor && body.cursor === 'CURSOR';
          })
          .reply(200, { ok: true });
        const iterator = client.paginate(method);

        // @ts-expect-error TODO: the types do not line up here
        const { value: firstPage, done: firstDone } = await iterator.next();
        assert.isOk(firstPage);
        assert.isFalse(firstDone);
        // @ts-expect-error TODO: the types do not line up here
        const { value: secondPage, done: secondDone } = await iterator.next();
        assert.isOk(secondPage);
        assert.isFalse(secondDone);
        // @ts-expect-error TODO: the types do not line up here
        const { value: thirdPage, done: thirdDone } = await iterator.next();
        assert.isNotOk(thirdPage);
        assert.isTrue(thirdDone);

        scope.done();
      });
      it('can iterate multiple pages with limit items per page', async () => {
        const limit = 4;
        const scope = nock('https://slack.com')
          .post(/api/, (body) => {
            // NOTE: limit value is compared as a string because nock doesn't properly serialize the param into a number
            return body.limit && body.limit === limit.toString();
          })
          .reply(200, { ok: true, response_metadata: { next_cursor: 'CURSOR' } })
          .post(/api/, (body) => {
            // NOTE: limit value is compared as a string because nock doesn't properly serialize the param into a number
            return body.limit && body.limit === limit.toString() && body.cursor && body.cursor === 'CURSOR';
          })
          .reply(200, { ok: true });
        const iterator = client.paginate(method, { limit });

        // @ts-expect-error TODO: the types do not line up here
        const { value: firstPage, done: firstDone } = await iterator.next();
        assert.isOk(firstPage);
        assert.isFalse(firstDone);
        // @ts-expect-error TODO: the types do not line up here
        const { value: secondPage, done: secondDone } = await iterator.next();
        assert.isOk(secondPage);
        assert.isFalse(secondDone);
        // @ts-expect-error TODO: the types do not line up here
        const { value: thirdPage, done: thirdDone } = await iterator.next();
        assert.isNotOk(thirdPage);
        assert.isTrue(thirdDone);

        scope.done();
      });
      it('can resume iteration from a result with an existing cursor', async () => {
        const cursor = 'PRE_CURSOR';
        const scope = nock('https://slack.com')
          .post(/api/, (body) => {
            return body.cursor && body.cursor === cursor;
          })
          .reply(200, { ok: true, response_metadata: { next_cursor: 'CURSOR' } })
          .post(/api/, (body) => {
            return body.cursor && body.cursor === 'CURSOR';
          })
          .reply(200, { ok: true });
        const iterator = client.paginate(method, { cursor });

        // @ts-expect-error TODO: the types do not line up here
        const { value: firstPage, done: firstDone } = await iterator.next();
        assert.isOk(firstPage);
        assert.isFalse(firstDone);
        // @ts-expect-error TODO: the types do not line up here
        const { value: secondPage, done: secondDone } = await iterator.next();
        assert.isOk(secondPage);
        assert.isFalse(secondDone);
        // @ts-expect-error TODO: the types do not line up here
        const { value: thirdPage, done: thirdDone } = await iterator.next();
        assert.isNotOk(thirdPage);
        assert.isTrue(thirdDone);

        scope.done();
      });
    });

    describe('when given shouldStop predicate', () => {
      it('should iterate until the end when shouldStop always returns false', async () => {
        const scope = nock('https://slack.com')
          .post(/api/)
          .reply(200, { ok: true, response_metadata: { next_cursor: 'CURSOR' } })
          .post(/api/, (body) => {
            // NOTE: limit value is compared as a string because nock doesn't properly serialize the param into a number
            return body.limit && body.limit === '200' && body.cursor && body.cursor === 'CURSOR';
          })
          .reply(200, { ok: true });

        const neverStop = sinon.fake.returns(false);
        await client.paginate(method, {}, neverStop);
        assert.equal(neverStop.callCount, 2);

        scope.done();
      });
      it('should only iterate once when shouldStop always returns true', async () => {
        const scope = nock('https://slack.com')
          .post(/api/)
          .reply(200, { ok: true, response_metadata: { next_cursor: 'CURSOR' } });

        const neverStop = sinon.fake.returns(true);
        await client.paginate(method, {}, neverStop);
        assert.equal(neverStop.callCount, 1);

        scope.done();
      });
      it('should iterate twice when shouldStop always returns false then true', async () => {
        const scope = nock('https://slack.com')
          .post(/api/)
          .reply(200, { ok: true, response_metadata: { next_cursor: 'CURSOR_1' } })
          .post(/api/, (body) => {
            return body.cursor && body.cursor === 'CURSOR_1';
          })
          .reply(200, { ok: true, response_metadata: { next_cursor: 'CURSOR_2' } });

        const shouldStop = sinon.stub();
        shouldStop.onCall(0).returns(false);
        shouldStop.onCall(1).returns(true);
        await client.paginate(method, {}, shouldStop);
        assert.equal(shouldStop.callCount, 2);

        scope.done();
      });

      describe('when given a reduce function', () => {
        it('should resolve for the accumulated value', async () => {
          const scope = nock('https://slack.com')
            .post(/api/)
            .reply(200, { ok: true, v: 1, response_metadata: { next_cursor: 'CURSOR' } })
            .post(/api/, (body) => {
              // NOTE: limit value is compared as a string because nock doesn't properly serialize the param into a number
              return body.limit && body.limit === '200' && body.cursor && body.cursor === 'CURSOR';
            })
            .reply(200, { ok: true, v: 2 });

          const sum = await client.paginate(
            method,
            {},
            () => false,
            (acc, page) => {
              const p = page as WebAPICallResult & { v: number };
              if (acc === undefined) {
                // biome-ignore lint/style/noParameterAssign: TODO: dont reassign params
                acc = 0;
              }
              if (p.v && typeof p.v === 'number') {
                // biome-ignore lint/style/noParameterAssign: TODO: dont reassign params
                acc += p.v;
              }
              return acc;
            },
          );
          assert.equal(sum, 3);

          scope.done();
        });
      });
    });
  });

  describe('has option to change slackApiUrl', () => {
    it('should send requests to an alternative URL', async () => {
      const alternativeUrl = 'http://12.34.56.78/api/';
      nock(alternativeUrl)
        .post(/api\/method/)
        .reply(200, { ok: true });
      const client = new WebClient(token, { slackApiUrl: alternativeUrl });
      await client.apiCall('method');
    });

    it('should send requests to an absolute URL as default', async () => {
      nock('http://12.34.56.78/').post('/api/method').reply(200, { ok: true });
      const client = new WebClient(token);
      await client.apiCall('http://12.34.56.78/api/method');
    });

    it('should send requests to the absolute URL if absolute is allowed', async () => {
      nock('https://example.com/').post('/api/method').reply(200, { ok: true });
      const client = new WebClient(token, { allowAbsoluteUrls: true });
      await client.apiCall('https://example.com/api/method');
    });

    it('should send requests to the default URL if absolute not allowed', async () => {
      nock('https://slack.com/').post('/api/https://example.com/api/method').reply(200, { ok: true });
      const client = new WebClient(token, { allowAbsoluteUrls: false });
      await client.apiCall('https://example.com/api/method');
    });
  });

  describe('has an option to set request concurrency', () => {
    // TODO: factor out common logic into test helpers
    const responseDelay = 500; // ms
    let testStart: number;
    let scope: nock.Scope;

    beforeEach(() => {
      testStart = Date.now();
      scope = nock('https://slack.com')
        .persist()
        .post(/api/)
        .delay(responseDelay)
        .reply((_uri, _requestBody) => {
          // NOTE: the assumption is that this function gets called right away when the request body is available,
          // not after the delay
          const diff = Date.now() - testStart;
          return [200, JSON.stringify({ ok: true, diff })];
        });
    });

    afterEach(() => {
      scope.persist(false);
    });

    it('should have a default conncurrency of 100', async () => {
      const client = new WebClient(token);
      const requests: Promise<WebAPICallResult>[] = [];
      for (let i = 0; i < 101; i++) {
        requests.push(client.apiCall(`${i}`));
      }
      const responses = (await Promise.all(requests)) as (WebAPICallResult & { diff: number })[];
      // verify all responses are present
      assert.lengthOf(responses, 101);

      // verify that maxRequestConcurrency requests were all sent concurrently
      const concurrentResponses = responses.slice(0, 100); // the first 100 responses
      for (const r of concurrentResponses) {
        assert.isBelow(r.diff, responseDelay);
      }

      // verify that any requests after maxRequestConcurrency were delayed by the responseDelay
      const queuedResponses = responses.slice(100);
      const minDiff = concurrentResponses[concurrentResponses.length - 1].diff + responseDelay;
      for (const r of queuedResponses) assert.isAtLeast(r.diff, minDiff);
    });

    it('should allow concurrency to be set', async () => {
      const client = new WebClient(token, { maxRequestConcurrency: 1 });
      const requests = [client.apiCall('1'), client.apiCall('2')];
      const responses = (await Promise.all(requests)) as (WebAPICallResult & { diff: number })[];
      // verify all responses are present
      assert.lengthOf(responses, 2);

      // verify that maxRequestConcurrency requets were all sent concurrently
      const concurrentResponses = responses.slice(0, 1); // the first response
      for (const r of concurrentResponses) assert.isBelow(r.diff, responseDelay);

      // verify that any requests after maxRequestConcurrency were delayed by the responseDelay
      const queuedResponses = responses.slice(1); // the second response
      const minDiff = concurrentResponses[concurrentResponses.length - 1].diff + responseDelay;
      for (const r of queuedResponses) {
        assert.isAtLeast(r.diff, minDiff);
      }
    });
  });

  describe('has an option to set the retry policy ', () => {
    it('retries a request which fails to get a response', async () => {
      const scope = nock('https://slack.com')
        .post(/api/)
        .replyWithError('could be a ECONNREFUSED, ENOTFOUND, ETIMEDOUT, ECONNRESET')
        .post(/api/)
        .reply(200, { ok: true });
      const client = new WebClient(token, { retryConfig: rapidRetryPolicy });
      const resp = await client.apiCall('method');
      assert.propertyVal(resp, 'ok', true);
      scope.done();
    });
    it('retries a request whose response has a status code that is not 200 nor 429 (rate limited)', async () => {
      const scope = nock('https://slack.com').post(/api/).reply(500).post(/api/).reply(200, { ok: true });
      const client = new WebClient(token, { retryConfig: rapidRetryPolicy });
      const resp = await client.apiCall('method');
      assert.propertyVal(resp, 'ok', true);
      scope.done();
    });
  });

  describe('has rate limit handling', () => {
    describe('when configured to reject rate-limited calls', () => {
      beforeEach(() => {
        client = new WebClient(token, { rejectRateLimitedCalls: true });
      });

      it('should reject with a WebAPIRateLimitedError when a request fails due to rate-limiting', async () => {
        const retryAfter = 5;
        const scope = nock('https://slack.com')
          .post(/api/)
          .reply(429, '', { 'retry-after': String(retryAfter) });
        try {
          await client.apiCall('method');
          assert.fail('expected error to be thrown');
        } catch (error) {
          assert.propertyVal(error, 'code', ErrorCode.RateLimitedError);
          assert.propertyVal(error, 'retryAfter', retryAfter);
          assert.instanceOf(error, Error);
          scope.done();
        }
      });

      it('should emit a rate_limited event on the client', async () => {
        const spy = sinon.spy();
        const scope = nock('https://slack.com')
          .post(/api/)
          .reply(429, {}, { 'retry-after': String(0) });
        const client = new WebClient(token, { rejectRateLimitedCalls: true });
        client.on(WebClientEvent.RATE_LIMITED, spy);
        try {
          await client.apiCall('method', { foo: 'bar' });
          assert.fail('expected error to be thrown');
        } catch (_err) {
          assert(spy.calledOnceWith(0, sinon.match({ url: 'https://slack.com/api/method', body: { foo: 'bar' } })));
          scope.done();
        }
      });
    });

    it('should automatically retry the request after the specified timeout', async () => {
      const retryAfter = 1;
      const scope = nock('https://slack.com')
        .post(/api/)
        .reply(429, '', { 'retry-after': String(retryAfter) })
        .post(/api/)
        .reply(200, { ok: true });
      const client = new WebClient(token, { retryConfig: rapidRetryPolicy });
      const startTime = Date.now();
      await client.apiCall('method');
      const diff = Date.now() - startTime;
      assert.isAtLeast(diff, retryAfter * 1000, 'elapsed time is at least a second');
      scope.done();
    });

    it('should include retryAfter metadata if the response has retry info', async () => {
      const scope = nock('https://slack.com')
        .post(/api/)
        .reply(200, { ok: true }, { 'retry-after': String(100) });
      const client = new WebClient(token);
      const data = await client.apiCall('method');
      assert(data.response_metadata?.retryAfter === 100);
      scope.done();
    });

    it('should pause the remaining requests in queue', async () => {
      const startTime = Date.now();
      const retryAfter = 1;
      const scope = nock('https://slack.com')
        .post(/api/)
        .reply(429, '', { 'retry-after': String(retryAfter) })
        .post(/api/)
        .reply(200, (_uri, _requestBody) => JSON.stringify({ ok: true, diff: Date.now() - startTime }))
        .post(/api/)
        .reply(200, (_uri, _requestBody) => JSON.stringify({ ok: true, diff: Date.now() - startTime }));
      const client = new WebClient(token, { retryConfig: rapidRetryPolicy, maxRequestConcurrency: 1 });
      const firstCall = client.apiCall('method');
      const secondCall = client.apiCall('method');
      const [firstResult, secondResult] = (await Promise.all([firstCall, secondCall])) as (WebAPICallResult & {
        diff: number;
      })[];
      assert.isAtLeast(firstResult.diff, retryAfter * 1000);
      assert.isAtLeast(secondResult.diff, retryAfter * 1000);
      scope.done();
    });

    it('should emit a rate_limited event on the client', async () => {
      const spy = sinon.spy();
      const scope = nock('https://slack.com')
        .post(/api/)
        .reply(429, {}, { 'retry-after': String(0) });
      const client = new WebClient(token, { retryConfig: { retries: 0 } });
      client.on(WebClientEvent.RATE_LIMITED, spy);
      try {
        await client.apiCall('method', { foo: 'bar' });
        assert.fail('expected error to be thrown');
      } catch (_err) {
        assert(spy.calledOnceWith(0, sinon.match({ url: 'https://slack.com/api/method', body: { foo: 'bar' } })));
        scope.done();
      }
    });
  });

  describe('requestInterceptor', () => {
    function configureMockServer(expectedBody: () => Record<string, unknown>) {
      nock('https://slack.com/api', {
        reqheaders: {
          test: 'static-header-value',
          'Content-Type': 'application/json',
        },
      })
        .post(/method/, (requestBody) => {
          expect(requestBody).to.deep.equal(expectedBody());
          return true;
        })
        .reply(200, (_uri, requestBody) => {
          expect(requestBody).to.deep.equal(expectedBody());
          return { ok: true, response_metadata: requestBody };
        });
    }

    it('can intercept out going requests, synchronously modifying the request body and headers', async () => {
      let expectedBody: Record<string, unknown>;

      const client = new WebClient(token, {
        requestInterceptor: (config: RequestConfig) => {
          expectedBody = Object.freeze({
            method: config.method,
            base_url: config.baseURL,
            path: config.url,
            body: config.data ?? {},
            query: config.params ?? {},
            headers: structuredClone(config.headers),
            test: 'static-body-value',
          });
          config.data = expectedBody;

          config.headers.test = 'static-header-value';
          config.headers['Content-Type'] = 'application/json';

          return config;
        },
      });

      configureMockServer(() => expectedBody);

      await client.apiCall('method');
    });

    it('can intercept out going requests, asynchronously modifying the request body and headers', async () => {
      let expectedBody: Record<string, unknown>;

      const client = new WebClient(token, {
        requestInterceptor: async (config: RequestConfig) => {
          expectedBody = Object.freeze({
            method: config.method,
            base_url: config.baseURL,
            path: config.url,
            body: config.data ?? {},
            query: config.params ?? {},
            headers: structuredClone(config.headers),
            test: 'static-body-value',
          });

          config.data = expectedBody;

          config.headers.test = 'static-header-value';
          config.headers['Content-Type'] = 'application/json';

          return config;
        },
      });

      configureMockServer(() => expectedBody);

      await client.apiCall('method');
    });
  });

  describe('adapter', () => {
    it('allows for custom handling of requests with preconfigured http client', async () => {
      nock('https://slack.com/api', {
        reqheaders: {
          'User-Agent': 'custom-axios-client',
        },
      })
        .post(/method/)
        .reply(200, (_uri, requestBody) => {
          return { ok: true, response_metadata: requestBody };
        });

      const customLoggingInterceptor = (config: InternalAxiosRequestConfig) => {
        // client with custom logging behaviour
        return config;
      };
      const customLoggingSpy = sinon.spy(customLoggingInterceptor);

      const customAxiosClient = axios.create();
      customAxiosClient.interceptors.request.use(customLoggingSpy);

      const customClientRequestSpy = sinon.spy(customAxiosClient, 'request');

      const client = new WebClient(token, {
        adapter: (config: RequestConfig) => {
          config.headers['User-Agent'] = 'custom-axios-client';
          return customAxiosClient.request(config);
        },
      });

      await client.apiCall('method');

      expect(customLoggingSpy.calledOnce).to.be.true;
      expect(customClientRequestSpy.calledOnce).to.be.true;
    });
  });

  it('should throw an error if the response has no retry info', async () => {
    const emptyHeaders: ReplyHeaders & { 'retry-after'?: never } = {}; // Ensure that 'retry-after' is not in the headers
    const scope = nock('https://slack.com').post(/api/).reply(429, {}, emptyHeaders);
    const client = new WebClient(token);
    try {
      await client.apiCall('method');
      assert.fail('expected error to be thrown');
    } catch (err) {
      assert.instanceOf(err, Error);
    } finally {
      scope.done();
    }
  });

  it('should throw an error if the response has an invalid retry-after header', async () => {
    const scope = nock('https://slack.com').post(/api/).reply(429, {}, { 'retry-after': 'notanumber' });
    const client = new WebClient(token);
    try {
      await client.apiCall('method');
      assert.fail('expected error to be thrown');
    } catch (err) {
      assert.instanceOf(err, Error);
      assert.include(err.message, 'retry-after header: notanumber', 'Raw retry-after header value included in error');
      scope.done();
    }
  });

  describe('apps.event.authorizations.list API', () => {
    it('should not send the token in the body if token is passed as a method argument', async () => {
      const client = new WebClient();
      const scope = nock('https://slack.com')
        .post(/api/)
        .reply(200, (_uri, body) => {
          assert.notInclude(body, token);
          console.log('body is', body);
          return { ok: true };
        });
      await client.apps.event.authorizations.list({
        token,
        event_context: 'foo',
      });
      scope.done();
    });
    it('should not send the token in the body if token passed as client constructor', async () => {
      const client = new WebClient(token);
      const scope = nock('https://slack.com')
        .post(/api/)
        .reply(200, (_uri, body) => {
          assert.notInclude(body, token);
          return { ok: true };
        });
      await client.apps.event.authorizations.list({ event_context: 'foo' });
      scope.done();
    });
  });

  describe('filesUploadV2', () => {
    it('uploads a single file', async () => {
      const scope = nock('https://slack.com')
        .post('/api/files.getUploadURLExternal', { filename: 'test-txt.txt', length: 18 })
        .reply(200, {
          ok: true,
          file_id: 'F0123456789',
          upload_url: 'https://files.slack.com/upload/v1/abcdefghijklmnopqrstuvwxyz',
        })
        .post('/api/files.completeUploadExternal', { files: '[{"id":"F0123456789","title":"test-txt.txt"}]' })
        .reply(200, {
          ok: true,
          files: [
            {
              id: 'F0123456789',
              name: 'test-txt.txt',
              permalink: 'https://my-workspace.slack.com/files/U0123456789/F0123456789/test-txt.txt',
            },
          ],
        });
      const uploader = nock('https://files.slack.com').post('/upload/v1/abcdefghijklmnopqrstuvwxyz').reply(200);
      const client = new WebClient(token);
      const response = await client.filesUploadV2({
        file: fs.createReadStream('./test/fixtures/test-txt.txt'),
        filename: 'test-txt.txt',
      });
      const expected = {
        ok: true,
        files: [
          {
            ok: true,
            files: [
              {
                id: 'F0123456789',
                name: 'test-txt.txt',
                permalink: 'https://my-workspace.slack.com/files/U0123456789/F0123456789/test-txt.txt',
              },
            ],
            response_metadata: {},
          },
        ],
      };
      assert.deepEqual(response, expected);
      scope.done();
      uploader.done();
    });

    it('uploads multiple files', async () => {
      const scope = nock('https://slack.com')
        .post('/api/files.getUploadURLExternal', { filename: 'test-png.png', length: 55292 })
        .reply(200, {
          ok: true,
          file_id: 'F0000000001',
          upload_url: 'https://files.slack.com/upload/v1/zyxwvutsrqponmlkjihgfedcba',
        })
        .post('/api/files.getUploadURLExternal', { filename: 'test-txt.txt', length: 18 })
        .reply(200, {
          ok: true,
          file_id: 'F0123456789',
          upload_url: 'https://files.slack.com/upload/v1/abcdefghijklmnopqrstuvwxyz',
        })
        .post('/api/files.completeUploadExternal', (args) => {
          const { channel_id, thread_ts, initial_comment, files } = args;
          return (
            channel_id === 'C0123456789' &&
            thread_ts === '1223313423434.131321' &&
            initial_comment === 'success!' &&
            (files === '[{"id":"F0123456789","title":"test-txt.txt"},{"id":"F0000000001","title":"test-png.png"}]' ||
              files === '[{"id":"F0000000001","title":"test-png.png"},{"id":"F0123456789","title":"test-txt.txt"}]')
          );
        })
        .reply(200, {
          ok: true,
          files: [
            {
              id: 'F0123456789',
              name: 'test-txt.txt',
              permalink: 'https://my-workspace.slack.com/files/U0123456789/F0123456789/test-txt.txt',
            },
            {
              id: 'F0000000001',
              name: 'test-png.png',
              permalink: 'https://my-workspace.slack.com/files/U0123456789/F0000000001/test-png.png',
            },
          ],
        });
      const uploader = nock('https://files.slack.com')
        .post('/upload/v1/abcdefghijklmnopqrstuvwxyz')
        .reply(200)
        .post('/upload/v1/zyxwvutsrqponmlkjihgfedcba')
        .reply(200);
      const client = new WebClient(token, { allowAbsoluteUrls: false });
      const response = await client.filesUploadV2({
        channel_id: 'C0123456789',
        thread_ts: '1223313423434.131321',
        initial_comment: 'success!',
        file_uploads: [
          {
            file: fs.createReadStream('./test/fixtures/test-txt.txt'),
            filename: 'test-txt.txt',
          },
          {
            file: fs.createReadStream('./test/fixtures/test-png.png'),
            filename: 'test-png.png',
          },
        ],
      });
      const expected = {
        ok: true,
        files: [
          {
            ok: true,
            files: [
              {
                id: 'F0123456789',
                name: 'test-txt.txt',
                permalink: 'https://my-workspace.slack.com/files/U0123456789/F0123456789/test-txt.txt',
              },
              {
                id: 'F0000000001',
                name: 'test-png.png',
                permalink: 'https://my-workspace.slack.com/files/U0123456789/F0000000001/test-png.png',
              },
            ],
            response_metadata: {},
          },
        ],
      };
      assert.deepEqual(response, expected);
      scope.done();
      uploader.done();
    });
  });

  describe('getAllFileUploads', () => {
    const client = new WebClient(token);
    it('adds a single file data to uploads with content supplied', async () => {
      const testWithContent = {
        content: 'Happiness!', // test string
        filename: 'happiness.txt',
        title: 'Testing Happiness',
        channel_id: 'C1234',
      };

      // returns exactly one file upload
      // @ts-expect-error getAllFileUploads is a private method, TODO: refactor into own function/module that is more easily testable
      const res = await client.getAllFileUploads(testWithContent);
      assert.equal(res.length, 1);
    });
    it('adds a single file data to uploads with file supplied', async () => {
      const testWithFile = {
        file: './test/fixtures/test-txt.txt', // test string
        filename: 'test.txt',
        title: 'Test file',
        channel_id: 'C1234',
      };

      // @ts-expect-error getAllFileUploads is a private method, TODO: refactor into own function/module that is more easily testable
      const res = await client.getAllFileUploads(testWithFile);
      assert.equal(res.length, 1);
    });
    it('adds multiple files data to an upload', async () => {
      const files = ['txt', 'jpg', 'svg', 'png'];
      const fileUploads = files.map((ext) => {
        const filename = `test-${ext}.${ext}`;
        return {
          file: fs.createReadStream(`./test/fixtures/${filename}`),
          filename,
        };
      });
      const entryWithFileUploads = {
        channel_id: 'C1234',
        initial_comment: 'Here is a single comment wit many files attached',
        title: 'Many files',
        file_uploads: fileUploads,
      };
      // 4 entries added
      // @ts-expect-error getAllFileUploads is a private method, TODO: refactor into own function/module that is more easily testable
      const res = await client.getAllFileUploads(entryWithFileUploads);
      assert.equal(res.length, 4);

      // check the filename of each entry matches
      files.forEach((ext, idx) => {
        const filename = `test-${ext}.${ext}`;
        assert.equal(res[idx].filename, filename);
      });
    });
    it('adds single and multiple files data to uploads', async () => {
      const files = ['txt', 'jpg', 'svg', 'png'];
      const fileUploads = files.map((ext) => {
        const filename = `test-${ext}.${ext}`;
        return {
          file: fs.createReadStream(`./test/fixtures/${filename}`),
          filename,
        };
      });
      const entryWithFileUploadsAndSingleFile = {
        file_uploads: fileUploads,
        file: './test/fixtures/test-txt.txt', // test string
        filename: 'test.txt',
        title: 'Test file',
        channel_id: 'C1234',
      };
      // 1 entry at the top level + 4 jobs from files in files_uploads
      // @ts-expect-error getAllFileUploads is a private method, TODO: refactor into own function/module that is more easily testable
      const res = await client.getAllFileUploads(entryWithFileUploadsAndSingleFile);
      assert.equal(res.length, 5);
    });
    it('handles multiple files with a single channel_id, initial_comment and/or thread_ts', async () => {
      const validPattern = {
        initial_comment: 'Here are the files!',
        thread_ts: '1223313423434.131321',
        channel_id: 'C123',
        file_uploads: [
          {
            file: './test/fixtures/test-txt.txt',
            filename: 'test-txt.txt',
          },
          {
            file: './test/fixtures/test-png.png',
            filename: 'test-png.png',
          },
        ],
      };
      const invalidPattern = {
        file_uploads: [
          {
            file: './test/fixtures/test-txt.txt',
            filename: 'test-txt.txt',
            initial_comment: 'Here are the files!',
            thread_ts: '1223313423434.131321',
            channel_id: 'C123',
          },
          {
            file: './test/fixtures/test-png.png',
            filename: 'test-png.png',
            initial_comment: 'Here are the files!',
            thread_ts: '1223313423434.131321',
            channel_id: 'C123',
          },
        ],
      };
      // in this case the two file uploads should be sent along with a single
      // message corresponding to initial_comment
      // @ts-expect-error getAllFileUploads is a private method, TODO: refactor into own function/module that is more easily testable
      const res = await client.getAllFileUploads(validPattern);
      for (const entry of res) {
        assert.equal(entry.initial_comment, validPattern.initial_comment);
        assert.equal(entry.thread_ts, validPattern.thread_ts);
        assert.equal(entry.channel_id, validPattern.channel_id);
      }

      // in this case, there should be an error
      try {
        // @ts-expect-error getAllFileUploads is a private method, TODO: refactor into own function/module that is more easily testable
        await client.getAllFileUploads(invalidPattern);
        assert.fail('Should have thrown an error for invalid arguments but didnt');
      } catch (error) {
        assert.equal((error as Error).message, buildInvalidFilesUploadParamError());
      }
    });
  });

  describe('fetchAllUploadURLExternal', () => {
    beforeEach(() => {
      client = new WebClient(token);
    });
    it('makes calls to files.getUploadURLExternal for each fileUpload', async () => {
      const testFileUploads = [
        {
          channel_id: 'C1234',
          filename: 'test-txt.txt',
          initial_comment: 'Doo ba doo here is the: test-txt.txt',
          title: 'Spaghetti test-txt.txt',
          data: Buffer.from('Here is a txt file'),
          length: 18,
        },
      ];

      const spy = sinon.spy();
      client.files.getUploadURLExternal = spy;
      // @ts-expect-error fetchAllFileUploadURLExternal is a private method, TODO: refactor into own function/module that is more easily testable
      await client.fetchAllUploadURLExternal(testFileUploads);
      assert.isTrue(spy.calledOnce);
    });
    it('honours overriden token provided as an argument', async () => {
      const tokenOverride = 'overriden-token';
      const testFileUploads = [
        {
          channel_id: 'C1234',
          filename: 'test-txt.txt',
          initial_comment: 'Doo ba doo here is the: test-txt.txt',
          title: 'Spaghetti test-txt.txt',
          data: Buffer.from('Here is a txt file'),
          length: 18,
          token: tokenOverride,
        },
      ];

      const spy = sinon.spy();
      client.files.getUploadURLExternal = spy;
      // @ts-expect-error fetchAllFileUploadURLExternal is a private method, TODO: refactor into own function/module that is more easily testable
      await client.fetchAllUploadURLExternal(testFileUploads);
      assert.isTrue(
        spy.calledWith(sinon.match({ token: tokenOverride })),
        'token override not passed through to underlying `files.getUploadURLExternal` API method',
      );
    });
  });

  describe('completeFileUploads', () => {
    beforeEach(() => {
      client = new WebClient(token);
    });
    it('rejects with an error when missing required file id', async () => {
      const invalidTestFileUploadsToComplete = [
        {
          channel_id: 'C1234',
          // missing file_id field
          filename: 'test-txt.txt',
          initial_comment: 'Doo ba doo here is the: test-txt.txt',
          title: 'Spaghetti test-txt.txt',
        },
      ];

      // should reject because of missing file_id
      try {
        // @ts-expect-error completeFileUploads is a private method, TODO: refactor into own function/module that is more easily testable
        await client.completeFileUploads(invalidTestFileUploadsToComplete);
        assert.fail('Should have errored but did not');
      } catch (err) {
        assert.equal((err as Error).message, 'Missing required file id for file upload completion');
      }
    });
    it('makes calls to files.completeUploadExternal for each fileUpload', async () => {
      const testFileUploadsToComplete = [
        {
          channel_id: 'C1234',
          file_id: 'test',
          filename: 'test-txt.txt',
          initial_comment: 'Doo ba doo here is the: test-txt.txt',
          title: 'Spaghetti test-txt.txt',
        },
      ];

      const spy = sinon.spy();
      client.files.completeUploadExternal = spy;
      // @ts-expect-error completeFileUploads is a private method, TODO: refactor into own function/module that is more easily testable
      await client.completeFileUploads(testFileUploadsToComplete);
      assert.isTrue(spy.calledOnce);
    });
    it('honours overriden token provided as an argument', async () => {
      const tokenOverride = 'overriden-token';
      const testFileUploadsToComplete = [
        {
          channel_id: 'C1234',
          file_id: 'test',
          filename: 'test-txt.txt',
          initial_comment: 'Doo ba doo here is the: test-txt.txt',
          title: 'Spaghetti test-txt.txt',
          token: tokenOverride,
        },
      ];

      const spy = sinon.spy();
      client.files.completeUploadExternal = spy;
      // @ts-expect-error completeFileUploads is a private method, TODO: refactor into own function/module that is more easily testable
      await client.completeFileUploads(testFileUploadsToComplete);
      assert.isTrue(
        spy.calledWith(sinon.match({ token: tokenOverride })),
        'token override not passed through to underlying `files.completeUploadExternal` API method',
      );
    });
  });

  describe('postFileUploadsToExternalURL', () => {
    const client = new WebClient(token);

    it('rejects with an error when missing required upload_url', async () => {
      const invalidTestFileUploadsToComplete = [
        {
          channel_id: 'C1234',
          // missing upload_url field
          filename: 'test-txt.txt',
          initial_comment: 'Doo ba doo here is the: test-txt.txt',
          title: 'Spaghetti test-txt.txt',
        },
      ];

      // should reject because of missing upload_url
      try {
        // @ts-expect-error postFileUploadsToExternalURL is a private method, TODO: refactor into own function/module that is more easily testable
        await client.postFileUploadsToExternalURL(invalidTestFileUploadsToComplete);
        assert.fail('Should have rejected with an error but did not');
      } catch (error) {
        assert.equal((error as Error).message.startsWith('No upload url found for file'), true);
      }
    });
  });

  describe('has an option to suppress request error from Axios', () => {
    let scope: nock.Scope;
    beforeEach(() => {
      scope = nock('https://slack.com').post(/api/).replyWithError('Request failed!!');
    });

    it("the 'original' property is attached when the option, attachOriginalToWebAPIRequestError is absent", async () => {
      const client = new WebClient(token, {
        retryConfig: { retries: 0 },
      });

      try {
        await client.apiCall('conversations/list');
      } catch (error) {
        expect(error).to.haveOwnProperty('original');
        scope.done();
      }
    });

    it("the 'original' property is attached when the option, attachOriginalToWebAPIRequestError is set to true", async () => {
      const client = new WebClient(token, {
        attachOriginalToWebAPIRequestError: true,
        retryConfig: { retries: 0 },
      });

      try {
        await client.apiCall('conversations/list');
      } catch (error) {
        expect(error).to.haveOwnProperty('original');
        scope.done();
      }
    });

    it("the 'original' property is not attached when the option, attachOriginalToWebAPIRequestError is set to false", async () => {
      const client = new WebClient(token, {
        attachOriginalToWebAPIRequestError: false,
        retryConfig: { retries: 0 },
      });

      try {
        await client.apiCall('conversations/list');
      } catch (error) {
        expect(error).not.to.haveOwnProperty('original');
        scope.done();
      }
    });
  });
});

// Helpers
function parseUserAgentIntoMetadata(userAgent: string) {
  // naive implementation, this might break on platforms whose names or version numbers have spaces or slashes in them,
  // and that if app metadata keys or values have spaces or slashes in them.
  const parts = userAgent.split(' ');
  return parts.reduce(
    (digest, part) => {
      const [key, val] = part.split('/');
      digest[key] = val;
      return digest;
    },
    {} as Record<string, string | undefined>,
  );
}
