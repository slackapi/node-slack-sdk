import assert from 'assert';

import sinon from 'sinon';

import platform from './platform';
import { ShellProcess } from '../../types/shell';
import { mockProcess } from '../../utils/test';
import { shell } from '../shell';

describe('platform commands', () => {
  const sandbox = sinon.createSandbox();
  let spawnSpy: sinon.SinonStub;
  let waitForOutputSpy: sinon.SinonStub;
  let fakeProcess: ShellProcess;

  beforeEach(() => {
    fakeProcess = {
      command: 'something',
      finished: true,
      output: 'hi',
      process: mockProcess(),
    };
    spawnSpy = sandbox.stub(shell, 'spawnProcess').returns(fakeProcess);
    sandbox.stub(shell, 'checkIfFinished').resolves();
    waitForOutputSpy = sandbox.stub(shell, 'waitForOutput').resolves();
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('activity method', () => {
    it('should invoke `activity`', async () => {
      await platform.activity({ appPath: '/some/path' });
      sandbox.assert.calledWith(spawnSpy, sinon.match('activity'));
    });
    it('should invoke `activity` with specified `source`', async () => {
      await platform.activity({ appPath: '/some/path', source: 'slack' });
      sandbox.assert.calledWith(spawnSpy, sinon.match('activity'));
      sandbox.assert.calledWith(spawnSpy, sinon.match('--source slack'));
    });
  });
  describe('activityTailStart method', () => {
    it('should invoke `activity --tail`', async () => {
      await platform.activityTailStart({ appPath: '/some/path', stringToWaitFor: 'poop' });
      sandbox.assert.calledWith(spawnSpy, sinon.match('activity'));
      sandbox.assert.calledWith(spawnSpy, sinon.match('--tail'));
    });
  });
  describe('activityTailStop method', () => {
    it('should reject if waitForOutput rejects', async () => {
      waitForOutputSpy.rejects();
      await assert.rejects(platform.activityTailStop({ stringToWaitFor: 'poop', proc: fakeProcess }));
    });
    it('should reject if shell.kill rejects', async () => {
      sandbox.stub(shell, 'kill').rejects();
      await assert.rejects(platform.activityTailStop({ stringToWaitFor: 'poop', proc: fakeProcess }));
    });
    it('should resolve if waitForOutput and shell.kill resolve', async () => {
      sandbox.stub(shell, 'kill').resolves();
      await platform.activityTailStop({ stringToWaitFor: 'poop', proc: fakeProcess });
      assert.ok(true);
    });
  });
  describe('deploy method', () => {
    it('should invoke `deploy` with --hide-triggers by default', async () => {
      await platform.deploy({ appPath: '/some/path' });
      sandbox.assert.calledWith(spawnSpy, sinon.match('deploy'));
      sandbox.assert.calledWith(spawnSpy, sinon.match('--hide-triggers'));
    });
    it('should invoke `deploy` without --hide-triggers if hideTriggers=false', async () => {
      await platform.deploy({ appPath: '/some/path', hideTriggers: false });
      sandbox.assert.calledWith(spawnSpy, sinon.match('deploy'));
      sandbox.assert.neverCalledWith(spawnSpy, sinon.match('--hide-triggers'));
    });
  });
  describe('runStart method', () => {
    it('should invoke `run` with --cleanup and --hide-triggers by default', async () => {
      await platform.runStart({ appPath: '/some/path' });
      sandbox.assert.calledWith(spawnSpy, sinon.match('run'));
      sandbox.assert.calledWith(spawnSpy, sinon.match('--cleanup'));
      sandbox.assert.calledWith(spawnSpy, sinon.match('--hide-triggers'));
    });
    it('should invoke `run` without --hide-triggers if hideTriggers=false', async () => {
      await platform.runStart({ appPath: '/some/path', hideTriggers: false });
      sandbox.assert.calledWith(spawnSpy, sinon.match('run'));
      sandbox.assert.neverCalledWith(spawnSpy, sinon.match('--hide-triggers'));
    });
    it('should invoke `run` without --cleanup if cleanup=false', async () => {
      await platform.runStart({ appPath: '/some/path', cleanup: false });
      sandbox.assert.calledWith(spawnSpy, sinon.match('run'));
      sandbox.assert.neverCalledWith(spawnSpy, sinon.match('--cleanup'));
    });
  });
  describe('runStop method', () => {
    it('should reject if shell.kill rejects', async () => {
      sandbox.stub(shell, 'kill').rejects();
      await assert.rejects(platform.runStop({ proc: fakeProcess }));
    });
    it('should reject if waitForShutdown=true and waitForOutput rejects', async () => {
      sandbox.stub(shell, 'kill').resolves();
      waitForOutputSpy.rejects();
      await assert.rejects(platform.runStop({ proc: fakeProcess, waitForShutdown: true }));
    });
    it('should resolve immediately if waitForShutdown=false and shell.kill resolve', async () => {
      sandbox.stub(shell, 'kill').resolves();
      await platform.runStop({ proc: fakeProcess, waitForShutdown: false });
      assert.ok(true);
    });
    it('should resolve if waitForShutdown=true and both shell.kill and shell.waitForOutput resolve', async () => {
      sandbox.stub(shell, 'kill').resolves();
      await platform.runStop({ proc: fakeProcess, waitForShutdown: true });
      assert.ok(true);
    });
  });
});
