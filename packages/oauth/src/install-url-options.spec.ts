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

  it('should be stringified without any issues', async () => {
    const options: InstallURLOptions = {
      teamId: 'T111',
      redirectUri: 'https://www.example.com/slack/oauth_redirect',
      scopes: ['commands', 'chat:write'],
      userScopes: ['chat:write'],
      metadata: 'meta',
    };
    assert.deepEqual(JSON.stringify(options), '{"teamId":"T111","redirectUri":"https://www.example.com/slack/oauth_redirect","scopes":["commands","chat:write"],"userScopes":["chat:write"],"metadata":"meta"}');
  });
});
