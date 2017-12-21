---
layout: page
title: ReactionsFacet
permalink: /reference/ReactionsFacet
---
**Kind**: global class  

* [ReactionsFacet](#ReactionsFacet)
    * [.add(name, [opts], [optCb])](#ReactionsFacet+add)
    * [.get([opts], [optCb])](#ReactionsFacet+get)
    * [.list([opts], [optCb])](#ReactionsFacet+list)
    * [.remove(name, [opts], [optCb])](#ReactionsFacet+remove)

<a name="ReactionsFacet+add"></a>

### reactionsFacet.add(name, [opts], [optCb])
Adds a reaction to an item.

**Kind**: instance method of <code>[ReactionsFacet](#ReactionsFacet)</code>  
**See**: [reactions.add](https://api.slack.com/methods/reactions.add)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>?</code> | Reaction (emoji) name. |
| [opts] | <code>Object</code> |  |
| opts.file | <code>?</code> | File to add reaction to. |
| opts.file_comment | <code>?</code> | File comment to add reaction to. |
| opts.channel | <code>?</code> | Channel where the message to add reaction to was posted. |
| opts.timestamp | <code>?</code> | Timestamp of the message to add reaction to. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ReactionsFacet+get"></a>

### reactionsFacet.get([opts], [optCb])
Gets reactions for an item.

**Kind**: instance method of <code>[ReactionsFacet](#ReactionsFacet)</code>  
**See**: [reactions.get](https://api.slack.com/methods/reactions.get)  

| Param | Type | Description |
| --- | --- | --- |
| [opts] | <code>Object</code> |  |
| opts.file | <code>?</code> | File to get reactions for. |
| opts.file_comment | <code>?</code> | File comment to get reactions for. |
| opts.channel | <code>?</code> | Channel where the message to get reactions for was posted. |
| opts.timestamp | <code>?</code> | Timestamp of the message to get reactions for. |
| opts.full | <code>?</code> | If true always return the complete reaction list. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ReactionsFacet+list"></a>

### reactionsFacet.list([opts], [optCb])
Lists reactions made by a user.

**Kind**: instance method of <code>[ReactionsFacet](#ReactionsFacet)</code>  
**See**: [reactions.list](https://api.slack.com/methods/reactions.list)  

| Param | Type | Description |
| --- | --- | --- |
| [opts] | <code>Object</code> |  |
| opts.user | <code>?</code> | Show reactions made by this user. Defaults to the authed user. |
| opts.full | <code>?</code> | If true always return the complete reaction list. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ReactionsFacet+remove"></a>

### reactionsFacet.remove(name, [opts], [optCb])
Removes a reaction from an item.

**Kind**: instance method of <code>[ReactionsFacet](#ReactionsFacet)</code>  
**See**: [reactions.remove](https://api.slack.com/methods/reactions.remove)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>?</code> | Reaction (emoji) name. |
| [opts] | <code>Object</code> |  |
| opts.file | <code>?</code> | File to remove reaction from. |
| opts.file_comment | <code>?</code> | File comment to remove reaction from. |
| opts.channel | <code>?</code> | Channel where the message to remove reaction from was posted. |
| opts.timestamp | <code>?</code> | Timestamp of the message to remove reaction from. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

