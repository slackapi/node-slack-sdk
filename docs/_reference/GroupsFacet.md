---
layout: page
title: GroupsFacet
permalink: /reference/GroupsFacet
---
**Kind**: global class  

* [GroupsFacet](#GroupsFacet)
    * [.archive(channel, [optCb])](#GroupsFacet+archive)
    * [.close(channel, [optCb])](#GroupsFacet+close)
    * [.create(name, [optCb])](#GroupsFacet+create)
    * [.createChild(channel, [optCb])](#GroupsFacet+createChild)
    * [.history(channel, [opts], [optCb])](#GroupsFacet+history)
    * [.info(channel, [optCb])](#GroupsFacet+info)
    * [.invite(channel, user, [optCb])](#GroupsFacet+invite)
    * [.kick(channel, user, [optCb])](#GroupsFacet+kick)
    * [.leave(channel, [optCb])](#GroupsFacet+leave)
    * [.list([opts], [optCb])](#GroupsFacet+list)
    * [.mark(channel, ts, [optCb])](#GroupsFacet+mark)
    * [.open(channel, [optCb])](#GroupsFacet+open)
    * [.rename(channel, name, [optCb])](#GroupsFacet+rename)
    * [.replies(channel, thread_ts, [optCb])](#GroupsFacet+replies)
    * [.setPurpose(channel, purpose, [optCb])](#GroupsFacet+setPurpose)
    * [.setTopic(channel, topic, [optCb])](#GroupsFacet+setTopic)
    * [.unarchive(channel, [optCb])](#GroupsFacet+unarchive)

<a name="GroupsFacet+archive"></a>

### groupsFacet.archive(channel, [optCb])
Archives a private channel.

**Kind**: instance method of <code>[GroupsFacet](#GroupsFacet)</code>  
**See**: [groups.archive](https://api.slack.com/methods/groups.archive)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Private channel to archive |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="GroupsFacet+close"></a>

### groupsFacet.close(channel, [optCb])
Closes a private channel.

**Kind**: instance method of <code>[GroupsFacet](#GroupsFacet)</code>  
**See**: [groups.close](https://api.slack.com/methods/groups.close)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Private channel to close. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="GroupsFacet+create"></a>

### groupsFacet.create(name, [optCb])
Creates a private channel.

**Kind**: instance method of <code>[GroupsFacet](#GroupsFacet)</code>  
**See**: [groups.create](https://api.slack.com/methods/groups.create)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>?</code> | Name of private channel to create |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="GroupsFacet+createChild"></a>

### groupsFacet.createChild(channel, [optCb])
Clones and archives a private channel.

**Kind**: instance method of <code>[GroupsFacet](#GroupsFacet)</code>  
**See**: [groups.createChild](https://api.slack.com/methods/groups.createChild)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Private channel to clone and archive. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="GroupsFacet+history"></a>

### groupsFacet.history(channel, [opts], [optCb])
Fetches history of messages and events from a private channel.

**Kind**: instance method of <code>[GroupsFacet](#GroupsFacet)</code>  
**See**: [groups.history](https://api.slack.com/methods/groups.history)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Private channel to fetch history for. |
| [opts] | <code>Object</code> |  |
| opts.latest | <code>?</code> | End of time range of messages to include in results. |
| opts.oldest | <code>?</code> | Start of time range of messages to include in results. |
| opts.inclusive | <code>?</code> | Include messages with latest or oldest timestamp in results. |
| opts.count | <code>?</code> | Number of messages to return, between 1 and 1000. |
| opts.unreads | <code>?</code> | Include `unread_count_display` in the output? |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="GroupsFacet+info"></a>

### groupsFacet.info(channel, [optCb])
Gets information about a private channel.

**Kind**: instance method of <code>[GroupsFacet](#GroupsFacet)</code>  
**See**: [groups.info](https://api.slack.com/methods/groups.info)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Private channel to get info on |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="GroupsFacet+invite"></a>

### groupsFacet.invite(channel, user, [optCb])
Invites a user to a private channel.

**Kind**: instance method of <code>[GroupsFacet](#GroupsFacet)</code>  
**See**: [groups.invite](https://api.slack.com/methods/groups.invite)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Private channel to invite user to. |
| user | <code>?</code> | User to invite. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="GroupsFacet+kick"></a>

### groupsFacet.kick(channel, user, [optCb])
Removes a user from a private channel.

**Kind**: instance method of <code>[GroupsFacet](#GroupsFacet)</code>  
**See**: [groups.kick](https://api.slack.com/methods/groups.kick)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Private channel to remove user from. |
| user | <code>?</code> | User to remove from private channel. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="GroupsFacet+leave"></a>

### groupsFacet.leave(channel, [optCb])
Leaves a private channel.

**Kind**: instance method of <code>[GroupsFacet](#GroupsFacet)</code>  
**See**: [groups.leave](https://api.slack.com/methods/groups.leave)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Private channel to leave |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="GroupsFacet+list"></a>

### groupsFacet.list([opts], [optCb])
Lists private channels that the calling user has access to.

**Kind**: instance method of <code>[GroupsFacet](#GroupsFacet)</code>  
**See**: [groups.list](https://api.slack.com/methods/groups.list)  

| Param | Type | Description |
| --- | --- | --- |
| [opts] | <code>Object</code> |  |
| opts.exclude_archived | <code>?</code> | Don't return archived private channels. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="GroupsFacet+mark"></a>

### groupsFacet.mark(channel, ts, [optCb])
Sets the read cursor in a private channel.

**Kind**: instance method of <code>[GroupsFacet](#GroupsFacet)</code>  
**See**: [groups.mark](https://api.slack.com/methods/groups.mark)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Private channel to set reading cursor in. |
| ts | <code>?</code> | Timestamp of the most recently seen message. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="GroupsFacet+open"></a>

### groupsFacet.open(channel, [optCb])
Opens a private channel.

**Kind**: instance method of <code>[GroupsFacet](#GroupsFacet)</code>  
**See**: [groups.open](https://api.slack.com/methods/groups.open)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Private channel to open. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="GroupsFacet+rename"></a>

### groupsFacet.rename(channel, name, [optCb])
Renames a private channel.

**Kind**: instance method of <code>[GroupsFacet](#GroupsFacet)</code>  
**See**: [groups.rename](https://api.slack.com/methods/groups.rename)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Private channel to rename |
| name | <code>?</code> | New name for private channel. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="GroupsFacet+replies"></a>

### groupsFacet.replies(channel, thread_ts, [optCb])
Retrieve a thread of messages posted to a private channel.

**Kind**: instance method of <code>[GroupsFacet](#GroupsFacet)</code>  
**See**: [groups.replies](https://api.slack.com/methods/groups.replies)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Private channel to fetch thread from |
| thread_ts | <code>?</code> | Unique identifier of a thread's parent message |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="GroupsFacet+setPurpose"></a>

### groupsFacet.setPurpose(channel, purpose, [optCb])
Sets the purpose for a private channel.

**Kind**: instance method of <code>[GroupsFacet](#GroupsFacet)</code>  
**See**: [groups.setPurpose](https://api.slack.com/methods/groups.setPurpose)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Private channel to set the purpose of |
| purpose | <code>?</code> | The new purpose |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="GroupsFacet+setTopic"></a>

### groupsFacet.setTopic(channel, topic, [optCb])
Sets the topic for a private channel.

**Kind**: instance method of <code>[GroupsFacet](#GroupsFacet)</code>  
**See**: [groups.setTopic](https://api.slack.com/methods/groups.setTopic)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Private channel to set the topic of |
| topic | <code>?</code> | The new topic |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="GroupsFacet+unarchive"></a>

### groupsFacet.unarchive(channel, [optCb])
Unarchives a private channel.

**Kind**: instance method of <code>[GroupsFacet](#GroupsFacet)</code>  
**See**: [groups.unarchive](https://api.slack.com/methods/groups.unarchive)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Private channel to unarchive |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

