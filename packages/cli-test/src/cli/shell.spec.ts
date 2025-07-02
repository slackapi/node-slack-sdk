import child from 'node:child_process';

import { assert } from 'chai';
import sinon from 'sinon';

import type { ShellProcess } from '../types/shell';
import { mockProcess } from '../utils/test';
import { shell } from './shell';

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
      const fakeCmd = 'echo';
      const fakeArgs = ['"hi there"'];
      shell.runCommandSync(fakeCmd, fakeArgs);
      sandbox.assert.calledOnce(assembleSpy);
      sandbox.assert.calledWithMatch(
        runSpy,
        sinon.match.string,
        sinon.match.array,
        sinon.match({ shell: true, env: fakeEnv }),
      );
    });
    it('should return the command outputs unchanged', () => {
      const fakeCmd = 'echo';
      const fakeArgs = ['"greetings"'];
      const sh = shell.spawnProcess(fakeCmd, fakeArgs);
      spawnProcess.stdout.emit('data', 'outputs\r\n');
      assert.equal(sh.output, 'outputs\r\n');
    });
    it('should raise bubble error details up', () => {
      runSpy.throws(new Error('this is bat country'));
      assert.throw(() => {
        shell.runCommandSync('about to explode', []);
      }, /this is bat country/);
    });
    if (process.platform === 'win32') {
      it('on Windows, should wrap command to shell out in a `cmd /s /c` wrapper process', () => {
        const fakeEnv = { HEY: 'yo' };
        sandbox.stub(shell, 'assembleShellEnv').returns(fakeEnv);
        const fakeCmd = 'echo';
        const fakeArgs = ['"hi there"'];
        shell.runCommandSync(fakeCmd, fakeArgs);
        sandbox.assert.calledWithMatch(
          runSpy,
          'cmd',
          sinon.match.array.contains(['/s', '/c', fakeCmd, ...fakeArgs]),
          sinon.match({ shell: true, env: fakeEnv }),
        );
      });
    } else {
      it('on non-Windows, should shell out to provided command directly', () => {
        const fakeEnv = { HEY: 'yo' };
        sandbox.stub(shell, 'assembleShellEnv').returns(fakeEnv);
        const fakeCmd = 'echo';
        const fakeArgs = ['"hi there"'];
        shell.runCommandSync(fakeCmd, fakeArgs);
        sandbox.assert.calledWithMatch(
          runSpy,
          fakeCmd,
          sinon.match.array.contains(fakeArgs),
          sinon.match({ shell: true, env: fakeEnv }),
        );
      });
    }
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
        sinon.match({ shell: true, env: fakeEnv }),
      );
    });
    it('should return the command outputs unchanged', () => {
      const fakeCmd = 'echo';
      const fakeArgs = ['"greetings"'];
      const sh = shell.spawnProcess(fakeCmd, fakeArgs);
      spawnProcess.stdout.emit('data', 'outputs\r\n');
      spawnProcess.stderr.emit('data', 'warning\n');
      spawnProcess.stdout.emit('data', 'endings\r\n');
      assert.equal(sh.output, 'outputs\r\nwarning\nendings\r\n');
    });
    it('should raise bubble error details up', () => {
      spawnSpy.throws(new Error('this is bat country'));
      assert.throw(() => {
        shell.spawnProcess('about to explode', []);
      }, /this is bat country/);
    });
    if (process.platform === 'win32') {
      it('on Windows, should wrap command to shell out in a `cmd /s /c` wrapper process', () => {
        const fakeEnv = { HEY: 'yo' };
        sandbox.stub(shell, 'assembleShellEnv').returns(fakeEnv);
        const fakeCmd = 'echo';
        const fakeArgs = ['"hi there"'];
        shell.spawnProcess(fakeCmd, fakeArgs);
        sandbox.assert.calledWithMatch(
          spawnSpy,
          'cmd',
          sinon.match.array.contains(['/s', '/c', fakeCmd, ...fakeArgs]),
          sinon.match({ shell: true, env: fakeEnv }),
        );
      });
    } else {
      it('on non-Windows, should shell out to provided command directly', () => {
        const fakeEnv = { HEY: 'yo' };
        sandbox.stub(shell, 'assembleShellEnv').returns(fakeEnv);
        const fakeCmd = 'echo';
        const fakeArgs = ['"hi there"'];
        shell.spawnProcess(fakeCmd, fakeArgs);
        sandbox.assert.calledWithMatch(
          spawnSpy,
          fakeCmd,
          sinon.match.array.contains(fakeArgs),
          sinon.match({ shell: true, env: fakeEnv }),
        );
      });
    }
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
