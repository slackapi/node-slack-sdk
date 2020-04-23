require('mocha');
const { assert } = require('chai');

const url = require('url');
const rewiremock = require('rewiremock/node');
const sinon = require('sinon');

// Stub WebClient api calls that the OAuth package makes
rewiremock(() => require('@slack/web-api')).with({
  WebClient: class {
    constructor(token, _options) {
      this.token = token;
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
        access: sinon.fake.resolves({
          team: {id: 'fake-v2-team-id', name: 'fake-team-name' },
          access_token: 'botToken',
          authed_user: {
            id: 'userId',
            access_token: 'userAccessToken',
          },
          bot_user_id: 'botUserId',
          scope: 'chat:write,chat:read',
          appId: 'fakeAppId',
          token_type: 'bot'
        })
      }
    }
  },
});

rewiremock.enable();
const { InstallProvider } = require('./index');
rewiremock.disable();

const clientSecret = 'MY_SECRET';
const clientId = 'MY_ID';
const stateSecret = 'stateSecret';

// stateStore for testing
const stateStore = {
  generateStateParam: sinon.fake.resolves('fakeState'),
  verifyStateParam: sinon.fake.resolves({})
}

// Memory database
const devDB = {};

// Installation Store for testing
const installationStore = {
  storeInstallation: (installation) => {
    // db write
    devDB[installation.team.id] = installation;
    return new Promise((resolve) => {
        resolve();
    });
  },
  fetchInstallation: (query) => {
    // db read
    const item = devDB[query.teamId];
    return new Promise((resolve) => {
        resolve(item);
    });
  }
}

const storedInstallation =  {
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
      url: 'someURL',
      channel: 'someChannel',
      channelId: 'someChannelID',
      configurationUrl: 'someConfigURL',
    },
    appId: undefined,
    tokenType: 'tokenType'
}

// store our fake installation Object to the memory database.
devDB[storedInstallation.team.id] = storedInstallation;

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
      const installer = new InstallProvider({clientId, clientSecret, stateSecret});
      assert.instanceOf(installer, InstallProvider);
      assert.equal(installer.authVersion, 'v2');
    });

    it('should build a default installer given a clientID, client secret and state store', async () => {
      const installer = new InstallProvider({clientId, clientSecret, stateStore});
      assert.instanceOf(installer, InstallProvider);
    });

    it('should build a default installer given a clientID, client secret, stateSecrect and installationStore', async () => {
      const installer = new InstallProvider({clientId, clientSecret, stateSecret, installationStore});
      assert.instanceOf(installer, InstallProvider);
    });

    it('should build a default installer given a clientID, client secret, stateSecrect and authVersion v2', async () => {
      const installer = new InstallProvider({clientId, clientSecret, stateSecret, authVersion: 'v2'});
      assert.instanceOf(installer, InstallProvider);
      assert.equal(installer.authVersion, 'v2');
    });

    it('should build a default installer given a clientID, client secret, stateSecrect and authVersion v1', async () => {
      const installer = new InstallProvider({clientId, clientSecret, stateSecret, authVersion: 'v1'});
      assert.instanceOf(installer, InstallProvider);
      assert.equal(installer.authVersion, 'v1');
    });

    it('should throw an error if missing a clientSecret', async () => {
      try {
          const installer = new InstallProvider({clientId, stateSecret});
      } catch (error) {
          assert.equal(error.code, 'INSTALLER_INITIALIZATION_ERROR');
          assert.equal(error.message, 'You must provide a valid clientId and clientSecret');
      }
    });

    it('should throw an error if missing a clientID', async () => {
      try {
          const installer = new InstallProvider({clientSecret, stateSecret});
      } catch (error) {
          assert.equal(error.code, 'INSTALLER_INITIALIZATION_ERROR');
          assert.equal(error.message, 'You must provide a valid clientId and clientSecret');
      }
    });

    it('should throw an error if missing a stateSecret when using default state store', async () => {
      try {
          const installer = new InstallProvider({clientId, clientSecret});
      } catch (error) {
          assert.equal(error.code, 'INSTALLER_INITIALIZATION_ERROR');
          assert.equal(error.message, 'You must provide a State Secret to use the built-in state store');
      }
    });
  });

  describe('installer.generateInstallUrl', async () => {
      it('should return a generated v2 url', async () => {
          const installer = new InstallProvider({clientId, clientSecret, stateSecret});
          const scopes = ['channels:read'];
          const teamId = '1234Team';
          const redirectUri = 'https://mysite.com/slack/redirect';
          const userScopes = ['chat:write:user']
          try {
              const generatedUrl = await installer.generateInstallUrl({
                  scopes,
                  metadata: 'some_metadata',
                  teamId,
                  redirectUri,
                  userScopes,
              })
              assert.exists(generatedUrl);
              const parsedUrl = url.parse(generatedUrl, true);
              assert.equal(parsedUrl.pathname, '/oauth/v2/authorize');
              assert.equal(scopes.join(','), parsedUrl.query.scope);
              assert.equal(redirectUri, parsedUrl.query.redirect_uri);
              assert.equal(teamId, parsedUrl.query.team);
              assert.equal(userScopes.join(','), parsedUrl.query.user_scope);
          } catch (error) {
              assert.fail(error.message);
          }
      });
      it('should return a generated v1 url', async () => {
          const installer = new InstallProvider({clientId, clientSecret, stateSecret, authVersion: 'v1'});
          const scopes = ['bot'];
          const teamId = '1234Team';
          const redirectUri = 'https://mysite.com/slack/redirect';
          try {
              const generatedUrl = await installer.generateInstallUrl({
                  scopes,
                  metadata: 'some_metadata',
                  teamId,
                  redirectUri,
              })
              assert.exists(generatedUrl);
              const parsedUrl = url.parse(generatedUrl, true);
              assert.equal(parsedUrl.pathname, '/oauth/authorize');
              assert.equal(scopes.join(','), parsedUrl.query.scope);
              assert.equal(redirectUri, parsedUrl.query.redirect_uri);
              assert.equal(teamId, parsedUrl.query.team);
          } catch (error) {
              assert.fail(error.message);
          }
      });
      it('should fail if missing scopes', async () => {
          const installer = new InstallProvider({clientId, clientSecret, stateSecret});
          try {
              const generatedUrl = await installer.generateInstallUrl({})
              assert.exists(generatedUrl);
          } catch (error) {
              assert.equal(error.message, 'You must provide a scope parameter when calling generateInstallUrl');
              assert.equal(error.code, 'GENERATE_URL_ERROR');
          }
      });
  });
  describe('installer.authorize', async () => {
    it('should fail if database does not have an entry for authorize query', async () => {
      const installer = new InstallProvider({clientId, clientSecret, stateSecret, installationStore});
      try {
          const AuthResult = await installer.authorize({teamId:'teamID'});
      } catch(error) {
          assert.equal(error.code, 'INSTALLER_AUTHORIZATION_ERROR');
          assert.equal(error.message, 'Failed fetching data from the Installation Store');
      }
    });

    it('should successfully return the Installation Object from the database', async () => {
      const installer = new InstallProvider({clientId, clientSecret, stateSecret, installationStore});
      const fakeAuthResult = {
        userToken: 'userToken',
        botToken: 'botToken',
        botId: 'botId',
        botUserId: 'botUserId'
      };

      try {
        const AuthResult = await installer.authorize({teamId:'test-team-id'});
        assert.equal(AuthResult.userToken, fakeAuthResult.userToken);
        assert.equal(AuthResult.botToken, fakeAuthResult.botToken);
        assert.equal(AuthResult.botId, fakeAuthResult.botId);
        assert.equal(AuthResult.botUserId, fakeAuthResult.botUserId);
      } catch(error) {
        assert.fail(error.message);
      }
    });
  });

  describe('installer.handleCallback', async () => {
    it('should call the failure callback due to missing state query parameter on the URL', async () => {
      const req = { url: 'someUrl' };
      let sent = false;
      const res = { send: () => { sent = true; } };
      const callbackOptions = {
        success: async (installation, installOptions, req, res) => {
          res.send('successful!');
          assert.fail('should have failed');
        },
        failure: async (error, installOptions , req, res) => {
          assert.equal(error.code, 'MISSING_STATE')
          res.send('failure');
        },
      }
      const installer = new InstallProvider({clientId, clientSecret, stateSecret, installationStore, logger: noopLogger});
      await installer.handleCallback(req, res, callbackOptions);

      assert.isTrue(sent);
    });
    it('should call the success callback for a v2 url', async () => {
      let sent = false;
      const installUrlOptions = { scopes: [ 'channels:read' ] };
      const res = { send: () => { sent = true; } };
      const callbackOptions = {
        success: async (installation, installOptions, req, res) => {
          assert.equal(installOptions.scopes[0], installUrlOptions.scopes[0]);
          res.send('successful!');
        },
        failure: async (error, installOptions , req, res) => {
          assert.fail(error.message);
          res.send('failure');
        },
      }
      
      const installer = new InstallProvider({clientId, clientSecret, stateSecret, installationStore});
      const url = await installer.generateInstallUrl(installUrlOptions);
      const req = { url };
      await installer.handleCallback(req, res, callbackOptions);
      assert.isTrue(sent);

      try {
        // do a authorize check
        const AuthResult = await installer.authorize({teamId:'fake-v2-team-id'});
        assert.equal(AuthResult.userToken, 'userAccessToken');
        assert.equal(AuthResult.botToken, 'botToken');
        assert.equal(AuthResult.botId, '');
        assert.equal(AuthResult.botUserId, 'botUserId');
      } catch (error) {
        assert.fail(error.message);
      }
    });
    it('should call the success callback for a v1 url', async () => {
      let sent = false;
      const installUrlOptions = { scopes: [ 'bot' ] };
      const res = { send: () => { sent = true; } };
      const callbackOptions = {
        success: async (installation, installOptions, req, res) => {
          assert.equal(installOptions.scopes[0], installUrlOptions.scopes[0]);
          res.send('successful!');
        },
        failure: async (error, installOptions , req, res) => {
          assert.fail(error.message);
          res.send('failure');
        },
      }
      
      const installer = new InstallProvider({clientId, clientSecret, stateSecret, installationStore, authVersion: 'v1'});
      const url = await installer.generateInstallUrl(installUrlOptions);
      const req = { url };
      await installer.handleCallback(req, res, callbackOptions);
      assert.isTrue(sent);

      try {
        // do a authorize check
        const AuthResult = await installer.authorize({teamId:'fake-v1-team-id'});
        assert.equal(AuthResult.userToken, 'token');
        assert.equal(AuthResult.botToken, 'botAccessToken');
        assert.equal(AuthResult.botId, '');
        assert.equal(AuthResult.botUserId, 'botUserId');
      } catch (error) {
        assert.fail(error.message);
      }
    });
  })
});