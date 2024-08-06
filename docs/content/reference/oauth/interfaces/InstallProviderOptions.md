# Interface: InstallProviderOptions

## Properties

### authVersion?

```ts
optional authVersion: "v1" | "v2";
```

The default is "v2" (a.k.a. Granular Bot Permissions), different from "v1" (a.k.a. "Classic Apps").
More details here:
- https://medium.com/slack-developer-blog/more-precision-less-restrictions-a3550006f9c3
- https://api.slack.com/authentication/migration

#### Defined in

[packages/oauth/src/install-provider-options.ts:79](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L79)

***

### authorizationUrl?

```ts
optional authorizationUrl: string;
```

The slack.com authorize URL

#### Defined in

[packages/oauth/src/install-provider-options.ts:28](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L28)

***

### clientId

```ts
clientId: string;
```

Client ID, which can be found under the Basic Information section of your application on https://api.slack.com/apps

#### Defined in

[packages/oauth/src/install-provider-options.ts:13](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L13)

***

### clientOptions?

```ts
optional clientOptions: Omit<WebClientOptions, "logLevel" | "logger">;
```

The customization options for WebClient

#### Defined in

[packages/oauth/src/install-provider-options.ts:99](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L99)

***

### clientSecret

```ts
clientSecret: string;
```

Client Secret, which can be found under the Basic Information section of your application on https://api.slack.com/apps

#### Defined in

[packages/oauth/src/install-provider-options.ts:18](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L18)

***

### directInstall?

```ts
optional directInstall: boolean;
```

The install path web page rendering will be skipped if true (default: false)

#### Defined in

[packages/oauth/src/install-provider-options.ts:71](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L71)

***

### installUrlOptions?

```ts
optional installUrlOptions: InstallURLOptions;
```

The initialization options for the OAuth flow

#### Defined in

[packages/oauth/src/install-provider-options.ts:84](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L84)

***

### installationStore?

```ts
optional installationStore: InstallationStore;
```

Manages installation data, which can be called by both the OAuth flow and authorize() in event handling

#### Defined in

[packages/oauth/src/install-provider-options.ts:23](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L23)

***

### legacyStateVerification?

```ts
optional legacyStateVerification: boolean;
```

handleCallback() skips checking browser cookies if true (default: false)
Enabling this option is not recommended.
This is supposed to be used only for backward-compatibility with v2.4 and olders.

#### Defined in

[packages/oauth/src/install-provider-options.ts:51](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L51)

***

### logLevel?

```ts
optional logLevel: any;
```

@slack/logger logging level used in this class

#### Defined in

[packages/oauth/src/install-provider-options.ts:94](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L94)

***

### logger?

```ts
optional logger: any;
```

@slack/logger logging used in this class

#### Defined in

[packages/oauth/src/install-provider-options.ts:89](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L89)

***

### renderHtmlForInstallPath()?

```ts
optional renderHtmlForInstallPath: (url) => string;
```

The function for rendering the web page for the install path URL

#### Parameters

• **url**: `string`

#### Returns

`string`

#### Defined in

[packages/oauth/src/install-provider-options.ts:66](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L66)

***

### stateCookieExpirationSeconds?

```ts
optional stateCookieExpirationSeconds: number;
```

The expiration time in seconds for the state parameter value stored via cookies

#### Defined in

[packages/oauth/src/install-provider-options.ts:61](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L61)

***

### stateCookieName?

```ts
optional stateCookieName: string;
```

The cookie name used for setting state parameter value in cookies

#### Defined in

[packages/oauth/src/install-provider-options.ts:56](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L56)

***

### stateSecret?

```ts
optional stateSecret: string;
```

The secret value used for generating the state parameter value

#### Defined in

[packages/oauth/src/install-provider-options.ts:39](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L39)

***

### stateStore?

```ts
optional stateStore: StateStore;
```

Stores state issued to authorization server
and verifies the value returned at redirection during OAuth flow to prevent CSRF

#### Defined in

[packages/oauth/src/install-provider-options.ts:34](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L34)

***

### stateVerification?

```ts
optional stateVerification: boolean;
```

handleCallback() verifies the state parameter if true (default: true)

#### Defined in

[packages/oauth/src/install-provider-options.ts:44](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-provider-options.ts#L44)
