import { assert } from 'chai';
import { describe, it } from 'mocha';

import { InstallProviderOptions } from './install-provider-options';

describe('InstallProviderOptions', async () => {
  it('should be compatible with past versions in terms of required args', async () => {
    const options: InstallProviderOptions = {
      clientId: '111.222',
      clientSecret: 'xxx',
    };
    assert.equal(options.clientId, '111.222');
    assert.equal(options.clientSecret, 'xxx');
  });
});
