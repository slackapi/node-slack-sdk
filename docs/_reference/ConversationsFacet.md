---
layout: page
title: ConversationsFacet
permalink: /reference/ConversationsFacet
---
**Kind**: global class  

* [ConversationsFacet](#ConversationsFacet)
    * [.archive(channel, [optCb])](#ConversationsFacet+archive)
    * [.close(channel, [optCb])](#ConversationsFacet+close)
    * [.create(name, [opts], [optCb])](#ConversationsFacet+create)
    * [.history(channel, [opts], [optCb])](#ConversationsFacet+history)
    * [.info(channel, [opts], [optCb])](#ConversationsFacet+info)
    * [.invite(channel, users, [optCb])](#ConversationsFacet+invite)
    * [.join(channel, [optCb])](#ConversationsFacet+join)
    * [.kick(channel, user, [optCb])](#ConversationsFacet+kick)
    * [.leave(channel, [optCb])](#ConversationsFacet+leave)
    * [.list([opts], [optCb])](#ConversationsFacet+list)
    * [.members(channel, [opts], [optCb])](#ConversationsFacet+members)
    * [.open([opts], [optCb])](#ConversationsFacet+open)
    * [.rename(channel, name, [optCb])](#ConversationsFacet+rename)
    * [.replies(channel, ts, [opts], [optCb])](#ConversationsFacet+replies)
    * [.setPurpose(channel, purpose, [optCb])](#ConversationsFacet+setPurpose)
    * [.setTopic(channel, topic, [optCb])](#ConversationsFacet+setTopic)
    * [.unarchive(channel, [optCb])](#ConversationsFacet+unarchive)

<a name="ConversationsFacet+archive"></a>

### conversationsFacet.archive(channel, [optCb])
Archives a conversation.

**Kind**: instance method of <code>[ConversationsFacet](#ConversationsFacet)</code>  
**See**: [conversations.archive](https://api.slack.com/methods/conversations.archive)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | ID of conversation to archive |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ConversationsFacet+close"></a>

### conversationsFacet.close(channel, [optCb])
Closes a direct message or multi-person direct message.

**Kind**: instance method of <code>[ConversationsFacet](#ConversationsFacet)</code>  
**See**: [conversations.close](https://api.slack.com/methods/conversations.close)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Conversation to close. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ConversationsFacet+create"></a>

### conversationsFacet.create(name, [opts], [optCb])
Initiates a public or private channel-based conversation

**Kind**: instance method of <code>[ConversationsFacet](#ConversationsFacet)</code>  
**See**: [conversations.create](https://api.slack.com/methods/conversations.create)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>?</code> | Name of the public or private channel to create |
| [opts] | <code>Object</code> |  |
| opts.is_private | <code>?</code> | Create a private channel instead of a public one |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ConversationsFacet+history"></a>

### conversationsFacet.history(channel, [opts], [optCb])
Fetches a conversation's history of messages and events.

**Kind**: instance method of <code>[ConversationsFacet](#ConversationsFacet)</code>  
**See**: [conversations.history](https://api.slack.com/methods/conversations.history)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Conversation ID to fetch history for. |
| [opts] | <code>Object</code> |  |
| opts.latest | <code>?</code> | End of time range of messages to include in results. |
| opts.oldest | <code>?</code> | Start of time range of messages to include in results. |
| opts.cursor | <code>?</code> | Paginate through collections of data by setting the cursor parameter to a next_cursor attribute returned by a previous request's response_metadata. Default value fetches the first "page" of the collection. See pagination for more detail. |
| opts.limit | <code>?</code> | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ConversationsFacet+info"></a>

### conversationsFacet.info(channel, [opts], [optCb])
Retrieve information about a conversation.

**Kind**: instance method of <code>[ConversationsFacet](#ConversationsFacet)</code>  
**See**: [conversations.info](https://api.slack.com/methods/conversations.info)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Channel to get info on |
| [opts] | <code>Object</code> |  |
| opts.include_locale | <code>?</code> | Set this to `true` to receive the locale for this conversation. Defaults to `false` |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ConversationsFacet+invite"></a>

### conversationsFacet.invite(channel, users, [optCb])
Invites users to a channel.

**Kind**: instance method of <code>[ConversationsFacet](#ConversationsFacet)</code>  
**See**: [conversations.invite](https://api.slack.com/methods/conversations.invite)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | The ID of the public or private channel to invite user(s) to. |
| users | <code>?</code> | A comma separated list of user IDs. Up to 30 users may be listed. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ConversationsFacet+join"></a>

### conversationsFacet.join(channel, [optCb])
Joins an existing conversation.

**Kind**: instance method of <code>[ConversationsFacet](#ConversationsFacet)</code>  
**See**: [conversations.join](https://api.slack.com/methods/conversations.join)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | ID of conversation to join |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ConversationsFacet+kick"></a>

### conversationsFacet.kick(channel, user, [optCb])
Removes a user from a conversation.

**Kind**: instance method of <code>[ConversationsFacet](#ConversationsFacet)</code>  
**See**: [conversations.kick](https://api.slack.com/methods/conversations.kick)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | ID of conversation to remove user from. |
| user | <code>?</code> | User to remove from channel. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ConversationsFacet+leave"></a>

### conversationsFacet.leave(channel, [optCb])
Leaves a channel.

**Kind**: instance method of <code>[ConversationsFacet](#ConversationsFacet)</code>  
**See**: [conversations.leave](https://api.slack.com/methods/conversations.leave)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Channel to leave |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ConversationsFacet+list"></a>

### conversationsFacet.list([opts], [optCb])
Lists all conversations in a Slack team.

**Kind**: instance method of <code>[ConversationsFacet](#ConversationsFacet)</code>  
**See**: [conversations.list](https://api.slack.com/methods/conversations.list)  

| Param | Type | Description |
| --- | --- | --- |
| [opts] | <code>Object</code> |  |
| opts.exclude_archived | <code>?</code> | Set to `true` to exclude archived channels from the list |
| opts.types | <code>?</code> | Mix and match channel types by providing a comma-separated list of any combination of `public_channel`, `private_channel`, `mpim`, `im` |
| opts.cursor | <code>?</code> | Paginate through collections of data by setting the cursor parameter to a next_cursor attribute returned by a previous request's response_metadata. Default value fetches the first "page" of the collection. See pagination for more detail. |
| opts.limit | <code>?</code> | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ConversationsFacet+members"></a>

### conversationsFacet.members(channel, [opts], [optCb])
Retrieve members of a conversation.

**Kind**: instance method of <code>[ConversationsFacet](#ConversationsFacet)</code>  
**See**: [conversations.members](https://api.slack.com/methods/conversations.members)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | ID of the conversation to retrieve members for |
| [opts] | <code>Object</code> |  |
| opts.cursor | <code>?</code> | Paginate through collections of data by setting the cursor parameter to a next_cursor attribute returned by a previous request's response_metadata. Default value fetches the first "page" of the collection. See pagination for more detail. |
| opts.limit | <code>?</code> | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ConversationsFacet+open"></a>

### conversationsFacet.open([opts], [optCb])
Opens or resumes a direct message or multi-person direct message.

**Kind**: instance method of <code>[ConversationsFacet](#ConversationsFacet)</code>  
**See**: [conversations.open](https://api.slack.com/methods/conversations.open)  

| Param | Type | Description |
| --- | --- | --- |
| [opts] | <code>Object</code> |  |
| opts.channel | <code>?</code> | Resume a conversation by supplying an im or mpim's ID. Or provide the users field instead. |
| opts.return_im | <code>?</code> | Boolean, indicates you want the full IM channel definition in the response. |
| opts.users | <code>?</code> | Comma separated lists of users. If only one user is included, this creates a 1:1 DM. The ordering of the users is preserved whenever a multi-person direct message is returned. Supply a channel when not supplying users. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ConversationsFacet+rename"></a>

### conversationsFacet.rename(channel, name, [optCb])
Renames a conversation.

**Kind**: instance method of <code>[ConversationsFacet](#ConversationsFacet)</code>  
**See**: [conversations.rename](https://api.slack.com/methods/conversations.rename)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | ID of conversation to rename |
| name | <code>?</code> | New name for conversation. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ConversationsFacet+replies"></a>

### conversationsFacet.replies(channel, ts, [opts], [optCb])
Retrieve a thread of messages posted to a conversation

**Kind**: instance method of <code>[ConversationsFacet](#ConversationsFacet)</code>  
**See**: [conversations.replies](https://api.slack.com/methods/conversations.replies)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Conversation ID to fetch thread from |
| ts | <code>?</code> | Unique identifier of a thread's parent message |
| [opts] | <code>Object</code> |  |
| opts.cursor | <code>?</code> | Paginate through collections of data by setting the cursor parameter to a next_cursor attribute returned by a previous request's response_metadata. Default value fetches the first "page" of the collection. See pagination for more detail. |
| opts.limit | <code>?</code> | The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ConversationsFacet+setPurpose"></a>

### conversationsFacet.setPurpose(channel, purpose, [optCb])
Sets the purpose for a conversation.

**Kind**: instance method of <code>[ConversationsFacet](#ConversationsFacet)</code>  
**See**: [conversations.setPurpose](https://api.slack.com/methods/conversations.setPurpose)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Conversation to set the purpose of |
| purpose | <code>?</code> | A new, specialer purpose |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ConversationsFacet+setTopic"></a>

### conversationsFacet.setTopic(channel, topic, [optCb])
Sets the topic for a conversation.

**Kind**: instance method of <code>[ConversationsFacet](#ConversationsFacet)</code>  
**See**: [conversations.setTopic](https://api.slack.com/methods/conversations.setTopic)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Conversation to set the topic of |
| topic | <code>?</code> | The new topic string. Does not support formatting or linkification. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ConversationsFacet+unarchive"></a>

### conversationsFacet.unarchive(channel, [optCb])
Reverses conversation archival.

**Kind**: instance method of <code>[ConversationsFacet](#ConversationsFacet)</code>  
**See**: [conversations.unarchive](https://api.slack.com/methods/conversations.unarchive)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | ID of conversation to unarchive |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

