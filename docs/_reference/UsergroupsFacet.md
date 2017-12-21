---
layout: page
title: UsergroupsFacet
permalink: /reference/UsergroupsFacet
---
**Kind**: global class  

* [UsergroupsFacet](#UsergroupsFacet)
    * [.create(name, [opts], [optCb])](#UsergroupsFacet+create)
    * [.disable(usergroup, [opts], [optCb])](#UsergroupsFacet+disable)
    * [.enable(usergroup, [opts], [optCb])](#UsergroupsFacet+enable)
    * [.list([opts], [optCb])](#UsergroupsFacet+list)
    * [.update(usergroup, [opts], [optCb])](#UsergroupsFacet+update)

<a name="UsergroupsFacet+create"></a>

### usergroupsFacet.create(name, [opts], [optCb])
Create a User Group

**Kind**: instance method of <code>[UsergroupsFacet](#UsergroupsFacet)</code>  
**See**: [usergroups.create](https://api.slack.com/methods/usergroups.create)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>?</code> | A name for the User Group. Must be unique among User Groups. |
| [opts] | <code>Object</code> |  |
| opts.handle | <code>?</code> | A mention handle. Must be unique among channels, users and User   Groups. |
| opts.description | <code>?</code> | A short description of the User Group. |
| opts.channels | <code>?</code> | A comma separated string of encoded channel IDs for which the User   Group uses as a default. |
| opts.include_count | <code>?</code> | Include the number of users in each User Group. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="UsergroupsFacet+disable"></a>

### usergroupsFacet.disable(usergroup, [opts], [optCb])
Disable an existing User Group

**Kind**: instance method of <code>[UsergroupsFacet](#UsergroupsFacet)</code>  
**See**: [usergroups.disable](https://api.slack.com/methods/usergroups.disable)  

| Param | Type | Description |
| --- | --- | --- |
| usergroup | <code>?</code> | The encoded ID of the User Group to disable. |
| [opts] | <code>Object</code> |  |
| opts.include_count | <code>?</code> | Include the number of users in the User Group. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="UsergroupsFacet+enable"></a>

### usergroupsFacet.enable(usergroup, [opts], [optCb])
Enable a User Group

**Kind**: instance method of <code>[UsergroupsFacet](#UsergroupsFacet)</code>  
**See**: [usergroups.enable](https://api.slack.com/methods/usergroups.enable)  

| Param | Type | Description |
| --- | --- | --- |
| usergroup | <code>?</code> | The encoded ID of the User Group to enable. |
| [opts] | <code>Object</code> |  |
| opts.include_count | <code>?</code> | Include the number of users in the User Group. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="UsergroupsFacet+list"></a>

### usergroupsFacet.list([opts], [optCb])
List all User Groups for a team

**Kind**: instance method of <code>[UsergroupsFacet](#UsergroupsFacet)</code>  
**See**: [usergroups.list](https://api.slack.com/methods/usergroups.list)  

| Param | Type | Description |
| --- | --- | --- |
| [opts] | <code>Object</code> |  |
| opts.include_disabled | <code>?</code> | Include disabled User Groups. |
| opts.include_count | <code>?</code> | Include the number of users in each User Group. |
| opts.include_users | <code>?</code> | Include the list of users for each User Group. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="UsergroupsFacet+update"></a>

### usergroupsFacet.update(usergroup, [opts], [optCb])
Update an existing User Group

**Kind**: instance method of <code>[UsergroupsFacet](#UsergroupsFacet)</code>  
**See**: [usergroups.update](https://api.slack.com/methods/usergroups.update)  

| Param | Type | Description |
| --- | --- | --- |
| usergroup | <code>?</code> | The encoded ID of the User Group to update. |
| [opts] | <code>Object</code> |  |
| opts.name | <code>?</code> | A name for the User Group. Must be unique among User Groups. |
| opts.handle | <code>?</code> | A mention handle. Must be unique among channels, users and User   Groups. |
| opts.description | <code>?</code> | A short description of the User Group. |
| opts.channels | <code>?</code> | A comma separated string of encoded channel IDs for which the User   Group uses as a default. |
| opts.include_count | <code>?</code> | Include the number of users in the User Group. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

