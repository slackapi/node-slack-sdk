---
"@slack/socket-mode": major
---

Redesigned error handling to use proper `Error` subclasses instead of plain objects with a `code` property.

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
