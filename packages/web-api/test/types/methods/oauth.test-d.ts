import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// Reusable openid.* API partial argument objects for these tests
const creds = { client_id: 'C1234', client_secret: '1234.567' };

// oauth.access
// -- sad path
expectError(web.oauth.access()); // lacking argument
expectError(web.oauth.access({})); // empty argument
expectError(
  web.oauth.access({
    client_id: 'C1234', // missing client_secret
  }),
);
expectError(
  web.oauth.access({
    client_secret: '1234.567', // missing `client_id`
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.oauth.access>>([
  {
    ...creds,
  },
]);

// oauth.v2.access
// -- sad path
expectError(web.oauth.v2.access()); // lacking argument
expectError(web.oauth.v2.access({})); // empty argument
expectError(
  web.oauth.v2.access({
    client_id: 'C1234', // missing client_secret
  }),
);
expectError(
  web.oauth.v2.access({
    client_secret: '1234.567', // missing `client_id`
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.oauth.v2.access>>([
  {
    ...creds,
  },
]);

// oauth.v2.exchange
// -- sad path
expectError(web.oauth.v2.exchange()); // lacking argument
expectError(web.oauth.v2.exchange({})); // empty argument
expectError(
  web.oauth.v2.exchange({
    client_id: 'C1234', // missing client_secret, token
  }),
);
expectError(
  web.oauth.v2.exchange({
    client_secret: '1234.567', // missing `client_id`, token
  }),
);
expectError(
  web.oauth.v2.exchange({
    token: 'xoxp-blah', // missing `client_id`, client_secret
  }),
);
expectError(
  web.oauth.v2.exchange({
    client_id: 'C1234',
    client_secret: '1234.567', // missing token
  }),
);
expectError(
  web.oauth.v2.exchange({
    client_id: 'C1234',
    token: 'xoxb-blah', // missing client_secret
  }),
);
expectError(
  web.oauth.v2.exchange({
    client_secret: '1234.567',
    token: 'xoxb-blah', // missing client_id
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.oauth.v2.exchange>>([
  {
    token: 'xoxb-blah',
    ...creds,
  },
]);

// oauth.v2.user.access
// -- sad path
expectError(web.oauth.v2.user.access()); // lacking argument
expectError(web.oauth.v2.user.access({})); // empty argument
expectError(
  web.oauth.v2.user.access({
    client_id: 'C1234', // missing client_secret
  }),
);
expectError(
  web.oauth.v2.user.access({
    client_secret: '1234.567', // missing `client_id`
  }),
);
expectError(
  web.oauth.v2.user.access({
    ...creds,
    grant_type: 'client_credentials', // invalid grant_type
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.oauth.v2.user.access>>([
  {
    ...creds,
    code: '4724469134.4644010092847.232b4e6d82c333b475fc30f5f5a341d294feb1a94392c2fd791f7ab7731a443d1a',
    code_verifier: 'secret12345',
    redirect_uri: 'http://example.com',
  },
]);
expectAssignable<Parameters<typeof web.oauth.v2.user.access>>([
  {
    ...creds,
    grant_type: 'refresh_token',
    refresh_token: 'xoxe-1-abcdefg',
  },
]);
expectAssignable<Parameters<typeof web.oauth.v2.user.access>>([
  {
    ...creds,
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: 'eyJhbGciOiJSUzI1NiIsInR…',
  },
]);
