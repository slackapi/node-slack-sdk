import { expectType } from 'tsd';
import { WebClient } from '../..';
import type { OauthAccessResponse } from '../../src/types/response/OauthAccessResponse';

const web = new WebClient();

expectType<Promise<OauthAccessResponse>>(
  web.oauth.access({
    client_id: 'CLIENT_ID',
    client_secret: 'CLIENT_SECRET',
    code: 'CODE',
    redirect_uri: 'REDIRECT_URI',
  }),
);
