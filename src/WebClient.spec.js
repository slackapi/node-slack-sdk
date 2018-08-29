require('mocha');
const fs = require('fs');
const path = require('path');
const { Agent } = require('https');
const { Readable } = require('stream');
const { assert } = require('chai');
const { WebClient } = require('./WebClient');
const { ErrorCode } = require('./errors');
const { LogLevel } = require('./logger');
const { addAppMetadata } = require('./util');
const rapidRetryPolicy = require('./retry-policies').rapidRetryPolicy;
const { CaptureConsole } = require('@aoberoi/capture-console');
const isPromise = require('p-is-promise');
const nock = require('nock');
const Busboy = require('busboy');
const sinon = require('sinon');

const token = 'xoxa-faketoken';
const refreshToken = 'xoxr-refreshtoken';
const clientId = 'CLIENTID';
const clientSecret = 'CLIENTSECRET';

describe('WebClient', function () {

  describe('constructor()', function () {
    it('should build a default client given a token', function () {
      const client = new WebClient(token);
      assert.instanceOf(client, WebClient);
      assert.equal(client.token, token);
      assert.equal(client.slackApiUrl, 'https://slack.com/api/')
    });

    it('should build a client without a token', function () {
      const client = new WebClient();
      assert.instanceOf(client, WebClient);
    });
  });

  describe('has an option to change the log output severity', function () {
    beforeEach(function () {
      this.capture = new CaptureConsole();
      this.capture.startCapture();
    });
    it('outputs a debug log on initialization', function () {
      const debuggingClient = new WebClient(token, { logLevel: LogLevel.DEBUG });
      const output = this.capture.getCapturedText();
      assert.isNotEmpty(output); // should have at least 1 log line, but not asserting since that is an implementation detail
    });
    afterEach(function () {
      this.capture.stopCapture();
    });
  });

  describe('has an option to provide a logging function', function () {
    beforeEach(function () {
      this.capture = new CaptureConsole();
      this.capture.startCapture();
    });
    it('sends logs to the function and not to stdout', function () {
      const output = [];
      const stub = function (level, message) {
        output.push([level, message]);
      }
      const debuggingClient = new WebClient(token, { logLevel: LogLevel.DEBUG, logger: stub });
      assert.isAtLeast(output.length, 1);
      const firstOutput = output[0];
      assert.lengthOf(firstOutput, 2);
      const firstOutputLevel = firstOutput[0];
      assert.equal(firstOutputLevel, 'debug');
      const capturedOutput = this.capture.getCapturedText();
      assert.isEmpty(capturedOutput);
    });
    afterEach(function () {
      this.capture.stopCapture();
    });
  });

  describe('apiCall()', function () {
    beforeEach(function () {
      this.client = new WebClient(token, { retryConfig: rapidRetryPolicy });
    });

    describe('when making a successful call', function () {
      beforeEach(function () {
        this.scope = nock('https://slack.com')
          .post(/api/)
          .reply(200, { ok: true,
            response_metadata: {
              warnings: ['testWarning1', 'testWarning2']
            }
          });
      });

      it('should return results in a Promise', function () {
        const r = this.client.apiCall('method');
        assert(isPromise(r));
        return r.then(result => {
          assert(result.ok);
          this.scope.done();
        });
      });

      it('should send warnings to logs', function() {
        const output = [];
        const stub = function (level, message) {
          output.push([level, message]);
        }
        const warnClient = new WebClient(token, { logLevel: LogLevel.WARN, logger: stub });
        return warnClient.apiCall('method')
          .then((result) => {
            assert.isNotEmpty(output);
            assert.lengthOf(output, 2, 'two logs pushed onto output');
          });
      });

      it('should deliver results in a callback', function (done) {
        this.client.apiCall('method', {}, (error, result) => {
          assert.isNotOk(error);
          assert(result.ok);
          this.scope.done();
          done();
        });
      });
    });

    describe('with OAuth scopes in the response headers', function () {
      it('should expose a scopes and acceptedScopes properties on the result', function () {
        const scope = nock('https://slack.com')
          .post(/api/)
          .reply(200, { ok: true }, {
            'X-OAuth-Scopes': 'files:read, chat:write:bot',
            'X-Accepted-OAuth-Scopes': 'files:read'
          });
        return this.client.apiCall('method')
          .then((result) => {
            assert.deepNestedInclude(result, { 'scopes': ['files:read', 'chat:write:bot'] });
            assert.deepNestedInclude(result, { 'acceptedScopes': ['files:read'] });
            scope.done();
          })
      });
    });

    describe('when called with bad options', function () {
      it('should reject its Promise with TypeError', function (done) {
        const results = [
          this.client.apiCall('method', 4),
          this.client.apiCall('method', 'a string'),
          this.client.apiCall('method', false),
        ];
        const caughtErrors = results.map(r => {
          assert(isPromise(r));
          return r
            .then(() => {
              // if any of these promises resolve, this test fails
              assert(false);
            })
            .catch((error) => {
              // each promise should reject with the right kind of error
              assert.instanceOf(error, TypeError);
            });
        });
        Promise.all(caughtErrors)
          .then(() => done());
      });

      it('should return a TypeError to its callback', function (done) {
        this.client.apiCall('method', 4, (error) => {
          assert.instanceOf(error, TypeError);
          done();
        });
      });
    });

    describe('when an API call fails', function () {
      beforeEach(function () {
        this.scope = nock('https://slack.com')
          .post(/api/)
          .reply(500);
      });

      it('should return a Promise which rejects on error', function (done) {
        const r = this.client.apiCall('method')
        assert(isPromise(r));
        r.catch((error) => {
          assert.instanceOf(error, Error);
          this.scope.done();
          done();
        });
      });

      it('should deliver error in a callback', function (done) {
        this.client.apiCall('method', {}, (error) => {
          assert.instanceOf(error, Error);
          this.scope.done();
          done();
        });
      });
    });

    it('should fail with WebAPIPlatformError when the API response has an error', function (done) {
      const scope = nock('https://slack.com')
        .post(/api/)
        .reply(200, { ok: false, error: 'bad error' });
      this.client.apiCall('method')
        .catch((error) => {
          assert.instanceOf(error, Error);
          assert.equal(error.code, ErrorCode.PlatformError);
          assert.nestedPropertyVal(error, 'data.ok', false);
          assert.nestedPropertyVal(error, 'data.error', 'bad error');
          scope.done();
          done();
        });
    });

    it('should fail with WebAPIHTTPError when the API response has an unexpected status', function (done) {
      const body = { foo: 'bar' };
      const scope = nock('https://slack.com')
        .post(/api/)
        .reply(500, body);
      const client = new WebClient(token, { retryConfig: { retries: 0 } });
      client.apiCall('method')
        .catch((error) => {
          assert.instanceOf(error, Error);
          assert.equal(error.code, ErrorCode.HTTPError);
          assert.instanceOf(error.original, Error); // TODO: deprecate
          assert.equal(error.statusCode, 500);
          assert.exists(error.headers);
          assert.deepEqual(error.body, body);
          scope.done();
          done();
        });
    });

    it('should fail with WebAPIRequestError when the API request fails', function (done) {
      // One known request error is when the node encounters an ECONNREFUSED. In order to simulate this, rather than
      // using nock, we send the request to a host:port that is not listening.
      const client = new WebClient(token, { slackApiUrl: 'https://localhost:8999/api/', retryConfig: { retries: 0 } });
      client.apiCall('method')
        .catch((error) => {
          assert.instanceOf(error, Error);
          assert.equal(error.code, ErrorCode.RequestError);
          assert.instanceOf(error.original, Error);
          done();
        });
    });

    // Despite trying, could not figure out a good way to simulate a response that emits an error in a reliable way
    it.skip('should fail with WebAPIReadError when an API response fails', function (done) {
      class FailingReadable extends Readable {
        constructor(options) { super(options); }
        _read(size) {
          this.emit('error', new Error('test error'));
        }
      }
      const scope = nock('https://slack.com')
        .post(/api/)
        .reply(200, () => new FailingReadable());
      const client = new WebClient(token, { retryConfig: { retries: 0 } });
      client.apiCall('method')
        .catch((error) => {
          assert.instanceOf(error, Error);
          assert.equal(error.code, ErrorCode.ReadError);
          assert.instanceOf(error.original, Error);
          scope.done();
          done();
        });
    });

    it('should properly serialize simple API arguments', function () {
      const scope = nock('https://slack.com')
        // NOTE: this could create false negatives if the serialization order changes (it shouldn't matter)
        .post(/api/, 'token=xoxa-faketoken&foo=stringval&bar=42&baz=false')
        .reply(200, { ok: true });
      return this.client.apiCall('method', { foo: 'stringval', bar: 42, baz: false })
        .then(() => {
          scope.done();
        });
    });

    it('should properly serialize complex API arguments', function () {
      const scope = nock('https://slack.com')
        // NOTE: this could create false negatives if the serialization order changes (it shouldn't matter)
        .post(/api/, 'token=xoxa-faketoken&arraything=%5B%7B%22foo%22%3A%22stringval%22%2C%22bar%22%3A42%2C%22baz%22%3Afalse%2C%22zup%22%3A%5B%22one%22%2C%22two%22%2C%22three%22%5D%7D%5D&objectthing=%7B%22foo%22%3A7%2C%22hum%22%3Afalse%7D')
        .reply(200, { ok: true });
      return this.client.apiCall('method', {
        // TODO: include things like quotes and emojis
        arraything: [{
          foo: 'stringval',
          bar: 42,
          baz: false,
          zup: ['one', 'two', 'three']
        }],
        objectthing: {
          foo: 7,
          hum: false,
        },
      })
        .then(() => {
          scope.done();
        });
    });

    it('should remove undefined or null values from simple API arguments', function () {
      const scope = nock('https://slack.com')
        .post(/api/, 'token=xoxa-faketoken&something=else')
        .reply(200, { ok: true });
      return this.client.apiCall('method', {
        something_undefined: undefined,
        something_null: null,
        something: 'else'
      })
      .then(() => {
        scope.done();
      });
    });

    it('should the user on whose behalf the method is called in the request headers', function () {
      const userId = 'USERID';
      const scope = nock('https://slack.com', {
          reqheaders: {
            'X-Slack-User': userId,
          },
        })
        .post(/api/)
        .reply(200, { ok: true });
      return this.client.apiCall('method', { on_behalf_of: userId })
        .then(() => {
          scope.done();
        });
    });

    describe('when API arguments contain binary to upload', function () {
      beforeEach(function () {
        const self = this;
        self.scope = nock('https://slack.com')
          .post(/api/)
          // rather than matching on the body, that nock cannot do for content-type multipart/form-data, we use the
          // response to signal that the body was correctly serialized
          .reply(function (uri, requestBody, cb) {
            // busboy is a parser for for multipart/form-data bodies
            const busboy = new Busboy({ headers: this.req.headers });
            // capture state about all the parts that are in the body
            const parts = { files: [], fields: [], errors: [] };

            // attaching event handlers to track incoming parts
            busboy.on('file', (fieldname, file, filename) => {
              parts.files.push({ fieldname, filename });
              file.resume();
            });
            busboy.on('field', (fieldname, value) => {
              parts.fields.push({ fieldname, value });
            });
            busboy.on('error', (error) => {
              parts.errors.push(error);
            });
            busboy.on('finish', () => {
              // when the parser is done, respond to the request with the state captured
              if (parts.errors.length > 0) {
                cb(parts.errors[0]);
              } else {
                // the response must contain `ok: true` for the client to accept it
                parts.ok = true;
                cb(null, [200, JSON.stringify(parts)]);
              }
            });

            // Write incoming string body to busboy parser
            busboy.end(requestBody ? Buffer.from(requestBody, 'hex') : undefined);
          });
      });

      it('should properly serialize when the binary argument is a ReadableStream', function () {
        const imageStream = fs.createReadStream(path.resolve('test', 'fixtures', 'train.jpg'));

        return this.client.apiCall('upload', {
            someBinaryField: imageStream,
          })
          .then((parts) => {
            assert.lengthOf(parts.files, 1);
            const file = parts.files[0];
            // the filename is picked up from the the ReadableStream since it originates from fs
            assert.include(file, { fieldname: 'someBinaryField', filename: 'train.jpg' });

            assert.lengthOf(parts.fields, 1);
            assert.deepInclude(parts.fields, { fieldname: 'token', value: token });
          });
      });

      // TODO: some tests with streams/buffers that originate from formiddable and/or request

      it('should use a default name when binary argument is a Buffer', function () {
        const imageBuffer = fs.readFileSync(path.resolve('test', 'fixtures', 'train.jpg'));

        // intentially vague about the method name and argument name
        return this.client.apiCall('upload', {
          someBinaryField: imageBuffer,
        })
          .then((parts) => {
            assert.lengthOf(parts.files, 1);
            const file = parts.files[0];
            assert.include(file, { fieldname: 'someBinaryField' });
            assert.isString(file.filename);
          });
      });

      it('should filter out undefined values', function () {
        const imageBuffer = fs.readFileSync(path.resolve('test', 'fixtures', 'train.jpg'));

        return this.client.apiCall('upload', {
          // the binary argument is necessary to trigger form data serialization
          someBinaryField: imageBuffer,
          someUndefinedField: undefined,
        })
          .then((parts) => {
            // the only field is the one related to the token
            assert.lengthOf(parts.fields, 1);
          })
      });
    });

    describe('metadata in the user agent', function () {
      it('should set the user agent to contain package metadata', function () {
        const scope = nock('https://slack.com', {
          reqheaders: {
            'User-Agent': (value) => {
              const metadata = parseUserAgentIntoMetadata(value)
              // NOTE: this assert isn't that strong and doesn't say anything about the values. at this time, there
              // isn't a good way to test this without dupicating the logic of the code under test.
              assert.containsAllKeys(metadata, ['node', '@slack:client']);
              // NOTE: there's an assumption that if there's any keys besides these left at all, its the platform part
              delete metadata.node;
              delete metadata['@slack:client'];
              assert.isNotEmpty(metadata);
              return true;
            },
          },
        })
          .post(/api/)
          .reply(200, { ok: true });
        return this.client.apiCall('method')
          .then(() => {
            scope.done();
          });
      });

      it('should set the user agent to contain application metadata', function () {
        const [name, version] = ['appmedataname', 'appmetadataversion'];
        addAppMetadata({ name, version });
        const scope = nock('https://slack.com', {
          reqheaders: {
            'User-Agent': (value) => {
              const metadata = parseUserAgentIntoMetadata(value)
              assert.propertyVal(metadata, name, version);
              return true;
            },
          },
        })
          .post(/api/)
          .reply(200, { ok: true });
        // NOTE: appMetaData is only evalued on client construction, so we cannot use the client already created
        const client = new WebClient(token, { retryConfig: rapidRetryPolicy });
        return client.apiCall('method')
          .then(() => {
            scope.done();
          });
      });
    });
  });

  describe('apiCall() - without a token', function () {
    it('should make successful api calls', function () {
      const client = new WebClient(undefined, { retryConfig: rapidRetryPolicy });

      const scope = nock('https://slack.com')
        // NOTE: this could create false negatives if the serialization order changes (it shouldn't matter)
        .post(/api/, 'foo=stringval')
        .reply(200, { ok: true });

      const r = client.apiCall('method', { foo: 'stringval' });
      assert(isPromise(r));
      return r.then((result) => {
        scope.done();
      });
    });
  });

  describe('named method aliases (facets)', function () {
    beforeEach(function () {
      this.client = new WebClient(token, { retryConfig: rapidRetryPolicy });
    });
    it('should properly mount methods as functions', function () {
      // This test doesn't exhaustively check all the method aliases, it just tries a couple.
      // This should be enough since all methods are mounted in the exact same way.
      const scope = nock('https://slack.com')
        .post('/api/chat.postMessage', 'token=xoxa-faketoken&foo=stringval')
        .reply(200, { ok: true })
        // Trying this method because its mounted one layer "deeper"
        .post('/api/apps.permissions.info', 'token=xoxa-faketoken')
        .reply(200, { ok: true });
      return Promise.all([this.client.chat.postMessage({ foo: 'stringval' }), this.client.apps.permissions.info()])
        .then(() => {
          scope.done();
        });
    });
  })

  describe('has option to change slackApiUrl', function () {
    it('should send requests to an alternative URL', function () {
      const alternativeUrl = 'http://12.34.56.78/api/';
      const scope = nock(alternativeUrl)
        .post(/api\/method/)
        .reply(200, { ok: true });
      const client = new WebClient(token, { slackApiUrl: alternativeUrl });
      return client.apiCall('method');
    });
  });

  describe('has an option to set a custom HTTP agent', function () {
    it('should send a request using the custom agent', function () {
      const agent = new Agent({ keepAlive: true });
      const spy = sinon.spy(agent, 'addRequest');
      const client = new WebClient(token, { agent });
      return client.apiCall('method')
        .catch(() => {
          assert(spy.called);
        })
        .then(() => {
          agent.addRequest.restore();
          agent.destroy();
        })
        .catch((error) => {
          agent.addRequest.restore();
          agent.destroy();
          throw error;
        });
    });

    it('should use the right custom agent when providing agents for many schemes', function () {
      const agent = new Agent({ keepAlive: true });
      const spy = sinon.spy(agent, 'addRequest');
      const badAgent = { addRequest: sinon.stub().throws() };
      const client = new WebClient(token, { agent: {
        https: agent,
        http: badAgent,
      } });
      return client.apiCall('method')
        .catch(() => {
          assert(spy.called);
        })
        .then(() => {
          agent.addRequest.restore();
          agent.destroy();
        })
        .catch((error) => {
          agent.addRequest.restore();
          agent.destroy();
          throw error;
        });
    });

    it('should use accept a boolean agent', function () {
      // we don't have any hooks into an agent that node will initialize, so we just make sure that this doesn't throw
      new WebClient(token, { agent: false });
      return Promise.resolve();
    });
  });

  describe('has an option to set request concurrency', function () {
    // TODO: factor out common logic into test helpers
    const responseDelay = 100; // ms

    beforeEach(function () {
      const self = this;
      self.testStart = Date.now();
      self.scope = nock('https://slack.com')
        .persist()
        .post(/api/)
        .delay(responseDelay)
        .reply(200, function (uri, requestBody, cb) {
          // NOTE: the assumption is that this function gets called right away when the request body is available,
          // not after the delay
          const diff = Date.now() - self.testStart;
          return cb(null, [200, JSON.stringify({ ok: true, diff })]);
        });
    });

    it('should have a default conncurrency of 3', function () {
      const client = new WebClient(token);
      const requests = [
        client.apiCall('1'),
        client.apiCall('2'),
        client.apiCall('3'),
        client.apiCall('4'),
      ];
      return Promise.all(requests)
        .then((responses) => {
          // verify all responses are present
          assert.lengthOf(responses, 4);

          // verify that maxRequestConcurrency requests were all sent concurrently
          const concurrentResponses = responses.slice(0, 3); // the first 3 responses
          concurrentResponses.forEach(r => assert.isBelow(r.diff, responseDelay));

          // verify that any requests after maxRequestConcurrency were delayed by the responseDelay
          const queuedResponses = responses.slice(3);
          const minDiff = concurrentResponses[concurrentResponses.length - 1].diff + responseDelay;
          queuedResponses.forEach(r => assert.isAtLeast(r.diff, minDiff));
        });
    });

    it('should allow concurrency to be set', function () {
      const client = new WebClient(token, { maxRequestConcurrency: 1 });
      const requests = [client.apiCall('1'), client.apiCall('2')];
      return Promise.all(requests)
        .then((responses) => {
          // verify all responses are present
          assert.lengthOf(responses, 2);

          // verify that maxRequestConcurrency requets were all sent concurrently
          const concurrentResponses = responses.slice(0, 1); // the first response
          concurrentResponses.forEach(r => assert.isBelow(r.diff, responseDelay));

          // verify that any requests after maxRequestConcurrency were delayed by the responseDelay
          const queuedResponses = responses.slice(1);// the second response
          const minDiff = concurrentResponses[concurrentResponses.length - 1].diff + responseDelay;
          queuedResponses.forEach(r => { assert.isAtLeast(r.diff, minDiff) });
        });
    });

    afterEach(function () {
      this.scope.persist(false);
    });
  });

  describe('has an option to set the retry policy ', function () {
    it('retries a request which fails to get a response', function () {
      const scope = nock('https://slack.com')
        .post(/api/)
        .replyWithError('could be a ECONNREFUSED, ENOTFOUND, ETIMEDOUT, ECONNRESET')
        .post(/api/)
        .reply(200, { ok: true });
      const client = new WebClient(token, { retryConfig: rapidRetryPolicy });
      return client.apiCall('method')
        .then((resp) => {
          assert.propertyVal(resp, 'ok', true);
          scope.done();
        });
    });
    it('retries a request whose response has a status code that is not 200 nor 429 (rate limited)', function () {
      const scope = nock('https://slack.com')
        .post(/api/)
        .reply(500)
        .post(/api/)
        .reply(200, { ok: true });
      const client = new WebClient(token, { retryConfig: rapidRetryPolicy });
      return client.apiCall('method')
        .then((resp) => {
          assert.propertyVal(resp, 'ok', true);
          scope.done();
        });
    });
  });

  describe('has rate limit handling', function () {
    describe('when configured to reject rate-limited calls', function () {
      beforeEach(function () {
        this.client = new WebClient(token, { rejectRateLimitedCalls: true });
      });

      it('should reject with a WebAPIRateLimitedError when a request fails due to rate-limiting', function (done) {
        const retryAfter = 5;
        const scope = nock('https://slack.com')
          .post(/api/)
          .reply(429, '', { 'retry-after': retryAfter });
        this.client.apiCall('method')
          .catch((error) => {
            assert.instanceOf(error, Error);
            assert.equal(error.code, ErrorCode.RateLimitedError);
            assert.equal(error.retryAfter, retryAfter);
            scope.done();
            done();
          });
      });

      it('should emit a rate_limited event on the client', function (done) {
        const spy = sinon.spy();
        const scope = nock('https://slack.com')
          .post(/api/)
          .reply(429, {}, { 'retry-after': 0 });
        const client = new WebClient(token, { rejectRateLimitedCalls: true });
        client.on('rate_limited', spy);
        client.apiCall('method')
          .catch((err) => {
            assert(spy.calledOnceWith(0))
            scope.done();
            done();
          });
      });
    });

    it('should automatically retry the request after the specified timeout', function () {
      const retryAfter = 1;
      const scope = nock('https://slack.com')
        .post(/api/)
        .reply(429, '', { 'retry-after': retryAfter })
        .post(/api/)
        .reply(200, { ok: true });
      const client = new WebClient(token, { retryConfig: rapidRetryPolicy });
      const startTime = Date.now();
      return client.apiCall('method')
        .then(() => {
          const diff = Date.now() - startTime;
          assert.isAtLeast(diff, retryAfter * 1000, 'elapsed time is at least a second');
          scope.done();
        });
    });

    it('should pause the remaining requests in queue', function () {
      const startTime = Date.now();
      const retryAfter = 1;
      const scope = nock('https://slack.com')
        .post(/api/)
        .reply(429, '', { 'retry-after': retryAfter })
        .post(/api/)
        .reply(200, function (uri, requestBody) {
          return JSON.stringify({ ok: true, diff: Date.now() - startTime });
        })
        .post(/api/)
        .reply(200, function (uri, requestBody) {
          return JSON.stringify({ ok: true, diff: Date.now() - startTime });
        });
      const client = new WebClient(token, { retryConfig: rapidRetryPolicy, maxRequestConcurrency: 1 });
      const firstCall = client.apiCall('method');
      const secondCall = client.apiCall('method');
      return Promise.all([firstCall, secondCall])
        .then(([firstResult, secondResult]) => {
          assert.isAtLeast(firstResult.diff, retryAfter * 1000);
          assert.isAtLeast(secondResult.diff, retryAfter * 1000);
          scope.done();
        });
    });

    it('should emit a rate_limited event on the client', function (done) {
      const spy = sinon.spy();
      const scope = nock('https://slack.com')
        .post(/api/)
        .reply(429, {}, { 'retry-after': 0 });
      const client = new WebClient(token, { retryConfig: { retries: 0 } });
      client.on('rate_limited', spy);
      client.apiCall('method')
        .catch((err) => {
          assert(spy.calledOnceWith(0))
          scope.done();
          done();
        });
    });
    // TODO: when parsing the retry header fails
  });

  describe('has support for automatic pagination', function () {
    beforeEach(function () {
      this.client = new WebClient(token);
    });

    describe('when using a method that supports cursor-based pagination', function () {
      it('should automatically paginate and return a single merged result when no pagination options are supplied', function () {
        const scope = nock('https://slack.com')
          .post(/api/)
          .reply(200, { ok: true, channels: ['CONVERSATION_ONE', 'CONVERSATION_TWO'], response_metadata: { next_cursor: 'CURSOR' } })
          .post(/api/, (body) => {
            // NOTE: limit value is compared as a string because nock doesn't properly serialize the param into a number
            return body.limit && body.limit === '200' && body.cursor && body.cursor === 'CURSOR';
          })
          .reply(200, { ok: true, channels: ['CONVERSATION_THREE'], response_metadata: { some_key: 'some_val' }});

        return this.client.channels.list()
          .then((result) => {
            assert.lengthOf(result.channels, 3);
            assert.deepEqual(result.channels, ['CONVERSATION_ONE', 'CONVERSATION_TWO', 'CONVERSATION_THREE'])
            // the following line makes sure that besides the paginated property, other properties of the result are
            // sourced from the last response
            assert.propertyVal(result.response_metadata, 'some_key', 'some_val');
            scope.done();
          });
      });

      it('should allow the automatic page size to be configured', function () {
        const pageSize = 400;
        const scope = nock('https://slack.com')
          .post(/api/, (body) => {
            // NOTE: limit value is compared as a string because nock doesn't properly serialize the param into a number
            return body.limit && body.limit === ('' + pageSize);
          })
          .reply(200, { ok: true, channels: [], response_metadata: {} })

        const client = new WebClient(token, { pageSize });
        return client.channels.list()
          .then((result) => {
            scope.done();
          });
      });

      it('should not automatically paginate when pagination options are supplied', function () {
        const scope = nock('https://slack.com')
          .post(/api/)
          .reply(200, { ok: true, channels: ['CONVERSATION_ONE'], response_metadata: { next_cursor: 'CURSOR' } });

        return this.client.channels.list({ limit: 1 })
          .then((result) => {
            assert.deepEqual(result.channels, ['CONVERSATION_ONE'])
            scope.done();
          });
      });

      it('should warn when pagination options for timeline or traditional pagination are supplied', function () {
        const capture = new CaptureConsole();
        capture.startCapture();
        const scope = nock('https://slack.com')
          .post(/api/)
          .reply(200, { ok: true, messages: [] });

        // this method supports both cursor-based and timeline-based pagination
        return this.client.conversations.history({ oldest: 'MESSAGE_TIMESTAMP' })
          .then(() => {
            const output = capture.getCapturedText();
            assert.isNotEmpty(output);
            scope.done();
          })
          .then(() => {
            capture.stopCapture();
          }, (error) => {
            capture.stopCapture();
            throw error;
          });
      });
    });

    it('should warn when options indicate mixed pagination types', function () {
      const capture = new CaptureConsole();
      capture.startCapture();
      const scope = nock('https://slack.com')
        .post(/api/)
        .reply(200, { ok: true, messages: [] });

      // oldest indicates timeline-based pagination, cursor indicates cursor-based pagination
      return this.client.conversations.history({ oldest: 'MESSAGE_TIMESTAMP', cursor: 'CURSOR' })
        .then(() => {
          const output = capture.getCapturedText();
          assert.isNotEmpty(output);
          scope.done();
        })
        .then(() => {
          capture.stopCapture();
        }, (error) => {
          capture.stopCapture();
          throw error;
        });
    });

    it('should warn when the options indicate a pagination type that is incompatible with the method', function () {
      const capture = new CaptureConsole();
      capture.startCapture();
      const scope = nock('https://slack.com')
        .persist()
        .post(/api/)
        // its important to note that these requests all indicate some kind of pagination, so there should be no
        // auto-pagination, and therefore there's no need to specify a list-type data in the response.
        .reply(200, { ok: true });

      const requests = [
        // when the options are cursor and the method is not
        this.client.channels.history({ cursor: 'CURSOR' }),
        // when the options are timeline and the method is not
        this.client.channels.list({ oldest: 'MESSAGE_TIMESTAMP' }),
        // when the options are traditional and the method is not
        this.client.channels.list({ page: 3, count: 100 }),
      ];

      return Promise.all(requests)
        .then(() => {
          const output = capture.getCapturedText();
          assert.isAtLeast(output.length, 3);
          scope.done();
        })
        .then(() => {
          capture.stopCapture();
        }, (error) => {
          capture.stopCapture();
          throw error;
        });
    });

    describe('when using a method that supports only non-cursor pagination techniques', function () {
      it('should not automatically paginate', function () {
        const scope = nock('https://slack.com')
          .post(/api/)
          .reply(200, { ok: true, messages: [{}, {}], has_more: false });

        return this.client.mpim.history({ channel: 'MPIM_ID' })
          .then((result) => {
            assert.isTrue(result.ok);
            scope.done();
          });
      });
    });
  });

  describe('has support for token refresh', function () {
    it('should accept client credentials and refresh token on initialization', function () {
      const client = new WebClient(token, {
        refreshToken,
        clientId,
        clientSecret,
      });
      assert.equal(client.token, token);
    });

    describe('when the access token is expired', function () {
      beforeEach(function () {
        this.expiredToken = 'xoxa-expired-access-token';
        this.client = new WebClient(this.expiredToken, { refreshToken, clientId, clientSecret });

        // NOTE: this is bad because it depends on internal implementation details. in the future we should allow the
        // client to perform a refresh and actually send back a response from `oauth.access` with a very short (or
        // possibly negative) expires_in value.
        this.client.accessTokenExpiresAt = Date.now() - 100;
      });

      it('should refresh the token before making the API call', function () {
        const scope = nock('https://slack.com')
          .post(/api\/oauth\.access/, function (body) {
            // verify that the body contains the required arguments for token refresh
            return (body.client_id === clientId && body.client_secret === clientSecret &&
                    body.grant_type === 'refresh_token' && body.refresh_token === refreshToken);
          })
          .reply(200, { ok: true, access_token: token, expires_in: 5, team_id: 'TEAMID', enterprise_id: 'ORGID' })
          .post(/api/, function (body) {
            // verify the body contains the unexpired token
            return body.token === token;
          })
          .reply(200, { ok: true });
        return this.client.apiCall('method')
          .then((result) => {
            assert.isTrue(result.ok);
            scope.done();
          });
      });

      it('should emit the token_refreshed event after a successful token refresh');

      it('should retry an API call that fails during a token refresh', function () {
        const scope = nock('https://slack.com')
          .post(/api\/oauth\.access/, function (body) {
            // verify that the body contains the required arguments for token refresh
            return (body.client_id === clientId && body.client_secret === clientSecret &&
                    body.grant_type === 'refresh_token' && body.refresh_token === refreshToken);
          })
          .reply(200, { ok: true, access_token: token, expires_in: 5, team_id: 'TEAMID', enterprise_id: 'ORGID' })
          // this request is handled before the refresh finishes
          .post(/api\/second/, function(body) {
            return body.token === this.expiredToken;
          })
          .reply(200, { ok: false, error: 'invalid_auth' })
          // these requests are handled after the refresh finishes
          .post(/api\/first/, function(body) {
            return body.token === token;
          })
          .reply(200, { ok: true, call: 'first' })
          .post(/api\/second/, function(body) {
            return body.token === token;
          })
          .reply(200, { ok: true, call: 'second' });

        const requests = [
          this.client.apiCall('first'), // the first API call triggers the token refresh, which will be in progress
          this.client.apiCall('second'), // this is the API call which we are verifying the retry will occur
        ];
        return Promise.all(requests)
          .then(([firstResult, secondResult]) => {
            assert.equal(firstResult.call, 'first');
            assert.equal(secondResult.call, 'second');
            scope.done();
          });
      });
      it('should retry an API call that fails and began before the last token refresh');

      it('should fail with a RefreshFailedError when the refresh token is not valid', function () {
        const scope = nock('https://slack.com')
          .post(/api\/oauth\.access/, function (body) {
            // verify that the body contains the required arguments for token refresh
            return (body.client_id === clientId && body.client_secret === clientSecret &&
                    body.grant_type === 'refresh_token' && body.refresh_token === refreshToken);
          })
          .reply(200, { ok: false, error: 'invalid_auth' })
        return this.client.apiCall('method')
          .then((result) => {
            assert(false);
          })
          .catch((error) => {
            assert.instanceOf(error, Error);
            assert.equal(error.code, ErrorCode.RefreshFailedError);
            scope.done();
          });
      });
    });

    describe('manually setting the access token', function () {
      it('should not refresh the token before making the API call');
      it('should not refresh the token after an API call fails');
    });

    it('should fail with a PlatformError (invalid_auth) when the access token is not valid (but not expired)', function () {
      this.invalidToken = 'xoxa-invalid-token';
      this.client = new WebClient(this.invalidToken, { refreshToken, clientId, clientSecret });
      // Token shouldn't not be expired
      this.client.accessTokenExpiresAt = Date.now() + 100;

      const scope = nock('https://slack.com')
        .post(/api/)
        .reply(200, { ok: false, error: 'invalid_auth' });
      return this.client.apiCall('method')
        .then((res) => {
          assert(false);
        })
        .catch((error) => {
          assert.instanceOf(error, Error);
          assert.equal(error.code, ErrorCode.PlatformError);
          scope.done();
        });
    });
  });

  describe('warnings', function () {
    it('should warn when calling a deprecated method', function () {
      const capture = new CaptureConsole();
      capture.startCapture();
      const scope = nock('https://slack.com')
        .post(/api/)
        .reply(200, { ok: true });

      const client = new WebClient(token);
      return client.files.comments.add({ file: 'FILE', comment: 'COMMENT' })
        .then(() => {
          const output = capture.getCapturedText();
          assert.isNotEmpty(output);
          const warning = output[0];
          assert.match(warning, /^\[WARN\]/);
          scope.done();
        })
        .then(() => {
          capture.stopCapture();
        }, (error) => {
          capture.stopCapture();
          throw error;
        });
    });
  });

  afterEach(function () {
    nock.cleanAll();
  });
});

// Helpers
function parseUserAgentIntoMetadata(userAgent) {
  // naive implementation, this might break on platforms whose names or version numbers have spaces or slashes in them,
  // and that if app metadata keys or values have spaces or slashes in them.
  const parts = userAgent.split(' ');
  return parts.reduce((digest, part) => {
    const [key, val] = part.split('/');
    digest[key] = val;
    return digest;
  }, {});
}
