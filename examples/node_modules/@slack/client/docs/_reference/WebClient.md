---
layout: page
title: WebClient
permalink: /reference/WebClient
---
A client for Slack's Web API

This client provides an alias for each [Web API method](https://api.slack.com/methods). Each method is
a convenience wrapper for calling the [WebClient#apiCall](WebClient#apiCall) method using the method name as the first parameter.

**Kind**: static class of [<code>@slack/client</code>](#module_@slack/client)  
**Extends**: <code>EventEmitter</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [token] | <code>string</code> | Authentication and authorization token for accessing Slack Web API (usually begins with `xoxp`, `xoxb`, or `xoxa`) |
| [slackApiUrl] | <code>string</code> | The base URL for reaching Slack's Web API. Consider changing this value for testing purposes. |


* [.WebClient](#module_@slack/client.WebClient) ⇐ <code>EventEmitter</code>
    * [.apiCall(method, options)](#module_@slack/client.WebClient+apiCall) ⇒ [<code>Promise.&lt;WebAPICallResult&gt;</code>](#module_@slack/client.WebAPICallResult)
    * [.apiCall(method, options, callback)](#module_@slack/client.WebClient+apiCall)
    * [.apiCall(method, options, callback)](#module_@slack/client.WebClient+apiCall)

<a name="module_@slack/client.WebClient+apiCall"></a>

### webClient.apiCall(method, options) ⇒ [<code>Promise.&lt;WebAPICallResult&gt;</code>](#module_@slack/client.WebAPICallResult)
Generic method for calling a Web API method

**Kind**: instance method of [<code>WebClient</code>](#module_@slack/client.WebClient)  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | the Web API method to call {@see https://api.slack.com/methods} |
| options | [<code>WebAPICallOptions</code>](#module_@slack/client.WebAPICallOptions) | options |

<a name="module_@slack/client.WebClient+apiCall"></a>

### webClient.apiCall(method, options, callback)
**Kind**: instance method of [<code>WebClient</code>](#module_@slack/client.WebClient)  

| Param | Type |
| --- | --- |
| method | <code>string</code> | 
| options | [<code>WebAPICallOptions</code>](#module_@slack/client.WebAPICallOptions) | 
| callback | [<code>WebAPIResultCallback</code>](#module_@slack/client.WebAPIResultCallback) | 

<a name="module_@slack/client.WebClient+apiCall"></a>

### webClient.apiCall(method, options, callback)
**Kind**: instance method of [<code>WebClient</code>](#module_@slack/client.WebClient)  

| Param | Type |
| --- | --- |
| method | <code>string</code> | 
| options | [<code>WebAPICallOptions</code>](#module_@slack/client.WebAPICallOptions) | 
| callback | [<code>WebAPIResultCallback</code>](#module_@slack/client.WebAPIResultCallback) | 

