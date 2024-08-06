# Class: RTMClient

An RTMClient allows programs to communicate with the [Platform's RTM API](https://api.slack.com/rtm|Slack).
This object uses the EventEmitter pattern to dispatch incoming events and has several methods for sending outgoing
messages.

## Extends

- [`Logger`](../variables/Logger.md)

## Constructors

### new RTMClient()

```ts
new RTMClient(token, __namedParameters): RTMClient
```

#### Parameters

• **token**: `string`

• **\_\_namedParameters**: [`RTMClientOptions`](../interfaces/RTMClientOptions.md) = `{}`

#### Returns

[`RTMClient`](RTMClient.md)

#### Overrides

`EventEmitter.constructor`

#### Defined in

[RTMClient.ts:340](https://github.com/slackapi/node-slack-sdk/blob/main/packages/rtm-api/src/RTMClient.ts#L340)

## Properties

### activeTeamId?

```ts
optional activeTeamId: string;
```

The team ID for the workspace the client is connected to.

#### Defined in

[RTMClient.ts:83](https://github.com/slackapi/node-slack-sdk/blob/main/packages/rtm-api/src/RTMClient.ts#L83)

***

### activeUserId?

```ts
optional activeUserId: string;
```

The user ID for the connected client.

#### Defined in

[RTMClient.ts:78](https://github.com/slackapi/node-slack-sdk/blob/main/packages/rtm-api/src/RTMClient.ts#L78)

***

### authenticated

```ts
authenticated: boolean = false;
```

Whether or not the client has authenticated to the RTM API. This occurs when the connect method
completes, and a WebSocket URL is available for the client's connection.

#### Defined in

[RTMClient.ts:73](https://github.com/slackapi/node-slack-sdk/blob/main/packages/rtm-api/src/RTMClient.ts#L73)

***

### connected

```ts
connected: boolean = false;
```

Whether or not the client is currently connected to the RTM API

#### Defined in

[RTMClient.ts:67](https://github.com/slackapi/node-slack-sdk/blob/main/packages/rtm-api/src/RTMClient.ts#L67)

## Methods

### addOutgoingEvent()

#### addOutgoingEvent(awaitReply, type, body)

```ts
addOutgoingEvent(
   awaitReply, 
   type, 
body?): Promise<RTMCallResult>
```

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

• **awaitReply**: `true`

whether to wait for an acknowledgement response from the platform before resolving the returned
Promise.

• **type**: `string`

the message type

• **body?**: `Record`\<`string`, `unknown`\>

the message body

##### Returns

`Promise`\<[`RTMCallResult`](../interfaces/RTMCallResult.md)\>

##### Defined in

[RTMClient.ts:493](https://github.com/slackapi/node-slack-sdk/blob/main/packages/rtm-api/src/RTMClient.ts#L493)

#### addOutgoingEvent(awaitReply, type, body)

```ts
addOutgoingEvent(
   awaitReply, 
   type, 
body?): Promise<void>
```

##### Parameters

• **awaitReply**: `false`

• **type**: `string`

• **body?**: `Record`\<`string`, `unknown`\>

##### Returns

`Promise`\<`void`\>

##### Defined in

[RTMClient.ts:494](https://github.com/slackapi/node-slack-sdk/blob/main/packages/rtm-api/src/RTMClient.ts#L494)

***

### disconnect()

```ts
disconnect(): Promise<void>
```

End an RTM session. After this method is called no messages will be sent or received unless you call
start() again later.

#### Returns

`Promise`\<`void`\>

#### Defined in

[RTMClient.ts:432](https://github.com/slackapi/node-slack-sdk/blob/main/packages/rtm-api/src/RTMClient.ts#L432)

***

### send()

```ts
send(type, body): Promise<number>
```

Generic method for sending an outgoing message of an arbitrary type. The main difference between this method and
addOutgoingEvent() is that this method does not use a queue so it can only be used while the client is ready
to send messages (in the 'ready' substate of the 'connected' state). It returns a Promise for the message ID of the
sent message. This is an internal ID and generally shouldn't be used as an identifier for messages (for that,
there is `ts` on messages once the server acknowledges it).

#### Parameters

• **type**: `string`

the message type

• **body** = `{}`

the message body

#### Returns

`Promise`\<`number`\>

#### Defined in

[RTMClient.ts:541](https://github.com/slackapi/node-slack-sdk/blob/main/packages/rtm-api/src/RTMClient.ts#L541)

***

### sendMessage()

```ts
sendMessage(text, conversationId): Promise<RTMCallResult>
```

Send a simple message to a public channel, private channel, DM, or MPDM.

#### Parameters

• **text**: `string`

The message text.

• **conversationId**: `string`

A conversation ID for the destination of this message.

#### Returns

`Promise`\<[`RTMCallResult`](../interfaces/RTMCallResult.md)\>

#### Defined in

[RTMClient.ts:455](https://github.com/slackapi/node-slack-sdk/blob/main/packages/rtm-api/src/RTMClient.ts#L455)

***

### sendTyping()

```ts
sendTyping(conversationId): Promise<void>
```

Sends a typing indicator to indicate that the user with `activeUserId` is typing.

#### Parameters

• **conversationId**: `string`

The destination for where the typing indicator should be shown.

#### Returns

`Promise`\<`void`\>

#### Defined in

[RTMClient.ts:463](https://github.com/slackapi/node-slack-sdk/blob/main/packages/rtm-api/src/RTMClient.ts#L463)

***

### start()

```ts
start(options?): Promise<WebAPICallResult>
```

Begin an RTM session using the provided options. This method must be called before any messages can
be sent or received.

#### Parameters

• **options?**: `any`

#### Returns

`Promise`\<`WebAPICallResult`\>

#### Defined in

[RTMClient.ts:406](https://github.com/slackapi/node-slack-sdk/blob/main/packages/rtm-api/src/RTMClient.ts#L406)

***

### subscribePresence()

```ts
subscribePresence(userIds): Promise<void>
```

Subscribes this client to presence changes for only the given `userIds`.

#### Parameters

• **userIds**: `string`[]

An array of user IDs whose presence you are interested in. This list will replace the list from
any previous calls to this method.

#### Returns

`Promise`\<`void`\>

#### Defined in

[RTMClient.ts:472](https://github.com/slackapi/node-slack-sdk/blob/main/packages/rtm-api/src/RTMClient.ts#L472)
