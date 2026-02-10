import assert from 'node:assert';
import childProcess from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { after, afterEach, before, beforeEach, describe, it } from 'mocha';
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
 * @property {sinon.SinonStub} [kill] - Forced exit code of a spawned process.
 */

describe('start implementation', async () => {
  describe('begins the app process', async () => {
    /** @type {sinon.SinonStub} */
    let exitStub;
    /** @type {sinon.SinonStub} */
    let stdoutWriteStub;
    /** @type {sinon.SinonStub} */
    let stderrWriteStub;
    /** @type {MockSpawnProcess} */
    let mockSpawnProcess;
    /** @type {sinon.SinonStub} */
    let spawnStub;

    beforeEach(() => {
      exitStub = sinon.stub(process, 'exit');
      stdoutWriteStub = sinon.stub(process.stdout, 'write');
      stderrWriteStub = sinon.stub(process.stderr, 'write');
      mockSpawnProcess = {
        stdout: { on: sinon.stub(), setEncoding: () => {} },
        stderr: { on: sinon.stub() },
        on: sinon.stub(),
        kill: sinon.stub(),
      };
      spawnStub = sinon.stub(childProcess, 'spawn').returns(/** @type {any} */ (mockSpawnProcess));
      process.env.SLACK_CLI_XAPP = 'xapp-example';
      process.env.SLACK_CLI_XOXB = 'xoxb-example';
    });

    afterEach(() => {
      sinon.restore();
      process.env.SLACK_CLI_XOXB = undefined;
      process.env.SLACK_CLI_XAPP = undefined;
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
        assert.ok(exitStub.calledWith(0));
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
        assert.ok(exitStub.calledWith(2));
      });
    });

    describe('runs the custom app path', async () => {
      before(() => {
        process.env.SLACK_CLI_CUSTOM_FILE_PATH = 'application.js';
      });

      after(() => {
        process.env.SLACK_CLI_CUSTOM_FILE_PATH = undefined;
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
        assert.ok(exitStub.calledWith(4));
      });
    });
  });

  describe('stops the app process', () => {
    /** @type {sinon.SinonStub} */
    let processStub;
    /** @type {sinon.SinonStub} */
    let exitStub;
    /** @type {MockSpawnProcess} */
    let mockSpawnProcess;
    /** @type {sinon.SinonStub} */
    let spawnStub;

    beforeEach(() => {
      process.env.SLACK_CLI_CUSTOM_FILE_PATH = 'app.js';
      processStub = sinon.stub(process, 'on');
      exitStub = sinon.stub(process, 'exit');
      mockSpawnProcess = {
        stdout: { on: sinon.stub(), setEncoding: () => {} },
        stderr: { on: sinon.stub() },
        on: sinon.stub(),
        kill: sinon.stub(),
      };
      spawnStub = sinon.stub(childProcess, 'spawn').returns(/** @type {any} */ (mockSpawnProcess));
    });

    afterEach(() => {
      sinon.restore();
      process.env.SLACK_CLI_CUSTOM_FILE_PATH = undefined;
    });

    it('stops app process on hook exit', () => {
      start('./');
      assert.ok(spawnStub.called);
      assert.ok(spawnStub.calledWith('node', [path.resolve('app.js')]));
      const handler = processStub.getCalls().find((call) => call.args[0] === 'exit')?.args[1];
      assert.ok(handler, 'exit handler should be registered');
      handler();
      assert.ok(mockSpawnProcess.kill?.called);
    });

    it('stops app process on hook SIGINT', () => {
      start('./');
      const handler = processStub.getCalls().find((call) => call.args[0] === 'SIGINT')?.args[1];
      assert.ok(handler, 'SIGINT handler should be registered');
      handler();
      assert.ok(mockSpawnProcess.kill?.calledWith('SIGINT'));
      assert.ok(exitStub.called);
    });

    it('stops app process on hook SIGTERM', () => {
      start('./');
      const handler = processStub.getCalls().find((call) => call.args[0] === 'SIGTERM')?.args[1];
      assert.ok(handler, 'SIGTERM handler should be registered');
      handler();
      assert.ok(mockSpawnProcess.kill?.calledWith('SIGTERM'));
      assert.ok(exitStub.called);
    });
  });
});
