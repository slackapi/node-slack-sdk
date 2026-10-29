# @slack/oauth

## 4.0.0

### Major Changes

- fc98c8c: Drop Node.js 18 support. The minimum supported Node.js version is now 20.
- fc98c8c: Error classes now extend a new `SlackOAuthError` abstract base class (which extends `Error`), bringing `@slack/oauth` in line with the error handling in `@slack/web-api` and `@slack/webhook`. You can catch any error thrown by this package with `if (error instanceof SlackOAuthError)`, in addition to the existing per-class `instanceof` checks (`AuthorizationError`, `InstallerInitializationError`, etc.).

  `AuthorizationError` now populates the standard [`Error.cause`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause) property with the underlying error when one is available (for example, the failure that caused `authorize()` to reject). The existing `original` property is still present and carries the same value.

  ```javascript
  import { AuthorizationError } from "@slack/oauth";

  try {
    await installer.authorize({ teamId, enterpriseId });
  } catch (error) {
    if (error instanceof AuthorizationError) {
      console.log(error.cause); // the underlying error
      console.log(error.original); // same value — kept for backward compat
    }
  }
  ```

  The `error.code` property and `ErrorCode` enum values are unchanged, so existing `error.code` checks continue to work. The `CodedError` interface is retained (it is part of the public `CallbackOptions#failure` callback signature), but for new code we recommend `instanceof` checks against `SlackOAuthError` or a specific subclass.

  Note: `error.name` now reflects the specific class name (e.g. `'AuthorizationError'`) instead of the generic `'Error'`. If you branch on `error.name`, update those checks accordingly.

- fc98c8c: Updated the internal `@slack/web-api` dependency from `^7` to `^8`. If you pass `clientOptions` to `InstallProvider`, the following options are no longer available:

  - **`clientOptions.agent`** — Use `clientOptions.fetch` with a custom fetch implementation instead.
  - **`clientOptions.tls`** — Configure TLS via `clientOptions.fetch` or the `NODE_EXTRA_CA_CERTS` environment variable.

  ```js
  import { InstallProvider } from "@slack/oauth";
  import { fetch, Agent } from "undici";

  const installer = new InstallProvider({
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    stateSecret: "my-secret",
    clientOptions: {
      fetch: (url, init) =>
        fetch(url, {
          ...init,
          dispatcher: new Agent({ connect: { ca: myCA } }),
        }),
    },
  });
  ```

  See the `@slack/web-api` v8 changelog for the full list of breaking changes that affect `clientOptions`.

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

## 3.0.5

### Patch Changes

- dbd38e2: fix: write files to the file installation store using the path.join method
- b8d922f: build: add support for node 24
- Updated dependencies [75649f4]
- Updated dependencies [b8d922f]
- Updated dependencies [b8d922f]
  - @slack/web-api@7.15.0
  - @slack/logger@4.0.1
