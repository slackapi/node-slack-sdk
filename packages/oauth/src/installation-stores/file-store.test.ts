import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, it, type Mock, mock } from 'node:test';

import type { InstallationQuery } from '../index';
import { InstallProvider } from '../index';
import { FileInstallationStore } from './index';

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

type MockFunction = Mock<(...args: never[]) => unknown>;

function callsTo(fn: MockFunction): unknown[][] {
  return fn.mock.calls.map((call) => call.arguments);
}

describe('FileInstallationStore', async () => {
  let fsWriteFileSync: MockFunction;
  let fsReadFileSync: MockFunction;
  let fsUnlinkSync: MockFunction;
  let fsReaddirSync: MockFunction;

  beforeEach(() => {
    mock.method(fs, 'mkdirSync', () => undefined);
    fsWriteFileSync = mock.method(fs, 'writeFileSync', () => {});
    fsReadFileSync = mock.method(fs, 'readFileSync', () => Buffer.from(JSON.stringify(storedInstallation)));
    fsUnlinkSync = mock.method(fs, 'unlinkSync', () => {});
    fsReaddirSync = mock.method(fs, 'readdirSync', () => ['app-latest', 'user-userId-latest']);
  });

  afterEach(() => {
    mock.restoreAll();
  });

  it('should store only the latest installation with historicalDataEnabled off', async () => {
    const installationStore = new FileInstallationStore({ baseDir: os.tmpdir(), historicalDataEnabled: false });
    const { enterprise, team, user } = storedInstallation;
    const fakeInstallDir = path.join(os.tmpdir(), `${enterprise.id}-${team.id}`);
    const installationJSON = JSON.stringify(storedInstallation);

    await installationStore.storeInstallation(storedInstallation);
    assert.deepEqual(callsTo(fsWriteFileSync), [
      [path.join(fakeInstallDir, 'app-latest'), installationJSON],
      [path.join(fakeInstallDir, `user-${user.id}-latest`), installationJSON],
    ]);
  });
  it('should throw an exception with sufficient information when failing to store data', async () => {
    fsWriteFileSync.mock.mockImplementation(() => {
      throw new Error('The original error message');
    });
    const installationStore = new FileInstallationStore({
      baseDir: os.tmpdir(),
      clientId: '11111.22222',
    });
    try {
      await installationStore.storeInstallation(storedInstallation);
      assert.fail('An exception should be thrown');
    } catch (e: unknown) {
      assert.ok(e instanceof Error);
      assert.strictEqual(
        e.message,
        'Failed to save installation to FileInstallationStore (error: Error: The original error message)',
      );
    }
  });

  it('should store additional records for each installation with historicalDataEnabled', async () => {
    const installationStore = new FileInstallationStore({ baseDir: os.tmpdir(), historicalDataEnabled: true });
    const { enterprise, team, user } = storedInstallation;
    const fakeInstallDir = path.join(os.tmpdir(), `${enterprise.id}-${team.id}`);
    const installationJSON = JSON.stringify(storedInstallation);

    await installationStore.storeInstallation(storedInstallation);

    const [appLatest, userLatest, appHistorical, userHistorical] = callsTo(fsWriteFileSync);
    assert.deepEqual(appLatest, [path.join(fakeInstallDir, 'app-latest'), installationJSON]);
    assert.deepEqual(userLatest, [path.join(fakeInstallDir, `user-${user.id}-latest`), installationJSON]);
    assert.ok(String(appHistorical[0]).startsWith(path.join(fakeInstallDir, 'app-')));
    assert.ok(String(userHistorical[0]).startsWith(path.join(fakeInstallDir, `user-${user.id}-`)));
    assert.equal(appHistorical[1], installationJSON);
    assert.equal(userHistorical[1], installationJSON);
    assert.equal(fsWriteFileSync.mock.callCount(), 4);
  });

  it('should fetch a stored installation', async () => {
    const installationStore = new FileInstallationStore({ baseDir: os.tmpdir() });
    const { enterprise, team } = storedInstallation;
    const fakeInstallDir = path.join(os.tmpdir(), `${enterprise.id}-${team.id}`);
    const query = { enterpriseId: enterprise.id, teamId: team.id };

    await installationStore.storeInstallation(storedInstallation);
    const installation = await installationStore.fetchInstallation(query);

    assert.deepEqual(callsTo(fsReadFileSync), [[path.join(fakeInstallDir, 'app-latest')]]);
    assert.deepStrictEqual(installation, storedInstallation);
  });
  it('should throw an exception with sufficient information when failing to fetch data', async () => {
    fsReadFileSync.mock.restore();
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
    } catch (e: unknown) {
      assert.ok(e instanceof Error);
      assert.strictEqual(
        e.message,
        'No installation data found (enterprise_id: E999, team_id: T111, user_id: undefined)',
      );
    }
  });

  it('should delete all records of installation if no userId is passed', async () => {
    const installationStore = new FileInstallationStore({ baseDir: os.tmpdir() });
    const { enterprise, team } = storedInstallation;
    const fakeInstallDir = path.join(os.tmpdir(), `${enterprise.id}-${team.id}`);
    const query = { enterpriseId: enterprise.id, teamId: team.id };

    await installationStore.deleteInstallation(query);

    assert.deepEqual(callsTo(fsReaddirSync), [[fakeInstallDir]]);
    assert.deepEqual(callsTo(fsUnlinkSync), [
      [path.resolve(fakeInstallDir, 'app-latest')],
      [path.resolve(fakeInstallDir, 'user-userId-latest')],
    ]);
  });

  it('should delete only user records of installation if userId is passed', async () => {
    const installationStore = new FileInstallationStore({ baseDir: os.tmpdir() });
    const { enterprise, team, user } = storedInstallation;
    const fakeInstallDir = path.join(os.tmpdir(), `${enterprise.id}-${team.id}`);
    const query = { enterpriseId: enterprise.id, teamId: team.id, userId: user.id };

    await installationStore.deleteInstallation(query);

    assert.deepEqual(callsTo(fsReaddirSync), [[fakeInstallDir]]);
    assert.deepEqual(callsTo(fsUnlinkSync), [[path.resolve(fakeInstallDir, `user-${user.id}-latest`)]]);
  });

  it("should run authorize with triage-bot's MongoDB data", async () => {
    // Refer to https://github.com/slackapi/bolt-js/issues/1265 to learn the context
    const storedInstallation = {
      _id: '6.....',
      id: 'T....',
      __v: 0,
      appId: 'A...',
      authVersion: 'v2',
      bot: {
        scopes: ['channels:history', 'channels:join', 'channels:read', 'chat:write', 'commands', 'files:write'],
        token: 'xoxb-...',
        userId: 'U...',
        id: 'B02SS7QU407',
      },
      db_record_created_at: '2022-01-08T02:24:40.470Z',
      db_record_updated_at: '2022-01-08T02:24:40.470Z',
      enterprise: null,
      isEnterpriseInstall: false,
      name: 'My Team',
      tokenType: 'bot',
      user: {
        scopes: null,
        id: 'U...',
      },
    };
    const installationStore = {
      fetchInstallation: (_: InstallationQuery<boolean>) => {
        return new Promise((resolve) => {
          resolve(storedInstallation);
        });
      },
      storeInstallation: () => {},
      deleteInstallation: (_: InstallationQuery<boolean>) => {},
    };
    const installer = new InstallProvider({ clientId, clientSecret, stateSecret, installationStore });
    const authorizeResult = await installer.authorize({ teamId: 'T111' });
    assert.deepStrictEqual(authorizeResult, {
      teamId: 'T111',
      botId: 'B02SS7QU407',
      botUserId: 'U...',
      botToken: 'xoxb-...',
      userToken: undefined,
    });
  });
  it('should run authorize even if there are null objects in data', async () => {
    const storedInstallation = {
      // https://github.com/slackapi/template-triage-bot/blob/c1e54fb9d760b46cc8809c57e307061fdb3e0a91/app.js#L51-L55
      id: 'T999', // template-triage-bot specific
      name: 'My Team', // template-triage-bot specific
      appId: 'A111',
      tokenType: 'bot',
      authVersion: 'v2',
      bot: {
        id: 'B111',
        userId: 'U111',
        scopes: ['channels:history', 'channels:join', 'channels:read', 'chat:write', 'commands', 'files:write'],
        token: 'xoxb-____',
      },
      enterprise: null,
      team: null, // v2.3 does not work with this data due to "Error: Cannot read property 'id' of null"
      isEnterpriseInstall: false,
      user: null,
    };
    const installationStore = {
      fetchInstallation: (_: InstallationQuery<boolean>) => {
        return new Promise((resolve) => {
          resolve(storedInstallation);
        });
      },
      storeInstallation: () => {},
      deleteInstallation: (_: InstallationQuery<boolean>) => {},
    };
    const installer = new InstallProvider({ clientId, clientSecret, stateSecret, installationStore });
    const authorizeResult = await installer.authorize({ teamId: 'T111' });
    assert.deepStrictEqual(authorizeResult, {
      teamId: 'T111',
      botId: 'B111',
      botUserId: 'U111',
      botToken: 'xoxb-____',
    });
  });
});
