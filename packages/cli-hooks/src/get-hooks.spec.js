import assert from 'node:assert';
import { describe, it } from 'mocha';

import getHooks from './get-hooks.js';

describe('get-hooks implementation', async () => {
  it('should return scripts for required hooks', async () => {
    const { hooks } = getHooks();
    assert(hooks.doctor === 'NODE_NO_WARNINGS=1 npx -q --no-install -p @slack/cli-hooks slack-cli-doctor');
    assert(
      hooks['check-update'] === 'NODE_NO_WARNINGS=1 npx -q --no-install -p @slack/cli-hooks slack-cli-check-update',
    );
    assert(
      hooks['get-manifest'] === 'NODE_NO_WARNINGS=1 npx -q --no-install -p @slack/cli-hooks slack-cli-get-manifest',
    );
    assert(hooks.start === 'npx -q --no-install -p @slack/cli-hooks slack-cli-start');
  });

  it('should return every protocol version', async () => {
    const { config } = getHooks();
    assert.deepEqual(config['protocol-version'], ['message-boundaries']);
  });

  it('should return a true managed connection', async () => {
    const { config } = getHooks();
    assert(config['sdk-managed-connection-enabled']);
  });
});
