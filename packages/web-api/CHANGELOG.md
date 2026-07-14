# @slack/web-api

## 8.0.0

### Major Changes

- fc98c8c: Drop Node.js 18 support. The minimum supported Node.js version is now 20.
- fc98c8c: Redesigned error handling to use proper `Error` subclasses instead of plain objects with a `code` property.

  **Migration:** Replace `if (error.code === ErrorCode.PlatformError)` with `if (error instanceof WebAPIPlatformError)`. All error classes extend a common `SlackError` base class (which extends `Error`), so you can also catch all SDK errors with `if (error instanceof SlackError)`.

  **New error class hierarchy:**

  - `SlackError` (abstract base)
    - `WebAPIPlatformError` — Slack API returned `ok: false`
    - `WebAPIRequestError` — Network/transport failure (original error in `cause`)
    - `WebAPIHTTPError` — Non-200 HTTP status from Slack
    - `WebAPIRateLimitedError` — HTTP 429 with `retryAfter` seconds
    - `WebAPIFileUploadInvalidArgumentsError` — Invalid file upload arguments
    - `WebAPIFileUploadReadFileDataError` — Failed to read file data for upload

  **Removed factory functions** (these were internal but exported — use `new` with the corresponding class instead):

  - `errorWithCode()`
  - `platformErrorFromResult()` → `new WebAPIPlatformError(...)`
  - `requestErrorWithOriginal()` → `new WebAPIRequestError(...)`
  - `httpErrorFromResponse()` → `new WebAPIHTTPError(...)`
  - `rateLimitedErrorWithDelay()` → `new WebAPIRateLimitedError(...)`

  **Other breaking type changes:**

  - `WebAPIHTTPError.headers` type changed from `IncomingHttpHeaders` to `Record<string, string>`.
  - The `CodedError` interface is deprecated — use `instanceof` checks with specific error classes instead.
  - Error `.name` values changed from generic `'Error'` to descriptive class names (e.g., `'WebAPIPlatformError'`).

- fc98c8c: Replaced `axios` with the standard Fetch API for all HTTP transport. The following options and types have been removed from `WebClientOptions`:

  - **`agent`** — Use the new `fetch` option to provide a custom fetch implementation with proxy or keep-alive support. For proxies, prefer the built-in `http.setGlobalProxyFromEnv()` or `NODE_USE_ENV_PROXY=1` (Node.js 24+). For advanced use cases:
    ```ts
    import { fetch, Agent } from "undici";
    const client = new WebClient(token, {
      fetch: (url, init) =>
        fetch(url, {
          ...init,
          dispatcher: new Agent({ keepAliveTimeout: 60_000 }),
        }),
    });
    ```
  - **`tls`** and **`TLSOptions`** — Configure TLS via a custom `fetch` implementation with an undici `Agent`, or use the `NODE_EXTRA_CA_CERTS` environment variable.
  - **`requestInterceptor`** and **`RequestInterceptor`** type — Wrap the `fetch` function to intercept or modify requests before they are sent.
  - **`adapter`** and **`AdapterConfig`** type — Use the `fetch` option instead.
  - **`RequestConfig`** type (was an alias for Axios' `InternalAxiosRequestConfig`) — Removed entirely.
  - **`attachOriginalToWebAPIRequestError`** option — Removed. The original error is now always available via the standard `cause` property on `WebAPIRequestError`.

  The dependencies `axios`, `form-data`, `is-electron`, and `is-stream` have been removed. The default `fetch` implementation is `globalThis.fetch` (available in Node.js 20+).

  New exported types for custom fetch implementations: `FetchFunction`, `FetchResponse`, `FetchRequestInit`, `FetchHeaders`.

- fc98c8c: Removed previously-deprecated API methods and their associated request/response types:

  - **`files.upload`** — Use `filesUploadV2` instead (available since v6.7). The `filesUploadV2` method handles the multi-step upload process automatically.
  - **`rtm.start`** — Use `rtm.connect` instead. The `rtm.start` method was deprecated by Slack in favor of the lighter-weight `rtm.connect`.
  - **`workflows.stepCompleted`**, **`workflows.stepFailed`**, **`workflows.updateStep`** — These methods supported the retired [Steps from Apps](https://api.slack.com/changelog/2023-08-workflow-steps-from-apps-step-back) feature (deprecated August 2023, retired September 2024). The `workflows.featured.*` and `admin.workflows.*` methods for the current Workflow Builder remain available.

### Minor Changes

- fc98c8c: feat: expand app manifest types — add `agent_view` and `assistant_view` features, recent agent events (`app_context_changed`, `assistant_thread_started`, `assistant_thread_context_changed`), optional OAuth scopes (`bot_optional`/`user_optional`), and event `metadata_subscriptions`

### Patch Changes

- bb49d99: fix: apply redact() to API response bodies in debug logs and recurse into nested objects, preventing tokens from leaking into logs when debug logging is enabled
- Updated dependencies [fc98c8c]
- Updated dependencies [fc98c8c]
  - @slack/logger@5.0.0
  - @slack/types@3.0.0

## 7.18.0

### Minor Changes

- 07744de: feat: make `thread_ts` optional for `assistant.threads.setSuggestedPrompts`

## 7.17.0

### Minor Changes

- 2085900: feat: expose public read-only `ts` getter on `ChatStreamer` for fallback to [`chat.update`](https://docs.slack.dev/reference/methods/chat.update) when a stream expires server-side

  ```js
  import { WebClient } from "@slack/web-api";

  const client = new WebClient(process.env.SLACK_BOT_TOKEN);

  const streamer = client.chatStream({
    channel: "C0123456789",
    thread_ts: "1700000001.123456",
    recipient_team_id: "T0123456789",
    recipient_user_id: "U0123456789",
  });

  await streamer.append({ markdown_text: "hello!" });
  // streamer.ts is now set after the first flush
  console.log(streamer.ts);

  await streamer.stop();
  ```

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
