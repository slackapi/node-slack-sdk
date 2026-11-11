import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// admin.slackbot.skills.list
// -- sad path
expectError(
  web.admin.slackbot.skills.list({
    auto_enabled_status: 'on', // invalid auto_enabled_status
  }),
);
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
    auto_enabled_status: 'enabled',
    category: 'productivity',
    creator_ids: ['U1234', 'W1234'],
    cursor: 'dXNlcjpVMDYxTkZUVDI=',
    limit: 100,
    publish_status: 'published',
    sort: 'usage_count',
    sort_dir: 'desc',
  },
]);

// admin.slackbot.skills.publish
// -- sad path
expectError(web.admin.slackbot.skills.publish()); // lacking argument
expectError(web.admin.slackbot.skills.publish({})); // empty argument
expectError(
  web.admin.slackbot.skills.publish({
    skill_ids: [], // need at least 1 item
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.admin.slackbot.skills.publish>>([
  {
    skill_ids: ['F1234', 'F5678'],
  },
]);

// admin.slackbot.skills.setAutoEnabled
// -- sad path
expectError(web.admin.slackbot.skills.setAutoEnabled()); // lacking argument
expectError(web.admin.slackbot.skills.setAutoEnabled({})); // empty argument
expectError(
  web.admin.slackbot.skills.setAutoEnabled({
    permission_type: 'everyone', // missing skill_id
  }),
);
expectError(
  web.admin.slackbot.skills.setAutoEnabled({
    skill_id: 'F1234', // missing permission_type
  }),
);
expectError(
  web.admin.slackbot.skills.setAutoEnabled({
    permission_type: 'some_people', // invalid permission_type
    skill_id: 'F1234',
  }),
);
expectError(
  web.admin.slackbot.skills.setAutoEnabled({
    permission_type: 'named_entities',
    skill_id: 'F1234',
    usergroup_ids: [], // need at least 1 item
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.admin.slackbot.skills.setAutoEnabled>>([
  {
    permission_type: 'everyone',
    skill_id: 'F1234',
  },
]);
expectAssignable<Parameters<typeof web.admin.slackbot.skills.setAutoEnabled>>([
  {
    permission_type: 'named_entities',
    skill_id: 'F1234',
    usergroup_ids: ['S1234'],
  },
]);
expectAssignable<Parameters<typeof web.admin.slackbot.skills.setAutoEnabled>>([
  {
    permission_type: 'no_one',
    skill_id: 'F1234',
  },
]);

// admin.slackbot.skills.unpublish
// -- sad path
expectError(web.admin.slackbot.skills.unpublish()); // lacking argument
expectError(web.admin.slackbot.skills.unpublish({})); // empty argument
expectError(
  web.admin.slackbot.skills.unpublish({
    skill_ids: [], // need at least 1 item
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.admin.slackbot.skills.unpublish>>([
  {
    skill_ids: ['F1234', 'F5678'],
  },
]);
