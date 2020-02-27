const slackOauth = require('../../dist/index');
const express = require('express');

const app = express();
const port = 3000;

const installer = new slackOauth.InstallProvider({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  authVersion: 'v2',
  stateSecret: 'my-state-secret'
});

app.get('/', (req, res) => res.send('go to /begin_auth'));

app.get('/begin_auth', (req, res, next) => {
  installer.generateInstallUrl({
    scopes: ['channels:read', 'groups:read', 'channels:manage', 'chat:write', 'incoming-webhook'],
    metadata: 'some_metadata',
  }).then((url) => {
    res.send(`<a href=${url}><img alt=""Add to Slack"" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>`);
  }).catch(next);
});

const callbackOptions = {
  success: () => {
    console.log('success!')
  },
  failure: () => {
    console.log('fail')
  },
}

// empty callbackOptions Object
// use slackOauth default success and failure methods
app.get('/slack/install', (req, res) => {
  installer.handleCallback(req, res, {});
});

// callbackOptions object with success and failure methods
// app.get('/slack/install', (req, res) => {
//   installer.handleCallback(req, res, callbackOptions);
// });

// use slackOauth default success and failure methods
// app.get('/slack/install', installer.handleCallback);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
