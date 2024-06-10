import { expectAssignable } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// team.accessLogs
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.team.accessLogs>>([{}]); // all optional arguments
expectAssignable<Parameters<typeof web.team.accessLogs>>([]); // no arg is fine

// team.billableInfo
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.team.billableInfo>>([{}]); // all optional arguments
expectAssignable<Parameters<typeof web.team.billableInfo>>([]); // no arg is fine

// team.billing.info
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.team.billing.info>>([{}]); // all optional arguments
expectAssignable<Parameters<typeof web.team.billing.info>>([]); // no arg is fine

// team.integrationLogs
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.team.integrationLogs>>([{}]); // all optional arguments
expectAssignable<Parameters<typeof web.team.integrationLogs>>([]); // no arg is fine

// team.profile.get
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.team.profile.get>>([{}]); // all optional arguments
expectAssignable<Parameters<typeof web.team.profile.get>>([]); // no arg is fine

// team.preferences.list
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.team.preferences.list>>([{}]); // all optional arguments
expectAssignable<Parameters<typeof web.team.preferences.list>>([]); // no arg is fine
