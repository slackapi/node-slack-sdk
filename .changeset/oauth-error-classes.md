---
"@slack/oauth": major
---

Error classes now extend a new `SlackOAuthError` abstract base class (which extends `Error`), bringing `@slack/oauth` in line with the error handling in `@slack/web-api` and `@slack/webhook`. You can catch any error thrown by this package with `if (error instanceof SlackOAuthError)`, in addition to the existing per-class `instanceof` checks (`AuthorizationError`, `InstallerInitializationError`, etc.).

`AuthorizationError` now populates the standard [`Error.cause`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause) property with the underlying error when one is available (for example, the failure that caused `authorize()` to reject). The existing `original` property is still present and carries the same value.

```javascript
import { AuthorizationError } from '@slack/oauth';

try {
  await installer.authorize({ teamId, enterpriseId });
} catch (error) {
  if (error instanceof AuthorizationError) {
    console.log(error.cause);    // the underlying error
    console.log(error.original); // same value — kept for backward compat
  }
}
```

The `error.code` property and `ErrorCode` enum values are unchanged, so existing `error.code` checks continue to work. The `CodedError` interface is retained (it is part of the public `CallbackOptions#failure` callback signature), but for new code we recommend `instanceof` checks against `SlackOAuthError` or a specific subclass.

Note: `error.name` now reflects the specific class name (e.g. `'AuthorizationError'`) instead of the generic `'Error'`. If you branch on `error.name`, update those checks accordingly.
