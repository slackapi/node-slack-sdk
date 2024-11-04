import sinon from 'sinon';

import { mockProcess } from '../../utils/test';
import { shell } from '../shell';
import { create } from './create';

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
      sandbox.assert.calledWith(spawnSpy, sinon.match.string, sinon.match.array.contains(['create', 'myApp']));
    });
    it('should invoke `create <appPath> --template` if template specified', async () => {
      await create({ appPath: 'myApp', template: 'slack-samples/deno-hello-world' });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains(['create', 'myApp', '--template', 'slack-samples/deno-hello-world']),
      );
    });
    it('should invoke `create <appPath> --template --branch` if both template and branch specified', async () => {
      await create({ appPath: 'myApp', template: 'slack-samples/deno-hello-world', branch: 'feat-functions' });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match.string,
        sinon.match.array.contains([
          'create',
          'myApp',
          '--template',
          'slack-samples/deno-hello-world',
          '--branch',
          'feat-functions',
        ]),
      );
    });
  });
});
