---
layout: page
title: PinsFacet
permalink: /reference/PinsFacet
---
**Kind**: global class  

* [PinsFacet](#PinsFacet)
    * [.add(channel, [opts], [optCb])](#PinsFacet+add)
    * [.list(channel, [optCb])](#PinsFacet+list)
    * [.remove(channel, [opts], [optCb])](#PinsFacet+remove)

<a name="PinsFacet+add"></a>

### pinsFacet.add(channel, [opts], [optCb])
Pins an item to a channel.

**Kind**: instance method of <code>[PinsFacet](#PinsFacet)</code>  
**See**: [pins.add](https://api.slack.com/methods/pins.add)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Channel to pin the item in. |
| [opts] | <code>Object</code> |  |
| opts.file | <code>?</code> | File to pin. |
| opts.file_comment | <code>?</code> | File comment to pin. |
| opts.timestamp | <code>?</code> | Timestamp of the message to pin. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="PinsFacet+list"></a>

### pinsFacet.list(channel, [optCb])
Lists items pinned to a channel.

**Kind**: instance method of <code>[PinsFacet](#PinsFacet)</code>  
**See**: [pins.list](https://api.slack.com/methods/pins.list)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Channel to get pinned items for. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="PinsFacet+remove"></a>

### pinsFacet.remove(channel, [opts], [optCb])
Un-pins an item from a channel.

**Kind**: instance method of <code>[PinsFacet](#PinsFacet)</code>  
**See**: [pins.remove](https://api.slack.com/methods/pins.remove)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Channel where the item is pinned to. |
| [opts] | <code>Object</code> |  |
| opts.file | <code>?</code> | File to un-pin. |
| opts.file_comment | <code>?</code> | File comment to un-pin. |
| opts.timestamp | <code>?</code> | Timestamp of the message to un-pin. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

