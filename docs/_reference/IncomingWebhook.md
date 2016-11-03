---
layout: page
title: IncomingWebhook
permalink: /reference/IncomingWebhook
---
**Kind**: global class  

* [IncomingWebhook](#IncomingWebhook)
    * [new IncomingWebhook(slackUrl, defaults)](#new_IncomingWebhook_new)
    * [.send(message, [optCb])](#IncomingWebhook+send)

<a name="new_IncomingWebhook_new"></a>

### new IncomingWebhook(slackUrl, defaults)

| Param | Type | Description |
| --- | --- | --- |
| slackUrl | <code>String</code> |  |
| defaults | <code>object</code> |  |
| defaults.username | <code>string</code> | The default username to use when sending a webhook.      If no username is specified, the one chosen when creating the webhook will be used. |
| defaults.iconEmoji | <code>string</code> | The default emoji to use when sending a webhook.      If no iconEmoji is specified, the one chosen when creating the webhook will be used. |
| defaults.channel | <code>string</code> | The default channel to use when sending a webhook.      If no channel is specified, the one chosen when creating the webhook will be used. |
| defaults.text | <code>string</code> | The default text to use when sending a webhook. |

<a name="IncomingWebhook+send"></a>

### incomingWebhook.send(message, [optCb])
Sends a message via an incoming webhook

**Kind**: instance method of <code>[IncomingWebhook](#IncomingWebhook)</code>  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> &#124; <code>Object</code> | The message to send. Can be text or an object that     overrides the defaults in initialization. |
| [optCb] | <code>function</code> |  |

