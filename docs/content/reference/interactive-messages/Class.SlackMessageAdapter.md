# Class: SlackMessageAdapter

An adapter for Slack's interactive message components such as buttons, menus, and dialogs.

## Constructors

### new SlackMessageAdapter()

```ts
new SlackMessageAdapter(signingSecret, __namedParameters): SlackMessageAdapter
```

Create a message adapter.

#### Parameters

• **signingSecret**: `string`

Slack app signing secret used to authenticate request

• **\_\_namedParameters**: [`MessageAdapterOptions`](Interface.MessageAdapterOptions.md) = `{}`

#### Returns

[`SlackMessageAdapter`](Class.SlackMessageAdapter.md)

#### Defined in

[adapter.ts:154](https://github.com/slackapi/node-slack-sdk/blob/main/packages/interactive-messages/src/adapter.ts#L154)

## Properties

### lateResponseFallbackEnabled

```ts
lateResponseFallbackEnabled: boolean;
```

Whether or not promises that resolve after the syncResponseTimeout can fallback to a request for the response_url.
This only works in cases where the semantic meaning of the response and the response_url are the same.

#### Defined in

[adapter.ts:136](https://github.com/slackapi/node-slack-sdk/blob/main/packages/interactive-messages/src/adapter.ts#L136)

***

### signingSecret

```ts
signingSecret: string;
```

Slack app signing secret used to authenticate request

#### Defined in

[adapter.ts:124](https://github.com/slackapi/node-slack-sdk/blob/main/packages/interactive-messages/src/adapter.ts#L124)

***

### syncResponseTimeout

```ts
syncResponseTimeout: number;
```

The number of milliseconds to wait before flushing a synchronous response to an incoming request and falling back
to an asynchronous response.

#### Defined in

[adapter.ts:130](https://github.com/slackapi/node-slack-sdk/blob/main/packages/interactive-messages/src/adapter.ts#L130)

## Methods

### action()

```ts
action(matchingConstraints, callback): this
```

Add a handler for an interactive message action.

Usually there's no need to be concerned with _how_ a message is sent to Slack, but the following table describes it
fully.

**Action**|**Return `object`**|**Return `Promise<object>`**|**Return `undefined`**|**Call `respond(message)`**|**Notes**
:-----:|:-----:|:-----:|:-----:|:-----:|:-----:
**Button Press**| Message in response | When resolved before `syncResponseTimeout` or `lateResponseFallbackEnabled: false`, message in response<br />When resolved after `syncResponseTimeout` and `lateResponseFallbackEnabled: true`, message in request to `response_url` | Empty response | Message in request to `response_url` | Create a new message instead of replacing using `replace_original: false`
**Menu Selection**| Message in response | When resolved before `syncResponseTimeout` or `lateResponseFallbackEnabled: false`, message in response<br />When resolved after `syncResponseTimeout` and `lateResponseFallbackEnabled: true`, message in request to `response_url` | Empty response | Message in request to `response_url` | Create a new message instead of replacing using `replace_original: false`
**Message Action** | Message in response | When resolved before `syncResponseTimeout` or `lateResponseFallbackEnabled: false`, message in response<br />When resolved after `syncResponseTimeout` and `lateResponseFallbackEnabled: true`, message in request to `response_url` | Empty response | Message in request to `response_url` |
**Dialog Submission**| Error list in response | Error list in response | Empty response | Message in request to `response_url` | Returning a Promise that takes longer than 3 seconds to resolve can result in the user seeing an error. Warning logged if a promise isn't completed before `syncResponseTimeout`.

#### Parameters

• **matchingConstraints**: `string` \| `RegExp` \| [`ActionConstraints`](Interface.ActionConstraints.md)

the callback ID (as a string or RegExp) or an object describing the constraints to
  match actions for the handler.

• **callback**: [`ActionHandler`](TypeAlias.ActionHandler.md)

the function to run when an action is matched

#### Returns

`this`

this instance (for chaining)

#### Defined in

[adapter.ts:284](https://github.com/slackapi/node-slack-sdk/blob/main/packages/interactive-messages/src/adapter.ts#L284)

***

### createServer()

```ts
createServer(): Promise<Server>
```

Create a server that dispatches Slack's interactive message actions and menu requests to this message adapter
instance. Use this method if your application will handle starting the server.

#### Returns

`Promise`\<`Server`\>

A promise that resolves to an instance of http.Server and will dispatch interactive message actions and
  options requests to this message adapter instance. See
  https://nodejs.org/dist/latest/docs/api/http.html#http_class_http_server

#### Defined in

[adapter.ts:197](https://github.com/slackapi/node-slack-sdk/blob/main/packages/interactive-messages/src/adapter.ts#L197)

***

### dispatch()

```ts
dispatch(payload): undefined | Promise<DispatchResult>
```

**`Internal`**

Dispatches the contents of an HTTP request to the registered handlers.

#### Parameters

• **payload**: `any`

#### Returns

`undefined` \| `Promise`\<[`DispatchResult`](Interface.DispatchResult.md)\>

A promise of the response information (an object with status and content that is a JSON serializable
  object or a string or undefined) for the request. An undefined return value indicates that the request was not
  matched.

#### Remarks

This is an internal API not meant to be used by code depending on this package.

#### Defined in

[adapter.ts:424](https://github.com/slackapi/node-slack-sdk/blob/main/packages/interactive-messages/src/adapter.ts#L424)

***

### expressMiddleware()

```ts
expressMiddleware(): RequestHandler
```

Create a middleware function that can be used to integrate with the `express` web framework in order for incoming
requests to be dispatched to this message adapter instance.

#### Returns

`RequestHandler`

A middleware function (see http://expressjs.com/en/guide/using-middleware.html)

#### Defined in

[adapter.ts:248](https://github.com/slackapi/node-slack-sdk/blob/main/packages/interactive-messages/src/adapter.ts#L248)

***

### options()

```ts
options(matchingConstraints, callback): this
```

Add a handler for an options request

Usually there's no need to be concerned with _how_ a message is sent to Slack, but the
following table describes it fully

&nbsp;|**Return `options`**|**Return `Promise<options>`**|**Return `undefined`**|**Notes**
:-----:|:-----:|:-----:|:-----:|:-----:
**Options Request**| Options in response | Options in response | Empty response | Returning a Promise that takes longer than 3 seconds to resolve can result in the user seeing an error. If the request is from within a dialog, the `text` field is called `label`.

#### Parameters

• **matchingConstraints**: `string` \| `RegExp` \| [`OptionsConstraints`](Interface.OptionsConstraints.md)

the callback ID (as a string or RegExp) or an object describing the constraints to
  select options requests for the handler.

• **callback**: [`OptionsHandler`](TypeAlias.OptionsHandler.md)

the function to run when an options request is matched

#### Returns

`this`

this instance (for chaining)

#### Defined in

[adapter.ts:342](https://github.com/slackapi/node-slack-sdk/blob/main/packages/interactive-messages/src/adapter.ts#L342)

***

### requestListener()

```ts
requestListener(): RequestListener
```

Create a request listener function that handles HTTP requests, verifies requests and dispatches responses

#### Returns

`RequestListener`

#### Defined in

[adapter.ts:258](https://github.com/slackapi/node-slack-sdk/blob/main/packages/interactive-messages/src/adapter.ts#L258)

***

### shortcut()

```ts
shortcut(matchingConstraints, callback): this
```

#### Parameters

• **matchingConstraints**: `string` \| `RegExp` \| [`ShortcutConstraints`](Interface.ShortcutConstraints.md)

• **callback**: [`ShortcutHandler`](TypeAlias.ShortcutHandler.md)

#### Returns

`this`

#### Defined in

[adapter.ts:308](https://github.com/slackapi/node-slack-sdk/blob/main/packages/interactive-messages/src/adapter.ts#L308)

***

### start()

```ts
start(port): Promise<Server>
```

Start a built-in server that dispatches Slack's interactive message actions and menu requests to this message
adapter interface.

#### Parameters

• **port**: `number`

#### Returns

`Promise`\<`Server`\>

A promise that resolves once the server is ready

#### Defined in

[adapter.ts:208](https://github.com/slackapi/node-slack-sdk/blob/main/packages/interactive-messages/src/adapter.ts#L208)

***

### stop()

```ts
stop(): Promise<void>
```

Stop the previously started built-in server.

#### Returns

`Promise`\<`void`\>

A promise that resolves once the server is cleaned up.

#### Defined in

[adapter.ts:223](https://github.com/slackapi/node-slack-sdk/blob/main/packages/interactive-messages/src/adapter.ts#L223)

***

### viewClosed()

```ts
viewClosed(matchingConstraints, callback): this
```

Add a handler for view closed interaction. The handler should not return a value.

#### Parameters

• **matchingConstraints**: `string` \| `RegExp` \| [`ViewConstraints`](Interface.ViewConstraints.md)

the callback ID (as a string or RegExp) or an object describing the constraints to
  match view closed interactions for the handler.

• **callback**: [`ViewClosedHandler`](TypeAlias.ViewClosedHandler.md)

the function to run when an view closed interaction is matched

#### Returns

`this`

this instance (for chaining)

#### Defined in

[adapter.ts:397](https://github.com/slackapi/node-slack-sdk/blob/main/packages/interactive-messages/src/adapter.ts#L397)

***

### viewSubmission()

```ts
viewSubmission(matchingConstraints, callback): this
```

Add a handler for view submission.

The value returned from the `callback` determines the response sent back to Slack. The handler can return a plain
object with a `response_action` property to dismiss the modal, push a view into the modal, display validation
errors, or update the view. Alternatively, the handler can return a Promise for this kind of object, which resolves
before `syncResponseTimeout` or `lateResponseFallbackEnabled: false`, to perform the same response actions. If the
Promise resolves afterwards or `lateResponseFallbackEnabled: true` then the modal will be dismissed. If the handler
returns `undefined` the modal will be dismissed.

#### Parameters

• **matchingConstraints**: `string` \| `RegExp` \| [`ViewConstraints`](Interface.ViewConstraints.md)

the callback ID (as a string or RegExp) or an object describing the constraints to
  match view submissions for the handler.

• **callback**: [`ViewSubmissionHandler`](TypeAlias.ViewSubmissionHandler.md)

the function to run when an view submission is matched

#### Returns

`this`

this instance (for chaining)

#### Defined in

[adapter.ts:375](https://github.com/slackapi/node-slack-sdk/blob/main/packages/interactive-messages/src/adapter.ts#L375)
