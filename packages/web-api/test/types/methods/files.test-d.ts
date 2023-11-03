import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../..';

const web = new WebClient('TOKEN');

// Reusable files.* API partial argument objects for these tests
const file = { id: 'F1234', title: 'Choose Boring Technology' };
// -- File upload target/destination types: channels, threads or private files
//    Some of these use a `channel_id` prop vs. a `channels` prop :/
// ---- correct destinations
const destinationChannel = { channel_id: 'C1234' };
const destinationThread = { ...destinationChannel, thread_ts: '1234.456' };
const destinationChannels = { channels: 'C1234' };
const destinationThreadChannels = { ...destinationChannels, thread_ts: '1234.456' };
// ---- invalid destinations
const destinationThreadWithMissingChannel = { thread_ts: '1234.567' };

// files.completeUploadExternal
// -- sad path
expectError(web.files.completeUploadExternal()); // lacking argument
expectError(web.files.completeUploadExternal({})); // empty argument
expectError(web.files.completeUploadExternal({
  files: [file],
  ...destinationThreadWithMissingChannel, // has thread_ts but no channel
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
  ...destinationChannel, // share to a channel
}]);
expectAssignable<Parameters<typeof web.files.completeUploadExternal>>([{
  files: [file],
  ...destinationThread, // share to a thread
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
// -- happy path
expectAssignable<Parameters<typeof web.files.upload>>([{
  file: 'test.png', // must specify either a file...
}]);
expectAssignable<Parameters<typeof web.files.upload>>([{
  content: 'text', // or file contents...
}]);

// files.uploadV2
// -- sad path
expectError(web.files.uploadV2()); // lacking argument
expectError(web.files.uploadV2({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.files.uploadV2>>([{
  file: 'test.png', // must specify either a file...
}]);
expectAssignable<Parameters<typeof web.files.uploadV2>>([{
  content: 'text', // or file contents...
}]);

// files.comments.delete
// -- sad path
expectError(web.files.comments.delete()); // lacking argument
expectError(web.files.comments.delete({})); // empty argument
expectError(web.files.comments.delete({ file: 'F123' })); // missing comment ID
expectError(web.files.comments.delete({ id: 'Fc123' })); // missing file ID
// -- happy path
expectAssignable<Parameters<typeof web.files.comments.delete>>([{
  file: 'test.png', // must specify either a file...
}]);
expectAssignable<Parameters<typeof web.files.comments.delete>>([{
  content: 'text', // or file contents...
}]);
