// https://api.slack.com/legacy/sign-in-with-slack
const Koa = require('koa');
const Router = require('@koa/router');
const { WebClient } = require('@slack/web-api');
const uuid = require('uuid');

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
  ctx.redirect('/slack/install');
});

const clientId = process.env.SLACK_CLIENT_ID;
const clientSecret = process.env.SLACK_CLIENT_SECRET;
const legacyIdentityScopes = 'identity.basic,identity.email'; // identity.basic is required at least

class MyStateStore {
  constructor() {
    this.activeStates = {};
  }
  async generate() {
    const newValue = uuid.v4();
    this.activeStates[newValue] = Date.now() + 10 * 60 * 1000; // 10 minutes
    return newValue;
  }
  async validate(state) {
    const expiresAt = this.activeStates[state];
    if (expiresAt && Date.now() <= expiresAt) {
      delete this.activeStates[state];
      return true;
    }
    return false;
  }
}
const myStateStore = new MyStateStore();

router.get('/slack/install', async (ctx) => {
  const state = await myStateStore.generate();
  const url = `https://slack.com/oauth/v2/authorize?state=${state}&client_id=${clientId}&user_scope=${legacyIdentityScopes}`;

  ctx.headers['content-type'] = 'text/html; charset=utf-8';
  ctx.body = `<html>
  <head><style>body {padding: 10px 15px;font-family: verdana;text-align: center;}</style></head>
  <body>
  <h2>Sign in with Slack (Legacy)</h2>
  <p><a href="${url}"><img alt="Sign in with Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a></p>
  </body>
  </html>`;
});

const client = new WebClient();

router.get('/slack/oauth_redirect', async (ctx) => {
  if (!(await myStateStore.validate(ctx.query.state))) {
    ctx.status = 400;
    ctx.headers['content-type'] = 'text/html; charset=utf-8';
    ctx.body = `<html>
      <head><style>body {padding: 10px 15px;font-family: verdana;text-align: center;}</style></head>
      <body>
      <h2>Invalid request</h2>
      <p>Try again from <a href="./install">here</a></p>
      </body>
      </html>`;
    return;
  }

  const token = await client.oauth.v2.access({
    client_id: clientId,
    client_secret: clientSecret,
    code: ctx.query.code,
  });
  console.log(`oauth.v2.access response: ${JSON.stringify(token, null, 2)}`);

  let userAccessToken = token.authed_user.access_token;

  if (token.refresh_token) {
    // token.refresh_token can exist if the token rotation is enabled.
    // The following lines of code demonstrate how to refresh the token.
    // If you don't enable token rotation, you can safely remove this part.
    const refreshedToken = await client.oauth.v2.access({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'refresh_token',
      refresh_token: token.refresh_token,
    });
    console.log(`oauth.v2.access (refresh) response: ${JSON.stringify(refreshedToken, null, 2)}`);
    userAccessToken = refreshedToken.access_token;
  }

  // TODO: you can do something meaningful here
  // (e.g., storing the data in database + navigating the user to your service top paeg)

  // The is a quick example demonstrating how to perform users.identity with the given access token.
  // You don't need to do this here.
  const tokenWiredClient = new WebClient(userAccessToken);
  const userInfo = await tokenWiredClient.users.identity();
  console.log(`users.identity response: ${JSON.stringify(userInfo, null, 2)}`);

  ctx.headers['content-type'] = 'text/html; charset=utf-8';
  ctx.body = `<html>
  <head><style>body h2 {padding: 10px 15px;font-family: verdana;text-align: center;}</style></head>
  <body>
  <h2>users.identity response</h2>
  <pre>${JSON.stringify(userInfo, null, 2)}</pre>
  </body>
  </html>`;
});

// Enable the routes
app.use(router.routes()).use(router.allowedMethods());
// Start the web app, which is available at http://localhost:3000/slack/*
app.listen(3000);
console.log('app started');
