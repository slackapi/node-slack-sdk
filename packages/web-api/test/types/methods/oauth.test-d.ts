import { expectAssignable, expectError } from 'tsd';

import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// Reusable openid.* API partial argument objects for these tests
const creds = { client_id: 'C1234', client_secret: '1234.567' };

// oauth.access
// -- sad path
expectError(web.oauth.access()); // lacking argument
expectError(web.oauth.access({})); // empty argument
expectError(web.oauth.access({
  client_id: 'C1234', // missing client_secret
}));
expectError(web.oauth.access({
  client_secret: '1234.567', // missing `client_id`
}));
// -- happy path
expectAssignable<Parameters<typeof web.oauth.access>>([{
  ...creds,
}]);

// oauth.v2.access
// -- sad path
expectError(web.oauth.v2.access()); // lacking argument
expectError(web.oauth.v2.access({})); // empty argument
expectError(web.oauth.v2.access({
  client_id: 'C1234', // missing client_secret
}));
expectError(web.oauth.v2.access({
  client_secret: '1234.567', // missing `client_id`
}));
// -- happy path
expectAssignable<Parameters<typeof web.oauth.v2.access>>([{
  ...creds,
}]);

// oauth.v2.exchange
// -- sad path
expectError(web.oauth.v2.exchange()); // lacking argument
expectError(web.oauth.v2.exchange({})); // empty argument
expectError(web.oauth.v2.exchange({
  client_id: 'C1234', // missing client_secret, token
}));
expectError(web.oauth.v2.exchange({
  client_secret: '1234.567', // missing `client_id`, token
}));
expectError(web.oauth.v2.exchange({
  token: 'xoxp-blah', // missing `client_id`, client_secret
}));
expectError(web.oauth.v2.exchange({
  client_id: 'C1234',
  client_secret: '1234.567', // missing token
}));
expectError(web.oauth.v2.exchange({
  client_id: 'C1234',
  token: 'xoxb-blah', // missing client_secret
}));
expectError(web.oauth.v2.exchange({
  client_secret: '1234.567',
  token: 'xoxb-blah', // missing client_id
}));
// -- happy path
expectAssignable<Parameters<typeof web.oauth.v2.exchange>>([{
  token: 'xoxb-blah',
  ...creds,
}]);
