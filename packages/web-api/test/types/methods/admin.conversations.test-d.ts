import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// admin.conversations.archive
// -- sad path
expectError(web.admin.conversations.archive()); // lacking argument
expectError(web.admin.conversations.archive({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.archive>>([{
  channel_id: 'C1234',
}]);

// admin.conversations.bulkArchive
// -- sad path
expectError(web.admin.conversations.bulkArchive()); // lacking argument
expectError(web.admin.conversations.bulkArchive({})); // empty argument
expectError(web.admin.conversations.bulkArchive({
  channel_ids: [], // must include at least one element
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.bulkArchive>>([{
  channel_ids: ['C1234'],
}]);

// admin.conversations.bulkDelete
// -- sad path
expectError(web.admin.conversations.bulkDelete()); // lacking argument
expectError(web.admin.conversations.bulkDelete({})); // empty argument
expectError(web.admin.conversations.bulkDelete({
  channel_ids: [], // must include at least one element
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.bulkDelete>>([{
  channel_ids: ['C1234'],
}]);

// admin.conversations.bulkMove
// -- sad path
expectError(web.admin.conversations.bulkMove()); // lacking argument
expectError(web.admin.conversations.bulkMove({})); // empty argument
expectError(web.admin.conversations.bulkMove({
  channel_ids: ['C1234'], // missing target_team_id
}));
expectError(web.admin.conversations.bulkMove({
  target_team_id: 'T1234', // missing channel_ids
}));
expectError(web.admin.conversations.bulkMove({
  target_team_id: 'T1234',
  channel_ids: [], // must include at least one element
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.bulkMove>>([{
  target_team_id: 'T1234',
  channel_ids: ['C1234'],
}]);

// admin.conversations.convertToPrivate
// -- sad path
expectError(web.admin.conversations.convertToPrivate()); // lacking argument
expectError(web.admin.conversations.convertToPrivate({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.convertToPrivate>>([{
  channel_id: 'C1234',
}]);

// admin.conversations.convertToPublic
// -- sad path
expectError(web.admin.conversations.convertToPublic()); // lacking argument
expectError(web.admin.conversations.convertToPublic({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.conversations.convertToPublic>>([{
  channel_id: 'C1234',
}]);
