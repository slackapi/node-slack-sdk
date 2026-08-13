# @slack/webhook

## 8.0.0

### Major Changes

- fc98c8c: Drop Node.js 18 support. The minimum supported Node.js version is now 20.
- fc98c8c: Restructured error classes to use proper `Error` subclasses extending a new `SlackWebhookError` base class.

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

- fc98c8c: Replaced `axios` with the standard Fetch API for HTTP transport.

  **Removed options from `IncomingWebhookDefaultArguments`:**

  - **`agent`** — Use the new `fetch` option to provide a custom fetch implementation with proxy or TLS support. For proxies, prefer the built-in `http.setGlobalProxyFromEnv()` or `NODE_USE_ENV_PROXY=1` (Node.js 24+). For advanced use cases:
    ```ts
    import { fetch, Agent } from "undici";
    const webhook = new IncomingWebhook(url, {
      fetch: (url, init) =>
        fetch(url, {
          ...init,
          dispatcher: new Agent({ connect: { ca: myCA } }),
        }),
    });
    ```

  The `axios` dependency has been removed. The default fetch implementation is `globalThis.fetch` (available in Node.js 20+). The `timeout` option remains available and is implemented via `AbortController`.

### Minor Changes

- fc98c8c: feat: add `WebhookTrigger` class for Workflow Builder triggers and opt-in retries for `IncomingWebhook` and `WebhookTrigger`

  `WebhookTrigger` surfaces its own `WebhookTriggerHTTPError` and `WebhookTriggerRequestError` (subclasses of `SlackWebhookError`), so trigger failures can be distinguished from `IncomingWebhook` failures via `instanceof`.

### Patch Changes

- Updated dependencies [fc98c8c]
  - @slack/types@3.0.0

## 7.1.0

### Minor Changes

- 59124ef: feat: export `addAppMetadata` for external instrumentation use

## 7.0.9

### Patch Changes

- 3a9c444: build(deps): bump minimum axios version to 1.15.0

## 7.0.8

### Patch Changes

- b8d922f: build: add support for node 24
- Updated dependencies [b8d922f]
  - @slack/types@2.20.1

## 7.0.7

### Patch Changes

- 370cf22: chore(deps): bump axios to ^1.13.5
