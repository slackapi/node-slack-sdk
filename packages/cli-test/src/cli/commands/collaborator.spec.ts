import sinon from 'sinon';

import collaborator from './collaborator';
import { mockProcess } from '../../utils/test';
import { shell } from '../shell';

describe('collaborator commands', () => {
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
    it('should invoke `collaborators add <email>`', async () => {
      await collaborator.add({ appPath: '/some/path', collaboratorEmail: 'you@me.com' });
      sandbox.assert.calledWith(spawnSpy, sinon.match('collaborators add you@me.com'));
    });
  });
  describe('list method', () => {
    it('should invoke `collaborators list`', async () => {
      await collaborator.list({ appPath: '/some/path' });
      sandbox.assert.calledWith(spawnSpy, sinon.match('collaborators list'));
    });
  });
  describe('remove method', () => {
    it('should invoke `collaborators remove <email>`', async () => {
      await collaborator.remove({ appPath: '/some/path', collaboratorEmail: 'you@me.com' });
      sandbox.assert.calledWith(spawnSpy, sinon.match('collaborators remove you@me.com'));
    });
  });
});
