import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import type { Installation } from './installation';

describe('Installation', async () => {
  it('should be a team-level installation (bot)', async () => {
    const installation: Installation<'v2', false> = {
      enterprise: undefined,
      team: {
        id: 'T111',
      },
      bot: {
        id: 'B111',
        userId: 'W111',
        scopes: ['commands'],
        token: 'xoxb-',
      },
      user: {
        id: 'W222',
        scopes: undefined,
        token: undefined,
      },
    };
    assert.ok(installation);
  });
  it('should be a team-level installation (user)', async () => {
    const installation: Installation<'v2', false> = {
      enterprise: undefined,
      team: {
        id: 'T111',
      },
      user: {
        id: 'W222',
        token: 'xoxp-',
        scopes: ['chat:write'],
      },
    };
    assert.ok(installation);
  });

  it('should be an org-wide installation query (bot)', async () => {
    const installation: Installation<'v2', true> = {
      enterprise: {
        id: 'E111',
      },
      bot: {
        id: 'B111',
        userId: 'W111',
        scopes: ['commands'],
        token: 'xoxb-',
      },
      team: undefined,
      user: {
        id: 'W222',
        scopes: undefined,
        token: undefined,
      },
    };
    assert.ok(installation);
  });
  it('should be an org-wide installation query (user)', async () => {
    const installation: Installation<'v2', true> = {
      enterprise: {
        id: 'E111',
      },
      team: undefined,
      user: {
        id: 'W222',
        token: 'xoxp-',
        scopes: ['chat:write'],
      },
    };
    assert.ok(installation);
  });
});
