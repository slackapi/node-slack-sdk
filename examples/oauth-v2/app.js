const { InstallProvider } = require('@slack/oauth');
const { createEventAdapter } = require('@slack/events-api');
const { WebClient } = require('@slack/web-api');
const express = require('express');
const cookie = require('cookie');
const { sign, verify } = require('jsonwebtoken');
// Using Keyv as an interface to our database
// see https://github.com/lukechilds/keyv for more info
const Keyv = require('keyv');

const app = express();
const port = 3000;


// Initialize slack events adapter
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);

// Set path to receive events
app.use('/slack/events', slackEvents.requestListener());

// can use different keyv db adapters here
// ex: const keyv = new Keyv('redis://user:pass@localhost:6379');
// using the basic in-memory one below
const keyv = new Keyv();

keyv.on('error', err => console.log('Connection Error', err));

const stateSecret = '1f0e1b640397bf93ad3369de65dbaf52';
const deviceSecret = '56b5317ab86840f9f3feca188778be3';
const installer = new InstallProvider({
  stateSecret,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  authVersion: 'v2',
  installationStore: {
    storeInstallation: (installation) => {
      return keyv.set(installation.team.id, installation);
    },
    fetchInstallation: (InstallQuery) => {
      return keyv.get(InstallQuery.teamId);
    },
  },
});

app.get('/', (req, res) =>
  res.send(`<a href="/slack/install"><img alt=""Add to Slack"" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>`)
);

app.get('/slack/install', async (req, res) => {
  try {
    // feel free to modify the scopes
    const { url, synchronizer } = await installer.makeInstallUrl({
      scopes: ['channels:read'], // , 'groups:read', 'channels:manage', 'chat:write', 'incoming-webhook'],
      metadata: 'some_metadata',
      redirectUri: `https://${req.get('host')}/slack/oauth_redirect`,
    });
    const token = await sign({ synchronizer }, deviceSecret, { expiresIn: '3m' });

    res.setHeader('Set-Cookie', cookie.serialize('slack_oauth', token, {
      maxAge: 180,     // will expire in 3 minutes
      sameSite: 'lax', // limit the scope of the cookie to this site, but allow top level redirects
      path: '/',       // set the relative path that the cookie is scoped for
      secure: true,    // only support HTTPS connections
      httpOnly: true,  // dissallow client-side access to the cookie
      overwrite: true, // overwrite the cookie every time, so nonce data is never re-used
    }));
    res.redirect(url);
  } catch(error) {
    console.log(error)
  }
});

// example 1
// use default success and failure handlers
app.get('/slack/oauth_redirect', async (req, res) => {
  try {
    const cookies = cookie.parse(req.get('cookie') || '');
    res.setHeader('Set-Cookie', cookie.serialize('slack_oauth', 'expired', {
      maxAge: -99999999, // set the cookie to expire in the past
      sameSite: 'lax',   // limit the scope of the cookie to this site, but allow top level redirects
      path: '/',         // set the relative path that the cookie is scoped for
      secure: true,      // only support HTTPS connections
      httpOnly: true,    // dissallow client-side access to the cookie
      overwrite: true,   // overwrite the cookie every time, so nonce data is never re-used
    }));

    const { synchronizer } = await verify(cookies.slack_oauth, deviceSecret);

    if (typeof synchronizer !== 'string') {
      throw new Error('Expected a synchronizer token to exist in the JWT');
    }

    await installer.handleCallback(req, res, { synchronizer });
  } catch (e) {
    console.log(e);
    res.send(`Something went wrong. Try again? <a href="/slack/install"><img alt=""Add to Slack"" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>`)
  }
});

// example 2
// using custom success and failure handlers
// app.get('/slack/oauth_redirect', async (req, res) => {
//   try {
//     const cookies = cookie.parse(req.get('cookie') || '');
//     res.setHeader('Set-Cookie', cookie.serialize('slack_oauth', 'expired', {
//       maxAge: -99999999, // set the cookie to expire in the past
//       sameSite: 'lax', // limit the scope of the cookie to this site, but allow top level redirects
//       path: '/', // set the relative path that the cookie is scoped for
//       secure: true, // only support HTTPS connections
//       httpOnly: true, // dissallow client-side access to the cookie
//       overwrite: true, // overwrite the cookie every time, so nonce data is never re-used
//     }));

//     const { synchronizer } = await verify(cookies.slack_oauth, deviceSecret);

//     if (typeof synchronizer !== 'string') {
//       throw new Error('Expected a synchronizer token to exist in the JWT');
//     }

//     await installer.handleCallback(req, res, {
//       synchronizer,
//       success: (installation, metadata, req, res) => {
//         res.send('successful!');
//       },
//       failure: (error, installOptions , req, res) => {
//         console.log(error);
//         res.send(`Something went wrong. Try again? <a href="/slack/install"><img alt=""Add to Slack"" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>`);
//       },
//     });
//   } catch (e) {
//     console.log(e);
//     res.send(`Something went wrong. Try again? <a href="/slack/install"><img alt=""Add to Slack"" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>`);
//   }
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
