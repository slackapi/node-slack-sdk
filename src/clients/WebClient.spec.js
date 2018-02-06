require('mocha');
const { assert } = require('chai');
const { WebClient } = require('./WebClient');
const { LogLevel } = require('../logger');
const CaptureStdout = require('capture-stdout');

const token = 'xoxa-faketoken';

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
});


