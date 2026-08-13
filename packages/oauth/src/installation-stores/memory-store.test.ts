import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { InstallProvider } from '../index';
import { MemoryInstallationStore } from './index';

const clientSecret = 'MY_SECRET';
const clientId = 'MY_ID';
const stateSecret = 'stateSecret';

const storedInstallation = {
  team: {
    id: 'test-team-id',
    name: 'team-name',
  },
  enterprise: {
    id: 'test-enterprise-id',
    name: 'ent-name',
  },
  bot: {
    token: 'botToken',
    scopes: ['chat:write'],
    id: 'botId',
    userId: 'botUserId',
  },
  user: {
    token: 'userToken',
    id: 'userId',
  },
  incomingWebhook: {
    url: 'example.com',
    channel: 'someChannel',
    channelId: 'someChannelID',
    configurationUrl: 'someConfigURL',
  },
  appId: 'fakeAppId',
  tokenType: 'tokenType',
  isEnterpriseInstall: false,
};

// TODO: valid tests with org-wide installations, remove _ prefix when implemented.
const _storedOrgInstallation = {
  team: null,
  enterprise: {
    id: 'test-enterprise-id',
    name: 'ent-name',
  },
  bot: {
    token: 'botToken',
    scopes: ['chat:write'],
    id: 'botId',
    userId: 'botUserId',
  },
  user: {
    token: 'userToken',
    id: 'userId',
  },
  incomingWebhook: {
    url: 'example.com',
    channel: 'someChannel',
    channelId: 'someChannelID',
    configurationUrl: 'someConfigURL',
  },
  appId: undefined,
  tokenType: 'tokenType',
  isEnterpriseInstall: true,
};

describe('MemoryInstallationStore', async () => {
  it('should store and fetch an installation', async () => {
    const installationStore = new MemoryInstallationStore();
    const installer = new InstallProvider({ clientId, clientSecret, stateSecret, installationStore });
    const fakeTeamId = storedInstallation.team.id;

    assert.deepStrictEqual({}, installer.installationStore.devDB);

    await installer.installationStore.storeInstallation(storedInstallation);
    const fetchedResult = await installer.installationStore.fetchInstallation({ teamId: fakeTeamId });
    assert.deepStrictEqual(fetchedResult, storedInstallation);
    assert.deepStrictEqual(storedInstallation, installer.installationStore.devDB[fakeTeamId]);
  });

  it('should delete a stored installation', async () => {
    const installationStore = new MemoryInstallationStore();
    const installer = new InstallProvider({ clientId, clientSecret, stateSecret, installationStore });
    const fakeTeamId = storedInstallation.team.id;

    await installer.installationStore.storeInstallation(storedInstallation);
    assert.ok(Object.keys(installer.installationStore.devDB).length > 0);

    await installer.installationStore.deleteInstallation({ teamId: fakeTeamId });
    assert.strictEqual(Object.keys(installer.installationStore.devDB).length, 0);
  });
});
