import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// admin.conversations.archive
// -- sad path
expectError(web.admin.conversations.archive()); // lacking argument
expectError(web.admin.conversations.archive({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.archive>>([
  {
    channel_id: 'C1234',
  },
]);

// admin.conversations.bulkArchive
// -- sad path
expectError(web.admin.conversations.bulkArchive()); // lacking argument
expectError(web.admin.conversations.bulkArchive({})); // empty argument
expectError(
  web.admin.conversations.bulkArchive({
    channel_ids: [], // must include at least one element
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.bulkArchive>>([
  {
    channel_ids: ['C1234'],
  },
]);

// admin.conversations.bulkDelete
// -- sad path
expectError(web.admin.conversations.bulkDelete()); // lacking argument
expectError(web.admin.conversations.bulkDelete({})); // empty argument
expectError(
  web.admin.conversations.bulkDelete({
    channel_ids: [], // must include at least one element
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.bulkDelete>>([
  {
    channel_ids: ['C1234'],
  },
]);

// admin.conversations.bulkMove
// -- sad path
expectError(web.admin.conversations.bulkMove()); // lacking argument
expectError(web.admin.conversations.bulkMove({})); // empty argument
expectError(
  web.admin.conversations.bulkMove({
    channel_ids: ['C1234'], // missing target_team_id
  }),
);
expectError(
  web.admin.conversations.bulkMove({
    target_team_id: 'T1234', // missing channel_ids
  }),
);
expectError(
  web.admin.conversations.bulkMove({
    target_team_id: 'T1234',
    channel_ids: [], // must include at least one element
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.bulkMove>>([
  {
    target_team_id: 'T1234',
    channel_ids: ['C1234'],
  },
]);

// admin.conversations.convertToPrivate
// -- sad path
expectError(web.admin.conversations.convertToPrivate()); // lacking argument
expectError(web.admin.conversations.convertToPrivate({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.convertToPrivate>>([
  {
    channel_id: 'C1234',
  },
]);

// admin.conversations.convertToPublic
// -- sad path
expectError(web.admin.conversations.convertToPublic()); // lacking argument
expectError(web.admin.conversations.convertToPublic({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.convertToPublic>>([
  {
    channel_id: 'C1234',
  },
]);

// admin.conversations.create
// -- sad path
expectError(web.admin.conversations.create()); // lacking argument
expectError(web.admin.conversations.create({})); // empty argument
expectError(
  web.admin.conversations.create({
    is_private: true, // missing name and either teamid or orgwide
  }),
);
expectError(
  web.admin.conversations.create({
    name: 'test', // missing is_private and either teamid or orgwide
  }),
);
expectError(
  web.admin.conversations.create({
    org_wide: true, // missing is_private and name
  }),
);
expectError(
  web.admin.conversations.create({
    team_id: 'T1234', // missing is_private and name
  }),
);
expectError(
  web.admin.conversations.create({
    is_private: true, // missing either teamid or orgwide
    name: 'test',
  }),
);
expectError(
  web.admin.conversations.create({
    is_private: true, // missing name
    org_wide: true,
  }),
);
expectError(
  web.admin.conversations.create({
    is_private: true, // missing name
    team_id: 'T1234',
  }),
);
expectError(
  web.admin.conversations.create({
    name: 'test',
    org_wide: true, // missing is_private
  }),
);
expectError(
  web.admin.conversations.create({
    name: 'test',
    team_id: 'T1234', // missing is_private
  }),
);
expectError(
  web.admin.conversations.create({
    is_private: true,
    name: 'test',
    org_wide: true,
    team_id: 'T1234', // cannot specify org_wide=true and a team id
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.create>>([
  {
    is_private: false,
    name: 'test',
    org_wide: true,
  },
]);
expectAssignable<Parameters<typeof web.admin.conversations.create>>([
  {
    is_private: false,
    name: 'test',
    org_wide: false,
    team_id: 'T1234',
  },
]);
expectAssignable<Parameters<typeof web.admin.conversations.create>>([
  {
    is_private: false,
    name: 'test',
    team_id: 'T1234',
  },
]);

// admin.conversations.delete
// -- sad path
expectError(web.admin.conversations.delete()); // lacking argument
expectError(web.admin.conversations.delete({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.delete>>([
  {
    channel_id: 'C1234',
  },
]);

// admin.conversations.disconnectShared
// -- sad path
expectError(web.admin.conversations.disconnectShared()); // lacking argument
expectError(web.admin.conversations.disconnectShared({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.disconnectShared>>([
  {
    channel_id: 'C1234',
  },
]);

// admin.conversations.ekm.listOriginalConnectedChannelInfo
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.ekm.listOriginalConnectedChannelInfo>>([{}]); // all optional args
expectAssignable<Parameters<typeof web.admin.conversations.ekm.listOriginalConnectedChannelInfo>>([]); // all optional args

// admin.conversations.getConversationPrefs
// -- sad path
expectError(web.admin.conversations.getConversationPrefs()); // lacking argument
expectError(web.admin.conversations.getConversationPrefs({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.getConversationPrefs>>([
  {
    channel_id: 'C1234',
  },
]);

// admin.conversations.getCustomRetention
// -- sad path
expectError(web.admin.conversations.getCustomRetention()); // lacking argument
expectError(web.admin.conversations.getCustomRetention({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.getCustomRetention>>([
  {
    channel_id: 'C1234',
  },
]);

// admin.conversations.getTeams
// -- sad path
expectError(web.admin.conversations.getTeams()); // lacking argument
expectError(web.admin.conversations.getTeams({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.getTeams>>([
  {
    channel_id: 'C1234',
  },
]);

// admin.conversations.invite
// -- sad path
expectError(web.admin.conversations.invite()); // lacking argument
expectError(web.admin.conversations.invite({})); // empty argument
expectError(
  web.admin.conversations.invite({
    channel_id: 'C1234', // missing user_ids
  }),
);
expectError(
  web.admin.conversations.invite({
    channel_id: 'C1234',
    user_ids: [], // empty user_ids
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.invite>>([
  {
    channel_id: 'C1234',
    user_ids: ['U1234'],
  },
]);

// admin.conversations.lookup
// -- sad path
expectError(web.admin.conversations.lookup()); // lacking argument
expectError(web.admin.conversations.lookup({})); // empty argument
expectError(
  web.admin.conversations.lookup({
    team_ids: [], // missing last_message_activity_before
  }),
);
expectError(
  web.admin.conversations.lookup({
    last_message_activity_before: 1969, // missing team_ids
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.lookup>>([
  {
    team_ids: ['T1234'],
    last_message_activity_before: 10,
  },
]);

// admin.conversations.removeCustomRetention
// -- sad path
expectError(web.admin.conversations.removeCustomRetention()); // lacking argument
expectError(web.admin.conversations.removeCustomRetention({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.removeCustomRetention>>([
  {
    channel_id: 'C1234',
  },
]);

// admin.conversations.rename
// -- sad path
expectError(web.admin.conversations.rename()); // lacking argument
expectError(web.admin.conversations.rename({})); // empty argument
expectError(
  web.admin.conversations.rename({
    channel_id: 'C1234', // missing name
  }),
);
expectError(
  web.admin.conversations.rename({
    name: 'C1234', // missing channel_id
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.rename>>([
  {
    channel_id: 'C1234',
    name: 'heyho',
  },
]);

// admin.conversations.restrictAccess.addGroup
// -- sad path
expectError(web.admin.conversations.restrictAccess.addGroup()); // lacking argument
expectError(web.admin.conversations.restrictAccess.addGroup({})); // empty argument
expectError(
  web.admin.conversations.restrictAccess.addGroup({
    channel_id: 'C1234', // missing group_id
  }),
);
expectError(
  web.admin.conversations.restrictAccess.addGroup({
    group_id: 'G1234', // missing channel_id
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.restrictAccess.addGroup>>([
  {
    channel_id: 'C1234',
    group_id: 'G1234',
  },
]);

// admin.conversations.restrictAccess.listGroups
// -- sad path
expectError(web.admin.conversations.restrictAccess.listGroups()); // lacking argument
expectError(web.admin.conversations.restrictAccess.listGroups({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.restrictAccess.listGroups>>([
  {
    channel_id: 'C1234',
  },
]);

// admin.conversations.restrictAccess.removeGroup
// -- sad path
expectError(web.admin.conversations.restrictAccess.removeGroup()); // lacking argument
expectError(web.admin.conversations.restrictAccess.removeGroup({})); // empty argument
expectError(
  web.admin.conversations.restrictAccess.removeGroup({
    channel_id: 'C1234', // missing group_id
  }),
);
expectError(
  web.admin.conversations.restrictAccess.removeGroup({
    group_id: 'G1234', // missing channel_id
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.restrictAccess.removeGroup>>([
  {
    channel_id: 'C1234',
    group_id: 'G1234',
  },
]);

// admin.conversations.search
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.search>>([{}]); // all optional args
expectAssignable<Parameters<typeof web.admin.conversations.search>>([]); // no arg is fine

// admin.conversations.setConversationPrefs
// -- sad path
expectError(web.admin.conversations.setConversationPrefs()); // lacking argument
expectError(web.admin.conversations.setConversationPrefs({})); // empty argument
expectError(
  web.admin.conversations.setConversationPrefs({
    channel_id: 'C1234', // missing prefs
  }),
);
expectError(
  web.admin.conversations.setConversationPrefs({
    prefs: {}, // missing channel_id
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.setConversationPrefs>>([
  {
    channel_id: 'C1234',
    prefs: {},
  },
]);

// admin.conversations.setCustomRetention
// -- sad path
expectError(web.admin.conversations.setCustomRetention()); // lacking argument
expectError(web.admin.conversations.setCustomRetention({})); // empty argument
expectError(
  web.admin.conversations.setCustomRetention({
    channel_id: 'C1234', // missing duration_days
  }),
);
expectError(
  web.admin.conversations.setCustomRetention({
    duration_days: 420, // missing channel_id
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.setCustomRetention>>([
  {
    channel_id: 'C1234',
    duration_days: 69,
  },
]);

// admin.conversations.setTeams
// -- sad path
expectError(web.admin.conversations.setTeams()); // lacking argument
expectError(web.admin.conversations.setTeams({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.setTeams>>([
  {
    channel_id: 'C1234',
  },
]);

// admin.conversations.unarchive
// -- sad path
expectError(web.admin.conversations.unarchive()); // lacking argument
expectError(web.admin.conversations.unarchive({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.unarchive>>([
  {
    channel_id: 'C1234',
  },
]);
