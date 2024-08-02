---
title: "@slack/rtm-api"
---
## Classes

### RTMClient

An RTMClient allows programs to communicate with the [Slack Platform's RTM API](https://api.slack.com/rtm). This object uses the EventEmitter pattern to dispatch incoming events and has several methods for sending outgoing messages.

##### new RTMClient(token, opts)

Constructs a new instance of the `RTMClient` class

**Parameters:**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| token | `string` | ✓   |
| opts | `[RTMClientOptions](#rtmclientoptions)` | ✗   |
| webClient | `[WebClient](web-api#webclient)` | ✗   | An optional parameter to provide a customized [WebClient](web-api#webclient). Any desired options for the custom client must be set in this parameter (`webClient`) as they will take precedence over other arguments passed into `RTMClient`. |

**Options:**

| Name | Type |
| --- | --- |
| agent | `Agent` |
| autoReconnect | `boolean` |
| clientPingTimeout | `number` |
| logger | `Logger` |
| logLevel | `LogLevel` |
| replyAckOnReconnectTimeout | `number` |
| retryConfig | `RetryOptions` |
| serverPongTimeout | `number` |
| slackApiUrl | `string` |
| tls | `TLSOptions` |
| useRtmConnect | `boolean` |

#### Fields

| Name | Type | Description |
| --- | --- |
| activeTeamId | `string` | The team ID for the workspace the client is connected to. |
| activeUserId | `string` | The user ID for the connected client. |
| authenticated | `boolean` | Whether or not the client has authenticated to the RTM API. This occurs when the connect method completes, and a WebSocket URL is available for the client's connection. |
| connected | `boolean` | Whether or not the client is currently connected to the RTM API |

#### Methods

##### addOutgoingEvent(awaitReply, type, body)

Generic method for sending an outgoing message of an arbitrary type. This method guards the higher-level methods from concern of which state the client is in, because it places all messages into a queue. The tasks on the queue will buffer until the client is in a state where they can be sent.

If the awaitReply parameter is set to true, then the returned Promise is resolved with the platform's acknowledgement response. Not all message types will result in an acknowledgement response, so use this carefully. This promise may be rejected with an error containing code=RTMNoReplyReceivedError if the client disconnects or reconnects before receiving the acknowledgement response.

If the awaitReply parameter is set to false, then the returned Promise is resolved as soon as the message is sent from the websocket.

**Parameters:**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| awaitReply | `true` | ✓   | whether to wait for an acknowledgement response from the platform before resolving the returned Promise. |
| type | `string` | ✓   | the message type |
| body | `object` | ✗   | the message body |

**Returns** `Promise<[RTMCallResult](#rtmcallresult)>`

##### addOutgoingEvent(awaitReply, type, body)

**Parameters:**

| Name | Type | Required |
| --- | --- | --- |
| awaitReply | `false` | ✓   |
| type | `string` | ✓   |
| body | `object` | ✗   |

**Returns** `Promise<void>`

##### disconnect()

End an RTM session. After this method is called no messages will be sent or received unless you call start() again later.

**Returns** `Promise<void>`

##### send(type, body)

Generic method for sending an outgoing message of an arbitrary type. The main difference between this method and addOutgoingEvent() is that this method does not use a queue so it can only be used while the client is ready to send messages (in the 'ready' substate of the 'connected' state). It returns a Promise for the message ID of the sent message. This is an internal ID and generally shouldn't be used as an identifier for messages (for that, there is `ts` on messages once the server acknowledges it).

**Parameters:**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| type | `string` | ✓   | the message type |
| body | `object` | ✗   | the message body |

**Returns** `Promise<number>`

##### sendMessage(text, conversationId)

Send a simple message to a public channel, private channel, DM, or MPDM.

**Parameters:**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| text | `string` | ✓   | The message text. |
| conversationId | `string` | ✓   | A conversation ID for the destination of this message. |

**Returns** `Promise<[RTMCallResult](#rtmcallresult)>`

##### sendTyping(conversationId)

Sends a typing indicator to indicate that the user with `activeUserId` is typing.

**Parameters:**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| conversationId | `string` | ✓   | The destination for where the typing indicator should be shown. |

**Returns** `Promise<void>`

##### start(options)

Begin an RTM session using the provided options. This method must be called before any messages can be sent or received.

**Parameters:**

| Name | Type | Required |
| --- | --- | --- |
| options | `[RTMStartOptions](#rtmstartoptions)` | ✗   |

**Returns** `Promise<WebAPICallResult>`

##### subscribePresence(userIds)

Subscribes this client to presence changes for only the given `userIds`.

**Parameters:**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| userIds | `string[]` | ✓   | An array of user IDs whose presence you are interested in. This list will replace the list from any previous calls to this method. |

**Returns** `Promise<void>`

## Enums

### ErrorCode

A dictionary of codes for errors produced by this package

#### Members

*   **KeepAliveClientNotConnected**
*   **KeepAliveConfigError**
*   **KeepAliveInconsistentState**
*   **NoReplyReceivedError**
*   **SendMessagePlatformError**
*   **SendWhileDisconnectedError**
*   **SendWhileNotReadyError**
*   **WebsocketError**

## Interfaces

### CodedError

All errors produced by this package adhere to this interface

#### Fields

| Name | Type |
| --- | --- | 
| code | `[ErrorCode](#errorcode)` |

### RTMCallResult

#### Fields

| Name | Type |
| --- | --- |
| error | `object` |
| reply\_to | `number` |
| ts  | `string` |

### RTMClientOptions

#### Fields

| Name | Type |
| --- | --- | 
| agent | `Agent` |
| autoReconnect | `boolean` |
| clientPingTimeout | `number` |
| logger | `Logger` |
| logLevel | `LogLevel` |
| replyAckOnReconnectTimeout | `number` |
| retryConfig | `RetryOptions` |
| serverPongTimeout | `number` |
| slackApiUrl | `string` |
| tls | `TLSOptions` |
| useRtmConnect | `boolean` |

### RTMNoReplyReceivedError

#### Fields

| Name | Type |
| --- | --- |
| code | `ErrorCode.NoReplyReceivedError` |

### RTMPlatformError

#### Fields

| Name | Type |
| --- | --- | 
| code | `ErrorCode.SendMessagePlatformError` |
| data | `[RTMCallResult](#rtmcallresult)` |

### RTMSendWhileDisconnectedError

#### Fields

| Name | Type |
| --- | --- | 
| code | `ErrorCode.SendWhileDisconnectedError` |

### RTMSendWhileNotReadyError

#### Fields

| Name | Type |
| --- | --- |
| code | `ErrorCode.SendWhileNotReadyError` |

### RTMWebsocketError

#### Fields

| Name | Type |
| --- | --- |
| code | `ErrorCode.WebsocketError` |
| original | `Error` |

## Type Aliases

### RTMCallError

```ts
RTMWebsocketError | RTMNoReplyReceivedError | RTMSendWhileDisconnectedError | RTMSendWhileNotReadyError
```

One of:

*   [`RTMWebsocketError`](#rtmwebsocketerror)
*   [`RTMNoReplyReceivedError`](#rtmnoreplyreceivederror)
*   [`RTMSendWhileDisconnectedError`](#rtmsendwhiledisconnectederror)
*   [`RTMSendWhileNotReadyError`](#rtmsendwhilenotreadyerror)

### RTMStartOptions

```ts
RTMStartArguments
```

One of:

*   `RTMStartArguments`