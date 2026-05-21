---
sidebar_label: Migrating to v8
---

# Migrating the `webhook` package from v7 to v8

_Minimum Node.js version: 20_

This major release drops the [axios](https://www.npmjs.com/package/axios) library and uses the native [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) (`globalThis.fetch`) instead.

The `agent` option is replaced by a `fetch` option. Pass in your own fetch function to configure proxies or TLS. If you're not using proxies or custom agents, no action is needed beyond bumping the version number.

## Installation

```
npm i @slack/webhook
```

## Breaking changes

### We've removed the `agent` option

The `agent` option is gone from `IncomingWebhookDefaultArguments`.

**Before (v7):**

```typescript
import { IncomingWebhook } from '@slack/webhook';
import { HttpsProxyAgent } from 'https-proxy-agent';

const agent = new HttpsProxyAgent('http://corporate.proxy:8080');

const webhook = new IncomingWebhook(webhookUrl, {
  agent,
});
```

#### Preferred: Built-in proxy support

Node.js can read your proxy environment variables natively via [`http.setGlobalProxyFromEnv()`](https://nodejs.org/docs/latest/api/http.html#httpsetglobalproxyfromenvproxyenv). Call it once at startup and `globalThis.fetch` routes through your proxy automatically without a need for extra packages.

**Option A — environment variable:**

```bash
NODE_USE_ENV_PROXY=1 HTTPS_PROXY=http://corporate.proxy:8080 node app.js
```

```typescript
import { IncomingWebhook } from '@slack/webhook';

// No proxy configuration needed — globalThis.fetch respects the environment
const webhook = new IncomingWebhook(webhookUrl);
```

**Option B — programmatic (call once at startup):**

```typescript
import http from 'node:http';
import { IncomingWebhook } from '@slack/webhook';

http.setGlobalProxyFromEnv();

// All webhook requests now route through HTTP_PROXY/HTTPS_PROXY automatically
const webhook = new IncomingWebhook(webhookUrl);
```

#### Alternative: undici dispatcher

If you need per-client proxy config, or want combined proxy and TLS, use the `fetch` option with an [undici](https://undici.nodejs.org/) dispatcher:

```typescript
import { IncomingWebhook } from '@slack/webhook';
import { fetch, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent('http://corporate.proxy:8080');

const webhook = new IncomingWebhook(webhookUrl, {
  fetch: (url, init) => fetch(url, { ...init, dispatcher }),
});
```

:::info[`undici` isn't a dependency of `@slack/webhook`]
:::

---

### We've restructured error classes

In v7, both `IncomingWebhookRequestError` and `IncomingWebhookHTTPError` had an `original` property typed as `AxiosError`. You would examine `error.original.response` for HTTP details. In v8, errors are restructured:

- `IncomingWebhookHTTPError` no longer has `original`. The HTTP status and response body are now **direct properties** (`statusCode`, `statusMessage`, `body`).
- `IncomingWebhookRequestError` still has `original`, but it's a standard `Error` (not `AxiosError`).

Both extend a new `SlackWebhookError` base class for `instanceof` checks.

**Before (v7):**

```typescript
import { IncomingWebhook } from '@slack/webhook';
import type { IncomingWebhookHTTPError } from '@slack/webhook';

const webhook = new IncomingWebhook(webhookUrl);

try {
  await webhook.send('Hello');
} catch (error) {
  const httpError = error as IncomingWebhookHTTPError;
  // v7: error.original was an AxiosError with response details
  console.log(httpError.original.response?.status); // e.g. 404
  console.log(httpError.original.response?.data);   // e.g. 'channel_not_found'
}
```

**After (v8):**

```typescript
import { IncomingWebhook, IncomingWebhookHTTPError, IncomingWebhookRequestError } from '@slack/webhook';

const webhook = new IncomingWebhook(webhookUrl);

try {
  await webhook.send('Hello');
} catch (error) {
  if (error instanceof IncomingWebhookHTTPError) {
    console.log(error.statusCode);    // e.g. 404
    console.log(error.body);          // e.g. 'channel_not_found'
    console.log(error.statusMessage); // e.g. 'Not Found'
  } else if (error instanceof IncomingWebhookRequestError) {
    // Network-level failure (DNS, connection refused, timeout, etc.)
    console.log(error.original.message);
  }
}
```

---

### We've raised the Minimum Node.js version to 20

We've dropped support for Node.js 18. Node.js 20 or later is required.

---

## New features

### We'ved added a `fetch` option for full transport control

`IncomingWebhookDefaultArguments` now accepts a `fetch` option, giving you full control over how HTTP requests are made — handy for proxies, TLS, instrumentation, or testing.

```typescript
import { IncomingWebhook, type FetchFunction } from '@slack/webhook';

const instrumented: FetchFunction = async (url, init) => {
  const start = Date.now();
  const response = await globalThis.fetch(url, init);
  console.log(`Webhook POST → ${response.status} (${Date.now() - start}ms)`);
  return response;
};

const webhook = new IncomingWebhook(webhookUrl, { fetch: instrumented });
```