import { WebClient } from '@slack/web-api';

const web = new WebClient();

// $ExpectType Promise<WebAPICallResult>
web.oauth.access({
  client_id: 'CLIENT_ID',
  client_secret: 'CLIENT_SECRET',
  code: 'CODE',
  redirect_uri: 'REDIRECT_URI',
});
