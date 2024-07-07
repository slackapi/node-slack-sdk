import { expectAssignable, expectError } from 'tsd';

import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// Reusable openid.* API partial argument objects for these tests
const creds = { client_id: 'C1234', client_secret: '1234.567' };

// openid.connect.token
// -- sad path
expectError(web.openid.connect.token()); // lacking argument
expectError(web.openid.connect.token({})); // empty argument
expectError(web.openid.connect.token({
  client_id: 'C1234', // missing client_secret
}));
expectError(web.openid.connect.token({
  client_secret: '1234.567', // missing `client_id`
}));
// -- happy path
expectAssignable<Parameters<typeof web.openid.connect.token>>([{
  ...creds,
}]);

// openid.connect.userInfo
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.openid.connect.userInfo>>([{}]); // all optional args
expectAssignable<Parameters<typeof web.openid.connect.userInfo>>([]); // no arg is fine
