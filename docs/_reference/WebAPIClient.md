---
layout: page
title: WebAPIClient
permalink: /reference/WebAPIClient
---
**Kind**: global class  

* [WebAPIClient](#WebAPIClient)
    * [new WebAPIClient(token, [opts])](#new_WebAPIClient_new)
    * [.api](#WebAPIClient+api) : <code>[ApiFacet](#ApiFacet)</code>
    * [.auth](#WebAPIClient+auth) : <code>[AuthFacet](#AuthFacet)</code>
    * [.bots](#WebAPIClient+bots) : <code>[BotsFacet](#BotsFacet)</code>
    * [.channels](#WebAPIClient+channels) : <code>[ChannelsFacet](#ChannelsFacet)</code>
    * [.chat](#WebAPIClient+chat) : <code>[ChatFacet](#ChatFacet)</code>
    * [.conversations](#WebAPIClient+conversations) : <code>[ConversationsFacet](#ConversationsFacet)</code>
    * [.dialog](#WebAPIClient+dialog) : <code>[DialogFacet](#DialogFacet)</code>
    * [.dnd](#WebAPIClient+dnd) : <code>[DndFacet](#DndFacet)</code>
    * [.emoji](#WebAPIClient+emoji) : <code>[EmojiFacet](#EmojiFacet)</code>
    * [.files](#WebAPIClient+files) : <code>[FilesFacet](#FilesFacet)</code>
        * [.comments](#WebAPIClient+files.comments) : <code>[FilesCommentsFacet](#FilesCommentsFacet)</code>
    * [.groups](#WebAPIClient+groups) : <code>[GroupsFacet](#GroupsFacet)</code>
    * [.im](#WebAPIClient+im) : <code>[ImFacet](#ImFacet)</code>
    * [.mpim](#WebAPIClient+mpim) : <code>[MpimFacet](#MpimFacet)</code>
    * [.oauth](#WebAPIClient+oauth) : <code>[OauthFacet](#OauthFacet)</code>
    * [.pins](#WebAPIClient+pins) : <code>[PinsFacet](#PinsFacet)</code>
    * [.presence](#WebAPIClient+presence) : <code>[PresenceFacet](#PresenceFacet)</code>
    * [.reactions](#WebAPIClient+reactions) : <code>[ReactionsFacet](#ReactionsFacet)</code>
    * [.reminders](#WebAPIClient+reminders) : <code>[RemindersFacet](#RemindersFacet)</code>
    * [.rtm](#WebAPIClient+rtm) : <code>[RtmFacet](#RtmFacet)</code>
    * [.search](#WebAPIClient+search) : <code>[SearchFacet](#SearchFacet)</code>
    * [.stars](#WebAPIClient+stars) : <code>[StarsFacet](#StarsFacet)</code>
    * [.team](#WebAPIClient+team) : <code>[TeamFacet](#TeamFacet)</code>
    * [.usergroups](#WebAPIClient+usergroups) : <code>[UsergroupsFacet](#UsergroupsFacet)</code>
        * [.users](#WebAPIClient+usergroups.users) : <code>[UsergroupsUsersFacet](#UsergroupsUsersFacet)</code>
    * [.users](#WebAPIClient+users) : <code>[UsersFacet](#UsersFacet)</code>
        * [.profiles](#WebAPIClient+users.profiles) : <code>UsersProfilesFacet</code>
    * [._createFacets()](#WebAPIClient+_createFacets)

<a name="new_WebAPIClient_new"></a>

### new WebAPIClient(token, [opts])
Slack Web API client.


| Param | Type | Description |
| --- | --- | --- |
| token |  | The Slack API token to use with this client. |
| [opts] | <code>Object</code> |  |
| [opts.retryConfig] | <code>Object</code> | The configuration to use for the retry operation, see [node-retry](https://github.com/tim-kos/node-retry) for more details. |

<a name="WebAPIClient+api"></a>

### webAPIClient.api : <code>[ApiFacet](#ApiFacet)</code>
**Kind**: instance property of <code>[WebAPIClient](#WebAPIClient)</code>  
**See**: [ApiFacet](/node-slack-sdk/reference/ApiFacet)  
<a name="WebAPIClient+auth"></a>

### webAPIClient.auth : <code>[AuthFacet](#AuthFacet)</code>
**Kind**: instance property of <code>[WebAPIClient](#WebAPIClient)</code>  
**See**: [AuthFacet](/node-slack-sdk/reference/AuthFacet)  
<a name="WebAPIClient+bots"></a>

### webAPIClient.bots : <code>[BotsFacet](#BotsFacet)</code>
**Kind**: instance property of <code>[WebAPIClient](#WebAPIClient)</code>  
**See**: [BotsFacet](/node-slack-sdk/reference/BotsFacet)  
<a name="WebAPIClient+channels"></a>

### webAPIClient.channels : <code>[ChannelsFacet](#ChannelsFacet)</code>
**Kind**: instance property of <code>[WebAPIClient](#WebAPIClient)</code>  
**See**: [ChannelsFacet](/node-slack-sdk/reference/ChannelsFacet)  
<a name="WebAPIClient+chat"></a>

### webAPIClient.chat : <code>[ChatFacet](#ChatFacet)</code>
**Kind**: instance property of <code>[WebAPIClient](#WebAPIClient)</code>  
**See**: [ChatFacet](/node-slack-sdk/reference/ChatFacet)  
<a name="WebAPIClient+conversations"></a>

### webAPIClient.conversations : <code>[ConversationsFacet](#ConversationsFacet)</code>
**Kind**: instance property of <code>[WebAPIClient](#WebAPIClient)</code>  
**See**: [ConversationsFacet](/node-slack-sdk/reference/ConversationsFacet)  
<a name="WebAPIClient+dialog"></a>

### webAPIClient.dialog : <code>[DialogFacet](#DialogFacet)</code>
**Kind**: instance property of <code>[WebAPIClient](#WebAPIClient)</code>  
**See**: [DialogFacet](/node-slack-sdk/reference/DialogFacet)  
<a name="WebAPIClient+dnd"></a>

### webAPIClient.dnd : <code>[DndFacet](#DndFacet)</code>
**Kind**: instance property of <code>[WebAPIClient](#WebAPIClient)</code>  
**See**: [DndFacet](/node-slack-sdk/reference/DndFacet)  
<a name="WebAPIClient+emoji"></a>

### webAPIClient.emoji : <code>[EmojiFacet](#EmojiFacet)</code>
**Kind**: instance property of <code>[WebAPIClient](#WebAPIClient)</code>  
**See**: [EmojiFacet](/node-slack-sdk/reference/EmojiFacet)  
<a name="WebAPIClient+files"></a>

### webAPIClient.files : <code>[FilesFacet](#FilesFacet)</code>
**Kind**: instance property of <code>[WebAPIClient](#WebAPIClient)</code>  
**See**: [FilesFacet](/node-slack-sdk/reference/FilesFacet)  
<a name="WebAPIClient+files.comments"></a>

#### files.comments : <code>[FilesCommentsFacet](#FilesCommentsFacet)</code>
**Kind**: static property of <code>[files](#WebAPIClient+files)</code>  
**See**: [FilesCommentsFacet](/node-slack-sdk/reference/FilesCommentsFacet)  
<a name="WebAPIClient+groups"></a>

### webAPIClient.groups : <code>[GroupsFacet](#GroupsFacet)</code>
**Kind**: instance property of <code>[WebAPIClient](#WebAPIClient)</code>  
**See**: [GroupsFacet](/node-slack-sdk/reference/GroupsFacet)  
<a name="WebAPIClient+im"></a>

### webAPIClient.im : <code>[ImFacet](#ImFacet)</code>
**Kind**: instance property of <code>[WebAPIClient](#WebAPIClient)</code>  
**See**: [ImFacet](/node-slack-sdk/reference/ImFacet)  
<a name="WebAPIClient+mpim"></a>

### webAPIClient.mpim : <code>[MpimFacet](#MpimFacet)</code>
**Kind**: instance property of <code>[WebAPIClient](#WebAPIClient)</code>  
**See**: [MpimFacet](/node-slack-sdk/reference/MpimFacet)  
<a name="WebAPIClient+oauth"></a>

### webAPIClient.oauth : <code>[OauthFacet](#OauthFacet)</code>
**Kind**: instance property of <code>[WebAPIClient](#WebAPIClient)</code>  
**See**: [OauthFacet](/node-slack-sdk/reference/OauthFacet)  
<a name="WebAPIClient+pins"></a>

### webAPIClient.pins : <code>[PinsFacet](#PinsFacet)</code>
**Kind**: instance property of <code>[WebAPIClient](#WebAPIClient)</code>  
**See**: [PinsFacet](/node-slack-sdk/reference/PinsFacet)  
<a name="WebAPIClient+presence"></a>

### webAPIClient.presence : <code>[PresenceFacet](#PresenceFacet)</code>
**Kind**: instance property of <code>[WebAPIClient](#WebAPIClient)</code>  
**See**: [PresenceFacet](/node-slack-sdk/reference/PresenceFacet)  
<a name="WebAPIClient+reactions"></a>

### webAPIClient.reactions : <code>[ReactionsFacet](#ReactionsFacet)</code>
**Kind**: instance property of <code>[WebAPIClient](#WebAPIClient)</code>  
**See**: [ReactionsFacet](/node-slack-sdk/reference/ReactionsFacet)  
<a name="WebAPIClient+reminders"></a>

### webAPIClient.reminders : <code>[RemindersFacet](#RemindersFacet)</code>
**Kind**: instance property of <code>[WebAPIClient](#WebAPIClient)</code>  
**See**: [RemindersFacet](/node-slack-sdk/reference/RemindersFacet)  
<a name="WebAPIClient+rtm"></a>

### webAPIClient.rtm : <code>[RtmFacet](#RtmFacet)</code>
**Kind**: instance property of <code>[WebAPIClient](#WebAPIClient)</code>  
**See**: [RtmFacet](/node-slack-sdk/reference/RtmFacet)  
<a name="WebAPIClient+search"></a>

### webAPIClient.search : <code>[SearchFacet](#SearchFacet)</code>
**Kind**: instance property of <code>[WebAPIClient](#WebAPIClient)</code>  
**See**: [SearchFacet](/node-slack-sdk/reference/SearchFacet)  
<a name="WebAPIClient+stars"></a>

### webAPIClient.stars : <code>[StarsFacet](#StarsFacet)</code>
**Kind**: instance property of <code>[WebAPIClient](#WebAPIClient)</code>  
**See**: [StarsFacet](/node-slack-sdk/reference/StarsFacet)  
<a name="WebAPIClient+team"></a>

### webAPIClient.team : <code>[TeamFacet](#TeamFacet)</code>
**Kind**: instance property of <code>[WebAPIClient](#WebAPIClient)</code>  
**See**: [TeamFacet](/node-slack-sdk/reference/TeamFacet)  
<a name="WebAPIClient+usergroups"></a>

### webAPIClient.usergroups : <code>[UsergroupsFacet](#UsergroupsFacet)</code>
**Kind**: instance property of <code>[WebAPIClient](#WebAPIClient)</code>  
**See**: [UsergroupsFacet](/node-slack-sdk/reference/UsergroupsFacet)  
<a name="WebAPIClient+usergroups.users"></a>

#### usergroups.users : <code>[UsergroupsUsersFacet](#UsergroupsUsersFacet)</code>
**Kind**: static property of <code>[usergroups](#WebAPIClient+usergroups)</code>  
**See**: [UsergroupsUsersFacet](/node-slack-sdk/reference/UsergroupsUsersFacet)  
<a name="WebAPIClient+users"></a>

### webAPIClient.users : <code>[UsersFacet](#UsersFacet)</code>
**Kind**: instance property of <code>[WebAPIClient](#WebAPIClient)</code>  
**See**: [UsersFacet](/node-slack-sdk/reference/UsersFacet)  
<a name="WebAPIClient+users.profiles"></a>

#### users.profiles : <code>UsersProfilesFacet</code>
**Kind**: static property of <code>[users](#WebAPIClient+users)</code>  
**See**: [UsersProfilesFacet](/node-slack-sdk/reference/UsersProfilesFacet)  
<a name="WebAPIClient+_createFacets"></a>

### webAPIClient._createFacets()
**Kind**: instance method of <code>[WebAPIClient](#WebAPIClient)</code>  
**Inheritdocs**:   
