---
layout: page
title: RTMClient
permalink: /reference/RTMClient
---
**Kind**: global class  

* [RTMClient](#RTMClient)
    * [new RTMClient(token, [opts])](#new_RTMClient_new)
    * [._socketFn](#RTMClient+_socketFn) : <code>function</code>
    * [.ws](#RTMClient+ws) : <code>Object</code>
    * [.connected](#RTMClient+connected) : <code>boolean</code>
    * [.authenticated](#RTMClient+authenticated) : <code>boolean</code>
    * [.activeUserId](#RTMClient+activeUserId) : <code>string</code>
    * [.activeTeamId](#RTMClient+activeTeamId) : <code>string</code>
    * [.dataStore](#RTMClient+dataStore) : <code>[SlackDataStore](#SlackDataStore)</code>
    * [._pingTimer](#RTMClient+_pingTimer) : <code>?</code>
    * [._createFacets()](#RTMClient+_createFacets)
    * [.start([opts])](#RTMClient+start)
    * ~~[.login()](#RTMClient+login)~~
    * [.nextMessageId()](#RTMClient+nextMessageId)
    * [.connect(socketUrl)](#RTMClient+connect)
    * [.disconnect(optReason, optCode)](#RTMClient+disconnect)
    * [.reconnect()](#RTMClient+reconnect)
    * [.handleWsOpen()](#RTMClient+handleWsOpen)
    * [.handleWsMessage(wsMsg)](#RTMClient+handleWsMessage)
    * [._handleMessageAck(replyTo, message)](#RTMClient+_handleMessageAck)
    * [.handleWsError(err)](#RTMClient+handleWsError)
    * [.handleWsClose(code, reason)](#RTMClient+handleWsClose)
    * [._handlePong(message)](#RTMClient+_handlePong)
    * [._maybeKeepAlive(message)](#RTMClient+_maybeKeepAlive)
    * [._handleHello()](#RTMClient+_handleHello)
    * [.sendMessage(text, channelId, [optCb])](#RTMClient+sendMessage)
    * [.updateMessage(message, [optCb])](#RTMClient+updateMessage)
    * [.sendTyping(channelId)](#RTMClient+sendTyping)
    * [.subscribePresence(userIds)](#RTMClient+subscribePresence)
    * [.send(message, [optCb])](#RTMClient+send)

<a name="new_RTMClient_new"></a>

### new RTMClient(token, [opts])
Creates a new instance of RTM client.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| token | <code>string</code> |  | The token to use for connecting |
| [opts] | <code>Object</code> |  |  |
| [opts.socketFn] | <code>RTMClient~socketFn</code> |  | A function to call, passing in a websocket URL, that should return a websocket instance connected to that URL |
| [opts.dataStore] | <code>[SlackDataStore](#SlackDataStore)</code> &#124; <code>null</code> &#124; <code>false</code> |  | A store to cache Slack info. Recommended value is `false`. Default value is an instance of [SlackMemoryDataStore](#SlackMemoryDataStore). |
| [opts.autoReconnect] | <code>boolean</code> | <code>true</code> | Whether or not to automatically reconnect when the connection closes |
| [opts.useRtmConnect] | <code>boolean</code> | <code>false</code> | Whether to use rtm.connect rather than rtm.start. Recommended value is `true`. |
| [opts.retryConfig] | <code>Object</code> |  | The retry policy to use, defaults to forever with exponential backoff, see [node-retry](https://github.com/SEAPUNK/node-retry) for more details. |
| [opts.maxReconnectionAttempts] | <code>number</code> |  | DEPRECATED: Use retryConfig instead |
| [opts.reconnectionBackoff] | <code>number</code> |  | DEPRECATED: Use retryConfig instead |
| [opts.wsPingInterval] | <code>number</code> | <code>5000</code> | The time (in ms) to wait between pings with the server |
| [opts.maxPongInterval] | <code>number</code> |  | The max time (in ms) to wait for a pong before reconnecting |
| [opts.logLevel] | <code>string</code> | <code>&quot;info&quot;</code> | The log level for the logger |
| [opts.logger] | <code>RTMClient~logFn</code> |  | Function to use for log calls, takes (logLevel, logString) parameters |

<a name="RTMClient+_socketFn"></a>

### rtmClient._socketFn : <code>function</code>
**Kind**: instance property of <code>[RTMClient](#RTMClient)</code>  
<a name="RTMClient+ws"></a>

### rtmClient.ws : <code>Object</code>
The active websocket.

**Kind**: instance property of <code>[RTMClient](#RTMClient)</code>  
<a name="RTMClient+connected"></a>

### rtmClient.connected : <code>boolean</code>
**Kind**: instance property of <code>[RTMClient](#RTMClient)</code>  
<a name="RTMClient+authenticated"></a>

### rtmClient.authenticated : <code>boolean</code>
**Kind**: instance property of <code>[RTMClient](#RTMClient)</code>  
<a name="RTMClient+activeUserId"></a>

### rtmClient.activeUserId : <code>string</code>
The id of the user that's currently connected via this client.

**Kind**: instance property of <code>[RTMClient](#RTMClient)</code>  
<a name="RTMClient+activeTeamId"></a>

### rtmClient.activeTeamId : <code>string</code>
The id of the team that's currently connected via this client.

**Kind**: instance property of <code>[RTMClient](#RTMClient)</code>  
<a name="RTMClient+dataStore"></a>

### rtmClient.dataStore : <code>[SlackDataStore](#SlackDataStore)</code>
**Kind**: instance property of <code>[RTMClient](#RTMClient)</code>  
<a name="RTMClient+_pingTimer"></a>

### rtmClient._pingTimer : <code>?</code>
The timer repeatedly pinging the server to let it know the client is still alive.

**Kind**: instance property of <code>[RTMClient](#RTMClient)</code>  
<a name="RTMClient+_createFacets"></a>

### rtmClient._createFacets()
**Kind**: instance method of <code>[RTMClient](#RTMClient)</code>  
<a name="RTMClient+start"></a>

### rtmClient.start([opts])
Begin an RTM session.

**Kind**: instance method of <code>[RTMClient](#RTMClient)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [opts] | <code>object</code> |  |  |
| [opts.batch_presence_aware] | <code>boolean</code> | <code>false</code> | Opt into receiving fewer `presence_change` events that can contain many users. Instead of the event containing one `user` property {string}, it would contain a `users` property {string[]}. This option is not compatible with using the `dataStore`, you must initialize the RTM client object with the `dataStore: false` option. |

<a name="RTMClient+login"></a>

### ~~rtmClient.login()~~
***Deprecated***

**Kind**: instance method of <code>[RTMClient](#RTMClient)</code>  
<a name="RTMClient+nextMessageId"></a>

### rtmClient.nextMessageId()
Generates the next message id to use.

NOTE: This id must be unique per RTM connection.

**Kind**: instance method of <code>[RTMClient](#RTMClient)</code>  
<a name="RTMClient+connect"></a>

### rtmClient.connect(socketUrl)
Connects to the RTM API.

**Kind**: instance method of <code>[RTMClient](#RTMClient)</code>  

| Param | Type | Description |
| --- | --- | --- |
| socketUrl | <code>String</code> | The URL of the websocket to connect to. |

<a name="RTMClient+disconnect"></a>

### rtmClient.disconnect(optReason, optCode)
Disconnects from the RTM API.

**Kind**: instance method of <code>[RTMClient](#RTMClient)</code>  

| Param | Type |
| --- | --- |
| optReason | <code>Error</code> | 
| optCode | <code>Number</code> | 

<a name="RTMClient+reconnect"></a>

### rtmClient.reconnect()
Attempts to reconnect to the websocket by retrying the start method.

**Kind**: instance method of <code>[RTMClient](#RTMClient)</code>  
<a name="RTMClient+handleWsOpen"></a>

### rtmClient.handleWsOpen()
Handler to deal with the WebSocket open event.
NOTE: this.connected doesn't get set to true until the helloHandler is called.

**Kind**: instance method of <code>[RTMClient](#RTMClient)</code>  
<a name="RTMClient+handleWsMessage"></a>

### rtmClient.handleWsMessage(wsMsg)
Handler to deal with the WebSocket message event.

**Kind**: instance method of <code>[RTMClient](#RTMClient)</code>  

| Param | Type |
| --- | --- |
| wsMsg | <code>object</code> | 

<a name="RTMClient+_handleMessageAck"></a>

### rtmClient._handleMessageAck(replyTo, message)
Handler for the remote server's response to a message being sent on the websocket.

**Kind**: instance method of <code>[RTMClient](#RTMClient)</code>  

| Param |
| --- |
| replyTo | 
| message | 

<a name="RTMClient+handleWsError"></a>

### rtmClient.handleWsError(err)
Emits the websocket error.

**Kind**: instance method of <code>[RTMClient](#RTMClient)</code>  

| Param | Type |
| --- | --- |
| err | <code>Object</code> | 

<a name="RTMClient+handleWsClose"></a>

### rtmClient.handleWsClose(code, reason)
Occurs when the websocket closes.

**Kind**: instance method of <code>[RTMClient](#RTMClient)</code>  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>String</code> | The error code |
| reason | <code>String</code> | The reason for closing |

<a name="RTMClient+_handlePong"></a>

### rtmClient._handlePong(message)
Handles the RTM API's pong message, updating the lastPong time on the client.

**Kind**: instance method of <code>[RTMClient](#RTMClient)</code>  

| Param | Type |
| --- | --- |
| message | <code>Object</code> | 

<a name="RTMClient+_maybeKeepAlive"></a>

### rtmClient._maybeKeepAlive(message)
If we haven't received a pong in too long, treat any incoming message as a pong
to prevent unnecessary disconnects.

**Kind**: instance method of <code>[RTMClient](#RTMClient)</code>  

| Param | Type |
| --- | --- |
| message | <code>Object</code> | 

<a name="RTMClient+_handleHello"></a>

### rtmClient._handleHello()
Occurs when the socket connection is opened.
Begin ping-pong with the server.
[hello](https://api.slack.com/events/hello)

**Kind**: instance method of <code>[RTMClient](#RTMClient)</code>  
<a name="RTMClient+sendMessage"></a>

### rtmClient.sendMessage(text, channelId, [optCb])
Helper for sending a simple message to a channel|group|DM etc via the RTM API.

**Kind**: instance method of <code>[RTMClient](#RTMClient)</code>  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The text of the messsage to send. |
| channelId | <code>string</code> | The id of the channel|group|DM to send this message to. |
| [optCb] | <code>function</code> |  |

<a name="RTMClient+updateMessage"></a>

### rtmClient.updateMessage(message, [optCb])
Helper for updating a sent message via the 'chat.update' API call

**Kind**: instance method of <code>[RTMClient](#RTMClient)</code>  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>object</code> | message The message object to be updated, see /lib/clients/web/facets/chat.js for more details |
| [optCb] | <code>function</code> | Optional callback |

<a name="RTMClient+sendTyping"></a>

### rtmClient.sendTyping(channelId)
Sends a typing indicator to indicate that the user with `activeUserId` is typing.

**Kind**: instance method of <code>[RTMClient](#RTMClient)</code>  

| Param | Type | Description |
| --- | --- | --- |
| channelId | <code>string</code> | The id of the channel|group|DM to send this message to. |

<a name="RTMClient+subscribePresence"></a>

### rtmClient.subscribePresence(userIds)
Subscribes this socket to presence changes for only the given `userIds`.
This requires `presence_sub` to have been passed as an argument to `start`.

**Kind**: instance method of <code>[RTMClient](#RTMClient)</code>  

| Param | Type | Description |
| --- | --- | --- |
| userIds | <code>Array</code> | The user IDs to subscribe to |

<a name="RTMClient+send"></a>

### rtmClient.send(message, [optCb])
Sends a message over the websocket to the server.

**Kind**: instance method of <code>[RTMClient](#RTMClient)</code>  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>\*</code> | The message to send back to the server. |
| [optCb] | <code>function</code> |  |

