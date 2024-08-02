import sinon from 'sinon';

import env from './env';
import { mockProcess } from '../../utils/test';
import { shell } from '../shell';

describe('env commands', () => {
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

  describe('add method', () => {
    it('should invoke `env add <key> <value>`', async () => {
      await env.add({ appPath: '/some/path', secretKey: 'key', secretValue: 'value' });
      sandbox.assert.calledWith(spawnSpy, sinon.match('env add key value'));
    });
  });
  describe('list method', () => {
    it('should invoke `env list`', async () => {
      await env.list({ appPath: '/some/path' });
      sandbox.assert.calledWith(spawnSpy, sinon.match('env list'));
    });
  });
  describe('remove method', () => {
    it('should invoke `env remove <key>`', async () => {
      await env.remove({ appPath: '/some/path', secretKey: 'key' });
      sandbox.assert.calledWith(spawnSpy, sinon.match('env remove key'));
    });
  });
});
