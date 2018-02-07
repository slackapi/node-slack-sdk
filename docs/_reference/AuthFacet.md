---
layout: page
title: AuthFacet
permalink: /reference/AuthFacet
---
**Kind**: global class  

* [AuthFacet](#AuthFacet)
    * [.revoke([opts], [optCb])](#AuthFacet+revoke)
    * [.test([optCb])](#AuthFacet+test)

<a name="AuthFacet+revoke"></a>

### authFacet.revoke([opts], [optCb])
Revokes a token.

**Kind**: instance method of <code>[AuthFacet](#AuthFacet)</code>  
**See**: [auth.revoke](https://api.slack.com/methods/auth.revoke)  

| Param | Type | Description |
| --- | --- | --- |
| [opts] | <code>Object</code> |  |
| opts.test | <code>?</code> | Setting this parameter to `1` triggers a _testing mode_ where the   specified token will not actually be revoked. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="AuthFacet+test"></a>

### authFacet.test([optCb])
Checks authentication & identity.

**Kind**: instance method of <code>[AuthFacet](#AuthFacet)</code>  
**See**: [auth.test](https://api.slack.com/methods/auth.test)  

| Param | Type | Description |
| --- | --- | --- |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

