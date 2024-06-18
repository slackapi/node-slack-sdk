import sinon from 'sinon';

import { SlackCLI } from './index';
import logger from '../utils/logger';

describe('cli module', () => {
  const sandbox = sinon.createSandbox();
  let logoutSpy: sinon.SinonStub;
  let warnSpy: sinon.SinonStub;
  let deleteSpy: sinon.SinonStub;

  beforeEach(() => {
    logoutSpy = sandbox.stub(SlackCLI, 'logout').resolves();
    warnSpy = sandbox.stub(logger, 'warn');
    sandbox.stub(SlackCLI.app, 'list').resolves('This thing has so many apps you would not believe');
    deleteSpy = sandbox.stub(SlackCLI.app, 'delete').resolves();
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('stopSession method', () => {
    it('should invoke logout', async () => {
      await SlackCLI.stopSession({ appTeamID: 'T123' });
      sandbox.assert.called(logoutSpy);
    });
    it('should warn if logout failed', async () => {
      logoutSpy.rejects('boomsies');
      await SlackCLI.stopSession({ appTeamID: 'T123' });
      sandbox.assert.calledWithMatch(warnSpy, 'boomsies');
    });
    it('should attempt to delete app if appPath is provided', async () => {
      await SlackCLI.stopSession({ appTeamID: 'T123', appPath: '/some/path' });
      sandbox.assert.called(deleteSpy);
    });
    it('should warn if app deletion fails', async () => {
      deleteSpy.rejects('explosions');
      await SlackCLI.stopSession({ appTeamID: 'T123', appPath: '/some/path' });
      sandbox.assert.calledWithMatch(warnSpy, 'explosions');
    });
  });
});
