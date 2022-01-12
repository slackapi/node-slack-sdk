require('mocha');
const { assert, expect } = require('chai');

const url = require('url');
const rewiremock = require('rewiremock/node');
const sinon = require('sinon');
const fs = require('fs');
const { ErrorCode } = require('./errors');
const { LogLevel } = require('./logger');

// Stub WebClient api calls that the OAuth package makes
// expose clientOptions passed in to WebClient as global so we can assert on its contents
let webClientOptions;
rewiremock(() => require('@slack/web-api')).with({
  WebClient: class {
    constructor(token, options) {
      this.token = token;
      this.options = options;
      webClientOptions = options;
    };
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
        access: (options) => mockedV2AccessResp(options),
      }
    }
  },
});

async function mockedV2AccessResp(options) {
  const mockedResp = {
    team: { id: 'fake-v2-team-id', name: 'fake-team-name' },
    access_token: 'botToken',
    bot_user_id: 'botUserId',
    scope: 'chat:write,chat:read',
    appId: 'fakeAppId',
    enterprise: null,
    token_type: 'bot',
  };

  // Token rotation payload has different shape than "normal" v2 access response
  // See OAuthV2Response vs. OAuthV2TokenRefreshResponse for details
  if (options.grant_type === 'refresh_token') {
    mockedResp.refresh_token = 'newRefreshToken';
    mockedResp.expires_in = 43200; // 12 hours

    if (options.refresh_token.startsWith('user')) {
      mockedResp.token_type = 'user';
    }
  } else {
    mockedResp.authed_user = { id: 'userId', access_token: 'userAccessToken', };
  }

  return mockedResp;
}

rewiremock.enable();
const { InstallProvider } = require('./index');
const { FileInstallationStore, MemoryInstallationStore } = require('./stores');
rewiremock.disable();

const clientSecret = 'MY_SECRET';
const clientId = 'MY_ID';
const stateSecret = 'stateSecret';

// Memory database
const devDB = {};

// MemoryInstallation Store for testing
const installationStore = {
  storeInstallation: (installation) => {
    // db write
    devDB[installation.team.id] = installation;
    return new Promise((resolve) => {
      resolve();
    });
  },
  fetchInstallation: (installQuery) => {
    // db read
    const item = devDB[installQuery.teamId];
    return new Promise((resolve) => {
      resolve(item);
    });
  },
  deleteInstallation: (installQuery) => {
    // db delete
    delete devDB[installQuery.teamId];
    return new Promise((resolve) => {
      resolve();
    });
  }
}

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

// store our fake installation Object to the memory database.
devDB[storedInstallation.team.id] = storedInstallation;
devDB[storedOrgInstallation.enterprise.id] = storedOrgInstallation;

describe('OAuth', async () => {
  const noopLogger = {
    debug(..._msg) { /* noop */ },
    info(..._msg) { /* noop */ },
    warn(..._msg) { /* noop */ },
    error(..._msg) { /* noop */ },
    setLevel(_level) { /* noop */ },
    getLevel() { return LogLevel.DEBUG; },
    setName(_name) { /* noop */ },
  };

  describe('constructor()', async () => {
    it('should build a default installer given a clientID, client secret and stateSecret', async () => {
      const installer = new InstallProvider({ clientId, clientSecret, stateSecret });
      assert.instanceOf(installer, InstallProvider);
      assert.equal(installer.authVersion, 'v2');
    });

    it('should build a default installer given a clientID, client secret, stateSecret and clientOptions', async () => {
      const clientOptions = { foo: 'bar' };
      const installer = new InstallProvider({ clientId, clientSecret, stateSecret, clientOptions });
      assert.instanceOf(installer, InstallProvider);
      assert.equal(installer.authVersion, 'v2');
      assert.equal(installer.clientOptions.foo, 'bar');
    });

    it('should build a default installer given a clientID, client secret and state store', async () => {
      // stateStore for testing
      const fakeStateStore = {
        generateStateParam: sinon.fake.resolves('fakeState'),
        verifyStateParam: sinon.fake.resolves({})
      }

      const installer = new InstallProvider({ clientId, clientSecret, stateStore: fakeStateStore });
      assert.instanceOf(installer, InstallProvider);
    });

    it('should build a default installer given a clientID, client secret, stateSecrect and installationStore', async () => {
      const installer = new InstallProvider({ clientId, clientSecret, stateSecret, installationStore });
      assert.instanceOf(installer, InstallProvider);
    });

    it('should build a default installer given a clientID, client secret, stateSecrect and authVersion v2', async () => {
      const installer = new InstallProvider({ clientId, clientSecret, stateSecret, authVersion: 'v2' });
      assert.instanceOf(installer, InstallProvider);
      assert.equal(installer.authVersion, 'v2');
    });

    it('should build a default installer given a clientID, client secret, stateSecrect and authVersion v1', async () => {
      const installer = new InstallProvider({ clientId, clientSecret, stateSecret, authVersion: 'v1' });
      assert.instanceOf(installer, InstallProvider);
      assert.equal(installer.authVersion, 'v1');
    });

    it('should throw an error if missing a clientSecret', async () => {
      try {
        const installer = new InstallProvider({ clientId, stateSecret });
      } catch (error) {
        assert.equal(error.code, ErrorCode.InstallerInitializationError);
        assert.equal(error.message, 'You must provide a valid clientId and clientSecret');
      }
    });

    it('should throw an error if missing a clientID', async () => {
      try {
        const installer = new InstallProvider({ clientSecret, stateSecret });
      } catch (error) {
        assert.equal(error.code, ErrorCode.InstallerInitializationError);
        assert.equal(error.message, 'You must provide a valid clientId and clientSecret');
      }
    });

    it('should throw an error if missing a stateSecret when using default state store', async () => {
      try {
        const installer = new InstallProvider({ clientId, clientSecret });
      } catch (error) {
        assert.equal(error.code, ErrorCode.InstallerInitializationError);
        assert.equal(error.message, 'To use the built-in state store you must provide a State Secret');
      }
    });
  });

  describe('installer.generateInstallUrl', async () => {
    it('should return a generated v2 url', async () => {
      const fakeStateStore = {
        generateStateParam: sinon.fake.resolves('fakeState'),
        verifyStateParam: sinon.fake.resolves({})
      }
      const installer = new InstallProvider({ clientId, clientSecret, stateStore: fakeStateStore });
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
        const generatedUrl = await installer.generateInstallUrl(installUrlOptions, stateVerification)
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
        assert.fail(error.message);
      }
    });
    it('should not call generate state param when state validation is false', async () => {
      const fakeStateStore = {
        generateStateParam: sinon.fake.resolves('fakeState'),
        verifyStateParam: sinon.fake.resolves({})
      }
      const authorizationUrl = 'https://dev.slack.com/oauth/v2/authorize';
      const installer = new InstallProvider({ clientId, clientSecret, stateStore: fakeStateStore, authorizationUrl });
      const scopes = ['channels:read'];
      const teamId = '1234Team';
      const redirectUri = 'https://mysite.com/slack/redirect';
      const userScopes = ['chat:write:user']
      const stateVerification = false;
      const installUrlOptions = {
        scopes,
        metadata: 'some_metadata',
        teamId,
        redirectUri,
        userScopes,
      };
      try {
        const generatedUrl = await installer.generateInstallUrl(installUrlOptions, stateVerification)
        assert.exists(generatedUrl);
        assert.equal(fakeStateStore.generateStateParam.callCount, 0);
        assert.equal(fakeStateStore.verifyStateParam.callCount, 0);
      } catch (error) {
        assert.fail(error.message);
      }
    });
    it('should return a generated url when passed a custom authorizationUrl', async () => {
      const fakeStateStore = {
        generateStateParam: sinon.fake.resolves('fakeState'),
        verifyStateParam: sinon.fake.resolves({})
      }
      const authorizationUrl = 'https://dev.slack.com/oauth/v2/authorize';
      const installer = new InstallProvider({ clientId, clientSecret, stateStore: fakeStateStore, authorizationUrl });
      const scopes = ['channels:read'];
      const teamId = '1234Team';
      const redirectUri = 'https://mysite.com/slack/redirect';
      const userScopes = ['chat:write:user']
      const stateVerification = true;
      const installUrlOptions = {
        scopes,
        metadata: 'some_metadata',
        teamId,
        redirectUri,
        userScopes,
      };
      try {
        const generatedUrl = await installer.generateInstallUrl(installUrlOptions)
        assert.exists(generatedUrl);
        assert.equal(fakeStateStore.generateStateParam.callCount, 1);
        assert.equal(fakeStateStore.verifyStateParam.callCount, 0);
        assert.equal(fakeStateStore.generateStateParam.calledWith(installUrlOptions), true);

        const parsedUrl = url.parse(generatedUrl, true);
        assert.equal(parsedUrl.query.state, 'fakeState');
        assert.equal(parsedUrl.pathname, '/oauth/v2/authorize');
        assert.equal(parsedUrl.host, 'dev.slack.com')
        assert.equal(scopes.join(','), parsedUrl.query.scope);
        assert.equal(redirectUri, parsedUrl.query.redirect_uri);
        assert.equal(teamId, parsedUrl.query.team);
        assert.equal(userScopes.join(','), parsedUrl.query.user_scope);
      } catch (error) {
        assert.fail(error.message);
      }
    });

    it('should return a generated v1 url', async () => {
      const fakeStateStore = {
        generateStateParam: sinon.fake.resolves('fakeState'),
        verifyStateParam: sinon.fake.resolves({})
      }
      const installer = new InstallProvider({ clientId, clientSecret, 'stateStore': fakeStateStore, authVersion: 'v1' });
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
        const generatedUrl = await installer.generateInstallUrl(installUrlOptions, stateVerification)
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
        assert.fail(error.message);
      }
    });

    it('should fail if missing scopes', async () => {
      const installer = new InstallProvider({ clientId, clientSecret, stateSecret });
      try {
        const generatedUrl = await installer.generateInstallUrl({})
        assert.exists(generatedUrl);
      } catch (error) {
        assert.equal(error.message, 'You must provide a scope parameter when calling generateInstallUrl');
        assert.equal(error.code, ErrorCode.GenerateInstallUrlError);
      }
    });
  });

  describe('installer.authorize', async () => {
    it('should fail if database does not have an entry for authorize query', async () => {
      const installer = new InstallProvider({ clientId, clientSecret, stateSecret, installationStore });
      try {
        const authResult = await installer.authorize({ teamId: 'non_existing_team_id' });
        assert.fail('Should have failed');
      } catch (error) {
        assert.equal(error.code, ErrorCode.AuthorizationError);
        assert.equal(error.message, 'Failed fetching data from the Installation Store');
      }
    });

    it('should successfully return the Installation Object from the database', async () => {
      const installer = new InstallProvider({ clientId, clientSecret, stateSecret, installationStore });
      const fakeAuthResult = {
        userToken: 'userToken',
        botToken: 'botToken',
        botId: 'botId',
        botUserId: 'botUserId'
      };

      try {
        const authResult = await installer.authorize({ teamId: 'test-team-id' });
        assert.equal(authResult.userToken, fakeAuthResult.userToken);
        assert.equal(authResult.botToken, fakeAuthResult.botToken);
        assert.equal(authResult.botId, fakeAuthResult.botId);
        assert.equal(authResult.botUserId, fakeAuthResult.botUserId);
      } catch (error) {
        assert.fail(error.message);
      }
    });
  });

  describe('installer.handleCallback', async () => {
    let fakeStateStore = undefined;
    beforeEach(() => {
      fakeStateStore = {
        generateStateParam: sinon.fake.resolves('fakeState'),
        verifyStateParam: sinon.fake.resolves({})
      }
    });
    it('should call the failure callback with a valid installOptions due to missing code query parameter on the URL', async () => {
      const req = { headers: { host: 'example.com'},  url: 'http://example.com' };
      let sent = false;
      const res = { send: () => { sent = true; } };
      const callbackOptions = {
        success: async (installation, installOptions, req, res) => {
          res.send('successful!');
          assert.fail('should have failed');
        },
        failure: async (error, installOptions, req, res) => {
          // To detect future regressions, we verify if there is a valid installOptions here
          // Refer to https://github.com/slackapi/node-slack-sdk/pull/1410 for the context
          assert.isDefined(installOptions);
          assert.equal(error.code, ErrorCode.MissingCodeError);
          res.send('failure');
        },
      }
      const installer = new InstallProvider({ clientId, clientSecret, stateSecret, installationStore, logger: noopLogger });
      await installer.handleCallback(req, res, callbackOptions);

      assert.isTrue(sent);
    });
    it('should call the failure callback due to missing state query parameter on the URL', async () => {
      const req = { headers: { host: 'example.com'},  url: 'http://example.com?code=1234' };
      let sent = false;
      const res = { send: () => { sent = true; } };
      const callbackOptions = {
        success: async (installation, installOptions, req, res) => {
          res.send('successful!');
          assert.fail('should have failed');
        },
        failure: async (error, installOptions, req, res) => {
          assert.isDefined(installOptions);
          assert.equal(error.code, ErrorCode.MissingStateError)
          res.send('failure');
        },
      }
      const installer = new InstallProvider({ clientId, clientSecret, stateSecret, installationStore, logger: noopLogger });
      await installer.handleCallback(req, res, callbackOptions);

      assert.isTrue(sent);
    });

    it('should call the success callback when state query param is missing but stateVerification disabled', async () => {
      const req = { headers: { host: 'example.com'}, url: 'http://example.com?code=1234' };
      let sent = false;
      const res = { send: () => { sent = true; } };
      const callbackOptions = {
        success: async (installation, installOptions, req, res) => {
          res.send('successful!');
        },
        failure: async (error, installOptions, req, res) => {
          assert.fail('should have succeeded');
        },
      }
      const installer = new InstallProvider({ clientId, clientSecret, stateSecret, stateVerification: false, installationStore, logger: noopLogger });
      await installer.handleCallback(req, res, callbackOptions);

      assert.isTrue(sent);
    });

    it('should call the failure callback if an access_denied error query parameter was returned on the URL', async () => {
      const req = { headers: { host: 'example.com'}, url: 'http://example.com?error=access_denied' };
      let sent = false;
      const res = { send: () => { sent = true; } };
      const callbackOptions = {
        success: async (installation, installOptions, req, res) => {
          res.send('successful!');
          assert.fail('should have failed');
        },
        failure: async (error, installOptions, req, res) => {
          assert.isDefined(installOptions);
          assert.equal(error.code, ErrorCode.AuthorizationError)
          res.send('failure');
        },
      }
      const installer = new InstallProvider({ clientId, clientSecret, stateSecret, installationStore, logger: noopLogger });
      await installer.handleCallback(req, res, callbackOptions);

      assert.isTrue(sent);
    });

    it('should call the success callback for a v2 url', async () => {
      let sent = false;
      const res = { send: () => { sent = true; } };
      const callbackOptions = {
        success: async (installation, installOptions, req, res) => {
          res.send('successful!');
        },
        failure: async (error, installOptions, req, res) => {
          assert.fail(error.message);
        },
      }

      const installer = new InstallProvider({ clientId, clientSecret, installationStore, stateStore: fakeStateStore });
      const fakeState = 'fakeState';
      const fakeCode = 'fakeCode';
      const req = { headers: { host: 'example.com'}, url: `http://example.com?state=${fakeState}&code=${fakeCode}` };
      await installer.handleCallback(req, res, callbackOptions);
      assert.isTrue(sent);
      assert.equal(fakeStateStore.verifyStateParam.callCount, 1);
    });

    it('should call the success callback for a v2 url and client options passed into InstallProvider should be propagated to the underlying @web-api WebClient', async () => {
      let sent = false;
      const res = { send: () => { sent = true; } };
      const callbackOptions = {
        success: async (installation, installOptions, req, res) => {
          res.send('successful!');
        },
        failure: async (error, installOptions, req, res) => {
          assert.fail(error.message);
        },
      }
      const clientOptions = { foo: 'baz' };
      const installer = new InstallProvider({ clientId, clientSecret, installationStore, stateStore: fakeStateStore, clientOptions });
      const fakeState = 'fakeState';
      const fakeCode = 'fakeCode';
      const req = { headers: { host: 'example.com'}, url: `http://example.com?state=${fakeState}&code=${fakeCode}` };
      await installer.handleCallback(req, res, callbackOptions);
      assert.isTrue(sent);
      assert.equal(fakeStateStore.verifyStateParam.callCount, 1);
      assert.equal(webClientOptions.foo, clientOptions.foo);
    });

    it('should call the success callback for a v1 url', async () => {
      let sent = false;
      const res = { send: () => { sent = true; } };
      const callbackOptions = {
        success: async (installation, installOptions, req, res) => {
          res.send('successful!');
        },
        failure: async (error, installOptions, req, res) => {
          assert.fail(error.message);
        },
      }

      const installer = new InstallProvider({ clientId, clientSecret, stateSecret, installationStore, stateStore: fakeStateStore, authVersion: 'v1' });
      const fakeState = 'fakeState';
      const fakeCode = 'fakeCode';
      const req = { headers: { host: 'example.com'}, url: `http://example.com?state=${fakeState}&code=${fakeCode}` };
      await installer.handleCallback(req, res, callbackOptions);
      assert.isTrue(sent);
      assert.equal(fakeStateStore.verifyStateParam.callCount, 1);
    });

    it('should call the success callback for a v1 url and client options passed into InstallProvider should be propagated to the underlying @web-api WebClient', async () => {
      let sent = false;
      const res = { send: () => { sent = true; } };
      const callbackOptions = {
        success: async (installation, installOptions, req, res) => {
          res.send('successful!');
        },
        failure: async (error, installOptions, req, res) => {
          assert.fail(error.message);
        },
      }

      const clientOptions = { foo: 'bar' };
      const installer = new InstallProvider({ clientId, clientSecret, stateSecret, installationStore, stateStore: fakeStateStore, authVersion: 'v1', clientOptions });
      const fakeState = 'fakeState';
      const fakeCode = 'fakeCode';
      const req = { headers: { host: 'example.com'}, url: `http://example.com?state=${fakeState}&code=${fakeCode}` };
      await installer.handleCallback(req, res, callbackOptions);
      assert.isTrue(sent);
      assert.equal(fakeStateStore.verifyStateParam.callCount, 1);
      assert.equal(webClientOptions.foo, clientOptions.foo);
    });

    it('should not verify state when stateVerification is false', async () => {
      const fakeStateStore = {
        generateStateParam: sinon.fake.resolves('fakeState'),
        verifyStateParam: sinon.fake.resolves({})
      };
      let sent = false;
      const res = { send: () => { sent = true; } };
      const callbackOptions = {
        success: async (installation, installOptions, req, res) => {
          res.send('successful!');
        },
        failure: async (error, installOptions, req, res) => {
          res.send('failure');
          assert.fail('should have sent!');
        },
      };
      const installer = new InstallProvider({ clientId, clientSecret, stateSecret, stateVerification: false, installationStore, stateStore: fakeStateStore, });
      const fakeState = 'fakeState';
      const fakeCode = 'fakeCode';
      const req = { headers: { host: 'example.com'}, url: `http://example.com?state=${fakeState}&code=${fakeCode}` };
      await installer.handleCallback(req, res, callbackOptions);
      assert.isTrue(sent);
      assert.equal(fakeStateStore.verifyStateParam.callCount, 0);
    });
  });

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

  describe('FileInstallationStore', async () => {
    let fsMakeDir, fsWriteFile, fsReadFileSync, unlink;

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
      const installationStore = new FileInstallationStore({ baseDir: '.' });
      const installer = new InstallProvider({ clientId, clientSecret, stateSecret, installationStore });
      const { enterprise, team, user } = storedInstallation;
      const fakeInstallDir = `./${enterprise.id}-${team.id}`;
      const installationJSON = JSON.stringify(storedInstallation);

      installer.installationStore.storeInstallation(storedInstallation);
      assert.equal(fsWriteFile.calledWith(`${fakeInstallDir}/app-latest`, installationJSON), true);
      assert.equal(fsWriteFile.calledWith(sinon.match(`${fakeInstallDir}/user-${user.id}-latest`), installationJSON), true);
    });

    it('should store additional records for each installation with historicalDataEnabled', async () => {
      const installationStore = new FileInstallationStore({ baseDir: '.', historicalDataEnabled: true });
      const installer = new InstallProvider({ clientId, clientSecret, stateSecret, installationStore });
      const { enterprise, team, user } = storedInstallation;
      const fakeInstallDir = `./${enterprise.id}-${team.id}`;
      const installationJSON = JSON.stringify(storedInstallation);

      installer.installationStore.storeInstallation(storedInstallation);

      assert.equal(fsWriteFile.calledWith(sinon.match(`${fakeInstallDir}/app-`), installationJSON), true);
      assert.equal(fsWriteFile.calledWith(sinon.match(`${fakeInstallDir}/user-${user.id}-`), installationJSON), true);

      // 1 store = 4 files = 2 latest + 2 timestamps
      expect(fsWriteFile.callCount).equals(4);
    });

    it('should fetch a stored installation', async () => {
      const installationStore = new FileInstallationStore({ baseDir: '.' });
      const installer = new InstallProvider({ clientId, clientSecret, stateSecret, installationStore });
      const { enterprise, team, user } = storedInstallation;
      const fakeInstallDir = `/${enterprise.id}-${team.id}`;
      const query = { enterpriseId: enterprise.id, teamId: team.id };

      installer.installationStore.storeInstallation(storedInstallation);
      const installation = await installer.installationStore.fetchInstallation(query);

      assert.equal(fsReadFileSync.calledWith(sinon.match(`${fakeInstallDir}/app-latest`)), true);
      assert.deepEqual(installation, storedInstallation);
    });

    it('should delete all records of installation if no userId is passed', async () => {
      const installationStore = new FileInstallationStore({ baseDir: '.' });
      const installer = new InstallProvider({ clientId, clientSecret, stateSecret, installationStore });
      const { enterprise, team } = storedInstallation;
      const fakeInstallDir = `/${enterprise.id}-${team.id}`;
      const query = { enterpriseId: enterprise.id, teamId: team.id };

      await installer.installationStore.deleteInstallation(query);

      assert.equal(fsReaddirSync.calledWith(sinon.match(fakeInstallDir)), true);
      assert.equal(fsUnlink.calledWith(sinon.match(`app-latest`)), true);
      assert.equal(fsUnlink.calledWith(sinon.match(`user-userId-latest`)), true);

      // fsReaddirSync returns ['app-latest', 'user-userId-latest']
      expect(fsUnlink.callCount).equals(2);
    });

    it('should delete only user records of installation if userId is passed', async () => {
      const installationStore = new FileInstallationStore({ baseDir: '.' });
      const installer = new InstallProvider({ clientId, clientSecret, stateSecret, installationStore });
      const { enterprise, team, user } = storedInstallation;
      const fakeInstallDir = `/${enterprise.id}-${team.id}`;
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

  describe('ClearStateStore', async () => {
    it('should generate a state and return install options once verified', async () => {
      const installer = new InstallProvider({ clientId, clientSecret, stateSecret });
      const installUrlOptions = { scopes: ['channels:read'] };
      const state = await installer.stateStore.generateStateParam(installUrlOptions, new Date());
      const returnedInstallUrlOptions = await installer.stateStore.verifyStateParam(new Date(), state);
      assert.deepEqual(installUrlOptions, returnedInstallUrlOptions);
    });
  });
});
