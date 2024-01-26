import { after, afterEach, before, beforeEach, describe, it } from 'mocha';
import assert from 'assert';
import childProcess from 'child_process';
import fs from 'fs';
import path from 'path';
import sinon from 'sinon';

import start from './start.js';

/**
 * @typedef MockStreams
 * @property {sinon.SinonStub} on - The istener function for this event stream.
 * @property {() => void} [setEncoding] - Character encoding of the output bytes.
 */

/**
 * @typedef MockSpawnProcess
 * @property {MockStreams} stdout - Output logged to standard output streams.
 * @property {MockStreams} stderr - Output logged to standard error streams.
 * @property {sinon.SinonStub} on - A fallback event to mock the spawn closure.
 */

describe('start implementation', async () => {
  describe('begins the app process', async () => {
    /** @type {sinon.SinonStub} */
    let consoleLogStub;
    /** @type {sinon.SinonStub} */
    let stdoutWriteStub;
    /** @type {sinon.SinonStub} */
    let stderrWriteStub;
    /** @type {MockSpawnProcess} */
    let mockSpawnProcess;
    /** @type {sinon.SinonStub} */
    let spawnStub;

    beforeEach(() => {
      consoleLogStub = sinon.stub(console, 'log');
      stdoutWriteStub = sinon.stub(process.stdout, 'write');
      stderrWriteStub = sinon.stub(process.stderr, 'write');
      mockSpawnProcess = {
        stdout: { on: sinon.stub(), setEncoding: () => { } },
        stderr: { on: sinon.stub() },
        on: sinon.stub(),
      };
      spawnStub = sinon.stub(childProcess, 'spawn').returns(/** @type {any} */(mockSpawnProcess));
      process.env.SLACK_CLI_XAPP = 'xapp-example';
      process.env.SLACK_CLI_XOXB = 'xoxb-example';
    });

    afterEach(() => {
      sinon.restore();
      delete process.env.SLACK_CLI_XOXB;
      delete process.env.SLACK_CLI_XAPP;
    });

    describe('runs the package main path', async () => {
      const tempDir = path.join(process.cwd(), 'tmp');
      const packageJSONFilePath = path.join(tempDir, 'package.json');

      before(() => {
        const mainPackageJSON = { name: 'Example application', main: 'start.js' };
        if (!fs.existsSync(tempDir)) {
          fs.mkdirSync(tempDir);
        }
        fs.writeFileSync(packageJSONFilePath, JSON.stringify(mainPackageJSON, null, 2));
      });

      after(() => {
        if (fs.existsSync(packageJSONFilePath)) {
          fs.unlinkSync(packageJSONFilePath);
        }
        if (fs.existsSync(tempDir)) {
          fs.rmSync(tempDir, { recursive: true });
        }
      });

      it('writes output from the main script', () => {
        start('./tmp');
        mockSpawnProcess.stdout.on.callArgWith(1, 'message');
        mockSpawnProcess.stderr.on.callArgWith(1, 'warning');
        mockSpawnProcess.on.callArgWith(1, 0);

        assert.ok(spawnStub.called);
        assert.ok(spawnStub.calledWith('node', [path.resolve('tmp', 'start.js')]));
        assert.ok(stdoutWriteStub.calledWith('message'));
        assert.ok(stderrWriteStub.calledWith('warning'));
        assert.ok(consoleLogStub.calledWith('Local run exited with code 0'));
      });
    });

    describe('runs the default app path', async () => {
      it('writes output from the default script', async () => {
        start('./tmp');
        mockSpawnProcess.stdout.on.callArgWith(1, 'defaults');
        mockSpawnProcess.stderr.on.callArgWith(1, 'watch out');
        mockSpawnProcess.on.callArgWith(1, 2);

        assert.ok(spawnStub.called);
        assert.ok(spawnStub.calledWith('node', [path.resolve('tmp', 'app.js')]));
        assert.ok(stdoutWriteStub.calledWith('defaults'));
        assert.ok(stderrWriteStub.calledWith('watch out'));
        assert.ok(consoleLogStub.calledWith('Local run exited with code 2'));
      });
    });

    describe('runs the custom app path', async () => {
      before(() => {
        process.env.SLACK_CLI_CUSTOM_FILE_PATH = 'application.js';
      });

      after(() => {
        delete process.env.SLACK_CLI_CUSTOM_FILE_PATH;
      });

      it('writes output from the custom script', async () => {
        start('./');
        mockSpawnProcess.stdout.on.callArgWith(1, 'startled');
        mockSpawnProcess.stderr.on.callArgWith(1, 'erroneous');
        mockSpawnProcess.on.callArgWith(1, 4);

        assert.ok(spawnStub.called);
        assert.ok(spawnStub.calledWith('node', [path.resolve('application.js')]));
        assert.ok(stdoutWriteStub.calledWith('startled'));
        assert.ok(stderrWriteStub.calledWith('erroneous'));
        assert.ok(consoleLogStub.calledWith('Local run exited with code 4'));
      });
    });
  });

  describe('without valid tokens', async () => {
    beforeEach(() => {
      sinon.stub(console, 'log');
      delete process.env.SLACK_CLI_XOXB;
      delete process.env.SLACK_CLI_XAPP;
    });
    afterEach(() => {
      sinon.restore();
      delete process.env.SLACK_CLI_XOXB;
      delete process.env.SLACK_CLI_XAPP;
    });

    it('should error without a bot token', async () => {
      try {
        process.env.SLACK_CLI_XAPP = 'xapp-example';
        start('./');
      } catch (err) {
        if (err instanceof Error) {
          assert(err.message.includes('Missing the bot token needed to start the app with Socket Mode.'));
          assert(err.message.includes('Hints: Setting the SLACK_CLI_XOXB environment variable is required.'));
          assert(err.message.includes('Check: Confirm that you are using the latest version of the Slack CLI.'));
          return;
        }
      }
      assert(false);
    });

    it('should error without an app token', async () => {
      try {
        process.env.SLACK_CLI_XOXB = 'xoxb-example';
        start('./');
      } catch (err) {
        if (err instanceof Error) {
          assert(err.message.includes('Missing the app token needed to start the app with Socket Mode.'));
          assert(err.message.includes('Hints: Setting the SLACK_CLI_XAPP environment variable is required.'));
          assert(err.message.includes('Check: Confirm that you are using the latest version of the Slack CLI.'));
          return;
        }
      }
      assert(false);
    });
  });
});
