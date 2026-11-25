import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// admin.analytics.getFile
// -- sad path
expectError(web.admin.analytics.getFile()); // lacking argument
expectError(web.admin.analytics.getFile({})); // empty argument
expectError(
  web.admin.analytics.getFile({
    type: 'member', // missing date
  }),
);
expectError(
  web.admin.analytics.getFile({
    date: '2023-11-01', // missing type
  }),
);
expectError(
  web.admin.analytics.getFile({
    type: 'public_channel', // missing date or metadata_only=true
  }),
);
expectError(
  web.admin.analytics.getFile({
    type: 'public_channel',
    metadata_only: false, // w/ type=public_channel and no date, metadata_only must be true
  }),
);
expectError(
  web.admin.analytics.getFile({
    type: 'public_channel',
    date: '2023-11-01',
    metadata_only: true, // w/ type=public_channel and date specified, metadata_only must be falsy
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.admin.analytics.getFile>>([
  {
    type: 'member',
    date: '2023-11-01',
  },
]);
expectAssignable<Parameters<typeof web.admin.analytics.getFile>>([
  {
    type: 'public_channel',
    date: '2023-11-01',
  },
]);
expectAssignable<Parameters<typeof web.admin.analytics.getFile>>([
  {
    type: 'public_channel',
    date: '2023-11-01',
    metadata_only: false,
  },
]);
expectAssignable<Parameters<typeof web.admin.analytics.getFile>>([
  {
    type: 'public_channel',
    metadata_only: true,
  },
]);

// admin.analytics.members.activity
// -- sad path
expectError(
  web.admin.analytics.members.activity({
    member_types: ['not_a_member_type'], // unknown member type
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.admin.analytics.members.activity>>([]); // no arg is fine
expectAssignable<Parameters<typeof web.admin.analytics.members.activity>>([{}]); // empty arg is fine
expectAssignable<Parameters<typeof web.admin.analytics.members.activity>>([
  {
    date: '2026-09-30',
    team_id: 'T1234',
    member_types: ['regular_members', 'org_admins'],
    user_ids: ['U1234', 'U5678'],
    limit: 100,
    cursor: '5c3e53d5',
  },
]);
