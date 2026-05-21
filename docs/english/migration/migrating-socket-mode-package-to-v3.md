# Migrating @slack/socket-mode from v2 to v3

_Minimum Node.js version: **20**_

This major release switches from the [`ws`](https://www.npmjs.com/package/ws) library to the [`undici`](https://undici.nodejs.org/) library's [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) implementation. 

If you're not using a proxy or custom TLS, no action is needed beyond bumping the version number.

The main thing you'll notice: `httpAgent` is gone. You'll use a `dispatcher` option instead, which handles both WebSocket connections and HTTP API calls in one place. Or, if you're on a recent Node.js version, you can set an environment variable and skip manual proxy config entirely.

The `undici` library is a **peer dependency**.

## Breaking changes

### We've removed the `httpAgent` option

**Before (v2):**

```typescript
import { SocketModeClient } from '@slack/socket-mode';
import { HttpsProxyAgent } from 'https-proxy-agent';

const agent = new HttpsProxyAgent('http://corporate.proxy:8080');

const client = new SocketModeClient({
  appToken: process.env.SLACK_APP_TOKEN,
  httpAgent: agent,
});
```

#### Preferred: Built-in proxy support

Node.js can read your proxy environment variables (`HTTP_PROXY`, `HTTPS_PROXY`, `NO_PROXY`) and route traffic automatically via [`http.setGlobalProxyFromEnv()`](https://nodejs.org/docs/latest/api/http.html#httpsetglobalproxyfromenvproxyenv). Both WebSocket and HTTP traffic respect this.

##### Option A: use environment variable

```bash
NODE_USE_ENV_PROXY=1 HTTPS_PROXY=http://corporate.proxy:8080 node app.js
```

```typescript
import { SocketModeClient } from '@slack/socket-mode';

// No proxy configuration needed — both WebSocket and HTTP use the proxy
const client = new SocketModeClient({
  appToken: process.env.SLACK_APP_TOKEN,
});
```

##### Option B: programmatically call once at startup

```typescript
import http from 'node:http';
import { SocketModeClient } from '@slack/socket-mode';

http.setGlobalProxyFromEnv();

// Both WebSocket and HTTP API calls route through the proxy automatically
const client = new SocketModeClient({
  appToken: process.env.SLACK_APP_TOKEN,
});
```

#### Alternative: use the undici `dispatcher`

If you need per-client proxy configuration or separate WebSocket vs HTTP proxy routing, use the `dispatcher` option with an undici `Dispatcher` (like `ProxyAgent` or `Agent`).

The `dispatcher` is used for both WebSocket connections and HTTP API calls (via the internal `WebClient`):

```typescript
import { SocketModeClient } from '@slack/socket-mode';
import { ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent('http://corporate.proxy:8080');

const client = new SocketModeClient({
  appToken: process.env.SLACK_APP_TOKEN,
  dispatcher,
});
```

No separate proxy setup needed as one dispatcher covers everything.

---

### We've updated the dependency on `@slack/web-api@^8`

This package now uses `@slack/web-api@^8` internally. If you're passing `clientOptions`, the web-api breaking changes apply there too. Check the [web-api v8 migration guide](./web-api-v8-migration.md) for details.

```diff
 const client = new SocketModeClient({
   appToken: process.env.SLACK_APP_TOKEN,
   clientOptions: {
-    agent: myAgent,
-    tls: { cert, key },
+    fetch: (url, init) => fetch(url, { ...init, dispatcher }),
   },
 });
```

---

### We've removed the `ws` library and added `undici@^7` as a peer dependency

Learn more about the `undici` library [here](https://www.npmjs.com/package/undici).

---

### We've raised the minimum Node.js version to 20

We've dropped support for Node.js 18. Node.js 20 or later is required.

---

### We've overhauled error handling

Errors are now proper `Error` subclasses instead of interfaces with factory functions ([#2596](https://github.com/slackapi/node-slack-sdk/pull/2596)). This means `instanceof` checks work, TypeScript narrows types correctly, and error names are descriptive.

**Your existing `error.code` checks still work.** The `ErrorCode` enum values are unchanged. But `instanceof` is now the recommended pattern.

#### New error classes

| Class | When it's thrown |
| --- | --- |
| `SMWebsocketError` | WebSocket connection or protocol failure |
| `SMPlatformError` | Slack API returned an error (e.g., `apps.connections.open` failed) |
| `SMNoReplyReceivedError` | Server didn't acknowledge a message in time |
| `SMSendWhileDisconnectedError` | Attempted to send while the WebSocket is disconnected |
| `SMSendWhileNotReadyError` | Attempted to send before the client is fully ready |

#### How `instanceof` checks work

**Before (v2):**

```typescript
import { SocketModeClient, ErrorCode } from '@slack/socket-mode';

const client = new SocketModeClient({ appToken: process.env.SLACK_APP_TOKEN });

client.on('error', (error) => {
  if (error.code === ErrorCode.SendWhileDisconnectedError) {
    console.log('Not connected, will retry...');
  } else if (error.code === ErrorCode.WebsocketError) {
    console.log('WebSocket issue:', error.message);
  }
});
```

**After (v3):**

```typescript
import {
  SocketModeClient,
  SMSendWhileDisconnectedError,
  SMWebsocketError,
} from '@slack/socket-mode';

const client = new SocketModeClient({ appToken: process.env.SLACK_APP_TOKEN });

client.on('error', (error) => {
  if (error instanceof SMSendWhileDisconnectedError) {
    console.log('Not connected, will retry...');
  } else if (error instanceof SMWebsocketError) {
    console.log('WebSocket issue:', error.cause);
  }
});
```

The `error.code` pattern still works if you prefer not to change your error handling:

```typescript
import { SocketModeClient, ErrorCode } from '@slack/socket-mode';

const client = new SocketModeClient({ appToken: process.env.SLACK_APP_TOKEN });

client.on('error', (error) => {
  if (error.code === ErrorCode.SendWhileDisconnectedError) {
    console.log('Not connected, will retry...');
  }
});
```

#### `error.name` values changed

| Error class | v2 `error.name` | v3 `error.name` |
| --- | --- | --- |
| `SMWebsocketError` | `'Error'` | `'SMWebsocketError'` |
| `SMPlatformError` | `'Error'` | `'SMPlatformError'` |
| `SMNoReplyReceivedError` | `'Error'` | `'SMNoReplyReceivedError'` |
| `SMSendWhileDisconnectedError` | `'Error'` | `'SMSendWhileDisconnectedError'` |
| `SMSendWhileNotReadyError` | `'Error'` | `'SMSendWhileNotReadyError'` |

If your logging or error monitoring tools filter on `error.name`, update those filters.

---

## New features

### `dispatcher` option for unified proxy/TLS configuration

:::tip[You can skip manual dispatcher configuration entirely by using `http.setGlobalProxyFromEnv()` or `NODE_USE_ENV_PROXY=1`]
See [the `httpAgent` option removed section](#we-removed-the-httpagent-option) above for more detail.
:::

Pass any undici `Dispatcher` and it'll handle both WebSocket and HTTP traffic:

```typescript
import { SocketModeClient, LogLevel } from '@slack/socket-mode';
import { ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent('http://corporate.proxy:8080');

const client = new SocketModeClient({
  appToken: process.env.SLACK_APP_TOKEN,
  logLevel: LogLevel.DEBUG,
  dispatcher,
});

client.on('message', async ({ event, ack }) => {
  await ack();
  console.log(event);
});

await client.start();
```

### Separate dispatchers for WebSocket and HTTP traffic

For advanced cases where WebSocket and HTTP traffic need different proxy configurations:

```typescript
import { SocketModeClient } from '@slack/socket-mode';
import { fetch, ProxyAgent } from 'undici';

const wsProxy = new ProxyAgent('http://ws-proxy:8080');
const httpProxy = new ProxyAgent('http://http-proxy:9090');

const client = new SocketModeClient({
  appToken: process.env.SLACK_APP_TOKEN,
  // WebSocket connections use this dispatcher
  dispatcher: wsProxy,
  clientOptions: {
    // HTTP API calls use a separate custom fetch
    fetch: (url, init) => fetch(url, { ...init, dispatcher: httpProxy }),
  },
});
```

When you provide `clientOptions.fetch`, the `dispatcher` only handles WebSocket connections; HTTP calls go through your custom fetch instead.

### Spec-compliant WebSocket implementation

Under the hood, the WebSocket implementation is now spec-compliant (aligned with browser WebSocket APIs). This shouldn't affect your code — event listeners and message handling work the same as before.