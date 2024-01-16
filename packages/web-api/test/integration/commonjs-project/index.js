/* eslint-disable */
const WebApi = require('../../../dist/index');
const client = new WebApi.WebClient('invalid-token');
const assert = require('assert');
client.auth.test().then((res) => {
  console.error('❌ Unexpected `auth.test` API success! Exiting CJS project integration test with non-zero exit code.');
  process.exit(1);
}).catch((e) => {
  assert(e.message.includes('invalid_auth'), '❌ Did not receive expected "invalid_auth" response from `auth.test` API, CJS project integration test failed.');
  console.log('✅ CJS project integration test succeeded!');
});
