import { expectAssignable, expectError } from 'tsd';

import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// slackLists.create
// -- sad path
expectError(web.slacklists.create()); // lacking argument
expectError(web.slacklists.create({})); // missing name

// -- happy path
expectAssignable<Parameters<typeof web.slacklists.create>>([
  {
    name: 'Backlog',
  },
]);
