require('mocha');
const { assert } = require('chai');
const { WebClient } = require('./WebClient');
const { LogLevel } = require('../logger');
const CaptureStdout = require('capture-stdout');
const isPromise = require('p-is-promise');
const nock = require('nock');

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

  describe('apiCall()', function() {
    beforeEach(function () {
      this.client = new WebClient(token, { retryConfig: fastRetriesForTest });
    });

    describe('when making a successful call', function() {
      beforeEach(function () {
        this.scope = nock('https://slack.com')
          .post(/api/)
          .reply(200, {
            ok: true,
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

      it('should deliver results in a callback', function (done) {
        this.client.apiCall('method', {}, (error, result) => {
          assert.isNotOk(error);
          assert(result.ok);
          this.scope.done();
          done();
        });
      });

      afterEach(function () {
        nock.cleanAll();
      });
    });

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

      afterEach(function () {
        nock.cleanAll();
      });
    });

  });

});


