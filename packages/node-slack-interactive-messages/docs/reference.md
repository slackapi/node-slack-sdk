## Modules

<dl>
<dt><a href="#module_adapter">adapter</a></dt>
<dd></dd>
<dt><a href="#module_@slack/interactive-messages">@slack/interactive-messages</a></dt>
<dd></dd>
</dl>

<a name="module_adapter"></a>

## adapter

* [adapter](#module_adapter)
    * [module.exports](#exp_module_adapter--module.exports) ⏏
        * [.SlackMessageAdapter](#module_adapter--module.exports.SlackMessageAdapter)
            * [new exports.SlackMessageAdapter(signingSecret, [options])](#new_module_adapter--module.exports.SlackMessageAdapter_new)
            * [.createServer([path])](#module_adapter--module.exports.SlackMessageAdapter+createServer) ⇒ <code>Promise.&lt;NodeHttpServer&gt;</code>
            * [.start(port)](#module_adapter--module.exports.SlackMessageAdapter+start) ⇒ <code>Promise.&lt;void&gt;</code>
            * [.stop()](#module_adapter--module.exports.SlackMessageAdapter+stop) ⇒ <code>Promise.&lt;void&gt;</code>
            * [.expressMiddleware()](#module_adapter--module.exports.SlackMessageAdapter+expressMiddleware) ⇒ <code>ExpressMiddlewareFunc</code>
            * [.requestListener()](#module_adapter--module.exports.SlackMessageAdapter+requestListener) ⇒ <code>slackRequestListener</code>
            * [.action(matchingConstraints, callback)](#module_adapter--module.exports.SlackMessageAdapter+action) ⇒ <code>module:adapter--module.exports~SlackMessageAdapter</code>
            * [.options(matchingConstraints, callback)](#module_adapter--module.exports.SlackMessageAdapter+options) ⇒ <code>module:adapter--module.exports~SlackMessageAdapter</code>


* * *

<a name="exp_module_adapter--module.exports"></a>

### module.exports ⏏
**Kind**: Exported member  

* * *

<a name="module_adapter--module.exports.SlackMessageAdapter"></a>

#### module.exports.SlackMessageAdapter
An adapter for Slack's interactive message components such as buttons, menus, and dialogs.

**Kind**: static class of [<code>module.exports</code>](#exp_module_adapter--module.exports)  

* [.SlackMessageAdapter](#module_adapter--module.exports.SlackMessageAdapter)
    * [new exports.SlackMessageAdapter(signingSecret, [options])](#new_module_adapter--module.exports.SlackMessageAdapter_new)
    * [.createServer([path])](#module_adapter--module.exports.SlackMessageAdapter+createServer) ⇒ <code>Promise.&lt;NodeHttpServer&gt;</code>
    * [.start(port)](#module_adapter--module.exports.SlackMessageAdapter+start) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.stop()](#module_adapter--module.exports.SlackMessageAdapter+stop) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.expressMiddleware()](#module_adapter--module.exports.SlackMessageAdapter+expressMiddleware) ⇒ <code>ExpressMiddlewareFunc</code>
    * [.requestListener()](#module_adapter--module.exports.SlackMessageAdapter+requestListener) ⇒ <code>slackRequestListener</code>
    * [.action(matchingConstraints, callback)](#module_adapter--module.exports.SlackMessageAdapter+action) ⇒ <code>module:adapter--module.exports~SlackMessageAdapter</code>
    * [.options(matchingConstraints, callback)](#module_adapter--module.exports.SlackMessageAdapter+options) ⇒ <code>module:adapter--module.exports~SlackMessageAdapter</code>


* * *

<a name="new_module_adapter--module.exports.SlackMessageAdapter_new"></a>

##### new exports.SlackMessageAdapter(signingSecret, [options])
Create a message adapter.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| signingSecret | <code>string</code> |  | Slack app signing secret used to authenticate request |
| [options] | <code>Object</code> |  |  |
| [options.syncResponseTimeout] | <code>number</code> | <code>2500</code> | number of milliseconds to wait before flushing a syncrhonous response to an incoming request and falling back to an asynchronous response. |
| [options.lateResponseFallbackEnabled] | <code>boolean</code> | <code>true</code> | whether or not promises that resolve after the syncResponseTimeout can fallback to a request for the response_url. this only works in cases where the semantic meaning of the response and the response_url are the same. |


* * *

<a name="module_adapter--module.exports.SlackMessageAdapter+createServer"></a>

##### slackInteractions.createServer([path]) ⇒ <code>Promise.&lt;NodeHttpServer&gt;</code>
Create a server that dispatches Slack's interactive message actions and menu requests to this
message adapter instance. Use this method if your application will handle starting the server.

**Kind**: instance method of [<code>SlackMessageAdapter</code>](#module_adapter--module.exports.SlackMessageAdapter)  
**Returns**: <code>Promise.&lt;NodeHttpServer&gt;</code> - - A promise that resolves to an instance of http.Server and
will dispatch interactive message actions and options requests to this message adapter
instance. https://nodejs.org/dist/latest/docs/api/http.html#http_class_http_server  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [path] | <code>string</code> | <code>&quot;/slack/actions&quot;</code> | The path portion of the URL where the server will listen for requests from Slack's interactive messages. |


* * *

<a name="module_adapter--module.exports.SlackMessageAdapter+start"></a>

##### slackInteractions.start(port) ⇒ <code>Promise.&lt;void&gt;</code>
Start a built-in server that dispatches Slack's interactive message actions and menu requests
to this message adapter interface.

**Kind**: instance method of [<code>SlackMessageAdapter</code>](#module_adapter--module.exports.SlackMessageAdapter)  
**Returns**: <code>Promise.&lt;void&gt;</code> - - A promise that resolves once the server is ready  

| Param | Type |
| --- | --- |
| port | <code>number</code> | 


* * *

<a name="module_adapter--module.exports.SlackMessageAdapter+stop"></a>

##### slackInteractions.stop() ⇒ <code>Promise.&lt;void&gt;</code>
Stop the previously started built-in server.

**Kind**: instance method of [<code>SlackMessageAdapter</code>](#module_adapter--module.exports.SlackMessageAdapter)  
**Returns**: <code>Promise.&lt;void&gt;</code> - - A promise that resolves once the server is cleaned up.  

* * *

<a name="module_adapter--module.exports.SlackMessageAdapter+expressMiddleware"></a>

##### slackInteractions.expressMiddleware() ⇒ <code>ExpressMiddlewareFunc</code>
Create a middleware function that can be used to integrate with the `express` web framework
in order for incoming requests to be dispatched to this message adapter instance.

**Kind**: instance method of [<code>SlackMessageAdapter</code>](#module_adapter--module.exports.SlackMessageAdapter)  
**Returns**: <code>ExpressMiddlewareFunc</code> - - A middleware function http://expressjs.com/en/guide/using-middleware.html  

* * *

<a name="module_adapter--module.exports.SlackMessageAdapter+requestListener"></a>

##### slackInteractions.requestListener() ⇒ <code>slackRequestListener</code>
Create a request listener function that handles HTTP requests, verifies requests
and dispatches responses

**Kind**: instance method of [<code>SlackMessageAdapter</code>](#module_adapter--module.exports.SlackMessageAdapter)  

* * *

<a name="module_adapter--module.exports.SlackMessageAdapter+action"></a>

##### slackInteractions.action(matchingConstraints, callback) ⇒ <code>module:adapter--module.exports~SlackMessageAdapter</code>
Add a handler for an interactive message action.

Usually there's no need to be concerned with _how_ a message is sent to Slack, but the
following table describes it fully.

**Action**|**Return `object`**|**Return `Promise<object>`**|**Return `undefined`**|**Call `respond(message)`**|**Notes**
:-----:|:-----:|:-----:|:-----:|:-----:|:-----:
**Button Press**| Message in response | When resolved before `syncResposeTimeout` or `lateResponseFallbackEnabled: false`, message in response<br />When resolved after `syncResponseTimeout` and `lateResponseFallbackEnabled: true`, message in request to `response_url` | Empty response | Message in request to `response_url` | Create a new message instead of replacing using `replace_original: false`
**Menu Selection**| Message in response | When resolved before `syncResposeTimeout` or `lateResponseFallbackEnabled: false`, message in response<br />When resolved after `syncResponseTimeout` and `lateResponseFallbackEnabled: true`, message in request to `response_url` | Empty response | Message in request to `response_url` | Create a new message instead of replacing using `replace_original: false`
**Message Action** | Message in response | When resolved before `syncResposeTimeout` or `lateResponseFallbackEnabled: false`, message in response<br />When resolved after `syncResponseTimeout` and `lateResponseFallbackEnabled: true`, message in request to `response_url` | Empty response | Message in request to `response_url` |
**Dialog Submission**| Error list in response | Error list in response | Empty response | Message in request to `response_url` | Returning a Promise that takes longer than 3 seconds to resolve can result in the user seeing an error. Warning logged if a promise isn't completed before `syncResponseTimeout`.

**Kind**: instance method of [<code>SlackMessageAdapter</code>](#module_adapter--module.exports.SlackMessageAdapter)  
**Returns**: <code>module:adapter--module.exports~SlackMessageAdapter</code> - - this instance (for chaining)  

| Param | Type | Description |
| --- | --- | --- |
| matchingConstraints | <code>Object</code> \| <code>string</code> \| <code>RegExp</code> | the callback ID (as a string or RegExp) or an object describing the constraints to match actions for the handler. |
| [matchingConstraints.callbackId] | <code>string</code> \| <code>RegExp</code> | a string or RegExp to match against the `callback_id` |
| [matchingConstraints.blockId] | <code>string</code> \| <code>RegExp</code> | a string or RegExp to match against the `block_id` |
| [matchingConstraints.actionId] | <code>string</code> \| <code>RegExp</code> | a string or RegExp to match against the `action_id` |
| [matchingConstraints.type] | <code>string</code> | valid types include all [actions block elements](https://api.slack.com/reference/messaging/interactive-components), `select` only for menu selections, or `dialog_submission` only for dialog submissions |
| [matchingConstraints.unfurl] | <code>boolean</code> | when `true` only match actions from an unfurl |
| callback | [<code>ActionHandler</code>](#module_adapter--module.exports..SlackMessageAdapter..ActionHandler) | the function to run when an action is matched |


* * *

<a name="module_adapter--module.exports.SlackMessageAdapter+options"></a>

##### slackInteractions.options(matchingConstraints, callback) ⇒ <code>module:adapter--module.exports~SlackMessageAdapter</code>
Add a handler for an options request

Usually there's no need to be concerned with _how_ a message is sent to Slack, but the
following table describes it fully

&nbsp;|**Return `options`**|**Return `Promise<options>`**|**Return `undefined`**|**Notes**
:-----:|:-----:|:-----:|:-----:|:-----:
**Options Request**| Options in response | Options in response | Empty response | Returning a Promise that takes longer than 3 seconds to resolve can result in the user seeing an error. If the request is from within a dialog, the `text` field is called `label`.

**Kind**: instance method of [<code>SlackMessageAdapter</code>](#module_adapter--module.exports.SlackMessageAdapter)  
**Returns**: <code>module:adapter--module.exports~SlackMessageAdapter</code> - - this instance (for chaining)  

| Param | Type | Description |
| --- | --- | --- |
| matchingConstraints | <code>object</code> | the callback ID (as a string or RegExp) or an object describing the constraints to select options requests for the handler. |
| [matchingConstraints.callbackId] | <code>string</code> \| <code>RegExp</code> | a string or RegExp to match against the `callback_id` |
| [matchingConstraints.blockId] | <code>string</code> \| <code>RegExp</code> | a string or RegExp to match against the `block_id` |
| [matchingConstraints.actionId] | <code>string</code> \| <code>RegExp</code> | a string or RegExp to match against the `action_id` |
| [matchingConstraints.within] | <code>string</code> | `block_actions` only for external select in actions block, `interactive_message` only for menus in an interactive message, or `dialog` only for menus in a dialog |
| callback | [<code>OptionsHandler</code>](#module_adapter--module.exports..SlackMessageAdapter..OptionsHandler) | the function to run when an options request is matched |


* * *

<a name="module_@slack/interactive-messages"></a>

## @slack/interactive-messages

* [@slack/interactive-messages](#module_@slack/interactive-messages)
    * [.errorCodes](#module_@slack/interactive-messages.errorCodes) : <code>enum</code>
    * [.createMessageAdapter(signingSecret, options)](#module_@slack/interactive-messages.createMessageAdapter) ⇒ <code>module:adapter--module.exports~SlackMessageAdapter</code>


* * *

<a name="module_@slack/interactive-messages.errorCodes"></a>

### @slack/interactive-messages.errorCodes : <code>enum</code>
Dictionary of error codes that may appear on errors emitted from this package's objects

**Kind**: static enum of [<code>@slack/interactive-messages</code>](#module_@slack/interactive-messages)  
**Read only**: true  

* * *

<a name="module_@slack/interactive-messages.createMessageAdapter"></a>

### @slack/interactive-messages.createMessageAdapter(signingSecret, options) ⇒ <code>module:adapter--module.exports~SlackMessageAdapter</code>
Factory method to create an instance of [module:adapter~SlackMessageAdapter](module:adapter~SlackMessageAdapter)

**Kind**: static method of [<code>@slack/interactive-messages</code>](#module_@slack/interactive-messages)  

| Param | Type |
| --- | --- |
| signingSecret | <code>string</code> | 
| options | <code>Object</code> | 


* * *

