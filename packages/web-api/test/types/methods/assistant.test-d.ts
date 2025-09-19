import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

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

// assistant.threads.setSuggestedPrompts
// -- sad path
expectError(web.assistant.threads.setSuggestedPrompts()); // lacking argument
expectError(web.assistant.threads.setSuggestedPrompts({})); // empty argument
expectError(
  web.assistant.threads.setSuggestedPrompts({
    channel_id: 'C1234', // missing prompts and thread_ts
  }),
  web.assistant.threads.setSuggestedPrompts({
    prompts: [], // missing channel_id and thread_ts
  }),
  web.assistant.threads.setSuggestedPrompts({
    thread_ts: '123.123', // missing channel_id and prompts
  }),
  web.assistant.threads.setSuggestedPrompts({
    channel_id: 'C1234', // missing thread_ts
    prompts: [],
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
    thread_ts: '123.123',
    prompts: [],
  },
]);
expectAssignable<Parameters<typeof web.assistant.threads.setSuggestedPrompts>>([
  {
    channel_id: 'C1234',
    thread_ts: '123.123',
    prompts: [{ title: 'placeholder', message: 'example' }],
  },
]);
expectAssignable<Parameters<typeof web.assistant.threads.setSuggestedPrompts>>([
  {
    channel_id: 'C1234',
    thread_ts: '123.123',
    prompts: [{ title: 'placeholder', message: 'example' }],
    title: 'what is up?',
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
