import sinon from 'sinon';

import { create } from './create';
import { mockProcess } from '../../utils/test';
import { shell } from '../shell';

describe('create', () => {
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

  describe('method', () => {
    it('should invoke `create <appPath>`', async () => {
      await create({ appPath: 'myApp' });
      sandbox.assert.calledWith(spawnSpy, sinon.match('create myApp'));
    });
  });
});
