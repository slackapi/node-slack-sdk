import sinon from 'sinon';

import { mockProcess } from '../../utils/test';
import { shell } from '../shell';
import manifest from './manifest';

describe('manifest commands', () => {
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

  describe('info method', () => {
    it('should invoke `manifest info` and default `--source project`', async () => {
      await manifest.info({ appPath: '/some/path' });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['manifest', 'info', '--source', 'project']),
      );
    });
    it('should invoke `manifest info --source remote` source=remote specified', async () => {
      await manifest.info({ appPath: '/some/path', source: 'remote' });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['manifest', 'info', '--source', 'remote']),
      );
    });
  });
  describe('validate method', () => {
    it('should invoke `manifest validate`', async () => {
      await manifest.validate({ appPath: '/some/path' });
      sandbox.assert.calledWith(spawnSpy, sinon.match.string, sinon.match.array.contains(['manifest', 'validate']));
    });
  });
});
