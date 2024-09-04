import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// Reusable reactions.* API partial argument objects for these tests
const message = { channel: 'C1234', timestamp: '1234.567' };

// reactions.add
// -- sad path
expectError(web.reactions.add()); // lacking argument
expectError(web.reactions.add({})); // empty argument
expectError(
  web.reactions.add({
    ...message, // missing `name`
  }),
);
expectError(
  web.reactions.add({
    name: 'smile', // missing `channel` and `timestamp`
  }),
);
expectError(
  web.reactions.add({
    name: 'smile', // missing `timestamp`
    channel: 'C1234',
  }),
);
expectError(
  web.reactions.add({
    name: 'smile', // missing `channel`
    timestamp: '1234.567',
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.reactions.add>>([
  {
    ...message,
    name: 'smile',
  },
]);

// reactions.get
// -- sad path
expectError(web.reactions.get()); // lacking argument
expectError(web.reactions.get({})); // empty argument
expectError(
  web.reactions.get({
    channel: 'C1234', // missing timestamp
  }),
);
expectError(
  web.reactions.get({
    timestamp: '1234.567', // missing channel
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.reactions.get>>([
  {
    ...message, // get reactions for a message
  },
]);
expectAssignable<Parameters<typeof web.reactions.get>>([
  {
    file: 'F1234', // or a file
  },
]);
expectAssignable<Parameters<typeof web.reactions.get>>([
  {
    file_comment: 'Fc1234', // or a file comment
  },
]);

// reactions.list
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.reactions.list>>([{}]); // all optional args
expectAssignable<Parameters<typeof web.reactions.list>>([]); // no arg is fine

// reactions.remove
// -- sad path
expectError(web.reactions.remove()); // lacking argument
expectError(web.reactions.remove({})); // empty argument
expectError(
  web.reactions.remove({
    ...message, // missing `name`
  }),
);
expectError(
  web.reactions.remove({
    name: 'smile', // missing `channel` and `timestamp`, or `file`, or `file_comment`
  }),
);
expectError(
  web.reactions.remove({
    name: 'smile', // missing `timestamp`
    channel: 'C1234',
  }),
);
expectError(
  web.reactions.remove({
    name: 'smile', // missing `channel`
    timestamp: '1234.567',
  }),
);
expectError(
  web.reactions.remove({
    file: 'F1234', // missing name
  }),
);
expectError(
  web.reactions.remove({
    file_comment: 'Fc1234', // missing name
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.reactions.remove>>([
  {
    ...message,
    name: 'smile', // remove a reaction from a message
  },
]);
expectAssignable<Parameters<typeof web.reactions.remove>>([
  {
    file: 'F1234',
    name: 'smile', // remove a reaction from a file
  },
]);
expectAssignable<Parameters<typeof web.reactions.remove>>([
  {
    file_comment: 'Fc1234',
    name: 'smile', // remove a reaction from a file comment
  },
]);
