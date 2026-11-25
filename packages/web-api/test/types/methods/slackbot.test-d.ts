import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// slackbot.skillSets.create
// -- sad path
expectError(web.slackbot.skillSets.create()); // lacking argument
expectError(web.slackbot.skillSets.create({})); // empty argument
expectError(
  web.slackbot.skillSets.create({
    description: 'Skills for preparing customer calls.', // missing display_name
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.slackbot.skillSets.create>>([
  {
    display_name: 'Sales toolkit',
  },
]);
expectAssignable<Parameters<typeof web.slackbot.skillSets.create>>([
  {
    display_name: 'Sales toolkit',
    description: 'Skills for preparing customer calls and following up on deals.',
  },
]);

// slackbot.skillSets.delete
// -- sad path
expectError(web.slackbot.skillSets.delete()); // lacking argument
expectError(web.slackbot.skillSets.delete({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.slackbot.skillSets.delete>>([
  {
    skill_set_id: 'F1234',
  },
]);

// slackbot.skillSets.info
// -- sad path
expectError(web.slackbot.skillSets.info()); // lacking argument
expectError(web.slackbot.skillSets.info({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.slackbot.skillSets.info>>([
  {
    skill_set_id: 'F1234',
  },
]);

// slackbot.skillSets.items.add
// -- sad path
expectError(web.slackbot.skillSets.items.add()); // lacking argument
expectError(web.slackbot.skillSets.items.add({})); // empty argument
expectError(
  web.slackbot.skillSets.items.add({
    skill_set_id: 'F1234', // missing skill_ids
  }),
);
expectError(
  web.slackbot.skillSets.items.add({
    skill_ids: ['F5678'], // missing skill_set_id
  }),
);
expectError(
  web.slackbot.skillSets.items.add({
    skill_set_id: 'F1234',
    skill_ids: 'F5678', // skill_ids is an array
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.slackbot.skillSets.items.add>>([
  {
    skill_set_id: 'F1234',
    skill_ids: ['F5678', 'F9012'],
  },
]);

// slackbot.skillSets.items.remove
// -- sad path
expectError(web.slackbot.skillSets.items.remove()); // lacking argument
expectError(web.slackbot.skillSets.items.remove({})); // empty argument
expectError(
  web.slackbot.skillSets.items.remove({
    skill_set_id: 'F1234', // missing skill_ids
  }),
);
expectError(
  web.slackbot.skillSets.items.remove({
    skill_set_id: 'F1234',
    skill_ids: 'F5678', // skill_ids is an array
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.slackbot.skillSets.items.remove>>([
  {
    skill_set_id: 'F1234',
    skill_ids: ['F5678'],
  },
]);

// slackbot.skillSets.library.add
// -- sad path
expectError(web.slackbot.skillSets.library.add()); // lacking argument
expectError(web.slackbot.skillSets.library.add({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.slackbot.skillSets.library.add>>([
  {
    skill_set_id: 'F1234',
  },
]);

// slackbot.skillSets.library.remove
// -- sad path
expectError(web.slackbot.skillSets.library.remove()); // lacking argument
expectError(web.slackbot.skillSets.library.remove({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.slackbot.skillSets.library.remove>>([
  {
    skill_set_id: 'F1234',
  },
]);

// slackbot.skillSets.list
// -- sad path
expectError(
  web.slackbot.skillSets.list({
    filter: 'catalog', // invalid filter
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.slackbot.skillSets.list>>([]); // no arg is fine
expectAssignable<Parameters<typeof web.slackbot.skillSets.list>>([{}]); // empty arg is fine
expectAssignable<Parameters<typeof web.slackbot.skillSets.list>>([
  {
    filter: 'editable',
    cursor: 'dGVhbTpDMDYxRkE1UEI=',
    limit: 100,
  },
]);

// slackbot.skillSets.update
// -- sad path
expectError(web.slackbot.skillSets.update()); // lacking argument
expectError(web.slackbot.skillSets.update({})); // empty argument
expectError(
  web.slackbot.skillSets.update({
    display_name: 'Sales toolkit', // missing skill_set_id
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.slackbot.skillSets.update>>([
  {
    skill_set_id: 'F1234',
    display_name: 'Sales toolkit',
  },
]);
expectAssignable<Parameters<typeof web.slackbot.skillSets.update>>([
  {
    skill_set_id: 'F1234',
    description: '', // an empty string clears the description
  },
]);

// slackbot.skills.create
// -- sad path
expectError(web.slackbot.skills.create()); // lacking argument
expectError(web.slackbot.skills.create({})); // empty argument
expectError(
  web.slackbot.skills.create({
    instructions: '# Purpose', // missing display_name
  }),
);
expectError(
  web.slackbot.skills.create({
    display_name: 'Daily priorities',
    instructions: '# Purpose',
    category: 'cooking', // invalid category
  }),
);
expectError(
  web.slackbot.skills.create({
    display_name: 'Daily priorities',
    instructions: '# Purpose',
    mcp_servers: ['A1234'], // mcp_servers are objects
  }),
);
expectError(
  web.slackbot.skills.create({
    display_name: 'Daily priorities',
    instructions: '# Purpose',
    mcp_servers: [{ app_id: 'A1234' }], // missing service_type
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.slackbot.skills.create>>([
  {
    display_name: 'Daily priorities', // the api requires exactly one of instructions or canvas_id
  },
]);
expectAssignable<Parameters<typeof web.slackbot.skills.create>>([
  {
    display_name: 'Daily priorities',
    instructions: '# Purpose\nSuggest the three most important things to work on today.',
  },
]);
expectAssignable<Parameters<typeof web.slackbot.skills.create>>([
  {
    display_name: 'Daily priorities',
    canvas_id: 'F1234',
  },
]);
expectAssignable<Parameters<typeof web.slackbot.skills.create>>([
  {
    display_name: 'Daily priorities',
    instructions: '# Purpose\nSuggest the three most important things to work on today.',
    description: 'Reviews information from Slack and your calendar to suggest priorities for the day.',
    category: 'productivity',
    example_prompt: 'Run {skill} for today',
    mcp_servers: [{ service_type: 'app', app_id: 'A1234', server_id: 'Amcp1234' }],
  },
]);

// slackbot.skills.delete
// -- sad path
expectError(web.slackbot.skills.delete()); // lacking argument
expectError(web.slackbot.skills.delete({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.slackbot.skills.delete>>([
  {
    skill_id: 'F1234',
  },
]);

// slackbot.skills.info
// -- sad path
expectError(web.slackbot.skills.info()); // lacking argument
expectError(web.slackbot.skills.info({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.slackbot.skills.info>>([
  {
    skill_id: 'F1234',
  },
]);

// slackbot.skills.library.add
// -- sad path
expectError(web.slackbot.skills.library.add()); // lacking argument
expectError(web.slackbot.skills.library.add({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.slackbot.skills.library.add>>([
  {
    skill_id: 'F1234',
  },
]);

// slackbot.skills.library.remove
// -- sad path
expectError(web.slackbot.skills.library.remove()); // lacking argument
expectError(web.slackbot.skills.library.remove({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.slackbot.skills.library.remove>>([
  {
    skill_id: 'F1234',
  },
]);

// slackbot.skills.list
// -- sad path
expectError(
  web.slackbot.skills.list({
    filter: 'shared', // invalid filter
  }),
);
expectError(
  web.slackbot.skills.list({
    category: 'cooking', // invalid category
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.slackbot.skills.list>>([]); // no arg is fine
expectAssignable<Parameters<typeof web.slackbot.skills.list>>([{}]); // empty arg is fine
expectAssignable<Parameters<typeof web.slackbot.skills.list>>([
  {
    filter: 'owned',
    category: 'engineering',
    cursor: 'dGVhbTpDMDYxRkE1UEI=',
    limit: 100,
  },
]);

// slackbot.skills.update
// -- sad path
expectError(web.slackbot.skills.update()); // lacking argument
expectError(web.slackbot.skills.update({})); // empty argument
expectError(
  web.slackbot.skills.update({
    display_name: 'Daily priorities', // missing skill_id
  }),
);
expectError(
  web.slackbot.skills.update({
    skill_id: 'F1234',
    category: 'cooking', // invalid category
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.slackbot.skills.update>>([
  {
    skill_id: 'F1234',
  },
]);
expectAssignable<Parameters<typeof web.slackbot.skills.update>>([
  {
    skill_id: 'F1234',
    description: '',
    category: '',
    example_prompt: '',
    mcp_servers: [],
  },
]);
expectAssignable<Parameters<typeof web.slackbot.skills.update>>([
  {
    skill_id: 'F1234',
    display_name: 'Daily priorities',
    instructions: '# Purpose\nSuggest the three most important things to work on today.',
    description: 'Reviews information from Slack and your calendar to suggest priorities for the day.',
    category: 'productivity',
    example_prompt: 'Run {skill} for today',
    mcp_servers: [{ service_type: 'app', app_id: 'A1234' }],
  },
]);
