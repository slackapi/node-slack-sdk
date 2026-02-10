---
"@slack/web-api": minor
---

feat: add thinking steps

This release introduces new Thinking Steps features:

- **Chunks in streaming methods**: `chat.appendStream`, `chat.startStream`, and `chat.stopStream` now support a `chunks` parameter for streaming structured content including markdown text, plan updates, and task updates with sources.

- **Task and Plan Blocks**: `chat.postMessage` and related methods now support `plan` blocks containing `task_card` elements for displaying task progress and status.

### Streaming with Chunks

```js
const stream = new ChatStreamer(client, client.logger, {
  channel: CHANNEL_ID,
  thread_ts: threadTs,
});

await stream.append({
  chunks: [
    {
      type: 'markdown_text',
      text: '**Hello!** I am starting to process your request...\n\n'
    }
  ]
});

await stream.append({
  chunks: [
    {
      type: 'plan_update',
      title: 'Processing tasks...',
    },
    {
      type: 'task_update',
      id: 'task-1',
      title: 'Fetching data from API',
      status: 'complete',
      output: 'Successfully retrieved 42 records',
    },
  ],
});

await stream.stop({
  chunks: [
    {
      type: 'markdown_text',
      text: '\n\n---\n\n✅ **All tasks completed successfully!**\n',
    },
  ],
});
```

### Task and Plan Blocks

```js
await client.chat.postMessage({
  channel: CHANNEL_ID,
  text: 'Task progress update',
  blocks: [
    {
      type: 'plan',
      plan_id: 'plan-123',
      title: 'My Task',
      tasks: [
        {
          type: 'task_card',
          task_id: 'task-124',
          title: 'Task 1',
          status: 'complete'
        },
        {
          type: 'task_card',
          task_id: 'task-125',
          title: 'Task 2',
          status: 'pending'
        },
      ]
    }
  ]
});
```
