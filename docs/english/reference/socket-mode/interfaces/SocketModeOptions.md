[@slack/socket-mode](../index.md) / SocketModeOptions

# Interface: SocketModeOptions

Defined in: [packages/socket-mode/src/SocketModeOptions.ts:21](https://github.com/slackapi/node-slack-sdk/blob/main/packages/socket-mode/src/SocketModeOptions.ts#L21)

## Properties

### appToken

```ts
appToken: string;
```

Defined in: [packages/socket-mode/src/SocketModeOptions.ts:25](https://github.com/slackapi/node-slack-sdk/blob/main/packages/socket-mode/src/SocketModeOptions.ts#L25)

The App-level token associated with your app, located under the Basic Information page on api.slack.com/apps.

***

### autoReconnectEnabled?

```ts
optional autoReconnectEnabled: boolean;
```

Defined in: [packages/socket-mode/src/SocketModeOptions.ts:39](https://github.com/slackapi/node-slack-sdk/blob/main/packages/socket-mode/src/SocketModeOptions.ts#L39)

Whether the client should automatically reconnect when the socket mode connection is disrupted. Defaults to `true`.
Note that disconnects are regular and expected when using Socket Mode, so setting this to `false` will likely lead
to a disconnected client after some amount of time.

***

### clientOptions?

```ts
optional clientOptions: Omit<WebClientOptions, "logLevel" | "logger">;
```

Defined in: [packages/socket-mode/src/SocketModeOptions.ts:63](https://github.com/slackapi/node-slack-sdk/blob/main/packages/socket-mode/src/SocketModeOptions.ts#L63)

The `@slack/web-api` `WebClientOptions` to provide to the HTTP client interacting with Slack's HTTP API.
Useful for setting retry configurations and custom fetch implementations.

***

### clientPingTimeout?

```ts
optional clientPingTimeout: number;
```

Defined in: [packages/socket-mode/src/SocketModeOptions.ts:46](https://github.com/slackapi/node-slack-sdk/blob/main/packages/socket-mode/src/SocketModeOptions.ts#L46)

How long the client should wait for a `pong` response to the client's `ping` to the server, in milliseconds.
If this timeout is hit, the client will attempt to reconnect if `autoReconnectEnabled` is `true`;
otherwise, it will disconnect.
Defaults to 5,000.

***

### dispatcher?

```ts
optional dispatcher: SocketModeDispatcher;
```

Defined in: [packages/socket-mode/src/SocketModeOptions.ts:78](https://github.com/slackapi/node-slack-sdk/blob/main/packages/socket-mode/src/SocketModeOptions.ts#L78)

A [SocketModeDispatcher](SocketModeDispatcher.md) used for the WebSocket connection and, if no custom `fetch` is provided
via `clientOptions`, also wrapped into a custom fetch for HTTP API calls.
If `clientOptions.fetch` is already defined, the dispatcher is only used for the WebSocket connection.

Use this to configure proxies or custom TLS behavior.

#### Example

```js
// Using undici's ProxyAgent as the dispatcher
import { ProxyAgent } from 'undici';
const dispatcher = new ProxyAgent('http://proxy:3128');
```

***

### logger?

```ts
optional logger: Logger;
```

Defined in: [packages/socket-mode/src/SocketModeOptions.ts:29](https://github.com/slackapi/node-slack-sdk/blob/main/packages/socket-mode/src/SocketModeOptions.ts#L29)

An instance of `@slack/logger`'s Logger interface, to send log messages to.

***

### logLevel?

```ts
optional logLevel: LogLevel;
```

Defined in: [packages/socket-mode/src/SocketModeOptions.ts:33](https://github.com/slackapi/node-slack-sdk/blob/main/packages/socket-mode/src/SocketModeOptions.ts#L33)

An instance of `@slack/logger`'s LogLevel enum, setting the minimum log level to emit log messages for.

***

### pingPongLoggingEnabled?

```ts
optional pingPongLoggingEnabled: boolean;
```

Defined in: [packages/socket-mode/src/SocketModeOptions.ts:58](https://github.com/slackapi/node-slack-sdk/blob/main/packages/socket-mode/src/SocketModeOptions.ts#L58)

Should logging related to `ping` and `pong` messages between the client and server be logged at a
`LogLevel.DEBUG` level. Defaults to `false.

***

### serverPingTimeout?

```ts
optional serverPingTimeout: number;
```

Defined in: [packages/socket-mode/src/SocketModeOptions.ts:53](https://github.com/slackapi/node-slack-sdk/blob/main/packages/socket-mode/src/SocketModeOptions.ts#L53)

How long the client should wait for `ping` messages from the server, in milliseconds.
If this timeout is hit, the client will attempt to reconnect if `autoReconnectEnabled` is `true`;
otherwise, it will disconnect.
Defaults to 30,000.
