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
      process.env.SLACK_CLI_PATH = '';
      assert.throws(() => {
        new SlackCLIProcess(['help']);
      });
      process.env.SLACK_CLI_PATH = orig;
    });
  });

  describe('CLI flag handling', () => {
    describe('global options', () => {
      it('should map dev option to --slackdev', async () => {
        let cmd = new SlackCLIProcess(['help'], { dev: true });
        await cmd.execAsync();
        sandbox.assert.calledWith(spawnProcessSpy, sinon.match.string, sinon.match.array.contains(['--slackdev']));
        spawnProcessSpy.resetHistory();
        cmd = new SlackCLIProcess(['help']);
        await cmd.execAsync();
        sandbox.assert.neverCalledWith(spawnProcessSpy, sinon.match.string, sinon.match.array.contains(['--slackdev']));
        spawnProcessSpy.resetHistory();
      });
      it('should map qa option to QA host', async () => {
        let cmd = new SlackCLIProcess(['help'], { qa: true });
        await cmd.execAsync();
        sandbox.assert.calledWith(
          spawnProcessSpy,
          sinon.match.string,
          sinon.match.array.contains(['--apihost', 'qa.slack.com']),
        );
        spawnProcessSpy.resetHistory();
        cmd = new SlackCLIProcess(['help']);
        await cmd.execAsync();
        sandbox.assert.neverCalledWith(
          spawnProcessSpy,
          sinon.match.string,
          sinon.match.array.contains(['--apihost', 'qa.slack.com']),
        );
        spawnProcessSpy.resetHistory();
      });
      it('should map apihost option to provided host', async () => {
        let cmd = new SlackCLIProcess(['help'], { apihost: 'dev123.slack.com' });
        await cmd.execAsync();
        sandbox.assert.calledWith(
          spawnProcessSpy,
          sinon.match.string,
          sinon.match.array.contains(['--apihost', 'dev123.slack.com']),
        );
        spawnProcessSpy.resetHistory();
        cmd = new SlackCLIProcess(['help']);
        await cmd.execAsync();
        sandbox.assert.neverCalledWith(
          spawnProcessSpy,
          sinon.match.string,
          sinon.match.array.contains(['--apihost', 'dev123.slack.com']),
        );
        spawnProcessSpy.resetHistory();
      });
      it('should default to passing --skip-update but allow overriding that', async () => {
        let cmd = new SlackCLIProcess(['help']);
        await cmd.execAsync();
        sandbox.assert.calledWith(spawnProcessSpy, sinon.match.string, sinon.match.array.contains(['--skip-update']));
        spawnProcessSpy.resetHistory();
        cmd = new SlackCLIProcess(['help'], { skipUpdate: false });
        await cmd.execAsync();
        sandbox.assert.neverCalledWith(
          spawnProcessSpy,
          sinon.match.string,
          sinon.match.array.contains(['--skip-update']),
        );
        spawnProcessSpy.resetHistory();
        cmd = new SlackCLIProcess(['help'], { skipUpdate: true });
        await cmd.execAsync();
        sandbox.assert.calledWith(spawnProcessSpy, sinon.match.string, sinon.match.array.contains(['--skip-update']));
        spawnProcessSpy.resetHistory();
        cmd = new SlackCLIProcess(['help'], {}); // empty global options; so undefined skipUpdate option
        await cmd.execAsync();
        sandbox.assert.calledWith(spawnProcessSpy, sinon.match.string, sinon.match.array.contains(['--skip-update']));
      });
      it('should default to `--app deployed` but allow overriding that via the `app` parameter', async () => {
        let cmd = new SlackCLIProcess(['help']);
        await cmd.execAsync();
        sandbox.assert.calledWith(
          spawnProcessSpy,
          sinon.match.string,
          sinon.match.array.contains(['--app', 'deployed']),
        );
        spawnProcessSpy.resetHistory();
        cmd = new SlackCLIProcess(['help'], { app: 'local' });
        await cmd.execAsync();
        sandbox.assert.calledWith(spawnProcessSpy, sinon.match.string, sinon.match.array.contains(['--app', 'local']));
      });
      it('should default to `--force` but allow overriding that via the `force` parameter', async () => {
        let cmd = new SlackCLIProcess(['help']);
        await cmd.execAsync();
        sandbox.assert.calledWith(spawnProcessSpy, sinon.match.string, sinon.match.array.contains(['--force']));
        spawnProcessSpy.resetHistory();
        cmd = new SlackCLIProcess(['help'], { force: true });
        await cmd.execAsync();
        sandbox.assert.calledWithMatch(spawnProcessSpy, sinon.match.string, sinon.match.array.contains(['--force']));
        spawnProcessSpy.resetHistory();
        cmd = new SlackCLIProcess(['help'], { force: false });
        await cmd.execAsync();
        sandbox.assert.neverCalledWith(spawnProcessSpy, sinon.match.string, sinon.match.array.contains(['--force']));
      });
      it('should map token option to `--token`', async () => {
        let cmd = new SlackCLIProcess(['help'], { token: 'xoxb-1234' });
        await cmd.execAsync();
        sandbox.assert.calledWith(
          spawnProcessSpy,
          sinon.match.string,
          sinon.match.array.contains(['--token', 'xoxb-1234']),
        );
        spawnProcessSpy.resetHistory();
        cmd = new SlackCLIProcess(['help']);
        await cmd.execAsync();
        sandbox.assert.neverCalledWith(
          spawnProcessSpy,
          sinon.match.string,
          sinon.match.array.contains(['--token', 'xoxb-1234']),
        );
        spawnProcessSpy.resetHistory();
      });
      it('should map verbose option to `--verbose`', async () => {
        let cmd = new SlackCLIProcess(['help'], { verbose: true });
        await cmd.execAsync();
        sandbox.assert.calledWith(spawnProcessSpy, sinon.match.string, sinon.match.array.contains(['--verbose']));
        spawnProcessSpy.resetHistory();
        cmd = new SlackCLIProcess(['help']);
        await cmd.execAsync();
        sandbox.assert.neverCalledWith(spawnProcessSpy, sinon.match.string, sinon.match.array.contains(['--verbose']));
      });
    });
    describe('command options', () => {
      it('should pass command-level key/value options to command in the form `--<key> value`', async () => {
        const cmd = new SlackCLIProcess(['help'], {}, { '--awesome': 'yes' });
        await cmd.execAsync();
        sandbox.assert.calledWith(
          spawnProcessSpy,
          sinon.match.string,
          sinon.match.array.contains(['--awesome', 'yes']),
        );
      });
      it('should only pass command-level key option if value is true in the form `--key`', async () => {
        const cmd = new SlackCLIProcess(['help'], {}, { '--no-prompt': true });
        await cmd.execAsync();
        sandbox.assert.calledWith(spawnProcessSpy, sinon.match.string, sinon.match.array.contains(['--no-prompt']));
      });
      it('should not pass command-level key option if value is falsy', async () => {
        let cmd = new SlackCLIProcess(['help'], {}, { '--no-prompt': false });
        await cmd.execAsync();
        sandbox.assert.neverCalledWith(
          spawnProcessSpy,
          sinon.match.string,
          sinon.match.array.contains(['--no-prompt']),
        );
        spawnProcessSpy.resetHistory();
        cmd = new SlackCLIProcess(['help'], {}, { '--no-prompt': '' });
        await cmd.execAsync();
        sandbox.assert.neverCalledWith(
          spawnProcessSpy,
          sinon.match.string,
          sinon.match.array.contains(['--no-prompt']),
        );
        spawnProcessSpy.resetHistory();
        cmd = new SlackCLIProcess(['help'], {}, { '--no-prompt': undefined });
        await cmd.execAsync();
        sandbox.assert.neverCalledWith(
          spawnProcessSpy,
          sinon.match.string,
          sinon.match.array.contains(['--no-prompt']),
        );
      });
    });
  });
});
