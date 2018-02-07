---
layout: page
title: SlackDataStore
permalink: /reference/SlackDataStore
---
***Deprecated***

**Kind**: global class  

* ~~[SlackDataStore](#SlackDataStore)~~
    * [new SlackDataStore(opts)](#new_SlackDataStore_new)
    * [.logger](#SlackDataStore+logger) : <code>function</code>
    * [.registerMessageHandler(event, handler)](#SlackDataStore+registerMessageHandler)
    * [.clear()](#SlackDataStore+clear)
    * [.getUserById(userId)](#SlackDataStore+getUserById) ⇒ <code>Object</code>
    * [.getUserByName(name)](#SlackDataStore+getUserByName) ⇒ <code>Object</code>
    * [.getUserByEmail(email)](#SlackDataStore+getUserByEmail) ⇒ <code>Object</code>
    * [.getUserByBotId(botId)](#SlackDataStore+getUserByBotId) ⇒ <code>Object</code>
    * [.getChannelById(channelId)](#SlackDataStore+getChannelById) ⇒ <code>Object</code>
    * [.getChannelByName(name)](#SlackDataStore+getChannelByName) ⇒ <code>Object</code>
    * [.getGroupById(groupId)](#SlackDataStore+getGroupById) ⇒ <code>Object</code>
    * [.getGroupByName(name)](#SlackDataStore+getGroupByName) ⇒ <code>Object</code>
    * [.getDMById(dmId)](#SlackDataStore+getDMById) ⇒ <code>Object</code>
    * [.getDMByName(name)](#SlackDataStore+getDMByName) ⇒ <code>Object</code>
    * [.getDMByUserId(id)](#SlackDataStore+getDMByUserId) ⇒ <code>Object</code>
    * [.getBotById(botId)](#SlackDataStore+getBotById) ⇒ <code>Object</code>
    * [.getBotByName(name)](#SlackDataStore+getBotByName) ⇒ <code>Object</code>
    * [.getBotByUserId(userId)](#SlackDataStore+getBotByUserId) ⇒ <code>Object</code>
    * [.getTeamById(name)](#SlackDataStore+getTeamById) ⇒ <code>Object</code>
    * [.getUnreadCount()](#SlackDataStore+getUnreadCount)
    * [.setChannel(channel)](#SlackDataStore+setChannel)
    * [.setGroup(group)](#SlackDataStore+setGroup)
    * [.setDM(dm)](#SlackDataStore+setDM)
    * [.setUser(user)](#SlackDataStore+setUser)
    * [.setBot(bot)](#SlackDataStore+setBot)
    * [.setTeam(team)](#SlackDataStore+setTeam)
    * [.upsertChannel(channel)](#SlackDataStore+upsertChannel)
    * [.upsertGroup(group)](#SlackDataStore+upsertGroup)
    * [.upsertDM(dm)](#SlackDataStore+upsertDM)
    * [.upsertUser(user)](#SlackDataStore+upsertUser)
    * [.upsertBot(bot)](#SlackDataStore+upsertBot)
    * [.upsertTeam(team)](#SlackDataStore+upsertTeam)
    * [.upsertChannelGroupOrDMById(id, obj)](#SlackDataStore+upsertChannelGroupOrDMById)
    * [.getChannelGroupOrDMById(objId)](#SlackDataStore+getChannelGroupOrDMById) ⇒ <code>Object</code>
    * [.getChannelOrGroupByName(objId)](#SlackDataStore+getChannelOrGroupByName) ⇒ <code>Object</code>
    * [.cacheRtmStart(data)](#SlackDataStore+cacheRtmStart)
    * [.handleRtmMessage(activeUserId, activeTeamId, messageType, message)](#SlackDataStore+handleRtmMessage)

<a name="new_SlackDataStore_new"></a>

### new SlackDataStore(opts)

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> |  |
| [opts.logLevel] | <code>string</code> | The log level for the logger. |
| [opts.logger] | <code>function</code> | Function to use for log calls, takes (logLevel, logString) params. |

<a name="SlackDataStore+logger"></a>

### slackDataStore.logger : <code>function</code>
The logger function attached to this client.

**Kind**: instance property of <code>[SlackDataStore](#SlackDataStore)</code>  
<a name="SlackDataStore+registerMessageHandler"></a>

### slackDataStore.registerMessageHandler(event, handler)
Sets a handler to save RTM event data to the data-store.

**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param | Type |
| --- | --- |
| event | <code>string</code> | 
| handler | <code>function</code> | 

<a name="SlackDataStore+clear"></a>

### slackDataStore.clear()
Clears the data store and re-sets it to the required starting state.

**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  
<a name="SlackDataStore+getUserById"></a>

### slackDataStore.getUserById(userId) ⇒ <code>Object</code>
Returns the User object matching the supplied id.

**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param | Type |
| --- | --- |
| userId | <code>string</code> | 

<a name="SlackDataStore+getUserByName"></a>

### slackDataStore.getUserByName(name) ⇒ <code>Object</code>
Returns the User object matching the supplied name.

**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="SlackDataStore+getUserByEmail"></a>

### slackDataStore.getUserByEmail(email) ⇒ <code>Object</code>
Returns the User object matching the supplied email.

**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param | Type |
| --- | --- |
| email | <code>string</code> | 

<a name="SlackDataStore+getUserByBotId"></a>

### slackDataStore.getUserByBotId(botId) ⇒ <code>Object</code>
Returns the User object matching the supplied bot ID.

**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param | Type |
| --- | --- |
| botId | <code>string</code> | 

<a name="SlackDataStore+getChannelById"></a>

### slackDataStore.getChannelById(channelId) ⇒ <code>Object</code>
Returns the Channel object matching the supplied id.

**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param |
| --- |
| channelId | 

<a name="SlackDataStore+getChannelByName"></a>

### slackDataStore.getChannelByName(name) ⇒ <code>Object</code>
Returns the Channel object matching the supplied name.

**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param |
| --- |
| name | 

<a name="SlackDataStore+getGroupById"></a>

### slackDataStore.getGroupById(groupId) ⇒ <code>Object</code>
Returns the Group object matching the supplied id.

**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param |
| --- |
| groupId | 

<a name="SlackDataStore+getGroupByName"></a>

### slackDataStore.getGroupByName(name) ⇒ <code>Object</code>
Returns the Group object matching the supplied name.

**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param |
| --- |
| name | 

<a name="SlackDataStore+getDMById"></a>

### slackDataStore.getDMById(dmId) ⇒ <code>Object</code>
Returns the DM object matching the supplied id.

**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param |
| --- |
| dmId | 

<a name="SlackDataStore+getDMByName"></a>

### slackDataStore.getDMByName(name) ⇒ <code>Object</code>
Returns the DM object between the registered user and the user with the supplied name.

**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param |
| --- |
| name | 

<a name="SlackDataStore+getDMByUserId"></a>

### slackDataStore.getDMByUserId(id) ⇒ <code>Object</code>
Returns the DM object between the registered user and the user with the supplied id.

**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param |
| --- |
| id | 

<a name="SlackDataStore+getBotById"></a>

### slackDataStore.getBotById(botId) ⇒ <code>Object</code>
Returns the bot object matching the supplied id.

**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param |
| --- |
| botId | 

<a name="SlackDataStore+getBotByName"></a>

### slackDataStore.getBotByName(name) ⇒ <code>Object</code>
Returns the bot object matching the supplied name.

**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="SlackDataStore+getBotByUserId"></a>

### slackDataStore.getBotByUserId(userId) ⇒ <code>Object</code>
Returns the bot object matching the supplied user ID.

**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param |
| --- |
| userId | 

<a name="SlackDataStore+getTeamById"></a>

### slackDataStore.getTeamById(name) ⇒ <code>Object</code>
Returns the bot object matching the supplied name.

**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="SlackDataStore+getUnreadCount"></a>

### slackDataStore.getUnreadCount()
Returns the unread count for all objects: channels, groups etc.

**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  
<a name="SlackDataStore+setChannel"></a>

### slackDataStore.setChannel(channel)
Stores a channel object in the data store.

**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param | Type |
| --- | --- |
| channel | <code>Object</code> | 

<a name="SlackDataStore+setGroup"></a>

### slackDataStore.setGroup(group)
**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param | Type |
| --- | --- |
| group | <code>Object</code> | 

<a name="SlackDataStore+setDM"></a>

### slackDataStore.setDM(dm)
**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param | Type |
| --- | --- |
| dm | <code>Object</code> | 

<a name="SlackDataStore+setUser"></a>

### slackDataStore.setUser(user)
**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param | Type |
| --- | --- |
| user | <code>Object</code> | 

<a name="SlackDataStore+setBot"></a>

### slackDataStore.setBot(bot)
**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param | Type |
| --- | --- |
| bot | <code>Object</code> | 

<a name="SlackDataStore+setTeam"></a>

### slackDataStore.setTeam(team)
**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param | Type |
| --- | --- |
| team | <code>Object</code> | 

<a name="SlackDataStore+upsertChannel"></a>

### slackDataStore.upsertChannel(channel)
**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param |
| --- |
| channel | 

<a name="SlackDataStore+upsertGroup"></a>

### slackDataStore.upsertGroup(group)
**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param |
| --- |
| group | 

<a name="SlackDataStore+upsertDM"></a>

### slackDataStore.upsertDM(dm)
**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param |
| --- |
| dm | 

<a name="SlackDataStore+upsertUser"></a>

### slackDataStore.upsertUser(user)
**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param |
| --- |
| user | 

<a name="SlackDataStore+upsertBot"></a>

### slackDataStore.upsertBot(bot)
**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param |
| --- |
| bot | 

<a name="SlackDataStore+upsertTeam"></a>

### slackDataStore.upsertTeam(team)
**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param |
| --- |
| team | 

<a name="SlackDataStore+upsertChannelGroupOrDMById"></a>

### slackDataStore.upsertChannelGroupOrDMById(id, obj)
**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param |
| --- |
| id | 
| obj | 

<a name="SlackDataStore+getChannelGroupOrDMById"></a>

### slackDataStore.getChannelGroupOrDMById(objId) ⇒ <code>Object</code>
Returns the channel, group or DM object matching the supplied Id.

**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param |
| --- |
| objId | 

<a name="SlackDataStore+getChannelOrGroupByName"></a>

### slackDataStore.getChannelOrGroupByName(objId) ⇒ <code>Object</code>
Returns the channel or group object matching name, finding by channel, then group then DM.

**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param |
| --- |
| objId | 

<a name="SlackDataStore+cacheRtmStart"></a>

### slackDataStore.cacheRtmStart(data)
Caches an [rtm.start](https://api.slack.com/methods/rtm.start) response to the datastore.

**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param | Type |
| --- | --- |
| data | <code>Object</code> | 

<a name="SlackDataStore+handleRtmMessage"></a>

### slackDataStore.handleRtmMessage(activeUserId, activeTeamId, messageType, message)
**Kind**: instance method of <code>[SlackDataStore](#SlackDataStore)</code>  

| Param | Type |
| --- | --- |
| activeUserId | <code>string</code> | 
| activeTeamId | <code>string</code> | 
| messageType | <code>string</code> | 
| message | <code>Object</code> | 

