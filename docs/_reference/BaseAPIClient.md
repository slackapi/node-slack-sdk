---
layout: page
title: BaseAPIClient
permalink: /reference/BaseAPIClient
---
**Kind**: global class  

* [BaseAPIClient](#BaseAPIClient)
    * [new BaseAPIClient(token, opts)](#new_BaseAPIClient_new)
    * [.slackAPIUrl](#BaseAPIClient+slackAPIUrl) : <code>String</code>
    * [.transport](#BaseAPIClient+transport) : <code>function</code>
    * [.retryConfig](#BaseAPIClient+retryConfig)
    * [.logger](#BaseAPIClient+logger) : <code>function</code>
    * [._createFacets()](#BaseAPIClient+_createFacets)
    * [.registerDataStore(dataStore)](#BaseAPIClient+registerDataStore)
    * [.clearQueue()](#BaseAPIClient+clearQueue)
    * [._callTransport(task, queueCb)](#BaseAPIClient+_callTransport)

<a name="new_BaseAPIClient_new"></a>

### new BaseAPIClient(token, opts)
Base client for both the RTM and web APIs.


| Param | Type | Description |
| --- | --- | --- |
| token | <code>String</code> | The Slack API token to use with this client |
| opts | <code>Object</code> |  |
| opts.slackAPIUrl | <code>String</code> | The Slack API URL |
| opts.transport | <code>function</code> | Function to call to make an HTTP call to the Slack API |
| opts.logLevel | <code>String</code> | The log level for the logger |
| opts.logger | <code>function</code> | Function to use for log calls, takes (logLevel, logString) |
| opts.maxRequestConcurrency | <code>Number</code> | Max number of concurrent requests to make to Slack's API's, defaults to 3 |
| opts.retryConfig | <code>Object</code> | The configuration to use for the retry operation, {@see https://github.com/SEAPUNK/node-retry} |

<a name="BaseAPIClient+slackAPIUrl"></a>

### baseAPIClient.slackAPIUrl : <code>String</code>
**Kind**: instance property of <code>[BaseAPIClient](#BaseAPIClient)</code>  
<a name="BaseAPIClient+transport"></a>

### baseAPIClient.transport : <code>function</code>
**Kind**: instance property of <code>[BaseAPIClient](#BaseAPIClient)</code>  
<a name="BaseAPIClient+retryConfig"></a>

### baseAPIClient.retryConfig
Default to retrying forever with an exponential backoff, capped at thirty
minutes but with some randomization.

**Kind**: instance property of <code>[BaseAPIClient](#BaseAPIClient)</code>  
<a name="BaseAPIClient+logger"></a>

### baseAPIClient.logger : <code>function</code>
The logger function attached to this client.

**Kind**: instance property of <code>[BaseAPIClient](#BaseAPIClient)</code>  
<a name="BaseAPIClient+_createFacets"></a>

### baseAPIClient._createFacets()
Initializes each of the API facets.

**Kind**: instance method of <code>[BaseAPIClient](#BaseAPIClient)</code>  
**Access:** protected  
<a name="BaseAPIClient+registerDataStore"></a>

### baseAPIClient.registerDataStore(dataStore)
Attaches a data-store to the client instance.

**Kind**: instance method of <code>[BaseAPIClient](#BaseAPIClient)</code>  

| Param | Type |
| --- | --- |
| dataStore | <code>[SlackDataStore](#SlackDataStore)</code> | 

<a name="BaseAPIClient+clearQueue"></a>

### baseAPIClient.clearQueue()
Empties the request queue and returns it to a clean slate.

**Kind**: instance method of <code>[BaseAPIClient](#BaseAPIClient)</code>  
<a name="BaseAPIClient+_callTransport"></a>

### baseAPIClient._callTransport(task, queueCb)
Calls the supplied transport function and processes the results.

This will also manage 429 responses and retry failed operations.

**Kind**: instance method of <code>[BaseAPIClient](#BaseAPIClient)</code>  
**Access:** protected  

| Param | Type | Description |
| --- | --- | --- |
| task | <code>object</code> | The arguments to pass to the transport. |
| queueCb | <code>function</code> | Callback to signal to the request queue that the request has completed. |

