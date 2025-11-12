import { expectAssignable, expectError } from 'tsd';

import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// slackLists.create
// -- sad path
expectError(web.slackLists.create()); // lacking argument
expectError(web.slackLists.create({})); // missing name

// -- happy path
expectAssignable<Parameters<typeof web.slackLists.create>>([
  {
    name: 'Backlog',
  },
]);
