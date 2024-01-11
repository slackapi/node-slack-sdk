import { describe, it } from 'mocha';
import assert from 'assert';
import childProcess from 'child_process';
import util from 'util';

const exec = util.promisify(childProcess.exec);

describe('get-hooks implementation', async () => {
  it('should return scripts for required hooks', async () => {
    const { stdout } = await exec('./src/get-hooks.js');
    const { hooks } = JSON.parse(stdout.trim());
    assert(hooks['get-manifest'] === 'npx -q --no-install -p @slack/cli-hooks slack-cli-get-manifest');
    assert(hooks['check-update'] === 'npx -q --no-install -p @slack/cli-hooks slack-cli-check-update');
    assert(hooks.start === 'npx -q --no-install -p @slack/cli-hooks slack-cli-start');
  });

  it('should return a true managed connection', async () => {
    const { stdout } = await exec('./src/get-hooks.js');
    const { config } = JSON.parse(stdout.trim());
    assert(config['sdk-managed-connection-enabled']);
  });
});
