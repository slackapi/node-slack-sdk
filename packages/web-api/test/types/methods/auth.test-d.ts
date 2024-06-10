import { expectAssignable } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// auth.revoke
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.auth.revoke>>([{}]); // all optional args
expectAssignable<Parameters<typeof web.auth.revoke>>([]); // no arg is fine

// auth.teams.list
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.auth.teams.list>>([{}]); // all optional args
expectAssignable<Parameters<typeof web.auth.teams.list>>([]); // no arg is fine

// auth.test
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.auth.test>>([{}]); // all optional args
expectAssignable<Parameters<typeof web.auth.test>>([]); // no arg is fine
