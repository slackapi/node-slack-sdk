---
layout: page
title: ImFacet
permalink: /reference/ImFacet
---
**Kind**: global class  

* [ImFacet](#ImFacet)
    * [.close(channel, [optCb])](#ImFacet+close)
    * [.history(channel, [opts], [optCb])](#ImFacet+history)
    * [.list([optCb])](#ImFacet+list)
    * [.mark(channel, ts, [optCb])](#ImFacet+mark)
    * [.open(user, [optCb])](#ImFacet+open)
    * [.replies(channel, thread_ts, [optCb])](#ImFacet+replies)

<a name="ImFacet+close"></a>

### imFacet.close(channel, [optCb])
Close a direct message channel.

**Kind**: instance method of <code>[ImFacet](#ImFacet)</code>  
**See**: [im.close](https://api.slack.com/methods/im.close)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Direct message channel to close. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ImFacet+history"></a>

### imFacet.history(channel, [opts], [optCb])
Fetches history of messages and events from direct message channel.

**Kind**: instance method of <code>[ImFacet](#ImFacet)</code>  
**See**: [im.history](https://api.slack.com/methods/im.history)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Direct message channel to fetch history for. |
| [opts] | <code>Object</code> |  |
| opts.latest | <code>?</code> | End of time range of messages to include in results. |
| opts.oldest | <code>?</code> | Start of time range of messages to include in results. |
| opts.inclusive | <code>?</code> | Include messages with latest or oldest timestamp in results. |
| opts.count | <code>?</code> | Number of messages to return, between 1 and 1000. |
| opts.unreads | <code>?</code> | Include `unread_count_display` in the output? |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ImFacet+list"></a>

### imFacet.list([optCb])
Lists direct message channels for the calling user.

**Kind**: instance method of <code>[ImFacet](#ImFacet)</code>  
**See**: [im.list](https://api.slack.com/methods/im.list)  

| Param | Type | Description |
| --- | --- | --- |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ImFacet+mark"></a>

### imFacet.mark(channel, ts, [optCb])
Sets the read cursor in a direct message channel.

**Kind**: instance method of <code>[ImFacet](#ImFacet)</code>  
**See**: [im.mark](https://api.slack.com/methods/im.mark)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Direct message channel to set reading cursor in. |
| ts | <code>?</code> | Timestamp of the most recently seen message. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ImFacet+open"></a>

### imFacet.open(user, [optCb])
Opens a direct message channel.

**Kind**: instance method of <code>[ImFacet](#ImFacet)</code>  
**See**: [im.open](https://api.slack.com/methods/im.open)  

| Param | Type | Description |
| --- | --- | --- |
| user | <code>?</code> | User to open a direct message channel with. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ImFacet+replies"></a>

### imFacet.replies(channel, thread_ts, [optCb])
Returns an entire thread (a message plus all the messages in reply to it).

**Kind**: instance method of <code>[ImFacet](#ImFacet)</code>  
**See**: [im.replies](https://api.slack.com/methods/im.replies)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Direct message channel to get replies from. |
| thread_ts | <code>?</code> | Timestamp of the parent message. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

