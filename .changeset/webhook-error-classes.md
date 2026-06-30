---
"@slack/webhook": major
---

Restructured error classes to use proper `Error` subclasses extending a new `SlackWebhookError` base class.

**Breaking changes to `IncomingWebhookHTTPError`:**
- The `original` property has been removed. HTTP response details are now direct properties:
  - `statusCode: number`
  - `statusMessage: string`
  - `body: string`
- Migrate from `error.original.response.status` to `error.statusCode`, `error.original.response.data` to `error.body`, etc.

**Breaking changes to `IncomingWebhookRequestError`:**
- The `original` property is now a standard `Error` (previously it was an `AxiosError`). The original error is also available via the standard `cause` property.

**Removed factory functions** (use `new` with the corresponding class instead):
- `requestErrorWithOriginal()` → `new IncomingWebhookRequestError(original)`
- `httpErrorWithOriginal()` → `new IncomingWebhookHTTPError(statusCode, statusMessage, body)`
- `errorWithCode()` — Use the specific error class directly.

**Migration:** Replace `if (error.code === ErrorCode.HTTPError)` with `if (error instanceof IncomingWebhookHTTPError)`. You can also catch all webhook errors with `if (error instanceof SlackWebhookError)`.

The `CodedError` interface is deprecated — use `instanceof` checks with the `SlackWebhookError` base class or specific error subclasses instead.
