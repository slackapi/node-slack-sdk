import { assert } from 'chai';
import sinon from 'sinon';

import { SlackCLIProcess } from './cli-process';
import { shell } from './shell';

describe('SlackCLIProcess class', () => {
  const sandbox = sinon.createSandbox();
  let spawnProcessSpy: sinon.SinonStub;

  beforeEach(() => {
    spawnProcessSpy = sandbox.stub(shell, 'spawnProcess');
    sandbox.stub(shell, 'checkIfFinished');
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('constructor', () => {
    it('should throw if `SLACK_CLI_PATH` env variable is falsy', () => {
      const orig = process.env.SLACK_CLI_PATH;
      delete process.env.SLACK_CLI_PATH;
      assert.throws(() => {
        new SlackCLIProcess('help');
      });
      process.env.SLACK_CLI_PATH = orig;
    });
  });

  describe('CLI flag handling', () => {
    describe('global options', () => {
      it('should map dev option to --slackdev', async () => {
        let cmd = new SlackCLIProcess('help', { dev: true });
        await cmd.execAsync();
        sandbox.assert.calledWithMatch(spawnProcessSpy, '--slackdev');
        spawnProcessSpy.resetHistory();
        cmd = new SlackCLIProcess('help');
        await cmd.execAsync();
        sandbox.assert.neverCalledWithMatch(spawnProcessSpy, '--slackdev');
        spawnProcessSpy.resetHistory();
      });
      it('should map qa option to QA host', async () => {
        let cmd = new SlackCLIProcess('help', { qa: true });
        await cmd.execAsync();
        sandbox.assert.calledWithMatch(spawnProcessSpy, '--apihost qa.slack.com');
        spawnProcessSpy.resetHistory();
        cmd = new SlackCLIProcess('help');
        await cmd.execAsync();
        sandbox.assert.neverCalledWithMatch(spawnProcessSpy, '--apihost qa.slack.com');
        spawnProcessSpy.resetHistory();
      });
      it('should default to passing --skip-update but allow overriding that', async () => {
        let cmd = new SlackCLIProcess('help');
        await cmd.execAsync();
        sandbox.assert.calledWithMatch(spawnProcessSpy, '--skip-update');
        spawnProcessSpy.resetHistory();
        cmd = new SlackCLIProcess('help', { skipUpdate: false });
        await cmd.execAsync();
        sandbox.assert.neverCalledWithMatch(spawnProcessSpy, '--skip-update');
        spawnProcessSpy.resetHistory();
        cmd = new SlackCLIProcess('help', { skipUpdate: true });
        await cmd.execAsync();
        sandbox.assert.calledWithMatch(spawnProcessSpy, '--skip-update');
        spawnProcessSpy.resetHistory();
        cmd = new SlackCLIProcess('help', {}); // empty global options; so undefined skipUpdate option
        await cmd.execAsync();
        sandbox.assert.calledWithMatch(spawnProcessSpy, '--skip-update');
      });
    });
    describe('command options', () => {
      it('should pass command-level key/value options to command in the form `--<key> value`', async () => {
        const cmd = new SlackCLIProcess('help', {}, { '--awesome': 'yes' });
        await cmd.execAsync();
        sandbox.assert.calledWithMatch(spawnProcessSpy, '--awesome yes');
      });
      it('should only pass command-level key option if value is true in the form `--key`', async () => {
        const cmd = new SlackCLIProcess('help', {}, { '--no-prompt': true });
        await cmd.execAsync();
        sandbox.assert.calledWithMatch(spawnProcessSpy, '--no-prompt');
      });
      it('should not pass command-level key option if value is falsy', async () => {
        let cmd = new SlackCLIProcess('help', {}, { '--no-prompt': false });
        await cmd.execAsync();
        sandbox.assert.neverCalledWithMatch(spawnProcessSpy, '--no-prompt');
        spawnProcessSpy.resetHistory();
        cmd = new SlackCLIProcess('help', {}, { '--no-prompt': '' });
        await cmd.execAsync();
        sandbox.assert.neverCalledWithMatch(spawnProcessSpy, '--no-prompt');
        spawnProcessSpy.resetHistory();
        cmd = new SlackCLIProcess('help', {}, { '--no-prompt': undefined });
        await cmd.execAsync();
        sandbox.assert.neverCalledWithMatch(spawnProcessSpy, '--no-prompt');
      });
    });
  });
});
