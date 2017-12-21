---
layout: page
title: UsersProfileFacet
permalink: /reference/UsersProfileFacet
---
**Kind**: global class  

* [UsersProfileFacet](#UsersProfileFacet)
    * [.get(user, include_labels, [optCb])](#UsersProfileFacet+get)
    * [.set(user, profile, name, value, [optCb])](#UsersProfileFacet+set)

<a name="UsersProfileFacet+get"></a>

### usersProfileFacet.get(user, include_labels, [optCb])
This method is used to get the profile information for a user.

**Kind**: instance method of <code>[UsersProfileFacet](#UsersProfileFacet)</code>  
**See**: [users.profile.get](https://api.slack.com/methods/users.profile.get)  

| Param | Type | Description |
| --- | --- | --- |
| user | <code>?</code> | User to retrieve profile info for |
| include_labels | <code>?</code> | Include labels for each ID in custom profile fields |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="UsersProfileFacet+set"></a>

### usersProfileFacet.set(user, profile, name, value, [optCb])
This method is used to set the profile information for a user.

**Kind**: instance method of <code>[UsersProfileFacet](#UsersProfileFacet)</code>  
**See**: [users.profile.set](https://api.slack.com/methods/users.profile.set)  

| Param | Type | Description |
| --- | --- | --- |
| user | <code>?</code> | ID of user to change. This argument may only be specified by team admins on   paid teams. |
| profile | <code>?</code> | Collection of key:value pairs presented as a URL-encoded JSON hash. |
| name | <code>?</code> | Name of a single key to set. Usable only if profile is not passed. |
| value | <code>?</code> | Value to set a single key to. Usable only if profile is not passed. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

