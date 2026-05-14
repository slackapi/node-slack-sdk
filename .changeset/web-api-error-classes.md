---
"@slack/web-api": major
---

Redesigned error handling to use proper `Error` subclasses instead of plain objects with a `code` property.

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
