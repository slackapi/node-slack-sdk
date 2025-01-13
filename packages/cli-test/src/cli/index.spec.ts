import sinon from 'sinon';

import logger from '../utils/logger';
import { SlackCLI } from './index';

describe('cli module', () => {
  const sandbox = sinon.createSandbox();
  let logoutSpy: sinon.SinonStub;
  let warnSpy: sinon.SinonStub;
  let deleteSpy: sinon.SinonStub;

  beforeEach(() => {
    logoutSpy = sandbox.stub(SlackCLI.auth, 'logout').resolves();
    warnSpy = sandbox.stub(logger, 'warn');
    sandbox.stub(SlackCLI.app, 'list').resolves('This thing has so many apps you would not believe');
    deleteSpy = sandbox.stub(SlackCLI.app, 'delete').resolves();
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('stopSession method', () => {
    it('should invoke logout if `shouldLogOut` is truthy', async () => {
      await SlackCLI.stopSession({ team: 'T123', shouldLogOut: true });
      sandbox.assert.called(logoutSpy);
    });
    it('should warn if logout failed', async () => {
      logoutSpy.rejects('boomsies');
      await SlackCLI.stopSession({ team: 'T123', shouldLogOut: true });
      sandbox.assert.calledWithMatch(warnSpy, 'boomsies');
    });
    it('should attempt to delete app if appPath is provided', async () => {
      await SlackCLI.stopSession({ team: 'T123', appPath: '/some/path' });
      sandbox.assert.called(deleteSpy);
    });
    it('should warn if app deletion fails', async () => {
      deleteSpy.rejects('explosions');
      await SlackCLI.stopSession({ team: 'T123', appPath: '/some/path' });
      sandbox.assert.calledWithMatch(warnSpy, 'explosions');
    });
  });
});
