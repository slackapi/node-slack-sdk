---
layout: page
title: ChannelsFacet
permalink: /reference/ChannelsFacet
---
**Kind**: global class  

* [ChannelsFacet](#ChannelsFacet)
    * [.archive(channel, [optCb])](#ChannelsFacet+archive)
    * [.create(name, [optCb])](#ChannelsFacet+create)
    * [.history(channel, [opts], [optCb])](#ChannelsFacet+history)
    * [.info(channel, [optCb])](#ChannelsFacet+info)
    * [.invite(channel, user, [optCb])](#ChannelsFacet+invite)
    * [.join(name, [optCb])](#ChannelsFacet+join)
    * [.kick(channel, user, [optCb])](#ChannelsFacet+kick)
    * [.leave(channel, [optCb])](#ChannelsFacet+leave)
    * [.list([opts], [optCb])](#ChannelsFacet+list)
    * [.mark(channel, ts, [optCb])](#ChannelsFacet+mark)
    * [.rename(channel, name, [optCb])](#ChannelsFacet+rename)
    * [.replies(channel, thread_ts, [optCb])](#ChannelsFacet+replies)
    * [.setPurpose(channel, purpose, [optCb])](#ChannelsFacet+setPurpose)
    * [.setTopic(channel, topic, [optCb])](#ChannelsFacet+setTopic)
    * [.unarchive(channel, [optCb])](#ChannelsFacet+unarchive)

<a name="ChannelsFacet+archive"></a>

### channelsFacet.archive(channel, [optCb])
Archives a channel.

**Kind**: instance method of <code>[ChannelsFacet](#ChannelsFacet)</code>  
**See**: [channels.archive](https://api.slack.com/methods/channels.archive)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Channel to archive |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ChannelsFacet+create"></a>

### channelsFacet.create(name, [optCb])
Creates a channel.

**Kind**: instance method of <code>[ChannelsFacet](#ChannelsFacet)</code>  
**See**: [channels.create](https://api.slack.com/methods/channels.create)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>?</code> | Name of channel to create |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ChannelsFacet+history"></a>

### channelsFacet.history(channel, [opts], [optCb])
Fetches history of messages and events from a channel.

**Kind**: instance method of <code>[ChannelsFacet](#ChannelsFacet)</code>  
**See**: [channels.history](https://api.slack.com/methods/channels.history)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Channel to fetch history for. |
| [opts] | <code>Object</code> |  |
| opts.latest | <code>?</code> | End of time range of messages to include in results. |
| opts.oldest | <code>?</code> | Start of time range of messages to include in results. |
| opts.inclusive | <code>?</code> | Include messages with latest or oldest timestamp in results. |
| opts.count | <code>?</code> | Number of messages to return, between 1 and 1000. |
| opts.unreads | <code>?</code> | Include `unread_count_display` in the output? |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ChannelsFacet+info"></a>

### channelsFacet.info(channel, [optCb])
Gets information about a channel.

**Kind**: instance method of <code>[ChannelsFacet](#ChannelsFacet)</code>  
**See**: [channels.info](https://api.slack.com/methods/channels.info)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Channel to get info on |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ChannelsFacet+invite"></a>

### channelsFacet.invite(channel, user, [optCb])
Invites a user to a channel.

**Kind**: instance method of <code>[ChannelsFacet](#ChannelsFacet)</code>  
**See**: [channels.invite](https://api.slack.com/methods/channels.invite)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Channel to invite user to. |
| user | <code>?</code> | User to invite to channel. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ChannelsFacet+join"></a>

### channelsFacet.join(name, [optCb])
Joins a channel, creating it if needed.

**Kind**: instance method of <code>[ChannelsFacet](#ChannelsFacet)</code>  
**See**: [channels.join](https://api.slack.com/methods/channels.join)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>?</code> | Name of channel to join |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ChannelsFacet+kick"></a>

### channelsFacet.kick(channel, user, [optCb])
Removes a user from a channel.

**Kind**: instance method of <code>[ChannelsFacet](#ChannelsFacet)</code>  
**See**: [channels.kick](https://api.slack.com/methods/channels.kick)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Channel to remove user from. |
| user | <code>?</code> | User to remove from channel. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ChannelsFacet+leave"></a>

### channelsFacet.leave(channel, [optCb])
Leaves a channel.

**Kind**: instance method of <code>[ChannelsFacet](#ChannelsFacet)</code>  
**See**: [channels.leave](https://api.slack.com/methods/channels.leave)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Channel to leave |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ChannelsFacet+list"></a>

### channelsFacet.list([opts], [optCb])
Lists all channels in a Slack team.

**Kind**: instance method of <code>[ChannelsFacet](#ChannelsFacet)</code>  
**See**: [channels.list](https://api.slack.com/methods/channels.list)  

| Param | Type | Description |
| --- | --- | --- |
| [opts] | <code>Object</code> |  |
| opts.exclude_archived | <code>?</code> | Don't return archived channels. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ChannelsFacet+mark"></a>

### channelsFacet.mark(channel, ts, [optCb])
Sets the read cursor in a channel.

**Kind**: instance method of <code>[ChannelsFacet](#ChannelsFacet)</code>  
**See**: [channels.mark](https://api.slack.com/methods/channels.mark)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Channel to set reading cursor in. |
| ts | <code>?</code> | Timestamp of the most recently seen message. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ChannelsFacet+rename"></a>

### channelsFacet.rename(channel, name, [optCb])
Renames a channel.

**Kind**: instance method of <code>[ChannelsFacet](#ChannelsFacet)</code>  
**See**: [channels.rename](https://api.slack.com/methods/channels.rename)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Channel to rename |
| name | <code>?</code> | New name for channel. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ChannelsFacet+replies"></a>

### channelsFacet.replies(channel, thread_ts, [optCb])
Retrieve a thread of messages posted to a channel.

**Kind**: instance method of <code>[ChannelsFacet](#ChannelsFacet)</code>  
**See**: [channels.replies](https://api.slack.com/methods/channels.replies)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Channel to fetch thread from |
| thread_ts | <code>?</code> | Unique identifier of a thread's parent message. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ChannelsFacet+setPurpose"></a>

### channelsFacet.setPurpose(channel, purpose, [optCb])
Sets the purpose for a channel.

**Kind**: instance method of <code>[ChannelsFacet](#ChannelsFacet)</code>  
**See**: [channels.setPurpose](https://api.slack.com/methods/channels.setPurpose)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Channel to set the purpose of |
| purpose | <code>?</code> | The new purpose |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ChannelsFacet+setTopic"></a>

### channelsFacet.setTopic(channel, topic, [optCb])
Sets the topic for a channel.

**Kind**: instance method of <code>[ChannelsFacet](#ChannelsFacet)</code>  
**See**: [channels.setTopic](https://api.slack.com/methods/channels.setTopic)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Channel to set the topic of |
| topic | <code>?</code> | The new topic |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ChannelsFacet+unarchive"></a>

### channelsFacet.unarchive(channel, [optCb])
Unarchives a channel.

**Kind**: instance method of <code>[ChannelsFacet](#ChannelsFacet)</code>  
**See**: [channels.unarchive](https://api.slack.com/methods/channels.unarchive)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Channel to unarchive |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

