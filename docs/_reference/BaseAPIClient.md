---
layout: page
title: BaseAPIClient
permalink: /reference/BaseAPIClient
---
**Kind**: global class  

* [BaseAPIClient](#BaseAPIClient)
    * [new BaseAPIClient(token, [opts])](#new_BaseAPIClient_new)
    * [.slackAPIUrl](#BaseAPIClient+slackAPIUrl) : <code>string</code>
    * [.logger](#BaseAPIClient+logger) : <code>BaseAPIClient~logFn</code>
    * [.transport](#BaseAPIClient+transport) : <code>BaseAPIClient~transportFn</code>
    * [.retryConfig](#BaseAPIClient+retryConfig) : <code>Object</code>
    * [._createFacets()](#BaseAPIClient+_createFacets)
    * ~~[.registerDataStore(dataStore)](#BaseAPIClient+registerDataStore)~~
    * [._callTransport(task, queueCb)](#BaseAPIClient+_callTransport)

<a name="new_BaseAPIClient_new"></a>

### new BaseAPIClient(token, [opts])
Base client for both the RTM and web APIs.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| token | <code>string</code> |  | The Slack API token to use with this client. |
| [opts] | <code>Object</code> |  |  |
| [opts.slackAPIUrl] | <code>string</code> | <code>&quot;https://slack.com/api/&quot;</code> | The Slack API URL. |
| [opts.transport] | <code>BaseAPIClient~transportFn</code> |  | Function to call to make an HTTP call to the Slack API. |
| [opts.logLevel] | <code>string</code> | <code>&quot;info&quot;</code> | The log level for the logger. |
| [opts.logger] | <code>BaseAPIClient~logFn</code> |  | Function to use for log calls, takes (logLevel, logString) params. |
| [opts.maxRequestConcurrency] | <code>number</code> | <code>3</code> | The max # of concurrent requests to make to Slack's API |
| [opts.retryConfig] | <code>Object</code> |  | The configuration to use for the retry operation, see [node-retry](https://github.com/tim-kos/node-retry) for more details. |

<a name="BaseAPIClient+slackAPIUrl"></a>

### baseAPIClient.slackAPIUrl : <code>string</code>
**Kind**: instance property of <code>[BaseAPIClient](#BaseAPIClient)</code>  
<a name="BaseAPIClient+logger"></a>

### baseAPIClient.logger : <code>BaseAPIClient~logFn</code>
The logger function attached to this client.

**Kind**: instance property of <code>[BaseAPIClient](#BaseAPIClient)</code>  
<a name="BaseAPIClient+transport"></a>

### baseAPIClient.transport : <code>BaseAPIClient~transportFn</code>
**Kind**: instance property of <code>[BaseAPIClient](#BaseAPIClient)</code>  
<a name="BaseAPIClient+retryConfig"></a>

### baseAPIClient.retryConfig : <code>Object</code>
Default to retrying forever with an exponential backoff, capped at thirty
minutes but with some randomization.

**Kind**: instance property of <code>[BaseAPIClient](#BaseAPIClient)</code>  
<a name="BaseAPIClient+_createFacets"></a>

### baseAPIClient._createFacets()
Initializes each of the API facets.

**Kind**: instance method of <code>[BaseAPIClient](#BaseAPIClient)</code>  
**Access:** protected  
<a name="BaseAPIClient+registerDataStore"></a>

### ~~baseAPIClient.registerDataStore(dataStore)~~
***Deprecated***

Attaches a data-store to the client instance.

**Kind**: instance method of <code>[BaseAPIClient](#BaseAPIClient)</code>  

| Param | Type |
| --- | --- |
| dataStore | <code>[SlackDataStore](#SlackDataStore)</code> | 

<a name="BaseAPIClient+_callTransport"></a>

### baseAPIClient._callTransport(task, queueCb)
Calls the supplied transport function and processes the results.

This will also manage 429 responses and retry failed operations.

**Kind**: instance method of <code>[BaseAPIClient](#BaseAPIClient)</code>  
**Access:** protected  

| Param | Type | Description |
| --- | --- | --- |
| task | <code>Object</code> | The arguments to pass to the transport. |
| queueCb | <code>function</code> | Callback to signal to the request queue that the request has completed. |

