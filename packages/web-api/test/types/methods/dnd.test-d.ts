import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// dnd.endDnd
// -- sad path
expectError(web.dnd.endDnd()); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.dnd.endDnd>>([{}]); // all optional args

// dnd.endSnooze
// -- sad path
expectError(web.dnd.endSnooze()); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.dnd.endSnooze>>([{}]); // all optional args

// dnd.info
// -- sad path
expectError(web.dnd.info()); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.dnd.info>>([{}]); // all optional args

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
