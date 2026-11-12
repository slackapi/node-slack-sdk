import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// admin.slackbot.skills.list
// -- sad path
expectError(
  web.admin.slackbot.skills.list({
    category: 'cooking', // invalid category
  }),
);
expectError(
  web.admin.slackbot.skills.list({
    publish_status: 'draft', // invalid publish_status
  }),
);
expectError(
  web.admin.slackbot.skills.list({
    auto_enabled_status: 'on', // invalid auto_enabled_status
  }),
);
expectError(
  web.admin.slackbot.skills.list({
    sort: 'date_created', // invalid sort
  }),
);
expectError(
  web.admin.slackbot.skills.list({
    sort_dir: 'up', // invalid sort_dir
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.admin.slackbot.skills.list>>([]); // no arg is fine
expectAssignable<Parameters<typeof web.admin.slackbot.skills.list>>([{}]); // empty arg is fine
expectAssignable<Parameters<typeof web.admin.slackbot.skills.list>>([
  {
    category: 'productivity',
    cursor: 'dXNlcjpVMDYxTkZUVDI=',
    limit: 100,
    creator_ids: ['U1234', 'W1234'],
    publish_status: 'published',
    auto_enabled_status: 'enabled',
    sort: 'usage_count',
    sort_dir: 'desc',
  },
]);
