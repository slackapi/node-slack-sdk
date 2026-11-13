import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

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
