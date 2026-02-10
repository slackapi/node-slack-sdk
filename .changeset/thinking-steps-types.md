---
"@slack/types": minor
---

feat: add thinking steps types

Added types for Thinking Steps features:

- **Block types**: `PlanBlock` and `TaskCard` for displaying task progress in messages
- **Chunk types**: `MarkdownTextChunk`, `PlanUpdateChunk`, `TaskUpdateChunk` for streaming
- **Source types**: `UrlSource` to reference sources of a task

Related PRs:

- [#2471](https://github.com/slackapi/node-slack-sdk/pull/2471) - add task_card and plan blocks

### Example

```js
await client.chat.postMessage({
  channel: CHANNEL_ID,
  text: "Task progress update",
  blocks: [
    {
      type: "plan",
      plan_id: "plan-123",
      title: "My Task",
      tasks: [
        {
          type: "task_card",
          task_id: "task-124",
          title: "Task 1",
          status: "complete",
        },
        {
          type: "task_card",
          task_id: "task-125",
          title: "Task 2",
          status: "pending",
        },
      ],
    },
  ],
});
```
