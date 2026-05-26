---
sidebar_label: Migrating to v8
---

# Migrating the `web-api` package from v7 to v8

_Minimum Node.js version: 20_

This major release replaces [axios](https://www.npmjs.com/package/axios) with the native [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) (`globalThis.fetch`). This drops 4 dependencies (`axios`, `form-data`, `is-electron`, `is-stream`).

There is now a `fetch` option that replaces several transport options (`agent`, `tls`, `requestInterceptor`, `adapter`). Pass in your own fetch function to configure proxies, TLS, or whatever transport behavior you need. If you don't need any of that, the SDK uses `globalThis.fetch` and requires no configuration. 

As a result, the SDK works across runtimes (Node.js, Deno, Bun, Cloudflare Workers).

## Installation

```
npm i @slack/web-api
```

Read on to learn how to address breaking changes as a result of this release.

---

## Breaking changes

### We've removed the `agent` option

**Before (v7):**

```javascript
import { WebClient } from '@slack/web-api';
import { HttpsProxyAgent } from 'https-proxy-agent';

const agent = new HttpsProxyAgent('http://corporate.proxy:8080');

const client = new WebClient(token, {
  agent,
});
```

#### Preferred: Built-in proxy support

Node.js can read your proxy environment variables natively via [`http.setGlobalProxyFromEnv()`](https://nodejs.org/docs/latest/api/http.html#httpsetglobalproxyfromenvproxyenv). Call it once at startup and `globalThis.fetch` routes through your proxy automatically without the need for any extra packages.

##### Option A: programmatically call once at startup

```javascript
import http from 'node:http';
import { WebClient } from '@slack/web-api';

http.setGlobalProxyFromEnv();

// All WebClient instances now route through HTTP_PROXY/HTTPS_PROXY automatically
const client = new WebClient(token);
```

##### Option B: use an environment variable

```bash
NODE_USE_ENV_PROXY=1 HTTPS_PROXY=http://corporate.proxy:8080 node app.js
```

```javascript
import { WebClient } from '@slack/web-api';

// No proxy configuration needed — globalThis.fetch respects the environment
const client = new WebClient(token);
```

#### Alternative: undici dispatcher

If you need per-client proxy config, or want combined proxy and TLS, use the `fetch` option with an [undici](https://undici.nodejs.org/) dispatcher:

```javascript
import { WebClient } from '@slack/web-api';
import { fetch, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent('http://corporate.proxy:8080');

const client = new WebClient(token, {
  fetch: (url, init) => fetch(url, { ...init, dispatcher }),
});
```

---

### We've removed the `tls` option and `TLSOptions` export

You should configure TLS through a custom `fetch` with an undici dispatcher instead.

**Before (v7):**

```javascript
import { WebClient } from '@slack/web-api';
import fs from 'node:fs';

const client = new WebClient(token, {
  tls: {
    cert: fs.readFileSync('/path/to/client-cert.pem'),
    key: fs.readFileSync('/path/to/client-key.pem'),
    ca: fs.readFileSync('/path/to/ca-cert.pem'),
  },
});
```

**After (v8):**

```javascript
import { WebClient } from '@slack/web-api';
import { fetch, Agent } from 'undici';
import fs from 'node:fs';

const dispatcher = new Agent({
  connect: {
    cert: fs.readFileSync('/path/to/client-cert.pem'),
    key: fs.readFileSync('/path/to/client-key.pem'),
    ca: fs.readFileSync('/path/to/ca-cert.pem'),
  },
});

const client = new WebClient(token, {
  fetch: (url, init) => fetch(url, { ...init, dispatcher }),
});
```

---

### We've removed the `requestInterceptor` and `RequestInterceptor` types

You should wrap the `fetch` function to intercept or modify requests.

**Before (v7):**

```javascript
import { WebClient } from '@slack/web-api';

const client = new WebClient(token, {
  requestInterceptor: (config) => {
    config.headers['X-Custom-Header'] = 'my-value';
    console.log(`→ ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
});
```

**After (v8):**

```javascript
import { WebClient } from '@slack/web-api';

const client = new WebClient(token, {
  fetch: async (url, init) => {
    const headers = { ...init?.headers, 'X-Custom-Header': 'my-value' };
    console.log(`→ ${init?.method ?? 'GET'} ${url}`);
    return globalThis.fetch(url, { ...init, headers });
  },
});
```

---

### We've removed the `adapter` and `AdapterConfig` types

You should provide a custom `fetch` function instead.

**Before (v7):**

```javascript
import { WebClient } from '@slack/web-api';
import type { InternalAxiosRequestConfig } from 'axios';

const mockAdapter = async (config: InternalAxiosRequestConfig) => ({
  data: { ok: true },
  status: 200,
  statusText: 'OK',
  headers: {},
  config,
});

const client = new WebClient(token, { adapter: mockAdapter });
```

**After (v8):**

```javascript
import { WebClient } from '@slack/web-api';

const mockFetch = async (url: string | URL, init?: RequestInit) =>
  new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });

const client = new WebClient(token, { fetch: mockFetch });
```

---

### We've removed the `attachOriginalToWebAPIRequestError` option

The original error is now **always** attached to `WebAPIRequestError`.

```diff
 const client = new WebClient(token, {
-  attachOriginalToWebAPIRequestError: true,
 });
```

If you were setting this to `true` (the default), you can safely remove it.

If you were setting it to `false` to suppress the original error, note that `error.original` will now always be present.

---

### We've removed access to deprecated API methods

Five methods that were deprecated in v7 have been removed entirely ([#2592](https://github.com/slackapi/node-slack-sdk/pull/2592)):

| Removed method | Replacement | Notes |
| --- | --- | --- |
| `files.upload` | `filesUploadV2` | `filesUploadV2` was added in web-api v6.7 |
| `rtm.start` | `rtm.connect` | Deprecated since 2021 |
| `workflows.stepCompleted` | None | Steps from Apps was retired in Sep 2024 |
| `workflows.stepFailed` | None | Steps from Apps was retired in Sep 2024 |
| `workflows.updateStep` | None | Steps from Apps was retired in Sep 2024 |

---

### We've overhauled error handling

Errors are now proper `Error` subclasses instead of interfaces with factory functions ([#2593](https://github.com/slackapi/node-slack-sdk/pull/2593)). This means `instanceof` checks work, TypeScript narrows types correctly, and error names are descriptive.

The `ErrorCode` enum values are unchanged, so existing `error.code` checks will still work. That being said, we recommend using `instanceof`. 

#### New error class hierarchy

```
SlackError (abstract)
├── WebAPIPlatformError    — Slack API returned ok: false
├── WebAPIHTTPError        — non-200 HTTP status
├── WebAPIRequestError     — network/fetch failure
├── WebAPIRateLimitedError — 429 rate limited
└── WebAPIFileUploadReadFileDataError — file read failure during upload
```

#### Available `instanceof` checks

**Before (v7):**

```javascript
import { WebClient, ErrorCode } from '@slack/web-api';
import type { WebAPIPlatformError, WebAPIRequestError } from '@slack/web-api';

try {
  await client.chat.postMessage({ channel: 'C123', text: 'hello' });
} catch (error) {
  if (error.code === ErrorCode.PlatformError) {
    const platformError = error as WebAPIPlatformError;
    console.log(platformError.data.error);
  } else if (error.code === ErrorCode.RequestError) {
    const requestError = error as WebAPIRequestError;
    console.log(requestError.original);
  }
}
```

**After (v8):**

```javascript
import { WebClient, WebAPIPlatformError, WebAPIRequestError } from '@slack/web-api';

try {
  await client.chat.postMessage({ channel: 'C123', text: 'hello' });
} catch (error) {
  if (error instanceof WebAPIPlatformError) {
    console.log(error.data.error); // e.g. 'channel_not_found'
  } else if (error instanceof WebAPIRequestError) {
    console.log(error.cause); // the underlying fetch/network error
  }
}
```

:::info[The `error.code` pattern still works if you prefer not to change your error handling]
```javascript
import { WebClient, ErrorCode } from '@slack/web-api';

try {
  await client.chat.postMessage({ channel: 'C123', text: 'hello' });
} catch (error) {
  if (error.code === ErrorCode.PlatformError) {
    console.log(error.data.error);
  }
}
```
:::

#### Changed `error.name` values

| Error class | v7 `error.name` | v8 `error.name` |
| --- | --- | --- |
| `WebAPIPlatformError` | `'Error'` | `'WebAPIPlatformError'` |
| `WebAPIHTTPError` | `'Error'` | `'WebAPIHTTPError'` |
| `WebAPIRequestError` | `'Error'` | `'WebAPIRequestError'` |
| `WebAPIRateLimitedError` | `'Error'` | `'WebAPIRateLimitedError'` |

You will need to update any filters on `error.name` by your logging or error monitoring tools (Sentry, Datadog, etc.) 

#### `WebAPIRequestError` uses standard `Error.cause`

Request errors now populate the standard [`Error.cause`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause) property with the underlying network error. The `original` property is still present for backward compatibility.

```javascript
if (error instanceof WebAPIRequestError) {
  console.log(error.cause);    // the underlying fetch/network error
  console.log(error.original); // same value — kept for backward compat
}
```

#### Changed `WebAPIHTTPError.headers` type

`headers` is now `Record<string, string>` instead of Node.js's `IncomingHttpHeaders`. Values are always plain strings — no more `string | string[] | undefined`.

**Before (v7):**

```javascript
import type { WebAPIHTTPError } from '@slack/web-api';

function handleError(error: WebAPIHTTPError) {
  const retryAfter = error.headers['retry-after'];
  // retryAfter is string | string[] | undefined
  const value = Array.isArray(retryAfter) ? retryAfter[0] : retryAfter;
}
```

**After (v8):**

```javascript
import { WebAPIHTTPError } from '@slack/web-api';

function handleError(error: WebAPIHTTPError) {
  const retryAfter = error.headers['retry-after'];
  // retryAfter is string | undefined — no array handling needed
}
```

---

### We've removed the `RequestConfig` type

The `RequestConfig` type was an alias for axios's `InternalAxiosRequestConfig`. If you were importing it for `requestInterceptor`, [that has also been removed](requestinterceptor-and-requestinterceptor-type-removed). Use a fetch wrapper instead as described above.

```diff
-import type { RequestConfig } from '@slack/web-api';
```

---

### We've raised the minimum Node.js version raised to 20

We've dropped support for Node.js 18. Node.js 20 or later is required.

---

## New features

### We've added a `fetch` option for full transport control

`WebClientOptions` now accepts a `fetch` option, any function with the same signature as [`globalThis.fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch). This gives you complete control over HTTP behavior without the SDK needing to know the details.

```javascript
import { WebClient, type FetchFunction } from '@slack/web-api';

const instrumented: FetchFunction = async (url, init) => {
  const start = Date.now();
  const response = await globalThis.fetch(url, init);
  console.log(`${init?.method} ${url} → ${response.status} (${Date.now() - start}ms)`);
  return response;
};

const client = new WebClient(token, { fetch: instrumented });
```

### We've added exported `fetch` types

You can now use these new types for implementing custom fetch functions with full TypeScript support:

- `FetchFunction` — the function signature
- `FetchResponse` — response interface
- `FetchRequestInit` — request options interface
- `FetchHeaders` — headers interface