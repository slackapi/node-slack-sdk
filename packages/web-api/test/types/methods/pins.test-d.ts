import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// Reusable pins.* API partial argument objects for these tests
const message = { channel: 'C1234', timestamp: '1234.567' };

// pins.add
// -- sad path
expectError(web.pins.add()); // lacking argument
expectError(web.pins.add({})); // empty argument
expectError(
  web.pins.add({
    channel: 'C1234', // missing timestamp
  }),
);
expectError(
  web.pins.add({
    timestamp: '1234.567', // missing `channel`
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.pins.add>>([
  {
    ...message,
  },
]);

// pins.list
// -- sad path
expectError(web.pins.list()); // lacking argument
expectError(web.pins.list({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.pins.list>>([
  {
    channel: message.channel,
  },
]);

// pins.remove
// -- sad path
expectError(web.pins.remove()); // lacking argument
expectError(web.pins.remove({})); // empty argument
expectError(
  web.pins.remove({
    channel: 'C1234', // missing timestamp
  }),
);
expectError(
  web.pins.remove({
    timestamp: '1234.567', // missing `channel`
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.pins.remove>>([
  {
    ...message,
  },
]);
