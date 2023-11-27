import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// admin.barriers.create
// -- sad path
expectError(web.admin.barriers.create()); // lacking argument
expectError(web.admin.barriers.create({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.barriers.create>>([{}]); // all optional args
