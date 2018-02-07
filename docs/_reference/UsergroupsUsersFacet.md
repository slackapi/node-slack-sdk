---
layout: page
title: UsergroupsUsersFacet
permalink: /reference/UsergroupsUsersFacet
---
**Kind**: global class  

* [UsergroupsUsersFacet](#UsergroupsUsersFacet)
    * [.list(usergroup, [opts], [optCb])](#UsergroupsUsersFacet+list)
    * [.update(usergroup, users, [opts], [optCb])](#UsergroupsUsersFacet+update)

<a name="UsergroupsUsersFacet+list"></a>

### usergroupsUsersFacet.list(usergroup, [opts], [optCb])
List all users in a User Group

**Kind**: instance method of <code>[UsergroupsUsersFacet](#UsergroupsUsersFacet)</code>  
**See**: [usergroups.users.list](https://api.slack.com/methods/usergroups.users.list)  

| Param | Type | Description |
| --- | --- | --- |
| usergroup | <code>?</code> | The encoded ID of the User Group to update. |
| [opts] | <code>Object</code> |  |
| opts.include_disabled | <code>?</code> | Allow results that involve disabled User Groups. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="UsergroupsUsersFacet+update"></a>

### usergroupsUsersFacet.update(usergroup, users, [opts], [optCb])
Update the list of users for a User Group

**Kind**: instance method of <code>[UsergroupsUsersFacet](#UsergroupsUsersFacet)</code>  
**See**: [usergroups.users.update](https://api.slack.com/methods/usergroups.users.update)  

| Param | Type | Description |
| --- | --- | --- |
| usergroup | <code>?</code> | The encoded ID of the User Group to update. |
| users | <code>?</code> | A comma separated string of encoded user IDs that represent the entire list   of users for the User Group. |
| [opts] | <code>Object</code> |  |
| opts.include_count | <code>?</code> | Include the number of users in the User Group. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

