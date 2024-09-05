import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// admin.usergroups.addChannels
// -- sad path
expectError(web.admin.usergroups.addChannels()); // lacking argument
expectError(web.admin.usergroups.addChannels({})); // lacking argument
expectError(
  web.admin.usergroups.addChannels({
    channel_ids: 'C1234', // missing usergroup_id
  }),
);
expectError(
  web.admin.usergroups.addChannels({
    usergroup_id: 'S1234', // missing channel_ids
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.admin.usergroups.addChannels>>([
  {
    channel_ids: 'C1234', // can accept a string
    usergroup_id: 'S1234',
  },
]);
expectAssignable<Parameters<typeof web.admin.usergroups.addChannels>>([
  {
    channel_ids: ['C1234', 'C2345'], // can accept an array
    usergroup_id: 'S1234',
  },
]);

// admin.usergroups.addTeams
// -- sad path
expectError(web.admin.usergroups.addTeams()); // lacking argument
expectError(web.admin.usergroups.addTeams({})); // lacking argument
expectError(
  web.admin.usergroups.addTeams({
    team_ids: 'T1234', // missing usergroup_id
  }),
);
expectError(
  web.admin.usergroups.addTeams({
    usergroup_id: 'S1234', // missing team_ids
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.admin.usergroups.addTeams>>([
  {
    team_ids: 'T1234', // can accept a string
    usergroup_id: 'S1234',
  },
]);
expectAssignable<Parameters<typeof web.admin.usergroups.addTeams>>([
  {
    team_ids: ['T1234', 'T2345'], // can accept an array
    usergroup_id: 'S1234',
  },
]);

// admin.usergroups.listChannels
// -- sad path
expectError(web.admin.usergroups.listChannels()); // lacking argument
expectError(web.admin.usergroups.listChannels({})); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.usergroups.listChannels>>([
  {
    usergroup_id: 'S1234',
  },
]);

// admin.usergroups.removeChannels
// -- sad path
expectError(web.admin.usergroups.removeChannels()); // lacking argument
expectError(web.admin.usergroups.removeChannels({})); // lacking argument
expectError(
  web.admin.usergroups.removeChannels({
    channel_ids: 'C1234', // missing usergroup_id
  }),
);
expectError(
  web.admin.usergroups.removeChannels({
    usergroup_id: 'S1234', // missing channel_ids
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.admin.usergroups.removeChannels>>([
  {
    channel_ids: 'C1234', // can accept a string
    usergroup_id: 'S1234',
  },
]);
expectAssignable<Parameters<typeof web.admin.usergroups.removeChannels>>([
  {
    channel_ids: ['C1234', 'C2345'], // can accept an array
    usergroup_id: 'S1234',
  },
]);
