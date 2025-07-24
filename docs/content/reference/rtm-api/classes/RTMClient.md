[@slack/rtm-api](../index.md) / RTMClient

# Class: RTMClient

Defined in: [src/RTMClient.ts:63](https://github.com/slackapi/node-slack-sdk/blob/main/packages/rtm-api/src/RTMClient.ts#L63)

An RTMClient allows programs to communicate with the [Platform's RTM API](https://docs.slack.dev/legacy/legacy-rtm-api|Slack).
This object uses the EventEmitter pattern to dispatch incoming events and has several methods for sending outgoing
messages.

## Extends

- `EventEmitter`

## Constructors

### Constructor

```ts
new RTMClient(token, __namedParameters): RTMClient;
```

Defined in: [src/RTMClient.ts:367](https://github.com/slackapi/node-slack-sdk/blob/main/packages/rtm-api/src/RTMClient.ts#L367)

#### Parameters

##### token

`string`

##### \_\_namedParameters

[`RTMClientOptions`](../interfaces/RTMClientOptions.md) = `{}`

#### Returns

`RTMClient`

#### Overrides

```ts
EventEmitter.constructor
```

## Properties

### activeTeamId?

```ts
optional activeTeamId: string;
```

Defined in: [src/RTMClient.ts:83](https://github.com/slackapi/node-slack-sdk/blob/main/packages/rtm-api/src/RTMClient.ts#L83)

The team ID for the workspace the client is connected to.

***

### activeUserId?

```ts
optional activeUserId: string;
```

Defined in: [src/RTMClient.ts:78](https://github.com/slackapi/node-slack-sdk/blob/main/packages/rtm-api/src/RTMClient.ts#L78)

The user ID for the connected client.

***

### authenticated

```ts
authenticated: boolean = false;
```

Defined in: [src/RTMClient.ts:73](https://github.com/slackapi/node-slack-sdk/blob/main/packages/rtm-api/src/RTMClient.ts#L73)

Whether or not the client has authenticated to the RTM API. This occurs when the connect method
completes, and a WebSocket URL is available for the client's connection.

***

### connected

```ts
connected: boolean = false;
```

Defined in: [src/RTMClient.ts:67](https://github.com/slackapi/node-slack-sdk/blob/main/packages/rtm-api/src/RTMClient.ts#L67)

Whether or not the client is currently connected to the RTM API

***

### prefixed

```ts
static prefixed: string | boolean;
```

Defined in: node\_modules/eventemitter3/index.d.ts:9

#### Inherited from

```ts
EventEmitter.prefixed
```

## Methods

### addListener()

```ts
addListener<T>(
   event, 
   fn, 
   context?): this;
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

```ts
EventEmitter.addListener
```

***

### addOutgoingEvent()

#### Call Signature

```ts
addOutgoingEvent(
   awaitReply, 
   type, 
body?): Promise<RTMCallResult>;
```

Defined in: [src/RTMClient.ts:525](https://github.com/slackapi/node-slack-sdk/blob/main/packages/rtm-api/src/RTMClient.ts#L525)

Generic method for sending an outgoing message of an arbitrary type. This method guards the higher-level methods
from concern of which state the client is in, because it places all messages into a queue. The tasks on the queue
will buffer until the client is in a state where they can be sent.

If the awaitReply parameter is set to true, then the returned Promise is resolved with the platform's
acknowledgement response. Not all message types will result in an acknowledgement response, so use this carefully.
This promise may be rejected with an error containing code=RTMNoReplyReceivedError if the client disconnects or
reconnects before receiving the acknowledgement response.

If the awaitReply parameter is set to false, then the returned Promise is resolved as soon as the message is sent
from the websocket.

##### Parameters

###### awaitReply

`true`

whether to wait for an acknowledgement response from the platform before resolving the returned
Promise.

###### type

`string`

the message type

###### body?

`Record`\<`string`, `unknown`\>

the message body

##### Returns

`Promise`\<[`RTMCallResult`](../interfaces/RTMCallResult.md)\>

#### Call Signature

```ts
addOutgoingEvent(
   awaitReply, 
   type, 
body?): Promise<undefined>;
```

Defined in: [src/RTMClient.ts:526](https://github.com/slackapi/node-slack-sdk/blob/main/packages/rtm-api/src/RTMClient.ts#L526)

Generic method for sending an outgoing message of an arbitrary type. This method guards the higher-level methods
from concern of which state the client is in, because it places all messages into a queue. The tasks on the queue
will buffer until the client is in a state where they can be sent.

If the awaitReply parameter is set to true, then the returned Promise is resolved with the platform's
acknowledgement response. Not all message types will result in an acknowledgement response, so use this carefully.
This promise may be rejected with an error containing code=RTMNoReplyReceivedError if the client disconnects or
reconnects before receiving the acknowledgement response.

If the awaitReply parameter is set to false, then the returned Promise is resolved as soon as the message is sent
from the websocket.

##### Parameters

###### awaitReply

`false`

whether to wait for an acknowledgement response from the platform before resolving the returned
Promise.

###### type

`string`

the message type

###### body?

`Record`\<`string`, `unknown`\>

the message body

##### Returns

`Promise`\<`undefined`\>

***

### disconnect()

```ts
disconnect(): Promise<void>;
```

Defined in: [src/RTMClient.ts:464](https://github.com/slackapi/node-slack-sdk/blob/main/packages/rtm-api/src/RTMClient.ts#L464)

End an RTM session. After this method is called no messages will be sent or received unless you call
start() again later.

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

```ts
EventEmitter.emit
```

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

```ts
EventEmitter.eventNames
```

***

### listenerCount()

```ts
listenerCount(event): number;
```

Defined in: node\_modules/eventemitter3/index.d.ts:27

Return the number of listeners listening to a given event.

#### Parameters

##### event

`string` | `symbol`

#### Returns

`number`

#### Inherited from

```ts
EventEmitter.listenerCount
```

***

### listeners()

```ts
listeners<T>(event): (...args) => void[];
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

(...`args`) => `void`[]

#### Inherited from

```ts
EventEmitter.listeners
```

***

### off()

```ts
off<T>(
   event, 
   fn?, 
   context?, 
   once?): this;
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

```ts
EventEmitter.off
```

***

### on()

```ts
on<T>(
   event, 
   fn, 
   context?): this;
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

```ts
EventEmitter.on
```

***

### once()

```ts
once<T>(
   event, 
   fn, 
   context?): this;
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

```ts
EventEmitter.once
```

***

### removeAllListeners()

```ts
removeAllListeners(event?): this;
```

Defined in: node\_modules/eventemitter3/index.d.ts:79

Remove all listeners, or those of the specified event.

#### Parameters

##### event?

`string` | `symbol`

#### Returns

`this`

#### Inherited from

```ts
EventEmitter.removeAllListeners
```

***

### removeListener()

```ts
removeListener<T>(
   event, 
   fn?, 
   context?, 
   once?): this;
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

```ts
EventEmitter.removeListener
```

***

### send()

```ts
send(type, body): Promise<number>;
```

Defined in: [src/RTMClient.ts:578](https://github.com/slackapi/node-slack-sdk/blob/main/packages/rtm-api/src/RTMClient.ts#L578)

Generic method for sending an outgoing message of an arbitrary type. The main difference between this method and
addOutgoingEvent() is that this method does not use a queue so it can only be used while the client is ready
to send messages (in the 'ready' substate of the 'connected' state). It returns a Promise for the message ID of the
sent message. This is an internal ID and generally shouldn't be used as an identifier for messages (for that,
there is `ts` on messages once the server acknowledges it).

#### Parameters

##### type

`string`

the message type

##### body

the message body

#### Returns

`Promise`\<`number`\>

***

### sendMessage()

```ts
sendMessage(text, conversationId): Promise<RTMCallResult>;
```

Defined in: [src/RTMClient.ts:487](https://github.com/slackapi/node-slack-sdk/blob/main/packages/rtm-api/src/RTMClient.ts#L487)

Send a simple message to a public channel, private channel, DM, or MPDM.

#### Parameters

##### text

`string`

The message text.

##### conversationId

`string`

A conversation ID for the destination of this message.

#### Returns

`Promise`\<[`RTMCallResult`](../interfaces/RTMCallResult.md)\>

***

### sendTyping()

```ts
sendTyping(conversationId): Promise<void>;
```

Defined in: [src/RTMClient.ts:495](https://github.com/slackapi/node-slack-sdk/blob/main/packages/rtm-api/src/RTMClient.ts#L495)

Sends a typing indicator to indicate that the user with `activeUserId` is typing.

#### Parameters

##### conversationId

`string`

The destination for where the typing indicator should be shown.

#### Returns

`Promise`\<`void`\>

***

### start()

```ts
start(options?): Promise<WebAPICallResult>;
```

Defined in: [src/RTMClient.ts:438](https://github.com/slackapi/node-slack-sdk/blob/main/packages/rtm-api/src/RTMClient.ts#L438)

Begin an RTM session using the provided options. This method must be called before any messages can
be sent or received.

#### Parameters

##### options?

[`RTMStartOptions`](../type-aliases/RTMStartOptions.md)

#### Returns

`Promise`\<`WebAPICallResult`\>

***

### subscribePresence()

```ts
subscribePresence(userIds): Promise<void>;
```

Defined in: [src/RTMClient.ts:504](https://github.com/slackapi/node-slack-sdk/blob/main/packages/rtm-api/src/RTMClient.ts#L504)

Subscribes this client to presence changes for only the given `userIds`.

#### Parameters

##### userIds

`string`[]

An array of user IDs whose presence you are interested in. This list will replace the list from
any previous calls to this method.

#### Returns

`Promise`\<`void`\>
