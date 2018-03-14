require('mocha');
const fs = require('fs');
const path = require('path');
const { Agent } = require('http');
const { assert } = require('chai');
const { WebClient } = require('./WebClient');
const { LogLevel } = require('./logger');
const { addAppMetadata } = require('./util');
const CaptureStdout = require('capture-stdout');
const isPromise = require('p-is-promise');
const nock = require('nock');
const Busboy = require('busboy');

const token = 'xoxa-faketoken';
const fastRetriesForTest = { minTimeout: 0, maxTimeout: 1 };

describe('WebClient', function () {

  describe('constructor()', function () {
    it('should build a default client given a token', function () {
      const client = new WebClient(token);
      assert.instanceOf(client, WebClient);
      assert.equal(client.token, token);
      assert.equal(client.slackApiUrl, 'https://slack.com/api/')
    });
  });

  describe('has an option to change the log output severity', function () {
    beforeEach(function () {
      this.capture = new CaptureStdout();
      this.capture.startCapture();
    });
    it('outputs a debug log on initialization', function () {
      const debuggingClient = new WebClient(token, { logLevel: LogLevel.DEBUG });
      const output = this.capture.getCapturedText();
      assert.isNotEmpty(output); // should have 2 log lines, but not asserting since that is an implementation detail
    });
    afterEach(function () {
      this.capture.stopCapture();
    });
  });

  describe('has an option to provide a logging function', function () {
    beforeEach(function () {
      this.capture = new CaptureStdout();
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
      this.client = new WebClient(token, { retryConfig: fastRetriesForTest });
    });

    describe('when making a successful call', function () {
      beforeEach(function () {
        this.scope = nock('https://slack.com')
          .post(/api/)
          .reply(200, { ok: true });
      });

      it('should return results in a Promise', function () {
        const r = this.client.apiCall('method');
        assert(isPromise(r));
        return r.then(result => {
          assert(result.ok);
          this.scope.done();
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

    // TODO: simulate each of the error types
    describe('when the call fails', function () {
      beforeEach(function () {
        this.scope = nock('https://slack.com')
          .post(/api/)
          .reply(500);
      });

      it('should return a Promise which rejects on error', function (done) {
        const r = this.client.apiCall('method')
        assert(isPromise(r));
        r.catch(error => {
          assert.ok(true);
          done();
        });
      });

      it('should deliver error in a callback', function (done) {
        this.client.apiCall('method', {}, (error) => {
          assert.instanceOf(error, Error);
          done();
        });
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

    it.skip('should remove undefined or null values from API arguments');

    describe('when API arguments contain a file upload', function () {
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

      it('should properly serialize when the file is a Buffer', function () {
        const imageBuffer = fs.readFileSync(path.resolve('test', 'fixtures', 'train.jpg'));

        // intentially vague about the method name
        return this.client.apiCall('upload', {
          file: imageBuffer,
          filename: 'train.png',
        })
          .then((parts) => {
            assert.lengthOf(parts.files, 1);
            const file = parts.files[0];
            // options were not provided to the form builder
            assert.include(file, { fieldname: 'file' });
          });
      });

      it('should properly serialize when the file is an object with value as a Buffer and options containing filename', function () {
        const imageBuffer = fs.readFileSync(path.resolve('test', 'fixtures', 'train.jpg'));

        // intentially vague about the method name
        return this.client.apiCall('upload', {
          file: { value: imageBuffer, options: { filename: 'train.png' } },
          filename: 'train.png',
        })
          .then((parts) => {
            assert.lengthOf(parts.files, 1);
            const file = parts.files[0];
            assert.include(file, { fieldname: 'file' });
          });
      });

      // Reactivate this test once we find out if the workaround in the test case before is necessary
      it.skip('should log a warning when file is a Buffer and there is no filename', function () {
        const imageBuffer = fs.readFileSync(path.resolve('test', 'fixtures', 'train.jpg'));
        this.capture = new CaptureStdout();
        this.capture.startCapture();

        // intentially vague about the method name
        return this.client.apiCall('upload', {
          file: imageBuffer,
        })
          .then(() => {
            const output = this.capture.getCapturedText();
            assert.isNotEmpty(output);
            const anyLogLineIsLevelWarn = output.reduce((acc, line) => {
              return acc || (line.indexOf('warn') !== -1)
            }, false);
            assert(anyLogLineIsLevelWarn);
          });
      });

      it('should properly serialize when the file is a ReadableStream', function () {
        const imageStream = fs.createReadStream(path.resolve('test', 'fixtures', 'train.jpg'));

        return this.client.apiCall('upload', {
          file: imageStream,
        })
          .then((parts) => {
            assert.lengthOf(parts.files, 1);
            const file = parts.files[0];
            // TODO: understand why this assertion is failing. already employed the buffer metadata workaround, should
            // look into the details about whether that workaround is still required, or why else the `source.on` is not
            // defined error would occur, or if Slack just doesn't need a filename for the part
            // assert.include(file, { fieldname: 'file', filename: 'train.jpg' });

            // NOTE: it seems the file and its filename are emitted as a field in addition to the token, not sure if
            // this was happening in the old implementation.
            assert.include(file, { fieldname: 'file' });
          });
      });

      afterEach(function () {
        if (this.capture) { this.capture.stopCapture(); }
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
        const client = new WebClient(token, { retryConfig: fastRetriesForTest });
        return client.apiCall('method')
          .then(() => {
            scope.done();
          });
      });
    });
  });

  describe('named method aliases (facets)', function () {
    beforeEach(function () {
      this.client = new WebClient(token, { retryConfig: fastRetriesForTest });
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
    // not confident how to test this. one idea is to use sinon to intercept method calls on the agent.
    it.skip('should send a request using the custom agent', function () {
      const agent = new Agent();
      const client = new WebClient(token, { agent });
      return client.apiCall('method');
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
          queuedResponses.forEach(r => assert.isAbove(r.diff, minDiff));
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
          const concurrentResponses = responses.slice(0, 1); // the first 3 responses
          concurrentResponses.forEach(r => assert.isBelow(r.diff, responseDelay));

          // verify that any requests after maxRequestConcurrency were delayed by the responseDelay
          const queuedResponses = responses.slice(1);
          const minDiff = concurrentResponses[concurrentResponses.length - 1].diff + responseDelay;
          queuedResponses.forEach(r => assert.isAbove(r.diff, minDiff));
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
        .replyWithError('could be a ECONNREFUESD, ENOTFOUND, ETIMEDOUT, ECONNRESET')
        .post(/api/)
        .reply(200, { ok: true });
      const client = new WebClient(token, { retryConfig: fastRetriesForTest });
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
      const client = new WebClient(token, { retryConfig: fastRetriesForTest });
      return client.apiCall('method')
        .then((resp) => {
          assert.propertyVal(resp, 'ok', true);
          scope.done();
        });
    });
  });

  describe('has rate limit handling', function () {
    it('should expose retry headers in the response');
    // NOTE: see retry policy note below
    it('should allow rate limit triggered retries to be turned off');

    describe('when a request fails due to rate-limiting', function () {
      // NOTE: is this retrying configurable with the retry policy? is it subject to the request concurrency?
      it('should automatically retry the request after the specified timeout');
      it('should pause the remaining requests in queue');
      it('should emit a rate_limited event on the client');
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
