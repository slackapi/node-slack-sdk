require('mocha');
const { assert } = require('chai');

const { InstallProvider } = require('../index');
const { MemoryInstallationStore } = require('./index');

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
}

// TODO
const storedOrgInstallation = {
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
}

describe('MemoryInstallationStore', async () => {
  it('should store and fetch an installation', async () => {
    const installationStore = new MemoryInstallationStore();
    const installer = new InstallProvider({ clientId, clientSecret, stateSecret, installationStore });
    const fakeTeamId = storedInstallation.team.id;

    assert.deepEqual({}, installer.installationStore.devDB);

    await installer.installationStore.storeInstallation(storedInstallation);
    const fetchedResult = await installer.installationStore.fetchInstallation({ teamId: fakeTeamId });
    assert.deepEqual(fetchedResult, storedInstallation);
    assert.deepEqual(storedInstallation, installer.installationStore.devDB[fakeTeamId]);
  });

  it('should delete a stored installation', async () => {
    const installationStore = new MemoryInstallationStore();
    const installer = new InstallProvider({ clientId, clientSecret, stateSecret, installationStore });
    const fakeTeamId = storedInstallation.team.id;

    await installer.installationStore.storeInstallation(storedInstallation);
    assert.isNotEmpty(installer.installationStore.devDB);

    await installer.installationStore.deleteInstallation({ teamId: fakeTeamId });
    assert.isEmpty(installer.installationStore.devDB);
  });
});
