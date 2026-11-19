[@slack/socket-mode](../index.md) / SocketModeClient

# Class: SocketModeClient

Defined in: [packages/socket-mode/src/SocketModeClient.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/socket-mode/src/SocketModeClient.ts#L43)

A Socket Mode Client allows programs to communicate with the
[Slack Platform's Events API](https://https://docs.slack.dev/apis/events-api) over WebSocket connections.
This object uses the EventEmitter pattern to dispatch incoming events
and has a built in send method to acknowledge incoming events over the WebSocket connection.

## Extends

- `EventEmitter`

## Constructors

### Constructor

```ts
new SocketModeClient(__namedParameters?): SocketModeClient;
```

Defined in: [packages/socket-mode/src/SocketModeClient.ts:116](https://github.com/slackapi/node-slack-sdk/blob/main/packages/socket-mode/src/SocketModeClient.ts#L116)

#### Parameters

##### \_\_namedParameters?

[`SocketModeOptions`](../interfaces/SocketModeOptions.md) = `...`

#### Returns

`SocketModeClient`

#### Overrides

`EventEmitter.constructor`

## Properties

### websocket?

```ts
websocket?: SlackWebSocket;
```

Defined in: [packages/socket-mode/src/SocketModeClient.ts:78](https://github.com/slackapi/node-slack-sdk/blob/main/packages/socket-mode/src/SocketModeClient.ts#L78)

***

### prefixed

```ts
static prefixed: string | boolean;
```

Defined in: node\_modules/eventemitter3/index.d.ts:9

#### Inherited from

`EventEmitter.prefixed`

## Methods

### addListener()

```ts
addListener<T>(
   event, 
   fn, 
   context?
): this;
```

Defined in: node\_modules/eventemitter3/index.d.ts:45

#### Type Parameters

##### T

`T` *extends* `string` \| `symbol`

#### Parameters

##### event

`T`

##### fn

(...`args`) => `void`

##### context?

`any`

#### Returns

`this`

#### Inherited from

`EventEmitter.addListener`

***

### disconnect()

```ts
disconnect(): Promise<void>;
```

Defined in: [packages/socket-mode/src/SocketModeClient.ts:249](https://github.com/slackapi/node-slack-sdk/blob/main/packages/socket-mode/src/SocketModeClient.ts#L249)

End a Socket Mode session. After this method is called no messages will be sent or received
unless you call start() again later.

#### Returns

`Promise`\<`void`\>

***

### emit()

```ts
emit<T>(event, ...args): boolean;
```

Defined in: node\_modules/eventemitter3/index.d.ts:32

Calls each of the listeners registered for a given event.

#### Type Parameters

##### T

`T` *extends* `string` \| `symbol`

#### Parameters

##### event

`T`

##### args

...`any`[]

#### Returns

`boolean`

#### Inherited from

`EventEmitter.emit`

***

### eventNames()

```ts
eventNames(): (string | symbol)[];
```

Defined in: node\_modules/eventemitter3/index.d.ts:15

Return an array listing the events for which the emitter has registered
listeners.

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

`EventEmitter.eventNames`

***

### listenerCount()

```ts
listenerCount(event): number;
```

Defined in: node\_modules/eventemitter3/index.d.ts:27

Return the number of listeners listening to a given event.

#### Parameters

##### event

`string` \| `symbol`

#### Returns

`number`

#### Inherited from

`EventEmitter.listenerCount`

***

### listeners()

```ts
listeners<T>(event): ((...args) => void)[];
```

Defined in: node\_modules/eventemitter3/index.d.ts:20

Return the listeners registered for a given event.

#### Type Parameters

##### T

`T` *extends* `string` \| `symbol`

#### Parameters

##### event

`T`

#### Returns

((...`args`) => `void`)[]

#### Inherited from

`EventEmitter.listeners`

***

### off()

```ts
off<T>(
   event, 
   fn?, 
   context?, 
   once?
): this;
```

Defined in: node\_modules/eventemitter3/index.d.ts:69

#### Type Parameters

##### T

`T` *extends* `string` \| `symbol`

#### Parameters

##### event

`T`

##### fn?

(...`args`) => `void`

##### context?

`any`

##### once?

`boolean`

#### Returns

`this`

#### Inherited from

`EventEmitter.off`

***

### on()

```ts
on<T>(
   event, 
   fn, 
   context?
): this;
```

Defined in: node\_modules/eventemitter3/index.d.ts:40

Add a listener for a given event.

#### Type Parameters

##### T

`T` *extends* `string` \| `symbol`

#### Parameters

##### event

`T`

##### fn

(...`args`) => `void`

##### context?

`any`

#### Returns

`this`

#### Inherited from

`EventEmitter.on`

***

### once()

```ts
once<T>(
   event, 
   fn, 
   context?
): this;
```

Defined in: node\_modules/eventemitter3/index.d.ts:54

Add a one-time listener for a given event.

#### Type Parameters

##### T

`T` *extends* `string` \| `symbol`

#### Parameters

##### event

`T`

##### fn

(...`args`) => `void`

##### context?

`any`

#### Returns

`this`

#### Inherited from

`EventEmitter.once`

***

### removeAllListeners()

```ts
removeAllListeners(event?): this;
```

Defined in: node\_modules/eventemitter3/index.d.ts:79

Remove all listeners, or those of the specified event.

#### Parameters

##### event?

`string` \| `symbol`

#### Returns

`this`

#### Inherited from

`EventEmitter.removeAllListeners`

***

### removeListener()

```ts
removeListener<T>(
   event, 
   fn?, 
   context?, 
   once?
): this;
```

Defined in: node\_modules/eventemitter3/index.d.ts:63

Remove the listeners of a given event.

#### Type Parameters

##### T

`T` *extends* `string` \| `symbol`

#### Parameters

##### event

`T`

##### fn?

(...`args`) => `void`

##### context?

`any`

##### once?

`boolean`

#### Returns

`this`

#### Inherited from

`EventEmitter.removeListener`

***

### start()

```ts
start(): Promise<AppsConnectionsOpenResponse>;
```

Defined in: [packages/socket-mode/src/SocketModeClient.ts:196](https://github.com/slackapi/node-slack-sdk/blob/main/packages/socket-mode/src/SocketModeClient.ts#L196)

Start a Socket Mode session app.
This method must be called before any messages can be sent or received,
or to disconnect the client via the `disconnect` method.

#### Returns

`Promise`\<`AppsConnectionsOpenResponse`\>
