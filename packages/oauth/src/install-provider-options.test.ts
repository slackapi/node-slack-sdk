import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import type { InstallProviderOptions } from './install-provider-options';

describe('InstallProviderOptions', async () => {
  it('should be compatible with past versions in terms of required args', async () => {
    const options: InstallProviderOptions = {
      clientId: '111.222',
      clientSecret: 'xxx',
    };
    assert.strictEqual(options.clientId, '111.222');
    assert.strictEqual(options.clientSecret, 'xxx');
  });
});
