import type { Installation, InstallationQuery, InstallationStore } from '../index';
import type { Logger } from '../logger';

/**
 * @description The Redis commands that `RedisInstallationStore` uses. The clients from `redis` (node-redis v4 and
 * later), `ioredis`, `iovalkey` and `@upstash/redis` match this interface as they are, so you can pass one directly.
 * Every call uses a single key, so the store also works with Redis Cluster.
 * @see {@link https://docs.slack.dev/tools/node-slack-sdk/oauth/#using-redisinstallationstore Using RedisInstallationStore}
 */
export interface RedisInstallationStoreClient {
  /**
   * @description Resolves the value at `key`, or `null` when there is none. A string, bytes, or a value the client
   * already parsed as JSON (like `@upstash/redis` does) all work.
   */
  get(key: string): Promise<unknown>;
  /** @description Sets the value at `key`. */
  set(key: string, value: string): Promise<unknown>;
  /** @description Deletes `key`. */
  del(key: string): Promise<unknown>;
  /** @description Appends `value` to the value at `key`, creating it when there is none. */
  append(key: string, value: string): Promise<unknown>;
}

/**
 * @description Options for `RedisInstallationStore`.
 * @see {@link https://docs.slack.dev/tools/node-slack-sdk/oauth/#using-redisinstallationstore Using RedisInstallationStore}
 */
export interface RedisInstallationStoreOptions {
  /** @description A connected Redis client. You create, connect and close it. */
  client: RedisInstallationStoreClient;
  /** @description The start of every key the store uses. Defaults to `slack:installation`. */
  keyPrefix?: string;
  /** @description Your app's client ID, to keep the installations of apps that share one Redis apart. */
  clientId?: string;
}

// What the store last read or wrote for an installation, kept by the installation's user and bot objects.
// InstallProvider#authorize() saves refreshed tokens on a copy of what fetchInstallation() returned that keeps those
// objects, so the store can tell who installed the app and which records changed.
interface Saved {
  key: string;
  installerId: string | undefined;
  workspace: string;
  userId: string | undefined;
  user: string | undefined;
}

type Action = 'save' | 'fetch' | 'delete';

/**
 * @description An installation store that saves installations in Redis, with any client that matches
 * `RedisInstallationStoreClient`. For each workspace, or for each organization with org-wide installs, it keeps:
 *
 * - `<keyPrefix>[:<clientId>]:team:<teamId>` (or `:enterprise:<enterpriseId>`): the latest installation with a bot,
 *   without user tokens
 * - `<…>:nobot`: the latest installation without a bot, for apps that only request user scopes
 * - `<…>:user:<userId>`: the user token of each user who authorized the app
 * - `<…>:users`: the IDs of those users, so deleting a workspace deletes their tokens too
 *
 * A lookup with a user ID gets that user's token, or no user token when that user never authorized the app. A lookup
 * without one gets the token of the user who installed the app.
 * @example
 * import { InstallProvider, RedisInstallationStore } from '@slack/oauth';
 * import { createClient } from 'redis';
 *
 * const client = createClient({ url: process.env.REDIS_URL });
 * await client.connect();
 * const installer = new InstallProvider({
 *   clientId: process.env.SLACK_CLIENT_ID,
 *   clientSecret: process.env.SLACK_CLIENT_SECRET,
 *   stateSecret: process.env.SLACK_STATE_SECRET,
 *   installationStore: new RedisInstallationStore({ client, clientId: process.env.SLACK_CLIENT_ID }),
 * });
 * @see {@link https://docs.slack.dev/tools/node-slack-sdk/oauth/#using-redisinstallationstore Using RedisInstallationStore}
 */
export default class RedisInstallationStore implements InstallationStore {
  private readonly client: RedisInstallationStoreClient;

  private readonly keyPrefix: string;

  private readonly saved = new WeakMap<object, Saved>();

  public constructor(options: RedisInstallationStoreOptions) {
    const { client, keyPrefix = 'slack:installation', clientId } = options;
    if (!(['get', 'set', 'del', 'append'] as const).every((method) => typeof client?.[method] === 'function')) {
      throw new TypeError('RedisInstallationStore needs a Redis client with get(), set(), del() and append() methods');
    }
    this.client = client;
    this.keyPrefix = clientId !== undefined ? `${keyPrefix}:${clientId}` : keyPrefix;
  }

  public async storeInstallation(installation: Installation, logger?: Logger): Promise<void> {
    const { isEnterpriseInstall, enterprise, team, bot, user } = installation;
    const keys = this.keysFor(isEnterpriseInstall, enterprise?.id, team?.id, 'save');
    const saved = this.savedFor(installation, keys.workspace);

    // Saving what fetchInstallation() returned, like a token refresh does, keeps the user who installed the app.
    const installerId = saved ? saved.installerId : user?.id;
    const workspace = JSON.stringify({ ...installation, user: { id: installerId } });
    const record = user?.token ? JSON.stringify(user) : undefined;
    const writes: (() => Promise<unknown>)[] = [];

    // Records that didn't change aren't written, so a request whose refresh of one token failed doesn't overwrite
    // the token that another request just refreshed.
    if (workspace !== saved?.workspace) {
      // An installation without a bot, like an authorization with only user scopes, never replaces one with a bot.
      const key = bot ? keys.workspace : keys.noBot;
      writes.push(() => this.client.set(key, workspace));
    }
    if (user && record !== undefined) {
      const key = keys.user(user.id);
      if (saved === undefined || saved.userId !== user.id) {
        // Index the user before saving their token, so deleting the workspace can't miss it. The index only grows,
        // and deleting the workspace skips the IDs it lists twice.
        writes.push(async () => {
          await this.client.append(keys.users, `,${user.id}`);
          await this.client.set(key, record);
        });
      } else if (record !== saved.user) {
        writes.push(() => this.client.set(key, record));
      }
    }

    logger?.debug(`Saving ${writes.length} record(s) of the installation at ${keys.workspace}`);
    const results = await Promise.allSettled(writes.map(async (write) => write()));
    const failure = results.find((result): result is PromiseRejectedResult => result.status === 'rejected');
    if (failure !== undefined) {
      // The client's error isn't kept as the cause, since some clients keep the command they sent, tokens included,
      // in their errors.
      throw new Error(`Failed to save installation to RedisInstallationStore (error: ${redact(failure.reason)})`);
    }
    this.remember(installation, {
      key: keys.workspace,
      installerId,
      workspace,
      userId: record !== undefined ? user?.id : saved?.userId,
      user: record ?? saved?.user,
    });
  }

  public async fetchInstallation(query: InstallationQuery<boolean>, logger?: Logger): Promise<Installation> {
    const { enterpriseId, teamId, userId, isEnterpriseInstall } = query;
    const keys = this.keysFor(isEnterpriseInstall, enterpriseId, teamId, 'fetch');
    logger?.debug(`Fetching installation from ${keys.workspace} with the following query: ${JSON.stringify(query)}`);

    let installation: Installation | undefined;
    try {
      const [withBot, requester] = await Promise.all([
        this.read(keys.workspace),
        userId ? this.read(keys.user(userId)) : undefined,
      ]);
      const workspace = (withBot ?? (await this.read(keys.noBot))) as Installation | undefined;
      if (workspace !== undefined) {
        const installerId = workspace.user?.id;
        // Only a user who authorized the app gets a user token. A lookup without a user gets the installer's, like
        // with FileInstallationStore.
        let user = requester;
        if (!userId && installerId) {
          user = await this.read(keys.user(installerId));
        }
        const fetched = { ...workspace, user: user ?? { id: installerId } } as Installation;
        this.remember(fetched, {
          key: keys.workspace,
          installerId,
          workspace: JSON.stringify({ ...workspace, user: { id: installerId } }),
          userId: user?.id as string | undefined,
          user: user && JSON.stringify(user),
        });
        installation = fetched;
      }
    } catch (error) {
      throw new Error(`Failed to fetch installation from RedisInstallationStore (error: ${error})`, { cause: error });
    }

    if (installation === undefined) {
      throw new Error(
        `No installation data found (enterprise_id: ${enterpriseId}, team_id: ${teamId}, user_id: ${userId})`,
      );
    }
    return installation;
  }

  public async deleteInstallation(query: InstallationQuery<boolean>, logger?: Logger): Promise<void> {
    const { enterpriseId, teamId, userId, isEnterpriseInstall } = query;
    const keys = this.keysFor(isEnterpriseInstall, enterpriseId, teamId, 'delete');
    logger?.debug(`Deleting installation at ${keys.workspace} with the following query: ${JSON.stringify(query)}`);

    try {
      if (userId !== undefined) {
        await this.client.del(keys.user(userId));
        return;
      }
      const users = decode(await this.client.get(keys.users));
      const userIds = new Set(users === null ? [] : String(users).split(',').filter(Boolean));
      await Promise.all([...userIds].map((id) => this.client.del(keys.user(id))));
      // The installation goes last, so a delete that fails partway can run again.
      await this.client.del(keys.users);
      await this.client.del(keys.noBot);
      await this.client.del(keys.workspace);
    } catch (error) {
      throw new Error(`Failed to delete installation from RedisInstallationStore (error: ${error})`, { cause: error });
    }
  }

  private savedFor({ user, bot }: Installation, key: string): Saved | undefined {
    const saved = (user && this.saved.get(user)) || (bot && this.saved.get(bot)) || undefined;
    return saved?.key === key ? saved : undefined;
  }

  private remember({ user, bot }: Installation, saved: Saved): void {
    for (const part of [user, bot]) {
      if (typeof part === 'object' && part !== null) {
        this.saved.set(part, saved);
      }
    }
  }

  private keysFor(
    isEnterpriseInstall: boolean | undefined,
    enterpriseId: string | undefined,
    teamId: string | undefined,
    action: Action,
  ) {
    let id: string;
    if (isEnterpriseInstall) {
      if (!enterpriseId) {
        throw new Error(`enterpriseId is required to ${action} data of an enterprise installation`);
      }
      id = `enterprise:${enterpriseId}`;
    } else {
      if (!teamId) {
        throw new Error(`teamId is required to ${action} data of a workspace installation`);
      }
      id = `team:${teamId}`;
    }
    const workspace = `${this.keyPrefix}:${id}`;
    return {
      workspace,
      noBot: `${workspace}:nobot`,
      users: `${workspace}:users`,
      user: (userId: string) => `${workspace}:user:${userId}`,
    };
  }

  private async read(key: string): Promise<Record<string, unknown> | undefined> {
    const value = decode(await this.client.get(key));
    if (value === null) {
      return undefined;
    }
    if (value === undefined) {
      throw new TypeError(
        'The Redis client resolved undefined from get(). RedisInstallationStore needs a client whose commands return promises, which resolve null for a missing key.',
      );
    }
    let record = value;
    if (typeof value === 'string') {
      try {
        record = JSON.parse(value);
      } catch {
        throw new Error(`${key} doesn't hold JSON`);
      }
    }
    if (typeof record !== 'object' || record === null || Array.isArray(record)) {
      throw new TypeError(`${key} doesn't hold an installation`);
    }
    return record as Record<string, unknown>;
  }
}

// Some clients, like @upstash/redis, put the command they sent in their error messages.
function redact(error: unknown): string {
  return String(error).replace(/xox[a-z.]*-[\w.-]+/gi, '[redacted]');
}

// Some clients return bytes instead of strings.
function decode(value: unknown): unknown {
  return value instanceof Uint8Array ? new TextDecoder().decode(value) : value;
}
