const { InstallProvider } = require('@slack/oauth');
const { createEventAdapter } = require('@slack/events-api');
const { WebClient } = require('@slack/web-api');
const express = require('express');

const app = express();
const port = 3000;

// Initialize slack events adapter
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET, {includeBody: true});
// Set path to receive events
app.use('/slack/events', slackEvents.requestListener());

const installer = new InstallProvider({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  authVersion: 'v1',
  stateSecret: process.env.SLACK_STATE_SECRET,
});

app.get('/', (req, res) => res.send('go to /slack/install'));

app.get('/slack/install', async (req, res, next) => {
  try {
    // feel free to modify the scopes
    const url = await installer.generateInstallUrl({
      scopes: ['channels:read', 'groups:read', 'incoming-webhook', 'bot' ],
      metadata: 'some_metadata',
    })
    
    res.send(`<a href=${url}><img alt=""Add to Slack"" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>`);
  } catch(error) {
    console.log(error)
  }
});

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

// When a user navigates to the app home, grab the token from our database and publish a view
slackEvents.on('app_home_opened', async (event, body) => {
  try {
    if (event.tab === 'home') {
      const DBInstallData = await installer.authorize({teamId:body.team_id, enterpriseId: body.enterprise_id});
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
