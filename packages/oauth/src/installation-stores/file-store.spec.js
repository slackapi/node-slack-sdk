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

  let fsMakeDirSync,
    fsWriteFileSync, fsReadFileSync,
    fsUnlinkSync, fsReaddirSync;

  beforeEach(() => {
    // Note that these sinon stubs affect the `os` package behaviors
    // in the tests in this file
    fsMakeDirSync = sinon.stub(fs, 'mkdirSync').returns({});
    fsWriteFileSync = sinon.stub(fs, 'writeFileSync').returns({});
    fsReadFileSync = sinon.stub(fs, 'readFileSync').returns(Buffer.from(JSON.stringify(storedInstallation)));
    fsUnlinkSync = sinon.stub(fs, 'unlinkSync').returns({});
    fsReaddirSync = sinon.stub(fs, 'readdirSync').returns(['app-latest', 'user-userId-latest']);
  });

  afterEach(() => {
    fsMakeDirSync.restore();
    fsWriteFileSync.restore();
    fsReadFileSync.restore();
    fsUnlinkSync.restore();
    fsReaddirSync.restore();
  });

  it('should store the latest installation', async () => {
    const installationStore = new FileInstallationStore({ baseDir: os.tmpdir() });
    const { enterprise, team, user } = storedInstallation;
    const fakeInstallDir = `${os.tmpdir()}/${enterprise.id}-${team.id}`;
    const installationJSON = JSON.stringify(storedInstallation);

    await installationStore.storeInstallation(storedInstallation);
    assert.equal(fsWriteFileSync.calledWith(`${fakeInstallDir}/app-latest`, installationJSON), true);
    assert.equal(fsWriteFileSync.calledWith(sinon.match(`${fakeInstallDir}/user-${user.id}-latest`), installationJSON), true);
  });
  it('should throw an exception with sufficient information when failing to store data', async () => {
    fsWriteFileSync.restore(); // disable sinon stub for this test case
    fsWriteFileSync = sinon.stub(fs, 'writeFileSync').throws(new Error('The original error message'));
    const installationStore = new FileInstallationStore({
      baseDir: os.tmpdir(),
      clientId: '11111.22222',
    });
    try {
      await installationStore.storeInstallation(storedInstallation);
      assert.fail('An exception should be thrown');
    } catch (e) {
      assert.equal(e.message, 'Failed to save installation to FileInstallationStore (error: Error: The original error message)');
    }
  });

  it('should store additional records for each installation with historicalDataEnabled', async () => {
    const installationStore = new FileInstallationStore({ baseDir: os.tmpdir(), historicalDataEnabled: true });
    const { enterprise, team, user } = storedInstallation;
    const fakeInstallDir = `${os.tmpdir()}/${enterprise.id}-${team.id}`;
    const installationJSON = JSON.stringify(storedInstallation);

    await installationStore.storeInstallation(storedInstallation);

    assert.equal(fsWriteFileSync.calledWith(sinon.match(`${fakeInstallDir}/app-`), installationJSON), true);
    assert.equal(fsWriteFileSync.calledWith(sinon.match(`${fakeInstallDir}/user-${user.id}-`), installationJSON), true);

    // 1 store = 4 files = 2 latest + 2 timestamps
    expect(fsWriteFileSync.callCount).equals(4);
  });

  it('should fetch a stored installation', async () => {
    const installationStore = new FileInstallationStore({ baseDir: os.tmpdir() });
    const { enterprise, team } = storedInstallation;
    const fakeInstallDir = `${os.tmpdir()}/${enterprise.id}-${team.id}`;
    const query = { enterpriseId: enterprise.id, teamId: team.id };

    await installationStore.storeInstallation(storedInstallation);
    const installation = await installationStore.fetchInstallation(query);

    assert.equal(fsReadFileSync.calledWith(sinon.match(`${fakeInstallDir}/app-latest`)), true);
    assert.deepEqual(installation, storedInstallation);
  });
  it('should throw an exception with sufficient information when failing to fetch data', async () => {
    fsReadFileSync.restore(); // disable sinon stub for this test case
    const installationStore = new FileInstallationStore({
      baseDir: os.tmpdir(),
      clientId: '111.222',
    });
    try {
      const res = await installationStore.fetchInstallation({
        enterpriseId: 'E999',
        teamId: 'T111',
      });
      assert.fail(`An exception should be thrown ${JSON.stringify(res)}`);
    } catch (e) {
      assert.equal(e.message, 
        'No installation data found (enterprise_id: E999, team_id: T111, user_id: undefined)');
    }
  });

  it('should delete all records of installation if no userId is passed', async () => {
    const installationStore = new FileInstallationStore({ baseDir: os.tmpdir() });
    const { enterprise, team } = storedInstallation;
    const fakeInstallDir = `${os.tmpdir()}/${enterprise.id}-${team.id}`;
    const query = { enterpriseId: enterprise.id, teamId: team.id };

    await installationStore.deleteInstallation(query);

    assert.equal(fsReaddirSync.calledWith(sinon.match(fakeInstallDir)), true);
    assert.equal(fsUnlinkSync.calledWith(sinon.match(`app-latest`)), true);
    assert.equal(fsUnlinkSync.calledWith(sinon.match(`user-userId-latest`)), true);

    // fsReaddirSync returns ['app-latest', 'user-userId-latest']
    expect(fsUnlinkSync.callCount).equals(2);
  });

  it('should delete only user records of installation if userId is passed', async () => {
    const installationStore = new FileInstallationStore({ baseDir: os.tmpdir() });
    const { enterprise, team, user } = storedInstallation;
    const fakeInstallDir = `${os.tmpdir()}/${enterprise.id}-${team.id}`;
    const query = { enterpriseId: enterprise.id, teamId: team.id, userId: user.id };

    await installationStore.deleteInstallation(query);

    assert.equal(fsReaddirSync.calledWith(sinon.match(fakeInstallDir)), true);
    assert.equal(fsUnlinkSync.calledWith(sinon.match(`user-${user.id}-latest`)), true);

    // fsReaddirSync returns ['app-latest', 'user-userId-latest']
    expect(fsUnlinkSync.callCount).equals(1);
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
