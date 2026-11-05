import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import sinon from 'sinon';

import type { Installation, InstallationQuery, InstallationStore, Logger } from '../index';
import { InstallProvider, LogLevel } from '../index';
import { RedisInstallationStore, type RedisInstallationStoreClient } from './index';

// Keeps strings like Redis. The methods use a private field, so calling one unbound fails like it does on real clients.
class FakeRedis implements RedisInstallationStoreClient {
  #data = new Map<string, string>();

  async get(key: string): Promise<unknown> {
    return this.#data.get(key) ?? null;
  }

  async set(key: string, value: string): Promise<unknown> {
    this.#data.set(key, value);
    return 'OK';
  }

  async del(key: string): Promise<unknown> {
    return this.#data.delete(key) ? 1 : 0;
  }

  async append(key: string, value: string): Promise<unknown> {
    const appended = (this.#data.get(key) ?? '') + value;
    this.#data.set(key, appended);
    return appended.length;
  }

  raw(key: string): string | undefined {
    return this.#data.get(key);
  }

  keys(): string[] {
    return [...this.#data.keys()].sort();
  }
}

// Parses JSON values on get(), like @upstash/redis does by default.
class UpstashLikeRedis extends FakeRedis {
  async get(key: string): Promise<unknown> {
    const value = await super.get(key);
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
      return value;
    }
  }
}

// Returns bytes, like clients set up to return buffers.
class BufferRedis extends FakeRedis {
  async get(key: string): Promise<unknown> {
    const value = await super.get(key);
    return typeof value === 'string' ? Buffer.from(value) : value;
  }
}

const now = () => Math.floor(Date.now() / 1000);
const expiring = () => now() + 60; // inside the 2 hours before expiry when InstallProvider refreshes a token
const fresh = () => now() + 43200;

function bot(token = 'xoxb-1', expiresAt = fresh()): NonNullable<Installation['bot']> {
  return { id: 'B1', userId: 'UB1', scopes: ['chat:write'], token, refreshToken: `xoxe-${token}`, expiresAt };
}

function user(id: string, token = `xoxp-${id}`, expiresAt = fresh()): Installation['user'] {
  return { id, token, refreshToken: `xoxe-${token}`, expiresAt, scopes: ['search:read'] };
}

function installation(installer: Installation['user'], withBot?: Installation['bot']): Installation {
  return {
    team: { id: 'T1', name: 'Team' },
    enterprise: undefined,
    user: installer,
    ...(withBot !== undefined && { bot: withBot, tokenType: 'bot' as const }),
    appId: 'A1',
    isEnterpriseInstall: false,
    authVersion: 'v2',
  };
}

const orgInstallation: Installation<'v2', true> = {
  team: undefined,
  enterprise: { id: 'E1', name: 'Org' },
  user: user('U1'),
  bot: bot(),
  tokenType: 'bot',
  appId: 'A1',
  enterpriseUrl: 'https://org.enterprise.slack.com/',
  isEnterpriseInstall: true,
  authVersion: 'v2',
};

function team(userId?: string): InstallationQuery<false> {
  return { teamId: 'T1', enterpriseId: undefined, userId, isEnterpriseInstall: false };
}

// Bolt also passes the ID of the workspace in the org that an event came from.
function org(teamId?: string, userId?: string): InstallationQuery<boolean> {
  return { teamId, enterpriseId: 'E1', userId, isEnterpriseInstall: true };
}

// Drops what JSON doesn't keep, like undefined values.
function plain<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function spyLogger(): Logger & Record<'debug' | 'info' | 'warn' | 'error', sinon.SinonSpy> {
  return {
    debug: sinon.spy(),
    info: sinon.spy(),
    warn: sinon.spy(),
    error: sinon.spy(),
    setLevel: sinon.spy(),
    getLevel: () => LogLevel.DEBUG,
    setName: sinon.spy(),
  };
}

// An InstallProvider whose token refreshes are answered by `refresh`, with the refresh token it was given.
function installer(installationStore: InstallationStore, refresh: (refreshToken: string) => Promise<unknown>) {
  return new InstallProvider({
    clientId: 'C1',
    clientSecret: 'secret',
    stateSecret: 'state',
    installationStore,
    logger: spyLogger(),
    clientOptions: {
      retryConfig: { retries: 0 },
      fetch: async (_url, init) => {
        const body = await refresh(new URLSearchParams(String(init?.body)).get('refresh_token') ?? '');
        return new Response(JSON.stringify(body), { headers: { 'content-type': 'application/json' } });
      },
    },
  });
}

function refreshed(tokenType: 'bot' | 'user', token: string) {
  return { ok: true, token_type: tokenType, access_token: token, refresh_token: `xoxe-${token}`, expires_in: 43200 };
}

const invalidRefreshToken = { ok: false, error: 'invalid_refresh_token' };

const W = 'slack:installation:team:T1';

describe('RedisInstallationStore', async () => {
  it('should require a client with get(), set(), del() and append()', async () => {
    for (const client of [undefined, {}, { get: () => {}, set: () => {}, del: () => {} }]) {
      assert.throws(() => new RedisInstallationStore({ client: client as unknown as RedisInstallationStoreClient }), {
        name: 'TypeError',
        message: 'RedisInstallationStore needs a Redis client with get(), set(), del() and append() methods',
      });
    }
  });

  it('should use the documented keys', async () => {
    const client = new FakeRedis();
    await new RedisInstallationStore({ client }).storeInstallation(installation(user('U1'), bot()));
    await new RedisInstallationStore({ client, clientId: '123.456' }).storeInstallation(installation(user('U1')));
    await new RedisInstallationStore({ client, keyPrefix: 'app' }).storeInstallation(orgInstallation);

    assert.deepStrictEqual(client.keys(), [
      'app:enterprise:E1',
      'app:enterprise:E1:user:U1',
      'app:enterprise:E1:users',
      'slack:installation:123.456:team:T1:nobot',
      'slack:installation:123.456:team:T1:user:U1',
      'slack:installation:123.456:team:T1:users',
      W,
      `${W}:user:U1`,
      `${W}:users`,
    ]);
    assert.strictEqual(client.raw(`${W}:users`), ',U1');
  });

  for (const Client of [FakeRedis, UpstashLikeRedis, BufferRedis]) {
    describe(`with a client like ${Client.name}`, async () => {
      it('should store and fetch an installation, keeping user tokens out of the installation record', async () => {
        const client = new Client();
        const store = new RedisInstallationStore({ client });
        const saved = installation(user('U1'), bot());

        await store.storeInstallation(saved);

        assert.deepStrictEqual(plain(await store.fetchInstallation(team())), plain(saved));
        assert.deepStrictEqual(plain(await store.fetchInstallation(team('U1'))), plain(saved));
        assert.doesNotMatch(client.raw(W) ?? '', /xoxp/);
        assert.strictEqual(JSON.parse(client.raw(`${W}:user:U1`) ?? '').token, 'xoxp-U1');
      });

      it('should fetch an org-wide installation for any workspace in the org', async () => {
        const store = new RedisInstallationStore({ client: new Client() });
        await store.storeInstallation(orgInstallation);

        const fetched = await store.fetchInstallation(org('T2', 'U1'));
        assert.deepStrictEqual(plain(fetched), plain(orgInstallation));
      });

      it('should fetch a workspace in an Enterprise Grid org with or without its enterprise ID', async () => {
        const store = new RedisInstallationStore({ client: new Client() });
        await store.storeInstallation({ ...installation(user('U1'), bot()), enterprise: { id: 'E1', name: 'Org' } });

        assert.strictEqual((await store.fetchInstallation(team())).enterprise?.id, 'E1');
        assert.strictEqual((await store.fetchInstallation({ ...team(), enterpriseId: 'E1' })).enterprise?.id, 'E1');
      });

      it("should not replace the bot with a later authorization that has only user scopes, and fetch each user's token", async () => {
        const client = new Client();
        const store = new RedisInstallationStore({ client });
        await store.storeInstallation(installation(user('U1'), bot()));
        const record = client.raw(W);

        await store.storeInstallation(installation(user('U2')));

        assert.strictEqual(client.raw(W), record);
        const forU2 = await store.fetchInstallation(team('U2'));
        assert.strictEqual(forU2.bot?.token, 'xoxb-1');
        assert.deepStrictEqual(plain(forU2.user), plain(user('U2')));
        assert.strictEqual((await store.fetchInstallation(team())).user.token, 'xoxp-U1');
      });

      it('should fetch no user token for a user who never authorized the app', async () => {
        const store = new RedisInstallationStore({ client: new Client() });
        await store.storeInstallation(installation(user('U1'), bot()));

        const fetched = await store.fetchInstallation(team('U3'));
        assert.deepStrictEqual(plain(fetched.user), { id: 'U1' });
        assert.strictEqual(fetched.bot?.token, 'xoxb-1');
      });

      it('should fetch the latest installation of an app without a bot', async () => {
        const client = new Client();
        const store = new RedisInstallationStore({ client });
        await store.storeInstallation(installation(user('U1')));
        await store.storeInstallation(installation(user('U2')));

        assert.strictEqual(client.raw(W), undefined);
        assert.strictEqual((await store.fetchInstallation(team())).user.token, 'xoxp-U2');
        assert.strictEqual((await store.fetchInstallation(team('U1'))).user.token, 'xoxp-U1');
      });

      it('should not change the installation it stores or share objects between fetches', async () => {
        const store = new RedisInstallationStore({ client: new Client() });
        const saved = installation(user('U1'), bot());
        const copy = structuredClone(saved);

        await store.storeInstallation(saved);
        assert.deepStrictEqual(saved, copy);

        const first = await store.fetchInstallation(team());
        if (first.bot) first.bot.token = 'changed';
        assert.strictEqual((await store.fetchInstallation(team())).bot?.token, 'xoxb-1');
      });

      it('should handle null values in installations', async () => {
        const client = new Client();
        const store = new RedisInstallationStore({ client });
        const withNulls = {
          ...installation(user('U1'), bot()),
          enterprise: null,
          user: { id: 'U1', token: 'xoxp-U1', scopes: null },
        } as unknown as Installation;

        await store.storeInstallation(withNulls);
        assert.deepStrictEqual(plain(await store.fetchInstallation(team('U1'))), plain(withNulls));
        assert.strictEqual(
          (await installer(store, async () => invalidRefreshToken).authorize(team())).botToken,
          'xoxb-1',
        );

        await store.storeInstallation({ ...installation(user('U9'), bot()), user: null } as unknown as Installation);
        assert.strictEqual(client.raw(`${W}:user:U9`), undefined);
      });

      it("should delete only a user's token when given a user ID", async () => {
        const store = new RedisInstallationStore({ client: new Client() });
        await store.storeInstallation(installation(user('U1'), bot()));
        await store.storeInstallation(installation(user('U2')));

        await store.deleteInstallation(team('U2'));
        assert.strictEqual((await store.fetchInstallation(team('U2'))).user.token, undefined);
        assert.strictEqual((await store.fetchInstallation(team('U1'))).user.token, 'xoxp-U1');

        await store.deleteInstallation(team('U1'));
        const fetched = await store.fetchInstallation(team());
        assert.strictEqual(fetched.user.token, undefined);
        assert.strictEqual(fetched.bot?.token, 'xoxb-1');
      });

      it('should delete everything of a workspace, more than once, and only for that workspace or org', async () => {
        const client = new Client();
        const store = new RedisInstallationStore({ client });
        await store.storeInstallation(orgInstallation);
        const orgKeys = client.keys();
        await store.storeInstallation(installation(user('U1'), bot()));
        await store.storeInstallation(installation(user('U2')));
        await Promise.all(['U7', 'U8'].map((id) => store.storeInstallation(installation(user(id)))));

        await store.deleteInstallation(team());
        assert.deepStrictEqual(client.keys(), orgKeys);
        await assert.rejects(store.fetchInstallation(team()), /No installation data found/);

        await store.deleteInstallation(team());
        await store.deleteInstallation({ ...team(), teamId: 'T404' });
        await store.deleteInstallation(org('T1'));
        assert.deepStrictEqual(client.keys(), []);
      });

      it('should finish deleting a workspace when a failed delete runs again', async () => {
        const client = new Client();
        const store = new RedisInstallationStore({ client });
        await store.storeInstallation(installation(user('U1'), bot()));
        await store.storeInstallation(installation(user('U2')));
        const del = sinon.stub(client, 'del').callThrough();
        del.withArgs(`${W}:user:U2`).rejects(new Error('Connection lost'));

        await assert.rejects(store.deleteInstallation(team()), /Failed to delete installation/);
        del.restore();
        await store.deleteInstallation(team());

        assert.deepStrictEqual(client.keys(), []);
      });

      describe('when InstallProvider refreshes tokens', async () => {
        it("should save a refreshed bot token without dropping the installer's user token", async () => {
          const client = new Client();
          const store = new RedisInstallationStore({ client });
          await store.storeInstallation(installation(user('U1'), bot('xoxb-1', expiring())));
          const installerRecord = client.raw(`${W}:user:U1`);
          const provider = installer(store, async (refreshToken) =>
            refreshToken === 'xoxe-xoxb-1' ? refreshed('bot', 'xoxb-2') : invalidRefreshToken,
          );

          // U3 never authorized the app, so the lookup has no user token for them.
          const result = await provider.authorize(team('U3'));

          assert.strictEqual(result.botToken, 'xoxb-2');
          assert.strictEqual(result.userToken, undefined);
          assert.strictEqual(JSON.parse(client.raw(W) ?? '').user.id, 'U1');
          assert.strictEqual(client.raw(`${W}:user:U1`), installerRecord);
          assert.strictEqual((await provider.authorize(team())).userToken, 'xoxp-U1');
        });

        it('should keep the installer when another user triggers the refresh', async () => {
          const client = new Client();
          const store = new RedisInstallationStore({ client });
          await store.storeInstallation(installation(user('U1'), bot('xoxb-1', expiring())));
          await store.storeInstallation(installation(user('U2')));
          const provider = installer(store, async () => refreshed('bot', 'xoxb-2'));

          assert.strictEqual((await provider.authorize(team('U2'))).userToken, 'xoxp-U2');

          assert.strictEqual(JSON.parse(client.raw(W) ?? '').user.id, 'U1');
          const result = await provider.authorize(team());
          assert.strictEqual(result.botToken, 'xoxb-2');
          assert.strictEqual(result.userToken, 'xoxp-U1');
        });

        it('should save only the user token when only that one is refreshed', async () => {
          const client = new Client();
          const store = new RedisInstallationStore({ client });
          await store.storeInstallation(installation(user('U1', 'xoxp-1', expiring()), bot()));
          const [record, users] = [client.raw(W), client.raw(`${W}:users`)];
          const provider = installer(store, async () => refreshed('user', 'xoxp-2'));

          assert.strictEqual((await provider.authorize(team('U1'))).userToken, 'xoxp-2');

          assert.strictEqual(client.raw(W), record);
          assert.strictEqual(client.raw(`${W}:users`), users);
          assert.strictEqual(JSON.parse(client.raw(`${W}:user:U1`) ?? '').refreshToken, 'xoxe-xoxp-2');
        });

        it('should not overwrite a token that another request refreshed when its own refresh fails', async () => {
          const client = new Client();
          const store = new RedisInstallationStore({ client });
          await store.storeInstallation(installation(user('U1', 'xoxp-1', expiring()), bot('xoxb-1', expiring())));
          let redeemed = false;
          // Slack accepts a refresh token once, so the second request's bot refresh fails, and its user refresh
          // finishes last, writing back the installation it fetched.
          const provider = installer(store, async (refreshToken) => {
            if (refreshToken === 'xoxe-xoxb-1') {
              if (redeemed) return invalidRefreshToken;
              redeemed = true;
              return refreshed('bot', 'xoxb-2');
            }
            await new Promise((resolve) => setTimeout(resolve, 20));
            return refreshed('user', 'xoxp-2');
          });

          await Promise.all([provider.authorize(team('U3')), provider.authorize(team('U1'))]);

          const record = JSON.parse(client.raw(W) ?? '');
          assert.strictEqual(record.bot.token, 'xoxb-2');
          assert.strictEqual(record.bot.refreshToken, 'xoxe-xoxb-2');
          assert.strictEqual(JSON.parse(client.raw(`${W}:user:U1`) ?? '').token, 'xoxp-2');
        });
      });

      it('should save only what a copy of a fetched installation changed', async () => {
        const client = new Client();
        const store = new RedisInstallationStore({ client });
        await store.storeInstallation(installation(user('U1'), bot()));
        const first = await store.fetchInstallation(team('U1'));
        const second = await store.fetchInstallation(team('U1'));

        // Each copy changes one token. Saving both, in either order, keeps both changes.
        await store.storeInstallation({ ...first, user: { ...first.user, token: 'xoxp-2' } });
        await store.storeInstallation({ ...second, bot: { ...bot(), token: 'xoxb-2' } });
        const saved = await store.fetchInstallation(team('U1'));
        assert.strictEqual(saved.bot?.token, 'xoxb-2');
        assert.strictEqual(saved.user.token, 'xoxp-2');
        const third = await store.fetchInstallation(team('U1'));
        const fourth = await store.fetchInstallation(team('U1'));
        await store.storeInstallation({ ...third, bot: { ...bot(), token: 'xoxb-3' } });
        await store.storeInstallation({ ...fourth, user: { ...fourth.user, token: 'xoxp-3' } });

        const fetched = await store.fetchInstallation(team('U1'));
        assert.strictEqual(fetched.bot?.token, 'xoxb-3');
        assert.strictEqual(fetched.user.token, 'xoxp-3');
      });

      it('should save changes to a fetched installation and copy it into another store', async () => {
        const client = new Client();
        const store = new RedisInstallationStore({ client });
        await store.storeInstallation(installation(user('U1'), bot()));
        await store.storeInstallation(installation(user('U2')));
        const userRecord = client.raw(`${W}:user:U2`);
        const fetched = await store.fetchInstallation(team('U2'));

        await store.storeInstallation({ ...fetched, metadata: 'note' });

        const record = JSON.parse(client.raw(W) ?? '');
        assert.strictEqual(record.metadata, 'note');
        assert.strictEqual(record.user.id, 'U1');
        assert.strictEqual(client.raw(`${W}:user:U2`), userRecord);

        await store.storeInstallation(fetched);
        assert.strictEqual(JSON.parse(client.raw(W) ?? '').metadata, undefined);

        // Saved for another workspace, the copy is a new installation there.
        await store.storeInstallation({ ...(await store.fetchInstallation(team('U2'))), team: { id: 'T2' } });
        assert.strictEqual((await store.fetchInstallation({ ...team('U2'), teamId: 'T2' })).user.token, 'xoxp-U2');
        await store.deleteInstallation({ ...team(), teamId: 'T2' });
        assert.ok(!client.keys().some((key) => key.includes('team:T2')));

        const copy = new RedisInstallationStore({ client: new Client(), keyPrefix: 'copy' });
        await copy.storeInstallation(await store.fetchInstallation(team()));
        assert.deepStrictEqual(
          plain(await copy.fetchInstallation(team())),
          plain(await store.fetchInstallation(team())),
        );
      });
    });
  }

  it('should require the IDs of the installation or query', async () => {
    const client = new FakeRedis();
    const store = new RedisInstallationStore({ client });
    const workspace = /^teamId is required to (save|fetch|delete) data of a workspace installation$/;
    const enterprise = /^enterpriseId is required to (save|fetch|delete) data of an enterprise installation$/;

    await assert.rejects(store.storeInstallation({ ...installation(user('U1')), team: undefined }), {
      message: 'teamId is required to save data of a workspace installation',
    });
    await assert.rejects(store.storeInstallation({ ...orgInstallation, enterprise: undefined } as Installation), {
      message: 'enterpriseId is required to save data of an enterprise installation',
    });
    for (const query of [
      { ...team(), teamId: undefined },
      { ...org(), enterpriseId: undefined },
    ]) {
      const expected = query.isEnterpriseInstall ? enterprise : workspace;
      await assert.rejects(store.fetchInstallation(query as InstallationQuery<boolean>), { message: expected });
      await assert.rejects(store.deleteInstallation(query as InstallationQuery<boolean>), { message: expected });
    }
    assert.deepStrictEqual(client.keys(), []);
  });

  it('should say what it looked for when no installation is found', async () => {
    const store = new RedisInstallationStore({ client: new FakeRedis() });

    await assert.rejects(store.fetchInstallation({ ...team('U1'), teamId: 'T404' }), {
      message: 'No installation data found (enterprise_id: undefined, team_id: T404, user_id: U1)',
    });
  });

  it('should wrap errors from the client, without tokens', async () => {
    const client = new FakeRedis();
    const store = new RedisInstallationStore({ client });
    const error = new Error('READONLY You cannot write against a read only replica.');

    // Like @upstash/redis, which puts the command it sent in its errors.
    const append = sinon
      .stub(client, 'append')
      .rejects(
        new Error('ERR max requests limit exceeded, command was: ["set","k","{\\"token\\":\\"xoxe.xoxp-1-abc\\"}"]'),
      );
    await assert.rejects(store.storeInstallation(installation(user('U1'), bot())), (e: Error) => {
      assert.strictEqual(
        e.message,
        'Failed to save installation to RedisInstallationStore (error: Error: ERR max requests limit exceeded, command was: ["set","k","{\\"token\\":\\"[redacted]\\"}"])',
      );
      assert.strictEqual(e.cause, undefined);
      return true;
    });
    // The installation was still saved, so the bot keeps working, and the user's token wasn't saved unindexed.
    assert.strictEqual((await store.fetchInstallation(team())).bot?.token, 'xoxb-1');
    assert.strictEqual(client.raw(`${W}:user:U1`), undefined);
    append.restore();

    sinon.stub(client, 'get').rejects(error);
    await assert.rejects(store.fetchInstallation(team()), (e: Error) => {
      assert.strictEqual(e.message, `Failed to fetch installation from RedisInstallationStore (error: ${error})`);
      assert.strictEqual(e.cause, error);
      return true;
    });
    await assert.rejects(store.deleteInstallation(team()), (e: Error) => {
      assert.strictEqual(e.message, `Failed to delete installation from RedisInstallationStore (error: ${error})`);
      assert.strictEqual(e.cause, error);
      return true;
    });
  });

  it("should reject values that aren't installations", async () => {
    const client = new FakeRedis();
    const store = new RedisInstallationStore({ client });

    await client.set(W, 'not JSON');
    await assert.rejects(store.fetchInstallation(team()), /slack:installation:team:T1 doesn't hold JSON/);
    await client.set(W, '[]');
    await assert.rejects(store.fetchInstallation(team()), /slack:installation:team:T1 doesn't hold an installation/);
    sinon.stub(client, 'get').resolves(undefined);
    await assert.rejects(store.fetchInstallation(team()), /resolved undefined from get\(\)/);
  });

  it('should log only at the debug level, without tokens', async () => {
    const logger = spyLogger();
    const store = new RedisInstallationStore({ client: new FakeRedis() });

    await store.storeInstallation(installation(user('U1'), bot()), logger);
    await store.fetchInstallation(team('U1'), logger);
    await store.deleteInstallation(team(), logger);

    assert.ok(logger.debug.called);
    assert.ok(logger.info.notCalled && logger.warn.notCalled && logger.error.notCalled);
    assert.doesNotMatch(JSON.stringify(logger.debug.args), /xox/);
  });
});
