[@slack/socket-mode](../index.md) / SocketModeOptions

# Interface: SocketModeOptions

Defined in: [src/SocketModeOptions.ts:4](https://github.com/slackapi/node-slack-sdk/blob/main/packages/socket-mode/src/SocketModeOptions.ts#L4)

## Properties

### appToken

```ts
appToken: string;
```

Defined in: [src/SocketModeOptions.ts:8](https://github.com/slackapi/node-slack-sdk/blob/main/packages/socket-mode/src/SocketModeOptions.ts#L8)

The App-level token associated with your app, located under the Basic Information page on api.slack.com/apps.

***

### autoReconnectEnabled?

```ts
optional autoReconnectEnabled: boolean;
```

Defined in: [src/SocketModeOptions.ts:22](https://github.com/slackapi/node-slack-sdk/blob/main/packages/socket-mode/src/SocketModeOptions.ts#L22)

Whether the client should automatically reconnect when the socket mode connection is disrupted. Defaults to `true`.
Note that disconnects are regular and expected when using Socket Mode, so setting this to `false` will likely lead
to a disconnected client after some amount of time.

***

### clientOptions?

```ts
optional clientOptions: Omit<WebClientOptions, "logLevel" | "logger">;
```

Defined in: [src/SocketModeOptions.ts:46](https://github.com/slackapi/node-slack-sdk/blob/main/packages/socket-mode/src/SocketModeOptions.ts#L46)

The `@slack/web-api` `WebClientOptions` to provide to the HTTP client interacting with Slack's HTTP API.
Useful for setting retry configurations, TLS and HTTP Agent options.

***

### clientPingTimeout?

```ts
optional clientPingTimeout: number;
```

Defined in: [src/SocketModeOptions.ts:29](https://github.com/slackapi/node-slack-sdk/blob/main/packages/socket-mode/src/SocketModeOptions.ts#L29)

How long the client should wait for a `pong` response to the client's `ping` to the server, in milliseconds.
If this timeout is hit, the client will attempt to reconnect if `autoReconnectEnabled` is `true`;
otherwise, it will disconnect.
Defaults to 5,000.

***

### logger?

```ts
optional logger: Logger;
```

Defined in: [src/SocketModeOptions.ts:12](https://github.com/slackapi/node-slack-sdk/blob/main/packages/socket-mode/src/SocketModeOptions.ts#L12)

An instance of `@slack/logger`'s Logger interface, to send log messages to.

***

### logLevel?

```ts
optional logLevel: LogLevel;
```

Defined in: [src/SocketModeOptions.ts:16](https://github.com/slackapi/node-slack-sdk/blob/main/packages/socket-mode/src/SocketModeOptions.ts#L16)

An instance of `@slack/logger`'s LogLevel enum, setting the minimum log level to emit log messages for.

***

### pingPongLoggingEnabled?

```ts
optional pingPongLoggingEnabled: boolean;
```

Defined in: [src/SocketModeOptions.ts:41](https://github.com/slackapi/node-slack-sdk/blob/main/packages/socket-mode/src/SocketModeOptions.ts#L41)

Should logging related to `ping` and `pong` messages between the client and server be logged at a
`LogLevel.DEBUG` level. Defaults to `false.

***

### serverPingTimeout?

```ts
optional serverPingTimeout: number;
```

Defined in: [src/SocketModeOptions.ts:36](https://github.com/slackapi/node-slack-sdk/blob/main/packages/socket-mode/src/SocketModeOptions.ts#L36)

How long the client should wait for `ping` messages from the server, in milliseconds.
If this timeout is hit, the client will attempt to reconnect if `autoReconnectEnabled` is `true`;
otherwise, it will disconnect.
Defaults to 30,000.
