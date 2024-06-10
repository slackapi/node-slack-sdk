import { expectAssignable } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// emoji.list
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.emoji.list>>([{}]); // all optional args
expectAssignable<Parameters<typeof web.emoji.list>>([]); // no arg is fine
