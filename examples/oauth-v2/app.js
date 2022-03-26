const { InstallProvider, LogLevel, FileInstallationStore } = require('@slack/oauth');
const { createEventAdapter } = require('@slack/events-api');
const { WebClient } = require('@slack/web-api');
const express = require('express');

const app = express();
const port = 3000;

// Initialize slack events adapter
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET, {
  includeBody: true,
});
// Set path to receive events
app.use('/slack/events', slackEvents.requestListener());

const scopes = ['app_mentions:read', 'channels:read', 'groups:read', 'channels:manage', 'chat:write', 'incoming-webhook'];
const userScopes = ['chat:write'];

const installer = new InstallProvider({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  authVersion: 'v2',
  stateSecret: 'my-state-secret',
  scopes,
  userScopes,
  installationStore: new FileInstallationStore(),
  logLevel: LogLevel.DEBUG,
});

app.get('/', (req, res) => res.send('go to /slack/install'));

app.get('/slack/install', async (req, res, next) => {
  await installer.handleInstallPath(req, res, {}, {
    scopes,
    userScopes,
    metadata: 'some_metadata',
  });
});

// This works since @slack/oauth@2.5.0 or newer
/*
app.get('/slack/install', async (req, res) => {
  await installer.handleInstallPath(req, res, {
    scopes,
    userScopes,
    metadata: 'some_metadata',
  });
});
*/

// example 1
// use default success and failure handlers
app.get('/slack/oauth_redirect', async (req, res) => {
  await installer.handleCallback(req, res);
});

// example 2
// using custom success and failure handlers
// const callbackOptions = {
//   success: (installation, installOptions, req, res) => {
//     res.send('successful!');
//   },
//   failure: (error, installOptions , req, res) => {
//     res.send('failure');
//   },
// }
//
// app.get('/slack/oauth_redirect', async (req, res) => {
//   await installer.handleCallback(req, res, callbackOptions);
// });

slackEvents.on('app_mention', async (event, body) => {
  console.log(event);
  let DBInstallData;
  if (body.authorizations !== undefined && body.authorizations[0].is_enterprise_install) {
    //org wide installation
    DBInstallData = await installer.authorize({
      enterpriseId: body.enterprise_id,
      userId: event.user,
      isEnterpriseInstall: true,
    });
  } else {
    // non org wide installation
    DBInstallData = await installer.authorize({
      enterpriseId: body.enterprise_id,
      teamId: body.team_id,
      userId: event.user,
      isEnterpriseInstall: false,
    });
  }
  const web = new WebClient(DBInstallData.botToken);
  await web.chat.postMessage({
    channel: event.channel,
    text: 'Hi there!',
  });
});

// When a user navigates to the app home, grab the token from our database and publish a view
slackEvents.on('app_home_opened', async (event, body) => {
  console.log(event);
  try {
    if (event.tab === 'home') {
      let DBInstallData;
      if (body.authorizations !== undefined && body.authorizations[0].is_enterprise_install) {
        //org wide installation
        DBInstallData = await installer.authorize({
          enterpriseId: body.enterprise_id,
          userId: event.user,
          isEnterpriseInstall: true,
        });
      } else {
        // non org wide installation
        DBInstallData = await installer.authorize({
          enterpriseId: body.enterprise_id,
          teamId: body.team_id,
          userId: event.user,
          isEnterpriseInstall: false,
        });
      }
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
app.listen(port, () => console.log(`Example app listening on port ${port}! Go to http://localhost:3000/slack/install to initiate oauth flow`))
