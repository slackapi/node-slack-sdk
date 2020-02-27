require('mocha');
const { assert } = require('chai');
const { InstallProvider } = require('./index');
const url = require('url');
const clientSecret = 'MY_SECRET';
const clientId = 'MY_ID';
const stateSecret = 'stateSecret';

// stateStore for testing
const stateStore = {
    generateStateParam: (now, metadata) => {
        const state = { metadata, now: now.toJSON() };
        return new Promise((resolve) => {
          resolve(state);
        });
    },
    verifyStateParam: (_now, stateObj) => {
        //const state = stateObj.state;
        const metadata = stateObj.metadata;

        // return metadata string
        return new Promise((resolve) => {
            resolve(metadata);
        });
    }
}

// Installation Store for testing
const devDB = {};
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

describe('OAuth', function () {

    describe('constructor()', function () {
      it('should build a default installer given a clientID, client secret and stateSecret', function () {
        const installer = new InstallProvider({clientId, clientSecret, stateSecret});
        assert.instanceOf(installer, InstallProvider);
        assert.equal(installer.authVersion, 'v2');
      });

      it('should build a default installer given a clientID, client secret and state store', function () {
        const installer = new InstallProvider({clientId, clientSecret, stateStore});
        assert.instanceOf(installer, InstallProvider);
      });

      it('should build a default installer given a clientID, client secret, stateSecrect and installationStore', function () {
        const installer = new InstallProvider({clientId, clientSecret, stateSecret, installationStore});
        assert.instanceOf(installer, InstallProvider);
      });

      it('should build a default installer given a clientID, client secret, stateSecrect and authVersion v2', function () {
        const installer = new InstallProvider({clientId, clientSecret, stateSecret, authVersion: 'v2'});
        assert.instanceOf(installer, InstallProvider);
        assert.equal(installer.authVersion, 'v2');
      });

      it('should build a default installer given a clientID, client secret, stateSecrect and authVersion v1', function () {
        const installer = new InstallProvider({clientId, clientSecret, stateSecret, authVersion: 'v1'});
        assert.instanceOf(installer, InstallProvider);
        assert.equal(installer.authVersion, 'v1');
      });

      it('should throw an error if missing a clientSecret', function () {
        try {
            const installer = new InstallProvider({clientId, stateSecret});
        } catch (error) {
            assert.equal(error.message, 'You must provide a valid clientId and clientSecret');
        }
      });

      it('should throw an error if missing a clientID', function () {
        try {
            const installer = new InstallProvider({clientSecret, stateSecret});
        } catch (error) {
            assert.equal(error.message, 'You must provide a valid clientId and clientSecret');
        }
      });

      it('should throw an error if missing a stateSecret when using default state store', function () {
        try {
            const installer = new InstallProvider({clientId, clientSecret});
        } catch (error) {
            assert.equal(error.message, 'You must provide a State Secret to use the built-in state store');
        }
      });
    });

    describe('generateInstallUrl', function() {
        it('should return a generated v2 url', async function() {
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
                const parsedUrl = url.parse(generatedUrl);
                assert.equal(parsedUrl.pathname, '/oauth/v2/authorize');
                var scopeRegex = /scope=(.*)&state/;
                var scopeMatches = scopeRegex.exec(parsedUrl.query);
                assert.equal(scopes.join(','), scopeMatches[1]);
                const redirectUriRegex = /redirect_uri=(.*)&team/;
                const redirectMatches = redirectUriRegex.exec(parsedUrl.query);
                assert.equal(redirectUri, redirectMatches[1]);
                const teamRegex = /team=(.*)&user_scope/;
                const teamMatches = teamRegex.exec(parsedUrl.query);
                assert.equal(teamId, teamMatches[1]);
                const userRegex = /user_scope=(.*)/;
                const userMatches = userRegex.exec(parsedUrl.query);
                assert.equal(userScopes.join(','), userMatches[1]);
            } catch (error) {
                assert.fail(error.message);
            }
        });
        it('should return a generated v1 url', async function() {
            const installer = new InstallProvider({clientId, clientSecret, stateSecret, authVersion: 'v1'});
            const scopes = ['channels:read'];
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
                const parsedUrl = url.parse(generatedUrl);
                assert.equal(parsedUrl.pathname, '/oauth/authorize');
                const scopeRegex = /scope=(.*)&state/;
                const scopeMatches = scopeRegex.exec(parsedUrl.query);
                assert.equal(scopes.join(','), scopeMatches[1]);
                const redirectUriRegex = /redirect_uri=(.*)&team/;
                const redirectMatches = redirectUriRegex.exec(parsedUrl.query);
                assert.equal(redirectUri, redirectMatches[1]);
                const teamRegex = /team=(.*)/;
                const teamMatches = teamRegex.exec(parsedUrl.query);
                assert.equal(teamId, teamMatches[1]);
            } catch (error) {
                assert.fail(error.message);
            }
        });
        it('should fail if missing scopes', async function() {
            const installer = new InstallProvider({clientId, clientSecret, stateSecret});
            try {
                const generatedUrl = await installer.generateInstallUrl({})
                assert.exists(generatedUrl);
            } catch (error) {
                assert.equal(error.message, 'You must provide a scope paramter when calling generateInstallUrl');
            }
        });
    });
});