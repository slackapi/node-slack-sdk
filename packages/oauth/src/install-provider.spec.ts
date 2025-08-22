import url from 'node:url';
import { assert } from 'chai';
import rewiremock from 'rewiremock';
import sinon from 'sinon';

// Stub WebClient api calls that the OAuth package makes
rewiremock(() => require('@slack/web-api')).with({
  // @ts-expect-error: missing some irrelevant class properties in this mock
  WebClient: class {
    auth = {
      test: sinon.fake.resolves({ bot_id: '' }),
    };
    oauth = {
      access: sinon.fake.resolves({
        team_id: 'fake-v1-team-id',
        team_name: 'fake-team-name',
        access_token: 'token',
        bot: {
          bot_access_token: 'botAccessToken',
          bot_user_id: 'botUserId',
        },
        scope: 'bot',
        appId: 'fakeAppId',
      }),
      v2: {
        access: async (options: OAuthV2AccessArguments) => {
          return mockedV2AccessResp(options);
        },
      },
    };
  },
});
rewiremock.enable();

import {
  type CallbackOptions,
  type Installation,
  type InstallationStore,
  type InstallPathOptions,
  InstallProvider,
  type StateStore,
} from './index';

rewiremock.disable();

import type { OAuthV2AccessArguments, OauthV2AccessResponse, WebClientOptions } from '@slack/web-api';
import {
  type AuthorizationError,
  ErrorCode,
  type GenerateInstallUrlError,
  type InstallerInitializationError,
} from './errors';
import { type Logger, LogLevel } from './logger';

const webClientOptions: WebClientOptions = { timeout: 1000 };

async function mockedV2AccessResp(options: OAuthV2AccessArguments): Promise<OauthV2AccessResponse> {
  const mockedResp: OauthV2AccessResponse = {
    ok: true,
    team: { id: 'fake-v2-team-id', name: 'fake-team-name' },
    access_token: 'botToken',
    bot_user_id: 'botUserId',
    scope: 'chat:write,chat:read',
    app_id: 'fakeAppId',
    enterprise: undefined,
    token_type: 'bot',
  };

  // Token rotation payload has different shape than "normal" v2 access response
  // See OAuthV2Response vs. OAuthV2TokenRefreshResponse for details
  if (options.grant_type === 'refresh_token') {
    mockedResp.refresh_token = 'newRefreshToken';
    mockedResp.expires_in = 43200; // 12 hours

    if (options.refresh_token?.startsWith('user')) {
      mockedResp.token_type = 'user';
    }
  } else {
    mockedResp.authed_user = { id: 'userId', access_token: 'userAccessToken' };
  }

  return Promise.resolve(mockedResp);
}

const clientSecret = 'MY_SECRET';
const clientId = 'MY_ID';
const stateSecret = 'stateSecret';

// Memory database
const devDB: Record<string, Installation> = {};

// MemoryInstallation Store for testing
const installationStore: InstallationStore = {
  storeInstallation: (installation) => {
    const id = installation.team?.id || installation.enterprise?.id;
    if (!id) return Promise.reject('no team or enterprise ID found!');
    // db write
    devDB[id] = installation;
    return Promise.resolve();
  },
  fetchInstallation: (installQuery) => {
    const id = installQuery.teamId || installQuery.enterpriseId;
    if (!id) return Promise.reject('no team or enterprise ID found!');
    // db read
    const item = devDB[id];
    return Promise.resolve(item);
  },
  deleteInstallation: (installQuery) => {
    const id = installQuery.teamId || installQuery.enterpriseId;
    if (!id) return Promise.reject('no team or enterprise ID found!');
    // db delete
    delete devDB[id];
    return Promise.resolve();
  },
};

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
    scopes: [],
  },
  incomingWebhook: {
    url: 'example.com',
    channel: 'someChannel',
    channelId: 'someChannelID',
    configurationUrl: 'someConfigURL',
  },
  appId: 'fakeAppId',
  tokenType: 'bot' as const,
  isEnterpriseInstall: false,
};

// TODO: valid tests with org-wide installations
const storedOrgInstallation = {
  team: undefined,
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
    scopes: [],
  },
  incomingWebhook: {
    url: 'example.com',
    channel: 'someChannel',
    channelId: 'someChannelID',
    configurationUrl: 'someConfigURL',
  },
  appId: undefined,
  tokenType: 'bot' as const,
  isEnterpriseInstall: true,
};

// store our fake installation Object to the memory database.
devDB[storedInstallation.team.id] = storedInstallation;
devDB[storedOrgInstallation.enterprise.id] = storedOrgInstallation;

describe('InstallProvider', async () => {
  const noopLogger: Logger = {
    debug(..._msg) {
      /* noop */
    },
    info(..._msg) {
      /* noop */
    },
    warn(..._msg) {
      /* noop */
    },
    error(..._msg) {
      /* noop */
    },
    setLevel(_level) {
      /* noop */
    },
    getLevel() {
      return LogLevel.DEBUG;
    },
    setName(_name) {
      /* noop */
    },
  };

  describe('constructor()', async () => {
    it('should build a default installer given a clientID, client secret and stateSecret', async () => {
      const installer = new InstallProvider({ clientId, clientSecret, stateSecret, logger: noopLogger });
      assert.instanceOf(installer, InstallProvider);
      assert.propertyVal(installer, 'authVersion', 'v2');
    });

    it('should build a default installer given a clientID, client secret, stateSecret and clientOptions', async () => {
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        stateSecret,
        logger: noopLogger,
        clientOptions: webClientOptions,
      });
      assert.instanceOf(installer, InstallProvider);
      assert.propertyVal(installer, 'authVersion', 'v2');
      assert.nestedPropertyVal(installer, 'clientOptions.timeout', webClientOptions.timeout);
    });

    it('should build a default installer given a clientID, client secret and state store', async () => {
      // stateStore for testing
      const fakeStateStore = {
        generateStateParam: sinon.fake.resolves('fakeState'),
        verifyStateParam: sinon.fake.resolves({}),
      };

      const installer = new InstallProvider({ clientId, clientSecret, stateStore: fakeStateStore, logger: noopLogger });
      assert.instanceOf(installer, InstallProvider);
    });

    it('should build a default installer given a clientID, client secret, stateSecrect and installationStore', async () => {
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        stateSecret,
        installationStore,
        logger: noopLogger,
      });
      assert.instanceOf(installer, InstallProvider);
    });

    it('should build a default installer given a clientID, client secret, stateSecrect and authVersion v2', async () => {
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        stateSecret,
        authVersion: 'v2',
        logger: noopLogger,
      });
      assert.instanceOf(installer, InstallProvider);
      assert.propertyVal(installer, 'authVersion', 'v2');
    });

    it('should build a default installer given a clientID, client secret, stateSecrect and authVersion v1', async () => {
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        stateSecret,
        authVersion: 'v1',
        logger: noopLogger,
      });
      assert.instanceOf(installer, InstallProvider);
      assert.propertyVal(installer, 'authVersion', 'v1');
    });

    it('should throw an error if missing a clientSecret', async () => {
      try {
        // @ts-expect-error missing required arguments
        new InstallProvider({ clientId, stateSecret, logger: noopLogger });
        assert.fail('expected rejection');
      } catch (error) {
        const e = error as InstallerInitializationError;
        assert.equal(e.code, ErrorCode.InstallerInitializationError);
        assert.equal(e.message, 'You must provide a valid clientId and clientSecret');
      }
    });

    it('should throw an error if missing a clientID', async () => {
      try {
        // @ts-expect-error missing required arguments
        new InstallProvider({ clientSecret, stateSecret, logger: noopLogger });
        assert.fail('expected rejection');
      } catch (error) {
        const e = error as InstallerInitializationError;
        assert.equal(e.code, ErrorCode.InstallerInitializationError);
        assert.equal(e.message, 'You must provide a valid clientId and clientSecret');
      }
    });

    it('should throw an error if missing a stateSecret when using default state store', async () => {
      try {
        new InstallProvider({ clientId, clientSecret, logger: noopLogger });
        assert.fail('expected rejection');
      } catch (error) {
        const e = error as InstallerInitializationError;
        assert.equal(e.code, ErrorCode.InstallerInitializationError);
        assert.equal(e.message, 'To use the built-in state store you must provide a State Secret');
      }
    });
  });

  describe('installer.handleInstallPath', async () => {
    it('should fail if installUrlOptions are not given', async () => {
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        installUrlOptions: undefined,
        stateStore: {
          generateStateParam: sinon.fake.resolves('fakeState'),
          verifyStateParam: sinon.fake.resolves({ scopes: [] }),
        },
        logger: noopLogger,
      });
      const req = {};
      const headers: Record<string, string> = {};
      const res = {
        getHeader(n: string) {
          return headers[n];
        },
        setHeader(n: string, v: string) {
          headers[n] = v;
        },
        writeHead: () => {},
        end: () => {},
      };
      try {
        // @ts-expect-error req is not an instance of IncomingMessage, TODO: type or stub IncomingMessage for req properly
        await installer.handleInstallPath(req, res);
        assert.fail('Exception should be thrown');
      } catch (error) {
        const e = error as GenerateInstallUrlError;
        assert.equal(e.code, ErrorCode.GenerateInstallUrlError);
      }
    });

    const installUrlOptions = {
      scopes: ['channels:read'],
      teamId: 'T12345',
      redirectUri: 'https://mysite.com/slack/redirect',
      userScopes: ['chat:write:user'],
      metadata: 'foo',
    };

    it('should redirect installers to valid authorize URL with state param', async () => {
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        installUrlOptions,
        directInstall: true,
        stateStore: {
          generateStateParam: sinon.fake.resolves('fakeState'),
          verifyStateParam: sinon.fake.resolves({ scopes: [] }),
        },
        logger: noopLogger,
      });
      const req = {};
      const headers: Record<string, string> = {};
      const res = {
        getHeader(n: string) {
          return headers[n];
        },
        setHeader(n: string, v: string) {
          headers[n] = v;
        },
        writeHead: () => {},
        end: () => {},
      };
      // @ts-expect-error req is not an instance of IncomingMessage, TODO: type or stub IncomingMessage for req properly
      await installer.handleInstallPath(req, res);

      assert.equal(
        headers.Location,
        'https://slack.com/oauth/v2/authorize?scope=channels%3Aread&state=fakeState&client_id=MY_ID&redirect_uri=https%3A%2F%2Fmysite.com%2Fslack%2Fredirect&team=T12345&user_scope=chat%3Awrite%3Auser',
      );
      assert.equal(headers['Set-Cookie'], 'slack-app-oauth-state=fakeState; Secure; HttpOnly; Path=/; Max-Age=600');
    });
    it('should redirect installers with data set by InstallPathOptions.beforeRedirection()', async () => {
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        installUrlOptions,
        directInstall: true,
        stateStore: {
          generateStateParam: sinon.fake.resolves('fakeState'),
          verifyStateParam: sinon.fake.resolves({ scopes: [] }),
        },
        logger: noopLogger,
      });
      const req = {};
      const headers: Record<string, string> = {};
      const res = {
        getHeader(n: string) {
          return headers[n];
        },
        setHeader(n: string, v: string) {
          headers[n] = v;
        },
        writeHead: () => {},
        end: () => {},
      };
      const installPathOptions: InstallPathOptions = {
        beforeRedirection: async (_, res) => {
          res.setHeader('Set-Cookie', 'additional-cookie=external-service-user-id; Secure; HttpOnly;');
          return true;
        },
      };
      // @ts-expect-error req is not an instance of IncomingMessage, TODO: type or stub IncomingMessage for req properly
      await installer.handleInstallPath(req, res, installPathOptions);

      assert.equal(
        headers.Location,
        'https://slack.com/oauth/v2/authorize?scope=channels%3Aread&state=fakeState&client_id=MY_ID&redirect_uri=https%3A%2F%2Fmysite.com%2Fslack%2Fredirect&team=T12345&user_scope=chat%3Awrite%3Auser',
      );
      assert.equal(headers['Set-Cookie'][0], 'additional-cookie=external-service-user-id; Secure; HttpOnly;');
      assert.equal(headers['Set-Cookie'][1], 'slack-app-oauth-state=fakeState; Secure; HttpOnly; Path=/; Max-Age=600');
    });
  });

  describe('installer.generateInstallUrl', async () => {
    it('should return a generated v2 url', async () => {
      const fakeStateStore = {
        generateStateParam: sinon.fake.resolves('fakeState'),
        verifyStateParam: sinon.fake.resolves({}),
      };
      const installer = new InstallProvider({ clientId, clientSecret, stateStore: fakeStateStore, logger: noopLogger });
      const scopes = ['channels:read'];
      const teamId = '1234Team';
      const redirectUri = 'https://mysite.com/slack/redirect';
      const userScopes = ['chat:write:user'];
      const stateVerification = true;
      const installUrlOptions = {
        scopes,
        metadata: 'some_metadata',
        teamId,
        redirectUri,
        userScopes,
      };
      try {
        const generatedUrl = await installer.generateInstallUrl(installUrlOptions, stateVerification);
        assert.exists(generatedUrl);
        assert.equal(fakeStateStore.generateStateParam.callCount, 1);
        assert.equal(fakeStateStore.verifyStateParam.callCount, 0);
        assert.equal(fakeStateStore.generateStateParam.calledWith(installUrlOptions), true);

        const parsedUrl = url.parse(generatedUrl, true);
        assert.equal(parsedUrl.query.state, 'fakeState');
        assert.equal(parsedUrl.pathname, '/oauth/v2/authorize');
        assert.equal(scopes.join(','), parsedUrl.query.scope);
        assert.equal(redirectUri, parsedUrl.query.redirect_uri);
        assert.equal(teamId, parsedUrl.query.team);
        assert.equal(userScopes.join(','), parsedUrl.query.user_scope);
      } catch (error) {
        assert.fail((error as Error).message);
      }
    });
    it('should not call generate state param when state validation is false', async () => {
      const fakeStateStore = {
        generateStateParam: sinon.fake.resolves('fakeState'),
        verifyStateParam: sinon.fake.resolves({}),
      };
      const authorizationUrl = 'https://dev.slack.com/oauth/v2/authorize';
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        stateStore: fakeStateStore,
        authorizationUrl,
        logger: noopLogger,
      });
      const scopes = ['channels:read'];
      const teamId = '1234Team';
      const redirectUri = 'https://mysite.com/slack/redirect';
      const userScopes = ['chat:write:user'];
      const stateVerification = false;
      const installUrlOptions = {
        scopes,
        metadata: 'some_metadata',
        teamId,
        redirectUri,
        userScopes,
      };
      try {
        const generatedUrl = await installer.generateInstallUrl(installUrlOptions, stateVerification);
        assert.exists(generatedUrl);
        assert.equal(fakeStateStore.generateStateParam.callCount, 0);
        assert.equal(fakeStateStore.verifyStateParam.callCount, 0);
      } catch (error) {
        assert.fail((error as Error).message);
      }
    });
    it('should return a generated url when passed a custom authorizationUrl', async () => {
      const fakeStateStore = {
        generateStateParam: sinon.fake.resolves('fakeState'),
        verifyStateParam: sinon.fake.resolves({}),
      };
      const authorizationUrl = 'https://dev.slack.com/oauth/v2/authorize';
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        stateStore: fakeStateStore,
        authorizationUrl,
        logger: noopLogger,
      });
      const scopes = ['channels:read'];
      const teamId = '1234Team';
      const redirectUri = 'https://mysite.com/slack/redirect';
      const userScopes = ['chat:write:user'];
      const installUrlOptions = {
        scopes,
        metadata: 'some_metadata',
        teamId,
        redirectUri,
        userScopes,
      };
      try {
        const generatedUrl = await installer.generateInstallUrl(installUrlOptions);
        assert.exists(generatedUrl);
        assert.equal(fakeStateStore.generateStateParam.callCount, 1);
        assert.equal(fakeStateStore.verifyStateParam.callCount, 0);
        assert.equal(fakeStateStore.generateStateParam.calledWith(installUrlOptions), true);

        const parsedUrl = url.parse(generatedUrl, true);
        assert.equal(parsedUrl.query.state, 'fakeState');
        assert.equal(parsedUrl.pathname, '/oauth/v2/authorize');
        assert.equal(parsedUrl.host, 'dev.slack.com');
        assert.equal(scopes.join(','), parsedUrl.query.scope);
        assert.equal(redirectUri, parsedUrl.query.redirect_uri);
        assert.equal(teamId, parsedUrl.query.team);
        assert.equal(userScopes.join(','), parsedUrl.query.user_scope);
      } catch (error) {
        assert.fail((error as Error).message);
      }
    });

    it('should return a generated v1 url', async () => {
      const fakeStateStore = {
        generateStateParam: sinon.fake.resolves('fakeState'),
        verifyStateParam: sinon.fake.resolves({}),
      };
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        stateStore: fakeStateStore,
        authVersion: 'v1',
        logger: noopLogger,
      });
      const scopes = ['bot'];
      const teamId = '1234Team';
      const redirectUri = 'https://mysite.com/slack/redirect';
      const stateVerification = true;
      const installUrlOptions = {
        scopes,
        metadata: 'some_metadata',
        teamId,
        redirectUri,
      };
      try {
        const generatedUrl = await installer.generateInstallUrl(installUrlOptions, stateVerification);
        assert.exists(generatedUrl);
        const parsedUrl = url.parse(generatedUrl, true);
        assert.equal(fakeStateStore.generateStateParam.callCount, 1);
        assert.equal(fakeStateStore.verifyStateParam.callCount, 0);
        assert.equal(fakeStateStore.generateStateParam.calledWith(installUrlOptions), true);
        assert.equal(parsedUrl.pathname, '/oauth/authorize');
        assert.equal(parsedUrl.query.state, 'fakeState');
        assert.equal(scopes.join(','), parsedUrl.query.scope);
        assert.equal(redirectUri, parsedUrl.query.redirect_uri);
        assert.equal(teamId, parsedUrl.query.team);
      } catch (error) {
        assert.fail((error as Error).message);
      }
    });

    it('should fail if missing scopes', async () => {
      const installer = new InstallProvider({ clientId, clientSecret, stateSecret, logger: noopLogger });
      try {
        const generatedUrl = await installer.generateInstallUrl({ scopes: [] });
        assert.exists(generatedUrl);
      } catch (error) {
        const e = error as GenerateInstallUrlError;
        assert.equal(e.message, 'You must provide a scope parameter when calling generateInstallUrl');
        assert.equal(e.code, ErrorCode.GenerateInstallUrlError);
      }
    });
  });

  describe('installer.authorize', async () => {
    it('should fail if database does not have an entry for authorize query', async () => {
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        stateSecret,
        installationStore,
        logger: noopLogger,
      });
      try {
        await installer.authorize({
          teamId: 'non_existing_team_id',
          isEnterpriseInstall: false,
          enterpriseId: undefined,
        });
        assert.fail('Should have failed');
      } catch (error) {
        const e = error as AuthorizationError;
        assert.equal(e.code, ErrorCode.AuthorizationError);
        assert.equal(
          e.message,
          'Failed fetching data from the Installation Store (source: {"teamId":"non_existing_team_id","isEnterpriseInstall":false})',
        );
      }
    });

    it('should successfully return the Installation Object from the database', async () => {
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        stateSecret,
        installationStore,
        logger: noopLogger,
      });
      const fakeAuthResult = {
        userToken: 'userToken',
        botToken: 'botToken',
        botId: 'botId',
        botUserId: 'botUserId',
      };

      try {
        const authResult = await installer.authorize({
          teamId: 'test-team-id',
          isEnterpriseInstall: false,
          enterpriseId: undefined,
        });
        assert.equal(authResult.userToken, fakeAuthResult.userToken);
        assert.equal(authResult.botToken, fakeAuthResult.botToken);
        assert.equal(authResult.botId, fakeAuthResult.botId);
        assert.equal(authResult.botUserId, fakeAuthResult.botUserId);
      } catch (error) {
        assert.fail((error as Error).message);
      }
    });
  });

  describe('installer.handleCallback', async () => {
    let fakeStateStore: StateStore;
    let sent = false;
    const res = {
      end: () => {
        sent = true;
      },
      setHeader: () => {},
    };
    beforeEach(() => {
      fakeStateStore = {
        generateStateParam: sinon.fake.resolves('fakeState'),
        verifyStateParam: sinon.fake.resolves({ scopes: [] }),
      };
      sent = false;
    });

    it('should call the failure callback with a valid installOptions due to missing code query parameter on the URL', async () => {
      const req = { headers: { host: 'example.com' }, url: 'http://example.com' };
      const callbackOptions: CallbackOptions = {
        success: async (_installation, _installOptions, _req, res) => {
          res.end('successful!');
          assert.fail('should have failed');
        },
        failure: async (error, installOptions, _req, res) => {
          // To detect future regressions, we verify if there is a valid installOptions here
          // Refer to https://github.com/slackapi/node-slack-sdk/pull/1410 for the context
          assert.isDefined(installOptions);
          assert.equal(error.code, ErrorCode.MissingCodeError);
          res.end('failure');
        },
      };
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        stateSecret,
        installationStore,
        logger: noopLogger,
      });
      // @ts-expect-error req is not an instance of IncomingMessage, TODO: type or stub IncomingMessage for req properly
      await installer.handleCallback(req, res, callbackOptions);

      assert.isTrue(sent);
    });
    it('should call the failure callback due to missing state query parameter on the URL', async () => {
      const req = {
        headers: {
          host: 'example.com',
          cookie: 'slack-app-oauth-state=fakeState',
        },
        url: 'http://example.com?code=1234',
      };
      const callbackOptions: CallbackOptions = {
        success: async (_installation, _installOptions, _req, res) => {
          res.end('successful!');
          assert.fail('should have failed');
        },
        failure: async (error, installOptions, _req, res) => {
          assert.isDefined(installOptions);
          assert.equal(error.code, ErrorCode.MissingStateError);
          res.end('failure');
        },
      };
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        stateSecret,
        installationStore,
        logger: noopLogger,
      });
      // @ts-expect-error req is not an instance of IncomingMessage, TODO: type or stub IncomingMessage for req properly
      await installer.handleCallback(req, res, callbackOptions);

      assert.isTrue(sent);
    });

    it('should call the success callback when state query param is missing but stateVerification disabled', async () => {
      const req = { headers: { host: 'example.com' }, url: 'http://example.com?code=1234' };
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        stateSecret,
        stateVerification: false,
        installationStore,
        logger: noopLogger,
      });
      // @ts-expect-error req is not an instance of IncomingMessage, TODO: type or stub IncomingMessage for req properly
      await installer.handleCallback(req, res, successExpectedCallbackOptions);
      assert.isTrue(sent);
    });

    it('should call the failure callback if an access_denied error query parameter was returned on the URL', async () => {
      const req = { headers: { host: 'example.com' }, url: 'http://example.com?error=access_denied' };
      const callbackOptions: CallbackOptions = {
        success: async (_installation, _installOptions, _req, res) => {
          res.end('successful!');
          assert.fail('should have failed');
        },
        failure: async (error, installOptions, _req, res) => {
          assert.isDefined(installOptions);
          assert.equal(error.code, ErrorCode.AuthorizationError);
          res.end('failure');
        },
      };
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        stateSecret,
        installationStore,
        logger: noopLogger,
      });
      // @ts-expect-error req is not an instance of IncomingMessage, TODO: type or stub IncomingMessage for req properly
      await installer.handleCallback(req, res, callbackOptions);

      assert.isTrue(sent);
    });

    it('should call the success callback for a v2 url', async () => {
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        installationStore,
        stateStore: fakeStateStore,
        logger: noopLogger,
      });
      const fakeState = 'fakeState';
      const fakeCode = 'fakeCode';
      const req = {
        headers: {
          host: 'example.com',
          cookie: `slack-app-oauth-state=${fakeState}`,
        },
        url: `http://example.com?state=${fakeState}&code=${fakeCode}`,
      };
      // @ts-expect-error req is not an instance of IncomingMessage, TODO: type or stub IncomingMessage for req properly
      await installer.handleCallback(req, res, successExpectedCallbackOptions);
      assert.isTrue(sent);
      assert.equal((fakeStateStore.verifyStateParam as sinon.SinonSpy).callCount, 1);
    });

    it('should call the success callback for a v2 url', async () => {
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        installationStore,
        stateStore: fakeStateStore,
        logger: noopLogger,
        clientOptions: webClientOptions,
      });
      const fakeState = 'fakeState';
      const fakeCode = 'fakeCode';
      const req = {
        headers: {
          host: 'example.com',
          cookie: `slack-app-oauth-state=${fakeState}`,
        },
        url: `http://example.com?state=${fakeState}&code=${fakeCode}`,
      };
      // @ts-expect-error req is not an instance of IncomingMessage, TODO: type or stub IncomingMessage for req properly
      await installer.handleCallback(req, res, successExpectedCallbackOptions);
      assert.isTrue(sent);
      assert.equal((fakeStateStore.verifyStateParam as sinon.SinonSpy).callCount, 1);
    });

    it('should call the success callback for a v1 url', async () => {
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        stateSecret,
        installationStore,
        stateStore: fakeStateStore,
        authVersion: 'v1',
        logger: noopLogger,
      });
      const fakeState = 'fakeState';
      const fakeCode = 'fakeCode';
      const req = {
        headers: {
          host: 'example.com',
          cookie: `slack-app-oauth-state=${fakeState}`,
        },
        url: `http://example.com?state=${fakeState}&code=${fakeCode}`,
      };
      // @ts-expect-error req is not an instance of IncomingMessage, TODO: type or stub IncomingMessage for req properly
      await installer.handleCallback(req, res, successExpectedCallbackOptions);
      assert.isTrue(sent);
      assert.equal((fakeStateStore.verifyStateParam as sinon.SinonSpy).callCount, 1);
    });

    it('should call the success callback for a v1 url', async () => {
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        stateSecret,
        installationStore,
        stateStore: fakeStateStore,
        authVersion: 'v1',
        logger: noopLogger,
        clientOptions: webClientOptions,
      });
      const fakeState = 'fakeState';
      const fakeCode = 'fakeCode';
      const req = {
        headers: {
          host: 'example.com',
          cookie: `slack-app-oauth-state=${fakeState}`,
        },
        url: `http://example.com?state=${fakeState}&code=${fakeCode}`,
      };
      // @ts-expect-error req is not an instance of IncomingMessage, TODO: type or stub IncomingMessage for req properly
      await installer.handleCallback(req, res, successExpectedCallbackOptions);
      assert.isTrue(sent);
      assert.equal((fakeStateStore.verifyStateParam as sinon.SinonSpy).callCount, 1);
    });

    it('should not verify state when stateVerification is false', async () => {
      const fakeStateStore = {
        generateStateParam: sinon.fake.resolves('fakeState'),
        verifyStateParam: sinon.fake.resolves({}),
      };
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        stateSecret,
        stateVerification: false,
        installationStore,
        stateStore: fakeStateStore,
        logger: noopLogger,
      });
      const fakeState = 'fakeState';
      const fakeCode = 'fakeCode';
      const req = {
        headers: {
          host: 'example.com',
          // cookie: `slack-app-oauth-state=${fakeState}`,
        },
        url: `http://example.com?state=${fakeState}&code=${fakeCode}`,
      };
      // @ts-expect-error req is not an instance of IncomingMessage, TODO: type or stub IncomingMessage for req properly
      await installer.handleCallback(req, res, successExpectedCallbackOptions);
      assert.isTrue(sent);
      assert.equal(fakeStateStore.verifyStateParam.callCount, 0);
    });

    it('should terminate the processing when callbackOptions.beforeInstallation() returns false', async () => {
      const fakeState = 'fakeState';
      const fakeCode = 'fakeCode';
      const req = {
        headers: {
          host: 'example.com',
          cookie: `slack-app-oauth-state=${fakeState}`,
        },
        url: `http://example.com?state=${fakeState}&code=${fakeCode}`,
      };
      let endCalled = false;
      const res = {
        writeHead: (status: number) => {
          assert.equal(status, 400);
        },
        end: () => {
          endCalled = true;
        },
      };
      const callbackOptions: CallbackOptions = {
        beforeInstallation: async (_installOptions, _req, res) => {
          // if the installation is not acceptable
          res.writeHead(400);
          res.end('error page content');
          return false;
        },
        afterInstallation: async (_installation, _installOptions, _req, _res) => {
          assert.fail('afterInstallation should not be called');
        },
        successAsync: async (_installation, _installOptions, _req, _res) => {
          assert.fail('successAsync should not be called');
        },
        failureAsync: async (error, _installOptions, _req, _res) => {
          assert.fail(`failureAsync should not be called ${error}`);
        },
      };
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        stateSecret,
        installationStore,
        stateVerification: false,
        logger: noopLogger,
      });
      // @ts-expect-error req is not an instance of IncomingMessage, TODO: type or stub IncomingMessage for req properly
      await installer.handleCallback(req, res, callbackOptions);

      assert.isTrue(endCalled);
    });
    it('should terminate the processing when callbackOptions.afterInstallation() returns false', async () => {
      const fakeState = 'fakeState';
      const fakeCode = 'fakeCode';
      const req = {
        headers: {
          host: 'example.com',
          cookie: `slack-app-oauth-state=${fakeState}`,
        },
        url: `http://example.com?state=${fakeState}&code=${fakeCode}`,
      };
      let endCalled = false;
      const res = {
        writeHead: (status: number) => {
          assert.equal(status, 400);
        },
        end: () => {
          endCalled = true;
        },
      };
      const callbackOptions: CallbackOptions = {
        beforeInstallation: async (_installOptions, _req, _res) => {
          return true;
        },
        afterInstallation: async (_installation, _installOptions, _req, res) => {
          // revoke the tokens and display error to the installing user
          res.writeHead(400);
          res.end('error page content');
          return false;
        },
        successAsync: async (_installation, _installOptions, _req, _res) => {
          assert.fail('successAsync should not be called');
        },
        failureAsync: async (error, _installOptions, _req, _res) => {
          assert.fail(`failureAsync should not be called ${error}`);
        },
      };
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        stateSecret,
        installationStore,
        stateVerification: false,
        logger: noopLogger,
      });
      // @ts-expect-error req is not an instance of IncomingMessage, TODO: type or stub IncomingMessage for req properly
      await installer.handleCallback(req, res, callbackOptions);

      assert.isTrue(endCalled);
    });
    it('should execute both success and succesAsync', async () => {
      const fakeState = 'fakeState';
      const fakeCode = 'fakeCode';
      const req = {
        headers: {
          host: 'example.com',
          cookie: `slack-app-oauth-state=${fakeState}`,
        },
        url: `http://example.com?state=${fakeState}&code=${fakeCode}`,
      };
      const res = {
        writeHead: (status: number) => {
          assert.equal(status, 400);
        },
        end: () => {},
      };
      let callCount = 0;
      const callbackOptions: CallbackOptions = {
        success: () => {
          callCount += 1;
        },
        successAsync: async () => {
          callCount += 1;
        },
        failureAsync: async (error) => {
          assert.fail(`failureAsync should not be called ${error}`);
        },
      };
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        stateSecret,
        installationStore,
        stateVerification: false,
        logger: noopLogger,
      });
      // @ts-expect-error req is not an instance of IncomingMessage, TODO: type or stub IncomingMessage for req properly
      await installer.handleCallback(req, res, callbackOptions);

      assert.equal(callCount, 2);
    });
    it('should execute both failure and failureAsync', async () => {
      const fakeState = 'fakeState';
      const fakeCode = 'fakeCode';
      const req = {
        headers: {
          host: 'example.com',
          // cookie: `slack-app-oauth-state=${fakeState}`,
        },
        url: `http://example.com?state=${fakeState}&code=${fakeCode}`,
      };
      const res = {
        writeHead: (status: number) => {
          assert.equal(status, 400);
        },
        end: () => {},
      };
      let callCount = 0;
      const callbackOptions = {
        failure: () => {
          callCount += 1;
        },
        failureAsync: async () => {
          callCount += 1;
        },
        success: async () => {
          assert.fail('success should not be called in this test');
        },
      };
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        stateSecret,
        installationStore,
        logger: noopLogger,
      });
      // @ts-expect-error req is not an instance of IncomingMessage, TODO: type or stub IncomingMessage for req properly
      await installer.handleCallback(req, res, callbackOptions);

      assert.equal(callCount, 2);
    });

    it('should fail if the state value is not in cookies', async () => {
      const fakeStateStore: StateStore = {
        generateStateParam: sinon.fake.resolves('fakeState'),
        verifyStateParam: sinon.fake.resolves({ scopes: [] }),
      };
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        stateSecret,
        installationStore,
        stateStore: fakeStateStore,
        authVersion: 'v2',
        logger: noopLogger,
        clientOptions: webClientOptions,
      });
      const fakeState = 'fakeState';
      const fakeCode = 'fakeCode';
      const req = {
        headers: {
          host: 'example.com',
          // cookie: `slack-app-oauth-state=${fakeState}`,
        },
        url: `http://example.com?state=${fakeState}&code=${fakeCode}`,
      };
      // @ts-expect-error req is not an instance of IncomingMessage, TODO: type or stub IncomingMessage for req properly
      await installer.handleCallback(req, res, failureExpectedCallbackOptions);
      assert.isTrue(sent);
    });
    it('should fail if there is a different state value in cookies', async () => {
      const fakeStateStore: StateStore = {
        generateStateParam: sinon.fake.resolves('fakeState'),
        verifyStateParam: sinon.fake.resolves({ scopes: [] }),
      };
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        stateSecret,
        installationStore,
        stateStore: fakeStateStore,
        authVersion: 'v2',
        logger: noopLogger,
        clientOptions: webClientOptions,
      });
      const fakeState = 'fakeState';
      const fakeCode = 'fakeCode';
      const req = {
        headers: {
          host: 'example.com',
          cookie: 'slack-app-oauth-state=something-different',
        },
        url: `http://example.com?state=${fakeState}&code=${fakeCode}`,
      };
      // @ts-expect-error req is not an instance of IncomingMessage, TODO: type or stub IncomingMessage for req properly
      await installer.handleCallback(req, res, failureExpectedCallbackOptions);
      assert.isTrue(sent);
    });
    it('should not fail if no state cookie returned and legacyStateVerification is enabled', async () => {
      const fakeStateStore = {
        generateStateParam: sinon.fake.resolves('fakeState'),
        verifyStateParam: sinon.fake.resolves({}),
      };
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        stateSecret,
        installationStore,
        logger: noopLogger,
        stateStore: fakeStateStore,
        clientOptions: webClientOptions,
        legacyStateVerification: true, // this is the key configuration in this test
      });
      const fakeState = 'fakeState';
      const fakeCode = 'fakeCode';
      const req = {
        headers: {
          host: 'example.com',
          // cookie: `slack-app-oauth-state=${fakeState}`,
        },
        url: `http://example.com?state=${fakeState}&code=${fakeCode}`,
      };
      // @ts-expect-error req is not an instance of IncomingMessage, TODO: type or stub IncomingMessage for req properly
      await installer.handleCallback(req, res, successExpectedCallbackOptions);
      assert.isTrue(sent);
    });
    it('should not fail if a different state cookie returned and legacyStateVerification is enabled', async () => {
      const fakeStateStore: StateStore = {
        generateStateParam: sinon.fake.resolves('fakeState'),
        verifyStateParam: sinon.fake.resolves({ scopes: [] }),
      };
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        stateSecret,
        installationStore,
        logger: noopLogger,
        stateStore: fakeStateStore,
        clientOptions: webClientOptions,
        legacyStateVerification: true, // this is the key configuration in this test
      });
      const fakeState = 'fakeState';
      const fakeCode = 'fakeCode';
      const req = {
        headers: {
          host: 'example.com',
          cookie: 'slack-app-oauth-state=something-different',
        },
        url: `http://example.com?state=${fakeState}&code=${fakeCode}`,
      };
      // @ts-expect-error req is not an instance of IncomingMessage, TODO: type or stub IncomingMessage for req properly
      await installer.handleCallback(req, res, successExpectedCallbackOptions);
      assert.isTrue(sent);
    });
  });
});

const successExpectedCallbackOptions: CallbackOptions = {
  success: async (_installation, _options, _req, res) => {
    res.end('success as expected!');
  },
  failure: async (error, _options, _req, _res) => {
    assert.fail(error.message);
  },
};

const failureExpectedCallbackOptions: CallbackOptions = {
  success: async (_installation, _ptions, _req, _res) => {
    assert.fail('should fail');
  },
  failure: async (_error, _options, _req, res) => {
    res.end('failed as expected!');
  },
};
