import assert from 'node:assert';
import { describe, it } from 'mocha';

import getHooks from './get-hooks.js';

describe('get-hooks implementation', async () => {
  it('should return scripts for required hooks', async () => {
    const { hooks } = getHooks();
    assert(hooks.doctor === 'npx -q --no-install -p @slack/cli-hooks slack-cli-doctor');
    assert(hooks['check-update'] === 'npx -q --no-install -p @slack/cli-hooks slack-cli-check-update');
    assert(hooks['get-manifest'] === 'npx -q --no-install -p @slack/cli-hooks slack-cli-get-manifest');
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

  it('should return watch config for app files', async () => {
    const { config } = getHooks();
    assert(config.watch);
    assert(config.watch.app);
    assert.equal(config.watch.app['filter-regex'], '\\.js$');
    assert.deepEqual(config.watch.app.paths, ['.']);
  });

  it('should return watch config for manifest files', async () => {
    const { config } = getHooks();
    assert(config.watch);
    assert(config.watch.manifest);
    assert.deepEqual(config.watch.manifest.paths, ['manifest.json']);
  });
});
