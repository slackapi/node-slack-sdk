# @slack/web-api

## 7.16.0

### Minor Changes

- 2814969: feat: add `highlight_type` to [`files.completeUploadExternal`](https://docs.slack.dev/reference/methods/files.completeUploadExternal) and [`filesUploadV2`](https://docs.slack.dev/tools/node-slack-sdk/web-api#upload-a-file) for optimistic rendering

  ```js
  import { WebClient } from "@slack/web-api";

  const client = new WebClient(process.env.SLACK_BOT_TOKEN);

  await client.filesUploadV2({
    channel_id: "C0123456789",
    file: "./image.png",
    filename: "image.png",
    title: "Image Upload",
    highlight_type: "png",
  });
  ```

## 7.15.2

### Patch Changes

- 4b6fe3a: feat: add authorship arguments - `icon_emoji`, `icon_url`, and `username` - to the [`assistant.threads.setStatus`](https://docs.slack.dev/reference/methods/assistant.threads.setStatus/) and [`chat.startStream`](https://docs.slack.dev/reference/methods/chat.startStream/) methods
- Updated dependencies [4f03ee8]
  - @slack/types@2.21.0

## 7.15.1

### Patch Changes

- 3a9c444: build(deps): bump minimum axios version to 1.15.0
- 175dcb8: Fix user-agent header to URI-encode characters outside the Latin-1 range, preventing errors when `process.title` contains non-ASCII characters

## 7.15.0

### Minor Changes

- 75649f4: feat: add support for apps.user.connection.update

### Patch Changes

- b8d922f: build: add support for node 24
- Updated dependencies [b8d922f]
- Updated dependencies [b8d922f]
  - @slack/logger@4.0.1
  - @slack/types@2.20.1

## 7.14.1

### Patch Changes

- 370cf22: chore(deps): bump axios to ^1.13.5

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
