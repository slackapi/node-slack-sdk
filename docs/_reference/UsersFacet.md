---
layout: page
title: UsersFacet
permalink: /reference/UsersFacet
---
**Kind**: global class  

* [UsersFacet](#UsersFacet)
    * [.getPresence(user, [optCb])](#UsersFacet+getPresence)
    * [.identity([options], [optCb])](#UsersFacet+identity)
    * [.info(user, [optCb])](#UsersFacet+info)
    * [.list([opts], [optCb])](#UsersFacet+list)
    * [.lookupByEmail(email, [opts], [optCb])](#UsersFacet+lookupByEmail)
    * [.setActive([optCb])](#UsersFacet+setActive)
    * [.setPresence(presence, [optCb])](#UsersFacet+setPresence)

<a name="UsersFacet+getPresence"></a>

### usersFacet.getPresence(user, [optCb])
Gets user presence information.

**Kind**: instance method of <code>[UsersFacet](#UsersFacet)</code>  
**See**: [users.getPresence](https://api.slack.com/methods/users.getPresence)  

| Param | Type | Description |
| --- | --- | --- |
| user | <code>?</code> | User to get presence info on. Defaults to the authed user. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="UsersFacet+identity"></a>

### usersFacet.identity([options], [optCb])
Get a user's identity.

**Kind**: instance method of <code>[UsersFacet](#UsersFacet)</code>  
**See**: [users.identity](https://api.slack.com/methods/users.identity)  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> |  |
| opts.user | <code>?</code> | When calling this method with a workspace token, set this to the user ID of the user to retrieve the identity of |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="UsersFacet+info"></a>

### usersFacet.info(user, [optCb])
Gets information about a user.

**Kind**: instance method of <code>[UsersFacet](#UsersFacet)</code>  
**See**: [users.info](https://api.slack.com/methods/users.info)  

| Param | Type | Description |
| --- | --- | --- |
| user | <code>?</code> | User to get info on |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="UsersFacet+list"></a>

### usersFacet.list([opts], [optCb])
Lists all users in a Slack team.

**Kind**: instance method of <code>[UsersFacet](#UsersFacet)</code>  
**See**: [users.list](https://api.slack.com/methods/users.list)  

| Param | Type | Description |
| --- | --- | --- |
| [opts] | <code>Object</code> |  |
| opts.presence | <code>?</code> | Whether to include presence data in the output |
| opts.include_locale | <code>?</code> | Set this to `true` to receive the locale for users. Defaults to `false` |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="UsersFacet+lookupByEmail"></a>

### usersFacet.lookupByEmail(email, [opts], [optCb])
Find a user with an email address.

**Kind**: instance method of <code>[UsersFacet](#UsersFacet)</code>  
**See**: [users.lookupByEmail](https://api.slack.com/methods/users.lookupByEmail)  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>?</code> | An email address belonging to a user in the workspace |
| [opts] | <code>Object</code> |  |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="UsersFacet+setActive"></a>

### usersFacet.setActive([optCb])
Marks a user as active.

**Kind**: instance method of <code>[UsersFacet](#UsersFacet)</code>  
**See**: [users.setActive](https://api.slack.com/methods/users.setActive)  

| Param | Type | Description |
| --- | --- | --- |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="UsersFacet+setPresence"></a>

### usersFacet.setPresence(presence, [optCb])
Manually sets user presence.

**Kind**: instance method of <code>[UsersFacet](#UsersFacet)</code>  
**See**: [users.setPresence](https://api.slack.com/methods/users.setPresence)  

| Param | Type | Description |
| --- | --- | --- |
| presence | <code>?</code> | Either `auto` or `away` |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

