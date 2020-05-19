const { InstallProvider } = require('@slack/oauth');
const { createEventAdapter } = require('@slack/events-api');
const { WebClient } = require('@slack/web-api');
const { randomBytes, timingSafeEqual } = require('crypto');
const express = require('express');
const cookie = require('cookie');
const { sign, verify } = require('jsonwebtoken');
// Using Keyv as an interface to our database
// see https://github.com/lukechilds/keyv for more info
const Keyv = require('keyv');

/**
 * These are all the environment variables that need to be available to the
 * NodeJS process (i.e. `export SLACK_CLIENT_ID=abc123`)
 */
const ENVVARS = {
  SLACK_CLIENT_ID: process.env.SLACK_CLIENT_ID,
  SLACK_CLIENT_SECRET: process.env.SLACK_CLIENT_SECRET,
  SLACK_SIGNING_SECRET: process.env.SLACK_SIGNING_SECRET,
  DEVICE_SECRET: process.env.SLACK_OAUTH_SECRET, // 256+ bit CSRNG
};

const app = express();
const port = 3000;


// Initialize slack events adapter
const slackEvents = createEventAdapter(ENVVARS.SLACK_SIGNING_SECRET);
// Set path to receive events
app.use('/slack/events', slackEvents.requestListener());

// can use different keyv db adapters here
// ex: const keyv = new Keyv('redis://user:pass@localhost:6379');
// using the basic in-memory one below
const keyv = new Keyv();

keyv.on('error', err => console.log('Connection Error', err));

const makeInstaller = (req, res) => new InstallProvider({
  clientId: ENVVARS.SLACK_CLIENT_ID,
  clientSecret: ENVVARS.SLACK_CLIENT_SECRET,
  authVersion: 'v1',
  installationStore: {
    storeInstallation: (installation) => {
      return keyv.set(installation.team.id, installation);
    },
    fetchInstallation: (InstallQuery) => {
      return keyv.get(InstallQuery.teamId);
    },
  },
  stateStore: {
    /**
     * Generates a value that will be used to link the OAuth "state" parameter
     * to User Agent (device) session.
     * @see https://tools.ietf.org/html/rfc6819#section-5.3.5
     * @param {InstallURLOptions} installUrlOptions - the object that was passed to `generateInstallUrl`
     * @param {Date} timestamp - now, in milliseconds
     * @return {String} - the value to be sent in the OAuth "state" parameter
     */
    generateStateParam: async (installUrlOptions, timestamp) => {
      /*
       * generate an unguessable value that will be used in the OAuth "state"
       * parameter, as well as in the User Agent
       */
      const synchronizer = randomBytes(16).toString('hex');

      /*
       * Create, and sign the User Agent session state
       */
      const token = await sign(
        { synchronizer, installUrlOptions },
        process.env.SLACK_OAUTH_SECRET,
        { expiresIn: '3m' }
      );

      /*
       * Add the User Agent session state to an http-only, secure, samesite cookie
       */
      res.setHeader('Set-Cookie', cookie.serialize('slack_oauth', token, {
        maxAge: 180,     // will expire in 3 minutes
        sameSite: 'lax', // limit the scope of the cookie to this site, but allow top level redirects
        path: '/',       // set the relative path that the cookie is scoped for
        secure: true,    // only support HTTPS connections
        httpOnly: true,  // dissallow client-side access to the cookie
        overwrite: true, // overwrite the cookie every time, so nonce data is never re-used
      }));

      /**
       * Return the value to be used in the OAuth "state" parameter
       * NOTE that this should not be the same, as the signed session state.
       * If you prefer the OAuth session state to also be a JWT, sign it with
       * a separate secret
       */
      return synchronizer;
    },
    /**
     * Verifies that the OAuth "state" parameter, and the User Agent session
     * are synchronized, and destroys the User Agent session, which should be a nonce
     * @see https://tools.ietf.org/html/rfc6819#section-5.3.5
     * @param {Date} timestamp - now, in milliseconds
     * @param {String} state - the value that was returned in the OAuth "state" parameter
     * @return {InstallURLOptions} - the object that was passed to `generateInstallUrl`
     * @throws {Error} if the User Agent session state is invalid, or if the
     *   OAuth "state" parameter, and the state found in the User Agent session
     *   do not match
     */
    verifyStateParam: async (timestamp, state) => {
      /*
       * Get the cookie header, if it exists
       */
      const cookies = cookie.parse(req.get('cookie') || '');

      /*
       * Remove the User Agent session - it should be a nonce
       */
      res.setHeader('Set-Cookie', cookie.serialize('slack_oauth', 'expired', {
        maxAge: -99999999, // set the cookie to expire in the past
        sameSite: 'lax',   // limit the scope of the cookie to this site, but allow top level redirects
        path: '/',         // set the relative path that the cookie is scoped for
        secure: true,      // only support HTTPS connections
        httpOnly: true,    // dissallow client-side access to the cookie
        overwrite: true,   // overwrite the cookie every time, so nonce data is never re-used
      }));

      /*
       * Verify that the User Agent session was signed by this server, and
       * decode the session
       */
      const {
        synchronizer,
        installUrlOptions
      } = await verify(cookies.slack_oauth, process.env.SLACK_OAUTH_SECRET);

      /*
       * Verify that the value in the OAuth "state" parameter, and in the
       * User Agent session are equal, and prevent timing attacks when
       * comparing the values
       */
      if (!timingSafeEqual(Buffer.from(synchronizer), Buffer.from(state))) {
        throw new Error('The OAuth state, and device state are not synchronized. Try again.');
      }

      /**
       * Return the object that was passed to `generateInstallUrl`
       */
      return installUrlOptions
    }
  },
});

app.get('/', (req, res) =>
  res.send(`<a href="/slack/install"><img alt=""Add to Slack"" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>`)
);

app.get('/slack/install', async (req, res) => {
  try {
    const installer = makeInstaller(req, res);
    const redirectUrl = await installer.generateInstallUrl({
      scopes: ['channels:read', 'groups:read', 'incoming-webhook', 'bot' ],
      metadata: 'some_metadata',
      redirectUri: `https://${req.get('host')}/slack/oauth_redirect`,
    });

    const htmlResponse = '<html>'
      + `\n<meta http-equiv="refresh" content="0; URL=${redirectUrl}">`
      + '\n<body>'
      + '\n  <h1>Success! Redirecting to the Slack App...</h1>'
      + `\n  <button onClick="window.location = '${redirectUrl}'">Click here to redirect</button>`
      + '\n</body></html>';
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlResponse);
  } catch(error) {
    console.log(error)
  }
});

// example 1: use default success and failure handlers
app.get('/slack/oauth_redirect', async (req, res) => {
  const installer = makeInstaller(req, res);
  await installer.handleCallback(req, res);
});

// example 2: using custom success and failure handlers
// const callbackOptions = {
//   success: (installation, installOptions, req, res) => {
//     res.send('successful!');
//   },
//   failure: (error, installOptions , req, res) => {
//     res.send('failure');
//   },
// }

// app.get('/slack/oauth_redirect', async (req, res) => {
//   const installer = makeInstaller(req, res);
//   await installer.handleCallback(req, res, callbackOptions);
// });

// When a user navigates to the app home, grab the token from our database and publish a view
slackEvents.on('app_home_opened', async (event) => {
  try {
    if (event.tab === 'home') {
      const DBInstallData = await installer.authorize({teamId:event.view.team_id});
      const web = new WebClient(DBInstallData.botToken);
      await web.views.publish({
        user_id: event.user,
        view: {
          "type":"home",
          "blocks":[
            {
              "type": "section",
              "block_id": "section678",
              "text": {
                "type": "mrkdwn",
                "text": "Welcome to the App Home!"
              },
            }
          ]
        },
      });
    }
  }
  catch (error) {
    console.error(error);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}! Go to http://localhost:3000 to initiate oauth flow`))
