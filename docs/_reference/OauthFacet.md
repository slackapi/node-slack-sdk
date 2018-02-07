---
layout: page
title: OauthFacet
permalink: /reference/OauthFacet
---
**Kind**: global class  
<a name="OauthFacet+access"></a>

### oauthFacet.access(client_id, client_secret, code, [opts], [optCb])
Exchanges a temporary OAuth code for an API token.

**Kind**: instance method of <code>[OauthFacet](#OauthFacet)</code>  
**See**: [oauth.access](https://api.slack.com/methods/oauth.access)  

| Param | Type | Description |
| --- | --- | --- |
| client_id | <code>?</code> | Issued when you created your application. |
| client_secret | <code>?</code> | Issued when you created your application. |
| code | <code>?</code> | The `code` param returned via the OAuth callback. |
| [opts] | <code>Object</code> |  |
| opts.redirect_uri | <code>?</code> | This must match the originally submitted URI (if one was sent). |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

