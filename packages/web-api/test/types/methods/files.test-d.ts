import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../';

const web = new WebClient('TOKEN');

// Reusable files.* API partial argument objects for these tests
const file = { id: 'F1234', title: 'Choose Boring Technology' };
// -- File upload target/destination types: channels, threads or private files
// ---- correct destinations
const destinationChannel = { channel_id: 'C1234' };
const destinationThread = { ...destinationChannel, thread_ts: '1234.456' };
// ---- invalid destinations
const destinationMissingChannel = { thread_ts: '1234.567' };

// files.completeUploadExternal
// -- sad path
expectError(web.files.completeUploadExternal()); // lacking argument
expectError(web.files.completeUploadExternal({})); // empty argument
expectError(web.files.completeUploadExternal({
  files: [file],
  ...destinationMissingChannel // has thread_ts but no channel
}));
// -- happy path
expectAssignable<Parameters<typeof web.files.completeUploadExternal>>([{
  files: [file] // bare minimum: specify at least one file
}]);
expectAssignable<Parameters<typeof web.files.completeUploadExternal>>([{
  files: [file],
  ...destinationChannel // share to a channel
}]);
expectAssignable<Parameters<typeof web.files.completeUploadExternal>>([{
  files: [file],
  ...destinationThread // share to a thread
}]);
