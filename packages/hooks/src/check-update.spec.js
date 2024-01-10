import { after, before, describe, it } from 'mocha';
import assert from 'assert';
import childProcess from 'child_process';
import fs from 'fs';
import path from 'path';
import util from 'util';

// Gather certain functions to test specifics without logging.
//
// eslint-disable-next-line import/extensions
import { hasAvailableUpdates, hasBreakingChange, createUpdateErrorMessage } from './check-update.js';

// eslint-disable-next-line no-console
console.log = function () { };

const exec = util.promisify(childProcess.exec);

/**
 * Mock dependency information for packages of the project.
 */
const packageJSON = {
  name: 'Example application',
  dependencies: {
    '@slack/bolt': '^3.0.0',
    '@slack/deno-slack-sdk': '^2.0.0',
  },
  devDependencies: {
    '@slack/hooks': '^0.0.1',
  },
};

/**
 * Example package information provided as a mocked npm command.
 */
const mockNPM = `\
#!/usr/bin/env node
const args = process.argv.slice(2).join(' ');
if (args === 'info @slack/bolt version --tag latest') {
    console.log('3.1.4');
} else if (args === 'info @slack/deno-slack-sdk version --tag latest') {
    console.log('2.0.0');
} else if (args === 'info @slack/hooks version --tag latest') {
    console.log('1.0.1');
}
if (args === 'list @slack/bolt --depth=0 --json') {
    console.log('{"dependencies":{"@slack/bolt":{"version":"3.0.0"}}}');
} else if (args === 'list @slack/deno-slack-sdk --depth=0 --json') {
    console.log('{"dependencies":{"@slack/deno-slack-sdk":{"version":"2.0.0"}}}');
} else if (args === 'list @slack/hooks --depth=0 --json') {
    console.log('{"dependencies":{"@slack/hooks":{"version":"0.0.1"}}}');
}
`;

describe('check-update implementation', async () => {
  describe('collects recent package versions', async () => {
    before(() => {
      const tempDir = path.join(process.cwd(), 'tmp');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }
      const packageJSONFilePath = path.join(tempDir, 'package.json');
      fs.writeFileSync(packageJSONFilePath, JSON.stringify(packageJSON, null, 2));
      const npmFilePath = path.join(tempDir, 'npm');
      fs.writeFileSync(npmFilePath, mockNPM);
      fs.chmodSync(npmFilePath, 0o755);
    });

    after(() => {
      const tempDir = path.join(process.cwd(), 'tmp');
      const filePath = path.join(tempDir, 'npm');
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true });
      }
    });

    it('shows version information for packages', async () => {
      const env = { ...process.env };
      env.PATH = `./:${env.PATH}`;
      const { stdout } = await exec('../src/check-update.js', { cwd: './tmp', env });
      const updates = JSON.parse(stdout);
      const expected = {
        name: 'the Slack SDK',
        message: '',
        releases: [
          {
            name: '@slack/bolt',
            current: '3.0.0',
            latest: '3.1.4',
            update: true,
            breaking: false,
            url: 'https://github.com/slackapi/bolt-js/releases/tag/@slack/bolt@3.1.4',
          },
          {
            name: '@slack/deno-slack-sdk',
            current: '2.0.0',
            latest: '2.0.0',
            update: false,
            breaking: false,
          },
          {
            name: '@slack/hooks',
            current: '0.0.1',
            latest: '1.0.1',
            update: true,
            breaking: true,
            url: 'https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/hooks@1.0.1',
          },
        ],
        url: 'https://api.slack.com/automation/changelog',
      };
      assert.deepEqual(updates, expected);
    });
  });

  describe('determines the type of update', async () => {
    it('should return if updates are available', () => {
      assert(hasAvailableUpdates('0.0.1', '0.0.2'));
      assert(hasAvailableUpdates('0.0.1', '0.2.0'));
      assert(hasAvailableUpdates('0.0.1', '2.0.0'));
      assert(hasAvailableUpdates('0.1.0', '0.1.1'));
      assert(hasAvailableUpdates('0.1.0', '0.2.0'));
      assert(hasAvailableUpdates('0.1.0', '2.0.0'));
      assert(hasAvailableUpdates('1.0.0', '1.0.1'));
      assert(hasAvailableUpdates('1.0.0', '1.1.0'));
      assert(hasAvailableUpdates('1.0.0', '1.1.1'));
      assert(hasAvailableUpdates('1.0.0', '2.0.0'));
      assert(hasAvailableUpdates('0.0.2', '0.0.13'));
      assert(!hasAvailableUpdates('0.0.1', '0.0.1'));
      assert(!hasAvailableUpdates('0.1.0', '0.1.0'));
      assert(!hasAvailableUpdates('0.1.1', '0.1.1'));
      assert(!hasAvailableUpdates('1.0.0', '1.0.0'));
      assert(!hasAvailableUpdates('1.0.1', '1.0.1'));
      assert(!hasAvailableUpdates('1.1.1', '1.1.1'));
      assert(!hasAvailableUpdates(undefined, undefined));
      assert(!hasAvailableUpdates('1.0.0', undefined));
      assert(!hasAvailableUpdates('2.0.0', '1.0.0'));
      assert(!hasAvailableUpdates('2.0.0', '0.1.0'));
      assert(!hasAvailableUpdates('2.0.0', '0.3.0'));
      assert(!hasAvailableUpdates('2.0.0', '0.0.1'));
      assert(!hasAvailableUpdates('2.0.0', '0.0.3'));
      assert(!hasAvailableUpdates('2.0.0', '1.1.0'));
      assert(!hasAvailableUpdates('2.0.0', '1.3.0'));
      assert(!hasAvailableUpdates('2.0.0', '1.1.1'));
      assert(!hasAvailableUpdates('2.0.0', '1.3.3'));
      assert(!hasAvailableUpdates('0.2.0', '0.1.0'));
      assert(!hasAvailableUpdates('0.2.0', '0.0.1'));
      assert(!hasAvailableUpdates('0.2.0', '0.0.3'));
      assert(!hasAvailableUpdates('0.2.0', '0.1.1'));
      assert(!hasAvailableUpdates('0.2.0', '0.1.3'));
      assert(!hasAvailableUpdates('0.0.2', '0.0.1'));
      assert(!hasAvailableUpdates('0.0.20', '0.0.13'));
    });

    it('should return if the update is major', () => {
      assert(hasBreakingChange('0.0.1', '1.0.0'));
      assert(hasBreakingChange('0.2.3', '1.0.0'));
      assert(hasBreakingChange('0.2.3', '2.0.0'));
      assert(hasBreakingChange('1.0.0', '4.0.0'));
      assert(!hasBreakingChange('1.0.0', '1.0.0'));
      assert(!hasBreakingChange('1.0.0', '1.0.1'));
      assert(!hasBreakingChange('1.0.0', '1.2.3'));
    });
  });

  describe('error messages are formatted', async () => {
    it('should not note nonexistant errors', () => {
      const message = createUpdateErrorMessage([], []);
      const expected = undefined;
      assert.deepEqual(message, expected);
    });

    it('should note package update errors', () => {
      const message = createUpdateErrorMessage(['@slack/bolt'], []);
      const expected = {
        message: 'An error occurred fetching updates for the following packages: @slack/bolt\n',
      };
      assert.deepEqual(message, expected);
    });

    it('should note any file access errors', () => {
      const fileError = { name: 'package.json', error: 'Not found' };
      const message = createUpdateErrorMessage([], [fileError]);
      const expected = {
        message: 'An error occurred while reading the following files:\n  package.json: Not found\n',
      };
      assert.deepEqual(message, expected);
    });

    it('should note all errors together', () => {
      const fileError = { name: 'package.json', error: 'Not found' };
      const message = createUpdateErrorMessage(['@slack/hooks'], [fileError]);
      const expected = {
        message: 'An error occurred fetching updates for the following packages: @slack/hooks\n' +
                    'An error occurred while reading the following files:\n  package.json: Not found\n',
      };
      assert.deepEqual(message, expected);
    });
  });
});
