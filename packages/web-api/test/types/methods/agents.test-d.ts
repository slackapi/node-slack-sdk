import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// agents.conversations.archive
// -- sad path
expectError(web.agents.conversations.archive()); // lacking argument
expectError(web.agents.conversations.archive({})); // missing channel_id
// -- happy path
expectAssignable<Parameters<typeof web.agents.conversations.archive>>([
  {
    channel_id: 'C9876543210',
  },
]);
expectAssignable<Parameters<typeof web.agents.conversations.archive>>([
  {
    channel_id: 'C9876543210',
    summary_message_ts: '1717182000.456789',
  },
]);

// agents.conversations.create
// -- sad path
expectError(web.agents.conversations.create()); // lacking argument
expectError(web.agents.conversations.create({})); // missing name
// -- happy path
expectAssignable<Parameters<typeof web.agents.conversations.create>>([
  {
    name: 'Migrate billing cron to Temporal',
  },
]);
expectAssignable<Parameters<typeof web.agents.conversations.create>>([
  {
    name: 'Migrate billing cron to Temporal',
    session_id: 'ses_8675309',
    origin_channel_id: 'C0123456789',
    origin_message_ts: '1717171717.123456',
  },
]);

// agents.conversations.getCanvas
// -- sad path
expectError(web.agents.conversations.getCanvas()); // lacking argument
expectError(web.agents.conversations.getCanvas({})); // missing channel and canvas_id
expectError(
  web.agents.conversations.getCanvas({
    channel: 'C9876543210', // missing canvas_id
  }),
  web.agents.conversations.getCanvas({
    canvas_id: 'F1234567890', // missing channel
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.agents.conversations.getCanvas>>([
  {
    channel: 'C9876543210',
    canvas_id: 'F1234567890',
  },
]);
expectAssignable<Parameters<typeof web.agents.conversations.getCanvas>>([
  {
    channel: 'C9876543210',
    canvas_id: 'F1234567890',
    include_resolved: false,
  },
]);

// agents.conversations.listViews
// -- sad path
expectError(web.agents.conversations.listViews()); // lacking argument
expectError(web.agents.conversations.listViews({})); // missing channel_id
// -- happy path
expectAssignable<Parameters<typeof web.agents.conversations.listViews>>([
  {
    channel_id: 'C9876543210',
  },
]);

// agents.conversations.removeView
// -- sad path
expectError(web.agents.conversations.removeView()); // lacking argument
expectError(web.agents.conversations.removeView({})); // missing channel_id
// -- happy path
expectAssignable<Parameters<typeof web.agents.conversations.removeView>>([
  {
    channel_id: 'C9876543210',
    view_key: 'reports/coverage.html',
  },
]);
expectAssignable<Parameters<typeof web.agents.conversations.removeView>>([
  {
    channel_id: 'C9876543210',
    view_id: 'Ct1234567890',
  },
]);

// agents.conversations.setCanvasContent
// -- sad path
expectError(web.agents.conversations.setCanvasContent()); // lacking argument
expectError(web.agents.conversations.setCanvasContent({})); // missing channel, canvas_id, content
expectError(
  web.agents.conversations.setCanvasContent({
    channel: 'C9876543210', // missing canvas_id and content
  }),
  web.agents.conversations.setCanvasContent({
    channel: 'C9876543210', // missing content
    canvas_id: 'F1234567890',
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.agents.conversations.setCanvasContent>>([
  {
    channel: 'C9876543210',
    canvas_id: 'F1234567890',
    content: '# Migration plan\n\n1. Inventory cron jobs\n2. Port billing jobs last\n',
  },
]);

// agents.conversations.setCommands
// -- sad path
expectError(web.agents.conversations.setCommands()); // lacking argument
expectError(web.agents.conversations.setCommands({})); // missing channel_id and commands
expectError(
  web.agents.conversations.setCommands({
    channel_id: 'C9876543210', // missing commands
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.agents.conversations.setCommands>>([
  {
    channel_id: 'C9876543210',
    commands: [],
  },
]);
expectAssignable<Parameters<typeof web.agents.conversations.setCommands>>([
  {
    channel_id: 'C9876543210',
    commands: [
      { name: 'create-pr', description: 'Open a pull request for the current branch', argument_hint: '[title]' },
      { name: 'run-tests', description: 'Run the test suite and report back' },
      { name: 'summarize', description: 'Post a summary of the work so far' },
    ],
  },
]);

// agents.conversations.setProperties
// -- sad path
expectError(web.agents.conversations.setProperties()); // lacking argument
expectError(web.agents.conversations.setProperties({})); // missing channel_id
// -- happy path
expectAssignable<Parameters<typeof web.agents.conversations.setProperties>>([
  {
    channel_id: 'C9876543210',
  },
]);
expectAssignable<Parameters<typeof web.agents.conversations.setProperties>>([
  {
    channel_id: 'C9876543210',
    code_channel: {
      context_bar_items: [
        { key: 'repo', label: 'borant/billing', icon: 'folder', url: 'https://github.com/borant/billing' },
      ],
    },
  },
]);

// agents.conversations.setView
// -- sad path
expectError(web.agents.conversations.setView()); // lacking argument
expectError(web.agents.conversations.setView({})); // missing channel_id
// -- happy path
expectAssignable<Parameters<typeof web.agents.conversations.setView>>([
  {
    channel_id: 'C9876543210',
    view_key: 'reports/coverage.html',
    name: 'Coverage',
    content: '<!doctype html><html><head></head><body></body></html>',
    csp: {
      resource_domains: ['https://cdn.jsdelivr.net'],
    },
  },
]);
expectAssignable<Parameters<typeof web.agents.conversations.setView>>([
  {
    channel_id: 'C9876543210',
    type: 'diff',
    content: 'diff --git a/cron.py b/cron.py\n--- a/cron.py\n+++ b/cron.py\n@@ ...',
    base_branch: 'main',
    head_branch: 'agent/migrate-cron',
  },
]);
