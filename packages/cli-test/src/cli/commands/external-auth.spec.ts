import sinon from 'sinon';

import { mockProcess } from '../../utils/test';
import { shell } from '../shell';
import extAuth from './external-auth';

describe('external-auth commands', () => {
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
    it('should invoke `external-auth add --provider`', async () => {
      await extAuth.add({ appPath: '/some/path', provider: 'bigcorp' });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['external-auth', 'add', '--provider', 'bigcorp']),
      );
    });
  });
  describe('addSecret method', () => {
    it('should invoke `external-auth add-secret --provider --secret`', async () => {
      await extAuth.addSecret({ appPath: '/some/path', provider: 'bigcorp', secret: 'shh' });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['external-auth', 'add-secret', '--provider', 'bigcorp', '--secret', 'shh']),
      );
    });
  });
  describe('remove method', () => {
    it('should invoke `external-auth remove --provider`', async () => {
      await extAuth.remove({ appPath: '/some/path', provider: 'bigcorp' });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['external-auth', 'remove', '--provider', 'bigcorp']),
      );
    });
    it('should invoke `external-auth remove --provider --all` if `all: true` specified', async () => {
      await extAuth.remove({ appPath: '/some/path', provider: 'bigcorp', all: true });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['external-auth', 'remove', '--provider', 'bigcorp', '--all']),
      );
    });
  });
  describe('select-auth method', () => {
    it('should invoke `external-auth select-auth --provider`', async () => {
      await extAuth.selectAuth({ appPath: '/some/path', provider: 'bigcorp' });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['external-auth', 'select-auth', '--provider', 'bigcorp']),
      );
    });
    it('should invoke `external-auth select-auth --provider --external-account` if `externalAccount` specified', async () => {
      await extAuth.selectAuth({ appPath: '/some/path', provider: 'bigcorp', externalAccount: 'me@me.com' });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains([
          'external-auth',
          'select-auth',
          '--provider',
          'bigcorp',
          '--external-account',
          'me@me.com',
        ]),
      );
    });
    it('should invoke `external-auth select-auth --provider --workflow` if `workflow` specified', async () => {
      await extAuth.selectAuth({ appPath: '/some/path', provider: 'bigcorp', workflow: '#/workflow/1234' });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains([
          'external-auth',
          'select-auth',
          '--provider',
          'bigcorp',
          '--workflow',
          '#/workflow/1234',
        ]),
      );
    });
  });
});
