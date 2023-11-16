import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// team.accessLogs
// -- sad path
expectError(web.team.accessLogs()); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.team.accessLogs>>([{}]); // all optional arguments

// team.billableInfo
// -- sad path
expectError(web.team.billableInfo()); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.team.billableInfo>>([{}]); // all optional arguments

// team.billing.info
// -- sad path
expectError(web.team.billing.info()); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.team.billing.info>>([{}]); // all optional arguments

// team.integrationLogs
// -- sad path
expectError(web.team.integrationLogs()); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.team.integrationLogs>>([{}]); // all optional arguments

// team.profile.get
// -- sad path
expectError(web.team.profile.get()); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.team.profile.get>>([{}]); // all optional arguments

// team.preferences.list
// -- sad path
expectError(web.team.preferences.list()); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.team.preferences.list>>([{}]); // all optional arguments
