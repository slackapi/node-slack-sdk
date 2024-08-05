# Class: SocketModeClient

A Socket Mode Client allows programs to communicate with the
[Slack Platform's Events API](https://api.slack.com/events-api) over WebSocket connections.
This object uses the EventEmitter pattern to dispatch incoming events
and has a built in send method to acknowledge incoming events over the WebSocket connection.

## Extends

- [`Logger`](../variables/Logger.md)

## Constructors

### new SocketModeClient()

```ts
new SocketModeClient(__namedParameters): SocketModeClient
```

#### Parameters

• **\_\_namedParameters**: [`SocketModeOptions`](../interfaces/SocketModeOptions.md) = `...`

#### Returns

[`SocketModeClient`](SocketModeClient.md)

#### Overrides

`EventEmitter.constructor`

#### Defined in

[packages/socket-mode/src/SocketModeClient.ts:99](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/socket-mode/src/SocketModeClient.ts#L99)

## Properties

### websocket?

```ts
optional websocket: SlackWebSocket;
```

The underlying WebSocket client instance

#### Defined in

[packages/socket-mode/src/SocketModeClient.ts:69](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/socket-mode/src/SocketModeClient.ts#L69)

## Methods

### disconnect()

```ts
disconnect(): Promise<void>
```

End a Socket Mode session. After this method is called no messages will be sent or received
unless you call start() again later.

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/socket-mode/src/SocketModeClient.ts:205](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/socket-mode/src/SocketModeClient.ts#L205)

***

### onWebSocketMessage()

```ts
protected onWebSocketMessage(data, isBinary): Promise<void>
```

`onmessage` handler for the client's WebSocket.
This will parse the payload and dispatch the application-relevant events for each incoming message.
Mediates:
- raising the State.Connected event (when Slack sends a type:hello message)
- disconnecting the underlying socket (when Slack sends a type:disconnect message)

#### Parameters

• **data**: `RawData`

• **isBinary**: `boolean`

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/socket-mode/src/SocketModeClient.ts:282](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/socket-mode/src/SocketModeClient.ts#L282)

***

### start()

```ts
start(): Promise<AppsConnectionsOpenResponse>
```

Start a Socket Mode session app.
This method must be called before any messages can be sent or received,
or to disconnect the client via the `disconnect` method.

#### Returns

`Promise`\<`AppsConnectionsOpenResponse`\>

#### Defined in

[packages/socket-mode/src/SocketModeClient.ts:163](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/socket-mode/src/SocketModeClient.ts#L163)
