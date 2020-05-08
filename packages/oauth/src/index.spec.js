require('mocha');
const { assert } = require('chai');
const { decode } = require('jsonwebtoken');
const parseUrl = require('url').parse;
const rewiremock = require('rewiremock/node');
const sinon = require('sinon');
const { ErrorCode } = require('./errors');

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
        app_id: 'fakeAppId',
      }),
      v2: {
        access: sinon.fake.resolves({
          team: { id: 'fake-v2-team-id', name: 'fake-team-name' },
          access_token: 'botToken',
          authed_user: {
            id: 'userId',
            access_token: 'userAccessToken',
          },
          bot_user_id: 'botUserId',
          scope: 'chat:write,chat:read',
          app_id: 'fakeAppId',
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
      // stateStore for testing
      const fakeStateStore = {
        generateStateParam: sinon.fake.resolves('fakeState'),
        verifyStateParam: sinon.fake.resolves({})
      }

      const installer = new InstallProvider({ clientId, clientSecret, stateStore: fakeStateStore });
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
          assert.equal(error.code, ErrorCode.InstallerInitializationError);
          assert.equal(error.message, 'You must provide a valid clientId and clientSecret');
      }
    });

    it('should throw an error if missing a clientID', async () => {
      try {
          const installer = new InstallProvider({clientSecret, stateSecret});
      } catch (error) {
          assert.equal(error.code, ErrorCode.InstallerInitializationError);
          assert.equal(error.message, 'You must provide a valid clientId and clientSecret');
      }
    });

    it('should throw an error if missing a stateSecret when using default state store', async () => {
      try {
          const installer = new InstallProvider({clientId, clientSecret});
      } catch (error) {
          assert.equal(error.code, ErrorCode.InstallerInitializationError);
          assert.equal(error.message, 'You must provide a State Secret to use the built-in state store');
      }
    });
  });

  describe('installer.makeInstallUrl', async () => {
    it('should return a generated v2 url', async () => {
        const fakeStateStore = {
          generateStateParam: sinon.fake.resolves('fakeState'),
          verifyStateParam: sinon.fake.resolves({})
        }
        const installer = new InstallProvider({ clientId, clientSecret, stateStore: fakeStateStore });
        const scopes = ['channels:read'];
        const teamId = '1234Team';
        const redirectUri = 'https://mysite.com/slack/redirect';
        const userScopes = ['chat:write:user']
        const installUrlOptions = {
          scopes,
          metadata: 'some_metadata',
          teamId,
          redirectUri,
          userScopes,
        }

        const { url } = await installer.makeInstallUrl(installUrlOptions)
        assert.exists(url);
        assert.equal(fakeStateStore.generateStateParam.callCount, 1);
        assert.equal(fakeStateStore.verifyStateParam.callCount, 0);
        sinon.assert.calledWith(fakeStateStore.generateStateParam, sinon.match(installUrlOptions));

        const parsedUrl = parseUrl(url, true);
        assert.equal(parsedUrl.query.state, 'fakeState');
        assert.equal(parsedUrl.pathname, '/oauth/v2/authorize');
        assert.equal(scopes.join(','), parsedUrl.query.scope);
        assert.equal(redirectUri, parsedUrl.query.redirect_uri);
        assert.equal(teamId, parsedUrl.query.team);
        assert.equal(userScopes.join(','), parsedUrl.query.user_scope);
    });

    it('should return a generated v1 url', async () => {
        const fakeStateStore = {
          generateStateParam: sinon.fake.resolves('fakeState'),
          verifyStateParam: sinon.fake.resolves({})
        }
        const installer = new InstallProvider({clientId, clientSecret, 'stateStore': fakeStateStore, authVersion: 'v1'});
        const scopes = ['bot'];
        const teamId = '1234Team';
        const redirectUri = 'https://mysite.com/slack/redirect';
        const installUrlOptions = {
          scopes,
          metadata: 'some_metadata',
          teamId,
          redirectUri,
      }

      const { url } = await installer.makeInstallUrl(installUrlOptions)
      assert.exists(url);
      const parsedUrl = parseUrl(url, true);
      assert.equal(fakeStateStore.generateStateParam.callCount, 1);
      assert.equal(fakeStateStore.verifyStateParam.callCount, 0);
      sinon.assert.calledWith(fakeStateStore.generateStateParam, sinon.match(installUrlOptions));
      assert.equal(parsedUrl.pathname, '/oauth/authorize');
      assert.equal(parsedUrl.query.state, 'fakeState');
      assert.equal(scopes.join(','), parsedUrl.query.scope);
      assert.equal(redirectUri, parsedUrl.query.redirect_uri);
      assert.equal(teamId, parsedUrl.query.team);
    });

    it('should return the JWT token that includes an unguessable, 256 bit synchronizer', async () => {
      const installer = new InstallProvider({clientId, clientSecret, stateSecret});
      const { url, synchronizer, token } = await installer.makeInstallUrl({
        scopes: ['channels:read'],
        metadata: 'some_metadata',
        teamId: '1234Team',
        redirectUri: 'https://mysite.com/slack/redirect',
      });
      assert.isString(token, 'the token should be returned');
      assert.isString(synchronizer, 'the synchronizer should be returned');
      assert.isAtLeast(Buffer.byteLength(synchronizer.trim(), 'utf8'), 32, 'the synchronizer should be 256+ bit');

      const parsedUrl = parseUrl(url, true);
      const synchronizerInUrl = decode(parsedUrl.query.state).installOptions.synchronizer;
      assert.isString(synchronizerInUrl, 'the OAuth state param should include a synchronizer string');
      assert.equal(synchronizer, synchronizerInUrl, 'the synchronizer in the URL should match that which was returned from makeInstallUrl');
      const synchronizerInToken = decode(token).installOptions.synchronizer;
      assert.equal(synchronizer, synchronizerInToken, 'the synchronizer in the token should match that which was returned from makeInstallUrl');
    });

    it('should fail if missing scopes', async () => {
        const installer = new InstallProvider({clientId, clientSecret, stateSecret});
        try {
            const { url } = await installer.makeInstallUrl({})
            assert.exists(url);
        } catch (error) {
            assert.equal(error.message, 'You must provide a scope parameter when calling makeInstallUrl or generateInstallUrl');
            assert.equal(error.code, ErrorCode.GenerateInstallUrlError);
        }
    });
  });

  describe('installer.generateInstallUrl (deprecated in v1.1.0)', async () => {
      it('should return a generated v2 url', async () => {
          const fakeStateStore = {
            generateStateParam: sinon.fake.resolves('fakeState'),
            verifyStateParam: sinon.fake.resolves({})
          }
          const installer = new InstallProvider({ clientId, clientSecret, stateStore: fakeStateStore });
          const scopes = ['channels:read'];
          const teamId = '1234Team';
          const redirectUri = 'https://mysite.com/slack/redirect';
          const userScopes = ['chat:write:user']
          const installUrlOptions = {
            scopes,
            metadata: 'some_metadata',
            teamId,
            redirectUri,
            userScopes,
          }

          const generatedUrl = await installer.generateInstallUrl(installUrlOptions)
          assert.exists(generatedUrl);
          assert.equal(fakeStateStore.generateStateParam.callCount, 1);
          assert.equal(fakeStateStore.verifyStateParam.callCount, 0);
          sinon.assert.calledWith(fakeStateStore.generateStateParam, sinon.match(installUrlOptions));

          const parsedUrl = parseUrl(generatedUrl, true);
          assert.exists(parsedUrl);
          assert.equal(parsedUrl.query.state, 'fakeState');
          assert.equal(parsedUrl.pathname, '/oauth/v2/authorize');
          assert.equal(scopes.join(','), parsedUrl.query.scope);
          assert.equal(redirectUri, parsedUrl.query.redirect_uri);
          assert.equal(teamId, parsedUrl.query.team);
          assert.equal(userScopes.join(','), parsedUrl.query.user_scope);
      });
      it('should return a generated v1 url', async () => {
          const fakeStateStore = {
            generateStateParam: sinon.fake.resolves('fakeState'),
            verifyStateParam: sinon.fake.resolves({})
          }
          const installer = new InstallProvider({clientId, clientSecret, 'stateStore': fakeStateStore, authVersion: 'v1'});
          const scopes = ['bot'];
          const teamId = '1234Team';
          const redirectUri = 'https://mysite.com/slack/redirect';
          const installUrlOptions = {
            scopes,
            metadata: 'some_metadata',
            teamId,
            redirectUri,
        }
          try {
              const generatedUrl = await installer.generateInstallUrl(installUrlOptions)
              assert.exists(generatedUrl);
              const parsedUrl = parseUrl(generatedUrl, true);
              assert.exists(parsedUrl);
              assert.equal(fakeStateStore.generateStateParam.callCount, 1);
              assert.equal(fakeStateStore.verifyStateParam.callCount, 0);
              sinon.assert.calledWith(fakeStateStore.generateStateParam, sinon.match(installUrlOptions));
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
          const installer = new InstallProvider({clientId, clientSecret, stateSecret});
          try {
              const generatedUrl = await installer.generateInstallUrl({})
              assert.exists(generatedUrl);
          } catch (error) {
              assert.equal(error.message, 'You must provide a scope parameter when calling makeInstallUrl or generateInstallUrl');
              assert.equal(error.code, ErrorCode.GenerateInstallUrlError);
          }
      });
  });

  describe('installer.authorize', async () => {
    it('should fail if database does not have an entry for authorize query', async () => {
      const installer = new InstallProvider({clientId, clientSecret, stateSecret, installationStore});
      try {
          const authResult = await installer.authorize({teamId:'non_existing_team_id'});
          assert.fail('Should have failed');
      } catch(error) {
          assert.equal(error.code, ErrorCode.AuthorizationError);
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
        const authResult = await installer.authorize({teamId:'test-team-id'});
        assert.equal(authResult.userToken, fakeAuthResult.userToken);
        assert.equal(authResult.botToken, fakeAuthResult.botToken);
        assert.equal(authResult.botId, fakeAuthResult.botId);
        assert.equal(authResult.botUserId, fakeAuthResult.botUserId);
      } catch(error) {
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
          assert.equal(error.code, ErrorCode.MissingStateError)
          res.send('failure');
        },
      }
      const installer = new InstallProvider({clientId, clientSecret, stateSecret, installationStore, logger: noopLogger});
      await installer.handleCallback(req, res, callbackOptions);

      assert.isTrue(sent);
    });
    it('should call the failure callback due to missing code query parameter on the URL', async () => {
      const req = { url: 'someUrl' };
      let sent = false;
      const res = { send: () => { sent = true; } };
      const callbackOptions = {
        success: async (installation, installOptions, req, res) => {
          res.send('successful!');
          assert.fail('should have failed');
        },
        failure: async (error, installOptions , req, res) => {
          assert.equal(error.code, ErrorCode.MissingStateError)
          res.send('failure');
        },
      }
      const installer = new InstallProvider({clientId, clientSecret, stateSecret, installationStore, logger: noopLogger});
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
        failure: async (error, installOptions , req, res) => {
          assert.fail(error.message);
          res.send('failure');
        },
      }

      const installer = new InstallProvider({clientId, clientSecret, installationStore, stateStore: fakeStateStore});
      const fakeState = 'fakeState';
      const fakeCode = 'fakeCode';
      const req = { url: `http://example.com?state=${fakeState}&code=${fakeCode}` };
      await installer.handleCallback(req, res, callbackOptions);
      assert.isTrue(sent);
      assert.equal(fakeStateStore.verifyStateParam.callCount, 1);
    });
    it('should call the success callback for a v1 url', async () => {
      let sent = false;
      const res = { send: () => { sent = true; } };
      const callbackOptions = {
        success: async (installation, installOptions, req, res) => {
          res.send('successful!');
        },
        failure: async (error, installOptions , req, res) => {
          assert.fail(error.message);
          res.send('failure');
        },
      }

      const installer = new InstallProvider({clientId, clientSecret, stateSecret, installationStore, stateStore: fakeStateStore, authVersion: 'v1'});
      const fakeState = 'fakeState';
      const fakeCode = 'fakeCode';
      const req = { url: `http://example.com?state=${fakeState}&code=${fakeCode}` };
      await installer.handleCallback(req, res, callbackOptions);
      assert.isTrue(sent);
      assert.equal(fakeStateStore.verifyStateParam.callCount, 1);
    });

    it('should succeed if a token is provided and it matches the state', async () => {
      let result = '';
      const res = { send: (value) => { result = value; } };
      const success = async (installation, installOptions, req, res) => {
        res.send('success');
      };
      const failure = async (error, installOptions , req, res) => {
        assert.fail(error.message);
        res.send('fail');
      };
      const installer = new InstallProvider({ clientId, clientSecret, stateSecret, logger: noopLogger });
      const { token } = await installer.makeInstallUrl({
        scopes: ['channels:read'],
        metadata: 'some_metadata',
        teamId: '1234Team',
        redirectUri: 'https://mysite.com/slack/redirect',
      });
      const req = { url: `http://example.com?state=${token}&code=fakeCode` };
      await installer.handleCallback(req, res, { token, success, failure });
      assert.equal(result, 'success');
    });

    it('should use the default success handler if `success` is not defined', async () => {
      let result = {};
      const res = {
        writeHead: (code, headers) => {
          result.code = code;
          result.headers = headers;
        },
        end: (body) => {
          result.body = body;
        },
      };
      const installer = new InstallProvider({
        clientId,
        clientSecret,
        stateSecret,
        logger: noopLogger,
        teamId: 'T1234ABCD',
        appId: 'A1234ABCD',
      });
      const { token } = await installer.makeInstallUrl({
        scopes: ['channels:read'],
        metadata: 'some_metadata',
        teamId: '1234Team',
        redirectUri: 'https://mysite.com/slack/redirect',
      });
      const req = { url: `http://example.com?state=${token}&code=fakeCode` };
      await installer.handleCallback(req, res, { token });
      assert.equal(result.code, 200);
      assert.deepEqual(result.headers, { 'Content-Type': 'text/html' });
      assert.include(result.body, 'Success');
    });

    it('should use the default success handler if `success` is not defined (fallback)', async () => {
      let result = {};
      const res = {
        writeHead: (code, headers) => {
          result.code = code;
          result.headers = headers;
        },
        end: (body) => {
          result.body = body;
        },
      };
      const installer = new InstallProvider({ clientId, clientSecret, stateSecret, logger: noopLogger });
      const { token } = await installer.makeInstallUrl({
        scopes: ['channels:read'],
        metadata: 'some_metadata',
        teamId: '1234Team',
        redirectUri: 'https://mysite.com/slack/redirect',
      });
      const req = { url: `http://example.com?state=${token}&code=fakeCode` };
      const webClient = {
        oauth: {
          v2: {
            access: sinon.fake.resolves({
              team: { id: 'fake-v2-team-id', name: 'fake-team-name' },
              access_token: 'botToken',
              authed_user: {
                id: 'userId',
                access_token: 'userAccessToken',
              },
              bot_user_id: 'botUserId',
              scope: 'chat:write,chat:read',
              app_id: undefined,
              token_type: 'bot'
            })
          }
        }
      }
      await installer.handleCallback(req, res, { token, webClient });
      assert.equal(result.code, 200);
      assert.deepEqual(result.headers, { 'Content-Type': 'text/html' });
      assert.include(result.body, 'Success');
    });

    it('should fail if a token is provided and it does not match the state', async () => {
      let result = '';
      const res = { send: (value) => { result = value; } };
      const success = async (installation, installOptions, req, res) => {
        res.send('success');
      };
      const failure = async (error, installOptions , req, res) => {
        res.send(error.message);
      };
      const installer = new InstallProvider({ clientId, clientSecret, stateSecret, logger: noopLogger });
      const makeToken = async () => installer.makeInstallUrl({
        scopes: ['channels:read'],
        metadata: 'some_metadata',
        teamId: '1234Team',
        redirectUri: 'https://mysite.com/slack/redirect',
      })

      const t1 = await makeToken();
      const t2 = await makeToken();
      const req = { url: `http://example.com?state=${t1.token}&code=fakeCode` };
      await installer.handleCallback(req, res, { synchronizer: t2.synchronizer, success, failure });
      assert.equal(result, 'redirect url and session token do not match');
    });

    it('should use the default error handler if a failure occurs, and `failure` is not defined', async () => {
      let result = {};
      const res = {
        writeHead: (code, headers) => {
          result.code = code;
          result.headers = headers;
        },
        end: (body) => {
          result.body = body;
        },
      };
      const installer = new InstallProvider({ clientId, clientSecret, stateSecret, logger: noopLogger });
      const makeToken = async () => installer.makeInstallUrl({
        scopes: ['channels:read'],
        metadata: 'some_metadata',
        teamId: '1234Team',
        redirectUri: 'https://mysite.com/slack/redirect',
      })

      const t1 = await makeToken();
      const t2 = await makeToken();
      const req = { url: `http://example.com?state=${t1.token}&code=fakeCode` };
      await installer.handleCallback(req, res, { synchronizer: t2.synchronizer });
      assert.equal(result.code, 500);
      assert.deepEqual(result.headers, { 'Content-Type': 'text/html' });
      assert.include(result.body, 'Oops, Something Went Wrong');
    });
  });

  describe('MemoryInstallStore', async () => {
    it('should store and fetch an installation', async () => {
      const installer = new InstallProvider({clientId, clientSecret, stateSecret});
      const fakeTeamId = storedInstallation.team.id;
      assert.deepEqual({}, installer.installationStore.devDB);
      await installer.installationStore.storeInstallation(storedInstallation);
      const fetchedResult = await installer.installationStore.fetchInstallation({teamId:fakeTeamId});
      assert.deepEqual(fetchedResult, storedInstallation);
      assert.deepEqual(storedInstallation, installer.installationStore.devDB[fakeTeamId]);
    });
  });

  describe('ClearStateStore', async () => {
    it('should generate a state and return install options once verified', async () => {
      const installer = new InstallProvider({clientId, clientSecret, stateSecret});
      const installUrlOptions = { scopes: [ 'channels:read' ] };
      const state = await installer.stateStore.generateStateParam(installUrlOptions, new Date());
      const returnedInstallUrlOptions = await installer.stateStore.verifyStateParam(new Date(), state);
      assert.deepEqual(installUrlOptions, returnedInstallUrlOptions);
    });

    it('should expire the state token 3 minutes in the future, by default', async () => {
      const installer = new InstallProvider({clientId, clientSecret, stateSecret});
      const installUrlOptions = { scopes: [ 'channels:read' ] };
      const state = await installer.stateStore.generateStateParam(installUrlOptions, new Date());
      assert.isAtLeast(decode(state).exp, Math.floor(Date.now() / 1000) + 170)
    });

    it('should use the token stateTokenLifetime (string) from the installUrlOptions if present', async () => {
      const installer = new InstallProvider({clientId, clientSecret, stateSecret});
      const installUrlOptions = { scopes: [ 'channels:read' ], stateTokenLifetime: '1h' };
      const state = await installer.stateStore.generateStateParam(installUrlOptions, new Date());
      assert.isAtLeast(decode(state).exp, Math.floor(Date.now() / 1000) + 3400)
    });

    it('should use the token stateTokenLifetime (number) from the installUrlOptions if present', async () => {
      const installer = new InstallProvider({clientId, clientSecret, stateSecret});
      const installUrlOptions = { scopes: [ 'channels:read' ], stateTokenLifetime: 3600 };
      const state = await installer.stateStore.generateStateParam(installUrlOptions, new Date());
      assert.isAtLeast(decode(state).exp, Math.floor(Date.now() / 1000) + 3400)
    });
  });
});
