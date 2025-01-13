import sinon from 'sinon';

import { mockProcess } from '../../utils/test';
import { shell } from '../shell';
import func from './function';

describe('function commands', () => {
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

  describe('access method', () => {
    it('should invoke `function access --info` if info=true', async () => {
      await func.access({ appPath: '/some/path', info: true });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['function', 'access', '--info']),
      );
    });
    it('should invoke `function access --name --app-collaborators` if `name` and `appCollaborators` specified', async () => {
      await func.access({ appPath: '/some/path', name: 'best', appCollaborators: true });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['function', 'access', '--name', 'best', '--app-collaborators']),
      );
    });
    it('should invoke `function access --name --everyone` if `name` and `everyone` specified', async () => {
      await func.access({ appPath: '/some/path', name: 'best', everyone: true });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['function', 'access', '--name', 'best', '--everyone']),
      );
    });
    it('should invoke `function access --name --grant --users` if `name`, `grant` and `users` specified', async () => {
      await func.access({ appPath: '/some/path', name: 'best', grant: true, users: ['U1234'] });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['function', 'access', '--name', 'best', '--grant', '--users', 'U1234']),
      );
    });
    it('should invoke `function access --name --revoke --users` if `name`, `revoke` and `users` specified', async () => {
      await func.access({ appPath: '/some/path', name: 'best', revoke: true, users: ['U1234'] });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['function', 'access', '--name', 'best', '--revoke', '--users', 'U1234']),
      );
    });
  });
});
