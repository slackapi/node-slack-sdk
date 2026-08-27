# @slack/socket-mode

## 3.0.1

### Patch Changes

- 5c2362c: Fix leaked TCP sockets on disconnect ([#2709](https://github.com/slackapi/node-slack-sdk/issues/2709)). Moving from `ws` to undici's `WebSocket` in 3.0.0 dropped every force-close mechanism, so `ESTABLISHED` sockets were never torn down and accumulated toward Slack's per-app connection cap.
  
  - `disconnect()` now arms a 30s close-handshake timeout, so a peer that never replies to the close frame no longer leaves the socket stuck in `CLOSING` indefinitely.
  - On the default dispatcher path, the underlying TCP socket is now captured and force-destroyed during cleanup. A user-supplied `dispatcher` owns its own socket and instead relies on the close-handshake timeout — this limitation is documented on the `dispatcher` option.
  - The `close` handler no longer schedules a reconnect on stale or overlapping close events, so at most one reconnect is scheduled per disconnect.

## 3.0.0

### Major Changes

- fc98c8c: Drop Node.js 18 support. The minimum supported Node.js version is now 20.
- fc98c8c: Redesigned error handling to use proper `Error` subclasses instead of plain objects with a `code` property.

  **Migration:** Replace `if (error.code === ErrorCode.WebsocketError)` with `if (error instanceof SMWebsocketError)`.

  **New error classes** (all extend a common `SlackSocketModeError` abstract base class, which extends `Error`):

  - `SMPlatformError` — Slack platform returned an error event
  - `SMWebsocketError` — WebSocket connection failure (original error in `cause`)
  - `SMNoReplyReceivedError` — Timed out waiting for a reply to an acknowledgement
  - `SMSendWhileDisconnectedError` — Attempted to send while not connected
  - `SMSendWhileNotReadyError` — Attempted to send before the connection was ready

  Catch any socket-mode error with `if (error instanceof SlackSocketModeError)`.

  **Removed factory functions** (use `new` with the corresponding class instead):

  - `websocketErrorWithOriginal()` → `new SMWebsocketError(original)`
  - `platformErrorFromEvent()` → `new SMPlatformError(event)`
  - `noReplyReceivedError()` → `new SMNoReplyReceivedError()`
  - `sendWhileDisconnectedError()` → `new SMSendWhileDisconnectedError()`
  - `sendWhileNotReadyError()` → `new SMSendWhileNotReadyError()`

  The `CodedError` interface is deprecated — use `instanceof` checks with specific error classes instead. The `error.code` property still exists for backward-compatible checks, but `error.name` values changed from generic `'Error'` to descriptive class names (e.g., `'SMWebsocketError'`).

- fc98c8c: Replaced the `ws` WebSocket library with a spec-compliant WebSocket implementation backed by `undici`. **`undici@^7` is now a peer dependency** that must be installed alongside `@slack/socket-mode`:

  ```bash
  npm install @slack/socket-mode undici@^7
  ```

  **Removed options:**

  - **`clientOptions.agent`** (the `httpAgent` passed to the underlying web-api client). Use the new top-level `dispatcher` option instead. The dispatcher handles both the WebSocket connection and HTTP API calls (unless `clientOptions.fetch` is also provided, in which case `dispatcher` only applies to WebSocket).

  **New `dispatcher` option:**

  ```js
  import { SocketModeClient } from "@slack/socket-mode";
  import { ProxyAgent } from "undici";

  const client = new SocketModeClient({
    appToken: process.env.SLACK_APP_TOKEN,
    dispatcher: new ProxyAgent("http://proxy:3128"),
  });
  ```

  For simple proxy use cases, prefer the Node.js built-in proxy support: call `http.setGlobalProxyFromEnv()` at startup or set `NODE_USE_ENV_PROXY=1` (Node.js 24+) with `HTTP_PROXY`/`HTTPS_PROXY` environment variables.

  The `dispatcher` option accepts any object implementing the `SocketModeDispatcher` interface (structurally compatible with undici's `Agent`, `ProxyAgent`, `Client`, etc.).

  This package now depends on `@slack/web-api@^8` — any `clientOptions` you pass are subject to web-api v8 breaking changes (e.g., the `agent` and `tls` options are no longer available; use `clientOptions.fetch` instead).

### Patch Changes

- Updated dependencies [fc98c8c]
- Updated dependencies [fc98c8c]
- Updated dependencies [fc98c8c]
- Updated dependencies [bb49d99]
- Updated dependencies [fc98c8c]
- Updated dependencies [fc98c8c]
- Updated dependencies [fc98c8c]
  - @slack/logger@5.0.0
  - @slack/web-api@8.0.0

## 2.0.7

### Patch Changes

- 5395b0c: fix: terminate closing connections earlier if normal close responses fail

  If Slack doesn't respond to a close frame, the WebSocket connection is now force-terminated instead of waiting for a response that won't arrive. Since [disconnects are expected](https://docs.slack.dev/apis/events-api/using-socket-mode/#disconnect) every few hours, this avoids repeated "pong wasn't received" warnings and speeds up reconnection.

## 2.0.6

### Patch Changes

- b8d922f: build: add support for node 24
- Updated dependencies [75649f4]
- Updated dependencies [b8d922f]
- Updated dependencies [b8d922f]
  - @slack/web-api@7.15.0
  - @slack/logger@4.0.1
