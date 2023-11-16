import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// rtm.connect
// -- sad path
expectError(web.rtm.connect()); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.rtm.connect>>([{}]); // all optional arguments

// rtm.start
// -- sad path
expectError(web.rtm.start()); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.rtm.start>>([{}]); // all optional arguments
