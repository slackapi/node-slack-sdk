---
layout: page
title: IncomingWebhook
permalink: /reference/IncomingWebhook
---
A client for Slack's Incoming Webhooks

**Kind**: static class of [<code>@slack/client</code>](#module_@slack/client)  

* [.IncomingWebhook](#module_@slack/client.IncomingWebhook)
    * [.send(message)](#module_@slack/client.IncomingWebhook+send) ⇒ <code>Promise.&lt;module:@slack/client/dist/IncomingWebhook.IncomingWebhookResult&gt;</code>
    * [.send(message, callback)](#module_@slack/client.IncomingWebhook+send)
    * [.send(message, callback)](#module_@slack/client.IncomingWebhook+send)

<a name="module_@slack/client.IncomingWebhook+send"></a>

### incomingWebhook.send(message) ⇒ <code>Promise.&lt;module:@slack/client/dist/IncomingWebhook.IncomingWebhookResult&gt;</code>
Send a notification to a conversation

**Kind**: instance method of [<code>IncomingWebhook</code>](#module_@slack/client.IncomingWebhook)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> \| [<code>IncomingWebhookSendArguments</code>](#module_@slack/client.IncomingWebhookSendArguments) | the message (a simple string, or an object describing the message) |

<a name="module_@slack/client.IncomingWebhook+send"></a>

### incomingWebhook.send(message, callback)
**Kind**: instance method of [<code>IncomingWebhook</code>](#module_@slack/client.IncomingWebhook)  

| Param | Type |
| --- | --- |
| message | <code>string</code> \| [<code>IncomingWebhookSendArguments</code>](#module_@slack/client.IncomingWebhookSendArguments) | 
| callback | [<code>IncomingWebhookResultCallback</code>](#module_@slack/client.IncomingWebhookResultCallback) | 

<a name="module_@slack/client.IncomingWebhook+send"></a>

### incomingWebhook.send(message, callback)
**Kind**: instance method of [<code>IncomingWebhook</code>](#module_@slack/client.IncomingWebhook)  

| Param | Type |
| --- | --- |
| message | <code>string</code> \| [<code>IncomingWebhookSendArguments</code>](#module_@slack/client.IncomingWebhookSendArguments) | 
| callback | [<code>IncomingWebhookResultCallback</code>](#module_@slack/client.IncomingWebhookResultCallback) | 

