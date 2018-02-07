---
layout: page
title: RtmFacet
permalink: /reference/RtmFacet
---
**Kind**: global class  

* [RtmFacet](#RtmFacet)
    * [.start(opts, optCb)](#RtmFacet+start)
    * [.connect(opts, optCb)](#RtmFacet+connect)

<a name="RtmFacet+start"></a>

### rtmFacet.start(opts, optCb)
Starts a Real Time Messaging session.

**Kind**: instance method of <code>[RtmFacet](#RtmFacet)</code>  
**See**: [rtm.start](https://api.slack.com/methods/rtm.start)  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> |  |
| opts.simple_latest | <code>Boolean</code> | Return timestamp only for latest message object of each                                      channel (improves performance). |
| opts.no_unreads | <code>Boolean</code> | Skip unread counts for each channel (improves performance). |
| opts.mpim_aware | <code>Boolean</code> | Returns MPIMs to the client in the API response. |
| opts.presence_sub | <code>Boolean</code> | Support presence subscriptions on this socket connection. |
| opts.include_locale | <code>Boolean</code> | Set this to `true` to receive the locale for users and                                      channels. Defaults to `false` |
| optCb | <code>function</code> | Optional callback, if not using promises. |

<a name="RtmFacet+connect"></a>

### rtmFacet.connect(opts, optCb)
Starts a Real Time Messaging session using the lighter-weight rtm.connect.
This will give us a WebSocket URL without the payload of `rtm.start`.

**Kind**: instance method of <code>[RtmFacet](#RtmFacet)</code>  
**See**: [rtm.connect](https://api.slack.com/methods/rtm.connect)  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> |  |
| opts.presence_sub | <code>Boolean</code> | Support presence subscriptions on this socket connection. |
| optCb | <code>function</code> | Optional callback, if not using promises. |

