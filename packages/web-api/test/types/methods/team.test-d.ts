import { expectAssignable, expectError, expectType } from 'tsd';

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

// team.externalTeams.disconnect
// -- sad path
expectError(web.team.externalTeams.disconnect()); // lacking argument
expectError(web.team.externalTeams.disconnect({})); // missing `target_team`
// -- happy path
expectAssignable<Parameters<typeof web.team.externalTeams.disconnect>>([
  {
    target_team: 'T1234',
  },
]);

// team.externalTeams.list
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.team.externalTeams.list>>([{}]); // all optional args

// team.info
// -- sad path
expectError(web.team.info({ include_slackbot_availability: 'true' }));
// -- happy path
expectAssignable<Parameters<typeof web.team.info>>([{}]); // all optional arguments
expectAssignable<Parameters<typeof web.team.info>>([]); // no arg is fine
expectAssignable<Parameters<typeof web.team.info>>([{ include_slackbot_availability: true }]);
expectAssignable<Parameters<typeof web.team.info>>([{ team: 'T1234', include_slackbot_availability: false }]);
expectAssignable<Parameters<typeof web.team.info>>([{ domain: 'example', include_slackbot_availability: true }]);
web.team.info({ include_slackbot_availability: true }).then((response) => {
  expectType<string | undefined>(response.team?.slackbot_availability);
});

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
