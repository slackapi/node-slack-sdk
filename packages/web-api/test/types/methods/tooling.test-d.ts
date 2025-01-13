import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// tooling.tokens.rotate
// -- sad path
expectError(web.tooling.tokens.rotate()); // lacking argument
expectError(web.tooling.tokens.rotate({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.tooling.tokens.rotate>>([
  {
    refresh_token: '1234', // must specify refresh_token
  },
]);
