import { after, afterEach, before, describe, it } from 'mocha';
import assert from 'assert';
import childProcess from 'child_process';
import fs from 'fs';
import path from 'path';
import util from 'util';

const exec = util.promisify(childProcess.exec);

describe('start implementation', async () => {
  describe('begins the app process', async () => {
    const appScript = `\
console.log("coffee");
console.error("sips");
`;
    before(() => {
      process.env.SLACK_CLI_XAPP = 'xapp-example';
      process.env.SLACK_CLI_XOXB = 'xoxb-example';
      process.env.SLACK_CLI_CUSTOM_FILE_PATH = 'tmp/app.js';
      const tempDir = path.join(process.cwd(), 'tmp');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }
      const filePath = path.join(tempDir, 'app.js');
      fs.writeFileSync(filePath, appScript);
    });

    after(() => {
      delete process.env.SLACK_CLI_XOXB;
      delete process.env.SLACK_CLI_XAPP;
      const tempDir = path.join(process.cwd(), 'tmp');
      const filePath = path.join(tempDir, 'app.js');
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true });
      }
    });

    it('writes output from the app script', async () => {
      const { stdout, stderr } = await exec('./src/start.js');
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
