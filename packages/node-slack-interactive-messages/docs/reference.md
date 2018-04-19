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
        * [~SlackMessageAdapter](#module_adapter--module.exports..SlackMessageAdapter)
            * [new SlackMessageAdapter(verificationToken, [options])](#new_module_adapter--module.exports..SlackMessageAdapter_new)
            * _instance_
                * [.createServer([path])](#module_adapter--module.exports..SlackMessageAdapter+createServer) ⇒ <code>Promise.&lt;NodeHttpServer&gt;</code>
                * [.start(port)](#module_adapter--module.exports..SlackMessageAdapter+start) ⇒ <code>Promise.&lt;void&gt;</code>
                * [.stop()](#module_adapter--module.exports..SlackMessageAdapter+stop) ⇒ <code>Promise.&lt;void&gt;</code>
                * [.expressMiddleware()](#module_adapter--module.exports..SlackMessageAdapter+expressMiddleware) ⇒ <code>ExpressMiddlewareFunc</code>
                * [.action(matchingConstraints, callback)](#module_adapter--module.exports..SlackMessageAdapter+action) ⇒ [<code>SlackMessageAdapter</code>](#module_adapter--module.exports..SlackMessageAdapter)
                * [.options(matchingConstraints, callback)](#module_adapter--module.exports..SlackMessageAdapter+options) ⇒ [<code>SlackMessageAdapter</code>](#module_adapter--module.exports..SlackMessageAdapter)
            * _inner_
                * [~ActionHandler(payload, respond)](#module_adapter--module.exports..SlackMessageAdapter..ActionHandler) ⇒ <code>Object</code>
                    * [~Respond(message)](#module_adapter--module.exports..SlackMessageAdapter..ActionHandler..Respond) ⇒ <code>Promise</code>
                * [~OptionsHandler(payload)](#module_adapter--module.exports..SlackMessageAdapter..OptionsHandler) ⇒ <code>Object</code>


* * *

<a name="exp_module_adapter--module.exports"></a>

### module.exports ⏏
**Kind**: Exported member  

* * *

<a name="module_adapter--module.exports..SlackMessageAdapter"></a>

#### module.exports~SlackMessageAdapter
An adapter for Slack's interactive message components such as buttons, menus, and dialogs.

**Kind**: inner class of [<code>module.exports</code>](#exp_module_adapter--module.exports)  

* [~SlackMessageAdapter](#module_adapter--module.exports..SlackMessageAdapter)
    * [new SlackMessageAdapter(verificationToken, [options])](#new_module_adapter--module.exports..SlackMessageAdapter_new)
    * _instance_
        * [.createServer([path])](#module_adapter--module.exports..SlackMessageAdapter+createServer) ⇒ <code>Promise.&lt;NodeHttpServer&gt;</code>
        * [.start(port)](#module_adapter--module.exports..SlackMessageAdapter+start) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.stop()](#module_adapter--module.exports..SlackMessageAdapter+stop) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.expressMiddleware()](#module_adapter--module.exports..SlackMessageAdapter+expressMiddleware) ⇒ <code>ExpressMiddlewareFunc</code>
        * [.action(matchingConstraints, callback)](#module_adapter--module.exports..SlackMessageAdapter+action) ⇒ [<code>SlackMessageAdapter</code>](#module_adapter--module.exports..SlackMessageAdapter)
        * [.options(matchingConstraints, callback)](#module_adapter--module.exports..SlackMessageAdapter+options) ⇒ [<code>SlackMessageAdapter</code>](#module_adapter--module.exports..SlackMessageAdapter)
    * _inner_
        * [~ActionHandler(payload, respond)](#module_adapter--module.exports..SlackMessageAdapter..ActionHandler) ⇒ <code>Object</code>
            * [~Respond(message)](#module_adapter--module.exports..SlackMessageAdapter..ActionHandler..Respond) ⇒ <code>Promise</code>
        * [~OptionsHandler(payload)](#module_adapter--module.exports..SlackMessageAdapter..OptionsHandler) ⇒ <code>Object</code>


* * *

<a name="new_module_adapter--module.exports..SlackMessageAdapter_new"></a>

##### new SlackMessageAdapter(verificationToken, [options])
Create a message adapter.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| verificationToken | <code>string</code> |  | Slack app verification token used to authenticate request |
| [options] | <code>Object</code> |  |  |
| [options.syncResponseTimeout] | <code>number</code> | <code>2500</code> | number of milliseconds to wait before flushing a syncrhonous response to an incoming request and falling back to an asynchronous response. |
| [options.lateResponseFallbackEnabled] | <code>boolean</code> | <code>true</code> | whether or not promises that resolve after the syncResponseTimeout can fallback to a request for the response_url. this only works in cases where the semantic meaning of the response and the response_url are the same. |


* * *

<a name="module_adapter--module.exports..SlackMessageAdapter+createServer"></a>

##### slackInteractions.createServer([path]) ⇒ <code>Promise.&lt;NodeHttpServer&gt;</code>
Create a server that dispatches Slack's interactive message actions and menu requests to this
message adapter instance. Use this method if your application will handle starting the server.

**Kind**: instance method of [<code>SlackMessageAdapter</code>](#module_adapter--module.exports..SlackMessageAdapter)  
**Returns**: <code>Promise.&lt;NodeHttpServer&gt;</code> - - A promise that resolves to an instance of http.Server and
will dispatch interactive message actions and options requests to this message adapter
instance. https://nodejs.org/dist/latest/docs/api/http.html#http_class_http_server  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [path] | <code>string</code> | <code>&quot;/slack/actions&quot;</code> | The path portion of the URL where the server will listen for requests from Slack's interactive messages. |


* * *

<a name="module_adapter--module.exports..SlackMessageAdapter+start"></a>

##### slackInteractions.start(port) ⇒ <code>Promise.&lt;void&gt;</code>
Start a built-in server that dispatches Slack's interactive message actions and menu requests
to this message adapter interface.

**Kind**: instance method of [<code>SlackMessageAdapter</code>](#module_adapter--module.exports..SlackMessageAdapter)  
**Returns**: <code>Promise.&lt;void&gt;</code> - - A promise that resolves once the server is ready  

| Param | Type |
| --- | --- |
| port | <code>number</code> | 


* * *

<a name="module_adapter--module.exports..SlackMessageAdapter+stop"></a>

##### slackInteractions.stop() ⇒ <code>Promise.&lt;void&gt;</code>
Stop the previously started built-in server.

**Kind**: instance method of [<code>SlackMessageAdapter</code>](#module_adapter--module.exports..SlackMessageAdapter)  
**Returns**: <code>Promise.&lt;void&gt;</code> - - A promise that resolves once the server is cleaned up.  

* * *

<a name="module_adapter--module.exports..SlackMessageAdapter+expressMiddleware"></a>

##### slackInteractions.expressMiddleware() ⇒ <code>ExpressMiddlewareFunc</code>
Create a middleware function that can be used to integrate with the `express` web framework
in order for incoming requests to be dispatched to this message adapter instance.

**Kind**: instance method of [<code>SlackMessageAdapter</code>](#module_adapter--module.exports..SlackMessageAdapter)  
**Returns**: <code>ExpressMiddlewareFunc</code> - - A middleware function http://expressjs.com/en/guide/using-middleware.html  

* * *

<a name="module_adapter--module.exports..SlackMessageAdapter+action"></a>

##### slackInteractions.action(matchingConstraints, callback) ⇒ [<code>SlackMessageAdapter</code>](#module_adapter--module.exports..SlackMessageAdapter)
Add a handler for an interactive message action.

Usually there's no need to be concerned with _how_ a message is sent to Slack, but the
following table describes it fully.

**Action**|**Return `object`**|**Return `Promise<object>`**|**Return `undefined`**|**Call `respond(message)`**|**Notes**
:-----:|:-----:|:-----:|:-----:|:-----:|:-----:
**Button Press**| Message in response | When resolved before `syncResposeTimeout` or `lateResponseFallbackEnabled: false`, message in response<br />When resolved after `syncResponseTimeout` and `lateResponseFallbackEnabled: true`, message in request to `response_url` | Empty response | Message in request to `response_url` | Create a new message instead of replacing using `replace_original: false`
**Menu Selection**| Message in response | When resolved before `syncResposeTimeout` or `lateResponseFallbackEnabled: false`, message in response<br />When resolved after `syncResponseTimeout` and `lateResponseFallbackEnabled: true`, message in request to `response_url` | Empty response | Message in request to `response_url` | Create a new message instead of replacing using `replace_original: false`
**Dialog Submission**| Error list in response | Error list in response | Empty response | Message in request to `response_url` | Returning a Promise that takes longer than 3 seconds to resolve can result in the user seeing an error. Warning logged if a promise isn't completed before `syncResponseTimeout`.

**Kind**: instance method of [<code>SlackMessageAdapter</code>](#module_adapter--module.exports..SlackMessageAdapter)  
**Returns**: [<code>SlackMessageAdapter</code>](#module_adapter--module.exports..SlackMessageAdapter) - - this instance (for chaining)  

| Param | Type | Description |
| --- | --- | --- |
| matchingConstraints | <code>Object</code> \| <code>string</code> \| <code>RegExp</code> | the callback ID (as a string or RegExp) or an object describing the constraints to match actions for the handler. |
| [matchingConstraints.callbackId] | <code>string</code> \| <code>RegExp</code> | a string or RegExp to match against the `callback_id` |
| [matchingConstraints.type] | <code>string</code> | when `select` only for menu selections, when `button` only for buttton presses, or when `dialog_submission` only for dialog submissions |
| [matchingConstraints.unfurl] | <code>boolean</code> | when `true` only match actions from an unfurl |
| callback | [<code>ActionHandler</code>](#module_adapter--module.exports..SlackMessageAdapter..ActionHandler) | the function to run when an action is matched |


* * *

<a name="module_adapter--module.exports..SlackMessageAdapter+options"></a>

##### slackInteractions.options(matchingConstraints, callback) ⇒ [<code>SlackMessageAdapter</code>](#module_adapter--module.exports..SlackMessageAdapter)
Add a handler for an options request

Usually there's no need to be concerned with _how_ a message is sent to Slack, but the
following table describes it fully

&nbsp;|**Return `options`**|**Return `Promise<options>`**|**Return `undefined`**|**Notes**
:-----:|:-----:|:-----:|:-----:|:-----:
**Options Request**| Options in response | Options in response | Empty response | Returning a Promise that takes longer than 3 seconds to resolve can result in the user seeing an error. If the request is from within a dialog, the `text` field is called `label`.

**Kind**: instance method of [<code>SlackMessageAdapter</code>](#module_adapter--module.exports..SlackMessageAdapter)  
**Returns**: [<code>SlackMessageAdapter</code>](#module_adapter--module.exports..SlackMessageAdapter) - - this instance (for chaining)  

| Param | Type | Description |
| --- | --- | --- |
| matchingConstraints | <code>object</code> | the callback ID (as a string or RegExp) or an object describing the constraints to select options requests for the handler. |
| [matchingConstraints.callbackId] | <code>string</code> \| <code>RegExp</code> | a string or RegExxp to match against the `callback_id` |
| [matchingConstraints.within] | <code>string</code> | when `interactive_message` only for menus in an interactive message, or when `dialog` only for menus in a dialog |
| callback | [<code>OptionsHandler</code>](#module_adapter--module.exports..SlackMessageAdapter..OptionsHandler) | the function to run when an options request is matched |


* * *

<a name="module_adapter--module.exports..SlackMessageAdapter..ActionHandler"></a>

##### SlackMessageAdapter~ActionHandler(payload, respond) ⇒ <code>Object</code>
A handler function for action requests (button presses, menu selections, and dialog submissions).

**Kind**: inner method of [<code>SlackMessageAdapter</code>](#module_adapter--module.exports..SlackMessageAdapter)  
**Returns**: <code>Object</code> - When the action is a button press or a menu selection, this object is a
replacement
[message](https://api.slack.com/docs/interactive-message-field-guide#top-level_message_fields)
for the message in which the action occurred. It may also be a Promise for a message, and if so
and the Promise takes longer than the `syncResponseTimeout` to complete, the message is sent over
the `response_url`. The message may also be a new message in the same conversation by setting
`replace_original: false`. When the action is a dialog submission, this object is a list of
[validation errors](https://api.slack.com/dialogs#input_validation). It may also be a Promise for
a list of validation errors, and if so and the Promise takes longer than the
`syncReponseTimeout` to complete, Slack will disply an error to the user. If there is no return
value, then button presses and menu selections do not update the message and dialog submissions
will validate and dismiss.  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> | an object describing the [button press](https://api.slack.com/docs/message-buttons#responding_to_message_actions), [menu selection](https://api.slack.com/docs/message-menus#request_url_response), or [dialog submission](https://api.slack.com/dialogs#evaluating_submission_responses). |
| respond | [<code>Respond</code>](#module_adapter--module.exports..SlackMessageAdapter..ActionHandler..Respond) | When the action is a button press or menu selection, this function is used to update the message where the action occured or create new messages in the same conversation. When the action is a dialog submission, this function is used to create new messages in the conversation where the dialog was triggered. |


* * *

<a name="module_adapter--module.exports..SlackMessageAdapter..ActionHandler..Respond"></a>

###### ActionHandler~Respond(message) ⇒ <code>Promise</code>
A function used to send message updates after an action is handled. This function can be used
up to 5 times in 30 minutes.

**Kind**: inner method of [<code>ActionHandler</code>](#module_adapter--module.exports..SlackMessageAdapter..ActionHandler)  
**Returns**: <code>Promise</code> - there's no contract or interface for the resolution value, but this Promise
will resolve when the HTTP response from the `response_url` request is complete and reject when
there is an error.  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>Object</code> | a [message](https://api.slack.com/docs/interactive-message-field-guide#top-level_message_fields). Dialog submissions do not allow `resplace_original: false` on this message. |


* * *

<a name="module_adapter--module.exports..SlackMessageAdapter..OptionsHandler"></a>

##### SlackMessageAdapter~OptionsHandler(payload) ⇒ <code>Object</code>
A handler function for menu options requests.

**Kind**: inner method of [<code>SlackMessageAdapter</code>](#module_adapter--module.exports..SlackMessageAdapter)  
**Returns**: <code>Object</code> - an
[options list](https://api.slack.com/docs/interactive-message-field-guide#option_fields) or
[option groups list](https://api.slack.com/docs/interactive-message-field-guide#option_groups).
When the menu is within an interactive message, (`within: 'interactive_message'`) the option
keys are `text` and `value`. When the menu is within a dialog (`within: 'dialog'`) the option
keys are `label` and `value`. This function may also return a Promise either of these values.
If a Promise is returned and it does not complete within 3 seconds, Slack will display an error
to the user. If there is no return value, then the user is shown an empty list of options.  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> | an object describing [the state of the menu](https://api.slack.com/docs/message-menus#options_load_url) |


* * *

<a name="module_@slack/interactive-messages"></a>

## @slack/interactive-messages

* [@slack/interactive-messages](#module_@slack/interactive-messages)
    * [.errorCodes](#module_@slack/interactive-messages.errorCodes) : <code>enum</code>
    * [.createMessageAdapter(verificationToken, options)](#module_@slack/interactive-messages.createMessageAdapter) ⇒ [<code>SlackMessageAdapter</code>](#module_adapter--module.exports..SlackMessageAdapter)


* * *

<a name="module_@slack/interactive-messages.errorCodes"></a>

### @slack/interactive-messages.errorCodes : <code>enum</code>
Dictionary of error codes that may appear on errors emitted from this package's objects

**Kind**: static enum of [<code>@slack/interactive-messages</code>](#module_@slack/interactive-messages)  
**Read only**: true  

* * *

<a name="module_@slack/interactive-messages.createMessageAdapter"></a>

### @slack/interactive-messages.createMessageAdapter(verificationToken, options) ⇒ [<code>SlackMessageAdapter</code>](#module_adapter--module.exports..SlackMessageAdapter)
Factory method to create an instance of [SlackMessageAdapter](#new_module_adapter--module.exports..SlackMessageAdapter_new)

**Kind**: static method of [<code>@slack/interactive-messages</code>](#module_@slack/interactive-messages)  

| Param | Type |
| --- | --- |
| verificationToken | <code>string</code> | 
| options | <code>Object</code> | 


* * *

