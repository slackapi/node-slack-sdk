import { expectAssignable, expectError } from 'tsd';

import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// Reusable files.* API partial argument objects for these tests
const file = { id: 'F1234', title: 'Choose Boring Technology' };

// files.completeUploadExternal
// -- sad path
expectError(web.files.completeUploadExternal()); // lacking argument
expectError(web.files.completeUploadExternal({})); // empty argument
expectError(web.files.completeUploadExternal({
  files: [file],
  thread_ts: '1234.567', // has thread_ts but no channel
}));
expectError(web.files.completeUploadExternal({
  files: [], // must specify at least one file
}));
// -- happy path
expectAssignable<Parameters<typeof web.files.completeUploadExternal>>([{
  files: [file], // must specify at least one file
  // not shared to any destination, so it is a 'private' file
}]);
expectAssignable<Parameters<typeof web.files.completeUploadExternal>>([{
  files: [file],
  channel_id: 'C1234', // share to a channel
}]);
expectAssignable<Parameters<typeof web.files.completeUploadExternal>>([{
  files: [file],
  channel_id: 'C1234',
  thread_ts: '1234.567', // share to a thread
}]);

// files.delete
// -- sad path
expectError(web.files.delete()); // lacking argument
expectError(web.files.delete({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.files.delete>>([{
  file: 'F123', // must specify a file
}]);

// files.getUploadURLExternal
// -- sad path
expectError(web.files.getUploadURLExternal()); // lacking argument
expectError(web.files.getUploadURLExternal({})); // empty argument
expectError(web.files.getUploadURLExternal({ filename: 'hi' })); // missing `length`
expectError(web.files.getUploadURLExternal({ length: 42 })); // missing `filename`
// -- happy path
expectAssignable<Parameters<typeof web.files.getUploadURLExternal>>([{
  filename: 'batman',
  length: 420,
}]);

// files.info
// -- sad path
expectError(web.files.info()); // lacking argument
expectError(web.files.info({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.files.info>>([{
  file: 'F123', // must specify a file
}]);

// files.list
// -- sad path
expectError(web.files.list()); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.files.list>>([{}]); // able to call it with empty argument

// files.revokePublicURL
// -- sad path
expectError(web.files.revokePublicURL()); // lacking argument
expectError(web.files.revokePublicURL({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.files.revokePublicURL>>([{
  file: 'F123', // must specify a file
}]);

// files.sharedPublicURL
// -- sad path
expectError(web.files.sharedPublicURL()); // lacking argument
expectError(web.files.sharedPublicURL({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.files.sharedPublicURL>>([{
  file: 'F123', // must specify a file
}]);

// files.upload
// -- sad path
expectError(web.files.upload()); // lacking argument
expectError(web.files.upload({})); // empty argument
expectError(web.files.upload({ file: 'test.png', thread_ts: '123.456' })); // if providing thread_ts, must provide channels
// -- happy path
expectAssignable<Parameters<typeof web.files.upload>>([{
  file: 'test.png', // must specify either a file...
}]);
expectAssignable<Parameters<typeof web.files.upload>>([{
  content: 'text', // or file contents
}]);
expectAssignable<Parameters<typeof web.files.upload>>([{
  channels: 'C1234', // optionally share to one or more channels
  content: 'text',
}]);
expectAssignable<Parameters<typeof web.files.upload>>([{
  channels: 'C1234', // or even to a specific thread
  content: 'text',
}]);

// files.uploadV2
// -- sad path
expectError(web.files.uploadV2()); // lacking argument
expectError(web.files.uploadV2({})); // empty argument
expectError(web.files.uploadV2({ file: 'test.png', thread_ts: '123.456' })); // if providing thread_ts, must provide channels
// -- happy path
expectAssignable<Parameters<typeof web.files.uploadV2>>([{
  file: 'test.png', // must specify either a file...
}]);
expectAssignable<Parameters<typeof web.files.uploadV2>>([{
  content: 'text', // or file contents...
}]);
expectAssignable<Parameters<typeof web.files.uploadV2>>([{
  channels: 'C1234', // optionally share to one or more channels
  content: 'text',
}]);
expectAssignable<Parameters<typeof web.files.uploadV2>>([{
  channels: 'C1234',
  thread_ts: '12345.67', // or even to a specific thread
  content: 'text',
}]);

// files.comments.delete
// -- sad path
expectError(web.files.comments.delete()); // lacking argument
expectError(web.files.comments.delete({})); // empty argument
expectError(web.files.comments.delete({ file: 'F123' })); // missing comment ID
expectError(web.files.comments.delete({ id: 'Fc123' })); // missing file ID
// -- happy path
expectAssignable<Parameters<typeof web.files.comments.delete>>([{
  file: 'F1234',
  id: 'Fc1234',
}]);

// files.remote.add
// -- sad path
expectError(web.files.remote.add()); // lacking argument
expectError(web.files.remote.add({})); // empty argument
expectError(web.files.remote.add({ external_id: '1234' })); // missing url and title
expectError(web.files.remote.add({ external_url: 'https://example.com' })); // missing id and title
expectError(web.files.remote.add({ title: 'my document' })); // missing id and url
expectError(web.files.remote.add({ external_id: '1234', external_url: 'https://example.com' })); // missing title
expectError(web.files.remote.add({ external_id: '1234', title: 'this is a test' })); // missing url
expectError(web.files.remote.add({ external_url: '1234', title: 'this is a test' })); // missing id
// -- happy path
expectAssignable<Parameters<typeof web.files.remote.add>>([{
  external_id: '1234',
  external_url: 'https://example.com',
  title: 'my document',
}]);

// files.remote.info
// -- sad path
expectError(web.files.remote.info()); // lacking argument
expectError(web.files.remote.info({})); // empty argument
expectError(web.files.remote.info({ external_id: '1234', file: 'F1234' })); // either external ID, or file ID, but not both
// -- happy path
expectAssignable<Parameters<typeof web.files.remote.info>>([{
  external_id: '1234',
}]);
expectAssignable<Parameters<typeof web.files.remote.info>>([{
  file: 'F1234',
}]);

// files.remote.list
// -- sad path
expectError(web.files.remote.list()); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.files.remote.list>>([{}]); // able to call it with empty argument

// files.remote.remove
// -- sad path
expectError(web.files.remote.remove()); // lacking argument
expectError(web.files.remote.remove({})); // empty argument
expectError(web.files.remote.remove({ external_id: '1234', file: 'F1234' })); // either external ID, or file ID, but not both
// -- happy path
expectAssignable<Parameters<typeof web.files.remote.remove>>([{
  external_id: '1234',
}]);
expectAssignable<Parameters<typeof web.files.remote.remove>>([{
  file: 'F1234',
}]);

// files.remote.share
// -- sad path
expectError(web.files.remote.share()); // lacking argument
expectError(web.files.remote.share({})); // empty argument
expectError(web.files.remote.share({ external_id: '1234', file: 'F1234' })); // either external ID, or file ID, but not both
expectError(web.files.remote.share({ channels: 'C1234' })); // missing one of external ID or file ID
// -- happy path
expectAssignable<Parameters<typeof web.files.remote.share>>([{
  channels: 'C123',
  external_id: '1234',
}]);
expectAssignable<Parameters<typeof web.files.remote.share>>([{
  channels: 'C123',
  file: 'F1234',
}]);

// files.remote.update
// -- sad path
expectError(web.files.remote.update()); // lacking argument
expectError(web.files.remote.update({})); // empty argument
expectError(web.files.remote.update({ external_id: '1234', file: 'F1234' })); // either external ID, or file ID, but not both
expectError(web.files.remote.update({ title: 'Fear and Loathing in Las Vegas' })); // missing one of external ID or file ID
// -- happy path
expectAssignable<Parameters<typeof web.files.remote.update>>([{
  external_id: '1234',
  title: 'Moby Dick',
}]);
expectAssignable<Parameters<typeof web.files.remote.update>>([{
  file: 'F1234',
  external_url: 'https://someurl.com',
}]);
