import sinon from 'sinon';

import { mockProcess } from '../../utils/test';
import { shell } from '../shell';
import version from './version';

describe('version commands', () => {
  const sandbox = sinon.createSandbox();
  let spawnSpy: sinon.SinonStub;

  beforeEach(() => {
    const process = mockProcess();
    spawnSpy = sandbox.stub(shell, 'spawnProcess').returns({
      command: 'version',
      finished: true,
      output: 'Using slack v3.4.5',
      process,
    });
    sandbox.stub(shell, 'checkIfFinished').resolves();
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('version method', () => {
    it('should invoke `version`', async () => {
      const actual = await version.version();
      sandbox.assert.calledWith(spawnSpy, sinon.match.string, sinon.match.array.contains(['version']));
      sinon.assert.match(actual, 'v3.4.5');
    });
  });
});
