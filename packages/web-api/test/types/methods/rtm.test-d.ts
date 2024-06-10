import { expectAssignable } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// rtm.connect
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.rtm.connect>>([{}]); // all optional arguments
expectAssignable<Parameters<typeof web.rtm.connect>>([]); // no arg is fine

// rtm.start
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.rtm.start>>([{}]); // all optional arguments
expectAssignable<Parameters<typeof web.rtm.start>>([]); // no arg is fine
