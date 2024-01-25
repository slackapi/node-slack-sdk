import { after, before, describe, it } from 'mocha';
import assert from 'assert';
import fs from 'fs';
import path from 'path';
import sinon from 'sinon';
import util from 'util';

import checkForSDKUpdates, {
  hasAvailableUpdates,
  hasBreakingChange,
  createUpdateErrorMessage,
} from './check-update.js';

/**
 * Mock dependency information for packages of the project.
 */
const packageJSON = {
  name: 'Example application',
  dependencies: {
    '@slack/bolt': '^3.0.0',
  },
  devDependencies: {
    '@slack/cli-hooks': '^0.0.1',
  },
};

/**
 * Example package information provided as a mocked npm command.
 * @param {string} command - Command to mock a result for.
 * @returns {string} - Stringified result of the mocked command.
 */
function mockNPM(command) {
  if (command === 'npm info @slack/bolt version --tag latest') {
    return '3.1.4';
  } if (command === 'npm info @slack/cli-hooks version --tag latest') {
    return '1.0.1';
  }
  if (command === 'npm list @slack/bolt --depth=0 --json') {
    return '{"dependencies":{"@slack/bolt":{"version":"3.0.0"}}}';
  } if (command === 'npm list @slack/cli-hooks --depth=0 --json') {
    return '{"dependencies":{"@slack/cli-hooks":{"version":"0.0.1"}}}';
  }
  throw new Error('Unknown NPM command mocked');
}

describe('check-update implementation', async () => {
  describe('collects recent package versions', async () => {
    const tempDir = path.join(process.cwd(), 'tmp');
    const packageJSONFilePath = path.join(tempDir, 'package.json');

    before(() => {
      sinon.stub(util, 'promisify')
        .returns((/** @type {string} */ command) => {
          const info = mockNPM(command);
          return Promise.resolve({ stdout: info });
        });
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }
      if (!fs.existsSync(packageJSONFilePath)) {
        fs.writeFileSync(packageJSONFilePath, JSON.stringify(packageJSON, null, 2));
      }
    });

    after(() => {
      sinon.restore();
      if (fs.existsSync(packageJSONFilePath)) {
        fs.unlinkSync(packageJSONFilePath);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true });
      }
    });

    it('shows version information for packages', async () => {
      const updates = await checkForSDKUpdates('./tmp');
      const expected = {
        name: 'the Slack SDK',
        error: undefined,
        message: '',
        releases: [
          {
            name: '@slack/bolt',
            current: '3.0.0',
            latest: '3.1.4',
            error: undefined,
            update: true,
            message: undefined,
            breaking: false,
            url: 'https://github.com/slackapi/bolt-js/releases/tag/@slack/bolt@3.1.4',
          },
          {
            name: '@slack/cli-hooks',
            current: '0.0.1',
            latest: '1.0.1',
            error: undefined,
            update: true,
            message: undefined,
            breaking: true,
            url: 'https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/cli-hooks@1.0.1',
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
      assert(hasAvailableUpdates('0.0.2-rc.0', '0.0.2-rc.1'));
      assert(hasAvailableUpdates('0.0.3-rc.2', '0.0.3'));
      assert(!hasAvailableUpdates('0.0.1', '0.0.1'));
      assert(!hasAvailableUpdates('0.1.0', '0.1.0'));
      assert(!hasAvailableUpdates('0.1.1', '0.1.1'));
      assert(!hasAvailableUpdates('1.0.0', '1.0.0'));
      assert(!hasAvailableUpdates('1.0.1', '1.0.1'));
      assert(!hasAvailableUpdates('1.1.1', '1.1.1'));
      assert(!hasAvailableUpdates(undefined, undefined));
      assert(!hasAvailableUpdates(undefined, '1.0.0'));
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
      assert(!hasAvailableUpdates('0.0.2-rc.0', '0.0.2-rc.0'));
      assert(!hasAvailableUpdates('0.0.2', '0.0.2-rc.4'));
    });

    it('should return if the update is major', () => {
      assert(hasBreakingChange('0.0.1', '1.0.0'));
      assert(hasBreakingChange('0.2.3', '1.0.0'));
      assert(hasBreakingChange('0.2.3', '2.0.0'));
      assert(hasBreakingChange('1.0.0', '4.0.0'));
      assert(!hasBreakingChange('1.0.0', '1.0.0'));
      assert(!hasBreakingChange('1.0.0', '1.0.1'));
      assert(!hasBreakingChange('1.0.0', '1.2.3'));
      assert(!hasBreakingChange(undefined, '1.0.0'));
      assert(!hasBreakingChange('1.0.0', undefined));
      assert(!hasBreakingChange(undefined, undefined));
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
      const message = createUpdateErrorMessage(['@slack/cli-hooks'], [fileError]);
      const expected = {
        message: 'An error occurred fetching updates for the following packages: @slack/cli-hooks\n' +
                    'An error occurred while reading the following files:\n  package.json: Not found\n',
      };
      assert.deepEqual(message, expected);
    });
  });
});
