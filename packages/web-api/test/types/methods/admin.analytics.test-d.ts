import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// admin.analytics.getFile
// -- sad path
expectError(web.admin.analytics.getFile()); // lacking argument
expectError(web.admin.analytics.getFile({})); // empty argument
expectError(web.admin.analytics.getFile({
  type: 'member', // missing date
}));
expectError(web.admin.analytics.getFile({
  date: '2023-11-01', // missing type
}));
expectError(web.admin.analytics.getFile({
  type: 'public_channel', // missing date or metadata_only=true
}));
expectError(web.admin.analytics.getFile({
  type: 'public_channel',
  metadata_only: false, // w/ type=public_channel and no date, metadata_only must be true
}));
expectError(web.admin.analytics.getFile({
  type: 'public_channel',
  date: '2023-11-01',
  metadata_only: true, // w/ type=public_channel and date specified, metadata_only must be falsy
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.analytics.getFile>>([{
  type: 'member',
  date: '2023-11-01',
}]);
expectAssignable<Parameters<typeof web.admin.analytics.getFile>>([{
  type: 'public_channel',
  date: '2023-11-01',
}]);
expectAssignable<Parameters<typeof web.admin.analytics.getFile>>([{
  type: 'public_channel',
  date: '2023-11-01',
  metadata_only: false,
}]);
expectAssignable<Parameters<typeof web.admin.analytics.getFile>>([{
  type: 'public_channel',
  metadata_only: true,
}]);
