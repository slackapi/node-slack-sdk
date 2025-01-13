import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// migration.exchange
// -- sad path
expectError(web.migration.exchange()); // lacking argument
expectError(web.migration.exchange({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.migration.exchange>>([
  {
    users: 'U1234',
  },
]);
