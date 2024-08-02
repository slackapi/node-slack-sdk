---
title: "@slack/interactive-messages"
---

:::warning[Deprecation Notice]

_`@slack/interactive-messages` officially reached EOL on May 31st, 2021. Development has fully stopped for this package and all remaining open issues and pull requests have been closed._

_At this time, we recommend migrating to [Bolt for JavaScript](https://github.com/slackapi/bolt-js), a framework that offers all of the functionality available in those packages (and more). To help with that process, we've provided some [migration samples](/tutorials/migrating-to-v6) for those looking to convert their existing apps._

:::

# Classes

## SlackMessageAdapter

An adapter for Slack's interactive message components such as buttons, menus, and dialogs.

#### new SlackMessageAdapter(signingSecret, opts)

Create a message adapter.

**Parameters:**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| signingSecret | `string` | ✓   | Slack app signing secret used to authenticate request |
| opts | `[MessageAdapterOptions](#messageadapteroptions)` | ✗   | See options. |

**Options:**

| Name | Type |
| --- | --- |
| agent | `Agent` | 
| lateResponseFallbackEnabled | `boolean` | 
| syncResponseTimeout | `number` | 

### Fields

| Name | Type | Description |
| --- | --- | --- |
| lateResponseFallbackEnabled | `boolean` | Whether or not promises that resolve after the syncResponseTimeout can fallback to a request for the `response_url`. This only works in cases where the semantic meaning of the response and the `response_url` are the same. |
| signingSecret | `string` | Slack app signing secret used to authenticate request |
| syncResponseTimeout | `number` | The number of milliseconds to wait before flushing a synchronous response to an incoming request and falling back to an asynchronous response. |

### Methods

#### action(matchingConstraints, callback)

Add a handler for an interactive message action.

Usually there's no need to be concerned with _how_ a message is sent to Slack, but the following table describes it fully.

Action|Return `object`|Return `Promise<object>`|Return `undefined`|Call `respond(message)`|Notes 
:-----:|:-----:|:-----:|:-----:|:-----:|:-----: 
Button Press| Message in response | When resolved before `syncResponseTimeout` or `lateResponseFallbackEnabled: false`, message in response  
When resolved after `syncResponseTimeout` and `lateResponseFallbackEnabled: true`, message in request to `response_url` | Empty response | Message in request to `response_url` | Create a new message instead of replacing using `replace_original: false` \*\*Menu Selection\*\*| Message in response | When resolved before `syncResponseTimeout` or `lateResponseFallbackEnabled: false`, message in response  
When resolved after `syncResponseTimeout` and `lateResponseFallbackEnabled: true`, message in request to `response_url` | Empty response | Message in request to `response_url` | Create a new message instead of replacing using `replace_original: false` \*\*Message Action\*\* | Message in response | When resolved before `syncResponseTimeout` or `lateResponseFallbackEnabled: false`, message in response  
When resolved after `syncResponseTimeout` and `lateResponseFallbackEnabled: true`, message in request to `response_url` | Empty response | Message in request to `response_url` | \*\*Dialog Submission\*\*| Error list in response | Error list in response | Empty response | Message in request to `response_url` | Returning a Promise that takes longer than 3 seconds to resolve can result in the user seeing an error. Warning logged if a promise isn't completed before `syncResponseTimeout`. **Parameters:**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| matchingConstraints | `string \| RegExp \| [ActionConstraints](#actionconstraints)` | ✓   | the callback ID (as a string or RegExp) or an object describing the constraints to match actions for the handler. |
| callback | `[ActionHandler](#actionhandler)` | ✓   | the function to run when an action is matched |

**Returns** `this`

#### createServer()

Create a server that dispatches Slack's interactive message actions and menu requests to this message adapter instance. Use this method if your application will handle starting the server.

**Returns** `Promise<http.Server>`

#### expressMiddleware()

Create a middleware function that can be used to integrate with the `express` web framework in order for incoming requests to be dispatched to this message adapter instance.

**Returns** `RequestHandler`

#### options(matchingConstraints, callback)

Add a handler for an options request

Usually there's no need to be concerned with _how_ a message is sent to Slack, but the following table describes it fully

|   | Return `options` | Return `Promise<options>` | Return `undefined`| Notes
-----|-----|-----|-----|-----:
Options Request| Options in response | Options in response | Empty response | Returning a Promise that takes longer than 3 seconds to resolve can result in the user seeing an error. If the request is from within a dialog, the `text` field is called `label`.

**Parameters:**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| matchingConstraints | `string \| RegExp \| [OptionsConstraints](#optionsconstraints)` | ✓   | the callback ID (as a string or RegExp) or an object describing the constraints to select options requests for the handler. |
| callback | `[OptionsHandler](#optionshandler)` | ✓   | the function to run when an options request is matched |

**Returns** `this`

#### requestListener()

Create a request listener function that handles HTTP requests, verifies requests and dispatches responses

**Returns** `RequestListener`

#### shortcut(matchingConstraints, callback)

**Parameters:**

| Name | Type | Required |
| --- | --- | --- |
| matchingConstraints | `string \| RegExp \| [ShortcutConstraints](#shortcutconstraints)` | ✓   |
| callback | `[ShortcutHandler](#shortcuthandler)` | ✓   |

**Returns** `this`

#### start(port)

Start a built-in server that dispatches Slack's interactive message actions and menu requests to this message adapter interface.

**Parameters:**

| Name | Type | Required |
| --- | --- | --- |
| port | `number` | ✓   |

**Returns** `Promise<http.Server>`

#### stop()

Stop the previously started built-in server.

**Returns** `Promise<void>`

#### viewClosed(matchingConstraints, callback)

Add a handler for view closed interaction. The handler should not return a value.

**Parameters:**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| matchingConstraints | `string \| RegExp \| [ViewConstraints](#viewconstraints)` | ✓   | the callback ID (as a string or RegExp) or an object describing the constraints to match view closed interactions for the handler. |
| callback | `[ViewClosedHandler](#viewclosedhandler)` | ✓   | the function to run when an view closed interaction is matched |

**Returns** `this`

#### viewSubmission(matchingConstraints, callback)

Add a handler for view submission.

The value returned from the `callback` determines the response sent back to Slack. The handler can return a plain object with a `response_action` property to dismiss the modal, push a view into the modal, display validation errors, or update the view. Alternatively, the handler can return a Promise for this kind of object, which resolves before `syncResponseTimeout` or `lateResponseFallbackEnabled: false`, to perform the same response actions. If the Promise resolves afterwards or `lateResponseFallbackEnabled: true` then the modal will be dismissed. If the handler returns `undefined` the modal will be dismissed.

**Parameters:**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| matchingConstraints | `string \| RegExp \| [ViewConstraints](#viewconstraints)` | ✓   | the callback ID (as a string or RegExp) or an object describing the constraints to match view submissions for the handler. |
| callback | `[ViewSubmissionHandler](#viewsubmissionhandler)` | ✓   | the function to run when an view submission is matched |

**Returns** `this`

# Functions

## createMessageAdapter(signingSecret, options)

Factory method to create an instance of [`SlackMessageAdapter`](#slackmessageadapter)

**Parameters:**

| Name | Type | Required |
| --- | --- | --- |
| signingSecret | `string` | ✓   |
| options | `[MessageAdapterOptions](#messageadapteroptions)` | ✗   |

**Returns** `[SlackMessageAdapter](#slackmessageadapter)`

# Enums

## ErrorCode

A dictionary of codes for errors produced by this package.

### Members

*   **BodyParserNotPermitted**
*   **PromiseTimeout**
*   **RequestTimeFailure**
*   **SignatureVerificationFailure**

## ResponseStatus

Some HTTP response statuses.

### Members

*   **Failure**
*   **Ok**

# Interfaces

## ActionConstraints

Constraints on when to call an action handler.

### Fields

| Name | Type | Description |
| --- | --- | --- |
| actionId | `string \| RegExp` | A string or RegExp to match against the `action_id` |
| blockId | `string \| RegExp` | A string or RegExp to match against the `block_id` |
| callbackId | `string \| RegExp` | A string or RegExp to match against the `callback_id` |
| type | `string` | Valid types include all \[actions block elements\](https://api.slack.com/reference/messaging/interactive-components), `select` only for menu selections, or `dialog_submission` only for dialog submissions |
| unfurl | `boolean` | When `true` only match actions from an unfurl |

## DispatchResult

The result of a call to `dispatch`.

### Fields

| Name | Type |
| --- | --- |
| content | `any` |
| status | `[ResponseStatus](#responsestatus)` |

## MessageAdapterOptions

Options for constructing [`SlackMessageAdapter`](#slackmessageadapter).

### Fields

| Name | Type |
| --- | --- |
| agent | `Agent` | 
| lateResponseFallbackEnabled | `boolean` |
| syncResponseTimeout | `number` |

## OptionsConstraints

Constraints on when to call an options handler.

### Fields

| Name | Type | Description |
| --- | --- | --- |
| actionId | `string \| RegExp` | A string or RegExp to match against the `action_id` |
| blockId | `string \| RegExp` | A string or RegExp to match against the `block_id` |
| callbackId | `string \| RegExp` | A string or RegExp to match against the `callback_id` |
| within | `'block_actions' \| 'interactive_message' \| 'dialog'` | The source of options request. |

## ShortcutConstraints

Constraints on when to call an shortcut handler.

### Fields

| Name | Type | Description |
| --- | --- | --- |
| callbackId | `string \| RegExp` | A string or RegExp to match against the `callback_id` |
| type | `'shortcut'` | Valid type includes shortcut |

## ViewConstraints

Constraints on when to call a view submission or view closed handler.

### Fields

| Name | Type | Description |
| --- | --- | --- |
| callbackId | `string \| RegExp` | A string or RegExp to match against the `callback_id` |
| externalId | `string \| RegExp` | A string to match against the `external_id` |
| viewId | `string` | A string to match against the `view_id` |

# Type Aliases

## ActionHandler

A handler function for action requests (block actions, button presses, menu selections, and dialog submissions).

```ts
) => any | Promise<any> | undefined
```

## OptionsHandler

A handler function for menu options requests.

```ts
<any> | undefined
```

## Respond

A function used to send message updates after an action is handled. This function can be used up to 5 times in 30 minutes.

```ts
<unknown>
```

## ShortcutHandler

A handler function for global shortcuts.

```ts
<any> | undefined
```

## ViewClosedHandler

A handler function for view closed requests.

## ViewSubmissionHandler

A handler function for view submission requests.

```ts
<any> | undefined
```