import { assert } from 'chai';
import { describe, it } from 'mocha';
import { InstallURLOptions } from './install-url-options';

describe('InstallURLOptions', async () => {
  // TODO: the use cases with only userScopes should be supported in TS

  it('should be compatible with past versions in terms of required args', async () => {
    const options: InstallURLOptions = {
      scopes: ['commands', 'chat:write'],
    };
    const actual = typeof options.scopes === 'string' ?
      options.scopes.split(',').sort() :
      options.scopes.sort();
    assert.deepEqual(actual, ['chat:write', 'commands']);
  });
});
