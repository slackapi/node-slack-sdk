import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// assistant.search.context
// -- sad path
expectError(web.assistant.search.context()); // lacking argument
expectError(web.assistant.search.context({})); // empty argument
expectError(
  web.assistant.search.context({
    query: 123, // not a string
  }),
  web.assistant.search.context({
    query: 'What is project gizmo?',
    channel_types: ['public_channel', 'channel'], // unsupported channel type
  }),
  web.assistant.search.context({
    query: 'What is project gizmo?',
    content_types: ['messages', 'posts'], // unsupported content type
  }),
  web.assistant.search.context({
    query: 'What is project gizmo?',
    include_bots: 'false', // not a boolean
  }),
  web.assistant.search.context({
    query: 'What is project gizmo?',
    keywords_clauses: ['project'], // not an array of string arrays
  }),
  web.assistant.search.context({
    query: 'What is project gizmo?',
    sort: 'date', // unsupported sort field
  }),
  web.assistant.search.context({
    query: 'What is project gizmo?',
    sort_dir: 'down', // unsupported sort direction
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.assistant.search.context>>([
  {
    query: 'What is project gizmo?',
  },
]);
expectAssignable<Parameters<typeof web.assistant.search.context>>([
  {
    query: 'What is the latest on project Gizmo?',
    action_token: '12345.98765.abcd2358fdea',
    after: 1752512713,
    before: 1755191113,
    channel_types: ['public_channel', 'private_channel', 'mpim', 'im'],
    content_types: ['messages', 'files', 'channels', 'users'],
    context_channel_id: 'C1234',
    cursor: 'asf91j9jfd',
    disable_semantic_search: false,
    highlight: true,
    include_archived_channels: true,
    include_bots: false,
    include_context_messages: true,
    include_deleted_users: false,
    include_message_blocks: true,
    keywords_clauses: [['project', 'gizmo']],
    limit: 20,
    modifiers: 'has:pin before:yesterday',
    sort: 'timestamp',
    sort_dir: 'asc',
    term_clauses: ['project gizmo'],
  },
]);

// assistant.search.info
// -- happy path
expectAssignable<Parameters<typeof web.assistant.search.info>>([]);
expectAssignable<Parameters<typeof web.assistant.search.info>>([{}]);
expectAssignable<Parameters<typeof web.assistant.search.info>>([
  {
    token: 'TOKEN',
  },
]);

// assistant.threads.setStatus
// -- sad path
expectError(web.assistant.threads.setStatus()); // lacking argument
expectError(web.assistant.threads.setStatus({})); // empty argument
expectError(
  web.assistant.threads.setStatus({
    channel_id: 'C1234', // missing status and thread_ts
  }),
  web.assistant.threads.setStatus({
    status: 'thinking...', // missing channel_id and thread_ts
  }),
  web.assistant.threads.setStatus({
    thread_ts: '123.123', // missing channel_id and status
  }),
  web.assistant.threads.setStatus({
    channel_id: 'C1234', // missing thread_ts
    status: 'thinking...',
  }),
  web.assistant.threads.setStatus({
    channel_id: 'C1234', // missing status
    thread_ts: '123.123',
  }),
  web.assistant.threads.setStatus({
    status: 'thinking...', // missing channel_id
    thread_ts: '123.123',
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.assistant.threads.setStatus>>([
  {
    channel_id: 'C1234',
    thread_ts: '123.123',
    status: 'thinking...',
  },
]);
expectAssignable<Parameters<typeof web.assistant.threads.setStatus>>([
  {
    channel_id: 'C1234',
    thread_ts: '123.123',
    status: 'thinking...',
    loading_messages: ['counting sheep...', 'moving bricks...'],
  },
]);
expectAssignable<Parameters<typeof web.assistant.threads.setStatus>>([
  {
    channel_id: 'C1234',
    thread_ts: '123.123',
    status: 'counting...',
    username: 'Abacus',
    icon_emoji: 'abacus',
  },
]);
expectAssignable<Parameters<typeof web.assistant.threads.setStatus>>([
  {
    channel_id: 'C1234',
    thread_ts: '123.123',
    status: 'dreaming...',
    icon_url: 'https://example.com/clouds-square.png',
  },
]);

// assistant.threads.setSuggestedPrompts
// -- sad path
expectError(web.assistant.threads.setSuggestedPrompts()); // lacking argument
expectError(web.assistant.threads.setSuggestedPrompts({})); // empty argument
expectError(
  web.assistant.threads.setSuggestedPrompts({
    channel_id: 'C1234', // missing prompts and thread_ts
  }),
  web.assistant.threads.setSuggestedPrompts({
    prompts: [], // missing channel_id
  }),
  web.assistant.threads.setSuggestedPrompts({
    thread_ts: '123.123', // missing channel_id and prompts
  }),
  web.assistant.threads.setSuggestedPrompts({
    channel_id: 'C1234', // missing prompts
    thread_ts: '123.123',
  }),
  web.assistant.threads.setSuggestedPrompts({
    prompts: [], // missing channel_id
    thread_ts: '123.123',
  }),
  web.assistant.threads.setSuggestedPrompts({
    channel_id: 'C1234',
    prompts: 'placeholder', // not an array
    thread_ts: '123.123',
  }),
  web.assistant.threads.setSuggestedPrompts({
    channel_id: 'C1234',
    prompts: ['placeholder'], // not an object
    thread_ts: '123.123',
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.assistant.threads.setSuggestedPrompts>>([
  {
    channel_id: 'C1234',
    prompts: [],
  },
]);
expectAssignable<Parameters<typeof web.assistant.threads.setSuggestedPrompts>>([
  {
    channel_id: 'C1234',
    prompts: [{ title: 'Summarize this channel', message: 'Summarize the recent activity in this channel.' }],
    title: 'Suggested Prompts',
  },
]);
expectAssignable<Parameters<typeof web.assistant.threads.setSuggestedPrompts>>([
  {
    channel_id: 'C1234',
    thread_ts: '123.123',
    prompts: [],
  },
]);
expectAssignable<Parameters<typeof web.assistant.threads.setSuggestedPrompts>>([
  {
    channel_id: 'C1234',
    thread_ts: '123.123',
    prompts: [{ title: 'Summarize this channel', message: 'Summarize the recent activity in this channel.' }],
  },
]);
expectAssignable<Parameters<typeof web.assistant.threads.setSuggestedPrompts>>([
  {
    channel_id: 'C1234',
    thread_ts: '123.123',
    prompts: [{ title: 'Draft a reply', message: 'Draft a reply to the latest message in this thread.' }],
    title: 'Suggested Prompts',
  },
]);

// assistant.threads.setTitle
// -- sad path
expectError(web.assistant.threads.setTitle()); // lacking argument
expectError(web.assistant.threads.setTitle({})); // empty argument
expectError(
  web.assistant.threads.setTitle({
    channel_id: 'C1234', // missing thread_ts and title
  }),
  web.assistant.threads.setTitle({
    title: 'pondering', // missing channel_id and title
  }),
  web.assistant.threads.setTitle({
    thread_ts: '123.123', // missing channel_id and title
  }),
  web.assistant.threads.setTitle({
    channel_id: 'C1234', // missing thread_ts
    title: 'pondering',
  }),
  web.assistant.threads.setTitle({
    channel_id: 'C1234', // missing title
    thread_ts: '123.123',
  }),
  web.assistant.threads.setTitle({
    title: 'pondering', // missing channel_id
    thread_ts: '123.123',
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.assistant.threads.setTitle>>([
  {
    channel_id: 'C1234',
    thread_ts: '123.123',
    title: 'pondering',
  },
]);
