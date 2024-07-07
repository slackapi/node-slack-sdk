import { expectAssignable, expectError } from 'tsd';

import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// dnd.endDnd
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.dnd.endDnd>>([{}]); // all optional args
expectAssignable<Parameters<typeof web.dnd.endDnd>>([]); // no arg is fine

// dnd.endSnooze
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.dnd.endSnooze>>([{}]); // all optional args
expectAssignable<Parameters<typeof web.dnd.endSnooze>>([]); // no arg is fine

// dnd.info
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.dnd.info>>([{}]); // all optional args
expectAssignable<Parameters<typeof web.dnd.info>>([]); // no arg is fine

// dnd.setSnooze
// -- sad path
expectError(web.dnd.setSnooze()); // lacking argument
expectError(web.dnd.setSnooze({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.dnd.setSnooze>>([{
  num_minutes: 1,
}]);

// dnd.teamInfo
// -- sad path
expectError(web.dnd.teamInfo()); // lacking argument
expectError(web.dnd.teamInfo({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.dnd.teamInfo>>([{
  users: 'U1234',
}]);
