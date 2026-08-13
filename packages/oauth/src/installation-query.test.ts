import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import type { InstallationQuery } from './installation-query';

describe('InstallationQuery', async () => {
  it('should be a team-level installation query', async () => {
    const teamQuery: InstallationQuery<false> = {
      enterpriseId: undefined,
      teamId: 'T111',
      isEnterpriseInstall: false,
    };
    assert.ok(teamQuery);

    const gridTeamQuery: InstallationQuery<false> = {
      enterpriseId: 'E111',
      teamId: 'T111',
      isEnterpriseInstall: false,
    };
    assert.ok(gridTeamQuery);

    const teamUserQuery: InstallationQuery<false> = {
      enterpriseId: undefined,
      teamId: 'T111',
      userId: 'W111',
      isEnterpriseInstall: false,
    };
    assert.ok(teamUserQuery);
  });

  it('should be an org-wide installation query', async () => {
    const orgWideQuery: InstallationQuery<true> = {
      enterpriseId: 'E111',
      teamId: undefined,
      isEnterpriseInstall: true,
    };
    assert.ok(orgWideQuery);

    const orgWideUserQuery: InstallationQuery<true> = {
      enterpriseId: 'E111',
      teamId: undefined,
      userId: 'W111',
      isEnterpriseInstall: true,
    };
    assert.ok(orgWideUserQuery);
  });
});
