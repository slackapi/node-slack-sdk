import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// bots.info
// -- sad path
expectError(web.bots.info()); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.bots.info>>([{}]); // all optional args
