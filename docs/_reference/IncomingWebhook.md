---
layout: page
title: IncomingWebhook
permalink: /reference/IncomingWebhook
---
A client for Slack's Incoming Webhooks

**Kind**: static class of [<code>@slack/client</code>](#module_@slack/client)  
<a name="module_@slack/client.IncomingWebhook+send"></a>

### incomingWebhook.send(message, callback)
Send a notification to a conversation

**Kind**: instance method of [<code>IncomingWebhook</code>](#module_@slack/client.IncomingWebhook)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> \| [<code>IncomingWebhookSendArguments</code>](#module_@slack/client.IncomingWebhookSendArguments) | the message (a simple string, or an object describing the message) |
| callback | [<code>IncomingWebhookResultCallback</code>](#module_@slack/client.IncomingWebhookResultCallback) |  |

