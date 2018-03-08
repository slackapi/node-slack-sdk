---
layout: page
title: RTMClient
permalink: /reference/RTMClient
---
An RTMClient allows programs to communicate with the [Slack Platform's RTM API](https://api.slack.com/rtm).
This object uses the EventEmitter pattern to dispatch incoming events and has several methods for sending outgoing
messages.

**Kind**: static class of [<code>@slack/client</code>](#module_@slack/client)  
**Extends**: <code>EventEmitter</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [connected] | <code>boolean</code> | <code>false</code> | Whether or not the client is currently connected to the RTM API |
| [authenticated] | <code>boolean</code> | <code>false</code> | Whether or not the client has authenticated to the RTM API. This occurs when the connect method completes, and a WebSocket URL is available for the client's connection. |
| [activeUserId] | <code>string</code> |  | The user ID for the connected client. |
| [activeTeamId] | <code>string</code> |  | The team ID for the workspace the client is connected to. |


* [.RTMClient](#module_@slack/client.RTMClient) ⇐ <code>EventEmitter</code>
    * [.addOutgoingEvent(awaitReply, type, body)](#module_@slack/client.RTMClient+addOutgoingEvent) ⇒ <code>Promise.&lt;(void\|module:@slack/client.RTMCallResult)&gt;</code>
    * [.addOutgoingEvent(awaitReply, type, body)](#module_@slack/client.RTMClient+addOutgoingEvent) ⇒ [<code>Promise.&lt;RTMCallResult&gt;</code>](#module_@slack/client.RTMCallResult)
    * [.addOutgoingEvent(awaitReply, type, body)](#module_@slack/client.RTMClient+addOutgoingEvent) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.disconnect()](#module_@slack/client.RTMClient+disconnect)
    * [.send(type, body)](#module_@slack/client.RTMClient+send) ⇒ <code>Promise.&lt;number&gt;</code>
    * [.sendMessage(text, conversationId)](#module_@slack/client.RTMClient+sendMessage) ⇒ [<code>Promise.&lt;RTMCallResult&gt;</code>](#module_@slack/client.RTMCallResult)
    * [.sendMessage(text, conversationId, callback)](#module_@slack/client.RTMClient+sendMessage)
    * [.sendMessage(text, conversationId, callback)](#module_@slack/client.RTMClient+sendMessage)
    * [.sendTyping(conversationId)](#module_@slack/client.RTMClient+sendTyping) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.start(options)](#module_@slack/client.RTMClient+start)
    * [.subscribePresence(userIds)](#module_@slack/client.RTMClient+subscribePresence) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="module_@slack/client.RTMClient+addOutgoingEvent"></a>

### rtmClient.addOutgoingEvent(awaitReply, type, body) ⇒ <code>Promise.&lt;(void\|module:@slack/client.RTMCallResult)&gt;</code>
**Kind**: instance method of [<code>RTMClient</code>](#module_@slack/client.RTMClient)  

| Param | Type |
| --- | --- |
| awaitReply | <code>boolean</code> | 
| type | <code>string</code> | 
| body | <code>Object.&lt;string, any&gt;</code> | 

<a name="module_@slack/client.RTMClient+addOutgoingEvent"></a>

### rtmClient.addOutgoingEvent(awaitReply, type, body) ⇒ [<code>Promise.&lt;RTMCallResult&gt;</code>](#module_@slack/client.RTMCallResult)
Generic method for sending an outgoing message of an arbitrary type. This method guards the higher-level methods
from concern of which state the client is in, because it places all messages into a queue. The tasks on the queue
will buffer until the client is in a state where they can be sent.

If the awaitReply parameter is set to true, then the returned Promise is resolved with the platform's
acknowledgement response. Not all message types will result in an acknowledgement response, so use this carefully.
This promise may be rejected with an error containing code=RTMNoReplyReceivedError if the client disconnects or
reconnects before recieving the acknowledgement response.

If the awaitReply parameter is set to false, then the returned Promise is resolved as soon as the message is sent
from the websocket.

**Kind**: instance method of [<code>RTMClient</code>](#module_@slack/client.RTMClient)  

| Param | Type | Description |
| --- | --- | --- |
| awaitReply | <code>&quot;undefined&quot;</code> | whether to wait for an acknowledgement response from the platform before resolving the returned Promise. |
| type | <code>string</code> | the message type |
| body | <code>Object.&lt;string, any&gt;</code> | the message body |

<a name="module_@slack/client.RTMClient+addOutgoingEvent"></a>

### rtmClient.addOutgoingEvent(awaitReply, type, body) ⇒ <code>Promise.&lt;void&gt;</code>
**Kind**: instance method of [<code>RTMClient</code>](#module_@slack/client.RTMClient)  

| Param | Type |
| --- | --- |
| awaitReply | <code>&quot;undefined&quot;</code> | 
| type | <code>string</code> | 
| body | <code>Object.&lt;string, any&gt;</code> | 

<a name="module_@slack/client.RTMClient+disconnect"></a>

### rtmClient.disconnect()
End an RTM session. After this method is called no messages will be sent or received unless you call
start() again later.

**Kind**: instance method of [<code>RTMClient</code>](#module_@slack/client.RTMClient)  
<a name="module_@slack/client.RTMClient+send"></a>

### rtmClient.send(type, body) ⇒ <code>Promise.&lt;number&gt;</code>
Generic method for sending an outgoing message of an arbitrary type. The main difference between this method and
addOutgoingEvent() is that this method does not use a queue so it can only be used while the client is ready
to send messages (in the 'ready' substate of the 'connected' state). It returns a Promise for the message ID of the
sent message. This is an internal ID and generally shouldn't be used as an identifier for messages (for that,
there is `ts` on messages once the server acknowledges it).

**Kind**: instance method of [<code>RTMClient</code>](#module_@slack/client.RTMClient)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | the message type |
| body |  | the message body |

<a name="module_@slack/client.RTMClient+sendMessage"></a>

### rtmClient.sendMessage(text, conversationId) ⇒ [<code>Promise.&lt;RTMCallResult&gt;</code>](#module_@slack/client.RTMCallResult)
Send a simple message to a public channel, private channel, DM, or MPDM.

**Kind**: instance method of [<code>RTMClient</code>](#module_@slack/client.RTMClient)  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The message text. |
| conversationId | <code>string</code> | A conversation ID for the destination of this message. |

<a name="module_@slack/client.RTMClient+sendMessage"></a>

### rtmClient.sendMessage(text, conversationId, callback)
**Kind**: instance method of [<code>RTMClient</code>](#module_@slack/client.RTMClient)  

| Param | Type |
| --- | --- |
| text | <code>string</code> | 
| conversationId | <code>string</code> | 
| callback | [<code>RTMCallResultCallback</code>](#module_@slack/client.RTMCallResultCallback) | 

<a name="module_@slack/client.RTMClient+sendMessage"></a>

### rtmClient.sendMessage(text, conversationId, callback)
**Kind**: instance method of [<code>RTMClient</code>](#module_@slack/client.RTMClient)  

| Param | Type |
| --- | --- |
| text | <code>string</code> | 
| conversationId | <code>string</code> | 
| callback | [<code>RTMCallResultCallback</code>](#module_@slack/client.RTMCallResultCallback) | 

<a name="module_@slack/client.RTMClient+sendTyping"></a>

### rtmClient.sendTyping(conversationId) ⇒ <code>Promise.&lt;void&gt;</code>
Sends a typing indicator to indicate that the user with `activeUserId` is typing.

**Kind**: instance method of [<code>RTMClient</code>](#module_@slack/client.RTMClient)  

| Param | Type | Description |
| --- | --- | --- |
| conversationId | <code>string</code> | The destination for where the typing indicator should be shown. |

<a name="module_@slack/client.RTMClient+start"></a>

### rtmClient.start(options)
Begin an RTM session using the provided options. This method must be called before any messages can
be sent or received.

**Kind**: instance method of [<code>RTMClient</code>](#module_@slack/client.RTMClient)  

| Param | Type |
| --- | --- |
| options | <code>module:@slack/client/dist/methods.TokenOverridable</code> \| <code>module:@slack/client/dist/methods.TokenOverridable</code> | 

<a name="module_@slack/client.RTMClient+subscribePresence"></a>

### rtmClient.subscribePresence(userIds) ⇒ <code>Promise.&lt;void&gt;</code>
Subscribes this client to presence changes for only the given `userIds`.

**Kind**: instance method of [<code>RTMClient</code>](#module_@slack/client.RTMClient)  

| Param | Type | Description |
| --- | --- | --- |
| userIds | <code>Array.&lt;string&gt;</code> | An array of user IDs whose presence you are interested in. This list will replace the list from any previous calls to this method. |

