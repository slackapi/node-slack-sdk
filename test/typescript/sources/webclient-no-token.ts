
import { WebClient } from '../../../dist';

const web = new WebClient();

web.oauth.access({
  client_id: 'CLIENT_ID',
  client_secret: 'CLIENT_SECRET',
  code: 'CODE',
  redirect_uri: 'REDIRECT_URI',
});
