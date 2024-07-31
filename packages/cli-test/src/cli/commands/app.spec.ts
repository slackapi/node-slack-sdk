import sinon from 'sinon';

import app from './app';
import { mockProcess } from '../../utils/test';
import { shell } from '../shell';

describe('app commands', () => {
  const sandbox = sinon.createSandbox();
  let spawnSpy: sinon.SinonStub;

  beforeEach(() => {
    const process = mockProcess();
    spawnSpy = sandbox.stub(shell, 'spawnProcess').returns({
      command: 'something',
      finished: true,
      output: 'hi',
      process,
    });
    sandbox.stub(shell, 'checkIfFinished').resolves();
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('delete method', () => {
    it('should invoke `app delete` and default to deployed apps and force=true', async () => {
      await app.delete({ appPath: '/some/path' });
      sandbox.assert.calledWith(spawnSpy, sinon.match('--force'));
      sandbox.assert.calledWith(spawnSpy, sinon.match('--app deployed'));
      sandbox.assert.calledWith(spawnSpy, sinon.match('app delete'));
    });
    it('should invoke with `--app local` if app=local', async () => {
      await app.delete({ appPath: '/some/path', app: 'local' });
      sandbox.assert.calledWith(spawnSpy, sinon.match('--app local'));
    });
    it('should invoke with `--force` if force=true', async () => {
      await app.delete({ appPath: '/some/path', force: true });
      sandbox.assert.calledWith(spawnSpy, sinon.match('--force'));
    });
    it('should invoke without `--force` if force=false', async () => {
      await app.delete({ appPath: '/some/path', force: false });
      sandbox.assert.neverCalledWith(spawnSpy, sinon.match('--force'));
    });
  });
  describe('install method', () => {
    it('should invoke a CLI process with `app install`', async () => {
      await app.install({ appPath: '/some/path' });
      sandbox.assert.calledWith(spawnSpy, sinon.match('app install'));
    });
  });
  describe('list method', () => {
    it('should invoke a CLI process with `app list`', async () => {
      await app.list({ appPath: '/some/path' });
      sandbox.assert.calledWith(spawnSpy, sinon.match('app list'));
    });
  });
});
