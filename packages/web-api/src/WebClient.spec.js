require('mocha');
const fs = require('fs');
const path = require('path');
const { Agent } = require('https');
const { assert } = require('chai');
const { WebClient } = require('./WebClient');
const { ErrorCode } = require('./errors');
const { LogLevel } = require('./logger');
const { addAppMetadata } = require('./instrument');
const { rapidRetryPolicy } = require('./retry-policies');
const { Methods } = require('./methods');
const { CaptureConsole } = require('@aoberoi/capture-console');
const nock = require('nock');
const Busboy = require('busboy');
const sinon = require('sinon');
const axios = require('axios').default;

const token = 'xoxb-faketoken';

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
    it('should not modify global defaults in axios', function () {
      // https://github.com/slackapi/node-slack-sdk/issues/1037
      const client = new WebClient();

      const globalDefault = axios.defaults.headers.post['Content-Type'];
      // The axios.default's defaults should not be modified.
      // Specifically, defaults.headers.post should be kept as-is
      assert.exists(globalDefault);

      const instanceDefault = client.axios.defaults.headers.post['Content-Type'];
      // WebClient intentionally removes the default Content-Type
      // from the underlying AxiosInstance used for performing web API calls
      assert.notExists(instanceDefault)
    });
  });

  describe('Methods superclass', function () {
    it('should fail to construct classes that don\'t extend WebClient', function () {
      assert.throws(function () {
        class X extends Methods {
          apiCall() {}
        }
        new X();
      });
    });

    it('should succeed when constructing WebClient', function () {
      assert.doesNotThrow(function () {
        new WebClient();
      });
    });

    it('should succeed when constructing a class that extends WebClient', function () {
      assert.doesNotThrow(function () {
        class X extends WebClient {}
        new X();
      });
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

  describe('has a logger option', function () {
    beforeEach(function () {
      this.capture = new CaptureConsole();
      this.capture.startCapture();
      this.logger = {
        debug: sinon.spy(),
        info: sinon.spy(),
        warn: sinon.spy(),
        error: sinon.spy(),
        setLevel: sinon.spy(),
        setName: sinon.spy(),
      };
    });
    it('sends logs to a logger and not to stdout', function () {
      const debuggingClient = new WebClient(token, { logLevel: LogLevel.DEBUG, logger: this.logger });
      assert.isTrue(this.logger.debug.called);
      const capturedOutput = this.capture.getCapturedText();
      assert.isEmpty(capturedOutput);
    });
    it('never modifies the original logger', function () {
      new WebClient(token, { logger: this.logger });
      // Calling #setName of the given logger is destructive
      assert.isFalse(this.logger.setName.called);
    });
    afterEach(function () {
      this.capture.stopCapture();
    });
  });

  describe('has an option to override the Axios timeout value', function () {
    it('should log warning and throw error if timeout exceeded', function (done) {
      const timeoutOverride = 1; // ms, guaranteed failure
      
      const logger = {
        debug: sinon.spy(),
        info: sinon.spy(),
        warn: sinon.spy(),
        error: sinon.spy(),
        setLevel: sinon.spy(),
        setName: sinon.spy(),
      };
      
      const client = new WebClient(undefined, { 
        timeout: timeoutOverride, 
        retryConfig: { retries: 0 },
        logLevel: LogLevel.WARN, 
        logger 
      });  
      
      client.apiCall('users.list')
        .then(_ => {
          done(new Error("expected timeout to throw error"));
        })
        .catch(error => {
          try {
            assert.isTrue(logger.warn.calledOnce, 'expected Logger to be called once');
            assert.instanceOf(error, Error);
            assert.equal(error.code, ErrorCode.RequestError);
            assert.equal(error.original.config.timeout, timeoutOverride);
            assert.equal(error.original.isAxiosError, true);
            assert.equal(error.original.request.aborted, true);
            done();
          } catch (err) {
            done(err);
          }
        }); 
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
              warnings: ['testWarning1', 'testWarning2'],
              messages: [
                "[ERROR] unsupported type: sections [json-pointer:/blocks/0/type]",
                "[WARN] A Content-Type HTTP header was presented but did not declare a charset, such as a 'utf-8'"
              ]
            }
          });
      });

      it('should return results in a Promise', function () {
        const r = this.client.apiCall('method');
        return r.then(result => {
          assert(result.ok);
          this.scope.done();
        });
      });

      it('should send warnings to logs from both response_metadata.warnings & response_metadata.messages', function() {
        const logger = {
          debug: sinon.spy(),
          info: sinon.spy(),
          warn: sinon.spy(),
          error: sinon.spy(),
          setLevel: sinon.spy(),
          setName: sinon.spy(),
        };
        const warnClient = new WebClient(token, { logLevel: LogLevel.WARN, logger });
        return warnClient.apiCall('method')
          .then(() => {
            assert.isTrue(logger.warn.calledThrice);
          });
      });

      it('should send response_metadata.messages errors to logs', function() {
        const logger = {
          debug: sinon.spy(),
          info: sinon.spy(),
          warn: sinon.spy(),
          error: sinon.spy(),
          setLevel: sinon.spy(),
          setName: sinon.spy(),
        };
        const errorClient = new WebClient(token, { logLevel: LogLevel.ERROR, logger });
        return errorClient.apiCall('method')
          .then(() => {
            assert.isTrue(logger.error.calledOnce);
          });
      });

      const warningTestPatterns = [
        { method: 'chat.postEphemeral', args: { channel: "C123", blocks: [] } },
        { method: 'chat.postMessage', args: { channel: "C123", blocks: [] } },
        { method: 'chat.scheduleMessage', args: { channel: "C123", post_at: "100000000", blocks: [] } },
        { method: 'chat.update', args: { channel: "C123", ts: "123.456", blocks: [] } },
        { method: 'chat.postMessage', args: { channel: "C123", attachments: [{ blocks: [] }] } },
        { method: 'chat.postMessage', args: { channel: "C123", attachments: [{ blocks: [], fallback: "  " }] } },
      ];

      warningTestPatterns.reduce((acc, { method, args }) => {
        const textPatterns = [{ text: "text" }]
          .map(v => ({ method, args: Object.assign({}, v, args) }))
        return acc.concat(textPatterns)
      }, []).forEach(({ method, args }) => {
        it(`should not send warning to logs when client executes ${method} with text argument`, function () {
          const logger = {
            debug: sinon.spy(),
            info: sinon.spy(),
            warn: sinon.spy(),
            error: sinon.spy(),
            setLevel: sinon.spy(),
            setName: sinon.spy(),
          };
          const warnClient = new WebClient(token, { logLevel: LogLevel.WARN, logger });
          return warnClient.apiCall(method, args)
            .then(() => {
              assert.isTrue(logger.warn.calledThrice);
            });
        });
      });

      warningTestPatterns.reduce((acc, { method, args }) => {
        const textPatterns = [{ text: "" }, { text: null }, {}]
          .map(v => ({ method, args: Object.assign({}, v, args) }))
        return acc.concat(textPatterns)
      }, []).forEach(({ method, args }) => {
        it(`should send warning to logs when client executes ${method} without text argument(${args.text === "" ? "empty" : args.text})`, function () {
          const logger = {
            debug: sinon.spy(),
            info: sinon.spy(),
            warn: sinon.spy(),
            error: sinon.spy(),
            setLevel: sinon.spy(),
            setName: sinon.spy(),
          };
          const warnClient = new WebClient(token, { logLevel: LogLevel.WARN, logger });
          return warnClient.apiCall(method, args)
            .then(() => {
              assert.isTrue(logger.warn.callCount === 4)
            });
        });
      });

      const threadTsTestPatterns = [
        { method: 'chat.postEphemeral' },
        { method: 'chat.postMessage' },
        { method: 'chat.scheduleMessage' },
        { method: 'files.upload' },
      ];

      threadTsTestPatterns.reduce((acc, { method, args }) => {
        const threadTs = [{ thread_ts: 1503435956.000247, text: 'text' }]
          .map(v => ({ method, args: Object.assign({}, v, args) }))
        return acc.concat(threadTs)
      }, []).forEach(({ method, args }) => {
        it(`should send warning to logs when thread_ts in ${method} arguments is a float`, function () {
          const logger = {
            debug: sinon.spy(),
            info: sinon.spy(),
            warn: sinon.spy(),
            error: sinon.spy(),
            setLevel: sinon.spy(),
            setName: sinon.spy(),
          };
          const warnClient = new WebClient(token, { logLevel: LogLevel.WARN, logger });
          return warnClient.apiCall(method, args)
            .then(() => {
              assert.isTrue(logger.warn.callCount === 4);
            });
        });
      });

      threadTsTestPatterns.reduce((acc, { method, args }) => {
        const threadTs = [{ thread_ts: '1503435956.000247', text: 'text' }]
          .map(v => ({ method, args: Object.assign({}, v, args) }))
        return acc.concat(threadTs)
      }, []).forEach(({ method, args }) => {
        it(`should not send warning to logs when thread_ts in ${method} arguments is a string`, function () {
          const logger = {
            debug: sinon.spy(),
            info: sinon.spy(),
            warn: sinon.spy(),
            error: sinon.spy(),
            setLevel: sinon.spy(),
            setName: sinon.spy(),
          };
          const warnClient = new WebClient(token, { logLevel: LogLevel.WARN, logger });
          return warnClient.apiCall(method, args)
            .then(() => {
              assert.isTrue(logger.warn.calledThrice);
            });
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
            assert.deepNestedInclude(result.response_metadata, { scopes: ['files:read', 'chat:write:bot'] });
            assert.deepNestedInclude(result.response_metadata, { acceptedScopes: ['files:read'] });
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
    });

    describe('when an API call fails', function () {
      it('should return a Promise which rejects on error', function (done) {
        const client = new WebClient(undefined, { retryConfig: { retries: 0 } });
        
        this.scope = nock('https://slack.com')
            .post(/api/)
            .reply(500);

        client.apiCall('method').catch((error) => {
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

    it('should properly serialize simple API arguments', function () {
      const scope = nock('https://slack.com')
        // NOTE: this could create false negatives if the serialization order changes (it shouldn't matter)
        .post(/api/, 'token=xoxb-faketoken&team_id=T12345678&foo=stringval&bar=42&baz=false')
        .reply(200, { ok: true });
      return this.client.apiCall('method', { foo: 'stringval', bar: 42, baz: false, team_id: 'T12345678' })
        .then(() => {
          scope.done();
        });
    });

    it('should properly serialize complex API arguments', function () {
      const scope = nock('https://slack.com')
        // NOTE: this could create false negatives if the serialization order changes (it shouldn't matter)
        .post(/api/, 'token=xoxb-faketoken&arraything=%5B%7B%22foo%22%3A%22stringval%22%2C%22bar%22%3A42%2C%22baz%22%3Afalse%2C%22zup%22%3A%5B%22one%22%2C%22two%22%2C%22three%22%5D%7D%5D&objectthing=%7B%22foo%22%3A7%2C%22hum%22%3Afalse%7D')
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
        .post(/api/, 'token=xoxb-faketoken&something=else')
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
              assert.containsAllKeys(metadata, ['node', '@slack:web-api']);
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
      return r.then((result) => {
        scope.done();
      });
    });
  });

  describe('apiCall() - when using static headers', function () {
    it('should include static headers on api request', function () {
      const client = new WebClient(token, { headers: { 'X-XYZ': 'value' } });
      const scope = nock('https://slack.com', {
        reqheaders: {
          'X-XYZ': 'value'
        }
      })
        .post(/api/)
        .reply(200, { ok: true });
      const r = client.apiCall('method');
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
        .post('/api/chat.postMessage', 'token=xoxb-faketoken&foo=stringval')
        .reply(200, { ok: true })
        // Trying this method because its mounted one layer "deeper"
        .post('/api/team.profile.get', 'token=xoxb-faketoken')
        .reply(200, { ok: true });
      return Promise.all([this.client.chat.postMessage({ foo: 'stringval' }), this.client.team.profile.get()])
        .then(() => {
          scope.done();
        });
    });
  })

  describe('paginate()', function () {
    beforeEach(function () {
      this.client = new WebClient(token, { retryConfig: rapidRetryPolicy });
      this.method = 'conversations.list';
    });

    describe('logging', function () {
      beforeEach(function () {
        this.capture = new CaptureConsole();
        this.capture.startCapture();
      });
      it('should log a warning when called with a method not known to be cursor pagination enabled', function () {
        this.client.paginate('method');
        const output = this.capture.getCapturedText();
        assert.isNotEmpty(output);
      });
      it('should not log a warning when called with a known cursor pagination enabled', function () {
        this.client.paginate(this.method);
        const output = this.capture.getCapturedText();
        assert.isEmpty(output);
      });
      afterEach(function () {
        this.capture.stopCapture();
      });
    });

    describe('when not given shouldStop predicate', function () {
      it('should return an AsyncIterator', function () {
        const iterator = this.client.paginate(this.method);
        assert.isOk(iterator[Symbol.asyncIterator]);
      });
      it('can iterate multiple pages', async function () {
        const scope = nock('https://slack.com')
          .post(/api/)
          .reply(200, { ok: true, response_metadata: { next_cursor: 'CURSOR' } })
          .post(/api/, (body) => {
            // NOTE: limit value is compared as a string because nock doesn't properly serialize the param into a number
            return body.limit && body.limit === '200' && body.cursor && body.cursor === 'CURSOR';
          })
          .reply(200, { ok: true });
        const iterator = this.client.paginate(this.method);

        const { value: firstPage, done: firstDone } = await iterator.next();
        assert.isOk(firstPage);
        assert.isFalse(firstDone);
        const { value: secondPage, done: secondDone } = await iterator.next();
        assert.isOk(secondPage);
        assert.isFalse(secondDone);
        const { value: thirdPage, done: thirdDone } = await iterator.next();
        assert.isNotOk(thirdPage);
        assert.isTrue(thirdDone);

        scope.done();
      });
      it('can iterate multiple pages with limit items per page', async function () {
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
        const iterator = this.client.paginate(this.method, { limit });

        const { value: firstPage, done: firstDone } = await iterator.next();
        assert.isOk(firstPage);
        assert.isFalse(firstDone);
        const { value: secondPage, done: secondDone } = await iterator.next();
        assert.isOk(secondPage);
        assert.isFalse(secondDone);
        const { value: thirdPage, done: thirdDone } = await iterator.next();
        assert.isNotOk(thirdPage);
        assert.isTrue(thirdDone);

        scope.done();
      });
      it('can resume iteration from a result with an existing cursor', async function () {
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
        const iterator = this.client.paginate(this.method, { cursor });

        const { value: firstPage, done: firstDone } = await iterator.next();
        assert.isOk(firstPage);
        assert.isFalse(firstDone);
        const { value: secondPage, done: secondDone } = await iterator.next();
        assert.isOk(secondPage);
        assert.isFalse(secondDone);
        const { value: thirdPage, done: thirdDone } = await iterator.next();
        assert.isNotOk(thirdPage);
        assert.isTrue(thirdDone);

        scope.done();
      });
    });

    describe('when given shouldStop predicate', function () {
      it('should iterate until the end when shouldStop always returns false', async function () {
        const scope = nock('https://slack.com')
          .post(/api/)
          .reply(200, { ok: true, response_metadata: { next_cursor: 'CURSOR' } })
          .post(/api/, (body) => {
            // NOTE: limit value is compared as a string because nock doesn't properly serialize the param into a number
            return body.limit && body.limit === '200' && body.cursor && body.cursor === 'CURSOR';
          })
          .reply(200, { ok: true });

        const neverStop = sinon.fake.returns(false);
        await this.client.paginate(this.method, {}, neverStop);
        assert.equal(neverStop.callCount, 2);

        scope.done();
      });
      it('should only iterate once when shouldStop always returns true', async function () {
        const scope = nock('https://slack.com')
          .post(/api/)
          .reply(200, { ok: true, response_metadata: { next_cursor: 'CURSOR' } });

        const neverStop = sinon.fake.returns(true);
        await this.client.paginate(this.method, {}, neverStop);
        assert.equal(neverStop.callCount, 1);

        scope.done();
      });
      it('should iterate twice when shouldStop always returns false then true', async function () {
        const scope = nock('https://slack.com')
          .post(/api/)
          .reply(200, { ok: true, response_metadata: { next_cursor: 'CURSOR_1' } })
          .post(/api/, (body) => {
            return body.cursor && body.cursor === 'CURSOR_1';
          })
          .reply(200, { ok: true, response_metadata: { next_cursor: 'CURSOR_2' } })

        const shouldStop = sinon.stub();
        shouldStop.onCall(0).returns(false);
        shouldStop.onCall(1).returns(true);
        await this.client.paginate(this.method, {}, shouldStop);
        assert.equal(shouldStop.callCount, 2);

        scope.done();
      });

      describe('when given a reduce function', function () {
        it('should resolve for the accumulated value', async function () {
          const scope = nock('https://slack.com')
            .post(/api/)
            .reply(200, { ok: true, v: 1, response_metadata: { next_cursor: 'CURSOR' } })
            .post(/api/, (body) => {
              // NOTE: limit value is compared as a string because nock doesn't properly serialize the param into a number
              return body.limit && body.limit === '200' && body.cursor && body.cursor === 'CURSOR';
            })
            .reply(200, { ok: true, v: 2 });

          const sum = await this.client.paginate(this.method, {}, () => false, (acc, page) => {
            if (acc === undefined) {
              acc = 0;
            }
            if (page.v && typeof page.v === 'number') {
              acc += page.v;
            }
            return acc;
          });
          assert.equal(sum, 3);

          scope.done();
        });
      });
    });
  });

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
      const client = new WebClient(token, { agent, retryConfig: rapidRetryPolicy });
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

    it('should include retryAfter metadata if the response has retry info', function () {
        const scope = nock('https://slack.com')
          .post(/api/)
          .reply(200, { ok: true }, { 'retry-after': 100 });
        const client = new WebClient(token);
        return client.apiCall('method')
          .then((data) => {
            assert(data.response_metadata.retryAfter === 100);
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
  });

  it('should throw an error if the response has no retry info', function (done) {
      const scope = nock('https://slack.com')
        .post(/api/)
        .reply(429, {}, { 'retry-after': undefined });
      const client = new WebClient(token);
      client.apiCall('method')
        .catch((err) => {
          assert.instanceOf(err, Error);
          scope.done();
          done();
        });
  });

  it('should throw an error if the response has an invalid retry-after header', function (done) {
      const scope = nock('https://slack.com')
        .post(/api/)
        .reply(429, {}, { 'retry-after': 'notanumber' });
      const client = new WebClient(token);
      client.apiCall('method')
        .catch((err) => {
          assert.instanceOf(err, Error);
          scope.done();
          done();
        });
  });

  describe('has all admin.inviteRequests.* APIs', function () {
    function verify(runApiCall, methodName, expectedBody, done) {
      const scope = nock('https://slack.com')
        .post(`/api/${methodName}`)
        .reply(200, function (_uri, body) {
          return { ok: true, body: body };
        });
      runApiCall
        .then((res) => {
          assert.equal(res.body, expectedBody);
          scope.done();
          done();
        });
    }
    const client = new WebClient(token);

    it('can call admin.inviteRequests.approve', function (done) {
      verify(
        client.admin.inviteRequests.approve({ team_id: 'T123', invite_request_id: 'I123' }),
        'admin.inviteRequests.approve',
        'token=xoxb-faketoken&team_id=T123&invite_request_id=I123',
        done,
      );
    });
    it('can call admin.inviteRequests.deny', function (done) {
      verify(
        client.admin.inviteRequests.deny({ team_id: 'T123', invite_request_id: 'I123' }),
        'admin.inviteRequests.deny',
        'token=xoxb-faketoken&team_id=T123&invite_request_id=I123',
        done
      );
    });
    it('can call admin.inviteRequests.list', function (done) {
      verify(
        client.admin.inviteRequests.list({ team_id: 'T123', limit: 10, cursor: 'position' }),
        'admin.inviteRequests.list',
        'token=xoxb-faketoken&team_id=T123&limit=10&cursor=position',
        done
      );
    });
    it('can call admin.inviteRequests.approved.list', function (done) {
      verify(
        client.admin.inviteRequests.approved.list({ team_id: 'T123', limit: 10, cursor: 'position' }),
        'admin.inviteRequests.approved.list',
        'token=xoxb-faketoken&team_id=T123&limit=10&cursor=position',
        done
      );
    });
    it('can call admin.inviteRequests.denied.list', function (done) {
      verify(
        client.admin.inviteRequests.denied.list({ team_id: 'T123', limit: 10, cursor: 'position' }),
        'admin.inviteRequests.denied.list',
        'token=xoxb-faketoken&team_id=T123&limit=10&cursor=position',
        done
      );
    });
  });

  describe('has all admin.usergroups.* APIs', function () {
    function verify(runApiCall, methodName, expectedBody, done) {
      const scope = nock('https://slack.com')
        .post(`/api/${methodName}`)
        .reply(200, function (_uri, body) {
          return { ok: true, body: body };
        });

      runApiCall
        .then((res) => {
          assert.equal(res.body, expectedBody);
          scope.done();
          done();
        });
    }
    const client = new WebClient(token);

    it('can call admin.usergroups.addChannels with a string "channel_ids"', function (done) {
      verify(
        client.admin.usergroups.addChannels({ team_id: 'T123', usergroup_id: 'S123', channel_ids: 'C123,C234' }),
        'admin.usergroups.addChannels',
        'token=xoxb-faketoken&team_id=T123&usergroup_id=S123&channel_ids=C123%2CC234',
        done,
      );
    });

    it('can call admin.usergroups.addChannels', function (done) {
      verify(
        client.admin.usergroups.addChannels({ team_id: 'T123', usergroup_id: 'S123', channel_ids: ['C123','C234'] }),
        'admin.usergroups.addChannels',
        'token=xoxb-faketoken&team_id=T123&usergroup_id=S123&channel_ids=%5B%22C123%22%2C%22C234%22%5D', // URL encoded "['C123','C234']"
        done,
      );
    });
    it('can call admin.usergroups.listChannels', function (done) {
      verify(
        client.admin.usergroups.listChannels({ team_id: 'T123', include_num_members: true, usergroup_id: 'S123' }),
        'admin.usergroups.listChannels',
        'token=xoxb-faketoken&team_id=T123&include_num_members=true&usergroup_id=S123',
        done
      );
    });
    it('can call admin.usergroups.removeChannels with a string "channe_ids"', function (done) {
      verify(
        client.admin.usergroups.removeChannels({ usergroup_id: 'S123', channel_ids: 'C123,C234' }),
        'admin.usergroups.removeChannels',
        'token=xoxb-faketoken&usergroup_id=S123&channel_ids=C123%2CC234',
        done,
      );
    });

    it('can call admin.usergroups.removeChannels', function (done) {
      verify(
        client.admin.usergroups.removeChannels({ usergroup_id: 'S123', channel_ids: ['C123','C234'] }),
        'admin.usergroups.removeChannels',
        'token=xoxb-faketoken&usergroup_id=S123&channel_ids=%5B%22C123%22%2C%22C234%22%5D', // URL encoded "['C123','C234']"
        done,
      );
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
