import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// auth.revoke
// -- sad path
expectError(web.auth.revoke()); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.auth.revoke>>([{}]); // all optional args

// auth.teams.list
// -- sad path
expectError(web.auth.teams.list()); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.auth.teams.list>>([{}]); // all optional args

// auth.test
// -- sad path
expectError(web.auth.test()); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.auth.test>>([{}]); // all optional args
