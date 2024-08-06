# Class: SlackEventAdapter

An adapter for Slack's Events API.

## Extends

- `unknown`

## Constructors

### new SlackEventAdapter()

```ts
new SlackEventAdapter(signingSecret, __namedParameters): SlackEventAdapter
```

#### Parameters

• **signingSecret**: `string`

The token used to authenticate signed requests from Slack's Events API.

• **\_\_namedParameters**: [`EventAdapterOptions`](Interface.EventAdapterOptions.md) = `{}`

#### Returns

[`SlackEventAdapter`](Class.SlackEventAdapter.md)

#### Overrides

`EventEmitter.constructor`

#### Defined in

[packages/events-api/src/adapter.ts:47](https://github.com/slackapi/node-slack-sdk/blob/main/packages/events-api/src/adapter.ts#L47)

## Properties

### includeBody

```ts
includeBody: boolean;
```

Whether to include the API event bodies in adapter event listeners.

#### Defined in

[packages/events-api/src/adapter.ts:23](https://github.com/slackapi/node-slack-sdk/blob/main/packages/events-api/src/adapter.ts#L23)

***

### includeHeaders

```ts
includeHeaders: boolean;
```

Whether to include request headers in adapter event listeners.

#### Defined in

[packages/events-api/src/adapter.ts:28](https://github.com/slackapi/node-slack-sdk/blob/main/packages/events-api/src/adapter.ts#L28)

***

### signingSecret

```ts
readonly signingSecret: string;
```

The token used to authenticate signed requests from Slack's Events API.

#### Defined in

[packages/events-api/src/adapter.ts:18](https://github.com/slackapi/node-slack-sdk/blob/main/packages/events-api/src/adapter.ts#L18)

***

### waitForResponse

```ts
waitForResponse: boolean;
```

When `true` prevents the adapter from responding by itself and leaves that up to listeners.

#### Defined in

[packages/events-api/src/adapter.ts:33](https://github.com/slackapi/node-slack-sdk/blob/main/packages/events-api/src/adapter.ts#L33)

## Methods

### createServer()

```ts
createServer(): Promise<Server>
```

Creates an HTTP server to listen for event payloads.

#### Returns

`Promise`\<`Server`\>

#### Defined in

[packages/events-api/src/adapter.ts:76](https://github.com/slackapi/node-slack-sdk/blob/main/packages/events-api/src/adapter.ts#L76)

***

### expressMiddleware()

```ts
expressMiddleware(): RequestHandler
```

Returns a middleware-compatible adapter.

#### Returns

`RequestHandler`

#### Defined in

[packages/events-api/src/adapter.ts:120](https://github.com/slackapi/node-slack-sdk/blob/main/packages/events-api/src/adapter.ts#L120)

***

### requestListener()

```ts
requestListener(): RequestListener
```

Creates a request listener.

#### Returns

`RequestListener`

#### Defined in

[packages/events-api/src/adapter.ts:130](https://github.com/slackapi/node-slack-sdk/blob/main/packages/events-api/src/adapter.ts#L130)

***

### start()

```ts
start(port): Promise<Server>
```

Starts a server on the specified port.

#### Parameters

• **port**: `number`

The port number to listen on.

#### Returns

`Promise`\<`Server`\>

The server from the built-in `http` module.

#### Defined in

[packages/events-api/src/adapter.ts:87](https://github.com/slackapi/node-slack-sdk/blob/main/packages/events-api/src/adapter.ts#L87)

***

### stop()

```ts
stop(): Promise<void>
```

Stops the server started by [SlackEventAdapter.start](Class.SlackEventAdapter.md#start).

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/events-api/src/adapter.ts:100](https://github.com/slackapi/node-slack-sdk/blob/main/packages/events-api/src/adapter.ts#L100)
