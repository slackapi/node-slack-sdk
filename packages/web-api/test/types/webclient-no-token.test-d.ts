import { expectType } from 'tsd';
import { WebClient, WebAPICallResult } from '../../';

const web = new WebClient();

expectType<Promise<WebAPICallResult>>(web.oauth.access({
  client_id: 'CLIENT_ID',
  client_secret: 'CLIENT_SECRET',
  code: 'CODE',
  redirect_uri: 'REDIRECT_URI',
}));
