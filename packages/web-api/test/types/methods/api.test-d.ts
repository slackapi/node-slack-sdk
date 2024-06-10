import { expectAssignable } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// api.test
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.api.test>>([{}]); // all optional args
expectAssignable<Parameters<typeof web.api.test>>([]); // no arg is fine
