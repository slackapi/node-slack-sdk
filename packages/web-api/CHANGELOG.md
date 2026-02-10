# @slack/web-api

## 7.14.0

### Minor Changes

- 1fbce32: feat: add thinking steps support to streaming methods

  `chat.appendStream`, `chat.startStream`, and `chat.stopStream` now accept a `chunks` parameter for streaming structured content including markdown text, plan updates, and task updates.

  Related PRs:

  - [#2467](https://github.com/slackapi/node-slack-sdk/pull/2467) - accept chunks as arguments to chat.{start,append,stop}Stream methods
  - [#2470](https://github.com/slackapi/node-slack-sdk/pull/2470) - accept chunks as arguments to chat stream helper
  - [#2479](https://github.com/slackapi/node-slack-sdk/pull/2479) - add task display mode option to start of chat streams
  - [#2481](https://github.com/slackapi/node-slack-sdk/pull/2481) - export the chat streamer and related options from the package

  ### Example

  ```js
  const stream = new ChatStreamer(client, client.logger, {
    channel: CHANNEL_ID,
    thread_ts: threadTs,
  });

  await stream.append({
    chunks: [
      {
        type: "markdown_text",
        text: "**Hello!** I am starting to process your request...\n\n",
      },
    ],
  });

  await stream.append({
    chunks: [
      {
        type: "plan_update",
        title: "Processing tasks...",
      },
      {
        type: "task_update",
        id: "task-1",
        title: "Fetching data from API",
        status: "complete",
        output: "Successfully retrieved 42 records",
      },
    ],
  });

  await stream.stop({
    chunks: [
      {
        type: "markdown_text",
        text: "\n\n---\n\n✅ **All tasks completed successfully!**\n",
      },
    ],
  });
  ```

### Patch Changes

- 16a43ca: fix(web-api): add channel_id to canvases.create method
- Updated dependencies [f1fb7bf]
  - @slack/types@2.20.0
