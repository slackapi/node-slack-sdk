---
layout: page
title: SlackMemoryDataStore
permalink: /reference/SlackMemoryDataStore
---
***Deprecated***

**Kind**: global class  

* ~~[SlackMemoryDataStore](#SlackMemoryDataStore)~~
    * [.users](#SlackMemoryDataStore+users) : <code>Object</code>
    * [.channels](#SlackMemoryDataStore+channels) : <code>Object</code>
    * [.dms](#SlackMemoryDataStore+dms) : <code>Object</code>
    * [.groups](#SlackMemoryDataStore+groups) : <code>Object</code>
    * [.bots](#SlackMemoryDataStore+bots) : <code>Object</code>
    * [.teams](#SlackMemoryDataStore+teams) : <code>Object</code>
    * [.clear()](#SlackMemoryDataStore+clear)
    * [.getUserById()](#SlackMemoryDataStore+getUserById)
    * [.getUserByName()](#SlackMemoryDataStore+getUserByName)
    * [.getUserByEmail()](#SlackMemoryDataStore+getUserByEmail)
    * [.getUserByBotId()](#SlackMemoryDataStore+getUserByBotId)
    * [.getChannelById()](#SlackMemoryDataStore+getChannelById)
    * [.getChannelByName()](#SlackMemoryDataStore+getChannelByName)
    * [.getGroupById()](#SlackMemoryDataStore+getGroupById)
    * [.getGroupByName()](#SlackMemoryDataStore+getGroupByName)
    * [.getDMById()](#SlackMemoryDataStore+getDMById)
    * [.getDMByName()](#SlackMemoryDataStore+getDMByName)
    * [.getDMByUserId()](#SlackMemoryDataStore+getDMByUserId)
    * [.getBotById()](#SlackMemoryDataStore+getBotById)
    * [.getBotByName()](#SlackMemoryDataStore+getBotByName)
    * [.getBotByUserId()](#SlackMemoryDataStore+getBotByUserId)
    * [.getTeamById()](#SlackMemoryDataStore+getTeamById)
    * [.getUnreadCount()](#SlackMemoryDataStore+getUnreadCount)
    * [.setChannel()](#SlackMemoryDataStore+setChannel)
    * [.setGroup()](#SlackMemoryDataStore+setGroup)
    * [.setDM()](#SlackMemoryDataStore+setDM)
    * [.setUser()](#SlackMemoryDataStore+setUser)
    * [.setBot()](#SlackMemoryDataStore+setBot)
    * [.setTeam()](#SlackMemoryDataStore+setTeam)
    * [.upsertChannel()](#SlackMemoryDataStore+upsertChannel)
    * [.upsertGroup()](#SlackMemoryDataStore+upsertGroup)
    * [.upsertDM()](#SlackMemoryDataStore+upsertDM)
    * [.upsertUser()](#SlackMemoryDataStore+upsertUser)
    * [.upsertBot()](#SlackMemoryDataStore+upsertBot)
    * [.upsertTeam()](#SlackMemoryDataStore+upsertTeam)
    * [.removeChannel()](#SlackMemoryDataStore+removeChannel)
    * [.removeGroup()](#SlackMemoryDataStore+removeGroup)
    * [.removeDM()](#SlackMemoryDataStore+removeDM)
    * [.removeUser()](#SlackMemoryDataStore+removeUser)
    * [.removeBot()](#SlackMemoryDataStore+removeBot)
    * [.removeTeam()](#SlackMemoryDataStore+removeTeam)

<a name="SlackMemoryDataStore+users"></a>

### slackMemoryDataStore.users : <code>Object</code>
**Kind**: instance property of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+channels"></a>

### slackMemoryDataStore.channels : <code>Object</code>
**Kind**: instance property of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+dms"></a>

### slackMemoryDataStore.dms : <code>Object</code>
**Kind**: instance property of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+groups"></a>

### slackMemoryDataStore.groups : <code>Object</code>
**Kind**: instance property of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+bots"></a>

### slackMemoryDataStore.bots : <code>Object</code>
**Kind**: instance property of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+teams"></a>

### slackMemoryDataStore.teams : <code>Object</code>
**Kind**: instance property of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+clear"></a>

### slackMemoryDataStore.clear()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+getUserById"></a>

### slackMemoryDataStore.getUserById()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+getUserByName"></a>

### slackMemoryDataStore.getUserByName()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+getUserByEmail"></a>

### slackMemoryDataStore.getUserByEmail()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+getUserByBotId"></a>

### slackMemoryDataStore.getUserByBotId()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+getChannelById"></a>

### slackMemoryDataStore.getChannelById()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+getChannelByName"></a>

### slackMemoryDataStore.getChannelByName()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+getGroupById"></a>

### slackMemoryDataStore.getGroupById()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+getGroupByName"></a>

### slackMemoryDataStore.getGroupByName()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+getDMById"></a>

### slackMemoryDataStore.getDMById()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+getDMByName"></a>

### slackMemoryDataStore.getDMByName()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+getDMByUserId"></a>

### slackMemoryDataStore.getDMByUserId()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+getBotById"></a>

### slackMemoryDataStore.getBotById()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+getBotByName"></a>

### slackMemoryDataStore.getBotByName()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+getBotByUserId"></a>

### slackMemoryDataStore.getBotByUserId()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+getTeamById"></a>

### slackMemoryDataStore.getTeamById()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+getUnreadCount"></a>

### slackMemoryDataStore.getUnreadCount()
Returns the unread count for all objects: channels, groups etc.

**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+setChannel"></a>

### slackMemoryDataStore.setChannel()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+setGroup"></a>

### slackMemoryDataStore.setGroup()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+setDM"></a>

### slackMemoryDataStore.setDM()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+setUser"></a>

### slackMemoryDataStore.setUser()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+setBot"></a>

### slackMemoryDataStore.setBot()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+setTeam"></a>

### slackMemoryDataStore.setTeam()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+upsertChannel"></a>

### slackMemoryDataStore.upsertChannel()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+upsertGroup"></a>

### slackMemoryDataStore.upsertGroup()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+upsertDM"></a>

### slackMemoryDataStore.upsertDM()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+upsertUser"></a>

### slackMemoryDataStore.upsertUser()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+upsertBot"></a>

### slackMemoryDataStore.upsertBot()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+upsertTeam"></a>

### slackMemoryDataStore.upsertTeam()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+removeChannel"></a>

### slackMemoryDataStore.removeChannel()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+removeGroup"></a>

### slackMemoryDataStore.removeGroup()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+removeDM"></a>

### slackMemoryDataStore.removeDM()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+removeUser"></a>

### slackMemoryDataStore.removeUser()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+removeBot"></a>

### slackMemoryDataStore.removeBot()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
<a name="SlackMemoryDataStore+removeTeam"></a>

### slackMemoryDataStore.removeTeam()
**Kind**: instance method of <code>[SlackMemoryDataStore](#SlackMemoryDataStore)</code>  
