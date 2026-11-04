import assert from 'node:assert';
import childProcess from 'node:child_process';
import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { after, afterEach, before, beforeEach, describe, it, mock } from 'node:test';

import start from './start.js';

/**
 * @typedef {import('node:test').Mock<(...args: any[]) => any>} MockFunction
 */

/**
 * Creates a stand-in for the spawned app process that tests emit output and exit events on.
 */
function createMockApp() {
  const stdout = Object.assign(new EventEmitter(), { setEncoding: () => {} });
  return Object.assign(new EventEmitter(), { stdout, stderr: new EventEmitter(), kill: mock.fn() });
}

/**
 * Lists the arguments of each call made to a mocked function.
 * @param {MockFunction} fn - The mocked function to inspect.
 * @returns {unknown[][]} - The arguments of every call, in order.
 */
function callsTo(fn) {
  return fn.mock.calls.map((call) => call.arguments);
}

describe('start implementation', async () => {
  describe('begins the app process', async () => {
    /** @type {MockFunction} */
    let exitStub;
    /** @type {MockFunction} */
    let stdoutWriteStub;
    /** @type {MockFunction} */
    let stderrWriteStub;
    /** @type {ReturnType<typeof createMockApp>} */
    let app;
    /** @type {MockFunction} */
    let spawnStub;

    beforeEach(() => {
      exitStub = mock.method(process, 'exit', () => {});
      stdoutWriteStub = mock.method(process.stdout, 'write', () => {});
      stderrWriteStub = mock.method(process.stderr, 'write', () => {});
      app = createMockApp();
      spawnStub = mock.method(childProcess, 'spawn', () => app);
      process.env.SLACK_CLI_XAPP = 'xapp-example';
      process.env.SLACK_CLI_XOXB = 'xoxb-example';
    });

    afterEach(() => {
      mock.restoreAll();
      process.env.SLACK_CLI_XOXB = undefined;
      process.env.SLACK_CLI_XAPP = undefined;
    });

    describe('runs the package main path', async () => {
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'start-'));
      const packageJSONFilePath = path.join(tempDir, 'package.json');

      before(() => {
        const mainPackageJSON = { name: 'Example application', main: 'start.js' };
        fs.writeFileSync(packageJSONFilePath, JSON.stringify(mainPackageJSON, null, 2));
      });

      after(() => {
        fs.rmSync(tempDir, { recursive: true, force: true });
      });

      it('writes output from the main script', () => {
        start(tempDir);
        app.stdout.emit('data', 'message');
        app.stderr.emit('data', 'warning');
        app.emit('close', 0);

        assert.deepEqual(callsTo(spawnStub), [['node', [path.resolve(tempDir, 'start.js')]]]);
        assert.deepEqual(callsTo(stdoutWriteStub), [['message']]);
        assert.deepEqual(callsTo(stderrWriteStub), [['warning']]);
        assert.deepEqual(callsTo(exitStub), [[0]]);
      });
    });

    describe('runs the default app path', async () => {
      it('writes output from the default script', async () => {
        start('./tmp');
        app.stdout.emit('data', 'defaults');
        app.stderr.emit('data', 'watch out');
        app.emit('close', 2);

        assert.deepEqual(callsTo(spawnStub), [['node', [path.resolve('tmp', 'app.js')]]]);
        assert.deepEqual(callsTo(stdoutWriteStub), [['defaults']]);
        assert.deepEqual(callsTo(stderrWriteStub), [['watch out']]);
        assert.deepEqual(callsTo(exitStub), [[2]]);
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
        app.stdout.emit('data', 'startled');
        app.stderr.emit('data', 'erroneous');
        app.emit('close', 4);

        assert.deepEqual(callsTo(spawnStub), [['node', [path.resolve('application.js')]]]);
        assert.deepEqual(callsTo(stdoutWriteStub), [['startled']]);
        assert.deepEqual(callsTo(stderrWriteStub), [['erroneous']]);
        assert.deepEqual(callsTo(exitStub), [[4]]);
      });
    });
  });

  describe('stops the app process', () => {
    /** @type {EventEmitter} */
    let processEvents;
    /** @type {MockFunction} */
    let exitStub;
    /** @type {ReturnType<typeof createMockApp>} */
    let app;
    /** @type {MockFunction} */
    let spawnStub;

    beforeEach(() => {
      process.env.SLACK_CLI_CUSTOM_FILE_PATH = 'app.js';
      processEvents = new EventEmitter();
      mock.method(process, 'on', (/** @type {string} */ event, /** @type {() => void} */ listener) =>
        processEvents.on(event, listener),
      );
      exitStub = mock.method(process, 'exit', () => {});
      app = createMockApp();
      spawnStub = mock.method(childProcess, 'spawn', () => app);
    });

    afterEach(() => {
      mock.restoreAll();
      process.env.SLACK_CLI_CUSTOM_FILE_PATH = undefined;
    });

    it('stops app process on hook exit', () => {
      start('./');
      processEvents.emit('exit');

      assert.deepEqual(callsTo(spawnStub), [['node', [path.resolve('app.js')]]]);
      assert.equal(app.kill.mock.callCount(), 1);
    });

    it('stops app process on hook SIGINT', () => {
      start('./');
      processEvents.emit('SIGINT');

      assert.deepEqual(callsTo(app.kill), [['SIGINT']]);
      assert.equal(exitStub.mock.callCount(), 1);
    });

    it('stops app process on hook SIGTERM', () => {
      start('./');
      processEvents.emit('SIGTERM');

      assert.deepEqual(callsTo(app.kill), [['SIGTERM']]);
      assert.equal(exitStub.mock.callCount(), 1);
    });
  });
});
