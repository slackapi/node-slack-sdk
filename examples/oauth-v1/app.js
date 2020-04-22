const { InstallProvider } = require('@slack/oauth');
const express = require('express');

const app = express();
const port = 3000;

const installer = InstallProvider({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  authVersion: 'v1',
  stateSecret: 'super-secret'
});

app.get('/', (req, res) => res.send('go to /slack/install'));

app.get('/slack/install', (req, res, next) => {
  installer.generateInstallUrl({
    scopes: ['channels:read', 'bot', 'incoming-webhook'],
    metadata: 'some_metadata',
  }).then((url) => {
    res.send(`<a href=${url}><img alt=""Add to Slack"" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>`);
  }).catch(next);
});

const callbackOptions = {
  success: (installation, metadata, req, res) => {
    console.log('success!')
  },
  failure: (error, installOptions , req, res) => {
    console.log('fail')
  },
}

// example 1
// empty callbackOptions Object
// use slackOauth default success and failure methods
app.get('/slack/oauth_redirect', (req, res) => {
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
// callbackOptions object with success and failure methods
// app.get('/slack/oauth_redirect', (req, res) => {
//   installer.handleCallback(req, res, callbackOptions);
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
