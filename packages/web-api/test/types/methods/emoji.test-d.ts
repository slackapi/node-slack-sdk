import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// emoji.list
// -- sad path
expectError(web.emoji.list()); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.emoji.list>>([{}]); // all optional args
