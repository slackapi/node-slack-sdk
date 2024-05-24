import { assert } from 'chai';
import sinon from 'sinon';
import child from 'child_process';
import stream from 'stream';
import EventEmitter from 'events';
import { shell } from './shell';

describe('shell module', () => {
  const sandbox = sinon.createSandbox();
  let spawnSpy: sinon.SinonStub;
  let spawnProcess: child.ChildProcess;
  let runSpy: sinon.SinonStub;
  let runOutput: child.SpawnSyncReturns<Buffer>;

  beforeEach(() => {
    spawnProcess = new EventEmitter() as child.ChildProcess;
    spawnProcess.stdout = new EventEmitter() as stream.Readable;
    spawnProcess.stderr = new EventEmitter() as stream.Readable;
    spawnSpy = sandbox.stub(child, 'spawn').returns(spawnProcess);
    runOutput = { pid: 1337, output: [], stdout: Buffer.from([]), stderr: Buffer.from([]), status: 0, signal: null };
    runSpy = sandbox.stub(child, 'spawnSync').returns(runOutput);
  });
  afterEach(() => {
    sandbox.restore();
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
});
