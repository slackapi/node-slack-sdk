const { InstallProvider } = require('@slack/oauth');
const express = require('express');
// Using Keyv as an interface to our database
// see https://github.com/lukechilds/keyv for more info
const Keyv = require('keyv');

const app = express();
const port = 3000;

// can use different keyv db adapters here
// ex: const keyv = new Keyv('redis://user:pass@localhost:6379');
// using the basic in-memory one below
const keyv = new Keyv();

keyv.on('error', err => console.log('Connection Error', err));

const installer = new InstallProvider({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  authVersion: 'v2',
  stateSecret: 'my-state-secret',
  installationStore: {
    storeInstallation: (installation) => {
      return keyv.set(installation.team.id, installation);
    },
    fetchInstallation: (InstallQuery) => {
      return keyv.get(InstallQuery.teamId);
    },
  },
});

app.get('/', (req, res) => res.send('go to /begin_auth'));

app.get('/begin_auth', (req, res, next) => {
  // feel free to modify the scopes
  installer.generateInstallUrl({
    scopes: ['channels:read', 'groups:read', 'channels:manage', 'chat:write', 'incoming-webhook'],
    metadata: 'some_metadata',
  }).then((url) => {
    res.send(`<a href=${url}><img alt=""Add to Slack"" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>`);
  }).catch(next);
});

// example 1
// empty callbackOptions Object
// use slackOauth default success and failure methods
app.get('/slack/install', (req, res) => {
  installer.handleCallback(req, res);
});

// example 2
// const callbackOptions = {
//   success: (installation, metadata, req, res) => {
//     res.send('successful!');
//   },
//   failure: (error, installOptions , req, res) => {
//     res.send('failure');
//   },
// }
// // callbackOptions object with success and failure methods
// app.get('/slack/install', (req, res) => {
//   installer.handleCallback(req, res, callbackOptions);
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
