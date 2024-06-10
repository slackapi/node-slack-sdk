import { expectAssignable } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// bots.info
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.bots.info>>([{}]); // all optional args
expectAssignable<Parameters<typeof web.bots.info>>([]); // no arg is fine
