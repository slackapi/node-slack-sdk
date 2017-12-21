---
layout: page
title: MpimFacet
permalink: /reference/MpimFacet
---
**Kind**: global class  

* [MpimFacet](#MpimFacet)
    * [.close(channel, [optCb])](#MpimFacet+close)
    * [.history(channel, [opts], [optCb])](#MpimFacet+history)
    * [.list([optCb])](#MpimFacet+list)
    * [.mark(channel, ts, [optCb])](#MpimFacet+mark)
    * [.open(users, [optCb])](#MpimFacet+open)

<a name="MpimFacet+close"></a>

### mpimFacet.close(channel, [optCb])
Closes a multiparty direct message channel.

**Kind**: instance method of <code>[MpimFacet](#MpimFacet)</code>  
**See**: [mpim.close](https://api.slack.com/methods/mpim.close)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | MPIM to close. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="MpimFacet+history"></a>

### mpimFacet.history(channel, [opts], [optCb])
Fetches history of messages and events from a multiparty direct message.

**Kind**: instance method of <code>[MpimFacet](#MpimFacet)</code>  
**See**: [mpim.history](https://api.slack.com/methods/mpim.history)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Multiparty direct message to fetch history for. |
| [opts] | <code>Object</code> |  |
| opts.latest | <code>?</code> | End of time range of messages to include in results. |
| opts.oldest | <code>?</code> | Start of time range of messages to include in results. |
| opts.inclusive | <code>?</code> | Include messages with latest or oldest timestamp in results. |
| opts.count | <code>?</code> | Number of messages to return, between 1 and 1000. |
| opts.unreads | <code>?</code> | Include `unread_count_display` in the output? |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="MpimFacet+list"></a>

### mpimFacet.list([optCb])
Lists multiparty direct message channels for the calling user.

**Kind**: instance method of <code>[MpimFacet](#MpimFacet)</code>  
**See**: [mpim.list](https://api.slack.com/methods/mpim.list)  

| Param | Type | Description |
| --- | --- | --- |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="MpimFacet+mark"></a>

### mpimFacet.mark(channel, ts, [optCb])
Sets the read cursor in a multiparty direct message channel.

**Kind**: instance method of <code>[MpimFacet](#MpimFacet)</code>  
**See**: [mpim.mark](https://api.slack.com/methods/mpim.mark)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | multiparty direct message channel to set reading cursor in. |
| ts | <code>?</code> | Timestamp of the most recently seen message. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="MpimFacet+open"></a>

### mpimFacet.open(users, [optCb])
This method opens a multiparty direct message.

**Kind**: instance method of <code>[MpimFacet](#MpimFacet)</code>  
**See**: [mpim.open](https://api.slack.com/methods/mpim.open)  

| Param | Type | Description |
| --- | --- | --- |
| users | <code>?</code> | Comma separated lists of users.  The ordering of the users is preserved   whenever a MPIM group is returned. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

