import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// admin.inviteRequests.approve
// -- sad path
expectError(web.admin.inviteRequests.approve()); // lacking argument
expectError(web.admin.inviteRequests.approve({})); // empty argument
expectError(
  web.admin.inviteRequests.approve({
    invite_request_id: 'I1234', // missing team_id
  }),
);
expectError(
  web.admin.inviteRequests.approve({
    team_id: 'T1234', // missing invite_request_id
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.admin.inviteRequests.approve>>([
  {
    team_id: 'T1234',
    invite_request_id: 'I1234',
  },
]);

// admin.inviteRequests.approved.list
// -- sad path
expectError(web.admin.inviteRequests.approved.list()); // lacking argument
expectError(web.admin.inviteRequests.approved.list({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.inviteRequests.approved.list>>([
  {
    team_id: 'T1234',
  },
]);

// admin.inviteRequests.denied.list
// -- sad path
expectError(web.admin.inviteRequests.denied.list()); // lacking argument
expectError(web.admin.inviteRequests.denied.list({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.inviteRequests.denied.list>>([
  {
    team_id: 'T1234',
  },
]);

// admin.inviteRequests.deny
// -- sad path
expectError(web.admin.inviteRequests.deny()); // lacking argument
expectError(web.admin.inviteRequests.deny({})); // empty argument
expectError(
  web.admin.inviteRequests.deny({
    invite_request_id: 'I1234', // missing team_id
  }),
);
expectError(
  web.admin.inviteRequests.deny({
    team_id: 'T1234', // missing invite_request_id
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.admin.inviteRequests.deny>>([
  {
    team_id: 'T1234',
    invite_request_id: 'I1234',
  },
]);

// admin.inviteRequests.list
// -- sad path
expectError(web.admin.inviteRequests.list()); // lacking argument
expectError(web.admin.inviteRequests.list({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.inviteRequests.list>>([
  {
    team_id: 'T1234',
  },
]);
