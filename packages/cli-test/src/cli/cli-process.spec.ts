import { assert } from 'chai';
import sinon from 'sinon';
import { shell } from './shell';
import { SlackCLIProcess } from './cli-process';

describe('SlackCLIProcess class', () => {
  const sandbox = sinon.createSandbox();
  let runAsyncSpy: sinon.SinonStub;

  beforeEach(() => {
    runAsyncSpy = sandbox.stub(shell, 'runCommandAsync');
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
      it('should map qa or dev options to --slackdev', async () => {
        let cmd = new SlackCLIProcess('help', { qa: true });
        await cmd.execAsync();
        sandbox.assert.calledWithMatch(runAsyncSpy, '--slackdev');
        runAsyncSpy.resetHistory();
        cmd = new SlackCLIProcess('help');
        await cmd.execAsync();
        sandbox.assert.neverCalledWithMatch(runAsyncSpy, '--slackdev');
        runAsyncSpy.resetHistory();
        cmd = new SlackCLIProcess('help', { dev: true });
        await cmd.execAsync();
        sandbox.assert.calledWithMatch(runAsyncSpy, '--slackdev');
      });
      it('should default to passing --skip-update but allow overriding that', async () => {
        let cmd = new SlackCLIProcess('help');
        await cmd.execAsync();
        sandbox.assert.calledWithMatch(runAsyncSpy, '--skip-update');
        runAsyncSpy.resetHistory();
        cmd = new SlackCLIProcess('help', { skipUpdate: false });
        await cmd.execAsync();
        sandbox.assert.neverCalledWithMatch(runAsyncSpy, '--skip-update');
        runAsyncSpy.resetHistory();
        cmd = new SlackCLIProcess('help', { skipUpdate: true });
        await cmd.execAsync();
        sandbox.assert.calledWithMatch(runAsyncSpy, '--skip-update');
      });
    });
    describe('command options', () => {
      it('should pass command-level key/value options to command in the form `--<key> value`', async () => {
        const cmd = new SlackCLIProcess('help', {}, { '--awesome': 'yes' });
        await cmd.execAsync();
        sandbox.assert.calledWithMatch(runAsyncSpy, '--awesome yes');
      });
      it('should only pass command-level key option if value is null in the form `--key`', async () => {
        const cmd = new SlackCLIProcess('help', {}, { '--no-prompt': null });
        await cmd.execAsync();
        sandbox.assert.calledWithMatch(runAsyncSpy, '--no-prompt');
      });
    });
  });
});
