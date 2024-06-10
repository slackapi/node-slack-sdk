import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// conversations.acceptSharedInvite
// -- sad path
expectError(web.conversations.acceptSharedInvite()); // lacking argument
expectError(web.conversations.acceptSharedInvite({})); // empty argument
expectError(web.conversations.acceptSharedInvite({
  channel_name: 'puppies-r-us', // missing invite_id or channel_id
}));
expectError(web.conversations.acceptSharedInvite({
  channel_id: 'C1234', // missing channel_name
}));
expectError(web.conversations.acceptSharedInvite({
  invite_id: 'I1234', // missing channel_name
}));
// -- happy path
expectAssignable<Parameters<typeof web.conversations.acceptSharedInvite>>([{
  channel_name: 'puppies-r-us',
  invite_id: 'I1234',
}]);
expectAssignable<Parameters<typeof web.conversations.acceptSharedInvite>>([{
  channel_name: 'puppies-r-us',
  channel_id: 'C1234',
}]);

// conversations.approveSharedInvite
// -- sad path
expectError(web.conversations.approveSharedInvite()); // lacking argument
expectError(web.conversations.approveSharedInvite({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.conversations.approveSharedInvite>>([{
  invite_id: 'I1234',
}]);

// conversations.archive
// -- sad path
expectError(web.conversations.archive()); // lacking argument
expectError(web.conversations.archive({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.conversations.archive>>([{
  channel: 'C1234',
}]);

// conversations.close
// -- sad path
expectError(web.conversations.close()); // lacking argument
expectError(web.conversations.close({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.conversations.close>>([{
  channel: 'C1234',
}]);

// conversations.create
// -- sad path
expectError(web.conversations.create()); // lacking argument
expectError(web.conversations.create({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.conversations.create>>([{
  name: 'grunge-fans',
}]);

// conversations.declineSharedInvite
// -- sad path
expectError(web.conversations.declineSharedInvite()); // lacking argument
expectError(web.conversations.declineSharedInvite({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.conversations.declineSharedInvite>>([{
  invite_id: 'I1234',
}]);

// conversations.history
// -- sad path
expectError(web.conversations.history()); // lacking argument
expectError(web.conversations.history({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.conversations.history>>([{
  channel: 'C1234',
}]);

// conversations.info
// -- sad path
expectError(web.conversations.info()); // lacking argument
expectError(web.conversations.info({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.conversations.info>>([{
  channel: 'C1234',
}]);

// conversations.invite
// -- sad path
expectError(web.conversations.invite()); // lacking argument
expectError(web.conversations.invite({})); // empty argument
expectError(web.conversations.invite({
  channel: 'C1234', // missing users
}));
expectError(web.conversations.invite({
  users: 'U1234', // missing channel
}));
// -- happy path
expectAssignable<Parameters<typeof web.conversations.invite>>([{
  channel: 'C1234',
  users: 'U1234',
}]);

// conversations.inviteShared
// -- sad path
expectError(web.conversations.inviteShared()); // lacking argument
expectError(web.conversations.inviteShared({})); // empty argument
expectError(web.conversations.inviteShared({
  channel: 'C1234', // missing emails or user_ids
}));
expectError(web.conversations.inviteShared({
  user_ids: ['U1234'], // missing channel
}));
expectError(web.conversations.inviteShared({
  emails: ['ceo@salesforce.com'], // missing channel
}));
expectError(web.conversations.inviteShared({
  channel: 'C1234',
  emails: ['ceo@salesforce.com'],
  user_ids: ['U1234'], // either emails or user_ids, but not both
}));
// -- happy path
expectAssignable<Parameters<typeof web.conversations.inviteShared>>([{
  channel: 'C1234',
  user_ids: ['U1234'],
}]);
expectAssignable<Parameters<typeof web.conversations.inviteShared>>([{
  channel: 'C1234',
  emails: ['ceo@salesforce.com'],
}]);

// conversations.join
// -- sad path
expectError(web.conversations.join()); // lacking argument
expectError(web.conversations.join({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.conversations.join>>([{
  channel: 'C1234',
}]);

// conversations.kick
// -- sad path
expectError(web.conversations.kick()); // lacking argument
expectError(web.conversations.kick({})); // empty argument
expectError(web.conversations.kick({
  channel: 'C1234', // missing user
}));
expectError(web.conversations.kick({
  user: 'U1234', // missing channel
}));
// -- happy path
expectAssignable<Parameters<typeof web.conversations.kick>>([{
  channel: 'C1234',
  user: 'U1234',
}]);

// conversations.leave
// -- sad path
expectError(web.conversations.leave()); // lacking argument
expectError(web.conversations.leave({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.conversations.leave>>([{
  channel: 'C1234',
}]);

// conversations.list
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.conversations.list>>([{}]); // all optional args
expectAssignable<Parameters<typeof web.conversations.list>>([]); // no arg is fine

// conversations.listConnectInvites
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.conversations.listConnectInvites>>([{}]); // all optional args
expectAssignable<Parameters<typeof web.conversations.listConnectInvites>>([]); // no arg is fine

// conversations.mark
// -- sad path
expectError(web.conversations.mark()); // lacking argument
expectError(web.conversations.mark({})); // empty argument
expectError(web.conversations.mark({
  channel: 'C1234', // missing ts
}));
expectError(web.conversations.mark({
  ts: '12345.67', // missing channel
}));
// -- happy path
expectAssignable<Parameters<typeof web.conversations.mark>>([{
  channel: 'C1234',
  ts: '12345.67',
}]);

// conversations.members
// -- sad path
expectError(web.conversations.members()); // lacking argument
expectError(web.conversations.members({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.conversations.members>>([{
  channel: 'C1234',
}]);

// conversations.open
// -- sad path
expectError(web.conversations.open()); // lacking argument
expectError(web.conversations.open({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.conversations.open>>([{
  channel: 'C1234',
}]);
expectAssignable<Parameters<typeof web.conversations.open>>([{
  users: 'U1234,U2345',
}]);

// conversations.rename
// -- sad path
expectError(web.conversations.rename()); // lacking argument
expectError(web.conversations.rename({})); // empty argument
expectError(web.conversations.rename({
  channel: 'C1234', // missing name
}));
expectError(web.conversations.rename({
  name: 'batman-fans', // missing channel
}));
// -- happy path
expectAssignable<Parameters<typeof web.conversations.rename>>([{
  channel: 'C1234',
  name: 'batman-fans',
}]);

// conversations.replies
// -- sad path
expectError(web.conversations.replies()); // lacking argument
expectError(web.conversations.replies({})); // empty argument
expectError(web.conversations.replies({
  channel: 'C1234', // missing ts
}));
expectError(web.conversations.replies({
  ts: '12345.67', // missing channel
}));
// -- happy path
expectAssignable<Parameters<typeof web.conversations.replies>>([{
  channel: 'C1234',
  ts: '12345.67',
}]);

// conversations.setPurpose
// -- sad path
expectError(web.conversations.setPurpose()); // lacking argument
expectError(web.conversations.setPurpose({})); // empty argument
expectError(web.conversations.setPurpose({
  channel: 'C1234', // missing purpose
}));
expectError(web.conversations.setPurpose({
  purpose: 'Feed the world', // missing channel
}));
// -- happy path
expectAssignable<Parameters<typeof web.conversations.setPurpose>>([{
  channel: 'C1234',
  purpose: 'Feed the world',
}]);

// conversations.setTopic
// -- sad path
expectError(web.conversations.setTopic()); // lacking argument
expectError(web.conversations.setTopic({})); // empty argument
expectError(web.conversations.setTopic({
  channel: 'C1234', // missing topic
}));
expectError(web.conversations.setTopic({
  topic: 'Eat and be merry', // missing channel
}));
// -- happy path
expectAssignable<Parameters<typeof web.conversations.setTopic>>([{
  channel: 'C1234',
  topic: 'Eat and be merry',
}]);

// conversations.unarchive
// -- sad path
expectError(web.conversations.unarchive()); // lacking argument
expectError(web.conversations.unarchive({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.conversations.unarchive>>([{
  channel: 'C1234',
}]);
