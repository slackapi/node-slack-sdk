---
layout: page
title: DndFacet
permalink: /reference/DndFacet
---
**Kind**: global class  

* [DndFacet](#DndFacet)
    * [.endDnd([optCb])](#DndFacet+endDnd)
    * [.endSnooze([optCb])](#DndFacet+endSnooze)
    * [.info([opts], [optCb])](#DndFacet+info)
    * [.setSnooze(num_minutes, [optCb])](#DndFacet+setSnooze)
    * [.teamInfo([opts], [optCb])](#DndFacet+teamInfo)

<a name="DndFacet+endDnd"></a>

### dndFacet.endDnd([optCb])
Ends the current user's Do Not Disturb session immediately.

**Kind**: instance method of <code>[DndFacet](#DndFacet)</code>  
**See**: [dnd.endDnd](https://api.slack.com/methods/dnd.endDnd)  

| Param | Type | Description |
| --- | --- | --- |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="DndFacet+endSnooze"></a>

### dndFacet.endSnooze([optCb])
Ends the current user's snooze mode immediately.

**Kind**: instance method of <code>[DndFacet](#DndFacet)</code>  
**See**: [dnd.endSnooze](https://api.slack.com/methods/dnd.endSnooze)  

| Param | Type | Description |
| --- | --- | --- |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="DndFacet+info"></a>

### dndFacet.info([opts], [optCb])
Retrieves a user's current Do Not Disturb status.

**Kind**: instance method of <code>[DndFacet](#DndFacet)</code>  
**See**: [dnd.info](https://api.slack.com/methods/dnd.info)  

| Param | Type | Description |
| --- | --- | --- |
| [opts] | <code>Object</code> |  |
| opts.user | <code>?</code> | User to fetch status for (defaults to current user) |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="DndFacet+setSnooze"></a>

### dndFacet.setSnooze(num_minutes, [optCb])
Turns on Do Not Disturb mode for the current user, or changes its duration.

**Kind**: instance method of <code>[DndFacet](#DndFacet)</code>  
**See**: [dnd.setSnooze](https://api.slack.com/methods/dnd.setSnooze)  

| Param | Type | Description |
| --- | --- | --- |
| num_minutes | <code>?</code> | Number of minutes, from now, to snooze until. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="DndFacet+teamInfo"></a>

### dndFacet.teamInfo([opts], [optCb])
Retrieves the Do Not Disturb status for users on a team.

**Kind**: instance method of <code>[DndFacet](#DndFacet)</code>  
**See**: [dnd.teamInfo](https://api.slack.com/methods/dnd.teamInfo)  

| Param | Type | Description |
| --- | --- | --- |
| [opts] | <code>Object</code> |  |
| opts.users | <code>?</code> | Comma-separated list of users to fetch Do Not Disturb status for |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

