---
title: "@slack/web-api"
---

##  Classes

###  WebClient

A client for Slack's Web API

This client provides an alias for each [Web API method](https://api.slack.com/methods). Each method is a convenience wrapper for calling the `apiCall` method using the method name as the first parameter.

#####  new WebClient(token, opts)

Constructs a new instance of the `WebClient` class

**Parameters:**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| token | `string` | ✗   | An API token to authenticate/authorize with Slack (usually start with `xoxp`, `xoxb`). To learn how to get an access token, check out our [Authentication Basics documentation](https://api.slack.com/authentication/basics), and in particular the [Getting your access token section](https://api.slack.com/authentication/basics#getting-your-authentication-token). |
| opts | [`WebClientOptions`](#webclientoptions) | ✗   | See options. |

**Options:**

| Name | Type |
| --- | --- |
| agent | `Agent` |
| headers | `object` |
| logger | `Logger` |
| logLevel | `LogLevel` |
| maxRequestConcurrency | `number` |
| rejectRateLimitedCalls | `boolean` |
| retryConfig | [`RetryOptions`](#retryoptions) |
| slackApiUrl | `string` |
| tls | [`TLSOptions`](#tlsoptions) |

####  Fields

| Name | Type | Description |
| --- | --- | --- |
| slackApiUrl | `string` | The base URL for reaching Slack's Web API. Consider changing this value for testing purposes. |
| token | `string` | An API token to authenticate/authorize with Slack (usually start with `xoxp`, `xoxb`). To learn how to get an access token, check out our [Authentication Basics documentation](https://api.slack.com/authentication/basics), and in particular the [Getting your access token section](https://api.slack.com/authentication/basics#getting-your-authentication-token). |

####  Methods

#####  apiCall(method, options)

Generic method for calling a Web API method

**Parameters:**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| method | `string` | ✓   | the Web API method to call [https://api.slack.com/methods](https://api.slack.com/methods) |
| options | [`WebAPICallOptions`](#webapicalloptions) | ✗   | options |

**Returns** `Promise<[WebAPICallResult](#webapicallresult)>`

#####  paginate(method, options)

Iterate over the result pages of a cursor-paginated Web API method. This method can return two types of values, depending on which arguments are used. When up to two parameters are used, the return value is an async iterator which can be used as the iterable in a for-await-of loop. When three or four parameters are used, the return value is a promise that resolves at the end of iteration. The third parameter, `shouldStop`, is a function that is called with each `page` and can end iteration by returning `true`. The fourth parameter, `reduce`, is a function that is called with three arguments: `accumulator`, `page`, and `index`. The `accumulator` is a value of any type you choose, but it will contain `undefined` when `reduce` is called for the first time. The `page` argument and `index` arguments are exactly what they say they are. The `reduce` function's return value will be passed in as `accumulator` the next time its called, and the returned promise will resolve to the last value of `accumulator`.

The for-await-of syntax is part of ES2018. It is available natively in Node starting with v10.0.0. You may be able to use it in earlier JavaScript runtimes by transpiling your source with a tool like Babel. However, the transpiled code will likely sacrifice performance.

**Parameters:**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| method | `string` | ✓   | the cursor-paginated Web API method to call [https://api.slack.com/docs/pagination](https://api.slack.com/docs/pagination) |
| options | [`WebAPICallOptions`](#webapicalloptions) | ✗   | options |

**Returns** `AsyncIterable<[WebAPICallResult](#webapicallresult)>`

#####  paginate(method, options, shouldStop)

**Parameters:**

| Name | Type | Required |
| --- | --- | --- |
| method | `string` | ✓   |
| options | [`WebAPICallOptions`](#webapicalloptions) | ✓   |
| shouldStop | [`PaginatePredicate`](#paginatepredicate) | ✓   |

**Returns** `Promise<void>`

#####  paginate(method, options, shouldStop, reduce)

**Parameters:**

| Name | Type | Required |
| --- | --- | --- |
| method | `string` | ✓   |
| options | [`WebAPICallOptions`](#webapicalloptions) | ✓   |
| shouldStop | [`PaginatePredicate`](#paginatepredicate)` | ✓   |
| reduce | [`PageReducer`](#pagereducer)`<A>` | ✗   |

**Returns** `Promise<A>`

##  Functions

###  addAppMetadata(opts)

Appends the app metadata into the User-Agent value

**Parameters:**

| Name | Type | Required |
| --- | --- | --- |
| `object` | ✓   |

**Returns** `void`

##  Enums

###  ErrorCode

A dictionary of codes for errors produced by this package

####  Members

*   **HTTPError**
*   **PlatformError**
*   **RateLimitedError**
*   **RequestError**

###  WebClientEvent

####  Members

*   **RATE\_LIMITED**

##  Interfaces

###  CodedError

All errors produced by this package adhere to this interface

####  Fields

| Name | Type |
| --- | --- |
| code | [`ErrorCode`](#errorcode) |

###  CursorPaginationEnabled

####  Fields

| Name | Type |
| --- | --- |
| cursor | `string` |
| limit | `number` |

###  LocaleAware

####  Fields

| Name | Type |
| --- | --- |
| include\_locale | `boolean` |

###  Method

Generic method definition

###  PageReducer

###  PaginatePredicate

###  RetryOptions

Options to create retry policies. Extends from https://github.com/tim-kos/node-retry.

###  Searchable

####  Fields

| Name | Type |
| --- | --- |
| highlight | `boolean` |
| query | `string` |
| sort\_dir | `'asc' \| 'desc'` |
| sort | `'score' \| 'timestamp'` |

###  TimelinePaginationEnabled

####  Fields

| Name | Type |
| --- | --- |
| inclusive | `boolean` |
| latest | `string` |
| oldest | `string` |

###  TokenOverridable

####  Fields

| Name | Type |
| --- | --- |
| token | `string` |

###  TraditionalPagingEnabled

####  Fields

| Name | Type |
| --- | --- |
| count | `number` |
| page | `number` |

###  WebAPICallOptions

###  WebAPICallResult

####  Fields

| Name | Type |
| --- | --- |
| error | `string` |
| ok  | `boolean` |
| response\_metadata | `object` |

###  WebAPIHTTPError

####  Fields

| Name | Type |
| --- | --- |
| body | `any` |
| code | `ErrorCode.HTTPError` |
| headers | `IncomingHttpHeaders` |
| statusCode | `number` |
| statusMessage | `string` |

###  WebAPIPlatformError

####  Fields

| Name | Type |
| --- | --- |
| code | `ErrorCode.PlatformError` |
| data |

###  WebAPIRateLimitedError

####  Fields

| Name | Type |
| --- | --- |
| code | `ErrorCode.RateLimitedError` |
| retryAfter | `number` |

###  WebAPIRequestError

####  Fields

| Name | Type |
| --- | --- |
| code | `ErrorCode.RequestError` |
| original | `Error` |

###  WebClientOptions

####  Fields

| Name | Type |
| --- | --- | 
| agent | `Agent` |
| headers | `object` |
| logger | `Logger` |
| logLevel | `LogLevel` |
| maxRequestConcurrency | `number` |
| rejectRateLimitedCalls | `boolean` |
| retryConfig | [`RetryOptions`](#retryoptions) |
| slackApiUrl | `string` |
| tls | [`TLSOptions`](#tlsoptions) |

##  Type Aliases

###  PageAccumulator

```ts
R extends (accumulator: (infer A) | undefined, page: WebAPICallResult, index: number) => infer A ? A : never
```

###  TLSOptions

```ts
SecureContextOptions, 'pfx' | 'key' | 'passphrase' | 'cert' | 'ca'>
```

###  WebAPICallError

```ts
WebAPIRequestError | WebAPIHTTPError | WebAPIRateLimitedError
```

One of:

*   [`WebAPIRequestError`](#webapirequesterror)
*   [`WebAPIHTTPError`](#webapihttperror)
*   [`WebAPIRateLimitedError`](#webapiratelimitederror)