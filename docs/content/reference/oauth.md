---
title: "@slack/oauth"
---

## Classes

### InstallProvider

`InstallProvider` provides a way to manage configuration and functionality for adding an OAuth flow to Slack apps. It contains capabilities for OAuth URL generation, state verification, authorization code exchange, as well as interfaces for storing installation details like user and bot tokens.

##### new InstallProvider(opts)

Constructs a new instance of the `InstallProvider` class

**Parameters:**

| Name | Type | Required |
| --- | --- | --- |
| opts | `[InstallProviderOptions](#installprovideroptions)` | ✓   |

#### Fields

| Name | Type |
| --- | --- |
| installationStore | `[InstallationStore](#installationstore)` |
| stateStore | `[StateStore](#statestore)` |

#### Methods

##### handleInstallPath(req, res, options, installOptions)

This method handles HTTP requests to the application's installation page. It can be used to automatically render a typical installation page with an "Add to Slack" button.

**Parameters:**

| Name | Type | Required |
| --- | --- | --- |
| req | [`IncomingMessage`](https://nodejs.org/api/http.html#class-httpincomingmessage) | ✓   |
| res | [`ServerResponse`](https://nodejs.org/api/http.html#class-httpserverresponse) | ✓   |
| options | `[InstallPathOptions](#installpathoptions)` | ✗   |
| installOptions | `[InstallURLOptions](#installurloptions)` | ✗   |

**Returns** `Promise<void>`

##### generateInstallUrl(options)

Returns a URL that is suitable for including in an Add to Slack button. Uses the instance's [stateStore](#statestore) to generate a value for the `state` OAuth parameter. Can disable state generation by setting `stateVerification` to `false`. Can prescribe a specific `state` OAuth parameter value by setting the `state` argument to this function explicitly.

**Parameters:**

| Name | Type | Required |
| --- | --- | --- |
| options | `[InstallURLOptions](#installurloptions)` | ✓   |
| stateVerification | `boolean` | ✗ (defaults to `true`) |
| state | `string` | ✗   |

**Returns** `Promise<string>`

##### handleCallback(req, res, options, installOptions)

This method handles the incoming callback request to the application after a redirection from slack.com following a successful user authorization. It can be used as a RequestListener in almost any HTTP server framework.

Verifies the state using the instance's [stateStore](#statestore), exchanges the grant in the query parameters for an access token, and stores token and associated installation data in the instance's [installationStore](#installationstore).

**Parameters:**

| Name | Type | Required |
| --- | --- | --- |
| req | [`IncomingMessage`](https://nodejs.org/api/http.html#class-httpincomingmessage) | ✓   |
| res | [`ServerResponse`](https://nodejs.org/api/http.html#class-httpserverresponse) | ✓   |
| options | `[CallbackOptions](#callbackoptions)` | ✗   |
| installOptions | `[InstallURLOptions](#installurloptions)` | ✗   |

**Returns** `Promise<void>`

##### authorize(source)

Fetches installation data from the instance's [installationStore](#installationstore).

**Parameters:**

| Name | Type | Required |
| --- | --- | --- |
| source | `[InstallationQuery](#installationquery)` | ✓   |

**Returns** `Promise<[AuthorizeResult](#authorizeresult)>`

## Interfaces

### AuthorizeResult

#### Fields

| Name | Type |
| --- | --- | 
| botId | `string` |
| botRefreshToken | `string` |
| botToken | `string` |
| botTokenExpiresAt | `number` (UTC, seconds) |
| botUserId | `string` |
| enterpriseId | `string` |
| teamId | `string` |
| userRefreshToken | `string` |
| userToken | `string` |
| userTokenExpiresAt | `number` (UTC, seconds) |

### CallbackOptions

#### Fields

| Name | Type | Description |
| --- | --- | --- |
| beforeInstallation | `(options: [InstallURLOptions](#installurloptions), callbackReq: IncomingMessage, callbackRes: ServerResponse) => Promise<boolean>` | Additional logic to run right before executing the Slack app installation with the given OAuth code parameter. When this method returns `false`, the [`InstallProvider`](#installprovider) skips the installation. A common use for returning `false` in this method is if the visiting user is not eligible to proceed with the Slack app installation flow. When returning `false`, this method is responsible for calling the `callbackRes#end()` method to build a complete HTTP response for the end-user. |
| afterInstallation | `(installation: [Installation](#installation) \| [OrgInstallation](#orginstallation), options: [InstallURLOptions](#installurloptions), callbackReq: IncomingMessage, callbackRes: ServerResponse) => Promise<boolean>` | Additional logic to run right after executing the Slack app installation with the given OAuth code parameter. When this method returns `false`, the [`InstallProvider`](#installprovider) skips storing the installation in the database (or whatever implementation your [`InstallationStore`](#installationstore) uses). A common use for returning `false` in this method is if your app needs to cancel the installation and display an error page to the installing user. When returning `false`, this method is responsible for calling the `callbackRes#end()` method to build a complete HTTP response for the end-user. |
| failure | `(error: CodedError, options: [InstallURLOptions](#installurloptions), callbackReq: IncomingMessage, callbackRes: ServerResponse) => void` | `failure` is invoked if `handleCallback` fails at any point. When provided, this function must complete sending the HTTP response to the end-user by calling `callbackRes#end()`. |
| failureAsync | `(error: CodedError, options: [InstallURLOptions](#installurloptions), callbackReq: IncomingMessage, callbackRes: ServerResponse) => Promise<void>` | An asynchronous version of `failure`. If both are defined, both will be executed. |
| success | `(installation: [Installation](#installation), options: [InstallURLOptions](#installurloptions), callbackReq: IncomingMessage, callbackRes: ServerResponse) => void` | `success` is invoked after `handleCallback` completes and has stored the installation data. When provided, this function must complete sending the HTTP response to the end-user by calling `callbackRes#end()`. |
| successAsync | `(installation: [Installation](#installation), options: [InstallURLOptions](#installurloptions), callbackReq: IncomingMessage, callbackRes: ServerResponse) => Promise<void>` | An asynchronous version of `success`. If both are defined, both will be executed. |

### Installation

An individual installation of the Slack app.

This interface creates a representation for installations that normalizes the responses from OAuth grant exchanges across auth versions (responses from the Web API methods \[\`oauth.v2.access\`\](https://api.slack.com/methods/oauth.v2.access) and \[\`oauth.access\`\](https://api.slack.com/methods/oauth.access)). It describes some of these differences using the \`AuthVersion\` generic placeholder type.

This interface also represents both installations which occur on individual Slack workspaces and on Slack enterprise organizations. The \`IsEnterpriseInstall\` generic placeholder type is used to describe some of those differences.

This representation is designed to be used both when producing data that should be stored by an \[\`InstallationStore\`\](#installationstore), and when consuming data that is fetched from an \[\`InstallationStore\`\](#installationstore). Most often, \[\`InstallationStore\`\](#installationstore) implementations are a database. If you are going to implement an \[\`InstallationStore\`\](#installationstore), it's advised that you \*\*store as much of the data in these objects as possible so that you can return as much as possible inside \`fetchInstallation()\`\*\*.

#### Fields

| Name | Type |
| --- | --- |
| appId | `string \| undefined` |
| authVersion | `'v1' \| 'v2'` |
| bot | `object` |
| enterprise | `object` |
| enterpriseUrl | `string \| undefined` |
| incomingWebhook | `object` |
| isEnterpriseInstall | `boolean` |
| metadata | `string` |
| team | `object` |
| tokenType | `string` |
| user | `object` |

### InstallationQuery

#### Fields

| Name | Type |
| --- | --- |
| conversationId | `string` |
| enterpriseId | `string` |
| isEnterpriseInstall | `boolean` |
| teamId | `string` |
| userId | `string` |

### InstallationStore

#### Fields

| Name | Type | Required |
| --- | --- | --- |
| deleteInstallation | `(query: [InstallationQuery](#installationquery), logger?: Logger) => Promise<void>` | ✗   |
| fetchInstallation | `(query: [InstallationQuery](#installationquery), logger?: Logger) => Promise<[Installation](#installation)>` | ✓   |
| storeInstallation | `(installation: [Installation](#installation), logger?: Logger) => Promise<void>` | ✓   |

### InstallPathOptions

Customize the response headers and body data for additional user-specific data handling such as account mapping and activity tracking.

#### Fields

| Name | Type | Description |
| --- | --- | --- |
| beforeRedirection | `(request: IncomingMessage, response: ServerResopnse, options: [InstallURLOptions](#installurloptions)) => Promise<boolean>` | When this method returns `false`, the [`InstallProvider`](#installprovider) skips `state` OAuth parameter generation, setting the `state` in HTTP cookies, generating an install URL and redirecting to the slack.com authorization URL. Common use cases for returning `false` include when the visiting user is not eligible to proceed with the Slack application installation flow. When returning `false`, this method is responsible for calling `response#end()` to build a complete HTTP response for the end-user. |

### InstallProviderOptions

#### Fields

| Name | Type | Description |
| --- | --- | --- |
| authorizationUrl | `string` | The slack.com authorization URL. This defaults to `https://slack.com/oauth/v2/authorize` when OAuth v2 is used, otherwise it will be set to `https://slack.com/oauth/authorize`. |
| authVersion | `'v1' \| 'v2'` | The OAuth version to employ. Defaults to `v2`. |
| clientId | `string` | **Required**. Your application client ID can be found under the Basic Information section of your application on [api.slack.com/apps](https://api.slack.com/apps). |
| clientOptions | `Omit<WebClientOptions, 'logLevel' \| 'logger'>` | An object adhering to the [@slack/web-api](../web-api) [`WebClientOptions`](../web-api#webclientoptions) interface, which can be used to customize the API client interacting with Slack's APIs under the hood in this package. |
| clientSecret | `string` | **Required**. Your application client secret can be found under the Basic Information section of your application on [api.slack.com/apps](https://api.slack.com/apps). |
| directInstall | `boolean` | If `true`, the install path web page rendering will be skipped and instead the user will be immediately redirected to the slack.com entry point for the OAuth process. Defaults to `false`. |
| installationStore | `[InstallationStore](#installationstore)` | An object adhering to the [`InstallationStore`](#installationstore) interface. Used to specify how application installation details like access token should be stored. Defaults to an instance of [`MemoryInstallationStore`](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-stores/memory-store.ts). |
| installUrlOptions | `[InstallURLOptions](#installurloptions)` | An object adhering to the [`InstallURLOptions`](#installurloptions) interface. Used to specify what permissions (scopes) the application should ask for, metadata to pass during the OAuth flow and override redirect URIs. |
| legacyStateVerification | `boolean` | Whether to skip checking browser cookies for `state` OAuth parameter verification. Defaults to `false`. Enabling this option is not recommended! This is intended to be used only for backwards-compatibility with versions 2.4 and older. |
| logger | [`Logger`](../logger#logger) | An object adhering to the [`Logger`](../logger#logger) interface. Used to specify how the application will log events. |
| logLevel | [`LogLevel`](../logger#loglevel) | An object adhering to the [`LogLevel`](../logger#loglevel) enum. Used to specify how verbosely the application should log. Defaults to `INFO`. |
| stateCookieExpirationSeconds | `number` | The expiration time in seconds for the `state` parameter used during the OAuth process. It defines an expiration time for the cookie used to store the state. Defaults to `600`. |
| stateCookieName | `string` | The cookie name used to house the `state` parameter during the OAuth process. Defaults to `slack-app-oauth-state`. |
| stateSecret | `string` | A secret value used for generating the `state` parameter used during the OAuth process (to prevent CSRF). |
| stateStore | `[StateStore](#statestore)` | An object adhering to the [`StateStore`](#statestore) interface. Stores state issued to the authorization server and verified the value returned at redirection during the OAuth flow (to prevent CSRF). Defaults to [`ClearStateStore`](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/state-stores/clear-state-store.ts). |
| stateVerification | `boolean` | Whether to enable verifying the `state` OAuth parameter. Defaults to `true`. |

### InstallURLOptions

#### Fields

| Name | Type |
| --- | --- |
| metadata | `string` |
| redirectUri | `string` |
| scopes | `string \| string[]` |
| teamId | `string` |
| userScopes | `string \| string[]` |

### OrgInstallation

#### Fields

| Name | Type |
| --- | --- |
| appId | `string \| undefined` |
| bot | `object` |
| enterprise | `object` |
| incomingWebhook | `object` |
| tokenType | `string` |
| user | `object` |

### StateStore

#### Fields

| Name | Type |
| --- | --- |
| generateStateParam | `(installOptions: [InstallURLOptions](#installurloptions), now: Date) => Promise<string>` |
| verifyStateParam | `(now: Date, state: string) => Promise<[InstallURLOptions](#installurloptions)>` |