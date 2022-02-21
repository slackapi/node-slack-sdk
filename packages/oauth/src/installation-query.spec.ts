import { assert } from 'chai';
import { describe, it } from 'mocha';
import { InstallationQuery } from './installation-query';

describe('InstallationQuery', async () => {
  it('should be a team-level installation query', async () => {
    const teamQuery: InstallationQuery<false> = {
      enterpriseId: undefined,
      teamId: 'T111',
      isEnterpriseInstall: false,
    };
    assert.isNotNull(teamQuery);

    const gridTeamQuery: InstallationQuery<false> = {
      enterpriseId: 'E111',
      teamId: 'T111',
      isEnterpriseInstall: false,
    };
    assert.isNotNull(gridTeamQuery);

    const teamUserQuery: InstallationQuery<false> = {
      enterpriseId: undefined,
      teamId: 'T111',
      userId: 'W111',
      isEnterpriseInstall: false,
    };
    assert.isNotNull(teamUserQuery);
  });

  it('should be an org-wide installation query', async () => {
    const orgWideQuery: InstallationQuery<true> = {
      enterpriseId: 'E111',
      teamId: undefined,
      isEnterpriseInstall: true,
    };
    assert.isNotNull(orgWideQuery);

    const orgWideUserQuery: InstallationQuery<true> = {
      enterpriseId: 'E111',
      teamId: undefined,
      userId: 'W111',
      isEnterpriseInstall: true,
    };
    assert.isNotNull(orgWideUserQuery);
  });
});
