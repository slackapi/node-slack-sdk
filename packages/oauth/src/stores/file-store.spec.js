require('mocha');
const { assert, expect } = require('chai');

const sinon = require('sinon');
const fs = require('fs');
const os = require('os');

const { InstallProvider } = require('../index');
const { FileInstallationStore } = require('./index');

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

// TODO: valid tests with org-wide installations
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

describe('FileInstallationStore', async () => {

  let fsMakeDir, fsWriteFile, fsReadFileSync;

  beforeEach(() => {
    fsMakeDir = sinon.stub(fs, 'mkdir').returns({});
    fsWriteFile = sinon.stub(fs, 'writeFile').returns({});
    fsReadFileSync = sinon.stub(fs, 'readFileSync').returns(Buffer.from(JSON.stringify(storedInstallation)));
    fsUnlink = sinon.stub(fs, 'unlink').returns({});
    fsReaddirSync = sinon.stub(fs, 'readdirSync').returns(['app-latest', 'user-userId-latest']);
  });

  afterEach(() => {
    fsMakeDir.restore();
    fsWriteFile.restore();
    fsReadFileSync.restore();
    fsUnlink.restore();
    fsReaddirSync.restore();
  });

  it('should store the latest installation', async () => {
    const installationStore = new FileInstallationStore({ baseDir: os.tmpdir() });
    const installer = new InstallProvider({ clientId, clientSecret, stateSecret, installationStore });
    const { enterprise, team, user } = storedInstallation;
    const fakeInstallDir = `${os.tmpdir()}/${enterprise.id}-${team.id}`;
    const installationJSON = JSON.stringify(storedInstallation);

    installer.installationStore.storeInstallation(storedInstallation);
    assert.equal(fsWriteFile.calledWith(`${fakeInstallDir}/app-latest`, installationJSON), true);
    assert.equal(fsWriteFile.calledWith(sinon.match(`${fakeInstallDir}/user-${user.id}-latest`), installationJSON), true);
  });

  it('should store additional records for each installation with historicalDataEnabled', async () => {
    const installationStore = new FileInstallationStore({ baseDir: os.tmpdir(), historicalDataEnabled: true });
    const installer = new InstallProvider({ clientId, clientSecret, stateSecret, installationStore });
    const { enterprise, team, user } = storedInstallation;
    const fakeInstallDir = `${os.tmpdir()}/${enterprise.id}-${team.id}`;
    const installationJSON = JSON.stringify(storedInstallation);

    installer.installationStore.storeInstallation(storedInstallation);

    assert.equal(fsWriteFile.calledWith(sinon.match(`${fakeInstallDir}/app-`), installationJSON), true);
    assert.equal(fsWriteFile.calledWith(sinon.match(`${fakeInstallDir}/user-${user.id}-`), installationJSON), true);

    // 1 store = 4 files = 2 latest + 2 timestamps
    expect(fsWriteFile.callCount).equals(4);
  });

  it('should fetch a stored installation', async () => {
    const installationStore = new FileInstallationStore({ baseDir: os.tmpdir() });
    const installer = new InstallProvider({ clientId, clientSecret, stateSecret, installationStore });
    const { enterprise, team } = storedInstallation;
    const fakeInstallDir = `${os.tmpdir()}/${enterprise.id}-${team.id}`;
    const query = { enterpriseId: enterprise.id, teamId: team.id };

    installer.installationStore.storeInstallation(storedInstallation);
    const installation = await installer.installationStore.fetchInstallation(query);

    assert.equal(fsReadFileSync.calledWith(sinon.match(`${fakeInstallDir}/app-latest`)), true);
    assert.deepEqual(installation, storedInstallation);
  });

  it('should delete all records of installation if no userId is passed', async () => {
    const installationStore = new FileInstallationStore({ baseDir: os.tmpdir() });
    const installer = new InstallProvider({ clientId, clientSecret, stateSecret, installationStore });
    const { enterprise, team } = storedInstallation;
    const fakeInstallDir = `${os.tmpdir()}/${enterprise.id}-${team.id}`;
    const query = { enterpriseId: enterprise.id, teamId: team.id };

    await installer.installationStore.deleteInstallation(query);

    assert.equal(fsReaddirSync.calledWith(sinon.match(fakeInstallDir)), true);
    assert.equal(fsUnlink.calledWith(sinon.match(`app-latest`)), true);
    assert.equal(fsUnlink.calledWith(sinon.match(`user-userId-latest`)), true);

    // fsReaddirSync returns ['app-latest', 'user-userId-latest']
    expect(fsUnlink.callCount).equals(2);
  });

  it('should delete only user records of installation if userId is passed', async () => {
    const installationStore = new FileInstallationStore({ baseDir: os.tmpdir() });
    const installer = new InstallProvider({ clientId, clientSecret, stateSecret, installationStore });
    const { enterprise, team, user } = storedInstallation;
    const fakeInstallDir = `${os.tmpdir()}/${enterprise.id}-${team.id}`;
    const query = { enterpriseId: enterprise.id, teamId: team.id, userId: user.id };

    await installer.installationStore.deleteInstallation(query);

    assert.equal(fsReaddirSync.calledWith(sinon.match(fakeInstallDir)), true);
    assert.equal(fsUnlink.calledWith(sinon.match(`user-${user.id}-latest`)), true);

    // fsReaddirSync returns ['app-latest', 'user-userId-latest']
    expect(fsUnlink.callCount).equals(1);
  });

  it('should run authorize with triage-bot\'s MongoDB data', async () => {
    // Refer to https://github.com/slackapi/bolt-js/issues/1265 to learn the context
    const storedInstallation = {
      "_id": "6.....",
      "id": "T....",
      "__v": 0,
      "appId": "A...",
      "authVersion": "v2",
      "bot": {
        "scopes": [
          "channels:history",
          "channels:join",
          "channels:read",
          "chat:write",
          "commands",
          "files:write"
        ],
        "token": "xoxb-...",
        "userId": "U...",
        "id": "B02SS7QU407"
      },
      "db_record_created_at": "2022-01-08T02:24:40.470Z",
      "db_record_updated_at": "2022-01-08T02:24:40.470Z",
      "enterprise": null,
      "isEnterpriseInstall": false,
      "name": "My Team",
      "tokenType": "bot",
      "user": {
        "scopes": null,
        "id": "U..."
      }
    };
    const installationStore = {
      fetchInstallation: (_) => {
        return new Promise((resolve) => {
          resolve(storedInstallation);
        });
      },
      storeInstallation: () => {},
      deleteInstallation: (_) => {},
    }
    const installer = new InstallProvider({ clientId, clientSecret, stateSecret, installationStore });
    const authorizeResult = await installer.authorize({ teamId: 'T111' });
    assert.deepEqual(authorizeResult, {
      "teamId": "T111",
      "botId": "B02SS7QU407",
      "botUserId": "U...",
      "botToken": "xoxb-...",
      "userToken": undefined,
    });
  });
  it('should run authorize even if there are null objects in data', async () => {
    const storedInstallation = {
      // https://github.com/slackapi/template-triage-bot/blob/c1e54fb9d760b46cc8809c57e307061fdb3e0a91/app.js#L51-L55
      id: "T999", // template-triage-bot specific
      name: 'My Team', // template-triage-bot specific
      appId: 'A111',
      tokenType: 'bot',
      authVersion: 'v2',
      bot: {
        id: 'B111',
        userId: 'U111',
        scopes: [
          'channels:history',
          'channels:join',
          'channels:read',
          'chat:write',
          'commands',
          'files:write',
        ],
        token: 'xoxb-____',
      },
      enterprise: null,
      team: null, // v2.3 does not work with this data due to "Error: Cannot read property 'id' of null"
      isEnterpriseInstall: false,
      user: null,
    }
    const installationStore = {
      fetchInstallation: (_) => {
        return new Promise((resolve) => {
          resolve(storedInstallation);
        });
      },
      storeInstallation: () => {},
      deleteInstallation: (_) => {},
    }
    const installer = new InstallProvider({ clientId, clientSecret, stateSecret, installationStore });
    const authorizeResult = await installer.authorize({ teamId: 'T111' });
    assert.deepEqual(authorizeResult, {
      "teamId": "T111",
      "botId": "B111",
      "botUserId": "U111",
      "botToken": "xoxb-____",
    });
  });
});
