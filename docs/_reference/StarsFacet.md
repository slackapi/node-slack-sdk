---
layout: page
title: StarsFacet
permalink: /reference/StarsFacet
---
**Kind**: global class  

* [StarsFacet](#StarsFacet)
    * [.add([opts], [optCb])](#StarsFacet+add)
    * [.list([opts], [optCb])](#StarsFacet+list)
    * [.remove([opts], [optCb])](#StarsFacet+remove)

<a name="StarsFacet+add"></a>

### starsFacet.add([opts], [optCb])
Adds a star to an item.

**Kind**: instance method of <code>[StarsFacet](#StarsFacet)</code>  
**See**: [stars.add](https://api.slack.com/methods/stars.add)  

| Param | Type | Description |
| --- | --- | --- |
| [opts] | <code>Object</code> |  |
| opts.file | <code>?</code> | File to add star to. |
| opts.file_comment | <code>?</code> | File comment to add star to. |
| opts.channel | <code>?</code> | Channel to add star to, or channel where the message to add star to   was posted (used with `timestamp`). |
| opts.timestamp | <code>?</code> | Timestamp of the message to add star to. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="StarsFacet+list"></a>

### starsFacet.list([opts], [optCb])
Lists stars for a user.

**Kind**: instance method of <code>[StarsFacet](#StarsFacet)</code>  
**See**: [stars.list](https://api.slack.com/methods/stars.list)  

| Param | Type | Description |
| --- | --- | --- |
| [opts] | <code>Object</code> |  |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="StarsFacet+remove"></a>

### starsFacet.remove([opts], [optCb])
Removes a star from an item.

**Kind**: instance method of <code>[StarsFacet](#StarsFacet)</code>  
**See**: [stars.remove](https://api.slack.com/methods/stars.remove)  

| Param | Type | Description |
| --- | --- | --- |
| [opts] | <code>Object</code> |  |
| opts.file | <code>?</code> | File to remove star from. |
| opts.file_comment | <code>?</code> | File comment to remove star from. |
| opts.channel | <code>?</code> | Channel to remove star from, or channel where the message to remove   star from was posted (used with `timestamp`). |
| opts.timestamp | <code>?</code> | Timestamp of the message to remove star from. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

