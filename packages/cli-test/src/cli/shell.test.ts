import assert from 'node:assert/strict';
import child from 'node:child_process';
import { afterEach, beforeEach, describe, it } from 'node:test';

import sinon from 'sinon';

import type { ShellProcess } from '../types/shell';
import { mockProcess } from '../utils/test';
import { shell } from './shell';

describe('shell module', () => {
  const sandbox = sinon.createSandbox();
  let spawnSpy: sinon.SinonStub;
  let spawnProcess: child.ChildProcessWithoutNullStreams;
  let runSpy: sinon.SinonStub;
  let runOutput: child.SpawnSyncReturns<Buffer<ArrayBuffer>>;

  beforeEach(() => {
    spawnProcess = mockProcess();
    spawnSpy = sandbox.stub(child, 'spawn').returns(spawnProcess);
    runOutput = { pid: 1337, output: [], stdout: Buffer.from([]), stderr: Buffer.from([]), status: 0, signal: null };
    runSpy = sandbox.stub(child, 'spawnSync').returns(runOutput);
    sandbox.stub(shell, 'kill').resolves(true);
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('checkIfFinished method', () => {
    it('should resolve if underlying process raises a `close` event', (_, done) => {
      const proc: ShellProcess = {
        process: spawnProcess,
        output: '',
        finished: true,
        command: 'echo "hi"',
      };
      shell.checkIfFinished(proc).then(() => done());
      spawnProcess.emit('close', 0);
    });
    it('should reject if underlying process raises an `error` event', (_, done) => {
      const proc: ShellProcess = {
        process: spawnProcess,
        output: '',
        finished: true,
        command: 'echo "hi"',
      };
      shell.checkIfFinished(proc).then(
        () => {
          assert.fail('checkIfFinished resolved unexpectedly');
        },
        (err) => {
          assert.ok(err.message.includes('boom'));
          done();
        },
      );
      spawnProcess.emit('error', new Error('boom'));
    });
  });

  describe('runCommandSync method', () => {
    it('should invoke `assembleShellEnv` and pass as child_process.spawnSync `env` parameter', () => {
      const fakeEnv = { HEY: 'yo' };
      const assembleSpy = sandbox.stub(shell, 'assembleShellEnv').returns(fakeEnv);
      const fakeCmd = 'echo';
      const fakeArgs = ['"hi there"'];
      shell.runCommandSync(fakeCmd, fakeArgs);
      sandbox.assert.calledOnce(assembleSpy);
      sandbox.assert.calledWithMatch(
        runSpy,
        sinon.match.string,
        sinon.match.array,
        sinon.match({ shell: false, env: fakeEnv }),
      );
    });
    it('should return the command outputs unchanged', () => {
      const fakeCmd = 'echo';
      const fakeArgs = ['"greetings"'];
      const sh = shell.spawnProcess(fakeCmd, fakeArgs);
      spawnProcess.stdout.emit('data', 'outputs\r\n');
      assert.strictEqual(sh.output, 'outputs\r\n');
    });
    it('should raise bubble error details up', () => {
      runSpy.throws(new Error('this is bat country'));
      assert.throws(() => {
        shell.runCommandSync('about to explode', []);
      }, /this is bat country/);
    });
    it('should spawn without a shell', () => {
      const fakeEnv = { HEY: 'yo' };
      sandbox.stub(shell, 'assembleShellEnv').returns(fakeEnv);
      const fakeCmd = 'echo';
      const fakeArgs = ['"hi there"'];
      shell.runCommandSync(fakeCmd, fakeArgs);
      sandbox.assert.calledWithMatch(
        runSpy,
        fakeCmd,
        sinon.match.array.contains(fakeArgs),
        sinon.match({ shell: false, env: fakeEnv }),
      );
    });
  });

  describe('spawnProcess method', () => {
    it('should invoke `assembleShellEnv` and pass as child_process.spawn `env` parameter', () => {
      const fakeEnv = { HEY: 'yo' };
      const assembleSpy = sandbox.stub(shell, 'assembleShellEnv').returns(fakeEnv);
      const fakeCmd = 'echo';
      const fakeArgs = ['"hi there"'];
      shell.spawnProcess(fakeCmd, fakeArgs);
      sandbox.assert.calledOnce(assembleSpy);
      sandbox.assert.calledWithMatch(
        spawnSpy,
        sinon.match.string,
        sinon.match.array,
        sinon.match({ shell: false, env: fakeEnv }),
      );
    });
    it('should return the command outputs unchanged', () => {
      const fakeCmd = 'echo';
      const fakeArgs = ['"greetings"'];
      const sh = shell.spawnProcess(fakeCmd, fakeArgs);
      spawnProcess.stdout.emit('data', 'outputs\r\n');
      spawnProcess.stderr.emit('data', 'warning\n');
      spawnProcess.stdout.emit('data', 'endings\r\n');
      assert.strictEqual(sh.output, 'outputs\r\nwarning\nendings\r\n');
    });
    it('should raise bubble error details up', () => {
      spawnSpy.throws(new Error('this is bat country'));
      assert.throws(() => {
        shell.spawnProcess('about to explode', []);
      }, /this is bat country/);
    });
    it('should spawn without a shell', () => {
      const fakeEnv = { HEY: 'yo' };
      sandbox.stub(shell, 'assembleShellEnv').returns(fakeEnv);
      const fakeCmd = 'echo';
      const fakeArgs = ['"hi there"'];
      shell.spawnProcess(fakeCmd, fakeArgs);
      sandbox.assert.calledWithMatch(
        spawnSpy,
        fakeCmd,
        sinon.match.array.contains(fakeArgs),
        sinon.match({ shell: false, env: fakeEnv }),
      );
    });
  });

  describe('waitForOutput method', () => {
    it('should use provided timeout parameter', (_, done) => {
      const proc: ShellProcess = {
        process: spawnProcess,
        output: '',
        finished: true,
        command: 'echo "hi"',
      };
      shell.waitForOutput('heyo', proc, { timeout: 500 }).then(
        () => {
          assert.fail('expected rejection, but got resolution');
        },
        (err) => {
          assert.ok(err.message.includes('timed out'));
          done();
        },
      );
    });
    it('should resolve if process includes expected output', async () => {
      const proc: ShellProcess = {
        process: spawnProcess,
        output: 'batman',
        finished: true,
        command: 'echo "hi"',
      };
      await shell.waitForOutput('bat', proc);
    });
  });
});
