[@slack/socket-mode](../index.md) / SocketModeDispatcher

# Interface: SocketModeDispatcher

Defined in: [packages/socket-mode/src/SocketModeOptions.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/socket-mode/src/SocketModeOptions.ts#L11)

A structural type representing an HTTP dispatcher compatible with undici's fetch and WebSocket.
Any undici `Agent`, `ProxyAgent`, `Client`, or custom `Dispatcher` subclass satisfies this interface.

Defining this structurally allows consumers to use different compatible undici versions
without type conflicts.

## Methods

### dispatch()

```ts
dispatch(options, handler): boolean;
```

Defined in: [packages/socket-mode/src/SocketModeOptions.ts:18](https://github.com/slackapi/node-slack-sdk/blob/main/packages/socket-mode/src/SocketModeOptions.ts#L18)

Dispatches an HTTP request through this dispatcher.

#### Parameters

##### options

`any`

The request options (method, path, headers, body, etc.)

##### handler

`any`

The response handler that processes incoming data and events

#### Returns

`boolean`
