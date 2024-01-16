import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// api.test
// -- sad path
expectError(web.api.test()); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.api.test>>([{}]); // all optional args
