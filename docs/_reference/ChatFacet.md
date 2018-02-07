---
layout: page
title: ChatFacet
permalink: /reference/ChatFacet
---
**Kind**: global class  

* [ChatFacet](#ChatFacet)
    * [.delete(ts, channel, [opts], [optCb])](#ChatFacet+delete)
    * [.meMessage(channel, text, [optCb])](#ChatFacet+meMessage)
    * [.postEphemeral(channel, text, user, [opts], [optCb])](#ChatFacet+postEphemeral)
    * [.postMessage(channel, text, [opts], [optCb])](#ChatFacet+postMessage)
    * [.update(ts, channel, text, [opts], [optCb])](#ChatFacet+update)
    * [.unfurl(ts, channel, unfurls, [opts], [optCb])](#ChatFacet+unfurl)
    * [.getPermalink(channel, ts, [optCb])](#ChatFacet+getPermalink)

<a name="ChatFacet+delete"></a>

### chatFacet.delete(ts, channel, [opts], [optCb])
Deletes a message.

**Kind**: instance method of <code>[ChatFacet](#ChatFacet)</code>  
**See**: [chat.delete](https://api.slack.com/methods/chat.delete)  

| Param | Type | Description |
| --- | --- | --- |
| ts | <code>?</code> | Timestamp of the message to be deleted. |
| channel | <code>?</code> | Channel containing the message to be deleted. |
| [opts] | <code>Object</code> |  |
| opts.as_user | <code>?</code> | Pass true to delete the message as the authed user. [Bot   users](/bot-users) in this context are considered authed users. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ChatFacet+meMessage"></a>

### chatFacet.meMessage(channel, text, [optCb])
Share a me message into a channel.

**Kind**: instance method of <code>[ChatFacet](#ChatFacet)</code>  
**See**: [chat.meMessage](https://api.slack.com/methods/chat.meMessage)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Channel to send message to. Can be a public channel, private group or IM   channel. Can be an encoded ID, or a name. |
| text | <code>?</code> | Text of the message to send. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ChatFacet+postEphemeral"></a>

### chatFacet.postEphemeral(channel, text, user, [opts], [optCb])
Sends an ephemeral message to a user in a channel.

**Kind**: instance method of <code>[ChatFacet](#ChatFacet)</code>  
**See**: [chat.postEphemeral](https://api.slack.com/methods/chat.postEphemeral)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Channel, private group, or IM channel to send message to. Can be an   encoded ID, or a name. See [below](#channels) for more details. |
| text | <code>?</code> | Text of the message to send. See below for an explanation of   [formatting](#formatting). This field is usually required, unless you're providing only   `attachments` instead. |
| user | <code>?</code> | `id` of the user who will receive the ephemeral message.   The user should be in the channel specified by the `channel` argument. |
| [opts] | <code>Object</code> |  |
| opts.parse | <code>?</code> | Change how messages are treated. Defaults to `none`. See   [below](#formatting). |
| opts.link_names | <code>?</code> | Find and link channel names and usernames. |
| opts.attachments | <code>?</code> | Structured message attachments. |
| opts.as_user | <code>?</code> | Pass true to post the message as the authed user, instead of as a   bot. Defaults to false. See [authorship](#authorship) below. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ChatFacet+postMessage"></a>

### chatFacet.postMessage(channel, text, [opts], [optCb])
Sends a message to a channel.

**Kind**: instance method of <code>[ChatFacet](#ChatFacet)</code>  
**See**: [chat.postMessage](https://api.slack.com/methods/chat.postMessage)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | Channel, private group, or IM channel to send message to. Can be an   encoded ID, or a name. See [below](#channels) for more details. |
| text | <code>?</code> | Text of the message to send. See below for an explanation of   [formatting](#formatting). This field is usually required, unless you're providing only   `attachments` instead. |
| [opts] | <code>Object</code> |  |
| opts.parse | <code>?</code> | Change how messages are treated. Defaults to `none`. See   [below](#formatting). |
| opts.link_names | <code>?</code> | Find and link channel names and usernames. |
| opts.attachments | <code>?</code> | Structured message attachments. |
| opts.unfurl_links | <code>?</code> | Pass true to enable unfurling of primarily text-based content. |
| opts.unfurl_media | <code>?</code> | Pass false to disable unfurling of media content. |
| opts.username | <code>?</code> | Set your bot's user name. Must be used in conjunction with `as_user`   set to false, otherwise ignored. See [authorship](#authorship) below. |
| opts.as_user | <code>?</code> | Pass true to post the message as the authed user, instead of as a   bot. Defaults to false. See [authorship](#authorship) below. |
| opts.icon_url | <code>?</code> | URL to an image to use as the icon for this message. Must be used in   conjunction with `as_user` set to false, otherwise ignored. See [authorship](#authorship)   below. |
| opts.icon_emoji | <code>?</code> | emoji to use as the icon for this message. Overrides `icon_url`.   Must be used in conjunction with `as_user` set to false, otherwise ignored. See   [authorship](#authorship) below. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ChatFacet+update"></a>

### chatFacet.update(ts, channel, text, [opts], [optCb])
Updates a message.

**Kind**: instance method of <code>[ChatFacet](#ChatFacet)</code>  
**See**: [chat.update](https://api.slack.com/methods/chat.update)  

| Param | Type | Description |
| --- | --- | --- |
| ts | <code>?</code> | Timestamp of the message to be updated. |
| channel | <code>?</code> | Channel containing the message to be updated. |
| text | <code>?</code> | New text for the message, using the [default formatting   rules](/docs/formatting). |
| [opts] | <code>Object</code> |  |
| opts.attachments | <code>?</code> | Structured message attachments. |
| opts.parse | <code>?</code> | Change how messages are treated. Defaults to `client`, unlike   `chat.postMessage`. See [below](#formatting). |
| opts.link_names | <code>?</code> | Find and link channel names and usernames. Defaults to `none`.   This parameter should be used in conjunction with `parse`. To set `link_names` to `1`, specify   a `parse` mode of `full`. |
| opts.as_user | <code>?</code> | Pass true to update the message as the authed user. [Bot   users](/bot-users) in this context are considered authed users. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ChatFacet+unfurl"></a>

### chatFacet.unfurl(ts, channel, unfurls, [opts], [optCb])
Unfurl a URL within a message by defining its message attachment.

**Kind**: instance method of <code>[ChatFacet](#ChatFacet)</code>  
**See**: [chat.unfurl](https://api.slack.com/methods/chat.unfurl)  

| Param | Type | Description |
| --- | --- | --- |
| ts | <code>?</code> | Timestamp of the message to be updated. |
| channel | <code>?</code> | Channel of the message to be updated. |
| unfurls | <code>string</code> | a map of URLs to structured message attachments |
| [opts] | <code>Object</code> |  |
| opts.user_auth_required | <code>?</code> | Pass true to require user authorization. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

<a name="ChatFacet+getPermalink"></a>

### chatFacet.getPermalink(channel, ts, [optCb])
Retrieve a permalink URL for a specific extant message.

**Kind**: instance method of <code>[ChatFacet](#ChatFacet)</code>  
**See**: [chat.getPermalink](https://api.slack.com/methods/chat.getPermalink)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>?</code> | The ID of the conversation or channel containing the message. |
| ts | <code>?</code> | A message's ts value, uniquely identifying it within a channel. |
| [optCb] | <code>function</code> | Optional callback, if not using promises. |

