import { after, afterEach, before, describe, it } from 'mocha';
import assert from 'assert';
import childProcess from 'child_process';
import fs from 'fs';
import path from 'path';
import util from 'util';

const exec = util.promisify(childProcess.exec);

/**
 * Mock app information for packages of the project.
 */
const mainPackageJSON = { name: 'Example application', main: 'start.js' };
const defaultPackageJSON = { name: 'Example application' };

/**
 * Mock a super simple app script to verify outputs.
 */
const appScript = `\
console.log("coffee");
console.error("sips");
`;

describe('start implementation', async () => {
  describe('begins the main app process', async () => {
    before(() => {
      process.env.SLACK_CLI_XAPP = 'xapp-example';
      process.env.SLACK_CLI_XOXB = 'xoxb-example';
      const tempDir = path.join(process.cwd(), 'tmp');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }
      const appFilePath = path.join(tempDir, 'start.js');
      fs.writeFileSync(appFilePath, appScript);
      const packageJSONFilePath = path.join(tempDir, 'package.json');
      fs.writeFileSync(packageJSONFilePath, JSON.stringify(mainPackageJSON, null, 2));
    });

    after(() => {
      delete process.env.SLACK_CLI_XOXB;
      delete process.env.SLACK_CLI_XAPP;
      const tempDir = path.join(process.cwd(), 'tmp');
      const appFilePath = path.join(tempDir, 'start.js');
      if (fs.existsSync(appFilePath)) {
        fs.unlinkSync(appFilePath);
      }
      const packageJSONFilePath = path.join(tempDir, 'package.json');
      if (fs.existsSync(packageJSONFilePath)) {
        fs.unlinkSync(packageJSONFilePath);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true });
      }
    });

    it('writes output from the main script', async () => {
      const { stdout, stderr } = await exec('../src/start.js', { cwd: './tmp' });
      assert(stdout.includes('Preparing local run in developer mode (Socket Mode)'));
      assert(stdout.includes('coffee'));
      assert(stderr.includes('sips'));
      assert(stdout.includes('Local run exited with code 0'));
    });
  });

  describe('begins the default app process', async () => {
    before(() => {
      process.env.SLACK_CLI_XAPP = 'xapp-example';
      process.env.SLACK_CLI_XOXB = 'xoxb-example';
      const tempDir = path.join(process.cwd(), 'tmp');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }
      const appFilePath = path.join(tempDir, 'app.js');
      fs.writeFileSync(appFilePath, appScript);
      const packageJSONFilePath = path.join(tempDir, 'package.json');
      fs.writeFileSync(packageJSONFilePath, JSON.stringify(defaultPackageJSON, null, 2));
    });

    after(() => {
      delete process.env.SLACK_CLI_XOXB;
      delete process.env.SLACK_CLI_XAPP;
      const tempDir = path.join(process.cwd(), 'tmp');
      const filePath = path.join(tempDir, 'app.js');
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      const packageJSONFilePath = path.join(tempDir, 'package.json');
      if (fs.existsSync(packageJSONFilePath)) {
        fs.unlinkSync(packageJSONFilePath);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true });
      }
    });

    it('writes output from the default script', async () => {
      const { stdout, stderr } = await exec('../src/start.js', { cwd: './tmp' });
      assert(stdout.includes('Preparing local run in developer mode (Socket Mode)'));
      assert(stdout.includes('coffee'));
      assert(stderr.includes('sips'));
      assert(stdout.includes('Local run exited with code 0'));
    });
  });

  describe('begins the custom app process', async () => {
    before(() => {
      process.env.SLACK_CLI_XAPP = 'xapp-example';
      process.env.SLACK_CLI_XOXB = 'xoxb-example';
      process.env.SLACK_CLI_CUSTOM_FILE_PATH = 'application.js';
      const tempDir = path.join(process.cwd(), 'tmp');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }
      const appFilePath = path.join(tempDir, 'application.js');
      fs.writeFileSync(appFilePath, appScript);
      const packageJSONFilePath = path.join(tempDir, 'package.json');
      fs.writeFileSync(packageJSONFilePath, JSON.stringify(mainPackageJSON, null, 2));
    });

    after(() => {
      delete process.env.SLACK_CLI_XOXB;
      delete process.env.SLACK_CLI_XAPP;
      delete process.env.SLACK_CLI_CUSTOM_FILE_PATH;
      const tempDir = path.join(process.cwd(), 'tmp');
      const appFilePath = path.join(tempDir, 'application.js');
      if (fs.existsSync(appFilePath)) {
        fs.unlinkSync(appFilePath);
      }
      const packageJSONFilePath = path.join(tempDir, 'package.json');
      if (fs.existsSync(packageJSONFilePath)) {
        fs.unlinkSync(packageJSONFilePath);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true });
      }
    });

    it('writes output from the custom script', async () => {
      const { stdout, stderr } = await exec('../src/start.js', { cwd: './tmp' });
      assert(stdout.includes('Preparing local run in developer mode (Socket Mode)'));
      assert(stdout.includes('coffee'));
      assert(stderr.includes('sips'));
      assert(stdout.includes('Local run exited with code 0'));
    });
  });

  describe('withot valid tokens', async () => {
    afterEach(() => {
      delete process.env.SLACK_CLI_XOXB;
      delete process.env.SLACK_CLI_XAPP;
    });

    it('should error without a bot token', async () => {
      try {
        process.env.SLACK_CLI_XAPP = 'xapp-example';
        await exec('./src/start.js');
      } catch (err) {
        if (err instanceof Error) {
          assert(err.message.includes('Error: Missing local run bot token'));
          return;
        }
      }
      assert(false);
    });

    it('should error without an app token', async () => {
      try {
        process.env.SLACK_CLI_XOXB = 'xoxb-example';
        await exec('./src/start.js');
      } catch (err) {
        if (err instanceof Error) {
          assert(err.message.includes('Error: Missing local run app token'));
          return;
        }
      }
      assert(false);
    });
  });
});
