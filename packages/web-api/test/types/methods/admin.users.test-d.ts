import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// admin.users.assign
// -- sad path
expectError(web.admin.users.assign()); // lacking argument
expectError(web.admin.users.assign({})); // empty argument
expectError(web.admin.users.assign({
  team_id: 'T1234', // missing user_id
}));
expectError(web.admin.users.assign({
  user_id: 'U1234', // missing team_id
}));
expectError(web.admin.users.assign({
  user_id: 'U1234',
  team_id: 'T1234',
  channel_ids: [], // requires at least 1 channel
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.users.assign>>([{
  team_id: 'T1234',
  user_id: 'U1234',
}]);

// admin.users.invite
// -- sad path
expectError(web.admin.users.invite()); // lacking argument
expectError(web.admin.users.invite({})); // empty argument
expectError(web.admin.users.invite({
  team_id: 'T1234', // missing channel_ids, email
}));
expectError(web.admin.users.invite({
  channel_ids: ['C1234'], // missing team_id, email
}));
expectError(web.admin.users.invite({
  email: 'me@you.com', // missing channel_ids, team_id
}));
expectError(web.admin.users.invite({
  email: 'me@you.com',
  team_id: 'T1234', // missing channel_ids
}));
expectError(web.admin.users.invite({
  email: 'me@you.com',
  channel_ids: ['C1234'], // missing team_id
}));
expectError(web.admin.users.invite({
  team_id: 'T1234',
  channel_ids: ['C1234'], // missing email
}));
expectError(web.admin.users.invite({
  team_id: 'T1234',
  channel_ids: [], // requires at least 1 channel
}));
expectError(web.admin.users.invite({
  email: 'me@you.com',
  team_id: 'T1234',
  channel_ids: [], // required at least 1 channel
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.users.invite>>([{
  team_id: 'T1234',
  email: 'me@you.com',
  channel_ids: ['C1234'],
}]);

// admin.users.list
// -- sad path
expectError(web.admin.users.list()); // lacking argument
expectError(web.admin.users.list({
  team_id: 'T1234',
  include_deactivated_user_workspaces: true, // cannot set both team_id and include_deactivated=true
}));
expectError(web.admin.users.list({
  user_id: 'U1234', // missing team_id
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.users.list>>([{}]); // all optional args is ok
expectAssignable<Parameters<typeof web.admin.users.list>>([{
  team_id: 'T1234',
  include_deactivated_user_workspaces: false, // team_id and include_deactivated=false is ok
}]);
expectAssignable<Parameters<typeof web.admin.users.list>>([{
  team_id: 'T1234', // team_id and undefined include_deactivated is ok
}]);
expectAssignable<Parameters<typeof web.admin.users.list>>([{
  include_deactivated_user_workspaces: true, // team_id and=undefined and include_deactivated is ok
}]);

// admin.users.remove
// -- sad path
expectError(web.admin.users.remove()); // lacking argument
expectError(web.admin.users.remove({})); // empty argument
expectError(web.admin.users.remove({
  team_id: 'T1234', // missing user_id
}));
expectError(web.admin.users.remove({
  user_id: 'U1234', // missing team_id
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.users.remove>>([{
  team_id: 'T1234',
  user_id: 'U1234',
}]);

// admin.users.session.clearSettings
// -- sad path
expectError(web.admin.users.session.clearSettings()); // lacking argument
expectError(web.admin.users.session.clearSettings({})); // empty argument
expectError(web.admin.users.session.clearSettings({
  user_ids: [],
})); // must provide at least one user_id
// -- happy path
expectAssignable<Parameters<typeof web.admin.users.session.clearSettings>>([{
  user_ids: ['U1234'],
}]);

// admin.users.session.getSettings
// -- sad path
expectError(web.admin.users.session.getSettings()); // lacking argument
expectError(web.admin.users.session.getSettings({})); // empty argument
expectError(web.admin.users.session.getSettings({
  user_ids: [],
})); // must provide at least one user_id
// -- happy path
expectAssignable<Parameters<typeof web.admin.users.session.getSettings>>([{
  user_ids: ['U1234'],
}]);

// admin.users.session.invalidate
// -- sad path
expectError(web.admin.users.session.invalidate()); // lacking argument
expectError(web.admin.users.session.invalidate({})); // empty argument
expectError(web.admin.users.session.invalidate({
  team_id: 'T1234', // missing session_id
}));
expectError(web.admin.users.session.invalidate({
  session_id: '1234', // missing team_id
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.users.session.invalidate>>([{
  team_id: 'T1234',
  session_id: '1234',
}]);

// admin.users.session.list
// -- sad path
expectError(web.admin.users.session.list()); // lacking argument
expectError(web.admin.users.session.list({
  team_id: 'T1234', // if team_id is provided, must also provide user_id
}));
expectError(web.admin.users.session.list({
  user_id: 'T1234', // if user_id is provided, must also provide team_id
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.users.session.list>>([{}]); // all optional args is OK
expectAssignable<Parameters<typeof web.admin.users.session.list>>([{
  team_id: 'T1234',
  user_id: 'U1234', // also providing both team and user id - but has to be both
}]);

// admin.users.session.reset
// -- sad path
expectError(web.admin.users.session.reset()); // lacking argument
expectError(web.admin.users.session.reset({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.users.session.reset>>([{
  user_id: 'U1234',
}]);

// admin.users.session.resetBulk
// -- sad path
expectError(web.admin.users.session.resetBulk()); // lacking argument
expectError(web.admin.users.session.resetBulk({})); // empty argument
expectError(web.admin.users.session.resetBulk({
  user_ids: [],
})); // must provide at least one user_id
// -- happy path
expectAssignable<Parameters<typeof web.admin.users.session.resetBulk>>([{
  user_ids: ['U1234'],
}]);

// admin.users.session.setSettings
// -- sad path
expectError(web.admin.users.session.setSettings()); // lacking argument
expectError(web.admin.users.session.setSettings({})); // empty argument
expectError(web.admin.users.session.setSettings({
  user_ids: [],
})); // must provide at least one user_id
// -- happy path
expectAssignable<Parameters<typeof web.admin.users.session.setSettings>>([{
  user_ids: ['U1234'],
}]);

// admin.users.session.setAdmin
// -- sad path
expectError(web.admin.users.setAdmin()); // lacking argument
expectError(web.admin.users.setAdmin({})); // empty argument
expectError(web.admin.users.setAdmin({
  team_id: 'T1234', // missing user_id
}));
expectError(web.admin.users.setAdmin({
  user_id: 'T1234', // missing team_id
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.users.setAdmin>>([{
  team_id: 'T1234',
  user_id: 'U1234',
}]);

// admin.users.session.setExpiration
// -- sad path
expectError(web.admin.users.setExpiration()); // lacking argument
expectError(web.admin.users.setExpiration({})); // empty argument
expectError(web.admin.users.setExpiration({
  expiration_ts: 1234, // missing user_id
}));
expectError(web.admin.users.setExpiration({
  user_id: 'T1234', // missing expiration_ts
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.users.setExpiration>>([{
  user_id: 'U1234',
  expiration_ts: 1234,
}]);

// admin.users.session.setOwner
// -- sad path
expectError(web.admin.users.setOwner()); // lacking argument
expectError(web.admin.users.setOwner({})); // empty argument
expectError(web.admin.users.setOwner({
  team_id: 'T1234', // missing user_id
}));
expectError(web.admin.users.setOwner({
  user_id: 'T1234', // missing team_id
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.users.setOwner>>([{
  team_id: 'T1234',
  user_id: 'U1234',
}]);

// admin.users.session.setRegular
// -- sad path
expectError(web.admin.users.setRegular()); // lacking argument
expectError(web.admin.users.setRegular({})); // empty argument
expectError(web.admin.users.setRegular({
  team_id: 'T1234', // missing user_id
}));
expectError(web.admin.users.setRegular({
  user_id: 'T1234', // missing team_id
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.users.setRegular>>([{
  team_id: 'T1234',
  user_id: 'U1234',
}]);

// admin.users.session.unsupportedVersions.export
// -- sad path
expectError(web.admin.users.unsupportedVersions.export()); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.users.unsupportedVersions.export>>([{}]); // all optional args OK
