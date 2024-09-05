import child from 'node:child_process';

import { assert } from 'chai';
import sinon from 'sinon';

import { mockProcess } from '../utils/test';
import { shell } from './shell';

import type { ShellProcess } from '../types/shell';

describe('shell module', () => {
  const sandbox = sinon.createSandbox();
  let spawnSpy: sinon.SinonStub;
  let spawnProcess: child.ChildProcessWithoutNullStreams;
  let runSpy: sinon.SinonStub;
  let runOutput: child.SpawnSyncReturns<Buffer>;

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
    it('should resolve if underlying process raises a `close` event', (done) => {
      const proc: ShellProcess = {
        process: spawnProcess,
        output: '',
        finished: true,
        command: 'echo "hi"',
      };
      shell.checkIfFinished(proc).then(done);
      spawnProcess.emit('close', 0);
    });
    it('should reject if underlying process raises an `error` event', (done) => {
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
          assert.include(err.message, 'boom');
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
      const fakeCmd = 'echo "hi"';
      shell.runCommandSync(fakeCmd);
      sandbox.assert.calledOnce(assembleSpy);
      sandbox.assert.calledWithMatch(runSpy, fakeCmd, sinon.match({ shell: true, env: fakeEnv }));
    });
    it('should raise bubble error details up', () => {
      runSpy.throws(new Error('this is bat country'));
      assert.throw(() => {
        shell.runCommandSync('about to explode');
      }, /this is bat country/);
    });
  });

  describe('spawnProcess method', () => {
    it('should invoke `assembleShellEnv` and pass as child_process.spawn `env` parameter', () => {
      const fakeEnv = { HEY: 'yo' };
      const assembleSpy = sandbox.stub(shell, 'assembleShellEnv').returns(fakeEnv);
      const fakeCmd = 'echo "hi"';
      shell.spawnProcess(fakeCmd);
      sandbox.assert.calledOnce(assembleSpy);
      sandbox.assert.calledWithMatch(spawnSpy, fakeCmd, sinon.match({ shell: true, env: fakeEnv }));
    });
    it('should raise bubble error details up', () => {
      spawnSpy.throws(new Error('this is bat country'));
      assert.throw(() => {
        shell.spawnProcess('about to explode');
      }, /this is bat country/);
    });
  });

  describe('waitForOutput method', () => {
    it('should use provided timeout parameter', (done) => {
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
          assert.include(err.message, 'timed out');
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
