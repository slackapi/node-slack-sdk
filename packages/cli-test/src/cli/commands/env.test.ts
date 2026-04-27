import { afterEach, beforeEach, describe, it } from 'node:test';

import sinon from 'sinon';

import { mockProcess } from '../../utils/test';
import { shell } from '../shell';
import env from './env';

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

  describe('set method', () => {
    it('should invoke `env set <key> <value>`', async () => {
      await env.set({ appPath: '/some/path', secretKey: 'key', secretValue: 'value' });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['env', 'set', 'key', 'value']),
      );
    });
  });
  describe('list method', () => {
    it('should invoke `env list`', async () => {
      await env.list({ appPath: '/some/path' });
      sandbox.assert.calledWith(spawnSpy, sinon.match.string, sinon.match.array.contains(['env', 'list']));
    });
  });
  describe('unset method', () => {
    it('should invoke `env unset <key>`', async () => {
      await env.unset({ appPath: '/some/path', secretKey: 'key' });
      sandbox.assert.calledWith(spawnSpy, sinon.match.string, sinon.match.array.contains(['env', 'unset', 'key']));
    });
  });
});
