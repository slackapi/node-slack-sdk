const oauthHelper = require('../../dist/index');
const express = require('express');

const app = express();
const port = 3000;

const installer = new oauthHelper.InstallProvider({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  authVersion: 'v2',
  stateSecret: 'super-secret'
});

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/begin_auth', (req, res, next) => {
  installer.generateInstallUrl({
    scopes: ['channels:read', 'groups:read', 'channels:manage', 'chat:write'],
    metadata: 'some_metadata',
  }).then((url) => {
    res.send(`<a href=${url}>Add to Slack</a>`);
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
// use OAuth helpers default success and failure methods
app.get('/slack/install', (req, res) => {
  installer.handleCallback(req, res, {});
});

// callbackOptions object with success and failure methods
// app.get('/slack/install', (req, res) => {
//   installer.handleCallback(req, res, callbackOptions);
// });

// use OAuth helpers default success and failure methods
// app.get('/slack/install', installer.handleCallback);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
